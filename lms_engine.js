// ============================================================================
// INFORMESTRE LMS ENGINE — MOTOR SAAS DE VIDEOAULAS, AVALIAÇÕES E RECOMPENSAS
// ============================================================================

(function (root) {

  // --------------------------------------------------------------------------
  // 1. EXTRACTOR DE VÍDEOS (ABSTRAÇÃO MULTI-PROVEDOR)
  // --------------------------------------------------------------------------
  function extractVideoId(videoUrl) {
    if (!videoUrl || typeof videoUrl !== 'string') return '';
    const url = videoUrl.trim();

    // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID or m.youtube.com
    const watchMatch = url.match(/(?:youtube\.com|m\.youtube\.com)\/watch\?.*v=([a-zA-Z0-9_-]{11})/i);
    if (watchMatch && watchMatch[1]) return watchMatch[1];

    // Shortened URL: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
    if (shortMatch && shortMatch[1]) return shortMatch[1];

    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/(?:youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9_-]{11})/i);
    if (embedMatch && embedMatch[1]) return embedMatch[1];

    // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/(?:youtube\.com|m\.youtube\.com)\/shorts\/([a-zA-Z0-9_-]{11})/i);
    if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

    // YouTube Live: https://www.youtube.com/live/VIDEO_ID
    const liveMatch = url.match(/(?:youtube\.com|m\.youtube\.com)\/live\/([a-zA-Z0-9_-]{11})/i);
    if (liveMatch && liveMatch[1]) return liveMatch[1];

    // Raw 11-char ID regex fallback
    const rawMatch = url.match(/^[a-zA-Z0-9_-]{11}$/);
    if (rawMatch) return url;

    return '';
  }

  function getEmbedUrl(videoUrl, videoProvider = 'youtube') {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return '';

    if (videoProvider === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1&autoplay=0`;
    } else if (videoProvider === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}`;
    } else if (videoProvider === 'bunny') {
      return `https://iframe.mediadelivery.net/embed/${videoId}`;
    }
    return videoUrl;
  }

  // --------------------------------------------------------------------------
  // 2. DADOS PADRÃO DO MÓDULO 2 (PACOTE OFFICE - 8 AULAS)
  // --------------------------------------------------------------------------
  const DEFAULT_MODULE_2_LESSONS = [
    {
      id: "m2-aula-1",
      module_id: "modulo-2",
      order_index: 1,
      unit: "Unidade 1 — Microsoft Word",
      title: "Aula 1 — Conhecendo o Microsoft Word",
      description: "O que é o Microsoft Word, para que serve, interface do programa, criando o primeiro documento, digitação correta, quebra automática de linha, uso correto da tecla Enter e salvamento de documentos.",
      summary: "Apresentar o Word, sua interface e as funções básicas de edição de texto para criar seus primeiros documentos profissionais.",
      objectives: [
        "O que é o Microsoft Word e para que serve",
        "Interface do programa e navegação",
        "Criando o primeiro documento e digitação correta",
        "Quebra automática de linha, uso correto do Enter e salvar documentos"
      ],
      duration: "30 min",
      status: "published", // draft = Em breve, scheduled = Agendada, published = Publicada
      video_provider: "youtube",
      video_url: "https://youtu.be/c7ghmlRAsSo",
      video_id: "c7ghmlRAsSo",
      exercise: {
        title: "Desafio 01 — Apresentação Pessoal",
        instructions: "Criar um pequeno texto de apresentação pessoal no Microsoft Word e salvar nos formatos .docx ou .pdf."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    },
    {
      id: "m2-aula-2",
      module_id: "modulo-2",
      order_index: 2,
      unit: "Unidade 1 — Microsoft Word",
      title: "Aula 2 — Atalhos Básicos no Microsoft Word",
      description: "Aprenda os 5 atalhos essenciais do Word (Ctrl+Z, Ctrl+C, Ctrl+V, Ctrl+L e Ctrl+A) para copiar, colar, desfazer, localizar e selecionar textos.",
      summary: "Nesta aula você aprenderá a dominar os atalhos de teclado mais utilizados no dia a dia do Microsoft Word: Ctrl+Z (Desfazer), Ctrl+C (Copiar), Ctrl+V (Colar), Ctrl+L (Localizar palavras) e Ctrl+A (Selecionar Tudo). Aprenda a editar e organizar seus documentos com muito mais praticidade.",
      objectives: [
        "Ctrl+C e Ctrl+V: Copiar e Colar textos e trechos sem precisar reescrever",
        "Ctrl+Z: Desfazer a última ação rapidamente em caso de erro",
        "Ctrl+L e Ctrl+A: Localizar palavras específicas no documento e Selecionar todo o conteúdo"
      ],
      duration: "35 min",
      status: "published",
      video_provider: "youtube",
      video_url: "https://youtu.be/9i3aB-6AofE",
      video_id: "9i3aB-6AofE",
      exercise: {
        title: "Desafio 02 — Prática dos Atalhos Básicos (Ctrl+Z, Ctrl+C, Ctrl+V, Ctrl+L, Ctrl+A)",
        instructions: "Abra o Microsoft Word e digite um pequeno texto. Treine a utilização de Ctrl+C e Ctrl+V para duplicar trechos, use Ctrl+Z para desfazer uma digitação, use Ctrl+L para buscar uma palavra e Ctrl+A para selecionar todo o texto. Envie seu arquivo nos formatos .docx ou .pdf."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    },
    {
      id: "m2-aula-3",
      module_id: "modulo-2",
      order_index: 3,
      unit: "Unidade 1 — Microsoft Word",
      title: "Aula 3 — Projeto Prático: Currículo e Contrato",
      description: "Estrutura de currículo (cabeçalho, experiência, formação, competências), inserção de tabelas, contrato simples, revisão ortográfica e impressão em PDF.",
      summary: "Aplicar todos os recursos aprendidos na criação de um currículo profissional e um contrato fictício simples.",
      objectives: [
        "Estrutura de currículo (cabeçalho, experiência profissional, formação e competências)",
        "Inserção e formatação de tabelas",
        "Elaboração de contrato simples e revisão ortográfica",
        "Impressão e exportação em PDF"
      ],
      duration: "45 min",
      status: "draft",
      video_provider: "youtube",
      video_url: "",
      video_id: "",
      exercise: {
        title: "Desafio Final do Word — Currículo Profissional & Contrato Fictício",
        instructions: "Criar um Currículo Profissional formatado e um Contrato Fictício simples. Envie os arquivos em .docx ou .pdf."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    },
    {
      id: "m2-aula-4",
      module_id: "modulo-2",
      order_index: 4,
      unit: "Unidade 2 — Microsoft Excel",
      title: "Aula 4 — Introdução ao Excel",
      description: "O que é Excel, interface, linhas, colunas, células, seleção, inserção de dados e salvamento.",
      summary: "Conhecer o ambiente da planilha eletrônica e entender a estrutura de células no Excel.",
      objectives: [
        "O que é Excel e para que serve",
        "Interface do programa (linhas, colunas e células)",
        "Seleção, inserção de dados e salvamento em .xlsx"
      ],
      duration: "40 min",
      status: "draft",
      video_provider: "youtube",
      video_url: "",
      video_id: "",
      exercise: {
        title: "Desafio 04 — Tabela Simples de Despesas",
        instructions: "Criar uma tabela simples de despesas listando itens, categorias e valores no Excel. Envie em .xlsx."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    },
    {
      id: "m2-aula-5",
      module_id: "modulo-2",
      order_index: 5,
      unit: "Unidade 2 — Microsoft Excel",
      title: "Aula 5 — Fórmulas e Funções",
      description: "Cálculos automáticos utilizando Soma, Média, Máximo, Mínimo, Contagem, referência de células e AutoPreenchimento.",
      summary: "Realizar cálculos automáticos no Excel utilizando as principais funções matemáticas e estatísticas.",
      objectives: [
        "Funções =SOMA(), =MÉDIA(), =MÁXIMO(), =MÍNIMO() e =CONT.VALORES()",
        "Referência de células e operadores",
        "Uso da alça de AutoPreenchimento"
      ],
      duration: "45 min",
      status: "draft",
      video_provider: "youtube",
      video_url: "",
      video_id: "",
      exercise: {
        title: "Desafio 05 — Planilha de Controle Financeiro Mensal",
        instructions: "Criar uma planilha de controle financeiro mensal com fórmulas automáticas de Soma e Média. Envie em .xlsx."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    },
    {
      id: "m2-aula-6",
      module_id: "modulo-2",
      order_index: 6,
      unit: "Unidade 2 — Microsoft Excel",
      title: "Aula 6 — Organização e Análise de Dados",
      description: "Formatação de células (Moeda, Datas, Porcentagem), classificação, filtros, gráficos e impressão.",
      summary: "Organizar informações de forma eficiente aplicando formatos visuais, filtros e gráficos analíticos.",
      objectives: [
        "Formatação de células (Moeda, Datas, Porcentagem)",
        "Classificação e aplicação de Filtros de dados",
        "Criação de Gráficos e configuração de Impressão"
      ],
      duration: "45 min",
      status: "draft",
      video_provider: "youtube",
      video_url: "",
      video_id: "",
      exercise: {
        title: "Desafio Final do Excel — Orçamento Familiar com Gráfico",
        instructions: "Criar uma planilha de orçamento familiar completa formatada em moeda R$ contendo fórmulas e um gráfico explicativo. Envie em .xlsx."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    },
    {
      id: "m2-aula-7",
      module_id: "modulo-2",
      order_index: 7,
      unit: "Unidade 3 — Microsoft PowerPoint",
      title: "Aula 7 — Criando Apresentações",
      description: "Interface do PowerPoint, slides, temas, layouts, inserção de textos, imagens, ícones e elementos SmartArt.",
      summary: "Conhecer o PowerPoint e criar apresentações visuais profissionais utilizando temas, imagens e SmartArt.",
      objectives: [
        "Interface, slides, temas e layouts",
        "Inserção de textos, imagens e ícones",
        "Uso de elementos gráficos SmartArt"
      ],
      duration: "35 min",
      status: "draft",
      video_provider: "youtube",
      video_url: "",
      video_id: "",
      exercise: {
        title: "Desafio 07 — Apresentação Pessoal",
        instructions: "Criar uma apresentação pessoal no PowerPoint com no mínimo 3 slides contendo textos, imagens e ícones. Envie em .pptx ou .pdf."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    },
    {
      id: "m2-aula-8",
      module_id: "modulo-2",
      order_index: 8,
      unit: "Unidade 3 — Microsoft PowerPoint",
      title: "Aula 8 — Projeto Final",
      description: "Animações, transições, apresentação de slides, organização visual, boas práticas e consolidação de todo o conhecimento.",
      summary: "Consolidar todo o conhecimento adquirido no Módulo 2 desenvolvendo uma apresentação profissional completa.",
      objectives: [
        "Animações de elementos e Transições de slides",
        "Organização visual e boas práticas de apresentação",
        "Construção completa: Capa, Objetivos, Conteúdo, Imagens, SmartArt, Ícones e Slide final"
      ],
      duration: "50 min",
      status: "draft",
      video_provider: "youtube",
      video_url: "",
      video_id: "",
      exercise: {
        title: "Projeto Final — Apresentação Profissional Completa",
        instructions: "Criar uma apresentação completa sobre um tema de livre escolha utilizando: Capa, Objetivos, Conteúdo, Imagens, SmartArt, Ícones, Animações, Transições e Slide Final. Envie em .pptx ou .pdf."
      },
      allowed_extensions: [".docx", ".xlsx", ".pptx", ".pdf"],
      unlock_rule: "previous_completed",
      certificate_eligible: true
    }
  ];

  // --------------------------------------------------------------------------
  // 3. CAMADA DE ARMAZENAMENTO & PERSISTÊNCIA LOCAL + SUPABASE DB
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'informestre_lms_db_v1';

  function getLmsDb() {
    let parsed = null;
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          console.error("Erro ao carregar banco local do LMS:", e);
        }
      }
    }

    if (!parsed) {
      parsed = {
        lessons: {},
        lessonProgress: {},
        submissions: {},
        studentNotes: {},
        questions: [],
        rewards: {}
      };
    }

    // Garantir que as 8 aulas do Módulo 2 existam
    if (!parsed.lessons || Object.keys(parsed.lessons).length === 0) {
      parsed.lessons = {};
      DEFAULT_MODULE_2_LESSONS.forEach(l => { parsed.lessons[l.id] = l; });
    } else {
      DEFAULT_MODULE_2_LESSONS.forEach(l => {
        if (!parsed.lessons[l.id]) {
          parsed.lessons[l.id] = l;
        }
      });
    }

    // LIBERAÇÃO: toda aula que possui vídeo configurado é tratada como
    // publicada, mesmo que um status antigo (draft/scheduled) tenha ficado
    // gravado no localStorage ou venha sincronizado do Supabase.
    Object.values(parsed.lessons).forEach(l => {
      const hasVideo = Boolean(l.video_url || l.video_id);
      if (hasVideo && l.status !== 'published') {
        l.status = 'published';
      }
    });

    return parsed;
  }

  function saveLmsDb(db) {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      } catch (e) {
        console.error("Erro ao salvar banco local do LMS:", e);
      }
    }
  }

  // Sync com o Supabase quando logado
  async function syncDbWithSupabase() {
    if (typeof window !== 'undefined' && window.supabase) {
      try {
        const { data: dbLessons, error } = await window.supabase.from('lessons').select('*');
        if (!error && dbLessons && dbLessons.length > 0) {
          const localDb = getLmsDb();
          dbLessons.forEach(l => {
            if (localDb.lessons[l.id]) {
              localDb.lessons[l.id] = { ...localDb.lessons[l.id], ...l };
            }
          });
          saveLmsDb(localDb);
        }
      } catch (err) {
        console.warn("Sincronização Supabase LMS diferida:", err);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. MÉTODOS DA API INTERNA DO LMS
  // --------------------------------------------------------------------------
  function getAllLessons(moduleId) {
    const db = getLmsDb();
    const list = Object.values(db.lessons);
    if (moduleId) {
      return list.filter(l => l.module_id === moduleId).sort((a,b) => a.order_index - b.order_index);
    }
    return list;
  }

  function getLesson(lessonId) {
    const db = getLmsDb();
    return db.lessons[lessonId] || null;
  }

  function updateLesson(lessonId, updateData) {
    const db = getLmsDb();
    if (!db.lessons[lessonId]) return null;

    if (updateData.video_url !== undefined) {
      updateData.video_id = extractVideoId(updateData.video_url);
    }

    db.lessons[lessonId] = {
      ...db.lessons[lessonId],
      ...updateData,
      updated_at: new Date().toISOString()
    };
    saveLmsDb(db);

    if (typeof window !== 'undefined' && window.supabase) {
      window.supabase.from('lessons').upsert({
        id: lessonId,
        module_id: db.lessons[lessonId].module_id,
        title: db.lessons[lessonId].title,
        description: db.lessons[lessonId].description,
        summary: db.lessons[lessonId].summary,
        objectives: db.lessons[lessonId].objectives,
        duration: db.lessons[lessonId].duration,
        status: db.lessons[lessonId].status,
        video_provider: db.lessons[lessonId].video_provider || 'youtube',
        video_url: db.lessons[lessonId].video_url,
        video_id: db.lessons[lessonId].video_id,
        updated_at: new Date().toISOString()
      }).catch(err => console.warn("Supabase upsert lesson warn:", err));
    }

    return db.lessons[lessonId];
  }

  function getLessonProgress(studentId, lessonId) {
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    return db.lessonProgress[key] || {
      watch_completed: false,
      completed: false,
      favorite: false,
      video_progress: 0
    };
  }

  function updateLessonProgress(studentId, lessonId, progressData) {
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    const current = db.lessonProgress[key] || { watch_completed: false, completed: false, favorite: false, video_progress: 0 };
    
    db.lessonProgress[key] = {
      ...current,
      ...progressData,
      updated_at: new Date().toISOString()
    };
    saveLmsDb(db);
    return db.lessonProgress[key];
  }

  // Versionamento de trabalhos (Múltiplas submissões por aluno)
  function getSubmissions(studentId, lessonId) {
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    return db.submissions[key] || [];
  }

  function getAllSubmissions() {
    const db = getLmsDb();
    const all = [];
    Object.keys(db.submissions).forEach(k => {
      const list = db.submissions[k];
      if (Array.isArray(list)) all.push(...list);
    });
    return all.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }

  function addSubmission(studentId, lessonId, fileName, fileUrl = '') {
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    const list = db.submissions[key] || [];
    const nextVersion = list.length + 1;

    const newSub = {
      id: "sub_" + Date.now(),
      student_id: studentId,
      lesson_id: lessonId,
      file_name: fileName,
      file_url: fileUrl || `mock_storage/${studentId}/${lessonId}/${fileName}`,
      version: nextVersion,
      status: "submitted",
      grade: null,
      feedback: "",
      reviewed_by: null,
      created_at: new Date().toISOString()
    };

    list.push(newSub);
    db.submissions[key] = list;
    saveLmsDb(db);
    return newSub;
  }

  function reviewSubmission(studentId, lessonId, version, reviewData) {
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    const list = db.submissions[key] || [];
    const sub = list.find(s => s.version === Number(version));
    if (!sub) return null;

    sub.status = reviewData.status; // approved | redo | reviewing
    sub.grade = reviewData.grade !== undefined ? reviewData.grade : sub.grade;
    sub.feedback = reviewData.feedback || "";
    sub.reviewed_by = reviewData.reviewerId || "tutor";
    sub.reviewed_at = new Date().toISOString();

    saveLmsDb(db);

    if (reviewData.status === 'approved') {
      updateLessonProgress(studentId, lessonId, { completed: true });
      awardXp(studentId, 50, `Concluiu a ${getLesson(lessonId)?.title || 'aula'}`);
    }

    return sub;
  }

  function getStudentNote(studentId, lessonId) {
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    return db.studentNotes[key] || "";
  }

  function saveStudentNote(studentId, lessonId, content) {
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    db.studentNotes[key] = content;
    saveLmsDb(db);
    return content;
  }

  function getQuestions(lessonId) {
    const db = getLmsDb();
    if (!lessonId) return db.questions;
    return db.questions.filter(q => q.lesson_id === lessonId);
  }

  function addQuestion(studentId, studentName, lessonId, questionText) {
    const db = getLmsDb();
    const q = {
      id: "q_" + Date.now(),
      student_id: studentId,
      student_name: studentName || "Aluno",
      lesson_id: lessonId,
      question: questionText,
      status: "open",
      created_at: new Date().toISOString(),
      answers: []
    };
    db.questions.push(q);
    saveLmsDb(db);
    return q;
  }

  function answerQuestion(questionId, teacherName, answerText) {
    const db = getLmsDb();
    const q = db.questions.find(x => x.id === questionId);
    if (!q) return null;

    q.answers.push({
      id: "ans_" + Date.now(),
      teacher_name: teacherName || "Tutor InforMestre",
      answer: answerText,
      created_at: new Date().toISOString()
    });
    q.status = "answered";
    saveLmsDb(db);
    return q;
  }

  function awardXp(studentId, xpAmount, reason) {
    if (typeof window !== 'undefined' && window.state && typeof window.state.xp === 'number') {
      window.state.xp += xpAmount;
      if (window.updateStatsUI) window.updateStatsUI();
      if (window.saveState) window.saveState();
    }
  }

  function getModule2Stats(studentId) {
    const lessons = getAllLessons("modulo-2");
    const total = lessons.length;
    let completedCount = 0;
    let submittedCount = 0;

    lessons.forEach(l => {
      const prog = getLessonProgress(studentId, l.id);
      const subs = getSubmissions(studentId, l.id);
      if (prog.completed || subs.some(s => s.status === 'approved')) {
        completedCount++;
      }
      if (subs.length > 0) {
        submittedCount++;
      }
    });

    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return {
      total,
      completed: completedCount,
      pending: total - completedCount,
      submittedCount,
      percent
    };
  }

  function markLessonCompleted(studentId, lessonId) {
    if (typeof window !== 'undefined' && window.state) {
      if (!window.state.completedLessons) window.state.completedLessons = {};
      window.state.completedLessons[lessonId] = true;
      if (typeof window.saveState === 'function') window.saveState();
      if (typeof window.initSidebarMenu === 'function') window.initSidebarMenu();
    }
    const db = getLmsDb();
    const key = `${studentId}_${lessonId}`;
    const current = db.lessonProgress[key] || { watch_completed: false, completed: false, favorite: false, video_progress: 0 };
    db.lessonProgress[key] = {
      ...current,
      watch_completed: true,
      completed: true,
      completedAt: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    saveLmsDb(db);

    if (typeof window !== 'undefined' && typeof window.showToastNotification === 'function') {
      window.showToastNotification("🎉 Aula Concluída!", "Seu progresso foi salvo e a próxima aula está liberada!");
    }
  }

  // --------------------------------------------------------------------------
  // 5. COMPONENTES VISUAIS (INTERFACE DO ALUNO & PAINEL DO PROFESSOR)
  // --------------------------------------------------------------------------
  function renderStudentLmsLessonView(container, lessonId, currentStudent) {
    if (!container) return;
    const lesson = getLesson(lessonId) || getAllLessons("modulo-2")[0];
    if (!lesson) {
      container.innerHTML = `<div class="alert alert-danger">Aula não encontrada.</div>`;
      return;
    }

    const studentId = currentStudent?.id || "guest_student";
    const studentName = currentStudent?.user_metadata?.full_name || currentStudent?.email || "Aluno";
    const progress = getLessonProgress(studentId, lesson.id);
    const submissions = getSubmissions(studentId, lesson.id);
    const latestSubmission = submissions.length > 0 ? submissions[submissions.length - 1] : null;
    const notes = getStudentNote(studentId, lesson.id);
    const questions = getQuestions(lesson.id);

    // Mapeamento visual de status da atividade
    let subStatusBadge = `<span class="lms-status-badge status-gray">⚪ Não enviada</span>`;
    if (latestSubmission) {
      if (latestSubmission.status === 'submitted') subStatusBadge = `<span class="lms-status-badge status-blue">📩 Enviada (Em avaliação)</span>`;
      else if (latestSubmission.status === 'reviewing') subStatusBadge = `<span class="lms-status-badge status-yellow">⏳ Em avaliação</span>`;
      else if (latestSubmission.status === 'approved') subStatusBadge = `<span class="lms-status-badge status-green">✅ Aprovada</span>`;
      else if (latestSubmission.status === 'redo') subStatusBadge = `<span class="lms-status-badge status-red">🔄 Refazer (Ajustes necessários)</span>`;
    }

    // Status da aula (draft/published)
    const videoSource = lesson.video_url || lesson.video_id || '';
    const isPublished = lesson.status === 'published' && Boolean(videoSource);
    const embedUrl = isPublished ? getEmbedUrl(videoSource, lesson.video_provider) : '';

    const allMod2 = getAllLessons("modulo-2");
    const currentIdx = allMod2.findIndex(l => l.id === lesson.id);
    const nextLesson = allMod2[currentIdx + 1] || lesson;
    const nextLessonId = nextLesson.id;

    // HTML da Página Única da Aula (10 Seções)
    container.innerHTML = `
      <div class="lms-single-lesson-layout">
        <!-- 1. CABEÇALHO DA AULA -->
        <div class="lms-lesson-header-card">
          <div class="lms-header-left">
            <button class="btn btn-secondary btn-sm" onclick="if(window.switchHubTab) window.switchHubTab('dashboard'); else if(window.showScreen) window.showScreen('hub');">
              ⬅️ Voltar ao Dashboard
            </button>
            <div class="lms-lesson-meta-badges mt-1">
              <span class="badge badge-purple">MÓDULO 2 — PACOTE OFFICE</span>
              <span class="badge badge-outline">⏱️ ${lesson.duration}</span>
              ${lesson.status === 'published' ? '<span class="badge badge-success">🟢 Publicada</span>' : '<span class="badge badge-warning">⏳ Em breve</span>'}
            </div>
            <h1 class="lms-lesson-title mt-1">${lesson.title}</h1>
            <p class="text-muted lms-lesson-desc">${lesson.description}</p>
          </div>
          <div class="lms-header-right">
            <button id="btn-favorite-lesson" class="btn btn-icon-favorite ${progress.favorite ? 'active' : ''}" onclick="InforMestreLMS.toggleFavorite('${studentId}', '${lesson.id}')">
              ${progress.favorite ? '⭐ Favoritada' : '☆ Favoritar'}
            </button>
          </div>
        </div>

        <!-- LISTA DE AULAS RÁPIDA (NAVBAR DO MÓDULO 2) -->
        <div class="lms-module-nav-pills">
          ${getAllLessons("modulo-2").map((l, idx) => `
            <button class="lms-nav-pill ${l.id === lesson.id ? 'active' : ''}" onclick="InforMestreLMS.renderStudentLmsLessonView(document.getElementById('hub-main-panel-content'), '${l.id}', window.currentUser)">
              Aula 0${idx+1} ${l.status === 'published' ? '🎬' : '⏳'}
            </button>
          `).join('')}
        </div>

        <!-- BARRA DE NAVEGAÇÃO DE ETAPAS / SLIDES DA AULA -->
        <div class="lms-lesson-tabs-bar mt-2">
          <button class="lms-tab-btn active" id="ltab-video" onclick="InforMestreLMS.switchLessonTab('video')">
            🎬 Etapa 1: Videoaula & Conteúdo
          </button>
          <button class="lms-tab-btn" id="ltab-exercise" onclick="InforMestreLMS.switchLessonTab('exercise')">
            📂 Etapa 2: Atividade Prática & Anotações
          </button>
          <button class="lms-tab-btn" id="ltab-simulators" onclick="InforMestreLMS.switchLessonTab('simulators')">
            🧪 Etapa 3: Simuladores Práticos (Centro de Treinamento)
          </button>
        </div>

        <!-- ETAPA 1: VIDEOAULA & RESUMO DA AULA -->
        <div id="lms-step-video" class="lms-step-panel mt-2">
          <div class="lms-content-grid">
            <!-- ÁREA DO PLAYER DE VÍDEO 16:9 -->
            <div class="lms-card lms-video-card">
              <div class="lms-card-header">
                <h3>🎬 Videoaula Principal</h3>
                <span class="text-muted text-small">${isPublished ? 'Hospedado via YouTube (Não Listado)' : 'Status: Em breve'}</span>
              </div>
              
              <div class="lms-video-wrapper">
                ${isPublished ? `
                  <iframe src="${embedUrl}" title="${lesson.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                ` : `
                  <div class="lms-video-placeholder">
                    <div class="placeholder-icon">🎬</div>
                    <h4>Vídeo ainda não disponível</h4>
                    <p>Esta aula será publicada em breve pelo professor. Você já pode ler o resumo, praticar os exercícios e tirar dúvidas!</p>
                  </div>
                `}
              </div>
            </div>

            <!-- RESUMO E OBJETIVOS DE APRENDIZADO -->
            <div class="lms-card lms-info-card">
              <h3>📖 Resumo da Aula</h3>
              <p style="line-height: 1.6; color: var(--text-primary); font-size: 0.95rem;">${lesson.summary}</p>
              
              <h4 class="mt-2" style="color: var(--color-primary-light);">🎯 Objetivos Pedagógicos</h4>
              <ul class="lms-objectives-list mt-1">
                ${(lesson.objectives || []).map(obj => `<li><span class="check-icon">✓</span> <span>${obj}</span></li>`).join('')}
              </ul>

              <div class="mt-3" style="display: flex; gap: 0.5rem; justify-content: flex-end; flex-wrap: wrap;">
                <button class="btn btn-success btn-sm" onclick="InforMestreLMS.markLessonCompleted('${studentId}', '${lesson.id}'); InforMestreLMS.renderStudentLmsLessonView(document.getElementById('hub-main-panel-content'), '${nextLessonId}', window.currentUser);">
                  ✅ Concluir Aula & Liberar Próxima
                </button>
                <button class="btn btn-primary btn-sm" onclick="InforMestreLMS.switchLessonTab('exercise')">
                  Avançar para a Etapa 2: Atividade ➡️
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ETAPA 2: ANOTAÇÕES, ATIVIDADE PRÁTICA & DÚVIDAS -->
        <div id="lms-step-exercise" class="lms-step-panel screen-hidden mt-2">
          <div class="lms-content-grid">
            <!-- BLOCO DE ANOTAÇÕES PRIVADAS -->
            <div class="lms-card lms-notes-card">
              <div class="lms-card-header">
                <h3>📝 Minhas Anotações Privadas</h3>
                <span class="text-muted text-small">Salvo automaticamente</span>
              </div>
              <textarea id="lms-student-notes-input" placeholder="Digite suas anotações pessoais desta aula aqui..." oninput="InforMestreLMS.saveStudentNote('${studentId}', '${lesson.id}', this.value)">${notes}</textarea>
              <div class="notes-footer text-muted text-small mt-1">💡 Suas anotações são privadas e ficam salvas para sua consulta rápida.</div>
            </div>

            <!-- ATIVIDADE PRÁTICA & UPLOAD DE ARQUIVOS -->
            <div class="lms-card lms-exercise-card">
              <div class="lms-card-header">
                <h3>📂 Atividade Prática & Envio de Trabalhos</h3>
                ${subStatusBadge}
              </div>

              <div class="exercise-details">
                <h4>${lesson.exercise?.title || 'Atividade Prática'}</h4>
                <p class="text-muted mt-1">${lesson.exercise?.instructions || 'Reproduza o exercício apresentado e envie seu arquivo.'}</p>
                <div class="allowed-exts-tag mt-1">Formatos aceitos: <strong>.docx, .xlsx, .pptx, .pdf</strong></div>
              </div>

              <!-- ZONA DE UPLOAD -->
              <div class="lms-upload-box mt-2">
                <input type="file" id="lms-file-input-${lesson.id}" accept=".docx,.xlsx,.pptx,.pdf" style="display:none;" onchange="InforMestreLMS.handleFileUpload('${studentId}', '${lesson.id}', this)">
                <button class="btn btn-primary btn-full" onclick="document.getElementById('lms-file-input-${lesson.id}').click()">
                  📤 Selecionar Arquivo para Enviar (Nova Versão)
                </button>
                <p class="text-small text-muted text-center mt-1">Envios anteriores não são sobrescritos. O tutor poderá ver o histórico de versões.</p>
              </div>

              <!-- HISTÓRICO DE VERSÕES ENVIADAS -->
              ${submissions.length > 0 ? `
                <div class="lms-submission-history mt-2">
                  <h5>📜 Histórico de Envios (${submissions.length} versão/ões)</h5>
                  <div class="submissions-timeline">
                    ${submissions.map(sub => `
                      <div class="sub-timeline-item ${sub.status}">
                        <div class="sub-version-badge">v${sub.version}</div>
                        <div class="sub-info">
                          <strong>${sub.file_name}</strong>
                          <span class="text-muted text-small">${new Date(sub.created_at).toLocaleString('pt-BR')}</span>
                          ${sub.feedback ? `<div class="sub-feedback-quote">💬 <em>"${sub.feedback}"</em> — Tutor</div>` : ''}
                        </div>
                        <span class="sub-status-pill status-${sub.status}">${sub.status.toUpperCase()}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="mt-3 text-right">
                <button class="btn btn-primary btn-sm" onclick="InforMestreLMS.switchLessonTab('simulators')">
                  Avançar para a Etapa 3: Simuladores 🧪 ➡️
                </button>
              </div>
            </div>
          </div>

          <!-- FÓRUM DE DÚVIDAS COM O TUTOR (Q&A) -->
          <div class="lms-card lms-qa-card mt-2">
            <div class="lms-card-header">
              <h3>💬 Dúvidas ao Tutor desta Aula</h3>
              <span class="text-muted text-small">${questions.length} pergunta(s)</span>
            </div>

            <div class="qa-ask-form mt-1">
              <textarea id="lms-question-text-${lesson.id}" rows="2" placeholder="Ficou com alguma dúvida sobre esta aula? Pergunte ao tutor..."></textarea>
              <button class="btn btn-secondary btn-sm mt-1" onclick="InforMestreLMS.handlePostQuestion('${studentId}', '${studentName}', '${lesson.id}')">
                ❓ Enviar Dúvida ao Tutor
              </button>
            </div>

            <div class="qa-questions-list mt-2">
              ${questions.length === 0 ? '<p class="text-muted text-small">Nenhuma dúvida enviada ainda. Seja o primeiro a perguntar!</p>' : ''}
              ${questions.map(q => `
                <div class="qa-question-item">
                  <div class="qa-q-header">
                    <strong>👤 ${q.student_name}</strong>
                    <span class="text-muted text-small">${new Date(q.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <p class="qa-q-text">"${q.question}"</p>
                  ${(q.answers || []).map(a => `
                    <div class="qa-answer-box">
                      <strong>👨‍🏫 ${a.teacher_name}:</strong>
                      <p>${a.answer}</p>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- ETAPA 3: CENTRO DE TREINAMENTO / SIMULADORES PRÁTICOS -->
        <div id="lms-step-simulators" class="lms-step-panel screen-hidden mt-2">
          <div id="lms-lesson-simulators-panel"></div>
        </div>
      </div>
    `;
  }

  function toggleFavorite(studentId, lessonId) {
    const current = getLessonProgress(studentId, lessonId);
    const updated = updateLessonProgress(studentId, lessonId, { favorite: !current.favorite });
    const btn = document.getElementById("btn-favorite-lesson");
    if (btn) {
      btn.classList.toggle("active", updated.favorite);
      btn.innerHTML = updated.favorite ? "⭐ Favoritada" : "☆ Favoritar";
    }
  }

  function handleFileUpload(studentId, lessonId, inputEl) {
    if (!inputEl || !inputEl.files || inputEl.files.length === 0) return;
    const file = inputEl.files[0];
    const newSub = addSubmission(studentId, lessonId, file.name);
    
    if (window.showToastNotification) {
      window.showToastNotification("📤 Trabalho Enviado!", `Versão ${newSub.version} do arquivo "${file.name}" enviada para avaliação.`);
    } else {
      alert(`Trabalho Versão ${newSub.version} enviado com sucesso!`);
    }

    // Recarrega a view da aula
    renderStudentLmsLessonView(document.getElementById("hub-main-panel-content"), lessonId, window.currentUser);
  }

  function handlePostQuestion(studentId, studentName, lessonId) {
    const input = document.getElementById(`lms-question-text-${lessonId}`);
    if (!input || !input.value.trim()) return;

    addQuestion(studentId, studentName, lessonId, input.value.trim());
    if (window.showToastNotification) {
      window.showToastNotification("❓ Dúvida Enviada!", "Sua pergunta foi enviada ao tutor.");
    }
    renderStudentLmsLessonView(document.getElementById("hub-main-panel-content"), lessonId, window.currentUser);
  }

  // PAINEL DE GERENCIAMENTO DO TUTOR/PROFESSOR
  function renderTeacherLmsPanel(container) {
    if (!container) return;
    const lessons = getAllLessons("modulo-2");
    const allSubs = getAllSubmissions();

    container.innerHTML = `
      <div class="lms-teacher-dashboard">
        <div class="teacher-header-banner">
          <h2>👨‍🏫 Painel de Gestão do Professor / Tutor LMS</h2>
          <p class="text-muted">Gerencie videoaulas do YouTube (Não Listadas), publique conteúdos e avalie os trabalhos enviados pelos alunos.</p>
        </div>

        <div class="teacher-tabs-bar mt-2">
          <button class="teacher-tab-btn active" id="ttab-videos" onclick="InforMestreLMS.switchTeacherTab('videos')">🎬 Gerenciador de Vídeos & Aulas</button>
          <button class="teacher-tab-btn" id="ttab-subs" onclick="InforMestreLMS.switchTeacherTab('subs')">📑 Avaliação de Trabalhos (${allSubs.length})</button>
          <button class="teacher-tab-btn" id="ttab-simulators" onclick="InforMestreLMS.switchTeacherTab('simulators')">🧪 Desempenho nos Simuladores Práticos</button>
        </div>

        <!-- ABA 1: GERENCIADOR DE VÍDEOS -->
        <div id="teacher-content-videos" class="teacher-tab-content mt-2">
          <div class="teacher-grid-layout">
            <!-- LISTA DE AULAS -->
            <div class="teacher-lessons-sidebar">
              <h4>Aulas do Módulo 2</h4>
              <div class="teacher-lesson-list mt-1">
                ${lessons.map(l => `
                  <div class="teacher-lesson-item" onclick="InforMestreLMS.loadLessonEditForm('${l.id}')">
                    <div class="t-lesson-title"><strong>${l.title}</strong></div>
                    <div class="t-lesson-status">Status: <span class="badge badge-sm ${l.status === 'published' ? 'badge-success' : 'badge-warning'}">${l.status}</span></div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- FORMULÁRIO DE EDIÇÃO DA AULA -->
            <div class="teacher-lesson-editor" id="teacher-lesson-edit-box">
              <p class="text-muted">Selecione uma aula à esquerda para editar seu vídeo do YouTube ou alterar seu status de publicação.</p>
            </div>
          </div>
        </div>

        <!-- ABA 2: AVALIAÇÃO DE TRABALHOS ENVIADOS -->
        <div id="teacher-content-subs" class="teacher-tab-content mt-2 screen-hidden">
          <h3>📑 Submissões de Alunos para Avaliação</h3>
          ${allSubs.length === 0 ? '<div class="alert alert-info mt-1">Nenhum trabalho enviado até o momento.</div>' : ''}
          
          <div class="teacher-subs-list mt-2">
            ${allSubs.map(sub => {
              const lesson = getLesson(sub.lesson_id);
              return `
                <div class="teacher-sub-card mt-1">
                  <div class="sub-card-header">
                    <div>
                      <strong>${lesson ? lesson.title : sub.lesson_id}</strong> — <span class="text-muted">Versão v${sub.version}</span>
                      <div class="text-small text-muted">Aluno ID: ${sub.student_id} | Data: ${new Date(sub.created_at).toLocaleString('pt-BR')}</div>
                    </div>
                    <span class="sub-status-pill status-${sub.status}">${sub.status.toUpperCase()}</span>
                  </div>

                  <div class="sub-card-body mt-1">
                    <div class="file-download-box">
                      📄 <strong>${sub.file_name}</strong>
                      <button class="btn btn-secondary btn-sm" onclick="alert('Simulação de download do arquivo: ${sub.file_name}')">⬇️ Baixar Arquivo</button>
                    </div>

                    <!-- FORMULÁRIO DE CORREÇÃO -->
                    <div class="sub-review-form mt-1">
                      <div class="form-group-row" style="display:flex; gap:1rem;">
                        <div style="flex:1;">
                          <label class="text-small">Nota (0 a 100):</label>
                          <input type="number" id="sub-grade-${sub.id}" value="${sub.grade || 100}" min="0" max="100" class="input-custom">
                        </div>
                        <div style="flex:2;">
                          <label class="text-small">Decisão:</label>
                          <select id="sub-status-${sub.id}" class="input-custom">
                            <option value="approved" ${sub.status === 'approved' ? 'selected' : ''}>✅ Aprovar Trabalho</option>
                            <option value="redo" ${sub.status === 'redo' ? 'selected' : ''}>🔄 Solicitar Refazer (Com Ajustes)</option>
                            <option value="reviewing" ${sub.status === 'reviewing' ? 'selected' : ''}>⏳ Manter em Avaliação</option>
                          </select>
                        </div>
                      </div>

                      <div class="mt-1">
                        <label class="text-small">Feedback Pedagógico ao Aluno:</label>
                        <textarea id="sub-feedback-${sub.id}" rows="2" class="input-custom" placeholder="Ex: Muito bom! Apenas ajuste as margens da primeira página.">${sub.feedback || ''}</textarea>
                      </div>

                      <button class="btn btn-primary btn-sm mt-1" onclick="InforMestreLMS.saveTeacherReview('${sub.student_id}', '${sub.lesson_id}', '${sub.version}', '${sub.id}')">
                        💾 Salvar Avaliação e Enviar Feedback
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- ABA 3: AVALIAÇÃO E MONITORAMENTO DOS SIMULADORES -->
        <div id="teacher-content-simulators" class="teacher-tab-content mt-2 screen-hidden">
          <div class="lms-card p-2" style="background: rgba(124, 58, 237, 0.08); border: 1.5px solid var(--color-primary-light);">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <h3>🧪 Monitoramento e Avaliação de Simuladores (Centro de Treinamento)</h3>
              <span class="badge badge-purple">Painel do Tutor</span>
            </div>
            <p class="text-muted text-small mb-2">Acompanhe as estatísticas individuais de digitação, velocidade do mouse, arrasta-e-solta e seleção de texto de cada aluno.</p>

            <div id="teacher-simulators-list-container">
              ${(() => {
                const labData = (window.InforMestreTrainingLab ? window.InforMestreTrainingLab.loadLabData() : {});
                const tStats = labData.typing || {};
                const mStats = labData.mouse || {};
                const dStats = labData.dragDrop || {};
                const sStats = labData.textSelection || {};

                return `
                  <div class="lab-performance-summary-card mb-2" style="background: var(--bg-surface);">
                    <h4>📊 Métricas Gerais do Aluno de Demonstração (Localhost)</h4>
                    <div class="lab-stats-grid compact-grid mt-1">
                      <div class="lab-stat-box purple compact">
                        <div class="stat-top"><span class="stat-icon">⌨️</span> <strong>${tStats.bestWpm || 0} PPM</strong></div>
                        <div class="stat-label">Digitação Rápida</div>
                        <div class="stat-sub">Precisão: ${tStats.bestAccuracy || 0}% | Tentativas: ${(tStats.attempts || []).length}</div>
                      </div>

                      <div class="lab-stat-box blue compact">
                        <div class="stat-top"><span class="stat-icon">🎈</span> <strong>${mStats.bestHits || 0} acertos</strong></div>
                        <div class="stat-label">Coordenação de Mouse</div>
                        <div class="stat-sub">Reação: ${mStats.bestReactionMs || 0}ms | Precisão: ${mStats.bestAccuracy || 0}%</div>
                      </div>

                      <div class="lab-stat-box green compact">
                        <div class="stat-top"><span class="stat-icon">📁</span> <strong>${dStats.bestAccuracy || 0}%</strong></div>
                        <div class="stat-label">Arrastar & Soltar</div>
                        <div class="stat-sub">Tempo: ${dStats.bestTimeSeconds || 0}s | Tentativas: ${(dStats.attempts || []).length}</div>
                      </div>

                      <div class="lab-stat-box orange compact">
                        <div class="stat-top"><span class="stat-icon">🎯</span> <strong>${sStats.bestAccuracy || 0}%</strong></div>
                        <div class="stat-label">Seleção de Texto</div>
                        <div class="stat-sub">Tempo: ${sStats.bestTimeSeconds || 0}s | Tentativas: ${(sStats.attempts || []).length}</div>
                      </div>
                    </div>
                  </div>

                  <!-- FORMULÁRIO DE PARECER DA ESCOLA -->
                  <div class="lms-card p-2" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-soft);">
                    <h4>✍️ Registrar Avaliação Prática para o Aluno</h4>
                    <div class="form-group-row mt-1" style="display:flex; gap:1rem;">
                      <div style="flex:1;">
                        <label class="text-small">Nota da Prática (0 a 10):</label>
                        <input type="number" id="tsim-grade" min="0" max="10" step="0.5" value="10" class="input-custom">
                      </div>
                      <div style="flex:2;">
                        <label class="text-small">Decisão Pedagógica:</label>
                        <select id="tsim-status" class="input-custom">
                          <option value="approved">✅ Desempenho Aprovado (Competência Adquirida)</option>
                          <option value="practice_more">🔄 Orientar Mais Prática nos Simuladores</option>
                        </select>
                      </div>
                    </div>

                    <div class="mt-1">
                      <label class="text-small">Observações e Parecer Técnico do Tutor:</label>
                      <textarea id="tsim-feedback" rows="2" class="input-custom" placeholder="Ex: O aluno apresentou excelente evolução na velocidade de digitação e ótima agilidade de mouse.">Aluno apresentou ótimo desempenho prático no laboratório de informática.</textarea>
                    </div>

                    <button class="btn btn-primary btn-sm mt-1" onclick="if(window.showToastNotification) window.showToastNotification('✅ Avaliação Salva!', 'A nota da prática e parecer do tutor foram salvos com sucesso.'); else alert('Avaliação prática salva com sucesso!');">
                      💾 Salvar Avaliação dos Simuladores
                    </button>
                  </div>
                `;
              })()}
            </div>
          </div>
        </div>
      </div>
    `;

    // Carrega a primeira aula por padrão no formulário
    if (lessons.length > 0) {
      loadLessonEditForm(lessons[0].id);
    }
  }

  function switchTeacherTab(tab) {
    const vBox = document.getElementById("teacher-content-videos");
    const sBox = document.getElementById("teacher-content-subs");
    const simBox = document.getElementById("teacher-content-simulators");

    const btnV = document.getElementById("ttab-videos");
    const btnS = document.getElementById("ttab-subs");
    const btnSim = document.getElementById("ttab-simulators");

    [vBox, sBox, simBox].forEach(b => b && b.classList.add("screen-hidden"));
    [btnV, btnS, btnSim].forEach(b => b && b.classList.remove("active"));

    if (tab === 'videos') {
      vBox && vBox.classList.remove("screen-hidden");
      btnV && btnV.classList.add("active");
    } else if (tab === 'subs') {
      sBox && sBox.classList.remove("screen-hidden");
      btnS && btnS.classList.add("active");
    } else if (tab === 'simulators') {
      simBox && simBox.classList.remove("screen-hidden");
      btnSim && btnSim.classList.add("active");
    }
  }

  function loadLessonEditForm(lessonId) {
    const editBox = document.getElementById("teacher-lesson-edit-box");
    if (!editBox) return;
    const lesson = getLesson(lessonId);
    if (!lesson) return;

    editBox.innerHTML = `
      <div class="teacher-edit-card">
        <h3>✏️ Editar Aula: ${lesson.title}</h3>
        
        <form onsubmit="event.preventDefault(); InforMestreLMS.saveLessonFromTeacherForm('${lesson.id}');">
          <div class="form-group-custom mt-1">
            <label>URL do Vídeo no YouTube (Não Listado):</label>
            <input type="text" id="tedit-videourl" value="${lesson.video_url || ''}" class="input-custom" placeholder="Ex: https://youtu.be/XXXXXXXX ou https://www.youtube.com/watch?v=XXXXXXXX" oninput="InforMestreLMS.previewTeacherVideo(this.value)">
            <p class="text-small text-muted mt-1">Aceita links normais do YouTube, curtos (youtu.be) e embeds. O ID será extraído automaticamente!</p>
          </div>

          <div id="tedit-video-preview" class="mt-1" style="max-width: 400px;">
            ${lesson.video_id ? `<div class="text-small text-success">✓ ID do Vídeo Detectado: <code>${lesson.video_id}</code></div>` : ''}
          </div>

          <div class="form-group-row mt-1" style="display:flex; gap:1rem;">
            <div style="flex:1;">
              <label>Status da Aula:</label>
              <select id="tedit-status" class="input-custom">
                <option value="draft" ${lesson.status === 'draft' ? 'selected' : ''}>⏳ Em breve (Rascunho)</option>
                <option value="scheduled" ${lesson.status === 'scheduled' ? 'selected' : ''}>📅 Agendada</option>
                <option value="published" ${lesson.status === 'published' ? 'selected' : ''}>🟢 Publicada (Disponível aos alunos)</option>
              </select>
            </div>
            <div style="flex:1;">
              <label>Duração Estimada:</label>
              <input type="text" id="tedit-duration" value="${lesson.duration || '30 min'}" class="input-custom">
            </div>
          </div>

          <div class="form-group-custom mt-1">
            <label>Descrição Curta:</label>
            <input type="text" id="tedit-description" value="${lesson.description || ''}" class="input-custom">
          </div>

          <div class="form-group-custom mt-1">
            <label>Resumo Pedagógico da Aula:</label>
            <textarea id="tedit-summary" rows="3" class="input-custom">${lesson.summary || ''}</textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-full mt-2">
            💾 Salvar Alterações e Publicar Vídeo
          </button>
        </form>
      </div>
    `;
  }

  function previewTeacherVideo(val) {
    const pBox = document.getElementById("tedit-video-preview");
    if (!pBox) return;
    const vid = extractVideoId(val);
    if (vid) {
      pBox.innerHTML = `<div class="alert alert-success p-1 text-small">✅ VÍDEO DETECTADO! ID: <code>${vid}</code></div>`;
    } else if (val.trim()) {
      pBox.innerHTML = `<div class="alert alert-warning p-1 text-small">⚠️ Link do YouTube ainda não reconhecido. Use youtu.be ou youtube.com/watch.</div>`;
    } else {
      pBox.innerHTML = '';
    }
  }

  function saveLessonFromTeacherForm(lessonId) {
    const url = document.getElementById("tedit-videourl").value.trim();
    const status = document.getElementById("tedit-status").value;
    const duration = document.getElementById("tedit-duration").value;
    const desc = document.getElementById("tedit-description").value;
    const summary = document.getElementById("tedit-summary").value;

    updateLesson(lessonId, {
      video_url: url,
      status: status,
      duration: duration,
      description: desc,
      summary: summary
    });

    if (window.showToastNotification) {
      window.showToastNotification("🎉 Aula Atualizada!", "Configurações da aula e vídeo do YouTube salvos com sucesso.");
    } else {
      alert("Aula atualizada com sucesso!");
    }

    renderTeacherLmsPanel(document.getElementById("hub-main-panel-content"));
  }

  function saveTeacherReview(studentId, lessonId, version, subId) {
    const status = document.getElementById(`sub-status-${subId}`).value;
    const grade = document.getElementById(`sub-grade-${subId}`).value;
    const feedback = document.getElementById(`sub-feedback-${subId}`).value;

    reviewSubmission(studentId, lessonId, version, {
      status,
      grade: Number(grade),
      feedback
    });

    if (window.showToastNotification) {
      window.showToastNotification("✅ Avaliação Salva!", "O feedback foi enviado ao aluno.");
    } else {
      alert("Avaliação salva com sucesso!");
    }

    renderTeacherLmsPanel(document.getElementById("hub-main-panel-content"));
  }

  function switchLessonTab(tabName) {
    const vStep = document.getElementById("lms-step-video");
    const eStep = document.getElementById("lms-step-exercise");
    const sStep = document.getElementById("lms-step-simulators");

    const btnV = document.getElementById("ltab-video");
    const btnE = document.getElementById("ltab-exercise");
    const btnS = document.getElementById("ltab-simulators");

    [vStep, eStep, sStep].forEach(el => el && el.classList.add("screen-hidden"));
    [btnV, btnE, btnS].forEach(btn => btn && btn.classList.remove("active"));

    if (tabName === 'video') {
      vStep && vStep.classList.remove("screen-hidden");
      btnV && btnV.classList.add("active");
    } else if (tabName === 'exercise') {
      eStep && eStep.classList.remove("screen-hidden");
      btnE && btnE.classList.add("active");
    } else if (tabName === 'simulators') {
      sStep && sStep.classList.remove("screen-hidden");
      btnS && btnS.classList.add("active");

      const simContainer = document.getElementById("lms-lesson-simulators-panel");
      if (simContainer && window.InforMestreTrainingLab) {
        window.InforMestreTrainingLab.renderLabPanel(simContainer, { isInsideLesson: true });
      }
    }
  }

  // Exportação Pública Completa
  const api = {
    extractVideoId,
    getEmbedUrl,
    getAllLessons,
    getLesson,
    updateLesson,
    getLessonProgress,
    updateLessonProgress,
    getSubmissions,
    getAllSubmissions,
    addSubmission,
    reviewSubmission,
    getStudentNote,
    saveStudentNote,
    getQuestions,
    addQuestion,
    answerQuestion,
    getModule2Stats,
    markLessonCompleted,
    renderStudentLmsLessonView,
    renderTeacherLmsPanel,
    toggleFavorite,
    handleFileUpload,
    handlePostQuestion,
    switchTeacherTab,
    switchLessonTab,
    loadLessonEditForm,
    previewTeacherVideo,
    saveLessonFromTeacherForm,
    saveTeacherReview
  };

  root.InforMestreLMS = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (typeof window !== 'undefined') {
    syncDbWithSupabase();
  }

})(typeof window !== 'undefined' ? window : global);
