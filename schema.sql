-- ==========================================================================
-- INFORMESTRE - BANCO DE DADOS E ESTRUTURA (SUPABASE SQL)
-- Copie e cole este script no SQL Editor do seu painel do Supabase.
-- ==========================================================================

-- 1. Definições de Enum e Tabelas
CREATE TYPE public.user_role AS ENUM ('admin', 'school', 'student');

-- Tabela de Escolas
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Perfis de Usuários
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.user_role NOT NULL DEFAULT 'student',
  full_name TEXT,
  school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Progresso Individual dos Alunos
CREATE TABLE public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  state JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS) em todas as tabelas
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Funções auxiliares SECURITY DEFINER para evitar recursão infinita nas políticas RLS
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS public.user_role AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_school_id(user_id UUID)
RETURNS UUID AS $$
  SELECT school_id FROM public.profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- 3. Políticas de Segurança (Row Level Security - RLS)

-- POLÍTICAS: PROFILES
DROP POLICY IF EXISTS "Leitura de perfil próprio e admin" ON public.profiles;
CREATE POLICY "Leitura de perfil próprio e admin" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id 
    OR public.get_user_role(auth.uid()) = 'admin'
    OR (
      public.get_user_role(auth.uid()) = 'school'
      AND school_id = public.get_user_school_id(auth.uid())
    )
  );

DROP POLICY IF EXISTS "Atualização de perfil próprio" ON public.profiles;
CREATE POLICY "Atualização de perfil próprio" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- POLÍTICAS: SCHOOLS
DROP POLICY IF EXISTS "Leitura de escolas por usuários logados" ON public.schools;
CREATE POLICY "Leitura de escolas por usuários logados" ON public.schools
  FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Apenas admin gerencia escolas" ON public.schools;
CREATE POLICY "Apenas admin gerencia escolas" ON public.schools
  FOR ALL USING (
    public.get_user_role(auth.uid()) = 'admin'
  );

-- POLÍTICAS: STUDENT_PROGRESS
DROP POLICY IF EXISTS "Controle de progresso" ON public.student_progress;
CREATE POLICY "Controle de progresso" ON public.student_progress
  FOR ALL USING (
    auth.uid() = student_id
    OR public.get_user_role(auth.uid()) = 'admin'
    OR (
      public.get_user_role(auth.uid()) = 'school'
      AND public.get_user_school_id(student_progress.student_id) = public.get_user_school_id(auth.uid())
    )
  );

-- 4. Triggers e Funções Auxiliares

-- Trigger para criar perfil de aluno de forma automática durante o SignUp padrão (Alunos Externos)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_school_id UUID;
    user_role public.user_role;
BEGIN
    user_role := coalesce(new.raw_user_meta_data->>'role', 'student')::public.user_role;
    
    IF user_role = 'school' THEN
        -- Cria a escola automaticamente
        INSERT INTO public.schools (name)
        VALUES (coalesce(new.raw_user_meta_data->>'school_name', 'Minha Escola'))
        RETURNING id INTO new_school_id;
    ELSE
        new_school_id := NULL;
    END IF;

    INSERT INTO public.profiles (id, full_name, role, school_id)
    VALUES (
        new.id, 
        coalesce(new.raw_user_meta_data->>'full_name', 'Usuário'), 
        user_role,
        new_school_id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Função Segura (RPC) para Criação Direta de Alunos pela Escola
-- Permite que uma Escola crie contas de login e senha para seus alunos diretamente
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.create_student_by_school(
    p_email TEXT,
    p_password TEXT,
    p_full_name TEXT,
    p_school_id UUID
) RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
    caller_role public.user_role;
    caller_school_id UUID;
BEGIN
    -- 1. Obter informações de quem está chamando a função (usuário autenticado)
    SELECT role, school_id INTO caller_role, caller_school_id 
    FROM public.profiles 
    WHERE id = auth.uid();

    -- 2. Validar permissões do chamador
    IF caller_role != 'school' AND caller_role != 'admin' THEN
        RAISE EXCEPTION 'Apenas administradores de escola ou admin global podem cadastrar alunos.';
    END IF;

    -- 3. Se for escola, garantir que ela só cadastra alunos para si mesma
    IF caller_role = 'school' AND caller_school_id != p_school_id THEN
        RAISE EXCEPTION 'Você só pode cadastrar alunos para a sua própria escola.';
    END IF;

    -- 4. Gerar um novo UUID único para o aluno
    new_user_id := gen_random_uuid();

    -- 5. Inserir o registro na tabela de autenticação do Supabase (auth.users)
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        new_user_id,
        'authenticated',
        'authenticated',
        p_email,
        crypt(p_password, gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('full_name', p_full_name),
        FALSE,
        now(),
        now()
    );

    -- 6. Inserir a identidade necessária para permitir logins por e-mail no Supabase
    INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
    ) VALUES (
        new_user_id,
        new_user_id,
        jsonb_build_object('sub', new_user_id, 'email', p_email),
        'email',
        new_user_id::text,
        now(),
        now(),
        now()
    );

    -- 7. Associar o perfil deste aluno à escola indicada
    -- Como o trigger 'on_auth_user_created' insere o perfil base no momento do INSERT do auth.users,
    -- nós atualizamos as informações detalhadas logo em seguida.
    UPDATE public.profiles
    SET school_id = p_school_id,
        role = 'student',
        full_name = p_full_name
    WHERE id = new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================================================
-- ESTRUTURA DO PERFIL DA ESCOLA (MIGRAÇÃO DE DADOS)
-- ==========================================================================

-- 1. Adicionar colunas adicionais para perfil de escola se elas não existirem
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS address TEXT;

-- 2. Atualizar políticas de Row Level Security (RLS) para escolas
DROP POLICY IF EXISTS "Apenas admin gerencia escolas" ON public.schools;
DROP POLICY IF EXISTS "Admin gerencia todas as escolas" ON public.schools;
CREATE POLICY "Admin gerencia todas as escolas" ON public.schools
  FOR ALL USING (
    public.get_user_role(auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "Tutores atualizam sua própria escola" ON public.schools;
CREATE POLICY "Tutores atualizam sua própria escola" ON public.schools
  FOR UPDATE USING (
    public.get_user_role(auth.uid()) = 'school'
    AND id = public.get_user_school_id(auth.uid())
  );
