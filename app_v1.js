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
