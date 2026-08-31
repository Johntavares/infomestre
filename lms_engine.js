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
      status: "published",
      video_provider: "youtube",
      video_url: "https://youtu.be/D-Myx_d5Xu0",
      video_id: "D-Myx_d5Xu0",
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
        "Conhecemos o Excel e sua finalidade.",
        "Aprendemos o que são linhas, colunas e células.",
        "Entendemos os endereços das células.",
        "Aprendemos a inserir textos, números e datas.",
        "Criamos nossa primeira tabela de dados.",
        "Praticamos a organização de informações em uma planilha."
      ],
      duration: "40 min",
      status: "published",
      video_provider: "youtube",
      video_url: "https://youtu.be/NW8NzakpDAY",
      video_id: "NW8NzakpDAY",
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
        "Aprendemos que as fórmulas começam com o sinal de igual (=).",
        "Conhecemos os principais operadores matemáticos.",
        "Aprendemos a utilizar referências de células nas fórmulas.",
        "Entendemos que os resultados podem ser atualizados automaticamente.",
        "Criamos uma tabela de vendas.",
        "Utilizamos fórmulas para calcular o total de cada produto."
      ],
      duration: "45 min",
      status: "published",
      video_provider: "youtube",
      video_url: "https://youtu.be/PR0m3JVxEOg",
      video_id: "PR0m3JVxEOg",
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
      title: "Aula 6 — Projeto Final do Excel: Planilha de Vendas e Análise",
      description: "Criação de planilha de vendas, uso de fórmulas e cálculos, preenchimento automático, organização e análise dos dados.",
      summary: "Nesta aula prática final de Excel, você aprenderá a criar uma planilha de vendas completa com uso de fórmulas e cálculos, preenchimento automático, organização e análise de dados, aplicando na prática todos os conhecimentos aprendidos no Desafio Final de Excel.",
      objectives: [
        "Criação de uma planilha de vendas",
        "Uso de fórmulas e cálculos",
        "Preenchimento automático",
        "Organização e análise dos dados",
        "Aplicação prática dos conhecimentos aprendidos",
        "Desafio final de Excel"
      ],
      duration: "45 min",
      status: "published",
      video_provider: "youtube",
      video_url: "https://youtu.be/7si9DxYER_g",
      video_id: "7si9DxYER_g",
      exercise: {
        title: "Desafio Final de Excel — Planilha de Vendas e Análise",
        instructions: "Criar uma planilha de vendas completa no Excel utilizando fórmulas e cálculos, preenchimento automático, organização e análise dos dados conforme ensinado na videoaula. Envie seu arquivo no formato .xlsx ou .pdf."
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
      status: "published",
      video_provider: "youtube",
      video_url: "https://youtu.be/5W5YSs-of9Q",
      video_id: "5W5YSs-of9Q",
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
      status: "published",
      video_provider: "youtube",
      video_url: "https://youtu.be/5CunWsicjd0",
      video_id: "5CunWsicjd0",
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

    if (!parsed.lessons) {
      parsed.lessons = {};
    }

    // Garantir que as 8 aulas do Módulo 2 existam e estejam atualizadas
    DEFAULT_MODULE_2_LESSONS.forEach(def => {
      if (!parsed.lessons[def.id]) {
        parsed.lessons[def.id] = { ...def };
      } else {
        // Se a aula padrão é publicada ou tem vídeo, sincroniza os campos pedagógicos e status
        if (def.status === 'published' || def.video_url || def.video_id) {
          parsed.lessons[def.id].status = def.status || 'published';
          parsed.lessons[def.id].video_url = def.video_url || parsed.lessons[def.id].video_url;
          parsed.lessons[def.id].video_id = def.video_id || parsed.lessons[def.id].video_id;
          parsed.lessons[def.id].video_provider = def.video_provider || 'youtube';
          parsed.lessons[def.id].title = def.title;
          parsed.lessons[def.id].description = def.description;
          parsed.lessons[def.id].summary = def.summary;
          parsed.lessons[def.id].objectives = def.objectives;
          parsed.lessons[def.id].exercise = def.exercise;
        }
      }
    });

    // Toda aula que possui vídeo configurado é tratada como publicada
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

  // Sync com o Supabase quando logado (Garantia de não bloqueio de vídeos)
  async function syncDbWithSupabase() {
    if (typeof window !== 'undefined' && window.supabase) {
      try {
        const { data: dbLessons, error } = await window.supabase.from('lessons').select('*');
        if (!error && dbLessons && dbLessons.length > 0) {
          const localDb = getLmsDb();
          dbLessons.forEach(l => {
            if (localDb.lessons[l.id]) {
              const def = DEFAULT_MODULE_2_LESSONS.find(d => d.id === l.id);
              const merged = { ...localDb.lessons[l.id], ...l };
              
              if (def && def.objectives) {
                merged.objectives = def.objectives;
              }

              // Se o banco remotos trouxe sem vídeo, mas o padrão ou local tem vídeo, preserva o vídeo
              if (!merged.video_url && !merged.video_id) {
                if (def && (def.video_url || def.video_id)) {
                  merged.video_url = def.video_url || '';
                  merged.video_id = def.video_id || extractVideoId(def.video_url);
                  merged.video_provider = def.video_provider || 'youtube';
                }
              }

              // Se a aula possui vídeo configurado, obriga o status a ser 'published'
              if (merged.video_url || merged.video_id) {
                merged.status = 'published';
              }

              localDb.lessons[l.id] = merged;
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

    // Status da aula (draft/published)
    const videoSource = lesson.video_url || lesson.video_id || '';
    const isPublished = lesson.status === 'published' && Boolean(videoSource);
    const embedUrl = isPublished ? getEmbedUrl(videoSource, lesson.video_provider) : '';

    const allMod2 = getAllLessons("modulo-2");
    const currentIdx = allMod2.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIdx > 0 ? allMod2[currentIdx - 1] : null;
    const nextLesson = currentIdx < allMod2.length - 1 ? allMod2[currentIdx + 1] : null;
    const questions = getQuestions(lesson.id);

    container.innerHTML = `
      <div class="lms-player-container">
        
        <!-- 1. CABEÇALHO COMPACTO (ECONOMIA DE ESPAÇO VERTICAL) -->
        <div class="lms-player-header-compact">
          <div class="lms-header-left-compact">
            <a href="javascript:void(0)" onclick="if(window.openStudentCourseDetail) window.openStudentCourseDetail('informatica-basica'); else if(window.switchHubTab) window.switchHubTab('dashboard');" class="lms-back-btn-compact">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              <span>Voltar aos Módulos</span>
            </a>
            <h1 class="lms-title-inline">${lesson.title}</h1>
            <div class="lms-badges-inline">
              <span class="lms-badge-mini module">MÓDULO 2 &bull; OFFICE</span>
              <span class="lms-badge-mini duration">⏱ ${lesson.duration || '30 min'}</span>
              <span class="lms-badge-mini xp">⭐ +50 XP</span>
              ${lesson.status === 'published' ? '<span class="lms-badge-mini published">✓ Publicada</span>' : '<span class="lms-badge-mini" style="background:#FFF9E6; color:#E58E26;">Em breve</span>'}
            </div>
          </div>

          <button id="btn-favorite-lesson" class="lms-fav-btn-compact ${progress.favorite ? 'active' : ''}" onclick="InforMestreLMS.toggleFavorite('${studentId}', '${lesson.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${progress.favorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${progress.favorite ? 'Favoritada' : 'Favoritar'}</span>
          </button>
        </div>

        <!-- 2. BARRA UNIFICADA: PLAYLIST SLIM + ABAS DE ETAPAS -->
        <div class="lms-control-bar-unified">
          <!-- Playlist de Aulas em Mini Pílulas -->
          <div class="lms-playlist-pills-row">
            ${allMod2.map((l, idx) => `
              <button class="lms-pill-item ${l.id === lesson.id ? 'active' : ''}" type="button" onclick="InforMestreLMS.renderStudentLmsLessonView(document.getElementById('hub-main-panel-content'), '${l.id}', window.currentUser)" title="${l.title}">
                <span>Aula 0${idx+1}</span>
                ${l.id === lesson.id ? '<span>▶</span>' : ''}
              </button>
            `).join('')}
          </div>

          <!-- Abas de Etapas Slim -->
          <div class="lms-steps-tabs-slim">
            <button class="lms-step-btn-slim active" id="ltab-video" type="button" onclick="InforMestreLMS.switchLessonTab('video')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>1. Videoaula</span>
            </button>
            <button class="lms-step-btn-slim" id="ltab-exercise" type="button" onclick="InforMestreLMS.switchLessonTab('exercise')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>2. Atividade & Anotações</span>
            </button>
            <button class="lms-step-btn-slim" id="ltab-simulators" type="button" onclick="InforMestreLMS.switchLessonTab('simulators')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span>3. Simuladores</span>
            </button>
          </div>
        </div>

        <!-- ETAPA 1: VIDEOAULA THEATER & RESUMO -->
        <div id="lms-step-video" class="lms-step-panel">
          <div class="lms-cinema-grid">
            
            <!-- PLAYER DE VÍDEO 16:9 CINEMA -->
            <div class="lms-cinema-card">
              <div class="lms-video-viewport">
                ${isPublished ? `
                  <iframe src="${embedUrl}" title="${lesson.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                ` : `
                  <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#FFFFFF; padding:1.5rem; text-align:center; gap:0.5rem;">
                    <div style="font-size:2rem;">🎬</div>
                    <h4 style="font-size:1.1rem; font-weight:800; margin:0;">Videoaula em Produção</h4>
                    <p style="font-size:0.8rem; color:#94A3B8; margin:0;">Esta aula será liberada em breve pelo seu tutor.</p>
                  </div>
                `}
              </div>

              <div class="lms-cinema-bottom-bar">
                <div style="display:flex; align-items:center; gap:0.35rem;">
                  <span style="color:#00B894; font-weight:800;">●</span>
                  <span>Alta Definição (1080p HD) &bull; Acesso Ilimitado</span>
                </div>

                ${isPublished && videoSource ? `
                  <a href="${lesson.video_url || ('https://youtu.be/' + lesson.video_id)}" target="_blank" rel="noopener noreferrer" class="lms-yt-pill-link">
                    <span>Abrir no YouTube</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </a>
                ` : ''}
              </div>
            </div>

            <!-- PAINEL LATERAL: RESUMO & DOMÍNIO PEDAGÓGICO -->
            <div class="lms-side-panel-compact">
              <div class="lms-compact-card">
                <h3 class="lms-card-heading">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#705CF6" stroke-width="2.2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  <span>Resumo da Aula</span>
                </h3>
                <p class="lms-card-text-summary">${lesson.summary || lesson.description}</p>
              </div>

              <div class="lms-compact-card">
                <h3 class="lms-card-heading">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B894" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                  <span>O que você vai dominar</span>
                </h3>
                <div class="lms-objectives-clean-list">
                  ${(lesson.objectives || []).map(obj => `
                    <div class="lms-obj-item-clean">
                      <span class="check-mark">✓</span>
                      <span>${obj}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

          </div>

          <!-- FOOTER DE NAVEGAÇÃO -->
          <div class="lms-footer-compact mt-2">
            ${prevLesson ? `
              <button class="lms-btn-nav-compact" type="button" onclick="InforMestreLMS.renderStudentLmsLessonView(document.getElementById('hub-main-panel-content'), '${prevLesson.id}', window.currentUser)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                <span>Aula Anterior</span>
              </button>
            ` : `<div></div>`}

            <button class="lms-btn-nav-compact primary" type="button" onclick="InforMestreLMS.switchLessonTab('exercise')">
              <span>Próxima Etapa: Atividade Prática</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        <!-- ETAPA 2: ATIVIDADE PRÁTICA, ENVIO DE ARQUIVO & ANOTAÇÕES -->
        <div id="lms-step-exercise" class="lms-step-panel screen-hidden">
          <div class="lms-exercise-grid" style="display:grid; grid-template-columns: 1.35fr 0.95fr; gap:1.25rem; align-items:start;">
            
            <!-- COLUNA ESQUERDA: PROPOSTA PRÁTICA + ÁREA DE UPLOAD + HISTÓRICO DE ENVIOS -->
            <div style="display:flex; flex-direction:column; gap:1rem;">
              
              <!-- Card da Atividade Proposta -->
              <div class="lms-compact-card">
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
                  <h3 class="lms-card-heading" style="color:var(--color-brand);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>Atividade Prática — ${lesson.title}</span>
                  </h3>
                  <span class="lms-badge-mini xp">⭐ +50 XP</span>
                </div>
                
                <p style="font-size:0.86rem; color:var(--color-text-secondary); line-height:1.55; margin:0.25rem 0;">
                  ${lesson.exercise_prompt || 'Siga as instruções práticas apresentadas na videoaula para produzir o exercício no Word/Excel/PowerPoint e envie seu arquivo abaixo para avaliação pelo tutor.'}
                </p>

                <!-- Dicas de Formato -->
                <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap; margin-top:0.35rem;">
                  <span style="font-size:0.72rem; font-weight:700; color:var(--color-text-muted);">Formatos suportados:</span>
                  <span class="lms-badge-mini module">.docx (Word)</span>
                  <span class="lms-badge-mini published">.xlsx (Excel)</span>
                  <span class="lms-badge-mini xp">.pptx (PowerPoint)</span>
                  <span class="lms-badge-mini duration">.pdf / imagens / .zip</span>
                </div>
              </div>

              <!-- Card da Zona de Upload Interativa -->
              <div class="lms-compact-card">
                <h3 class="lms-card-heading">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#705CF6" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span>Enviar Arquivo da Atividade</span>
                </h3>

                <div id="lms-dropzone-${lesson.id}" style="background: linear-gradient(180deg, #FAF9FD 0%, #F1EDFD 100%); border: 2px dashed rgba(112, 92, 246, 0.4); border-radius: 16px; padding: 1.75rem 1.25rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.65rem; cursor: pointer; transition: all 0.2s ease;" onclick="document.getElementById('lms-file-input-${lesson.id}').click()">
                  <div style="width: 48px; height: 48px; border-radius: 50%; background: #FFFFFF; box-shadow: 0 4px 14px rgba(112, 92, 246, 0.15); display: flex; align-items: center; justify-content: center; color: #705CF6;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <div>
                    <h4 style="font-size: 0.92rem; font-weight: 800; color: var(--color-text-primary); margin: 0;">Clique aqui ou arraste seu arquivo para enviar</h4>
                    <p style="font-size: 0.76rem; color: var(--color-text-muted); margin: 0.2rem 0 0 0;">Suporta arquivos de até 25 MB</p>
                  </div>
                  <input type="file" id="lms-file-input-${lesson.id}" style="display:none;" onchange="InforMestreLMS.handleFileUpload('${studentId}', '${studentName}', '${lesson.id}', event)">
                  <button class="lms-btn-nav-compact primary" type="button" style="pointer-events:none; margin-top:0.2rem; font-size:0.78rem; padding:0.45rem 0.9rem;">
                    <span>📁 Escolher Arquivo</span>
                  </button>
                </div>
              </div>

              <!-- Card do Histórico de Submissões -->
              <div class="lms-compact-card">
                <div style="display:flex; align-items:center; justify-content:space-between;">
                  <h3 class="lms-card-heading">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0984E3" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                    <span>Histórico de Entregas (${submissions.length})</span>
                  </h3>
                  ${submissions.length > 0 ? `<span class="lms-badge-mini published">Atividade Enviada</span>` : ''}
                </div>

                ${submissions.length === 0 ? `
                  <div style="background:#F8F7FD; border-radius:12px; padding:1.15rem; text-align:center; color:var(--color-text-muted); font-size:0.82rem;">
                    Nenhum arquivo enviado ainda para esta aula. Utilize a área de upload acima para enviar seu trabalho.
                  </div>
                ` : `
                  <div style="display:flex; flex-direction:column; gap:0.65rem;">
                    ${submissions.map(sub => `
                      <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: 12px; padding: 0.85rem 1rem; display: flex; flex-direction: column; gap: 0.45rem; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                          <div style="display: flex; align-items: center; gap: 0.6rem;">
                            <span style="font-size: 1.25rem;">📄</span>
                            <div>
                              <strong style="font-size: 0.88rem; color: var(--color-text-primary);">${sub.file_name}</strong>
                              <div style="font-size: 0.73rem; color: var(--color-text-muted);">Versão v${sub.version} &bull; Enviado em ${new Date(sub.created_at).toLocaleString('pt-BR')}</div>
                            </div>
                          </div>

                          <div>
                            ${sub.status === 'approved' ? `
                              <span class="lms-badge-mini published" style="font-size:0.76rem;">✅ Aprovado (Nota: ${sub.grade || 100}/100)</span>
                            ` : sub.status === 'redo' ? `
                              <span class="lms-badge-mini xp" style="font-size:0.76rem; background:#FFEBEB; color:#FF4757;">🔄 Solicitação de Ajustes</span>
                            ` : `
                              <span class="lms-badge-mini duration" style="font-size:0.76rem; background:#EBF4FF; color:#0984E3;">⏳ Aguardando Avaliação do Tutor</span>
                            `}
                          </div>
                        </div>

                        ${sub.feedback ? `
                          <div style="background: #F8F7FD; border-left: 3px solid #705CF6; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.8rem; color: var(--color-text-secondary); margin-top: 0.2rem;">
                            <strong style="color:#705CF6;">Feedback do Tutor:</strong> ${sub.feedback}
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>

            </div>

            <!-- COLUNA DIREITA: CADERNO DE ANOTAÇÕES + DÚVIDAS AO TUTOR -->
            <div style="display:flex; flex-direction:column; gap:1rem;">
              
              <!-- Caderno de Anotações -->
              <div class="lms-compact-card">
                <h3 class="lms-card-heading">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <span>Meu Caderno de Anotações</span>
                </h3>
                <p style="font-size:0.78rem; color:var(--color-text-muted); margin:0;">Suas notas ficam salvas na nuvem para consulta.</p>
                
                <textarea id="lms-notes-${lesson.id}" style="width: 100%; height: 140px; border-radius: 12px; border: 1.5px solid var(--color-border); padding: 0.75rem; font-family: inherit; font-size: 0.84rem; color: var(--color-text-primary); background: #FAF9FD; outline: none; resize: vertical; box-sizing: border-box;" placeholder="Digite aqui fórmulas do Excel, atalhos do teclado e anotações desta aula...">${notes}</textarea>
                
                <div style="display:flex; justify-content:flex-end;">
                  <button class="lms-btn-nav-compact primary" type="button" onclick="InforMestreLMS.saveStudentNote('${studentId}', '${lesson.id}', document.getElementById('lms-notes-${lesson.id}').value); if(window.showToastNotification) window.showToastNotification('💾 Anotação Salva!', 'Suas notas foram salvas com sucesso.');">
                    <span>💾 Salvar Anotações</span>
                  </button>
                </div>
              </div>

              <!-- Dúvidas ao Tutor -->
              <div class="lms-compact-card">
                <h3 class="lms-card-heading">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF9F43" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>Dúvidas ao Tutor (${questions.length})</span>
                </h3>
                <p style="font-size:0.78rem; color:var(--color-text-muted); margin:0;">Envie uma dúvida técnica ao seu instrutor.</p>

                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.25rem;">
                  <textarea id="lms-question-text-${lesson.id}" style="width:100%; height:70px; border-radius:10px; border:1px solid var(--color-border); padding:0.6rem; font-family:inherit; font-size:0.82rem; background:#FAF9FD; outline:none; resize:none; box-sizing:border-box;" placeholder="Digite sua pergunta aqui..."></textarea>
                  
                  <button class="lms-btn-nav-compact" type="button" style="align-self:flex-end; background:#FFF2E5; color:#E58E26; border-color:rgba(255,159,67,0.3); font-weight:700;" onclick="InforMestreLMS.handlePostQuestion('${studentId}', '${studentName}', '${lesson.id}')">
                    <span>💬 Enviar Pergunta</span>
                  </button>
                </div>

                ${questions.length > 0 ? `
                  <div style="display:flex; flex-direction:column; gap:0.45rem; margin-top:0.4rem; max-height:180px; overflow-y:auto; padding-right:2px;">
                    ${questions.map(q => `
                      <div style="background:#F8F7FD; border-radius:10px; padding:0.6rem 0.75rem; font-size:0.78rem;">
                        <div style="font-weight:700; color:var(--color-text-primary);">👤 ${q.student_name || 'Aluno'}:</div>
                        <div style="color:var(--color-text-secondary); margin-top:2px;">${q.question}</div>
                        ${(q.answers || []).map(ans => `
                          <div style="background:#FFFFFF; border-left:2px solid #00B894; border-radius:6px; padding:0.35rem 0.55rem; margin-top:0.35rem; font-size:0.75rem;">
                            <strong style="color:#00B894;">👨‍🏫 ${ans.teacher_name || 'Tutor'}:</strong> ${ans.answer}
                          </div>
                        `).join('')}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>

            </div>

          </div>
        </div>

        <!-- ETAPA 3: SIMULADORES -->
        <div id="lms-step-simulators" class="lms-step-panel screen-hidden">
          <div class="lms-compact-card">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
              <h3 class="lms-card-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#705CF6" stroke-width="2.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                <span>Simuladores e Laboratório Prático</span>
              </h3>
              <span class="lms-badge-mini module">Treinamento Interativo</span>
            </div>
            <p style="font-size:0.84rem; color:var(--color-text-secondary); margin:0.25rem 0 0.5rem 0;">Acesse os laboratórios de simulação para acelerar suas habilidades de informática.</p>
            
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-top:0.5rem;">
              <div class="skillset-card-3d" onclick="if(window.switchHubTab) window.switchHubTab('training-lab');">
                <div class="card-3d-body" style="padding:1.15rem; display:flex; flex-direction:column; gap:0.5rem;">
                  <div style="font-size:1.8rem;">⌨️</div>
                  <h4 style="font-size:0.92rem; font-weight:800; color:var(--color-text-primary); margin:0;">Laboratório de Digitação</h4>
                  <p style="font-size:0.78rem; color:var(--color-text-muted); margin:0;">Treine digitação ágil no teclado e meça seu PPM em tempo real.</p>
                  <button class="lms-btn-nav-compact primary" type="button" style="width:100%; justify-content:center; margin-top:0.25rem;">Abrir Laboratório</button>
                </div>
              </div>

              <div class="skillset-card-3d" onclick="if(window.switchHubTab) window.switchHubTab('training-lab');">
                <div class="card-3d-body" style="padding:1.15rem; display:flex; flex-direction:column; gap:0.5rem;">
                  <div style="font-size:1.8rem;">🎈</div>
                  <h4 style="font-size:0.92rem; font-weight:800; color:var(--color-text-primary); margin:0;">Coordenação de Mouse</h4>
                  <p style="font-size:0.78rem; color:var(--color-text-muted); margin:0;">Pratique cliques rápidos e precisão de mira com o cursor.</p>
                  <button class="lms-btn-nav-compact primary" type="button" style="width:100%; justify-content:center; margin-top:0.25rem;">Abrir Simulador</button>
                </div>
              </div>

              <div class="skillset-card-3d" onclick="if(window.switchHubTab) window.switchHubTab('training-lab');">
                <div class="card-3d-body" style="padding:1.15rem; display:flex; flex-direction:column; gap:0.5rem;">
                  <div style="font-size:1.8rem;">🔧</div>
                  <h4 style="font-size:0.92rem; font-weight:800; color:var(--color-text-primary); margin:0;">Simulador de Hardware 3D</h4>
                  <p style="font-size:0.78rem; color:var(--color-text-muted); margin:0;">Monte o computador peça por peça e conecte periféricos.</p>
                  <button class="lms-btn-nav-compact primary" type="button" style="width:100%; justify-content:center; margin-top:0.25rem;">Abrir Simulador</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }


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

  function toggleFavorite(studentId, lessonId) {
    const prog = getLessonProgress(studentId, lessonId);
    prog.favorite = !prog.favorite;
    updateLessonProgress(studentId, lessonId, prog);
    const btn = document.getElementById("btn-favorite-lesson");
    if (btn) {
      if (prog.favorite) {
        btn.classList.add("active");
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> <span>Salva nos Favoritos</span>`;
      } else {
        btn.classList.remove("active");
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> <span>Favoritar Aula</span>`;
      }
    }
  }

  function handleFileUpload(studentId, studentName, lessonId, event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    addSubmission(studentId, studentName, lessonId, file.name);
    if (window.showToastNotification) {
      window.showToastNotification("🎉 Atividade Enviada!", "Seu exercício foi enviado com sucesso para avaliação.");
    }
    renderStudentLmsLessonView(document.getElementById("hub-main-panel-content"), lessonId, window.currentUser);
  }

  function handlePostQuestion(studentId, studentName, lessonId) {
    const input = document.getElementById(`lms-question-text-${lessonId}`);
    if (!input || !input.value.trim()) return;
    addQuestion(studentId, studentName, lessonId, input.value.trim());
    if (window.showToastNotification) {
      window.showToastNotification("💬 Dúvida Enviada!", "Sua pergunta foi enviada ao tutor.");
    }
    renderStudentLmsLessonView(document.getElementById("hub-main-panel-content"), lessonId, window.currentUser);
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
