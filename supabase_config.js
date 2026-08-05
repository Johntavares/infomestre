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

// ID fixo da linha singleton do perfil da escola (plataforma de escola única)
const SCHOOL_PROFILE_ID = "00000000-0000-0000-0000-000000000001";

/**
 * Faz login do usuário (Admin, Tutor ou Aluno)
 */
window.signInUser = async function(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: cleanEmail,
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
 * Obtém o perfil detalhado do usuário atual (incluindo cargo)
 */
window.getUserProfile = async function(userId) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, role, full_name, avatar_url, banner_url")
    .eq("id", userId)
    .single();
  
  if (error) {
    console.error("Erro ao carregar perfil do usuário:", error);
    return null;
  }
  return data;
};

/**
 * Obtém o perfil público da escola (linha singleton)
 */
window.getSchoolProfile = async function() {
  const { data, error } = await supabaseClient
    .from("school_profile")
    .select("id, name, description, logo_url, banner_url, contact_email, contact_phone, address")
    .eq("id", SCHOOL_PROFILE_ID)
    .maybeSingle();

  if (error) {
    console.error("Erro ao carregar perfil da escola:", error);
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
 * Altera a senha do próprio usuário logado de forma nativa e segura
 */
window.updateCurrentUserPassword = async function(newPassword) {
  const { data, error } = await supabaseClient.auth.updateUser({
    password: newPassword
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
 * Função executada por um Tutor para cadastrar um novo aluno
 * Utiliza o RPC `create_student_by_school` criado via SQL
 */
window.registerStudentBySchool = async function(email, password, fullName) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const { data, error } = await supabaseClient.rpc("create_student_by_school", {
    p_email: cleanEmail,
    p_password: password,
    p_full_name: fullName
  });

  if (error) throw error;
  return data; // Retorna o UUID do aluno criado
};

/**
 * Obtém a lista de todos os alunos da escola junto com o progresso deles
 */
window.getSchoolStudents = async function() {
  // 1. Busca perfis de todos os alunos
  const { data: profiles, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, full_name, role, created_at")
    .eq("role", "student")
    .order("full_name");

  if (profileError) throw profileError;
  if (!profiles || profiles.length === 0) return [];

  // 2. Busca e-mails dos alunos de forma segura via RPC
  let emailMap = {};
  try {
    const { data: emails, error: emailError } = await supabaseClient.rpc("get_school_students_emails");
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
 * Obtém todos os alunos cadastrados no sistema globalmente (Apenas Admin)
 */
window.getAllStudentsAdmin = async function() {
  // Busca perfis de alunos
  const { data: profiles, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, full_name, role, created_at")
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
 * Atualiza campos do perfil da escola (linha singleton)
 */
window.updateSchoolProfile = async function(updates) {
  const { error } = await supabaseClient
    .from("school_profile")
    .update(updates)
    .eq("id", SCHOOL_PROFILE_ID);
  
  if (error) throw error;
};

/**
 * Cadastra um tutor vinculado à escola única da plataforma
 */
window.signUpSchoolTutor = async function(email, password, fullName) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const { data, error } = await supabaseClient.auth.signUp({
    email: cleanEmail,
    password: password,
    options: {
      data: {
        full_name: fullName,
        role: 'school'
      }
    }
  });
  if (error) throw error;
  return data;
};
