// ==========================================================================
// STATE MANAGEMENT & LOCAL STORAGE
// ==========================================================================
let state = {
  currentSlideIndex: 0,
  xp: 0,
  level: 1,
  completedSlides: {}, // { slideId: true }
  unlockedAchievements: {}, // { achievementId: true }
  notes: {}, // { slideId: "text notes" }
  quizProgress: {} // { slideId: { currentQuestionIndex: 0, answers: [], completed: false } }
};

const ACHIEVEMENTS = [
  { id: "welcome", title: "Primeiros Passos", desc: "Abriu as boas-vindas do curso.", icon: "🚀" },
  { id: "timeline", title: "Evolucionista", desc: "Explorou todas as gerações da computação.", icon: "⏳" },
  { id: "hardware", title: "Montador Pleno", desc: "Montou o computador no simulador de hardware.", icon: "🔧" },
  { id: "peripherals", title: "Mestre das Portas", desc: "Conectou todos os cabos periféricos traseiros.", icon: "🔌" },
  { id: "windows", title: "Admin do Windows", desc: "Aprendeu a criar pastas e mover arquivos no S.O.", icon: "🖥️" },
  { id: "ergonomics", title: "Ergonomista Chefe", desc: "Ajustou a postura ergonômica ideal.", icon: "🧘" },
  { id: "graduated", title: "Diplomado", desc: "Aprovado na Avaliação Final!", icon: "🎓" }
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

// Save State to LocalStorage
function saveState() {
  localStorage.setItem("informestre_state", JSON.stringify(state));
  updateProgressUI();
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

// Draw the left menu items
function initSidebarMenu() {
  const menuNav = document.getElementById("course-menu-nav");
  menuNav.innerHTML = "";
  
  // Group course items by chapter
  const chapters = {};
  COURSE_CONTENT.forEach((item, index) => {
    const chapterName = item.chapter || "INTRODUÇÃO";
    if (!chapters[chapterName]) {
      chapters[chapterName] = [];
    }
    chapters[chapterName].push({ ...item, index });
  });

  // Render chapters and items
  for (const [chapterTitle, items] of Object.entries(chapters)) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "menu-chapter-group";
    
    const header = document.createElement("div");
    header.className = "chapter-title-header";
    header.textContent = chapterTitle;
    groupDiv.appendChild(header);
    
    const ul = document.createElement("ul");
    ul.className = "menu-items-list";
    
    items.forEach(item => {
      const li = document.createElement("li");
      
      const isCompleted = state.completedSlides[item.id] ? "completed" : "";
      
      li.innerHTML = `
        <div class="menu-item-link ${isCompleted}" id="menu-item-${item.index}" onclick="loadSlide(${item.index})">
          <div class="menu-item-left">
            <span class="menu-item-check">${state.completedSlides[item.id] ? "✓" : ""}</span>
            <span title="${item.title}">${item.title}</span>
          </div>
          <span class="menu-item-page">p. ${String(item.page).padStart(2, '0')}</span>
        </div>
      `;
      ul.appendChild(li);
    });
    
    groupDiv.appendChild(ul);
    menuNav.appendChild(groupDiv);
  }
}

// Update stats (XP Counter & Level Badge)
function updateStatsUI() {
  document.getElementById("user-xp-counter").textContent = state.xp;
  document.getElementById("user-level-badge").textContent = `Nível ${state.level}`;
  
  // Total achievements unlocked
  const count = Object.keys(state.unlockedAchievements).length;
  document.getElementById("achievement-unlocked-count").textContent = count;
}

// Update course progress percentage
function updateProgressUI() {
  const totalSlides = COURSE_CONTENT.length;
  const completedCount = Object.keys(state.completedSlides).length;
  const percent = totalSlides > 0 ? Math.round((completedCount / totalSlides) * 100) : 0;
  
  document.getElementById("course-progress-percent").textContent = `${percent}%`;
  document.getElementById("course-progress-bar").style.width = `${percent}%`;
}

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
  
  // Update sidebar check icons
  const slideObj = COURSE_CONTENT.find(c => c.id === slideId);
  if (slideObj) {
    const idx = COURSE_CONTENT.indexOf(slideObj);
    const linkEl = document.getElementById(`menu-item-${idx}`);
    if (linkEl) {
      linkEl.classList.add("completed");
      const checkEl = linkEl.querySelector(".menu-item-check");
      if (checkEl) checkEl.textContent = "✓";
    }
  }
  
  addXP(10); // Standard read reward
  saveState();
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
