
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
  collapsedChapters: {}, // { "Chapter Name": true (collapsed) or false (expanded) }
  module1Skills: {
    hardware: false,
    peripherals: false,
    windows: false,
    files: false,
    maintenance: false,
    support: false
  },
  pedagogicalProfile: {
    hardwareScore: 0,
    windowsScore: 0,
    diagnosticsScore: 0,
    organizationScore: 0,
    totalTimeStudied: 0,
    completedSimulations: [],
    certificates: []
  }
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
  { id: "guardian_files", title: "Guardião dos Arquivos", desc: "Concluiu a Missão 5 — Organização Digital.", icon: "📂" },
  { id: "operador_digital", title: "Operador Digital", desc: "Concluiu a Aula 5 — Organização e Gerenciamento de Arquivos.", icon: "🏅" },
  { id: "assistente_tecnico", title: "Assistente Técnico", desc: "Concluiu a Aula 6 e dominou as configurações do Windows.", icon: "🥈" },
  { id: "especialista_informatica", title: "Especialista em Informática", desc: "Concluiu a Aula 7 e aprendeu a dar suporte técnico.", icon: "🥇" },
  { id: "mestre_modulo1", title: "Mestre do Módulo 1", desc: "Concluiu a Avaliação Integrada e concluiu o Módulo 1.", icon: "🏆" }
];

const COURSE_JORNADA = [
  {
    id: "modulo-1",
    title: "Explorador Digital",
    icon: "🥉",
    lessons: [
      { id: "aula-1", title: "Aula 1 — Introdução à Informática", chapter: "AULA 1", desc: "Aprenda o básico de computadores, história e funcionamento inicial." },
      { id: "aula-2", title: "Aula 2 — Explorando o Hardware", chapter: "AULA 2", desc: "Abra a máquina e conheça placa-mãe, processador, RAM, disco e fonte." },
      { id: "aula-3", title: "Aula 3 — Periféricos e Conexões", chapter: "AULA 3", desc: "Domine mouse, teclado, monitores, impressoras e as conexões traseiras." },
      { id: "aula-4", title: "Aula 4 — Dominando o Windows", chapter: "AULA 4", desc: "Aprenda a usar a Área de Trabalho, Menu Iniciar, Lixeira e recursos avançados." },
      { id: "aula-5", title: "Aula 5 — Organização e Gerenciamento de Arquivos", chapter: "AULA 5", desc: "Aprenda a organizar arquivos e pastas, diferenciar cópias e atalhos, lixeira e extensões de arquivos." },
      { id: "aula-6", title: "Aula 6 — Manutenção e Segurança Física", chapter: "AULA 6", desc: "Aprenda sobre limpeza do computador, superaquecimento, proteção elétrica, diagnóstico físico e ergonomia." },
      { id: "aula-7", title: "Aula 7 — Técnico por um Dia", chapter: "AULA 7", desc: "Simulações de diagnóstico básico e raciocínio técnico de suporte." },
      { id: "aula-8", title: "Aula 8 — Missão Final", chapter: "AULA 8", isDesafio: true, desc: "O grande projeto final e avaliação integrada do Módulo 1." }
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


let teacherMode = false;

// Load State from LocalStorage
function loadState() {
  const saved = localStorage.getItem("informestre_state");
  if (saved) {
    try {
      state = { ...state, ...JSON.parse(saved) };
      if (!state.pedagogicalProfile) {
        state.pedagogicalProfile = {
          hardwareScore: 0,
          windowsScore: 0,
          diagnosticsScore: 0,
          organizationScore: 0,
          totalTimeStudied: 0,
          completedSimulations: [],
          certificates: []
        };
      } else {
        // Garante que todas as propriedades da ficha técnica estejam presentes
        state.pedagogicalProfile.hardwareScore = state.pedagogicalProfile.hardwareScore || 0;
        state.pedagogicalProfile.windowsScore = state.pedagogicalProfile.windowsScore || 0;
        state.pedagogicalProfile.diagnosticsScore = state.pedagogicalProfile.diagnosticsScore || 0;
        state.pedagogicalProfile.organizationScore = state.pedagogicalProfile.organizationScore || 0;
        state.pedagogicalProfile.totalTimeStudied = state.pedagogicalProfile.totalTimeStudied || 0;
        state.pedagogicalProfile.completedSimulations = state.pedagogicalProfile.completedSimulations || [];
        state.pedagogicalProfile.certificates = state.pedagogicalProfile.certificates || [];
      }
      
      // Inicializa e sincroniza retrocompativelmente as competências com base nas aulas concluídas
      if (!state.module1Skills) {
        state.module1Skills = {
          hardware: false,
          peripherals: false,
          windows: false,
          files: false,
          maintenance: false,
          support: false
        };
      }
      if (state.completedLessons) {
        if (state.completedLessons["aula-2"]) state.module1Skills.hardware = true;
        if (state.completedLessons["aula-3"]) state.module1Skills.peripherals = true;
        if (state.completedLessons["aula-4"]) state.module1Skills.windows = true;
        if (state.completedLessons["aula-5"]) state.module1Skills.files = true;
        if (state.completedLessons["aula-6"]) state.module1Skills.maintenance = true;
        if (state.completedLessons["aula-7"]) state.module1Skills.support = true;
      }
    } catch (e) {
      console.error("Erro ao carregar estado do localStorage", e);
    }
  }
}

// Temporizador de Tempo Estudado (Minutos)
setInterval(() => {
  if (window.currentUser && window.currentUserProfile) {
    if (!state.pedagogicalProfile) {
      state.pedagogicalProfile = { hardwareScore: 0, windowsScore: 0, diagnosticsScore: 0, organizationScore: 0, totalTimeStudied: 0, completedSimulations: [], certificates: [] };
    }
    state.pedagogicalProfile.totalTimeStudied = (state.pedagogicalProfile.totalTimeStudied || 0) + 1;
    saveState();
  }
}, 60000);

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


// Helper para obter dados de nível e título com base no XP total do aluno
function getUserLevelInfo(xp) {
  if (xp < 500) {
    return { levelNum: 1, title: "Iniciante Digital", minXp: 0, maxXp: 500 };
  } else if (xp < 1000) {
    return { levelNum: 2, title: "Explorador", minXp: 500, maxXp: 1000 };
  } else if (xp < 1500) {
    return { levelNum: 3, title: "Operador", minXp: 1000, maxXp: 1500 };
  } else if (xp < 2000) {
    return { levelNum: 4, title: "Assistente Técnico", minXp: 1500, maxXp: 2000 };
  } else {
    return { levelNum: 5, title: "Especialista", minXp: 2000, maxXp: 99999 }; // Máximo virtual
  }
}

// Add XP and check Level Up
function addXP(amount) {
  state.xp += amount;
  
  const currentLevelInfo = getUserLevelInfo(state.xp);
  if (currentLevelInfo.levelNum > state.level) {
    state.level = currentLevelInfo.levelNum;
    showToastNotification("📈 Nível Subiu!", `Você agora é Nível ${state.level} — ${currentLevelInfo.title}! Continue assim.`);
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

/**
 * Exibe dicas graduais baseadas no número de tentativas/erros de um simulador
 */
window.showPedagogicalHint = function(simId, attemptCount, dica1, dica2) {
  if (teacherMode) {
    window.showModernAlert("💡 Modo Demonstração (Resposta)", `Dica Detalhada: ${dica2}`);
    return;
  }
  if (attemptCount === 1) {
    showToastNotification("💡 Dica Simples", dica1);
  } else if (attemptCount >= 2) {
    window.showModernAlert("💡 Assistente Técnico (Dica)", dica2);
  }
};

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
    titulo: "Aula 6 — Manutenção e Segurança Física",
    proxima: "Aula 6 — Manutenção e Segurança Física",
    prev: "Aprenda a cuidar fisicamente do seu computador: limpeza correta, controle de temperatura, proteção elétrica, diagnóstico de problemas e ergonomia profissional.",
    bulletPoints: [
      "🧹 Limpeza física: ferramentas corretas, ordem de limpeza e periodicidade",
      "🌡️ Temperatura e superaquecimento: pasta térmica, coolers e thermal throttling",
      "⚡ Estabilizador vs Nobreak: proteção contra surtos e quedas de energia",
      "🩺 Diagnóstico de problemas físicos: beep codes, LEDs e sinais visuais",
      "🪑 Ergonomia profissional: postura, altura do monitor e pausas saudáveis"
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

  const role = (window.currentUserProfile && window.currentUserProfile.role) ? window.currentUserProfile.role : 'tutor';
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
  const role = (window.currentUserProfile && window.currentUserProfile.role) ? window.currentUserProfile.role : 'tutor';
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

  // Aula 8 now has real slides — allow normal navigation
  if (lesson.id === "aula-8") {
    const chapterSlides = COURSE_CONTENT.map((s, idx) => ({ ...s, idx })).filter(s => s.chapter === "AULA 8");
    if (chapterSlides.length > 0) {
      const targetIdx = chapterSlides[0].idx;
      loadSlide(targetIdx);
      const overlay = document.getElementById("modern-alert-modal");
      if (overlay) overlay.remove();
      return;
    }
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
    const isCollapsed = state.collapsedChapters[modulo.title] === true;
    
    const header = document.createElement("div");
    header.className = "chapter-title-header";
    header.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.8rem; border-radius: 8px; font-weight: 800; font-size: 0.88rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); margin-bottom: 0.6rem; user-select: none; cursor: pointer; transition: background 0.2s;";
    if (isLocked) {
      header.style.opacity = "0.45";
    }
    
    header.addEventListener("click", () => {
      toggleChapter(modulo.title);
    });

    header.addEventListener("mouseenter", () => {
      header.style.background = "rgba(255,255,255,0.08)";
    });
    header.addEventListener("mouseleave", () => {
      header.style.background = "rgba(255,255,255,0.03)";
    });
    
    header.innerHTML = `
      <span style="display: flex; align-items: center; gap: 0.4rem;">
        <span style="font-size: 0.7rem; color: #888; transition: transform 0.2s; display: inline-block; transform: ${isCollapsed ? 'rotate(-90deg)' : 'none'};">▼</span>
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
    if (isCollapsed) {
      ul.style.display = "none";
    }

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
                const targetIdx = chapterSlides[0].idx;
                
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
  const levelInfo = getUserLevelInfo(state.xp);
  state.level = levelInfo.levelNum;
  
  const xpEl = document.getElementById("user-xp-counter");
  if (xpEl) xpEl.textContent = state.xp;
  
  const badgeEl = document.getElementById("user-level-badge");
  if (badgeEl) badgeEl.textContent = `Nível ${state.level} — ${levelInfo.title}`;
  
  // Total achievements unlocked
  const count = Object.keys(state.unlockedAchievements || {}).length;
  const countEl = document.getElementById("achievement-unlocked-count");
  if (countEl) countEl.textContent = count;
  
  updateModuleProgressBar();
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
  
  updateModuleProgressBar();
}

// Renderiza a barra superior fixa de progresso do módulo
function updateModuleProgressBar() {
  const container = document.getElementById("module-progress-bar-top");
  if (!container) return;

  const landingScreen = document.getElementById("screen-landing");
  const isUserLoggedIn = landingScreen && landingScreen.classList.contains("screen-hidden");
  
  if (!isUserLoggedIn || !window.currentUser) {
    container.style.display = "none";
    document.body.classList.remove("has-top-bar");
    return;
  }

  container.style.display = "flex";
  document.body.classList.add("has-top-bar");

  // Calcular progresso do Módulo 1 (Aulas 1 a 8)
  const modulo1 = COURSE_JORNADA.find(m => m.id === "modulo-1");
  const modulo1Lessons = modulo1 ? modulo1.lessons : [];
  const total = modulo1Lessons.length;
  let completed = 0;
  
  modulo1Lessons.forEach(lesson => {
    if (state.completedLessons && state.completedLessons[lesson.id]) {
      completed++;
    }
  });

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Encontrar o título da próxima missão
  let nextMissionTitle = "Módulo 1 Concluído";
  const proxima = modulo1Lessons.find(l => !state.completedLessons || !state.completedLessons[l.id]);
  if (proxima) {
    nextMissionTitle = proxima.title.replace(/^Aula \d+\s*—\s*/, "");
  }

  // Montar barra visual baseada em blocos (████████░░░░)
  const blockCount = 10;
  const filledBlocks = Math.round((percent / 100) * blockCount);
  const emptyBlocks = blockCount - filledBlocks;
  const barText = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  container.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; width:100%; color:#fff; font-size:0.8rem; gap:1.5rem;">
      <div style="font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-primary-light); display:flex; align-items:center; gap:0.4rem;">
        <span>🥉</span> MÓDULO 1 — INTRODUÇÃO À INFORMÁTICA
      </div>
      
      <div style="display:flex; align-items:center; gap:0.6rem; flex:1; max-width:480px; justify-content:center;">
        <span style="font-family:'JetBrains Mono', monospace; letter-spacing:1px; color:#fbbf24; font-weight:bold; font-size: 0.9rem;">${barText}</span>
        <span style="font-weight:700; color:#fff;">${percent}%</span>
      </div>
      
      <div style="display:flex; align-items:center; gap:0.8rem;">
        <span>Aulas concluídas: <strong style="color:#10b981;">${completed}/${total}</strong></span>
        <span style="color:rgba(255,255,255,0.15)">|</span>
        <span>Próxima missão: <strong style="color:var(--color-primary-light);">${nextMissionTitle}</strong></span>
      </div>
    </div>
  `;
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
  
  const slide = COURSE_CONTENT[index];
  const aula = COURSE_JORNADA.find(mod => mod.lessons.some(l => l.chapter === slide.chapter))
    ?.lessons.find(l => l.chapter === slide.chapter);
    
  state.viewedSummaries = state.viewedSummaries || {};
  
  if (aula && !state.viewedSummaries[aula.id]) {
    showLessonSummaryPanel(aula, () => {
      state.viewedSummaries[aula.id] = true;
      saveState();
      proceedLoadingSlide(index);
    });
    return;
  }
  
  proceedLoadingSlide(index);
}

// Painel de Resumo Conceitual Obrigatório ("O que você aprendeu até aqui")
function showLessonSummaryPanel(aula, onConfirmCallback) {
  const existing = document.getElementById("lesson-summary-overlay-panel");
  if (existing) existing.remove();

  // Medalhas conquistadas pelo aluno
  const achievements = [
    { key: "welcome", title: "Primeiros Passos", icon: "🚀" },
    { key: "hardware", title: "Explorador de Hardware", icon: "🔧" },
    { key: "peripherals", title: "Mestre dos Periféricos", icon: "🔌" },
    { key: "windows", title: "Usuário do Windows", icon: "🖥️" },
    { key: "operador_digital", title: "Operador Digital", icon: "🥉" }
  ];
  
  const unlockedMedals = achievements.filter(ach => state.unlockedAchievements && state.unlockedAchievements[ach.key]);
  let medalsHtml = unlockedMedals.map(ach => `
    <li>${ach.icon} <span>${ach.title}</span></li>
  `).join("");
  
  if (medalsHtml === "") {
    medalsHtml = `<li>🌱 Iniciante na Jornada</li>`;
  }

  // Estatísticas do aluno
  const xp = state.xp;
  const hours = Math.round((state.pedagogicalProfile.totalTimeStudied || 0) / 60) || 0;
  const timeText = hours >= 1 ? `${hours} horas` : `${state.pedagogicalProfile.totalTimeStudied || 0} minutos`;
  
  let flatLessons = [];
  COURSE_JORNADA.forEach(mod => flatLessons.push(...mod.lessons));
  let completedCount = 0;
  flatLessons.forEach(l => {
    if (state.completedLessons && state.completedLessons[l.id]) completedCount++;
  });

  const overlay = document.createElement("div");
  overlay.id = "lesson-summary-overlay-panel";
  overlay.className = "lesson-summary-overlay";
  
  overlay.innerHTML = `
    <div class="lesson-summary-modal">
      <div style="text-align: center;">
        <span style="font-size: 2.5rem;">📋</span>
        <h3 class="lesson-summary-title-main">O que você aprendeu até aqui</h3>
        <p style="color: #888; font-size: 0.85rem; margin-top: 4px;">Sua ficha de progresso no portal InforMestre</p>
      </div>

      <div class="lesson-summary-row">
        <!-- Card 1: Medalhas -->
        <div class="lesson-summary-card">
          <h4>🏆 Medalhas Conquistadas</h4>
          <ul>
            ${medalsHtml}
          </ul>
        </div>
        
        <!-- Card 2: Estatísticas -->
        <div class="lesson-summary-card">
          <h4>📊 Minhas Estatísticas</h4>
          <ul>
            <li>⭐ <strong>XP acumulado:</strong> ${xp} XP</li>
            <li>⏱️ <strong>Tempo estudado:</strong> ${timeText}</li>
            <li>📚 <strong>Aulas concluídas:</strong> ${completedCount} / ${flatLessons.length}</li>
            <li>✅ <strong>Habilidades validadas:</strong> ${Object.values(state.module1Skills || {}).filter(Boolean).length} / 6</li>
          </ul>
        </div>
      </div>

      <!-- Próxima Missão -->
      <div style="background: rgba(131, 82, 255, 0.06); border: 1px solid rgba(131, 82, 255, 0.2); border-radius: var(--border-radius-md); padding: 1.2rem; display: flex; flex-direction: column; gap: 0.6rem;">
        <h4 style="margin:0; font-size: 1rem; color: var(--color-primary-light); display: flex; align-items: center; gap: 0.4rem;">
          🎯 Nova Missão: ${aula.title}
        </h4>
        <p style="margin:0; font-size:0.85rem; color:#ccc; line-height:1.45;">
          ${aula.desc || "Aprender conceitos fundamentais e simuladores integrados."}
        </p>
      </div>

      <!-- Botão para Iniciar -->
      <div style="text-align: center; margin-top: 0.5rem;">
        <button class="btn btn-primary" id="btn-lesson-summary-start" style="padding: 0.8rem 3rem; font-size: 1.05rem; font-weight: 700; width: 100%;">
          Iniciar missão
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  document.getElementById("btn-lesson-summary-start").addEventListener("click", () => {
    overlay.style.transition = "opacity 0.25s ease";
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      if (onConfirmCallback) onConfirmCallback();
    }, 250);
  });
}

function proceedLoadingSlide(index) {
  
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
    case "aula5-cap2-game":
      initFileClassificationGame(renderArea, isReset);
      break;
    case "aula5-cap3-explorer":
      initWindowsExplorerLab(renderArea, isReset);
      break;
    case "aula5-cap4-desktop":
      initOfficeDesktopLab(renderArea, isReset);
      break;
    case "aula5-reflexao":
      initAula5Reflexao(renderArea, isReset);
      break;
    // ---- AULA 6 SIMULATORS ----
    case "aula6-cleaning-sim":
      initAula6CleaningSim(renderArea, isReset);
      break;
    case "aula6-temp-monitor":
      initAula6TempMonitor(renderArea, isReset);
      break;
    case "aula6-diagnostico-sim":
      initAula6DiagnosticoSim(renderArea, isReset);
      break;
    case "aula6-ergonomia-sim":
      initAula6ErgonomiaSim(renderArea, isReset);
      break;
    case "aula6-reflexao":
      initAula6Reflexao(renderArea, isReset);
      break;
    case "aula7-windows-lab":
      initAula7WindowsLab(renderArea, isReset);
      break;
    // ---- AULA 8 SIMULATORS ----
    case "aula8-revisao-cards":
      initAula8RevisaoCards(renderArea, isReset);
      break;
    case "aula8-puzzle":
      initAula8Puzzle(renderArea, isReset);
      break;
    case "aula8-pc-assembly":
      initPcAssemblyLab(renderArea, isReset);
      break;
    case "aula8-boot-lab":
      initBootLab(renderArea, isReset);
      break;
    case "aula8-win-install":
      initWindowsInstallerLab(renderArea, isReset);
      break;
    case "aula8-win-setup":
      initWindowsSetupLab(renderArea, isReset);
      break;
    case "aula8-software-center":
      initSoftwareCenterLab(renderArea, isReset);
      break;
    case "aula8-surpresa":
      initAula8Surpresa(renderArea, isReset);
      break;
    case "aula8-certificado":
      initAula8Certificado(renderArea, isReset);
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

    desktop.addEventListener("click", () => {
      isStartVisible = false;
      render();
    });

    widget.appendChild(desktop);
  };

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
        teacherMode = (profile && (profile.role === 'school' || profile.role === 'admin'));
        
        // Se for um aluno, carrega o progresso do banco
        if (profile && profile.role === 'student') {
          const dbState = await window.loadProgressFromDb(session.user.id);
          if (dbState) {
            // Mescla progresso atual com o do banco de dados (prioriza o banco)
            state = { ...state, ...dbState };
          } else {
            // Se não houver progresso no banco, salva o atual lá
            await window.saveProgressToDb(session.user.id, state);
          }
        }

        // Inicializa a UI do Curso e barra lateral para todos os papéis (estudantes, tutores e admins)
        updateProgressUI();
        updateStatsUI();
        initSidebarMenu();
        loadSlide(state.currentSlideIndex);

        // Renderiza o cabeçalho e conteúdo do Portal Hub
        renderHubHeader();
        renderHubContents();
        updateAuthUI(true, session.user, profile); // Mantém o status da barra lateral atualizado
      } else {
        window.currentUser = null;
        window.currentUserProfile = null;
        teacherMode = false;
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

      const levelInfo = getUserLevelInfo(state.xp);

      container.innerHTML = `
    <div class="student-hub-layout" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="hub-welcome-banner">
        <h3 style="margin-bottom: 0.4rem;">👋 Bem-vindo de volta, <span>${window.currentUserProfile.full_name || "Estudante"}</span>!</h3>
        <p class="text-muted" style="font-size: 0.95rem;">Escola: ${schoolName}</p>
      </div>
      
      <div class="hub-stats-grid">
        <div class="hub-stat-card" style="display:flex; flex-direction:column; gap:0.5rem; align-items:flex-start; min-height: 100px; justify-content: space-between; padding: 1.2rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="card-icon" style="margin:0; font-size: 1.8rem;">🎖️</span>
            <div class="card-info">
              <span class="card-value" style="font-size: 1.1rem; line-height: 1.2;">Nível ${state.level}</span>
              <span class="card-label" style="font-size:0.75rem; font-weight:700; color:var(--color-primary-light); text-transform:uppercase; margin-top:2px;">${levelInfo.title}</span>
            </div>
          </div>
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#aaa; margin-bottom:4px;">
              <span>${state.xp - levelInfo.minXp} / ${levelInfo.maxXp - levelInfo.minXp} XP</span>
              <span>Prox: ${levelInfo.levelNum < 5 ? `Nível ${levelInfo.levelNum + 1}` : 'Max'}</span>
            </div>
            <div class="xp-bar-container-premium">
              <div class="xp-bar-fill-premium" style="width: ${levelInfo.levelNum < 5 ? Math.round(((state.xp - levelInfo.minXp) / (levelInfo.maxXp - levelInfo.minXp)) * 100) : 100}%;"></div>
            </div>
          </div>
        </div>
        <div class="hub-stat-card" style="padding: 1.2rem; min-height: 100px; display: flex; align-items: center; gap: 1rem;">
          <span class="card-icon" style="font-size: 2rem;">⚡</span>
          <div class="card-info">
            <span class="card-value">${state.xp} XP</span>
            <span class="card-label">Experiência Acumulada</span>
          </div>
        </div>
        <div class="hub-stat-card" style="padding: 1.2rem; min-height: 100px; display: flex; align-items: center; gap: 1rem;">
          <span class="card-icon" style="font-size: 2rem;">🏆</span>
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
          <ul class="curriculum-lessons-list" style="list-style:none; padding: 0 1.2rem 1.2rem 1.2rem; margin:0; border-top: 1px solid rgba(255,255,255,0.05); gap:0.5rem; padding-top:0.8rem;">
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

    <!-- Redefinir Senha de Acesso (Próprio Aluno) -->
    <div class="hub-card-box" style="display:flex; flex-direction:column; gap:1.2rem; margin-top: 1.5rem;">
      <h4 style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.4rem; color: #10b981;">
        🔑 Segurança e Senha
      </h4>
      <p class="text-muted" style="margin: 0; font-size: 0.82rem; line-height: 1.45;">
        Deseja alterar a sua senha de acesso? Escolha uma nova senha de no mínimo 6 caracteres.
      </p>
      
      <form id="hub-change-password-form" style="margin-top: 0.5rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; align-items: flex-end;">
          <div class="form-group-custom" style="margin-bottom:0;">
            <label for="settings-new-password">Nova Senha</label>
            <input type="password" id="settings-new-password" required minlength="6" placeholder="Nova senha (min. 6)">
          </div>
          <div class="form-group-custom" style="margin-bottom:0;">
            <label for="settings-confirm-password">Confirmar Nova Senha</label>
            <input type="password" id="settings-confirm-password" required minlength="6" placeholder="Confirme a nova senha">
          </div>
          <div>
            <button type="submit" class="btn btn-primary" style="padding:0.7rem 1.5rem; width: 100%;">💾 Atualizar Senha</button>
          </div>
        </div>
        <div id="settings-password-feedback" class="text-small mt-2" style="font-weight:bold; font-size:0.8rem; display:none;"></div>
      </form>
    </div>
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

  // --- Submit do Formulário de Redefinição de Senha do Aluno ---
  const passwordForm = document.getElementById("hub-change-password-form");
  if (passwordForm) {
    passwordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newPass = document.getElementById("settings-new-password").value;
      const confirmPass = document.getElementById("settings-confirm-password").value;
      const submitBtn = passwordForm.querySelector("button[type='submit']");
      const feedback = document.getElementById("settings-password-feedback");

      if (newPass.length < 6) {
        feedback.style.display = "block";
        feedback.style.color = "#ef4444";
        feedback.textContent = "❌ A senha deve conter pelo menos 6 caracteres.";
        return;
      }

      if (newPass !== confirmPass) {
        feedback.style.display = "block";
        feedback.style.color = "#ef4444";
        feedback.textContent = "❌ As senhas não conferem.";
        return;
      }

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Salvando...";
        feedback.style.display = "block";
        feedback.style.color = "#fbbf24";
        feedback.textContent = "⌛ Gravando nova senha no Supabase...";

        await window.updateCurrentUserPassword(newPass);

        feedback.style.color = "#10b981";
        feedback.textContent = "✅ Senha atualizada com sucesso! Use a nova senha no próximo login.";
        document.getElementById("settings-new-password").value = "";
        document.getElementById("settings-confirm-password").value = "";
        showToastNotification("🔑 Senha Atualizada!", "Sua senha de acesso foi modificada com sucesso.");
      } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        feedback.style.color = "#ef4444";
        feedback.textContent = "❌ Falha ao alterar: " + (error.message || "Erro desconhecido.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "💾 Atualizar Senha";
      }
    });
  }
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

      <!-- Redefinir Senha de Acesso -->
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;">
        <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem; color: #10b981;">
          🔑 Segurança e Acesso
        </h4>
        <p class="text-muted" style="margin: 0 0 0.8rem; font-size: 0.78rem; line-height: 1.45;">
          Altere a senha de acesso deste aluno de forma rápida. O e-mail do aluno também será confirmado automaticamente se houver alguma pendência de verificação.
        </p>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <input type="text" id="tutor-reset-password-input" placeholder="Nova senha (mín. 6 caracteres)" style="flex:1; background: var(--bg-base); border: 1px solid var(--border-soft); border-radius: 6px; padding: 0.4rem 0.8rem; color: #fff; font-size: 0.85rem;" />
          <button class="btn btn-primary btn-small" id="btn-tutor-reset-password" style="padding: 0.45rem 1rem; font-size: 0.8rem;">💾 Alterar Senha</button>
        </div>
        <div id="tutor-reset-password-feedback" class="text-small mt-1" style="font-weight:bold; font-size:0.78rem; display:none;"></div>
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

  // Lógica de Redefinição de Senha pelo Tutor
  const resetBtn = overlay.querySelector("#btn-tutor-reset-password");
  const resetInput = overlay.querySelector("#tutor-reset-password-input");
  const resetFeedback = overlay.querySelector("#tutor-reset-password-feedback");

  if (resetBtn && resetInput && resetFeedback) {
    resetBtn.addEventListener("click", async () => {
      const newPass = resetInput.value.trim();
      if (newPass.length < 6) {
        resetFeedback.style.display = "block";
        resetFeedback.style.color = "#ef4444";
        resetFeedback.textContent = "❌ A senha deve conter pelo menos 6 caracteres.";
        return;
      }
      resetBtn.disabled = true;
      resetFeedback.style.display = "block";
      resetFeedback.style.color = "#fbbf24";
      resetFeedback.textContent = "⌛ Gravando nova senha no Supabase...";
      try {
        await window.resetStudentPassword(student.id, newPass);
        resetFeedback.style.color = "#10b981";
        resetFeedback.textContent = `✅ Sucesso! A nova senha foi definida e o acesso do aluno foi ativado.`;
        resetInput.value = "";
        showToastNotification("🔑 Senha Alterada!", `Acesso de ${student.full_name || "aluno"} atualizado.`);
      } catch (err) {
        console.error(err);
        resetFeedback.style.color = "#ef4444";
        resetFeedback.textContent = `❌ Falha ao alterar: ${err.message || "Erro desconhecido"}`;
      } finally {
        resetBtn.disabled = false;
      }
    });
  }

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


// ==========================================================================
// AULA 5 - SIMULADORES E ATIVIDADES
// ==========================================================================

// 1. Jogo de Classificação de Arquivos (Drag-and-Drop / Cliques)
function initFileClassificationGame(container, isReset = false) {
  container.innerHTML = "";
  let lives = 3;
  let score = 0;
  
  const fileItems = [
    { name: "faturamento_junho.xlsx", type: "documentos", desc: "Planilha eletrônica do Excel com relatórios contábeis." },
    { name: "manual_usuario.pdf", type: "documentos", desc: "Manual oficial portátil em formato universal de leitura." },
    { name: "carta_proposta.docx", type: "documentos", desc: "Documento oficial de proposta comercial do Word." },
    { name: "slide_treinamento.pptx", type: "documentos", desc: "Apresentação corporativa em slides do PowerPoint." },
    { name: "anotacao_reuniao.txt", type: "documentos", desc: "Texto simples sem formatação para anotações rápidas." },
    { name: "foto_produto.jpg", type: "imagens", desc: "Imagem comprimida ideal para fotografias de catálogo." },
    { name: "icone_suporte.png", type: "imagens", desc: "Imagem com fundo transparente ideal para web design." },
    { name: "desenho_vetorial.svg", type: "imagens", desc: "Ilustração vetorial escalável de alta qualidade." },
    { name: "gif_carregando.gif", type: "imagens", desc: "Pequena imagem de carregamento animada de poucos quadros." },
    { name: "video_institucional.mp4", type: "videos", desc: "Vídeo corporativo em alta definição universal." },
    { name: "palestra_gravada.mkv", type: "videos", desc: "Vídeo de alta fidelidade contendo faixas adicionais de áudio." },
    { name: "campanha_marketing.avi", type: "videos", desc: "Vídeo em formato tradicional com boa compatibilidade." },
    { name: "audio_mensagem.mp3", type: "audios", desc: "Áudio comprimido ideal para mensagens e chamados." },
    { name: "efeito_alerta.wav", type: "audios", desc: "Som digital nativo de alta qualidade de amostra sem perdas." },
    { name: "musica_fundo.flac", type: "audios", desc: "Áudio compactado sem qualquer tipo de perda de qualidade." },
    { name: "backup_faturamento.zip", type: "compactados", desc: "Compactador nativo que une e comprime arquivos." },
    { name: "projetos_empacotados.rar", type: "compactados", desc: "Formato compactado com alta taxa de otimização de espaço." },
    { name: "instalador_suporte.exe", type: "programas", desc: "Programa executável de instalação. Cuidado extremo de segurança!" },
    { name: "pacote_sistema.msi", type: "programas", desc: "Instalador de software nativo para a plataforma Windows." },
    { name: "rotina_limpeza.bat", type: "programas", desc: "Arquivo de lote para automação de tarefas do terminal. Perigo!" }
  ];
  
  if (!isReset) {
    fileItems.sort(() => Math.random() - 0.5);
  }

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff; font-family:var(--font-sans);";
  container.appendChild(mainDiv);

  const drawUI = () => {
    if (lives <= 0) {
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:4rem; display:block; margin-bottom:1rem;">💔</span>
          <h3 style="color:#ef4444; margin:0 0 8px;">Acesso Negado!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Você falhou em 3 classificações. Executáveis em locais errados ou desorganização causam falhas técnicas.</p>
          <button class="btn btn-primary" id="retry-game" style="width:100%;">Tentar Novamente 🔄</button>
        </div>
      `;
      mainDiv.querySelector("#retry-game").addEventListener("click", () => {
        initFileClassificationGame(container, true);
      });
      return;
    }

    if (score >= fileItems.length) {
      addXP(100);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:4rem; display:block; margin-bottom:1rem;">🏆</span>
          <h3 style="color:#10b981; margin:0 0 8px;">Classificador Aprovado!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Você organizou com sucesso os 20 arquivos em suas pastas conceituais.</p>
          <button class="btn btn-primary" id="next-step-game" style="width:100%;">Avançar Lição ➔</button>
        </div>
      `;
      mainDiv.querySelector("#next-step-game").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const currentFile = fileItems[score];

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <strong style="color:var(--color-primary-light); font-size:0.82rem;">Progresso: ${score}/${fileItems.length}</strong>
      </div>
      
      <p style="font-size:0.82rem; color:#aaa; margin-bottom:1rem;">Identifique o formato e classifique o arquivo abaixo clicando na pasta correspondente:</p>
      
      <div style="background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:10px; padding:1.2rem; text-align:center; margin-bottom:1.2rem;">
        <span id="active-file-title" style="display:inline-block; font-family:'JetBrains Mono', monospace; font-size:1.15rem; font-weight:700; background:#121226; padding:0.6rem 1.2rem; border-radius:8px; border:1px solid var(--color-primary-light);">
          📄 ${currentFile.name}
        </span>
        <div style="font-size:0.75rem; color:#aaa; margin-top:8px; font-style:italic;">"${currentFile.desc}"</div>
      </div>
      
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:1rem;">
        <button class="btn-game-folder" data-type="documentos" style="background:rgba(59,130,246,0.15); border:1px solid rgba(59,130,246,0.3); padding:0.8rem 0.5rem; border-radius:8px; text-align:center; color:#fff; cursor:pointer;">
          <span style="font-size:1.8rem; display:block;">📁</span>
          <span style="font-size:0.75rem; font-weight:700;">Documentos</span>
        </button>
        <button class="btn-game-folder" data-type="imagens" style="background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); padding:0.8rem 0.5rem; border-radius:8px; text-align:center; color:#fff; cursor:pointer;">
          <span style="font-size:1.8rem; display:block;">🖼️</span>
          <span style="font-size:0.75rem; font-weight:700;">Imagens</span>
        </button>
        <button class="btn-game-folder" data-type="videos" style="background:rgba(236,72,153,0.15); border:1px solid rgba(236,72,153,0.3); padding:0.8rem 0.5rem; border-radius:8px; text-align:center; color:#fff; cursor:pointer;">
          <span style="font-size:1.8rem; display:block;">🎬</span>
          <span style="font-size:0.75rem; font-weight:700;">Vídeos</span>
        </button>
        <button class="btn-game-folder" data-type="audios" style="background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); padding:0.8rem 0.5rem; border-radius:8px; text-align:center; color:#fff; cursor:pointer;">
          <span style="font-size:1.8rem; display:block;">🎵</span>
          <span style="font-size:0.75rem; font-weight:700;">Áudios</span>
        </button>
        <button class="btn-game-folder" data-type="compactados" style="background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); padding:0.8rem 0.5rem; border-radius:8px; text-align:center; color:#fff; cursor:pointer;">
          <span style="font-size:1.8rem; display:block;">📦</span>
          <span style="font-size:0.75rem; font-weight:700;">Compactados</span>
        </button>
        <button class="btn-game-folder" data-type="programas" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); padding:0.8rem 0.5rem; border-radius:8px; text-align:center; color:#fff; cursor:pointer;">
          <span style="font-size:1.8rem; display:block;">⚙️</span>
          <span style="font-size:0.75rem; font-weight:700;">Programas</span>
        </button>
      </div>
      
      <div id="game-feedback" style="margin-top:10px; font-size:0.8rem; font-weight:700; text-align:center; display:none; padding:8px; border-radius:6px;"></div>
    `;

    mainDiv.querySelectorAll(".btn-game-folder").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        const feedback = mainDiv.querySelector("#game-feedback");
        feedback.style.display = "block";
        
        if (type === currentFile.type) {
          score++;
          feedback.style.background = "rgba(16,185,129,0.12)";
          feedback.style.color = "#10b981";
          feedback.style.border = "1px solid rgba(16,185,129,0.3)";
          feedback.innerHTML = `✅ Correto! "${currentFile.name}" é classificado como ${type.toUpperCase()}.`;
          setTimeout(drawUI, 800);
        } else {
          lives--;
          feedback.style.background = "rgba(239,68,68,0.12)";
          feedback.style.color = "#ef4444";
          feedback.style.border = "1px solid rgba(239,68,68,0.3)";
          if (currentFile.type === "programas") {
            feedback.innerHTML = `⚠️ Alerta de Segurança! O arquivo executável "${currentFile.name}" oferece riscos se aberto ou classificado incorretamente!`;
          } else {
            feedback.innerHTML = `❌ Errado! "${currentFile.name}" pertence à categoria ${currentFile.type.toUpperCase()}.`;
          }
          setTimeout(drawUI, 1600);
        }
      });
    });
  };

  drawUI();
}

// 2. Laboratório do Explorador de Pastas do Windows
function initWindowsExplorerLab(container, isReset = false) {
  container.innerHTML = "";
  
  // Estado local do explorador
  let stateLab = {
    currentDir: "C:",
    searchQuery: "",
    filesystem: {
      "C:": [
        { name: "Downloads", type: "folder" },
        { name: "Documentos", type: "folder" },
        { name: "Area_de_Trabalho", type: "folder" },
        { name: "Lixeira", type: "folder" }
      ],
      "C:\\Downloads": [
        { name: "orcamento_bruto.xlsx", type: "file" },
        { name: "manual_antigo.pdf", type: "file" }
      ],
      "C:\\Documentos": [],
      "C:\\Area_de_Trabalho": [
        { name: "foto_baguncada.jpg", type: "file" }
      ],
      "C:\\Lixeira": [
        { name: "relatorio_faturamento_final.xlsx", type: "file", origin: "C:\\Documentos" }
      ]
    },
    clipboard: null, // { file: {}, action: 'cut'|'copy' }
    missions: {
      createTrabalho: false,
      createFinanceiro: false,
      moveOrcamento: false,
      deleteFoto: false,
      restoreFaturamento: false
    }
  };

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff; display:flex; flex-direction:column; gap:12px; font-family:var(--font-sans);";
  container.appendChild(mainDiv);

  const drawUI = () => {
    // Verifica conclusao
    const finished = stateLab.missions.createTrabalho &&
                     stateLab.missions.createFinanceiro &&
                     stateLab.missions.moveOrcamento &&
                     stateLab.missions.deleteFoto &&
                     stateLab.missions.restoreFaturamento;

    if (finished) {
      addXP(150);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:4rem; display:block; margin-bottom:1rem;">🏆</span>
          <h3 style="color:#10b981; margin:0 0 8px;">Missões Concluídas!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Você operou com total maestria o Explorador de Arquivos do Windows e resolveu as demandas corporativas.</p>
          <button class="btn btn-primary" id="finish-expl-lab" style="width:100%;">Avançar Lição ➔</button>
        </div>
      `;
      mainDiv.querySelector("#finish-expl-lab").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const items = stateLab.filesystem["C:\\" + stateLab.currentDir] || stateLab.filesystem[stateLab.currentDir] || [];
    
    // Filtro por pesquisa se houver query
    let filteredItems = items;
    if (stateLab.searchQuery) {
      filteredItems = [];
      Object.keys(stateLab.filesystem).forEach(key => {
        stateLab.filesystem[key].forEach(f => {
          if (f.name.toLowerCase().includes(stateLab.searchQuery.toLowerCase())) {
            filteredItems.push({ ...f, pathFromSearch: key });
          }
        });
      });
    }

    mainDiv.innerHTML = `
      <!-- Cabeçalho de Missões -->
      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:10px; border-radius:8px; font-size:0.76rem; display:flex; flex-direction:column; gap:4px;">
        <strong style="color:#fbbf24; margin-bottom:2px;">📋 Suas Missões Ativas no Explorador:</strong>
        <div style="color:${stateLab.missions.createTrabalho ? "#10b981" : "#aaa"}; font-weight:${stateLab.missions.createTrabalho ? "bold" : "normal"};">
          ${stateLab.missions.createTrabalho ? "✅" : "⬜"} 1. Criar pasta <strong>Trabalho</strong> no <strong>Disco Local (C:)</strong>
        </div>
        <div style="color:${stateLab.missions.createFinanceiro ? "#10b981" : "#aaa"}; font-weight:${stateLab.missions.createFinanceiro ? "bold" : "normal"};">
          ${stateLab.missions.createFinanceiro ? "✅" : "⬜"} 2. Criar subpasta <strong>Financeiro</strong> dentro da pasta Trabalho
        </div>
        <div style="color:${stateLab.missions.moveOrcamento ? "#10b981" : "#aaa"}; font-weight:${stateLab.missions.moveOrcamento ? "bold" : "normal"};">
          ${stateLab.missions.moveOrcamento ? "✅" : "⬜"} 3. Mover (Ctrl+X) <strong>orcamento_bruto.xlsx</strong> de Downloads para Trabalho/Financeiro
        </div>
        <div style="color:${stateLab.missions.deleteFoto ? "#10b981" : "#aaa"}; font-weight:${stateLab.missions.deleteFoto ? "bold" : "normal"};">
          ${stateLab.missions.deleteFoto ? "✅" : "⬜"} 4. Excluir (deletar) o arquivo <strong>foto_baguncada.jpg</strong> da Area_de_Trabalho
        </div>
        <div style="color:${stateLab.missions.restoreFaturamento ? "#10b981" : "#aaa"}; font-weight:${stateLab.missions.restoreFaturamento ? "bold" : "normal"};">
          ${stateLab.missions.restoreFaturamento ? "✅" : "⬜"} 5. Encontrar e <strong>Restaurar</strong> o arquivo <strong>relatorio_faturamento_final.xlsx</strong> da Lixeira para Documentos
        </div>
      </div>

      <!-- Barra de Ferramentas / Caminho / Busca -->
      <div style="display:flex; flex-direction:column; gap:6px; background:#121226; padding:8px; border-radius:8px; border:1px solid rgba(255,255,255,0.06);">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <div style="display:flex; gap:4px;">
            <button class="btn btn-outline" id="btn-back" style="padding:0.3rem 0.6rem; font-size:0.8rem; height:auto;">⬅️ Voltar</button>
            <button class="btn btn-outline" id="btn-new-folder" style="padding:0.3rem 0.6rem; font-size:0.8rem; height:auto;">📁 Nova Pasta</button>
          </div>
          <input type="text" id="input-search" placeholder="🔍 Pesquisar em C:..." value="${stateLab.searchQuery}" style="background:#1e1e38; border:1px solid rgba(255,255,255,0.15); color:#fff; border-radius:6px; padding:4px 8px; font-size:0.78rem; width:130px; outline:none;" />
        </div>
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#aaa; overflow-x:auto; white-space:nowrap; padding:2px;">
          📍 Caminho: <span style="color:#fbbf24;">C:\\${stateLab.currentDir === "C:" ? "" : stateLab.currentDir}</span>
        </div>
      </div>

      <!-- Corpo do Explorador (Painel Lateral e Painel de Conteúdo) -->
      <div style="display:grid; grid-template-columns:100px 1fr; gap:10px; background:#121226; border-radius:8px; padding:8px; min-height:180px; border:1px solid rgba(255,255,255,0.06);">
        <!-- Painel Lateral -->
        <div style="display:flex; flex-direction:column; gap:6px; border-right:1px solid rgba(255,255,255,0.08); padding-right:6px; font-size:0.72rem;">
          <strong style="color:#888;">Navegação</strong>
          <div class="sidebar-item-lab" data-path="C:" style="cursor:pointer; color:#fbbf24; padding:4px; border-radius:4px; font-weight:bold;">💾 Disco C:</div>
          <div class="sidebar-item-lab" data-path="Downloads" style="cursor:pointer; padding:4px; border-radius:4px;">📥 Downloads</div>
          <div class="sidebar-item-lab" data-path="Documentos" style="cursor:pointer; padding:4px; border-radius:4px;">📄 Docs</div>
          <div class="sidebar-item-lab" data-path="Area_de_Trabalho" style="cursor:pointer; padding:4px; border-radius:4px;">🖥️ Desktop</div>
          <div class="sidebar-item-lab" data-path="Lixeira" style="cursor:pointer; padding:4px; border-radius:4px;">🗑️ Lixeira</div>
        </div>

        <!-- Painel de Conteúdo -->
        <div style="display:flex; flex-direction:column; gap:6px; overflow-y:auto; max-height:180px;">
          ${filteredItems.length === 0 ? `
            <div style="text-align:center; color:#666; font-size:0.8rem; padding:2rem 0;">Esta pasta está vazia.</div>
          ` : filteredItems.map((item, idx) => `
            <div class="file-row" style="display:flex; justify-content:space-between; align-items:center; padding:6px; border-radius:6px; background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.03); font-size:0.78rem;">
              <span class="file-row-title" data-idx="${idx}" style="cursor:pointer; font-weight:${item.type === "folder" ? "bold" : "normal"}; color:${item.type === "folder" ? "#fbbf24" : "#fff"}; display:flex; align-items:center; gap:6px;">
                <span>${item.type === "folder" ? "📁" : "📄"}</span>
                <span>${item.name}</span>
              </span>
              <div style="display:flex; gap:4px;">
                ${item.type === "file" ? `
                  <button class="btn-file-action" data-action="cut" data-idx="${idx}" style="padding:2px 6px; font-size:0.68rem; background:rgba(255,255,255,0.05); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:4px; cursor:pointer;">✂️ Recortar</button>
                  <button class="btn-file-action" data-action="delete" data-idx="${idx}" style="padding:2px 6px; font-size:0.68rem; background:rgba(239,68,68,0.1); color:#ef4444; border:1px solid rgba(239,68,68,0.25); border-radius:4px; cursor:pointer;">🗑️ Excluir</button>
                ` : ""}
                ${stateLab.currentDir === "Lixeira" && item.name === "relatorio_faturamento_final.xlsx" ? `
                  <button class="btn-file-action" data-action="restore" data-idx="${idx}" style="padding:2px 6px; font-size:0.68rem; background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3); border-radius:4px; cursor:pointer;">🔄 Restaurar</button>
                ` : ""}
              </div>
            </div>
          `).join("")}
          
          ${stateLab.clipboard ? `
            <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:6px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; margin-top:8px;">
              <span>📋 Na área de transferência: <strong>${stateLab.clipboard.file.name}</strong></span>
              <button id="btn-paste" style="padding:2px 8px; font-size:0.7rem; background:#fbbf24; border:none; border-radius:4px; color:#121226; font-weight:bold; cursor:pointer;">📋 Colar</button>
            </div>
          ` : ""}
        </div>
      </div>
    `;

    // Eventos de clique nas pastas laterais
    mainDiv.querySelectorAll(".sidebar-item-lab").forEach(item => {
      item.addEventListener("click", () => {
        const path = item.getAttribute("data-path");
        stateLab.searchQuery = "";
        stateLab.currentDir = path;
        drawUI();
      });
    });

    // Eventos de clique nas linhas de arquivo/pasta
    mainDiv.querySelectorAll(".file-row-title").forEach(row => {
      row.addEventListener("click", () => {
        const idx = row.getAttribute("data-idx");
        const item = filteredItems[idx];
        if (item && item.type === "folder") {
          // Se for clique em pasta, navega para ela
          stateLab.searchQuery = "";
          if (stateLab.currentDir === "C:") {
            stateLab.currentDir = item.name;
          } else {
            stateLab.currentDir = stateLab.currentDir + "\\" + item.name;
          }
          drawUI();
        }
      });
    });

    // Evento de voltar
    mainDiv.querySelector("#btn-back").addEventListener("click", () => {
      stateLab.searchQuery = "";
      if (stateLab.currentDir.includes("\\")) {
        const idx = stateLab.currentDir.lastIndexOf("\\");
        stateLab.currentDir = stateLab.currentDir.substring(0, idx);
      } else {
        stateLab.currentDir = "C:";
      }
      drawUI();
    });

    // Novo Input de Pesquisa
    const sInput = mainDiv.querySelector("#input-search");
    sInput.addEventListener("input", (e) => {
      stateLab.searchQuery = e.target.value.trim();
      drawUI();
    });

    // Criar Nova Pasta
    mainDiv.querySelector("#btn-new-folder").addEventListener("click", () => {
      const folderName = prompt("Digite o nome da nova pasta:");
      if (!folderName) return;
      
      // Valida caracteres proscritos do Windows
      const banned = /[\/\\:*?"<>|]/;
      if (banned.test(folderName)) {
        alert("O nome da pasta não pode conter os seguintes caracteres especiais: \\ / : * ? \" < > |");
        return;
      }

      const activeKey = stateLab.currentDir === "C:" ? "C:" : "C:\\" + stateLab.currentDir;
      if (!stateLab.filesystem[activeKey]) {
        stateLab.filesystem[activeKey] = [];
      }

      // Evita duplicados
      const exists = stateLab.filesystem[activeKey].some(f => f.name.toLowerCase() === folderName.toLowerCase());
      if (exists) {
        alert("Já existe uma pasta ou arquivo com este nome no diretório.");
        return;
      }

      stateLab.filesystem[activeKey].push({ name: folderName, type: "folder" });
      
      // Inicializa chave de subpasta vazia
      const newKey = activeKey + "\\" + folderName;
      stateLab.filesystem[newKey] = [];

      // Validação das missões de criação
      if (activeKey === "C:" && folderName === "Trabalho") {
        stateLab.missions.createTrabalho = true;
      }
      if (activeKey === "C:\\Trabalho" && folderName === "Financeiro") {
        stateLab.missions.createFinanceiro = true;
      }

      drawUI();
    });

    // Ações nos arquivos (Recortar, Deletar, Restaurar)
    mainDiv.querySelectorAll(".btn-file-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        const idx = btn.getAttribute("data-idx");
        const file = filteredItems[idx];
        const activeKey = stateLab.currentDir === "C:" ? "C:" : "C:\\" + stateLab.currentDir;

        if (action === "cut") {
          stateLab.clipboard = { file, action: "cut", originKey: activeKey, idx };
          drawUI();
        } else if (action === "delete") {
          // Remove da pasta atual
          stateLab.filesystem[activeKey] = stateLab.filesystem[activeKey].filter(f => f.name !== file.name);
          
          // Manda para Lixeira se não for executável
          if (stateLab.currentDir !== "Lixeira") {
            stateLab.filesystem["C:\\Lixeira"].push({ ...file, origin: activeKey });
          }

          // Validação da missão de exclusão
          if (activeKey === "C:\\Area_de_Trabalho" && file.name === "foto_baguncada.jpg") {
            stateLab.missions.deleteFoto = true;
          }
          drawUI();
        } else if (action === "restore") {
          // Remove da lixeira
          stateLab.filesystem["C:\\Lixeira"] = stateLab.filesystem["C:\\Lixeira"].filter(f => f.name !== file.name);
          
          // Devolve para o diretório de origem ou padrão
          const dest = file.origin || "C:\\Documentos";
          if (!stateLab.filesystem[dest]) stateLab.filesystem[dest] = [];
          stateLab.filesystem[dest].push({ name: file.name, type: "file" });

          // Validação da missão de restauração
          if (file.name === "relatorio_faturamento_final.xlsx" && dest === "C:\\Documentos") {
            stateLab.missions.restoreFaturamento = true;
          }
          drawUI();
        }
      });
    });

    // Colar arquivo da Clipboard
    const pasteBtn = mainDiv.querySelector("#btn-paste");
    if (pasteBtn) {
      pasteBtn.addEventListener("click", () => {
        const { file, action, originKey } = stateLab.clipboard;
        const activeKey = stateLab.currentDir === "C:" ? "C:" : "C:\\" + stateLab.currentDir;

        // Tira o arquivo da origem
        stateLab.filesystem[originKey] = stateLab.filesystem[originKey].filter(f => f.name !== file.name);
        
        // Coloca no destino
        if (!stateLab.filesystem[activeKey]) stateLab.filesystem[activeKey] = [];
        stateLab.filesystem[activeKey].push({ name: file.name, type: "file" });

        // Validação da missão de mover
        if (file.name === "orcamento_bruto.xlsx" && originKey === "C:\\Downloads" && activeKey === "C:\\Trabalho\\Financeiro") {
          stateLab.missions.moveOrcamento = true;
        }

        stateLab.clipboard = null;
        drawUI();
      });
    }
  };

  drawUI();
}

// 3. Simulador de Escritório Virtual Completo da InforTech
function initOfficeDesktopLab(container, isReset = false) {
  container.innerHTML = "";
  
  // Variáveis internas
  let screenBrightness = 100;
  let audioVolume = 50;
  let menuStartOpen = false;
  let notepadText = "";
  let notepadSavedName = "";
  
  // Estrutura de pastas virtuais do Desktop Lab
  let systemFS = {
    "Documentos": [],
    "Lixeira": [
      { name: "faturamento_corporativo.xlsx", size: "45 KB", type: "Planilha Excel" }
    ],
    "Computador": [
      { name: "Disco Local (C:)", type: "disk" }
    ]
  };

  // Metas da Missão do Escritório Virtual
  let desktopMissions = {
    notepadText: false,     // Texto "Backup concluído com sucesso." escrito
    saveNotepad: false,      // Salvo como notas_backup.txt na pasta Documentos
    configSettings: false,   // Brilho para 70% e volume para 80%
    restoreFaturamento: false // faturamento_corporativo.xlsx restaurado da lixeira
  };

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "position:relative; width:100%; height:420px; background:linear-gradient(135deg, #1e1e38, #3b2866); border-radius:12px; overflow:hidden; border:2px solid rgba(255,255,255,0.15); font-family:var(--font-sans); display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 12px 24px rgba(0,0,0,0.3);";
  container.appendChild(mainDiv);

  // Overlay visual de Brilho
  const brightnessOverlay = document.createElement("div");
  brightnessOverlay.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; background:black; opacity:0; pointer-events:none; z-index:99999; transition:opacity 0.2s;";
  mainDiv.appendChild(brightnessOverlay);

  // Atualiza brilho visual
  const updateBrightnessUI = () => {
    const opacity = (100 - screenBrightness) / 100 * 0.6; // limita o escurecimento a 60%
    brightnessOverlay.style.opacity = opacity;
    
    if (screenBrightness === 70 && audioVolume === 80) {
      desktopMissions.configSettings = true;
      checkMissionsStatus();
    }
  };

  // Gerenciador de Janelas do Escritório Virtual
  const activeWindows = {};

  const createVirtualWindow = (title, windowId, renderContentFn) => {
    // Evita duplicados
    if (activeWindows[windowId]) {
      // traz para a frente (z-index)
      mainDiv.querySelectorAll(".virtual-window").forEach(w => w.style.zIndex = "100");
      activeWindows[windowId].style.zIndex = "200";
      return;
    }

    const wDiv = document.createElement("div");
    wDiv.className = "virtual-window";
    wDiv.style.cssText = "position:absolute; top:40px; left:40px; width:260px; height:180px; background:#121226; border:1px solid rgba(255,255,255,0.15); border-radius:8px; display:flex; flex-direction:column; box-shadow:0 8px 20px rgba(0,0,0,0.4); z-index:200; overflow:hidden;";
    
    // Deixa arrastável
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    const header = document.createElement("div");
    header.style.cssText = "background:#1e1e38; border-bottom:1px solid rgba(255,255,255,0.08); padding:6px 10px; display:flex; justify-content:space-between; align-items:center; cursor:move; user-select:none; font-size:0.75rem; font-weight:700;";
    header.innerHTML = `
      <span>${title}</span>
      <div style="display:flex; gap:6px;">
        <span class="win-btn-min" style="cursor:pointer; color:#fbbf24; font-size:0.8rem;">➖</span>
        <span class="win-btn-close" style="cursor:pointer; color:#ef4444; font-size:0.8rem;">❌</span>
      </div>
    `;
    wDiv.appendChild(header);

    // Corpo do App
    const body = document.createElement("div");
    body.style.cssText = "flex:1; padding:8px; overflow-y:auto; font-size:0.75rem; display:flex; flex-direction:column; gap:6px;";
    wDiv.appendChild(body);

    mainDiv.appendChild(wDiv);
    activeWindows[windowId] = wDiv;

    // Arrastar
    header.addEventListener("mousedown", (e) => {
      // traz para frente ao clicar
      mainDiv.querySelectorAll(".virtual-window").forEach(w => w.style.zIndex = "100");
      wDiv.style.zIndex = "200";
      
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(window.getComputedStyle(wDiv).left, 10);
      startTop = parseInt(window.getComputedStyle(wDiv).top, 10);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      wDiv.style.left = (startLeft + dx) + "px";
      wDiv.style.top = (startTop + dy) + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Botoes da janela
    header.querySelector(".win-btn-close").addEventListener("click", () => {
      wDiv.remove();
      delete activeWindows[windowId];
    });

    header.querySelector(".win-btn-min").addEventListener("click", () => {
      wDiv.style.display = "none";
      setTimeout(() => {
        wDiv.style.display = "flex";
      }, 3000); // restaura após 3 segundos para demonstração simples
    });

    renderContentFn(body);
  };

  // Renderiza aplicativos virtuais
  const openExplorador = () => {
    createVirtualWindow("📂 Explorador de Arquivos", "explorador", (body) => {
      const renderFS = () => {
        body.innerHTML = `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; height:100%;">
            <div style="border-right:1px solid rgba(255,255,255,0.06); padding-right:4px; display:flex; flex-direction:column; gap:4px;">
              <strong style="color:#aaa; font-size:0.68rem;">Acesso Rápido</strong>
              <span id="nav-docs" style="cursor:pointer; color:#fbbf24; font-weight:bold;">📄 Documentos</span>
              <span id="nav-trash" style="cursor:pointer; color:#ef4444; font-weight:bold;">🗑️ Lixeira</span>
            </div>
            <div id="fs-files-content" style="display:flex; flex-direction:column; gap:4px; overflow-y:auto;">
              <!-- arquivos dinâmicos -->
            </div>
          </div>
        `;

        const filesPane = body.querySelector("#fs-files-content");
        
        // Docs click
        body.querySelector("#nav-docs").addEventListener("click", () => {
          filesPane.innerHTML = `
            <strong style="font-size:0.65rem; color:#888; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:2px;">Documentos</strong>
            ${systemFS["Documentos"].length === 0 ? `<div style="color:#555; text-align:center; padding:12px 0;">Vazio</div>` : systemFS["Documentos"].map((f, idx) => `
              <div style="font-size:0.7rem; color:#ccc;">📄 ${f.name}</div>
            `).join("")}
          `;
        });

        // Lixeira click
        body.querySelector("#nav-trash").addEventListener("click", () => {
          filesPane.innerHTML = `
            <strong style="font-size:0.65rem; color:#888; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:2px;">Lixeira</strong>
            ${systemFS["Lixeira"].length === 0 ? `<div style="color:#555; text-align:center; padding:12px 0;">Vazio</div>` : systemFS["Lixeira"].map((f, idx) => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:4px; border-radius:4px; margin-top:2px;">
                <span style="font-size:0.68rem; color:#ccc;">📊 ${f.name}</span>
                <button class="restore-trash-btn" data-idx="${idx}" style="background:rgba(16,185,129,0.2); border:1px solid rgba(16,185,129,0.3); border-radius:4px; color:#10b981; font-size:0.6rem; cursor:pointer; padding:2px 4px;">Restaurar</button>
              </div>
            `).join("")}
          `;

          filesPane.querySelectorAll(".restore-trash-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              const idx = btn.getAttribute("data-idx");
              const f = systemFS["Lixeira"][idx];
              systemFS["Lixeira"].splice(idx, 1);
              systemFS["Documentos"].push(f);
              
              if (f.name === "faturamento_corporativo.xlsx") {
                desktopMissions.restoreFaturamento = true;
                checkMissionsStatus();
              }
              renderFS();
            });
          });
        });

        // Abre na pasta documentos por padrão
        body.querySelector("#nav-docs").click();
      };
      
      renderFS();
    });
  };

  const openNotepad = () => {
    createVirtualWindow("📝 Bloco de Notas", "notepad", (body) => {
      body.innerHTML = `
        <textarea id="np-textarea" style="flex:1; background:#0f0f1c; border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#fff; padding:6px; outline:none; resize:none; font-family:monospace; font-size:0.75rem; line-height:1.4;" placeholder="Digite seu texto...">${notepadText}</textarea>
        <div style="display:flex; gap:6px;">
          <input type="text" id="np-filename" placeholder="nome_arquivo.txt" value="${notepadSavedName}" style="background:#1e1e38; border:1px solid rgba(255,255,255,0.15); color:#fff; border-radius:4px; padding:3px 6px; font-size:0.7rem; flex:1;" />
          <button id="np-save-btn" style="background:#fbbf24; border:none; color:#0f0f1c; font-weight:bold; border-radius:4px; font-size:0.7rem; padding:3px 8px; cursor:pointer;">💾 Salvar</button>
        </div>
      `;

      const tArea = body.querySelector("#np-textarea");
      const fInput = body.querySelector("#np-filename");
      const saveBtn = body.querySelector("#np-save-btn");

      tArea.addEventListener("input", (e) => {
        notepadText = e.target.value;
        if (notepadText.trim() === "Backup concluído com sucesso.") {
          desktopMissions.notepadText = true;
          checkMissionsStatus();
        }
      });

      saveBtn.addEventListener("click", () => {
        const filename = fInput.value.trim();
        notepadSavedName = filename;

        if (!filename) {
          alert("Digite um nome de arquivo válido.");
          return;
        }

        if (!filename.endsWith(".txt")) {
          alert("Utilize a extensão .txt para salvar documentos do Bloco de Notas.");
          return;
        }

        // Salva na pasta Documentos do sistema virtual
        const exists = systemFS["Documentos"].some(f => f.name === filename);
        if (!exists) {
          systemFS["Documentos"].push({ name: filename, type: "file" });
        }

        if (filename === "notas_backup.txt" && desktopMissions.notepadText) {
          desktopMissions.saveNotepad = true;
          checkMissionsStatus();
        }

        alert(`Arquivo "${filename}" salvo com sucesso na pasta Documentos!`);
      });
    });
  };

  const openConfiguracoes = () => {
    createVirtualWindow("⚙️ Painel de Configurações", "settings", (body) => {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:10px; padding:4px;">
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>☀️ Brilho do Monitor</span>
              <strong id="brightness-val">${screenBrightness}%</strong>
            </div>
            <input type="range" id="brightness-slider" min="10" max="100" step="5" value="${screenBrightness}" style="width:100%; cursor:pointer;" />
          </div>
          <div style="margin-top:4px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>🔊 Volume Geral</span>
              <strong id="volume-val">${audioVolume}%</strong>
            </div>
            <input type="range" id="volume-slider" min="0" max="100" step="5" value="${audioVolume}" style="width:100%; cursor:pointer;" />
          </div>
        </div>
      `;

      const brSlider = body.querySelector("#brightness-slider");
      const brVal = body.querySelector("#brightness-val");
      const volSlider = body.querySelector("#volume-slider");
      const volVal = body.querySelector("#volume-val");

      brSlider.addEventListener("input", (e) => {
        screenBrightness = parseInt(e.target.value, 10);
        brVal.textContent = `${screenBrightness}%`;
        updateBrightnessUI();
      });

      volSlider.addEventListener("input", (e) => {
        audioVolume = parseInt(e.target.value, 10);
        volVal.textContent = `${audioVolume}%`;
        
        if (screenBrightness === 70 && audioVolume === 80) {
          desktopMissions.configSettings = true;
          checkMissionsStatus();
        }
      });
    });
  };

  // Verifica missões concluídas do Desktop
  const checkMissionsStatus = () => {
    const renderArea = document.getElementById("expl-mission-status-panel");
    if (!renderArea) return;
    
    renderArea.innerHTML = `
      <div style="color:${desktopMissions.notepadText ? "#10b981" : "#aaa"}; font-weight:${desktopMissions.notepadText ? "bold" : "normal"};">
        ${desktopMissions.notepadText ? "✅" : "⬜"} 1. Escrever no bloco de notas: "Backup concluído com sucesso."
      </div>
      <div style="color:${desktopMissions.saveNotepad ? "#10b981" : "#aaa"}; font-weight:${desktopMissions.saveNotepad ? "bold" : "normal"};">
        ${desktopMissions.saveNotepad ? "✅" : "⬜"} 2. Salvar como <strong>notas_backup.txt</strong> na pasta Documentos
      </div>
      <div style="color:${desktopMissions.configSettings ? "#10b981" : "#aaa"}; font-weight:${desktopMissions.configSettings ? "bold" : "normal"};">
        ${desktopMissions.configSettings ? "✅" : "⬜"} 3. Ajustar brilho para <strong>70%</strong> e volume de som para <strong>80%</strong>
      </div>
      <div style="color:${desktopMissions.restoreFaturamento ? "#10b981" : "#aaa"}; font-weight:${desktopMissions.restoreFaturamento ? "bold" : "normal"};">
        ${desktopMissions.restoreFaturamento ? "✅" : "⬜"} 4. Recuperar o relatório <strong>faturamento_corporativo.xlsx</strong> da Lixeira
      </div>
    `;

    const allCompleted = desktopMissions.notepadText &&
                         desktopMissions.saveNotepad &&
                         desktopMissions.configSettings &&
                         desktopMissions.restoreFaturamento;

    if (allCompleted) {
      setTimeout(() => {
        addXP(250);
        mainDiv.innerHTML = `
          <div style="text-align:center; padding:5rem 2rem; color:#fff; background:rgba(18,18,38,0.95); width:100%; height:100%; position:absolute; top:0; left:0; z-index:999999; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:12px;">
            <span style="font-size:4rem; animation: floatExp 3s ease-in-out infinite;">🏆</span>
            <h3 style="color:#10b981; margin:0;">Missão do Escritório Virtual Completa!</h3>
            <p style="font-size:0.85rem; color:#ccc; max-width:400px; line-height:1.5;">Você dominou com perfeição a operação técnica do S.O. com janelas arrastáveis, configurações físicas e de backup.</p>
            <button class="btn btn-primary" id="finish-desktop-lab" style="padding:0.6rem 2.5rem;">Avançar Oficina ➔</button>
          </div>
        `;
        mainDiv.querySelector("#finish-desktop-lab").addEventListener("click", () => {
          const nextBtn = document.getElementById("next-slide-btn");
          if (nextBtn) nextBtn.click();
        });
      }, 1000);
    }
  };

  // Render do Desktop (Área principal, atalhos, barra de tarefas)
  const drawDesktop = () => {
    mainDiv.innerHTML = "";
    mainDiv.appendChild(brightnessOverlay); // reinjeta o overlay
    
    // Área de atalhos e lista lateral de status
    const desktopGrid = document.createElement("div");
    desktopGrid.style.cssText = "flex:1; width:100%; padding:15px; display:grid; grid-template-columns:repeat(6, 60px) 1fr; grid-template-rows:repeat(4, 60px); gap:12px; position:relative;";
    mainDiv.appendChild(desktopGrid);

    // Painel lateral flutuante transparente de instruções da Missão
    const instructionsPane = document.createElement("div");
    instructionsPane.style.cssText = "grid-column:7; grid-row:1/span 4; background:rgba(18,18,38,0.85); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:10px; font-size:0.7rem; display:flex; flex-direction:column; gap:4px; max-width:240px; justify-self:end; align-self:start; margin-right:4px;";
    instructionsPane.innerHTML = `
      <strong style="color:#fbbf24; font-size:0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:3px; margin-bottom:2px;">📋 Pendências de Organização:</strong>
      <div id="expl-mission-status-panel" style="display:flex; flex-direction:column; gap:4px;"></div>
    `;
    desktopGrid.appendChild(instructionsPane);

    // Atalhos
    const shortcuts = [
      { name: "Lixeira", icon: "🗑️", onClick: openExplorador },
      { name: "Este Computador", icon: "🖥️", onClick: openExplorador },
      { name: "Documentos", icon: "📂", onClick: openExplorador },
      { name: "Bloco de Notas", icon: "📝", onClick: openNotepad },
      { name: "Configurações", icon: "⚙️", onClick: openConfiguracoes }
    ];

    shortcuts.forEach((sc, idx) => {
      const btn = document.createElement("div");
      btn.style.cssText = "display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; color:#fff; text-shadow:1px 1px 3px rgba(0,0,0,0.8); user-select:none; text-align:center; transition:transform 0.1s;";
      btn.innerHTML = `
        <span style="font-size:1.6rem; display:block; margin-bottom:2px;">${sc.icon}</span>
        <span style="font-size:0.62rem; font-weight:700; line-height:1.2; word-break:break-all;">${sc.name}</span>
      `;
      btn.addEventListener("click", sc.onClick);
      btn.addEventListener("mouseenter", () => btn.style.transform = "scale(1.08)");
      btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
      
      // distribui na grid
      btn.style.gridColumn = "1";
      btn.style.gridRow = (idx + 1).toString();
      desktopGrid.appendChild(btn);
    });

    // Barra de tarefas inferior
    const taskbar = document.createElement("div");
    taskbar.style.cssText = "height:34px; background:rgba(18,18,38,0.9); border-top:1px solid rgba(255,255,255,0.1); width:100%; display:flex; justify-content:space-between; align-items:center; padding:0 10px; font-size:0.75rem; position:relative; z-index:99999;";
    
    // Iniciar
    const startBtn = document.createElement("button");
    startBtn.style.cssText = "background:#fbbf24; border:none; border-radius:4px; padding:3px 10px; font-weight:800; font-size:0.75rem; color:#121226; cursor:pointer; display:flex; align-items:center; gap:4px;";
    startBtn.innerHTML = "<span>🏁</span><span>Iniciar</span>";
    taskbar.appendChild(startBtn);

    // Relogio e notificações
    const rightSide = document.createElement("div");
    rightSide.style.cssText = "display:flex; align-items:center; gap:10px; color:#fff; font-weight:700;";
    
    // Relógio dinâmico
    const timeSpan = document.createElement("span");
    timeSpan.style.fontFamily = "monospace";
    const updateTime = () => {
      const now = new Date();
      timeSpan.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    setInterval(updateTime, 1000);
    updateTime();

    rightSide.appendChild(timeSpan);
    taskbar.appendChild(rightSide);

    mainDiv.appendChild(taskbar);

    // Menu Iniciar Flutuante
    const startMenu = document.createElement("div");
    startMenu.style.cssText = "position:absolute; bottom:36px; left:10px; width:160px; background:#121226; border:1px solid rgba(255,255,255,0.15); border-radius:6px; display:none; flex-direction:column; gap:2px; padding:6px; box-shadow:0 8px 24px rgba(0,0,0,0.5); z-index:999999;";
    startMenu.innerHTML = `
      <div style="font-size:0.65rem; color:#888; padding:4px; border-bottom:1px solid rgba(255,255,255,0.06); margin-bottom:4px;">InforTech OS</div>
      <button class="sm-btn" id="sm-notepad" style="background:transparent; border:none; color:#fff; text-align:left; padding:6px; font-size:0.72rem; cursor:pointer; border-radius:4px; display:flex; align-items:center; gap:6px; width:100%;"><span>📝</span><span>Bloco de Notas</span></button>
      <button class="sm-btn" id="sm-settings" style="background:transparent; border:none; color:#fff; text-align:left; padding:6px; font-size:0.72rem; cursor:pointer; border-radius:4px; display:flex; align-items:center; gap:6px; width:100%;"><span>⚙️</span><span>Configurações</span></button>
      <button class="sm-btn" id="sm-shutdown" style="background:rgba(239,68,68,0.1); border:none; color:#ef4444; text-align:left; padding:6px; font-size:0.72rem; cursor:pointer; border-radius:4px; display:flex; align-items:center; gap:6px; margin-top:4px; width:100%;"><span>❌</span><span>Desligar PC</span></button>
    `;
    mainDiv.appendChild(startMenu);

    // Evento do botão Iniciar
    startBtn.addEventListener("click", () => {
      menuStartOpen = !menuStartOpen;
      startMenu.style.display = menuStartOpen ? "flex" : "none";
    });

    startMenu.querySelector("#sm-notepad").addEventListener("click", () => {
      openNotepad();
      startMenu.style.display = "none";
      menuStartOpen = false;
    });

    startMenu.querySelector("#sm-settings").addEventListener("click", () => {
      openConfiguracoes();
      startMenu.style.display = "none";
      menuStartOpen = false;
    });

    startMenu.querySelector("#sm-shutdown").addEventListener("click", () => {
      alert("Aviso: O computador de trabalho não deve ser desligado durante o fechamento de metas! Conclua suas pendências primeiro.");
      startMenu.style.display = "none";
      menuStartOpen = false;
    });

    checkMissionsStatus();
  };

  drawDesktop();
}


// 10. Atividade Reflexiva com gravação de notas (Aula 5)
async function initAula5Reflexao(container, isReset = false) {
  container.innerHTML = "";
  const slideId = "aula5-conclusao";
  const saved = state.notes[slideId] || "";
  
  container.innerHTML = `
    <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:16px;">
      <h4 style="margin:0 0 8px;">✍️ Atividade Reflexiva da Aula 5</h4>
      <p class="text-small text-muted" style="line-height:1.4; margin-bottom:12px;"><strong>Desafio Prático:</strong> Descreva detalhadamente abaixo como você organizaria as pastas do seu computador pessoal e quais erros de nomenclatura ou cópias você percebeu que cometia antes da aula. Suas anotações reflexivas serão salvas permanentemente.</p>
      <textarea id="aula5-reflexao-textarea-local" style="width:100%; min-height:120px; background:var(--bg-base); border:1px solid var(--border-soft); border-radius:10px; padding:12px; color:var(--text-primary); font-size:0.9rem; resize:vertical; line-height:1.6;" placeholder="Escreva sua resposta de forma organizada..."></textarea>
      <button class="btn btn-primary mt-1" id="aula5-save-btn-local" style="width:100%;">💾 Salvar Minhas Anotações Reflexivas</button>
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
      
      // Define a habilidade no state
      if (!state.module1Skills) {
        state.module1Skills = {
          hardware: false,
          peripherals: false,
          windows: false,
          files: false,
          maintenance: false,
          support: false
        };
      }
      state.module1Skills.files = true;
      
      addXP(500);
      unlockAchievement("operador_digital");
      markSlideAsCompleted(slideId);
      
      saveState();
      
      // Atualizações de UI
      updateModuleProgressBar();
      initSidebarMenu();
      
      feedback.style.color = "#10b981";
      feedback.textContent = "✅ Sucesso! Suas anotações foram gravadas no seu bloco de notas e a lição 5 foi concluída!";
      showToastNotification("🏅 Operador Digital!", "Medalha conquistada e aula concluída.");
      
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

// 11. Atividade Reflexiva com gravação de notas (Aula 6)
async function initAula6Reflexao(container, isReset = false) {
  container.innerHTML = "";
  const slideId = "aula6-conclusao";
  const saved = state.notes[slideId] || "";

  container.innerHTML = `
    <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:16px;">
      <h4 style="margin:0 0 8px;">✍️ Atividade Reflexiva da Aula 6</h4>
      <p class="text-small text-muted" style="line-height:1.4; margin-bottom:12px;"><strong>Desafio Prático:</strong> Descreva detalhadamente como você configuraria a estação de trabalho do seu computador pessoal considerando ergonomia, proteção elétrica e um plano de manutenção preventiva mensal. Inclua os equipamentos que compraria e os procedimentos que adotaria regularmente.</p>
      <textarea id="aula6-reflexao-textarea-local" style="width:100%; min-height:130px; background:var(--bg-base); border:1px solid var(--border-soft); border-radius:10px; padding:12px; color:var(--text-primary); font-size:0.9rem; resize:vertical; line-height:1.6;" placeholder="Escreva sua resposta completa e detalhada..."></textarea>
      <button class="btn btn-primary mt-1" id="aula6-save-btn-local" style="width:100%;">💾 Salvar Minhas Notas Técnicas</button>
      <div id="aula6-save-feedback-local" class="text-small mt-1" style="font-weight:bold;"></div>
    </div>
  `;

  const btn = document.getElementById("aula6-save-btn-local");
  const textarea = document.getElementById("aula6-reflexao-textarea-local");
  const feedback = document.getElementById("aula6-save-feedback-local");

  if (textarea) textarea.value = saved;

  btn.addEventListener("click", async () => {
    const val = textarea.value.trim();
    if (val.length < 40) {
      feedback.style.color = "#ef4444";
      feedback.textContent = "❌ Reflexão muito curta! Escreva pelo menos 40 caracteres.";
      return;
    }
    btn.disabled = true;
    feedback.style.color = "#fbbf24";
    feedback.textContent = "⌛ Salvando anotações...";
    try {
      state.notes[slideId] = val;

      if (!state.completedLessons) state.completedLessons = {};
      state.completedLessons["aula-6"] = true;

      if (!state.module1Skills) {
        state.module1Skills = {
          hardware: false, peripherals: false, windows: false,
          files: false, maintenance: false, support: false
        };
      }
      state.module1Skills.maintenance = true;

      addXP(500);
      unlockAchievement("assistente_tecnico");
      markSlideAsCompleted(slideId);

      saveState();
      updateModuleProgressBar();
      initSidebarMenu();

      feedback.style.color = "#10b981";
      feedback.textContent = "✅ Sucesso! Suas notas foram salvas e a Aula 6 foi concluída com a medalha Assistente Técnico!";
      showToastNotification("🥈 Assistente Técnico!", "Medalha conquistada — Aula 6 concluída!");

      const domTextarea = document.getElementById("aula6-reflexao-textarea");
      const domFeedback = document.getElementById("aula6-save-feedback");
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


// Injeta dinamicamente os estilos do Laboratório Virtual de Informática
(function injectVirtualOSStyles() {
  const css = `
    .virtual-desktop {
      position: relative;
      width: 100%;
      height: 440px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      background: linear-gradient(135deg, #110d24, #1a0b36);
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    }
    .virtual-desktop-icons {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 16px;
      position: relative;
    }
    .desktop-icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80px;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      user-select: none;
    }
    .desktop-icon-item:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: scale(1.05);
    }
    .desktop-icon-item span.icon-display {
      font-size: 2.2rem;
      display: block;
      margin-bottom: 4px;
    }
    .desktop-icon-item span.icon-label {
      font-size: 0.72rem;
      color: #fff;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      line-height: 1.2;
    }
    .virtual-window {
      position: absolute;
      display: flex;
      flex-direction: column;
      background: rgba(15, 11, 28, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      overflow: hidden;
      min-width: 280px;
      min-height: 180px;
      transition: opacity 0.2s, transform 0.2s;
    }
    .virtual-window.minimized {
      display: none !important;
    }
    .virtual-window.maximized {
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      height: calc(100% - 40px) !important;
      border-radius: 0;
    }
    .window-titlebar {
      height: 36px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
      user-select: none;
    }
    .window-title-text {
      font-size: 0.78rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .window-controls {
      display: flex;
      gap: 8px;
    }
    .win-btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: filter 0.1s;
    }
    .win-btn:hover {
      filter: brightness(0.85);
    }
    .win-close { background: #ff5f56; }
    .win-minimize { background: #ffbd2e; }
    .win-maximize { background: #27c93f; }
    
    .window-content {
      flex: 1;
      padding: 12px;
      overflow: auto;
      color: #fff;
      font-size: 0.8rem;
      display: flex;
      flex-direction: column;
    }
    
    /* Barra de tarefas */
    .virtual-taskbar {
      height: 40px;
      background: #090612;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      box-sizing: border-box;
      z-index: 100;
      position: relative;
    }
    .taskbar-start-btn {
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      border: none;
      border-radius: 6px;
      color: #fff;
      font-weight: 700;
      font-size: 0.76rem;
      padding: 5px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .taskbar-start-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    }
    .taskbar-running-apps {
      flex: 1;
      margin-left: 16px;
      display: flex;
      gap: 8px;
    }
    .taskbar-app-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 5px;
      color: #ccc;
      padding: 4px 10px;
      font-size: 0.72rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.15s;
    }
    .taskbar-app-item.active {
      background: rgba(124, 58, 237, 0.2);
      border-color: rgba(124, 58, 237, 0.4);
      color: #fff;
    }
    .taskbar-app-item:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
    
    .taskbar-system-tray {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #aaa;
      font-size: 0.72rem;
      font-weight: 600;
      user-select: none;
    }
    
    /* Menu Iniciar */
    .virtual-start-menu {
      position: absolute;
      bottom: 44px;
      left: 12px;
      width: 280px;
      background: rgba(13, 9, 24, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      backdrop-filter: blur(10px);
      z-index: 110;
      padding: 12px;
      display: none;
      flex-direction: column;
      gap: 12px;
    }
    .virtual-start-menu.active {
      display: flex;
    }
    .start-menu-user {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding-bottom: 10px;
    }
    .start-menu-user-avatar {
      font-size: 1.8rem;
    }
    .start-menu-user-name {
      font-size: 0.76rem;
      font-weight: 700;
      color: #fff;
    }
    .start-menu-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .start-menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      color: #ccc;
      font-size: 0.76rem;
      font-weight: 600;
      transition: all 0.15s;
    }
    .start-menu-item:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
})();

// ==========================================================================
// VIRTUAL OS WINDOW MANAGER AND TASKBAR SYSTEM
// ==========================================================================

const activeWindows = {};

window.createVirtualWindow = function(desktopEl, options) {
  const winId = options.id;
  
  if (activeWindows[winId]) {
    const el = activeWindows[winId];
    el.classList.remove("minimized");
    bringToFront(el);
    updateTaskbarUI(desktopEl);
    return el;
  }
  
  const win = document.createElement("div");
  win.className = "virtual-window";
  win.id = `win-${winId}`;
  win.style.width = (options.width || 560) + "px";
  win.style.height = (options.height || 360) + "px";
  win.style.left = (options.left || 40) + "px";
  win.style.top = (options.top || 40) + "px";
  win.style.zIndex = "20";
  
  win.innerHTML = `
    <div class="window-titlebar">
      <span class="window-title-text">${options.icon || "📄"} ${options.title}</span>
      <div class="window-controls">
        <button class="win-btn win-minimize" title="Minimizar"></button>
        <button class="win-btn win-maximize" title="Maximizar"></button>
        <button class="win-btn win-close" title="Fechar"></button>
      </div>
    </div>
    <div class="window-content"></div>
  `;
  
  desktopEl.appendChild(win);
  activeWindows[winId] = win;
  
  const titlebar = win.querySelector(".window-titlebar");
  makeDraggable(win, titlebar, desktopEl);
  
  win.querySelector(".win-minimize").addEventListener("click", (e) => {
    e.stopPropagation();
    win.classList.add("minimized");
    updateTaskbarUI(desktopEl);
  });
  
  win.querySelector(".win-maximize").addEventListener("click", (e) => {
    e.stopPropagation();
    win.classList.toggle("maximized");
  });
  
  win.querySelector(".win-close").addEventListener("click", (e) => {
    e.stopPropagation();
    win.remove();
    delete activeWindows[winId];
    updateTaskbarUI(desktopEl);
    if (options.onClose) options.onClose();
  });
  
  win.addEventListener("mousedown", () => {
    bringToFront(win);
  });
  
  updateTaskbarUI(desktopEl);
  return win;
};

function makeDraggable(winEl, dragEl, boundsEl) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  dragEl.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if (e.target.classList.contains("win-btn")) return;
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    bringToFront(winEl);
  }

  function elementDrag(e) {
    if (winEl.classList.contains("maximized")) return;
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let newTop = winEl.offsetTop - pos2;
    let newLeft = winEl.offsetLeft - pos1;

    const maxLeft = boundsEl.clientWidth - winEl.clientWidth;
    const maxTop = boundsEl.clientHeight - 40 - winEl.clientHeight;
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    winEl.style.top = newTop + "px";
    winEl.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function bringToFront(winEl) {
  const windows = document.querySelectorAll(".virtual-window");
  windows.forEach(w => w.style.zIndex = "10");
  winEl.style.zIndex = "20";
}

function updateTaskbarUI(desktopEl) {
  const taskbarApps = desktopEl.querySelector(".taskbar-running-apps");
  if (!taskbarApps) return;
  taskbarApps.innerHTML = "";
  
  Object.keys(activeWindows).forEach(winId => {
    const win = activeWindows[winId];
    const isMinimized = win.classList.contains("minimized");
    const titleText = win.querySelector(".window-title-text").textContent;
    
    const appBtn = document.createElement("div");
    appBtn.className = "taskbar-app-item" + (win.style.zIndex === "20" && !isMinimized ? " active" : "");
    appBtn.textContent = titleText;
    appBtn.addEventListener("click", () => {
      if (isMinimized) {
        win.classList.remove("minimized");
        bringToFront(win);
      } else if (win.style.zIndex === "20") {
        win.classList.add("minimized");
      } else {
        bringToFront(win);
      }
      updateTaskbarUI(desktopEl);
    });
    taskbarApps.appendChild(appBtn);
  });
}

// ==========================================================================
// AULA 6 SIMULATOR 1: WINDOWS EXPLORER LAB
// ==========================================================================

function initExplorerSimulator(container, isReset = false) {
  container.innerHTML = "";
  
  // Variáveis de Estado Interno da Simulação de Arquivos
  let currentFolder = "Desktop"; // Pasta atual exibida
  let selectedFileId = null;
  let clipboardFile = null; // Arquivo recortado para colar
  let errorsCount = 0;
  
  // Ficha técnica local das missões
  let m1Done = false; // Restaurar contrato da Lixeira
  let m2Done = false; // Excluir log gigante do Disco Local C:/Logs_Temporarios
  let m3Done = false; // Mover relatorio_financeiro do Desktop para Documentos
  
  // Banco de Dados virtual de arquivos
  const fileSystem = {
    "Desktop": [
      { id: "file-relatorio", name: "relatorio_financeiro.xlsx", type: "Planilha", size: 120, date: "2026-07-16 11:45" }
    ],
    "Documentos": [],
    "Downloads": [
      { id: "file-setup", name: "setup_chrome.exe", type: "Instalador", size: 85200, date: "2026-07-15 09:15" }
    ],
    "Imagens": [
      { id: "file-foto", name: "foto_perfil.png", type: "Imagem PNG", size: 2048, date: "2026-07-14 16:30" }
    ],
    "Videos": [],
    "Lixeira": [
      { id: "file-contrato", name: "contrato_importante.docx", type: "Documento de Texto", size: 45, date: "2026-07-15 10:30", originalLoc: "Documentos" }
    ],
    "C": [
      { id: "folder-logs", name: "Logs_Temporarios", type: "Pasta", size: 0, date: "2026-07-10 14:00", isFolder: true }
    ],
    "Logs_Temporarios": [
      { id: "file-log", name: "temp_log_gigante.txt", type: "Documento de Texto", size: 13002342, date: "2026-07-16 08:12" }
    ]
  };

  // Cria a Área de Trabalho Virtual (Desktop)
  const desktop = document.createElement("div");
  desktop.className = "virtual-desktop";
  desktop.style.height = "450px";
  
  // Icones do Desktop
  const iconsArea = document.createElement("div");
  iconsArea.className = "virtual-desktop-icons";
  
  const iconExplorer = document.createElement("div");
  iconExplorer.className = "desktop-icon-item";
  iconExplorer.innerHTML = `
    <span class="icon-display">📂</span>
    <span class="icon-label">Explorador de Arquivos</span>
  `;
  iconExplorer.addEventListener("click", () => {
    openExplorerWindow();
  });
  
  const iconMaint = document.createElement("div");
  iconMaint.className = "desktop-icon-item";
  iconMaint.innerHTML = `
    <span class="icon-display">🔧</span>
    <span class="icon-label">Central de Manutenção</span>
  `;
  iconMaint.addEventListener("click", () => {
    // Caso o aluno tente abrir a Central de Manutenção no slide do Explorer
    window.showModernAlert("🔒 Central Bloqueada", "Essa ferramenta será habilitada na próxima lição prática!");
  });
  
  iconsArea.appendChild(iconExplorer);
  iconsArea.appendChild(iconMaint);
  desktop.appendChild(iconsArea);
  
  // Taskbar do Desktop
  const taskbar = document.createElement("div");
  taskbar.className = "virtual-taskbar";
  
  const startBtn = document.createElement("button");
  startBtn.className = "taskbar-start-btn";
  startBtn.innerHTML = `🏁 Iniciar`;
  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    window.showModernAlert("💡 Menu Iniciar", "Use os ícones de atalho na Área de Trabalho para abrir os programas necessários para a sua missão.");
  });
  
  const runningApps = document.createElement("div");
  runningApps.className = "taskbar-running-apps";
  
  const systemTray = document.createElement("div");
  systemTray.className = "taskbar-system-tray";
  systemTray.innerHTML = `
    <span style="font-size:0.8rem;">📶 🔊</span>
    <span id="expl-clock-tray" style="margin-left: 6px;">12:00</span>
  `;
  
  taskbar.appendChild(startBtn);
  taskbar.appendChild(runningApps);
  taskbar.appendChild(systemTray);
  desktop.appendChild(taskbar);
  
  container.appendChild(desktop);
  
  // Atualiza o relógio da barra de tarefas
  const clockTray = desktop.querySelector("#expl-clock-tray");
  const updateTrayClock = () => {
    const now = new Date();
    clockTray.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };
  updateTrayClock();
  setInterval(updateTrayClock, 30000);

  // Auto-abre a janela do Explorer para facilitar para o aluno
  setTimeout(() => openExplorerWindow(), 100);

  function openExplorerWindow() {
    const win = window.createVirtualWindow(desktop, {
      id: "explorer",
      title: "Explorador de Arquivos",
      icon: "📂",
      width: 610,
      height: 380,
      left: 10,
      top: 10
    });
    
    renderExplorerContent(win.querySelector(".window-content"));

  }

  function renderExplorerContent(winContent) {
    winContent.innerHTML = `
      <!-- Barra Superior de Controle -->
      <div class="explorer-toolbar" style="display:flex; align-items:center; justify-content:space-between; gap:6px; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.01); margin-bottom:8px;">
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline btn-small btn-exp-action" id="btn-exp-newfolder" style="padding:4px 8px; font-size:0.7rem;">📁 Nova Pasta</button>
          <button class="btn btn-outline btn-small btn-exp-action" id="btn-exp-cut" style="padding:4px 8px; font-size:0.7rem;">✂️ Mover (Recortar)</button>
          <button class="btn btn-outline btn-small btn-exp-action" id="btn-exp-paste" style="padding:4px 8px; font-size:0.7rem;" disabled>📋 Colar</button>
          <button class="btn btn-outline btn-small btn-exp-action" id="btn-exp-rename" style="padding:4px 8px; font-size:0.7rem;">✏️ Renomear</button>
          <button class="btn btn-outline btn-small btn-exp-action" id="btn-exp-delete" style="padding:4px 8px; font-size:0.7rem; background:rgba(239,68,68,0.15); border-color:rgba(239,68,68,0.3); color:#ef4444;">🗑️ Excluir</button>
          <button class="btn btn-outline btn-small btn-exp-action" id="btn-exp-restore" style="padding:4px 8px; font-size:0.7rem; background:rgba(16,185,129,0.15); border-color:rgba(16,185,129,0.3); color:#10b981; display:none;">↩️ Restaurar</button>
        </div>
        <div>
          <input type="text" id="exp-search-input" placeholder="🔍 Pesquisar..." style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:3px 8px; font-size:0.7rem; color:#fff; width:120px;">
        </div>
      </div>
      
      <!-- Corpo Principal: Painel Duplo -->
      <div style="display:flex; flex:1; overflow:hidden; min-height:0;">
        <!-- Painel Esquerdo: Atalhos -->
        <div class="explorer-sidebar" style="width:130px; background:rgba(255,255,255,0.02); border-right:1px solid rgba(255,255,255,0.08); padding-right:8px; display:flex; flex-direction:column; gap:4px; overflow-y:auto; user-select:none;">
          <div class="exp-side-item" data-folder="Desktop" style="padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.72rem; display:flex; align-items:center; gap:6px; color:#fff;">🖥️ Desktop</div>
          <div class="exp-side-item" data-folder="Downloads" style="padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.72rem; display:flex; align-items:center; gap:6px; color:#fff;">📥 Downloads</div>
          <div class="exp-side-item" data-folder="Documentos" style="padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.72rem; display:flex; align-items:center; gap:6px; color:#fff;">📄 Documentos</div>
          <div class="exp-side-item" data-folder="Imagens" style="padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.72rem; display:flex; align-items:center; gap:6px; color:#fff;">🖼️ Imagens</div>
          <div class="exp-side-item" data-folder="Videos" style="padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.72rem; display:flex; align-items:center; gap:6px; color:#fff;">🎥 Vídeos</div>
          <div class="exp-side-item" data-folder="C" style="padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.72rem; display:flex; align-items:center; gap:6px; color:#fff;">💽 Disco Local (C:)</div>
          <div class="exp-side-item" data-folder="Lixeira" style="padding:5px 8px; border-radius:4px; cursor:pointer; font-size:0.72rem; display:flex; align-items:center; gap:6px; color:#fff;">🗑️ Lixeira</div>
        </div>
        
        <!-- Painel Central: Grid/Tabela de Arquivos -->
        <div class="explorer-main" style="flex:1; padding-left:10px; display:flex; flex-direction:column; overflow-y:auto; min-height:0;">
          <div style="font-size:0.65rem; color:#888; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
            <span id="exp-current-path">Caminho: Este Computador > Desktop</span>
            <span id="exp-storage-bar" style="display:none; color:var(--color-danger); font-weight:bold;">⚠️ SSD C: Cheio (12.4 GB Livres / 120 GB)</span>
          </div>
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.7rem; color:#ccc;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.08); user-select:none; color:#888;">
                <th class="exp-sort-header" data-sort="name" style="padding:4px; cursor:pointer;">Nome ↕️</th>
                <th style="padding:4px;">Tipo</th>
                <th class="exp-sort-header" data-sort="size" style="padding:4px; cursor:pointer;">Tamanho ↕️</th>
                <th class="exp-sort-header" data-sort="date" style="padding:4px; cursor:pointer;">Data de Modificação ↕️</th>
              </tr>
            </thead>
            <tbody id="explorer-files-list">
              <!-- Arquivos renderizados via JS -->
            </tbody>
          </table>
        </div>
      </div>
    `;

    // --- Lógica Interativa ---
    const sideItems = winContent.querySelectorAll(".exp-side-item");
    const filesList = winContent.querySelector("#explorer-files-list");
    const pathText = winContent.querySelector("#exp-current-path");
    const searchInput = winContent.querySelector("#exp-search-input");
    const storageBar = winContent.querySelector("#exp-storage-bar");

    // Botões Superior
    const btnNewFolder = winContent.querySelector("#btn-exp-newfolder");
    const btnCut = winContent.querySelector("#btn-exp-cut");
    const btnPaste = winContent.querySelector("#btn-exp-paste");
    const btnRename = winContent.querySelector("#btn-exp-rename");
    const btnDelete = winContent.querySelector("#btn-exp-delete");
    const btnRestore = winContent.querySelector("#btn-exp-restore");

    // Ativa/Desativa o botão colar se tiver algo no clipboard
    const refreshPasteButton = () => {
      btnPaste.disabled = !clipboardFile;
    };

    // Ordenação
    let sortKey = "name";
    let sortAsc = true;

    // Renderização dos Arquivos
    const renderFiles = () => {
      filesList.innerHTML = "";
      selectedFileId = null;
      
      // Oculta/Exibe botão Restaurar e Lixeira
      if (currentFolder === "Lixeira") {
        btnRestore.style.display = "inline-block";
        btnDelete.style.background = "rgba(239,68,68,0.3)";
        btnDelete.textContent = "🗑️ Esvaziar/Apagar";
      } else {
        btnRestore.style.display = "none";
        btnDelete.style.background = "rgba(239,68,68,0.15)";
        btnDelete.textContent = "🗑️ Excluir";
      }

      // Se estiver no drive C:, exibe alerta de SSD Cheio
      if (currentFolder === "C" || currentFolder === "Logs_Temporarios") {
        storageBar.style.display = "inline";
        // Se já concluiu a missão 2, atualiza para armazenamento livre
        if (m2Done) {
          storageBar.textContent = "✅ SSD C: Livre (124 GB Livres / 120 GB)";
          storageBar.style.color = "var(--color-success)";
        } else {
          storageBar.textContent = "⚠️ SSD C: Cheio (12.4 GB Livres / 120 GB)";
          storageBar.style.color = "var(--color-danger)";
        }
      } else {
        storageBar.style.display = "none";
      }

      let files = [...(fileSystem[currentFolder] || [])];

      // Busca na barra superior
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        files = files.filter(f => f.name.toLowerCase().includes(query));
      }

      // Ordenar arquivos
      files.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];
        
        // Conversão de tamanho para ordenação numérica
        if (sortKey === "size") {
          valA = Number(valA) || 0;
          valB = Number(valB) || 0;
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });

      if (files.length === 0) {
        filesList.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#666; font-style:italic;">Esta pasta está vazia.</td></tr>`;
        return;
      }

      files.forEach(file => {
        const tr = document.createElement("tr");
        tr.style.cssText = "border-bottom:1px solid rgba(255,255,255,0.03); cursor:pointer;";
        if (selectedFileId === file.id) {
          tr.style.background = "rgba(124, 58, 237, 0.15)";
        }

        tr.addEventListener("click", (e) => {
          e.stopPropagation();
          selectedFileId = file.id;
          renderFiles();
        });

        // Duplo clique abre pastas virtuais
        if (file.isFolder) {
          tr.addEventListener("dblclick", () => {
            currentFolder = file.name;
            pathText.textContent = `Caminho: Este Computador > Disco Local (C:) > ${file.name}`;
            renderFiles();
          });
        }

        let sizeText = `${file.size} KB`;
        if (file.size === 0) sizeText = "--";
        else if (file.size >= 1024 * 1024) sizeText = `${(file.size / (1024 * 1024)).toFixed(1)} GB`;
        else if (file.size >= 1024) sizeText = `${(file.size / 1024).toFixed(1)} MB`;

        let icon = "📄";
        if (file.isFolder) icon = "📁";
        else if (file.type === "Planilha") icon = "📊";
        else if (file.type === "Imagem PNG") icon = "🖼️";
        else if (file.type === "Instalador") icon = "⚙️";

        tr.innerHTML = `
          <td style="padding:6px 4px; display:flex; align-items:center; gap:6px;">
            <span>${icon}</span>
            <span style="font-weight:600; color:#fff;">${file.name}</span>
          </td>
          <td style="padding:6px 4px; color:#aaa;">${file.type}</td>
          <td style="padding:6px 4px; color:#aaa;">${sizeText}</td>
          <td style="padding:6px 4px; color:#aaa;">${file.date}</td>
        `;
        filesList.appendChild(tr);
      });

      refreshPasteButton();
    };

    // Navegação Lateral
    const switchFolder = (folderId, label) => {
      currentFolder = folderId;
      pathText.textContent = `Caminho: Este Computador > ${label}`;
      sideItems.forEach(i => {
        i.style.background = "transparent";
        if (i.getAttribute("data-folder") === folderId) {
          i.style.background = "rgba(124, 58, 237, 0.2)";
        }
      });
      renderFiles();
    };

    sideItems.forEach(item => {
      item.addEventListener("click", () => {
        const folder = item.getAttribute("data-folder");
        const label = item.textContent.replace(/[🖥️📥📄🖼️🎥💽🗑️]\s*/g, "");
        switchFolder(folder, label);
      });
    });

    searchInput.addEventListener("input", renderFiles);

    winContent.querySelectorAll(".exp-sort-header").forEach(header => {
      header.addEventListener("click", () => {
        const key = header.getAttribute("data-sort");
        if (sortKey === key) {
          sortAsc = !sortAsc;
        } else {
          sortKey = key;
          sortAsc = true;
        }
        renderFiles();
      });
    });

    btnNewFolder.addEventListener("click", () => {
      const name = prompt("Digite o nome da nova pasta:", "Nova Pasta");
      if (name && name.trim()) {
        const newFolderObj = {
          id: `folder-${Date.now()}`,
          name: name.trim(),
          type: "Pasta",
          size: 0,
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          isFolder: true
        };
        fileSystem[currentFolder].push(newFolderObj);
        renderFiles();
      }
    });

    btnCut.addEventListener("click", () => {
      if (!selectedFileId) {
        errorsCount++;
        window.showPedagogicalHint("explorer", errorsCount, 
          "Selecione o arquivo clicando na tabela antes de clicar em Mover.",
          "Clique sobre o arquivo 'relatorio_financeiro.xlsx' na tabela, clique no botão 'Mover (Recortar)' no topo, mude para a pasta 'Documentos' no menu esquerdo e clique no botão 'Colar'."
        );
        return;
      }
      
      const fileIdx = fileSystem[currentFolder].findIndex(f => f.id === selectedFileId);
      if (fileIdx !== -1) {
        clipboardFile = {
          file: fileSystem[currentFolder][fileIdx],
          originFolder: currentFolder
        };
        fileSystem[currentFolder].splice(fileIdx, 1);
        selectedFileId = null;
        renderFiles();
        showToastNotification("✂️ Arquivo Recortado", "Vá para a pasta destino e clique em Colar.");
      }
    });

    btnPaste.addEventListener("click", () => {
      if (!clipboardFile) return;
      
      fileSystem[currentFolder].push(clipboardFile.file);
      
      if (currentFolder === "Documentos" && clipboardFile.file.id === "file-relatorio") {
        m3Done = true;
        const taskEl = document.getElementById("expl-mission-3");
        if (taskEl) {
          taskEl.innerHTML = "✅ 3. Usar a barra de pesquisa para buscar por <strong>relatorio_financeiro.xlsx</strong>, selecioná-lo e clicar em <strong>Mover</strong> e depois <strong>Colar</strong> dentro do diretório <strong>Documentos</strong>.";
          taskEl.style.color = "var(--color-success)";
        }
        showToastNotification("📊 Relatório Movido!", "Arquivo financeiro colado na pasta Documentos.");
        checkAllMissionsCompleted();
      }

      clipboardFile = null;
      renderFiles();
    });

    btnRename.addEventListener("click", () => {
      if (!selectedFileId) {
        errorsCount++;
        window.showPedagogicalHint("explorer", errorsCount, "Selecione o arquivo primeiro.", "Selecione o arquivo da lista e clique em Renomear.");
        return;
      }
      
      const file = fileSystem[currentFolder].find(f => f.id === selectedFileId);
      if (file) {
        const newName = prompt("Digite o novo nome para o arquivo:", file.name);
        if (newName && newName.trim()) {
          file.name = newName.trim();
          renderFiles();
        }
      }
    });

    btnDelete.addEventListener("click", () => {
      if (!selectedFileId) {
        errorsCount++;
        window.showPedagogicalHint("explorer", errorsCount, 
          "Selecione o arquivo que deseja excluir.",
          "Vá em Este Computador ➔ Disco Local (C:) ➔ pasta 'Logs_Temporarios' dando duplo clique. Selecione o arquivo 'temp_log_gigante.txt' e clique no botão vermelho 'Excluir'."
        );
        return;
      }

      const fileIdx = fileSystem[currentFolder].findIndex(f => f.id === selectedFileId);
      if (fileIdx !== -1) {
        const deletedFile = fileSystem[currentFolder][fileIdx];
        
        if (currentFolder === "Lixeira") {
          fileSystem[currentFolder].splice(fileIdx, 1);
          selectedFileId = null;
          showToastNotification("🗑️ Excluído Permanente", "Arquivo apagado definitivamente.");
        } else {
          fileSystem[currentFolder].splice(fileIdx, 1);
          deletedFile.originalLoc = currentFolder;
          fileSystem["Lixeira"].push(deletedFile);
          
          if (deletedFile.id === "file-log") {
            m2Done = true;
            const taskEl = document.getElementById("expl-mission-2");
            if (taskEl) {
              taskEl.innerHTML = "✅ 2. Ir em Este Computador ➔ Disco Local (C:) ➔ pasta <strong>Logs_Temporarios</strong> e clicar em <strong>Excluir</strong> no arquivo <strong>temp_log_gigante.txt</strong> para liberar o armazenamento.";
              taskEl.style.color = "var(--color-success)";
            }
            showToastNotification("💽 Armazenamento Liberado!", "SSD limpo com sucesso!");
            checkAllMissionsCompleted();
          }
        }
        
        renderFiles();
      }
    });

    btnRestore.addEventListener("click", () => {
      if (currentFolder !== "Lixeira" || !selectedFileId) return;
      
      const fileIdx = fileSystem["Lixeira"].findIndex(f => f.id === selectedFileId);
      if (fileIdx !== -1) {
        const file = fileSystem["Lixeira"][fileIdx];
        const dest = file.originalLoc || "Documentos";
        
        fileSystem["Lixeira"].splice(fileIdx, 1);
        fileSystem[dest].push(file);
        selectedFileId = null;

        if (file.id === "file-contrato") {
          m1Done = true;
          const taskEl = document.getElementById("expl-mission-1");
          if (taskEl) {
            taskEl.innerHTML = "✅ 1. Encontrar o arquivo <strong>contrato_importante.docx</strong> na Lixeira e clicar em <strong>Restaurar</strong>.";
            taskEl.style.color = "var(--color-success)";
          }
          showToastNotification("↩️ Documento Restaurado!", "Contrato movido de volta para a pasta Documentos.");
          checkAllMissionsCompleted();
        }

        renderFiles();
      }
    });

    const checkAllMissionsCompleted = () => {
      if (m1Done && m2Done && m3Done) {
        setTimeout(() => {
          state.pedagogicalProfile.organizationScore = 100;
          if (!state.pedagogicalProfile.completedSimulations.includes("explorer-simulator")) {
            state.pedagogicalProfile.completedSimulations.push("explorer-simulator");
          }
          
          addXP(50);
          markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
          window.showModernAlert("🏆 Mestre dos Arquivos!", "Você concluiu com sucesso todas as missões de organização de pastas e arquivos no Windows!");
        }, 800);
      }
    };

  }
}

// ==========================================================================
// AULA 6 SIMULATOR 2: CENTRAL DE MANUTENÇÃO (WINDOWS CONTROL CENTER)
// ==========================================================================

function initWindowsControlCenterSimulator(container, isReset = false) {
  container.innerHTML = "";

  // Estado Interno da Manutenção
  let ramUsage = 95; // Inicializa crítico
  let cpuTemp = 75;  // Inicializa alta
  let isMouseConnected = false;
  let wifiDriverStatus = "failed"; // "failed" ou "ok"
  let errorsCount = 0;

  // Checklist de Conclusão local
  let m1Done = false; // Finalizar processo pesado na RAM
  let m2Done = false; // Reinstalar driver de Wi-Fi
  let m3Done = false; // Reconectar mouse USB

  // Banco de processos ativos
  let processes = [
    { name: "Sistema (kernel)", ram: 8, id: "proc-sys", isKillable: false },
    { name: "Navegador Web (Chrome)", ram: 14, id: "proc-browser", isKillable: true },
    { name: "minerador_inutil.exe", ram: 62, id: "proc-miner", isKillable: true },
    { name: "Antivírus Ativo", ram: 6, id: "proc-av", isKillable: false },
    { name: "Áudio do Windows", ram: 5, id: "proc-audio", isKillable: false }
  ];

  // Cria a Área de Trabalho Virtual (Desktop)
  const desktop = document.createElement("div");
  desktop.className = "virtual-desktop";
  desktop.style.height = "450px";

  // Icones do Desktop
  const iconsArea = document.createElement("div");
  iconsArea.className = "virtual-desktop-icons";

  const iconExplorer = document.createElement("div");
  iconExplorer.className = "desktop-icon-item";
  iconExplorer.innerHTML = `
    <span class="icon-display">📂</span>
    <span class="icon-label">Explorador de Arquivos</span>
  `;
  iconExplorer.addEventListener("click", () => {
    window.showModernAlert("🔒 Explorador Bloqueado", "Foque na manutenção do sistema nesta lição!");
  });

  const iconMaint = document.createElement("div");
  iconMaint.className = "desktop-icon-item";
  iconMaint.innerHTML = `
    <span class="icon-display">🔧</span>
    <span class="icon-label">Central de Manutenção</span>
  `;
  iconMaint.addEventListener("click", () => {
    openMaintenanceWindow();
  });

  iconsArea.appendChild(iconExplorer);
  iconsArea.appendChild(iconMaint);
  desktop.appendChild(iconsArea);

  // Taskbar do Desktop
  const taskbar = document.createElement("div");
  taskbar.className = "virtual-taskbar";

  const startBtn = document.createElement("button");
  startBtn.className = "taskbar-start-btn";
  startBtn.innerHTML = `🏁 Iniciar`;
  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    window.showModernAlert("💡 Central de Manutenção", "Abra a Central de Manutenção clicando no ícone do Desktop para reparar o computador.");
  });

  const runningApps = document.createElement("div");
  runningApps.className = "taskbar-running-apps";

  const systemTray = document.createElement("div");
  systemTray.className = "taskbar-system-tray";
  systemTray.innerHTML = `
    <span style="font-size:0.8rem;">📶 🔊</span>
    <span id="maint-clock-tray" style="margin-left: 6px;">12:00</span>
  `;

  taskbar.appendChild(startBtn);
  taskbar.appendChild(runningApps);
  taskbar.appendChild(systemTray);
  desktop.appendChild(taskbar);

  container.appendChild(desktop);

  // Relógio do Sistema
  const clockTray = desktop.querySelector("#maint-clock-tray");
  const updateTrayClock = () => {
    const now = new Date();
    clockTray.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };
  updateTrayClock();
  setInterval(updateTrayClock, 30000);

  // Auto-abre a janela da Central de Manutenção
  setTimeout(() => openMaintenanceWindow(), 100);

  function openMaintenanceWindow() {
    const win = window.createVirtualWindow(desktop, {
      id: "maintenance",
      title: "Painel de Controle ➔ Diagnóstico Técnico",
      icon: "🔧",
      width: 610,
      height: 380,
      left: 10,
      top: 10
    });

    renderMaintenanceContent(win.querySelector(".window-content"));
  }

  function renderMaintenanceContent(winContent) {
    winContent.innerHTML = `
      <!-- Cabeçalho de Status -->
      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:10px; border-radius:8px; display:flex; justify-content:space-around; align-items:center; margin-bottom:12px;">
        <div style="text-align:center;">
          <div style="font-size:0.65rem; color:#888; text-transform:uppercase; font-weight:700;">Uso de RAM</div>
          <div id="maint-ram-text" style="font-size:1.4rem; font-weight:bold; color:#ef4444;">95%</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:0.65rem; color:#888; text-transform:uppercase; font-weight:700;">Temperatura da CPU</div>
          <div id="maint-temp-text" style="font-size:1.4rem; font-weight:bold; color:#ef4444;">75°C</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:0.65rem; color:#888; text-transform:uppercase; font-weight:700;">Espaço SSD (C:)</div>
          <div style="font-size:1.4rem; font-weight:bold; color:#10b981;">124 GB / 120 GB</div>
        </div>
      </div>

      <!-- Grid de Ações -->
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:12px; flex:1; min-height:0; overflow:hidden;">
        
        <!-- Coluna Esquerda: Gerenciador de Tarefas -->
        <div style="background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.05); border-radius:6px; padding:10px; display:flex; flex-direction:column; overflow:hidden;">
          <h4 style="margin:0 0 8px; font-size:0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:4px; color:#fff; display:flex; justify-content:space-between; align-items:center;">
            <span>💾 Processos na Memória RAM</span>
            <span style="font-size:0.6rem; color:#888; font-style:italic;">Selecione e finalize processos pesados</span>
          </h4>
          <div style="flex:1; overflow-y:auto; margin-bottom:8px;">
            <table style="width:100%; border-collapse:collapse; font-size:0.7rem; text-align:left; color:#ccc;">
              <thead>
                <tr style="color:#555; border-bottom:1px solid rgba(255,255,255,0.05);">
                  <th style="padding:4px 0;">Nome do Processo</th>
                  <th style="padding:4px 0; text-align:right;">Uso de RAM</th>
                </tr>
              </thead>
              <tbody id="maint-proc-list">
                <!-- Injetado por JS -->
              </tbody>
            </table>
          </div>
          <button class="btn btn-primary btn-small" id="btn-kill-process" style="width:100%; padding:6px; font-size:0.7rem;" disabled>✂️ Finalizar Processo Selecionado</button>
        </div>

        <!-- Coluna Direita: Dispositivos & Drivers -->
        <div style="display:flex; flex-direction:column; gap:12px; overflow-y:auto;">
          
          <!-- Card de Portas e Mouse USB -->
          <div style="background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.05); border-radius:6px; padding:10px;">
            <h4 style="margin:0 0 6px; font-size:0.75rem; color:#fff; display:flex; align-items:center; gap:6px;">🖱️ Periféricos Externos</h4>
            <div id="maint-mouse-card" style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#ccc;">
              <div>
                <div>Status: <span id="maint-mouse-status" style="color:#ef4444; font-weight:bold;">🔌 Desconectado</span></div>
                <div style="font-size:0.62rem; color:#888; margin-top:2px;">Mouse óptico USB na porta traseira.</div>
              </div>
              <button class="btn btn-outline btn-small" id="btn-connect-mouse" style="padding:4px 8px; font-size:0.65rem;">🔌 Conectar Cabo</button>
            </div>
          </div>

          <!-- Card de Rede & Drivers -->
          <div style="background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.05); border-radius:6px; padding:10px;">
            <h4 style="margin:0 0 6px; font-size:0.75rem; color:#fff; display:flex; align-items:center; gap:6px;">📶 Adaptador de Rede Wi-Fi</h4>
            <div id="maint-wifi-card" style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#ccc;">
              <div>
                <div>Driver: <span id="maint-wifi-status" style="color:#ef4444; font-weight:bold;">⚠️ Falha (Código 43)</span></div>
                <div style="font-size:0.62rem; color:#888; margin-top:2px;">Intel Wireless-AC 9560.</div>
              </div>
              <button class="btn btn-outline btn-small" id="btn-reinstall-wifi" style="padding:4px 8px; font-size:0.65rem;">💿 Reinstalar Driver</button>
            </div>
          </div>

        </div>
      </div>
    `;

    const ramText = winContent.querySelector("#maint-ram-text");
    const tempText = winContent.querySelector("#maint-temp-text");
    const procList = winContent.querySelector("#maint-proc-list");
    const btnKill = winContent.querySelector("#btn-kill-process");

    const mouseStatus = winContent.querySelector("#maint-mouse-status");
    const btnConnectMouse = winContent.querySelector("#btn-connect-mouse");

    const wifiStatus = winContent.querySelector("#maint-wifi-status");
    const btnReinstallWifi = winContent.querySelector("#btn-reinstall-wifi");

    let selectedProcId = null;

    const refreshMetricsUI = () => {
      ramText.textContent = `${ramUsage}%`;
      if (ramUsage <= 40) {
        ramText.style.color = "var(--color-success)";
      } else {
        ramText.style.color = "#ef4444";
      }

      tempText.textContent = `${cpuTemp}°C`;
      if (cpuTemp <= 45) {
        tempText.style.color = "var(--color-success)";
      } else {
        tempText.style.color = "#ef4444";
      }
    };

    const renderProcesses = () => {
      procList.innerHTML = "";
      processes.forEach(p => {
        const tr = document.createElement("tr");
        tr.style.cssText = "border-bottom:1px solid rgba(255,255,255,0.03); cursor:pointer;";
        if (selectedProcId === p.id) {
          tr.style.background = "rgba(124, 58, 237, 0.15)";
        }

        tr.addEventListener("click", () => {
          if (p.isKillable) {
            selectedProcId = p.id;
            btnKill.disabled = false;
          } else {
            selectedProcId = null;
            btnKill.disabled = true;
          }
          renderProcesses();
        });

        tr.innerHTML = `
          <td style="padding:6px 0; font-weight:600; color:#fff; display:flex; align-items:center; gap:4px;">
            <span>${p.isKillable ? "⚙️" : "🔒"}</span>
            <span>${p.name}</span>
          </td>
          <td style="padding:6px 0; text-align:right; font-weight:bold; ${p.ram > 20 ? "color:#ef4444;" : "color:#aaa;"}">${p.ram}%</td>
        `;
        procList.appendChild(tr);
      });
    };

    btnKill.addEventListener("click", () => {
      if (selectedProcId === "proc-miner") {
        processes = processes.filter(p => p.id !== "proc-miner");
        ramUsage = 33;
        cpuTemp = 42;
        m1Done = true;
        btnKill.disabled = true;
        selectedProcId = null;
        renderProcesses();
        refreshMetricsUI();
        
        const taskEl = document.getElementById("maint-task-1");
        if (taskEl) {
          taskEl.innerHTML = "✅ 1. O consumo de memória RAM está perigosamente alto (95%). Encontre o processo pesado e finalize-o.";
          taskEl.style.color = "var(--color-success)";
        }
        showToastNotification("💥 Processo Finalizado!", "minerador_inutil.exe fechado com sucesso. RAM e temperatura caíram!");
        checkAllMaintenanceCompleted();
      } else {
        errorsCount++;
        window.showPedagogicalHint("maintenance", errorsCount, 
          "Selecione um processo que ocupe muito desempenho e que possa ser finalizado (⚙️).",
          "Selecione o processo 'minerador_inutil.exe' que está ocupando 62% da memória RAM e clique no botão 'Finalizar Processo'."
        );
      }
    });

    btnConnectMouse.addEventListener("click", () => {
      isMouseConnected = true;
      m3Done = true;
      mouseStatus.textContent = "✅ Conectado (USB)";
      mouseStatus.style.color = "var(--color-success)";
      btnConnectMouse.disabled = true;
      btnConnectMouse.textContent = "🔌 Conectado";
      
      const taskEl = document.getElementById("maint-task-3");
      if (taskEl) {
        taskEl.innerHTML = "✅ 3. O mouse USB externo foi desligado da porta traseira do gabinete. Clique no cabo para reconectá-lo.";
        taskEl.style.color = "var(--color-success)";
      }
      showToastNotification("🖱️ Mouse Reconectado!", "Cabo USB plugado e periférico ativo.");
      checkAllMaintenanceCompleted();
    });

    btnReinstallWifi.addEventListener("click", () => {
      wifiDriverStatus = "ok";
      m2Done = true;
      wifiStatus.textContent = "✅ Funcionando (Wi-Fi)";
      wifiStatus.style.color = "var(--color-success)";
      btnReinstallWifi.disabled = true;
      btnReinstallWifi.textContent = "💿 Reinstalado";
      
      const taskEl = document.getElementById("maint-task-2");
      if (taskEl) {
        taskEl.innerHTML = "✅ 2. O driver do adaptador de rede Wi-Fi está com falha física. Clique no botão de reinstalar o driver.";
        taskEl.style.color = "var(--color-success)";
      }
      showToastNotification("📶 Wi-Fi Reinstalado!", "Driver configurado. Adaptador de rede operando!");
      checkAllMaintenanceCompleted();
    });

    const checkAllMaintenanceCompleted = () => {
      if (m1Done && m2Done && m3Done) {
        setTimeout(() => {
          state.pedagogicalProfile.hardwareScore = 100;
          state.pedagogicalProfile.windowsScore = 100;
          if (!state.pedagogicalProfile.completedSimulations.includes("windows-control-center")) {
            state.pedagogicalProfile.completedSimulations.push("windows-control-center");
          }

          addXP(50);
          unlockAchievement("assistente_tecnico");
          markSlideAsCompleted(COURSE_CONTENT[state.currentSlideIndex].id);
          window.showModernAlert("🏆 Assistente Técnico Concluído!", "Você concluiu com sucesso todas as tarefas de manutenção corretiva da Central! Parabéns, Assistente Técnico!");
        }, 800);
      }
    };

    renderProcesses();
    refreshMetricsUI();
  }
}

// 1. Simulador de Limpeza Técnica (Oficina de Limpeza)
function initAula6CleaningSim(container, isReset = false) {
  container.innerHTML = "";

  const steps = [
    {
      question: "Antes de abrir o gabinete, qual é o primeiro procedimento obrigatório de segurança?",
      options: [
        "Ligar o computador para verificar se ainda funciona.",
        "Desligar o computador e desconectar completamente o cabo da tomada elétrica.",
        "Cobrir o gabinete com um pano úmido para evitar acúmulo de estática.",
        "Soprar com a boca diretamente nas peças para remover a poeira."
      ],
      correct: 1,
      tip: "Trabalhar com o PC energizado pode causar curto-circuito e choque elétrico. Sempre desconecte da tomada antes de abrir."
    },
    {
      question: "Após desligar, o que você deve fazer antes de tocar nos componentes internos?",
      options: [
        "Usar luvas de borracha grossa para isolar as mãos completamente.",
        "Tocar em uma superfície metálica aterrada (como o próprio gabinete) para descarregar a eletricidade estática do corpo.",
        "Pingar algumas gotas de água nas mãos para melhorar a condutividade.",
        "Aguardar 24 horas depois de desligar o computador."
      ],
      correct: 1,
      tip: "Eletricidade estática do corpo pode destruir chips sensíveis. O toque em metal aterrado ou uma pulseira antiestática são essenciais."
    },
    {
      question: "Qual ferramenta é a mais indicada para remover poeira das ventoinhas e dissipadores do computador?",
      options: [
        "Aspirador de pó doméstico potente para sugar toda a poeira de uma vez.",
        "Pano úmido com água e detergente neutro para dissolver a sujeira.",
        "Ar comprimido em lata ou soprador elétrico antiestático.",
        "Escova de dentes velha com cerdas firmes e rígidas."
      ],
      correct: 2,
      tip: "Aspiradores geram eletricidade estática intensa. O ar comprimido expulsa a poeira com eficiência e segurança."
    },
    {
      question: "Ao limpar as ventoinhas com ar comprimido, o que você deve fazer para não danificá-las?",
      options: [
        "Ligar o computador durante a limpeza para ver se a ventoinha gira normalmente.",
        "Segurar as pás da ventoinha com o dedo para impedir que girem durante o sopro.",
        "Usar o soprador na potência máxima para garantir a remoção completa da poeira.",
        "Molhar a ventoinha com álcool 70% antes de soprar."
      ],
      correct: 1,
      tip: "Ventoinhas girando em alta velocidade por ar comprimido sem carga elétrica podem danificar os rolamentos ou até gerar tensão indesejada."
    },
    {
      question: "Com que frequência a limpeza interna de um computador de escritório deve ser realizada?",
      options: [
        "A cada 5 anos, apenas quando o computador apresentar travamentos graves.",
        "Uma vez por semana, independentemente do ambiente de uso.",
        "A cada 3 a 6 meses, com maior frequência em ambientes com carpete ou pó.",
        "Apenas quando o técnico especializado fizer a visita anual de manutenção."
      ],
      correct: 2,
      tip: "A frequência ideal é 3 a 6 meses. Ambientes empoeirados ou com carpete podem exigir limpeza trimestral."
    }
  ];

  let current = 0;
  let lives = 3;

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff; font-family:var(--font-sans);";
  container.appendChild(mainDiv);

  const drawUI = () => {
    if (lives <= 0) {
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3.5rem; display:block; margin-bottom:1rem;">💔</span>
          <h3 style="color:#ef4444; margin:0 0 8px;">Procedimento Incorreto!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Você cometeu erros críticos durante o processo de limpeza. Revise os procedimentos e tente novamente.</p>
          <button class="btn btn-primary" id="retry-clean" style="width:100%;">🔄 Tentar Novamente</button>
        </div>
      `;
      mainDiv.querySelector("#retry-clean").addEventListener("click", () => initAula6CleaningSim(container, true));
      return;
    }

    if (current >= steps.length) {
      addXP(80);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3.5rem; display:block; margin-bottom:1rem;">🏆</span>
          <h3 style="color:#10b981; margin:0 0 8px;">Oficina Aprovada!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Você completou todos os procedimentos corretos de limpeza técnica. Equipamento funcionando perfeitamente!</p>
          <button class="btn btn-primary" id="next-clean" style="width:100%;">Avançar Lição ➔</button>
        </div>
      `;
      mainDiv.querySelector("#next-clean").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const step = steps[current];
    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <strong style="color:var(--color-primary-light); font-size:0.82rem;">Passo ${current + 1} / ${steps.length}</strong>
      </div>

      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1rem; margin-bottom:1rem;">
        <p style="font-size:0.9rem; line-height:1.6; margin:0; color:#fff;">${step.question}</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:1rem;">
        ${step.options.map((opt, idx) => `
          <button class="clean-opt" data-idx="${idx}" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.7rem 1rem; text-align:left; color:#fff; font-size:0.82rem; cursor:pointer; transition:background 0.15s; line-height:1.4;">
            <span style="color:#fbbf24; font-weight:700;">${String.fromCharCode(65+idx)}.</span> ${opt}
          </button>
        `).join("")}
      </div>

      <div id="clean-feedback" style="display:none; padding:0.8rem; border-radius:8px; font-size:0.82rem; line-height:1.5;"></div>
    `;

    mainDiv.querySelectorAll(".clean-opt").forEach(btn => {
      btn.addEventListener("mouseenter", () => btn.style.background = "rgba(255,255,255,0.06)");
      btn.addEventListener("mouseleave", () => btn.style.background = "rgba(255,255,255,0.03)");
      btn.addEventListener("click", () => {
        const chosen = parseInt(btn.getAttribute("data-idx"), 10);
        const feedback = mainDiv.querySelector("#clean-feedback");
        feedback.style.display = "block";

        mainDiv.querySelectorAll(".clean-opt").forEach(b => b.disabled = true);

        if (chosen === step.correct) {
          feedback.style.background = "rgba(16,185,129,0.12)";
          feedback.style.border = "1px solid rgba(16,185,129,0.3)";
          feedback.style.color = "#10b981";
          feedback.innerHTML = `✅ <strong>Correto!</strong> ${step.tip}`;
          current++;
          setTimeout(drawUI, 1800);
        } else {
          lives--;
          feedback.style.background = "rgba(239,68,68,0.12)";
          feedback.style.border = "1px solid rgba(239,68,68,0.3)";
          feedback.style.color = "#ef4444";
          feedback.innerHTML = `❌ <strong>Procedimento errado!</strong> ${step.tip}`;
          setTimeout(drawUI, 2000);
        }
      });
    });
  };

  drawUI();
}

// 2. Monitor de Temperatura Virtual
function initAula6TempMonitor(container, isReset = false) {
  container.innerHTML = "";

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff; font-family:var(--font-sans);";
  container.appendChild(mainDiv);

  let lives = 3;
  let score = 0;

  const scenarios = [
    {
      temps: { cpu: 95, gpu: 72, hd: 38, mb: 41 },
      problem: "cpu",
      actions: [
        { label: "Reaplicar a pasta térmica na CPU e limpar o cooler", correct: true },
        { label: "Formatar o computador e reinstalar o Windows", correct: false },
        { label: "Adicionar mais memória RAM ao computador", correct: false },
        { label: "Trocar o monitor por um modelo de baixo consumo", correct: false }
      ],
      tip: "CPU a 95°C está em throttling crítico. Pasta térmica seca e cooler entupido são as causas mais comuns."
    },
    {
      temps: { cpu: 68, gpu: 92, hd: 40, mb: 38 },
      problem: "gpu",
      actions: [
        { label: "Atualizar o driver da placa de rede Wi-Fi", correct: false },
        { label: "Limpar as ventoinhas da GPU e garantir boa circulação de ar no gabinete", correct: true },
        { label: "Aumentar o brilho do monitor para melhorar a visualização", correct: false },
        { label: "Desconectar o cabo HDMI e reconectá-lo", correct: false }
      ],
      tip: "GPU a 92°C indica obstrução da ventoinha ou falta de fluxo de ar no gabinete. Limpe as entradas e saídas de ar."
    },
    {
      temps: { cpu: 72, gpu: 65, hd: 58, mb: 44 },
      problem: "hd",
      actions: [
        { label: "Trocar o protetor de tela do monitor por um mais escuro", correct: false },
        { label: "Verificar se o HD está próximo a uma fonte de calor e melhorar o fluxo de ar na região", correct: true },
        { label: "Instalar um antivírus para remover arquivos que esquentam o processador", correct: false },
        { label: "Aumentar a velocidade do Wi-Fi para reduzir o processamento do HD", correct: false }
      ],
      tip: "HDs acima de 55°C têm vida útil drasticamente reduzida. Verifique o posicionamento no gabinete e os cabos de ar."
    }
  ];

  let currentScenario = 0;

  const drawUI = () => {
    if (lives <= 0) {
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3.5rem; display:block;">💔</span>
          <h3 style="color:#ef4444; margin:1rem 0 8px;">Sistema Desligado por Superaquecimento!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">As ações incorretas causaram dano permanente ao componente crítico.</p>
          <button class="btn btn-primary" id="retry-temp" style="width:100%;">🔄 Reiniciar Painel</button>
        </div>
      `;
      mainDiv.querySelector("#retry-temp").addEventListener("click", () => initAula6TempMonitor(container, true));
      return;
    }

    if (currentScenario >= scenarios.length) {
      addXP(100);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3.5rem; display:block;">🏆</span>
          <h3 style="color:#10b981; margin:1rem 0 8px;">Todos os Alertas Resolvidos!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Você diagnosticou e resolveu todos os problemas de temperatura corretamente!</p>
          <button class="btn btn-primary" id="next-temp" style="width:100%;">Avançar Lição ➔</button>
        </div>
      `;
      mainDiv.querySelector("#next-temp").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const sc = scenarios[currentScenario];

    const tempColor = (t) => {
      if (t >= 90) return "#ef4444";
      if (t >= 70) return "#fbbf24";
      return "#10b981";
    };

    const tempBar = (t) => {
      const pct = Math.min(100, (t / 100) * 100);
      const col = tempColor(t);
      return `<div style="background:rgba(255,255,255,0.05); border-radius:4px; height:8px; width:100%; margin-top:4px;"><div style="background:${col}; width:${pct}%; height:100%; border-radius:4px; transition:width 1s;"></div></div>`;
    };

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <strong style="color:var(--color-primary-light); font-size:0.82rem;">Caso ${currentScenario + 1} / ${scenarios.length}</strong>
      </div>

      <div style="background:#121226; border-radius:10px; padding:1rem; margin-bottom:1rem; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div>
          <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">🔲 Processador (CPU)</div>
          <div style="font-size:1.4rem; font-weight:800; color:${tempColor(sc.temps.cpu)}; font-family:monospace;">${sc.temps.cpu}°C</div>
          ${tempBar(sc.temps.cpu)}
        </div>
        <div>
          <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">🎮 Placa de Vídeo (GPU)</div>
          <div style="font-size:1.4rem; font-weight:800; color:${tempColor(sc.temps.gpu)}; font-family:monospace;">${sc.temps.gpu}°C</div>
          ${tempBar(sc.temps.gpu)}
        </div>
        <div>
          <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">💾 Disco (HD/SSD)</div>
          <div style="font-size:1.4rem; font-weight:800; color:${tempColor(sc.temps.hd)}; font-family:monospace;">${sc.temps.hd}°C</div>
          ${tempBar(sc.temps.hd)}
        </div>
        <div>
          <div style="font-size:0.75rem; color:#888; margin-bottom:4px;">🔌 Placa-Mãe</div>
          <div style="font-size:1.4rem; font-weight:800; color:${tempColor(sc.temps.mb)}; font-family:monospace;">${sc.temps.mb}°C</div>
          ${tempBar(sc.temps.mb)}
        </div>
      </div>

      <p style="font-size:0.82rem; color:#fbbf24; font-weight:700; margin-bottom:8px;">⚠️ Alerta detectado! Qual ação você toma?</p>
      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:1rem;">
        ${sc.actions.map((a, idx) => `
          <button class="temp-action" data-correct="${a.correct}" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.65rem 1rem; text-align:left; color:#fff; font-size:0.8rem; cursor:pointer; transition:background 0.15s; line-height:1.4;">
            <span style="color:#fbbf24; font-weight:700;">${String.fromCharCode(65+idx)}.</span> ${a.label}
          </button>
        `).join("")}
      </div>

      <div id="temp-feedback" style="display:none; padding:0.8rem; border-radius:8px; font-size:0.82rem; line-height:1.5;"></div>
    `;

    mainDiv.querySelectorAll(".temp-action").forEach(btn => {
      btn.addEventListener("mouseenter", () => btn.style.background = "rgba(255,255,255,0.06)");
      btn.addEventListener("mouseleave", () => btn.style.background = "rgba(255,255,255,0.03)");
      btn.addEventListener("click", () => {
        const isCorrect = btn.getAttribute("data-correct") === "true";
        const feedback = mainDiv.querySelector("#temp-feedback");
        feedback.style.display = "block";
        mainDiv.querySelectorAll(".temp-action").forEach(b => b.disabled = true);

        if (isCorrect) {
          score++;
          currentScenario++;
          feedback.style.background = "rgba(16,185,129,0.12)";
          feedback.style.border = "1px solid rgba(16,185,129,0.3)";
          feedback.style.color = "#10b981";
          feedback.innerHTML = `✅ <strong>Correto!</strong> ${sc.tip}`;
          setTimeout(drawUI, 1800);
        } else {
          lives--;
          feedback.style.background = "rgba(239,68,68,0.12)";
          feedback.style.border = "1px solid rgba(239,68,68,0.3)";
          feedback.style.color = "#ef4444";
          feedback.innerHTML = `❌ <strong>Ação incorreta!</strong> ${sc.tip}`;
          setTimeout(drawUI, 2200);
        }
      });
    });
  };

  drawUI();
}

// 3. Jogo de Diagnóstico Técnico
function initAula6DiagnosticoSim(container, isReset = false) {
  container.innerHTML = "";

  const cases = [
    {
      symptom: "O computador não liga. Ao pressionar o botão Power, nada acontece — sem luz, sem ventoinha, sem bipe.",
      clue: "Você cheira um leve odor de queimado vindo da área da fonte de alimentação.",
      options: [
        { label: "Fonte de alimentação queimada ou com defeito grave.", correct: true },
        { label: "Monitor desconectado ou com cabo HDMI solto.", correct: false },
        { label: "Memória RAM solta no slot da placa-mãe.", correct: false },
        { label: "Windows corrompido — necessário reinstalar o sistema.", correct: false }
      ],
      tip: "Sem reação alguma ao ligar (sem ventoinha, sem LED) com odor de queimado aponta para falha grave na fonte de alimentação."
    },
    {
      symptom: "O computador liga, mas emite 3 bipes longos e não exibe nada na tela. Permanece nessa situação indefinidamente.",
      clue: "Os LEDs da placa-mãe indicam a letra 'D' piscando em vermelho.",
      options: [
        { label: "Driver da placa de vídeo desatualizado ou corrompido.", correct: false },
        { label: "Memória RAM com defeito, mal encaixada ou incompatível.", correct: true },
        { label: "Disco rígido sem espaço livre suficiente para inicializar.", correct: false },
        { label: "Monitor com defeito na retroiluminação traseira.", correct: false }
      ],
      tip: "3 bipes longos = erro de memória RAM (código BIOS universal). O LED 'DRAM' aceso confirma o diagnóstico."
    },
    {
      symptom: "O computador funciona normalmente por 15 minutos e depois desliga sozinho subitamente sem aviso. Ao ligar novamente, repete o mesmo comportamento.",
      clue: "Você nota que o cooler da CPU está extremamente sujo e quase parado de tanto pó acumulado.",
      options: [
        { label: "Vírus no sistema operacional causando desligamento automático agendado.", correct: false },
        { label: "Superaquecimento da CPU causando desligamento de proteção térmico.", correct: true },
        { label: "Placa de rede com defeito interrompendo a conexão com a internet.", correct: false },
        { label: "Bateria da placa-mãe descarregada, perdendo a hora do sistema.", correct: false }
      ],
      tip: "Desligamento após tempo fixo de uso + cooler entupido é diagnóstico clássico de thermal shutdown por CPU superaquecida."
    },
    {
      symptom: "O computador liga normalmente, mas a imagem na tela está distorcida, com linhas horizontais coloridas e artefatos visuais estranhos.",
      clue: "Os artefatos aparecem mesmo na tela de BIOS, antes do Windows carregar.",
      options: [
        { label: "Problema no sistema operacional ou em um driver de vídeo corrompido.", correct: false },
        { label: "Cabo HDMI com defeito ou mal encaixado na saída de vídeo.", correct: false },
        { label: "Placa de vídeo (GPU) com defeito físico na memória de vídeo (VRAM).", correct: true },
        { label: "Memória RAM insuficiente para renderizar a interface gráfica do Windows.", correct: false }
      ],
      tip: "Artefatos visuais que aparecem no BIOS (antes do S.O.) eliminam causas de software. O defeito é físico na GPU."
    },
    {
      symptom: "Ao tocar no gabinete de metal do computador, você leva um choque elétrico leve. O computador funciona normalmente.",
      clue: "A tomada onde o computador está ligado não possui o fio de aterramento (terra).",
      options: [
        { label: "Problema na fonte de alimentação que precisa ser trocada imediatamente.",correct: false },
        { label: "Corrente de fuga elétrica por falta de aterramento na instalação elétrica.", correct: true },
        { label: "O gabinete tem pintura condutiva que acumula eletricidade estática.", correct: false },
        { label: "O processador está operando acima da tensão correta (overvolt).", correct: false }
      ],
      tip: "Choque leve no gabinete indica corrente de fuga. Sem o fio terra na tomada, essa corrente não tem caminho seguro e passa pelo toque humano."
    }
  ];

  let current = 0;
  let lives = 3;

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff; font-family:var(--font-sans);";
  container.appendChild(mainDiv);

  const drawUI = () => {
    if (lives <= 0) {
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3.5rem; display:block; margin-bottom:1rem;">💔</span>
          <h3 style="color:#ef4444; margin:0 0 8px;">Diagnóstico Incorreto!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Os erros de diagnóstico custaram o equipamento do cliente. Estude melhor os sinais físicos e beep codes.</p>
          <button class="btn btn-primary" id="retry-diag" style="width:100%;">🔄 Tentar Novamente</button>
        </div>
      `;
      mainDiv.querySelector("#retry-diag").addEventListener("click", () => initAula6DiagnosticoSim(container, true));
      return;
    }

    if (current >= cases.length) {
      addXP(120);
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3.5rem; display:block; margin-bottom:1rem;">🏆</span>
          <h3 style="color:#10b981; margin:0 0 8px;">Técnico Aprovado!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">Você diagnosticou corretamente todos os 5 casos técnicos. Parabéns, Assistente Técnico!</p>
          <button class="btn btn-primary" id="next-diag" style="width:100%;">Avançar Lição ➔</button>
        </div>
      `;
      mainDiv.querySelector("#next-diag").addEventListener("click", () => {
        const nextBtn = document.getElementById("next-slide-btn");
        if (nextBtn) nextBtn.click();
      });
      return;
    }

    const c = cases[current];

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">❤️ Vidas: ${"❤️".repeat(lives)}</span>
        <strong style="color:var(--color-primary-light); font-size:0.82rem;">Chamado ${current + 1} / ${cases.length}</strong>
      </div>

      <div style="background:rgba(124,58,237,0.08); border:1px solid rgba(124,58,237,0.2); border-radius:10px; padding:1rem; margin-bottom:10px;">
        <strong style="color:#a78bfa; font-size:0.78rem; display:block; margin-bottom:4px;">📋 SINTOMA RELATADO PELO CLIENTE:</strong>
        <p style="font-size:0.85rem; color:#fff; margin:0; line-height:1.5;">${c.symptom}</p>
      </div>

      <div style="background:rgba(245,158,11,0.07); border:1px solid rgba(245,158,11,0.2); border-radius:10px; padding:0.8rem; margin-bottom:1rem;">
        <strong style="color:#fbbf24; font-size:0.78rem; display:block; margin-bottom:4px;">🔍 PISTA DO TÉCNICO:</strong>
        <p style="font-size:0.82rem; color:#ccc; margin:0; line-height:1.5;">${c.clue}</p>
      </div>

      <p style="font-size:0.82rem; color:#ccc; font-weight:600; margin-bottom:8px;">Qual é o diagnóstico correto?</p>
      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:1rem;">
        ${c.options.map((opt, idx) => `
          <button class="diag-opt" data-correct="${opt.correct}" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.65rem 1rem; text-align:left; color:#fff; font-size:0.8rem; cursor:pointer; transition:background 0.15s; line-height:1.4;">
            <span style="color:#a78bfa; font-weight:700;">${String.fromCharCode(65+idx)}.</span> ${opt.label}
          </button>
        `).join("")}
      </div>

      <div id="diag-feedback" style="display:none; padding:0.8rem; border-radius:8px; font-size:0.82rem; line-height:1.5;"></div>
    `;

    mainDiv.querySelectorAll(".diag-opt").forEach(btn => {
      btn.addEventListener("mouseenter", () => btn.style.background = "rgba(255,255,255,0.06)");
      btn.addEventListener("mouseleave", () => btn.style.background = "rgba(255,255,255,0.03)");
      btn.addEventListener("click", () => {
        const isCorrect = btn.getAttribute("data-correct") === "true";
        const feedback = mainDiv.querySelector("#diag-feedback");
        feedback.style.display = "block";
        mainDiv.querySelectorAll(".diag-opt").forEach(b => b.disabled = true);

        if (isCorrect) {
          current++;
          feedback.style.background = "rgba(16,185,129,0.12)";
          feedback.style.border = "1px solid rgba(16,185,129,0.3)";
          feedback.style.color = "#10b981";
          feedback.innerHTML = `✅ <strong>Diagnóstico Correto!</strong> ${c.tip}`;
          setTimeout(drawUI, 2000);
        } else {
          lives--;
          feedback.style.background = "rgba(239,68,68,0.12)";
          feedback.style.border = "1px solid rgba(239,68,68,0.3)";
          feedback.style.color = "#ef4444";
          feedback.innerHTML = `❌ <strong>Diagnóstico errado!</strong> ${c.tip}`;
          setTimeout(drawUI, 2200);
        }
      });
    });
  };

  drawUI();
}

// 4. Simulador de Ergonomia — Monte a Estação Perfeita
function initAula6ErgonomiaSim(container, isReset = false) {
  container.innerHTML = "";

  const mainDiv = document.createElement("div");
  mainDiv.style.cssText = "background:#1e1e38; border:1px solid var(--border-soft); border-radius:12px; padding:1.2rem; color:#fff; font-family:var(--font-sans);";
  container.appendChild(mainDiv);

  // Configurações da estação
  let settings = {
    chairHeight: 50,       // 40-60cm, ideal ~50
    monitorHeight: 50,     // 0-100%, ideal ~60
    monitorDistance: 50,   // 0-100, ideal ~60
    monitorAngle: 10,      // 0-30°, ideal 10-20°
    armAngle: 90           // 60-130°, ideal 90
  };

  let attempts = 3;
  let validated = false;

  const isOk = () => {
    return (
      settings.chairHeight >= 45 && settings.chairHeight <= 55 &&
      settings.monitorHeight >= 55 && settings.monitorHeight <= 65 &&
      settings.monitorDistance >= 50 && settings.monitorDistance <= 70 &&
      settings.monitorAngle >= 10 && settings.monitorAngle <= 20 &&
      settings.armAngle >= 85 && settings.armAngle <= 95
    );
  };

  const drawUI = () => {
    if (attempts <= 0 && !validated) {
      mainDiv.innerHTML = `
        <div style="text-align:center; padding:2rem 0;">
          <span style="font-size:3.5rem; display:block; margin-bottom:1rem;">💔</span>
          <h3 style="color:#ef4444; margin:0 0 8px;">Estação Incorreta!</h3>
          <p style="color:#ccc; font-size:0.85rem; margin-bottom:1.5rem;">O funcionário vai desenvolver problemas posturais. Revise as regras de ergonomia e tente novamente.</p>
          <button class="btn btn-primary" id="retry-ergo" style="width:100%;">🔄 Tentar Novamente</button>
        </div>
      `;
      mainDiv.querySelector("#retry-ergo").addEventListener("click", () => initAula6ErgonomiaSim(container, true));
      return;
    }

    const statusOf = (key) => {
      const checks = {
        chairHeight: settings.chairHeight >= 45 && settings.chairHeight <= 55,
        monitorHeight: settings.monitorHeight >= 55 && settings.monitorHeight <= 65,
        monitorDistance: settings.monitorDistance >= 50 && settings.monitorDistance <= 70,
        monitorAngle: settings.monitorAngle >= 10 && settings.monitorAngle <= 20,
        armAngle: settings.armAngle >= 85 && settings.armAngle <= 95
      };
      return checks[key] ? "✅" : "⚠️";
    };

    mainDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem;">
        <span style="font-weight:700; color:#fbbf24;">🎯 Tentativas: ${attempts}</span>
        <strong style="color:var(--color-primary-light); font-size:0.82rem;">Configure a Estação Ergonômica</strong>
      </div>

      <p style="font-size:0.8rem; color:#aaa; margin-bottom:1rem; line-height:1.5;">Ajuste os sliders abaixo para configurar a estação de trabalho dentro das faixas ergonômicas corretas. O ícone ✅ confirma cada ajuste correto.</p>

      <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.2rem;">
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
            <span>${statusOf("chairHeight")} 🪑 Altura da cadeira</span>
            <strong style="font-family:monospace;">${settings.chairHeight} cm</strong>
          </div>
          <input type="range" id="ergo-chair" min="30" max="75" step="1" value="${settings.chairHeight}" style="width:100%; cursor:pointer;" />
          <div style="font-size:0.68rem; color:#666; margin-top:2px;">Faixa correta: 45–55 cm (coxas paralelas ao chão)</div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
            <span>${statusOf("monitorHeight")} 🖥️ Altura do monitor</span>
            <strong style="font-family:monospace;">${settings.monitorHeight}%</strong>
          </div>
          <input type="range" id="ergo-monH" min="20" max="100" step="1" value="${settings.monitorHeight}" style="width:100%; cursor:pointer;" />
          <div style="font-size:0.68rem; color:#666; margin-top:2px;">Faixa correta: 55–65% (topo na linha dos olhos)</div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
            <span>${statusOf("monitorDistance")} 📏 Distância do monitor</span>
            <strong style="font-family:monospace;">${settings.monitorDistance} cm</strong>
          </div>
          <input type="range" id="ergo-monD" min="20" max="120" step="1" value="${settings.monitorDistance}" style="width:100%; cursor:pointer;" />
          <div style="font-size:0.68rem; color:#666; margin-top:2px;">Faixa correta: 50–70 cm (comprimento do braço)</div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
            <span>${statusOf("monitorAngle")} 📐 Inclinação do monitor</span>
            <strong style="font-family:monospace;">${settings.monitorAngle}°</strong>
          </div>
          <input type="range" id="ergo-monA" min="0" max="30" step="1" value="${settings.monitorAngle}" style="width:100%; cursor:pointer;" />
          <div style="font-size:0.68rem; color:#666; margin-top:2px;">Faixa correta: 10–20° (inclinação leve para trás)</div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
            <span>${statusOf("armAngle")} 💪 Ângulo dos cotovelos</span>
            <strong style="font-family:monospace;">${settings.armAngle}°</strong>
          </div>
          <input type="range" id="ergo-arm" min="60" max="130" step="1" value="${settings.armAngle}" style="width:100%; cursor:pointer;" />
          <div style="font-size:0.68rem; color:#666; margin-top:2px;">Faixa correta: 85–95° (cotovelo quase em ângulo reto)</div>
        </div>
      </div>

      <button class="btn btn-primary" id="btn-validate-ergo" style="width:100%; padding:0.75rem;">✅ Validar Configuração Ergonômica</button>
      <div id="ergo-feedback" style="margin-top:10px; display:none; padding:0.8rem; border-radius:8px; font-size:0.82rem; line-height:1.5;"></div>
    `;

    // Bind sliders
    const bindSlider = (id, key) => {
      mainDiv.querySelector(`#${id}`).addEventListener("input", (e) => {
        settings[key] = parseInt(e.target.value, 10);
        drawUI();
      });
    };
    bindSlider("ergo-chair", "chairHeight");
    bindSlider("ergo-monH", "monitorHeight");
    bindSlider("ergo-monD", "monitorDistance");
    bindSlider("ergo-monA", "monitorAngle");
    bindSlider("ergo-arm", "armAngle");

    mainDiv.querySelector("#btn-validate-ergo").addEventListener("click", () => {
      const feedback = mainDiv.querySelector("#ergo-feedback");
      feedback.style.display = "block";
      attempts--;

      if (isOk()) {
        validated = true;
        addXP(150);
        feedback.style.background = "rgba(16,185,129,0.12)";
        feedback.style.border = "1px solid rgba(16,185,129,0.3)";
        feedback.style.color = "#10b981";
        feedback.innerHTML = `✅ <strong>Estação Perfeita!</strong> Todos os parâmetros estão dentro das faixas ergonômicas corretas. O funcionário terá uma jornada saudável!`;
        mainDiv.querySelector("#btn-validate-ergo").textContent = "Avançar Lição ➔";
        mainDiv.querySelector("#btn-validate-ergo").addEventListener("click", () => {
          const nextBtn = document.getElementById("next-slide-btn");
          if (nextBtn) nextBtn.click();
        }, { once: true });
      } else {
        const erros = [];
        if (settings.chairHeight < 45 || settings.chairHeight > 55) erros.push("Altura da cadeira fora do ideal (45–55cm).");
        if (settings.monitorHeight < 55 || settings.monitorHeight > 65) erros.push("Monitor não está na altura dos olhos (55–65%).");
        if (settings.monitorDistance < 50 || settings.monitorDistance > 70) erros.push("Distância do monitor incorreta (50–70cm).");
        if (settings.monitorAngle < 10 || settings.monitorAngle > 20) erros.push("Inclinação do monitor fora do ideal (10–20°).");
        if (settings.armAngle < 85 || settings.armAngle > 95) erros.push("Cotovelos precisam estar em 90° (85–95°).");

        if (attempts <= 0) {
          setTimeout(drawUI, 100);
          return;
        }
        feedback.style.background = "rgba(239,68,68,0.12)";
        feedback.style.border = "1px solid rgba(239,68,68,0.3)";
        feedback.style.color = "#ef4444";
        feedback.innerHTML = `❌ <strong>Ajustes necessários (${attempts} tentativas restantes):</strong><br>• ${erros.join("<br>• ")}`;
      }
    });
  };

  drawUI();
}

// 5. Atividade Reflexiva da Aula 6
async function initAula6Reflexao(container, isReset = false) {
  container.innerHTML = "";
  const slideId = "aula6-conclusao";
  const saved = state.notes[slideId] || "";

  container.innerHTML = `
    <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:16px;">
      <h4 style="margin:0 0 8px;">✍️ Atividade Reflexiva da Aula 6</h4>
      <p class="text-small text-muted" style="line-height:1.4; margin-bottom:12px;"><strong>Desafio Prático:</strong> Descreva detalhadamente como você configuraria a estação de trabalho do seu computador pessoal considerando ergonomia, proteção elétrica e um plano de manutenção preventiva mensal. Inclua os equipamentos que compraria e os procedimentos que adotaria regularmente.</p>
      <textarea id="aula6-reflexao-textarea-local" style="width:100%; min-height:130px; background:var(--bg-base); border:1px solid var(--border-soft); border-radius:10px; padding:12px; color:var(--text-primary); font-size:0.9rem; resize:vertical; line-height:1.6;" placeholder="Escreva sua resposta completa e detalhada..."></textarea>
      <button class="btn btn-primary mt-1" id="aula6-save-btn-local" style="width:100%;">💾 Salvar Minhas Notas Técnicas</button>
      <div id="aula6-save-feedback-local" class="text-small mt-1" style="font-weight:bold;"></div>
    </div>
  `;

  const btn = document.getElementById("aula6-save-btn-local");
  const textarea = document.getElementById("aula6-reflexao-textarea-local");
  const feedback = document.getElementById("aula6-save-feedback-local");

  if (textarea) textarea.value = saved;

  btn.addEventListener("click", async () => {
    const val = textarea.value.trim();
    if (val.length < 40) {
      feedback.style.color = "#ef4444";
      feedback.textContent = "❌ Reflexão muito curta! Escreva pelo menos 40 caracteres.";
      return;
    }
    btn.disabled = true;
    feedback.style.color = "#fbbf24";
    feedback.textContent = "⌛ Salvando anotações...";
    try {
      state.notes[slideId] = val;

      if (!state.completedLessons) state.completedLessons = {};
      state.completedLessons["aula-6"] = true;

      // Define a habilidade no state
      if (!state.module1Skills) {
        state.module1Skills = {
          hardware: false, peripherals: false, windows: false,
          files: false, maintenance: false, support: false
        };
      }
      state.module1Skills.maintenance = true;

      addXP(500);
      unlockAchievement("assistente_tecnico");
      markSlideAsCompleted(slideId);

      saveState();
      updateModuleProgressBar();
      initSidebarMenu();

      feedback.style.color = "#10b981";
      feedback.textContent = "✅ Sucesso! Notas salvas e Aula 6 concluída com a medalha Assistente Técnico!";
      showToastNotification("🥈 Assistente Técnico!", "Medalha conquistada — Aula 6 concluída!");

      // Sincroniza DOM
      const domTextarea = document.getElementById("aula6-reflexao-textarea");
      const domFeedback = document.getElementById("aula6-save-feedback");
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

// ==========================================================================
// WINDOWS LAB SIMULATOR — AULA 7 (LABORATÓRIO CONTÍNUO)
// ==========================================================================
function initAula7WindowsLab(container, isReset = false) {
  if (isReset) container.innerHTML = "";

  const TICKETS = [
    { id: 1, icon: "📦", title: "Instalar PDF Reader", dept: "Financeiro", desc: "O setor financeiro precisa do leitor de PDF para acessar relatórios.", theoryTitle: "📘 Instalação de Programas", theory: [
      "Um instalador copia arquivos para o computador, cria atalhos e registra componentes no sistema.",
      "Extensões comuns: <strong>.exe</strong> (executável), <strong>.msi</strong> (instalador Windows), <strong>.zip</strong> (compactado).",
      "Sempre baixe de fontes oficiais. Evite sites piratas — eles podem conter malwares.",
      "Escolha a <strong>instalação personalizada</strong> para desmarcar bloatware (programas extras indesejados).",
      "Após instalar, verifique se o programa aparece no Menu Iniciar."
    ], check: () => S.installDone },
    { id: 2, icon: "🗑️", title: "Desinstalar Antivírus obsoleto", dept: "TI", desc: "O programa 'Antivirus Legacy' está desatualizado e precisa ser removido corretamente.", theoryTitle: "🗑️ Desinstalação Segura", theory: [
      "NUNCA apague a pasta do programa manualmente — isso deixa residuais no registro do Windows.",
      "Sempre use <strong>Painel de Controle > Programas e Recursos</strong> ou <strong>Configurações > Aplicativos</strong>.",
      "Após desinstalar, reinicie o computador para limpeza completa.",
      "Ferramentas avançadas como <strong>Revo Uninstaller</strong> varrem o registro atrás de chaves residuais."
    ], check: () => S.programsUninstalled["antivirus"] },
    { id: 3, icon: "💾", title: "Liberar espaço em disco", dept: "Suporte", desc: "Disco C: com 96% ocupado. Identifique e remova arquivos grandes e desnecessários.", theoryTitle: "💾 Limpeza de Disco", theory: [
      "Mantenha sempre pelo menos <strong>15% do disco livre</strong> para o sistema funcionar bem.",
      "Use a <strong>Limpeza de Disco</strong> do Windows para remover temporários, cache e atualizações antigas.",
      "A pasta <strong>Downloads</strong> acumula instaladores e arquivos baixados que nunca mais foram usados.",
      "Esvazie a <strong>Lixeira</strong> após excluir arquivos — eles continuam ocupando espaço até lá."
    ], check: () => S.cleanupDone },
    { id: 4, icon: "⚡", title: "Computador lento — investigar", dept: "Cliente", desc: "CPU em 100% e RAM em 94%. Descubra o que está consumindo os recursos.", theoryTitle: "⚙️ Gerenciador de Tarefas", theory: [
      "O <strong>Gerenciador de Tarefas</strong> (Ctrl+Shift+Esc) mostra processos em execução e consumo de recursos.",
      "Na aba <strong>Processos</strong>, você vê CPU, memória, disco e rede por programa.",
      "Na aba <strong>Desempenho</strong>, você monitora o uso geral do sistema em tempo real.",
      "Desconfie de processos com nome suspeito ou consumo anormalmente alto de CPU."
    ], check: () => S.endedProcesses[6666] },
    { id: 5, icon: "🩺", title: "Diagnóstico técnico", dept: "Qualidade", desc: "Responda ao quiz de diagnóstico para validar seus conhecimentos.", theoryTitle: "🩺 Raciocínio de Diagnóstico", theory: [
      "1. <strong>Ouça o cliente</strong> — pergunte o que acontecia antes do problema.",
      "2. <strong>Reproduza</strong> — tente fazer o erro acontecer na sua frente.",
      "3. <strong>Teste o simples primeiro</strong> — 80% dos problemas se resolvem com reiniciar, verificar cabos ou atualizar drivers.",
      "4. <strong>Isole o componente</strong> — teste com outro mouse, outra porta, outro monitor."
    ], check: () => S.tickets[5] },
  ];

  const QUIZ = [
    { q: "Qual extensão normalmente representa um programa executável no Windows?", opts: [".jpg", ".mp4", ".exe", ".pdf"], correct: 2, explain: "Arquivos .exe (executáveis) são programas do Windows. Sempre verifique a extensão antes de abrir." },
    { q: "Qual ferramenta do Windows permite desinstalar programas corretamente?", opts: ["Bloco de Notas", "Gerenciador de Tarefas", "Programas e Recursos", "Windows Explorer"], correct: 2, explain: "Programas e Recursos no Painel de Controle é o local correto para desinstalar programas de forma segura." },
    { q: "O que significa CPU em 100% no Gerenciador de Tarefas?", opts: ["O computador está desligando", "Um processo está usando toda a capacidade do processador", "A memória RAM está cheia", "O disco está cheio"], correct: 1, explain: "CPU em 100% indica que um ou mais processos estão usando toda a capacidade do processador, causando lentidão." },
    { q: "Qual o primeiro passo ao diagnosticar 'PC sem som'?", opts: ["Comprar caixas de som novas", "Verificar se o volume está mutado e os cabos conectados", "Formatar o Windows", "Trocar a placa de som"], correct: 1, explain: "Sempre comece pelo mais simples: volume mutado ou cabo solto são as causas mais comuns." },
  ];

  const S = {
    openWindows: {},
    activeWindow: null,
    zIndex: 50,
    startOpen: false,
    selectedIcon: null,
    contextTarget: null,
    explorerPath: "Este Computador",
    explorerFolder: null,
    clockInterval: null,
    explorerHistory: ["Este Computador"],
    explorerHistoryIdx: 0,
    toastTimer: null,
    programsUninstalled: {},
    cleanupChecked: {},
    cleanupDone: false,
    installDone: false,
    processes: [
      { name: "System", cpu: "2%", mem: "0.5 MB", pid: 4, critical: true },
      { name: "svchost.exe", cpu: "1%", mem: "8.2 MB", pid: 512, critical: true },
      { name: "explorer.exe", cpu: "3%", mem: "22 MB", pid: 1204, critical: true },
      { name: "winlogon.exe", cpu: "0%", mem: "3.1 MB", pid: 624, critical: true },
      { name: "CryptoMiner.exe", cpu: "87%", mem: "412 MB", pid: 6666, critical: false },
      { name: "chrome.exe (8)", cpu: "12%", mem: "345 MB", pid: 4012, critical: false },
      { name: "Spotify.exe", cpu: "6%", mem: "94 MB", pid: 2156, critical: false },
      { name: "Discord.exe", cpu: "4%", mem: "78 MB", pid: 1884, critical: false },
      { name: "WINWORD.EXE", cpu: "2%", mem: "45 MB", pid: 2988, critical: false },
    ],
    endedProcesses: {},
    tickets: { 1: false, 2: false, 3: false, 4: false, 5: false },
    activeTicketId: null,
    ticketNotifTimer: null,
    sendingTicket: 0,
    quizLives: 3,
    quizIdx: 0,
    quizCorrect: 0,
    quizAnswered: false,
    trainingWinOpen: false,
    completeShown: false,
  };

  const FOLDERS = {
    "Este Computador": { name: "Este Computador", icon: "💻", items: [
      { name: "Disco Local (C:)", icon: "💾", type: "drive", path: "C:" },
    ]},
    "C:": { name: "Disco Local (C:)", icon: "💾", items: [
      { name: "Arquivos de Programas", icon: "📁", type: "folder", path: "C:\\Program Files" },
      { name: "Windows", icon: "📁", type: "folder", path: "C:\\Windows" },
      { name: "Usuários", icon: "📁", type: "folder", path: "C:\\Users" },
    ]},
    "C:\\Users": { name: "Usuários", icon: "📁", items: [
      { name: "Aluno", icon: "👤", type: "folder", path: "C:\\Users\\Aluno" },
    ]},
    "C:\\Users\\Aluno": { name: "Aluno", icon: "👤", items: [
      { name: "Downloads", icon: "📥", type: "folder", path: "C:\\Users\\Aluno\\Downloads" },
      { name: "Documentos", icon: "📄", type: "folder", path: "C:\\Users\\Aluno\\Documents" },
      { name: "Imagens", icon: "🖼️", type: "folder", path: "C:\\Users\\Aluno\\Pictures" },
    ]},
    "C:\\Users\\Aluno\\Downloads": { name: "Downloads", icon: "📥", items: [
      { name: "PDFReader_Setup.exe", icon: "📦", type: "file", size: "28 MB" },
      { name: "Filme.mp4", icon: "🎬", type: "file", size: "12 GB" },
      { name: "Backup.zip", icon: "🗜️", type: "file", size: "8 GB" },
      { name: "FotosDuplicadas.zip", icon: "🖼️", type: "file", size: "4 GB" },
      { name: "InstaladorAntigo.exe", icon: "📦", type: "file", size: "2 GB" },
      { name: "relatorio_final.pdf", icon: "📕", type: "file", size: "1.8 MB" },
      { name: "musica_favorita.mp3", icon: "🎵", type: "file", size: "8.4 MB" },
    ]},
    "C:\\Users\\Aluno\\Documents": { name: "Documentos", icon: "📄", items: [
      { name: "Trabalho_Faculdade.docx", icon: "📝", type: "file", size: "2.1 MB" },
      { name: "Planilha_Orcamento.xlsx", icon: "📊", type: "file", size: "1.4 MB" },
    ]},
    "C:\\Users\\Aluno\\Pictures": { name: "Imagens", icon: "🖼️", items: [
      { name: "Ferias_2025.jpg", icon: "🖼️", type: "file", size: "4.2 MB" },
    ]},
  };

  const PROGRAMS_LIST = [
    { id: "antivirus", name: "Antivirus Legacy v6.2", icon: "🛡️", size: "86 MB" },
    { id: "office", name: "Microsoft 365", icon: "📘", size: "2.4 GB" },
    { id: "chrome", name: "Google Chrome", icon: "🌐", size: "285 MB" },
    { id: "spotify", name: "Spotify", icon: "🎵", size: "210 MB" },
    { id: "discord", name: "Discord", icon: "💬", size: "195 MB" },
    { id: "vscode", name: "VS Code", icon: "📝", size: "178 MB" },
    { id: "winrar", name: "WinRAR", icon: "🗜️", size: "4.8 MB" },
    { id: "zoom", name: "Zoom", icon: "📹", size: "124 MB" },
  ];

  const CLEANUP_ITEMS = [
    { id: "temp", label: "Arquivos Temporários", desc: "Criados pelo sistema", size: "1.2 GB" },
    { id: "recycle", label: "Lixeira", desc: "Arquivos excluídos", size: "8.4 GB" },
    { id: "downloads", label: "Pastas de Downloads", desc: "Downloads não utilizados", size: "890 MB" },
    { id: "cache", label: "Cache do Navegador", desc: "Temporários da web", size: "420 MB" },
    { id: "oldwindows", label: "Instalação Anterior", desc: "Backup antigo", size: "12 GB" },
    { id: "updates", label: "Otimização de Entrega", desc: "Atualizações instaladas", size: "680 MB" },
  ];

  // ==================== HELPERS ====================
  function updateClock() {
    const el = container.querySelector(".winlab-clock");
    if (!el) return;
    el.textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  function focusWindow(id) {
    if (S.activeWindow && S.activeWindow !== id) {
      const p = container.querySelector(`.winlab-window[data-win-id="${S.activeWindow}"]`);
      if (p) p.classList.remove("active-win");
    }
    S.activeWindow = id;
    const w = container.querySelector(`.winlab-window[data-win-id="${id}"]`);
    if (w) { w.classList.add("active-win"); w.style.zIndex = ++S.zIndex; }
  }

  function closeWindow(id) {
    const w = container.querySelector(`.winlab-window[data-win-id="${id}"]`);
    if (!w) return;
    w.classList.remove("open"); delete S.openWindows[id];
    if (S.activeWindow === id) S.activeWindow = null; updateTaskbar();
  }

  function openWindow(id) {
    const w = container.querySelector(`.winlab-window[data-win-id="${id}"]`);
    if (!w) return;
    if (w.classList.contains("open")) { focusWindow(id); return; }
    w.classList.add("open"); S.openWindows[id] = true; focusWindow(id); updateTaskbar();
    if (id === "explorer") renderExplorer();
    if (id === "taskmgr") renderTaskManager();
    if (id === "programs") renderPrograms();
    if (id === "cleanup") renderDiskCleanup();
    if (id === "training") renderTraining();
  }

  function updateTaskbar() {
    const bar = container.querySelector(".winlab-taskbar-items");
    if (!bar) return;
    const L = { explorer: "📁 Explorador", taskmgr: "⚙️ Gerenciador", system: "🖥️ Sistema", programs: "📦 Programas", cleanup: "🧹 Limpeza", training: "📘 Treinamento" };
    const doneCount = Object.values(S.tickets).filter(Boolean).length;
    bar.innerHTML = Object.keys(S.openWindows).map(id =>
      `<button class="winlab-taskbar-item ${S.activeWindow === id ? 'active' : ''}" data-win-task="${id}">${L[id] || id}</button>`
    ).join("");
    bar.innerHTML += `<span class="winlab-ticket-counter" id="winlab-ticket-info">📋 ${doneCount}/${TICKETS.length}</span>`;
    bar.querySelectorAll("[data-win-task]").forEach(btn => {
      btn.addEventListener("click", () => {
        const w = btn.dataset.winTask;
        if (S.activeWindow === w) { closeWindow(w); return; }
        openWindow(w); focusWindow(w);
      });
    });
    bar.querySelector("#winlab-ticket-info")?.addEventListener("click", () => showTicketList());
  }

  function deselectIcons() {
    container.querySelectorAll(".winlab-icon.selected").forEach(el => el.classList.remove("selected"));
    S.selectedIcon = null; closeContextMenu();
  }

  function showContextMenu(x, y, items) {
    closeContextMenu();
    const menu = container.querySelector(".winlab-context-menu");
    if (!menu) return;
    menu.innerHTML = items.map((item, idx) =>
      item.divider ? '<div class="winlab-context-divider"></div>' : `<div class="winlab-context-item" data-context-idx="${idx}">${item.icon||''} ${item.label}</div>`
    ).join("");
    menu.style.left = Math.min(x, container.offsetWidth - 160) + "px";
    menu.style.top = Math.min(y, container.offsetHeight - 100) + "px";
    menu.classList.add("open");
    menu.querySelectorAll("[data-context-idx]").forEach(el => {
      el.addEventListener("click", () => { const it = items[parseInt(el.dataset.contextIdx)]; if(it&&it.action)it.action(); closeContextMenu(); });
    });
  }

  function closeContextMenu() { const m = container.querySelector(".winlab-context-menu"); if(m)m.classList.remove("open"); }

  function showToast(title, desc) {
    const t = container.querySelector(".winlab-toast");
    if (!t) return;
    if (S.toastTimer) clearTimeout(S.toastTimer);
    t.querySelector(".winlab-toast-title").textContent = title;
    t.querySelector(".winlab-toast-desc").textContent = desc;
    t.classList.add("show");
    S.toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
  }

  // ==================== BOOT ====================
  function showBoot() {
    const boot = document.createElement("div");
    boot.className = "winlab-boot";
    boot.innerHTML = `
      <div class="winlab-boot-content">
        <div class="winlab-boot-logo">🖥️</div>
        <div class="winlab-boot-title">Windows Lab — InforMestre</div>
        <div class="winlab-boot-subtitle">Plataforma de Treinamento Técnico</div>
        <div class="winlab-boot-status">Inicializando estação de trabalho...</div>
        <div class="winlab-boot-bar"><div class="winlab-boot-fill"></div></div>
        <div class="winlab-boot-userinfo" id="boot-userinfo">
          <div class="winlab-boot-userinfo-row"><span class="winlab-boot-userinfo-label">Usuário</span><span class="winlab-boot-userinfo-value">João Silva</span></div>
          <div class="winlab-boot-userinfo-row"><span class="winlab-boot-userinfo-label">Cargo</span><span class="winlab-boot-userinfo-value">Técnico de Suporte</span></div>
          <div class="winlab-boot-userinfo-row"><span class="winlab-boot-userinfo-label">Departamento</span><span class="winlab-boot-userinfo-value">TI</span></div>
        </div>
        <div class="winlab-boot-welcome" id="boot-welcome">✅ Bem-vindo ao laboratório. Chamados pendentes: 5.</div>
      </div>`;
    container.appendChild(boot);

    setTimeout(() => {
      boot.querySelector(".winlab-boot-fill").style.width = "40%";
      boot.querySelector(".winlab-boot-status").textContent = "Carregando módulos do sistema...";
    }, 400);
    setTimeout(() => {
      boot.querySelector(".winlab-boot-fill").style.width = "75%";
      boot.querySelector(".winlab-boot-status").textContent = "Preparando ambiente de trabalho...";
    }, 900);
    setTimeout(() => {
      boot.querySelector(".winlab-boot-fill").style.width = "100%";
      boot.querySelector(".winlab-boot-status").textContent = "Autenticando...";
    }, 1500);
    setTimeout(() => {
      boot.querySelector("#boot-userinfo").classList.add("show");
    }, 2000);
    setTimeout(() => {
      boot.querySelector("#boot-welcome").classList.add("show");
    }, 2800);
    setTimeout(() => {
      boot.remove();
      buildDesktop();
      afterDesktop();
    }, 3600);
  }

  // ==================== DESKTOP ====================
  function buildDesktop() {
    container.innerHTML = `
    <div class="winlab" id="winlab-desktop">
      <div class="winlab-icons" id="winlab-icons">
        <div class="winlab-icon" data-icon="computer"><div class="winlab-icon-img">💻</div><div class="winlab-icon-label">Este Computador</div></div>
        <div class="winlab-icon" data-icon="downloads"><div class="winlab-icon-img">📥</div><div class="winlab-icon-label">Downloads</div></div>
        <div class="winlab-icon" data-icon="recycle"><div class="winlab-icon-img">🗑️</div><div class="winlab-icon-label">Lixeira</div></div>
        <div class="winlab-icon" data-icon="system"><div class="winlab-icon-img">⚙️</div><div class="winlab-icon-label">Sistema</div></div>
        <div class="winlab-icon" data-icon="programs"><div class="winlab-icon-img">📦</div><div class="winlab-icon-label">Programas</div></div>
        <div class="winlab-icon" data-icon="tickets"><div class="winlab-icon-img">📋</div><div class="winlab-icon-label">Chamados</div></div>
      </div>
      <div class="winlab-context-menu"></div>
      <div class="winlab-quiz-overlay" id="winlab-quiz-overlay"><div class="winlab-quiz-modal" id="winlab-quiz-modal"></div></div>
      <div class="winlab-complete-overlay" id="winlab-complete-overlay"><div class="winlab-complete-modal" id="winlab-complete-modal"></div></div>
      <div class="winlab-installer-overlay" id="winlab-installer-overlay">
        <div class="winlab-installer-window" id="winlab-installer-window"></div>
      </div>
      <div class="winlab-toast"><div class="winlab-toast-title"></div><div class="winlab-toast-desc"></div></div>
      <div class="winlab-ticket-notif" id="winlab-ticket-notif"></div>

      <div class="winlab-window" data-win-id="explorer" style="width:420px;height:300px;top:30px;left:30px;">
        <div class="winlab-win-header">
          <div class="winlab-win-title">📁 Explorador de Arquivos</div>
          <div class="winlab-win-controls"><button class="winlab-win-btn winlab-win-min" data-win-min="explorer"></button><button class="winlab-win-btn winlab-win-max" data-win-close="explorer"></button><button class="winlab-win-btn winlab-win-close" data-win-close="explorer"></button></div>
        </div>
        <div class="winlab-win-body"></div>
      </div>
      <div class="winlab-window" data-win-id="taskmgr" style="width:400px;height:320px;top:80px;left:80px;">
        <div class="winlab-win-header">
          <div class="winlab-win-title">⚙️ Gerenciador de Tarefas</div>
          <div class="winlab-win-controls"><button class="winlab-win-btn winlab-win-min" data-win-min="taskmgr"></button><button class="winlab-win-btn winlab-win-max" data-win-close="taskmgr"></button><button class="winlab-win-btn winlab-win-close" data-win-close="taskmgr"></button></div>
        </div>
        <div class="winlab-win-body"></div>
      </div>
      <div class="winlab-window" data-win-id="system" style="width:360px;height:260px;top:130px;left:130px;">
        <div class="winlab-win-header">
          <div class="winlab-win-title">🖥️ Sistema</div>
          <div class="winlab-win-controls"><button class="winlab-win-btn winlab-win-min" data-win-min="system"></button><button class="winlab-win-btn winlab-win-max" data-win-close="system"></button><button class="winlab-win-btn winlab-win-close" data-win-close="system"></button></div>
        </div>
        <div class="winlab-win-body"><div class="winlab-sysprop-grid">
          <div class="winlab-sysprop-label">Edição</div><div class="winlab-sysprop-value">Windows 11 Pro</div>
          <div class="winlab-sysprop-label">Versão</div><div class="winlab-sysprop-value">23H2</div>
          <div class="winlab-sysprop-label">Processador</div><div class="winlab-sysprop-value">Intel Core i5-13400F, 2.50 GHz</div>
          <div class="winlab-sysprop-label">RAM</div><div class="winlab-sysprop-value">16,0 GB</div>
          <div class="winlab-sysprop-label">Tipo</div><div class="winlab-sysprop-value">64 bits</div>
          <div class="winlab-sysprop-label">Dispositivo</div><div class="winlab-sysprop-value">DESKTOP-INFOMESTRE</div>
          <div class="winlab-sysprop-label">Armazenamento</div><div class="winlab-sysprop-value">SSD 512 GB</div>
        </div></div>
      </div>
      <div class="winlab-window" data-win-id="programs" style="width:380px;height:340px;top:180px;left:80px;">
        <div class="winlab-win-header">
          <div class="winlab-win-title">📦 Programas e Recursos</div>
          <div class="winlab-win-controls"><button class="winlab-win-btn winlab-win-min" data-win-min="programs"></button><button class="winlab-win-btn winlab-win-max" data-win-close="programs"></button><button class="winlab-win-btn winlab-win-close" data-win-close="programs"></button></div>
        </div>
        <div class="winlab-win-body"></div>
      </div>
      <div class="winlab-window" data-win-id="cleanup" style="width:400px;height:360px;top:50px;left:200px;">
        <div class="winlab-win-header">
          <div class="winlab-win-title">🧹 Limpeza de Disco</div>
          <div class="winlab-win-controls"><button class="winlab-win-btn winlab-win-min" data-win-min="cleanup"></button><button class="winlab-win-btn winlab-win-max" data-win-close="cleanup"></button><button class="winlab-win-btn winlab-win-close" data-win-close="cleanup"></button></div>
        </div>
        <div class="winlab-win-body"></div>
      </div>
      <div class="winlab-window" data-win-id="training" style="width:440px;height:380px;top:60px;left:60px;">
        <div class="winlab-win-header">
          <div class="winlab-win-title" id="training-title">📘 Central de Treinamento</div>
          <div class="winlab-win-controls"><button class="winlab-win-btn winlab-win-min" data-win-min="training"></button><button class="winlab-win-btn winlab-win-close" data-win-close="training"></button></div>
        </div>
        <div class="winlab-win-body" id="training-body"></div>
      </div>

      <div class="winlab-start-menu" id="winlab-start-menu">
        <div class="winlab-start-header">🪟 Iniciar</div>
        <div class="winlab-start-item" data-start-app="explorer"><span class="winlab-start-item-icon">📁</span><span class="winlab-start-item-label">Explorador de Arquivos</span></div>
        <div class="winlab-start-item" data-start-app="taskmgr"><span class="winlab-start-item-icon">⚙️</span><span class="winlab-start-item-label">Gerenciador de Tarefas</span></div>
        <div class="winlab-start-item" data-start-app="system"><span class="winlab-start-item-icon">🖥️</span><span class="winlab-start-item-label">Sistema</span></div>
        <div class="winlab-start-item" data-start-app="programs"><span class="winlab-start-item-icon">📦</span><span class="winlab-start-item-label">Programas</span></div>
        <div class="winlab-start-item" data-start-app="cleanup"><span class="winlab-start-item-icon">🧹</span><span class="winlab-start-item-label">Limpeza de Disco</span></div>
        <div class="winlab-start-divider"></div>
        <div class="winlab-start-item" data-start-app="tickets"><span class="winlab-start-item-icon">📋</span><span class="winlab-start-item-label">Central de Chamados</span></div>
        <div class="winlab-start-item" data-start-app="notepad"><span class="winlab-start-item-icon">📄</span><span class="winlab-start-item-label">Bloco de Notas</span></div>
        <div class="winlab-start-item" data-start-app="calc"><span class="winlab-start-item-icon">🧮</span><span class="winlab-start-item-label">Calculadora</span></div>
      </div>

      <div class="winlab-taskbar">
        <button class="winlab-start-btn" id="winlab-start-btn"><span style="font-size:16px;">🪟</span> Iniciar</button>
        <div class="winlab-taskbar-divider"></div>
        <div class="winlab-taskbar-items" style="display:flex;gap:2px;flex:1;"></div>
        <div class="winlab-tray"><span>🔊</span><span>🔌</span><button class="winlab-expand-btn" id="winlab-expand-btn" title="Expandir simulador">⛶</button><span class="winlab-clock">--:--</span></div>
      </div>
      <button class="winlab-exit-expand" id="winlab-exit-expand">✕ Fechar tela expandida</button>
      </div>
    </div>`;

    // Event Binding
    updateClock(); S.clockInterval = setInterval(updateClock, 10000);

    container.querySelectorAll(".winlab-icon").forEach(icon => {
      icon.addEventListener("click", (e) => { e.stopPropagation(); deselectIcons(); icon.classList.add("selected"); S.selectedIcon = icon.dataset.icon; });
      icon.addEventListener("dblclick", () => {
        switch (icon.dataset.icon) {
          case "computer": navigateTo("Este Computador"); openWindow("explorer"); break;
          case "downloads": navigateTo("C:\\Users\\Aluno\\Downloads"); openWindow("explorer"); break;
          case "system": openWindow("system"); break;
          case "programs": openWindow("programs"); break;
          case "tickets": showTicketList(); break;
          case "recycle": showToast("🗑️ Lixeira", "Contém arquivos. Use Limpeza de Disco."); break;
        }
      });
      icon.addEventListener("contextmenu", (e) => { e.preventDefault(); const r=container.getBoundingClientRect(); const m={computer:[{label:"Abrir",icon:"▶️",action:()=>{navigateTo("Este Computador");openWindow("explorer");}},{label:"Propriedades",icon:"ℹ️",action:()=>openWindow("system")}],downloads:[{label:"Abrir",icon:"▶️",action:()=>{navigateTo("C:\\Users\\Aluno\\Downloads");openWindow("explorer");}}]}; showContextMenu(e.clientX-r.left, e.clientY-r.top, m[icon.dataset.icon]||[{label:"Abrir",icon:"▶️",action:()=>{}}]); });
    });
    container.querySelector("#winlab-icons").addEventListener("click", (e) => { if(e.target===e.currentTarget) deselectIcons(); });

    const startBtn = container.querySelector("#winlab-start-btn");
    const startMenuEl = container.querySelector("#winlab-start-menu");
    startBtn.addEventListener("click", (e) => { e.stopPropagation(); S.startOpen=!S.startOpen; startMenuEl.classList.toggle("open",S.startOpen); });
    container.addEventListener("click", (e) => { if(S.startOpen&&!e.target.closest("#winlab-start-menu")&&!e.target.closest("#winlab-start-btn")){S.startOpen=false;startMenuEl.classList.remove("open");} closeContextMenu(); });
    container.querySelectorAll("[data-start-app]").forEach(item => {
      item.addEventListener("click", () => {
        S.startOpen=false;startMenuEl.classList.remove("open");
        switch(item.dataset.startApp){
          case "explorer": openWindow("explorer"); break;
          case "taskmgr": openWindow("taskmgr"); break;
          case "system": openWindow("system"); break;
          case "programs": openWindow("programs"); break;
          case "cleanup": openWindow("cleanup"); break;
          case "tickets": showTicketList(); break;
          case "notepad": showToast("📄 Bloco de Notas", "Use para anotações."); break;
          case "calc": showToast("🧮 Calculadora", "Abrindo..."); break;
        }
      });
    });
    container.querySelectorAll("[data-win-close]").forEach(btn => btn.addEventListener("click",()=>closeWindow(btn.dataset.winClose)));
    container.querySelectorAll("[data-win-min]").forEach(btn => { btn.addEventListener("click",()=>{const w=container.querySelector(`.winlab-window[data-win-id="${btn.dataset.winMin}"]`); if(w){w.classList.remove("open");delete S.openWindows[btn.dataset.winMin];updateTaskbar();}}); });

    container.querySelectorAll(".winlab-window").forEach(win => win.addEventListener("mousedown",()=>focusWindow(win.dataset.winId)));
    container.addEventListener("click", (e) => { const eb=e.target.closest("[data-tm-end]"); if(eb){const p=S.processes.find(x=>x.pid===parseInt(eb.dataset.tmEnd)); if(p){S.endedProcesses[p.pid]=true;showToast("Finalizado",`${p.name} encerrado.`);renderTaskManager();checkTickets();}} });
    container.querySelector("#winlab-icons").addEventListener("contextmenu", (e) => { e.preventDefault();const r=container.getBoundingClientRect();showContextMenu(e.clientX-r.left,e.clientY-r.top,[{label:"Novo ▶ Pasta",icon:"📁",action:()=>showToast("Pasta","Criada.")},{label:"Novo ▶ Documento",icon:"📄",action:()=>showToast("Documento","Criado.")}]); });
    container.setAttribute("tabindex","0");

    // Expand fullscreen toggle
    const winlabEl = container.querySelector("#winlab-desktop");
    const expandBtn = container.querySelector("#winlab-expand-btn");
    const exitBtn = container.querySelector("#winlab-exit-expand");
    if (expandBtn) expandBtn.addEventListener("click", () => {
      if (winlabEl) { winlabEl.classList.add("winlab-expanded"); if (exitBtn) exitBtn.style.display = "block"; }
    });
    if (exitBtn) exitBtn.addEventListener("click", () => {
      if (winlabEl) { winlabEl.classList.remove("winlab-expanded"); exitBtn.style.display = "none"; }
    });
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape" && winlabEl?.classList.contains("winlab-expanded")) {
        winlabEl.classList.remove("winlab-expanded");
        if (exitBtn) exitBtn.style.display = "none";
      }
    });
  }

  // ==================== BASTIDORES DO COMPUTADOR ====================
  function showBastidoresChapter() {
    const overlay = container.querySelector("#winlab-complete-overlay");
    const modal = container.querySelector("#winlab-complete-modal");
    if (!overlay || !modal) return;
    let slide = 0;
    let exerciseAnswered = {};

    function render() {
      overlay.classList.add("active");
      if (slide === 0) {
        modal.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:1.8rem;margin-bottom:4px;">📦</div>
            <div class="winlab-complete-title" style="font-size:1rem;">O que acontece quando você instala um programa?</div>
            <div style="font-size:0.78rem;color:rgba(255,255,255,0.6);line-height:1.6;margin:8px 0;text-align:left;">
              <p style="margin:4px 0;">Nos bastidores, a instalação segue um processo organizado:</p>
              <ul style="padding-left:16px;">
                <li><strong>Criação de pastas</strong> — o instalador cria uma pasta dentro de <em>C:\\Program Files</em> com o nome do programa.</li>
                <li><strong>Cópia de arquivos</strong> — centenas de arquivos (executáveis, bibliotecas DLL, configurações) são copiados para essa pasta.</li>
                <li><strong>Registro no sistema</strong> — o programa se registra no <em>Registry</em> do Windows, informando onde está e como deve ser executado.</li>
                <li><strong>Criação de atalhos</strong> — um atalho aparece no Menu Iniciar e, opcionalmente, na Área de Trabalho.</li>
                <li><strong>Inicialização automática</strong> — alguns programas se configuram para iniciar com o Windows (atenção: isso deixa o computador mais lento).</li>
              </ul>
            </div>
            <div style="display:flex;justify-content:center;align-items:center;gap:4px;font-size:0.75rem;color:rgba(255,255,255,0.4);flex-wrap:wrap;margin-bottom:8px;">
              <span style="background:rgba(99,102,241,0.1);padding:2px 6px;border-radius:4px;">📥 Download</span> <span style="color:#6366f1;">→</span>
              <span style="background:rgba(99,102,241,0.1);padding:2px 6px;border-radius:4px;">⚙️ Instalação</span> <span style="color:#6366f1;">→</span>
              <span style="background:rgba(99,102,241,0.1);padding:2px 6px;border-radius:4px;">📂 Arquivos copiados</span> <span style="color:#6366f1;">→</span>
              <span style="background:rgba(99,102,241,0.1);padding:2px 6px;border-radius:4px;">🖥️ Atalho criado</span> <span style="color:#6366f1;">→</span>
              <span style="background:rgba(99,102,241,0.1);padding:2px 6px;border-radius:4px;">🚀 Funcionando</span>
            </div>
            <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15);border-radius:6px;padding:8px;margin-bottom:8px;font-size:0.74rem;color:rgba(255,255,255,0.6);">
              💡 <strong>Curiosidade:</strong> Muitos programas continuam executando processos em segundo plano mesmo quando parecem estar fechados. É por isso que o Gerenciador de Tarefas às vezes mostra programas que você nem abriu.
            </div>
            <button class="winlab-complete-btn" id="bastidores-next-btn">Próximo →</button>
          </div>`;
      } else if (slide === 1) {
        const opts = ["📁 Área de Trabalho", "📥 Downloads", "📄 Documentos", "🗑️ Lixeira"];
        const correct = 1;
        const ans = exerciseAnswered[1];
        modal.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:1.8rem;margin-bottom:4px;">📂</div>
            <div class="winlab-complete-title" style="font-size:0.95rem;">Como o Windows encontra seus arquivos?</div>
            <div style="text-align:left;font-size:0.78rem;color:rgba(255,255,255,0.6);line-height:1.6;margin:6px 0 8px;">
              O Windows organiza seus arquivos em pastas-padrão dentro do disco C:.
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px;">
              <div style="background:rgba(99,102,241,0.06);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:6px 8px;font-size:0.74rem;text-align:left;">📁 <strong>Área de Trabalho</strong><br><span style="color:rgba(255,255,255,0.3);">C:\\Users\\Aluno\\Desktop</span></div>
              <div style="background:rgba(99,102,241,0.06);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:6px 8px;font-size:0.74rem;text-align:left;">📥 <strong>Downloads</strong><br><span style="color:rgba(255,255,255,0.3);">C:\\Users\\Aluno\\Downloads</span></div>
              <div style="background:rgba(99,102,241,0.06);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:6px 8px;font-size:0.74rem;text-align:left;">📄 <strong>Documentos</strong><br><span style="color:rgba(255,255,255,0.3);">C:\\Users\\Aluno\\Documents</span></div>
              <div style="background:rgba(99,102,241,0.06);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:6px 8px;font-size:0.74rem;text-align:left;">🖼️ <strong>Imagens</strong><br><span style="color:rgba(255,255,255,0.3);">C:\\Users\\Aluno\\Pictures</span></div>
            </div>
            <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.12);border-radius:6px;padding:8px;margin-bottom:8px;text-align:left;font-size:0.78rem;">
              <strong style="color:#fbbf24;">🧪 Exercício rápido:</strong>
              <p style="color:rgba(255,255,255,0.7);margin:4px 0 6px;">O funcionário perdeu o arquivo <strong>vendas_julho.xlsx</strong>. Onde você procuraria primeiro?</p>
              ${opts.map((o,i)=>`<div class="bastidores-exercise-opt ${ans===i?'selected':''}" data-ex-opt="${i}" style="padding:6px 10px;margin:3px 0;border-radius:5px;border:1px solid ${ans===i?'#818cf8':'rgba(255,255,255,0.08)'};background:${ans===i?'rgba(99,102,241,0.12)':'rgba(255,255,255,0.03)'};cursor:pointer;font-size:0.78rem;color:${ans===i?'#818cf8':'rgba(255,255,255,0.7)'};">${o}</div>`).join("")}
              ${ans !== undefined ? `<div style="margin-top:6px;padding:8px;border-radius:6px;background:${ans===correct?'rgba(16,185,129,0.1)':'rgba(239,68,68,0.1)'};border:1px solid ${ans===correct?'rgba(16,185,129,0.2)':'rgba(239,68,68,0.2)'};font-size:0.74rem;color:${ans===correct?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.7)'};text-align:left;">${ans===correct?'✅ Correto!':'❌ Não é por aí.'} ${ans===correct?'Arquivos baixados recentemente ficam em Downloads. Se ele baixou o arquivo por e-mail ou sistema, provavelmente está lá.':'Pense: se o arquivo foi baixado recentemente, a pasta Downloads é o local mais provável.'}</div>` : ''}
            </div>
            ${ans === undefined ? `<button class="winlab-complete-btn" id="bastidores-opt-btn" style="background:#6366f1;" disabled>Confirme uma opção primeiro</button>` : `<button class="winlab-complete-btn" id="bastidores-next-btn">${slide < 6 ? 'Próximo →' : '📜 Ver resumo da aula'}</button>`}
          </div>`;
        if (ans === undefined) {
          modal.querySelectorAll("[data-ex-opt]").forEach(el => el.addEventListener("click", () => {
            const val = parseInt(el.dataset.exOpt);
            exerciseAnswered[1] = val;
            render();
          }));
        }
      } else if (slide === 2) {
        modal.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:1.8rem;margin-bottom:4px;">🐌</div>
            <div class="winlab-complete-title" style="font-size:0.95rem;">O que deixa um computador lento?</div>
            <div style="text-align:left;font-size:0.78rem;color:rgba(255,255,255,0.6);line-height:1.6;margin:6px 0 8px;">
              A lentidão raramente tem uma causa única. Geralmente é uma combinação de fatores. Veja os mais comuns:
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:8px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.12);border-radius:6px;padding:7px 10px;text-align:left;font-size:0.76rem;">
                <span style="font-size:1.1rem;">🧠</span>
                <div><strong style="color:#ef4444;">Pouca RAM</strong><br><span style="color:rgba(255,255,255,0.45);">O sistema fica "pensando" ao alternar entre janelas. Solução: feche programas não usados ou aumente a memória.</span></div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.12);border-radius:6px;padding:7px 10px;text-align:left;font-size:0.76rem;">
                <span style="font-size:1.1rem;">💾</span>
                <div><strong style="color:#fbbf24;">Disco cheio</strong><br><span style="color:rgba(255,255,255,0.45);">Menos de 15% de espaço livre trava o sistema. Solução: limpeza de disco e desinstalar programas.</span></div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);border-radius:6px;padding:7px 10px;text-align:left;font-size:0.76rem;">
                <span style="font-size:1.1rem;">🔄</span>
                <div><strong style="color:#818cf8;">Muitos programas abertos</strong><br><span style="color:rgba(255,255,255,0.45);">Cada aba do Chrome consome RAM. Solução: feche o que não estiver usando.</span></div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.12);border-radius:6px;padding:7px 10px;text-align:left;font-size:0.76rem;">
                <span style="font-size:1.1rem;">🚀</span>
                <div><strong style="color:#10b981;">Programas iniciando automaticamente</strong><br><span style="color:rgba(255,255,255,0.45);">Muitos programas se ativam na inicialização. Solução: desative no Gerenciador de Tarefas > Inicializar.</span></div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.12);border-radius:6px;padding:7px 10px;text-align:left;font-size:0.76rem;">
                <span style="font-size:1.1rem;">🦠</span>
                <div><strong style="color:#8b5cf6;">Malware</strong><br><span style="color:rgba(255,255,255,0.45);">Vírus e miners consomem CPU sem você perceber. Solução: antivírus + Gerenciador de Tarefas.</span></div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(244,114,182,0.06);border:1px solid rgba(244,114,182,0.12);border-radius:6px;padding:7px 10px;text-align:left;font-size:0.76rem;">
                <span style="font-size:1.1rem;">🌡️</span>
                <div><strong style="color:#f472b6;">Superaquecimento</strong><br><span style="color:rgba(255,255,255,0.45);">Poeira bloqueia ventoinhas. O computador reduz performance para não queimar. Solução: limpeza física.</span></div>
              </div>
            </div>
            <button class="winlab-complete-btn" id="bastidores-next-btn">Próximo →</button>
          </div>`;
      } else if (slide === 3) {
        modal.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:1.8rem;margin-bottom:4px;">🔍</div>
            <div class="winlab-complete-title" style="font-size:0.95rem;">Como pensa um técnico? — Método dos 5 Passos</div>
            <div style="text-align:left;font-size:0.78rem;color:rgba(255,255,255,0.6);line-height:1.5;margin:6px 0;">
              Um bom técnico não chuta soluções. Ele segue um <strong>método lógico</strong>:
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:8px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.1);border-radius:6px;padding:6px 10px;text-align:left;font-size:0.76rem;">
                <span style="background:#6366f1;color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;flex-shrink:0;">1</span>
                <span><strong>Observar</strong> — qual é o sintoma? O usuário diz o quê?</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.1);border-radius:6px;padding:6px 10px;text-align:left;font-size:0.76rem;">
                <span style="background:#6366f1;color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;flex-shrink:0;">2</span>
                <span><strong>Perguntar</strong> — o que acontecia antes? Quando começou?</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.1);border-radius:6px;padding:6px 10px;text-align:left;font-size:0.76rem;">
                <span style="background:#6366f1;color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;flex-shrink:0;">3</span>
                <span><strong>Testar hipóteses</strong> — será que é o cabo? O Wi-Fi? O site?</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.1);border-radius:6px;padding:6px 10px;text-align:left;font-size:0.76rem;">
                <span style="background:#6366f1;color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;flex-shrink:0;">4</span>
                <span><strong>Corrigir</strong> — aplicou a solução. Funcionou?</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.1);border-radius:6px;padding:6px 10px;text-align:left;font-size:0.76rem;">
                <span style="background:#6366f1;color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;flex-shrink:0;">5</span>
                <span><strong>Validar</strong> — o problema voltou? O usuário confirmou?</span>
              </div>
            </div>
            <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.12);border-radius:6px;padding:8px;margin-bottom:8px;text-align:left;font-size:0.76rem;">
              <strong style="color:#10b981;">🧪 Exemplo real — "Sem internet"</strong>
              <p style="color:rgba(255,255,255,0.55);margin:4px 0 0;">
                1. Observar: o navegador diz "sem conexão"<br>
                2. Perguntar: outros dispositivos funcionam? O roteador está ligado?<br>
                3. Testar: ping no Google, verificar cabo, reiniciar roteador<br>
                4. Corrigir: religar o roteador ou trocar o cabo<br>
                5. Validar: a internet voltou? O usuário está satisfeito?
              </p>
            </div>
            <button class="winlab-complete-btn" id="bastidores-next-btn">Próximo →</button>
          </div>`;
      } else if (slide === 4) {
        const situations = [
          { text: "Recebeu um e-mail com anexo 'fatura.exe' de remetente desconhecido", risk: true, reason: "Arquivos .exe em e-mails são a forma mais comum de espalhar malwares. Nunca abra." },
          { text: "Alguém da TI pediu sua senha por telefone para fazer uma atualização", risk: true, reason: "Nenhum profissional de TI pede sua senha. Isso é golpe de engenharia social." },
          { text: "O Windows pediu para instalar atualizações de segurança", risk: false, reason: "Atualizações de segurança são essenciais. Sempre instale quando solicitado." },
          { text: "Um colega pediu para você copiar um programa que ele instalou no pendrive", risk: true, reason: "Programas copiados podem vir com malwares. Sempre instale da fonte oficial." },
          { text: "Você configurou o backup automático dos arquivos para um HD externo", risk: false, reason: "Backup regular é a prática mais importante para não perder dados." },
        ];
        const s = exerciseAnswered[4] || 0;
        const cur = situations[s];
        const ans = exerciseAnswered[`4_${s}`];
        modal.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:1.8rem;margin-bottom:4px;">🔒</div>
            <div class="winlab-complete-title" style="font-size:0.95rem;">Segurança digital — Identifique os riscos</div>
            <div style="font-size:0.78rem;color:rgba(255,255,255,0.6);margin:4px 0 8px;">Analise a situação e diga se é um <strong style="color:#ef4444;">risco</strong> ou <strong style="color:#10b981;">seguro</strong>.</div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px;margin-bottom:8px;text-align:left;font-size:0.8rem;color:rgba(255,255,255,0.8);">
              "${cur.text}"
            </div>
            <div style="display:flex;gap:6px;margin-bottom:6px;">
              <button class="bastidores-risk-btn" id="bastidores-risk-yes" style="flex:1;padding:8px;border-radius:6px;border:1px solid ${ans===true?'rgba(239,68,68,0.4)':'rgba(255,255,255,0.1)'};background:${ans===true?'rgba(239,68,68,0.12)':'rgba(255,255,255,0.03)'};color:${ans===true?'#ef4444':'rgba(255,255,255,0.5)'};cursor:pointer;font-size:0.8rem;font-family:inherit;">🚨 É um risco</button>
              <button class="bastidores-risk-btn" id="bastidores-risk-no" style="flex:1;padding:8px;border-radius:6px;border:1px solid ${ans===false?'rgba(16,185,129,0.4)':'rgba(255,255,255,0.1)'};background:${ans===false?'rgba(16,185,129,0.12)':'rgba(255,255,255,0.03)'};color:${ans===false?'#10b981':'rgba(255,255,255,0.5)'};cursor:pointer;font-size:0.8rem;font-family:inherit;">✅ É seguro</button>
            </div>
            ${ans !== undefined ? `<div style="margin-bottom:6px;padding:8px;border-radius:6px;background:${ans===cur.risk?'rgba(16,185,129,0.1)':'rgba(239,68,68,0.1)'};border:1px solid ${ans===cur.risk?'rgba(16,185,129,0.2)':'rgba(239,68,68,0.2)'};font-size:0.74rem;text-align:left;"><strong>${ans===cur.risk?'✅ Correto!':'❌ Na verdade é um risco'}</strong><br>${cur.reason}</div>` : ''}
            ${ans !== undefined ? `<button class="winlab-complete-btn" id="bastidores-next-btn">${s < situations.length - 1 ? 'Próxima situação →' : 'Próximo →'}</button>` : `<button class="winlab-complete-btn" id="bastidores-next-btn" style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.3);" disabled>Responda primeiro</button>`}
          </div>`;
        // Dynamic binding for risk buttons
        const yesBtn = modal.querySelector("#bastidores-risk-yes");
        const noBtn = modal.querySelector("#bastidores-risk-no");
        if (yesBtn && ans === undefined) yesBtn.addEventListener("click", () => { exerciseAnswered[`4_${s}`] = true; render(); });
        if (noBtn && ans === undefined) noBtn.addEventListener("click", () => { exerciseAnswered[`4_${s}`] = false; render(); });
        // Bind next to advance situation
        const nextBtn = modal.querySelector("#bastidores-next-btn");
        if (nextBtn && ans !== undefined) {
          if (s < situations.length - 1) {
            nextBtn.addEventListener("click", () => { exerciseAnswered[4] = s + 1; render(); });
          } else {
            nextBtn.addEventListener("click", () => { slide = 5; render(); });
          }
        }
        return;
      } else if (slide === 5) {
        modal.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:1.8rem;margin-bottom:4px;">💼</div>
            <div class="winlab-complete-title" style="font-size:0.95rem;">Profissões da área de tecnologia</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:8px 0;">
              <div style="background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);border-radius:6px;padding:7px;text-align:left;font-size:0.72rem;">
                <span style="font-size:1rem;">👨‍💻</span> <strong style="color:#818cf8;">Técnico de Suporte</strong><br>
                <span style="color:rgba(255,255,255,0.45);">Atende chamados, instala software, diagnostica problemas.</span>
              </div>
              <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.12);border-radius:6px;padding:7px;text-align:left;font-size:0.72rem;">
                <span style="font-size:1rem;">🖥️</span> <strong style="color:#10b981;">Analista de TI</strong><br>
                <span style="color:rgba(255,255,255,0.45);">Gerencia servidores, redes e infraestrutura da empresa.</span>
              </div>
              <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.12);border-radius:6px;padding:7px;text-align:left;font-size:0.72rem;">
                <span style="font-size:1rem;">🌐</span> <strong style="color:#fbbf24;">Admin. de Redes</strong><br>
                <span style="color:rgba(255,255,255,0.45);">Configura roteadores, firewalls e mantém a rede funcionando.</span>
              </div>
              <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.12);border-radius:6px;padding:7px;text-align:left;font-size:0.72rem;">
                <span style="font-size:1rem;">⚙️</span> <strong style="color:#ef4444;">Téc. Automação</strong><br>
                <span style="color:rgba(255,255,255,0.45);">Trabalha com sensores, CLPs e sistemas industriais.</span>
              </div>
              <div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.12);border-radius:6px;padding:7px;text-align:left;font-size:0.72rem;grid-column:1/-1;">
                <span style="font-size:1rem;">🔒</span> <strong style="color:#8b5cf6;">Esp. Segurança Digital</strong><br>
                <span style="color:rgba(255,255,255,0.45);">Protege empresas contra ataques cibernéticos, gerencia firewalls e responde a incidentes.</span>
              </div>
            </div>
            <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.12);border-radius:6px;padding:8px;margin-bottom:8px;font-size:0.74rem;color:rgba(255,255,255,0.6);">
              💡 <em>"Todo profissional da tecnologia começou aprendendo exatamente os fundamentos estudados neste módulo."</em>
            </div>
            <button class="winlab-complete-btn" id="bastidores-next-btn">Próximo →</button>
          </div>`;
      } else if (slide === 6) {
        modal.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:6px;">🔒</div>
            <div class="winlab-complete-title" style="font-size:1rem;">Preparação para a Missão Final</div>
            <div style="font-size:0.82rem;color:rgba(255,255,255,0.7);line-height:1.5;margin:6px 0 10px;">
              Na <strong>Aula 8</strong>, você enfrentará o desafio final do Módulo 1.<br>
              Precisará utilizar <strong>todos</strong> os conhecimentos adquiridos desde a Aula 1.
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:10px;">
              <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:6px;font-size:0.7rem;color:#10b981;">✅ Hardware</div>
              <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:6px;font-size:0.7rem;color:#10b981;">✅ Periféricos</div>
              <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:6px;font-size:0.7rem;color:#10b981;">✅ Windows</div>
              <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:6px;font-size:0.7rem;color:#10b981;">✅ Arquivos</div>
              <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:6px;font-size:0.7rem;color:#10b981;">✅ Manutenção</div>
              <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:6px;font-size:0.7rem;color:#10b981;">✅ Suporte</div>
            </div>
            <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;margin-bottom:8px;">
              <div style="font-size:0.75rem;color:rgba(255,255,255,0.5);margin-bottom:4px;">Progresso do Módulo 1</div>
              <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;">
                <div style="height:100%;width:87%;background:linear-gradient(90deg,#6366f1,#10b981);border-radius:3px;"></div>
              </div>
              <div style="font-size:0.7rem;color:rgba(255,255,255,0.35);margin-top:4px;">7 de 8 aulas concluídas — falta apenas a certificação!</div>
            </div>
            <p style="font-size:0.85rem;color:rgba(255,255,255,0.8);margin:0 0 10px;font-weight:700;">Você está pronto para provar que domina os fundamentos da informática?</p>
            <button class="winlab-complete-btn" id="bastidores-next-btn" style="background:linear-gradient(90deg,#6366f1,#10b981);">📜 Ver resumo da aula</button>
          </div>`;
      }

      // Navigation
      const nextBtn = modal.querySelector("#bastidores-next-btn");
      if (nextBtn) nextBtn.addEventListener("click", () => {
        if (slide < 6) { slide++; render(); }
        else {
          overlay.classList.remove("active");
          if (typeof window.goToSlide === "function" && typeof window.currentPage === "number") {
            window.goToSlide(window.currentPage + 1);
          }
        }
      });
    }
    slide = 0;
    exerciseAnswered = {};
    render();
  }

  // ==================== EXPLORER RENDERERS ====================
  function renderExplorer() {
    const body = container.querySelector(".winlab-window[data-win-id='explorer'] .winlab-win-body");
    if (!body) return;
    const folder = FOLDERS[S.explorerPath];
    const items = folder ? folder.items : [];
    body.innerHTML = `
      <div class="winlab-explorer-breadcrumb">${S.explorerPath.split("\\").map((p,i,a)=>`<span class="winlab-bread-part" data-bread-idx="${i}">${p}</span>${i<a.length-1?'<span class="sep">›</span>':''}`).join("")}</div>
      <div class="winlab-explorer-nav">
        <button class="winlab-nav-back" ${S.explorerHistoryIdx<=0?'disabled style="opacity:0.4"':''}>⬅ Voltar</button>
        <button class="winlab-nav-forward" ${S.explorerHistoryIdx>=S.explorerHistory.length-1?'disabled style="opacity:0.4"':''}>➡ Avançar</button>
        <button class="winlab-nav-up" ${S.explorerPath==="Este Computador"?'disabled style="opacity:0.4"':''}>⬆ Acima</button>
        <button class="winlab-nav-refresh">🔄</button>
      </div>
      <div class="winlab-file-grid">${items.length===0?'<div style="grid-column:1/-1;color:rgba(255,255,255,0.4);padding:20px;text-align:center;">Pasta vazia</div>':items.map((item,idx)=>`<div class="winlab-file-item" data-file-idx="${idx}" data-file-path="${item.path||''}" data-file-type="${item.type}"><div class="winlab-file-icon">${item.icon}</div><div class="winlab-file-name">${item.name}</div></div>`).join("")}</div>`;
    body.querySelectorAll(".winlab-bread-part").forEach(el=>{el.addEventListener("click",()=>{const p=S.explorerPath.split("\\");navigateTo(p.slice(0,parseInt(el.dataset.breadIdx)+1).join("\\"));});});
    body.querySelector(".winlab-nav-back")?.addEventListener("click",()=>{if(S.explorerHistoryIdx>0){S.explorerHistoryIdx--;S.explorerPath=S.explorerHistory[S.explorerHistoryIdx];renderExplorer();}});
    body.querySelector(".winlab-nav-forward")?.addEventListener("click",()=>{if(S.explorerHistoryIdx<S.explorerHistory.length-1){S.explorerHistoryIdx++;S.explorerPath=S.explorerHistory[S.explorerHistoryIdx];renderExplorer();}});
    body.querySelector(".winlab-nav-up")?.addEventListener("click",()=>{const p=S.explorerPath.split("\\");if(p.length>1){p.pop();navigateTo(p.join("\\"));}else if(S.explorerPath!=="Este Computador")navigateTo("Este Computador");});
    body.querySelector(".winlab-nav-refresh")?.addEventListener("click",()=>renderExplorer());
    body.querySelectorAll(".winlab-file-item").forEach(el=>{
      el.addEventListener("dblclick",()=>{const t=el.dataset.fileType,p=el.dataset.filePath,fname=el.querySelector(".winlab-file-name")?.textContent||"";if(t==="folder"||t==="drive")navigateTo(p);else{if(S.explorerPath==="C:\\Users\\Aluno\\Downloads"&&fname==="PDFReader_Setup.exe")showInstallWizard();else showToast("Abrindo",fname);}});
      el.addEventListener("click",()=>{body.querySelectorAll(".winlab-file-item.selected").forEach(s=>s.classList.remove("selected"));el.classList.add("selected");});
      el.addEventListener("contextmenu",(e)=>{e.preventDefault();const r=container.getBoundingClientRect();showContextMenu(e.clientX-r.left,e.clientY-r.top,[{label:"Abrir",icon:"▶️",action:()=>el.dispatchEvent(new Event("dblclick"))},{label:"Excluir",icon:"🗑️",action:()=>{el.remove();showToast("Excluído","Enviado à Lixeira");}},{divider:true},{label:"Propriedades",icon:"ℹ️",action:()=>showToast("Propriedades",el.querySelector(".winlab-file-name")?.textContent||"")}]);});
    });
  }

  function navigateTo(path) {
    if (FOLDERS[path]) {
      if (S.explorerHistoryIdx < S.explorerHistory.length - 1) S.explorerHistory = S.explorerHistory.slice(0, S.explorerHistoryIdx + 1);
      S.explorerPath = path; S.explorerHistory.push(path); S.explorerHistoryIdx = S.explorerHistory.length - 1;
      renderExplorer();
    } else showToast("Acesso negado", path);
  }

  function renderTaskManager() {
    const body = container.querySelector(".winlab-window[data-win-id='taskmgr'] .winlab-win-body");
    if (!body) return;
    const t = body.dataset.tmTab || "processes";
    body.innerHTML = `<div class="winlab-tm-tabs"><button class="winlab-tm-tab ${t==='processes'?'active':''}" data-tm-tab="processes">Processos</button><button class="winlab-tm-tab ${t==='performance'?'active':''}" data-tm-tab="performance">Desempenho</button></div><div>${t==='processes'?renderTMProcesses():renderTMPerformance()}</div>`;
    body.querySelectorAll(".winlab-tm-tab").forEach(b=>{b.addEventListener("click",()=>{body.dataset.tmTab=b.dataset.tmTab;renderTaskManager();});});
  }
  function renderTMProcesses() {
    return `<table class="winlab-tm-table"><thead><tr><th>Nome</th><th>CPU</th><th>Memória</th><th>PID</th><th></th></tr></thead><tbody>${S.processes.filter(p=>!S.endedProcesses[p.pid]).map(p=>`<tr><td>${p.name}</td><td>${p.cpu}</td><td>${p.mem}</td><td>${p.pid}</td><td>${p.critical?'<span style="color:rgba(255,255,255,0.3);font-size:10px;">—</span>':`<button class="winlab-tm-end-btn" data-tm-end="${p.pid}">Finalizar</button>`}</td></tr>`).join("")}</tbody></table>`;
  }
  function renderTMPerformance() {
    const cpu = S.endedProcesses[6666] ? 23 : 97, mem = S.endedProcesses[6666] ? 47 : 94, dsk = Math.floor(Math.random()*10)+5;
    return `<div class="winlab-tm-performance">${[{l:"CPU",v:cpu,c:"#6366f1"},{l:"Memória",v:mem,c:"#10b981"},{l:"Disco (C:)",v:dsk,c:"#f59e0b"},{l:"Rede",v:0,c:"#8b5cf6"}].map(g=>`<div class="winlab-tm-gauge"><div class="winlab-tm-gauge-label">${g.l}</div><div class="winlab-tm-gauge-value">${g.v}%</div><div class="winlab-tm-bar"><div class="winlab-tm-bar-fill" style="width:${g.v}%;background:${g.c};"></div></div></div>`).join("")}</div>`;
  }

  function renderPrograms() {
    const body = container.querySelector(".winlab-window[data-win-id='programs'] .winlab-win-body");
    if (!body) return;
    const done = Object.keys(S.programsUninstalled).length;
    body.innerHTML = `<p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 8px;">Programas instalados:</p><div style="max-height:250px;overflow-y:auto;">${PROGRAMS_LIST.map(p=>`<div class="winlab-prog-item"><div class="winlab-prog-name">${p.icon} ${p.name}</div><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:10px;color:rgba(255,255,255,0.3);">${p.size}</span><button class="winlab-prog-uninstall ${S.programsUninstalled[p.id]?'done':''}" data-prog-id="${p.id}">${S.programsUninstalled[p.id]?'✓ Desinstalado':'Desinstalar'}</button></div></div>`).join("")}</div>`;
    body.querySelectorAll(".winlab-prog-uninstall:not(.done)").forEach(btn=>{btn.addEventListener("click",()=>{S.programsUninstalled[btn.dataset.progId]=true;showToast("Desinstalação concluída","Programa removido.");renderPrograms();checkTickets();});});
  }

  function renderDiskCleanup() {
    const body = container.querySelector(".winlab-window[data-win-id='cleanup'] .winlab-win-body");
    if (!body) return;
    const total = CLEANUP_ITEMS.reduce((a,item)=>{const n=parseFloat(item.size.replace(/[^\d.]/g,''));return a+(S.cleanupChecked[item.id]!==false?n*(item.size.includes("GB")?1024:1):0);},0);
    const fmt = total>=1024?(total/1024).toFixed(1)+" GB":total.toFixed(0)+" MB";
    body.innerHTML = `<p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 8px;">Selecione para limpar:</p>${CLEANUP_ITEMS.map(item=>`<div class="winlab-cleanup-item"><input type="checkbox" ${S.cleanupChecked[item.id]!==false?'checked':''} data-cleanup-id="${item.id}"><div class="winlab-cleanup-info"><div>${item.label}</div><div style="font-size:10px;color:rgba(255,255,255,0.4);">${item.desc}</div></div><div class="winlab-cleanup-size">${item.size}</div></div>`).join("")}
    <div class="winlab-cleanup-total">💾 Total: <strong>${fmt}</strong></div><button class="btn btn-primary" id="winlab-cleanup-run" style="width:100%;margin-top:8px;font-size:12px;padding:8px;">🧹 Executar Limpeza</button><div id="winlab-cleanup-result" style="margin-top:6px;text-align:center;font-size:11px;font-weight:700;"></div>`;
    body.querySelectorAll("[data-cleanup-id]").forEach(cb=>{cb.addEventListener("change",()=>{S.cleanupChecked[cb.dataset.cleanupId]=cb.checked;renderDiskCleanup();});});
    body.querySelector("#winlab-cleanup-run")?.addEventListener("click",()=>{if(S.cleanupDone){showToast("Já limpo","Recarregue.");return;}const checked=CLEANUP_ITEMS.filter(item=>S.cleanupChecked[item.id]!==false);if(checked.length===0){showToast("Nada selecionado","Marque ao menos um item.");return;}S.cleanupDone=true;const t=checked.reduce((a,item)=>{const n=parseFloat(item.size.replace(/[^\d.]/g,''));return a+(item.size.includes("GB")?n*1024:n);},0);const f=t>=1024?(t/1024).toFixed(1)+" GB":t.toFixed(0)+" MB";const r=container.querySelector("#winlab-cleanup-result");if(r){r.style.color="#10b981";r.textContent=`✅ ${f} liberados!`;}showToast("🧹 Limpeza concluída!",`${f} liberados.`);checkTickets();});
  }

  // ==================== TRAINING WINDOW ====================
  function renderTraining() {
    const ticket = TICKETS.find(t => t.id === S.activeTicketId);
    if (!ticket) return;
    const body = container.querySelector(".winlab-window[data-win-id='training'] .winlab-win-body");
    if (!body) return;
    const isDone = S.tickets[ticket.id];
    const titleEl = container.querySelector("#training-title");
    if (titleEl) titleEl.textContent = `📘 ${ticket.theoryTitle}`;
    body.innerHTML = `
      ${ticket.theory.map((p,i)=>`<div class="winlab-training-page ${i===0?'active':''}" data-tpage="${i}"><div class="winlab-training-title">${ticket.theoryTitle}</div><div class="winlab-training-body"><p>${p}</p></div></div>`).join("")}
      <div class="winlab-training-nav">
        <div><button class="winlab-training-btn winlab-training-btn-prev" id="training-prev" style="display:none;">⬅ Anterior</button></div>
        <span class="winlab-training-counter" id="training-counter">1 / ${ticket.theory.length}</span>
        <div>
          <button class="winlab-training-btn winlab-training-btn-next" id="training-next">Próximo ➡</button>
          <button class="winlab-training-btn winlab-training-btn-practice" id="training-practice" style="display:none;">${isDone ? '✅ Concluído' : '▶️ Praticar'}</button>
        </div>
      </div>`;
    let page = 0;
    function showPage(i) {
      body.querySelectorAll(".winlab-training-page").forEach(el=>el.classList.toggle("active",parseInt(el.dataset.tpage)===i));
      body.querySelector("#training-prev").style.display = i > 0 ? "inline-block" : "none";
      body.querySelector("#training-next").style.display = i < ticket.theory.length - 1 ? "inline-block" : "none";
      body.querySelector("#training-practice").style.display = i === ticket.theory.length - 1 ? "inline-block" : "none";
      body.querySelector("#training-counter").textContent = `${i+1} / ${ticket.theory.length}`;
      page = i;
    }
    body.querySelector("#training-next")?.addEventListener("click",()=>{if(page<ticket.theory.length-1)showPage(page+1);});
    body.querySelector("#training-prev")?.addEventListener("click",()=>{if(page>0)showPage(page-1);});
    body.querySelector("#training-practice")?.addEventListener("click",()=>{
      if (isDone) return;
      S.trainingWinOpen = false;
      closeWindow("training");
      startPractice(ticket.id);
    });
  }

  function startPractice(ticketId) {
    const ticket = TICKETS.find(t => t.id === ticketId);
    if (!ticket) return;
    closeWindow("training");
    const steps = [
      { id: 1, win: "explorer", toastTitle: "📂 Sua vez!", toastDesc: "Abra o Explorador de Arquivos (📁) na barra de tarefas e navegue até a pasta Downloads.", nav: "C:\\Users\\Aluno\\Downloads" },
      { id: 2, win: "programs", toastTitle: "🗑️ Sua vez!", toastDesc: "Abra Programas (📦) na barra de tarefas ou na área de trabalho para desinstalar o Antivirus Legacy." },
      { id: 3, win: "cleanup", toastTitle: "💾 Sua vez!", toastDesc: "Abra a Limpeza de Disco (🧹) pelo Menu Iniciar para liberar espaço." },
      { id: 4, win: "taskmgr", toastTitle: "⚡ Sua vez!", toastDesc: "Abra o Gerenciador de Tarefas (⚙️) na barra de tarefas para encontrar o processo suspeito." },
    ];
    const step = steps.find(s => s.id === ticketId);
    if (!step) { if (ticketId === 5) showQuiz(); return; }
    if (step.nav) navigateTo(step.nav);
    S.openWindows[step.win] = true;
    updateTaskbar();
    showToast(step.toastTitle, step.toastDesc);
  }

  // ==================== QUIZ ====================
  function showQuiz() {
    const overlay = container.querySelector("#winlab-quiz-overlay");
    const modal = container.querySelector("#winlab-quiz-modal");
    if (!overlay || !modal) return;
    S.quizIdx = 0; S.quizCorrect = 0; S.quizLives = 3; S.quizAnswered = false;
    overlay.classList.add("active");
    renderQuiz();
  }

  function renderQuiz() {
    const overlay = container.querySelector("#winlab-quiz-overlay");
    const modal = container.querySelector("#winlab-quiz-modal");
    if (!modal) return;
    if (S.quizIdx >= QUIZ.length) { finishQuiz(); return; }
    if (S.quizLives <= 0) { modal.innerHTML = `<div class="winlab-quiz-header">❌ Quiz encerrado</div><p style="font-size:0.85rem;color:rgba(255,255,255,0.6);">Você perdeu todas as vidas. Tente novamente!</p><div class="winlab-quiz-footer"><button class="winlab-quiz-btn winlab-quiz-btn-next" onclick="document.querySelector('#winlab-quiz-overlay').classList.remove('active')">Fechar</button></div>`; return; }
    const q = QUIZ[S.quizIdx];
    modal.innerHTML = `
      <div class="winlab-quiz-header">📝 Verificação de Conhecimento</div>
      <div class="winlab-quiz-lives">${'❤️'.repeat(S.quizLives)}</div>
      <div class="winlab-quiz-question">${q.q}</div>
      <div id="quiz-options">${q.opts.map((o,i)=>`<div class="winlab-quiz-option" data-opt="${i}"><div class="winlab-quiz-option-radio"></div><span>${o}</span></div>`).join("")}</div>
      <div class="winlab-quiz-explanation" id="quiz-explain"></div>
      <div class="winlab-quiz-footer">
        <span class="winlab-quiz-counter">${S.quizIdx+1} / ${QUIZ.length}</span>
        <button class="winlab-quiz-btn winlab-quiz-btn-next" id="quiz-next" disabled>Confirmar</button>
      </div>`;
    let selected = null;
    modal.querySelectorAll(".winlab-quiz-option").forEach(el => {
      el.addEventListener("click", () => {
        if (S.quizAnswered) return;
        modal.querySelectorAll(".winlab-quiz-option").forEach(e => e.classList.remove("selected"));
        el.classList.add("selected"); selected = parseInt(el.dataset.opt);
        modal.querySelector("#quiz-next").disabled = false;
      });
    });
    modal.querySelector("#quiz-next").addEventListener("click", () => {
      if (selected === null || S.quizAnswered) return;
      S.quizAnswered = true;
      const q = QUIZ[S.quizIdx];
      const correct = selected === q.correct;
      if (correct) { S.quizCorrect++; } else { S.quizLives--; }
      modal.querySelectorAll(".winlab-quiz-option").forEach(el => {
        const opt = parseInt(el.dataset.opt);
        if (opt === q.correct) el.classList.add("correct");
        else if (opt === selected && !correct) el.classList.add("wrong");
      });
      const explain = modal.querySelector("#quiz-explain");
      explain.className = `winlab-quiz-explanation show ${correct ? 'correct-bg' : 'wrong-bg'}`;
      explain.textContent = (correct ? "✅ Correto! " : "❌ " ) + q.explain;
      modal.querySelector("#quiz-next").textContent = S.quizIdx < QUIZ.length - 1 && S.quizLives > 0 ? "Próxima →" : "Ver resultado";
      modal.querySelector("#quiz-next").disabled = false;
      modal.querySelector("#quiz-next").addEventListener("click", () => {
        S.quizAnswered = false; S.quizIdx++;
        if (S.quizIdx >= QUIZ.length || S.quizLives <= 0) finishQuiz();
        else renderQuiz();
      }, { once: true });
    });
  }

  function finishQuiz() {
    const modal = container.querySelector("#winlab-quiz-modal");
    if (!modal) return;
    const passed = S.quizCorrect >= 3;
    modal.innerHTML = `
      <div class="winlab-quiz-header">${passed ? '🎉' : '❌'} Resultado</div>
      <p style="font-size:0.85rem;color:rgba(255,255,255,0.85);text-align:center;margin:12px 0;">
        Você acertou <strong style="color:#10b981;">${S.quizCorrect}</strong> de <strong>${QUIZ.length}</strong> questões.
      </p>
      <div class="winlab-quiz-footer" style="justify-content:center;">
        <button class="winlab-quiz-btn winlab-quiz-btn-next" id="quiz-close">${passed ? '✅ Finalizar Chamado' : '🔄 Tentar Novamente'}</button>
      </div>`;
    modal.querySelector("#quiz-close").addEventListener("click", () => {
      container.querySelector("#winlab-quiz-overlay").classList.remove("active");
      if (passed) { S.tickets[5] = true; showToast("✅ Chamado #005 resolvido!", "Diagnóstico concluído!"); checkTickets(); }
    });
  }

  // ==================== TICKET SYSTEM ====================
  function showTicketList() {
    const done = Object.values(S.tickets).filter(Boolean).length;
    const html = TICKETS.map(t => {
      const isDone = S.tickets[t.id];
      return `<div class="winlab-prog-item" style="cursor:pointer;${isDone ? 'opacity:0.6;' : ''}" data-ticket-id="${t.id}">
        <div class="winlab-prog-name">${isDone ? '✅' : '📋'} ${t.icon} ${t.title}</div>
        <span style="font-size:10px;color:${isDone ? '#10b981' : '#6366f1'};font-weight:600;">${isDone ? 'Concluído' : 'Pendente'}</span>
      </div>`;
    }).join("");

    // Show ticket list as a modal within the training window
    const titleEl = container.querySelector("#training-title");
    if (titleEl) titleEl.textContent = "📋 Central de Chamados";
    const body = container.querySelector(".winlab-window[data-win-id='training'] .winlab-win-body");
    if (!body) return;
    body.innerHTML = `
      <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 8px;">Chamados do dia (${done}/${TICKETS.length} resolvidos):</p>
      ${html}
      ${done === TICKETS.length ? '<div style="text-align:center;margin-top:12px;padding:10px;background:rgba(16,185,129,0.1);border-radius:8px;"><strong style="color:#10b981;">🎉 Todos os chamados resolvidos!</strong></div>' : ''}
      <div style="margin-top:10px;font-size:10px;color:rgba(255,255,255,0.3);text-align:center;">Clique em um chamado para iniciar</div>`;

    body.querySelectorAll("[data-ticket-id]").forEach(el => {
      el.addEventListener("click", () => {
        const id = parseInt(el.dataset.ticketId);
        if (S.tickets[id]) { showToast("Já resolvido", "Este chamado já foi concluído."); return; }
        S.activeTicketId = id;
        openTrainingForTicket(id);
      });
    });
    openWindow("training");
  }

  function openTrainingForTicket(ticketId) {
    const ticket = TICKETS.find(t => t.id === ticketId);
    if (!ticket || S.tickets[ticketId]) return;
    S.activeTicketId = ticketId;
    S.trainingWinOpen = true;
    renderTraining();
    openWindow("training");
    showTicketNotif(ticketId);
  }

  function showTicketNotif(ticketId) {
    const ticket = TICKETS.find(t => t.id === ticketId);
    if (!ticket) return;
    const notif = container.querySelector("#winlab-ticket-notif");
    if (!notif) return;
    notif.innerHTML = `<div class="winlab-ticket-notif-header">📌 <span>CHAMADO #00${ticket.id}</span><span class="winlab-ticket-notif-badge">${ticket.dept}</span></div>
      <div class="winlab-ticket-notif-title">${ticket.icon} ${ticket.title}</div>
      <div class="winlab-ticket-notif-desc">${ticket.desc}</div>`;
    notif.classList.add("show");
    notif.onclick = () => { notif.classList.remove("show"); openWindow("training"); };
    if (S.ticketNotifTimer) clearTimeout(S.ticketNotifTimer);
    S.ticketNotifTimer = setTimeout(() => notif.classList.remove("show"), 6000);
  }

  function checkTickets() {
    let changed = false, completedId = null;
    TICKETS.forEach(t => {
      if (!S.tickets[t.id] && t.check()) { S.tickets[t.id] = true; changed = true; completedId = t.id; }
    });
    if (changed) {
      updateTaskbar();
      showToast(`✅ Chamado #00${completedId} resolvido!`, `${TICKETS.find(t=>t.id===completedId)?.title || ''} concluído.`);
      setTimeout(() => showChamadoComplete(completedId), 800);
    }
  }

  // ==================== COMPLETION ====================
  function showCompletion() {
    if (S.completeShown) return;
    S.completeShown = true;
    const modal = container.querySelector("#winlab-complete-modal");
    const overlay = container.querySelector("#winlab-complete-overlay");
    if (!modal || !overlay) return;
    overlay.classList.add("active");
    modal.innerHTML = `
      <div style="text-align:left;">
        <div style="text-align:center;font-size:3rem;margin-bottom:6px;">🎓</div>
        <div class="winlab-complete-title" style="text-align:center;font-size:1.1rem;">O que você aprendeu hoje?</div>
        <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:10px;margin:10px 0;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;font-size:0.78rem;">
            <span>✅ Resolver chamados de suporte</span>
            <span>✅ Instalar programas corretamente</span>
            <span>✅ Remover programas obsoletos</span>
            <span>✅ Diagnosticar problemas de desempenho</span>
            <span>✅ Utilizar ferramentas do Windows</span>
            <span>✅ Pensar como um técnico</span>
          </div>
        </div>
        <div style="background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);border-radius:8px;padding:10px;margin-bottom:8px;">
          <p style="font-size:0.78rem;color:rgba(255,255,255,0.65);line-height:1.6;margin:0;">
            <strong>💭 Reflita:</strong><br>
            • O que foi mais difícil para você?<br>
            • Como você resolveria esses problemas na vida real?<br>
            • O que aprendeu hoje que não sabia antes?
          </p>
        </div>
        <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.12);border-radius:8px;padding:10px;margin-bottom:12px;">
          <p style="font-size:0.78rem;color:rgba(255,255,255,0.65);line-height:1.5;margin:0;">
            <strong>🔮 Próxima missão:</strong><br>
            Na Aula 8, você enfrentará o <strong>desafio final do Módulo 1</strong> e precisará utilizar tudo o que aprendeu desde a Aula 1.<br>
            Prepare-se — será uma avaliação completa de todos os conhecimentos adquiridos!
          </p>
        </div>
        <div class="winlab-complete-stats">
          <div class="winlab-complete-stat"><div class="winlab-complete-stat-val">5</div><div class="winlab-complete-stat-label">Chamados</div></div>
          <div class="winlab-complete-stat"><div class="winlab-complete-stat-val">+500</div><div class="winlab-complete-stat-label">XP</div></div>
          <div class="winlab-complete-stat"><div class="winlab-complete-stat-val">🥇</div><div class="winlab-complete-stat-label">Medalha</div></div>
        </div>
        <div style="margin-bottom:12px;text-align:left;">
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);margin:0 0 6px;"><strong>📋 Relatório do Técnico</strong></p>
          <textarea id="winlab-report-text" style="width:100%;min-height:80px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px;color:#fff;font-size:0.78rem;resize:vertical;line-height:1.5;" placeholder="Descreva resumidamente os problemas resolvidos e o que aprendeu..."></textarea>
        </div>
        <button class="winlab-complete-btn" id="winlab-finish-btn">🏆 Finalizar e Receber Medalha</button>
        <div id="winlab-finish-feedback" style="margin-top:8px;font-size:0.82rem;font-weight:700;"></div>
      </div>`;
    modal.querySelector("#winlab-finish-btn").addEventListener("click", async () => {
      const btn = modal.querySelector("#winlab-finish-btn");
      const fb = modal.querySelector("#winlab-finish-feedback");
      btn.disabled = true; btn.textContent = "Salvando...";
      try {
        const report = modal.querySelector("#winlab-report-text")?.value?.trim() || "Relatório concluído.";
        if (!state.module1Skills) state.module1Skills = {hardware:false,peripherals:false,windows:false,files:false,maintenance:false,support:false};
        state.module1Skills.support = true;
        state.notes["aula7-lab"] = report;
        addXP(500);
        unlockAchievement("especialista_informatica");
        markSlideAsCompleted("aula7-lab");
        saveState();
        updateModuleProgressBar();
        initSidebarMenu();
        fb.style.color = "#10b981"; fb.textContent = "✅ Sucesso! Medalha Especialista em Informática conquistada!";
        showToastNotification("🥇 Especialista em Informática!", "Aula 7 concluída!");
        btn.textContent = "✅ Concluído!";
        setTimeout(() => {
          overlay.classList.remove("active");
          showBastidoresChapter();
        }, 1500);
      } catch (e) {
        fb.style.color = "#ef4444"; fb.textContent = "❌ Erro: " + e.message;
        btn.disabled = false; btn.textContent = "Tentar novamente";
      }
    });
  }

  // ==================== WELCOME MODAL ====================
  function showInstallWizard() {
    const overlay = container.querySelector("#winlab-installer-overlay");
    const win = container.querySelector("#winlab-installer-window");
    if (!overlay || !win) return;
    overlay.style.display = "flex";
    let step = 1;
    function render() {
      if (step === 1) {
        win.innerHTML = `
          <div class="installer-title-bar"><span class="installer-title-text">📦 Instalador do PDF Reader v5.2</span><span class="installer-title-btn" id="installer-close">✕</span></div>
          <div class="installer-body">
            <div class="installer-icon-area">📄</div>
            <div class="installer-content">
              <div class="installer-heading">Bem-vindo ao Instalador do PDF Reader</div>
              <p class="installer-desc">Este assistente vai instalar o <strong>PDF Reader v5.2</strong> no seu computador.</p>
              <p class="installer-desc">O PDF Reader é um programa leve para visualizar, imprimir e assinar documentos PDF.</p>
              <div class="installer-info"><strong>Editor:</strong> InforTech Software<br><strong>Versão:</strong> 5.2.0<br><strong>Tamanho:</strong> 28 MB</div>
            </div>
          </div>
          <div class="installer-footer"><button class="installer-btn installer-btn-secondary" id="installer-cancel">Cancelar</button><button class="installer-btn installer-btn-primary" id="installer-next">Avançar →</button></div>`;
      } else if (step === 2) {
        win.innerHTML = `
          <div class="installer-title-bar"><span class="installer-title-text">📦 Instalador do PDF Reader v5.2</span><span class="installer-title-btn" id="installer-close">✕</span></div>
          <div class="installer-body">
            <div class="installer-icon-area">⚙️</div>
            <div class="installer-content">
              <div class="installer-heading">Pronto para Instalar</div>
              <p class="installer-desc">O assistente está pronto para iniciar a instalação.</p>
              <div class="installer-info"><strong>Destino:</strong> C:\\Program Files\\PDF Reader<br><strong>Espaço necessário:</strong> 28 MB<br><strong>Espaço disponível:</strong> 154 GB</div>
              <p class="installer-desc" style="font-size:0.75rem;color:rgba(255,255,255,0.5);">Clique em "Instalar" para continuar ou "Voltar" para revisar as informações.</p>
            </div>
          </div>
          <div class="installer-footer"><button class="installer-btn installer-btn-secondary" id="installer-back">← Voltar</button><button class="installer-btn installer-btn-primary" id="installer-install">📦 Instalar</button></div>`;
      } else if (step === 3) {
        win.innerHTML = `
          <div class="installer-title-bar"><span class="installer-title-text">📦 Instalador do PDF Reader v5.2</span><span class="installer-title-btn" id="installer-close">✕</span></div>
          <div class="installer-body">
            <div class="installer-icon-area">⏳</div>
            <div class="installer-content">
              <div class="installer-heading">Instalando...</div>
              <div class="installer-progress-track"><div class="installer-progress-fill" id="installer-progress-fill" style="width:0%"></div></div>
              <div class="installer-progress-label" id="installer-progress-label">0%</div>
              <div class="installer-status" id="installer-status">Preparando arquivos...</div>
            </div>
          </div>
          <div class="installer-footer"><button class="installer-btn installer-btn-secondary" id="installer-cancel" ${1===1?'disabled':''}>Cancelar</button></div>`;
        const statusMsgs = [
          "Preparando arquivos...",
          "Copiando PDFReader.exe...",
          "Copiando pdfreader.dll...",
          "Copiando leitor.pdf...",
          "Registrando componentes do sistema...",
          "Criando atalhos no Menu Iniciar...",
          "Configurações finais..."
        ];
        let prog = 0;
        const fill = win.querySelector("#installer-progress-fill");
        const lbl = win.querySelector("#installer-progress-label");
        const sts = win.querySelector("#installer-status");
        const iv = setInterval(() => {
          prog += Math.random() * 8 + 3;
          if (prog >= 100) { prog = 100; clearInterval(iv); }
          const pct = Math.min(Math.round(prog), 100);
          if (fill) fill.style.width = pct + "%";
          if (lbl) lbl.textContent = pct + "%";
          if (sts) sts.textContent = statusMsgs[Math.min(Math.floor(pct / 15), statusMsgs.length - 1)];
          if (pct >= 100) setTimeout(() => { step = 4; render(); }, 400);
        }, 280);
      } else if (step === 4) {
        win.innerHTML = `
          <div class="installer-title-bar"><span class="installer-title-text">📦 Instalador do PDF Reader v5.2</span><span class="installer-title-btn" id="installer-close">✕</span></div>
          <div class="installer-body">
            <div class="installer-icon-area">✅</div>
            <div class="installer-content">
              <div class="installer-heading" style="color:#4ade80;">Instalação Concluída</div>
              <p class="installer-desc">O <strong>PDF Reader v5.2</strong> foi instalado com sucesso no seu computador.</p>
              <div class="installer-info" style="border-color:rgba(74,222,128,0.2);background:rgba(74,222,128,0.06);">
                ✅ PDF Reader pronto para uso<br>
                📍 Localização: C:\\Program Files\\PDF Reader<br>
                🖱️ Atalho criado no Menu Iniciar
              </div>
            </div>
          </div>
          <div class="installer-footer"><button class="installer-btn installer-btn-primary" id="installer-finish">✅ Concluir</button></div>`;
        S.installDone = true;
        checkTickets();
      }
      // Bind buttons
      const closeBtn = win.querySelector("#installer-close");
      if (closeBtn) closeBtn.addEventListener("click", () => { overlay.style.display = "none"; });
      ["installer-cancel", "installer-finish"].forEach(id => {
        const btn = win.querySelector("#" + id);
        if (btn) btn.addEventListener("click", () => { overlay.style.display = "none"; });
      });
      const nextBtn = win.querySelector("#installer-next");
      if (nextBtn) nextBtn.addEventListener("click", () => { step = 2; render(); });
      const backBtn = win.querySelector("#installer-back");
      if (backBtn) backBtn.addEventListener("click", () => { step = 1; render(); });
      const installBtn = win.querySelector("#installer-install");
      if (installBtn) installBtn.addEventListener("click", () => { step = 3; render(); });
    }
    render();
  }

  function showExpandPrompt() {
    const overlay = container.querySelector("#winlab-complete-overlay");
    const modal = container.querySelector("#winlab-complete-modal");
    if (!overlay || !modal) return;
    overlay.classList.add("active");
    modal.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:3rem;margin-bottom:8px;">🖥️</div>
        <div class="winlab-complete-title" style="font-size:1.1rem;margin-bottom:6px;">Tela cheia recomendada</div>
        <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);line-height:1.5;margin:0 0 14px;">
          Para aproveitar melhor o laboratório, expanda o simulador para <strong>tela cheia</strong>.<br>
          Isso vai permitir visualizar todo o conteúdo da aula sem cortes.
        </p>
        <button class="winlab-complete-btn" id="expand-prompt-btn" style="width:100%;margin-bottom:8px;background:#6366f1;">⛶ Expandir Agora</button>
        <button class="winlab-complete-btn" id="expand-skip-btn" style="width:100%;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);font-size:0.78rem;">Continuar sem expandir</button>
      </div>`;
    const winlabEl = container.querySelector("#winlab-desktop");
    const exitBtn = container.querySelector("#winlab-exit-expand");
    modal.querySelector("#expand-prompt-btn").addEventListener("click", () => {
      if (winlabEl) winlabEl.classList.add("winlab-expanded");
      if (exitBtn) exitBtn.style.display = "block";
      overlay.classList.remove("active");
      setTimeout(() => showWelcomeModal(), 400);
    });
    modal.querySelector("#expand-skip-btn").addEventListener("click", () => {
      overlay.classList.remove("active");
      setTimeout(() => showWelcomeModal(), 400);
    });
  }

  function showWelcomeModal() {
    const overlay = container.querySelector("#winlab-complete-overlay");
    const modal = container.querySelector("#winlab-complete-modal");
    if (!overlay || !modal) return;
    overlay.classList.add("active");
    modal.innerHTML = `
      <div style="text-align:left;">
        <div style="font-size:2.8rem;text-align:center;margin-bottom:6px;">💼</div>
        <div class="winlab-complete-title" style="font-size:1.1rem;text-align:center;">Bem-vindo à InforTech Soluções Digitais</div>
        <p style="font-size:0.82rem;color:rgba(255,255,255,0.7);line-height:1.5;margin:8px 0 12px;">
          Você acaba de ser contratado como <strong>técnico de suporte</strong>.<br><br>
          Durante esta aula, funcionários abrirão chamados relatando problemas no computador.<br><br>
          Cada problema exigirá conhecimentos adquiridos nas aulas anteriores.<br><br>
          Leia atentamente as instruções antes de iniciar qualquer tarefa.
        </p>
        <button class="winlab-complete-btn" id="welcome-start-btn" style="width:100%;">▶️ Entrar no laboratório</button>
      </div>`;
    modal.querySelector("#welcome-start-btn").addEventListener("click", () => {
      overlay.classList.remove("active");
      setTimeout(() => startChamadoSequence(1), 300);
    });
  }

  // ==================== CHAMADO INTRO ====================
  const CHAMADO_THEORY = {
    1: { title: "📦 O que é um programa de computador?", color: "#818cf8",
      content: [
        "<strong>Software</strong> é a parte lógica do computador: o conjunto de instruções que diz ao hardware o que fazer.",
        "<strong>Sistema Operacional</strong> (Windows) é o software principal que gerencia o computador inteiro. <strong>Aplicativos</strong> (Word, Chrome, PDF Reader) são programas que executam tarefas específicas.",
        "<strong>Arquivo .exe</strong> (executável) é o formato padrão de programas no Windows. Ao clicar duas vezes, o sistema carrega o programa na memória e inicia a instalação ou execução.",
        "<strong>Como a instalação funciona?</strong> O instalador copia arquivos para C:\\Program Files, registra componentes no sistema, cria atalhos no Menu Iniciar e libera o programa para uso.",
        "<strong>Onde os programas ficam armazenados?</strong> Lembra quando aprendemos sobre armazenamento na Aula 5? Todo programa instalado ocupa espaço no SSD ou HD. Um PDF Reader ocupa cerca de 28 MB.",
        "<strong>⚠️ Cuidado com programas desconhecidos!</strong> Instalar de sites não oficiais pode trazer malwares. Sempre verifique se o arquivo é confiável antes de executar.",
        "<strong>🎯 Missão:</strong> O setor financeiro precisa do <strong>PDF Reader</strong> para abrir relatórios. Abra a pasta <strong>Downloads</strong>, localize <strong>PDFReader_Setup.exe</strong> e execute a instalação."
      ]},
    2: { title: "🗑️ Como remover programas corretamente?", color: "#ef4444",
      content: [
        "Com o tempo, o computador acumula programas que nunca mais foram usados — eles ocupam espaço, podem conflitar com versões novas e deixam o sistema mais lento.",
        "<strong>Apagar o atalho da área de trabalho NÃO desinstala o programa!</strong> O atalho é só um link. O programa continua no disco ocupando espaço.",
        "<strong>A forma correta:</strong> Use <strong>Painel de Controle > Programas e Recursos</strong> ou <strong>Configurações > Aplicativos</strong>. O desinstalador remove os arquivos, limpa registros e restaura configurações.",
        "<strong>⚠️ Risco:</strong> NUNCA apague a pasta do programa manualmente (ex: C:\\Program Files\\Antivirus Legacy). Isso deixa centenas de chaves perdidas no registro do Windows — o chamado 'lixo digital'.",
        "<strong>Organizar programas é tão importante quanto organizar arquivos.</strong> Lembra da Aula 5? Da mesma forma que você organiza documentos em pastas, deve manter a lista de programas instalados limpa.",
        "<strong>🎯 Missão:</strong> O Antivirus Legacy está desatualizado e ocupa espaço. Acesse <strong>Programas e Recursos</strong> e desinstale-o corretamente."
      ]},
    3: { title: "💾 Por que o computador fica lento?", color: "#10b981",
      content: [
        "Três componentes trabalham juntos para um computador funcionar rápido: <strong>CPU</strong> (processador), <strong>RAM</strong> (memória) e <strong>disco</strong> (SSD/HD).",
        "<strong>CPU</strong> — o cérebro. Executa instruções. Se algum programa usar 100% da CPU, tudo trava porque não sobra capacidade para outros processos.",
        "<strong>RAM</strong> — memória temporária. Guarda o que está sendo usado agora. Pouca RAM = o computador fica 'pensando' ao alternar entre janelas.",
        "<strong>Disco (HD/SSD)</strong> — armazenamento permanente. Um disco quase cheio (acima de 90%) deixa o sistema lento, especialmente em HDs mecânicos.",
        "Arquivos <strong>temporários</strong> acumulam com o uso e ocupam espaço sem necessidade. A pasta <strong>Downloads</strong> frequentemente tem instaladores que você baixou e nunca mais usou.",
        "O <strong>Gerenciador de Tarefas</strong> (Ctrl+Shift+Esc) é seu melhor amigo para descobrir o que está consumindo recursos do sistema.",
        "<strong>🎯 Missão:</strong> O disco C: está com 96% ocupado. Use a <strong>Limpeza de Disco</strong> para remover arquivos desnecessários e liberar espaço."
      ]},
    4: { title: "⚡ Como diagnosticar um problema técnico?", color: "#f59e0b",
      content: [
        "Um técnico de suporte não chuta soluções. Ele segue um <strong>método lógico</strong> de investigação — igual um detetive de computadores.",
        "1. <strong>O computador liga?</strong> (Aula 2 — Hardware) Verifique energia, cabos e fonte. Se não liga, pode ser fonte queimada ou cabo solto.",
        "2. <strong>O monitor funciona?</strong> (Aula 3 — Periféricos) Verifique cabo de vídeo e entrada correta. Teste com outro monitor se possível.",
        "3. <strong>O mouse e teclado respondem?</strong> (Aula 3) Periféricos sem resposta podem indicar driver corrompido ou porta USB com problema.",
        "4. <strong>O Windows iniciou normalmente?</strong> (Aula 4) Se o sistema trava na inicialização, pode ser software corrompido ou disco com erro.",
        "5. <strong>Há espaço em disco?</strong> (Aula 5) Disco cheio impede o Windows de criar arquivos temporários. Já vimos isso no desafio anterior.",
        "6. <strong>Algum programa está causando problemas?</strong> (Aula 6 + esta aula) Use o Gerenciador de Tarefas para encontrar processos suspeitos.",
        "<strong>🎯 Missão:</strong> O computador do cliente está extremamente lento (CPU 100%). Abra o <strong>Gerenciador de Tarefas</strong>, encontre o processo <strong>CryptoMiner.exe</strong> e finalize-o."
      ]},
    5: { title: "🩺 Quiz — Verificação de Conhecimentos", color: "#8b5cf6",
      content: [
        "Você atendeu 4 chamados e aprendeu na prática como funciona o suporte técnico.",
        "Agora vamos testar seus conhecimentos com um rápido quiz.<br>4 perguntas de múltipla escolha.<br>Você tem <strong>3 vidas</strong> — erre 3 e o teste encerra.",
        "Os tópicos cobrem tudo que você viu até aqui: instalação, desinstalação, limpeza de disco, gerenciamento de tarefas e diagnóstico.",
        "<strong>🎯 Missão:</strong> Responda às perguntas corretamente para validar seu aprendizado."
      ]},
  };

  function showChamadoIntro(ticketId) {
    const theory = CHAMADO_THEORY[ticketId];
    if (!theory) { startChamadoPractice(ticketId); return; }
    const overlay = container.querySelector("#winlab-complete-overlay");
    const modal = container.querySelector("#winlab-complete-modal");
    if (!overlay || !modal) return;
    overlay.classList.add("active");
    const ticket = TICKETS.find(t => t.id === ticketId);
    modal.innerHTML = `
      <div style="text-align:left;">
        <div class="winlab-complete-title" style="font-size:1rem;display:flex;align-items:center;gap:6px;">
          <span>📌 CHAMADO #00${ticketId}</span>
          <span style="font-size:0.7rem;background:${theory.color};color:#fff;padding:1px 6px;border-radius:3px;">${ticket?.dept||''}</span>
        </div>
        <div style="font-size:0.95rem;font-weight:700;color:${theory.color};margin:6px 0 8px;">${theory.title}</div>
        ${theory.content.map(p => `<p style="font-size:0.8rem;color:rgba(255,255,255,0.75);line-height:1.5;margin:0 0 6px;padding-left:8px;border-left:2px solid ${theory.color}40;">${p}</p>`).join("")}
        <button class="winlab-complete-btn" id="chamado-accept-btn" style="width:100%;margin-top:10px;background:${theory.color};">
          ${ticketId === 5 ? '▶️ Iniciar Quiz' : '▶️ Aceitar Chamado'}
        </button>
      </div>`;
    modal.querySelector("#chamado-accept-btn").addEventListener("click", () => {
      overlay.classList.remove("active");
      setTimeout(() => startChamadoPractice(ticketId), 300);
    });
  }

  function showChamadoComplete(ticketId) {
    const overlay = container.querySelector("#winlab-complete-overlay");
    const modal = container.querySelector("#winlab-complete-modal");
    if (!overlay || !modal) return;
    const nextId = ticketId < 5 ? ticketId + 1 : null;
    const detail = {
      1: {
        title: "Desafio Concluído 🎉",
        icon: "📦",
        recap: "Você instalou o <strong>PDF Reader</strong> com sucesso! Na prática, você aprendeu que:",
        bullets: [
          "Programas são ferramentas que adicionam funcionalidades ao computador",
          "A instalação copia arquivos, registra componentes e cria atalhos automaticamente",
          "O instalador é um programa que gerencia todo esse processo de forma segura"
        ],
        learnMore: "No dia a dia, você usará instaladores para adicionar navegadores, antivírus, editores de texto, pacotes Office e sistemas empresariais. Cada programa tem um propósito diferente — e saber instalar corretamente é a base do suporte técnico.",
        transition: "Agora que você instalou um programa, vamos aprender o oposto: como <strong>remover</strong> programas que não são mais necessários."
      },
      2: {
        title: "Desafio Concluído 🎉",
        icon: "🗑️",
        recap: "Você desinstalou o <strong>Antivirus Legacy</strong> corretamente! Isso é importante porque:",
        bullets: [
          "Programas antigos ocupam espaço e podem causar conflitos com versões novas",
          "A desinstalação pelo Painel de Controle remove o programa de forma limpa — sem deixar resíduos",
          "NUNCA apague a pasta do programa manualmente — isso polui o registro do Windows"
        ],
        learnMore: "Mantenha apenas os programas que você realmente usa. Revise a lista de programas instalados a cada 3 meses. Se um programa não é usado há mais de 6 meses, desinstale. Máquinas limpas são máquinas rápidas.",
        transition: "Com a instalação e desinstalação dominadas, o próximo passo é aprender a <strong>liberar espaço em disco</strong> para o sistema funcionar melhor."
      },
      3: {
        title: "Desafio Concluído 🎉",
        icon: "💾",
        recap: "Você limpou arquivos desnecessários do disco! Veja o que aprendeu:",
        bullets: [
          "Arquivos temporários acumulam com o uso e ocupam GB de espaço sem necessidade",
          "A Limpeza de Disco é uma ferramenta nativa do Windows, gratuita e eficaz",
          "Pastas como Downloads acumulam instaladores que nunca mais serão usados"
        ],
        learnMore: "Para manter o disco saudável: (1) execute a Limpeza de Disco 1x por mês, (2) mantenha pelo menos 15% do disco livre, (3) organize seus arquivos em pastas com nomes claros. HD muito cheio trava. SSD muito cheio perde performance de escrita.",
        transition: "Com o disco limpo, vamos descobrir o que fazer quando o computador fica <strong>lento de repente</strong>."
      },
      4: {
        title: "Desafio Concluído 🎉",
        icon: "⚡",
        recap: "Você diagnosticou e finalizou um processo suspeito! Principais aprendizados:",
        bullets: [
          "O Gerenciador de Tarefas mostra em tempo real o consumo de CPU, RAM e disco",
          "Processos com nomes estranhos ou consumo de CPU acima de 90% merecem atenção",
          "Finalizar um processo pode resolver lentidão imediata, mas investigue a causa raiz"
        ],
        learnMore: "Sempre desconfie de: (1) processos com nomes genéricos como 'sys32.exe' ou 'winupdate.exe', (2) consumo de CPU acima de 95% sem motivo, (3) programas que iniciam com o Windows sem necessidade. Use o Gerenciador de Tarefas como seu primeiro raio-X do sistema.",
        transition: "Chegou o momento final! Vamos testar seus conhecimentos com um <strong>diagnóstico rápido</strong> para fechar o expediente."
      }
    };
    const d = detail[ticketId] || { title: "Chamado Resolvido ✅", icon: "✅", recap: "", bullets: [], learnMore: "", transition: "" };
    overlay.classList.add("active");
    modal.innerHTML = `
      <div style="text-align:left;">
        <div style="text-align:center;font-size:2.8rem;margin-bottom:4px;">${d.icon}</div>
        <div class="winlab-complete-title" style="text-align:center;font-size:1.1rem;">${d.title}</div>
        <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.15);border-radius:8px;padding:10px;margin:10px 0;">
          <strong style="font-size:0.82rem;color:#818cf8;">📌 Resumo do que você fez</strong>
          <p style="font-size:0.8rem;color:rgba(255,255,255,0.7);line-height:1.5;margin:4px 0 0;">${d.recap}</p>
          <ul style="font-size:0.78rem;color:rgba(255,255,255,0.6);line-height:1.6;margin:6px 0 0;padding-left:18px;">
            ${d.bullets.map(b => `<li>${b}</li>`).join("")}
          </ul>
        </div>
        <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.12);border-radius:8px;padding:10px;margin-bottom:10px;">
          <strong style="font-size:0.82rem;color:#10b981;">💡 Para seu dia a dia</strong>
          <p style="font-size:0.78rem;color:rgba(255,255,255,0.65);line-height:1.5;margin:4px 0 0;">${d.learnMore}</p>
        </div>
        <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.12);border-radius:8px;padding:10px;margin-bottom:12px;">
          <strong style="font-size:0.82rem;color:#fbbf24;">🔄 Próximo passo</strong>
          <p style="font-size:0.78rem;color:rgba(255,255,255,0.65);line-height:1.5;margin:4px 0 0;">${d.transition}</p>
        </div>
        ${nextId
          ? `<button class="winlab-complete-btn" id="next-chamado-btn" style="width:100%;">➡️ Continuar Aula — Chamado #00${nextId}</button>`
          : `<button class="winlab-complete-btn" id="next-chamado-btn" style="width:100%;background:#10b981;">🏆 Finalizar Jornada</button>`}
      </div>`;
    modal.querySelector("#next-chamado-btn").addEventListener("click", () => {
      overlay.classList.remove("active");
      if (nextId) setTimeout(() => startChamadoSequence(nextId), 300);
      else setTimeout(showCompletion, 500);
    });
  }

  function startChamadoSequence(ticketId) {
    S.activeTicketId = ticketId;
    S.trainingWinOpen = false;
    closeWindow("training");
    showChamadoIntro(ticketId);
  }

  function startChamadoPractice(ticketId) {
    S.activeTicketId = ticketId;
    S.trainingWinOpen = false;
    closeWindow("training");
    if (ticketId === 5) { showQuiz(); return; }
    // Pré-renderiza o treinamento e adiciona à barra de tarefas, mas não abre automaticamente
    renderTraining();
    S.openWindows["training"] = true;
    updateTaskbar();
    showTicketNotif(ticketId);
    showToast("📘 Instruções disponíveis", `Chamado #00${ticketId}: Abra a Central de Treinamento na barra de tarefas.`);
  }

  // ==================== AFTER DESKTOP ====================
  function afterDesktop() {
    setTimeout(() => showExpandPrompt(), 500);
  }

  // START
  showBoot();
}

// ==========================================================================
// AULA 8 — REVISÃO COM CARDS INTERATIVOS
// ==========================================================================
function initAula8RevisaoCards(container, isReset) {
  if (isReset) sessionStorage.removeItem("aula8_revisao_visto");

  const TOPICS = [
    {
      id: "hardware",
      icon: "🖥️",
      title: "Hardware",
      color: "#10b981",
      foto: `<div style="font-size:5rem;">🖥️</div>`,
      content: `<div style="font-size:0.82rem; line-height:1.6; color:rgba(255,255,255,0.7);">
        <p><strong style="color:#10b981;">Hardware</strong> são todos os componentes físicos e tangíveis do computador — as peças que você pode tocar.</p>
        <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#10b981;">🧠 Processador (CPU)</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">É o "cérebro" do computador. Executa bilhões de cálculos por segundo. Quanto maior a frequência (GHz) e mais núcleos, mais rápido ele processa dados.</p>
        </div>
        <div style="background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#60a5fa;">⚡ Memória RAM</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Memória de acesso rápido que armazena dados temporários enquanto o computador está ligado. Quanto mais RAM, mais programas você pode abrir ao mesmo tempo sem lentidão.</p>
        </div>
        <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#fbbf24;">💾 HD vs SSD</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">HD (Disco Rígido) usa pratos magnéticos giratórios — é mais lento e barato. SSD (Solid State Drive) usa chips de memória flash — é muito mais rápido, silencioso e resistente a impactos.</p>
        </div>
        <div style="background:rgba(168,85,247,0.06); border:1px solid rgba(168,85,247,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#a78bfa;">🖥️ Placa-mãe</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">A placa-mãe conecta todos os componentes. Ela possui soquete para CPU, slots para RAM, portas SATA para HD/SSD, conectores de energia e portas de expansão (PCI-Express).</p>
        </div>
        <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#f87171;">🔌 Fonte de Alimentação</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Converte a energia elétrica da tomada (110V/220V AC) em tensões menores (12V, 5V, 3.3V DC) que os componentes do computador utilizam.</p>
        </div>
      </div>`
    },
    {
      id: "perifericos",
      icon: "⚡",
      title: "Periféricos",
      color: "#60a5fa",
      foto: `<div style="font-size:5rem;">⌨️🖱️</div>`,
      content: `<div style="font-size:0.82rem; line-height:1.6; color:rgba(255,255,255,0.7);">
        <p><strong style="color:#60a5fa;">Periféricos</strong> são dispositivos externos que se conectam ao computador para enviar ou receber informações.</p>
        <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#10b981;">⌨️ Dispositivos de Entrada</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Enviam dados para o computador. Exemplos: <strong>Teclado</strong> (digitar textos), <strong>Mouse</strong> (mover cursor), <strong>Microfone</strong> (capturar áudio), <strong>Webcam</strong> (capturar vídeo), <strong>Scanner</strong> (digitalizar documentos).</p>
        </div>
        <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#fbbf24;">🖥️ Dispositivos de Saída</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Recebem dados do computador e os apresentam ao usuário. Exemplos: <strong>Monitor</strong> (exibir imagens), <strong>Impressora</strong> (imprimir documentos), <strong>Caixas de Som</strong> (reproduzir áudio), <strong>Projetor</strong> (projetar imagem).</p>
        </div>
        <div style="background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#818cf8;">🔌 Conexões e Portas</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;"><strong>USB</strong> (Universal Serial Bus): padrão universal para teclado, mouse, pendrive. <strong>HDMI/DisplayPort</strong>: para vídeo e áudio digital (monitor, TV). <strong>P2 (P3)</strong>: conector de áudio para fones e microfone. <strong>Ethernet (RJ-45)</strong>: para internet cabeada.</p>
        </div>
        <div style="background:rgba(139,92,246,0.06); border:1px solid rgba(139,92,246,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#8b5cf6;">💾 Dispositivos de Armazenamento Externo</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;"><strong>Pendrive</strong>: memória flash portátil. <strong>HD Externo</strong>: para backups e grandes volumes. <strong>Cartão SD</strong>: usado em câmeras e celulares.</p>
        </div>
      </div>`
    },
    {
      id: "windows",
      icon: "🪟",
      title: "Windows",
      color: "#fbbf24",
      foto: `<div style="font-size:5rem;">🪟</div>`,
      content: `<div style="font-size:0.82rem; line-height:1.6; color:rgba(255,255,255,0.7);">
        <p><strong style="color:#fbbf24;">Windows</strong> é um Sistema Operacional (SO) — o software que gerencia todo o computador: hardware, programas e arquivos. Ele cria a interface gráfica que você usa.</p>
        <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#fbbf24;">🖼️ Área de Trabalho (Desktop)</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Tela principal após o login. Contém: <strong>Ícones</strong> (atalhos para programas e pastas), <strong>Barra de Tarefas</strong> (programas abertos, relógio, volume, rede), <strong>Menu Iniciar</strong> (acesso a todos os programas e configurações).</p>
        </div>
        <div style="background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#60a5fa;">📂 Explorador de Arquivos</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Ferramenta para navegar pelas pastas e arquivos do computador. Atalho: <code>Windows + E</code>. Exibe unidades (C:, D:), pastas do usuário (Documentos, Imagens, Downloads) e permite copiar, mover, renomear e excluir arquivos.</p>
        </div>
        <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#10b981;">⚙️ Configurações vs Painel de Controle</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">O <strong>Painel de Controle</strong> (versão clássica) e o app <strong>Configurações</strong> (Windows 10/11) permitem personalizar o sistema: alterar papel de parede, ajustar volume e brilho, configurar rede, instalar e desinstalar programas, gerenciar usuários.</p>
        </div>
        <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#f87171;">⌨️ Atalhos Essenciais</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;"><code>Ctrl + C</code> Copiar • <code>Ctrl + V</code> Colar • <code>Ctrl + X</code> Recortar • <code>Ctrl + Z</code> Desfazer • <code>Alt + Tab</code> Alternar janelas • <code>Windows + D</code> Mostrar Área de Trabalho • <code>Ctrl + Shift + Esc</code> Gerenciador de Tarefas • <code>Windows + E</code> Explorador de Arquivos • <code>Windows + I</code> Configurações.</p>
        </div>
      </div>`
    },
    {
      id: "arquivos",
      icon: "📁",
      title: "Arquivos e Pastas",
      color: "#a78bfa",
      foto: `<div style="font-size:5rem;">📁</div>`,
      content: `<div style="font-size:0.82rem; line-height:1.6; color:rgba(255,255,255,0.7);">
        <p><strong style="color:#a78bfa;">Arquivos e pastas</strong> são a base da organização digital. Saber criar, nomear, mover e identificar tipos de arquivo é essencial.</p>
        <div style="background:rgba(168,85,247,0.06); border:1px solid rgba(168,85,247,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#a78bfa;">📄 Extensões de Arquivo</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">A extensão (os caracteres após o ponto) identifica o tipo do arquivo e qual programa abre ele:<br>
          <strong>.docx / .pdf</strong> — Documento (Word / Leitor PDF)<br>
          <strong>.xlsx</strong> — Planilha (Excel)<br>
          <strong>.pptx</strong> — Apresentação (PowerPoint)<br>
          <strong>.jpg / .png</strong> — Imagem<br>
          <strong>.mp3 / .wav</strong> — Áudio<br>
          <strong>.mp4 / .avi</strong> — Vídeo<br>
          <strong>.exe</strong> — Programa executável<br>
          <strong>.txt</strong> — Texto puro (Bloco de Notas)</p>
        </div>
        <div style="background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#818cf8;">🗂️ Hierarquia de Pastas</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Pastas organizam arquivos em uma estrutura em árvore. Exemplo:<br>
          <code>C:\Usuários\Aluno\Documentos\Trabalho\relatorio.docx</code><br>
          O <strong>caminho completo</strong> mostra onde o arquivo está armazenado. Boas práticas: use nomes descritivos (ex: "2024-03-15_Contrato.pdf" em vez de "doc1.pdf").</p>
        </div>
        <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#10b981;">📌 Dicas de Organização</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Crie pastas por categoria (Trabalho, Estudos, Pessoal). Evite acumular arquivos na Área de Trabalho. Faça backups regulares. Use nomes de arquivo que facilitem encontrar depois.</p>
        </div>
      </div>`
    },
    {
      id: "seguranca",
      icon: "🔒",
      title: "Segurança e Manutenção",
      color: "#f87171",
      foto: `<div style="font-size:5rem;">🔒</div>`,
      content: `<div style="font-size:0.82rem; line-height:1.6; color:rgba(255,255,255,0.7);">
        <p><strong style="color:#f87171;">Segurança e manutenção</strong> são práticas essenciais para manter o computador funcionando bem e protegido contra ameaças.</p>
        <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#f87171;">🧹 Limpeza Física</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Mantenha o computador livre de poeira (use pincel e ar comprimido). Limpe teclado e tela com pano macio. Garanta boa ventilação — não obstrua as entradas de ar. Poeira causa superaquecimento e reduz a vida útil dos componentes.</p>
        </div>
        <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#fbbf24;">⚡ Proteção Elétrica</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Use <strong>filtro de linha</strong> (estabilizador) para proteger contra picos de tensão. O <strong>nobreak</strong> mantém o PC ligado por alguns minutos durante queda de energia, permitindo salvar o trabalho. Evite ligar o PC em extensões de baixa qualidade.</p>
        </div>
        <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#10b981;">🛡️ Segurança Digital</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Mantenha o Windows e os programas atualizados. Use um antivírus (Windows Defender já vem instalado). Não clique em links suspeitos nem baixe programas de fontes não oficiais. Cuidado com <strong>adwares</strong> — programas que vêm "junto" com outros instaladores.</p>
        </div>
        <div style="background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#818cf8;">💾 Backup</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Sempre mantenha cópias de segurança dos seus arquivos importantes. Use HD externo, nuvem (Google Drive, OneDrive) ou pendrive. A regra de ouro: se você não tem backup em pelo menos 2 lugares, seus dados não estão seguros.</p>
        </div>
      </div>`
    },
    {
      id: "diagnostico",
      icon: "🔧",
      title: "Diagnóstico e Suporte",
      color: "#22d3ee",
      foto: `<div style="font-size:5rem;">🔧</div>`,
      content: `<div style="font-size:0.82rem; line-height:1.6; color:rgba(255,255,255,0.7);">
        <p><strong style="color:#22d3ee;">Diagnóstico e suporte técnico</strong> envolvem identificar problemas e aplicar soluções. O método do técnico: <strong>Ouvir → Investigar → Testar → Concluir</strong>.</p>
        <div style="background:rgba(6,182,212,0.06); border:1px solid rgba(6,182,212,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#22d3ee;">🔍 Ferramentas de Diagnóstico</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;"><strong>Gerenciador de Tarefas</strong> (Ctrl+Shift+Esc): veja CPU, RAM, Disco e Rede em tempo real.<br>
          <strong>Gerenciador de Dispositivos</strong>: veja todos os hardwares instalados. Um ⚠️ amarelo indica driver ausente ou falha.<br>
          <strong>Limpeza de Disco</strong> (Cleanmgr): libera espaço removendo arquivos temporários.<br>
          <strong>Desfragmentador</strong> (HD) e <strong>TRIM</strong> (SSD): otimizam o desempenho do disco.</p>
        </div>
        <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#10b981;">🐌 Computador Lento — O Tripé</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Analise três componentes:<br>
          • <strong>CPU</strong> a 100% → algum programa está consumindo todo o processador.<br>
          • <strong>RAM</strong> acima de 90% → memória cheia, Windows usa o disco lento (pagefile).<br>
          • <strong>Disco</strong> a 100% → HD congestionado ou SSD com problemas de TRIM.</p>
        </div>
        <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#fbbf24;">🔵 BSOD (Tela Azul)</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Quando o Windows encontra um erro crítico, ele exibe a tela azul com um <strong>Stop Code</strong>. Anote esse código e pesquise — ele indica qual driver ou componente causou o problema. Soluções comuns: atualizar driver, testar a RAM, verificar o disco.</p>
        </div>
        <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.15); border-radius:8px; padding:10px; margin:8px 0;">
          <strong style="color:#f87171;">🚀 Startup e Programas</strong>
          <p style="margin:4px 0 0; font-size:0.76rem;">Muitos programas configuram-se para abrir junto com o Windows, deixando o boot lento. No Gerenciador de Tarefas > Aplicativos de Inicialização, desative programas desnecessários para acelerar a inicialização.</p>
        </div>
      </div>`
    }
  ];

  const abrirModal = (topic) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;";
    overlay.innerHTML = `<div style="background:#1a1a2e;border:2px solid ${topic.color}40;border-radius:16px;max-width:520px;width:90%;padding:0;overflow:hidden;box-shadow:0 0 40px rgba(0,0,0,0.5);">
      <div style="background:linear-gradient(135deg,${topic.color}30,#0f0f23);padding:1.5rem;text-align:center;">
        <div style="width:100%;height:180px;background:linear-gradient(145deg,${topic.color}20,#0a0a1a);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;border:1px solid ${topic.color}20;position:relative;overflow:hidden;">
          <div style="position:absolute;top:6px;left:8px;background:rgba(0,0,0,0.5);padding:2px 8px;border-radius:4px;font-size:0.6rem;color:rgba(255,255,255,0.4);">📷 Ilustração</div>
          ${topic.foto}
        </div>
        <h3 style="margin:0;color:${topic.color};font-size:1.2rem;">${topic.icon} ${topic.title}</h3>
      </div>
      <div style="padding:1.2rem;max-height:300px;overflow-y:auto;">
        ${topic.content}
      </div>
      <div style="padding:0.8rem 1.2rem 1.2rem;">
        <button class="revisao-fechar-btn" style="width:100%;padding:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;cursor:pointer;font-size:0.82rem;">✕ Fechar</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector(".revisao-fechar-btn").addEventListener("click", () => overlay.remove());
  };

  const render = () => {
    container.innerHTML = `<div style="padding:0.5rem;">
      <p style="font-size:0.78rem; color:rgba(255,255,255,0.4); text-align:center; margin:0 0 10px;">Clique em um card para abrir o conteúdo com foto e explicação completa.</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${TOPICS.map(t => {
          const visto = sessionStorage.getItem("aula8_revisao_visto") === t.id;
          return `
            <div style="background:rgba(255,255,255,0.02); border:1px solid ${t.color}30; border-radius:12px; cursor:pointer; transition:all 0.15s;" class="revisao-card" data-id="${t.id}">
              <div style="padding:14px; text-align:center;">
                <div style="font-size:2.2rem; margin-bottom:6px;">${t.icon}</div>
                <strong style="color:${t.color}; font-size:0.85rem;">${t.title}</strong>
                <div style="font-size:0.68rem; color:rgba(255,255,255,0.25); margin-top:4px;">${visto ? '✔️ Revisado' : '👆 Clique para ver'}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>`;

    container.querySelectorAll(".revisao-card").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        const t = TOPICS.find(x => x.id === id);
        if (t) {
          sessionStorage.setItem("aula8_revisao_visto", id);
          abrirModal(t);
          render();
        }
      });
    });
  };

  render();
}

// ==========================================================================
// AULA 8 — QUEBRA-CABEÇA: LIGUE OS PONTOS
// ==========================================================================
function initAula8Puzzle(container, isReset) {
  if (isReset) sessionStorage.removeItem("aula8_conexao");

  const PAIRS = [
    { id: "placamae", left: "🖥️ Placa-mãe", right: "Conecta todos os componentes do computador" },
    { id: "cpu", left: "🧠 Processador (CPU)", right: "Executa cálculos e processa instruções dos programas" },
    { id: "ram", left: "💾 Memória RAM", right: "Armazena dados temporários para acesso rápido" },
    { id: "ssd", left: "💿 SSD", right: "Armazenamento rápido sem partes móveis" },
    { id: "fonte", left: "🔌 Fonte de Alimentação", right: "Converte energia da tomada para os componentes" },
    { id: "cooler", left: "❄️ Cooler", right: "Dissipa o calor gerado pelo processador" },
    { id: "mouse", left: "🖱️ Mouse", right: "Dispositivo de entrada que controla o cursor" },
    { id: "teclado", left: "⌨️ Teclado", right: "Dispositivo de entrada para digitar textos e comandos" },
    { id: "monitor", left: "🖥️ Monitor", right: "Dispositivo de saída que exibe imagens" },
    { id: "impressora", left: "🖨️ Impressora", right: "Dispositivo de saída que imprime documentos" },
    { id: "roteador", left: "📡 Roteador", right: "Distribui o sinal de internet para dispositivos" },
    { id: "hd", left: "💽 HD (Disco Rígido)", right: "Armazenamento magnético de grande capacidade" }
  ];

  let state = JSON.parse(sessionStorage.getItem("aula8_conexao")) || { completed: [], lives: 3 };

  const render = () => {
    if (state.lives <= 0) {
      container.innerHTML = `<div style="text-align:center; padding:2rem;">
        <div style="font-size:3rem;">💔</div>
        <h3 style="color:#ef4444;">Suas vidas acabaram!</h3>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.6); margin-bottom:1rem;">Você errou todas as conexões. Clique abaixo para tentar novamente.</p>
        <button id="puzzle-retry-btn" class="btn btn-primary" style="padding:10px 24px;">🔄 Tentar Novamente</button>
      </div>`;
      document.getElementById("puzzle-retry-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        sessionStorage.removeItem("aula8_conexao");
        initAula8Puzzle(container, true);
      });
      return;
    }

    if (state.completed.length === PAIRS.length) {
      container.innerHTML = `<div style="text-align:center; padding:2rem;">
        <div style="font-size:3rem;">🏆</div>
        <h3 style="color:#10b981;">Todas as Conexões feitas com Sucesso!</h3>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.6);">Você provou que conhece cada componente e sua função!</p>
      </div>`;
      markSlideAsCompleted("aula8-puzzle");
      addXP(50);
      return;
    }

    const available = PAIRS.filter(p => !state.completed.includes(p.id));
    const target = available[Math.floor(Math.random() * available.length)];

    // Random fase: 0 = componente → função, 1 = função → componente
    const fase = Math.floor(Math.random() * 2);

    let wrongOptions, options;
    if (fase === 0) {
      wrongOptions = PAIRS
        .filter(p => p.id !== target.id)
        .map(p => p.right)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      options = [target.right, ...wrongOptions].sort(() => Math.random() - 0.5);

      container.innerHTML = `<div style="padding:0.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:0.75rem; color:rgba(255,255,255,0.4);">Conectados: ${state.completed.length}/${PAIRS.length}</span>
          <span style="font-size:0.9rem;">${'❤️'.repeat(state.lives)}${'💔'.repeat(3 - state.lives)}</span>
        </div>
        <div style="background:rgba(15,15,30,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; text-align:center; margin-bottom:1rem;">
          <div style="font-size:2rem; margin-bottom:8px;">${target.left}</div>
          <p style="font-size:0.82rem; color:rgba(255,255,255,0.5); margin:0;">Qual é a <strong style="color:#fbbf24;">função</strong> deste componente?</p>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${options.map((opt, idx) => `
            <button class="con-puzzle-btn" data-opt-idx="${idx}" data-correct="${opt === target.right}" style="padding:12px 14px; border:1px solid rgba(255,255,255,0.08); border-radius:8px; background:rgba(255,255,255,0.02); color:#fff; cursor:pointer; font-size:0.78rem; text-align:left; line-height:1.4;">
              ${opt}
            </button>
          `).join("")}
        </div>
        <div id="con-puzzle-feedback" style="margin-top:12px; min-height:30px;"></div>
      </div>`;
    } else {
      wrongOptions = PAIRS
        .filter(p => p.id !== target.id)
        .map(p => p.left)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      options = [target.left, ...wrongOptions].sort(() => Math.random() - 0.5);

      container.innerHTML = `<div style="padding:0.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:0.75rem; color:rgba(255,255,255,0.4);">Conectados: ${state.completed.length}/${PAIRS.length}</span>
          <span style="font-size:0.9rem;">${'❤️'.repeat(state.lives)}${'💔'.repeat(3 - state.lives)}</span>
        </div>
        <div style="background:rgba(15,15,30,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; text-align:center; margin-bottom:1rem;">
          <p style="font-size:0.82rem; color:rgba(255,255,255,0.5); margin:0 0 8px;">Qual componente tem esta função?</p>
          <div style="font-size:0.9rem; color:#fbbf24; font-weight:700; line-height:1.4;">${target.right}</div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
          ${options.map((opt, idx) => `
            <button class="con-puzzle-btn" data-opt-idx="${idx}" data-correct="${opt === target.left}" style="padding:14px; border:1px solid rgba(255,255,255,0.08); border-radius:8px; background:rgba(255,255,255,0.02); color:#fff; cursor:pointer; font-size:0.78rem; text-align:center;">
              ${opt}
            </button>
          `).join("")}
        </div>
        <div id="con-puzzle-feedback" style="margin-top:12px; min-height:30px;"></div>
      </div>`;
    }

    let respostaDada = false;
    document.querySelectorAll(".con-puzzle-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (respostaDada) return;
        respostaDada = true;

        const isCorrect = btn.dataset.correct === "true";
        document.querySelectorAll(".con-puzzle-btn").forEach(b => { b.disabled = true; b.style.opacity = "0.5"; });
        btn.style.opacity = "1";
        btn.style.borderColor = isCorrect ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.5)";

        const fb = document.getElementById("con-puzzle-feedback");
        let msg, btnLabel;
        if (isCorrect) {
          state.completed.push(target.id);
          sessionStorage.setItem("aula8_conexao", JSON.stringify(state));
          msg = `✅ <strong>Conexão correta!</strong><br><span style="font-size:0.7rem;color:rgba(255,255,255,0.4);">${target.left} ↔ ${target.right}</span>`;
          btnLabel = "➡️ Próxima Pergunta";
        } else {
          state.lives--;
          sessionStorage.setItem("aula8_conexao", JSON.stringify(state));
          msg = `❌ <strong>Conexão errada! (-1 vida)</strong><br><span style="font-size:0.7rem;color:rgba(255,255,255,0.4);">${target.left} = ${target.right}</span>`;
          btnLabel = "➡️ Continuar";
        }
        fb.innerHTML = `<div style="padding:12px;background:${isCorrect?'rgba(16,185,129,0.08)':'rgba(239,68,68,0.08)'};border:1px solid ${isCorrect?'rgba(16,185,129,0.2)':'rgba(239,68,68,0.2)'};border-radius:8px;color:${isCorrect?'#10b981':'#ef4444'};font-size:0.8rem;text-align:center;">${msg}</div>
        <button class="con-next-btn" style="margin-top:8px;width:100%;padding:10px;background:linear-gradient(135deg,#6366f1,#818cf8);border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:0.82rem;font-weight:600;">${btnLabel}</button>`;
        container.querySelector(".con-next-btn")?.addEventListener("click", (ev) => {
          ev.stopPropagation();
          setTimeout(() => render(), 50);
        }, { once: true });
      });
    });
  };

  render();
}

// ==========================================================================
// AULA 8 — PC ASSEMBLY LAB (SIMULADOR VISUAL)
// ==========================================================================
function initPcAssemblyLab(container, isReset) {
  if (isReset) sessionStorage.removeItem("aula8_assembly");

  const COMPONENTS = [
    { id: "mb", title: "Placa-mãe", icon: "🖥️", cor: "#818cf8", desc: "A base que conecta todos os componentes." },
    { id: "cpu", title: "Processador", icon: "🧠", cor: "#fbbf24", desc: "O cérebro que executa os cálculos." },
    { id: "thermal", title: "Pasta Térmica", icon: "🧴", cor: "#10b981", desc: "Condutor de calor entre CPU e cooler." },
    { id: "cooler", title: "Cooler", icon: "❄️", cor: "#22d3ee", desc: "Sistema de resfriamento da CPU." },
    { id: "ram", title: "Memória RAM", icon: "💾", cor: "#10b981", desc: "Armazena dados temporários de acesso rápido." },
    { id: "ssd", title: "SSD", icon: "💿", cor: "#60a5fa", desc: "Armazenamento rápido sem partes móveis." },
    { id: "psu", title: "Fonte", icon: "🔌", cor: "#f87171", desc: "Converte energia da tomada para o PC." },
    { id: "sata", title: "Cabos SATA", icon: "🔗", cor: "#a78bfa", desc: "Cabos de dados para armazenamento." },
    { id: "power", title: "Cabos Energia", icon: "⚡", cor: "#fbbf24", desc: "Cabos que alimentam a placa-mãe." },
    { id: "perif", title: "Periféricos", icon: "🖱️", cor: "#34d399", desc: "Monitor, teclado, mouse externos." }
  ];

  let state = JSON.parse(sessionStorage.getItem("aula8_assembly")) || { installed: [], current: 0, errors: 0 };

  // Posições visuais dentro do gabinete (em grid)
  const SLOTS = [
    { id: "mb", label: "Placa-mãe", row: 1, col: 1, rowspan: 2, colspan: 2, icon: "🖥️", installedIcon: "🖥️" },
    { id: "cpu", label: "CPU", row: 1, col: 1, rowspan: 1, colspan: 1, icon: "🧠" },
    { id: "thermal", label: "Pasta Térmica", row: 1, col: 2, rowspan: 1, colspan: 1, icon: "🧴" },
    { id: "cooler", label: "Cooler", row: 1, col: 3, rowspan: 1, colspan: 1, icon: "❄️" },
    { id: "ram", label: "RAM", row: 2, col: 1, rowspan: 1, colspan: 3, icon: "💾" },
    { id: "ssd", label: "SSD", row: 3, col: 1, rowspan: 1, colspan: 2, icon: "💿" },
    { id: "psu", label: "Fonte", row: 3, col: 3, rowspan: 1, colspan: 1, icon: "🔌" },
    { id: "sata", label: "Cabos SATA", row: 4, col: 1, rowspan: 1, colspan: 1, icon: "🔗" },
    { id: "power", label: "Cabos Energia", row: 4, col: 2, rowspan: 1, colspan: 1, icon: "⚡" },
    { id: "perif", label: "Periféricos", row: 4, col: 3, rowspan: 1, colspan: 1, icon: "🖱️" }
  ];

  const currentStep = () => COMPONENTS[state.current];

  const abrirModalPeca = (comp) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;";
    overlay.innerHTML = `<div style="background:#1a1a2e;border:2px solid ${comp.cor}40;border-radius:16px;max-width:380px;width:90%;padding:1.5rem;text-align:center;box-shadow:0 0 40px rgba(0,0,0,0.5);">
      <div style="font-size:5rem;margin-bottom:12px;">${comp.icon}</div>
      <h3 style="margin:0 0 8px;color:${comp.cor};font-size:1.1rem;">${comp.title}</h3>
      <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);line-height:1.5;margin:0 0 16px;">${comp.desc}</p>
      <button class="fechar-modal-peca-btn" style="width:100%;padding:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;cursor:pointer;font-size:0.82rem;">✕ Fechar</button>
    </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector(".fechar-modal-peca-btn").addEventListener("click", () => overlay.remove());
  };

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  const render = () => {
    if (state.installed.length === COMPONENTS.length) {
      container.innerHTML = `<div style="text-align:center;padding:1.5rem;">
        <div style="font-size:3rem;">🎉</div>
        <h3 style="color:#10b981;">PC Montado com Sucesso!</h3>
        <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);">Todos os ${COMPONENTS.length} componentes foram instalados corretamente.</p>
      </div>`;
      markSlideAsCompleted("aula8-montagem-lab");
      addXP(50);
      return;
    }

    const step = currentStep();
    const pct = Math.round((state.installed.length / COMPONENTS.length) * 100);
    const available = COMPONENTS.filter(c => !state.installed.includes(c.id));
    const shuffled = shuffle(available);

    container.innerHTML = `<div style="padding:0.5rem;">
      <div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:rgba(255,255,255,0.4);margin-bottom:4px;">
          <span>Montagem: ${state.installed.length}/${COMPONENTS.length}</span>
          <span>${pct}%</span>
        </div>
        <div style="width:100%;height:6px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#10b981,#6366f1);border-radius:4px;"></div>
        </div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <div style="flex:1;min-width:200px;">
          <div style="background:rgba(15,15,30,0.5);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:10px;text-align:center;">
            <div style="font-size:0.78rem;color:rgba(255,255,255,0.4);margin-bottom:6px;">🔧 Instale o componente:</div>
            <div style="font-size:2.5rem;">${step.icon}</div>
            <strong style="color:${step.cor};font-size:0.9rem;">${step.title}</strong>
            <p style="font-size:0.72rem;color:rgba(255,255,255,0.45);margin:4px 0 0;">${step.desc}</p>
          </div>

          <div style="margin-top:8px;">
            <p style="font-size:0.72rem;color:rgba(255,255,255,0.35);margin:0 0 6px;">Clique no componente correto:</p>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${shuffled.map(c => `
                <div class="assembly-option" data-id="${c.id}" style="flex:1;min-width:70px;max-width:90px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:8px 6px;text-align:center;cursor:pointer;transition:all 0.15s;">
                  <div style="font-size:1.6rem;">${c.icon}</div>
                  <div style="font-size:0.6rem;color:rgba(255,255,255,0.5);margin-top:2px;">${c.title}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div id="assembly-feedback" style="margin-top:8px;"></div>
        </div>

        <div style="flex:2;min-width:280px;">
          <div style="background:linear-gradient(145deg,#1a1a2e,#0f0f23);border:2px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px;position:relative;">
            <div style="text-align:center;font-size:0.65rem;color:rgba(255,255,255,0.2);margin-bottom:8px;letter-spacing:2px;text-transform:uppercase;">🔲 Gabinete do PC</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
              ${SLOTS.map(slot => {
                const installed = state.installed.includes(slot.id);
                const comp = COMPONENTS.find(c => c.id === slot.id);
                return `
                  <div style="background:${installed ? `${comp.cor}25` : 'rgba(255,255,255,0.02)'};border:1px solid ${installed ? `${comp.cor}40` : 'rgba(255,255,255,0.06)'};border-radius:8px;padding:8px;text-align:center;min-height:50px;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all 0.3s;">
                    ${installed
                      ? `<span style="font-size:1.8rem;">${comp.icon}</span><span style="font-size:0.55rem;color:${comp.cor};margin-top:2px;">${comp.title}</span><span style="font-size:0.5rem;color:rgba(16,185,129,0.6);">✔️</span>`
                      : `<span style="font-size:0.7rem;color:rgba(255,255,255,0.15);">⬜</span><span style="font-size:0.55rem;color:rgba(255,255,255,0.15);">${slot.label}</span>`
                    }
                  </div>
                `;
              }).join("")}
            </div>
            <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;">
              <span style="font-size:0.55rem;color:rgba(255,255,255,0.08);">🖥️ CPU</span>
              <span style="font-size:0.55rem;color:rgba(255,255,255,0.08);">🔲 RAM</span>
              <span style="font-size:0.55rem;color:rgba(255,255,255,0.08);">💾 SSD</span>
              <span style="font-size:0.55rem;color:rgba(255,255,255,0.08);">🔌 Fonte</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    container.querySelectorAll(".assembly-option").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        const fb = document.getElementById("assembly-feedback");
        if (id === step.id) {
          state.installed.push(id);
          state.current++;
          sessionStorage.setItem("aula8_assembly", JSON.stringify(state));
          fb.innerHTML = `<div style="padding:10px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;color:#10b981;font-size:0.78rem;text-align:center;">✅ ${step.icon} ${step.title} instalado com sucesso!</div>`;
          setTimeout(() => render(), 600);
        } else {
          state.errors++;
          sessionStorage.setItem("aula8_assembly", JSON.stringify(state));
          const clicked = COMPONENTS.find(c => c.id === id);
          fb.innerHTML = `<div style="padding:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:8px;color:#ef4444;font-size:0.78rem;text-align:center;">❌ ${clicked.icon} ${clicked.title} não é o componente correto. Tente novamente!</div>`;
          el.style.border = "1px solid rgba(239,68,68,0.4)";
          el.style.background = "rgba(239,68,68,0.06)";
          setTimeout(() => { el.style.border = ""; el.style.background = ""; fb.innerHTML = ""; }, 1200);
        }
      });
      el.addEventListener("dblclick", (e) => {
        e.preventDefault();
        const id = el.dataset.id;
        const comp = COMPONENTS.find(c => c.id === id);
        if (comp) abrirModalPeca(comp);
      });
    });
  };

  render();
}

// ==========================================================================
// AULA 8 — BOOT LAB
// ==========================================================================
function initBootLab(container, isReset) {
  if (isReset) sessionStorage.removeItem("aula8_boot");

  const SCENARIOS = [
    { id: "ram", title: "RAM mal encaixada", symptom: "O computador liga, mas emite beeps consecutivos e a tela fica preta.", solution: "Reinstale os pentes de RAM pressionando firmemente até ouvir o clique.", correctAnswer: "ram-reinstall" },
    { id: "ssd", title: "SSD desconectado", symptom: "O computador liga, mas mostra 'Boot Device Not Found' ou 'No Bootable Device'.", solution: "Verifique o cabo SATA e o cabo de energia do SSD.", correctAnswer: "ssd-cable" },
    { id: "cooler", title: "Cooler desligado", symptom: "O computador liga, funciona por alguns minutos e desliga sozinho.", solution: "Conecte o cabo do cooler ao header CPU_FAN na placa-mãe.", correctAnswer: "cooler-fan" },
    { id: "monitor", title: "Monitor sem sinal", symptom: "O computador liga (ventoinhas giram, LEDs acendem), mas o monitor fica em 'Sem Sinal'.", solution: "Verifique se o cabo HDMI/DisplayPort está conectado na placa de vídeo (não na placa-mãe) e se o monitor está ligado.", correctAnswer: "monitor-cable" }
  ];

  const OPTIONS = [
    { id: "ram-reinstall", label: "Reinstalar a RAM" },
    { id: "ssd-cable", label: "Verificar cabos do SSD" },
    { id: "cooler-fan", label: "Conectar o cooler à placa-mãe" },
    { id: "monitor-cable", label: "Verificar cabo do monitor" },
    { id: "reset-bios", label: "Resetar a BIOS" },
    { id: "replace-psu", label: "Trocar a fonte" }
  ];

  let state = JSON.parse(sessionStorage.getItem("aula8_boot")) || { completed: [], currentScenario: 0, lives: 3 };

  const render = () => {
    if (state.completed.length === SCENARIOS.length || state.lives <= 0) {
      const success = state.completed.length >= 3;
      container.innerHTML = `<div style="text-align:center; padding:1.5rem;">
        <div style="font-size:3rem;">${success ? '🎉' : '💔'}</div>
        <h3 style="color:${success ? '#10b981' : '#ef4444'};">${success ? 'Diagnóstico Concluído!' : 'Missão Falhou'}</h3>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.6);">
          ${success ? 'Você diagnosticou e corrigiu todos os problemas de boot!' : 'Você perdeu todas as vidas. Tente novamente!'}
        </p>
        ${success ? `<div style="font-size:0.78rem; color:#10b981; margin-top:8px;">✅ BIOS detectando CPU, RAM e SSD corretamente!</div>` : `<button id="retry-boot-btn" class="btn btn-primary" style="margin-top:12px;">🔄 Tentar Novamente</button>`}
      </div>`;
      if (success) { markSlideAsCompleted("aula8-boot-lab"); addXP(40); }
      const retry = document.getElementById("retry-boot-btn");
      if (retry) retry.addEventListener("click", () => { sessionStorage.removeItem("aula8_boot"); initBootLab(container, true); });
      return;
    }

    const scenario = SCENARIOS[state.currentScenario];

    container.innerHTML = `<div style="padding:0.5rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
        <span style="font-size:0.75rem; color:rgba(255,255,255,0.4);">Problema ${state.completed.length + 1}/${SCENARIOS.length}</span>
        <span style="font-size:0.85rem;">${'❤️'.repeat(state.lives)}${'💔'.repeat(3 - state.lives)}</span>
      </div>

      <div style="background:rgba(15,15,30,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; margin-bottom:1rem; text-align:center;">
        <div style="font-size:1rem; background:#003c8f; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:12px; margin-bottom:8px; color:#fff; font-family:monospace;">
          <div style="font-size:0.7rem; color:rgba(255,255,255,0.4); margin-bottom:4px;">🖥️ POST / BIOS</div>
          <div style="font-size:0.82rem;">${scenario.symptom}</div>
        </div>
        <strong style="color:#fbbf24;">🔍 Diagnóstico: ${scenario.title}</strong>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${OPTIONS.map(o => `
          <button class="boot-option-btn" data-id="${o.id}" style="padding:12px; border:1px solid rgba(255,255,255,0.08); border-radius:8px; background:rgba(255,255,255,0.02); color:#fff; cursor:pointer; font-size:0.78rem;">
            ${o.label}
          </button>
        `).join("")}
      </div>
      <div id="boot-feedback" style="margin-top:10px; min-height:30px;"></div>
    </div>`;

    document.querySelectorAll(".boot-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const choice = btn.dataset.id;
        const isCorrect = choice === scenario.correctAnswer;

        document.querySelectorAll(".boot-option-btn").forEach(b => b.disabled = true);

        const fb = document.getElementById("boot-feedback");
        if (isCorrect) {
          state.completed.push(scenario.id);
          fb.innerHTML = `<div style="padding:10px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); border-radius:8px; color:#10b981; font-size:0.8rem;">
            ✅ Correto! ${scenario.solution}<br><span style="font-size:0.7rem; color:rgba(255,255,255,0.4);">Clique para continuar...</span>
          </div>`;
          fb.addEventListener("click", () => {
            state.currentScenario = SCENARIOS.findIndex(s => !state.completed.includes(s.id));
            state.currentScenario = state.currentScenario < 0 ? 0 : state.currentScenario;
            sessionStorage.setItem("aula8_boot", JSON.stringify(state));
            render();
          }, { once: true });
        } else {
          state.lives--;
          fb.innerHTML = `<div style="padding:10px; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:8px; color:#ef4444; font-size:0.8rem;">
            ❌ Incorreto! (-1 vida)<br><span style="font-size:0.7rem; color:rgba(255,255,255,0.4);">Restam ${state.lives} vidas. Clique para tentar novamente.</span>
          </div>`;
          fb.addEventListener("click", () => {
            sessionStorage.setItem("aula8_boot", JSON.stringify(state));
            render();
          }, { once: true });
        }
        sessionStorage.setItem("aula8_boot", JSON.stringify(state));
      });
    });
  };

  render();
}

// ==========================================================================
// AULA 8 — WINDOWS INSTALLER LAB
// ==========================================================================
function initWindowsInstallerLab(container, isReset) {
  if (isReset) sessionStorage.removeItem("aula8_install");

  const STEPS = [
    { id: "boot-pen", title: "Inserir Pendrive Bootável", desc: "Conecte o pendrive com o instalador do Windows na porta USB. Reinicie o computador e entre na BIOS (F2/Del) para definir a ordem de boot: USB primeiro.", icon: "💿" },
    { id: "language", title: "Escolher Idioma", desc: "Selecione o idioma do sistema, formato de hora/moeda e teclado. Para o Brasil: Português (Brasil) e Teclado ABNT2.", icon: "🌐" },
    { id: "disk", title: "Selecionar Disco", desc: "Escolha o SSD onde o Windows será instalado. Se houver partições antigas, clique em 'Excluir' até restar apenas 'Espaço Não Alocado'. Depois clique em 'Avançar'.", icon: "💾" },
    { id: "progress", title: "Aguardar Instalação", desc: "O Windows copia os arquivos e reinicia algumas vezes. É normal a tela piscar e o computador reiniciar sozinho. Não desconecte o pendrive ainda.", icon: "⏳" },
    { id: "user", title: "Criar Usuário", desc: "Digite seu nome de usuário e uma senha (opcional, mas recomendada). Escolha um nome de computador e configure as perguntas de segurança.", icon: "👤" },
    { id: "finish", title: "Concluir Instalação", desc: "O Windows faz as configurações finais e exibe a Área de Trabalho. Pronto! O Windows está instalado.", icon: "🎉" }
  ];

  let state = JSON.parse(sessionStorage.getItem("aula8_install")) || { completed: [], current: 0 };

  const render = () => {
    if (state.completed.length === STEPS.length) {
      container.innerHTML = `<div style="text-align:center; padding:1.5rem;">
        <div style="font-size:3rem;">🪟</div>
        <h3 style="color:#10b981;">Windows Instalado!</h3>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.6);">O Windows foi instalado com sucesso no SSD. Agora vamos configurá-lo!</p>
      </div>`;
      markSlideAsCompleted("aula8-win-install");
      addXP(40);
      return;
    }

    const step = STEPS[state.current];
    const pct = Math.round((state.completed.length / STEPS.length) * 100);

    container.innerHTML = `<div style="padding:0.5rem;">
      <div style="margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:rgba(255,255,255,0.4); margin-bottom:4px;">
          <span>Instalação: ${state.completed.length}/${STEPS.length}</span>
          <span>${pct}%</span>
        </div>
        <div style="width:100%; height:6px; background:rgba(255,255,255,0.06); border-radius:4px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:linear-gradient(90deg,#818cf8,#10b981); border-radius:4px;"></div>
        </div>
      </div>

      <div style="background:rgba(15,15,30,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; text-align:center;">
        <div style="font-size:2rem; margin-bottom:8px;">${step.icon}</div>
        <h4 style="margin:0 0 8px; color:#818cf8; font-size:0.9rem;">Passo ${state.current + 1}: ${step.title}</h4>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.65); line-height:1.5; margin-bottom:1rem;">${step.desc}</p>
        <button id="install-next-btn" class="btn btn-primary" style="padding:10px 24px;">${state.current === STEPS.length - 1 ? '🎉 Finalizar' : '✅ Avançar'}</button>
      </div>

      <div style="margin-top:12px; display:flex; gap:6px;">
        ${STEPS.map((s, i) => `<div style="flex:1; height:4px; border-radius:2px; background:${state.completed.includes(s.id) ? '#10b981' : i === state.current ? '#818cf8' : 'rgba(255,255,255,0.06)'};"></div>`).join("")}
      </div>
    </div>`;

    document.getElementById("install-next-btn").addEventListener("click", () => {
      state.completed.push(step.id);
      state.current++;
      sessionStorage.setItem("aula8_install", JSON.stringify(state));
      render();
    });
  };

  render();
}

// ==========================================================================
// AULA 8 — WINDOWS SETUP LAB
// ==========================================================================
function initWindowsSetupLab(container, isReset) {
  if (isReset) sessionStorage.removeItem("aula8_setup");

  const TASKS = [
    { id: "wallpaper", title: "Alterar Papel de Parede", desc: "Clique com direito na Área de Trabalho > Personalizar > Plano de Fundo. Escolha uma imagem.", icon: "🖼️", done: false },
    { id: "brightness", title: "Ajustar Brilho", desc: "Abra a Central de Ações (Windows + A) e ajuste o controle deslizante de brilho.", icon: "☀️", done: false },
    { id: "volume", title: "Ajustar Volume", desc: "Clique no ícone de alto-falante na barra de tarefas e ajuste o volume para 70%.", icon: "🔊", done: false },
    { id: "date", title: "Configurar Data e Hora", desc: "Clique com direito no relógio > Ajustar data/hora. Ative o ajuste automático.", icon: "📅", done: false },
    { id: "folders", title: "Criar Pastas", desc: "Na Área de Trabalho, crie 3 pastas: 'Documentos', 'Fotos', 'Trabalho'.", icon: "📂", done: false },
    { id: "organize", title: "Organizar Documentos", desc: "Mova os arquivos da Área de Trabalho para as pastas corretas (ex: fotos para 'Fotos').", icon: "🗂️", done: false }
  ];

  let state = JSON.parse(sessionStorage.getItem("aula8_setup")) || { completed: [] };

  const render = () => {
    const allDone = state.completed.length === TASKS.length;

    container.innerHTML = `<div style="padding:0.5rem;">
      <div style="margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:rgba(255,255,255,0.4); margin-bottom:4px;">
          <span>Tarefas de configuração</span>
          <span>${state.completed.length}/${TASKS.length}</span>
        </div>
        <div style="width:100%; height:6px; background:rgba(255,255,255,0.06); border-radius:4px; overflow:hidden;">
          <div style="height:100%; width:${Math.round((state.completed.length/TASKS.length)*100)}%; background:linear-gradient(90deg,#fbbf24,#10b981); border-radius:4px;"></div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${TASKS.map(t => {
          const done = state.completed.includes(t.id);
          return `<div style="background:${done ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)'}; border:1px solid ${done ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)'}; border-radius:10px; padding:12px; ${done ? '' : 'cursor:pointer;'}" data-task="${t.id}" ${done ? '' : 'class="setup-task-btn"'}>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-size:1.3rem;">${done ? '✅' : t.icon}</span>
              <strong style="font-size:0.82rem; color:${done ? '#10b981' : '#fbbf24'};">${t.title}</strong>
            </div>
            <p style="font-size:0.72rem; color:rgba(255,255,255,0.45); margin:0; line-height:1.4;">${done ? '✅ Concluído' : t.desc}</p>
          </div>`;
        }).join("")}
      </div>

      ${allDone ? `<div style="text-align:center; margin-top:1rem; padding:1rem; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:10px;">
        <span style="font-size:1.5rem;">⚙️</span>
        <h4 style="color:#10b981; margin:4px 0 0;">Windows Configurado!</h4>
        <p style="font-size:0.78rem; color:rgba(255,255,255,0.55);">Todas as configurações iniciais foram concluídas.</p>
      </div>` : ""}
    </div>`;

    if (!allDone) {
      document.querySelectorAll(".setup-task-btn").forEach(el => {
        el.addEventListener("click", () => {
          const taskId = el.dataset.task;
          if (!state.completed.includes(taskId)) {
            state.completed.push(taskId);
            sessionStorage.setItem("aula8_setup", JSON.stringify(state));
            if (state.completed.length === TASKS.length) {
              markSlideAsCompleted("aula8-win-setup");
              addXP(30);
            }
            render();
          }
        });
      });
    }
  };

  render();
}

// ==========================================================================
// AULA 8 — SOFTWARE CENTER LAB
// ==========================================================================
function initSoftwareCenterLab(container, isReset) {
  if (isReset) sessionStorage.removeItem("aula8_software");

  const APPS = [
    { id: "browser", name: "Navegador Chrome", icon: "🌐", installed: false, isEssential: true, atalho: false },
    { id: "pdf", name: "Leitor PDF", icon: "📄", installed: false, isEssential: true, atalho: false },
    { id: "word", name: "Editor de Texto", icon: "📝", installed: false, isEssential: true, atalho: false },
    { id: "sheets", name: "Planilhas", icon: "📊", installed: false, isEssential: true, atalho: false },
    { id: "slides", name: "Apresentações", icon: "📽️", installed: false, isEssential: true, atalho: false },
    { id: "bloat", name: "Programa Desnecessário", icon: "🗑️", installed: true, isEssential: false, atalho: false }
  ];

  let state = JSON.parse(sessionStorage.getItem("aula8_software")) || { apps: JSON.parse(JSON.stringify(APPS)), atalhosCriados: [], desinstalados: [], step: 0 };

  const render = () => {
    const allEssentialInstalled = state.apps.filter(a => a.isEssential).every(a => a.installed);
    const allStepsDone = state.step >= 3;

    if (allStepsDone && allEssentialInstalled) {
      container.innerHTML = `<div style="text-align:center; padding:1.5rem;">
        <div style="font-size:3rem;">💿</div>
        <h3 style="color:#10b981;">Programas Instalados e Organizados!</h3>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.6);">Todos os programas essenciais foram instalados, o desnecessário foi removido e os atalhos foram organizados.</p>
      </div>`;
      markSlideAsCompleted("aula8-software-center");
      addXP(30);
      return;
    }

    container.innerHTML = `<div style="padding:0.5rem;">
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <button class="software-tab ${state.step === 0 ? 'active' : ''}" data-step="0" style="flex:1; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); background:${state.step === 0 ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)'}; color:#fff; cursor:pointer; font-size:0.75rem;">📦 Instalar</button>
        <button class="software-tab ${state.step === 1 ? 'active' : ''}" data-step="1" style="flex:1; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); background:${state.step === 1 ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)'}; color:#fff; cursor:pointer; font-size:0.75rem;">🔗 Atalhos</button>
        <button class="software-tab ${state.step === 2 ? 'active' : ''}" data-step="2" style="flex:1; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); background:${state.step === 2 ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)'}; color:#fff; cursor:pointer; font-size:0.75rem;">🗑️ Limpeza</button>
      </div>`;

    if (state.step === 0) {
      const toInstall = state.apps.filter(a => !a.installed && a.isEssential);
      container.innerHTML += `<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${toInstall.map(a => `
          <button class="install-app-btn" data-id="${a.id}" style="padding:14px; border:1px solid rgba(255,255,255,0.08); border-radius:10px; background:rgba(255,255,255,0.02); color:#fff; cursor:pointer; text-align:center;">
            <div style="font-size:2rem;">${a.icon}</div>
            <div style="font-size:0.78rem; margin-top:4px;">${a.name}</div>
          </button>
        `).join("")}
        ${toInstall.length === 0 ? `<div style="grid-column:1/-1; text-align:center; padding:1rem; color:#10b981;">✅ Todos instalados!</div>` : ""}
      </div>`;
    } else if (state.step === 1) {
      const installedEssential = state.apps.filter(a => a.isEssential && a.installed);
      const noAtalho = installedEssential.filter(a => !state.atalhosCriados.includes(a.id));
      container.innerHTML += `<p style="font-size:0.78rem; color:rgba(255,255,255,0.5); margin-bottom:8px;">Clique nos programas para criar atalhos na Área de Trabalho:</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${noAtalho.map(a => `
          <button class="shortcut-btn" data-id="${a.id}" style="padding:12px; border:1px solid rgba(255,255,255,0.08); border-radius:8px; background:rgba(255,255,255,0.02); color:#fff; cursor:pointer; text-align:center;">
            <span style="font-size:1.2rem;">${a.icon}</span>
            <span style="font-size:0.78rem;">${a.name}</span>
            <span style="font-size:0.65rem; color:rgba(255,255,255,0.3); display:block;">Clique para criar atalho</span>
          </button>
        `).join("")}
        ${noAtalho.length === 0 ? `<div style="grid-column:1/-1; text-align:center; padding:1rem; color:#10b981;">✅ Todos os atalhos criados!</div>` : ""}
      </div>`;
    } else if (state.step === 2) {
      const toRemove = state.apps.filter(a => !a.isEssential && a.installed);
      container.innerHTML += `<p style="font-size:0.78rem; color:rgba(255,255,255,0.5); margin-bottom:8px;">Programas desnecessários encontrados. Clique para desinstalar:</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${toRemove.map(a => `
          <button class="uninstall-btn" data-id="${a.id}" style="padding:14px; border:1px solid rgba(239,68,68,0.15); border-radius:10px; background:rgba(239,68,68,0.04); color:#fff; cursor:pointer; text-align:center;">
            <div style="font-size:1.5rem;">${a.icon}</div>
            <div style="font-size:0.78rem;">${a.name}</div>
            <div style="font-size:0.65rem; color:#f87171;">Clique para desinstalar</div>
          </button>
        `).join("")}
        ${toRemove.length === 0 ? `<div style="grid-column:1/-1; text-align:center; padding:1rem; color:#10b981;">✅ Nenhum programa desnecessário restante!</div>` : ""}
      </div>`;
    }

    container.innerHTML += `</div>`;

    document.querySelectorAll(".software-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        state.step = parseInt(btn.dataset.step);
        sessionStorage.setItem("aula8_software", JSON.stringify(state));
        render();
      });
    });

    document.querySelectorAll(".install-app-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const app = state.apps.find(a => a.id === btn.dataset.id);
        if (app) { app.installed = true; }
        sessionStorage.setItem("aula8_software", JSON.stringify(state));
        render();
      });
    });

    document.querySelectorAll(".shortcut-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (!state.atalhosCriados.includes(id)) {
          state.atalhosCriados.push(id);
          sessionStorage.setItem("aula8_software", JSON.stringify(state));
          render();
        }
      });
    });

    document.querySelectorAll(".uninstall-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const app = state.apps.find(a => a.id === btn.dataset.id);
        if (app) { app.installed = false; }
        if (!state.desinstalados.includes(btn.dataset.id)) {
          state.desinstalados.push(btn.dataset.id);
        }
        sessionStorage.setItem("aula8_software", JSON.stringify(state));
        render();
      });
    });
  };

  render();
}

// ==========================================================================
// AULA 8 — MISSÃO SURPRESA
// ==========================================================================
function initAula8Surpresa(container, isReset) {
  if (isReset) { sessionStorage.removeItem("aula8_surpresa"); }

  const PROBLEMS = [
    {
      id: "internet",
      title: "🌐 Sem Internet",
      desc: "O usuário reporta que o navegador não abre nenhuma página. O ícone de rede na barra de tarefas mostra um globo com 'Sem Internet'.",
      steps: [
        { question: "Qual é o primeiro passo?", options: ["Reinstalar o Windows", "Verificar se o cabo de rede está conectado ou se o Wi-Fi está ativado", "Comprar um novo modem", "Formatar o computador"], correct: 1, explanation: "Sempre comece pela verificação física: cabo de rede solto ou Wi-Fi desativado são as causas mais comuns." },
        { question: "Se o cabo está conectado, qual o próximo passo?", options: ["Trocar a placa-mãe", "Usar o Solucionador de Problemas de Rede do Windows", "Instalar um novo navegador", "Desligar o firewall"], correct: 1, explanation: "O Windows possui ferramentas de diagnóstico automáticas. Clique com direito no ícone de rede > Solucionar Problemas." },
        { question: "E se o solucionador não resolver?", options: ["O problema é definitivamente o hardware", "Verificar o driver da placa de rede no Gerenciador de Dispositivos", "Jogar o computador fora", "Desativar o antivírus"], correct: 1, explanation: "Um driver de rede corrompido ou ausente pode impedir a conexão. Verifique no Gerenciador de Dispositivos se há um ponto de exclamação amarelo." }
      ]
    },
    {
      id: "audio",
      title: "🔇 Sem Áudio",
      desc: "O usuário reinstalou o Windows e agora não sai som nenhum do computador. O ícone de volume não está mudo.",
      steps: [
        { question: "Qual a causa mais provável?", options: ["O Windows não tem suporte a áudio", "Faltam os drivers de áudio", "A caixa de som queimou", "O processador está com defeito"], correct: 1, explanation: "Após reinstalar o Windows, é comum faltarem drivers. O dispositivo de áudio aparece com exclamação amarela no Gerenciador de Dispositivos." },
        { question: "Onde verificar se o dispositivo de áudio é reconhecido?", options: ["No Explorador de Arquivos", "No Gerenciador de Dispositivos", "No Bloco de Notas", "No Prompt de Comando"], correct: 1, explanation: "O Gerenciador de Dispositivos mostra todos os hardwares. Um ponto de exclamação amarelo indica driver ausente." },
        { question: "Como resolver?", options: ["Formatar o PC", "Usar o Windows Update para buscar drivers", "Tocar o gabinete", "Desabilitar o som"], correct: 1, explanation: "O Windows Update pode encontrar e instalar drivers de áudio automaticamente. Você também pode baixar do site do fabricante." }
      ]
    },
    {
      id: "disk",
      title: "💽 Disco Cheio",
      desc: "O usuário diz que o computador está lento e aparece uma mensagem 'Espaço em disco insuficiente' no drive C:.",
      steps: [
        { question: "Qual ferramenta usar primeiro?", options: ["Formatar o HD", "Limpeza de Disco (Cleanmgr)", "Comprar um SSD novo", "Desfragmentar"], correct: 1, explanation: "A Limpeza de Disco remove arquivos temporários, cache e pode liberar gigabytes rapidamente." },
        { question: "O que fazer se a Limpeza de Disco não liberar espaço suficiente?", options: ["Apagar pastas aleatórias", "Usar 'Limpar arquivos do sistema' para acessar Windows.old e atualizações antigas", "Desativar o Windows", "Trocar de sistema operacional"], correct: 1, explanation: "O botão 'Limpar arquivos do sistema' permite remover a pasta Windows.old (10-25 GB) e arquivos de atualização antigos." },
        { question: "Qual boa prática evita que o disco encha novamente?", options: ["Nunca instalar programas", "Mover documentos e downloads para outra unidade regularmente", "Deletar o System32", "Desfragmentar toda semana"], correct: 1, explanation: "Manter os dados grandes (vídeos, fotos, downloads) organizados em outra unidade ajuda a preservar espaço no C:." }
      ]
    },
    {
      id: "mouse",
      title: "🖱️ Mouse Parou de Funcionar",
      desc: "O mouse USB do usuário parou de funcionar do nada. O cursor não se move, mas o teclado funciona normalmente.",
      steps: [
        { question: "Qual o primeiro passo?", options: ["Comprar um mouse novo", "Desconectar e reconectar o cabo USB", "Reinstalar o Windows", "Abrir o computador"], correct: 1, explanation: "Muitas vezes, apenas reconectar o cabo USB resolve o problema." },
        { question: "Se reconectar não funcionar?", options: ["Testar o mouse em outra porta USB", "Jogar o mouse fora", "Trocar a placa-mãe", "Usar só o teclado"], correct: 0, explanation: "Testar em outra porta USB ajuda a identificar se o problema é na porta ou no mouse." },
        { question: "O mouse funciona em outro computador, mas não neste. O que pode ser?", options: ["O mouse está quebrado", "O driver do mouse pode estar corrompido — reinstale no Gerenciador de Dispositivos", "A fonte está queimada", "O Windows não suporta mouse"], correct: 1, explanation: "Se o mouse funciona em outro PC, o problema é de software no computador original. Reinstalar o driver no Gerenciador de Dispositivos resolve." }
      ]
    },
    {
      id: "driver",
      title: "⚠️ Driver com Erro",
      desc: "Após uma atualização do Windows, a placa de vídeo parou de funcionar. Os jogos travam e a resolução da tela está baixa.",
      steps: [
        { question: "Onde verificar o status da placa de vídeo?", options: ["No Explorador de Arquivos", "No Gerenciador de Dispositivos > Adaptadores de Vídeo", "No Bloco de Notas", "No Menu Iniciar"], correct: 1, explanation: "No Gerenciador de Dispositivos, a seção 'Adaptadores de Vídeo' mostra o status da placa." },
        { question: "Qual a melhor ação corretiva?", options: ["Comprar uma placa de vídeo nova", "Reverter o driver para a versão anterior", "Desabilitar a placa de vídeo", "Usar o computador sem vídeo"], correct: 1, explanation: "Reverter o driver (Propriedades > Driver > Reverter Driver) volta para a versão estável anterior à atualização." },
        { question: "Se reverter não for possível, qual a alternativa?", options: ["Desinstalar o driver e baixar a versão mais recente do site da NVIDIA/AMD/Intel", "Trocar de sistema operacional", "Usar o Modo de Segurança para sempre", "Remover a placa de vídeo fisicamente"], correct: 0, explanation: "Baixar o driver mais recente diretamente do site do fabricante (NVIDIA, AMD ou Intel) é a solução mais confiável." }
      ]
    }
  ];

  let state = JSON.parse(sessionStorage.getItem("aula8_surpresa")) || {};

  const render = () => {
    if (!state.problemId) {
      // Show problem selection (random)
      state.problemId = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)].id;
      state.currentStep = 0;
      state.lives = 3;
      state.completed = false;
      sessionStorage.setItem("aula8_surpresa", JSON.stringify(state));
    }

    const problem = PROBLEMS.find(p => p.id === state.problemId);

    if (state.completed) {
      container.innerHTML = `<div style="text-align:center; padding:1.5rem;">
        <div style="font-size:3rem;">🎉</div>
        <h3 style="color:#10b981;">Problema Resolvido!</h3>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.6);">Você diagnosticou e resolveu o problema: ${problem.title}</p>
      </div>`;
      markSlideAsCompleted("aula8-surpresa");
      addXP(50);
      return;
    }

    if (state.lives <= 0) {
      container.innerHTML = `<div style="text-align:center; padding:1.5rem;">
        <div style="font-size:3rem;">💔</div>
        <h3 style="color:#ef4444;">Missão Falhou</h3>
        <p style="font-size:0.82rem; color:rgba(255,255,255,0.6);">Você perdeu todas as vidas. Clique abaixo para tentar um novo problema.</p>
        <button id="retry-surpresa-btn" class="btn btn-primary" style="margin-top:12px;">🔄 Novo Problema</button>
      </div>`;
      document.getElementById("retry-surpresa-btn").addEventListener("click", () => {
        sessionStorage.removeItem("aula8_surpresa");
        render();
      });
      return;
    }

    const step = problem.steps[state.currentStep];

    container.innerHTML = `<div style="padding:0.5rem;">
      <div style="background:rgba(15,15,30,0.5); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-size:0.75rem; color:rgba(255,255,255,0.4);">Problema sorteado:</span>
          <span style="font-size:0.85rem;">${'❤️'.repeat(state.lives)}${'💔'.repeat(3 - state.lives)}</span>
        </div>
        <div style="font-size:1rem; color:#fbbf24; font-weight:700; margin-bottom:4px;">${problem.title}</div>
        <p style="font-size:0.8rem; color:rgba(255,255,255,0.6); line-height:1.4;">${problem.desc}</p>
      </div>

      <div style="background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.15); border-radius:10px; padding:1rem; margin-bottom:1rem;">
        <strong style="color:#818cf8; font-size:0.82rem;">❓ ${step.question}</strong>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        ${step.options.map((opt, idx) => `
          <button class="surpresa-option-btn" data-idx="${idx}" style="padding:12px; border:1px solid rgba(255,255,255,0.08); border-radius:8px; background:rgba(255,255,255,0.02); color:#fff; cursor:pointer; font-size:0.8rem; text-align:left;">
            ${opt}
          </button>
        `).join("")}
      </div>
      <div id="surpresa-feedback" style="margin-top:10px; min-height:30px;"></div>
    </div>`;

    document.querySelectorAll(".surpresa-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const isCorrect = idx === step.correct;
        document.querySelectorAll(".surpresa-option-btn").forEach(b => b.disabled = true);

        const fb = document.getElementById("surpresa-feedback");
        if (isCorrect) {
          state.currentStep++;
          if (state.currentStep >= problem.steps.length) {
            state.completed = true;
          }
          sessionStorage.setItem("aula8_surpresa", JSON.stringify(state));
          fb.innerHTML = `<div style="padding:10px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); border-radius:8px; color:#10b981; font-size:0.8rem;">
            ✅ Correto! ${step.explanation}<br><span style="font-size:0.7rem; color:rgba(255,255,255,0.4);">Clique para continuar...</span>
          </div>`;
          fb.addEventListener("click", () => render(), { once: true });
        } else {
          state.lives--;
          sessionStorage.setItem("aula8_surpresa", JSON.stringify(state));
          fb.innerHTML = `<div style="padding:10px; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:8px; color:#ef4444; font-size:0.8rem;">
            ❌ Incorreto! (-1 vida)<br><span style="font-size:0.7rem; color:rgba(255,255,255,0.4);">${step.explanation}</span>
          </div>`;
          fb.addEventListener("click", () => render(), { once: true });
        }
      });
    });
  };

  render();
}

// ==========================================================================
// AULA 8 — CERTIFICADO
// ==========================================================================
function initAula8Certificado(container, isReset) {
  container.innerHTML = `<div style="max-width:560px; margin:0 auto; padding:0.5rem;">
    <div style="background:rgba(15,15,30,0.5); border:2px solid rgba(245,158,11,0.3); border-radius:16px; padding:2rem 1.5rem; text-align:center;">
      <div style="font-size:3rem; margin-bottom:8px;">🏆</div>
      <h2 style="color:#f59e0b; margin:0 0 4px; font-size:1.3rem;">Certificado de Conclusão</h2>
      <p style="font-size:0.8rem; color:rgba(255,255,255,0.4); margin:0 0 1rem;">Módulo 1 — Explorador Digital</p>

      <div style="border:1px dashed rgba(245,158,11,0.2); border-radius:12px; padding:1.2rem; margin-bottom:1rem; background:rgba(245,158,11,0.02);">
        <p style="font-size:0.85rem; color:rgba(255,255,255,0.7); line-height:1.5; margin:0;">
          Certificamos que <strong>[Aluno]</strong> concluiu com êxito o <strong>Módulo 1 — Explorador Digital</strong>, dominando os fundamentos de hardware, periféricos, Windows, arquivos, manutenção e suporte técnico.
        </p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:1rem;">
        <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:8px; padding:12px;">
          <span style="font-size:1.3rem;">🥇</span>
          <div style="font-size:0.75rem; font-weight:700; color:#10b981;">Mestre da Informática</div>
        </div>
        <div style="background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.15); border-radius:8px; padding:12px;">
          <span style="font-size:1.3rem;">⭐</span>
          <div style="font-size:0.75rem; font-weight:700; color:#818cf8;">+1.000 XP</div>
        </div>
      </div>

      <button id="claim-certificate-btn" class="btn" style="background:linear-gradient(135deg,#f59e0b,#fbbf24); color:#000; font-weight:700; width:100%; padding:12px; border-radius:10px; border:none; cursor:pointer; font-size:0.9rem;">
        🏆 Receber Certificado e Conquistas
      </button>
    </div>
  </div>`;

  document.getElementById("claim-certificate-btn").addEventListener("click", () => {
    if (!state.completedLessons) state.completedLessons = {};
    state.completedLessons["aula-8"] = true;
    unlockAchievement("windows_explorer");
    unlockAchievement("windows_guardian");
    addXP(1000);
    saveState();
    initSidebarMenu();

    container.innerHTML = `<div style="text-align:center; padding:2rem;">
      <div style="font-size:4rem; animation: bounce 1s ease-in-out infinite;">🎉</div>
      <h2 style="color:#f59e0b; margin:1rem 0;">Parabéns, Mestre da Informática!</h2>
      <p style="font-size:0.9rem; color:rgba(255,255,255,0.6); line-height:1.5; max-width:480px; margin:0 auto 1.5rem;">
        Você concluiu o <strong>Módulo 1</strong> com sucesso! Sua jornada no mundo da informática está apenas começando. Continue explorando e aprendendo!
      </p>
      <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:10px; padding:1rem; display:inline-block;">
        <span style="font-size:2rem; display:block;">🥇</span>
        <strong style="color:#10b981;">Medalha "Mestre da Informática"</strong>
      </div>
    </div>`;

    markSlideAsCompleted("aula8-certificado");
    triggerLessonUnlockNotification("aula-8");
  });
}
