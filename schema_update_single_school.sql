-- ==========================================================================
-- INFORMESTRE - MIGRAÇÃO: MODELO DE ESCOLA ÚNICA
-- Remove o multi-escola (tabela schools) e adota um perfil único de escola
-- (school_profile singleton) que gerencia todos os alunos e o curso.
-- ==========================================================================

-- ==========================================================================
-- BLOCO 1: Tabela school_profile (singleton) + seed com a escola real
-- ==========================================================================
CREATE TABLE IF NOT EXISTS public.school_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed: herda os dados da escola principal (NG CURSOS E TREINAMENTOS)
INSERT INTO public.school_profile (id, name, description, logo_url, banner_url, contact_email, contact_phone, address)
SELECT '00000000-0000-0000-0000-000000000001', name, description, logo_url, banner_url, contact_email, contact_phone, address
FROM public.schools
WHERE id = '141e1cfa-ce89-46c1-a094-5eec83dffc00'
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.school_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leitura do perfil da escola" ON public.school_profile;
CREATE POLICY "Leitura do perfil da escola" ON public.school_profile
  FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Atualização do perfil da escola" ON public.school_profile;
CREATE POLICY "Atualização do perfil da escola" ON public.school_profile
  FOR UPDATE USING (public.get_user_role(auth.uid()) IN ('school', 'admin'));

-- ==========================================================================
-- BLOCO 2: Funções (trigger, RPCs) no novo modelo
-- ==========================================================================

-- Trigger: cria perfil de tutor (school/admin) OU aluno criado pela escola (via RPC).
-- Cadastro autônomo de aluno NÃO é mais permitido.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role public.user_role;
BEGIN
    user_role := coalesce(new.raw_user_meta_data->>'role', 'student')::public.user_role;

    IF user_role IN ('school', 'admin') THEN
        INSERT INTO public.profiles (id, full_name, role)
        VALUES (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Usuário'), user_role);
    ELSIF (new.raw_user_meta_data->>'created_by') = 'school' THEN
        INSERT INTO public.profiles (id, full_name, role)
        VALUES (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Usuário'), 'student');
    ELSE
        RAISE EXCEPTION 'Cadastro autônomo desativado. Sua conta deve ser criada pela escola.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: criação de aluno pela escola (sem school_id — escola única)
DROP FUNCTION IF EXISTS public.create_student_by_school(TEXT, TEXT, TEXT, UUID);
CREATE OR REPLACE FUNCTION public.create_student_by_school(
    p_email TEXT,
    p_password TEXT,
    p_full_name TEXT
) RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
    caller_role public.user_role;
BEGIN
    IF p_email IS NULL OR p_password IS NULL OR length(p_password) < 6 THEN
        RAISE EXCEPTION 'Informe e-mail válido e senha com pelo menos 6 caracteres.';
    END IF;

    IF EXISTS (SELECT 1 FROM auth.users WHERE email = lower(p_email)) THEN
        RAISE EXCEPTION 'Já existe uma conta cadastrada com este e-mail.';
    END IF;

    SELECT role INTO caller_role FROM public.profiles WHERE id = auth.uid();
    IF caller_role IS NULL THEN
        RAISE EXCEPTION 'Perfil do solicitante não encontrado.';
    END IF;
    IF caller_role != 'school' AND caller_role != 'admin' THEN
        RAISE EXCEPTION 'Apenas tutores da escola ou admin global podem cadastrar alunos.';
    END IF;

    new_user_id := gen_random_uuid();

    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password,
        email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
        is_super_admin, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        new_user_id,
        'authenticated',
        'authenticated',
        lower(p_email),
        crypt(p_password, gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('full_name', p_full_name, 'created_by', 'school'),
        FALSE,
        now(),
        now()
    );

    INSERT INTO auth.identities (
        id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    ) VALUES (
        new_user_id,
        new_user_id,
        jsonb_build_object('sub', new_user_id, 'email', lower(p_email)),
        'email',
        new_user_id::text,
        now(),
        now(),
        now()
    );

    UPDATE public.profiles
    SET role = 'student',
        full_name = p_full_name
    WHERE id = new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: redefinição de senha de aluno pela escola (sem vínculo de escola)
CREATE OR REPLACE FUNCTION public.reset_student_password_by_school(
    p_student_id UUID,
    p_new_password TEXT
) RETURNS VOID AS $$
DECLARE
    caller_role public.user_role;
    student_email TEXT;
BEGIN
    IF p_new_password IS NULL OR length(p_new_password) < 6 THEN
        RAISE EXCEPTION 'A senha deve conter pelo menos 6 caracteres.';
    END IF;

    SELECT role INTO caller_role FROM public.profiles WHERE id = auth.uid();
    IF caller_role IS NULL THEN
        RAISE EXCEPTION 'Perfil do solicitante não encontrado.';
    END IF;
    IF caller_role != 'school' AND caller_role != 'admin' THEN
        RAISE EXCEPTION 'Apenas tutores da escola ou admin global podem redefinir senhas de alunos.';
    END IF;

    SELECT email INTO student_email FROM auth.users WHERE id = p_student_id;
    IF student_email IS NULL THEN
        RAISE EXCEPTION 'Registro de autenticação do aluno não encontrado.';
    END IF;

    UPDATE auth.users
    SET encrypted_password = crypt(p_new_password, gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        updated_at = now()
    WHERE id = p_student_id;

    IF NOT EXISTS (
        SELECT 1 FROM auth.identities
        WHERE user_id = p_student_id AND provider = 'email'
    ) THEN
        INSERT INTO auth.identities (
            id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
        ) VALUES (
            gen_random_uuid(),
            p_student_id,
            jsonb_build_object('sub', p_student_id::text, 'email', student_email),
            'email',
            p_student_id::text,
            now(),
            now(),
            now()
        );
    ELSE
        UPDATE auth.identities
        SET identity_data = jsonb_build_object('sub', p_student_id::text, 'email', student_email),
            provider_id = COALESCE(provider_id, p_student_id::text),
            updated_at = now()
        WHERE user_id = p_student_id AND provider = 'email';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: e-mails dos alunos (escola/admin) — auth.users não é legível via RLS
CREATE OR REPLACE FUNCTION public.get_school_students_emails()
RETURNS TABLE (student_id UUID, email TEXT) AS $$
DECLARE
    caller_role public.user_role;
BEGIN
    SELECT role INTO caller_role FROM public.profiles WHERE id = auth.uid();
    IF caller_role IS NULL OR (caller_role != 'school' AND caller_role != 'admin') THEN
        RAISE EXCEPTION 'Apenas tutores da escola ou admin global podem consultar e-mails de alunos.';
    END IF;

    RETURN QUERY
    SELECT p.id, u.email
    FROM public.profiles p
    JOIN auth.users u ON u.id = p.id
    WHERE p.role = 'student';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP FUNCTION IF EXISTS public.get_user_school_id(UUID);

GRANT EXECUTE ON FUNCTION public.create_student_by_school(TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reset_student_password_by_school(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_school_students_emails() TO authenticated;

-- ==========================================================================
-- BLOCO 3: Políticas no novo modelo + remoção das tabelas antigas
-- ==========================================================================

DROP POLICY IF EXISTS "Leitura de perfil próprio e admin" ON public.profiles;
DROP POLICY IF EXISTS "Atualização de perfil próprio" ON public.profiles;
CREATE POLICY "Leitura de perfis (próprio, escola e admin)" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id
    OR public.get_user_role(auth.uid()) IN ('admin', 'school')
  );
CREATE POLICY "Atualização de perfil próprio" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Controle de progresso" ON public.student_progress;
CREATE POLICY "Controle de progresso (próprio, escola e admin)" ON public.student_progress
  FOR ALL USING (
    auth.uid() = student_id
    OR public.get_user_role(auth.uid()) IN ('admin', 'school')
  );

-- Remove vínculo de escola dos perfis e a tabela schools
ALTER TABLE public.profiles DROP COLUMN IF EXISTS school_id;
DROP TABLE IF EXISTS public.schools;
