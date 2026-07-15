// ==========================================================================
// SUPABASE CONFIGURATION & HELPER FUNCTIONS
// ==========================================================================

const SUPABASE_URL = "https://xltkyhnbzlzglbawdsgi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdGt5aG5iemx6Z2xiYXdkc2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NTY3NTgsImV4cCI6MjA5OTMzMjc1OH0.qFU9nhhDZNWdSYMD7PnaAyW1-KFOzmtTEqvsUUU4eTM";

// Inicializa o cliente do Supabase
// A biblioteca @supabase/supabase-js expõe a classe global `supabase` no navegador
let supabaseClient;
try {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase Client inicializado com sucesso.");
} catch (error) {
  console.error("Erro ao inicializar o cliente do Supabase:", error);
}

// Expõe globalmente
window.supabase = supabaseClient;

/**
 * Cadastra um aluno independente (externo à escola)
 */
window.signUpIndependentStudent = async function(email, password, fullName) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });
  if (error) throw error;
  return data;
};

/**
 * Faz login do usuário (Admin, Escola ou Aluno)
 */
window.signInUser = async function(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });
  if (error) throw error;
  return data;
};

/**
 * Faz logout do usuário
 */
window.signOutUser = async function() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
};

/**
 * Obtém o perfil detalhado do usuário atual (incluindo cargo e escola)
 */
window.getUserProfile = async function(userId) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, role, full_name, school_id, avatar_url, banner_url, schools(name, description, logo_url, banner_url, contact_email, contact_phone, address)")
    .eq("id", userId)
    .single();
  
  if (error) {
    console.error("Erro ao carregar perfil do usuário:", error);
    return null;
  }
  return data;
};

/**
 * Altera de forma segura a senha de acesso de um aluno pela escola tutorada (via RPC)
 */
window.resetStudentPassword = async function(studentId, newPassword) {
  const { data, error } = await supabaseClient.rpc("reset_student_password_by_school", {
    p_student_id: studentId,
    p_new_password: newPassword
  });
  if (error) throw error;
  return data;
};

/**
 * Carrega o progresso de um aluno do banco de dados
 */
window.loadProgressFromDb = async function(studentId) {
  const { data, error } = await supabaseClient
    .from("student_progress")
    .select("state")
    .eq("student_id", studentId)
    .maybeSingle();

  if (error) {
    console.error("Erro ao carregar progresso do banco de dados:", error);
    return null;
  }
  return data ? data.state : null;
};

/**
 * Salva o progresso do aluno no banco de dados (Upsert)
 */
window.saveProgressToDb = async function(studentId, state) {
  const { error } = await supabaseClient
    .from("student_progress")
    .upsert({
      student_id: studentId,
      state: state,
      updated_at: new Date().toISOString()
    }, { onConflict: "student_id" });

  if (error) {
    console.error("Erro ao salvar progresso no banco de dados:", error);
    throw error;
  }
};

/**
 * Função executada por uma Escola para cadastrar um novo aluno
 * Utiliza o RPC `create_student_by_school` criado via SQL
 */
window.registerStudentBySchool = async function(email, password, fullName, schoolId) {
  const { data, error } = await supabaseClient.rpc("create_student_by_school", {
    p_email: email,
    p_password: password,
    p_full_name: fullName,
    p_school_id: schoolId
  });

  if (error) throw error;
  return data; // Retorna o UUID do aluno criado
};

/**
 * Obtém a lista de alunos de uma escola específica junto com o progresso deles
 */
window.getSchoolStudents = async function(schoolId) {
  // 1. Busca perfis de alunos associados a esta escola
  const { data: profiles, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, full_name, role, created_at")
    .eq("school_id", schoolId)
    .eq("role", "student")
    .order("full_name");

  if (profileError) throw profileError;
  if (!profiles || profiles.length === 0) return [];

  // 2. Busca e-mails dos alunos de forma segura via RPC
  let emailMap = {};
  try {
    const { data: emails, error: emailError } = await supabaseClient.rpc("get_school_students_emails", {
      p_school_id: schoolId
    });
    if (!emailError && emails) {
      emails.forEach(e => {
        emailMap[e.student_id] = e.email;
      });
    }
  } catch (err) {
    console.warn("Aviso ao carregar e-mails dos alunos:", err);
  }

  // 3. Busca progresso para cada um desses perfis
  const studentIds = profiles.map(p => p.id);
  const { data: progressList, error: progressError } = await supabaseClient
    .from("student_progress")
    .select("student_id, state, updated_at")
    .in("student_id", studentIds);

  if (progressError) throw progressError;

  // 4. Mapeia e junta perfil com progresso e e-mail
  const progressMap = {};
  if (progressList) {
    progressList.forEach(p => {
      progressMap[p.student_id] = { state: p.state, updated_at: p.updated_at };
    });
  }

  return profiles.map(profile => ({
    ...profile,
    email: emailMap[profile.id] || "",
    progress: progressMap[profile.id] || null
  }));
};

/**
 * Obtém todas as escolas cadastradas (Apenas Admin)
 */
window.getAllSchools = async function() {
  const { data, error } = await supabaseClient
    .from("schools")
    .select("id, name, created_at")
    .order("name");

  if (error) throw error;
  return data;
};

/**
 * Cadastra uma nova escola (Apenas Admin)
 */
window.createSchool = async function(name) {
  const { data, error } = await supabaseClient
    .from("schools")
    .insert([{ name: name }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Obtém todos os alunos cadastrados no sistema globalmente (Apenas Admin)
 */
window.getAllStudentsAdmin = async function() {
  // Busca perfis de alunos
  const { data: profiles, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, full_name, role, school_id, schools(name), created_at")
    .eq("role", "student")
    .order("full_name");

  if (profileError) throw profileError;
  if (!profiles || profiles.length === 0) return [];

  // Busca progresso
  const studentIds = profiles.map(p => p.id);
  const { data: progressList, error: progressError } = await supabaseClient
    .from("student_progress")
    .select("student_id, state, updated_at")
    .in("student_id", studentIds);

  if (progressError) throw progressError;

  const progressMap = {};
  if (progressList) {
    progressList.forEach(p => {
      progressMap[p.student_id] = { state: p.state, updated_at: p.updated_at };
    });
  }

  return profiles.map(profile => ({
    ...profile,
    progress: progressMap[profile.id] || null
  }));
};

/**
 * Atualiza campos customizados do perfil do usuário (ex: Nome, Avatar, Banner)
 */
window.updateUserProfile = async function(userId, updates) {
  const { error } = await supabaseClient
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  
  if (error) throw error;
};

/**
 * Atualiza campos customizados do perfil da escola (ex: Nome, Descrição, Logo, Banner, Contatos)
 */
window.updateSchoolProfile = async function(schoolId, updates) {
  const { error } = await supabaseClient
    .from("schools")
    .update(updates)
    .eq("id", schoolId);
  
  if (error) throw error;
};

/**
 * Cadastra um tutor e cria uma escola vinculada usando os metadados do auth.signUp
 */
window.signUpSchoolTutor = async function(email, password, fullName, schoolName) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        role: 'school',
        school_name: schoolName
      }
    }
  });
  if (error) throw error;
  return data;
};
