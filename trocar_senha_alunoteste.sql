CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_id UUID;
  v_email TEXT := 'alunoteste@gmail.com';
  v_pass TEXT := '123456';
BEGIN
  SELECT id INTO v_id FROM auth.users WHERE email = v_email;

  IF v_id IS NULL THEN
    -- Se o aluno ainda não existir no Supabase, cria o registro do zero
    v_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated',
      v_email, crypt(v_pass, gen_salt('bf')), now(),
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      jsonb_build_object('full_name', 'Aluno Teste'), FALSE, now(), now()
    );

    INSERT INTO public.profiles (id, full_name, role)
    VALUES (v_id, 'Aluno Teste', 'student')
    ON CONFLICT (id) DO NOTHING;
  ELSE
    -- Se o aluno já existir, redefine a senha para 123456 e confirma o e-mail
    UPDATE auth.users
    SET encrypted_password = crypt(v_pass, gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        updated_at = now()
    WHERE id = v_id;
  END IF;

  -- Garante o vínculo essencial na tabela auth.identities
  IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = v_id AND provider = 'email') THEN
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), v_id, jsonb_build_object('sub', v_id::text, 'email', v_email), 'email', v_id::text, now(), now(), now());
  ELSE
    UPDATE auth.identities
    SET identity_data = jsonb_build_object('sub', v_id::text, 'email', v_email),
        updated_at = now()
    WHERE user_id = v_id AND provider = 'email';
  END IF;
END $$;
