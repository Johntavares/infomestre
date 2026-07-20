CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP FUNCTION IF EXISTS public.reset_student_password_by_school(uuid, text);

CREATE OR REPLACE FUNCTION public.reset_student_password_by_school(
    p_student_id UUID,
    p_new_password TEXT
) RETURNS VOID AS $$
DECLARE
    caller_role public.user_role;
    caller_school_id UUID;
    student_school_id UUID;
    student_email TEXT;
BEGIN
    IF p_new_password IS NULL OR length(p_new_password) < 6 THEN
        RAISE EXCEPTION 'A senha deve conter pelo menos 6 caracteres.';
    END IF;

    SELECT role, school_id INTO caller_role, caller_school_id
    FROM public.profiles
    WHERE id = auth.uid();

    IF caller_role IS NULL THEN
        RAISE EXCEPTION 'Perfil do solicitante nao encontrado.';
    END IF;

    IF caller_role != 'school' AND caller_role != 'admin' THEN
        RAISE EXCEPTION 'Apenas escola ou admin podem redefinir senhas de alunos.';
    END IF;

    SELECT school_id INTO student_school_id
    FROM public.profiles
    WHERE id = p_student_id;

    IF student_school_id IS NULL AND caller_role = 'school' THEN
        RAISE EXCEPTION 'Aluno nao encontrado ou sem escola vinculada.';
    END IF;

    IF caller_role = 'school' AND student_school_id != caller_school_id THEN
        RAISE EXCEPTION 'Voce so pode redefinir senha de alunos da sua escola.';
    END IF;

    SELECT email INTO student_email
    FROM auth.users
    WHERE id = p_student_id;

    IF student_email IS NULL THEN
        RAISE EXCEPTION 'Registro de autenticacao do aluno nao encontrado.';
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
            id, user_id, identity_data, provider, provider_id,
            last_sign_in_at, created_at, updated_at
        ) VALUES (
            gen_random_uuid(),
            p_student_id,
            jsonb_build_object('sub', p_student_id::text, 'email', student_email),
            'email',
            p_student_id::text,
            now(), now(), now()
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

GRANT EXECUTE ON FUNCTION public.reset_student_password_by_school(UUID, TEXT) TO authenticated;

INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id,
    last_sign_in_at, created_at, updated_at
)
SELECT
    gen_random_uuid(),
    u.id,
    jsonb_build_object('sub', u.id::text, 'email', u.email),
    'email',
    u.id::text,
    now(), now(), now()
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
WHERE p.role = 'student'
  AND u.email IS NOT NULL
  AND NOT EXISTS (
      SELECT 1 FROM auth.identities i
      WHERE i.user_id = u.id AND i.provider = 'email'
  );
