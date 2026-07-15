// ==========================================================================
// STATE MANAGEMENT & LOCAL STORAGE
// ==========================================================================
let state = {
  currentSlideIndex: 0,
  xp: 0,
  level: 1,
  completedSlides: {}, // { slideId: true }
  completedLessons: {}, // { lessonId: true }
  unlockedAchievements: {}, // { achievementId: true }
  notes: {}, // { slideId: "text notes" }
  quizProgress: {}, // { slideId: { currentQuestionIndex: 0, answers: [], completed: false } }
  collapsedChapters: {} // { "Chapter Name": true (collapsed) or false (expanded) }
};

const ACHIEVEMENTS = [
  { id: "welcome", title: "Primeiros Passos", desc: "Abriu as boas-vindas do curso.", icon: "🚀" },
  { id: "timeline", title: "Evolucionista", desc: "Explorou todas as gerações da computação.", icon: "⏳" },
  { id: "hardware", title: "Montador Pleno", desc: "Montou o computador no simulador de hardware.", icon: "🔧" },
  { id: "peripherals", title: "Mestre das Portas", desc: "Conectou todos os cabos periféricos traseiros.", icon: "🔌" },
  { id: "windows", title: "Admin do Windows", desc: "Aprendeu a criar pastas e mover arquivos no S.O.", icon: "🖥️" },
  { id: "ergonomics", title: "Ergonomista Chefe", desc: "Ajustou a postura ergonômica ideal.", icon: "🧘" },
  { id: "graduated", title: "Diplomado", desc: "Aprovado na Avaliação Final!", icon: "🎓" },
  { id: "peripheral_master", title: "Mestre dos Periféricos", desc: "Concluiu a Missão 3 — Periféricos e Conexões.", icon: "🔌" },
  { id: "windows_explorer", title: "Explorador do Windows", desc: "Concluiu a Missão 4 — Dominando o Windows.", icon: "🖥️" },
  { id: "windows_guardian", title: "Guardião do Windows", desc: "Concluiu a expansão da Aula 4 e dominou os principais recursos do Windows.", icon: "🖥️" },
  { id: "guardian_files", title: "Guardião dos Arquivos", desc: "Concluiu a Missão 5 — Organização Digital.", icon: "📂" }
];

const COURSE_JORNADA = [
  {
    id: "modulo-1",
    title: "Explorador Digital",
    icon: "🥉",
    lessons: [
      { id: "aula-1", title: "Introdução à Informática", chapter: "AULA 1", desc: "Aprenda o básico de computadores, história e funcionamento inicial." },
      { id: "aula-2", title: "Explorando o Hardware", chapter: "AULA 2", desc: "Abra a máquina e conheça placa-mãe, processador, RAM, disco e fonte." },
      { id: "aula-3", title: "Periféricos e Conexões", chapter: "AULA 3", desc: "Domine mouse, teclado, monitores, impressoras e as conexões traseiras." },
      { id: "aula-4", title: "Dominando o Windows", chapter: "AULA 4", desc: "Aprenda a usar a Área de Trabalho, Menu Iniciar, Lixeira e recursos avançados." },
      { id: "aula-5", title: "Organização Digital", chapter: "AULA 5", desc: "Aprenda a organizar arquivos, pastas, armazenamento digital e pendrives." },
      { id: "aula-6", title: "Segurança e Cuidados", desc: "Conheça vírus, golpes, segurança física e digital no uso do computador." },
      { id: "aula-7", title: "Oficina Tecnológica", desc: "Simulações de manutenção preventiva e cuidados básicos essenciais." },
      { id: "aula-8", title: "Desafio Final do Módulo", isDesafio: true, desc: "A grande avaliação integrada do Módulo 1. Mostre que é um mestre!" }
    ]
  },
  {
    id: "modulo-2",
    title: "Produtividade Profissional",
    icon: "🥈",
    descMessage: "Conclua o Módulo 1 para desbloquear novas ferramentas profissionais.",
    lessons: [
      { id: "aula-9", title: "Digitação Inteligente", desc: "Técnicas de digitação rápida, ergonomia das mãos e uso inteligente do teclado." },
      { id: "aula-10", title: "Introdução ao Word", desc: "Aprenda a criar documentos de texto formatados, margens e estilos de fonte." },
      { id: "aula-11", title: "Criando um Currículo", desc: "Aplicação prática para estruturar e exportar seu próprio currículo profissional." },
      { id: "aula-12", title: "PowerPoint", desc: "Criação de apresentações impactantes, transições de slides e organização de ideias." },
      { id: "aula-13", title: "Excel", desc: "Entenda tabelas, células, fórmulas matemáticas básicas e gráficos interativos." },
      { id: "aula-14", title: "Projeto Profissional", isDesafio: true, desc: "Uma atividade prática integrada aplicando Word, Excel e PowerPoint em conjunto." }
    ]
  },
  {
    id: "modulo-3",
    title: "Internet e Mundo Digital",
    icon: "🥇",
    descMessage: "Conclua o Módulo 2 para acessar o mundo digital.",
    lessons: [
      { id: "aula-15", title: "História da Internet", desc: "Descubra como a grande rede global surgiu e como ela funciona estruturalmente." },
      { id: "aula-16", title: "Navegadores e Pesquisas", desc: "Aprenda a usar o Chrome, abas, favoritos, e técnicas avançadas de busca no Google." },
      { id: "aula-17", title: "Segurança Digital", desc: "Aprenda a identificar sites falsos, criar senhas seguras e evitar golpes online." },
      { id: "aula-18", title: "E-mail Profissional", desc: "Como criar uma conta de e-mail, enviar anexos e usar a etiqueta digital profissional." },
      { id: "aula-19", title: "Serviços Online", desc: "Aprenda sobre Armazenamento em Nuvem, Google Drive, assinaturas virtuais e utilitários." },
      { id: "aula-20", title: "Projeto Final", isDesafio: true, desc: "A grande missão final da internet e encerramento do curso InforMestre." }
    ]
  }
];


// Load State from LocalStorage
function loadState() {
  const saved = localStorage.getItem("informestre_state");
  if (saved) {
    try {
      state = { ...state, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Erro ao carregar estado do localStorage", e);
    }
  }
}

// Save State to LocalStorage (e sincroniza com Supabase)
let dbSyncTimeout;
function saveState() {
  localStorage.setItem("informestre_state", JSON.stringify(state));
  updateProgressUI();

  // Se o usuário estiver logado e for aluno, sincroniza com o Supabase
  if (window.currentUser && window.currentUserProfile && window.currentUserProfile.role === 'student') {
    clearTimeout(dbSyncTimeout);
    dbSyncTimeout = setTimeout(async () => {
      try {
        await window.saveProgressToDb(window.currentUser.id, state);
        console.log("Progresso sincronizado com o Supabase.");
      } catch (error) {
        console.error("Erro ao sincronizar progresso com o Supabase:", error);
      }
    }, 1500); // Debounce de 1.5s
  }
}


// Add XP and check Level Up
function addXP(amount) {
  state.xp += amount;
  
  // Level up formula: 100 XP per level
  const newLevel = Math.floor(state.xp / 100) + 1;
  if (newLevel > state.level) {
    state.level = newLevel;
    showToastNotification("📈 Nível Subiu!", `Você alcançou o Nível ${state.level}! Continue assim.`);
  }
  
  saveState();
  updateStatsUI();
}

// Unlock Achievement
function unlockAchievement(id) {
  if (state.unlockedAchievements[id]) return; // Already unlocked

  state.unlockedAchievements[id] = true;
  const achievement = ACHIEVEMENTS.find(a => a.id === id);
  if (achievement) {
    showToastNotification("🏆 Conquista Desbloqueada!", `${achievement.icon} **${achievement.title}**: ${achievement.desc}`);
    addXP(100); // 100 XP bonus for achievements
  }
  saveState();
}

// Show Toast Alert
function showToastNotification(title, message) {
  const toast = document.getElementById("achievement-toast");
  const tTitle = document.getElementById("toast-title");
  const tDesc = document.getElementById("toast-desc");
  
  tTitle.textContent = title;
  tDesc.innerHTML = message;
  
  toast.classList.remove("hidden");
  
  // Clear any existing timeout
  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  
  window.toastTimeout = setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
}

/**
 * Exibe um alerta moderno e elegante (Substituição premium do alert nativo)
 */
window.showModernAlert = function(title, message, callback) {
  const existing = document.getElementById("modern-alert-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-alert-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions">
        <button class="btn btn-primary" id="modern-alert-close-btn" style="padding: 0.6rem 2rem;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-alert-close-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
};

/**
 * Exibe uma confirmação moderna e elegante (Substituição premium do confirm nativo)
 */
window.showModernConfirm = function(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("modern-confirm-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-confirm-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline btn-small" id="modern-confirm-cancel-btn" style="padding: 0.6rem 1.5rem;">Cancelar</button>
        <button class="btn btn-primary btn-small" id="modern-confirm-ok-btn" style="padding: 0.6rem 1.8rem;">Confirmar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-confirm-ok-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  document.getElementById("modern-confirm-cancel-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onCancel) onCancel();
    }, 200);
  });
};

// ==========================================================================
// INFO POPUP SYSTEM – Visual Reference Modal
// ==========================================================================
function initInfoPopup() {
  if (document.getElementById("info-popup-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "info-popup-overlay";
  overlay.innerHTML = `
    <div id="info-popup-modal">
      <button id="info-popup-close" onclick="closeInfoPopup()" aria-label="Fechar">✕</button>
      <div id="info-popup-img-wrap">
        <img id="info-popup-img" src="" alt="" />
      </div>
      <div id="info-popup-body">
        <div id="info-popup-tag"></div>
        <h3 id="info-popup-title"></h3>
        <p id="info-popup-desc"></p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeInfoPopup(); });
}

window.openInfoPopup = function(title, description, imageSrc, tag) {
  initInfoPopup();
  document.getElementById("info-popup-title").textContent = title;
  document.getElementById("info-popup-desc").innerHTML = description;
  document.getElementById("info-popup-img").src = imageSrc;
  document.getElementById("info-popup-img").alt = title;
  document.getElementById("info-popup-tag").textContent = tag || "";
  document.getElementById("info-popup-tag").style.display = tag ? "inline-block" : "none";
  document.getElementById("info-popup-overlay").classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeInfoPopup = function() {
  const overlay = document.getElementById("info-popup-overlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
};

document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeInfoPopup(); });


// ==========================================================================
// INITIALIZATION & DYNAMIC UI RENDERING
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initTheme();
  initSidebarMenu();
  initNotepad();
  initGlobalEvents();
  
  // Load initial slide
  loadSlide(state.currentSlideIndex);
  updateStatsUI();
  updateProgressUI();

  // Inicializa integração com Supabase
  if (typeof initSupabaseIntegration === "function") {
    initSupabaseIntegration();
  }
});

// Theme switcher init
function initTheme() {
  const toggle = document.getElementById("theme-mode-switcher");
  
  // Set initial theme
  const currentTheme = localStorage.getItem("informestre_theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  
  toggle.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("informestre_theme", nextTheme);
  });
}

// Draw the left menu items (Upgraded to Gamified Journey Modules & Lessons)
const LESSON_CURIOSITIES = {
  "aula-5": {
    titulo: "Aula 5 — Organização Digital",
    proxima: "Aula 5 — Organização Digital",
    prev: "Prepare-se para aprender a organizar arquivos, pastas, armazenamento digital e pendrives de forma profissional.",
    bulletPoints: [
      "Como usar o Explorador de Arquivos como um profissional",
      "Organização de pastas, subpastas e tags coloridas",
      "Gerenciamento de pendrives, cartões de memória e discos externos",
      "Introdução ao Armazenamento na Nuvem"
    ]
  },
  "aula-6": {
    titulo: "Aula 6 — Segurança e Cuidados",
    proxima: "Aula 6 — Segurança e Cuidados",
    prev: "Saiba como proteger seu computador contra vírus, golpes e entender os cuidados físicos essenciais com a máquina.",
    bulletPoints: [
      "O que são vírus, cavalos de troia e ransomware",
      "Como usar e manter o antivírus atualizado",
      "Cuidados físicos: limpeza correta, poeira e superaquecimento",
      "Criação de senhas fortes e seguras"
    ]
  },
  "aula-7": {
    titulo: "Aula 7 — Oficina Tecnológica",
    proxima: "Aula 7 — Oficina Tecnológica",
    prev: "Coloque as mãos na massa com simulações de manutenção preventiva e cuidados básicos essenciais.",
    bulletPoints: [
      "Instalação de programas e desinstalação segura",
      "Como liberar espaço em discos cheios",
      "Identificação de problemas simples de hardware",
      "Ferramentas de diagnóstico nativas do sistema"
    ]
  },
  "aula-8": {
    titulo: "Aula 8 — Desafio Final do Módulo",
    proxima: "Aula 8 — Desafio Final",
    prev: "O teste supremo do Módulo 1! Uma grande missão prática integrada cobrindo tudo o que você aprendeu.",
    bulletPoints: [
      "Avaliação de montagem de hardware",
      "Desafio prático de gerenciamento de portas e cabos",
      "Teste avançado de atalhos e navegação do Windows",
      "Recompensa: 🏆 Medalha de Explorador Digital"
    ]
  },
  "aula-9": {
    titulo: "Aula 9 — Digitação Inteligente",
    proxima: "Aula 9 — Digitação Inteligente",
    prev: "Aprenda a digitar com rapidez e ergonomia para aumentar sua velocidade de trabalho no teclado.",
    bulletPoints: [
      "Postura correta das mãos e posicionamento das teclas guia",
      "Exercícios dinâmicos de velocidade e precisão",
      "Uso avançado de teclas de atalho de produtividade",
      "Como evitar lesões por esforço repetitivo (LER)"
    ]
  },
  "aula-10": {
    titulo: "Aula 10 — Introdução ao Word",
    proxima: "Aula 10 — Introdução ao Word",
    prev: "Domine a criação de textos profissionais, formatações de página e designs elegantes de documentos.",
    bulletPoints: [
      "Formatando fontes, parágrafos, espaçamentos e recuos",
      "Configuração de margens de página e cabeçalhos",
      "Uso de estilos rápidos para sumários automáticos",
      "Inserção de tabelas, imagens e formas"
    ]
  },
  "aula-11": {
    titulo: "Aula 11 — Criando um Currículo",
    proxima: "Aula 11 — Criando um Currículo",
    prev: "Uma aplicação real e prática para estruturar e exportar seu próprio currículo profissional de destaque.",
    bulletPoints: [
      "Estrutura padrão de um currículo moderno e atraente",
      "Dicas de redação de qualificações e histórico profissional",
      "Alinhamento, colunas e formatação limpa",
      "Exportação correta em PDF para envio"
    ]
  },
  "aula-12": {
    titulo: "Aula 12 — PowerPoint",
    proxima: "Aula 12 — Apresentações de Slides",
    prev: "Aprenda a criar slides cativantes, transições fluidas e organizar apresentações de slides de alto impacto.",
    bulletPoints: [
      "Criação de slides de títulos, tópicos e layouts dinâmicos",
      "Princípios de design: contraste de cores e tipografia legível",
      "Uso de animações discretas e transições suaves de página",
      "Modo de apresentação com notas do orador"
    ]
  },
  "aula-13": {
    titulo: "Aula 13 — Excel",
    proxima: "Aula 13 — Planilhas do Excel",
    prev: "Desvende as planilhas do Excel, fórmulas matemáticas básicas, automações e gráficos interativos.",
    bulletPoints: [
      "Estrutura de linhas, colunas, células e formatação de números",
      "Fórmulas essenciais: SOMA, MÉDIA, MÁXIMO, MÍNIMO e SE",
      "Criação de gráficos de pizza, barras e linhas a partir de tabelas",
      "Filtros, classificação e organização de dados"
    ]
  },
  "aula-14": {
    titulo: "Aula 14 — Projeto Profissional",
    proxima: "Aula 14 — Projeto Profissional",
    prev: "O desafio de consolidação do Módulo 2! Crie e estruture um projeto profissional unificando Word, Excel e PowerPoint.",
    bulletPoints: [
      "Criação de relatório de vendas formatado no Word",
      "Estruturação de planilha financeira e gráficos no Excel",
      "Apresentação executiva dos resultados no PowerPoint",
      "Recompensa: 🏆 Medalha de Produtividade Profissional"
    ]
  },
  "aula-15": {
    titulo: "Aula 15 — História da Internet",
    proxima: "Aula 15 — História da Internet",
    prev: "Aprenda como a rede global surgiu, como a informação viaja pelo mundo e como a web revolucionou nossa sociedade.",
    bulletPoints: [
      "De redes militares (ARPANET) à rede mundial de computadores (WWW)",
      "O que são servidores, clientes, pacotes de dados e cabos submarinos",
      "Funcionamento básico do protocolo IP e roteadores",
      "A evolução dos sites de texto para a web multimídia moderna"
    ]
  },
  "aula-16": {
    titulo: "Aula 16 — Navegadores e Pesquisas",
    proxima: "Aula 16 — Navegadores e Pesquisas",
    prev: "Navegue com velocidade e segurança! Aprenda a usar recursos ocultos de navegadores e fazer buscas precisas no Google.",
    bulletPoints: [
      "Navegação por abas, histórico, favoritos e extensões",
      "Uso de operadores de busca do Google (aspas, sinal de menos, site:)",
      "Como limpar cookies e cache do navegador de forma seletiva",
      "Modo de navegação anônima: mitos e verdades"
    ]
  },
  "aula-17": {
    titulo: "Aula 17 — Segurança Digital",
    proxima: "Aula 17 — Segurança Digital",
    prev: "Mantenha-se protegido na web. Aprenda a identificar golpes comuns de phishing, links perigosos e proteger sua privacidade.",
    bulletPoints: [
      "Identificação de selos de segurança HTTPS e cadeados em sites",
      "Como desconfiar e identificar mensagens falsas (WhatsApp, SMS, e-mail)",
      "Uso de Autenticação em Duas Etapas (2FA) em suas contas",
      "Cuidados com redes Wi-Fi públicas e computadores compartilhados"
    ]
  },
  "aula-18": {
    titulo: "Aula 18 — E-mail Profissional",
    proxima: "Aula 18 — E-mail Profissional",
    prev: "Aprenda a criar contas comerciais, escrever e-mails formais e usar anexos e assinaturas de forma correta.",
    bulletPoints: [
      "Configuração de caixa de entrada, spam e pastas de organização",
      "Escrevendo e-mails formais com saudação, corpo estruturado e encerramento",
      "Como gerenciar o envio de anexos pesados e links compartilhados",
      "Criação de assinaturas profissionais automáticas"
    ]
  },
  "aula-19": {
    titulo: "Aula 19 — Serviços Online",
    proxima: "Aula 19 — Serviços Online e Nuvem",
    prev: "Explore o ecossistema de serviços da internet, do Google Drive ao armazenamento de arquivos em nuvem.",
    bulletPoints: [
      "Como salvar, compartilhar e colaborar em tempo real com arquivos na nuvem",
      "Uso de serviços públicos digitais (Gov.br, agendamentos, contas de consumo)",
      "Introdução a plataformas de reuniões virtuais (Meet, Teams, Zoom)",
      "Gerenciamento de assinaturas e armazenamento online"
    ]
  },
  "aula-20": {
    titulo: "Aula 20 — Projeto Final",
    proxima: "Aula 20 — Projeto Final",
    prev: "A grande missão final da internet e encerramento do curso InforMestre. Coloque tudo à prova e libere seu certificado!",
    bulletPoints: [
      "Planejamento de uma jornada digital segura na web",
      "Criação e compartilhamento de um ecossistema colaborativo na nuvem",
      "Desafio prático de identificação de golpes e segurança em tempo real",
      "Recompensa: 🎓 Certificado Oficial de Conclusão do InforMestre"
    ]
  }
};

function isLessonCompleted(lesson) {
  if (state.completedLessons && state.completedLessons[lesson.id] === true) {
    return true;
  }
  if (lesson.chapter) {
    const slides = COURSE_CONTENT.filter(s => s.chapter === lesson.chapter);
    if (slides.length > 0) {
      const todosConcluidos = slides.every(s => state.completedSlides[s.id] === true);
      if (todosConcluidos) {
        if (!state.completedLessons) state.completedLessons = {};
        state.completedLessons[lesson.id] = true;
        return true;
      }
    }
  }
  return false;
}

function getLessonStatus(lessonId) {
  let flatLessons = [];
  COURSE_JORNADA.forEach(mod => {
    flatLessons.push(...mod.lessons);
  });
  
  const idx = flatLessons.findIndex(l => l.id === lessonId);
  if (idx === -1) return "locked";

  const role = (window.currentUserProfile && window.currentUserProfile.role) ? window.currentUserProfile.role : 'student';
  const isStudent = (role === 'student');

  if (!isStudent) {
    const atual = flatLessons[idx];
    if (isLessonCompleted(atual)) return "completed";
    return "available";
  }

  if (idx === 0) {
    return isLessonCompleted(flatLessons[0]) ? "completed" : "in_progress";
  }

  const anterior = flatLessons[idx - 1];
  if (!isLessonCompleted(anterior)) {
    return "locked";
  }

  const atual = flatLessons[idx];
  if (isLessonCompleted(atual)) {
    return "completed";
  }

  if (atual.chapter) {
    const currentSlide = COURSE_CONTENT[state.currentSlideIndex];
    if (currentSlide && currentSlide.chapter === atual.chapter) {
      return "in_progress";
    }
  }

  return "available";
}

function getModuloStatus(moduloId) {
  const role = (window.currentUserProfile && window.currentUserProfile.role) ? window.currentUserProfile.role : 'student';
  if (role !== 'student') return "unlocked";

  if (moduloId === "modulo-1") return "unlocked";
  if (moduloId === "modulo-2") {
    return isLessonCompleted({ id: "aula-8" }) ? "unlocked" : "locked";
  }
  if (moduloId === "modulo-3") {
    return isLessonCompleted({ id: "aula-14" }) ? "unlocked" : "locked";
  }
  return "locked";
}

function triggerLessonUnlockNotification(aulaId) {
  let flatLessons = [];
  COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
  const idx = flatLessons.findIndex(l => l.id === aulaId);
  if (idx === -1) return;

  const aulaConcluida = flatLessons[idx];
  const proximaAula = flatLessons[idx + 1];

  if (aulaId === "aula-8") {
    window.showModernAlert(
      "🏆 Módulo 1 Concluído!",
      `
      <div style="text-align: center; padding: 0.5rem 0;">
        <span style="font-size: 3.5rem; display: block; margin-bottom: 1rem;">🏆</span>
        <h4 style="margin: 0 0 1rem; color: #f59e0b; font-size: 1.2rem;">Parabéns, Explorador Digital!</h4>
        <p style="font-size: 0.9rem; line-height: 1.5; color: #ddd; margin: 0 0 1.5rem;">
          Você concluiu com maestria o <strong>Módulo 1 — Explorador Digital</strong> e dominou o hardware, periféricos e o sistema operacional!
        </p>
        <div style="background: rgba(124, 58, 237, 0.15); border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 10px; padding: 1rem; text-align: left; font-size: 0.85rem;">
          <strong>🔒 Próxima Etapa:</strong> O <em>Módulo 2 — Produtividade Profissional</em> foi desbloqueado na sua jornada! Como você concluiu todo o conteúdo atual do Módulo 1, as novas aulas práticas e exercícios de Digitação, Word, Excel e PowerPoint aguardam as próximas atividades da escola.
        </div>
      </div>
      `
    );
    return;
  }

  if (aulaId === "aula-14") {
    window.showModernAlert(
      "🥈 Módulo 2 Concluído!",
      `
      <div style="text-align: center; padding: 0.5rem 0;">
        <span style="font-size: 3.5rem; display: block; margin-bottom: 1rem;">🥈</span>
        <h4 style="margin: 0 0 1rem; color: #38bdf8; font-size: 1.2rem;">Parabéns, Produtor Tecnológico!</h4>
        <p style="font-size: 0.9rem; line-height: 1.5; color: #ddd; margin: 0 0 1.5rem;">
          Você concluiu todo o <strong>Módulo 2 — Produtividade Profissional</strong>!
        </p>
        <div style="background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 10px; padding: 1rem; text-align: left; font-size: 0.85rem;">
          <strong>🔒 Próxima Etapa:</strong> O <em>Módulo 3 — Internet e Mundo Digital</em> foi desbloqueado na sua jornada! Continue com dedicação.
        </div>
      </div>
      `
    );
    return;
  }

  if (aulaId === "aula-20") {
    window.showModernAlert(
      "🎓 Curso Concluído!",
      `
      <div style="text-align: center; padding: 0.5rem 0;">
        <span style="font-size: 3.5rem; display: block; margin-bottom: 1rem;">🎓</span>
        <h4 style="margin: 0 0 1rem; color: #10b981; font-size: 1.2rem;">Você se formou no InforMestre!</h4>
        <p style="font-size: 0.9rem; line-height: 1.5; color: #ddd; margin: 0 0 1.5rem;">
          Parabéns! Você concluiu todas as 20 aulas do curso de Informática Básica!
        </p>
        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; padding: 1rem; text-align: left; font-size: 0.85rem;">
          <strong>🏆 Certificado Disponível:</strong> Seu Certificado Oficial de Conclusão foi liberado! Acesse a seção de Conquistas ou o menu correspondente para gerá-lo e imprimi-lo.
        </div>
      </div>
      `
    );
    return;
  }

  if (proximaAula) {
    const curiosidade = LESSON_CURIOSITIES[proximaAula.id];
    const previewText = curiosidade ? curiosidade.prev : "Prepare-se para novas missões práticas e aprendizados inéditos!";
    
    window.showModernAlert(
      "🎉 Missão Concluída!",
      `
      <div style="text-align: center; padding: 0.5rem 0;">
        <span style="font-size: 3.2rem; display: block; margin-bottom: 1rem;">🚀</span>
        <h4 style="margin: 0 0 0.5rem; color: #a78bfa; font-size: 1.15rem;">Parabéns! Você concluiu a ${aulaConcluida.title}</h4>
        <p style="font-size: 0.85rem; color: #aaa; margin: 0 0 1.5rem;">Você ganhou XP e subiu na jornada de aprendizado.</p>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.2rem; text-align: left; font-size: 0.88rem;">
          <div style="font-weight: 700; color: #fff; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>📁</span> Nova aula desbloqueada:
          </div>
          <div style="font-weight: 800; color: var(--color-primary-light); font-size: 0.95rem; margin-bottom: 0.6rem;">
            ${proximaAula.title}
          </div>
          <p style="margin: 0; line-height: 1.45; color: #ccc; font-size: 0.82rem;">
            ${previewText}
          </p>
        </div>
      </div>
      `
    );
  }
}

function abrirModalCuriosidade(lesson) {
  const curiosidade = LESSON_CURIOSITIES[lesson.id];
  const bulletList = curiosidade 
    ? curiosidade.bulletPoints.map(point => `<li style="margin-bottom:0.4rem; color: #ccc;">• ${point}</li>`).join("")
    : `
      <li style="margin-bottom:0.4rem; color: #ccc;">• Novas ferramentas interativas</li>
      <li style="margin-bottom:0.4rem; color: #ccc;">• Missões práticas inéditas</li>
      <li style="margin-bottom:0.4rem; color: #ccc;">• Mini games exclusivos</li>
      <li style="margin-bottom:0.4rem; color: #ccc;">• Desafios de produtividade</li>
    `;

  window.showModernAlert(
    "🔒 Aula Bloqueada",
    `
    <div style="text-align: center; padding: 0.5rem 0;">
      <span style="font-size: 3rem; display: block; margin-bottom: 0.8rem;">🔒</span>
      <h4 style="margin: 0 0 0.5rem; color: #f59e0b; font-size: 1.1rem;">Aula Bloqueada</h4>
      <p style="font-size: 0.85rem; color: #aaa; margin: 0 0 1.2rem;">Conclua as missões anteriores para desbloquear esta etapa.</p>
      
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1rem; text-align: left; font-size: 0.82rem;">
        <strong style="color: #fff; display: block; margin-bottom: 0.5rem;">📖 O que você aprenderá nesta aula em breve:</strong>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${bulletList}
        </ul>
      </div>
    </div>
    `
  );
}

function abrirModalAulaFutura(lesson) {
  const curiosidade = LESSON_CURIOSITIES[lesson.id];
  const bulletList = curiosidade 
    ? curiosidade.bulletPoints.map(point => `<li style="margin-bottom:0.4rem; color: #ccc;">• ${point}</li>`).join("")
    : `<li style="margin-bottom:0.4rem; color: #ccc;">• Conteúdo interativo em desenvolvimento</li>`;
    
  const desc = curiosidade ? curiosidade.prev : "Esta aula estará disponível em breve com simuladores práticos integrados.";

  if (lesson.id === "aula-8") {
    window.showModernAlert(
      "🏆 Desafio Final do Módulo 1",
      `
      <div style="text-align: center; padding: 0.5rem 0;">
        <span style="font-size: 3rem; display: block; margin-bottom: 0.8rem;">🏆</span>
        <h4 style="margin: 0 0 0.5rem; color: #f59e0b; font-size: 1.15rem;">Desafio Final do Módulo 1</h4>
        <p style="font-size: 0.85rem; color: #ccc; margin: 0 0 1.5rem;">
          Você provou ser capaz! O Desafio Final é uma avaliação virtual do Módulo 1. Clique abaixo para concluir o Módulo 1 e liberar as medalhas correspondentes.
        </p>
        
        <button id="btn-complete-desafio-final" class="btn" style="background: linear-gradient(135deg, #7c3aed, #a78bfa); color: #fff; font-weight: 700; width: 100%; padding: 0.75rem; border-radius: 10px; border: none; cursor: pointer;">
          🏁 Finalizar Módulo 1
        </button>
      </div>
      `
    );
    
    setTimeout(() => {
      const btn = document.getElementById("btn-complete-desafio-final");
      if (btn) {
        btn.addEventListener("click", async () => {
          const overlay = document.getElementById("modern-alert-modal");
          if (overlay) overlay.remove();
          
          if (!state.completedLessons) state.completedLessons = {};
          state.completedLessons["aula-8"] = true;
          unlockAchievement("windows_explorer");
          unlockAchievement("windows_guardian");
          addXP(100);
          saveState();
          initSidebarMenu();
          
          triggerLessonUnlockNotification("aula-8");
        });
      }
    }, 100);
    return;
  }

  if (lesson.id === "aula-14") {
    window.showModernAlert(
      "🏆 Projeto Profissional - Módulo 2",
      `
      <div style="text-align: center; padding: 0.5rem 0;">
        <span style="font-size: 3rem; display: block; margin-bottom: 0.8rem;">🏆</span>
        <h4 style="margin: 0 0 0.5rem; color: #38bdf8; font-size: 1.15rem;">Projeto Profissional - Módulo 2</h4>
        <p style="font-size: 0.85rem; color: #ccc; margin: 0 0 1.5rem;">
          Você está quase lá! O Projeto Profissional é a consolidação do Módulo 2. Clique abaixo para concluir o Módulo 2.
        </p>
        
        <button id="btn-complete-desafio-final-m2" class="btn" style="background: linear-gradient(135deg, #0284c7, #38bdf8); color: #fff; font-weight: 700; width: 100%; padding: 0.75rem; border-radius: 10px; border: none; cursor: pointer;">
          🏁 Finalizar Módulo 2
        </button>
      </div>
      `
    );
    
    setTimeout(() => {
      const btn = document.getElementById("btn-complete-desafio-final-m2");
      if (btn) {
        btn.addEventListener("click", async () => {
          const overlay = document.getElementById("modern-alert-modal");
          if (overlay) overlay.remove();
          
          if (!state.completedLessons) state.completedLessons = {};
          state.completedLessons["aula-14"] = true;
          addXP(100);
          saveState();
          initSidebarMenu();
          
          triggerLessonUnlockNotification("aula-14");
        });
      }
    }, 100);
    return;
  }

  if (lesson.id === "aula-20") {
    window.showModernAlert(
      "🏆 Projeto Final - Módulo 3",
      `
      <div style="text-align: center; padding: 0.5rem 0;">
        <span style="font-size: 3rem; display: block; margin-bottom: 0.8rem;">🏆</span>
        <h4 style="margin: 0 0 0.5rem; color: #10b981; font-size: 1.15rem;">Projeto Final - Módulo 3</h4>
        <p style="font-size: 0.85rem; color: #ccc; margin: 0 0 1.5rem;">
          O teste supremo! Clique abaixo para finalizar a sua jornada no InforMestre e gerar o seu certificado.
        </p>
        
        <button id="btn-complete-desafio-final-m3" class="btn" style="background: linear-gradient(135deg, #059669, #10b981); color: #fff; font-weight: 700; width: 100%; padding: 0.75rem; border-radius: 10px; border: none; cursor: pointer;">
          🎓 Concluir Curso e Gerar Certificado
        </button>
      </div>
      `
    );
    
    setTimeout(() => {
      const btn = document.getElementById("btn-complete-desafio-final-m3");
      if (btn) {
        btn.addEventListener("click", async () => {
          const overlay = document.getElementById("modern-alert-modal");
          if (overlay) overlay.remove();
          
          if (!state.completedLessons) state.completedLessons = {};
          state.completedLessons["aula-20"] = true;
          unlockAchievement("graduated");
          addXP(200);
          saveState();
          initSidebarMenu();
          
          triggerLessonUnlockNotification("aula-20");
        });
      }
    }, 100);
    return;
  }

  window.showModernAlert(
    lesson.title,
    `
    <div style="text-align: center; padding: 0.5rem 0;">
      <span style="font-size: 3rem; display: block; margin-bottom: 0.8rem;">📁</span>
      <h4 style="margin: 0 0 0.5rem; color: var(--color-primary-light); font-size: 1.15rem;">${lesson.title}</h4>
      <p style="font-size: 0.85rem; color: #ccc; margin: 0 0 1.2rem; line-height:1.45;">${desc}</p>
      
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1rem; text-align: left; font-size: 0.82rem; margin-bottom: 1.2rem;">
        <strong style="color: #fff; display: block; margin-bottom: 0.5rem;">📖 O que você aprenderá nesta aula:</strong>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${bulletList}
        </ul>
      </div>

      <button id="btn-complete-virtual-lesson" class="btn" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10b981; font-weight: 700; width: 100%; padding: 0.65rem; border-radius: 8px; cursor: pointer;">
        🏁 Marcar Aula como Concluída
      </button>
    </div>
    `
  );

  setTimeout(() => {
    const btn = document.getElementById("btn-complete-virtual-lesson");
    if (btn) {
      btn.addEventListener("click", async () => {
        const overlay = document.getElementById("modern-alert-modal");
        if (overlay) overlay.remove();
        
        if (!state.completedLessons) state.completedLessons = {};
        state.completedLessons[lesson.id] = true;
        addXP(50);
        saveState();
        initSidebarMenu();
        
        triggerLessonUnlockNotification(lesson.id);
      });
    }
  }, 100);
}

function initSidebarMenu() {
  const menuNav = document.getElementById("course-menu-nav");
  if (!menuNav) return;
  menuNav.innerHTML = "";

  COURSE_JORNADA.forEach(modulo => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "menu-chapter-group";
    groupDiv.style.marginBottom = "1.2rem";
    
    const moduloStatus = getModuloStatus(modulo.id);
    const isLocked = moduloStatus === "locked";
    
    const header = document.createElement("div");
    header.className = "chapter-title-header";
    header.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.8rem; border-radius: 8px; font-weight: 800; font-size: 0.88rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); margin-bottom: 0.6rem; user-select: none;";
    if (isLocked) {
      header.style.opacity = "0.45";
    }
    
    header.innerHTML = `
      <span style="display: flex; align-items: center; gap: 0.4rem;">
        <span>${modulo.icon}</span>
        <span>${modulo.title}</span>
      </span>
      ${isLocked ? `<span style="font-size: 0.85rem;">🔒</span>` : ""}
    `;
    groupDiv.appendChild(header);

    const ul = document.createElement("ul");
    ul.className = "menu-items-list";
    ul.style.listStyle = "none";
    ul.style.padding = "0";
    ul.style.margin = "0";

    if (isLocked) {
      const li = document.createElement("li");
      li.style.cssText = "padding: 0.5rem 0.8rem; font-size: 0.76rem; color: #888; font-style: italic; border-left: 2px solid #ef4444; margin-left: 0.5rem; margin-bottom: 0.5rem; background: rgba(239, 68, 68, 0.05); border-radius: 4px;";
      li.textContent = modulo.descMessage || "Módulo bloqueado.";
      ul.appendChild(li);
    } else {
      modulo.lessons.forEach(aula => {
        const li = document.createElement("li");
        li.style.marginBottom = "0.4rem";
        
        const status = getLessonStatus(aula.id);
        
        let icon = "🔒";
        let bgStyle = "rgba(255,255,255,0.02)";
        let borderStyle = "rgba(255,255,255,0.05)";
        let colorStyle = "#888";
        let isPulsing = false;
        let isDesafioEffect = false;

        if (status === "completed") {
          icon = "✅";
          bgStyle = "rgba(16, 185, 129, 0.08)";
          borderStyle = "rgba(16, 185, 129, 0.25)";
          colorStyle = "#10b981";
        } else if (status === "in_progress" || status === "available") {
          icon = "🟡";
          bgStyle = "rgba(124, 58, 237, 0.12)";
          borderStyle = "rgba(124, 58, 237, 0.4)";
          colorStyle = "#a78bfa";
          isPulsing = true;
        } else if (status === "locked") {
          icon = "🔒";
          bgStyle = "rgba(255,255,255,0.01)";
          borderStyle = "rgba(255,255,255,0.03)";
          colorStyle = "#555";
        }

        if (aula.isDesafio) {
          if (status === "completed") {
            icon = "🏆";
          } else if (status !== "locked") {
            icon = "🏆";
            isDesafioEffect = true;
            bgStyle = "rgba(245, 158, 11, 0.15)";
            borderStyle = "rgba(245, 158, 11, 0.5)";
            colorStyle = "#fbbf24";
          } else {
            icon = "🏆";
          }
        }

        const linkEl = document.createElement("div");
        linkEl.className = "menu-item-link" + (status === "completed" ? " completed" : "") + (isPulsing ? " pulse-active" : "") + (isDesafioEffect ? " desafio-active" : "");
        linkEl.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.75rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          background: ${bgStyle};
          border: 1px solid ${borderStyle};
          color: ${colorStyle};
          cursor: pointer;
          transition: all 0.2s;
          opacity: ${status === "locked" ? "0.55" : "1"};
        `;

        linkEl.addEventListener("mouseenter", () => {
          if (status !== "locked") {
            linkEl.style.background = "rgba(124, 58, 237, 0.2)";
            linkEl.style.borderColor = "rgba(124, 58, 237, 0.6)";
            linkEl.style.color = "#fff";
          } else {
            linkEl.style.background = "rgba(255, 255, 255, 0.05)";
          }
        });
        
        linkEl.addEventListener("mouseleave", () => {
          linkEl.style.background = bgStyle;
          linkEl.style.borderColor = borderStyle;
          linkEl.style.color = colorStyle;
        });

        linkEl.addEventListener("click", () => {
          if (status === "locked") {
            abrirModalCuriosidade(aula);
          } else {
            if (aula.chapter) {
              const chapterSlides = COURSE_CONTENT.map((s, idx) => ({ ...s, idx })).filter(s => s.chapter === aula.chapter);
              if (chapterSlides.length > 0) {
                const pendente = chapterSlides.find(s => !state.completedSlides[s.id]);
                const targetIdx = pendente ? pendente.idx : chapterSlides[0].idx;
                
                document.getElementById("screen-landing") && document.getElementById("screen-landing").classList.add("screen-hidden");
                document.getElementById("screen-hub") && document.getElementById("screen-hub").classList.add("screen-hidden");
                document.getElementById("screen-app") && document.getElementById("screen-app").classList.remove("screen-hidden");
                
                loadSlide(targetIdx);
              }
            } else {
              abrirModalAulaFutura(aula);
            }
          }
        });

        linkEl.innerHTML = `
          <span style="display: flex; align-items: center; gap: 0.4rem;">
            <span>${icon}</span>
            <span title="${aula.title}">${aula.title}</span>
          </span>
        `;
        li.appendChild(linkEl);
        ul.appendChild(li);
      });
    }

    groupDiv.appendChild(ul);
    menuNav.appendChild(groupDiv);
  });
}

// Toggle chapter collapse state
function toggleChapter(chapterTitle) {
  const current = state.collapsedChapters[chapterTitle];
  const newState = current === undefined ? true : !current;
  state.collapsedChapters[chapterTitle] = newState;
  saveState();
  initSidebarMenu();
}

// Update stats (XP Counter & Level Badge)
function updateStatsUI() {
  document.getElementById("user-xp-counter").textContent = state.xp;
  document.getElementById("user-level-badge").textContent = `Nível ${state.level}`;
  
  // Total achievements unlocked
  const count = Object.keys(state.unlockedAchievements).length;
  document.getElementById("achievement-unlocked-count").textContent = count;
}

function updateProgressUI() {
  let flatLessons = [];
  COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
  const totalLessons = flatLessons.length;
  
  let completedCount = 0;
  flatLessons.forEach(l => {
    if (isLessonCompleted(l)) completedCount++;
  });

  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  const percentEl = document.getElementById("course-progress-percent");
  const barEl = document.getElementById("course-progress-bar");
  
  if (percentEl) percentEl.textContent = `${percent}%`;
  if (barEl) barEl.style.width = `${percent}%`;
}

/**
 * Exibe um alerta moderno e elegante (Substituição premium do alert nativo)
 */
window.showModernAlert = function(title, message, callback) {
  const existing = document.getElementById("modern-alert-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-alert-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions">
        <button class="btn btn-primary" id="modern-alert-close-btn" style="padding: 0.6rem 2rem;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-alert-close-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
};

/**
 * Exibe uma confirmação moderna e elegante (Substituição premium do confirm nativo)
 */
window.showModernConfirm = function(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("modern-confirm-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-confirm-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline btn-small" id="modern-confirm-cancel-btn" style="padding: 0.6rem 1.5rem;">Cancelar</button>
        <button class="btn btn-primary btn-small" id="modern-confirm-ok-btn" style="padding: 0.6rem 1.8rem;">Confirmar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-confirm-ok-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  document.getElementById("modern-confirm-cancel-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onCancel) onCancel();
    }, 200);
  });
};

// ==========================================================================
// SLIDE NAVIGATION & RENDERING
// ==========================================================================
function loadSlide(index) {
  if (index < 0 || index >= COURSE_CONTENT.length) return;
  
  // Save previous slide text area notes
  saveCurrentNotepadText();
  
  state.currentSlideIndex = index;
  saveState();
  
  const item = COURSE_CONTENT[index];
  
  // UI header breadcrumbs
  document.getElementById("header-breadcrumb-chapter").textContent = item.chapter || "Boas-vindas";
  
  // Render inner slide content
  const slideInner = document.getElementById("slide-inner-content");
  slideInner.innerHTML = item.content;
  
  // Update page indicators
  document.getElementById("current-page-num").textContent = index + 1;
  document.getElementById("total-pages-num").textContent = COURSE_CONTENT.length;
  
  // Rebuild sidebar menu to reflect current progress
  initSidebarMenu();
  
  // Highlight active menu item
  document.querySelectorAll(".menu-item-link").forEach(link => link.classList.remove("active"));
  const currentLink = document.getElementById(`menu-item-${index}`);
  if (currentLink) {
    currentLink.classList.add("active");
    // Scroll menu list into view if overflowed
    currentLink.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  
  // Enable/Disable next/prev controls
  document.getElementById("prev-slide-btn").disabled = (index === 0);
  document.getElementById("next-slide-btn").disabled = (index === COURSE_CONTENT.length - 1);
  
  // Load notes related to current slide
  loadNotepadForSlide(item.id);
  
  // Handle interactive widget display
  const simContainer = document.getElementById("dynamic-simulator-container");
  if (item.interactiveId || item.quiz) {
    simContainer.classList.remove("hidden");
    loadSimulator(item.interactiveId || "default", item);
  } else {
    simContainer.classList.add("hidden");
  }
  
  // Mark regular content slides as completed instantly upon viewing
  if (item.type !== "challenge" && item.type !== "evaluation" && !item.interactiveId) {
    markSlideAsCompleted(item.id);
  }
  
  // Check welcome achievement
  if (item.id === "boas-vindas") {
    unlockAchievement("welcome");
  }

  // Scroll workspace content wrapper to top
  document.querySelector(".content-wrapper").scrollTop = 0;
}

// Mark current page as completed
function markSlideAsCompleted(slideId) {
  if (state.completedSlides[slideId]) return; // Already completed
  
  state.completedSlides[slideId] = true;
  
  const slideObj = COURSE_CONTENT.find(c => c.id === slideId);
  
  addXP(10); // Standard read reward
  saveState();
  
  // Verifica se completou todos os slides da aula atual
  if (slideObj && slideObj.chapter) {
    const chapterName = slideObj.chapter;
    const slidesDoCapitulo = COURSE_CONTENT.filter(s => s.chapter === chapterName);
    const todosConcluidos = slidesDoCapitulo.every(s => state.completedSlides[s.id] === true);
    
    if (todosConcluidos) {
      let flatLessons = [];
      COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
      const aulaObj = flatLessons.find(l => l.chapter === chapterName);
      
      if (aulaObj && (!state.completedLessons || !state.completedLessons[aulaObj.id])) {
        if (!state.completedLessons) state.completedLessons = {};
        state.completedLessons[aulaObj.id] = true;
        saveState();
        triggerLessonUnlockNotification(aulaObj.id);
      }
    }
  }
  
  initSidebarMenu();
}

// Setup Global Click Handlers
function initGlobalEvents() {
  // Prev/Next buttons
  document.getElementById("prev-slide-btn").addEventListener("click", () => {
    loadSlide(state.currentSlideIndex - 1);
  });
  
  document.getElementById("next-slide-btn").addEventListener("click", () => {
    loadSlide(state.currentSlideIndex + 1);
  });
  
  // Responsive sidebar toggles
  const sidebar = document.getElementById("app-sidebar");
  document.getElementById("sidebar-toggle-trigger").addEventListener("click", () => {
    sidebar.classList.add("open");
  });
  document.getElementById("sidebar-close-trigger").addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
  
  // Reset current simulator btn
  document.getElementById("reset-simulator-btn").addEventListener("click", () => {
    const item = COURSE_CONTENT[state.currentSlideIndex];
    if (item && item.interactiveId) {
      loadSimulator(item.interactiveId, item, true);
    }
  });

  // Achievements Modal Controls
  const achModal = document.getElementById("achievements-modal");
  document.getElementById("achievements-modal-trigger").addEventListener("click", openAchievementsModal);
  document.getElementById("achievements-close-trigger").addEventListener("click", () => {
    achModal.classList.add("hidden");
  });
  
  // Certificate Modal Close
  document.getElementById("certificate-close-trigger").addEventListener("click", () => {
    document.getElementById("certificate-modal").classList.add("hidden");
  });
  
  document.getElementById("print-certificate-btn").addEventListener("click", () => {
    window.print();
  });
}

/**
 * Exibe um alerta moderno e elegante (Substituição premium do alert nativo)
 */
window.showModernAlert = function(title, message, callback) {
  const existing = document.getElementById("modern-alert-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-alert-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions">
        <button class="btn btn-primary" id="modern-alert-close-btn" style="padding: 0.6rem 2rem;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-alert-close-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
};

/**
 * Exibe uma confirmação moderna e elegante (Substituição premium do confirm nativo)
 */
window.showModernConfirm = function(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("modern-confirm-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-confirm-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline btn-small" id="modern-confirm-cancel-btn" style="padding: 0.6rem 1.5rem;">Cancelar</button>
        <button class="btn btn-primary btn-small" id="modern-confirm-ok-btn" style="padding: 0.6rem 1.8rem;">Confirmar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-confirm-ok-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  document.getElementById("modern-confirm-cancel-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onCancel) onCancel();
    }, 200);
  });
};

// ==========================================================================
// NOTEPAD FUNCTIONALITY
// ==========================================================================
function initNotepad() {
  const drawer = document.getElementById("notepad-panel-drawer");
  const trigger = document.getElementById("notepad-toggle-trigger");
  const closeBtn = document.getElementById("notepad-close-trigger");
  
  trigger.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });
  
  closeBtn.addEventListener("click", () => {
    drawer.classList.remove("open");
  });
  
  // Autosave notes on typing
  const textarea = document.getElementById("notepad-text-area");
  textarea.addEventListener("input", () => {
    const item = COURSE_CONTENT[state.currentSlideIndex];
    if (item) {
      state.notes[item.id] = textarea.value;
      saveState();
    }
  });
  
  // Export Notes Trigger
  document.getElementById("export-notes-txt-btn").addEventListener("click", exportAllNotes);
}

function loadNotepadForSlide(slideId) {
  const textarea = document.getElementById("notepad-text-area");
  textarea.value = state.notes[slideId] || "";
}

function saveCurrentNotepadText() {
  const item = COURSE_CONTENT[state.currentSlideIndex];
  if (item) {
    const textarea = document.getElementById("notepad-text-area");
    state.notes[item.id] = textarea.value;
    saveState();
  }
}

// Export student notes as txt file
function exportAllNotes() {
  let fileText = "=========================================\n";
  fileText += "CURSO DE INFORMÁTICA BÁSICA - PORTAL INFORMESTRE\n";
  fileText += "ANOTAÇÕES CONSOLIDADAS DO ALUNO\n";
  fileText += "=========================================\n\n";
  
  let hasNotes = false;
  COURSE_CONTENT.forEach(slide => {
    const note = state.notes[slide.id];
    if (note && note.trim().length > 0) {
      hasNotes = true;
      fileText += `📖 Página ${slide.page}: ${slide.title}\n`;
      fileText += `Capítulo: ${slide.chapter || "Boas-vindas"}\n`;
      fileText += `-----------------------------------------\n`;
      fileText += `${note.trim()}\n\n`;
    }
  });
  
  if (!hasNotes) {
    alert("Você ainda não escreveu nenhuma anotação para exportar!");
    return;
  }
  
  const blob = new Blob([fileText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Anotacoes_Curso_Informatica.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exibe um alerta moderno e elegante (Substituição premium do alert nativo)
 */
window.showModernAlert = function(title, message, callback) {
  const existing = document.getElementById("modern-alert-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-alert-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions">
        <button class="btn btn-primary" id="modern-alert-close-btn" style="padding: 0.6rem 2rem;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-alert-close-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
};

/**
 * Exibe uma confirmação moderna e elegante (Substituição premium do confirm nativo)
 */
window.showModernConfirm = function(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("modern-confirm-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-confirm-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline btn-small" id="modern-confirm-cancel-btn" style="padding: 0.6rem 1.5rem;">Cancelar</button>
        <button class="btn btn-primary btn-small" id="modern-confirm-ok-btn" style="padding: 0.6rem 1.8rem;">Confirmar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-confirm-ok-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  document.getElementById("modern-confirm-cancel-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onCancel) onCancel();
    }, 200);
  });
};

// ==========================================================================
// ACHIEVEMENTS MODAL RENDERING
// ==========================================================================
function openAchievementsModal() {
  const container = document.getElementById("modal-achievements-list-render");
  container.innerHTML = "";
  
  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = state.unlockedAchievements[ach.id];
    const card = document.createElement("div");
    card.className = `achievement-item-card ${isUnlocked ? '' : 'locked'}`;
    
    card.innerHTML = `
      <div class="achievement-badge-ico">${isUnlocked ? ach.icon : '🔒'}</div>
      <div class="achievement-info">
        <h4>${ach.title}</h4>
        <p class="text-muted">${ach.desc}</p>
      </div>
      <span class="achievement-status-tag">${isUnlocked ? 'Concluída' : 'Bloqueada'}</span>
    `;
    container.appendChild(card);
  });
  
  document.getElementById("achievements-modal").classList.remove("hidden");
}

/**
 * Exibe um alerta moderno e elegante (Substituição premium do alert nativo)
 */
window.showModernAlert = function(title, message, callback) {
  const existing = document.getElementById("modern-alert-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-alert-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions">
        <button class="btn btn-primary" id="modern-alert-close-btn" style="padding: 0.6rem 2rem;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-alert-close-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
};

/**
 * Exibe uma confirmação moderna e elegante (Substituição premium do confirm nativo)
 */
window.showModernConfirm = function(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("modern-confirm-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-confirm-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline btn-small" id="modern-confirm-cancel-btn" style="padding: 0.6rem 1.5rem;">Cancelar</button>
        <button class="btn btn-primary btn-small" id="modern-confirm-ok-btn" style="padding: 0.6rem 1.8rem;">Confirmar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-confirm-ok-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  document.getElementById("modern-confirm-cancel-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onCancel) onCancel();
    }, 200);
  });
};

// ==========================================================================
// SIMULATOR ROUTER & ENGINES
// ==========================================================================
function loadSimulator(simId, slideData, isReset = false) {
  const renderArea = document.getElementById("simulator-content-render");
  renderArea.innerHTML = ""; // Clear
  
  switch (simId) {
    case "timeline":
      initTimelineSimulator(renderArea, isReset);
      break;
    case "hardware-builder":
      initHardwareBuilderSimulator(renderArea, isReset);
      break;
    case "peripheral-connect":
      initPeripheralConnectorSimulator(renderArea, isReset);
      break;
    case "windows-desktop":
      initWindowsSimulator(renderArea, isReset);
      break;
    case "ergonomics":
      initErgonomicsSimulator(renderArea, isReset);
      break;
    case "final-exam":
      initQuizComponent(renderArea, slideData, isReset, true);
      break;
    case "notes-pad":
      initStudentGeneralNotepad(renderArea);
      break;
    case "aula2-revision":
      initAula2RevisionSimulator(renderArea, isReset);
      break;
    case "hardware-tour":
      initHardwareTourSimulator(renderArea, isReset);
      break;
    case "hardware-flow":
      initHardwareFlowSimulator(renderArea, isReset);
      break;
    case "identify-component":
      initIdentifyComponentSimulator(renderArea, isReset);
      break;
    case "match-functions":
      initMatchFunctionsSimulator(renderArea, isReset);
      break;
    case "open-pc-inspect":
      initOpenPcInspectSimulator(renderArea, isReset);
      break;
    case "aula2-mission-final":
      initAula2MissionFinalSimulator(renderArea, isReset);
      break;
    // ---- AULA 3 SIMULATORS ----
    case "hardware-review":
      initHardwareReviewSimulator(renderArea, isReset);
      break;
    case "peripheral-quiz":
      initPeripheralQuizSimulator(renderArea, isReset);
      break;
    case "guess-device":
      initGuessDeviceSimulator(renderArea, isReset);
      break;
    case "output-sorter":
      initOutputSorterSimulator(renderArea, isReset);
      break;
    case "storage-challenge":
      initStorageChallengeSimulator(renderArea, isReset);
      break;
    case "connect-ports":
      initConnectPortsSimulator(renderArea, isReset);
      break;
    case "workspace-builder":
      initWorkspaceBuilderSimulator(renderArea, isReset);
      break;
    case "peripheral-final-quiz":
      initPeripheralFinalQuizSimulator(renderArea, isReset);
      break;
    case "aula3-mission-final":
      initAula3MissionFinalSimulator(renderArea, isReset);
      break;
    // ---- AULA 4 SIMULATORS ----
    case "windows-review":
      initWindowsReviewSimulator(renderArea, isReset);
      break;
    case "os-guess":
      initOsGuessSimulator(renderArea, isReset);
      break;
    case "desktop-explorer":
      initDesktopExplorerSimulator(renderArea, isReset);
      break;
    case "start-menu-hunt":
      initStartMenuHuntSimulator(renderArea, isReset);
      break;
    case "file-organizer":
      initFileOrganizerSimulator(renderArea, isReset);
      break;
    case "office-simulator":
      initOfficeSimulator(renderArea, isReset);
      break;
    case "shortcut-master":
      initShortcutMasterSimulator(renderArea, isReset);
      break;
    case "windows-challenge":
      initWindowsChallengeSimulator(renderArea, isReset);
      break;
    case "windows-final-quiz":
      initQuizComponent(renderArea, slideData, isReset, false);
      break;
    case "explorer-simulator":
      initExplorerSimulator(renderArea, isReset);
      break;
    case "file-classifier":
      initFileClassifierSimulator(renderArea, isReset);
      break;
    case "desktop-customizer":
      initDesktopCustomizerSimulator(renderArea, isReset);
      break;
    case "windows-control-center":
      initWindowsControlCenterSimulator(renderArea, isReset);
      break;
    case "windows-master-challenge":
      initWindowsMasterChallengeSimulator(renderArea, isReset);
      break;
    case "aula4-reflexao-extra":
      initAula4ReflexaoExtra(renderArea, isReset);
      break;
    // ---- AULA 5 SIMULATORS ----
    case "review-mission":
      initReviewMissionSimulator(renderArea, isReset);
      break;
    case "digital-cleanup":
      initDigitalCleanupSimulator(renderArea, isReset);
      break;
    case "folder-architect":
      initFolderArchitectSimulator(renderArea, isReset);
      break;
    case "file-detective":
      initFileDetectiveSimulator(renderArea, isReset);
      break;
    case "digital-mailman":
      initDigitalMailmanSimulator(renderArea, isReset);
      break;
    case "backup-master":
      initBackupMasterSimulator(renderArea, isReset);
      break;
    case "download-upload-challenge":
      initDownloadUploadChallengeSimulator(renderArea, isReset);
      break;
    case "cloud-quest":
      initCloudQuestSimulator(renderArea, isReset);
      break;
    case "office-adventure":
      initOfficeAdventureSimulator(renderArea, isReset);
      break;
    case "aula5-reflexao":
      initAula5Reflexao(renderArea, isReset);
      break;
    default:
      // If it has quiz in metadata (e.g. challenge pages 1.5, 32)
      if (slideData.quiz) {
        initQuizComponent(renderArea, slideData, isReset, false);
      }
      break;
  }
}

// --------------------------------------------------------------------------
// 1. TIMELINE SIMULATOR
// --------------------------------------------------------------------------
const TIMELINE_DATA = [
  { id: 1, gen: "1ª Geração (1940-1956)", title: "Válvulas Eletrônicas", text: "Os computadores de primeira geração ocupavam salas inteiras, consumiam energia equivalente à de um bairro e usavam milhares de válvulas térmicas (como lâmpadas incandescentes) que queimavam a todo momento.", img: "images/vacuum_tube.png" },
  { id: 2, gen: "2ª Geração (1956-1963)", title: "Transistores", text: "A substituição de válvulas por transistores permitiu que os computadores se tornassem até 100 vezes menores, mais baratos, mais rápidos e consumissem muito menos energia elétrica.", img: "images/transistor.png" },
  { id: 3, gen: "3ª Geração (1964-1971)", title: "Circuitos Integrados (Chips)", text: "Com o invento dos Chips de silício, foi possível encapsular milhares de transistores em uma pequena placa de silício. Surgem os primeiros teclados, monitores e os primeiros sistemas operacionais comerciais.", img: "images/integrated_circuit.png" },
  { id: 4, gen: "4ª Geração (1971-Presente)", title: "Microprocessadores", text: "A miniaturização extrema cria a CPU (como a Intel e AMD). Nascem os computadores pessoais domésticos (PCs) da Apple e IBM, e surgem os notebooks e smartphones de hoje em dia.", img: "images/cpu.png" },
  { id: 5, gen: "5ª Geração (Futuro/Presente)", title: "Inteligência Artificial & Nuvem", text: "Baseada na computação paralela massiva, internet das coisas (IoT), processamento quântico e modelos de linguagem generativos que nos auxiliam a trabalhar e aprender.", img: "images/ai_brain.png" }
];

function initTimelineSimulator(container, isReset) {
  if (isReset) {
    sessionStorage.removeItem("timeline_clicked_generations");
  }
  
  let clickedGens = JSON.parse(sessionStorage.getItem("timeline_clicked_generations")) || {};
  
  const simWrapper = document.createElement("div");
  simWrapper.className = "timeline-slider-container";
  
  // Navigation tabs
  const nav = document.createElement("div");
  nav.className = "timeline-nav";
  
  // Slide Content Card
  const contentCard = document.createElement("div");
  contentCard.className = "timeline-content-card";
  
  // Render function
  const selectGen = (index) => {
    clickedGens[index] = true;
    sessionStorage.setItem("timeline_clicked_generations", JSON.stringify(clickedGens));
    
    // Update active nav button
    document.querySelectorAll(".timeline-nav-btn").forEach((btn, idx) => {
      if (idx === index) btn.classList.add("active");
      else btn.classList.remove("active");
    });
    
    const d = TIMELINE_DATA[index];
    contentCard.innerHTML = `
      <div class="timeline-graphic-container">
        <img src="${d.img}" alt="${d.title}" class="timeline-img-asset">
      </div>
      <div class="timeline-text">
        <h4>${d.gen}</h4>
        <h5 style="margin-top:2px; font-weight:600; color:var(--text-primary);">${d.title}</h5>
        <p class="text-small mt-1" style="line-height:1.5;">${d.text}</p>
      </div>
    `;
    
    // Validate if all generations are checked
    if (Object.keys(clickedGens).length === TIMELINE_DATA.length) {
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      unlockAchievement("timeline");
    }
  };
  
  TIMELINE_DATA.forEach((d, idx) => {
    const btn = document.createElement("button");
    btn.className = "timeline-nav-btn";
    btn.textContent = `${idx + 1}ª Gen`;
    btn.addEventListener("click", () => selectGen(idx));
    nav.appendChild(btn);
  });
  
  simWrapper.appendChild(nav);
  simWrapper.appendChild(contentCard);
  container.appendChild(simWrapper);
  
  // Select first item automatically
  selectGen(0);
}

// --------------------------------------------------------------------------
// 2. HARDWARE BUILDER SIMULATOR
// --------------------------------------------------------------------------
const PARTS_INVENTORY = [
  { id: "cpu", name: "Processador (CPU)", detail: "Cérebro do computador", icon: "🧠", target: "cpu" },
  { id: "ram", name: "Memória RAM", detail: "Memória volátil temporária", icon: "💾", target: "ram" },
  { id: "ssd", name: "Armazenamento SSD", detail: "Memória rápida não-volátil", icon: "💽", target: "ssd" },
  { id: "power", name: "Fonte de Alimentação", detail: "Distribui energia convertida", icon: "🔌", target: "power" }
];

function initHardwareBuilderSimulator(container, isReset) {
  let sessionKey = "hardware_builder_state";
  if (isReset) {
    sessionStorage.removeItem(sessionKey);
  }
  
  let assembled = JSON.parse(sessionStorage.getItem(sessionKey)) || {};
  if (assembled.cpu === undefined) assembled.cpu = false;
  if (assembled.ram === undefined) assembled.ram = false;
  if (assembled.ssd === undefined) assembled.ssd = false;
  if (assembled.power === undefined) assembled.power = false;
  if (assembled.booted === undefined) assembled.booted = false;
  if (assembled.hearts === undefined) assembled.hearts = 3;
  if (assembled.failed === undefined) assembled.failed = false;
  
  let selectedPart = null;
  
  // UI Builder Wrapper
  const layout = document.createElement("div");
  layout.className = "builder-layout";
  
  // Left: Motherboard Drawing
  const motherboard = document.createElement("div");
  motherboard.className = "motherboard-canvas";
  
  const updateHeartsDisplay = () => {
    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += i < assembled.hearts ? "❤️" : "💔";
    }
    const display = document.getElementById("builder-hearts-display");
    if (display) display.innerHTML = heartsHtml;
  };

  const triggerFailureState = () => {
    assembled.failed = true;
    sessionStorage.setItem(sessionKey, JSON.stringify(assembled));
    
    document.getElementById("boot-status-label").textContent = "💥 Sobrecarga!";
    document.getElementById("boot-status-label").style.color = "var(--color-danger)";
    
    const monitor = document.getElementById("boot-screen-indicator");
    if (monitor) {
      monitor.textContent = "ERR";
      monitor.style.backgroundColor = "var(--color-danger-soft)";
      monitor.style.color = "var(--color-danger)";
    }
    
    const statusText = document.getElementById("builder-status-text-msg");
    if (statusText) {
      statusText.innerHTML = `
        <h5 style="margin:0; color:var(--color-danger)">💥 Curto-circuito!</h5>
        <span class="text-small text-muted" style="color:var(--color-danger) !important">O processador ou outras peças sofreram curto-circuito devido a conexões incorretas repetidas. Clique em "Reiniciar" no topo para tentar novamente!</span>
      `;
    }
    
    const bootBtn = document.getElementById("pc-boot-action-btn");
    if (bootBtn) bootBtn.disabled = true;
  };

  // Helper to draw slots
  const renderSocket = (key, label, extraClass, icon) => {
    const slot = document.createElement("div");
    slot.className = `mb-socket ${extraClass} ${assembled[key] ? "fitted" : ""}`;
    slot.id = `socket-${key}`;
    
    if (assembled[key]) {
      const partInfo = PARTS_INVENTORY.find(p => p.id === key);
      slot.innerHTML = `
        <div class="socket-installed-img">
          <img src="images/${partInfo.id}.png" alt="${partInfo.name}">
        </div>
        <span class="badge badge-success" style="font-size:0.65rem; margin-top:2px;">Encaixado</span>
      `;
    } else {
      slot.innerHTML = `
        <span class="socket-icon">${icon}</span>
        <span>${label}</span>
      `;
    }
    
    // Slot click handler
    slot.addEventListener("click", () => {
      if (assembled[key] || assembled.failed || assembled.booted) return; // Already installed or failed
      if (!selectedPart) {
        alert("Selecione um componente no painel de inventário à direita primeiro!");
        return;
      }
      
      if (selectedPart.target === key) {
        assembled[key] = true;
        sessionStorage.setItem(sessionKey, JSON.stringify(assembled));
        
        // Re-render this socket
        slot.classList.add("fitted");
        slot.classList.remove("highlighted");
        slot.innerHTML = `
          <div class="socket-installed-img">
            <img src="images/${selectedPart.id}.png" alt="${selectedPart.name}">
          </div>
          <span class="badge badge-success" style="font-size:0.65rem; margin-top:2px;">Encaixado</span>
        `;
        
        // Mark inventory card as installed
        const card = document.getElementById(`part-${selectedPart.id}`);
        card.classList.add("installed");
        card.classList.remove("selected");
        
        selectedPart = null;
        checkBootReady();
      } else {
        // Wrong socket click! Deduct heart!
        assembled.hearts--;
        sessionStorage.setItem(sessionKey, JSON.stringify(assembled));
        updateHeartsDisplay();
        
        if (assembled.hearts <= 0) {
          triggerFailureState();
        } else {
          alert(`❌ Incompatível! Essa peça não encaixa no soquete selecionado. Você perdeu 1 tentativa. Restam ${assembled.hearts} tentativas.`);
        }
      }
    });
    
    motherboard.appendChild(slot);
  };
  
  renderSocket("cpu", "Soquete CPU (Processador)", "socket-cpu", "🔳");
  renderSocket("ram", "Slots de Memória RAM", "socket-ram1", "▤");
  renderSocket("ssd", "Conector M.2 / SATA (SSD)", "socket-ssd", "🎛️");
  renderSocket("power", "Alimentação de Energia (Fonte)", "socket-power", "🔌");
  
  // Right: Inventory of Parts
  const sidebar = document.createElement("div");
  sidebar.className = "builder-inventory";
  sidebar.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
      <h4 style="font-size:1rem; margin:0;">Inventário</h4>
      <div id="builder-hearts-display" style="font-size:0.9rem;"></div>
    </div>
    <p class="text-small text-muted" style="margin-bottom:10px;">Selecione a peça e clique no local correto da placa-mãe.</p>
  `;
  
  const partsGrid = document.createElement("div");
  partsGrid.className = "inventory-parts";
  
  PARTS_INVENTORY.forEach(part => {
    const card = document.createElement("div");
    card.id = `part-${part.id}`;
    card.className = `part-card ${assembled[part.id] ? "installed" : ""}`;
    
    card.innerHTML = `
      <div class="part-img-wrapper">
        <img src="images/${part.id}.png" alt="${part.name}">
      </div>
      <h5>${part.name}</h5>
      <span>${part.detail}</span>
    `;
    
    card.addEventListener("click", () => {
      if (assembled[part.id] || assembled.failed || assembled.booted) return; // Already installed or failed
      
      document.querySelectorAll(".part-card").forEach(c => c.classList.remove("selected"));
      document.querySelectorAll(".mb-socket").forEach(s => s.classList.remove("highlighted"));
      
      if (selectedPart === part) {
        selectedPart = null;
      } else {
        selectedPart = part;
        card.classList.add("selected");
        
        // Highlight destination socket on board
        const dest = document.getElementById(`socket-${part.target}`);
        if (dest) dest.classList.add("highlighted");
      }
    });
    
    partsGrid.appendChild(card);
  });
  
  sidebar.appendChild(partsGrid);
  layout.appendChild(motherboard);
  layout.appendChild(sidebar);
  
  // Bottom: Boot Status Control
  const statusPanel = document.createElement("div");
  statusPanel.className = "builder-status-panel mt-2";
  
  const statusText = document.createElement("div");
  statusText.id = "builder-status-text-msg";
  statusText.innerHTML = `
    <h5 style="margin:0;">Status do Computador</h5>
    <span id="boot-status-label" class="text-small text-muted">Peças ausentes. Complete a montagem.</span>
  `;
  
  const monitor = document.createElement("div");
  monitor.className = "boot-monitor";
  monitor.id = "boot-screen-indicator";
  monitor.textContent = "OFF";
  
  const bootBtn = document.createElement("button");
  bootBtn.className = "btn btn-primary";
  bootBtn.id = "pc-boot-action-btn";
  bootBtn.textContent = "🔌 Ligar Computador";
  bootBtn.disabled = true;
  
  bootBtn.addEventListener("click", () => {
    if (assembled.failed) return;
    assembled.booted = true;
    sessionStorage.setItem(sessionKey, JSON.stringify(assembled));
    
    monitor.classList.add("booting");
    monitor.textContent = "BOOTING";
    
    setTimeout(() => {
      monitor.classList.remove("booting");
      monitor.style.backgroundColor = "#073b24";
      monitor.style.color = "#00ff66";
      monitor.textContent = "ONLINE";
      statusText.innerHTML = `
        <h5 style="margin:0; color:var(--color-accent)">💻 Computador Ligado!</h5>
        <span class="text-small text-muted">Sistema Operacional InforMestre OS carregado com sucesso.</span>
      `;
      bootBtn.textContent = "Ligado";
      bootBtn.disabled = true;
      
      // Completion reward
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      unlockAchievement("hardware");
    }, 1500);
  });
  
  statusPanel.appendChild(statusText);
  statusPanel.appendChild(monitor);
  statusPanel.appendChild(bootBtn);
  
  layout.appendChild(statusPanel);
  container.appendChild(layout);
  
  const checkBootReady = () => {
    if (assembled.failed) {
      triggerFailureState();
      return;
    }
    if (assembled.cpu && assembled.ram && assembled.ssd && assembled.power) {
      bootBtn.disabled = false;
      document.getElementById("boot-status-label").textContent = "Pronto para ligar!";
      document.getElementById("boot-status-label").style.color = "var(--color-warning)";
      
      if (assembled.booted) {
        monitor.style.backgroundColor = "#073b24";
        monitor.style.color = "#00ff66";
        monitor.textContent = "ONLINE";
        statusText.innerHTML = `
          <h5 style="margin:0; color:var(--color-accent)">💻 Computador Ligado!</h5>
          <span class="text-small text-muted">Sistema Operacional InforMestre OS carregado com sucesso.</span>
        `;
        bootBtn.textContent = "Ligado";
        bootBtn.disabled = true;
        markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      }
    }
  };
  
  // Call initially in case they re-loaded from state
  updateHeartsDisplay();
  checkBootReady();
}

// --------------------------------------------------------------------------
// 3. PERIPHERAL CONNECTOR SIMULATOR
// --------------------------------------------------------------------------
const PORT_MATCHES = [
  { id: "keyboard", name: "Teclado (USB)", icon: "⌨️", targetSocket: "usb1", socketName: "Porta USB (Teclado)" },
  { id: "mouse", name: "Mouse (USB)", icon: "🖱️", targetSocket: "usb2", socketName: "Porta USB (Mouse)" },
  { id: "monitor", name: "Monitor (HDMI)", icon: "🖥️", targetSocket: "hdmi", socketName: "Porta HDMI de Vídeo" },
  { id: "ethernet", name: "Roteador (Cabo RJ-45)", icon: "🌐", targetSocket: "rj45", socketName: "Entrada de Rede Ethernet" }
];

function initPeripheralConnectorSimulator(container, isReset) {
  let sessionKey = "peripherals_connector_state";
  if (isReset) {
    sessionStorage.removeItem(sessionKey);
  }
  
  let stateCon = JSON.parse(sessionStorage.getItem(sessionKey)) || {};
  if (stateCon.usb1 === undefined) stateCon.usb1 = false;
  if (stateCon.usb2 === undefined) stateCon.usb2 = false;
  if (stateCon.hdmi === undefined) stateCon.hdmi = false;
  if (stateCon.rj45 === undefined) stateCon.rj45 = false;
  if (stateCon.hearts === undefined) stateCon.hearts = 3;
  if (stateCon.failed === undefined) stateCon.failed = false;
  
  let selectedDevice = null;
  
  const layout = document.createElement("div");
  layout.className = "peripheral-layout";
  
  const updateHeartsDisplay = () => {
    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += i < stateCon.hearts ? "❤️" : "💔";
    }
    const display = document.getElementById("peripheral-hearts-display");
    if (display) display.innerHTML = heartsHtml;
  };

  const triggerFailureState = () => {
    stateCon.failed = true;
    sessionStorage.setItem(sessionKey, JSON.stringify(stateCon));
    
    // Change panel text to failure
    const cabinetPanel = document.querySelector(".pc-ports-panel");
    if (cabinetPanel) {
      cabinetPanel.style.borderColor = "var(--color-danger)";
      cabinetPanel.style.backgroundColor = "rgba(239, 68, 68, 0.05)";
    }
    
    const failAlert = document.createElement("div");
    failAlert.className = "alert alert-danger mt-2 text-center";
    failAlert.innerHTML = `<strong>⚡ Curto-circuito Traseiro!</strong> As conexões elétricas erradas danificaram as portas do gabinete. Clique em "Reiniciar" no topo para começar de novo!`;
    container.appendChild(failAlert);
  };
  
  // Left: devices list
  const devPanel = document.createElement("div");
  devPanel.className = "device-source-list";
  devPanel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
      <h4 style="font-size:1rem; margin:0;">Dispositivos</h4>
      <div id="peripheral-hearts-display" style="font-size:0.9rem;"></div>
    </div>
    <p class="text-small text-muted" style="margin-bottom:10px;">Selecione o periférico e clique na porta traseira correta.</p>
  `;
  
  PORT_MATCHES.forEach(dev => {
    const item = document.createElement("div");
    item.id = `dev-source-${dev.id}`;
    
    // Check if either of the target sockets is connected
    const isPlugged = stateCon[dev.targetSocket] || (dev.id === "keyboard" && stateCon.usb2) || (dev.id === "mouse" && stateCon.usb1);
    
    item.className = `device-source-item ${isPlugged ? "connected" : ""}`;
    item.innerHTML = `
      <span class="device-source-icon">${dev.icon}</span>
      <div style="flex:1;">
        <h5 style="margin:0; font-size:0.8rem;">${dev.name}</h5>
        <span class="text-small text-muted">${dev.socketName}</span>
      </div>
    `;
    
    item.addEventListener("click", () => {
      if (item.classList.contains("connected") || stateCon.failed) return;
      
      document.querySelectorAll(".device-source-item").forEach(i => i.classList.remove("selected"));
      
      if (selectedDevice === dev) {
        selectedDevice = null;
      } else {
        selectedDevice = dev;
        item.classList.add("selected");
      }
    });
    
    devPanel.appendChild(item);
  });
  
  // Right: Rear Cabinet Drawing
  const cabinet = document.createElement("div");
  cabinet.className = "pc-ports-panel";
  cabinet.innerHTML = `
    <h4 style="font-size:0.9rem; color:#fff; text-transform:uppercase; margin-bottom:10px; letter-spacing:0.05em;">Painel Traseiro do Gabinete</h4>
  `;
  
  const renderPort = (portId, label, portClass, desc) => {
    const socket = document.createElement("div");
    socket.id = `port-socket-${portId}`;
    socket.className = `pc-port-socket ${stateCon[portId] ? "plugged" : ""}`;
    
    socket.innerHTML = `
      <div style="text-align:left;">
        <h5 style="margin:0; color:#fff; font-size:0.75rem;">${label}</h5>
        <span class="text-small text-muted" style="font-size:0.65rem;">${desc}</span>
      </div>
      <div class="port-visual-female ${portClass}"></div>
    `;
    
    socket.addEventListener("click", () => {
      if (stateCon[portId] || stateCon.failed) return; // Already plugged or failed
      
      if (!selectedDevice) {
        alert("Selecione um periférico da lista à esquerda primeiro!");
        return;
      }
      
      // Match criteria
      let isMatch = false;
      if (selectedDevice.targetSocket === portId) {
        isMatch = true;
      } else if (selectedDevice.id === "keyboard" && portId === "usb2" && !stateCon.usb2) {
        isMatch = true; // Keyboards can plug to either USB
      } else if (selectedDevice.id === "mouse" && portId === "usb1" && !stateCon.usb1) {
        isMatch = true; // Mouse can plug to either USB
      }
      
      if (isMatch) {
        stateCon[portId] = true;
        sessionStorage.setItem(sessionKey, JSON.stringify(stateCon));
        
        socket.classList.add("plugged");
        socket.querySelector(".port-visual-female").style.backgroundColor = "var(--color-accent)";
        socket.querySelector(".port-visual-female").style.boxShadow = "0 0 10px var(--color-accent)";
        
        const sourceCard = document.getElementById(`dev-source-${selectedDevice.id}`);
        sourceCard.classList.add("connected");
        sourceCard.classList.remove("selected");
        
        selectedDevice = null;
        checkConSuccess();
      } else {
        // Wrong port match! Deduct heart!
        stateCon.hearts--;
        sessionStorage.setItem(sessionKey, JSON.stringify(stateCon));
        updateHeartsDisplay();
        
        if (stateCon.hearts <= 0) {
          triggerFailureState();
        } else {
          alert(`❌ Conector incorreto! O cabo do ${selectedDevice.name} não encaixa na porta ${label}. Você perdeu 1 tentativa. Restam ${stateCon.hearts} tentativas.`);
        }
      }
    });
    
    cabinet.appendChild(socket);
  };
  
  renderPort("usb1", "Porta USB 1 (Superior)", "usb", "Preta, formato retangular chato");
  renderPort("usb2", "Porta USB 2 (Inferior)", "usb", "Preta, formato retangular chato");
  renderPort("hdmi", "Porta HDMI", "hdmi", "Laranja, bordas chanfradas");
  renderPort("rj45", "Conector Ethernet (RJ-45)", "rj45", "Preta, trava de encaixe superior");
  
  layout.appendChild(devPanel);
  layout.appendChild(cabinet);
  container.appendChild(layout);
  
  const checkConSuccess = () => {
    if (stateCon.failed) return;
    const count = Object.values(stateCon).filter(v => v === true).length;
    
    if (count === 4) {
      const finishAlert = document.createElement("div");
      finishAlert.className = "alert alert-success mt-2 text-center";
      finishAlert.innerHTML = `<strong>🏆 Todos os Cabos Conectados!</strong> Mouse, teclado, internet e monitor estão prontos para uso.`;
      container.appendChild(finishAlert);
      
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      unlockAchievement("peripherals");
    }
  };
  
  // Check initially
  updateHeartsDisplay();
  checkConSuccess();
}

// --------------------------------------------------------------------------
// 4. WINDOWS OS SIMULATOR
// --------------------------------------------------------------------------
function initWindowsSimulator(container, isReset) {
  let sessionKey = "windows_simulator_state";
  if (isReset) {
    sessionStorage.removeItem(sessionKey);
  }
  
  let winState = JSON.parse(sessionStorage.getItem(sessionKey)) || {};
  if (winState.folderCreated === undefined) winState.folderCreated = false;
  if (winState.fileMoved === undefined) winState.fileMoved = false;
  if (winState.windowOpen === undefined) winState.windowOpen = false;
  if (winState.startMenuOpen === undefined) winState.startMenuOpen = false;
  if (winState.hearts === undefined) winState.hearts = 3;
  if (winState.failed === undefined) winState.failed = false;
  
  // Draw base desktop screen
  const desktop = document.createElement("div");
  desktop.className = "windows-desktop-frame";
  
  // Icon layout area
  const iconsArea = document.createElement("div");
  iconsArea.className = "desktop-icons-area";
  
  const fileExplorerIcon = document.createElement("div");
  fileExplorerIcon.className = "desktop-icon";
  fileExplorerIcon.innerHTML = `
    <div class="desktop-icon-img">📁</div>
    <div class="desktop-icon-text">Gerenciador</div>
  `;
  
  const recycleIcon = document.createElement("div");
  recycleIcon.className = "desktop-icon";
  recycleIcon.innerHTML = `
    <div class="desktop-icon-img">🗑️</div>
    <div class="desktop-icon-text">Lixeira</div>
  `;
  
  iconsArea.appendChild(fileExplorerIcon);
  iconsArea.appendChild(recycleIcon);
  desktop.appendChild(iconsArea);
  
  // File Explorer Window (Dynamic)
  const windowFrame = document.createElement("div");
  windowFrame.className = "windows-app-window hidden";
  windowFrame.id = "windows-explorer-window";
  
  windowFrame.innerHTML = `
    <div class="window-header-bar">
      <span class="window-title">📂 Gerenciador de Arquivos</span>
      <div class="window-controls-btns">
        <button class="win-btn win-btn-close" id="win-close-action"></button>
        <button class="win-btn win-btn-min"></button>
        <button class="win-btn win-btn-max"></button>
      </div>
    </div>
    <div class="window-body-content">
      <div class="explorer-toolbar">
        <button class="btn btn-secondary btn-small" id="win-create-folder-btn" ${winState.folderCreated ? "disabled" : ""}>➕ Criar Pasta</button>
      </div>
      <div class="explorer-grid" id="explorer-files-grid">
        <!-- Render files here -->
      </div>
    </div>
  `;
  desktop.appendChild(windowFrame);
  
  // Taskbar
  const taskbar = document.createElement("div");
  taskbar.className = "windows-taskbar";
  
  const startBtn = document.createElement("button");
  startBtn.className = "start-btn";
  startBtn.innerHTML = `🏁 Iniciar`;
  
  const infoArea = document.createElement("div");
  infoArea.style.display = "flex";
  infoArea.style.alignItems = "center";
  infoArea.style.gap = "12px";
  
  const attemptsInd = document.createElement("span");
  attemptsInd.id = "windows-attempts-display";
  attemptsInd.style.color = "var(--color-warning)";
  attemptsInd.style.fontSize = "0.7rem";
  attemptsInd.style.fontFamily = "var(--font-display)";
  attemptsInd.style.fontWeight = "700";
  
  const clock = document.createElement("span");
  clock.className = "taskbar-clock";
  
  infoArea.appendChild(attemptsInd);
  infoArea.appendChild(clock);
  
  taskbar.appendChild(startBtn);
  taskbar.appendChild(infoArea);
  desktop.appendChild(taskbar);
  
  // Start menu popup
  const startMenu = document.createElement("div");
  startMenu.className = "start-menu-popup hidden";
  startMenu.innerHTML = `
    <div class="start-menu-item">📝 Bloco de Notas</div>
    <div class="start-menu-item">⚙️ Configurações</div>
    <div class="start-menu-item" style="border-top:1px solid var(--border-soft); color:var(--color-danger)">🔴 Desligar PC</div>
  `;
  desktop.appendChild(startMenu);
  container.appendChild(desktop);
  
  const updateWinHeartsDisplay = () => {
    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += i < winState.hearts ? "❤️" : "💔";
    }
    attemptsInd.innerHTML = "Tentativas: " + heartsHtml;
  };
  
  const triggerWinFailure = () => {
    winState.failed = true;
    saveWinState();
    const body = windowFrame.querySelector(".window-body-content");
    if (body) {
      body.innerHTML = `
        <div style="color:var(--color-danger); text-align:center; padding: 25px 15px;">
          <h4 style="margin:0; color:var(--color-danger)">⚠️ TELA AZUL DE SISTEMA</h4>
          <p class="text-small mt-1" style="color:var(--color-muted) !important">O sistema operacional bloqueou arquivos administrativos devido à perda consecutiva de documentos na Lixeira. Clique em "Reiniciar" para recarregar o S.O.</p>
        </div>
      `;
    }
  };
  
  // -- LISTENERS FOR WINDOWS SIMULATOR --
  
  // Toggle Start Menu
  startBtn.addEventListener("click", (e) => {
    if (winState.failed) return;
    e.stopPropagation();
    winState.startMenuOpen = !winState.startMenuOpen;
    startMenu.classList.toggle("hidden", !winState.startMenuOpen);
  });
  
  desktop.addEventListener("click", () => {
    winState.startMenuOpen = false;
    startMenu.classList.add("hidden");
  });
  
  // Lixeira trap click listener
  recycleIcon.addEventListener("click", () => {
    if (winState.failed || winState.fileMoved) return;
    if (window.selectedWinFile === "Relatorio.docx") {
      winState.hearts--;
      window.selectedWinFile = null;
      document.querySelectorAll(".file-item").forEach(f => f.classList.remove("selected"));
      saveWinState();
      updateWinHeartsDisplay();
      
      if (winState.hearts <= 0) {
        triggerWinFailure();
      } else {
        alert("❌ Alerta! Você moveu o arquivo 'Relatorio.docx' para a Lixeira em vez de colocá-lo na pasta administrativa. Documentos excluídos causam perda de dados! Restam " + winState.hearts + " tentativas.");
      }
    } else {
      alert("Lixeira do Sistema está vazia.");
    }
  });
  
  // Double click icon to open Window
  fileExplorerIcon.addEventListener("dblclick", () => {
    if (winState.failed) return;
    openExplorer();
  });
  
  fileExplorerIcon.addEventListener("click", () => {
    if (winState.failed) return;
    // mobile support: single click to open
    if (window.innerWidth <= 768) openExplorer();
  });
  
  const openExplorer = () => {
    winState.windowOpen = true;
    windowFrame.classList.remove("hidden");
    renderExplorerFiles();
    saveWinState();
  };
  
  // Close Window
  windowFrame.querySelector("#win-close-action").addEventListener("click", () => {
    winState.windowOpen = false;
    windowFrame.classList.add("hidden");
    saveWinState();
  });
  
  // Create Folder Button
  windowFrame.querySelector("#win-create-folder-btn").addEventListener("click", () => {
    if (winState.failed) return;
    winState.folderCreated = true;
    windowFrame.querySelector("#win-create-folder-btn").disabled = true;
    renderExplorerFiles();
    saveWinState();
  });
  
  // File render
  const renderExplorerFiles = () => {
    const grid = document.getElementById("explorer-files-grid");
    if (!grid) return;
    grid.innerHTML = "";
    
    // File
    if (!winState.fileMoved) {
      const file = document.createElement("div");
      file.className = "file-item";
      file.id = "win-movable-file";
      file.setAttribute("draggable", "true");
      file.innerHTML = `
        <span class="file-icon">📄</span>
        <span class="file-name">Relatorio.docx</span>
      `;
      
      // Select click for touch fallback
      file.addEventListener("click", (e) => {
        if (winState.failed) return;
        e.stopPropagation();
        document.querySelectorAll(".file-item").forEach(f => f.classList.remove("selected"));
        file.classList.add("selected");
        window.selectedWinFile = "Relatorio.docx";
      });
      
      grid.appendChild(file);
    }
    
    // Folder
    if (winState.folderCreated) {
      const folder = document.createElement("div");
      folder.className = "file-item folder-dropzone";
      folder.id = "win-destination-folder";
      
      folder.innerHTML = `
        <span class="file-icon">📁</span>
        <span class="file-name">Aulas_Informatica</span>
      `;
      
      if (winState.fileMoved) {
        folder.innerHTML = `
          <span class="file-icon">📂</span>
          <span class="file-name">Aulas_Informatica<br><span style="font-size:0.5rem;color:var(--color-accent)">(Contém Relatório)</span></span>
        `;
      }
      
      // Drop click fallback
      folder.addEventListener("click", () => {
        if (winState.failed) return;
        if (window.selectedWinFile === "Relatorio.docx" && !winState.fileMoved) {
          winState.fileMoved = true;
          window.selectedWinFile = null;
          renderExplorerFiles();
          saveWinState();
          checkSuccess();
        }
      });
      
      grid.appendChild(folder);
    }
  };
  
  const saveWinState = () => {
    sessionStorage.setItem(sessionKey, JSON.stringify(winState));
  };
  
  const checkSuccess = () => {
    if (winState.failed) {
      triggerWinFailure();
      return;
    }
    if (winState.folderCreated && winState.fileMoved) {
      const alertPanel = document.createElement("div");
      alertPanel.className = "alert alert-success mt-2 text-center";
      alertPanel.innerHTML = `<strong>🏆 Desafio Concluído com Sucesso!</strong> Você criou uma pasta organizada e moveu arquivos administrativos corretamente!`;
      container.appendChild(alertPanel);
      
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      unlockAchievement("windows");
    }
  };
  
  // Re-restore state if double clicked before
  if (winState.windowOpen) {
    windowFrame.classList.remove("hidden");
    renderExplorerFiles();
  }
  
  // Live simulated clock
  const updateSimClock = () => {
    const d = new Date();
    clock.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };
  updateSimClock();
  
  updateWinHeartsDisplay();
  checkSuccess();
}

// --------------------------------------------------------------------------
// 5. ERGONOMICS POSTURE SIMULATOR
// --------------------------------------------------------------------------
function initErgonomicsSimulator(container, isReset) {
  let sessionKey = "ergonomics_state";
  if (isReset) {
    sessionStorage.removeItem(sessionKey);
  }
  
  let ergoState = JSON.parse(sessionStorage.getItem(sessionKey)) || {};
  if (ergoState.chairHeight === undefined) ergoState.chairHeight = 20;
  if (ergoState.screenAngle === undefined) ergoState.screenAngle = 45;
  if (ergoState.backSpine === undefined) ergoState.backSpine = 10;
  if (ergoState.completed === undefined) ergoState.completed = false;
  if (ergoState.hearts === undefined) ergoState.hearts = 3;
  if (ergoState.failed === undefined) ergoState.failed = false;
  
  const layout = document.createElement("div");
  layout.className = "ergo-layout";
  
  // Left: visual posture canvas
  const canvasWrapper = document.createElement("div");
  canvasWrapper.className = "ergo-canvas-wrapper";
  
  const visual = document.createElement("div");
  visual.className = "ergo-visual-illustration";
  
  // SVG drawing skeleton (inline SVG matches coordinates to values)
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.maxHeight = "220px";
  
  canvasWrapper.appendChild(visual);
  layout.appendChild(canvasWrapper);
  
  // Right: Sliders panel
  const panel = document.createElement("div");
  panel.className = "ergo-sliders-panel";
  
  const heartsRow = document.createElement("div");
  heartsRow.id = "ergo-hearts-row";
  heartsRow.style.fontSize = "0.95rem";
  heartsRow.style.fontWeight = "700";
  heartsRow.style.marginBottom = "10px";
  panel.appendChild(heartsRow);
  
  const renderSlider = (id, label, min, max, val, textId) => {
    const group = document.createElement("div");
    group.className = "slider-group";
    group.innerHTML = `
      <div style="display:flex; justify-content:space-between;">
        <label for="${id}">${label}</label>
        <span id="${textId}" class="text-small text-muted" style="font-weight:700;">${val}</span>
      </div>
      <input type="range" id="${id}" min="${min}" max="${max}" value="${val}">
    `;
    panel.appendChild(group);
  };
  
  renderSlider("ergo-chair", "Altura da Cadeira", 10, 90, ergoState.chairHeight, "ergo-chair-txt");
  renderSlider("ergo-screen", "Altura do Monitor", 20, 100, ergoState.screenAngle, "ergo-screen-txt");
  renderSlider("ergo-spine", "Postura da Coluna (Encosto)", -20, 45, ergoState.backSpine, "ergo-spine-txt");
  
  const testBtn = document.createElement("button");
  testBtn.className = "btn btn-primary btn-full mt-2";
  testBtn.id = "ergo-test-posture-btn";
  testBtn.textContent = "🧘 Testar Postura";
  panel.appendChild(testBtn);
  
  const ratingBadge = document.createElement("div");
  ratingBadge.className = "posture-badge-rating";
  ratingBadge.textContent = "Ajuste os sliders e clique em Testar Postura!";
  ratingBadge.style.backgroundColor = "var(--bg-surface)";
  ratingBadge.style.color = "var(--text-muted)";
  canvasWrapper.appendChild(ratingBadge);
  
  layout.appendChild(panel);
  container.appendChild(layout);
  
  const updateHeartsDisplay = () => {
    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += i < ergoState.hearts ? "❤️" : "💔";
    }
    heartsRow.innerHTML = "Tentativas: " + heartsHtml;
  };
  
  // Draw skeleton update function
  const updateSkeleton = () => {
    const chairVal = parseInt(document.getElementById("ergo-chair").value);
    const screenVal = parseInt(document.getElementById("ergo-screen").value);
    const spineVal = parseInt(document.getElementById("ergo-spine").value);
    
    ergoState.chairHeight = chairVal;
    ergoState.screenAngle = screenVal;
    ergoState.backSpine = spineVal;
    sessionStorage.setItem(sessionKey, JSON.stringify(ergoState));
    
    document.getElementById("ergo-chair-txt").textContent = chairVal;
    document.getElementById("ergo-screen-txt").textContent = screenVal;
    document.getElementById("ergo-spine-txt").textContent = spineVal + "°";
    
    const aligns = isAligned();
    
    // Draw bones on visual frame using HTML styles dynamically
    visual.innerHTML = `
      <!-- Workstation desk -->
      <div style="position:absolute; width:100px; height:8px; background-color:#868e96; top:130px; left:180px; border-radius:2px;"></div>
      <!-- Chair base -->
      <div style="position:absolute; width:12px; height:${120 - chairVal}px; background-color:#343a40; top:${120 + chairVal}px; left:125px; border-radius:2px;"></div>
      <!-- Chair seat -->
      <div style="position:absolute; width:65px; height:10px; background-color:#1a1a1a; top:${120 + chairVal}px; left:95px; border-radius:4px; transform: rotate(${spineVal / 4}deg)"></div>
      
      <!-- User Head -->
      <div style="position:absolute; width:34px; height:34px; background-color:#ffd8a8; border-radius:50%; border:2px solid #e8590c; top:${chairVal - 20}px; left:${110 + (spineVal * 0.4)}px; transition: all 0.1s;"></div>
      <!-- User Spine line -->
      <div style="position:absolute; width:6px; height:90px; background-color:#e8590c; top:${chairVal + 14}px; left:${124 + (spineVal * 0.2)}px; transform: rotate(${-spineVal}deg); transform-origin: bottom center; transition: all 0.1s; border-radius:3px;"></div>
      
      <!-- Monitor stand -->
      <div style="position:absolute; width:6px; height:${130 - screenVal}px; background-color:#495057; top:${screenVal}px; left:240px;"></div>
      <!-- Monitor body -->
      <div style="position:absolute; width:14px; height:60px; background-color:#1c1e21; border:2px solid #adb5bd; top:${screenVal - 20}px; left:235px; border-radius:2px;"></div>
      
      <!-- Vision line indicator -->
      <div style="position:absolute; height:2px; border-top:1.5px dashed ${aligns ? 'var(--color-accent)' : 'var(--color-danger)'}; width:80px; top:${chairVal - 5}px; left:${135 + (spineVal * 0.4)}px; transform: rotate(${(screenVal - chairVal) * 0.4}deg); transform-origin: left center; transition: all 0.1s;"></div>
    `;
  };
  
  const isAligned = () => {
    const diffScreenChair = Math.abs(ergoState.screenAngle - ergoState.chairHeight);
    return diffScreenChair < 15;
  };
  
  const checkPostureApproval = () => {
    if (ergoState.failed || ergoState.completed) return;
    
    const chair = ergoState.chairHeight;
    const screen = ergoState.screenAngle;
    const spine = ergoState.backSpine;
    
    // Optimal targets:
    // chair ~ 50 (40 to 60)
    // spine ~ 0 (-5 to 10)
    // screen ~ 50 (such that difference with chair is minimal: <= 10)
    const isChairGood = chair >= 40 && chair <= 60;
    const isSpineGood = spine >= -5 && spine <= 10;
    const isScreenGood = Math.abs(screen - chair) <= 10;
    
    if (isChairGood && isSpineGood && isScreenGood) {
      ergoState.completed = true;
      sessionStorage.setItem(sessionKey, JSON.stringify(ergoState));
      
      ratingBadge.className = "posture-badge-rating perfect";
      ratingBadge.innerHTML = "✅ Postura Perfeita! Parabéns! Seu usuário está saudável.";
      ratingBadge.style.backgroundColor = "var(--color-success-bg)";
      ratingBadge.style.color = "var(--color-success)";
      
      testBtn.disabled = true;
      testBtn.textContent = "Concluído";
      
      panel.querySelectorAll('input[type="range"]').forEach(input => input.disabled = true);
      
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      unlockAchievement("ergonomics");
    } else {
      ergoState.hearts--;
      sessionStorage.setItem(sessionKey, JSON.stringify(ergoState));
      updateHeartsDisplay();
      
      if (ergoState.hearts <= 0) {
        ergoState.failed = true;
        sessionStorage.setItem(sessionKey, JSON.stringify(ergoState));
        
        ratingBadge.className = "posture-badge-rating";
        ratingBadge.innerHTML = "💥 Falha! O usuário sentiu dores intensas nas costas e pescoço devido à má postura prolongada. Clique em 'Reiniciar' no topo.";
        ratingBadge.style.backgroundColor = "var(--color-danger-soft)";
        ratingBadge.style.color = "var(--color-danger)";
        
        testBtn.disabled = true;
        panel.querySelectorAll('input[type="range"]').forEach(input => input.disabled = true);
      } else {
        ratingBadge.className = "posture-badge-rating regular";
        ratingBadge.innerHTML = `❌ Postura Incorreta! Você perdeu 1 tentativa. Restam ${ergoState.hearts}. Dica: Alinhe a tela na altura dos olhos e deixe a coluna ereta.`;
        ratingBadge.style.backgroundColor = "var(--color-warning-bg)";
        ratingBadge.style.color = "var(--color-warning)";
      }
    }
  };
  
  testBtn.addEventListener("click", checkPostureApproval);
  
  // Attach listeners
  panel.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener("input", () => {
      if (ergoState.failed || ergoState.completed) return;
      updateSkeleton();
    });
  });
  
  // Restore screen layout if completed/failed previously
  updateSkeleton();
  updateHeartsDisplay();
  
  if (ergoState.completed) {
    ratingBadge.className = "posture-badge-rating perfect";
    ratingBadge.innerHTML = "✅ Postura Perfeita! Parabéns! Seu usuário está saudável.";
    ratingBadge.style.backgroundColor = "var(--color-success-bg)";
    ratingBadge.style.color = "var(--color-success)";
    testBtn.disabled = true;
    testBtn.textContent = "Concluído";
    panel.querySelectorAll('input[type="range"]').forEach(input => input.disabled = true);
  } else if (ergoState.failed) {
    ratingBadge.className = "posture-badge-rating";
    ratingBadge.innerHTML = "💥 Falha! O usuário sentiu dores intensas nas costas e pescoço devido à má postura prolongada. Clique em 'Reiniciar' no topo.";
    ratingBadge.style.backgroundColor = "var(--color-danger-soft)";
    ratingBadge.style.color = "var(--color-danger)";
    testBtn.disabled = true;
    panel.querySelectorAll('input[type="range"]').forEach(input => input.disabled = true);
  }
}

// --------------------------------------------------------------------------
// 6. QUIZ & EVALUATION ENGINE
// --------------------------------------------------------------------------
function initQuizComponent(container, slideData, isReset, isFinalExam = false) {
  const quizQuestions = slideData.quiz;
  const slideId = slideData.id;
  
  if (isReset) {
    delete state.quizProgress[slideId];
    saveState();
  }
  
  // Load or init progress
  if (!state.quizProgress[slideId]) {
    state.quizProgress[slideId] = {
      currentQuestionIndex: 0,
      answers: [],
      completed: false,
      score: 0,
      hearts: 3,
      wrongOptions: []
    };
    saveState();
  } else {
    // Upgrade state if missing hearts/wrongOptions properties
    const q = state.quizProgress[slideId];
    if (q.hearts === undefined) q.hearts = 3;
    if (q.wrongOptions === undefined) q.wrongOptions = [];
    saveState();
  }
  
  const qState = state.quizProgress[slideId];
  
  const renderQuizFrame = () => {
    container.innerHTML = "";
    
    if (qState.completed) {
      // Completed View
      const resultCard = document.createElement("div");
      resultCard.className = "text-center";
      
      const totalQ = quizQuestions.length;
      const pct = Math.round((qState.score / totalQ) * 100);
      
      let msg = "";
      let emoji = "";
      let classStyle = "alert-info";
      
      if (isFinalExam) {
        if (pct >= 80) {
          emoji = "🎉🎓";
          msg = `Parabéns! Você foi aprovado na Avaliação Final com nota <strong>${pct}%</strong>! Seu certificado oficial do curso foi liberado para download.`;
          classStyle = "alert-success";
          unlockAchievement("graduated");
        } else {
          emoji = "😢✍️";
          msg = `Você obteve nota <strong>${pct}%</strong>. Para ser aprovado, você precisa de no mínimo <strong>80%</strong>. Clique em "Reiniciar" no topo para tentar novamente!`;
          classStyle = "alert-danger";
        }
      } else {
        emoji = "✨💪";
        msg = `Desafio concluído! Você obteve <strong>${pct}% de acertos</strong> e absorveu o conteúdo deste capítulo!`;
        classStyle = "alert-success";
      }
      
      resultCard.innerHTML = `
        <div style="font-size:3.5rem; margin-bottom:10px;">${emoji}</div>
        <h3>Desafio Finalizado!</h3>
        <div class="alert ${classStyle} mt-1 mb-2">
          ${msg}
        </div>
        <div class="grid grid-2 gap-1" style="max-width:400px; margin: 0 auto;">
          <div class="card text-center" style="padding:0.8rem">
            <h5 style="margin:0">Acertos</h5>
            <span style="font-size:1.5rem; font-weight:800; color:var(--color-accent)">${qState.score} / ${totalQ}</span>
          </div>
          <div class="card text-center" style="padding:0.8rem">
            <h5 style="margin:0">Experiência</h5>
            <span style="font-size:1.5rem; font-weight:800; color:var(--color-primary-light)">+50 XP</span>
          </div>
        </div>
      `;
      
      if (isFinalExam && pct >= 80) {
        const certBtn = document.createElement("button");
        certBtn.className = "btn btn-primary mt-2";
        certBtn.textContent = "📜 Gerar e Visualizar Certificado";
        certBtn.style.padding = "0.8rem 2rem";
        
        certBtn.addEventListener("click", () => {
          showCertificateModal();
        });
        resultCard.appendChild(certBtn);
      }
      
      container.appendChild(resultCard);
      
      // Mark page complete
      markSlideAsCompleted(slideId);
      return;
    }
    
    // Active Question view
    const qIndex = qState.currentQuestionIndex;
    const currentQ = quizQuestions[qIndex];
    
    const quizDiv = document.createElement("div");
    quizDiv.className = "quiz-widget";
    
    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += i < qState.hearts ? '<span class="quiz-heart">❤️</span>' : '<span class="quiz-heart broken">💔</span>';
    }
    
    quizDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div class="quiz-question-number">Questão ${qIndex + 1} de ${quizQuestions.length}</div>
        <div id="quiz-hearts-box-render" style="font-size: 1rem;">${heartsHtml}</div>
      </div>
      <h4 class="quiz-question-text">${currentQ.question}</h4>
      <div class="quiz-options-list" id="quiz-options-container">
        <!-- Render buttons -->
      </div>
      <div class="quiz-feedback-box hidden" id="quiz-feedback-container">
        <div class="quiz-feedback-title" id="quiz-feedback-title-text"></div>
        <div class="quiz-feedback-text" id="quiz-explanation-text"></div>
      </div>
      <div class="quiz-controls-row">
        <button class="btn btn-primary" id="quiz-next-action-btn" disabled>Confirmar Resposta</button>
      </div>
    `;
    
    container.appendChild(quizDiv);
    
    const optionsContainer = document.getElementById("quiz-options-container");
    const nextBtn = document.getElementById("quiz-next-action-btn");
    const feedbackBox = document.getElementById("quiz-feedback-container");
    
    let selectedOptionIdx = null;
    let answerConfirmed = false;
    
    currentQ.options.forEach((opt, idx) => {
      const optBtn = document.createElement("button");
      optBtn.className = "quiz-option-btn";
      optBtn.innerHTML = opt;
      
      if (qState.wrongOptions && qState.wrongOptions.includes(idx)) {
        optBtn.classList.add("wrong");
        optBtn.disabled = true;
      }
      
      optBtn.addEventListener("click", () => {
        if (answerConfirmed) return;
        
        document.querySelectorAll(".quiz-option-btn").forEach(b => b.classList.remove("selected"));
        optBtn.classList.add("selected");
        selectedOptionIdx = idx;
        nextBtn.disabled = false;
      });
      
      optionsContainer.appendChild(optBtn);
    });
    
    nextBtn.addEventListener("click", () => {
      if (!answerConfirmed) {
        const isCorrect = (selectedOptionIdx === currentQ.correct);
        
        if (isCorrect) {
          answerConfirmed = true;
          nextBtn.textContent = (qIndex + 1 < quizQuestions.length) ? "Próxima Questão" : "Ver Resultados";
          qState.answers[qIndex] = selectedOptionIdx;
          qState.score++;
          
          optionsContainer.childNodes.forEach((btn, idx) => {
            btn.disabled = true;
            btn.classList.remove("selected");
            if (idx === currentQ.correct) {
              btn.classList.add("correct");
            }
          });
          
          feedbackBox.classList.remove("hidden");
          feedbackBox.className = "quiz-feedback-box correct";
          document.getElementById("quiz-feedback-title-text").innerHTML = "🎉 Resposta Correta!";
          document.getElementById("quiz-explanation-text").textContent = currentQ.explanation;
          
          saveState();
        } else {
          // Wrong Answer! Deduct heart!
          qState.hearts--;
          qState.wrongOptions.push(selectedOptionIdx);
          saveState();
          
          // Re-draw hearts
          let heartsHtml = "";
          for (let i = 0; i < 3; i++) {
            heartsHtml += i < qState.hearts ? '<span class="quiz-heart">❤️</span>' : '<span class="quiz-heart broken">💔</span>';
          }
          document.getElementById("quiz-hearts-box-render").innerHTML = heartsHtml;
          
          // Disable wrong button option
          const wrongBtn = optionsContainer.childNodes[selectedOptionIdx];
          wrongBtn.classList.remove("selected");
          wrongBtn.classList.add("wrong");
          wrongBtn.disabled = true;
          nextBtn.disabled = true;
          
          if (qState.hearts > 0) {
            feedbackBox.classList.remove("hidden");
            feedbackBox.className = "quiz-feedback-box wrong";
            document.getElementById("quiz-feedback-title-text").innerHTML = `❌ Resposta Incorreta! (-1 vida)`;
            document.getElementById("quiz-explanation-text").textContent = `Você perdeu uma vida. Restam ${qState.hearts} tentativa(s). Tente selecionar outra resposta da lista.`;
          } else {
            // Out of hearts
            answerConfirmed = true;
            nextBtn.textContent = (qIndex + 1 < quizQuestions.length) ? "Próxima Questão" : "Ver Resultados";
            nextBtn.disabled = false;
            
            optionsContainer.childNodes.forEach((btn, idx) => {
              btn.disabled = true;
              btn.classList.remove("selected");
              if (idx === currentQ.correct) {
                btn.classList.add("correct");
              }
            });
            
            feedbackBox.classList.remove("hidden");
            feedbackBox.className = "quiz-feedback-box wrong";
            document.getElementById("quiz-feedback-title-text").innerHTML = "💔 Suas tentativas acabaram!";
            document.getElementById("quiz-explanation-text").textContent = `A opção em verde era a correta. Explicação: ${currentQ.explanation}`;
          }
        }
      } else {
        // Next page
        qState.hearts = 3;
        qState.wrongOptions = [];
        
        if (qIndex + 1 < quizQuestions.length) {
          qState.currentQuestionIndex++;
          saveState();
          renderQuizFrame();
        } else {
          // Finish quiz
          qState.completed = true;
          saveState();
          addXP(50); // reward quiz complete
          renderQuizFrame();
        }
      }
    });
  };
  
  renderQuizFrame();
}

// --------------------------------------------------------------------------
// 7. NOTES SUMMARY PAD VIEW
// --------------------------------------------------------------------------
function initStudentGeneralNotepad(container) {
  const panel = document.createElement("div");
  panel.className = "card bg-surface border-soft";
  panel.innerHTML = `
    <h4>🗂️ Central de Consolidação de Anotações</h4>
    <p class="text-small text-muted mb-2">Abaixo você pode ver o resumo de todos os apontamentos que fez nas páginas da aula. Clique no botão para fazer o download.</p>
    <div id="central-notes-preview" class="highlight-box" style="white-space: pre-wrap; font-family: var(--font-mono); font-size:0.75rem; max-height:220px; overflow-y:auto; background-color:var(--bg-app);">
      (Carregando anotações...)
    </div>
    <button class="btn btn-primary mt-2" id="central-export-notes-btn">📥 Salvar Apostila de Notas em TXT</button>
  `;
  container.appendChild(panel);
  
  // Format summary
  const preview = document.getElementById("central-notes-preview");
  let summaryText = "";
  COURSE_CONTENT.forEach(slide => {
    const note = state.notes[slide.id];
    if (note && note.trim().length > 0) {
      summaryText += `📖 Página ${slide.page}: ${slide.title}\n> ${note.trim().replace(/\n/g, "\n> ")}\n\n`;
    }
  });
  
  preview.textContent = summaryText || "Você ainda não escreveu nenhuma anotação nas páginas desta aula. Abra a barra lateral de anotações (ícone 📝 no topo) em qualquer lição e digite seus resumos!";
  
  document.getElementById("central-export-notes-btn").addEventListener("click", exportAllNotes);
  markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
}

/**
 * Exibe um alerta moderno e elegante (Substituição premium do alert nativo)
 */
window.showModernAlert = function(title, message, callback) {
  const existing = document.getElementById("modern-alert-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-alert-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions">
        <button class="btn btn-primary" id="modern-alert-close-btn" style="padding: 0.6rem 2rem;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-alert-close-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
};

/**
 * Exibe uma confirmação moderna e elegante (Substituição premium do confirm nativo)
 */
window.showModernConfirm = function(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("modern-confirm-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-confirm-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline btn-small" id="modern-confirm-cancel-btn" style="padding: 0.6rem 1.5rem;">Cancelar</button>
        <button class="btn btn-primary btn-small" id="modern-confirm-ok-btn" style="padding: 0.6rem 1.8rem;">Confirmar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-confirm-ok-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  document.getElementById("modern-confirm-cancel-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onCancel) onCancel();
    }, 200);
  });
};

// ==========================================================================
// CERTIFICATE GENERATION MODAL
// ==========================================================================
function showCertificateModal() {
  const nameInput = prompt("Digite seu nome completo para emissão do certificado:", localStorage.getItem("student_name") || "");
  
  if (nameInput === null) return; // cancelled
  if (nameInput.trim().length === 0) {
    alert("O nome é obrigatório para emissão do certificado!");
    return;
  }
  
  localStorage.setItem("student_name", nameInput.trim());
  
  // Update fields inside printable template
  document.getElementById("cert-student-name-display").textContent = nameInput.trim().toUpperCase();
  
  // Format current local date
  const date = new Date();
  const dateFormatted = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  document.getElementById("cert-date-display").textContent = dateFormatted;
  
  // Generate random authentic looking hash code
  const codeRandom = `INF-${Math.floor(1000 + Math.random() * 9000)}-M1-${date.getFullYear()}`;
  document.getElementById("cert-code-display").textContent = codeRandom;
  
  // Show modal
  document.getElementById("certificate-modal").classList.remove("hidden");
}


// ==========================================================================
// AULA 2 SIMULATORS & MINI-GAMES
// ==========================================================================

// 1. REVISÃO DA AULA 1 (aula2-revision)
function initAula2RevisionSimulator(container, isReset) {
  container.innerHTML = "";
  
  const questions = [
    { q: "Qual parte representa o corpo físico do computador?", opts: ["Software", "Hardware", "Internet"], correct: 1 },
    { q: "O que é considerado um periférico de entrada?", opts: ["Impressora", "Monitor", "Teclado"], correct: 2 },
    { q: "O software principal que gerencia o hardware e fornece a área de trabalho do usuário é o...", opts: ["Navegador", "Sistema Operacional", "Processador"], correct: 1 }
  ];
  
  let currentIdx = 0;
  
  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";
  
  const renderQuestion = () => {
    widget.innerHTML = "";
    if (currentIdx >= questions.length) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">🎯</span>
          <h4 class="mt-1">Revisão Concluída!</h4>
          <p class="text-muted text-small">Excelente! Você relembrou os pontos chaves da última aula. Agora está pronto para avançar para os novos tópicos de hardware!</p>
          <span class="badge badge-success">✓ Revisado</span>
        </div>
      `;
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }
    
    const curr = questions[currentIdx];
    
    const qTitle = document.createElement("h4");
    qTitle.textContent = `Pergunta ${currentIdx + 1}: ${curr.q}`;
    qTitle.style.marginBottom = "1rem";
    widget.appendChild(qTitle);
    
    const optionsDiv = document.createElement("div");
    optionsDiv.style.display = "flex";
    optionsDiv.style.flexDirection = "column";
    optionsDiv.style.gap = "8px";
    
    curr.opts.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        optionsDiv.querySelectorAll("button").forEach(b => b.disabled = true);
        
        if (idx === curr.correct) {
          btn.classList.add("correct");
          const feed = document.createElement("div");
          feed.style.color = "var(--color-success)";
          feed.style.fontSize = "0.85rem";
          feed.style.marginTop = "8px";
          feed.innerHTML = "<strong>Correto!</strong> Bom trabalho.";
          widget.appendChild(feed);
        } else {
          btn.classList.add("wrong");
          const correctBtn = optionsDiv.childNodes[curr.correct];
          correctBtn.classList.add("correct");
          
          const feed = document.createElement("div");
          feed.style.color = "var(--color-danger)";
          feed.style.fontSize = "0.85rem";
          feed.style.marginTop = "8px";
          feed.innerHTML = `<strong>Incorreto!</strong> A resposta certa era: <strong>${curr.opts[curr.correct]}</strong>.`;
          widget.appendChild(feed);
        }
        
        setTimeout(() => {
          currentIdx++;
          renderQuestion();
        }, 2200);
      });
      optionsDiv.appendChild(btn);
    });
    
    widget.appendChild(optionsDiv);
  };
  
  renderQuestion();
  container.appendChild(widget);
}

// 2. TOUR DE HARDWARE INTERNO (hardware-tour)
function initHardwareTourSimulator(container, isReset) {
  container.innerHTML = "";
  
  const tourComponents = [
    { id: "gabinete", name: "Gabinete", icon: "📦", img: "images/popup_gabinete_real.png", desc: "Protege e sustenta fisicamente todas as peças do computador.", cur: "Os primeiros gabinetes eram metálicos e beges. Hoje usam vidro temperado e iluminação RGB.", loc: "Mesa de trabalho, abrigando o PC.", absence: "As peças ficariam soltas e expostas a poeira, acidentes físicos e curtos-circuitos." },
    { id: "motherboard", name: "Placa-Mãe", icon: "🎛️", img: "images/popup_motherboard.png", desc: "Interconecta eletricamente todas as peças e distribui dados.", cur: "Possui trilhas microscópicas de cobre em várias camadas para comunicar os chips.", loc: "Parafusada na lateral interna do gabinete.", absence: "Nenhum componente conseguiria se comunicar; o PC seria inutilizável." },
    { id: "cpu", name: "Processador (CPU)", icon: "🧠", img: "images/popup_cpu_real.png", desc: "O cérebro do PC. Executa cálculos matemáticos e instruções lógicas dos programas.", cur: "Faz bilhões de cálculos por segundo e gera muito calor.", loc: "Encaixado no soquete principal da placa-mãe.", absence: "O computador não liga nem processa nenhuma informação." },
    { id: "ram", name: "Memória RAM", icon: "⚡", img: "images/popup_ram_ddr4.png", desc: "Memória temporária ultra-rápida de trabalho que armazena os programas abertos.", cur: "RAM significa Random Access Memory. Limpa-se completamente ao desligar o PC.", loc: "Encaixada nos slots DIMM ao lado da CPU.", absence: "O computador não consegue dar boot, a tela fica preta e o BIOS emite bipes." },
    { id: "ssd", name: "SSD", icon: "⚡", img: "images/popup_ssd_hd_nvme.png", desc: "Armazena o sistema operacional (Windows) e arquivos de forma definitiva e veloz.", cur: "Usa memória Flash sem peças móveis, lendo dados em até 7000 MB/s.", loc: "Slot M.2 na placa-mãe ou conectado em portas SATA.", absence: "O PC liga mas exibe a mensagem de erro 'Nenhum dispositivo de boot encontrado'." },
    { id: "hd", name: "Disco Rígido (HD)", icon: "💽", img: "images/popup_hd_aberto.png", desc: "Armazenamento secundário tradicional de menor velocidade e custo reduzido.", cur: "Usa pratos magnéticos girando a 7.200 RPM e uma agulha física de leitura.", loc: "Instalado nas gavetas inferiores e conectado via cabo SATA.", absence: "O computador funciona normalmente se houver um SSD contendo o sistema." },
    { id: "fonte", name: "Fonte (PSU)", icon: "🔌", img: "images/power.png", desc: "Converte a corrente da tomada residencial em tensões utilizáveis pelas peças (12V, 5V).", cur: "Protege o computador contra surtos de energia domésticos.", loc: "Na parte traseira superior ou inferior do gabinete.", absence: "O computador não recebe eletricidade e não dá nenhum sinal de vida." },
    { id: "cooler", name: "Cooler", icon: "❄️", img: "images/popup_cooler.png", desc: "Resfria o processador dissipando o calor gerado durante as tarefas.", cur: "Pode ser a ar (Air Cooler) ou usar água gelada selada (Water Cooler).", loc: "Instalado diretamente em cima do processador.", absence: "A CPU aquece demais e desliga sozinha em menos de 10 segundos para não queimar." },
    { id: "gpu", name: "Placa de Vídeo", icon: "🎮", img: "images/popup_gpu.png", desc: "Processa gráficos tridimensionais, jogos e envia imagem ao monitor.", cur: "Possui seu próprio processador (GPU) e memória dedicada de vídeo (VRAM).", loc: "Encaixada no slot PCIe longo da placa-mãe.", absence: "Se o processador não tiver chip gráfico embutido, a tela ficará totalmente sem sinal." },
    { id: "cabos-sata", name: "Cabos SATA", icon: "⛓️", img: "images/popup_cabos_sata.png", desc: "Cabos finos que transmitem dados de HDs e SSDs SATA para a placa-mãe.", cur: "Significa Serial ATA e substituiu as antigas fitas largas cinzas (IDE).", loc: "Conectados entre o HD/SSD e as portas SATA da placa-mãe.", absence: "O computador não consegue ler os arquivos do HD ou leitor óptico correspondente." },
    { id: "cabos-energia", name: "Cabos de Energia", icon: "⚡", img: "images/popup_cabos_energia.png", desc: "Cabos multicoloridos que levam eletricidade da fonte a todas as placas.", cur: "O conector principal da placa-mãe possui 24 pinos individuais.", loc: "Conectados a partir da fonte de alimentação até as peças.", absence: "Mesmo com a fonte ligada, os componentes sem cabo de energia não ligam." }
  ];
  
  if (isReset) {
    sessionStorage.removeItem("aula2_tour_clicked");
  }
  
  let clickedComps = JSON.parse(sessionStorage.getItem("aula2_tour_clicked")) || {};
  
  const layout = document.createElement("div");
  layout.style.display = "grid";
  layout.style.gridTemplateColumns = "220px 1fr";
  layout.style.gap = "16px";
  layout.style.marginTop = "8px";
  
  const navList = document.createElement("div");
  navList.style.display = "flex";
  navList.style.flexDirection = "column";
  navList.style.gap = "6px";
  navList.style.maxHeight = "360px";
  navList.style.overflowY = "auto";
  navList.style.paddingRight = "4px";
  
  const detailPanel = document.createElement("div");
  detailPanel.className = "card bg-surface border-soft";
  detailPanel.style.padding = "1.2rem";
  detailPanel.style.display = "flex";
  detailPanel.style.flexDirection = "column";
  detailPanel.style.justifyContent = "center";
  detailPanel.style.alignItems = "center";
  detailPanel.style.textAlign = "center";
  detailPanel.style.minHeight = "360px";
  
  const renderDetail = (comp) => {
    clickedComps[comp.id] = true;
    sessionStorage.setItem("aula2_tour_clicked", JSON.stringify(clickedComps));
    
    navList.querySelectorAll("button").forEach(btn => {
      if (btn.dataset.id === comp.id) btn.classList.add("active");
      else btn.classList.remove("active");
      
      if (clickedComps[btn.dataset.id]) {
        btn.querySelector(".check-dot").textContent = "✓";
        btn.querySelector(".check-dot").style.color = "var(--color-success)";
      }
    });
    
    detailPanel.innerHTML = `
      <div style="width: 100%; height: 160px; overflow: hidden; border-radius: 8px; margin-bottom: 12px; background: var(--bg-card-dark);">
        <img src="${comp.img}" alt="${comp.name}" style="width: 100%; height: 100%; object-fit: contain; padding: 10px;" />
      </div>
      <h3 style="font-family: var(--font-display); font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
        <span>${comp.icon}</span> ${comp.name}
      </h3>
      <p class="text-small" style="line-height: 1.4; color: var(--text-primary); margin-top: 4px;"><strong>Função:</strong> ${comp.desc}</p>
      <div style="text-align: left; width: 100%; font-size: 0.8rem; display: flex; flex-direction: column; gap: 4px; margin-top: 10px; border-top: 1px solid var(--border-soft); padding-top: 10px;">
        <div>📌 <strong>Onde se instala:</strong> <span class="text-muted">${comp.loc}</span></div>
        <div>💡 <strong>Curiosidade:</strong> <span class="text-muted">${comp.cur}</span></div>
        <div style="color: var(--color-danger);">⚠️ <strong>Se não existir:</strong> <span style="opacity: 0.85;">${comp.absence}</span></div>
      </div>
    `;
    
    if (Object.keys(clickedComps).length === tourComponents.length) {
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
    }
  };
  
  tourComponents.forEach(comp => {
    const btn = document.createElement("button");
    btn.className = "menu-item-link";
    btn.dataset.id = comp.id;
    btn.style.width = "100%";
    btn.style.border = "1px solid var(--border-soft)";
    btn.style.borderRadius = "8px";
    btn.style.padding = "8px 12px";
    btn.style.textAlign = "left";
    btn.style.display = "flex";
    btn.style.justifyContent = "space-between";
    btn.style.alignItems = "center";
    btn.style.cursor = "pointer";
    btn.style.background = "var(--bg-card-dark)";
    
    const isClicked = clickedComps[comp.id] ? "✓" : "";
    btn.innerHTML = `
      <span style="font-size:0.85rem; font-weight:600; color:var(--text-primary);">${comp.icon} ${comp.name}</span>
      <span class="check-dot" style="font-weight:bold; font-size:0.9rem; color:var(--color-primary-light);">${isClicked}</span>
    `;
    
    btn.addEventListener("click", () => renderDetail(comp));
    navList.appendChild(btn);
  });
  
  layout.appendChild(navList);
  layout.appendChild(detailPanel);
  container.appendChild(layout);
  
  detailPanel.innerHTML = `
    <div style="font-size: 4rem;">🔎</div>
    <h4>Tour do Gabinete Interno</h4>
    <p class="text-muted text-small mt-1">Selecione uma peça na lista à esquerda para analisar suas fotos e especificações reais!</p>
    <span class="badge badge-primary mt-1" style="animation: pulseHeart 1.5s infinite alternate;">Escolha um componente</span>
  `;
}

// 3. FLUXO DE INFORMAÇÃO ANIMADO (hardware-flow)
function initHardwareFlowSimulator(container, isReset) {
  container.innerHTML = "";
  
  const steps = [
    { id: 0, title: "1. Ação do Usuário (Mouse)", desc: "Você clica no botão para abrir um aplicativo ou arquivo.", icon: "🖱️", label: "Dispositivo de Entrada envia coordenadas e comando de clique para a placa-mãe." },
    { id: 1, title: "2. O Cérebro em Ação (Processador)", desc: "O Processador recebe a interrupção do clique e decodifica as instruções lógicas.", icon: "🧠", label: "A CPU calcula qual ação deve ser tomada e o que carregar." },
    { id: 2, title: "3. Armazenamento Rápido (Memória RAM)", desc: "A CPU armazena na RAM os blocos lógicos ativos que a janela do programa usará temporariamente.", icon: "⚡", label: "A RAM aloca o espaço de trabalho para que o aplicativo abra sem lentidão." },
    { id: 3, title: "4. Leitura do Disco (SSD)", desc: "O computador puxa as imagens, códigos e arquivos permanentes do aplicativo salvos no SSD.", icon: "💾", label: "O SSD transfere os dados permanentes para a RAM a alta velocidade." },
    { id: 4, title: "5. Processamento Visual (Placa de Vídeo / GPU)", desc: "A placa de vídeo traduz os dados gráficos do aplicativo e calcula a posição de cada pixel e cor.", icon: "🎮", label: "A GPU gera o sinal de vídeo digital de alta definição para as portas de saída." },
    { id: 5, title: "6. Exibição Final (Monitor)", desc: "O monitor recebe o sinal de vídeo via cabo HDMI e acende os pixels na tela para você ver o programa aberto.", icon: "🖥️", label: "O fluxo de informação foi concluído em frações de milionésimo de segundo!" }
  ];
  
  let currentStep = 0;
  
  const flowWrapper = document.createElement("div");
  flowWrapper.style.display = "flex";
  flowWrapper.style.flexDirection = "column";
  flowWrapper.style.gap = "16px";
  flowWrapper.style.marginTop = "8px";
  
  const visualRow = document.createElement("div");
  visualRow.style.display = "flex";
  visualRow.style.justifyContent = "space-between";
  visualRow.style.alignItems = "center";
  visualRow.style.background = "var(--bg-surface)";
  visualRow.style.border = "1px solid var(--border-soft)";
  visualRow.style.borderRadius = "12px";
  visualRow.style.padding = "16px 12px";
  visualRow.style.overflowX = "auto";
  visualRow.style.gap = "8px";
  
  const descBox = document.createElement("div");
  descBox.className = "card bg-card-dark border-soft";
  descBox.style.padding = "1rem";
  descBox.style.textAlign = "center";
  
  const controlRow = document.createElement("div");
  controlRow.style.display = "flex";
  controlRow.style.justifyContent = "space-between";
  controlRow.style.alignItems = "center";
  
  const prevBtn = document.createElement("button");
  prevBtn.className = "btn btn-secondary btn-small";
  prevBtn.textContent = "⬅ Passo Anterior";
  prevBtn.disabled = true;
  
  const nextBtn = document.createElement("button");
  nextBtn.className = "btn btn-primary btn-small";
  nextBtn.textContent = "Avançar Passo ➡️";
  
  const renderFlow = () => {
    visualRow.innerHTML = "";
    
    steps.forEach((s, idx) => {
      const stepDiv = document.createElement("div");
      stepDiv.style.display = "flex";
      stepDiv.style.flexDirection = "column";
      stepDiv.style.alignItems = "center";
      stepDiv.style.padding = "8px";
      stepDiv.style.borderRadius = "8px";
      stepDiv.style.border = "1px solid transparent";
      stepDiv.style.transition = "all 0.3s ease";
      stepDiv.style.flex = "1";
      stepDiv.style.minWidth = "70px";
      
      const isPast = idx < currentStep;
      const isCurrent = idx === currentStep;
      
      if (isCurrent) {
        stepDiv.style.background = "rgba(131,82,255,0.15)";
        stepDiv.style.borderColor = "var(--color-primary)";
        stepDiv.style.transform = "scale(1.05)";
      } else if (isPast) {
        stepDiv.style.background = "rgba(16,185,129,0.08)";
        stepDiv.style.borderColor = "rgba(16,185,129,0.3)";
      }
      
      stepDiv.innerHTML = `
        <div style="font-size: 1.8rem; margin-bottom: 4px; filter: ${isPast || isCurrent ? 'none' : 'grayscale(1) opacity(0.3)'};">${s.icon}</div>
        <span style="font-size: 0.65rem; font-weight: 700; color: ${isCurrent ? 'var(--color-primary-light)' : isPast ? 'var(--color-accent)' : 'var(--text-muted)'}; text-align: center;">${s.title.split(". ")[1]}</span>
      `;
      
      visualRow.appendChild(stepDiv);
      
      if (idx < steps.length - 1) {
        const arrow = document.createElement("div");
        arrow.style.fontSize = "0.9rem";
        arrow.style.fontWeight = "bold";
        arrow.style.color = isPast ? "var(--color-accent)" : "var(--text-muted)";
        arrow.style.opacity = isPast ? "1" : "0.3";
        arrow.textContent = "➔";
        visualRow.appendChild(arrow);
      }
    });
    
    const curr = steps[currentStep];
    descBox.innerHTML = `
      <h4 style="color: var(--color-primary-light); font-family: var(--font-display);">${curr.title}</h4>
      <p class="text-small" style="font-weight: 600; color: var(--text-primary); margin: 6px 0 2px;">${curr.desc}</p>
      <span class="text-muted text-small">${curr.label}</span>
    `;
    
    prevBtn.disabled = (currentStep === 0);
    if (currentStep === steps.length - 1) {
      nextBtn.textContent = "Concluir Animação ✓";
    } else {
      nextBtn.textContent = "Avançar Passo ➡️";
    }
  };
  
  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      renderFlow();
    }
  });
  
  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderFlow();
    } else {
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      addXP(10);
      alert("Fluxo analisado com sucesso! Você ganhou +10 XP.");
    }
  });
  
  controlRow.appendChild(prevBtn);
  controlRow.appendChild(nextBtn);
  
  flowWrapper.appendChild(visualRow);
  flowWrapper.appendChild(descBox);
  flowWrapper.appendChild(controlRow);
  container.appendChild(flowWrapper);
  
  renderFlow();
}

// 4. SIMULADOR IDENTIFIQUE O COMPONENTE (identify-component)
function initIdentifyComponentSimulator(container, isReset) {
  const challenges = [
    { img: "images/popup_ram_ddr3.png", q: "Qual é este componente de hardware interno?", opts: ["SSD M.2", "Fonte de Alimentação", "Memória RAM", "Dissipador de Calor"], correct: 2, tip: "É um módulo verde e fino com contatos dourados, sendo uma memória volátil.", cur: "A RAM armazena temporariamente os programas que estão abertos na tela neste momento!" },
    { img: "images/popup_ssd_hd_nvme.png", q: "Identifique esta unidade de armazenamento ultra-rápida:", opts: ["Processador", "SSD M.2 / SATA", "Placa de Vídeo", "Placa-Mãe"], correct: 1, tip: "Não possui partes móveis mecânicas, sendo até 50x mais rápido que um HD comum.", cur: "SSDs usam chips de memória flash NAND sem motor e agulha de leitura!" },
    { img: "images/popup_cpu_real.png", q: "Qual é este chip quadrado metálico considerado o cérebro do PC?", opts: ["Processador (CPU)", "Memória RAM", "Fonte", "HD"], correct: 0, tip: "Ele realiza todas as contas matemáticas e instruções lógicas.", cur: "A CPU realiza bilhões de ciclos de cálculo por segundo e esquenta muito sob uso!" },
    { img: "images/motherboard.png", q: "Qual é esta grande placa de circuito impresso que conecta tudo?", opts: ["Placa de Vídeo", "Placa-Mãe", "Fonte de Energia", "Gabinete"], correct: 1, tip: "Ela serve como o hub físico onde a CPU, a RAM e as placas se encaixam.", cur: "A Placa-Mãe (Motherboard) possui soquetes e barramentos que ligam eletricamente as peças." },
    { img: "images/power.png", q: "Qual é esta caixa metálica cheia de conectores e cabos coloridos?", opts: ["Cooler", "Gabinete", "Fonte de Alimentação", "SSD SATA"], correct: 2, tip: "Ela converte a corrente alternada da tomada em corrente contínua utilizável pelo PC.", cur: "A Fonte (PSU) alimenta individualmente a placa-mãe, processador e drives de dados." },
    { img: "images/popup_keyboard.png", q: "Este periférico físico de entrada é utilizado para digitar e é um:", opts: ["Monitor", "Teclado", "Impressora", "Mouse"], correct: 1, tip: "Possui teclas com letras, números e comandos especiais.", cur: "Teclados mecânicos oferecem maior precisão e durabilidade com switches individuais." },
    { img: "images/popup_mouse.png", q: "Este dispositivo apontador ergonômico é um:", opts: ["Teclado", "Microfone", "Mouse", "Webcam"], correct: 2, tip: "Tem dois botões e uma rodinha de rolagem (scroll) no topo.", cur: "Mouses ópticos fotografam a superfície milhares de vezes por segundo para mover o cursor." },
    { img: "images/popup_webcam.png", q: "Este periférico de captura de imagem em tempo real é uma:", opts: ["Monitor", "Impressora", "Webcam", "Projetor"], correct: 2, tip: "Fica apoiada no topo do monitor para realizar chamadas de vídeo online.", cur: "Webcams normais capturam vídeo a 30 quadros por segundo." },
    { img: "images/popup_monitor.png", q: "Este periférico de saída de imagem e tela do computador é um:", opts: ["Monitor", "Webcam", "Teclado", "Scanner"], correct: 0, tip: "Permite que você veja as janelas dos programas e o sistema operacional.", cur: "A resolução indica o número de pixels; quanto mais pixels, mais nítida é a imagem!" },
    { img: "images/popup_printer.png", q: "Este periférico de saída de relatórios e mídias físicas é uma:", opts: ["Impressora", "Webcam", "Mouse", "Caixa de Som"], correct: 0, tip: "Transfere arquivos do computador diretamente para o papel.", cur: "Pode usar tecnologia de jato de tinta ou toner aquecido a laser." },
    { img: "images/popup_hd_aberto.png", q: "Este disco rígido magnético convencional de armazenamento em massa é um:", opts: ["SSD M.2", "Disco Rígido (HD)", "Memória RAM", "Processador"], correct: 1, tip: "Contém pratos metálicos que giram a 7.200 rotações por minuto.", cur: "Por ser mecânico, o HD é muito sensível a quedas e pancadas quando está ligado." },
    { img: "images/popup_pendrive.png", q: "Este pequeno dispositivo de armazenamento portátil USB é um:", opts: ["HD Externo", "Pendrive", "Cartão de Memória", "Placa de Vídeo"], correct: 1, tip: "Muito prático para transportar dados no chaveiro ou bolso.", cur: "O pendrive substituiu os antigos disquetes que armazenavam míseros 1.44 MB." },
    { img: "images/popup_microphone.png", q: "Este periférico de captura de áudio analógico é um:", opts: ["Fone de Ouvido", "Caixa de Som", "Microfone", "Webcam"], correct: 2, tip: "Usado para gravar áudio, conversar em chamadas ou enviar comandos de voz.", cur: "Converte as ondas de vibração do ar em impulsos elétricos digitais." },
    { img: "images/popup_speakers.png", q: "Este periférico de saída de som para o ambiente é uma:", opts: ["Caixa de Som", "Microfone", "Webcam", "Teclado"], correct: 0, tip: "Toca os áudios e alertas sonoros do computador.", cur: "As caixas de som dependem da placa de som integrada da placa-mãe." },
    { img: "images/popup_cooler.png", q: "Qual é este componente de refrigeração instalado em cima da CPU?", opts: ["SSD", "Fonte de Alimentação", "Cooler", "Placa-Mãe"], correct: 2, tip: "Possui uma ventoinha e aletas de alumínio para dissipar calor.", cur: "O cooler evita que o processador queime ou trave por superaquecimento!" }
  ];
  
  const slideId = COURSE_CONTENT[state.currentSlideIndex].id;
  
  if (isReset) {
    delete state.quizProgress[slideId];
    saveState();
  }
  
  if (!state.quizProgress[slideId]) {
    state.quizProgress[slideId] = {
      currentQuestionIndex: 0,
      answers: [],
      completed: false,
      score: 0,
      hearts: 3,
      wrongOptions: []
    };
    saveState();
  }
  
  const qState = state.quizProgress[slideId];
  
  const renderChallenge = () => {
    container.innerHTML = "";
    
    if (qState.completed) {
      container.innerHTML = `
        <div class="text-center">
          <span style="font-size:3.5rem;">🎉💪</span>
          <h3>Desafio Concluído!</h3>
          <p class="text-muted text-small mt-1">Você concluiu com sucesso o simulador de identificação de hardware!</p>
          <div class="alert alert-success mt-2" style="max-width:400px; margin: 0 auto;">
            <strong>Pontuação:</strong> ${qState.score} / ${challenges.length} corretas!
          </div>
          <span class="badge badge-success mt-2">+50 XP</span>
        </div>
      `;
      markSlideAsCompleted(slideId);
      return;
    }
    
    if (qState.hearts <= 0) {
      container.innerHTML = `
        <div class="text-center">
          <span style="font-size:3.5rem;">💥💔</span>
          <h3>Gabinete Queimado!</h3>
          <p class="text-muted text-small mt-1">Você errou peças fundamentais demais e causou falhas. O simulador bloqueou.</p>
          <div class="alert alert-danger mt-2" style="max-width:400px; margin: 0 auto;">
            Clique em <strong>Reiniciar Desafio</strong> no topo para tentar de novo com 3 novas vidas.
          </div>
        </div>
      `;
      return;
    }
    
    const currIdx = qState.currentQuestionIndex;
    const curr = challenges[currIdx];
    
    const chalDiv = document.createElement("div");
    chalDiv.style.display = "flex";
    chalDiv.style.flexDirection = "column";
    chalDiv.style.gap = "14px";
    
    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += i < qState.hearts ? '<span class="quiz-heart">❤️</span>' : '<span class="quiz-heart broken">💔</span>';
    }
    
    chalDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Desafio ${currIdx + 1} de ${challenges.length}</span>
        <div style="font-size:1rem;">${heartsHtml}</div>
      </div>
      <div style="display:grid; grid-template-columns: 180px 1fr; gap:16px; align-items:center;">
        <div style="height:140px; border-radius:8px; overflow:hidden; border:1px solid var(--border-soft); background:var(--bg-card-dark); display:flex; align-items:center; justify-content:center;">
          <img src="${curr.img}" alt="Hardware Item" style="width:100%; height:100%; object-fit:contain; padding:8px;" />
        </div>
        <div>
          <h4 style="font-family:var(--font-display); line-height:1.3;">${curr.q}</h4>
          <div id="identify-options-box" style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-top:10px;"></div>
        </div>
      </div>
      <div id="identify-feedback-box" class="quiz-feedback-box hidden">
        <div class="quiz-feedback-title" id="identify-feedback-title"></div>
        <div class="quiz-feedback-text" id="identify-feedback-text"></div>
      </div>
      <div style="display:flex; justify-content:flex-end; margin-top:10px;">
        <button class="btn btn-primary btn-small" id="identify-next-btn" disabled>Avançar</button>
      </div>
    `;
    
    container.appendChild(chalDiv);
    
    const optionsBox = document.getElementById("identify-options-box");
    const feedbackBox = document.getElementById("identify-feedback-box");
    const nextBtn = document.getElementById("identify-next-btn");
    
    let answered = false;
    
    curr.opts.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.style.padding = "10px";
      btn.style.fontSize = "0.8rem";
      btn.textContent = opt;
      
      if (qState.wrongOptions.includes(idx)) {
        btn.classList.add("wrong");
        btn.disabled = true;
      }
      
      btn.addEventListener("click", () => {
        if (answered) return;
        
        if (idx === curr.correct) {
          answered = true;
          qState.score++;
          saveState();
          
          btn.classList.add("correct");
          optionsBox.querySelectorAll("button").forEach(b => b.disabled = true);
          
          feedbackBox.className = "quiz-feedback-box correct";
          feedbackBox.classList.remove("hidden");
          document.getElementById("identify-feedback-title").innerHTML = "🎉 Resposta Correta!";
          document.getElementById("identify-feedback-text").innerHTML = `<strong>Curiosidade:</strong> ${curr.cur}`;
          
          nextBtn.disabled = false;
        } else {
          qState.hearts--;
          qState.wrongOptions.push(idx);
          saveState();
          
          btn.classList.add("wrong");
          btn.disabled = true;
          
          renderChallenge();
          
          const tempFeedback = document.getElementById("identify-feedback-box");
          tempFeedback.className = "quiz-feedback-box wrong";
          tempFeedback.classList.remove("hidden");
          document.getElementById("identify-feedback-title").innerHTML = "❌ Resposta Incorreta! (-1 vida)";
          document.getElementById("identify-feedback-text").innerHTML = `<strong>Dica:</strong> ${curr.tip}`;
        }
      });
      
      optionsBox.appendChild(btn);
    });
    
    nextBtn.addEventListener("click", () => {
      qState.wrongOptions = [];
      if (currIdx + 1 < challenges.length) {
        qState.currentQuestionIndex++;
        saveState();
        renderChallenge();
      } else {
        qState.completed = true;
        saveState();
        addXP(50);
        renderChallenge();
      }
    });
  };
  
  renderChallenge();
}

// 5. MINI GAME ASSOCIE A FUNÇÃO (match-functions)
function initMatchFunctionsSimulator(container, isReset) {
  const matches = [
    { id: "cpu", name: "Processador (CPU)", func: "Executa cálculos matemáticos e instruções lógicas (Cérebro)." },
    { id: "ssd", name: "SSD", func: "Armazena arquivos do sistema e usuário de forma permanente e ultra-rápida." },
    { id: "psu", name: "Fonte de Alimentação", func: "Fornece energia elétrica estável e convertida às peças do computador." },
    { id: "ram", name: "Memória RAM", func: "Memória temporária e volátil que sustenta os aplicativos abertos." },
    { id: "motherboard", name: "Placa-Mãe", func: "Placa de circuito impresso que conecta fisicamente todas as peças." }
  ];
  
  const slideId = COURSE_CONTENT[state.currentSlideIndex].id;
  
  if (isReset) {
    sessionStorage.removeItem(`match_game_${slideId}`);
  }
  
  let gameStore = JSON.parse(sessionStorage.getItem(`match_game_${slideId}`)) || {
    completedMatches: {},
    hearts: 3,
    score: 0,
    done: false
  };
  
  const saveGameStore = () => {
    sessionStorage.setItem(`match_game_${slideId}`, JSON.stringify(gameStore));
  };
  
  const renderGame = () => {
    container.innerHTML = "";
    
    if (gameStore.done) {
      container.innerHTML = `
        <div class="text-center">
          <span style="font-size:3.5rem;">🎮🏆</span>
          <h3>Associação Concluída!</h3>
          <p class="text-muted text-small mt-1">Você associou todas as funções lógicas corretamente!</p>
          <span class="badge badge-success mt-1">+50 XP</span>
        </div>
      `;
      markSlideAsCompleted(slideId);
      return;
    }
    
    if (gameStore.hearts <= 0) {
      container.innerHTML = `
        <div class="text-center">
          <span style="font-size:3.5rem;">💥💔</span>
          <h3>Curto-circuito Lógico!</h3>
          <p class="text-muted text-small mt-1">Você errou associações fundamentais e perdeu as 3 vidas.</p>
          <div class="alert alert-danger mt-2" style="max-width:420px; margin:0 auto;">
            Clique em <strong>Reiniciar Desafio</strong> para recarregar as vidas e tentar novamente.
          </div>
        </div>
      `;
      return;
    }
    
    let heartsHtml = "";
    for (let i = 0; i < 3; i++) {
      heartsHtml += i < gameStore.hearts ? '<span class="quiz-heart">❤️</span>' : '<span class="quiz-heart broken">💔</span>';
    }
    
    const gameDiv = document.createElement("div");
    gameDiv.style.display = "flex";
    gameDiv.style.flexDirection = "column";
    gameDiv.style.gap = "12px";
    
    gameDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Associe o Componente à sua Função</span>
        <div style="font-size:1rem;">${heartsHtml}</div>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:10px;">
        <div id="match-left-column" style="display:flex; flex-direction:column; gap:8px;"></div>
        <div id="match-right-column" style="display:flex; flex-direction:column; gap:8px;"></div>
      </div>
      <div id="match-feedback-box" class="quiz-feedback-box hidden" style="margin-top:10px;">
        <div class="quiz-feedback-title" id="match-feedback-title"></div>
        <div class="quiz-feedback-text" id="match-feedback-text"></div>
      </div>
    `;
    
    container.appendChild(gameDiv);
    
    const leftCol = document.getElementById("match-left-column");
    const rightCol = document.getElementById("match-right-column");
    const feedbackBox = document.getElementById("match-feedback-box");
    
    let selectedLeftId = null;
    let selectedRightId = null;
    
    const rightList = [...matches].sort((a, b) => a.id.localeCompare(b.id));
    
    matches.forEach(m => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.style.padding = "10px";
      btn.style.textAlign = "center";
      btn.innerHTML = `⚙️ ${m.name}`;
      
      if (gameStore.completedMatches[m.id]) {
        btn.classList.add("correct");
        btn.disabled = true;
      }
      
      btn.addEventListener("click", () => {
        leftCol.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedLeftId = m.id;
        checkPair();
      });
      leftCol.appendChild(btn);
    });
    
    rightList.forEach(m => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.style.padding = "10px";
      btn.style.fontSize = "0.78rem";
      btn.style.textAlign = "left";
      btn.innerHTML = `💡 ${m.func}`;
      
      if (gameStore.completedMatches[m.id]) {
        btn.classList.add("correct");
        btn.disabled = true;
      }
      
      btn.addEventListener("click", () => {
        rightCol.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedRightId = m.id;
        checkPair();
      });
      rightCol.appendChild(btn);
    });
    
    const checkPair = () => {
      if (!selectedLeftId || !selectedRightId) return;
      
      if (selectedLeftId === selectedRightId) {
        gameStore.completedMatches[selectedLeftId] = true;
        gameStore.score++;
        
        feedbackBox.className = "quiz-feedback-box correct";
        feedbackBox.classList.remove("hidden");
        document.getElementById("match-feedback-title").textContent = "✓ Conexão Correta!";
        document.getElementById("match-feedback-text").textContent = "Os componentes foram ligados com sucesso.";
        
        selectedLeftId = null;
        selectedRightId = null;
        
        if (gameStore.score === matches.length) {
          gameStore.done = true;
          addXP(50);
        }
        saveGameStore();
        setTimeout(renderGame, 1000);
      } else {
        gameStore.hearts--;
        feedbackBox.className = "quiz-feedback-box wrong";
        feedbackBox.classList.remove("hidden");
        document.getElementById("match-feedback-title").textContent = "❌ Associação Errada!";
        document.getElementById("match-feedback-text").textContent = "Esse componente físico não executa esta função lógica. (-1 vida)";
        
        selectedLeftId = null;
        selectedRightId = null;
        
        saveGameStore();
        setTimeout(renderGame, 1200);
      }
    };
  };
  
  renderGame();
}

// 6. DESAFIO PRÁTICO: COMPUTADOR ABERTO (open-pc-inspect)
function initOpenPcInspectSimulator(container, isReset) {
  const slideId = COURSE_CONTENT[state.currentSlideIndex].id;
  
  const inspectTargets = [
    { key: "cpu", name: "Processador / Cooler", desc: "Clique no Cooler redondo metálico posicionado no centro da placa-mãe.", realImg: "images/popup_cooler.png", specs: "Air Cooler Dissipador de Alumínio, Fan 90mm PWM, TDP 95W. Evita o superaquecimento do Processador." },
    { key: "ram", name: "Memória RAM", desc: "Clique nos slots/pentes verticais posicionados logo à direita do cooler principal.", realImg: "images/popup_ram_ddr4.png", specs: "2x 8GB DDR4 3200MHz Dual Channel. Armazenamento volátil ultra-rápido de trabalho." },
    { key: "ssd", name: "SSD", desc: "Clique no pequeno circuito integrado retangular M.2 instalado abaixo do processador.", realImg: "images/popup_ssd_hd_nvme.png", specs: "SSD M.2 NVMe 512GB PCIe Gen3. Armazenamento permanente de alta velocidade para o Sistema Operacional." },
    { key: "fonte", name: "Fonte de Alimentação", desc: "Clique na grande caixa metálica localizada na base (inferior) do gabinete.", realImg: "images/power.png", specs: "Fonte ATX 500W 80 Plus. Converte a corrente da tomada residencial em tensões utilizáveis (12V, 5V)." },
    { key: "cooler-fan", name: "Cooler de Gabinete (Ventoinha)", desc: "Clique no ventilador exaustor quadrado preso na parede traseira superior do gabinete.", realImg: "images/popup_cooler.png", specs: "Ventoinha Exaustora 120mm. Remove o ar quente de dentro do gabinete de forma contínua." }
  ];
  
  if (isReset) {
    sessionStorage.removeItem(`inspect_${slideId}`);
  }
  
  let inspectState = JSON.parse(sessionStorage.getItem(`inspect_${slideId}`)) || {
    currentIndex: 0,
    completed: false
  };
  
  const saveInspect = () => {
    sessionStorage.setItem(`inspect_${slideId}`, JSON.stringify(inspectState));
  };
  
  const renderInspect = () => {
    container.innerHTML = "";
    
    if (inspectState.completed) {
      container.innerHTML = `
        <div class="text-center" style="padding: 2rem;">
          <span style="font-size:4rem; filter: drop-shadow(0 0 12px var(--color-success));">🎉🏆</span>
          <h3 style="margin-top: 15px; font-family: var(--font-display);">Diagnóstico Concluído!</h3>
          <p class="text-muted text-small">Excelente! Você mapeou e identificou todas as peças físicas internas do gabinete.</p>
          <div class="alert alert-success mt-2" style="max-width:400px; margin: 15px auto;">
            <strong>Recompensa de Hardware:</strong> +50 XP Adicionados!
          </div>
          <span class="badge badge-success">✓ Módulo Concluído</span>
        </div>
      `;
      markSlideAsCompleted(slideId);
      return;
    }
    
    const curr = inspectTargets[inspectState.currentIndex];
    
    const gridDiv = document.createElement("div");
    gridDiv.style.display = "grid";
    gridDiv.style.gridTemplateColumns = "1.2fr 1fr";
    gridDiv.style.gap = "16px";
    gridDiv.style.marginTop = "8px";
    
    const styleBlock = document.createElement("style");
    styleBlock.textContent = `
      .hud-log-row {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--color-primary-light);
        margin: 2px 0;
        opacity: 0.85;
      }
      .hud-title-scanner {
        font-family: var(--font-mono);
        color: var(--color-accent);
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 1px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .pc-hotspot-group {
        transition: transform 0.25s ease, filter 0.25s ease;
      }
      .pc-hotspot-group:hover {
        filter: drop-shadow(0 0 8px rgba(131, 82, 255, 0.6));
      }
      .pc-circuit-trace {
        stroke-dasharray: 8 4;
        animation: circuitFlow 3s linear infinite;
      }
      @keyframes circuitFlow {
        to {
          stroke-dashoffset: -24;
        }
      }
      @keyframes pulseNeon {
        from { stroke-width: 1.5; stroke-opacity: 0.5; }
        to { stroke-width: 3.5; stroke-opacity: 1; }
      }
      .scanner-radar-line {
        animation: radarSweep 4s linear infinite;
      }
      @keyframes radarSweep {
        0% { y: 15; }
        50% { y: 285; }
        100% { y: 15; }
      }
    `;
    document.head.appendChild(styleBlock);
    
    const leftCol = document.createElement("div");
    leftCol.style.position = "relative";
    leftCol.style.display = "flex";
    leftCol.style.flexDirection = "column";
    leftCol.style.gap = "10px";
    
    leftCol.innerHTML = `
      <div class="alert alert-info text-center" style="margin: 0; padding:10px; border-radius: 8px; background: rgba(131,82,255,0.08);">
        <span style="font-size:0.7rem; text-transform:uppercase; font-weight:700; color:var(--color-primary-light);">Alvo ${inspectState.currentIndex + 1} de ${inspectTargets.length}</span>
        <h4 style="margin:4px 0 2px; font-weight:800; font-size:1.1rem;">Localizar: ${curr.name}</h4>
        <p class="text-small text-muted" style="margin:0; font-size:0.75rem;">${curr.desc}</p>
      </div>
      
      <div style="display:flex; justify-content:center; position:relative;">
        <svg id="pc-inspect-svg" viewBox="0 0 500 400" style="width:100%; max-width:440px; height:auto; background:#0b0816; border:2px solid var(--border-color); border-radius:12px; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
          
          <pattern id="hud-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(131, 82, 255, 0.05)" stroke-width="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#hud-grid)" />

          <rect x="10" y="10" width="480" height="380" rx="10" fill="none" stroke="#251e3d" stroke-width="2" />
          <line x1="10" y1="310" x2="490" y2="310" stroke="#251e3d" stroke-width="1.5" stroke-dasharray="4" />
          
          <rect x="40" y="20" width="420" height="270" rx="8" fill="#0d1f14" stroke="#1c4224" stroke-width="2" />
          
          <circle cx="50" cy="30" r="4" fill="#3a423b" stroke="#717a72" stroke-width="1" />
          <circle cx="450" cy="30" r="4" fill="#3a423b" stroke="#717a72" stroke-width="1" />
          <circle cx="50" cy="280" r="4" fill="#3a423b" stroke="#717a72" stroke-width="1" />
          <circle cx="450" cy="280" r="4" fill="#3a423b" stroke="#717a72" stroke-width="1" />
          
          <path class="pc-circuit-trace" d="M 240 135 L 330 135" fill="none" stroke="rgba(217, 168, 0, 0.4)" stroke-width="1.5" />
          <path class="pc-circuit-trace" d="M 240 150 L 240 220" fill="none" stroke="rgba(217, 168, 0, 0.4)" stroke-width="1.5" />
          <path class="pc-circuit-trace" d="M 200 170 L 150 170 L 150 250" fill="none" stroke="rgba(217, 168, 0, 0.3)" stroke-width="1.5" />
          
          <rect x="60" y="200" width="110" height="8" fill="#12131a" stroke="#2e384d" stroke-width="1" />
          <rect x="60" y="240" width="110" height="8" fill="#12131a" stroke="#2e384d" stroke-width="1" />
          <circle cx="160" cy="50" r="5" fill="#525252" stroke="#bbb" stroke-width="0.5" />
          <circle cx="170" cy="50" r="5" fill="#525252" stroke="#bbb" stroke-width="0.5" />
          <circle cx="160" cy="65" r="5" fill="#525252" stroke="#bbb" stroke-width="0.5" />
          <circle cx="370" cy="220" r="5" fill="#525252" stroke="#bbb" stroke-width="0.5" />
          
          <g id="hotspot-fonte" class="pc-hotspot-group" style="cursor:pointer;">
            <rect x="20" y="320" width="160" height="60" rx="4" fill="#1d1e22" stroke="#363945" stroke-width="2" />
            <circle cx="100" cy="350" r="24" fill="#0d0e10" stroke="#484d5c" stroke-width="1.5" />
            <circle cx="100" cy="350" r="18" fill="none" stroke="#484d5c" stroke-width="1" />
            <circle cx="100" cy="350" r="12" fill="none" stroke="#484d5c" stroke-width="1" />
            <path d="M100 350 L84 334 M100 350 L116 366 M100 350 L116 334 M100 350 L84 366" stroke="#2d303b" stroke-width="3" />
            <text x="100" y="353" font-size="9" font-family="var(--font-mono)" font-weight="bold" fill="#7d8499" text-anchor="middle">FONTE ATX</text>
            <path d="M180 350 Q 220 340, 240 290" fill="none" stroke="#e04e4e" stroke-width="2" />
            <path d="M180 352 Q 225 342, 242 290" fill="none" stroke="#e0b14e" stroke-width="2" />
            <path d="M180 348 Q 215 338, 238 290" fill="none" stroke="#333" stroke-width="2.5" />
          </g>
          
          <g id="hotspot-cooler-fan" class="pc-hotspot-group" style="cursor:pointer;">
            <rect x="415" y="40" width="40" height="70" rx="3" fill="#17181c" stroke="#2c2e36" stroke-width="1.5" />
            <circle cx="435" cy="75" r="16" fill="#090a0c" stroke="#565d6e" stroke-width="1" />
            <path d="M 435 75 Q 425 60, 422 62 Q 435 75, 435 75" fill="#4d5363" stroke="#2c2e36" stroke-width="0.5"/>
            <path d="M 435 75 Q 445 90, 448 88 Q 435 75, 435 75" fill="#4d5363" stroke="#2c2e36" stroke-width="0.5"/>
            <path d="M 435 75 Q 450 65, 448 62 Q 435 75, 435 75" fill="#4d5363" stroke="#2c2e36" stroke-width="0.5"/>
            <path d="M 435 75 Q 420 85, 422 88 Q 435 75, 435 75" fill="#4d5363" stroke="#2c2e36" stroke-width="0.5"/>
            <text x="435" y="47" font-size="6" font-family="var(--font-mono)" fill="#7d8499" text-anchor="middle">EXHAUST</text>
          </g>
          
          <g id="hotspot-cpu" class="pc-hotspot-group" style="cursor:pointer;">
            <rect x="180" y="75" width="120" height="110" rx="6" fill="#1d1b26" stroke="#4b3e6b" stroke-width="1.5" />
            <line x1="190" y1="85" x2="190" y2="175" stroke="#433b5c" stroke-width="1.5" />
            <line x1="200" y1="85" x2="200" y2="175" stroke="#433b5c" stroke-width="1.5" />
            <line x1="280" y1="85" x2="280" y2="175" stroke="#433b5c" stroke-width="1.5" />
            <line x1="290" y1="85" x2="290" y2="175" stroke="#433b5c" stroke-width="1.5" />
            
            <circle cx="240" cy="130" r="44" fill="#0f0d1a" stroke="#8352ff" stroke-width="2" />
            <circle cx="240" cy="130" r="34" fill="none" stroke="rgba(131,82,255,0.4)" stroke-dasharray="14 6" stroke-width="3" />
            <circle cx="240" cy="130" r="14" fill="#08070d" stroke="#8352ff" stroke-width="1" />
            <path d="M240 130 L220 110" stroke="#332a4e" stroke-width="4" stroke-linecap="round" />
            <path d="M240 130 L260 150" stroke="#332a4e" stroke-width="4" stroke-linecap="round" />
            <path d="M240 130 L260 110" stroke="#332a4e" stroke-width="4" stroke-linecap="round" />
            <path d="M240 130 L220 150" stroke="#332a4e" stroke-width="4" stroke-linecap="round" />
            <text x="240" y="133" font-size="7" font-family="var(--font-mono)" font-weight="bold" fill="#ab85ff" text-anchor="middle">CPU FAN</text>
          </g>
          
          <g id="hotspot-ram" class="pc-hotspot-group" style="cursor:pointer;">
            <rect x="315" y="75" width="45" height="110" rx="4" fill="#111c12" stroke="#254228" stroke-width="1.5" />
            <line x1="322" y1="80" x2="322" y2="180" stroke="#1d2e1f" stroke-width="2" />
            <line x1="332" y1="80" x2="332" y2="180" stroke="#1d2e1f" stroke-width="2" />
            <line x1="342" y1="80" x2="342" y2="180" stroke="#1d2e1f" stroke-width="2" />
            
            <g>
              <rect x="320" y="85" width="4" height="100" rx="1" fill="#1b1c21" stroke="#3a603c" stroke-width="0.5" />
              <rect x="321" y="95" width="2" height="6" fill="#000" />
              <rect x="321" y="110" width="2" height="6" fill="#000" />
              <rect x="321" y="125" width="2" height="6" fill="#000" />
              <rect x="321" y="140" width="2" height="6" fill="#000" />
              <rect x="321" y="155" width="2" height="6" fill="#000" />
              <rect x="319" y="80" width="6" height="4" fill="#ffffff" />
              <rect x="319" y="186" width="6" height="4" fill="#ffffff" />
            </g>
            <g>
              <rect x="330" y="85" width="4" height="100" rx="1" fill="#1b1c21" stroke="#3a603c" stroke-width="0.5" />
              <rect x="331" y="95" width="2" height="6" fill="#000" />
              <rect x="331" y="110" width="2" height="6" fill="#000" />
              <rect x="331" y="125" width="2" height="6" fill="#000" />
              <rect x="331" y="140" width="2" height="6" fill="#000" />
              <rect x="331" y="155" width="2" height="6" fill="#000" />
              <rect x="329" y="80" width="6" height="4" fill="#ffffff" />
              <rect x="329" y="186" width="6" height="4" fill="#ffffff" />
            </g>
            <text x="338" y="70" font-size="7" font-family="var(--font-mono)" fill="#76c27f" text-anchor="middle">RAM DDR4</text>
          </g>
          
          <g id="hotspot-ssd" class="pc-hotspot-group" style="cursor:pointer;">
            <rect x="195" y="210" width="90" height="26" rx="2" fill="#121317" stroke="#323642" stroke-width="1.5" />
            <rect x="200" y="213" width="80" height="20" rx="1" fill="#122416" stroke="#25422b" stroke-width="0.5" />
            <rect x="205" y="216" width="10" height="14" fill="#1f2229" stroke="#3a3e4a" stroke-width="0.5" />
            <rect x="222" y="216" width="14" height="14" fill="#000" />
            <rect x="240" y="216" width="14" height="14" fill="#000" />
            <line x1="200" y1="216" x2="200" y2="230" stroke="#cca300" stroke-width="1.5" />
            <circle cx="282" cy="223" r="3" fill="#aaa" stroke="#444" stroke-width="0.5" />
            <path d="M 280 223 L 284 223" stroke="#222" stroke-width="0.5" />
            <text x="240" y="204" font-size="7" font-family="var(--font-mono)" fill="#688771" text-anchor="middle">M.2 NVMe</text>
          </g>
          
          <text x="250" y="380" font-size="8" font-family="var(--font-mono)" fill="#2e2652" text-anchor="middle">SYS_MODEL: ANTGRAVITY_PC_V2 // INSPECIONAR</text>
          
          <rect class="scanner-radar-line" x="15" y="15" width="470" height="2" fill="rgba(131, 82, 255, 0.25)" style="filter: drop-shadow(0 0 4px rgba(131, 82, 255, 0.8));" />
          
        </svg>
      </div>
      
      <div id="inspect-alert-box" class="quiz-feedback-box hidden" style="margin: 0; padding:10px;">
        <div id="inspect-alert-text" style="font-weight:700; font-size:0.85rem; text-align:center;"></div>
      </div>
    `;
    
    const rightCol = document.createElement("div");
    rightCol.className = "card bg-card-dark border-soft";
    rightCol.style.padding = "1rem";
    rightCol.style.display = "flex";
    rightCol.style.flexDirection = "column";
    rightCol.style.gap = "12px";
    rightCol.style.minHeight = "390px";
    
    rightCol.innerHTML = `
      <div class="hud-title-scanner">
        <span style="display:inline-block; width:8px; height:8px; background:var(--color-accent); border-radius:50%; animation: pulseHeart 1s infinite alternate;"></span>
        Console do Analisador de Hardware
      </div>
      
      <div style="width:100%; height:130px; border-radius:8px; border:1.5px solid var(--border-color); background:#07050d; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);">
        <img id="hud-component-photo" src="images/logo_icon.png" style="width:100%; height:100%; object-fit:contain; padding:8px; opacity:0.3; transition: opacity 0.3s ease, transform 0.3s ease;" />
        <div id="hud-photo-overlay-label" style="position:absolute; bottom:6px; left:6px; background:rgba(0,0,0,0.8); border:1px solid var(--border-color); border-radius:4px; padding:2px 6px; font-family:var(--font-mono); font-size:0.6rem; color:var(--text-muted);">
          STATUS: OCIOSO
        </div>
      </div>
      
      <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:6px; padding:10px; min-height:85px;">
        <h5 id="hud-component-name" style="margin:0 0 4px; font-weight:700; font-size:0.85rem; color:var(--color-primary-light);">Selecione ou passe o mouse</h5>
        <p id="hud-component-specs" class="text-small text-muted" style="margin:0; font-size:0.75rem; line-height:1.35;">Mova o cursor sobre as peças do computador aberto na esquerda para iniciar o scanner molecular de hardware e ler dados técnicos.</p>
      </div>
      
      <div id="hud-log-console" style="background:#090712; border:1px solid rgba(131,82,255,0.15); border-radius:6px; padding:8px; font-family:var(--font-mono); height:110px; overflow-y:auto; display:flex; flex-direction:column; gap:2px; box-shadow: inset 0 0 8px rgba(0,0,0,0.8);">
        <div class="hud-log-row" style="color:var(--text-muted);">[SYS]: Analisador inicializado com sucesso.</div>
        <div class="hud-log-row" style="color:var(--text-muted);">[SYS]: Aguardando interação do operador...</div>
      </div>
    `;
    
    gridDiv.appendChild(leftCol);
    gridDiv.appendChild(rightCol);
    container.appendChild(gridDiv);
    
    const hudPhoto = document.getElementById("hud-component-photo");
    const hudOverlayLabel = document.getElementById("hud-photo-overlay-label");
    const hudName = document.getElementById("hud-component-name");
    const hudSpecs = document.getElementById("hud-component-specs");
    const hudConsole = document.getElementById("hud-log-console");
    const alertBox = document.getElementById("inspect-alert-box");
    const alertText = document.getElementById("inspect-alert-text");
    
    const writeLog = (text, type = "info") => {
      const row = document.createElement("div");
      row.className = "hud-log-row";
      
      const time = new Date().toLocaleTimeString().split(" ")[0];
      
      if (type === "success") {
        row.style.color = "var(--color-success)";
        row.textContent = `[${time}] [OK]: ${text}`;
      } else if (type === "error") {
        row.style.color = "var(--color-danger)";
        row.textContent = `[${time}] [ERR]: ${text}`;
      } else {
        row.style.color = "var(--color-primary-light)";
        row.textContent = `[${time}] [SCAN]: ${text}`;
      }
      
      hudConsole.appendChild(row);
      hudConsole.scrollTop = hudConsole.scrollHeight;
    };
    
    const componentDetails = {
      cpu: {
        name: "Cooler & Processador (CPU)",
        img: "images/popup_cooler.png",
        specs: "Cooler refrigerador a ar com aletas de alumínio de alta condutividade térmica e pasta térmica integrada sobre a CPU.",
        log: "Verificando ventoinha... RPM: 1840. Temperatura central do processador estável em 39°C."
      },
      ram: {
        name: "Memória RAM DDR4",
        img: "images/popup_ram_ddr4.png",
        specs: "Dois módulos Dual-Channel instalados de forma paralela. Frequência nominal: 3200MHz. Voltagem: 1.35V.",
        log: "Testando endereçamento de células... OK. 16384 MB de memória alocados para o sistema."
      },
      ssd: {
        name: "SSD M.2 NVMe",
        img: "images/popup_ssd_hd_nvme.png",
        specs: "Unidade de estado sólido conectada diretamente à trilha PCIe. Temperatura do controlador em 44°C. Vida útil restante: 99%.",
        log: "Lendo registro SMART... OK. Velocidade de transferência verificada: 3.1 GB/s."
      },
      fonte: {
        name: "Fonte de Alimentação ATX (PSU)",
        img: "images/power.png",
        specs: "Distribuidor central de voltagem. Proteções contra sobrecarga e curto-circuitos ativas. Eficiência Bronze registrada.",
        log: "Mapeando trilhas de alimentação... Linhas 12V estáveis a 12.12V. Temperatura da bobina nominal."
      },
      "cooler-fan": {
        name: "Ventoinha do Gabinete",
        img: "images/popup_cooler.png",
        specs: "Cooler traseiro de exaustão silenciosa. Auxilia a circulação de ar frio interna repelindo o ar superaquecido.",
        log: "Fluxo de ventilação activa detectada. Exaustor operando a 1200 RPM sem obstruções."
      }
    };
    
    const setupHotspot = (key) => {
      const element = document.getElementById(`hotspot-${key}`);
      if (!element) return;
      
      const details = componentDetails[key];
      
      element.addEventListener("mouseenter", () => {
        hudPhoto.src = details.img;
        hudPhoto.style.opacity = "1";
        hudPhoto.style.transform = "scale(1.05)";
        
        hudOverlayLabel.textContent = `COMPONENTE: ${key.toUpperCase()}`;
        hudOverlayLabel.style.color = "var(--color-accent)";
        
        hudName.textContent = details.name;
        hudSpecs.textContent = details.specs;
        
        writeLog(details.log, "info");
      });
      
      element.addEventListener("mouseleave", () => {
        hudPhoto.style.opacity = "0.3";
        hudPhoto.style.transform = "scale(1)";
        hudOverlayLabel.textContent = `STATUS: MONITORANDO`;
        hudOverlayLabel.style.color = "var(--text-muted)";
      });
      
      element.addEventListener("click", () => {
        if (key === curr.key) {
          alertBox.className = "quiz-feedback-box correct";
          alertBox.classList.remove("hidden");
          alertText.textContent = `✓ Correto! Você localizou o(a) ${curr.name}.`;
          
          writeLog(`Alvo '${curr.name}' identificado com sucesso!`, "success");
          
          const rects = element.querySelectorAll("rect, circle");
          rects.forEach(r => {
            r.setAttribute("stroke", "var(--color-success)");
            r.style.filter = "drop-shadow(0 0 6px var(--color-success))";
          });
          
          setTimeout(() => {
            if (inspectState.currentIndex + 1 < inspectTargets.length) {
              inspectState.currentIndex++;
              saveInspect();
              renderInspect();
            } else {
              inspectState.completed = true;
              saveInspect();
              addXP(50);
              renderInspect();
            }
          }, 1500);
        } else {
          alertBox.className = "quiz-feedback-box wrong";
          alertBox.classList.remove("hidden");
          alertText.textContent = `❌ Tente novamente! Você clicou em: ${details.name}. Procure pelo: ${curr.name}.`;
          
          writeLog(`Erro de identificação! Operador clicou no componente errado.`, "error");
          
          const rects = element.querySelectorAll("rect, circle");
          const originalStrokes = [];
          rects.forEach(r => {
            originalStrokes.push({ elem: r, stroke: r.getAttribute("stroke") });
            r.setAttribute("stroke", "var(--color-danger)");
            r.style.filter = "drop-shadow(0 0 6px var(--color-danger))";
          });
          
          setTimeout(() => {
            originalStrokes.forEach(item => {
              item.elem.setAttribute("stroke", item.stroke || "none");
              item.elem.style.filter = "";
            });
          }, 1000);
        }
      });
    };
    
    setupHotspot("cpu");
    setupHotspot("ram");
    setupHotspot("ssd");
    setupHotspot("fonte");
    setupHotspot("cooler-fan");
  };
  
  renderInspect();
}

// 7. MISSÃO FINAL: SEU PC IDEAL (aula2-mission-final)
function initAula2MissionFinalSimulator(container, isReset) {
  container.innerHTML = "";
  
  const slideId = COURSE_CONTENT[state.currentSlideIndex].id;
  const currentSavedText = state.notes[slideId] || "";
  
  const wrap = document.createElement("div");
  wrap.className = "card bg-surface border-soft mt-1";
  wrap.style.padding = "1.2rem";
  
  wrap.innerHTML = `
    <h4>📝 Formulário da Missão Final</h4>
    <p class="text-small text-muted mb-2">Resuma abaixo quais componentes são vitais para o computador de estudos que você planejou (Ex: RAM, SSD, Processador) e a justificativa técnica.</p>
    <textarea id="mission-final-textarea" style="width:100%; height:120px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card-dark); color:var(--text-primary); padding:10px; font-family:var(--font-body); font-size:0.85rem; margin-bottom:12px; resize:none;" placeholder="Digite aqui sua resposta sobre o seu PC ideal...">${currentSavedText}</textarea>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span id="mission-final-save-status" class="text-small" style="color:var(--color-primary-light); font-weight:700;"></span>
      <button class="btn btn-primary btn-small" id="mission-final-save-btn">💾 Salvar na Minha Apostila</button>
    </div>
  `;
  
  container.appendChild(wrap);
  
  const textarea = document.getElementById("mission-final-textarea");
  const saveBtn = document.getElementById("mission-final-save-btn");
  const statusSpan = document.getElementById("mission-final-save-status");
  
  saveBtn.addEventListener("click", () => {
    const textVal = textarea.value.trim();
    if (textVal.length === 0) {
      alert("Por favor, digite sua reflexão antes de salvar!");
      return;
    }
    
    state.notes[slideId] = textVal;
    saveState();
    
    const globalTextarea = document.getElementById("notepad-text-area");
    if (globalTextarea && state.currentSlideIndex === COURSE_CONTENT.findIndex(s => s.id === slideId)) {
      globalTextarea.value = textVal;
    }
    
    statusSpan.textContent = "✓ Resposta salva com sucesso!";
    addXP(10);
    markSlideAsCompleted(slideId);
    
    setTimeout(() => {
      statusSpan.textContent = "";
    }, 3000);
  });
}

/**
 * Exibe um alerta moderno e elegante (Substituição premium do alert nativo)
 */
window.showModernAlert = function(title, message, callback) {
  const existing = document.getElementById("modern-alert-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-alert-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions">
        <button class="btn btn-primary" id="modern-alert-close-btn" style="padding: 0.6rem 2rem;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-alert-close-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
};

/**
 * Exibe uma confirmação moderna e elegante (Substituição premium do confirm nativo)
 */
window.showModernConfirm = function(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("modern-confirm-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "modern-confirm-modal";
  modal.className = "modern-modal-overlay";
  modal.innerHTML = `
    <div class="modern-modal-card">
      <div class="modern-modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modern-modal-body">
        <p>${message}</p>
      </div>
      <div class="modern-modal-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-outline btn-small" id="modern-confirm-cancel-btn" style="padding: 0.6rem 1.5rem;">Cancelar</button>
        <button class="btn btn-primary btn-small" id="modern-confirm-ok-btn" style="padding: 0.6rem 1.8rem;">Confirmar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("active"), 10);

  document.getElementById("modern-confirm-ok-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onConfirm) onConfirm();
    }, 200);
  });

  document.getElementById("modern-confirm-cancel-btn").addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.remove();
      if (onCancel) onCancel();
    }, 200);
  });
};

// ==========================================================================
// AULA 3 SIMULATORS & MINI-GAMES — PERIFÉRICOS E CONEXÕES
// ==========================================================================

// Helper: build a lives-quiz widget reusable across Aula 3 simulators
function buildLivesQuizWidget(container, questions, xpPerCorrect, onCompleted) {
  container.innerHTML = "";

  let lives = 3;
  let currentIdx = 0;
  let score = 0;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const renderHUD = () => {
    const hearts = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
    const hud = widget.querySelector(".a3-hud");
    if (hud) hud.innerHTML = `<span>${hearts}</span><span style="color:var(--color-primary);font-weight:700;">⭐ ${score * xpPerCorrect} XP</span>`;
  };

  const renderQuestion = () => {
    widget.innerHTML = "";

    if (lives <= 0) {
      widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">💔</span><h4 class="mt-1">Sem vidas! Tente novamente.</h4><button class="btn btn-primary mt-2" onclick="this.closest('.card').dataset.reset='1';loadSimulator(COURSE_CONTENT[state.currentSlideIndex].interactiveId, COURSE_CONTENT[state.currentSlideIndex], true)">🔄 Recomeçar</button></div>`;
      return;
    }
    if (currentIdx >= questions.length) {
      if (onCompleted) onCompleted(score, widget);
      return;
    }

    const curr = questions[currentIdx];
    const hud = document.createElement("div");
    hud.className = "a3-hud";
    hud.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:0.9rem;";
    hud.innerHTML = `<span>${"❤️".repeat(lives)}${"🖤".repeat(3 - lives)}</span><span style="color:var(--color-primary);font-weight:700;">⭐ ${score * xpPerCorrect} XP</span>`;
    widget.appendChild(hud);

    const qNum = document.createElement("div");
    qNum.style.cssText = "font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;";
    qNum.textContent = `Pergunta ${currentIdx + 1} de ${questions.length}`;
    widget.appendChild(qNum);

    const qTitle = document.createElement("h4");
    qTitle.textContent = curr.q;
    qTitle.style.marginBottom = "1rem";
    widget.appendChild(qTitle);

    if (curr.hint) {
      const hint = document.createElement("div");
      hint.style.cssText = "font-size:0.82rem;color:var(--text-muted);font-style:italic;margin-bottom:10px;padding:8px 12px;background:rgba(131,82,255,0.08);border-radius:8px;";
      hint.textContent = "💡 " + curr.hint;
      widget.appendChild(hint);
    }

    const optionsDiv = document.createElement("div");
    optionsDiv.style.cssText = "display:flex;flex-direction:column;gap:8px;";

    curr.opts.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        optionsDiv.querySelectorAll("button").forEach(b => b.disabled = true);
        if (idx === curr.correct) {
          btn.classList.add("correct");
          score++;
          addXP(xpPerCorrect);
          const feed = document.createElement("div");
          feed.style.cssText = "color:var(--color-success);font-size:0.85rem;margin-top:8px;";
          feed.innerHTML = `<strong>✅ Correto!</strong>${curr.explanation ? " " + curr.explanation : ""}`;
          widget.appendChild(feed);
        } else {
          btn.classList.add("wrong");
          const correctBtn = optionsDiv.children[curr.correct];
          if (correctBtn) correctBtn.classList.add("correct");
          lives--;
          const feed = document.createElement("div");
          feed.style.cssText = "color:var(--color-danger);font-size:0.85rem;margin-top:8px;";
          feed.innerHTML = `<strong>❌ Incorreto!</strong> Resposta certa: <strong>${curr.opts[curr.correct]}</strong>.${curr.explanation ? " " + curr.explanation : ""}`;
          widget.appendChild(feed);
        }
        setTimeout(() => {
          currentIdx++;
          renderQuestion();
        }, 2400);
      });
      optionsDiv.appendChild(btn);
    });
    widget.appendChild(optionsDiv);
  };

  renderQuestion();
  container.appendChild(widget);
}

// -----------------------------------------------------------------------
// 1. HARDWARE REVIEW (hardware-review) — Cap.1 Aula 3
// -----------------------------------------------------------------------
function initHardwareReviewSimulator(container, isReset) {
  const questions = [
    { q: "Qual peça é responsável por executar todos os cálculos e instruções do computador?", opts: ["Memória RAM", "Processador (CPU)", "SSD", "Placa de vídeo"], correct: 1, explanation: "A CPU é o cérebro do computador — processa todas as instruções dos programas." },
    { q: "Onde os arquivos e o sistema operacional ficam armazenados permanentemente?", opts: ["Memória RAM", "Cache L2", "SSD ou HD", "Placa-mãe"], correct: 2, explanation: "O SSD (ou HD) é o armazenamento permanente — os dados não se perdem ao desligar o PC." },
    { q: "Qual peça distribui energia elétrica para todos os componentes do computador?", opts: ["Placa-mãe", "Fonte de alimentação (PSU)", "Gabinete", "Processador"], correct: 1, explanation: "A fonte converte a energia da tomada em tensões adequadas (12V, 5V) para as peças." },
    { q: "O que é a Memória RAM?", opts: ["Armazenamento permanente de dados", "Memória temporária de trabalho ultra-rápida", "Um tipo de processador", "A memória do SSD"], correct: 1, explanation: "RAM = Random Access Memory. É temporária: ao desligar o PC, os dados são apagados." },
    { q: "Qual componente conecta e faz comunicar TODAS as peças do computador?", opts: ["Cooler", "Placa-mãe", "Cabos SATA", "Gabinete"], correct: 1, explanation: "A placa-mãe é a espinha dorsal — todas as peças se conectam a ela direta ou indiretamente." }
  ];
  buildLivesQuizWidget(container, questions, 10, (score, widget) => {
    widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">⚡</span><h4 class="mt-1">Revisão Concluída!</h4><p class="text-muted text-small">Você acertou ${score} de 5 perguntas! Hardware repassado com sucesso. Hora de avançar!</p><span class="badge badge-success">✓ +${score * 10} XP</span></div>`;
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
  });
}

// -----------------------------------------------------------------------
// 2. VERDADEIRO OU FALSO — É PERIFÉRICO? (peripheral-quiz) — Cap.2
// -----------------------------------------------------------------------
function initPeripheralQuizSimulator(container, isReset) {
  const items = [
    { name: "🌐 Webcam", isPeripheral: true, explanation: "Sim! A webcam é um periférico de entrada que captura vídeo." },
    { name: "🧊 Geladeira comum", isPeripheral: false, explanation: "Não! Uma geladeira comum não é conectável ao computador." },
    { name: "🖨️ Impressora", isPeripheral: true, explanation: "Sim! A impressora é um periférico de saída que imprime documentos." },
    { name: "🖥️ Monitor", isPeripheral: true, explanation: "Sim! O monitor é um periférico de saída que exibe imagens." },
    { name: "🧠 Processador (CPU)", isPeripheral: false, explanation: "Não! A CPU é hardware interno — não é um periférico." },
    { name: "⌨️ Teclado", isPeripheral: true, explanation: "Sim! O teclado é um periférico de entrada." },
    { name: "💾 Pendrive", isPeripheral: true, explanation: "Sim! O pendrive é um periférico de armazenamento externo." },
    { name: "⚡ Memória RAM", isPeripheral: false, explanation: "Não! A RAM é hardware interno, não um periférico." }
  ];

  container.innerHTML = "";
  let lives = 3;
  let idx = 0;
  let score = 0;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";
  widget.style.textAlign = "center";

  const render = () => {
    widget.innerHTML = "";
    const hearts = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
    const hud = document.createElement("div");
    hud.style.cssText = "display:flex;justify-content:space-between;margin-bottom:1rem;font-size:0.9rem;";
    hud.innerHTML = `<span>${hearts}</span><span style="color:var(--color-primary);font-weight:700;">✅ ${score}/${items.length}</span>`;
    widget.appendChild(hud);

    if (lives <= 0) { widget.innerHTML += `<div class="text-center"><span style="font-size:3rem;">💔</span><h4>Sem vidas!</h4><button class="btn btn-primary mt-2" onclick="loadSimulator('peripheral-quiz',COURSE_CONTENT[state.currentSlideIndex],true)">🔄 Tentar novamente</button></div>`; return; }
    if (idx >= items.length) {
      widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">🎉</span><h4 class="mt-1">Parabéns!</h4><p>Você identificou corretamente ${score} itens!</p><span class="badge badge-success">✓ +${score * 10} XP</span></div>`;
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    const curr = items[idx];
    const itemDiv = document.createElement("div");
    itemDiv.style.cssText = "font-size:2.5rem;margin:1rem 0 0.5rem;";
    itemDiv.textContent = curr.name;
    widget.appendChild(itemDiv);

    const q = document.createElement("h4");
    q.textContent = "Isso é um periférico?";
    q.style.marginBottom = "1.2rem";
    widget.appendChild(q);

    const btnRow = document.createElement("div");
    btnRow.style.cssText = "display:flex;gap:12px;justify-content:center;";

    const btnYes = document.createElement("button");
    btnYes.className = "btn btn-primary";
    btnYes.style.minWidth = "100px";
    btnYes.textContent = "✅ Sim";

    const btnNo = document.createElement("button");
    btnNo.className = "btn btn-outline";
    btnNo.style.minWidth = "100px";
    btnNo.textContent = "❌ Não";

    const answer = (chose) => {
      btnYes.disabled = true; btnNo.disabled = true;
      const correct = (chose === curr.isPeripheral);
      const feed = document.createElement("div");
      feed.style.cssText = `color:var(--color-${correct ? "success" : "danger"});font-size:0.85rem;margin-top:1rem;`;
      feed.innerHTML = `<strong>${correct ? "✅ Correto!" : "❌ Incorreto!"}</strong> ${curr.explanation}`;
      widget.appendChild(feed);
      if (correct) { score++; addXP(10); } else { lives--; }
      setTimeout(() => { idx++; render(); }, 2200);
    };

    btnYes.addEventListener("click", () => answer(true));
    btnNo.addEventListener("click", () => answer(false));
    btnRow.appendChild(btnYes);
    btnRow.appendChild(btnNo);
    widget.appendChild(btnRow);
  };

  render();
  container.appendChild(widget);
}

// -----------------------------------------------------------------------
// 3. QUEM SOU EU? (guess-device) — Cap.3
// -----------------------------------------------------------------------
function initGuessDeviceSimulator(container, isReset) {
  const devices = [
    { answer: "🎤 Microfone", clues: ["Transformo sua voz em dados digitais.", "Sou essencial em estúdios de gravação.", "Você me usa em videochamadas."], xpValues: [30, 20, 10] },
    { answer: "📷 Webcam", clues: ["Capturo imagens e vídeos em tempo real.", "Sou comum em notebooks e monitores.", "Uso a porta USB para me conectar."], xpValues: [30, 20, 10] },
    { answer: "⌨️ Teclado", clues: ["Transformo pressionamentos em letras e números.", "Existem versões mecânicas, de membrana e virtual.", "Sou o principal periférico de entrada de texto."], xpValues: [30, 20, 10] },
    { answer: "👆 Leitor Biométrico", clues: ["Registro impressões digitais únicas de cada pessoa.", "Sou usado em bancos e controle de ponto.", "Capturo dados físicos para autenticação segura."], xpValues: [30, 20, 10] },
    { answer: "🖱️ Mouse", clues: ["Converto movimentos físicos em coordenadas X,Y.", "Minha precisão é medida em DPI.", "Você me usa para clicar e arrastar na tela."], xpValues: [30, 20, 10] }
  ];

  const allAnswers = devices.map(d => d.answer);
  container.innerHTML = "";
  let lives = 3;
  let deviceIdx = 0;
  let clueIdx = 0;
  let totalXP = 0;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const render = () => {
    widget.innerHTML = "";
    const hearts = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
    const hud = document.createElement("div");
    hud.style.cssText = "display:flex;justify-content:space-between;margin-bottom:1rem;font-size:0.9rem;";
    hud.innerHTML = `<span>${hearts}</span><span style="color:var(--color-primary);font-weight:700;">⭐ ${totalXP} XP</span>`;
    widget.appendChild(hud);

    if (lives <= 0) {
      widget.innerHTML += `<div class="text-center"><span style="font-size:3rem;">💔</span><h4>Sem vidas!</h4><button class="btn btn-primary mt-2" onclick="loadSimulator('guess-device',COURSE_CONTENT[state.currentSlideIndex],true)">🔄 Tentar novamente</button></div>`;
      return;
    }
    if (deviceIdx >= devices.length) {
      widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">🕵️</span><h4 class="mt-1">Detetive Digital!</h4><p>Você identificou todos os dispositivos e ganhou <strong>+${totalXP} XP</strong>!</p><span class="badge badge-success">✓ Concluído</span></div>`;
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    const curr = devices[deviceIdx];
    const progress = document.createElement("div");
    progress.style.cssText = "font-size:0.75rem;color:var(--text-muted);margin-bottom:8px;";
    progress.textContent = `Dispositivo ${deviceIdx + 1} de ${devices.length}`;
    widget.appendChild(progress);

    const clueBox = document.createElement("div");
    clueBox.style.cssText = "background:rgba(131,82,255,0.08);border-radius:10px;padding:14px;margin-bottom:1rem;";
    const clueTitle = document.createElement("div");
    clueTitle.style.cssText = "font-size:0.75rem;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.08em;";
    clueTitle.textContent = `Pista ${clueIdx + 1}`;
    clueBox.appendChild(clueTitle);
    const clueText = document.createElement("p");
    clueText.style.cssText = "font-size:1rem;margin:0;font-style:italic;";
    clueText.textContent = `"${curr.clues[clueIdx]}"`;
    clueBox.appendChild(clueText);
    const xpHint = document.createElement("div");
    xpHint.style.cssText = "font-size:0.75rem;color:var(--color-primary);margin-top:6px;";
    xpHint.textContent = `Acertar agora: +${curr.xpValues[clueIdx]} XP`;
    clueBox.appendChild(xpHint);
    widget.appendChild(clueBox);

    const optGrid = document.createElement("div");
    optGrid.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1rem;";
    allAnswers.forEach(ans => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = ans;
      btn.addEventListener("click", () => {
        optGrid.querySelectorAll("button").forEach(b => b.disabled = true);
        const feed = document.createElement("div");
        feed.style.cssText = "margin-top:10px;font-size:0.85rem;";
        if (ans === curr.answer) {
          btn.classList.add("correct");
          const earned = curr.xpValues[clueIdx];
          totalXP += earned;
          addXP(earned);
          feed.style.color = "var(--color-success)";
          feed.innerHTML = `<strong>✅ Correto!</strong> Era ${curr.answer}! +${earned} XP`;
          widget.appendChild(feed);
          setTimeout(() => { deviceIdx++; clueIdx = 0; render(); }, 2000);
        } else {
          btn.classList.add("wrong");
          lives--;
          clueIdx = Math.min(clueIdx + 1, curr.clues.length - 1);
          feed.style.color = "var(--color-danger)";
          if (clueIdx < curr.clues.length - 1 || lives <= 0) {
            feed.innerHTML = `<strong>❌ Errou!</strong> ${lives > 0 ? "Próxima pista revelada..." : "Sem mais vidas!"}`;
          } else {
            feed.innerHTML = `<strong>❌ Errou!</strong> A resposta era ${curr.answer}.`;
          }
          widget.appendChild(feed);
          setTimeout(() => render(), 2000);
        }
      });
      optGrid.appendChild(btn);
    });
    widget.appendChild(optGrid);

    if (clueIdx < curr.clues.length - 1) {
      const moreClueBtn = document.createElement("button");
      moreClueBtn.className = "btn btn-outline";
      moreClueBtn.textContent = `🔍 Ver próxima pista (-${curr.xpValues[clueIdx] - curr.xpValues[Math.min(clueIdx + 1, curr.clues.length - 1)]} XP)`;
      moreClueBtn.addEventListener("click", () => { clueIdx++; render(); });
      widget.appendChild(moreClueBtn);
    }
  };

  render();
  container.appendChild(widget);
}

// -----------------------------------------------------------------------
// 4. ENTRADA OU SAÍDA? (output-sorter) — Cap.4
// -----------------------------------------------------------------------
function initOutputSorterSimulator(container, isReset) {
  const allItems = [
    { name: "🖥️ Monitor", category: "Saída", explanation: "O monitor exibe imagens enviadas pelo computador — é saída." },
    { name: "🖱️ Mouse", category: "Entrada", explanation: "O mouse envia posição e cliques ao PC — é entrada." },
    { name: "🖨️ Impressora", category: "Saída", explanation: "A impressora imprime dados vindos do PC — é saída." },
    { name: "📷 Webcam", category: "Entrada", explanation: "A webcam captura imagens e envia ao PC — é entrada." },
    { name: "🔊 Caixa de Som", category: "Saída", explanation: "A caixa de som reproduz áudio vindo do PC — é saída." },
    { name: "⌨️ Teclado", category: "Entrada", explanation: "O teclado envia texto ao PC — é entrada." },
    { name: "🎤 Microfone", category: "Entrada", explanation: "O microfone captura áudio e envia ao PC — é entrada." },
    { name: "📽️ Projetor", category: "Saída", explanation: "O projetor exibe imagens do PC — é saída." }
  ];

  container.innerHTML = "";
  let lives = 3;
  let score = 0;
  let remaining = [...allItems].sort(() => Math.random() - 0.5);

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const render = () => {
    widget.innerHTML = "";
    const hearts = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
    const hud = document.createElement("div");
    hud.style.cssText = "display:flex;justify-content:space-between;margin-bottom:1rem;font-size:0.9rem;";
    hud.innerHTML = `<span>${hearts}</span><span style="color:var(--color-primary);font-weight:700;">✅ ${score}/${allItems.length}</span>`;
    widget.appendChild(hud);

    if (lives <= 0) {
      widget.innerHTML += `<div class="text-center"><span style="font-size:3rem;">💔</span><h4>Sem vidas!</h4><button class="btn btn-primary mt-2" onclick="loadSimulator('output-sorter',COURSE_CONTENT[state.currentSlideIndex],true)">🔄 Tentar novamente</button></div>`;
      return;
    }
    if (remaining.length === 0) {
      widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">🎯</span><h4 class="mt-1">Classificação Completa!</h4><p>Você classificou ${score} de ${allItems.length} itens corretamente!</p><span class="badge badge-success">✓ +${score * 10} XP</span></div>`;
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    const curr = remaining[0];
    const itemDiv = document.createElement("div");
    itemDiv.style.cssText = "text-align:center;font-size:2.5rem;margin:0.8rem 0 0.5rem;";
    itemDiv.textContent = curr.name;
    widget.appendChild(itemDiv);

    const q = document.createElement("h4");
    q.textContent = "Classifique este dispositivo:";
    q.style.cssText = "text-align:center;margin-bottom:1.2rem;";
    widget.appendChild(q);

    const btnRow = document.createElement("div");
    btnRow.style.cssText = "display:flex;gap:12px;justify-content:center;";

    ["Entrada", "Saída"].forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "btn btn-primary";
      btn.style.cssText = "min-width:110px;padding:12px;font-size:1rem;";
      btn.textContent = cat === "Entrada" ? "⌨️ Entrada" : "🖥️ Saída";
      btn.addEventListener("click", () => {
        btnRow.querySelectorAll("button").forEach(b => b.disabled = true);
        const correct = (cat === curr.category);
        const feed = document.createElement("div");
        feed.style.cssText = `color:var(--color-${correct ? "success" : "danger"});font-size:0.85rem;margin-top:1rem;text-align:center;`;
        feed.innerHTML = `<strong>${correct ? "✅ Correto!" : "❌ Incorreto!"}</strong> ${curr.explanation}`;
        widget.appendChild(feed);
        if (correct) { score++; addXP(10); } else { lives--; }
        remaining.shift();
        setTimeout(render, 2200);
      });
      btnRow.appendChild(btn);
    });
    widget.appendChild(btnRow);
  };

  render();
  container.appendChild(widget);
}

// -----------------------------------------------------------------------
// 5. ESCOLHA DE ARMAZENAMENTO (storage-challenge) — Cap.5
// -----------------------------------------------------------------------
function initStorageChallengeSimulator(container, isReset) {
  const scenarios = [
    { situation: "Você precisa guardar 500 fotos de uma viagem e levar para casa da avó.", options: ["Pendrive 32GB", "HD Externo 2TB", "Cartão SD 8GB"], correct: 0, explanation: "Um pendrive 32GB é compacto, suficiente e prático para transportar 500 fotos." },
    { situation: "Você quer transportar seu trabalho escolar de 15 páginas do Word entre casa e a escola.", options: ["SSD Externo 1TB", "Pendrive 4GB", "HD Externo 4TB"], correct: 1, explanation: "Um pendrive simples de 4GB é mais que suficiente para um documento de texto — prático e barato!" },
    { situation: "Você quer fazer backup de 3TB de vídeos editados da sua empresa.", options: ["Cartão SD 256GB", "Pendrive 128GB", "HD Externo 4TB"], correct: 2, explanation: "Para 3TB de dados, um HD externo de 4TB é o mais adequado pela capacidade e custo por GB." },
    { situation: "Você é videomaker e precisa editar vídeos 4K com velocidade máxima em campo.", options: ["SSD Externo USB-C", "Pendrive USB 2.0", "HD Externo 500GB"], correct: 0, explanation: "O SSD externo USB-C oferece as velocidades de até 2.000 MB/s necessárias para edição 4K sem travamentos." },
    { situation: "Você quer expandir o armazenamento da sua câmera fotográfica profissional.", options: ["Pendrive USB", "Cartão SD UHS-II", "HD Externo"], correct: 1, explanation: "Câmeras usam cartões SD. O UHS-II oferece alta velocidade de gravação para fotos em RAW e vídeo 4K." }
  ];

  const questions = scenarios.map(s => ({
    q: s.situation,
    opts: s.options,
    correct: s.correct,
    explanation: s.explanation
  }));

  buildLivesQuizWidget(container, questions, 15, (score, widget) => {
    widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">💾</span><h4 class="mt-1">Desafio Concluído!</h4><p>Você escolheu o armazenamento certo em ${score} de ${scenarios.length} situações!</p><span class="badge badge-success">✓ +${score * 15} XP</span></div>`;
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
  });
}

// -----------------------------------------------------------------------
// 6. CONECTE AS PORTAS (connect-ports) — Cap.6
// -----------------------------------------------------------------------
function initConnectPortsSimulator(container, isReset) {
  const connections = [
    { device: "🖥️ Monitor", port: "HDMI", hint: "Transmite vídeo e áudio em alta definição", options: ["USB-A", "HDMI", "P2 3,5mm", "Ethernet"], correct: 1 },
    { device: "🖱️ Mouse", port: "USB-A", hint: "Porta retangular universal para periféricos", options: ["HDMI", "P2 3,5mm", "USB-A", "USB-C"], correct: 2 },
    { device: "🔊 Caixa de Som", port: "P2 (3,5mm)", hint: "Cabo de áudio analógico circular", options: ["Ethernet", "HDMI", "USB-C", "P2 3,5mm"], correct: 3 },
    { device: "🌐 Roteador/Internet", port: "Ethernet (RJ-45)", hint: "Cabo de rede cabeada mais estável que Wi-Fi", options: ["Ethernet (RJ-45)", "USB-A", "HDMI", "P2 3,5mm"], correct: 0 },
    { device: "📱 Smartphone moderno", port: "USB-C", hint: "Conector reversível presente em celulares novos", options: ["P2 3,5mm", "USB-A", "Micro-USB", "USB-C"], correct: 3 }
  ];

  const questions = connections.map(c => ({
    q: `Qual porta você usa para conectar: ${c.device}?`,
    hint: `Dica: ${c.hint}`,
    opts: c.options,
    correct: c.correct,
    explanation: `Correto! ${c.device} se conecta via ${c.port}.`
  }));

  buildLivesQuizWidget(container, questions, 20, (score, widget) => {
    widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">🔌</span><h4 class="mt-1">Computador Conectado!</h4><p>Você conectou corretamente ${score} de ${connections.length} periféricos!</p><span class="badge badge-success">✓ +${score * 20} XP</span></div>`;
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
    if (score >= 4) unlockAchievement("peripheral_master");
  });
}

// -----------------------------------------------------------------------
// 7. MONTE SUA ESTAÇÃO DE TRABALHO (workspace-builder) — Cap.7
// -----------------------------------------------------------------------
function initWorkspaceBuilderSimulator(container, isReset) {
  container.innerHTML = "";

  const items = [
    { id: "monitor", emoji: "🖥️", name: "Monitor", zone: "Centro da mesa (ao centro, à frente dos olhos)", correct: "monitor-zone" },
    { id: "teclado", emoji: "⌨️", name: "Teclado", zone: "Frente da mesa (em frente ao monitor)", correct: "teclado-zone" },
    { id: "mouse", emoji: "🖱️", name: "Mouse", zone: "Lado direito do teclado", correct: "mouse-zone" },
    { id: "webcam", emoji: "📷", name: "Webcam", zone: "Topo do monitor (centralizada)", correct: "webcam-zone" },
    { id: "impressora", emoji: "🖨️", name: "Impressora", zone: "Lado esquerdo da mesa", correct: "impressora-zone" },
    { id: "caixasom", emoji: "🔊", name: "Caixa de Som", zone: "Lados do monitor (par)", correct: "som-zone" }
  ];

  let placed = {};
  let lives = 3;
  let selected = null;

  const zones = [
    { id: "monitor-zone", label: "🖥️ Centro (monitor)", item: "monitor" },
    { id: "teclado-zone", label: "⌨️ Frente (teclado)", item: "teclado" },
    { id: "mouse-zone", label: "🖱️ Dir. do teclado (mouse)", item: "mouse" },
    { id: "webcam-zone", label: "📷 Topo do monitor (webcam)", item: "webcam" },
    { id: "impressora-zone", label: "🖨️ Lado esq. (impressora)", item: "impressora" },
    { id: "som-zone", label: "🔊 Lados monitor (som)", item: "caixasom" }
  ];

  const widget = document.createElement("div");
  widget.style.maxWidth = "520px";
  widget.style.margin = "0 auto";

  const render = () => {
    widget.innerHTML = "";

    const hearts = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
    const hud = document.createElement("div");
    hud.style.cssText = "display:flex;justify-content:space-between;margin-bottom:12px;font-size:0.9rem;";
    hud.innerHTML = `<span>${hearts}</span><span style="color:var(--color-primary);font-weight:700;">✅ ${Object.keys(placed).length}/${items.length}</span>`;
    widget.appendChild(hud);

    if (lives <= 0) {
      widget.innerHTML += `<div class="text-center"><span style="font-size:3rem;">💔</span><h4>Sem vidas!</h4><button class="btn btn-primary mt-2" onclick="loadSimulator('workspace-builder',COURSE_CONTENT[state.currentSlideIndex],true)">🔄 Tentar novamente</button></div>`;
      return;
    }
    if (Object.keys(placed).length === items.length) {
      widget.innerHTML = `<div class="text-center"><span style="font-size:3rem;">🖥️</span><h4 class="mt-1">Estação Montada!</h4><p>Sua mesa de trabalho está configurada! Você ganhou <strong>+${Object.keys(placed).length * 15} XP</strong>!</p><span class="badge badge-success">✓ Missão Cumprida!</span></div>`;
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    // Instruction
    const instr = document.createElement("p");
    instr.style.cssText = "font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;";
    instr.textContent = selected ? `Selecionado: ${selected.emoji} ${selected.name} — Agora clique no local correto!` : "Clique em um equipamento, depois clique no local correto da mesa.";
    widget.appendChild(instr);

    // Item bank
    const bank = document.createElement("div");
    bank.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;";
    items.forEach(item => {
      if (placed[item.id]) return;
      const btn = document.createElement("button");
      btn.className = `btn ${selected && selected.id === item.id ? "btn-primary" : "btn-outline"}`;
      btn.style.fontSize = "1.2rem";
      btn.textContent = `${item.emoji} ${item.name}`;
      btn.addEventListener("click", () => { selected = item; render(); });
      bank.appendChild(btn);
    });
    widget.appendChild(bank);

    // Drop zones
    const zoneGrid = document.createElement("div");
    zoneGrid.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:8px;";
    zones.forEach(zone => {
      const zBtn = document.createElement("button");
      zBtn.className = "btn btn-outline";
      zBtn.style.cssText = "padding:12px 8px;text-align:left;font-size:0.82rem;";
      const placedHere = Object.entries(placed).find(([k, v]) => v === zone.id);
      if (placedHere) {
        const placedItem = items.find(i => i.id === placedHere[0]);
        zBtn.style.background = "rgba(16,185,129,0.15)";
        zBtn.style.borderColor = "var(--color-success)";
        zBtn.innerHTML = `✅ ${placedItem.emoji} ${placedItem.name}<br><small style="color:var(--text-muted)">${zone.label}</small>`;
        zBtn.disabled = true;
      } else {
        zBtn.innerHTML = `📍 <small>${zone.label}</small>`;
        zBtn.addEventListener("click", () => {
          if (!selected) return;
          const feed = document.createElement("div");
          feed.style.cssText = "font-size:0.82rem;margin-top:8px;";
          if (zone.item === selected.id) {
            placed[selected.id] = zone.id;
            addXP(15);
            selected = null;
          } else {
            lives--;
            selected = null;
          }
          render();
        });
      }
      zoneGrid.appendChild(zBtn);
    });
    widget.appendChild(zoneGrid);
  };

  render();
  container.appendChild(widget);
}

// -----------------------------------------------------------------------
// 8. QUIZ FINAL DA AULA 3 (peripheral-final-quiz) — Cap.8
// -----------------------------------------------------------------------
function initPeripheralFinalQuizSimulator(container, isReset) {
  const questions = [
    { q: "Qual periférico envia informações DO usuário PARA o computador?", opts: ["Monitor", "Impressora", "Teclado", "Caixa de som"], correct: 2, explanation: "O teclado é um dispositivo de ENTRADA — envia dados do usuário para o computador." },
    { q: "O monitor é um dispositivo de entrada ou de saída?", opts: ["Entrada", "Saída", "Entrada e Saída", "Armazenamento"], correct: 1, explanation: "O monitor é dispositivo de SAÍDA — recebe dados do PC e os exibe ao usuário." },
    { q: "Qual cabo é usado para transmitir vídeo e áudio entre computador e TV/monitor?", opts: ["USB-A", "P2 3,5mm", "Ethernet", "HDMI"], correct: 3, explanation: "O HDMI transmite vídeo e áudio digitais em alta definição em um único cabo." },
    { q: "Para que serve o Bluetooth?", opts: ["Conectar cabos SATA", "Transmitir energia elétrica", "Comunicação sem fio de curto alcance", "Expansão de RAM"], correct: 2, explanation: "Bluetooth é uma tecnologia de comunicação sem fio para curtas distâncias (até ~100m)." },
    { q: "Qual dispositivo de armazenamento é mais resistente a quedas e impactos?", opts: ["HD Externo (disco rígido)", "SSD Externo (flash)", "Pendrive muito antigo", "CD/DVD"], correct: 1, explanation: "O SSD externo não tem partes móveis — é muito mais resistente a impactos que o HD." },
    { q: "A webcam é um periférico de...", opts: ["Saída", "Armazenamento", "Entrada", "Processamento"], correct: 2, explanation: "A webcam captura imagens e as ENVIA ao computador — portanto é dispositivo de ENTRADA." },
    { q: "Qual porta de computador é conhecida por ser reversível (não tem lado errado para plugar)?", opts: ["USB-A", "USB-C", "HDMI", "Ethernet RJ-45"], correct: 1, explanation: "O USB-C é o único conector reversível — pode ser inserido em qualquer posição." },
    { q: "Um microfone é um dispositivo de...", opts: ["Saída de áudio", "Entrada de áudio", "Armazenamento de som", "Processamento de voz"], correct: 1, explanation: "O microfone converte ondas sonoras em dados e os ENVIA ao computador — é ENTRADA." },
    { q: "Qual unidade de medida representa 1.024 Gigabytes?", opts: ["Megabyte (MB)", "Terabyte (TB)", "Kilobyte (KB)", "Petabyte (PB)"], correct: 1, explanation: "1 Terabyte = 1.024 Gigabytes. TBs são usados em HDs e SSDs de grande capacidade." },
    { q: "Um pendrive se conecta ao computador por qual porta?", opts: ["HDMI", "P2 3,5mm", "USB", "Ethernet"], correct: 2, explanation: "O pendrive usa a porta USB (Universal Serial Bus) para se conectar ao computador." }
  ];

  buildLivesQuizWidget(container, questions, 20, (score, widget) => {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? "🏆 Excelente!" : pct >= 60 ? "👍 Bom trabalho!" : "📚 Continue estudando!";
    widget.innerHTML = `
      <div class="text-center">
        <span style="font-size:3rem;">${pct >= 70 ? "🏆" : "📚"}</span>
        <h4 class="mt-1">${grade}</h4>
        <p>Você acertou <strong>${score} de ${questions.length}</strong> perguntas (${pct}%)</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">+${score * 20} XP conquistados!</p>
        <span class="badge badge-success">✓ Quiz Concluído</span>
      </div>`;
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
    if (score >= 8) unlockAchievement("peripheral_master");
  });
}

// -----------------------------------------------------------------------
// 9. MISSÃO FINAL AULA 3 (aula3-mission-final) — Cap.9
// -----------------------------------------------------------------------
function initAula3MissionFinalSimulator(container, isReset) {
  container.innerHTML = "";

  const slideId = COURSE_CONTENT[state.currentSlideIndex].id;
  const storageKey = `mission_final_aula3_${window.currentUser ? window.currentUser.id : "local"}`;
  const saved = localStorage.getItem(storageKey) || "";

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  widget.innerHTML = `
    <h4>✍️ Sua Resposta</h4>
    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Descreva os periféricos do seu dia a dia e quais você escolheria para sua estação ideal.</p>
    <textarea id="a3-mission-textarea" style="width:100%;min-height:160px;background:var(--bg-base);border:1px solid var(--border-soft);border-radius:10px;padding:12px;color:var(--text-primary);font-size:0.9rem;resize:vertical;line-height:1.6;" placeholder="Escreva aqui sua reflexão... (mínimo 3 linhas)">${saved}</textarea>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
      <span id="a3-char-count" style="font-size:0.75rem;color:var(--text-muted);">${saved.length} caracteres</span>
      <button id="a3-mission-save-btn" class="btn btn-primary">💾 Salvar nas Anotações (+50 XP)</button>
    </div>
    <div id="a3-mission-feedback" style="margin-top:10px;"></div>
  `;

  container.appendChild(widget);

  const textarea = document.getElementById("a3-mission-textarea");
  const counter = document.getElementById("a3-char-count");
  const saveBtn = document.getElementById("a3-mission-save-btn");
  const feedback = document.getElementById("a3-mission-feedback");

  textarea.addEventListener("input", () => {
    counter.textContent = textarea.value.length + " caracteres";
  });

  saveBtn.addEventListener("click", () => {
    const text = textarea.value.trim();
    if (text.length < 50) {
      feedback.innerHTML = `<span style="color:var(--color-danger);">✋ Escreva pelo menos 50 caracteres para salvar (mínimo 3 linhas).</span>`;
      return;
    }
    localStorage.setItem(storageKey, textarea.value);
    // Salva também nas anotações do slide
    if (!state.notes) state.notes = {};
    state.notes[slideId] = textarea.value;
    saveState();
    addXP(50);
    markSlideAsCompleted(slideId);
    unlockAchievement("peripheral_master");
    saveBtn.disabled = true;
    feedback.innerHTML = `<span style="color:var(--color-success);">✅ Reflexão salva com sucesso! +50 XP desbloqueados. 🔌 Medalha <strong>Mestre dos Periféricos</strong> conquistada!</span>`;
  });
}
// ==========================================================================
// AULA 4 SIMULATORS — SYSTEM & GAME ENGINES
// ==========================================================================

// 1. REVISÃO DA AULA 3 (PERIFÉRICOS)
function initWindowsReviewSimulator(container, isReset) {
  container.innerHTML = "";
  const questions = [
    { q: "Qual cabo transmite tanto vídeo quanto áudio em alta definição digital?", opts: ["VGA", "HDMI", "USB"], correct: 1 },
    { q: "O mouse e o teclado são classificados como dispositivos de:", opts: ["Saída", "Processamento", "Entrada"], correct: 2 },
    { q: "Um pendrive é um periférico de:", opts: ["Processamento", "Armazenamento Externo", "Entrada/Saída"], correct: 1 },
    { q: "Qual porta de conexão é atualmente a mais comum para conectar múltiplos tipos de periféricos?", opts: ["USB", "Serial", "HDMI"], correct: 0 },
    { q: "O monitor e os fones de ouvido são dispositivos de:", opts: ["Entrada", "Saída", "Entrada/Saída"], correct: 1 }
  ];
  let currentIdx = 0;
  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";
  
  const render = () => {
    widget.innerHTML = "";
    if (currentIdx >= questions.length) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">⚡</span>
          <h4 class="mt-1" style="color:var(--color-success);">Revisão Concluída!</h4>
          <p class="text-muted text-small">Excelente! Você lembrou de tudo sobre hardware e periféricos. Próximo capítulo desbloqueado!</p>
          <span class="badge badge-success">✓ Revisado (+50 XP)</span>
        </div>
      `;
      addXP(50);
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }
    const curr = questions[currentIdx];
    const qTitle = document.createElement("h4");
    qTitle.textContent = `Questão ${currentIdx + 1} de ${questions.length}: ${curr.q}`;
    qTitle.style.marginBottom = "1.2rem";
    widget.appendChild(qTitle);
    
    const optsDiv = document.createElement("div");
    optsDiv.style.display = "flex";
    optsDiv.style.flexDirection = "column";
    optsDiv.style.gap = "8px";
    
    curr.opts.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        optsDiv.querySelectorAll("button").forEach(b => b.disabled = true);
        if (idx === curr.correct) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
          optsDiv.childNodes[curr.correct].classList.add("correct");
        }
        setTimeout(() => {
          currentIdx++;
          render();
        }, 1500);
      });
      optsDiv.appendChild(btn);
    });
    widget.appendChild(optsDiv);
  };
  render();
  container.appendChild(widget);
}

// 2. IDENTIFICAR SISTEMA OPERACIONAL (OS GUESS)
function initOsGuessSimulator(container, isReset) {
  container.innerHTML = "";
  let hearts = 3;
  let currentIdx = 0;
  const questions = [
    { item: "📱 Celulares da Apple (iPhone)", desc: "Aparelho de alto padrão exclusivo da Apple.", correct: "iOS", opts: ["Android", "iOS", "Windows", "macOS"] },
    { item: "💻 Notebooks de Escritório", desc: "Computadores focados em produtividade corporativa ou jogos domésticos.", correct: "Windows", opts: ["Linux", "iOS", "Windows", "Android"] },
    { item: "📱 Smartphone Samsung ou Xiaomi", desc: "O ecossistema móvel mais utilizado no mundo.", correct: "Android", opts: ["Windows", "Android", "iOS", "macOS"] },
    { item: "🖥️ Computadores Mac (Apple)", desc: "Notebooks e desktops finos voltados para designers e desenvolvedores.", correct: "macOS", opts: ["Windows", "Linux", "macOS", "iOS"] },
    { item: "🌐 Servidores de Internet e Smart TVs", desc: "Sistemas robustos de código aberto e aparelhos integrados de sala de estar.", correct: "Linux", opts: ["Linux", "macOS", "Windows", "iOS"] }
  ];

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const updateHearts = (heartsDiv) => {
    heartsDiv.innerHTML = "Vidas: " + Array(3).fill(0).map((_, i) => i < hearts ? "❤️" : "💔").join(" ");
  };

  const render = () => {
    widget.innerHTML = "";
    if (hearts <= 0) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">⚠️</span>
          <h4 class="mt-1" style="color:var(--color-danger);">Você perdeu todas as vidas!</h4>
          <p class="text-muted text-small">Sem problemas. Revise o texto e tente novamente.</p>
          <button class="btn btn-secondary mt-1" id="btn-restart-os-guess">Reiniciar Desafio</button>
        </div>
      `;
      widget.querySelector("#btn-restart-os-guess").addEventListener("click", () => {
        hearts = 3;
        currentIdx = 0;
        render();
      });
      return;
    }

    if (currentIdx >= questions.length) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">🤖</span>
          <h4 class="mt-1" style="color:var(--color-success);">Desafio Concluído!</h4>
          <p class="text-muted text-small">Você sabe reconhecer e classificar perfeitamente cada tipo de Sistema Operacional.</p>
          <span class="badge badge-success">✓ Desafio Concluído (+50 XP)</span>
        </div>
      `;
      addXP(50);
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    const curr = questions[currentIdx];
    const topBar = document.createElement("div");
    topBar.style.display = "flex";
    topBar.style.justifyContent = "space-between";
    topBar.style.marginBottom = "1rem";
    
    const countSpan = document.createElement("span");
    countSpan.textContent = `Aparelho ${currentIdx + 1} de ${questions.length}`;
    countSpan.style.fontSize = "0.85rem";
    
    const heartsSpan = document.createElement("span");
    heartsSpan.style.color = "var(--color-danger)";
    heartsSpan.style.fontWeight = "bold";
    heartsSpan.style.fontSize = "0.85rem";
    updateHearts(heartsSpan);

    topBar.appendChild(countSpan);
    topBar.appendChild(heartsSpan);
    widget.appendChild(topBar);

    const card = document.createElement("div");
    card.style.background = "rgba(255,255,255,0.03)";
    card.style.border = "1px solid rgba(255,255,255,0.08)";
    card.style.borderRadius = "12px";
    card.style.padding = "1.5rem";
    card.style.textAlign = "center";
    card.style.marginBottom = "1.2rem";

    const title = document.createElement("h3");
    title.textContent = curr.item;
    title.style.margin = "0 0 0.5rem 0";
    
    const desc = document.createElement("p");
    desc.textContent = curr.desc;
    desc.style.color = "var(--text-muted)";
    desc.style.fontSize = "0.85rem";

    card.appendChild(title);
    card.appendChild(desc);
    widget.appendChild(card);

    const optsDiv = document.createElement("div");
    optsDiv.style.display = "grid";
    optsDiv.style.gridTemplateColumns = "repeat(2, 1fr)";
    optsDiv.style.gap = "8px";

    curr.opts.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        optsDiv.querySelectorAll("button").forEach(b => b.disabled = true);
        if (opt === curr.correct) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
          hearts--;
          updateHearts(heartsSpan);
        }
        setTimeout(() => {
          currentIdx++;
          render();
        }, 1500);
      });
      optsDiv.appendChild(btn);
    });
    widget.appendChild(optsDiv);
  };
  render();
  container.appendChild(widget);
}

// 3. EXPLORAR ÁREA DE TRABALHO
function initDesktopExplorerSimulator(container, isReset) {
  container.innerHTML = "";
  const clickedElements = {
    lixeira: false,
    relogio: false,
    iniciar: false,
    pasta: false,
    barra: false
  };

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.2rem";

  const totalToExplore = Object.keys(clickedElements).length;

  const checkCompletion = () => {
    const clickedCount = Object.values(clickedElements).filter(Boolean).length;
    progText.textContent = `Elementos explorados: ${clickedCount} de ${totalToExplore}`;
    if (clickedCount === totalToExplore) {
      infoPanel.innerHTML = `
        <div style="text-align:center; color:var(--color-success); padding:1rem;">
          <h4 style="margin:0; color:var(--color-success);">✨ Exploração Concluída!</h4>
          <p class="text-small text-muted" style="margin-top:6px;">Parabéns! Você identificou e explorou todas as partes importantes da Área de Trabalho do Windows.</p>
        </div>
      `;
      addXP(50);
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
    }
  };

  // Header progress
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "0.75rem";
  
  const title = document.createElement("h4");
  title.textContent = "💻 Área de Trabalho Interativa";
  title.style.margin = "0";

  const progText = document.createElement("span");
  progText.style.fontSize = "0.82rem";
  progText.style.color = "var(--color-primary-light)";
  progText.style.fontWeight = "700";
  progText.textContent = `Elementos explorados: 0 de ${totalToExplore}`;

  header.appendChild(title);
  header.appendChild(progText);
  widget.appendChild(header);

  // Desktop screen
  const desktopFrame = document.createElement("div");
  desktopFrame.style.cssText = "position:relative; width:100%; height:380px; background: linear-gradient(135deg, #1e1b4b, #311042); border-radius:12px; border:1px solid rgba(255,255,255,0.1); overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box; padding:12px;";
  
  // Desktop Icons Left
  const leftIcons = document.createElement("div");
  leftIcons.style.cssText = "display:flex; flex-direction:column; gap:16px; align-items:flex-start; width:fit-content;";

  const lixeira = document.createElement("div");
  lixeira.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px; transition: background 0.2s;";
  lixeira.innerHTML = `<span style="font-size:1.8rem; display:block;">🗑️</span><span style="font-size:0.7rem; font-weight:700; color:#fff; display:block; margin-top:2px;">Lixeira</span>`;
  lixeira.addEventListener("click", () => {
    clickedElements.lixeira = true;
    lixeira.style.background = "rgba(124,58,237,0.3)";
    lixeira.style.border = "1px solid var(--color-primary-light)";
    infoPanel.innerHTML = `<strong>🗑️ Lixeira do Sistema:</strong> É onde ficam salvos temporariamente os arquivos excluídos do computador. Eles só saem do seu HD de vez quando você esvazia a lixeira.`;
    checkCompletion();
  });

  const pasta = document.createElement("div");
  pasta.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px; transition: background 0.2s;";
  pasta.innerHTML = `<span style="font-size:1.8rem; display:block;">📁</span><span style="font-size:0.7rem; font-weight:700; color:#fff; display:block; margin-top:2px;">Projetos</span>`;
  pasta.addEventListener("click", () => {
    clickedElements.pasta = true;
    pasta.style.background = "rgba(124,58,237,0.3)";
    pasta.style.border = "1px solid var(--color-primary-light)";
    infoPanel.innerHTML = `<strong>📁 Ícones e Pastas:</strong> Atalhos rápidos colocados na Área de Trabalho para abrir aplicativos ou organizar arquivos importantes sem ter que procurá-los.`;
    checkCompletion();
  });

  leftIcons.appendChild(lixeira);
  leftIcons.appendChild(pasta);
  desktopFrame.appendChild(leftIcons);

  // Taskbar
  const bar = document.createElement("div");
  bar.style.cssText = "width:calc(100% + 24px); margin-left:-12px; margin-bottom:-12px; height:40px; background:rgba(15,15,35,0.85); backdrop-filter:blur(5px); border-top:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:space-between; padding:0 12px; box-sizing:border-box; cursor:pointer;";
  bar.addEventListener("click", (e) => {
    if (e.target === bar) {
      clickedElements.barra = true;
      bar.style.background = "rgba(124,58,237,0.2)";
      infoPanel.innerHTML = `<strong>➖ Barra de Tarefas:</strong> Fica fixada na base do Windows. Ela exibe os botões dos aplicativos ativos para você alternar entre eles com um clique rápido.`;
      checkCompletion();
    }
  });

  const iniciar = document.createElement("button");
  iniciar.style.cssText = "background:linear-gradient(135deg,#7c3aed,#ec4899); border:none; border-radius:6px; color:#fff; font-weight:bold; font-size:0.75rem; padding:4px 10px; cursor:pointer; font-family:var(--font-display); height:28px; display:flex; align-items:center; gap:4px; box-shadow:0 2px 5px rgba(0,0,0,0.3);";
  iniciar.innerHTML = `🏁 Iniciar`;
  iniciar.addEventListener("click", (e) => {
    e.stopPropagation();
    clickedElements.iniciar = true;
    iniciar.style.boxShadow = "0 0 8px #7c3aed";
    infoPanel.innerHTML = `<strong>🏁 Botão Iniciar:</strong> Abre o menu principal do sistema operacional. Desta janela você acessa todos os programas, arquivos recentes e atalhos de energia do computador.`;
    checkCompletion();
  });

  const relogio = document.createElement("div");
  relogio.style.cssText = "font-size:0.72rem; font-weight:700; color:#fff; font-family:var(--font-display); opacity:0.85; display:flex; flex-direction:column; align-items:flex-end; cursor:pointer; padding:2px 6px; border-radius:4px;";
  relogio.innerHTML = `<span style="line-height:1.1;">20:45</span><span style="font-size:0.6rem; opacity:0.7; margin-top:1px;">13/07/2026</span>`;
  relogio.addEventListener("click", (e) => {
    e.stopPropagation();
    clickedElements.relogio = true;
    relogio.style.background = "rgba(124,58,237,0.3)";
    infoPanel.innerHTML = `<strong>📅 Relógio e Área de Notificação:</strong> Mostra a hora, data, conexões de internet ativa, volume das caixas de som e os alertas/notificações urgentes do antivírus ou atualizações do sistema.`;
    checkCompletion();
  });

  bar.appendChild(iniciar);
  bar.appendChild(relogio);
  desktopFrame.appendChild(bar);
  widget.appendChild(desktopFrame);

  // Info display panel below
  const infoPanel = document.createElement("div");
  infoPanel.style.cssText = "margin-top:12px; min-height:65px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:8px; padding:10px; font-size:0.84rem; line-height:1.4; color:var(--text-secondary);";
  infoPanel.innerHTML = `<span style="color:var(--text-muted);">👉 Clique em qualquer componente destacado da tela para iniciar a exploração e ler as descrições.</span>`;
  widget.appendChild(infoPanel);

  container.appendChild(widget);
}

// 4. CAÇA AO PROGRAMA (START MENU HUNT)
function initStartMenuHuntSimulator(container, isReset) {
  container.innerHTML = "";
  const missions = [
    { target: "Calculadora", emoji: "🧮", hint: "Clique em Iniciar e procure o ícone de calculadora." },
    { target: "Configurações", emoji: "⚙️", hint: "Use o Iniciar e clique na engrenagem das definições." },
    { target: "Bloco de Notas", emoji: "📝", hint: "Aplicativo de anotações de textos simples." },
    { target: "Paint", emoji: "🎨", hint: "Software clássico de desenho livre." }
  ];

  let currentMission = 0;
  let lives = 3;
  let timerVal = 30;
  let gameInterval;
  let isMenuOpen = false;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const clearTimer = () => {
    if (gameInterval) clearInterval(gameInterval);
  };

  const failGame = (reason) => {
    clearTimer();
    widget.innerHTML = `
      <div class="text-center">
        <span style="font-size:3rem;">💥</span>
        <h4 class="mt-1" style="color:var(--color-danger);">${reason}</h4>
        <p class="text-muted text-small">Tente de novo com mais foco nas opções!</p>
        <button class="btn btn-secondary mt-1" id="btn-restart-hunt">Jogar Novamente</button>
      </div>
    `;
    widget.querySelector("#btn-restart-hunt").addEventListener("click", () => {
      initStartMenuHuntSimulator(container, true);
    });
  };

  const completeGame = () => {
    clearTimer();
    widget.innerHTML = `
      <div class="text-center">
        <span style="font-size:3rem;">🔍</span>
        <h4 class="mt-1" style="color:var(--color-success);">Você é um ótimo navegador!</h4>
        <p class="text-muted text-small">Encontrou todos os programas no menu iniciar sem problemas. Bom trabalho!</p>
        <span class="badge badge-success">✓ Caça Concluída (+50 XP)</span>
      </div>
    `;
    addXP(50);
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
  };

  // Start timer
  gameInterval = setInterval(() => {
    timerVal--;
    const tSpan = document.getElementById("hunt-timer-disp");
    if (tSpan) tSpan.textContent = `Tempo: ${timerVal}s`;
    if (timerVal <= 0) {
      failGame("O tempo acabou!");
    }
  }, 1000);

  const render = () => {
    widget.innerHTML = "";
    
    // Top Bar
    const topBar = document.createElement("div");
    topBar.style.cssText = "display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.85rem; font-family:var(--font-display); font-weight:700;";
    
    const targetText = document.createElement("span");
    targetText.style.color = "var(--color-warning)";
    targetText.innerHTML = `Objetivo: Encontre o(a) <strong>${missions[currentMission].target}</strong>`;

    const timerText = document.createElement("span");
    timerText.id = "hunt-timer-disp";
    timerText.textContent = `Tempo: ${timerVal}s`;

    const livesText = document.createElement("span");
    livesText.style.color = "var(--color-danger)";
    livesText.textContent = "❤️ " + lives;

    topBar.appendChild(targetText);
    topBar.appendChild(timerText);
    topBar.appendChild(livesText);
    widget.appendChild(topBar);

    // Simulated screen
    const screen = document.createElement("div");
    screen.style.cssText = "position:relative; width:100%; height:380px; background:#111; border-radius:12px; border:1px solid rgba(255,255,255,0.08); overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end;";

    // Menu Iniciar Popup (Simulated)
    const menuPopup = document.createElement("div");
    menuPopup.style.cssText = "position:absolute; bottom:40px; left:12px; width:180px; background:#222; border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:6px; box-sizing:border-box; display:flex; flex-direction:column; gap:4px; z-index:10;";
    if (!isMenuOpen) menuPopup.style.display = "none";

    const menuItems = [
      { name: "Calculadora", emoji: "🧮" },
      { name: "Paint", emoji: "🎨" },
      { name: "Bloco de Notas", emoji: "📝" },
      { name: "Navegador Web", emoji: "🌐" },
      { name: "Configurações", emoji: "⚙️" },
      { name: "Lixeira", emoji: "🗑️" }
    ];

    menuItems.forEach(item => {
      const itemBtn = document.createElement("div");
      itemBtn.style.cssText = "display:flex; align-items:center; gap:8px; padding:6px 10px; font-size:0.8rem; border-radius:6px; cursor:pointer; color:#fff; transition: background 0.15s;";
      itemBtn.innerHTML = `<span>${item.emoji}</span><span>${item.name}</span>`;
      
      itemBtn.addEventListener("mouseenter", () => itemBtn.style.background = "rgba(124,58,237,0.2)");
      itemBtn.addEventListener("mouseleave", () => itemBtn.style.background = "");

      itemBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        isMenuOpen = false;
        if (item.name === missions[currentMission].target) {
          currentMission++;
          if (currentMission >= missions.length) {
            completeGame();
          } else {
            render();
          }
        } else {
          lives--;
          if (lives <= 0) {
            failGame("Você cometeu muitos erros!");
          } else {
            alert(`❌ Incorreto! Aquele era o(a) ${item.name}. Restam ${lives} vidas.`);
            render();
          }
        }
      });
      menuPopup.appendChild(itemBtn);
    });
    screen.appendChild(menuPopup);

    // Desktop wallpaper area
    const wall = document.createElement("div");
    wall.style.cssText = "flex:1; display:flex; align-items:center; justify-content:center; color:#444; font-size:0.8rem;";
    wall.textContent = "Área de Trabalho";
    screen.appendChild(wall);

    // Taskbar
    const bar = document.createElement("div");
    bar.style.cssText = "height:40px; background:#1e1e1e; border-top:1px solid rgba(255,255,255,0.06); display:flex; align-items:center; padding:0 12px;";

    const initBtn = document.createElement("button");
    initBtn.style.cssText = "background:linear-gradient(135deg,#7c3aed,#ec4899); border:none; border-radius:6px; color:#fff; font-weight:bold; font-size:0.75rem; padding:4px 10px; cursor:pointer; font-family:var(--font-display); height:28px;";
    initBtn.innerHTML = `🏁 Iniciar`;
    initBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isMenuOpen = !isMenuOpen;
      render();
    });

    bar.appendChild(initBtn);
    screen.appendChild(bar);
    widget.appendChild(screen);

    desktop.addEventListener("click", () => {
      if (isMenuOpen) {
        isMenuOpen = false;
        render();
      }
    });
  };

  const desktop = document.createElement("div");
  desktop.addEventListener("click", () => {
    isMenuOpen = false;
    render();
  });

  render();
  container.appendChild(widget);
}

// 5. ORGANIZADOR DE ARQUIVOS (FILE ORGANIZER)
function initFileOrganizerSimulator(container, isReset) {
  container.innerHTML = "";
  let lives = 3;
  let selectedFile = null;

  const files = [
    { name: "foto_perfil.png", type: "img", label: "🖼️ foto_perfil.png" },
    { name: "cancao_rock.mp3", type: "audio", label: "🎵 cancao_rock.mp3" },
    { name: "trabalho_historia.docx", type: "doc", label: "📑 trabalho_historia.docx" },
    { name: "aula_informatica.mp4", type: "video", label: "🎥 aula_informatica.mp4" },
    { name: "manual_usuario.pdf", type: "doc", label: "📑 manual_usuario.pdf" },
    { name: "screenshot.jpg", type: "img", label: "🖼️ screenshot.jpg" }
  ];

  let unorganizedFiles = [...files];
  const foldersData = {
    img: { name: "Imagens / Fotos", emoji: "🖼️", count: 0 },
    audio: { name: "Músicas / Sons", emoji: "🎵", count: 0 },
    doc: { name: "Documentos", emoji: "📑", count: 0 },
    video: { name: "Vídeos", emoji: "🎥", count: 0 }
  };

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const render = () => {
    widget.innerHTML = "";

    if (lives <= 0) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">🗑️</span>
          <h4 class="mt-1" style="color:var(--color-danger);">Arquivos Bagunçados!</h4>
          <p class="text-muted text-small">Suas tentativas terminaram. Tente classificar melhor as extensões.</p>
          <button class="btn btn-secondary mt-1" id="btn-restart-organizer">Tentar Novamente</button>
        </div>
      `;
      widget.querySelector("#btn-restart-organizer").addEventListener("click", () => {
        initFileOrganizerSimulator(container, true);
      });
      return;
    }

    if (unorganizedFiles.length === 0) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">📂</span>
          <h4 class="mt-1" style="color:var(--color-success);">Tudo Organizado!</h4>
          <p class="text-muted text-small">Parabéns! Você reconhece cada tipo de extensão de arquivos e organizou as pastas de forma limpa.</p>
          <span class="badge badge-success">✓ Organizado (+50 XP)</span>
        </div>
      `;
      addXP(50);
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    // Top Bar
    const topBar = document.createElement("div");
    topBar.style.cssText = "display:flex; justify-content:space-between; margin-bottom:1.5rem; font-size:0.85rem;";
    
    const label = document.createElement("span");
    label.innerHTML = "Instrução: <strong>Selecione um arquivo</strong> e clique na <strong>pasta correspondente</strong>.";

    const livesSpan = document.createElement("span");
    livesSpan.style.color = "var(--color-danger)";
    livesSpan.style.fontWeight = "bold";
    livesSpan.innerHTML = "Vidas: " + Array(3).fill(0).map((_, i) => i < lives ? "❤️" : "💔").join(" ");

    topBar.appendChild(label);
    topBar.appendChild(livesSpan);
    widget.appendChild(topBar);

    // Layout
    const layout = document.createElement("div");
    layout.style.cssText = "display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem;";

    // Files list Column
    const filesCol = document.createElement("div");
    filesCol.style.cssText = "background:rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:8px;";
    
    const colTitle1 = document.createElement("h5");
    colTitle1.style.margin = "0 0 8px 0";
    colTitle1.textContent = "📄 Arquivos Soltos";
    filesCol.appendChild(colTitle1);

    unorganizedFiles.forEach(file => {
      const fileBtn = document.createElement("button");
      fileBtn.style.cssText = "text-align:left; padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.08); background:#1e1e2f; color:#fff; font-size:0.82rem; cursor:pointer; font-family:monospace; display:flex; align-items:center; gap:8px; width:100%; transition: border-color 0.15s;";
      fileBtn.textContent = file.label;

      if (selectedFile && selectedFile.name === file.name) {
        fileBtn.style.borderColor = "var(--color-primary-light)";
        fileBtn.style.background = "rgba(124,58,237,0.15)";
      }

      fileBtn.addEventListener("click", () => {
        selectedFile = file;
        render();
      });
      filesCol.appendChild(fileBtn);
    });
    layout.appendChild(filesCol);

    // Folders Column
    const foldersCol = document.createElement("div");
    foldersCol.style.cssText = "display:grid; grid-template-columns:1fr; gap:10px;";
    
    Object.keys(foldersData).forEach(key => {
      const folder = foldersData[key];
      const folderBtn = document.createElement("div");
      folderBtn.style.cssText = "border:1px solid rgba(255,255,255,0.08); background:#161625; border-radius:10px; padding:12px; cursor:pointer; display:flex; align-items:center; justify-content:space-between; transition: background 0.15s;";
      
      folderBtn.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:2rem;">${folder.emoji}</span>
          <div>
            <div style="font-weight:700; font-size:0.85rem; color:#fff;">${folder.name}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Contém: ${folder.count} arquivos</div>
          </div>
        </div>
      `;

      folderBtn.addEventListener("click", () => {
        if (!selectedFile) {
          alert("Por favor, selecione um arquivo na lista à esquerda antes!");
          return;
        }

        if (selectedFile.type === key) {
          foldersData[key].count++;
          unorganizedFiles = unorganizedFiles.filter(f => f.name !== selectedFile.name);
          selectedFile = null;
          render();
        } else {
          lives--;
          alert(`❌ Incorreto! A extensão do arquivo não corresponde a esta pasta.`);
          selectedFile = null;
          render();
        }
      });
      foldersCol.appendChild(folderBtn);
    });
    layout.appendChild(foldersCol);

    widget.appendChild(layout);
  };

  render();
  container.appendChild(widget);
}

// 6. ESCRITÓRIO VIRTUAL (OFFICE SIMULATOR)
function initOfficeSimulator(container, isReset) {
  container.innerHTML = "";
  
  let lives = 3;
  let folders = []; // strings "Documentos", "Fotos"
  let unorganizedFiles = [
    { name: "relatorio_vendas.docx", type: "Documentos", icon: "📄" },
    { name: "ferias_2026.png", type: "Fotos", icon: "🖼️" }
  ];
  let recycleBin = ["projeto_final.docx"]; // Deleted file to restore
  let activeTab = "explorer"; // explorer | lixeira
  let statusMsg = "";

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const render = () => {
    widget.innerHTML = "";

    if (lives <= 0) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">👾</span>
          <h4 style="color:var(--color-danger);">Escritório em Caos!</h4>
          <p class="text-muted text-small">Muitas tentativas incorretas. Recarregue o simulador.</p>
          <button class="btn btn-secondary mt-1" id="btn-restart-office">Tentar Novamente</button>
        </div>
      `;
      widget.querySelector("#btn-restart-office").addEventListener("click", () => {
        initOfficeSimulator(container, true);
      });
      return;
    }

    // Goal Checklist
    const isDocFolderCreated = folders.includes("Documentos");
    const isPhotosFolderCreated = folders.includes("Fotos");
    const areFilesMoved = unorganizedFiles.length === 0;
    const isTrashRestored = recycleBin.length === 0;

    if (isDocFolderCreated && isPhotosFolderCreated && areFilesMoved && isTrashRestored) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">🏢</span>
          <h4 class="mt-1" style="color:var(--color-success);">Escritório Virtual Organizado!</h4>
          <p class="text-muted text-small">Parabéns! Você concluiu todos os objetivos práticos com sucesso!</p>
          <span class="badge badge-success">✓ Concluído (+50 XP)</span>
        </div>
      `;
      addXP(50);
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    // Top goals
    const goalsContainer = document.createElement("div");
    goalsContainer.style.cssText = "background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; margin-bottom:1rem; font-size:0.8rem; display:grid; grid-template-columns:1fr 1fr; gap:8px;";
    
    goalsContainer.innerHTML = `
      <div>
        <div style="font-weight:700; margin-bottom:4px; font-family:var(--font-display);">Metas do Trabalho:</div>
        <div>${isDocFolderCreated ? "✅" : "⬜"} Criar pasta 'Documentos'</div>
        <div>${isPhotosFolderCreated ? "✅" : "⬜"} Criar pasta 'Fotos'</div>
      </div>
      <div>
        <div style="font-weight:700; margin-bottom:4px; font-family:var(--font-display); display:flex; justify-content:space-between;">
          <span>Outras tarefas:</span>
          <span style="color:var(--color-danger);">Vidas: ${lives} ❤️</span>
        </div>
        <div>${areFilesMoved ? "✅" : "⬜"} Mover arquivos soltos às suas pastas</div>
        <div>${isTrashRestored ? "✅" : "⬜"} Abrir Lixeira e Restaurar 'projeto_final.docx'</div>
      </div>
    `;
    widget.appendChild(goalsContainer);

    // Workspace
    const explorer = document.createElement("div");
    explorer.style.cssText = "background:#0f0f1b; border:1px solid rgba(255,255,255,0.08); border-radius:12px; overflow:hidden; min-height:380px; display:flex; flex-direction:column;";

    // Toolbar
    const toolbar = document.createElement("div");
    toolbar.style.cssText = "background:rgba(255,255,255,0.03); border-bottom:1px solid rgba(255,255,255,0.08); padding:8px 12px; display:flex; justify-content:space-between; align-items:center;";
    
    const actions = document.createElement("div");
    actions.style.cssText = "display:flex; gap:8px;";

    const newFolderBtn = document.createElement("button");
    newFolderBtn.className = "btn btn-secondary btn-small";
    newFolderBtn.textContent = "➕ Nova Pasta";
    newFolderBtn.addEventListener("click", () => {
      const name = prompt("Nome da nova pasta:");
      if (!name) return;
      const cleanName = name.trim();
      if (cleanName === "Documentos" || cleanName === "Fotos") {
        if (folders.includes(cleanName)) {
          alert("Esta pasta já existe.");
        } else {
          folders.push(cleanName);
          render();
        }
      } else {
        lives--;
        alert("❌ Nome incorreto! Crie a pasta com o nome exato: 'Documentos' ou 'Fotos'.");
        render();
      }
    });

    const trashBtn = document.createElement("button");
    trashBtn.className = "btn btn-secondary btn-small";
    trashBtn.textContent = `🗑️ Lixeira (${recycleBin.length})`;
    trashBtn.addEventListener("click", () => {
      activeTab = activeTab === "lixeira" ? "explorer" : "lixeira";
      render();
    });

    actions.appendChild(newFolderBtn);
    actions.appendChild(trashBtn);
    toolbar.appendChild(actions);

    const winTitle = document.createElement("span");
    winTitle.style.cssText = "font-size:0.75rem; color:var(--text-muted); font-weight:700;";
    winTitle.textContent = activeTab === "lixeira" ? "🗑️ Exibindo: Lixeira" : "📂 Exibindo: Meus Documentos";
    toolbar.appendChild(winTitle);
    explorer.appendChild(toolbar);

    // List area
    const listArea = document.createElement("div");
    listArea.style.cssText = "padding:1rem; flex:1; display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; align-content:start;";

    if (activeTab === "lixeira") {
      if (recycleBin.length === 0) {
        listArea.innerHTML = `<div style="grid-column: span 3; text-align:center; padding:2rem; color:var(--text-muted); font-size:0.82rem;">Lixeira vazia.</div>`;
      } else {
        recycleBin.forEach(item => {
          const card = document.createElement("div");
          card.style.cssText = "background:rgba(255,255,255,0.02); border:1px solid rgba(255,0,0,0.15); border-radius:8px; padding:10px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:6px;";
          card.innerHTML = `
            <span style="font-size:1.8rem;">📄</span>
            <span style="font-size:0.7rem; font-family:monospace; color:#fff;">${item}</span>
            <button class="btn btn-outline btn-small" style="font-size:0.7rem; padding:2px 6px;">Restaurar</button>
          `;
          card.querySelector("button").addEventListener("click", () => {
            recycleBin = recycleBin.filter(x => x !== item);
            unorganizedFiles.push({ name: item, type: "Documentos", icon: "📄" });
            render();
          });
          listArea.appendChild(card);
        });
      }
    } else {
      // Explorer main view (Folders + Files)
      folders.forEach(fold => {
        const foldCard = document.createElement("div");
        foldCard.style.cssText = "background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.25); border-radius:8px; padding:12px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:4px;";
        
        const count = unorganizedFiles.filter(f => f.location === fold).length;
        
        foldCard.innerHTML = `
          <span style="font-size:2rem;">📁</span>
          <span style="font-size:0.8rem; font-weight:700; color:#fff;">${fold}</span>
          <span style="font-size:0.65rem; color:var(--text-muted);">${count} arquivos</span>
        `;
        listArea.appendChild(foldCard);
      });

      unorganizedFiles.forEach(file => {
        if (file.location) return; // Hidden because it is inside a folder

        const fileCard = document.createElement("div");
        fileCard.style.cssText = "background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:10px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:6px;";
        
        let selectHtml = `<select style="font-size:0.7rem; background:#111; color:#fff; border:1px solid #444; border-radius:4px; padding:2px;"><option value="">Mover para...</option>`;
        folders.forEach(f => {
          selectHtml += `<option value="${f}">${f}</option>`;
        });
        selectHtml += `</select>`;

        fileCard.innerHTML = `
          <span style="font-size:1.8rem;">${file.icon}</span>
          <span style="font-size:0.7rem; font-family:monospace; color:#fff; word-break:break-all;">${file.name}</span>
          ${folders.length > 0 ? selectHtml : '<span style="font-size:0.65rem; color:var(--text-muted);">Crie pastas primeiro</span>'}
        `;

        const select = fileCard.querySelector("select");
        if (select) {
          select.addEventListener("change", () => {
            const dest = select.value;
            if (!dest) return;
            if (file.type === dest) {
              file.location = dest;
              render();
            } else {
              lives--;
              alert(`❌ Erro! O arquivo '${file.name}' deve ser colocado na pasta '${file.type}', não em '${dest}'.`);
              render();
            }
          });
        }

        listArea.appendChild(fileCard);
      });
    }

    explorer.appendChild(listArea);
    widget.appendChild(explorer);
  };

  render();
  container.appendChild(widget);
}

// 7. MESTRE DOS ATALHOS (SHORTCUT MASTER)
function initShortcutMasterSimulator(container, isReset) {
  container.innerHTML = "";

  const questions = [
    { q: "Qual atalho é utilizado para COPIAR um texto ou arquivo selecionado?", opt: "Ctrl + C", options: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"] },
    { q: "Qual atalho utilizamos para COLAR um item que foi copiado para a área de transferência?", opt: "Ctrl + V", options: ["Ctrl + V", "Ctrl + Z", "Ctrl + S", "Ctrl + A"] },
    { q: "Para RECORTAR um arquivo (mover tirando da pasta de origem), qual o atalho?", opt: "Ctrl + X", options: ["Ctrl + C", "Ctrl + Z", "Ctrl + X", "Ctrl + S"] },
    { q: "Qual atalho desfaz a última ação realizada no sistema?", opt: "Ctrl + Z", options: ["Ctrl + A", "Ctrl + X", "Ctrl + Z", "Ctrl + S"] },
    { q: "Para salvar rapidamente um documento importante no disco rígido, usamos:", opt: "Ctrl + S", options: ["Ctrl + C", "Ctrl + S", "Ctrl + V", "Ctrl + A"] }
  ];

  let currentIdx = 0;
  let timerVal = 10;
  let timerInterval;
  let points = 0;
  let isAnswering = false;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const clearTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
  };

  const startTimer = () => {
    timerVal = 10;
    clearTimer();
    const tSpan = document.getElementById("shortcut-timer");
    if (tSpan) tSpan.textContent = `Tempo: ${timerVal}s`;

    timerInterval = setInterval(() => {
      timerVal--;
      const t = document.getElementById("shortcut-timer");
      if (t) t.textContent = `Tempo: ${timerVal}s`;
      
      if (timerVal <= 0) {
        clearTimer();
        handleAnswer(null); // Time out
      }
    }, 1000);
  };

  const handleAnswer = (selectedOpt) => {
    if (isAnswering) return;
    isAnswering = true;
    clearTimer();

    const curr = questions[currentIdx];
    const optsDiv = widget.querySelector("#opts-container");
    const btns = optsDiv.querySelectorAll("button");

    btns.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === curr.opt) {
        btn.classList.add("correct");
      }
    });

    if (selectedOpt) {
      if (selectedOpt === curr.opt) {
        points += 10;
      } else {
        // wrong
        btns.forEach(btn => {
          if (btn.textContent === selectedOpt) btn.classList.add("wrong");
        });
      }
    }

    setTimeout(() => {
      currentIdx++;
      isAnswering = false;
      render();
    }, 2000);
  };

  const render = () => {
    widget.innerHTML = "";
    if (currentIdx >= questions.length) {
      widget.innerHTML = `
        <div class="text-center">
          <span style="font-size:3rem;">⌨️</span>
          <h4 class="mt-1" style="color:var(--color-success);">Desafio Atalhos Concluído!</h4>
          <p class="text-muted text-small">Pontuação Final: <strong>${points} de 50 pontos</strong> fictícios.</p>
          <span class="badge badge-success">✓ Atalhos Concluídos (+50 XP)</span>
        </div>
      `;
      addXP(50);
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      return;
    }

    const curr = questions[currentIdx];

    // Header
    const topBar = document.createElement("div");
    topBar.style.cssText = "display:flex; justify-content:space-between; margin-bottom:1rem; font-size:0.85rem;";
    
    const countSpan = document.createElement("span");
    countSpan.textContent = `Questão ${currentIdx + 1} de ${questions.length}`;

    const timerSpan = document.createElement("span");
    timerSpan.id = "shortcut-timer";
    timerSpan.style.color = "var(--color-warning)";
    timerSpan.style.fontWeight = "bold";
    timerSpan.textContent = `Tempo: 10s`;

    const pointsSpan = document.createElement("span");
    pointsSpan.textContent = `Pontos: ${points}`;

    topBar.appendChild(countSpan);
    topBar.appendChild(timerSpan);
    topBar.appendChild(pointsSpan);
    widget.appendChild(topBar);

    // Card questions
    const qTitle = document.createElement("h4");
    qTitle.textContent = curr.q;
    qTitle.style.marginBottom = "1.2rem";
    widget.appendChild(qTitle);

    const optsDiv = document.createElement("div");
    optsDiv.id = "opts-container";
    optsDiv.style.display = "grid";
    optsDiv.style.gridTemplateColumns = "repeat(2, 1fr)";
    optsDiv.style.gap = "8px";

    curr.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(opt));
      optsDiv.appendChild(btn);
    });
    widget.appendChild(optsDiv);

    startTimer();
  };

  render();
  container.appendChild(widget);
}

// 8. DESAFIO PRÁTICO UNIFICADO (WINDOWS CHALLENGE)
function initWindowsChallengeSimulator(container, isReset) {
  container.innerHTML = "";
  
  let lives = 3;
  let timerVal = 120; // 2 minutes
  let interval;
  
  // Game states
  let isFolderCreated = false;
  let isFolderRenamed = false;
  let isFileMoved = false;
  let isCalcOpened = false;
  let isPaintOpened = false;
  let isTrashCleared = false;

  let isStartOpen = false;
  let explorerOpen = false;
  let folderNameInput = "";
  let workspaceFiles = ["curriculo.docx"]; // Files on desktop
  let targetFolderFiles = []; // Files inside "Trabalho" folder
  let isRecycleBinFull = true;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1rem";

  const clearTimer = () => {
    if (interval) clearInterval(interval);
  };

  const failChallenge = (reason) => {
    clearTimer();
    widget.innerHTML = `
      <div class="text-center">
        <span style="font-size:3rem;">💥</span>
        <h4 class="mt-1" style="color:var(--color-danger);">${reason}</h4>
        <p class="text-muted text-small">Não desista. Tente gerenciar as pastas com mais velocidade!</p>
        <button class="btn btn-secondary mt-1" id="btn-restart-challenge">Jogar Novamente</button>
      </div>
    `;
    widget.querySelector("#btn-restart-challenge").addEventListener("click", () => {
      initWindowsChallengeSimulator(container, true);
    });
  };

  const completeChallenge = () => {
    clearTimer();
    widget.innerHTML = `
      <div class="text-center">
        <span style="font-size:3rem;">🏆</span>
        <h4 class="mt-1" style="color:var(--color-success);">Missão Cumprida, Explorador!</h4>
        <p class="text-muted text-small">Você realizou todas as tarefas de sistema e organização com sucesso e maestria!</p>
        <span class="badge badge-success">✓ Desafio Resolvido (+50 XP)</span>
        <div style="margin-top:10px; font-weight:bold; color:var(--color-warning);">🎖️ Medalha 'Explorador do Windows' Desbloqueada!</div>
      </div>
    `;
    addXP(50);
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
    unlockAchievement("windows_explorer");
  };

  interval = setInterval(() => {
    timerVal--;
    const t = document.getElementById("win-chal-timer");
    if (t) t.textContent = `Tempo: ${timerVal}s`;
    if (timerVal <= 0) {
      failChallenge("O tempo expirou!");
    }
  }, 1000);

  const render = () => {
    widget.innerHTML = "";

    if (lives <= 0) {
      failChallenge("Todas as vidas foram perdidas!");
      return;
    }

    // Completion check
    if (isFolderCreated && isFolderRenamed && isFileMoved && isCalcOpened && isPaintOpened && isTrashCleared) {
      completeChallenge();
      return;
    }

    // Top goal checklist
    const goalsPanel = document.createElement("div");
    goalsPanel.style.cssText = "background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:12px; margin-bottom:1rem; font-size:0.76rem; display:grid; grid-template-columns:1.5fr 1fr; gap:10px;";
    
    goalsPanel.innerHTML = `
      <div>
        <div style="font-weight:700; margin-bottom:4px; font-family:var(--font-display);">Lista de Tarefas:</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:2px 10px;">
          <div>${isFolderCreated ? "✅" : "⬜"} 1. Criar pasta</div>
          <div>${isFolderRenamed ? "✅" : "⬜"} 2. Renomear para "Trabalho"</div>
          <div>${isFileMoved ? "✅" : "⬜"} 3. Mover curriculo.docx</div>
          <div>${isCalcOpened ? "✅" : "⬜"} 4. Abrir Calculadora</div>
          <div>${isPaintOpened ? "✅" : "⬜"} 5. Abrir o Paint</div>
          <div>${isTrashCleared ? "✅" : "⬜"} 6. Esvaziar a Lixeira</div>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; justify-content:center; align-items:flex-end;">
        <span style="font-weight:700; color:var(--color-warning);" id="win-chal-timer">Tempo: ${timerVal}s</span>
        <span style="color:var(--color-danger); font-weight:700; margin-top:4px;">Vidas: ${Array(3).fill(0).map((_, i) => i < lives ? "❤️" : "💔").join("")}</span>
      </div>
    `;
    widget.appendChild(goalsPanel);

    // Desktop
    const desktop = document.createElement("div");
    desktop.style.cssText = "position:relative; width:100%; height:380px; background:linear-gradient(135deg,#0d0b21,#1b0d2d); border:1px solid rgba(255,255,255,0.1); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;";

    // Grid area
    const gridArea = document.createElement("div");
    gridArea.style.cssText = "flex:1; padding:12px; display:flex; flex-wrap:wrap; gap:16px; align-content:flex-start; position:relative;";

    // 1. Curriculo file icon
    if (workspaceFiles.includes("curriculo.docx")) {
      const file = document.createElement("div");
      file.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px;";
      file.innerHTML = `<span style="font-size:1.8rem; display:block;">📄</span><span style="font-size:0.65rem; color:#fff; word-break:break-all; display:block; margin-top:2px;">curriculo.docx</span>`;
      
      file.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isFolderRenamed) {
          workspaceFiles = [];
          targetFolderFiles.push("curriculo.docx");
          isFileMoved = true;
          render();
        } else {
          lives--;
          alert("❌ Erro! Você precisa criar e renomear a pasta para 'Trabalho' antes de mover arquivos!");
          render();
        }
      });
      gridArea.appendChild(file);
    }

    // 2. Folder icon
    if (isFolderCreated) {
      const folder = document.createElement("div");
      folder.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px;";
      const label = isFolderRenamed ? "Trabalho" : "Nova Pasta";
      
      folder.innerHTML = `
        <span style="font-size:2rem; display:block;">📁</span>
        <span style="font-size:0.65rem; color:#fff; display:block; margin-top:2px;">${label}</span>
      `;

      folder.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!isFolderRenamed) {
          const input = prompt("Digite o novo nome para a pasta:");
          if (input && input.trim() === "Trabalho") {
            isFolderRenamed = true;
          } else {
            lives--;
            alert("❌ Erro! Nome incorreto. Renomeie a pasta exatamente para: 'Trabalho'.");
          }
          render();
        } else {
          alert(`Pasta 'Trabalho' contém: ${targetFolderFiles.length} arquivos.`);
        }
      });
      gridArea.appendChild(folder);
    }

    // 3. Recycle Bin icon
    const trash = document.createElement("div");
    trash.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px; position:absolute; right:12px; top:12px;";
    trash.innerHTML = `<span style="font-size:1.8rem; display:block;">🗑️</span><span style="font-size:0.65rem; color:#fff; display:block; margin-top:2px;">Lixeira</span>`;
    
    trash.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!isRecycleBinFull) {
        alert("A lixeira está vazia.");
        return;
      }
      const confirmClear = confirm("Deseja esvaziar a Lixeira do Sistema?");
      if (confirmClear) {
        isRecycleBinFull = false;
        isTrashCleared = true;
        render();
      }
    });
    gridArea.appendChild(trash);

    // Calculator Popup if opened
    if (isCalcOpened && !isFolderCreated) {
      // Closes it dynamically or keeps visible
    }

    // Start Menu Popup
    const startMenu = document.createElement("div");
    startMenu.style.cssText = "position:absolute; bottom:40px; left:12px; width:170px; background:#1c1b26; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:6px; display:flex; flex-direction:column; gap:4px; z-index:20;";
    if (!isStartOpen) startMenu.style.display = "none";

    const menuItems = [
      { name: "Calculadora", emoji: "🧮", action: () => { isCalcOpened = true; } },
      { name: "Paint", emoji: "🎨", action: () => { isPaintOpened = true; } },
      { name: "Pasta Pessoal", emoji: "📁" }
    ];

    menuItems.forEach(item => {
      const it = document.createElement("div");
      it.style.cssText = "display:flex; align-items:center; gap:8px; padding:6px 10px; font-size:0.78rem; border-radius:6px; cursor:pointer; color:#fff;";
      it.innerHTML = `<span>${item.emoji}</span><span>${item.name}</span>`;
      
      it.addEventListener("mouseenter", () => it.style.background = "rgba(124,58,237,0.2)");
      it.addEventListener("mouseleave", () => it.style.background = "");
      
      it.addEventListener("click", (e) => {
        e.stopPropagation();
        isStartOpen = false;
        if (item.action) item.action();
        render();
      });
      startMenu.appendChild(it);
    });
    gridArea.appendChild(startMenu);

    // Context / Action menu for right-click feel
    if (!isFolderCreated) {
      const createFolderBtn = document.createElement("button");
      createFolderBtn.style.cssText = "position:absolute; bottom:12px; right:12px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:#fff; font-size:0.7rem; padding:6px 12px; cursor:pointer;";
      createFolderBtn.textContent = "🖱️ Clique Direito > Novo > Pasta";
      createFolderBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        isFolderCreated = true;
        render();
      });
      gridArea.appendChild(createFolderBtn);
    }

    desktop.appendChild(gridArea);

    // Taskbar
    const bar = document.createElement("div");
    bar.style.cssText = "height:40px; background:#12111a; border-top:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:space-between; padding:0 12px;";

    const initBtn = document.createElement("button");
    initBtn.style.cssText = "background:linear-gradient(135deg,#7c3aed,#ec4899); border:none; border-radius:6px; color:#fff; font-weight:bold; font-size:0.75rem; padding:4px 10px; cursor:pointer; height:28px;";
    initBtn.innerHTML = `🏁 Iniciar`;
    initBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isStartOpen = !isStartOpen;
      render();
    });

    const clock = document.createElement("span");
    clock.style.cssText = "font-size:0.7rem; color:#888; font-family:monospace;";
    clock.textContent = "20:45 PM";

    bar.appendChild(initBtn);
    bar.appendChild(clock);
    desktop.appendChild(bar);
    desktop.addEventListener("click", () => {
      isStartOpen = false;
      render();
    });

    widget.appendChild(desktop);
  };

  render();
  container.appendChild(widget);
}

// ==========================================================================
// AULA 4 EXPANSION SIMULATORS (CAPÍTULOS 11 AO 16)
// ==========================================================================

// 10. EXPLORADOR VIRTUAL
function initExplorerSimulator(container, isReset) {
  container.innerHTML = "";
  let lives = 3;
  let timerVal = 60;
  let interval;
  let currentFolder = "Desktop"; // "Desktop", "Documentos", "Downloads", "Imagens", "Videos"
  
  // Tasks state
  let hasVisitedDownloads = false;
  let hasOpenedImagens = false;
  let hasFoundFile = false;
  let hasReturnedToDesktop = false;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1rem";

  const clearTimer = () => { if (interval) clearInterval(interval); };

  const failGame = (reason) => {
    clearTimer();
    widget.innerHTML = `
      <div class="text-center" style="padding:2rem 1rem;">
        <span style="font-size:3rem;">💥</span>
        <h4 class="mt-1" style="color:var(--color-danger);">${reason}</h4>
        <p class="text-muted text-small">Tente prestar mais atenção nos nomes das pastas e atalhos laterais!</p>
        <button class="btn btn-secondary mt-1" id="btn-restart-explorer">Tentar Novamente</button>
      </div>
    `;
    widget.querySelector("#btn-restart-explorer").addEventListener("click", () => {
      initExplorerSimulator(container, true);
    });
  };

  const completeGame = () => {
    clearTimer();
    widget.innerHTML = `
      <div class="text-center" style="padding:2rem 1rem;">
        <span style="font-size:3rem;">🏆</span>
        <h4 class="mt-1" style="color:var(--color-success);">Explorador Virtual Concluído!</h4>
        <p class="text-muted text-small">Você aprendeu a navegar pelas pastas do Windows e encontrar arquivos perdidos!</p>
        <span class="badge badge-success">✓ Desafio Resolvido (+50 XP)</span>
      </div>
    `;
    addXP(50);
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
  };

  interval = setInterval(() => {
    timerVal--;
    const t = document.getElementById("exp-timer");
    if (t) t.textContent = `Tempo: ${timerVal}s`;
    if (timerVal <= 0) {
      failGame("O tempo acabou!");
    }
  }, 1000);

  const getDica = () => {
    if (!hasVisitedDownloads) return "Dica: Clique em 'Downloads' no painel esquerdo ou no centro.";
    if (!hasOpenedImagens) return "Dica: Clique em 'Imagens' no painel de navegação.";
    if (!hasFoundFile) return "Dica: Dê um clique duplo ou único no arquivo 'projeto_secreto.zip'.";
    if (!hasReturnedToDesktop) return "Dica: Clique em 'Área de Trabalho' no menu esquerdo para voltar.";
    return "";
  };

  const render = () => {
    widget.innerHTML = "";
    if (lives <= 0) {
      failGame("Você perdeu todas as suas vidas!");
      return;
    }

    if (hasVisitedDownloads && hasOpenedImagens && hasFoundFile && hasReturnedToDesktop) {
      completeGame();
      return;
    }

    // Top Header / Status
    const topBar = document.createElement("div");
    topBar.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:10px; margin-bottom:1rem; font-size:0.78rem;";
    
    // Checklist render
    const checkListHtml = `
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <span>${hasVisitedDownloads ? "✅" : "⬜"} 1. Ir a Downloads</span>
        <span>${hasOpenedImagens ? "✅" : "⬜"} 2. Ir a Imagens</span>
        <span>${hasFoundFile ? "✅" : "⬜"} 3. Achar arquivo</span>
        <span>${hasReturnedToDesktop ? "✅" : "⬜"} 4. Voltar ao Desktop</span>
      </div>
    `;

    topBar.innerHTML = `
      <div>
        <div style="font-weight:700; margin-bottom:2px;">Metas do Explorador:</div>
        ${checkListHtml}
      </div>
      <div style="text-align:right;">
        <span style="font-weight:700; color:var(--color-warning); display:block;" id="exp-timer">Tempo: ${timerVal}s</span>
        <span style="color:var(--color-danger); font-weight:700;">Vidas: ${"❤️".repeat(lives)}</span>
      </div>
    `;
    widget.appendChild(topBar);

    // Explorer Layout
    const explorer = document.createElement("div");
    explorer.style.cssText = "display:flex; height:380px; background:#0e0d16; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden;";

    // Left sidebar
    const sidebar = document.createElement("div");
    sidebar.style.cssText = "width:150px; background:#141322; border-right:1px solid rgba(255,255,255,0.08); padding:8px; display:flex; flex-direction:column; gap:4px;";
    
    const folders = [
      { name: "Área de Trabalho", id: "Desktop", emoji: "🖥️" },
      { name: "Documentos", id: "Documentos", emoji: "📄" },
      { name: "Downloads", id: "Downloads", emoji: "📥" },
      { name: "Imagens", id: "Imagens", emoji: "🖼️" },
      { name: "Vídeos", id: "Videos", emoji: "🎥" }
    ];

    folders.forEach(f => {
      const btn = document.createElement("div");
      btn.style.cssText = `display:flex; align-items:center; gap:8px; padding:6px 10px; font-size:0.75rem; border-radius:6px; cursor:pointer; color:#fff; transition: background 0.2s; ${currentFolder === f.id ? "background:var(--color-primary);" : ""}`;
      btn.innerHTML = `<span>${f.emoji}</span><span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.name}</span>`;
      
      btn.addEventListener("click", () => {
        // Navigation validation
        if (f.id === "Downloads") {
          hasVisitedDownloads = true;
        } else if (f.id === "Imagens") {
          if (!hasVisitedDownloads) {
            lives--;
            alert("❌ Calma! Você precisa passar pela pasta Downloads primeiro!");
            render();
            return;
          }
          hasOpenedImagens = true;
        } else if (f.id === "Desktop") {
          if (hasFoundFile) {
            hasReturnedToDesktop = true;
          }
        }
        currentFolder = f.id;
        render();
      });
      sidebar.appendChild(btn);
    });
    explorer.appendChild(sidebar);

    // Right file area
    const mainArea = document.createElement("div");
    mainArea.style.cssText = "flex:1; display:flex; flex-direction:column;";

    // Breadcrumb path header
    const pathHeader = document.createElement("div");
    pathHeader.style.cssText = "background:rgba(255,255,255,0.02); padding:8px 12px; border-bottom:1px solid rgba(255,255,255,0.06); font-size:0.7rem; color:#888;";
    pathHeader.innerHTML = `Este Computador > <strong style="color:#fff;">${currentFolder}</strong>`;
    mainArea.appendChild(pathHeader);

    // File grid container
    const grid = document.createElement("div");
    grid.style.cssText = "flex:1; padding:12px; display:flex; flex-wrap:wrap; gap:16px; align-content:flex-start; overflow-y:auto;";

    // Files mapping based on current folder
    let files = [];
    if (currentFolder === "Desktop") {
      files = [
        { name: "Downloads", type: "folder", emoji: "📁", action: () => { hasVisitedDownloads = true; currentFolder = "Downloads"; render(); } },
        { name: "Imagens", type: "folder", emoji: "📁", action: () => { 
          if (!hasVisitedDownloads) {
            lives--;
            alert("❌ Erro! Visite Downloads primeiro!");
          } else {
            hasOpenedImagens = true;
            currentFolder = "Imagens";
          }
          render();
        } }
      ];
    } else if (currentFolder === "Downloads") {
      files = [
        { name: "apostila.pdf", type: "file", emoji: "📄" },
        { name: "Instalador_Jogo.exe", type: "file", emoji: "⚙️" }
      ];
    } else if (currentFolder === "Imagens") {
      files = [
        { name: "foto_perfil.png", type: "file", emoji: "🖼️" },
        { name: "projeto_secreto.zip", type: "file", emoji: "📦", action: () => { 
          if (!hasOpenedImagens) return;
          hasFoundFile = true;
          alert("🎉 Você encontrou o arquivo oculto compactado 'projeto_secreto.zip'!");
          render();
        } }
      ];
    } else if (currentFolder === "Documentos") {
      files = [
        { name: "Trabalho_Historia.docx", type: "file", emoji: "📄" }
      ];
    } else if (currentFolder === "Videos") {
      files = [
        { name: "aula_1.mp4", type: "file", emoji: "🎥" }
      ];
    }

    files.forEach(item => {
      const card = document.createElement("div");
      card.style.cssText = "width:70px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:6px; border-radius:6px; cursor:pointer; transition: background 0.2s;";
      card.innerHTML = `<span style="font-size:1.8rem; display:block; margin-bottom:4px;">${item.emoji}</span><span style="font-size:0.6rem; color:#fff; word-break:break-all; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${item.name}</span>`;
      
      card.addEventListener("mouseenter", () => card.style.background = "rgba(255,255,255,0.05)");
      card.addEventListener("mouseleave", () => card.style.background = "");
      
      card.addEventListener("click", (e) => {
        e.stopPropagation();
        if (item.action) {
          item.action();
        } else {
          // Wrong click penalization
          lives--;
          alert(`❌ Ops! Clicar em '${item.name}' não ajuda nas suas metas atuais.`);
          render();
        }
      });
      grid.appendChild(card);
    });
    mainArea.appendChild(grid);
    explorer.appendChild(mainArea);
    widget.appendChild(explorer);

    // Tip line at the bottom
    const tipDiv = document.createElement("div");
    tipDiv.style.cssText = "margin-top:10px; font-size:0.75rem; color:#888; text-align:center; min-height:18px;";
    tipDiv.textContent = getDica();
    widget.appendChild(tipDiv);
  };

  render();
  container.appendChild(widget);
}

// 11. CLASSIFICADOR DE ARQUIVOS
function initFileClassifierSimulator(container, isReset) {
  container.innerHTML = "";
  let lives = 3;
  let score = 0;
  
  const filesToClassify = [
    { name: "documento_escola.pdf", cat: "Documentos", ext: ".pdf", explanation: "O formato .pdf (Portable Document Format) é o padrão de documentos prontos para leitura." },
    { name: "foto_viagem.png", cat: "Imagens", ext: ".png", explanation: "O formato .png é excelente para imagens digitais pois suporta fundos transparentes." },
    { name: "musica_tema.mp3", cat: "Áudios", ext: ".mp3", explanation: "A extensão .mp3 é a compressão mais popular para músicas e arquivos sonoros digitais." },
    { name: "video_aula.mp4", cat: "Vídeos", ext: ".mp4", explanation: "A extensão .mp4 junta vídeo e áudio em alta definição digital para exibição." },
    { name: "fotos_backup.zip", cat: "Compactados", ext: ".zip", explanation: "O formato .zip é usado para compactar e agrupar múltiplos arquivos em um tamanho reduzido." },
    { name: "notas_diarias.txt", cat: "Documentos", ext: ".txt", explanation: "O formato .txt é um arquivo de texto simples do Bloco de Notas, sem formatação de cor ou estilo." }
  ];
  let currentIdx = 0;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1.5rem";

  const failGame = (reason) => {
    widget.innerHTML = `
      <div class="text-center" style="padding:1.5rem 0;">
        <span style="font-size:3rem;">💥</span>
        <h4 class="mt-1" style="color:var(--color-danger);">${reason}</h4>
        <p class="text-muted text-small">Lembre-se: arquivos terminando em .pdf/.txt são Documentos, .png/.jpg são Imagens, .mp3 é Áudio, .mp4 é Vídeo e .zip é Compactado!</p>
        <button class="btn btn-secondary mt-1" id="btn-restart-classifier">Recomeçar</button>
      </div>
    `;
    widget.querySelector("#btn-restart-classifier").addEventListener("click", () => {
      initFileClassifierSimulator(container, true);
    });
  };

  const completeGame = () => {
    widget.innerHTML = `
      <div class="text-center" style="padding:1.5rem 0;">
        <span style="font-size:3rem;">🏆</span>
        <h4 class="mt-1" style="color:var(--color-success);">Classificação de Arquivos Concluída!</h4>
        <p class="text-muted text-small">Parabéns! Você provou saber exatamente qual pasta ou categoria de arquivo corresponde a cada extensão.</p>
        <span class="badge badge-success">✓ Desafio Resolvido (+50 XP)</span>
      </div>
    `;
    addXP(50);
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
  };

  const categories = ["Imagens", "Vídeos", "Áudios", "Documentos", "Compactados"];

  const render = () => {
    widget.innerHTML = "";

    if (lives <= 0) {
      failGame("Você cometeu muitos erros e perdeu as 3 vidas!");
      return;
    }

    if (currentIdx >= filesToClassify.length) {
      completeGame();
      return;
    }

    const currentFile = filesToClassify[currentIdx];

    // Status Panel
    const statusPanel = document.createElement("div");
    statusPanel.style.cssText = "display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; font-size:0.8rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;";
    statusPanel.innerHTML = `
      <span class="text-muted">Classificar Arquivo: <strong>${currentIdx + 1} de ${filesToClassify.length}</strong></span>
      <span style="color:var(--color-danger); font-weight:700;">Vidas: ${"❤️".repeat(lives)}</span>
    `;
    widget.appendChild(statusPanel);

    // Target File Card Display
    const fileCard = document.createElement("div");
    fileCard.style.cssText = "background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(236,72,153,0.1)); border:1.5px dashed var(--color-primary-light); border-radius:12px; text-align:center; padding:2rem 1rem; margin-bottom:1.5rem;";
    
    let emoji = "📄";
    if (currentFile.cat === "Imagens") emoji = "🖼️";
    if (currentFile.cat === "Vídeos") emoji = "🎥";
    if (currentFile.cat === "Áudios") emoji = "🎵";
    if (currentFile.cat === "Compactados") emoji = "📦";

    fileCard.innerHTML = `
      <span style="font-size:3.5rem; display:block; margin-bottom:8px;">${emoji}</span>
      <strong style="font-size:1.1rem; color:#fff; display:block; font-family:var(--font-mono);">${currentFile.name}</strong>
      <span class="badge badge-outline mt-1" style="font-size:0.72rem; color:var(--color-primary-light);">Extensão: ${currentFile.ext}</span>
    `;
    widget.appendChild(fileCard);

    // Option category buttons
    const btnContainer = document.createElement("div");
    btnContainer.style.cssText = "display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;";
    
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "btn btn-secondary";
      btn.style.padding = "0.75rem";
      btn.style.fontSize = "0.82rem";
      btn.textContent = cat;
      
      btn.addEventListener("click", () => {
        if (cat === currentFile.cat) {
          // Success
          alert(`✅ Correto!\n\n${currentFile.explanation}`);
          currentIdx++;
        } else {
          // Fail
          lives--;
          alert(`❌ Incorreto!\n\nO arquivo '${currentFile.name}' termina em '${currentFile.ext}' e pertence à categoria '${currentFile.cat}'.`);
        }
        render();
      });
      btnContainer.appendChild(btn);
    });
    widget.appendChild(btnContainer);
  };

  render();
  container.appendChild(widget);
}

// 12. CUSTOMIZADOR DE DESKTOP
function initDesktopCustomizerSimulator(container, isReset) {
  container.innerHTML = "";
  
  let currentBg = "Espaço Cósmico";
  let isDarkMode = true;
  let brightness = 80;
  let volume = 50;
  let isTaskbarCentered = true;

  // Goals
  let wallpaperChanged = false;
  let themeChanged = false;
  let brightnessAdjusted = false;
  let volumeAdjusted = false;
  let taskbarAligned = false;

  const wallpapers = {
    "Espaço Cósmico": "linear-gradient(135deg, #0f0c20, #15102a, #201235)",
    "Montanhas Nevadas": "linear-gradient(135deg, #1e293b, #0f172a, #020617)",
    "Neon Cyberpunk": "linear-gradient(135deg, #3b0764, #120024, #03001c)"
  };

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1rem";

  const render = () => {
    widget.innerHTML = "";

    const allCustomized = wallpaperChanged && themeChanged && brightnessAdjusted && volumeAdjusted && taskbarAligned;

    // Outer grid wrapper
    const grid = document.createElement("div");
    grid.style.cssText = "display:grid; grid-template-columns: 1.2fr 1fr; gap:16px; min-height:380px;";

    // Left Desktop Preview Frame
    const previewContainer = document.createElement("div");
    previewContainer.style.cssText = "display:flex; flex-direction:column; justify-content:space-between; border-radius:12px; border:1px solid rgba(255,255,255,0.1); overflow:hidden; position:relative; transition: all 0.3s; box-sizing:border-box;";
    previewContainer.style.background = wallpapers[currentBg];
    
    // Brightness overlay
    const opacityVal = (100 - brightness) / 100 * 0.75;
    const brightnessOverlay = document.createElement("div");
    brightnessOverlay.style.cssText = `position:absolute; inset:0; background:rgba(0,0,0,${opacityVal}); pointer-events:none; z-index:5;`;
    previewContainer.appendChild(brightnessOverlay);

    // Desktop icons
    const gridIcons = document.createElement("div");
    gridIcons.style.cssText = "padding:12px; display:flex; flex-direction:column; gap:12px; align-items:flex-start; position:relative; z-index:1;";
    gridIcons.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; width:50px;">
        <span style="font-size:1.5rem;">🖥️</span>
        <span style="font-size:0.55rem; color:#fff; margin-top:2px;">Este PC</span>
      </div>
      <div style="display:flex; flex-direction:column; align-items:center; width:50px;">
        <span style="font-size:1.5rem;">🗑️</span>
        <span style="font-size:0.55rem; color:#fff; margin-top:2px;">Lixeira</span>
      </div>
    `;
    previewContainer.appendChild(gridIcons);

    // Simulated taskbar
    const simulatedBar = document.createElement("div");
    const barBg = isDarkMode ? "rgba(10,10,20,0.85)" : "rgba(240,240,250,0.85)";
    const textColor = isDarkMode ? "#fff" : "#000";
    simulatedBar.style.cssText = `height:34px; background:${barBg}; backdrop-filter:blur(5px); border-top:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; padding:0 8px; justify-content:space-between; box-sizing:border-box; z-index:10; color:${textColor};`;

    const startBtn = document.createElement("div");
    startBtn.style.cssText = "background:linear-gradient(135deg,#7c3aed,#ec4899); border-radius:4px; padding:2px 6px; font-size:0.6rem; font-weight:700; color:#fff; cursor:pointer;";
    startBtn.textContent = "🏁 Iniciar";

    // Taskbar icons alignment
    const trayIcons = document.createElement("div");
    trayIcons.style.cssText = `display:flex; gap:6px; flex:1; margin:0 8px; justify-content:${isTaskbarCentered ? 'center' : 'flex-start'};`;
    trayIcons.innerHTML = `
      <span style="font-size:0.9rem;">🌐</span>
      <span style="font-size:0.9rem;">📁</span>
      <span style="font-size:0.9rem;">📝</span>
    `;

    const clockArea = document.createElement("div");
    clockArea.style.cssText = "font-size:0.58rem; display:flex; align-items:center; gap:4px;";
    clockArea.innerHTML = `
      <span>🔊 ${volume}%</span>
      <span>${brightness}% ☀️</span>
      <span>12:00</span>
    `;

    simulatedBar.appendChild(startBtn);
    simulatedBar.appendChild(trayIcons);
    simulatedBar.appendChild(clockArea);
    previewContainer.appendChild(simulatedBar);
    grid.appendChild(previewContainer);

    // Controls
    const controls = document.createElement("div");
    controls.style.cssText = "display:flex; flex-direction:column; gap:12px; justify-content:space-between;";

    // Checklist panel
    const checklist = document.createElement("div");
    checklist.style.cssText = "background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:10px; font-size:0.74rem;";
    checklist.innerHTML = `
      <div style="font-weight:700; margin-bottom:4px; font-family:var(--font-display);">Metas de Personalização:</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
        <div>${wallpaperChanged ? "✅" : "⬜"} Papel de Parede</div>
        <div>${themeChanged ? "✅" : "⬜"} Mudar Tema (Escuro/Claro)</div>
        <div>${brightnessAdjusted ? "✅" : "⬜"} Ajustar Brilho</div>
        <div>${volumeAdjusted ? "✅" : "⬜"} Ajustar Volume</div>
        <div>${taskbarAligned ? "✅" : "⬜"} Alinhar Barra de Tarefas</div>
      </div>
    `;
    controls.appendChild(checklist);

    // 1. Wallpaper
    const bgGroup = document.createElement("div");
    bgGroup.innerHTML = `<label style="font-size:0.75rem; font-weight:700; color:#fff; display:block; margin-bottom:4px;">🖼️ Papel de Parede:</label>`;
    const bgSelect = document.createElement("select");
    bgSelect.style.cssText = "width:100%; padding:6px; background:#1a1936; border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; font-size:0.8rem;";
    Object.keys(wallpapers).forEach(w => {
      const opt = document.createElement("option");
      opt.value = w;
      opt.textContent = w;
      if (w === currentBg) opt.selected = true;
      bgSelect.appendChild(opt);
    });
    bgSelect.addEventListener("change", (e) => {
      currentBg = e.target.value;
      wallpaperChanged = true;
      render();
    });
    bgGroup.appendChild(bgSelect);
    controls.appendChild(bgGroup);

    // 2. Theme
    const themeGroup = document.createElement("div");
    themeGroup.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.01); padding:6px; border-radius:6px;";
    themeGroup.innerHTML = `<span style="font-size:0.75rem; font-weight:700; color:#fff;">🌓 Tema Escuro / Claro:</span>`;
    const themeBtn = document.createElement("button");
    themeBtn.className = "btn btn-secondary btn-small";
    themeBtn.textContent = isDarkMode ? "Mudar para Claro" : "Mudar para Escuro";
    themeBtn.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      themeChanged = true;
      render();
    });
    themeGroup.appendChild(themeBtn);
    controls.appendChild(themeGroup);

    // 3. Brightness
    const brightGroup = document.createElement("div");
    brightGroup.innerHTML = `<div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; color:#fff; margin-bottom:2px;"><span>☀️ Brilho da Tela:</span><span>${brightness}%</span></div>`;
    const brightSlider = document.createElement("input");
    brightSlider.type = "range";
    brightSlider.min = 10;
    brightSlider.max = 100;
    brightSlider.value = brightness;
    brightSlider.style.width = "100%";
    brightSlider.addEventListener("input", (e) => {
      brightness = parseInt(e.target.value);
      brightnessAdjusted = true;
      render();
    });
    brightGroup.appendChild(brightSlider);
    controls.appendChild(brightGroup);

    // 4. Volume
    const volGroup = document.createElement("div");
    volGroup.innerHTML = `<div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; color:#fff; margin-bottom:2px;"><span>🔊 Volume do Sistema:</span><span>${volume}%</span></div>`;
    const volSlider = document.createElement("input");
    volSlider.type = "range";
    volSlider.min = 0;
    volSlider.max = 100;
    volSlider.value = volume;
    volSlider.style.width = "100%";
    volSlider.addEventListener("input", (e) => {
      volume = parseInt(e.target.value);
      volumeAdjusted = true;
      render();
    });
    volGroup.appendChild(volSlider);
    controls.appendChild(volGroup);

    // 5. Taskbar Align
    const alignGroup = document.createElement("div");
    alignGroup.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.01); padding:6px; border-radius:6px;";
    alignGroup.innerHTML = `<span style="font-size:0.75rem; font-weight:700; color:#fff;">📏 Alinhamento da Barra:</span>`;
    const alignBtn = document.createElement("button");
    alignBtn.className = "btn btn-secondary btn-small";
    alignBtn.textContent = isTaskbarCentered ? "Alinhar à Esquerda" : "Alinhar ao Centro";
    alignBtn.addEventListener("click", () => {
      isTaskbarCentered = !isTaskbarCentered;
      taskbarAligned = true;
      render();
    });
    alignGroup.appendChild(alignBtn);
    controls.appendChild(alignGroup);

    // Done Button
    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn-primary";
    doneBtn.style.width = "100%";
    doneBtn.style.padding = "0.7rem";
    doneBtn.textContent = allCustomized ? "💾 Concluir Customizações (+50 XP)" : "Ajuste os itens acima para concluir";
    doneBtn.disabled = !allCustomized;
    doneBtn.addEventListener("click", () => {
      alert("🎉 Configurações salvas e aplicadas com sucesso no Windows Virtual!");
      addXP(50);
      markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
      doneBtn.disabled = true;
      doneBtn.textContent = "✓ Customizações Concluídas!";
    });
    controls.appendChild(doneBtn);

    grid.appendChild(controls);
    widget.appendChild(grid);
  };

  render();
  container.appendChild(widget);
}

// 13. CENTRAL DE CONTROLE
function initWindowsControlCenterSimulator(container, isReset) {
  container.innerHTML = "";
  let lives = 3;
  let wifiOn = false;
  let volume = 0;
  let brightness = 15;
  let bluetoothOn = false;

  const challenges = [
    { id: 1, title: "🔊 O computador está sem som!", instruction: "Aumente o volume na barra de som para pelo menos 50%.", check: () => volume >= 50 },
    { id: 2, title: "🌐 O Wi-Fi está desligado!", instruction: "Clique no botão 'Wi-Fi' para conectá-lo à rede da escola.", check: () => wifiOn },
    { id: 3, title: "☀️ A tela está muito escura!", instruction: "Ajuste o brilho do monitor para pelo menos 60% para leitura.", check: () => brightness >= 60 },
    { id: 4, title: "🎧 O Bluetooth não conecta!", instruction: "Ative a conexão Bluetooth no painel de controle rápido.", check: () => bluetoothOn }
  ];
  let currentIdx = 0;

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1rem";

  const failGame = (reason) => {
    widget.innerHTML = `
      <div class="text-center" style="padding:1.5rem 0;">
        <span style="font-size:3rem;">💥</span>
        <h4 class="mt-1" style="color:var(--color-danger);">${reason}</h4>
        <p class="text-muted text-small">A Central de Controle Rápida do Windows gerencia os interruptores físicos mais vitais.</p>
        <button class="btn btn-secondary mt-1" id="btn-restart-control">Tentar de Novo</button>
      </div>
    `;
    widget.querySelector("#btn-restart-control").addEventListener("click", () => {
      initWindowsControlCenterSimulator(container, true);
    });
  };

  const completeGame = () => {
    widget.innerHTML = `
      <div class="text-center" style="padding:1.5rem 0;">
        <span style="font-size:3rem;">🏆</span>
        <h4 class="mt-1" style="color:var(--color-success);">Problemas Resolvidos com Sucesso!</h4>
        <p class="text-muted text-small">Você provou saber operar as configurações rápidas para solucionar dificuldades comuns no dia a dia!</p>
        <span class="badge badge-success">✓ Desafio Resolvido (+50 XP)</span>
      </div>
    `;
    addXP(50);
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
  };

  const render = () => {
    widget.innerHTML = "";

    if (lives <= 0) {
      failGame("Você perdeu todas as suas vidas!");
      return;
    }

    if (currentIdx >= challenges.length) {
      completeGame();
      return;
    }

    const currentTask = challenges[currentIdx];

    // Challenge Problem Panel
    const taskPanel = document.createElement("div");
    taskPanel.style.cssText = "background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:10px; padding:12px; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;";
    taskPanel.innerHTML = `
      <div>
        <strong style="color:var(--color-danger); font-size:0.9rem; display:block;">🚨 ${currentTask.title}</strong>
        <span class="text-muted text-small">${currentTask.instruction}</span>
      </div>
      <div style="text-align:right;">
        <span style="color:var(--color-danger); font-weight:700; display:block;">Vidas: ${"❤️".repeat(lives)}</span>
        <span class="text-muted text-small">Meta: ${currentIdx + 1}/4</span>
      </div>
    `;
    widget.appendChild(taskPanel);

    // Control Center Simulated Box
    const controlCenter = document.createElement("div");
    controlCenter.style.cssText = "max-width:280px; margin:0 auto 1.2rem; background:#181728; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:14px; box-sizing:border-box;";

    const rowButtons = document.createElement("div");
    rowButtons.style.cssText = "display:grid; grid-template-columns:1fr 1fr; gap:10px;";

    // Wi-Fi
    const wifiBtn = document.createElement("div");
    wifiBtn.style.cssText = `display:flex; flex-direction:column; justify-content:center; align-items:center; padding:12px 6px; border-radius:8px; cursor:pointer; font-size:0.75rem; transition: background 0.2s; ${wifiOn ? "background:var(--color-primary); color:#fff;" : "background:rgba(255,255,255,0.05); color:#888;"}`;
    wifiBtn.innerHTML = `<span style="font-size:1.4rem; display:block; margin-bottom:2px;">🌐</span><strong>Wi-Fi</strong><span style="font-size:0.6rem; opacity:0.8;">${wifiOn ? 'Conectado' : 'Desligado'}</span>`;
    wifiBtn.addEventListener("click", () => {
      wifiOn = !wifiOn;
      render();
    });
    rowButtons.appendChild(wifiBtn);

    // Bluetooth
    const btBtn = document.createElement("div");
    btBtn.style.cssText = `display:flex; flex-direction:column; justify-content:center; align-items:center; padding:12px 6px; border-radius:8px; cursor:pointer; font-size:0.75rem; transition: background 0.2s; ${bluetoothOn ? "background:var(--color-primary); color:#fff;" : "background:rgba(255,255,255,0.05); color:#888;"}`;
    btBtn.innerHTML = `<span style="font-size:1.4rem; display:block; margin-bottom:2px;">🎧</span><strong>Bluetooth</strong><span style="font-size:0.6rem; opacity:0.8;">${bluetoothOn ? 'Ligado' : 'Desligado'}</span>`;
    btBtn.addEventListener("click", () => {
      bluetoothOn = !bluetoothOn;
      render();
    });
    rowButtons.appendChild(btBtn);

    controlCenter.appendChild(rowButtons);

    // Sliders
    const sliders = document.createElement("div");
    sliders.style.cssText = "display:flex; flex-direction:column; gap:10px;";

    // Brightness
    const brWrapper = document.createElement("div");
    brWrapper.innerHTML = `<div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#aaa; margin-bottom:2px;"><span>☀️ Brilho</span><span>${brightness}%</span></div>`;
    const brRange = document.createElement("input");
    brRange.type = "range";
    brRange.min = 10;
    brRange.max = 100;
    brRange.value = brightness;
    brRange.style.width = "100%";
    brRange.addEventListener("input", (e) => {
      brightness = parseInt(e.target.value);
      const valText = brWrapper.querySelector("span:last-child");
      if (valText) valText.textContent = `${brightness}%`;
    });
    brWrapper.appendChild(brRange);
    sliders.appendChild(brWrapper);

    // Volume
    const volWrapper = document.createElement("div");
    volWrapper.innerHTML = `<div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#aaa; margin-bottom:2px;"><span>🔊 Volume</span><span>${volume}%</span></div>`;
    const volRange = document.createElement("input");
    volRange.type = "range";
    volRange.min = 0;
    volRange.max = 100;
    volRange.value = volume;
    volRange.style.width = "100%";
    volRange.addEventListener("input", (e) => {
      volume = parseInt(e.target.value);
      const valText = volWrapper.querySelector("span:last-child");
      if (valText) valText.textContent = `${volume}%`;
    });
    volWrapper.appendChild(volRange);
    sliders.appendChild(volWrapper);

    controlCenter.appendChild(sliders);
    widget.appendChild(controlCenter);

    // Verify
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn btn-primary";
    checkBtn.style.width = "100%";
    checkBtn.textContent = "✔️ Confirmar Resolução";
    checkBtn.addEventListener("click", () => {
      if (currentTask.check()) {
        alert("🎉 Excelente! O problema foi resolvido de forma correta.");
        currentIdx++;
      } else {
        lives--;
        alert("❌ Erro! A central de controle ainda não foi configurada corretamente para esse problema.");
      }
      render();
    });
    widget.appendChild(checkBtn);
  };

  render();
  container.appendChild(widget);
}

// 14. A GRANDE MISSÃO DO WINDOWS
function initWindowsMasterChallengeSimulator(container, isReset) {
  container.innerHTML = "";
  let lives = 3;
  let timerVal = 150; // 2.5 minutes
  let interval;

  // Checklist states
  let mStartOpen = false;
  let mCalcOpen = false;
  let mFolderCreated = false;
  let mFolderRenamed = false;
  let mFileMoved = false;
  let mDownloadsFound = false;
  let mWallpaperChanged = false;
  let mVolumeAdjusted = false;
  let mWifiOn = false;
  let mTrashRestored = false;

  // Inner simulation states
  let isRecycleBinFull = true;
  let desktopFiles = ["relatorio.pdf"];
  let folderName = "Nova Pasta";
  let targetFolderFiles = [];
  let currentBg = "bg-cyber";
  let curVolume = 10;
  let isInnerWifiConnected = false;
  let isStartVisible = false;
  let activeWindow = ""; // "explorador"

  const wallpapers = {
    "bg-cyber": "linear-gradient(135deg,#0d0b21,#1b0d2d)",
    "bg-nature": "linear-gradient(135deg,#064e3b,#022c22)",
    "bg-ocean": "linear-gradient(135deg,#1e3a8a,#172554)"
  };

  const widget = document.createElement("div");
  widget.className = "card bg-surface border-soft mt-1";
  widget.style.padding = "1rem";

  const clearTimer = () => { if (interval) clearInterval(interval); };

  const failChallenge = (reason) => {
    clearTimer();
    widget.innerHTML = `
      <div class="text-center" style="padding:1.5rem 0;">
        <span style="font-size:3rem;">💥</span>
        <h4 class="mt-1" style="color:var(--color-danger);">${reason}</h4>
        <p class="text-muted text-small">Treine um pouco mais nas metas parciais para ganhar mais agilidade!</p>
        <button class="btn btn-secondary mt-1" id="btn-restart-master">Jogar Novamente</button>
      </div>
    `;
    widget.querySelector("#btn-restart-master").addEventListener("click", () => {
      initWindowsMasterChallengeSimulator(container, true);
    });
  };

  const completeChallenge = () => {
    clearTimer();
    let stars = "⭐";
    if (timerVal > 40) stars = "⭐⭐";
    if (timerVal > 80) stars = "⭐⭐⭐";

    widget.innerHTML = `
      <div class="text-center" style="padding:1.5rem 0;">
        <span style="font-size:3.5rem; display:block;">🛡️</span>
        <h4 class="mt-1" style="color:var(--color-success);">A Grande Missão Cumprida!</h4>
        <p class="text-muted text-small">Parabéns, Guardião! Você domina o Windows com maestria!</p>
        <div style="font-size:1.5rem; margin:10px 0;">${stars}</div>
        <span class="badge badge-success">✓ Mestre do Sistema (+100 XP Extra)</span>
        <div style="margin-top:10px; font-weight:bold; color:var(--color-warning);">🎖️ Medalha 'Guardião do Windows' Desbloqueada!</div>
      </div>
    `;
    addXP(100);
    markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
    unlockAchievement("windows_guardian");
  };

  interval = setInterval(() => {
    timerVal--;
    const t = document.getElementById("win-mast-timer");
    if (t) t.textContent = `Tempo: ${timerVal}s`;
    if (timerVal <= 0) {
      failChallenge("O tempo de missão expirou!");
    }
  }, 1000);

  const render = () => {
    widget.innerHTML = "";

    if (lives <= 0) {
      failChallenge("Você cometeu 3 erros e perdeu todas as vidas!");
      return;
    }

    // Goal checks
    if (mStartOpen && mCalcOpen && mFolderCreated && mFolderRenamed && mFileMoved && mDownloadsFound && mWallpaperChanged && mVolumeAdjusted && mWifiOn && mTrashRestored) {
      completeChallenge();
      return;
    }

    // Top checklist
    const goalsPanel = document.createElement("div");
    goalsPanel.style.cssText = "background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:10px; margin-bottom:1rem; font-size:0.7rem; display:grid; grid-template-columns:1.8fr 1fr; gap:10px;";
    
    const leftGoalsHtml = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1px 8px;">
        <div>${mStartOpen ? "✅" : "⬜"} 1. Iniciar</div>
        <div>${mCalcOpen ? "✅" : "⬜"} 2. Calculadora</div>
        <div>${mFolderCreated ? "✅" : "⬜"} 3. Criar Pasta</div>
        <div>${mFolderRenamed ? "✅" : "⬜"} 4. Renomear "Trabalho"</div>
        <div>${mFileMoved ? "✅" : "⬜"} 5. Mover relatorio.pdf</div>
        <div>${mDownloadsFound ? "✅" : "⬜"} 6. Entrar Downloads</div>
        <div>${mWallpaperChanged ? "✅" : "⬜"} 7. Mudar Fundo</div>
        <div>${mVolumeAdjusted ? "✅" : "⬜"} 8. Volume (>=50%)</div>
        <div>${mWifiOn ? "✅" : "⬜"} 9. Conectar Wi-Fi</div>
        <div>${mTrashRestored ? "✅" : "⬜"} 10. Restaurar foto.png</div>
      </div>
    `;

    goalsPanel.innerHTML = `
      <div>
        <div style="font-weight:700; margin-bottom:3px; font-family:var(--font-display);">Metas do Guardião:</div>
        ${leftGoalsHtml}
      </div>
      <div style="display:flex; flex-direction:column; justify-content:center; align-items:flex-end;">
        <span style="font-weight:700; color:var(--color-warning); font-size:0.8rem;" id="win-mast-timer">Tempo: ${timerVal}s</span>
        <span style="color:var(--color-danger); font-weight:700; margin-top:2px;">Vidas: ${"❤️".repeat(lives)}</span>
      </div>
    `;
    widget.appendChild(goalsPanel);

    // Desktop
    const desktop = document.createElement("div");
    desktop.id = "mast-desktop";
    desktop.style.cssText = `position:relative; width:100%; height:380px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;`;
    desktop.style.background = wallpapers[currentBg];

    // Icons grid area
    const gridArea = document.createElement("div");
    gridArea.style.cssText = "flex:1; padding:12px; display:flex; flex-wrap:wrap; gap:16px; align-content:flex-start; position:relative;";

    // Files & Folder
    if (desktopFiles.includes("relatorio.pdf")) {
      const file = document.createElement("div");
      file.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px;";
      file.innerHTML = `<span style="font-size:1.8rem; display:block;">📄</span><span style="font-size:0.6rem; color:#fff; word-break:break-all; display:block; margin-top:2px;">relatorio.pdf</span>`;
      
      file.addEventListener("click", (e) => {
        e.stopPropagation();
        if (mFolderRenamed) {
          desktopFiles = [];
          targetFolderFiles.push("relatorio.pdf");
          mFileMoved = true;
          render();
        } else {
          lives--;
          alert("❌ Erro! Crie a pasta e mude o nome para 'Trabalho' antes de mover arquivos!");
          render();
        }
      });
      gridArea.appendChild(file);
    }

    if (mFolderCreated) {
      const folder = document.createElement("div");
      folder.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px;";
      folder.innerHTML = `
        <span style="font-size:2rem; display:block;">📁</span>
        <span style="font-size:0.6rem; color:#fff; display:block; margin-top:2px;">${folderName}</span>
      `;
      folder.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!mFolderRenamed) {
          const input = prompt("Digite o novo nome para a pasta:");
          if (input && input.trim() === "Trabalho") {
            folderName = "Trabalho";
            mFolderRenamed = true;
          } else {
            lives--;
            alert("❌ Ops! Renomeie a pasta exatamente para 'Trabalho'.");
          }
          render();
        } else {
          alert(`Pasta 'Trabalho' aberta. Arquivos internos: ${targetFolderFiles.join(", ")}`);
        }
      });
      gridArea.appendChild(folder);
    }

    // Recycle bin
    const recycle = document.createElement("div");
    recycle.style.cssText = "display:flex; flex-direction:column; align-items:center; cursor:pointer; width:64px; text-align:center; padding:4px; border-radius:6px; position:absolute; right:12px; top:12px;";
    recycle.innerHTML = `<span style="font-size:1.8rem; display:block;">🗑️</span><span style="font-size:0.6rem; color:#fff; display:block; margin-top:2px;">Lixeira</span>`;
    recycle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!isRecycleBinFull) {
        alert("Lixeira está vazia.");
        return;
      }
      const confirmRestore = confirm("Deseja abrir a Lixeira do Sistema para restaurar 'foto.png'?");
      if (confirmRestore) {
        isRecycleBinFull = false;
        mTrashRestored = true;
        alert("🎉 'foto.png' foi restaurada com sucesso!");
        render();
      }
    });
    gridArea.appendChild(recycle);

    // File Explorer Window
    if (activeWindow === "explorador") {
      const win = document.createElement("div");
      win.style.cssText = "position:absolute; width:220px; height:180px; background:#131122; border:1px solid rgba(255,255,255,0.15); border-radius:8px; left:60px; top:30px; z-index:15; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.5);";
      
      const winHeader = document.createElement("div");
      winHeader.style.cssText = "background:rgba(255,255,255,0.03); padding:6px; display:flex; justify-content:space-between; align-items:center; font-size:0.65rem; font-weight:700;";
      winHeader.innerHTML = `<span>📂 Explorador de Arquivos</span><span id="win-close-btn" style="cursor:pointer; color:var(--color-danger); font-size:0.8rem;">✕</span>`;
      
      winHeader.querySelector("#win-close-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        activeWindow = "";
        render();
      });
      win.appendChild(winHeader);

      const winBody = document.createElement("div");
      winBody.style.cssText = "flex:1; display:flex;";

      const winSidebar = document.createElement("div");
      winSidebar.style.cssText = "width:60px; background:#0b0a14; padding:6px; display:flex; flex-direction:column; gap:4px; font-size:0.55rem;";
      winSidebar.innerHTML = `
        <div id="side-downloads" style="cursor:pointer; color:#888;">📥 Downloads</div>
        <div style="color:#888;">📄 Documentos</div>
      `;

      winSidebar.querySelector("#side-downloads").addEventListener("click", (e) => {
        e.stopPropagation();
        mDownloadsFound = true;
        alert("🎉 Você abriu a pasta Downloads e completou a meta!");
        render();
      });
      winBody.appendChild(winSidebar);

      const winContent = document.createElement("div");
      winContent.style.cssText = "flex:1; padding:8px; font-size:0.55rem; color:#aaa;";
      winContent.textContent = "Selecione uma pasta lateral.";
      winBody.appendChild(winContent);

      win.appendChild(winBody);
      gridArea.appendChild(win);
    }

    // Start Menu
    const startMenu = document.createElement("div");
    startMenu.style.cssText = "position:absolute; bottom:40px; left:12px; width:150px; background:#181726; border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:6px; display:flex; flex-direction:column; gap:4px; z-index:20; box-sizing:border-box;";
    if (!isStartVisible) startMenu.style.display = "none";

    const menuItems = [
      { name: "Calculadora", emoji: "🧮", action: () => { mCalcOpen = true; alert("🧮 Calculadora aberta!"); } },
      { name: "Explorador", emoji: "📂", action: () => { activeWindow = "explorador"; } },
      { name: "Personalizar", emoji: "🎨", action: () => {
        const wallKeys = Object.keys(wallpapers);
        const nextWall = wallKeys[(wallKeys.indexOf(currentBg) + 1) % wallKeys.length];
        currentBg = nextWall;
        mWallpaperChanged = true;
        alert("🎨 Papel de parede alterado com sucesso!");
      } }
    ];

    menuItems.forEach(item => {
      const it = document.createElement("div");
      it.style.cssText = "display:flex; align-items:center; gap:6px; padding:4px 8px; font-size:0.7rem; border-radius:4px; cursor:pointer; color:#fff;";
      it.innerHTML = `<span>${item.emoji}</span><span>${item.name}</span>`;
      it.addEventListener("mouseenter", () => it.style.background = "rgba(124,58,237,0.2)");
      it.addEventListener("mouseleave", () => it.style.background = "");
      it.addEventListener("click", (e) => {
        e.stopPropagation();
        isStartVisible = false;
        if (item.action) item.action();
        render();
      });
      startMenu.appendChild(it);
    });
    gridArea.appendChild(startMenu);

    // Context Folder creation option
    if (!mFolderCreated) {
      const contextBtn = document.createElement("button");
      contextBtn.style.cssText = "position:absolute; bottom:12px; right:12px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:6px; color:#fff; font-size:0.6rem; padding:4px 8px; cursor:pointer;";
      contextBtn.textContent = "🖱️ Clique Direito > Novo > Pasta";
      contextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mFolderCreated = true;
        render();
      });
      gridArea.appendChild(contextBtn);
    }

    desktop.appendChild(gridArea);

    // Taskbar
    const bar = document.createElement("div");
    bar.style.cssText = "height:38px; background:#0c0b14; border-top:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:space-between; padding:0 12px; box-sizing:border-box;";

    const initBtn = document.createElement("button");
    initBtn.style.cssText = "background:linear-gradient(135deg,#7c3aed,#ec4899); border:none; border-radius:4px; color:#fff; font-weight:bold; font-size:0.7rem; padding:3px 8px; cursor:pointer; height:24px;";
    initBtn.innerHTML = `🏁 Iniciar`;
    initBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isStartVisible = !isStartVisible;
      mStartOpen = true;
      render();
    });
    bar.appendChild(initBtn);

    // Quick tray toggles
    const quickControls = document.createElement("div");
    quickControls.style.cssText = "display:flex; align-items:center; gap:8px;";

    const wifiBtn = document.createElement("span");
    wifiBtn.style.cssText = `cursor:pointer; font-size:0.8rem; padding:2px 6px; border-radius:4px; ${isInnerWifiConnected ? "color:var(--color-primary-light); background:rgba(124,58,237,0.15);" : "color:#666;"}`;
    wifiBtn.textContent = "🌐 Wi-Fi";
    wifiBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isInnerWifiConnected = !isInnerWifiConnected;
      if (isInnerWifiConnected) {
        mWifiOn = true;
        alert("🌐 Conectado ao Wi-Fi!");
      }
      render();
    });
    quickControls.appendChild(wifiBtn);

    const volArea = document.createElement("span");
    volArea.style.cssText = "cursor:pointer; font-size:0.7rem; color:#888;";
    volArea.textContent = `🔊 Vol: ${curVolume}%`;
    volArea.addEventListener("click", (e) => {
      e.stopPropagation();
      const val = prompt("Defina o volume (0 a 100):");
      if (val !== null) {
        const numeric = parseInt(val);
        if (numeric >= 0 && numeric <= 100) {
          curVolume = numeric;
          if (curVolume >= 50) {
            mVolumeAdjusted = true;
          }
        }
      }
      render();
    });
    quickControls.appendChild(volArea);
    bar.appendChild(quickControls);

    desktop.appendChild(bar);
    widget.appendChild(desktop);
  };

  desktop.addEventListener("click", () => {
    isStartVisible = false;
    render();
  });

  render();
  container.appendChild(widget);
}

// 15. REFLEXÃO EXTRA EXPANSÃO
function initAula4ReflexaoExtra(container, isReset) {
  container.innerHTML = "";
  const slideId = COURSE_CONTENT[state.currentSlideIndex].id;
  const saved = state.notes[slideId] || "";

  setTimeout(() => {
    const textarea = document.getElementById("exp-mission-textarea");
    const saveBtn = document.getElementById("exp-save-btn");
    const feedback = document.getElementById("exp-save-feedback");

    if (textarea) textarea.value = saved;

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const val = textarea.value.trim();
        if (val.length < 30) {
          feedback.innerHTML = `<span style="color:var(--color-danger);">❌ Reflexão muito curta! Escreva pelo menos 30 caracteres.</span>`;
          return;
        }
        
        state.notes[slideId] = val;
        addXP(50);
        markSlideAsCompleted(slideId);
        unlockAchievement("windows_guardian");
        saveBtn.disabled = true;
        feedback.innerHTML = `<span style="color:var(--color-success);">✅ Reflexão salva com sucesso! +50 XP desbloqueados. 🛡️ Medalha <strong>Guardião do Windows</strong> conquistada!</span>`;
      });
    }
  }, 100);
}

// ==========================================================================
// SUPABASE INTEGRATION, NAV & DASHBOARD HUB HANDLERS (SPA FLOW)
// ==========================================================================
/**
 * Comprime e redimensiona uma imagem usando Canvas HTML5 antes de converter para Base64.
 * Isso evita salvar strings Base64 gigantescas no banco de dados.
 */
function resizeImage(file, maxWidth, maxHeight, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calcular novas dimensões mantendo o aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Retorna a imagem comprimida como JPEG base64 (qualidade 0.75)
      callback(canvas.toDataURL("image/jpeg", 0.75));
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

window.currentUser = null;
window.currentUserProfile = null;

/**
 * Controla a exibição das três telas principais da SPA
 */
function showScreen(screenId) {
  const landingScreen = document.getElementById("screen-landing");
  const hubScreen = document.getElementById("screen-hub");
  const appScreen = document.getElementById("screen-app");

  if (screenId === "landing") {
    if (landingScreen) landingScreen.classList.remove("screen-hidden");
    if (hubScreen) hubScreen.classList.add("screen-hidden");
    if (appScreen) appScreen.classList.add("screen-hidden");
  } else if (screenId === "hub") {
    if (landingScreen) landingScreen.classList.add("screen-hidden");
    if (hubScreen) hubScreen.classList.remove("screen-hidden");
    if (appScreen) appScreen.classList.add("screen-hidden");
  } else if (screenId === "course") {
    if (landingScreen) landingScreen.classList.add("screen-hidden");
    if (hubScreen) hubScreen.classList.add("screen-hidden");
    if (appScreen) appScreen.classList.remove("screen-hidden");
  }
}

/**
 * Inicialização e escuta de eventos do Supabase e Navegação
 */
function initSupabaseIntegration() {
  // 1. Ouvinte do Estado de Autenticação do Supabase
  if (window.supabase) {
        window.supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth Event:", event);
      if (session && session.user) {
        const previousUserId = window.currentUser ? window.currentUser.id : null;
        const isSameUser = previousUserId === session.user.id;
        // Verifica se o Hub OU a tela do curso está visível (usuário já estava logado)
        const hubScreen = document.getElementById("screen-hub");
        const appScreen = document.getElementById("screen-app");
        const isInsideApp = (hubScreen && !hubScreen.classList.contains("screen-hidden")) ||
                            (appScreen && !appScreen.classList.contains("screen-hidden"));

        // Se o usuário já estava logado (hub ou aula) com o mesmo ID, apenas atualiza silenciosamente.
        // Isso evita recarregar a aula ao trocar de aba do navegador (TOKEN_REFRESHED, etc.)
        if (isSameUser && isInsideApp && event !== 'SIGNED_IN') {
          console.log("Auth silent refresh - skipping full reload to preserve lesson state. Event:", event);
          window.currentUser = session.user;
          // Atualiza somente a UI de auth na sidebar, sem resetar a tela
          const profile = window.currentUserProfile;
          updateAuthUI(true, session.user, profile);
          return;
        }

        window.currentUser = session.user;
        
        // Exibe tela de carregamento temporária no Hub
        const hubContent = document.getElementById("hub-main-panel-content");
        if (hubContent) {
          hubContent.innerHTML = `<div style="text-align:center; padding: 3rem; font-size:1.2rem;">Carregando portal do usuário...</div>`;
        }
        showScreen("hub");

        // Busca o perfil detalhado no banco de dados
        const profile = await window.getUserProfile(session.user.id);
        window.currentUserProfile = profile;
        
        // Se for um aluno, carrega o progresso do banco
        if (profile && profile.role === 'student') {
          const dbState = await window.loadProgressFromDb(session.user.id);
          if (dbState) {
            // Mescla progresso atual com o do banco de dados (prioriza o banco)
            state = { ...state, ...dbState };
            updateProgressUI();
            updateStatsUI();
            initSidebarMenu();
            loadSlide(state.currentSlideIndex);
          } else {
            // Se não houver progresso no banco, salva o atual lá
            await window.saveProgressToDb(session.user.id, state);
          }
        }

        // Renderiza o cabeçalho e conteúdo do Portal Hub
        renderHubHeader();
        renderHubContents();
        updateAuthUI(true, session.user, profile); // Mantém o status da barra lateral atualizado
      } else {
        window.currentUser = null;
        window.currentUserProfile = null;
        updateAuthUI(false);
        showScreen("landing");
      }
    });
  }

  // 2. Abas da Landing Page (Login vs Cadastro)
  const tabLogin = document.getElementById("landing-tab-login");
  const tabRegister = document.getElementById("landing-tab-register");
  const formLogin = document.getElementById("landing-login-form");
  const formRegister = document.getElementById("landing-register-form");
  const registerTabContent = document.getElementById("register-tab-content");

  if (tabLogin && tabRegister && formLogin && registerTabContent) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      formLogin.classList.remove("screen-hidden");
      registerTabContent.classList.add("screen-hidden");
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      registerTabContent.classList.remove("screen-hidden");
      formLogin.classList.add("screen-hidden");
    });
  }

  // Envio do formulário de Login da Landing Page
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("landing-login-email").value.trim();
      const password = document.getElementById("landing-login-password").value;
      const btn = formLogin.querySelector("button[type='submit']");

      try {
        btn.disabled = true;
        btn.textContent = "Entrando...";
        await window.signInUser(email, password);
        showToastNotification("🔓 Bem-vindo!", "Sua sessão foi iniciada com sucesso.");
      } catch (error) {
        console.error(error);
        window.showModernAlert("🔑 Erro de Acesso", (error.message || "Verifique suas credenciais."));
      } finally {
        btn.disabled = false;
        btn.textContent = "Entrar na Plataforma";
      }
    });
  }

  // Envio do formulário de Cadastro da Landing Page
  if (formRegister) {
    formRegister.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("landing-register-name").value.trim();
      const email = document.getElementById("landing-register-email").value.trim();
      const password = document.getElementById("landing-register-password").value;
      const btn = formRegister.querySelector("button[type='submit']");

      try {
        btn.disabled = true;
        btn.textContent = "Criando Conta...";
        await window.signUpIndependentStudent(email, password, name);
        showToastNotification("📧 Conta Criada!", "Sua conta foi criada com sucesso.");
        window.showModernAlert("🚀 Conta Criada!", "Sua conta de Aluno foi criada com sucesso! Agora insira suas credenciais na tela de login para começar.", () => {
          tabLogin.click();
        });
      } catch (error) {
        console.error(error);
        window.showModernAlert("❌ Erro ao Cadastrar", (error.message || "Erro desconhecido."));
      } finally {
        btn.disabled = false;
        btn.textContent = "Criar Conta de Aluno";
      }
    });
  }

  // --- Modal de Cadastro de Escola/Tutor ---
  const schoolRegisterModal = document.getElementById("school-register-modal");
  const schoolRegisterCloseBtn = document.getElementById("school-register-close-btn");
  const schoolRegisterForm = document.getElementById("school-register-form");

  // Abrir o modal via event delegation (funciona para botões dentro de forms ocultos)
  document.addEventListener("click", function(e) {
    if (e.target.closest(".link-create-school-trigger")) {
      e.preventDefault();
      const modal = document.getElementById("school-register-modal");
      const form = document.getElementById("school-register-form");
      if (modal) {
        modal.classList.remove("hidden");
        if (form) form.reset();
      }
    }
  });

  // Fechar o modal
  if (schoolRegisterCloseBtn) {
    schoolRegisterCloseBtn.addEventListener("click", () => {
      schoolRegisterModal.classList.add("hidden");
    });
  }
  if (schoolRegisterModal) {
    schoolRegisterModal.addEventListener("click", (e) => {
      if (e.target === schoolRegisterModal) schoolRegisterModal.classList.add("hidden");
    });
  }

  // Submit do formulário de cadastro de escola
  if (schoolRegisterForm) {
    schoolRegisterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName   = document.getElementById("sreg-fullname").value.trim();
      const schoolName = document.getElementById("sreg-schoolname").value.trim();
      const email      = document.getElementById("sreg-email").value.trim();
      const password   = document.getElementById("sreg-password").value;
      const btn        = document.getElementById("sreg-submit-btn");

      if (!window.signUpSchoolTutor) {
        window.showModernAlert("❌ Erro", "Função de cadastro não disponível. Verifique o supabase_config.js.");
        return;
      }

      try {
        btn.disabled = true;
        btn.textContent = "Criando conta...";

        await window.signUpSchoolTutor(email, password, fullName, schoolName);

        // Fechar modal e mostrar mensagem de sucesso
        schoolRegisterModal.classList.add("hidden");
        schoolRegisterForm.reset();

        window.showModernAlert(
          "🎉 Escola Cadastrada!",
          `A conta do tutor e a escola "${schoolName}" foram criadas com sucesso!\n\nFaça login com seu e-mail e senha para acessar o painel de tutor e personalizar o perfil da escola.`,
          () => {
            // Focar no campo de e-mail do login
            const loginEmail = document.getElementById("landing-login-email");
            if (loginEmail) {
              loginEmail.value = email;
              loginEmail.focus();
            }
          }
        );
      } catch (error) {
        console.error("Erro ao cadastrar escola:", error);
        window.showModernAlert("❌ Erro ao Cadastrar", error.message || "Verifique os dados e tente novamente.");
      } finally {
        btn.disabled = false;
        btn.textContent = "🏫 Criar Conta da Escola";
      }
    });
  }

  // Botão "Voltar ao Painel" dentro da interface de aula
  const backToHubBtn = document.getElementById("back-to-hub-trigger");
  if (backToHubBtn) {
    backToHubBtn.addEventListener("click", async () => {
      // Se for aluno, faz uma sincronização rápida antes de voltar
      if (window.currentUser && window.currentUserProfile && window.currentUserProfile.role === 'student') {
        try {
          backToHubBtn.disabled = true;
          backToHubBtn.innerHTML = "💾 Sincronizando...";
          await window.saveProgressToDb(window.currentUser.id, state);
          showToastNotification("💾 Progresso Salvo!", "Seu progresso foi sincronizado.");
        } catch (error) {
          console.error("Erro ao sincronizar ao voltar pro Hub:", error);
        } finally {
          backToHubBtn.disabled = false;
          backToHubBtn.innerHTML = "🔙 <span class=\"btn-text\">Painel</span>";
        }
      }
      
      // Atualiza o Hub antes de abrir a tela
      renderHubContents();
      showScreen("hub");
    });
  }
}

/**
 * /**
 * /**
 * Renderiza o cabeçalho superior do Hub (Perfil, Banner e Avatar)
 */
function renderHubHeader() {
  const headerMeta = document.getElementById("hub-user-profile-header");
  const bannerBg = document.getElementById("hub-banner-background");
  const avatarMain = document.getElementById("hub-avatar-main");
  const profileName = document.getElementById("hub-user-full-name");
  const profileRole = document.getElementById("hub-user-role-label");
  const tabsNav = document.getElementById("hub-tabs-navigation");

  if (!window.currentUserProfile) return;

  // 1. Atualizar Mídias (Banner de Fundo e Foto de Perfil/Avatar) com Fallback
  const currentBanner = window.currentUserProfile.banner_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200";
  if (bannerBg) {
    bannerBg.style.backgroundImage = `url("${currentBanner}")`;
  }

  const currentAvatar = window.currentUserProfile.avatar_url || "👨‍💻";
  if (avatarMain) {
    // Correção: Emojis complexos (como 👨‍💻) têm .length > 4 em UTF-16
    const isEmoji = !currentAvatar.startsWith("data:image") && !currentAvatar.startsWith("http");
    if (isEmoji) {
      avatarMain.innerHTML = `<span class="hub-avatar-display">${currentAvatar}</span>`;
    } else {
      avatarMain.innerHTML = `<img src="${currentAvatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;">`;
    }
  }

  // 2. Atualizar Informações Básicas
  if (profileName) {
    profileName.textContent = window.currentUserProfile.full_name || window.currentUser.email;
  }

  let roleText = "Aluno Autônomo";
  const role = window.currentUserProfile.role;
  if (role === 'admin') roleText = "Administrador Central";
  else if (role === 'school') {
    const schoolName = window.currentUserProfile.schools ? window.currentUserProfile.schools.name : "Escola";
    roleText = `Tutor • ${schoolName}`;
  }
  if (profileRole) {
    profileRole.textContent = roleText;
  }

  // 3. Renderizar Botão de Logout no Topo
  if (headerMeta) {
    headerMeta.innerHTML = `
      <button class="btn btn-outline btn-small" id="hub-logout-btn" style="background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.2);">Sair 🚪</button>
    `;
    document.getElementById("hub-logout-btn").addEventListener("click", () => {
      window.showModernConfirm("🚪 Encerrar Sessão", "Deseja realmente sair da plataforma?", async () => {
        await window.signOutUser();
        showToastNotification("🔒 Sessão Encerrada", "Você saiu da plataforma.");
      });
    });
  }

  // 4. Renderizar Abas de acordo com a função (Role)
  if (tabsNav) {
    if (role === 'student') {
      tabsNav.innerHTML = `
        <button class="tab-nav-btn active" data-tab="dashboard">📊 Meu Painel</button>
        <button class="tab-nav-btn" data-tab="curriculum">📚 Módulos</button>
        <button class="tab-nav-btn" data-tab="achievements">🏆 Conquistas</button>
        <button class="tab-nav-btn" data-tab="settings">⚙️ Configurações</button>
      `;
    } else if (role === 'school') {
      tabsNav.innerHTML = `
        <button class="tab-nav-btn active" data-tab="school-dashboard">🏫 Painel da Escola</button>
        <button class="tab-nav-btn" data-tab="school-profile">🏢 Perfil da Escola</button>
        <button class="tab-nav-btn" data-tab="settings">⚙️ Configurações</button>
      `;
    } else if (role === 'admin') {
      tabsNav.innerHTML = `
        <button class="tab-nav-btn active" data-tab="admin-dashboard">🔑 Painel Admin</button>
        <button class="tab-nav-btn" data-tab="settings">⚙️ Configurações</button>
      `;
    }

    // Adiciona escuta de cliques nas abas do Hub
    const tabButtons = tabsNav.querySelectorAll(".tab-nav-btn");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tabName = btn.getAttribute("data-tab");
        switchHubTab(tabName);
      });
    });
  }
}

/**
 * Alterna entre as abas do Hub renderizando o conteúdo dinâmico
 */
function switchHubTab(tabName) {
  const mainPanel = document.getElementById("hub-main-panel-content");
  if (!mainPanel || !window.currentUserProfile) return;

  // Limpa o painel e insere contêiner de carregamento
  mainPanel.innerHTML = `<div style="text-align:center; padding: 2rem;">Carregando...</div>`;

  if (tabName === "dashboard") {
    renderStudentDashboardTab(mainPanel);
  } else if (tabName === "curriculum") {
    renderStudentCurriculumTab(mainPanel);
  } else if (tabName === "achievements") {
    renderStudentAchievementsTab(mainPanel);
  } else if (tabName === "settings") {
    renderSettingsTab(mainPanel);
  } else if (tabName === "school-dashboard") {
    renderSchoolDashboardTab(mainPanel);
  } else if (tabName === "school-profile") {
    renderSchoolProfileTab(mainPanel);
  } else if (tabName === "admin-dashboard") {
    renderAdminDashboardTab(mainPanel);
  }
}

/**
 * ABA 1: Painel do Aluno (Resumo de Progresso e Métricas Rápidas)
 */
function renderStudentDashboardTab(container) {
  const schoolName = window.currentUserProfile.schools ? window.currentUserProfile.schools.name : "Estudo Individual";
  
  // Progresso do Curso (Baseado nas 20 Aulas da Jornada)
  let flatLessons = [];
  COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
  const totalLessons = flatLessons.length;
  
  let completedCount = 0;
  flatLessons.forEach(l => {
    if (isLessonCompleted(l)) completedCount++;
  });
  
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const achievementsCount = Object.keys(state.unlockedAchievements || {}).length;

  // Achar o título da última aula ativa para continuar
  const currentSlide = COURSE_CONTENT[state.currentSlideIndex] || COURSE_CONTENT[0];
  const lastLessonTitle = currentSlide ? currentSlide.chapter + " — " + currentSlide.title : "Início do Curso";

  // Card do perfil da escola (se o aluno estiver vinculado a uma)
  let schoolCardHtml = "";
  if (window.currentUserProfile.school_id && window.currentUserProfile.schools) {
    const school = window.currentUserProfile.schools;
    const banner = school.banner_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200";
    const logo = school.logo_url || "";
    
    schoolCardHtml = `
      <div class="school-profile-card" style="background: rgba(22, 20, 45, 0.95); border: 1px solid var(--border-soft); border-radius: var(--border-radius-lg); overflow: hidden; margin-top: 1rem;">
        <!-- Banner -->
        <div class="school-card-banner" style="background-image: url('${banner}'); height: 120px; background-size: cover; background-position: center; position: relative;">
          <!-- Logo sobreposta -->
          <div class="school-card-logo" style="width: 70px; height: 70px; border-radius: 8px; border: 3px solid rgba(22,20,45,0.95); background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; position: absolute; bottom: -25px; left: 20px; overflow: hidden; font-size: 2rem; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            ${logo ? `<img src="${logo}" style="width: 100%; height: 100%; object-fit: cover;">` : "🏫"}
          </div>
        </div>
        
        <!-- Conteúdo do card -->
        <div class="school-card-content" style="padding: 2.2rem 1.5rem 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <h4 style="margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">${school.name || "Minha Escola"}</h4>
            ${school.description ? `<p class="text-muted" style="margin-top: 0.5rem; font-size: 0.9rem; line-height: 1.45;">${school.description}</p>` : `<p class="text-muted" style="margin-top: 0.5rem; font-size: 0.9rem; font-style: italic;">Nenhuma mensagem cadastrada pela escola.</p>`}
          </div>
          
          <!-- Informações de contato se houver alguma cadastrada -->
          ${(school.contact_email || school.contact_phone || school.address) ? `
            <div class="school-card-contacts" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.8rem; padding-top: 0.8rem; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.85rem; color: var(--text-secondary);">
              ${school.contact_email ? `<div style="display:flex; align-items:center; gap:0.4rem;"><span>📧</span> <span style="word-break: break-all;">${school.contact_email}</span></div>` : ""}
              ${school.contact_phone ? `<div style="display:flex; align-items:center; gap:0.4rem;"><span>📞</span> <span>${school.contact_phone}</span></div>` : ""}
              ${school.address ? `<div style="display:flex; align-items:center; gap:0.4rem; grid-column: 1 / -1;"><span>📍</span> <span>${school.address}</span></div>` : ""}
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="student-hub-layout" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="hub-welcome-banner">
        <h3 style="margin-bottom: 0.4rem;">👋 Bem-vindo de volta, <span>${window.currentUserProfile.full_name || "Estudante"}</span>!</h3>
        <p class="text-muted" style="font-size: 0.95rem;">Escola: ${schoolName}</p>
      </div>
      
      <div class="hub-stats-grid">
        <div class="hub-stat-card">
          <span class="card-icon">🎖️</span>
          <div class="card-info">
            <span class="card-value">Nível ${state.level}</span>
            <span class="card-label">Seu Nível Atual</span>
          </div>
        </div>
        <div class="hub-stat-card">
          <span class="card-icon">⚡</span>
          <div class="card-info">
            <span class="card-value">${state.xp} XP</span>
            <span class="card-label">Experiência Acumulada</span>
          </div>
        </div>
        <div class="hub-stat-card">
          <span class="card-icon">🏆</span>
          <div class="card-info">
            <span class="card-value">${achievementsCount} / 10</span>
            <span class="card-label">Conquistas Desbloqueadas</span>
          </div>
        </div>
      </div>

      <div class="hub-progress-section">
        <div class="progress-details">
          <div style="display:flex; flex-direction:column; gap:0.2rem;">
            <h4 style="margin: 0; font-size: 1.1rem;">Seu Progresso de Jornada</h4>
            <span style="font-size:0.8rem; color:var(--text-muted);">Última página estudada: <strong>${lastLessonTitle}</strong></span>
          </div>
          <span style="font-weight: 800; font-size: 1.4rem; color: var(--color-primary-light);">${progressPercent}%</span>
        </div>
        <div class="progress-bar-large-track">
          <div class="progress-bar-large-fill" style="width: ${progressPercent}%;"></div>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 1rem;">
          <button class="btn btn-primary btn-large" id="student-hub-start-btn" style="padding: 0.8rem 2.5rem; font-size: 1.05rem;">
            🚀 ${progressPercent > 0 ? "Continuar de Onde Parei" : "Começar o Curso de Informática"}
          </button>
        </div>
      </div>

      ${schoolCardHtml}
    </div>
  `;

  document.getElementById("student-hub-start-btn").addEventListener("click", () => {
    showScreen("course");
  });
}

/**
 * ABA 2: Módulos do Curso (Curriculum / Grade de Capítulos)
 */
function renderStudentCurriculumTab(container) {
  let listHtml = `
    <div style="margin-bottom: 1.5rem;">
      <h3 style="margin-bottom: 0.2rem;">📚 Módulos e Minha Jornada</h3>
      <p class="text-muted" style="font-size:0.9rem;">Veja a trilha completa do curso. Conclua as missões passo a passo para liberar novas aulas.</p>
    </div>
  `;

  COURSE_JORNADA.forEach((modulo, modIdx) => {
    const moduloStatus = getModuloStatus(modulo.id);
    const isLocked = moduloStatus === "locked";
    
    // Contar aulas concluídas no módulo
    let completedCount = 0;
    modulo.lessons.forEach(l => {
      if (isLessonCompleted(l)) completedCount++;
    });
    
    const progressPercent = Math.round((completedCount / modulo.lessons.length) * 100);

    listHtml += `
      <div class="curriculum-module-card ${modIdx === 0 && !isLocked ? 'active' : ''} ${isLocked ? 'module-locked' : ''}" data-index="${modIdx}" style="${isLocked ? 'opacity: 0.55;' : ''}">
        <div class="curriculum-module-header" style="display:flex; justify-content:space-between; align-items:center; cursor: pointer; padding: 1.2rem;">
          <div class="curriculum-module-title-group">
            <h4 class="curriculum-module-title" style="margin:0; font-size:1.1rem; font-weight:700; color: ${isLocked ? '#888' : 'var(--text-primary)'}">
              ${modulo.icon} ${modulo.title} ${isLocked ? '🔒' : ''}
            </h4>
            <span class="curriculum-module-stats" style="font-size:0.8rem; color:var(--text-muted);">
              ${isLocked ? (modulo.descMessage || 'Módulo bloqueado.') : `${modulo.lessons.length} aulas • ${completedCount} concluídas`}
            </span>
          </div>
          ${!isLocked ? `
            <div class="curriculum-module-progress-group" style="display:flex; align-items:center; gap:0.5rem;">
              <span class="curriculum-module-progress-text" style="font-weight:700; color: var(--color-primary-light);">${progressPercent}%</span>
              <span class="curriculum-module-chevron">❯</span>
            </div>
          ` : ''}
        </div>
        
        ${!isLocked ? `
          <ul class="curriculum-lessons-list" style="list-style:none; padding: 0 1.2rem 1.2rem 1.2rem; margin:0; border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap:0.5rem; padding-top:0.8rem;">
            ${modulo.lessons.map(aula => {
              const status = getLessonStatus(aula.id);
              
              let statusIcon = "🔒";
              let color = "#555";
              
              if (status === "completed") {
                statusIcon = "✅";
                color = "#10b981";
              } else if (status === "in_progress" || status === "available") {
                statusIcon = "🟡";
                color = "#a78bfa";
              }

              if (aula.isDesafio && status !== "locked") {
                statusIcon = "🏆";
              }

              return `
                <li class="curriculum-lesson-item" style="display:flex; align-items:center; justify-content:space-between; padding: 0.5rem 0.75rem; border-radius: 6px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
                  <div style="display:flex; align-items:center; gap:0.6rem;">
                    <span style="font-size:1rem;">${statusIcon}</span>
                    <a class="curriculum-lesson-nav-link" data-lesson-id="${aula.id}" style="color: ${color}; font-weight:600; cursor:pointer; text-decoration:none; font-size:0.85rem; transition: color 0.15s;">
                      ${aula.title}
                    </a>
                  </div>
                  <span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">${aula.isDesafio ? 'Avaliação' : 'Aula'}</span>
                </li>
              `;
            }).join('')}
          </ul>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = listHtml;

  // Accordion toggle
  const cards = container.querySelectorAll(".curriculum-module-card:not(.module-locked)");
  cards.forEach(card => {
    const header = card.querySelector(".curriculum-module-header");
    header.addEventListener("click", () => {
      const isActive = card.classList.contains("active");
      cards.forEach(c => c.classList.remove("active"));
      if (!isActive) card.classList.add("active");
    });
  });

  // Eventos de clique nas aulas do currículo
  const links = container.querySelectorAll(".curriculum-lesson-nav-link");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lessonId = link.getAttribute("data-lesson-id");
      
      let flatLessons = [];
      COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
      const aula = flatLessons.find(l => l.id === lessonId);
      if (!aula) return;
      
      const status = getLessonStatus(lessonId);
      
      if (status === "locked") {
        abrirModalCuriosidade(aula);
      } else {
        if (aula.chapter) {
          const chapterSlides = COURSE_CONTENT.map((s, idx) => ({ ...s, idx })).filter(s => s.chapter === aula.chapter);
          if (chapterSlides.length > 0) {
            const pendente = chapterSlides.find(s => !state.completedSlides[s.id]);
            const targetIdx = pendente ? pendente.idx : chapterSlides[0].idx;
            loadSlide(targetIdx);
            showScreen("course");
          }
        } else {
          abrirModalAulaFutura(aula);
        }
      }
    });
    
    link.addEventListener("mouseenter", () => {
      link.style.color = "#fff";
    });
    link.addEventListener("mouseleave", () => {
      const lessonId = link.getAttribute("data-lesson-id");
      const status = getLessonStatus(lessonId);
      if (status === "completed") link.style.color = "#10b981";
      else if (status !== "locked") link.style.color = "#a78bfa";
      else link.style.color = "#555";
    });
  });
}

/**
 * ABA 3: Conquistas do Aluno (Visualização da Galeria de Medalhas)
 */
function renderStudentAchievementsTab(container) {
  let listHtml = `
    <div style="margin-bottom: 2rem;">
      <h3 style="margin-bottom: 0.2rem;">🏆 Suas Conquistas</h3>
      <p class="text-muted" style="font-size:0.9rem;">Suba de nível e execute atividades práticas no curso para desbloquear medalhas.</p>
    </div>
    <div class="achievements-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.2rem;">
  `;

  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = state.unlockedAchievements && state.unlockedAchievements[ach.id];
    
    listHtml += `
      <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" style="background: ${isUnlocked ? 'rgba(131, 82, 255, 0.05)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${isUnlocked ? 'rgba(131,82,255,0.2)' : 'rgba(255,255,255,0.05)'}; padding: 1.2rem; border-radius: 8px; display: flex; gap: 1rem; align-items: center; opacity: ${isUnlocked ? '1' : '0.45'}; transition: all var(--transition-fast);">
        <div class="achievement-icon" style="font-size: 2.2rem; background: rgba(255,255,255,0.02); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          ${isUnlocked ? ach.icon : "🔒"}
        </div>
        <div class="achievement-info" style="display: flex; flex-direction: column; gap: 0.15rem;">
          <h4 style="margin: 0; font-size: 0.95rem; color: ${isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)'};">${ach.title}</h4>
          <span style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.3;">${ach.desc}</span>
          ${isUnlocked ? '<span style="font-size: 0.7rem; color: var(--color-primary-light); font-weight:700; margin-top:2px;">Desbloqueado!</span>' : ''}
        </div>
      </div>
    `;
  });

  listHtml += `</div>`;
  container.innerHTML = listHtml;
}

/**
 * /**
 * ABA 4: Configurações do Perfil (Nome, Avatar e Banner Customizados)
 */
function renderSettingsTab(container) {
  // Lista de Avatares Pré-definidos
  const AVATARS = ["👨‍💻", "👩‍💻", "🧑‍🎓", "👩‍🎓", "🚀", "👾", "🐱", "🦊", "🐻", "🐼"];
  
  // Lista de Banners Pré-definidos
  const BANNERS = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", // Glass Wave
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200", // Cyberpunk Neon
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200", // Data Net
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200"  // Soft Gradient
  ];

  const currentAvatar = window.currentUserProfile.avatar_url || "👨‍💻";
  const currentBanner = window.currentUserProfile.banner_url || BANNERS[0];

  let selectedAvatar = currentAvatar;
  let selectedBanner = currentBanner;

  container.innerHTML = `
    <div style="margin-bottom: 2rem;">
      <h3 style="margin-bottom: 0.2rem;">⚙️ Configurações da Conta</h3>
      <p class="text-muted" style="font-size:0.9rem;">Gerencie o visual do seu perfil, altere seu avatar ou faça upload de novas imagens de banner.</p>
    </div>

    <form id="hub-settings-form">
      <div class="settings-grid-layout">
        
        <!-- Coluna Esquerda: Dados do Usuário e Foto de Perfil -->
        <div class="hub-card-box" style="display:flex; flex-direction:column; gap:1.2rem;">
          <h4>👤 Informações do Perfil</h4>
          
          <div class="form-group-custom">
            <label for="settings-display-name">Nome Completo</label>
            <input type="text" id="settings-display-name" required value="${window.currentUserProfile.full_name || ''}">
          </div>

          <!-- Seletor de Avatar -->
          <div class="form-group-custom">
            <label>Selecione um Avatar Ilustrativo</label>
            <div class="avatar-picker-grid" style="margin-bottom: 1rem;">
              ${AVATARS.map(emoji => `
                <div class="avatar-option-item ${currentAvatar === emoji ? 'selected' : ''}" data-avatar="${emoji}">${emoji}</div>
              `).join('')}
            </div>
            
            <label style="font-weight:600; display:block; margin-bottom: 0.4rem;">Ou envie uma Foto de Perfil</label>
            <div class="upload-btn-wrapper">
              <button type="button" class="btn btn-outline btn-small" id="trigger-avatar-upload" style="display:flex; align-items:center; gap:0.4rem; padding: 0.6rem 1.2rem;">
                📤 Carregar Nova Foto
              </button>
              <input type="file" id="settings-avatar-upload" accept="image/*" style="display: none;">
            </div>
            <div id="avatar-upload-preview" style="margin-top:0.5rem; font-size:0.78rem; color:var(--color-primary-light); font-weight: 500;"></div>
          </div>
        </div>

        <!-- Coluna Direita: Gerenciamento do Banner do Cabeçalho -->
        <div class="hub-card-box" style="display:flex; flex-direction:column; gap:1.2rem;">
          <h4>🖼️ Mídia do Banner de Fundo</h4>
          
          <!-- Seletor de Banners -->
          <div class="form-group-custom">
            <label>Selecione um Tema de Banner</label>
            <div class="banner-picker-grid" style="margin-bottom: 1rem;">
              ${BANNERS.map((bgUrl, idx) => `
                <div class="banner-option-item ${currentBanner === bgUrl ? 'selected' : ''}" data-banner="${bgUrl}" style="background-image: url('${bgUrl}');"></div>
              `).join('')}
            </div>
            
            <div class="banner-upload-box" style="background: rgba(255,255,255,0.01); border: 1px dashed rgba(255,255,255,0.1); padding: 1.2rem; border-radius: 6px;">
              <p class="text-small text-muted" style="margin-bottom: 0.8rem; font-size: 0.78rem; line-height: 1.45;">
                📐 <strong>Instruções de Medida Ideal:</strong><br>
                Recomendamos imagens panorâmicas de <strong>1200x200 pixels</strong> (proporção panorâmica 6:1).<br>
                Isso garante um corte central limpo e perfeito no topo do seu portal.<br>
                Formatos: <strong>JPG, PNG, WEBP</strong>. Limite: <strong>2MB</strong>.
              </p>
              <button type="button" class="btn btn-outline btn-small" id="trigger-banner-upload" style="display:flex; align-items:center; gap:0.4rem; padding: 0.6rem 1.2rem;">
                📤 Carregar Novo Banner
              </button>
              <input type="file" id="settings-banner-upload" accept="image/*" style="display: none;">
              <div id="banner-upload-preview" style="margin-top:0.5rem; font-size:0.78rem; color:var(--color-primary-light); font-weight: 500;"></div>
            </div>
          </div>

          <div style="margin-top: auto; display: flex; justify-content: flex-end;">
            <button type="submit" class="btn btn-primary" style="padding:0.75rem 2rem;">Salvar Configurações</button>
          </div>
        </div>

      </div>
    </form>
  `;

  // --- Lógica Interativa de Seleção ---
  const avatarItems = container.querySelectorAll(".avatar-option-item");
  const avatarUploadInput = document.getElementById("settings-avatar-upload");
  const triggerAvatarBtn = document.getElementById("trigger-avatar-upload");
  const avatarPreviewText = document.getElementById("avatar-upload-preview");
  
  const syncSettingsPreviews = () => {
    const avatarPrev = document.getElementById("settings-avatar-preview");
    if (avatarPrev) {
      const isEmoji = !selectedAvatar.startsWith("data:image") && !selectedAvatar.startsWith("http");
      if (isEmoji) {
        avatarPrev.innerHTML = `<span style="font-size: 2.2rem; line-height: 1;">${selectedAvatar}</span>`;
      } else {
        avatarPrev.innerHTML = `<img src="${selectedAvatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;">`;
      }
    }
    const bannerPrev = document.getElementById("settings-banner-preview");
    if (bannerPrev) {
      bannerPrev.style.backgroundImage = `url("${selectedBanner}")`;
    }
  };

  // Sincronização inicial
  syncSettingsPreviews();

  // Triggers para abrir seletor de arquivos ao clicar nos botões customizados
  if (triggerAvatarBtn && avatarUploadInput) {
    triggerAvatarBtn.addEventListener("click", () => {
      avatarUploadInput.click();
    });
  }

  // Preview Instantâneo e Seleção dos Emojis de Avatar
  avatarItems.forEach(item => {
    item.addEventListener("click", () => {
      avatarItems.forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");
      selectedAvatar = item.getAttribute("data-avatar");
      avatarUploadInput.value = ""; // Limpa arquivo carregado
      avatarPreviewText.textContent = "";

      // Preview imediato no cabeçalho e na página de configurações
      syncSettingsPreviews();
      const avatarMain = document.getElementById("hub-avatar-main");
      if (avatarMain) {
        avatarMain.innerHTML = `<span class="hub-avatar-display">${selectedAvatar}</span>`;
      }
    });
  });

  // Preview Instantâneo e Upload de Foto de Perfil
  avatarUploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        window.showModernAlert("⚠️ Foto Muito Grande", "O tamanho da foto excede o limite de 2MB. Por favor, escolha um arquivo menor.");
        avatarUploadInput.value = "";
        return;
      }
      avatarPreviewText.textContent = "⌛ Processando imagem...";
      
      // Comprime e redimensiona para 120x120 para o avatar ficar bem leve
      resizeImage(file, 120, 120, (base64) => {
        selectedAvatar = base64;
        avatarItems.forEach(i => i.classList.remove("selected"));
        avatarPreviewText.textContent = "✅ Foto pronta para salvar!";
        
        // Preview imediato no cabeçalho e nas configurações
        syncSettingsPreviews();
        const avatarMain = document.getElementById("hub-avatar-main");
        if (avatarMain) {
          avatarMain.innerHTML = `<img src="${selectedAvatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;">`;
        }
        showToastNotification("📸 Foto Carregada!", "Foto do perfil atualizada na visualização.");
      });
    }
  });

  const bannerItems = container.querySelectorAll(".banner-option-item");
  const bannerUploadInput = document.getElementById("settings-banner-upload");
  const triggerBannerBtn = document.getElementById("trigger-banner-upload");
  const bannerPreviewText = document.getElementById("banner-upload-preview");

  if (triggerBannerBtn && bannerUploadInput) {
    triggerBannerBtn.addEventListener("click", () => {
      bannerUploadInput.click();
    });
  }

  // Preview Instantâneo e Seleção dos Temas de Banner
  bannerItems.forEach(item => {
    item.addEventListener("click", () => {
      bannerItems.forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");
      selectedBanner = item.getAttribute("data-banner");
      bannerUploadInput.value = ""; // Limpa arquivo de banner
      bannerPreviewText.textContent = "";

      // Preview imediato no cabeçalho e nas configurações
      syncSettingsPreviews();
      const bannerBg = document.getElementById("hub-banner-background");
      if (bannerBg) {
        bannerBg.style.backgroundImage = `url("${selectedBanner}")`;
      }
    });
  });

  // Preview Instantâneo e Upload de Banner Personalizado
  bannerUploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        window.showModernAlert("⚠️ Arquivo Muito Grande", "O tamanho do banner excede o limite de 3MB. Selecione uma imagem menor.");
        bannerUploadInput.value = "";
        return;
      }
      bannerPreviewText.textContent = "⌛ Redimensionando banner para 1200x200...";
      
      // Redimensiona o banner para 1200x200 para salvar espaço e manter proporção
      resizeImage(file, 1200, 200, (base64) => {
        selectedBanner = base64;
        bannerItems.forEach(i => i.classList.remove("selected"));
        bannerPreviewText.textContent = "✅ Banner pronto para salvar!";
        
        // Preview imediato no cabeçalho e nas configurações
        syncSettingsPreviews();
        const bannerBg = document.getElementById("hub-banner-background");
        if (bannerBg) {
          bannerBg.style.backgroundImage = `url("${selectedBanner}")`;
        }
        showToastNotification("🖼️ Banner Carregado!", "Imagem do banner atualizada na visualização.");
      });
    }
  });

  // --- Submit do Formulário de Configurações ---
  const form = document.getElementById("hub-settings-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    const displayName = document.getElementById("settings-display-name").value.trim();

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Salvando...";

      // Salva no Supabase Profiles
      await window.updateUserProfile(window.currentUser.id, {
        full_name: displayName,
        avatar_url: selectedAvatar,
        banner_url: selectedBanner
      });

      // Atualiza Cache Local
      window.currentUserProfile.full_name = displayName;
      window.currentUserProfile.avatar_url = selectedAvatar;
      window.currentUserProfile.banner_url = selectedBanner;

      // Re-renderiza o cabeçalho e avisa
      renderHubHeader();
      showToastNotification("⚙️ Configurações Salvas!", "Seu perfil foi atualizado com sucesso.");
      window.showModernAlert("⚙️ Configurações Salvas!", "Seu perfil foi atualizado com sucesso no banco de dados.");
      
      // Atualiza a aba atual
      switchHubTab("settings");
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error);
      window.showModernAlert("❌ Erro ao Salvar", "Não foi possível salvar o perfil: " + (error.message || "Erro desconhecido."));
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Salvar Configurações";
    }
  });
}

/**
 * ABA 5 (Escola): Painel da Escola (Gestão de Alunos)
 */
function renderSchoolDashboardTab(container) {
  const schoolName = window.currentUserProfile.schools ? window.currentUserProfile.schools.name : "Minha Escola";
  
  container.innerHTML = `
    <div class="school-hub-layout">
      <div class="school-hub-grid" style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 2rem;">
        
        <!-- Cadastro de Aluno -->
        <div class="hub-card-box">
          <h4 style="margin-bottom: 0.5rem;">➕ Cadastrar Novo Aluno</h4>
          <p class="text-small text-muted" style="margin-bottom: 1.5rem; font-size: 0.85rem;">Crie o login e senha provisória do aluno. Ele usará esses dados para entrar no portal.</p>
          
          <form id="hub-create-student-form">
            <div class="form-group-custom">
              <label for="hub-student-name">Nome Completo do Aluno</label>
              <input type="text" id="hub-student-name" required placeholder="Nome do Aluno">
            </div>
            <div class="form-group-custom">
              <label for="hub-student-email">E-mail de Acesso</label>
              <input type="email" id="hub-student-email" required placeholder="aluno@escola.com">
            </div>
            <div class="form-group-custom">
              <label for="hub-student-password">Senha Provisória</label>
              <input type="text" id="hub-student-password" required minlength="6" placeholder="Crie uma senha (min 6)">
            </div>
            <button type="submit" class="btn btn-primary btn-full" style="margin-top: 1rem;">Registrar Aluno</button>
          </form>
        </div>

        <!-- Tabela de Alunos -->
        <div class="hub-card-box" style="display: flex; flex-direction: column; min-height: 400px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h4 style="margin: 0;">👥 Alunos da Escola e Progresso</h4>
            <button class="btn btn-outline btn-small" id="school-hub-view-course-btn">📚 Material do Curso</button>
          </div>
          
          <div style="overflow-x: auto; flex-grow: 1;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
              <thead>
                <tr style="border-bottom: 2px solid rgba(255,255,255,0.1);">
                  <th style="padding: 0.5rem; font-weight: 600;">Nome</th>
                  <th style="padding: 0.5rem; font-weight: 600;">E-mail</th>
                  <th style="padding: 0.5rem; font-weight: 600;">Nível/XP</th>
                  <th style="padding: 0.5rem; font-weight: 600;">Progresso</th>
                </tr>
              </thead>
              <tbody id="hub-school-students-table-body">
                <tr><td colspan="4" style="text-align:center; padding: 2rem;">Carregando alunos...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // Ações do painel do tutor
  document.getElementById("school-hub-view-course-btn").addEventListener("click", () => {
    showScreen("course");
  });

  const createForm = document.getElementById("hub-create-student-form");
  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("hub-student-name").value.trim();
    const email = document.getElementById("hub-student-email").value.trim();
    const password = document.getElementById("hub-student-password").value;
    const btn = createForm.querySelector("button[type='submit']");

    try {
      btn.disabled = true;
      btn.textContent = "Registrando...";
      await window.registerStudentBySchool(email, password, name, window.currentUserProfile.school_id);
      alert("Aluno registrado com sucesso! Entregue o e-mail e senha criados para ele acessar.");
      createForm.reset();
      await loadHubSchoolStudents();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar aluno: " + (error.message || "Erro desconhecido."));
    } finally {
      btn.disabled = false;
      btn.textContent = "Registrar Aluno";
    }
  });

  loadHubSchoolStudents();
}

/**
 * ABA 5.2 (Escola): Configurações do Perfil da Escola
 */
function renderSchoolProfileTab(container) {
  if (!window.currentUserProfile || !window.currentUserProfile.schools) {
    container.innerHTML = `<div style="text-align:center; padding: 2rem;">Erro: Sua conta não está vinculada a nenhuma escola. Contate o administrador.</div>`;
    return;
  }

  const school = window.currentUserProfile.schools;
  const currentLogo = school.logo_url || "";
  const currentBanner = school.banner_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200";

  let selectedLogo = currentLogo;
  let selectedBanner = currentBanner;

  container.innerHTML = `
    <div style="margin-bottom: 2rem;">
      <h3 style="margin-bottom: 0.2rem;">🏢 Perfil Público da Escola</h3>
      <p class="text-muted" style="font-size:0.9rem;">Gerencie a identidade visual e informações de contato da sua escola. Estes dados serão exibidos no painel dos seus alunos.</p>
    </div>

    <form id="hub-school-settings-form">
      <div class="settings-grid-layout">
        
        <!-- Coluna Esquerda: Logotipo e Banner -->
        <div class="hub-card-box" style="display:flex; flex-direction:column; gap:1.2rem;">
          <h4>🖼️ Identidade Visual</h4>
          
          <!-- Upload de Logotipo -->
          <div class="form-group-custom">
            <label style="font-weight:600; display:block; margin-bottom: 0.8rem;">Logotipo da Escola</label>
            <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
              <div id="school-logo-preview" style="width: 80px; height: 80px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; overflow: hidden; font-size: 2rem;">
                ${currentLogo ? `<img src="${currentLogo}" style="width: 100%; height: 100%; object-fit: cover;">` : "🏫"}
              </div>
              <div>
                <button type="button" class="btn btn-outline btn-small" id="trigger-school-logo-upload" style="display:flex; align-items:center; gap:0.4rem; padding: 0.5rem 1rem;">
                  📤 Enviar Logo
                </button>
                <input type="file" id="school-logo-upload" accept="image/*" style="display: none;">
                <div id="school-logo-upload-status" style="margin-top:0.4rem; font-size:0.75rem; color:var(--color-primary-light);"></div>
              </div>
            </div>
          </div>

          <!-- Upload de Banner -->
          <div class="form-group-custom">
            <label style="font-weight:600; display:block; margin-bottom: 0.8rem;">Banner Superior da Escola</label>
            <div id="school-banner-preview" style="width: 100%; height: 100px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background-size: cover; background-position: center; background-image: url('${currentBanner}'); margin-bottom: 1rem;"></div>
            
            <div class="banner-upload-box" style="background: rgba(255,255,255,0.01); border: 1px dashed rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px;">
              <p class="text-small text-muted" style="margin-bottom: 0.8rem; font-size: 0.75rem; line-height: 1.4;">
                Recomendamos imagens horizontais de <strong>1200x200 pixels</strong> (proporção panorâmica 6:1) para corte perfeito.<br>
                Limite: <strong>2MB</strong>.
              </p>
              <button type="button" class="btn btn-outline btn-small" id="trigger-school-banner-upload" style="display:flex; align-items:center; gap:0.4rem; padding: 0.5rem 1rem;">
                📤 Enviar Banner
              </button>
              <input type="file" id="school-banner-upload" accept="image/*" style="display: none;">
              <div id="school-banner-upload-status" style="margin-top:0.4rem; font-size:0.75rem; color:var(--color-primary-light);"></div>
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Informações de Cadastro e Contato -->
        <div class="hub-card-box" style="display:flex; flex-direction:column; gap:1.2rem;">
          <h4>📝 Dados Gerais e Contatos</h4>
          
          <div class="form-group-custom">
            <label for="settings-school-name">Nome da Escola</label>
            <input type="text" id="settings-school-name" required value="${school.name || ''}" placeholder="Nome Oficial da Escola">
          </div>

          <div class="form-group-custom">
            <label for="settings-school-description">Mensagem de Boas-vindas / Bio da Escola</label>
            <textarea id="settings-school-description" style="width:100%; min-height:80px; padding:0.6rem; border-radius:4px; border:1px solid rgba(255,255,255,0.15); background:#1a1936; color:#fff; font-family:inherit; font-size:0.9rem; resize:vertical;" placeholder="Ex: Escola focada no ensino tecnológico e inclusão digital para jovens da comunidade.">${school.description || ''}</textarea>
          </div>

          <div class="form-group-custom">
            <label for="settings-school-email">E-mail de Contato</label>
            <input type="email" id="settings-school-email" value="${school.contact_email || ''}" placeholder="contato@escola.com">
          </div>

          <div class="form-group-custom">
            <label for="settings-school-phone">Telefone de Contato</label>
            <input type="text" id="settings-school-phone" value="${school.contact_phone || ''}" placeholder="(XX) XXXXX-XXXX">
          </div>

          <div class="form-group-custom">
            <label for="settings-school-address">Endereço Completo</label>
            <input type="text" id="settings-school-address" value="${school.address || ''}" placeholder="Rua, Número, Bairro, Cidade - Estado">
          </div>

          <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
            <button type="submit" class="btn btn-primary" style="padding:0.75rem 2rem;">Salvar Perfil da Escola</button>
          </div>
        </div>

      </div>
    </form>
  `;

  // --- Lógica de Upload de Logo ---
  const logoUploadInput = document.getElementById("school-logo-upload");
  const triggerLogoBtn = document.getElementById("trigger-school-logo-upload");
  const logoStatus = document.getElementById("school-logo-upload-status");
  const logoPreview = document.getElementById("school-logo-preview");

  if (triggerLogoBtn && logoUploadInput) {
    triggerLogoBtn.addEventListener("click", () => logoUploadInput.click());
  }

  logoUploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        window.showModernAlert("⚠️ Foto Muito Grande", "O tamanho da logo excede o limite de 2MB. Selecione um arquivo menor.");
        logoUploadInput.value = "";
        return;
      }
      logoStatus.textContent = "⌛ Processando imagem...";
      resizeImage(file, 150, 150, (base64) => {
        selectedLogo = base64;
        logoStatus.textContent = "✅ Logo pronta para salvar!";
        logoPreview.innerHTML = `<img src="\${selectedLogo}" style="width: 100%; height: 100%; object-fit: cover;">`;
        showToastNotification("📸 Logo Carregada!", "Imagem da logo atualizada na visualização.");
      });
    }
  });

  // --- Lógica de Upload de Banner ---
  const bannerUploadInput = document.getElementById("school-banner-upload");
  const triggerBannerBtn = document.getElementById("trigger-school-banner-upload");
  const bannerStatus = document.getElementById("school-banner-upload-status");
  const bannerPreview = document.getElementById("school-banner-preview");

  if (triggerBannerBtn && bannerUploadInput) {
    triggerBannerBtn.addEventListener("click", () => bannerUploadInput.click());
  }

  bannerUploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        window.showModernAlert("⚠️ Foto Muito Grande", "O tamanho do banner excede o limite de 2MB. Selecione uma imagem menor.");
        bannerUploadInput.value = "";
        return;
      }
      bannerStatus.textContent = "⌛ Redimensionando banner para 1200x200...";
      resizeImage(file, 1200, 200, (base64) => {
        selectedBanner = base64;
        bannerStatus.textContent = "✅ Banner pronto para salvar!";
        bannerPreview.style.backgroundImage = `url("\${selectedBanner}")`;
        showToastNotification("🖼️ Banner Carregado!", "Imagem do banner atualizada na visualização.");
      });
    }
  });

  // --- Envio de Formulário ---
  const form = document.getElementById("hub-school-settings-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    const schoolName = document.getElementById("settings-school-name").value.trim();
    const description = document.getElementById("settings-school-description").value.trim();
    const contactEmail = document.getElementById("settings-school-email").value.trim();
    const contactPhone = document.getElementById("settings-school-phone").value.trim();
    const address = document.getElementById("settings-school-address").value.trim();

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Salvando...";

      // Chama atualização da escola
      await window.updateSchoolProfile(window.currentUserProfile.school_id, {
        name: schoolName,
        description: description,
        logo_url: selectedLogo,
        banner_url: selectedBanner,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        address: address
      });

      // Atualiza Cache Local
      window.currentUserProfile.schools.name = schoolName;
      window.currentUserProfile.schools.description = description;
      window.currentUserProfile.schools.logo_url = selectedLogo;
      window.currentUserProfile.schools.banner_url = selectedBanner;
      window.currentUserProfile.schools.contact_email = contactEmail;
      window.currentUserProfile.schools.contact_phone = contactPhone;
      window.currentUserProfile.schools.address = address;

      // Re-renderiza o cabeçalho e avisa
      renderHubHeader();
      showToastNotification("🏫 Perfil Salvo!", "O perfil da escola foi atualizado com sucesso.");
      window.showModernAlert("🏫 Perfil da Escola Salvo!", "O perfil público da escola foi atualizado no banco de dados.");
      
      // Atualiza a aba
      switchHubTab("school-profile");
    } catch (error) {
      console.error("Erro ao atualizar perfil da escola:", error);
      window.showModernAlert("❌ Erro ao Salvar", "Não foi possível salvar o perfil: " + (error.message || "Erro desconhecido."));
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Salvar Perfil da Escola";
    }
  });
}

/**
 * ABA 6 (Admin): Painel do Admin Central
 */
function renderAdminDashboardTab(container) {
  container.innerHTML = `
    <div class="admin-hub-layout">
      <div class="admin-hub-grid" style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 2rem;">
        
        <!-- Cadastro de Escola -->
        <div class="hub-card-box">
          <h4 style="margin-bottom: 1rem;">🏫 Cadastrar Nova Escola</h4>
          <form id="hub-create-school-form" style="margin-bottom: 2rem;">
            <div class="form-group-custom">
              <label for="hub-school-name">Nome da Escola</label>
              <input type="text" id="hub-school-name" required placeholder="Ex: Escola Estadual Machado de Assis">
            </div>
            <button type="submit" class="btn btn-primary btn-full" style="margin-top: 1rem;">Criar Escola</button>
          </form>

          <h4 style="margin-bottom: 0.5rem;">Escolas do Sistema</h4>
          <ul id="hub-admin-schools-list" style="list-style: none; padding: 0; max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem;">
            <li style="text-align:center;">Carregando escolas...</li>
          </ul>
        </div>

        <!-- Tabela Global de Alunos -->
        <div class="hub-card-box" style="display: flex; flex-direction: column; min-height: 400px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h4 style="margin: 0;">🌍 Todos os Alunos Cadastrados</h4>
            <button class="btn btn-outline btn-small" id="admin-hub-view-course-btn">📚 Material do Curso</button>
          </div>
          
          <div style="overflow-x: auto; flex-grow: 1;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
              <thead>
                <tr style="border-bottom: 2px solid rgba(255,255,255,0.1);">
                  <th style="padding: 0.5rem; font-weight: 600;">Nome</th>
                  <th style="padding: 0.5rem; font-weight: 600;">Escola</th>
                  <th style="padding: 0.5rem; font-weight: 600;">Nível/XP</th>
                  <th style="padding: 0.5rem; font-weight: 600;">Progresso</th>
                </tr>
              </thead>
              <tbody id="hub-admin-students-table-body">
                <tr><td colspan="4" style="text-align:center; padding: 2rem;">Carregando alunos...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("admin-hub-view-course-btn").addEventListener("click", () => {
    showScreen("course");
  });

  const createSchoolForm = document.getElementById("hub-create-school-form");
  createSchoolForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const schoolName = document.getElementById("hub-school-name").value.trim();
    const btn = createSchoolForm.querySelector("button[type='submit']");

    try {
      btn.disabled = true;
      btn.textContent = "Criando...";
      await window.createSchool(schoolName);
      alert("Escola cadastrada com sucesso!");
      createSchoolForm.reset();
      await loadHubAdminSchools();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar escola: " + (error.message || "Erro desconhecido."));
    } finally {
      btn.disabled = false;
      btn.textContent = "Criar Escola";
    }
  });

  loadHubAdminSchools();
  loadHubAdminStudents();
}

/**
 * Método que renderiza o Hub inicialmente
 */
async function renderHubContents() {
  if (!window.currentUserProfile) return;
  const role = window.currentUserProfile.role;
  
  if (role === 'student') {
    switchHubTab("dashboard");
  } else if (role === 'school') {
    switchHubTab("school-dashboard");
  } else if (role === 'admin') {
    switchHubTab("admin-dashboard");
  }
}

/**
 * Carrega a tabela de alunos da escola no Hub do Tutor
 */
async function loadHubSchoolStudents() {
  const tableBody = document.getElementById("hub-school-students-table-body");
  if (!tableBody || !window.currentUserProfile || !window.currentUserProfile.school_id) return;

  try {
    const students = await window.getSchoolStudents(window.currentUserProfile.school_id);
    tableBody.innerHTML = "";

    if (students.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-secondary);">Nenhum aluno cadastrado nesta escola.</td></tr>`;
      return;
    }

    students.forEach(student => {
      let progressPercent = 0;
      let level = 1;
      let xp = 0;
      let completedSlides = {};
      let currentSlide = 0;
      
      if (student.progress && student.progress.state) {
        const studentState = student.progress.state;
        xp = studentState.xp || 0;
        level = studentState.level || 1;
        completedSlides = studentState.completedSlides || {};
        currentSlide = studentState.currentSlideIndex || 0;
        
        let completedLessons = studentState.completedLessons || {};
        let flatLessons = [];
        COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
        const totalLessons = flatLessons.length;
        
        let complCount = 0;
        flatLessons.forEach(l => {
          let c = false;
          if (l.chapter) {
            const slides = COURSE_CONTENT.filter(s => s.chapter === l.chapter);
            c = slides.length > 0 && slides.every(s => completedSlides[s.id] === true);
          } else {
            c = completedLessons[l.id] === true;
          }
          if (c) complCount++;
        });
        progressPercent = totalLessons > 0 ? Math.round((complCount / totalLessons) * 100) : 0;
      }

      const currentLessonTitle = COURSE_CONTENT[currentSlide] ? COURSE_CONTENT[currentSlide].title : "—";

      const tr = document.createElement("tr");
      tr.style.cssText = "cursor:pointer; transition: background 0.15s;";
      tr.innerHTML = `
        <td style="padding: 0.75rem 0.5rem; font-weight:700;">${student.full_name || "Sem Nome"}</td>
        <td style="padding: 0.75rem 0.5rem; color: var(--text-secondary); font-size:0.85rem;">${student.email || "—"}</td>
        <td style="padding: 0.75rem 0.5rem;">Nv ${level} <span class="text-muted" style="font-size:0.8rem;">(${xp} XP)</span></td>
        <td style="padding: 0.75rem 0.5rem;">
          <div class="progress-bar-mini-track">
            <div class="progress-bar-mini-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <span style="font-weight:700;">${progressPercent}%</span>
        </td>
        <td style="padding: 0.75rem 0.5rem;">
          <button class="btn btn-outline btn-small" style="font-size:0.78rem; padding:0.25rem 0.6rem;">🔍 Ver Detalhes</button>
        </td>
      `;

      // Hover
      tr.addEventListener("mouseenter", () => tr.style.background = "rgba(255,255,255,0.04)");
      tr.addEventListener("mouseleave", () => tr.style.background = "");

      // Clique em "Ver Detalhes"
      tr.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        abrirDetalheAluno(student, { progressPercent, level, xp, completedSlides, currentSlide, currentLessonTitle });
      });

      tableBody.appendChild(tr);
    });

    // Atualiza header para incluir coluna de ação
    const thead = tableBody.closest("table").querySelector("thead tr");
    if (thead && thead.children.length === 4) {
      const th = document.createElement("th");
      th.style.cssText = "padding: 0.5rem; font-weight: 600;";
      th.textContent = "Ação";
      thead.appendChild(th);
    }

  } catch (error) {
    console.error(error);
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--color-error);">Erro ao carregar dados.</td></tr>`;
  }
}

/**
 * Abre modal com progresso detalhado de um aluno individual
 */
function abrirDetalheAluno(student, stats) {
  const existing = document.getElementById("detalhe-aluno-modal");
  if (existing) existing.remove();

  // Junta todas as 20 aulas do curso
  let flatLessons = [];
  COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
  const totalLessons = flatLessons.length;
  
  if (!stats.completedLessons) stats.completedLessons = {};

  // Monta lista de aulas concluídas e pendentes baseando-se na Jornada Geral
  const aulaRows = flatLessons.map((aula, idx) => {
    let concluida = false;
    if (aula.chapter) {
      const slides = COURSE_CONTENT.filter(s => s.chapter === aula.chapter);
      concluida = slides.length > 0 && slides.every(s => stats.completedSlides[s.id] === true);
    } else {
      concluida = stats.completedLessons && stats.completedLessons[aula.id] === true;
    }

    const status = concluida
      ? `<span style="color:#22c55e; font-weight:600;">✅ Concluída</span>`
      : `<span style="color:#666;">⬜ Pendente</span>`;

    return `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
        <td style="padding:0.4rem 0.5rem; font-size:0.82rem; color:#aaa;">${idx + 1}</td>
        <td style="padding:0.4rem 0.5rem; font-size:0.85rem;">${aula.title}</td>
        <td style="padding:0.4rem 0.5rem; text-align:center;">${status}</td>
      </tr>
    `;
  }).join("");

  // Conta quantas aulas estão concluídas
  const completedCount = flatLessons.filter(l => {
    if (l.chapter) {
      const slides = COURSE_CONTENT.filter(s => s.chapter === l.chapter);
      return slides.length > 0 && slides.every(s => stats.completedSlides[s.id] === true);
    } else {
      return stats.completedLessons && stats.completedLessons[l.id] === true;
    }
  }).length;

  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  stats.progressPercent = progressPercent;

  const overlay = document.createElement("div");
  overlay.id = "detalhe-aluno-modal";
  overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:99999;display:flex;align-items:center;justify-content:center;";

  overlay.innerHTML = `
    <div style="background:#1a1a2e;border:1px solid #7c3aed;border-radius:16px;padding:1.5rem;width:95%;max-width:680px;max-height:85vh;overflow-y:auto;position:relative;color:#fff;">
      <button onclick="document.getElementById('detalhe-aluno-modal').remove()" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;">×</button>
      
      <h3 style="margin:0 0 0.25rem;">👤 ${student.full_name || "Aluno"}</h3>
      <p style="margin:0 0 1.5rem; color:#aaa; font-size:0.85rem;">${student.email || ""}</p>

      <!-- Cards de Resumo -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
        <div style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:10px;padding:1rem;text-align:center;">
          <div style="font-size:1.6rem;font-weight:800;">${stats.level}</div>
          <div style="font-size:0.8rem;color:#aaa;">Nível</div>
        </div>
        <div style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:10px;padding:1rem;text-align:center;">
          <div style="font-size:1.6rem;font-weight:800;">${stats.xp}</div>
          <div style="font-size:0.8rem;color:#aaa;">XP Total</div>
        </div>
        <div style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:10px;padding:1rem;text-align:center;">
          <div style="font-size:1.6rem;font-weight:800;">${completedCount}/${totalLessons}</div>
          <div style="font-size:0.8rem;color:#aaa;">Aulas (${progressPercent}%)</div>
        </div>
      </div>

      <!-- Barra de Progresso -->
      <div style="background:rgba(255,255,255,0.08);border-radius:99px;height:10px;margin-bottom:1.5rem;overflow:hidden;">
        <div style="background:linear-gradient(90deg,#7c3aed,#a78bfa);height:100%;width:${progressPercent}%;border-radius:99px;transition:width 0.5s;"></div>
      </div>

      <!-- Ações de Conclusão Rápida -->
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(124, 58, 237, 0.25); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;">
        <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem; color: var(--color-primary-light);">
          ⚡ Conclusão Rápida de Aulas (Tutor)
        </h4>
        <p class="text-muted" style="margin: 0 0 0.8rem; font-size: 0.78rem; line-height: 1.45;">
          Marque ou desmarque a conclusão das aulas inteiras para este aluno. Isso poupará o tempo do aluno de revisar slides caso ele já tenha feito a aula fisicamente na escola.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; max-height: 160px; overflow-y: auto; padding: 0.2rem;" id="tutor-quick-completion-actions"></div>
      </div>

      <!-- Tabela de Aulas -->
      <h4 style="margin:0 0 0.75rem;font-size:0.95rem;">📋 Progresso por Aula</h4>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;">
          <thead>
            <tr style="border-bottom:2px solid rgba(255,255,255,0.1);">
              <th style="padding:0.4rem 0.5rem;text-align:left;color:#aaa;font-weight:600;">#</th>
              <th style="padding:0.4rem 0.5rem;text-align:left;color:#aaa;font-weight:600;">Aula</th>
              <th style="padding:0.4rem 0.5rem;text-align:center;color:#aaa;font-weight:600;">Status</th>
            </tr>
          </thead>
          <tbody>${aulaRows}</tbody>
        </table>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

  // Renderiza botões de ação rápida e trata cliques
  const renderQuickActions = () => {
    const quickActionsContainer = document.getElementById("tutor-quick-completion-actions");
    if (!quickActionsContainer) return;
    quickActionsContainer.innerHTML = "";

    flatLessons.forEach(aula => {
      let concluida = false;
      let slidesDaAula = [];

      if (aula.chapter) {
        slidesDaAula = COURSE_CONTENT.filter(s => s.chapter === aula.chapter);
        concluida = slidesDaAula.length > 0 && slidesDaAula.every(s => stats.completedSlides[s.id] === true);
      } else {
        concluida = stats.completedLessons && stats.completedLessons[aula.id] === true;
      }
      
      const btn = document.createElement("button");
      btn.style.cssText = "padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 700; border-radius: 6px; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem;";
      
      const shortName = aula.title.replace("Introdução à Informática", "Introdução").substring(0, 16);

      if (concluida) {
        btn.innerHTML = `<span>↩️</span> Reset ${shortName}`;
        btn.style.background = "rgba(239, 68, 68, 0.12)";
        btn.style.borderColor = "rgba(239, 68, 68, 0.3)";
        btn.style.color = "#ef4444";
      } else {
        btn.innerHTML = `<span>✅</span> Concluir ${shortName}`;
        btn.style.background = "rgba(16, 185, 129, 0.12)";
        btn.style.borderColor = "rgba(16, 185, 129, 0.3)";
        btn.style.color = "#10b981";
      }

      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "Processando...";
        try {
          // 1. Carrega o progresso atual do aluno direto do Supabase
          let studentState = await window.loadProgressFromDb(student.id);
          if (!studentState) {
            studentState = {
              currentSlideIndex: 0,
              completedSlides: {},
              completedLessons: {},
              unlockedAchievements: {},
              xp: 0,
              level: 1
            };
          }
          if (!studentState.completedLessons) {
            studentState.completedLessons = {};
          }

          // 2. Marca/desmarca a aula
          if (aula.chapter) {
            slidesDaAula.forEach(s => {
              if (concluida) {
                delete studentState.completedSlides[s.id];
              } else {
                studentState.completedSlides[s.id] = true;
              }
            });
            if (concluida) {
              delete studentState.completedLessons[aula.id];
            } else {
              studentState.completedLessons[aula.id] = true;
            }
          } else {
            if (concluida) {
              delete studentState.completedLessons[aula.id];
            } else {
              studentState.completedLessons[aula.id] = true;
            }
          }

          // 3. Atualiza as conquistas correspondentes de forma automática
          if (!concluida) {
            if (aula.id === "aula-3") studentState.unlockedAchievements["peripheral_master"] = true;
            if (aula.id === "aula-4") {
              studentState.unlockedAchievements["windows_explorer"] = true;
              studentState.unlockedAchievements["windows_guardian"] = true;
            }
            if (aula.id === "aula-8") studentState.unlockedAchievements["windows_explorer"] = true; // Medalha do Desafio do Módulo 1
            if (aula.id === "aula-20") studentState.unlockedAchievements["graduated"] = true; // Certificado final
          } else {
            if (aula.id === "aula-3") delete studentState.unlockedAchievements["peripheral_master"];
            if (aula.id === "aula-4") {
              delete studentState.unlockedAchievements["windows_explorer"];
              delete studentState.unlockedAchievements["windows_guardian"];
            }
            if (aula.id === "aula-8") {
              if (!studentState.completedLessons["aula-4"]) {
                delete studentState.unlockedAchievements["windows_explorer"];
              }
            }
            if (aula.id === "aula-20") delete studentState.unlockedAchievements["graduated"];
          }

          // 4. Recalcula XP e Nível do Aluno
          let calculatedXp = 0;
          COURSE_CONTENT.forEach(slide => {
            if (studentState.completedSlides[slide.id]) {
              if (slide.type === "challenge" || slide.type === "quiz") {
                calculatedXp += 50;
              } else {
                calculatedXp += 10;
              }
            }
          });

          flatLessons.forEach(l => {
            if (!l.chapter && studentState.completedLessons[l.id]) {
              calculatedXp += 50; // Aulas virtuais dão 50 XP
            }
          });

          Object.keys(studentState.unlockedAchievements).forEach(achId => {
            if (studentState.unlockedAchievements[achId]) {
              calculatedXp += 100; // 100 XP por conquista
            }
          });

          studentState.xp = calculatedXp;
          studentState.level = Math.floor(calculatedXp / 100) + 1;

          // 5. Salva de volta no Supabase
          await window.saveProgressToDb(student.id, studentState);

          // 6. Atualiza estado em cache na janela modal local
          stats.completedSlides = studentState.completedSlides;
          stats.completedLessons = studentState.completedLessons;
          stats.xp = studentState.xp;
          stats.level = studentState.level;

          // Progresso total por aulas da jornada
          let userCompletedCount = 0;
          flatLessons.forEach(l => {
            let compl = false;
            if (l.chapter) {
              const slides = COURSE_CONTENT.filter(s => s.chapter === l.chapter);
              compl = slides.length > 0 && slides.every(s => stats.completedSlides[s.id] === true);
            } else {
              compl = stats.completedLessons && stats.completedLessons[l.id] === true;
            }
            if (compl) userCompletedCount++;
          });

          stats.progressPercent = totalLessons > 0 ? Math.round((userCompletedCount / totalLessons) * 100) : 0;

          // 7. Atualiza a UI do próprio modal
          const levelCard = overlay.querySelector("div[style*='rgba(124,58,237,0.15)'] div");
          const xpCard = overlay.querySelectorAll("div[style*='rgba(124,58,237,0.15)']")[1].querySelector("div");
          const completedCard = overlay.querySelectorAll("div[style*='rgba(124,58,237,0.15)']")[2].querySelector("div");
          const progressBar = overlay.querySelector("div[style*='rgba(255,255,255,0.08)'] div");

          if (levelCard) levelCard.textContent = stats.level;
          if (xpCard) xpCard.textContent = stats.xp;
          if (completedCard) completedCard.textContent = `${userCompletedCount}/${totalLessons}`;
          if (progressBar) progressBar.style.width = `${stats.progressPercent}%`;

          // 8. Atualiza a lista de aulas na tabela no modal
          const newAulaRows = flatLessons.map((l, idx) => {
            let compl = false;
            if (l.chapter) {
              const slides = COURSE_CONTENT.filter(s => s.chapter === l.chapter);
              compl = slides.length > 0 && slides.every(s => stats.completedSlides[s.id] === true);
            } else {
              compl = stats.completedLessons && stats.completedLessons[l.id] === true;
            }
            
            const statusStr = compl
              ? `<span style="color:#22c55e; font-weight:600;">✅ Concluída</span>`
              : `<span style="color:#666;">⬜ Pendente</span>`;
                
            return `
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:0.4rem 0.5rem; font-size:0.82rem; color:#aaa;">${idx + 1}</td>
                <td style="padding:0.4rem 0.5rem; font-size:0.85rem;">${l.title}</td>
                <td style="padding:0.4rem 0.5rem; text-align:center;">${statusStr}</td>
              </tr>
            `;
          }).join("");
          overlay.querySelector("tbody").innerHTML = newAulaRows;

          // 9. Recarrega as ações rápidas
          renderQuickActions();

          // 10. Recarrega a tabela de alunos no painel do Hub de fundo
          await loadHubSchoolStudents();

        } catch (error) {
          console.error("Erro ao salvar progresso rápido:", error);
          alert("Ocorreu um erro ao sincronizar no banco: " + (error.message || error));
        } finally {
          btn.disabled = false;
        }
      });
      quickActionsContainer.appendChild(btn);
    });
  };

  renderQuickActions();
}

/**
 * Carrega a lista de escolas no Hub do Admin
 */
async function loadHubAdminSchools() {
  const schoolsList = document.getElementById("hub-admin-schools-list");
  if (!schoolsList) return;

  try {
    const schools = await window.getAllSchools();
    schoolsList.innerHTML = "";

    if (schools.length === 0) {
      schoolsList.innerHTML = `<li style="text-align:center; padding:0.5rem; color:var(--text-secondary);">Nenhuma escola criada.</li>`;
      return;
    }

    schools.forEach(school => {
      const li = document.createElement("li");
      li.className = "school-list-item";
      li.innerHTML = `
        <span style="font-weight:700;">${school.name}</span>
        <span style="font-size:0.7rem; color:var(--text-secondary);">${school.id.substring(0, 8)}...</span>
      `;
      schoolsList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    schoolsList.innerHTML = `<li style="text-align:center; padding:0.5rem; color:var(--color-error);">Erro ao carregar escolas.</li>`;
  }
}

/**
 * Carrega a listagem global de alunos no Hub do Admin
 */
async function loadHubAdminStudents() {
  const studentsTable = document.getElementById("hub-admin-students-table-body");
  if (!studentsTable) return;

  try {
    const students = await window.getAllStudentsAdmin();
    studentsTable.innerHTML = "";

    if (students.length === 0) {
      studentsTable.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem; color:var(--text-secondary);">Nenhum aluno cadastrado no sistema.</td></tr>`;
      return;
    }

    students.forEach(student => {
      let progressPercent = 0;
      let level = 1;
      let xp = 0;
      
      if (student.progress && student.progress.state) {
        const studentState = student.progress.state;
        xp = studentState.xp || 0;
        level = studentState.level || 1;
        
        let completedSlides = studentState.completedSlides || {};
        let completedLessons = studentState.completedLessons || {};
        let flatLessons = [];
        COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
        const totalLessons = flatLessons.length;
        
        let complCount = 0;
        flatLessons.forEach(l => {
          let c = false;
          if (l.chapter) {
            const slides = COURSE_CONTENT.filter(s => s.chapter === l.chapter);
            c = slides.length > 0 && slides.every(s => completedSlides[s.id] === true);
          } else {
            c = completedLessons[l.id] === true;
          }
          if (c) complCount++;
        });
        progressPercent = totalLessons > 0 ? Math.round((complCount / totalLessons) * 100) : 0;
      }

      const schoolName = student.schools ? student.schools.name : "Independente";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="padding: 0.75rem 0.5rem; font-weight:700;">${student.full_name || "Sem Nome"}</td>
        <td style="padding: 0.75rem 0.5rem; font-style: ${student.school_id ? 'normal' : 'italic'}; color: ${student.school_id ? 'var(--text-primary)' : 'var(--color-primary-light)'};">${schoolName}</td>
        <td style="padding: 0.75rem 0.5rem;">Nível ${level} <span class="text-muted" style="font-size:0.8rem;">(${xp} XP)</span></td>
        <td style="padding: 0.75rem 0.5rem;">
          <div class="progress-bar-mini-track">
            <div class="progress-bar-mini-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <span style="font-weight:700;">${progressPercent}%</span>
        </td>
      `;
      studentsTable.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    studentsTable.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:2rem; color:var(--color-error);">Erro ao carregar dados dos alunos.</td></tr>`;
  }
}

/**
 * Mantém o botão de login antigo atualizado caso acessem a área de aula diretamente
 */
function updateAuthUI(isLoggedIn, user = null, profile = null) {
  const container = document.getElementById("auth-status-container");
  if (!container) return;

  if (isLoggedIn && user && profile) {
    let roleText = "Aluno";
    
    if (profile.role === 'admin') roleText = "Administrador";
    else if (profile.role === 'school') {
      const schoolName = profile.schools ? profile.schools.name : "Escola";
      roleText = `Tutor (${schoolName})`;
    }

    container.innerHTML = `
      <div class="user-profile-info">
        <span class="user-profile-name" title="${profile.full_name || user.email}">${profile.full_name || user.email}</span>
        <span class="user-profile-role">${roleText}</span>
      </div>
      <button class="btn btn-outline btn-full btn-small" id="sidebar-logout-btn" style="margin-top: 4px;">Sair 🚪</button>
    `;

    document.getElementById("sidebar-logout-btn").addEventListener("click", () => {
      window.showModernConfirm("🚪 Encerrar Sessão", "Deseja realmente sair do seu perfil e encerrar a sessão?", async () => {
        await window.signOutUser();
        showToastNotification("🔒 Sessão Encerrada", "Você saiu da plataforma.");
      });
    });
  } else {
    container.innerHTML = `<button class="btn btn-outline btn-full" id="login-modal-trigger">🔑 Entrar / Cadastrar</button>`;
    const trigger = document.getElementById("login-modal-trigger");
    if (trigger) {
      trigger.addEventListener("click", () => {
        showScreen("landing");
      });
    }
  }
}


// ==========================================================================
// 12. SIMULADORES INTERATIVOS - AULA 5 (ORGANIZAÇÃO DIGITAL)
// ==========================================================================

// 1. Memória Digital (Review Mission)
function initReviewMissionSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  const questions = [
    {
      q: "Onde ficam armazenados os arquivos que você apagou temporariamente no Windows?",
      options: ["Meus Documentos", "Área de Trabalho", "Lixeira", "Explorador de Arquivos"],
      correct: 2,
      exp: "Os arquivos deletados vão para a Lixeira e podem ser restaurados se você mudar de ideia antes de esvaziá-la!"
    },
    {
      q: "Qual dispositivo de hardware é usado principalmente para digitar e produzir textos?",
      options: ["Mouse", "Teclado", "Monitor", "Impressora"],
      correct: 1,
      exp: "O Teclado é o periférico de entrada principal para digitação e entrada de caracteres textuais."
    },
    {
      q: "Qual menu do Windows dá acesso à lista de todos os programas e aplicativos instalados?",
      options: ["Menu Iniciar", "Lixeira", "Barra de Tarefas", "Explorador de Pastas"],
      correct: 0,
      exp: "O Menu Iniciar é o portal inicial que lista todos os aplicativos e configurações do Windows."
    },
    {
      q: "Qual é a função básica de um Sistema Operacional?",
      options: [
        "Apenas permitir que você jogue mini games.",
        "Gerenciar o hardware da máquina e rodar os outros programas com segurança.",
        "Aumentar a velocidade da sua conexão de internet.",
        "Excluir arquivos inúteis automaticamente a cada hora."
      ],
      correct: 1,
      exp: "O Sistema Operacional (como o Windows) é a base de software que faz a ponte entre o hardware físico e você."
    },
    {
      q: "Onde fica localizada por padrão a Barra de Tarefas no Windows?",
      options: ["No topo da tela", "Na lateral esquerda", "Na parte inferior da tela", "Escondida no menu iniciar"],
      correct: 2,
      exp: "Por padrão do Windows, a barra de tarefas estende-se ao longo da margem inferior da tela."
    }
  ];

  let currentIdx = 0;
  let score = 0;

  const renderQuestion = () => {
    if (currentIdx >= questions.length) {
      container.innerHTML = `
        <div style="text-align:center; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(16,185,129,0.3); border-radius:12px;">
          <span style="font-size:3rem; display:block; margin-bottom:0.5rem;">🎉</span>
          <h4 style="color:#10b981; margin:0 0 0.5rem; font-size:1.2rem;">Aquecimento Concluído!</h4>
          <p style="font-size:0.88rem; color:#ccc; margin-bottom:1rem;">Você acertou ${score} de ${questions.length} perguntas de revisão.</p>
          <button class="btn btn-primary" id="btn-finish-review-sim" style="width:100%;">🏁 Continuar Aula</button>
        </div>
      `;
      document.getElementById("btn-finish-review-sim").addEventListener("click", () => {
        addXP(30);
        showToastNotification("🧠 Revisado!", "Você concluiu o aquecimento.");
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const qItem = questions[currentIdx];
    
    container.innerHTML = `
      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem;">
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.8rem; font-weight:700;">
          <span>🧠 QUESTÃO DE AQUECIMENTO</span>
          <span>${currentIdx + 1} / ${questions.length}</span>
        </div>
        
        <h4 style="margin:0 0 1.2rem; font-size:0.95rem; line-height:1.45; color:#fff;">${qItem.q}</h4>
        
        <div style="display:flex; flex-direction:column; gap:8px;" id="review-sim-options">
          ${qItem.options.map((opt, i) => `
            <button class="btn btn-outline" style="text-align:left; font-size:0.82rem; padding:0.6rem 0.8rem; justify-content:flex-start; font-weight:normal;" data-idx="${i}">
              ${opt}
            </button>
          `).join("")}
        </div>
        
        <div id="review-sim-feedback" style="margin-top:1.2rem; display:none; padding:0.8rem; border-radius:8px; font-size:0.8rem; line-height:1.4;"></div>
      </div>
    `;

    const btns = container.querySelectorAll("#review-sim-options button");
    const feed = container.querySelector("#review-sim-feedback");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.disabled = true);
        const selected = parseInt(btn.getAttribute("data-idx"));
        
        feed.style.display = "block";
        if (selected === qItem.correct) {
          score++;
          btn.style.background = "rgba(16, 185, 129, 0.15)";
          btn.style.borderColor = "#10b981";
          btn.style.color = "#10b981";
          feed.style.background = "rgba(16, 185, 129, 0.05)";
          feed.style.border = "1px solid rgba(16, 185, 129, 0.2)";
          feed.style.color = "#22c55e";
          feed.innerHTML = `<strong>✅ Correto!</strong> ${qItem.exp}`;
        } else {
          btn.style.background = "rgba(239, 68, 68, 0.15)";
          btn.style.borderColor = "#ef4444";
          btn.style.color = "#ef4444";
          
          const correctBtn = btns[qItem.correct];
          correctBtn.style.background = "rgba(16, 185, 129, 0.15)";
          correctBtn.style.borderColor = "#10b981";
          correctBtn.style.color = "#10b981";
          
          feed.style.background = "rgba(239, 68, 68, 0.05)";
          feed.style.border = "1px solid rgba(239, 68, 68, 0.2)";
          feed.style.color = "#f87171";
          feed.innerHTML = `<strong>❌ Errado!</strong> ${qItem.exp}`;
        }

        const nextQBtn = document.createElement("button");
        nextQBtn.className = "btn btn-primary";
        nextQBtn.style.cssText = "width:100%; margin-top:1rem; font-size:0.82rem;";
        nextQBtn.textContent = currentIdx === questions.length - 1 ? "🏁 Finalizar Aquecimento" : "Próxima Pergunta ➔";
        nextQBtn.addEventListener("click", () => {
          currentIdx++;
          renderQuestion();
        });
        feed.appendChild(nextQBtn);
      });
    });
  };

  renderQuestion();
}

// 2. Faxina Digital (Digital Cleanup)
function initDigitalCleanupSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  let files = [
    { name: "foto_familia.png", cat: "images", icon: "🖼️" },
    { name: "trabalho_historia.pdf", cat: "docs", icon: "📄" },
    { name: "video_aniversario.mp4", cat: "media", icon: "🎬" },
    { name: "musica_indie.mp3", cat: "media", icon: "🎵" },
    { name: "relatorio_financas.txt", cat: "docs", icon: "📄" },
    { name: "fotos_viagem.zip", cat: "archives", icon: "📦" }
  ];

  let lives = 3;
  let score = 0;
  let timeLeft = 45;
  let timerInterval;

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  const updateStatsHeader = () => {
    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <span style="font-weight:700; color:#ef4444;">⏱️ Tempo: ${timeLeft}s</span>
        <span style="font-weight:700; color:#10b981;">📋 Progresso: ${score}/6</span>
      </div>
      <div id="cleanup-desktop-area" style="min-height:280px; display:grid; grid-template-columns: 1fr; gap: 1rem;">
        <!-- Zonas de Pastas -->
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;" id="folders-dropzones">
          <div class="dropzone" data-cat="images" style="background:rgba(59,130,246,0.1); border:1px dashed #3b82f6; border-radius:8px; padding:0.6rem; text-align:center; transition: all 0.2s;">
            <span style="font-size:1.8rem; display:block;">📁</span>
            <span style="font-size:0.75rem; font-weight:700; color:#93c5fd;">Imagens</span>
          </div>
          <div class="dropzone" data-cat="docs" style="background:rgba(16,185,129,0.1); border:1px dashed #10b981; border-radius:8px; padding:0.6rem; text-align:center; transition: all 0.2s;">
            <span style="font-size:1.8rem; display:block;">📁</span>
            <span style="font-size:0.75rem; font-weight:700; color:#6ee7b7;">Documentos</span>
          </div>
          <div class="dropzone" data-cat="media" style="background:rgba(245,158,11,0.1); border:1px dashed #f59e0b; border-radius:8px; padding:0.6rem; text-align:center; transition: all 0.2s;">
            <span style="font-size:1.8rem; display:block;">📁</span>
            <span style="font-size:0.75rem; font-weight:700; color:#fde047;">Áudio/Vídeo</span>
          </div>
          <div class="dropzone" data-cat="archives" style="background:rgba(167,139,250,0.1); border:1px dashed #a78bfa; border-radius:8px; padding:0.6rem; text-align:center; transition: all 0.2s;">
            <span style="font-size:1.8rem; display:block;">📁</span>
            <span style="font-size:0.75rem; font-weight:700; color:#c084fc;">Compactados</span>
          </div>
        </div>

        <!-- Arquivos Soltos -->
        <div id="loose-files" style="display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; align-items:center; background:rgba(255,255,255,0.02); border-radius:8px; padding:0.8rem; border:1px solid rgba(255,255,255,0.04);">
          ${files.map((f, idx) => `
            <div class="draggable-file" data-idx="${idx}" draggable="true" style="padding:0.4rem 0.6rem; background:#121226; border:1px solid rgba(255,255,255,0.12); border-radius:6px; font-size:0.76rem; display:flex; align-items:center; gap:0.3rem; cursor:grab; user-select:none; transition:transform 0.15s;">
              <span>${f.icon}</span> <span>${f.name}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Re-bind de eventos Drag and Drop
    const draggables = mainDiv.querySelectorAll(".draggable-file");
    const dropzones = mainDiv.querySelectorAll(".dropzone");

    draggables.forEach(drag => {
      drag.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", drag.getAttribute("data-idx"));
        drag.style.transform = "scale(0.92)";
      });
      drag.addEventListener("dragend", () => {
        drag.style.transform = "";
      });
    });

    dropzones.forEach(zone => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.style.background = "rgba(255,255,255,0.08)";
      });
      zone.addEventListener("dragleave", () => {
        zone.style.background = zone.style.background.replace("rgba(255,255,255,0.08)", "");
      });
      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        const idx = parseInt(e.dataTransfer.getData("text/plain"));
        const targetCat = zone.getAttribute("data-cat");
        
        const f = files[idx];
        if (f) {
          if (f.cat === targetCat) {
            score++;
            files.splice(idx, 1);
            showToastNotification("✅ Organizado!", `O arquivo ${f.name} foi movido com sucesso.`);
            if (files.length === 0) {
              clearInterval(timerInterval);
              addXP(50);
              mainDiv.innerHTML = `
                <div style="text-align:center; padding:2rem 0;">
                  <span style="font-size:3rem; display:block;">🎉</span>
                  <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Área de Trabalho Limpa!</h4>
                  <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Excelente faxina digital! Todos os arquivos estão guardados.</p>
                  <button class="btn btn-primary" id="btn-finish-cleanup-sim" style="width:100%;">Próxima Etapa ➔</button>
                </div>
              `;
              document.getElementById("btn-finish-cleanup-sim").addEventListener("click", () => {
                const nextBtn = document.getElementById("next-slide-btn");
                if (nextBtn) nextBtn.click();
              });
            } else {
              updateStatsHeader();
            }
          } else {
            lives--;
            if (lives <= 0) {
              clearInterval(timerInterval);
              mainDiv.innerHTML = `
                <div style="text-align:center; padding:2rem 0;">
                  <span style="font-size:3rem; display:block;">❌</span>
                  <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Vidas Esgotadas!</h4>
                  <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você colocou os arquivos na pasta errada muitas vezes.</p>
                  <button class="btn btn-outline" id="btn-retry-cleanup-sim" style="width:100%;">Tentar Novamente 🔄</button>
                </div>
              `;
              document.getElementById("btn-retry-cleanup-sim").addEventListener("click", () => {
                initDigitalCleanupSimulator(container, true);
              });
            } else {
              showToastNotification("❌ Pasta Incorreta!", "Tente organizar em outra categoria.");
              updateStatsHeader();
            }
          }
        }
      });
    });
  };

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3rem; display:block;">⏱️</span>
          <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Tempo Esgotado!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">O tempo limite de 45 segundos acabou.</p>
          <button class="btn btn-outline" id="btn-retry-cleanup-time" style="width:100%;">Tentar Novamente 🔄</button>
        </div>
      `;
      document.getElementById("btn-retry-cleanup-time").addEventListener("click", () => {
        initDigitalCleanupSimulator(container, true);
      });
    } else {
      const timeSpan = mainDiv.querySelector("span[style*='color:#ef4444']");
      if (timeSpan) timeSpan.textContent = `⏱️ Tempo: ${timeLeft}s`;
    }
  }, 1000);

  updateStatsHeader();
}

// 3. Arquiteto Digital (Folder Architect)
function initFolderArchitectSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  let lives = 3;
  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  const drawUI = () => {
    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <strong style="color:var(--color-primary-light); font-size:0.85rem;">🛠️ Missão: Crie a estrutura Trabalho ➔ Relatorios ➔ Financeiro</strong>
      </div>
      
      <div style="background:rgba(255,255,255,0.02); border-radius:10px; padding:1.2rem; border:1px solid rgba(255,255,255,0.05); margin-bottom:1.2rem; display:flex; flex-direction:column; gap:0.8rem;">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span style="font-size:1.3rem;">📂</span>
          <span style="font-size:0.85rem; color:#ccc;">Pasta Principal (Nível 1):</span>
          <select id="select-lvl-1" style="background:#121226; color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.35rem; font-size:0.8rem; outline:none; font-weight:700;">
            <option value="">-- Selecionar --</option>
            <option value="Escola">📁 Escola</option>
            <option value="Trabalho">📁 Trabalho</option>
            <option value="Lixeira">📁 Lixeira</option>
          </select>
        </div>
        
        <div style="display:flex; align-items:center; gap:0.6rem; margin-left:1.5rem;">
          <span style="font-size:1.3rem; transform: rotate(90deg); display:inline-block; color:#666;">↳</span>
          <span style="font-size:1.3rem;">📂</span>
          <span style="font-size:0.85rem; color:#ccc;">Subpasta (Nível 2):</span>
          <select id="select-lvl-2" style="background:#121226; color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.35rem; font-size:0.8rem; outline:none; font-weight:700;">
            <option value="">-- Selecionar --</option>
            <option value="Matematica">📁 Matematica</option>
            <option value="Downloads">📁 Downloads</option>
            <option value="Relatorios">📁 Relatorios</option>
          </select>
        </div>

        <div style="display:flex; align-items:center; gap:0.6rem; margin-left:3rem;">
          <span style="font-size:1.3rem; transform: rotate(90deg); display:inline-block; color:#666;">↳</span>
          <span style="font-size:1.3rem;">📂</span>
          <span style="font-size:0.85rem; color:#ccc;">Sub-subpasta (Nível 3):</span>
          <select id="select-lvl-3" style="background:#121226; color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.35rem; font-size:0.8rem; outline:none; font-weight:700;">
            <option value="">-- Selecionar --</option>
            <option value="Financeiro">📁 Financeiro</option>
            <option value="Fotos">📁 Fotos</option>
            <option value="Jogos">📁 Jogos</option>
          </select>
        </div>
      </div>

      <button class="btn btn-primary" id="btn-validate-architecture" style="width:100%;">📐 Validar Estrutura de Pastas</button>
      <div id="arch-feedback" style="margin-top:0.8rem; font-size:0.8rem; display:none; padding:0.65rem; border-radius:8px;"></div>
    `;

    document.getElementById("btn-validate-architecture").addEventListener("click", () => {
      const lvl1 = document.getElementById("select-lvl-1").value;
      const lvl2 = document.getElementById("select-lvl-2").value;
      const lvl3 = document.getElementById("select-lvl-3").value;
      const feedback = document.getElementById("arch-feedback");

      feedback.style.display = "block";

      if (lvl1 === "Trabalho" && lvl2 === "Relatorios" && lvl3 === "Financeiro") {
        addXP(50);
        mainDiv.innerHTML = `
          <div style="text-align:center; padding:1.8rem 0;">
            <span style="font-size:3rem; display:block;">🏆</span>
            <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Arquiteto Digital Aprovado!</h4>
            <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você montou a hierarquia Trabalho ➔ Relatorios ➔ Financeiro perfeitamente.</p>
            <button class="btn btn-primary" id="btn-finish-arch-sim" style="width:100%;">Avançar Aula ➔</button>
          </div>
        `;
        document.getElementById("btn-finish-arch-sim").addEventListener("click", () => {
          const nextBtn = document.getElementById("next-slide-btn");
          if (nextBtn) nextBtn.click();
        });
      } else {
        lives--;
        if (lives <= 0) {
          mainDiv.innerHTML = `
            <div style="text-align:center; padding:1.8rem 0;">
              <span style="font-size:3rem; display:block;">❌</span>
              <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Estrutura Corrompida!</h4>
              <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você falhou em criar a árvore lógica de pastas de forma correta.</p>
              <button class="btn btn-outline" id="btn-retry-arch" style="width:100%;">Tentar Novamente 🔄</button>
            </div>
          `;
          document.getElementById("btn-retry-arch").addEventListener("click", () => {
            initFolderArchitectSimulator(container, true);
          });
        } else {
          feedback.style.background = "rgba(239,68,68,0.1)";
          feedback.style.border = "1px solid rgba(239,68,68,0.3)";
          feedback.style.color = "#ef4444";
          
          let tips = [];
          if (lvl1 !== "Trabalho") tips.push("A pasta mãe deve ser Trabalho.");
          if (lvl2 !== "Relatorios") tips.push("A subpasta de Trabalho deve ser Relatorios.");
          if (lvl3 !== "Financeiro") tips.push("A pasta final de relatórios deve ser Financeiro.");

          feedback.innerHTML = `<strong>❌ Estrutura errada!</strong><br>${tips.join("<br>")}`;
          drawUI();
        }
      }
    });
  };

  drawUI();
}

// 4. Detetive dos Arquivos (File Detective)
function initFileDetectiveSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  const items = [
    { name: "trabalho_escola.pdf", cat: "docs", exp: "O .pdf é um formato de documento protegido universal, ideal para trabalhos e livros." },
    { name: "foto_perfil.png", cat: "images", exp: "O .png é uma extensão de imagem digital que preserva transparências no fundo." },
    { name: "audio_aula.mp3", cat: "audio", exp: "O .mp3 é o formato de compressão de áudio digital mais conhecido do mundo." },
    { name: "video_aula.mp4", cat: "video", exp: "O .mp4 é a extensão de contêiner de arquivos de vídeo e áudio integrados de alta definição." },
    { name: "arquivos_antigos.zip", cat: "archives", exp: "O .zip é a extensão de pastas compactadas que agrupa e reduz o tamanho de arquivos." }
  ];

  let current = 0;
  let lives = 3;

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  const drawRound = () => {
    if (current >= items.length) {
      addXP(50);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:1.8rem 0;">
          <span style="font-size:3.5rem; display:block;">🔍</span>
          <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Detetive Aprovado!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você identificou todas as extensões de arquivos com maestria!</p>
          <button class="btn btn-primary" id="btn-finish-detective-sim" style="width:100%;">Avançar Aula ➔</button>
        </div>
      `;
      document.getElementById("btn-finish-detective-sim").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const item = items[current];

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <span style="font-size:0.75rem; color:#aaa;">Etapa ${current + 1} / ${items.length}</span>
      </div>
      
      <div style="text-align:center; background:#121226; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:2rem; margin-bottom:1.2rem;">
        <span style="font-size:4rem; display:block; margin-bottom:0.5rem;">📦</span>
        <strong style="font-size:1.15rem; color:var(--color-primary-light); font-family:var(--font-code);">${item.name}</strong>
        <p style="font-size:0.8rem; color:#aaa; margin:0.5rem 0 0 0;">Qual é a categoria deste arquivo?</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;" id="detective-actions">
        <button class="btn btn-outline" data-cat="docs">📄 Documento</button>
        <button class="btn btn-outline" data-cat="images">🖼️ Imagem</button>
        <button class="btn btn-outline" data-cat="audio">🎵 Áudio / 🎬 Vídeo</button>
        <button class="btn btn-outline" data-cat="archives">📦 Compactado</button>
      </div>
      
      <div id="detective-feedback" style="margin-top:0.8rem; display:none; padding:0.8rem; border-radius:8px; font-size:0.8rem; line-height:1.45;"></div>
    `;

    const btns = mainDiv.querySelectorAll("#detective-actions button");
    const feed = mainDiv.querySelector("#detective-feedback");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.disabled = true);
        const sel = btn.getAttribute("data-cat");
        
        // Mapeia áudio/vídeo juntos
        const isCorrect = (sel === item.cat) || (sel === "audio" && (item.cat === "audio" || item.cat === "video"));

        feed.style.display = "block";
        if (isCorrect) {
          btn.style.background = "rgba(16, 185, 129, 0.15)";
          btn.style.borderColor = "#10b981";
          btn.style.color = "#10b981";
          feed.style.background = "rgba(16, 185, 129, 0.05)";
          feed.style.border = "1px solid rgba(16, 185, 129, 0.2)";
          feed.style.color = "#22c55e";
          feed.innerHTML = `<strong>✅ Correto!</strong> ${item.exp}`;
        } else {
          lives--;
          btn.style.background = "rgba(239, 68, 68, 0.15)";
          btn.style.borderColor = "#ef4444";
          btn.style.color = "#ef4444";
          
          feed.style.background = "rgba(239, 68, 68, 0.05)";
          feed.style.border = "1px solid rgba(239, 68, 68, 0.2)";
          feed.style.color = "#f87171";
          feed.innerHTML = `<strong>❌ Incorreto!</strong> ${item.exp}`;
        }

        if (lives <= 0) {
          setTimeout(() => {
            mainDiv.innerHTML = `
              <div style="text-align:center; padding:1.8rem 0;">
                <span style="font-size:3rem; display:block;">❌</span>
                <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Vidas Esgotadas!</h4>
                <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Estude melhor as extensões e tente novamente.</p>
                <button class="btn btn-outline" id="btn-retry-detective" style="width:100%;">Tentar Novamente 🔄</button>
              </div>
            `;
            document.getElementById("btn-retry-detective").addEventListener("click", () => {
              initFileDetectiveSimulator(container, true);
            });
          }, 2000);
        } else {
          const nextQBtn = document.createElement("button");
          nextQBtn.className = "btn btn-primary";
          nextQBtn.style.cssText = "width:100%; margin-top:1rem; font-size:0.82rem;";
          nextQBtn.textContent = current === items.length - 1 ? "🏁 Finalizar Desafio" : "Próximo Arquivo ➔";
          nextQBtn.addEventListener("click", () => {
            current++;
            drawRound();
          });
          feed.appendChild(nextQBtn);
        }
      });
    });
  };

  drawRound();
}

// 5. Correio Digital (Digital Mailman)
function initDigitalMailmanSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  let lives = 3;
  let step = 1; // 1: Copiar trabalho.docx, 2: Paste in Escola, 3: Delete imagem_antiga.png, 4: Restore from Lixeira

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  let clipboardFile = null;
  let localFiles = [
    { name: "trabalho.docx", type: "file", icon: "📄", location: "root" },
    { name: "imagem_antiga.png", type: "file", icon: "🖼️", location: "root" },
    { name: "Escola", type: "folder", icon: "📁", location: "root", children: [] },
    { name: "Lixeira", type: "trash", icon: "🗑️", location: "root", children: [] }
  ];

  let currentPath = "root"; // "root", "Escola", "Lixeira"

  const drawUI = () => {
    let filesInPath = [];
    if (currentPath === "root") {
      filesInPath = localFiles.filter(f => f.location === "root");
    } else if (currentPath === "Escola") {
      const folder = localFiles.find(f => f.name === "Escola");
      filesInPath = folder.children;
    } else if (currentPath === "Lixeira") {
      const trash = localFiles.find(f => f.name === "Lixeira");
      filesInPath = trash.children;
    }

    let instruction = "";
    if (step === 1) instruction = "📂 <strong>Passo 1:</strong> Selecione o arquivo <strong>trabalho.docx</strong> e clique em <strong>Copiar</strong>.";
    else if (step === 2) instruction = "📂 <strong>Passo 2:</strong> Abra a pasta <strong>Escola</strong> e clique em <strong>Colar</strong>.";
    else if (step === 3) instruction = "📂 <strong>Passo 3:</strong> Volte para a pasta inicial, selecione <strong>imagem_antiga.png</strong> e clique em <strong>Excluir</strong>.";
    else if (step === 4) instruction = "📂 <strong>Passo 4:</strong> Entre na <strong>Lixeira</strong>, clique em <strong>imagem_antiga.png</strong> e selecione <strong>Restaurar</strong>.";

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <span style="font-size:0.75rem; color:#aaa;">Passo ${step} / 4</span>
      </div>
      
      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(124,58,237,0.25); border-radius:8px; padding:0.8rem; margin-bottom:1rem; font-size:0.8rem; color:#ccc;">
        ${instruction}
      </div>

      <!-- Barra de Ações do Explorador -->
      <div style="display:flex; gap:0.5rem; background:#121226; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:0.4rem; margin-bottom:0.8rem; align-items:center;">
        ${currentPath !== "root" ? `<button class="btn btn-outline btn-small" id="btn-back-explorer" style="padding:0.2rem 0.5rem; font-size:0.75rem;">⬅ Voltar</button>` : ""}
        <span style="font-size:0.75rem; color:#888; font-family:var(--font-code); margin-right:auto;">C:\\${currentPath === "root" ? "" : currentPath}</span>
        
        <button class="btn btn-outline btn-small" id="btn-copy-explorer" style="padding:0.25rem 0.6rem; font-size:0.75rem; font-weight:700;">📋 Copiar</button>
        <button class="btn btn-outline btn-small" id="btn-paste-explorer" style="padding:0.25rem 0.6rem; font-size:0.75rem; font-weight:700;">📋 Colar</button>
        <button class="btn btn-outline btn-small" id="btn-delete-explorer" style="padding:0.25rem 0.6rem; font-size:0.75rem; font-weight:700; color:#ef4444; border-color:rgba(239,68,68,0.2);">❌ Excluir</button>
        <button class="btn btn-outline btn-small" id="btn-restore-explorer" style="padding:0.25rem 0.6rem; font-size:0.75rem; font-weight:700; color:#10b981; border-color:rgba(16,185,129,0.2);">↩️ Restaurar</button>
      </div>

      <!-- Área de Arquivos -->
      <div style="background:#121226; border:1px solid rgba(255,255,255,0.06); border-radius:8px; min-height:160px; padding:0.8rem; display:flex; flex-wrap:wrap; gap:0.8rem;" id="explorer-files-container">
        ${filesInPath.map((file, idx) => `
          <div class="explorer-item" data-name="${file.name}" style="padding:0.5rem; text-align:center; border:1px solid transparent; border-radius:6px; cursor:pointer; width:80px; user-select:none; transition:all 0.15s;">
            <span style="font-size:2.2rem; display:block;">${file.icon}</span>
            <span style="font-size:0.72rem; color:#ccc; display:block; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; margin-top:2px;">${file.name}</span>
          </div>
        `).join("")}
      </div>
    `;

    // Lógica de Seleção de Arquivo
    let selectedItemName = null;
    const itemsEl = mainDiv.querySelectorAll(".explorer-item");
    itemsEl.forEach(el => {
      el.addEventListener("click", () => {
        itemsEl.forEach(i => {
          i.style.background = "";
          i.style.borderColor = "transparent";
        });
        el.style.background = "rgba(124, 58, 237, 0.15)";
        el.style.borderColor = "rgba(124, 58, 237, 0.4)";
        selectedItemName = el.getAttribute("data-name");
      });
      
      // Duplo clique abre pastas
      el.addEventListener("dblclick", () => {
        const name = el.getAttribute("data-name");
        const file = localFiles.find(f => f.name === name);
        if (file && (file.type === "folder" || file.type === "trash")) {
          currentPath = name;
          drawUI();
        }
      });
    });

    // Ações do Explorador
    const backBtn = mainDiv.querySelector("#btn-back-explorer");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        currentPath = "root";
        drawUI();
      });
    }

    // Botão de Copiar
    mainDiv.querySelector("#btn-copy-explorer").addEventListener("click", () => {
      if (step === 1 && selectedItemName === "trabalho.docx") {
        clipboardFile = { name: "trabalho.docx", type: "file", icon: "📄" };
        step = 2;
        showToastNotification("📋 Copiado!", "O arquivo trabalho.docx foi copiado para a área de transferência.");
        drawUI();
      } else {
        handleError("Selecione trabalho.docx e clique em Copiar.");
      }
    });

    // Botão de Colar
    mainDiv.querySelector("#btn-paste-explorer").addEventListener("click", () => {
      if (step === 2 && currentPath === "Escola" && clipboardFile) {
        const folder = localFiles.find(f => f.name === "Escola");
        folder.children.push({ ...clipboardFile, location: "Escola" });
        clipboardFile = null;
        step = 3;
        showToastNotification("📋 Colado!", "Arquivo colado com sucesso dentro da pasta Escola.");
        currentPath = "root"; // Força volta
        drawUI();
      } else {
        handleError("Entre na pasta Escola (duplo clique) e depois clique em Colar.");
      }
    });

    // Botão de Deletar
    mainDiv.querySelector("#btn-delete-explorer").addEventListener("click", () => {
      if (step === 3 && selectedItemName === "imagem_antiga.png" && currentPath === "root") {
        const idx = localFiles.findIndex(f => f.name === "imagem_antiga.png");
        if (idx !== -1) {
          const removed = localFiles.splice(idx, 1)[0];
          const trash = localFiles.find(f => f.name === "Lixeira");
          trash.children.push({ ...removed, location: "Lixeira" });
        }
        step = 4;
        showToastNotification("🗑️ Excluído!", "Arquivo movido para a Lixeira.");
        drawUI();
      } else {
        handleError("Selecione imagem_antiga.png na pasta principal e clique em Excluir.");
      }
    });

    // Botão de Restaurar
    mainDiv.querySelector("#btn-restore-explorer").addEventListener("click", () => {
      if (step === 4 && selectedItemName === "imagem_antiga.png" && currentPath === "Lixeira") {
        const trash = localFiles.find(f => f.name === "Lixeira");
        const idx = trash.children.findIndex(f => f.name === "imagem_antiga.png");
        if (idx !== -1) {
          const file = trash.children.splice(idx, 1)[0];
          localFiles.push({ ...file, location: "root" });
        }
        addXP(50);
        mainDiv.innerHTML = `
          <div style="text-align:center; padding:1.8rem 0;">
            <span style="font-size:3rem; display:block;">🎉</span>
            <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Missão Correio Concluída!</h4>
            <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você dominou a arte de duplicar, transferir, apagar e restaurar dados.</p>
            <button class="btn btn-primary" id="btn-finish-mailman-sim" style="width:100%;">Avançar Aula ➔</button>
          </div>
        `;
        document.getElementById("btn-finish-mailman-sim").addEventListener("click", () => {
          const nextBtn = document.getElementById("next-slide-btn");
          if (nextBtn) nextBtn.click();
        });
      } else {
        handleError("Abra a Lixeira, selecione imagem_antiga.png e clique em Restaurar.");
      }
    });
  };

  const handleError = (msg) => {
    lives--;
    if (lives <= 0) {
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:1.8rem 0;">
          <span style="font-size:3rem; display:block;">❌</span>
          <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Vidas Esgotadas!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Tente novamente prestando atenção nas instruções lógicas.</p>
          <button class="btn btn-outline" id="btn-retry-mailman" style="width:100%;">Tentar Novamente 🔄</button>
        </div>
      `;
      document.getElementById("btn-retry-mailman").addEventListener("click", () => {
        initDigitalMailmanSimulator(container, true);
      });
    } else {
      showToastNotification("❌ Ação Incorreta!", msg);
      drawUI();
    }
  };

  drawUI();
}

// 6. Missão Backup (Backup Master)
function initBackupMasterSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  let lives = 3;
  let status = "unconnected"; // "unconnected", "connected", "backed_up", "safe_ejected"
  
  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  const drawUI = () => {
    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <strong style="color:var(--color-primary-light); font-size:0.85rem;">💾 Missão: Efetuar Backup seguro no Pendrive</strong>
      </div>
      
      <!-- Interface do Computador Traseira / Pendrive -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem; align-items:center;">
        <!-- Lado 1: Porta USB -->
        <div style="background:#121226; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:1rem; text-align:center; min-height:120px; display:flex; flex-direction:column; justify-content:center; align-items:center; position:relative;">
          <strong style="font-size:0.75rem; color:#aaa; margin-bottom:0.5rem;">💻 PORTA USB DO COMPUTADOR</strong>
          <div style="width:60px; height:15px; background:#000; border:2px solid #333; border-radius:2px; position:relative;">
            ${status !== "unconnected" ? `<div style="width:50px; height:11px; background:#3b82f6; position:absolute; left:3px; top:0px; border-radius:1px; display:flex; align-items:center; justify-content:center; font-size:0.55rem; font-weight:800; color:#fff;">USB DRIVE</div>` : ""}
          </div>
        </div>

        <!-- Lado 2: O Pendrive Físico -->
        <div style="text-align:center;">
          ${status === "unconnected" ? `
            <div id="physical-pendrive" style="display:inline-block; padding:0.6rem 1rem; background:#3b82f6; border-radius:6px; cursor:pointer; font-weight:800; border:1px solid rgba(255,255,255,0.15); transition:transform 0.15s;" title="Clique para conectar">
              📟 CONECTAR PENDRIVE
            </div>
            <p style="font-size:0.75rem; color:#888; margin-top:0.4rem;">Clique no pendrive para inseri-lo.</p>
          ` : `
            <button class="btn btn-outline" id="btn-pull-usb-directly" style="border-color:rgba(239,68,68,0.3); color:#ef4444; width:100%;">
              ⚠️ Puxar Pendrive Diretamente
            </button>
            <p style="font-size:0.72rem; color:#888; margin-top:0.4rem;">Desconectar sem ejetar antes pode queimar os arquivos!</p>
          `}
        </div>
      </div>

      <!-- Lógica Interna do S.O. virtual -->
      <div style="background:#121226; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:0.8rem; min-height:140px; display:flex; flex-direction:column; justify-content:center;">
        ${status === "unconnected" ? `
          <div style="text-align:center; color:#666; font-style:italic; font-size:0.8rem;">
            Aguardando conexão de hardware externo...
          </div>
        ` : status === "connected" ? `
          <div style="text-align:center;">
            <p style="font-size:0.82rem; color:#ccc; margin-bottom:0.8rem;">Dispositivo USB detectado. Copie o arquivo para o backup:</p>
            <button class="btn btn-primary btn-small" id="btn-copy-backup" style="margin:0 auto; display:block;">
              💾 Fazer Backup da pasta 'Documentos Importantes'
            </button>
          </div>
        ` : status === "backed_up" ? `
          <div style="text-align:center;">
            <p style="font-size:0.82rem; color:#22c55e; font-weight:700; margin-bottom:0.6rem;">✅ Backup efetuado com sucesso no USB Drive!</p>
            <p style="font-size:0.75rem; color:#aaa; margin-bottom:0.8rem;">Agora ejete o dispositivo por software na barra abaixo:</p>
            
            <div style="display:flex; justify-content:center; gap:0.5rem; background:rgba(0,0,0,0.3); padding:0.4rem; border-radius:6px; align-items:center;">
              <span style="font-size:0.72rem; color:#888;">Remoção de Hardware:</span>
              <button class="btn btn-outline btn-small" id="btn-eject-usb" style="padding:0.2rem 0.5rem; font-size:0.72rem; color:#10b981; border-color:rgba(16,185,129,0.3);">
                🎛️ Ejetar Mass Storage 
              </button>
            </div>
          </div>
        ` : `
          <div style="text-align:center;">
            <p style="font-size:0.82rem; color:#10b981; font-weight:700; margin-bottom:0.6rem;">✅ Ejetado com segurança!</p>
            <p style="font-size:0.75rem; color:#aaa; margin-bottom:0.8rem;">Você já pode remover o dispositivo com total segurança física.</p>
            <button class="btn btn-primary" id="btn-disconnect-safely" style="width:100%;">🏁 Remover Pendrive Físico</button>
          </div>
        `}
      </div>
    `;

    // Evento de conexão de hardware
    const pendrive = mainDiv.querySelector("#physical-pendrive");
    if (pendrive) {
      pendrive.addEventListener("click", () => {
        status = "connected";
        showToastNotification("📟 USB Conectado!", "Explorador detectou dispositivo externo.");
        drawUI();
      });
    }

    // Evento de puxar cabo diretamente
    const pullDirect = mainDiv.querySelector("#btn-pull-usb-directly");
    if (pullDirect) {
      pullDirect.addEventListener("click", () => {
        if (status !== "safe_ejected") {
          lives--;
          if (lives <= 0) {
            mainDiv.innerHTML = `
              <div style="text-align:center; padding:1.8rem 0;">
                <span style="font-size:3rem; display:block;">❌</span>
                <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Pendrive Queimado!</h4>
                <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você removeu o dispositivo enquanto ele gravava dados, inutilizando os arquivos.</p>
                <button class="btn btn-outline" id="btn-retry-backup" style="width:100%;">Tentar Novamente 🔄</button>
              </div>
            `;
            document.getElementById("btn-retry-backup").addEventListener("click", () => {
              initBackupMasterSimulator(container, true);
            });
          } else {
            showToastNotification("❌ Remoção Perigosa!", "Sempre ejete por software na barra de tarefas antes.");
            status = "unconnected";
            drawUI();
          }
        }
      });
    }

    // Evento de Fazer Backup
    const copyBtn = mainDiv.querySelector("#btn-copy-backup");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        status = "backed_up";
        showToastNotification("📂 Copiado!", "Arquivos copiados para o USB Drive.");
        drawUI();
      });
    }

    // Evento de Ejetar USB
    const ejectBtn = mainDiv.querySelector("#btn-eject-usb");
    if (ejectBtn) {
      ejectBtn.addEventListener("click", () => {
        status = "safe_ejected";
        showToastNotification("✅ Seguro para Remover!", "O Windows fechou todas as conexões USB.");
        drawUI();
      });
    }

    // Evento de Desconexão Segura
    const disconnectBtn = mainDiv.querySelector("#btn-disconnect-safely");
    if (disconnectBtn) {
      disconnectBtn.addEventListener("click", () => {
        addXP(50);
        mainDiv.innerHTML = `
          <div style="text-align:center; padding:1.8rem 0;">
            <span style="font-size:3rem; display:block;">🏆</span>
            <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Missão Backup Concluída!</h4>
            <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você compreendeu a ejetagem segura de memórias portáteis.</p>
            <button class="btn btn-primary" id="btn-finish-backup-sim" style="width:100%;">Avançar Aula ➔</button>
          </div>
        `;
        document.getElementById("btn-finish-backup-sim").addEventListener("click", () => {
          const nextBtn = document.getElementById("next-slide-btn");
          if (nextBtn) nextBtn.click();
        });
      });
    }
  };

  drawUI();
}

// 7. Missão Internet (Download & Upload Challenge)
function initDownloadUploadChallengeSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  const scenarios = [
    { text: "Você clica em 'Baixar Boleto' no portal da faculdade para salvar o PDF no computador.", ans: "down", exp: "Download: Você baixou um arquivo do servidor da internet para a máquina local." },
    { text: "Você anexa e envia uma foto sua do computador para a sua conta do Gmail.", ans: "up", exp: "Upload: Você enviou um arquivo da máquina local para a nuvem/rede." },
    { text: "Você baixa uma música do site oficial da banda para ouvi-la no pendrive.", ans: "down", exp: "Download: Transferência do servidor online para a sua máquina física." },
    { text: "Você faz upload do seu currículo em formato PDF no formulário da vaga de emprego no LinkedIn.", ans: "up", exp: "Upload: Envio de um arquivo do computador local para o sistema remoto." }
  ];

  let current = 0;
  let score = 0;
  let lives = 3;

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  const drawUI = () => {
    if (current >= scenarios.length) {
      addXP(50);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:1.8rem 0;">
          <span style="font-size:3rem; display:block;">🚀</span>
          <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Missão Internet Concluída!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você domina a diferença entre download e upload de dados.</p>
          <button class="btn btn-primary" id="btn-finish-network-sim" style="width:100%;">Avançar Aula ➔</button>
        </div>
      `;
      document.getElementById("btn-finish-network-sim").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const item = scenarios[current];

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <span style="font-size:0.75rem; color:#aaa;">Cenário ${current + 1} / ${scenarios.length}</span>
      </div>
      
      <div style="background:#121226; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.5rem; margin-bottom:1.2rem; font-size:0.88rem; line-height:1.5; color:#ccc;">
        "${item.text}"
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem;" id="net-actions">
        <button class="btn btn-outline" data-ans="down" style="padding:0.75rem; font-size:0.9rem; font-weight:700;">⬇️ Download (Baixar)</button>
        <button class="btn btn-outline" data-ans="up" style="padding:0.75rem; font-size:0.9rem; font-weight:700;">⬆️ Upload (Enviar)</button>
      </div>

      <div id="net-feedback" style="margin-top:0.8rem; display:none; padding:0.8rem; border-radius:8px; font-size:0.8rem; line-height:1.45;"></div>
    `;

    const btns = mainDiv.querySelectorAll("#net-actions button");
    const feed = mainDiv.querySelector("#net-feedback");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.disabled = true);
        const ans = btn.getAttribute("data-ans");
        
        feed.style.display = "block";
        if (ans === item.ans) {
          score++;
          btn.style.background = "rgba(16, 185, 129, 0.15)";
          btn.style.borderColor = "#10b981";
          btn.style.color = "#10b981";
          feed.style.background = "rgba(16, 185, 129, 0.05)";
          feed.style.border = "1px solid rgba(16, 185, 129, 0.2)";
          feed.style.color = "#22c55e";
          feed.innerHTML = `<strong>✅ Correto!</strong> ${item.exp}`;
        } else {
          lives--;
          btn.style.background = "rgba(239, 68, 68, 0.15)";
          btn.style.borderColor = "#ef4444";
          btn.style.color = "#ef4444";
          
          feed.style.background = "rgba(239, 68, 68, 0.05)";
          feed.style.border = "1px solid rgba(239, 68, 68, 0.2)";
          feed.style.color = "#f87171";
          feed.innerHTML = `<strong>❌ Errado!</strong> ${item.exp}`;
        }

        if (lives <= 0) {
          setTimeout(() => {
            mainDiv.innerHTML = `
              <div style="text-align:center; padding:1.8rem 0;">
                <span style="font-size:3rem; display:block;">❌</span>
                <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Vidas Esgotadas!</h4>
                <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Revise o sentido de Download/Upload e tente novamente.</p>
                <button class="btn btn-outline" id="btn-retry-network" style="width:100%;">Tentar Novamente 🔄</button>
              </div>
            `;
            document.getElementById("btn-retry-network").addEventListener("click", () => {
              initDownloadUploadChallengeSimulator(container, true);
            });
          }, 2000);
        } else {
          const nextBtn = document.createElement("button");
          nextBtn.className = "btn btn-primary";
          nextBtn.style.cssText = "width:100%; margin-top:1rem; font-size:0.82rem;";
          nextBtn.textContent = current === scenarios.length - 1 ? "🏁 Finalizar Missão" : "Próximo Caso ➔";
          nextBtn.addEventListener("click", () => {
            current++;
            drawUI();
          });
          feed.appendChild(nextBtn);
        }
      });
    });
  };

  drawUI();
}

// 8. Onde Salvar? (Cloud Quest)
function initCloudQuestSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  const questions = [
    {
      case: "Você quer guardar seus arquivos de escola de forma que consiga trabalhar neles tanto no celular quanto no computador da escola e no de casa.",
      ans: "cloud",
      exp: "Armazenamento em Nuvem: Garante acesso instantâneo em múltiplos dispositivos via internet."
    },
    {
      case: "Você deseja fazer um backup físico offline rápido para transferir arquivos de fotos para o notebook de um amigo que mora em área rural sem sinal de rede.",
      ans: "pendrive",
      exp: "Pendrive / HD Externo: Permite transporte físico rápido sem precisar de conexão de internet."
    },
    {
      case: "Você quer instalar um software pesado de edição gráfica e quer que os dados rodem com a velocidade de acesso mais alta local.",
      ans: "local",
      exp: "Computador Local: O disco rígido interno (SSD/HD) oferece a menor latência e maior taxa de leitura local de dados."
    }
  ];

  let current = 0;
  let lives = 3;

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  const drawUI = () => {
    if (current >= questions.length) {
      addXP(50);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:1.8rem 0;">
          <span style="font-size:3rem; display:block;">☁️</span>
          <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Missão Nuvem Concluída!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você compreende as melhores mídias de armazenamento para cada caso.</p>
          <button class="btn btn-primary" id="btn-finish-cloud-sim" style="width:100%;">Avançar Aula ➔</button>
        </div>
      `;
      document.getElementById("btn-finish-cloud-sim").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const item = questions[current];

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <span style="font-size:0.75rem; color:#aaa;">Caso ${current + 1} / ${questions.length}</span>
      </div>
      
      <p style="font-size:0.82rem; color:#aaa; margin:0 0 0.5rem; font-weight:700;">💡 SELECIONE A MELHOR MÍDIA:</p>
      <div style="background:#121226; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.2rem; margin-bottom:1.2rem; font-size:0.85rem; line-height:1.45; color:#ccc;">
        "${item.case}"
      </div>

      <div style="display:flex; flex-direction:column; gap:0.5rem;" id="cloud-actions">
        <button class="btn btn-outline" data-ans="local" style="text-align:left; font-size:0.82rem; padding:0.6rem 0.8rem;">🖥️ Computador Local (SSD/HD)</button>
        <button class="btn btn-outline" data-ans="pendrive" style="text-align:left; font-size:0.82rem; padding:0.6rem 0.8rem;">📟 Pendrive / HD Externo</button>
        <button class="btn btn-outline" data-ans="cloud" style="text-align:left; font-size:0.82rem; padding:0.6rem 0.8rem;">☁️ Armazenamento em Nuvem</button>
      </div>

      <div id="cloud-feedback" style="margin-top:0.8rem; display:none; padding:0.8rem; border-radius:8px; font-size:0.8rem; line-height:1.45;"></div>
    `;

    const btns = mainDiv.querySelectorAll("#cloud-actions button");
    const feed = mainDiv.querySelector("#cloud-feedback");

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.disabled = true);
        const ans = btn.getAttribute("data-ans");
        
        feed.style.display = "block";
        if (ans === item.ans) {
          btn.style.background = "rgba(16, 185, 129, 0.15)";
          btn.style.borderColor = "#10b981";
          btn.style.color = "#10b981";
          feed.style.background = "rgba(16, 185, 129, 0.05)";
          feed.style.border = "1px solid rgba(16, 185, 129, 0.2)";
          feed.style.color = "#22c55e";
          feed.innerHTML = `<strong>✅ Correto!</strong> ${item.exp}`;
        } else {
          lives--;
          btn.style.background = "rgba(239, 68, 68, 0.15)";
          btn.style.borderColor = "#ef4444";
          btn.style.color = "#ef4444";
          
          feed.style.background = "rgba(239, 68, 68, 0.05)";
          feed.style.border = "1px solid rgba(239, 68, 68, 0.2)";
          feed.style.color = "#f87171";
          feed.innerHTML = `<strong>❌ Incorreto!</strong> ${item.exp}`;
        }

        if (lives <= 0) {
          setTimeout(() => {
            mainDiv.innerHTML = `
              <div style="text-align:center; padding:1.8rem 0;">
                <span style="font-size:3rem; display:block;">❌</span>
                <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Vidas Esgotadas!</h4>
                <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Tente novamente avaliando com calma as mídias de salvamento.</p>
                <button class="btn btn-outline" id="btn-retry-cloud" style="width:100%;">Tentar Novamente 🔄</button>
              </div>
            `;
            document.getElementById("btn-retry-cloud").addEventListener("click", () => {
              initCloudQuestSimulator(container, true);
            });
          }, 2000);
        } else {
          const nextBtn = document.createElement("button");
          nextBtn.className = "btn btn-primary";
          nextBtn.style.cssText = "width:100%; margin-top:1rem; font-size:0.82rem;";
          nextBtn.textContent = current === questions.length - 1 ? "🏁 Finalizar Missão" : "Próximo Caso ➔";
          nextBtn.addEventListener("click", () => {
            current++;
            drawUI();
          });
          feed.appendChild(nextBtn);
        }
      });
    });
  };

  drawUI();
}

// 9. Grande Missão do Escritório (Office Adventure)
function initOfficeAdventureSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  let lives = 3;
  let timeLeft = 90;
  let timerInterval;

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff;";
  container.appendChild(mainDiv);

  // Metas do aluno
  let goals = {
    usbConnected: false,
    folderCreated: false,
    subfolderCreated: false,
    fileMoved: false,
    downloadDone: false,
    fileCopiedToUsb: false,
    usbEjectedSafely: false
  };

  let localFiles = [
    { name: "relatorio_mensal.docx", type: "file", icon: "📄", location: "desktop" }
  ];
  let usbFiles = [];

  let isUsbInserted = false;
  let isUsbEjected = false;
  let activeWindow = "desktop"; // "desktop", "explorer", "internet"
  let explorerCurrentPath = "root"; // "root", "Trabalho", "Relatorios", "Downloads", "USB"

  const checkCompletion = () => {
    if (goals.usbConnected && goals.folderCreated && goals.subfolderCreated && goals.fileMoved && goals.downloadDone && goals.fileCopiedToUsb && goals.usbEjectedSafely) {
      clearInterval(timerInterval);
      addXP(150);
      
      let stars = "⭐";
      if (timeLeft > 50) stars = "⭐⭐⭐";
      else if (timeLeft > 25) stars = "⭐⭐";

      mainDiv.innerHTML = `
        <div style="text-align:center; padding:1.5rem 0;">
          <span style="font-size:3.5rem; display:block;">🏆</span>
          <h4 style="color:#10b981; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Escritório 100% Organizado!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:0.6rem;">Pontuação: ${stars}</p>
          <p style="font-size:0.78rem; color:#aaa; margin-bottom:1.2rem;">Tempo restante: ${timeLeft}s. O backup foi feito com segurança.</p>
          <button class="btn btn-primary" id="btn-finish-office-adv" style="width:100%;">Avançar Aula ➔</button>
        </div>
      `;
      document.getElementById("btn-finish-office-adv").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return true;
    }
    return false;
  };

  const handleActionError = (msg) => {
    lives--;
    if (lives <= 0) {
      clearInterval(timerInterval);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:1.8rem 0;">
          <span style="font-size:3rem; display:block;">❌</span>
          <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Missão Falhou!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Suas vidas acabaram ou você cometeu um erro crítico de hardware.</p>
          <button class="btn btn-outline" id="btn-retry-office-adv" style="width:100%;">Tentar Novamente 🔄</button>
        </div>
      `;
      document.getElementById("btn-retry-office-adv").addEventListener("click", () => {
        initOfficeAdventureSimulator(container, true);
      });
    } else {
      showToastNotification("❌ Ação Inválida!", msg);
      drawUI();
    }
  };

  const drawUI = () => {
    if (checkCompletion()) return;

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.5rem;">
        <span style="font-weight:700; color:#fbbf24; font-size:0.8rem;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <span style="font-weight:700; color:#ef4444; font-size:0.8rem;">⏱️ Cronômetro: ${timeLeft}s</span>
      </div>

      <div style="display:grid; grid-template-columns: 200px 1fr; gap: 10px; min-height: 310px;">
        <!-- Painel de Metas à Esquerda -->
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; padding:0.6rem; font-size:0.75rem; line-height:1.4;">
          <strong style="display:block; color:var(--color-primary-light); margin-bottom:0.4rem; border-bottom:1px solid rgba(255,255,255,0.05);">📋 LISTA DE METAS:</strong>
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div>${goals.usbConnected ? "✅" : "⬜"} Conectar Pendrive</div>
            <div>${goals.folderCreated ? "✅" : "⬜"} Criar pasta 'Trabalho'</div>
            <div>${goals.subfolderCreated ? "✅" : "⬜"} Criar 'Relatorios'</div>
            <div>${goals.fileMoved ? "✅" : "⬜"} Mover relatorio_mensal</div>
            <div>${goals.downloadDone ? "✅" : "⬜"} Baixar metas da internet</div>
            <div>${goals.fileCopiedToUsb ? "✅" : "⬜"} Backup no Pendrive</div>
            <div>${goals.usbEjectedSafely ? "✅" : "⬜"} Ejetar USB seguro</div>
          </div>
        </div>

        <!-- Área de Simulação do Computador à Direita -->
        <div style="background:#121226; border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.6rem; display:flex; flex-direction:column; position:relative;">
          <!-- Barra Superior do Monitor Virtual -->
          <div style="display:flex; gap:0.4rem; background:rgba(255,255,255,0.02); padding:0.3rem 0.5rem; border-radius:6px; font-size:0.72rem; align-items:center; margin-bottom:0.6rem;">
            <button class="btn btn-outline btn-small" id="btn-win-desktop" style="padding:2px 6px; font-size:0.7rem; border-color:transparent; background:${activeWindow === "desktop" ? "rgba(255,255,255,0.08)" : "none"};">🖥️ Desktop</button>
            <button class="btn btn-outline btn-small" id="btn-win-explorer" style="padding:2px 6px; font-size:0.7rem; border-color:transparent; background:${activeWindow === "explorer" ? "rgba(255,255,255,0.08)" : "none"};">📂 Pastas</button>
            <button class="btn btn-outline btn-small" id="btn-win-internet" style="padding:2px 6px; font-size:0.7rem; border-color:transparent; background:${activeWindow === "internet" ? "rgba(255,255,255,0.08)" : "none"};">🌐 Internet</button>
            
            <div style="margin-left:auto; display:flex; align-items:center; gap:8px;">
              ${isUsbInserted && !isUsbEjected ? `
                <div id="tray-eject-btn" style="cursor:pointer; color:#10b981; font-weight:bold; font-size:0.7rem;" title="Ejetar Pendrive com segurança">
                  📟 Ejetar
                </div>
              ` : ""}
            </div>
          </div>

          <!-- Conteúdo da Janela Ativa -->
          <div style="flex:1; display:flex; flex-direction:column;">
            ${activeWindow === "desktop" ? `
              <!-- Desktop do Windows -->
              <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between; position:relative;">
                <div style="display:flex; flex-wrap:wrap; gap:0.8rem; padding:0.4rem;">
                  <!-- Arquivos no Desktop -->
                  ${localFiles.filter(f => f.location === "desktop").map(file => `
                    <div class="desktop-icon-item" data-name="${file.name}" style="width:60px; text-align:center; cursor:pointer;">
                      <span style="font-size:1.8rem; display:block;">${file.icon}</span>
                      <span style="font-size:0.65rem; color:#fff; display:block; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${file.name}</span>
                    </div>
                  `).join("")}

                  ${goals.folderCreated ? `
                    <div class="desktop-icon-item" data-name="Trabalho" style="width:60px; text-align:center; cursor:pointer;">
                      <span style="font-size:1.8rem; display:block;">📁</span>
                      <span style="font-size:0.65rem; color:#fff; display:block; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">Trabalho</span>
                    </div>
                  ` : ""}
                </div>

                <!-- Parte Inferior do Desktop: Onde Conectar USB ou Ejetar -->
                <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.04);">
                  ${!isUsbInserted ? `
                    <button class="btn btn-outline btn-small" id="btn-desktop-insert-usb" style="background:#3b82f6; border-color:#2563eb; color:#fff; font-size:0.7rem; padding:0.25rem 0.5rem;">
                      📟 Conectar Pendrive USB
                    </button>
                  ` : `
                    <button class="btn btn-outline btn-small" id="btn-desktop-pull-usb" style="background:#ef4444; border-color:#dc2626; color:#fff; font-size:0.7rem; padding:0.25rem 0.5rem;">
                      ⚠️ Puxar Pendrive USB
                    </button>
                  `}
                </div>
              </div>
            ` : activeWindow === "explorer" ? `
              <!-- Explorador de Arquivos -->
              <div style="flex:1; display:flex; flex-direction:column;">
                <!-- Barra de Navegação Interna -->
                <div style="display:flex; gap:4px; padding:2px; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:0.4rem; align-items:center; font-size:0.7rem;">
                  ${explorerCurrentPath !== "root" ? `<button id="btn-explorer-back-adv" style="background:none; border:none; color:#fff; cursor:pointer;">⬅ Voltar</button>` : ""}
                  <span style="color:#888; font-family:var(--font-code);">C:\\${explorerCurrentPath === "root" ? "" : explorerCurrentPath}</span>
                  
                  <div style="margin-left:auto; display:flex; gap:0.25rem;">
                    <button class="btn btn-outline btn-small" id="btn-explorer-newfolder" style="font-size:0.65rem; padding:1px 4px;">📁 Nova Pasta</button>
                    <button class="btn btn-outline btn-small" id="btn-explorer-cut" style="font-size:0.65rem; padding:1px 4px;">✂️ Recortar</button>
                    <button class="btn btn-outline btn-small" id="btn-explorer-paste" style="font-size:0.65rem; padding:1px 4px;">📋 Colar</button>
                  </div>
                </div>

                <div style="flex:1; background:rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.04); border-radius:6px; padding:0.4rem; display:flex; flex-wrap:wrap; gap:0.6rem;" id="adv-explorer-files">
                  <!-- Exibe arquivos de acordo com o path do explorer -->
                  ${getExplorerFilesMarkup()}
                </div>
              </div>
            ` : `
              <!-- Internet / Nuvem -->
              <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:1rem; text-align:center;">
                <span style="font-size:2.5rem; display:block; margin-bottom:0.4rem;">🌐</span>
                <strong style="font-size:0.8rem; display:block; margin-bottom:0.2rem;">Portal da Escola (Nuvem)</strong>
                <p style="font-size:0.7rem; color:#aaa; margin:0 0 0.8rem 0; max-width:240px;">Faça download das metas e envie seu relatório final organizando o backup.</p>
                
                <div style="display:flex; flex-direction:column; gap:0.4rem; width:100%; max-width:200px;">
                  <button class="btn btn-outline btn-small" id="btn-internet-download" style="font-size:0.72rem;">⬇️ Baixar arquivo 'metas.pdf'</button>
                  <button class="btn btn-outline btn-small" id="btn-internet-upload" style="font-size:0.72rem;">⬆️ Upload de Backup do Pendrive</button>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Bind das abas superiores
    const setWin = (win) => {
      activeWindow = win;
      drawUI();
    };
    mainDiv.querySelector("#btn-win-desktop").addEventListener("click", () => setWin("desktop"));
    mainDiv.querySelector("#btn-win-explorer").addEventListener("click", () => setWin("explorer"));
    mainDiv.querySelector("#btn-win-internet").addEventListener("click", () => setWin("internet"));

    // Conectar USB
    const insertUsb = mainDiv.querySelector("#btn-desktop-insert-usb");
    if (insertUsb) {
      insertUsb.addEventListener("click", () => {
        isUsbInserted = true;
        goals.usbConnected = true;
        showToastNotification("📟 USB Conectado!", "Dispositivo Mass Storage pronto.");
        drawUI();
      });
    }

    // Puxar USB diretamente
    const pullUsb = mainDiv.querySelector("#btn-desktop-pull-usb");
    if (pullUsb) {
      pullUsb.addEventListener("click", () => {
        if (!isUsbEjected) {
          handleActionError("Você removeu o pendrive ativo sem ejetá-lo por software! Arquivos corrompidos.");
          isUsbInserted = false;
          goals.usbConnected = false;
        } else {
          isUsbInserted = false;
          showToastNotification("✅ Removido!", "Pendrive removido com segurança.");
          drawUI();
        }
      });
    }

    // Ejetar USB por software
    const ejectUsb = mainDiv.querySelector("#tray-eject-btn");
    if (ejectUsb) {
      ejectUsb.addEventListener("click", () => {
        isUsbEjected = true;
        goals.usbEjectedSafely = true;
        showToastNotification("✅ Seguro para Remover!", "Você pode desconectar o USB fisicamente.");
        drawUI();
      });
    }

    // Botões do Explorador
    if (activeWindow === "explorer") {
      const backExp = mainDiv.querySelector("#btn-explorer-back-adv");
      if (backExp) {
        backExp.addEventListener("click", () => {
          if (explorerCurrentPath === "Relatorios") explorerCurrentPath = "Trabalho";
          else explorerCurrentPath = "root";
          drawUI();
        });
      }

      // Nova Pasta
      mainDiv.querySelector("#btn-explorer-newfolder").addEventListener("click", () => {
        if (explorerCurrentPath === "root" && !goals.folderCreated) {
          goals.folderCreated = true;
          showToastNotification("📁 Criado!", "Pasta Trabalho criada.");
          drawUI();
        } else if (explorerCurrentPath === "Trabalho" && !goals.subfolderCreated) {
          goals.subfolderCreated = true;
          showToastNotification("📁 Criado!", "Subpasta Relatorios criada.");
          drawUI();
        } else {
          handleActionError("Você só pode criar pastas no destino correto solicitado pela meta.");
        }
      });

      // Recortar & Colar Simplificado
      let selectedName = null;
      const expItems = mainDiv.querySelectorAll(".explorer-item-adv");
      expItems.forEach(item => {
        item.addEventListener("click", () => {
          expItems.forEach(i => i.style.background = "");
          item.style.background = "rgba(124,58,237,0.15)";
          selectedName = item.getAttribute("data-name");
        });
        item.addEventListener("dblclick", () => {
          const name = item.getAttribute("data-name");
          if (name === "Trabalho" || name === "Relatorios" || name === "Downloads" || name === "USB") {
            explorerCurrentPath = name;
            drawUI();
          }
        });
      });

      let clipItem = null;
      mainDiv.querySelector("#btn-explorer-cut").addEventListener("click", () => {
        if (selectedName) {
          clipItem = selectedName;
          showToastNotification("✂️ Recortado!", `${selectedName} recortado.`);
        }
      });

      mainDiv.querySelector("#btn-explorer-paste").addEventListener("click", () => {
        if (clipItem === "relatorio_mensal.docx" && explorerCurrentPath === "Relatorios") {
          // Remove do desktop e põe em Relatorios
          const idx = localFiles.findIndex(f => f.name === "relatorio_mensal.docx");
          if (idx !== -1) {
            localFiles[idx].location = "Relatorios";
          }
          goals.fileMoved = true;
          clipItem = null;
          showToastNotification("📋 Movido!", "relatorio_mensal.docx movido para Relatorios.");
          drawUI();
        } else if (clipItem === "metas.pdf" && explorerCurrentPath === "USB") {
          // Copia para o pendrive
          usbFiles.push({ name: "metas.pdf", type: "file", icon: "📄" });
          goals.fileCopiedToUsb = true;
          clipItem = null;
          showToastNotification("📋 Copiado!", "metas.pdf copiado para o Pendrive.");
          drawUI();
        } else {
          handleActionError("Mova ou copie arquivos para os destinos adequados exigidos pelas metas.");
        }
      });
    }

    // Ações da Internet
    if (activeWindow === "internet") {
      mainDiv.querySelector("#btn-internet-download").addEventListener("click", () => {
        if (!goals.downloadDone) {
          goals.downloadDone = true;
          localFiles.push({ name: "metas.pdf", type: "file", icon: "📄", location: "Downloads" });
          showToastNotification("⬇️ Download Concluído!", "Arquivo metas.pdf salvo na pasta Downloads.");
          drawUI();
        }
      });

      mainDiv.querySelector("#btn-internet-upload").addEventListener("click", () => {
        if (goals.fileCopiedToUsb) {
          showToastNotification("⬆️ Upload Concluído!", "Backup enviado com sucesso para os servidores.");
          drawUI();
        } else {
          handleActionError("Você precisa ter a cópia de metas.pdf dentro do USB antes de fazer o upload.");
        }
      });
    }
  };

  const getExplorerFilesMarkup = () => {
    if (explorerCurrentPath === "root") {
      let rootItems = [];
      if (goals.folderCreated) rootItems.push({ name: "Trabalho", icon: "📁" });
      if (goals.downloadDone) rootItems.push({ name: "Downloads", icon: "📁" });
      if (isUsbInserted) rootItems.push({ name: "USB", icon: "📁" });

      if (rootItems.length === 0) return `<div style="font-style:italic; color:#666; font-size:0.75rem; text-align:center; width:100%; padding-top:2rem;">Diretório vazio.</div>`;
      return rootItems.map(item => `
        <div class="explorer-item-adv" data-name="${item.name}" style="padding:0.4rem; text-align:center; border-radius:6px; cursor:pointer; width:65px; transition:all 0.15s;">
          <span style="font-size:1.8rem; display:block;">${item.icon}</span>
          <span style="font-size:0.6rem; color:#fff; display:block; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; margin-top:1px;">${item.name}</span>
        </div>
      `).join("");
    }

    if (explorerCurrentPath === "Trabalho") {
      if (goals.subfolderCreated) {
        return `
          <div class="explorer-item-adv" data-name="Relatorios" style="padding:0.4rem; text-align:center; border-radius:6px; cursor:pointer; width:65px; transition:all 0.15s;">
            <span style="font-size:1.8rem; display:block;">📁</span>
            <span style="font-size:0.65rem; color:#fff; display:block;">Relatorios</span>
          </div>
        `;
      }
      return `<div style="font-style:italic; color:#666; font-size:0.75rem; text-align:center; width:100%; padding-top:2rem;">Trabalho está vazio.</div>`;
    }

    if (explorerCurrentPath === "Relatorios") {
      const files = localFiles.filter(f => f.location === "Relatorios");
      if (files.length === 0) return `<div style="font-style:italic; color:#666; font-size:0.75rem; text-align:center; width:100%; padding-top:2rem;">Relatorios está vazio.</div>`;
      return files.map(item => `
        <div class="explorer-item-adv" data-name="${item.name}" style="padding:0.4rem; text-align:center; border-radius:6px; cursor:pointer; width:65px; transition:all 0.15s;">
          <span style="font-size:1.8rem; display:block;">${item.icon}</span>
          <span style="font-size:0.65rem; color:#fff; display:block;">${item.name}</span>
        </div>
      `).join("");
    }

    if (explorerCurrentPath === "Downloads") {
      const files = localFiles.filter(f => f.location === "Downloads");
      if (files.length === 0) return `<div style="font-style:italic; color:#666; font-size:0.75rem; text-align:center; width:100%; padding-top:2rem;">Downloads está vazio.</div>`;
      return files.map(item => `
        <div class="explorer-item-adv" data-name="${item.name}" style="padding:0.4rem; text-align:center; border-radius:6px; cursor:pointer; width:65px; transition:all 0.15s;">
          <span style="font-size:1.8rem; display:block;">${item.icon}</span>
          <span style="font-size:0.65rem; color:#fff; display:block; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${item.name}</span>
        </div>
      `).join("");
    }

    if (explorerCurrentPath === "USB") {
      if (usbFiles.length === 0) return `<div style="font-style:italic; color:#666; font-size:0.75rem; text-align:center; width:100%; padding-top:2rem;">O Pendrive está vazio.</div>`;
      return usbFiles.map(item => `
        <div class="explorer-item-adv" data-name="${item.name}" style="padding:0.4rem; text-align:center; border-radius:6px; cursor:pointer; width:65px; transition:all 0.15s;">
          <span style="font-size:1.8rem; display:block;">${item.icon}</span>
          <span style="font-size:0.65rem; color:#fff; display:block;">${item.name}</span>
        </div>
      `).join("");
    }
  };

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:1.8rem 0;">
          <span style="font-size:3rem; display:block;">⏱️</span>
          <h4 style="color:#ef4444; margin:0.8rem 0 0.4rem; font-size:1.15rem;">Tempo Limite Esgotado!</h4>
          <p style="font-size:0.82rem; color:#ccc; margin-bottom:1.2rem;">Você levou mais de 90 segundos para realizar as tarefas organizacionais.</p>
          <button class="btn btn-outline" id="btn-retry-office-time" style="width:100%;">Tentar Novamente 🔄</button>
        </div>
      `;
      document.getElementById("btn-retry-office-time").addEventListener("click", () => {
        initOfficeAdventureSimulator(container, true);
      });
    } else {
      const timeSpan = mainDiv.querySelector("span[style*='color:#ef4444']");
      if (timeSpan) timeSpan.textContent = `⏱️ Cronômetro: ${timeLeft}s`;
    }
  }, 1000);

  drawUI();
}

// 10. Atividade Reflexiva com gravação de notas (Aula 5)
async function initAula5Reflexao(container, isReset = false) {
  container.innerHTML = "";
  const slideId = "aula5-cap11-conclusao";
  const saved = state.notes[slideId] || "";
  
  container.innerHTML = `
    <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:16px;">
      <h4 style="margin:0 0 8px;">✍️ Atividade Reflexiva da Missão 5</h4>
      <p class="text-small text-muted" style="line-height:1.4; margin-bottom:12px;"><strong>Desafio Prático:</strong> Imagine que você tem fotos pessoais, trabalhos da escola, recibos de contas e vídeos de viagens. Descreva detalhadamente abaixo como você organizaria essas pastas, que nomes daria para as subpastas e onde faria o backup de segurança para nunca perder nada. Suas notas serão gravadas no seu bloco de anotações.</p>
      <textarea id="aula5-reflexao-textarea-local" style="width:100%; min-height:120px; background:var(--bg-base); border:1px solid var(--border-soft); border-radius:10px; padding:12px; color:var(--text-primary); font-size:0.9rem; resize:vertical; line-height:1.6;" placeholder="Escreva sua resposta de forma organizada..."></textarea>
      <button class="btn btn-primary mt-1" id="aula5-save-btn-local" style="width:100%;">💾 Salvar Minhas Estruturas Organizadas</button>
      <div id="aula5-save-feedback-local" class="text-small mt-1" style="font-weight:bold;"></div>
    </div>
  `;
  
  const btn = document.getElementById("aula5-save-btn-local");
  const textarea = document.getElementById("aula5-reflexao-textarea-local");
  const feedback = document.getElementById("aula5-save-feedback-local");
  
  if (textarea) textarea.value = saved;
  
  btn.addEventListener("click", async () => {
    const val = textarea.value.trim();
    if (val.length < 30) {
      feedback.style.color = "#ef4444";
      feedback.textContent = "❌ Reflexão muito curta! Escreva pelo menos 30 caracteres.";
      return;
    }
    btn.disabled = true;
    feedback.style.color = "#fbbf24";
    feedback.textContent = "⌛ Salvando anotações...";
    try {
      state.notes[slideId] = val;
      
      if (!state.completedLessons) state.completedLessons = {};
      state.completedLessons["aula-5"] = true;
      
      addXP(100);
      unlockAchievement("guardian_files");
      markSlideAsCompleted(slideId);
      
      saveState();
      initSidebarMenu();
      
      feedback.style.color = "#10b981";
      feedback.textContent = "✅ Sucesso! Suas anotações foram gravadas no seu bloco de notas e a lição 5 foi concluída!";
      showToastNotification("📂 Guardião dos Arquivos!", "Medalha conquistada e aula concluída.");
      
      // Sincroniza também no DOM caso o textarea do slide didático esteja ativo
      const domTextarea = document.getElementById("aula5-reflexao-textarea");
      const domFeedback = document.getElementById("aula5-save-feedback");
      if (domTextarea) domTextarea.value = val;
      if (domFeedback) {
        domFeedback.style.color = "#10b981";
        domFeedback.textContent = "✅ Sucesso! Medalha desbloqueada!";
      }
    } catch (error) {
      feedback.style.color = "#ef4444";
      feedback.textContent = "❌ Erro ao salvar: " + error.message;
    } finally {
      btn.disabled = false;
    }
  });
}



