// ============================================================================
// INFORMESTRE — CENTRO DE TREINAMENTO & LABORATÓRIO DE INFORMÁTICA
// ============================================================================
// Módulo de treino de habilidades básicas com Nexora Design System (Glassmorphism).
// ============================================================================

(function (root) {
  const LOCAL_STORAGE_KEY = 'informestre_training_lab_v2';

  // --------------------------------------------------------------------------
  // 1. INJEÇÃO DE ESTILOS MODERNOS (NEXORA DESIGN SYSTEM)
  // --------------------------------------------------------------------------
  function ensureLabStyles() {
    if (document.getElementById('training-lab-styles')) return;
    const style = document.createElement('style');
    style.id = 'training-lab-styles';
    style.innerHTML = `
      /* BASE & CONTAINERS */
      .lab-dashboard-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 0.5rem;
        animation: fadeIn 0.4s ease-out;
      }

      /* HERO BANNER GLASSMORPHISM */
      .lab-header-banner {
        background: linear-gradient(135deg, rgba(108, 92, 231, 0.15) 0%, rgba(162, 155, 254, 0.05) 100%);
        border: 1px solid rgba(108, 92, 231, 0.2);
        border-radius: 20px;
        padding: 2.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        position: relative;
        overflow: hidden;
      }
      .lab-header-banner::before {
        content: ''; position: absolute; top: -50%; right: -10%; width: 300px; height: 300px;
        background: radial-gradient(circle, rgba(108, 92, 231, 0.15) 0%, transparent 70%);
        border-radius: 50%; z-index: 0; pointer-events: none;
      }
      .lab-header-info { position: relative; z-index: 1; max-width: 600px; }
      .lab-badge {
        display: inline-block; padding: 0.4rem 1rem; border-radius: 50px;
        background: rgba(108, 92, 231, 0.15); color: var(--color-primary);
        font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 1rem;
        border: 1px solid rgba(108, 92, 231, 0.3);
      }
      .lab-header-info h2 { font-size: 2.2rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 0.5rem; line-height: 1.2; }
      .lab-header-info p { font-size: 1.05rem; color: var(--color-text-secondary); line-height: 1.5; margin: 0; }
      .lab-header-badge-icon { font-size: 5rem; position: relative; z-index: 1; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); animation: float 3s ease-in-out infinite; }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      /* STATS GRID */
      .lab-performance-summary-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 20px;
        padding: 1.5rem 2rem;
        box-shadow: var(--shadow-sm);
      }
      .lab-summary-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem; }
      .lab-summary-header h4 { font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin: 0; }
      
      .lab-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
      .lab-stat-box {
        padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);
        display: flex; flex-direction: column; gap: 0.3rem; transition: transform 0.2s;
      }
      .lab-stat-box:hover { transform: translateY(-3px); }
      .lab-stat-box.purple { background: linear-gradient(135deg, rgba(108,92,231,0.08) 0%, rgba(108,92,231,0.02) 100%); border-color: rgba(108,92,231,0.2); }
      .lab-stat-box.blue   { background: linear-gradient(135deg, rgba(9,132,227,0.08) 0%, rgba(9,132,227,0.02) 100%); border-color: rgba(9,132,227,0.2); }
      .lab-stat-box.green  { background: linear-gradient(135deg, rgba(0,184,148,0.08) 0%, rgba(0,184,148,0.02) 100%); border-color: rgba(0,184,148,0.2); }
      .lab-stat-box.orange { background: linear-gradient(135deg, rgba(225,112,85,0.08) 0%, rgba(225,112,85,0.02) 100%); border-color: rgba(225,112,85,0.2); }
      
      .stat-top { display: flex; align-items: center; gap: 0.5rem; font-size: 1.3rem; }
      .stat-icon { font-size: 1.5rem; }
      .stat-label { font-size: 0.85rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
      .stat-sub { font-size: 0.8rem; color: var(--color-text-muted); font-weight: 600; }

      /* SIMULATORS GRID */
      .lab-simulators-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
      .lab-sim-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: var(--shadow-sm);
      }
      .lab-sim-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-md);
        border-color: rgba(108, 92, 231, 0.4);
      }
      .sim-card-top {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
      }
      .sim-card-top.purple-theme { background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%); color: #fff; }
      .sim-card-top.blue-theme   { background: linear-gradient(135deg, #0984e3 0%, #74b9ff 100%); color: #fff; }
      .sim-card-top.green-theme  { background: linear-gradient(135deg, #00b894 0%, #55efc4 100%); color: #fff; }
      .sim-card-top.orange-theme { background: linear-gradient(135deg, #e17055 0%, #fab1a0 100%); color: #fff; }
      
      .sim-icon { font-size: 2.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2)); }
      .sim-tag { font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.8rem; background: rgba(0,0,0,0.2); border-radius: 50px; letter-spacing: 0.05em; }
      
      .sim-card-body { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; gap: 0.8rem; }
      .sim-card-body h4 { font-size: 1.25rem; font-weight: 800; color: var(--color-text-primary); margin: 0; }
      .sim-card-body p { font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5; margin: 0; flex: 1; }
      .sim-meta-box {
        background: var(--color-bg-alt); padding: 0.8rem 1rem; border-radius: 10px; font-size: 0.85rem; color: var(--color-text-muted); border: 1px solid var(--color-border);
      }
      .sim-meta-box strong { color: var(--color-text-primary); }

      /* SIMULATOR WORKSPACE (ACTIVE GAME) */
      .lab-simulator-wrapper {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 500px;
        box-shadow: var(--shadow-lg);
        animation: scaleIn 0.3s ease-out;
      }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      
      .sim-control-bar {
        background: var(--color-bg-alt);
        border-bottom: 1px solid var(--color-border);
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .sim-control-left { display: flex; gap: 0.8rem; }
      .lab-sim-workspace { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; flex: 1; position: relative; }
      
      /* GAME ASSETS */
      .typing-level-selector { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .typing-stats-bar { display: flex; gap: 1.5rem; background: var(--color-bg-alt); padding: 1rem 1.5rem; border-radius: 12px; border: 1px solid var(--color-border); }
      .t-stat { font-size: 0.95rem; color: var(--color-text-muted); font-weight: 600; }
      .t-stat strong { color: var(--color-text-primary); font-size: 1.1rem; }
      
      .typing-display-box {
        font-family: 'JetBrains Mono', 'Courier New', monospace;
        font-size: 1.5rem; line-height: 1.6; padding: 1.5rem; background: var(--color-bg);
        border: 2px dashed var(--color-border); border-radius: 16px; color: var(--color-text-secondary);
      }
      .char-correct { color: #00b894; font-weight: 700; text-shadow: 0 0 10px rgba(0,184,148,0.3); }
      .char-wrong { color: #ff7675; font-weight: 700; text-decoration: underline; background: rgba(255,118,117,0.1); }
      .char-current { background: rgba(108,92,231,0.2); border-bottom: 3px solid #6c5ce7; color: var(--color-text-primary); }
      .typing-textarea {
        font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; padding: 1.5rem;
        background: var(--color-bg); border: 2px solid var(--color-border); border-radius: 16px; color: var(--color-text-primary);
        resize: none; transition: border-color 0.2s; outline: none; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
      }
      .typing-textarea:focus { border-color: #6c5ce7; box-shadow: 0 0 0 4px rgba(108,92,231,0.1); }

      /* BALLOON ARENA */
      .balloon-game-arena {
        position: relative; background: var(--color-bg); border: 2px solid var(--color-border);
        border-radius: 16px; flex: 1; min-height: 400px; overflow: hidden;
      }
      .balloon-overlay {
        position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px);
        display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; color: #fff; text-align: center; padding: 2rem;
      }
      .balloon-overlay .overlay-icon { font-size: 4rem; margin-bottom: 1rem; animation: float 2s infinite; }
      .balloon-target {
        position: absolute; width: 60px; height: 75px; border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
        cursor: crosshair; transition: transform 0.1s; display: flex; justify-content: center; align-items: flex-end;
      }
      .balloon-target::after {
        content: ''; position: absolute; bottom: -10px; width: 2px; height: 15px; background: rgba(255,255,255,0.5);
      }
      .balloon-target:active { transform: scale(0.9); }

      /* DRAG DROP */
      .drag-source-container { background: var(--color-bg-alt); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--color-border); }
      .drag-items-flex { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; }
      .drag-item-card {
        background: var(--color-surface); border: 1px solid var(--color-border); padding: 0.8rem 1.2rem;
        border-radius: 10px; cursor: grab; display: flex; align-items: center; gap: 0.5rem; font-weight: 600;
        box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s; user-select: none;
      }
      .drag-item-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: #6c5ce7; }
      .drag-item-card.dragging { opacity: 0.5; transform: scale(1.05); }
      .drag-item-card.dropped-success { background: rgba(0,184,148,0.1); border-color: #00b894; pointer-events: none; }
      .drag-item-card.dropped-error { background: rgba(255,118,117,0.1); border-color: #ff7675; animation: shake 0.4s; }
      
      .drop-zones-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
      .drop-zone-card {
        background: var(--color-bg); border: 2px dashed var(--color-border); border-radius: 16px;
        display: flex; flex-direction: column; min-height: 200px; transition: all 0.2s; overflow: hidden;
      }
      .drop-zone-card.drag-over { border-color: #6c5ce7; background: rgba(108,92,231,0.05); }
      .drop-zone-header { background: var(--color-bg-alt); padding: 1rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: 0.5rem; }
      .drop-zone-header h5 { margin: 0; font-size: 0.95rem; font-weight: 700; }
      .drop-zone-body { padding: 1rem; flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }

      /* SELECTION SIM */
      .selection-task-banner {
        background: linear-gradient(90deg, rgba(225,112,85,0.1) 0%, transparent 100%);
        border-left: 4px solid #e17055; padding: 1rem 1.5rem; border-radius: 0 12px 12px 0; display: flex; flex-direction: column; gap: 0.3rem;
      }
      .task-step { font-size: 0.8rem; font-weight: 800; color: #e17055; text-transform: uppercase; }
      .task-text { font-size: 1.1rem; color: var(--color-text-primary); }
      .selection-text-box {
        background: var(--color-bg); border: 1px solid var(--color-border); padding: 2rem; border-radius: 16px;
        font-size: 1.15rem; line-height: 1.8; color: var(--color-text-secondary);
      }
      .selection-text-box::selection, .selection-text-box *::selection { background: rgba(225,112,85,0.3); color: var(--color-text-primary); }

      /* RESULTS MODAL IN-PLACE */
      .lab-result-card {
        position: absolute; inset: 0; background: rgba(var(--bg-rgb), 0.9); backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center; z-index: 50; padding: 2rem;
      }
      .result-box-inner {
        background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 24px; padding: 3rem;
        text-align: center; max-width: 500px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.15); animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .result-trophy { font-size: 4.5rem; margin-bottom: 1rem; display: block; animation: float 2s infinite; }
      .result-box-inner h3 { font-size: 1.6rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 0.5rem; }
      
      .result-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; background: var(--color-bg-alt); border-radius: 16px; padding: 1.5rem; border: 1px solid var(--color-border); }
      .r-item { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
      .r-val { font-size: 1.5rem; font-weight: 800; color: var(--color-primary); }
      .r-lbl { font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
  }

  // --------------------------------------------------------------------------
  // 1. GERENCIAMENTO DE ESTADO E PERSISTÊNCIA LOCAL
  // --------------------------------------------------------------------------
  function getDefaultData() {
    return {
      typing: { attempts: [], bestWpm: 0, bestAccuracy: 0, lastRun: null },
      mouse: { attempts: [], bestHits: 0, bestAccuracy: 0, bestReactionMs: 0, lastRun: null },
      dragDrop: { attempts: [], bestAccuracy: 0, bestTimeSeconds: 0, lastRun: null },
      textSelection: { attempts: [], bestAccuracy: 0, bestTimeSeconds: 0, lastRun: null }
    };
  }

  function loadLabData() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return getDefaultData();
      return { ...getDefaultData(), ...JSON.parse(raw) };
    } catch (e) { return getDefaultData(); }
  }

  function saveLabData(data) {
    try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function resetLabData() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  // Helper para obter o contêiner
  function getLabContainer(isInsideLesson) {
    return isInsideLesson ? (document.getElementById('lms-lesson-simulators-panel') || document.getElementById('hub-main-panel-content')) : document.getElementById('hub-main-panel-content');
  }

  // --------------------------------------------------------------------------
  // 2. RENDERIZAR PAINEL PRINCIPAL
  // --------------------------------------------------------------------------
  function renderLabPanel(container, options = {}) {
    if (!container) return;
    ensureLabStyles();
    const data = loadLabData();
    const isInsideLesson = !!options.isInsideLesson;

    container.innerHTML = `
      <div class="lab-dashboard-container">
        <!-- CABEÇALHO -->
        <div class="lab-header-banner">
          <div class="lab-header-info">
            <span class="lab-badge">🧪 LABORATÓRIO DE PRÁTICA INTERATIVA</span>
            <h2>Simuladores & Prática Digital</h2>
            <p>Desenvolva velocidade de digitação, destreza motora com o mouse, organização de pastas e seleção de texto em um ambiente simulado e gamificado.</p>
          </div>
          <div class="lab-header-badge-icon">🚀</div>
        </div>

        <!-- RELATÓRIO RÁPIDO -->
        <div class="lab-performance-summary-card">
          <div class="lab-summary-header">
            <h4>📊 Meu Desempenho Local</h4>
            <button class="btn btn-outline btn-sm" onclick="InforMestreTrainingLab.clearDataPrompt(${isInsideLesson})">
              🔄 Limpar Histórico
            </button>
          </div>
          <div class="lab-stats-grid">
            <div class="lab-stat-box purple">
              <div class="stat-top"><span class="stat-icon">⌨️</span> <strong>${data.typing.bestWpm} PPM</strong></div>
              <div class="stat-label">Digitação</div>
              <div class="stat-sub">Precisão: ${data.typing.bestAccuracy}%</div>
            </div>
            <div class="lab-stat-box blue">
              <div class="stat-top"><span class="stat-icon">🎈</span> <strong>${data.mouse.bestHits} acertos</strong></div>
              <div class="stat-label">Estoura Balões</div>
              <div class="stat-sub">Reação: ${data.mouse.bestReactionMs || 0}ms</div>
            </div>
            <div class="lab-stat-box green">
              <div class="stat-top"><span class="stat-icon">📁</span> <strong>${data.dragDrop.bestAccuracy}%</strong></div>
              <div class="stat-label">Drag & Drop</div>
              <div class="stat-sub">Tempo: ${data.dragDrop.bestTimeSeconds || 0}s</div>
            </div>
            <div class="lab-stat-box orange">
              <div class="stat-top"><span class="stat-icon">🔍</span> <strong>${data.textSelection.bestAccuracy}%</strong></div>
              <div class="stat-label">Seleção de Texto</div>
              <div class="stat-sub">Tempo: ${data.textSelection.bestTimeSeconds || 0}s</div>
            </div>
          </div>
        </div>

        <!-- GRADE 2X2 DE SIMULADORES -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
          <h3 style="font-weight:800; color:var(--color-text-primary); margin:0;">🎮 Simuladores Disponíveis</h3>
        </div>
        <div class="lab-simulators-grid">
          
          <!-- SIMULADOR 1 -->
          <div class="lab-sim-card">
            <div class="sim-card-top purple-theme">
              <span class="sim-icon">⌨️</span>
              <span class="sim-tag">SIMULADOR 1</span>
            </div>
            <div class="sim-card-body">
              <h4>Treino de Digitação</h4>
              <p>Treine frases do dia a dia no teclado. Melhore suas Palavras Por Minuto (PPM) e precisão visual.</p>
              <div class="sim-meta-box">
                <div><strong>Recorde:</strong> ${data.typing.bestWpm ? data.typing.bestWpm + ' PPM (' + data.typing.bestAccuracy + '%)' : 'Não realizado'}</div>
              </div>
              <button class="btn btn-primary w-100 mt-2" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson})">▶️ Iniciar Digitação</button>
            </div>
          </div>

          <!-- SIMULADOR 2 -->
          <div class="lab-sim-card">
            <div class="sim-card-top blue-theme">
              <span class="sim-icon">🎈</span>
              <span class="sim-tag">SIMULADOR 2</span>
            </div>
            <div class="sim-card-body">
              <h4>Coordenação com o Mouse</h4>
              <p>Jogo "Estoura Balões": Treine mirar e clicar em alvos na tela para dominar a destreza motora fina.</p>
              <div class="sim-meta-box">
                <div><strong>Recorde:</strong> ${data.mouse.bestHits ? data.mouse.bestHits + ' acertos (' + data.mouse.bestAccuracy + '%)' : 'Não realizado'}</div>
              </div>
              <button class="btn btn-primary w-100 mt-2" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson})">▶️ Iniciar Jogo</button>
            </div>
          </div>

          <!-- SIMULADOR 3 -->
          <div class="lab-sim-card">
            <div class="sim-card-top green-theme">
              <span class="sim-icon">📁</span>
              <span class="sim-tag">SIMULADOR 3</span>
            </div>
            <div class="sim-card-body">
              <h4>Arrastar e Soltar</h4>
              <p>Organize aplicativos e arquivos Office nas suas respectivas pastas dominando o Drag and Drop.</p>
              <div class="sim-meta-box">
                <div><strong>Recorde:</strong> ${data.dragDrop.bestAccuracy ? data.dragDrop.bestAccuracy + '% em ' + data.dragDrop.bestTimeSeconds + 's' : 'Não realizado'}</div>
              </div>
              <button class="btn btn-primary w-100 mt-2" onclick="InforMestreTrainingLab.startDragDropSim(${isInsideLesson})">▶️ Iniciar Organização</button>
            </div>
          </div>

          <!-- SIMULADOR 4 -->
          <div class="lab-sim-card">
            <div class="sim-card-top orange-theme">
              <span class="sim-icon">🔍</span>
              <span class="sim-tag">SIMULADOR 4</span>
            </div>
            <div class="sim-card-body">
              <h4>Seleção de Texto</h4>
              <p>Aprenda o comportamento do cursor e a arrastar a seleção por palavras e parágrafos inteiros.</p>
              <div class="sim-meta-box">
                <div><strong>Recorde:</strong> ${data.textSelection.bestAccuracy ? data.textSelection.bestAccuracy + '% em ' + data.textSelection.bestTimeSeconds + 's' : 'Não realizado'}</div>
              </div>
              <button class="btn btn-primary w-100 mt-2" onclick="InforMestreTrainingLab.startTextSelectionSim(${isInsideLesson})">▶️ Iniciar Seleção</button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 3. SIMULADOR 1 — DIGITAÇÃO
  // --------------------------------------------------------------------------
  const TYPING_LEVELS = [
    { id: "easy", name: "🌱 Iniciante", desc: "Frase curta. Ideal para aprender o teclado.", text: "O Microsoft Word é um programa para digitar textos." },
    { id: "medium", name: "🌿 Intermediário", desc: "Frase prática do dia a dia de trabalho.", text: "Com o Word podemos criar cartas, currículos e relatórios." },
    { id: "hard", name: "🌳 Avançado", desc: "Pontuações e formato de documento completo.", text: "O Microsoft Word é uma das ferramentas mais importantes do pacote Office." }
  ];

  function startTypingSim(isInsideLesson = false, levelId = 'easy') {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    const currentLevel = TYPING_LEVELS.find(l => l.id === levelId) || TYPING_LEVELS[0];
    const sampleText = currentLevel.text;
    let startTime = null; let timerInterval = null; let elapsedSeconds = 0; let isFinished = false;

    container.innerHTML = `
      <div class="lab-simulator-wrapper">
        <div class="sim-control-bar">
          <div class="sim-control-left">
            <button class="btn btn-outline btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">🚪 Sair</button>
            <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson}, '${levelId}')">🔄 Reiniciar</button>
          </div>
          <span class="badge badge-purple" style="font-weight:700;">SIMULADOR 1 — DIGITAÇÃO</span>
        </div>

        <div class="lab-sim-workspace">
          <div>
            <h2 style="font-weight:800;margin:0 0 0.5rem;">⌨️ Treino de Digitação</h2>
            <p class="text-muted">${currentLevel.desc}</p>
          </div>

          <div class="typing-level-selector">
            ${TYPING_LEVELS.map(lvl => `
              <button class="btn btn-sm ${lvl.id === levelId ? 'btn-primary' : 'btn-outline'}" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson}, '${lvl.id}')">${lvl.name}</button>
            `).join('')}
          </div>

          <div class="typing-stats-bar">
            <div class="t-stat">⏱️ Tempo: <strong id="t-time">0s</strong></div>
            <div class="t-stat">⚡ Velocidade: <strong id="t-wpm">0 PPM</strong></div>
            <div class="t-stat">🎯 Precisão: <strong id="t-accuracy">100%</strong></div>
            <div class="t-stat">❌ Erros: <strong id="t-errors">0</strong></div>
          </div>

          <div class="typing-display-box" id="typing-display-box">
            ${sampleText.split('').map((char, i) => `<span class="char-span char-pending" id="c-${i}">${char === ' ' ? '&nbsp;' : char}</span>`).join('')}
          </div>

          <textarea id="typing-input-field" rows="3" class="typing-textarea" placeholder="Clique aqui e comece a digitar o texto acima no seu ritmo..."></textarea>
          
          <div id="typing-result-card" class="lab-result-card screen-hidden"></div>
        </div>
      </div>
    `;

    const inputEl = document.getElementById('typing-input-field');
    if (inputEl) inputEl.focus();

    inputEl.addEventListener('input', () => {
      if (isFinished) return;
      const typed = inputEl.value;

      if (!startTime && typed.length > 0) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
          elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
          document.getElementById('t-time').textContent = elapsedSeconds + 's';
          updateMetrics(typed);
        }, 500);
      }

      updateMetrics(typed);

      if (typed.length >= sampleText.length) {
        isFinished = true; clearInterval(timerInterval);
        finishSim(typed, elapsedSeconds || 1);
      }
    });

    function updateMetrics(typed) {
      let errors = 0;
      for (let i = 0; i < sampleText.length; i++) {
        const span = document.getElementById(`c-${i}`);
        if (!span) continue;
        if (i < typed.length) {
          if (typed[i] === sampleText[i]) { span.className = 'char-span char-correct'; }
          else { span.className = 'char-span char-wrong'; errors++; }
        } else if (i === typed.length) { span.className = 'char-span char-pending char-current'; }
        else { span.className = 'char-span char-pending'; }
      }
      const acc = typed.length > 0 ? Math.max(0, Math.round(((typed.length - errors) / typed.length) * 100)) : 100;
      const wpm = Math.round((typed.length / 5) / Math.max(0.1, elapsedSeconds / 60));
      document.getElementById('t-errors').textContent = errors;
      document.getElementById('t-accuracy').textContent = acc + '%';
      document.getElementById('t-wpm').textContent = wpm + ' PPM';
    }

    function finishSim(typed, timeSec) {
      let errors = 0;
      for (let i = 0; i < sampleText.length; i++) {
        if (i < typed.length && typed[i] !== sampleText[i]) errors++;
      }
      const accuracy = Math.max(0, Math.round(((sampleText.length - errors) / sampleText.length) * 100));
      const wpm = Math.round((sampleText.length / 5) / (timeSec / 60));

      const data = loadLabData();
      data.typing.bestWpm = Math.max(data.typing.bestWpm || 0, wpm);
      data.typing.bestAccuracy = Math.max(data.typing.bestAccuracy || 0, accuracy);
      saveLabData(data);

      const res = document.getElementById('typing-result-card');
      res.classList.remove('screen-hidden');
      res.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">🎉</span>
          <h3>Digitação Concluída!</h3>
          <p class="text-muted mb-2">Continue treinando para aumentar seus toques por minuto.</p>
          <div class="result-stats-grid">
            <div class="r-item"><span class="r-val">${wpm}</span><span class="r-lbl">PPM</span></div>
            <div class="r-item"><span class="r-val">${accuracy}%</span><span class="r-lbl">Precisão</span></div>
            <div class="r-item"><span class="r-val">${timeSec}s</span><span class="r-lbl">Tempo</span></div>
            <div class="r-item"><span class="r-val">${errors}</span><span class="r-lbl">Erros</span></div>
          </div>
          <div class="d-flex gap-2 justify-content-center mt-3">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson}, '${levelId}')">Tentar Novamente</button>
            <button class="btn btn-outline" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">Voltar</button>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 4. SIMULADOR 2 — MOUSE (ESTOURA BALÕES)
  // --------------------------------------------------------------------------
  function startMouseSim(isInsideLesson = false, speedMode = 'easy') {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    const speeds = {
      easy: { spawnMs: 1500, lifetimeMs: 3600, label: '🌱 Calmo (Iniciante)' },
      medium: { spawnMs: 1100, lifetimeMs: 2500, label: '🌿 Normal' },
      hard: { spawnMs: 800, lifetimeMs: 1800, label: '🌳 Rápido' }
    };
    const speedCfg = speeds[speedMode] || speeds.easy;

    let hits = 0; let misses = 0; let reactionTimes = [];
    let gameTimer = null; let spawnTimer = null; let timeLeft = 25; let gameActive = false;

    container.innerHTML = `
      <div class="lab-simulator-wrapper">
        <div class="sim-control-bar">
          <div class="sim-control-left">
            <button class="btn btn-outline btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">🚪 Sair</button>
            <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, '${speedMode}')">🔄 Reiniciar</button>
          </div>
          <span class="badge badge-blue" style="font-weight:700;">SIMULADOR 2 — MOUSE</span>
        </div>

        <div class="lab-sim-workspace">
          <div>
            <h2 style="font-weight:800;margin:0 0 0.5rem;">🎈 Jogo Estoura Balões</h2>
            <p class="text-muted">Melhore a coordenação motora clicando nos balões antes que eles sumam.</p>
          </div>

          <div class="typing-level-selector">
            <button class="btn btn-sm ${speedMode === 'easy' ? 'btn-primary' : 'btn-outline'}" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, 'easy')">🌱 Calmo</button>
            <button class="btn btn-sm ${speedMode === 'medium' ? 'btn-primary' : 'btn-outline'}" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, 'medium')">🌿 Normal</button>
            <button class="btn btn-sm ${speedMode === 'hard' ? 'btn-primary' : 'btn-outline'}" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, 'hard')">🌳 Rápido</button>
          </div>

          <div class="typing-stats-bar">
            <div class="t-stat">⏱️ Restante: <strong id="m-time">25s</strong></div>
            <div class="t-stat">🎯 Acertos: <strong id="m-hits">0</strong></div>
            <div class="t-stat">❌ Perdidos: <strong id="m-misses">0</strong></div>
            <div class="t-stat">⚡ Reação: <strong id="m-reaction">0ms</strong></div>
          </div>

          <div class="balloon-game-arena" id="balloon-arena">
            <div id="balloon-start-overlay" class="balloon-overlay">
              <span class="overlay-icon">🎈</span>
              <h3 class="mb-1">Ritmo: ${speedCfg.label}</h3>
              <p class="mb-2">Clique em iniciar e acerte os balões rapidamente!</p>
              <button class="btn btn-primary" id="btn-start-balloon-game">🚀 Iniciar Partida</button>
            </div>
          </div>
          
          <div id="mouse-result-card" class="lab-result-card screen-hidden"></div>
        </div>
      </div>
    `;

    const arena = document.getElementById('balloon-arena');
    document.getElementById('btn-start-balloon-game').addEventListener('click', () => {
      document.getElementById('balloon-start-overlay').classList.add('screen-hidden');
      startGame();
    });

    function startGame() {
      gameActive = true;
      arena.addEventListener('click', (e) => { if (gameActive && e.target === arena) { misses++; updateStats(); } });
      gameTimer = setInterval(() => {
        timeLeft--; document.getElementById('m-time').textContent = timeLeft + 's';
        if (timeLeft <= 0) endGame();
      }, 1000);
      spawnBalloon();
      spawnTimer = setInterval(spawnBalloon, speedCfg.spawnMs);
    }

    function spawnBalloon() {
      if (!gameActive) return;
      const b = document.createElement('div');
      b.className = 'balloon-target';
      const c = ['#ef4444', '#0984e3', '#00b894', '#e17055', '#6c5ce7', '#fd79a8'];
      b.style.background = c[Math.floor(Math.random() * c.length)];
      
      const maxX = arena.clientWidth - 70; const maxY = arena.clientHeight - 70;
      b.style.left = Math.floor(Math.random() * Math.max(1, maxX)) + 'px';
      b.style.top = Math.floor(Math.random() * Math.max(1, maxY)) + 'px';
      
      const spawnTime = Date.now();
      b.addEventListener('click', (e) => {
        e.stopPropagation(); if (!gameActive) return;
        reactionTimes.push(Date.now() - spawnTime); hits++; updateStats();
        b.style.transform = 'scale(1.5)'; b.style.opacity = '0';
        setTimeout(() => b.remove(), 150);
      });
      arena.appendChild(b);
      setTimeout(() => { if (b.parentNode === arena) { b.remove(); if (gameActive) { misses++; updateStats(); } } }, speedCfg.lifetimeMs);
    }

    function updateStats() {
      document.getElementById('m-hits').textContent = hits;
      document.getElementById('m-misses').textContent = misses;
      const avg = reactionTimes.length ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0;
      document.getElementById('m-reaction').textContent = avg + 'ms';
    }

    function endGame() {
      gameActive = false; clearInterval(gameTimer); clearInterval(spawnTimer); arena.innerHTML = '';
      const acc = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;
      const avg = reactionTimes.length ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0;

      const data = loadLabData();
      data.mouse.bestHits = Math.max(data.mouse.bestHits || 0, hits);
      data.mouse.bestAccuracy = Math.max(data.mouse.bestAccuracy || 0, acc);
      data.mouse.bestReactionMs = data.mouse.bestReactionMs ? Math.min(data.mouse.bestReactionMs, avg || 999) : avg;
      saveLabData(data);

      const res = document.getElementById('mouse-result-card');
      res.classList.remove('screen-hidden');
      res.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">🏆</span>
          <h3>Fim do Tempo!</h3>
          <p class="text-muted mb-2">Ótimo reflexo e domínio do clique do mouse.</p>
          <div class="result-stats-grid">
            <div class="r-item"><span class="r-val">${hits}</span><span class="r-lbl">Acertos</span></div>
            <div class="r-item"><span class="r-val">${acc}%</span><span class="r-lbl">Precisão</span></div>
            <div class="r-item"><span class="r-val">${misses}</span><span class="r-lbl">Perdidos</span></div>
            <div class="r-item"><span class="r-val">${avg}ms</span><span class="r-lbl">Reação</span></div>
          </div>
          <div class="d-flex gap-2 justify-content-center mt-3">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, '${speedMode}')">Jogar Novamente</button>
            <button class="btn btn-outline" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">Voltar</button>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 5. SIMULADOR 3 — DRAG & DROP
  // --------------------------------------------------------------------------
  function startDragDropSim(isInsideLesson = false) {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    let startTime = Date.now();
    let attemptsCount = 0; let correctCount = 0;
    const items = [
      { id: 'w1', name: 'Contrato.docx', icon: '📝', cat: 'doc' },
      { id: 'x1', name: 'Finanças.xlsx', icon: '📊', cat: 'xls' },
      { id: 'p1', name: 'Palestra.pptx', icon: '📽️', cat: 'ppt' },
      { id: 'w2', name: 'Microsoft Word', icon: '📝', cat: 'doc' },
      { id: 'x2', name: 'Microsoft Excel', icon: '📊', cat: 'xls' }
    ];

    container.innerHTML = `
      <div class="lab-simulator-wrapper">
        <div class="sim-control-bar">
          <div class="sim-control-left">
            <button class="btn btn-outline btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">🚪 Sair</button>
            <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startDragDropSim(${isInsideLesson})">🔄 Reiniciar</button>
          </div>
          <span class="badge badge-green" style="font-weight:700;">SIMULADOR 3 — DRAG & DROP</span>
        </div>

        <div class="lab-sim-workspace">
          <div>
            <h2 style="font-weight:800;margin:0 0 0.5rem;">📁 Desafio de Organização</h2>
            <p class="text-muted">Segure o clique e arraste cada item até a sua respectiva pasta.</p>
          </div>

          <div class="drag-source-container">
            <h5 style="margin:0 0 1rem; color:var(--color-text-primary);">📦 Arquivos Bagunçados:</h5>
            <div class="drag-items-flex">
              ${items.sort(() => Math.random() - 0.5).map(item => `
                <div class="drag-item-card" draggable="true" id="${item.id}" data-cat="${item.cat}">
                  <span>${item.icon}</span> <span>${item.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="drop-zones-grid">
            <div class="drop-zone-card" data-accept="doc"><div class="drop-zone-header">📝 <h5>Documentos (.docx)</h5></div><div class="drop-zone-body"></div></div>
            <div class="drop-zone-card" data-accept="xls"><div class="drop-zone-header">📊 <h5>Planilhas (.xlsx)</h5></div><div class="drop-zone-body"></div></div>
            <div class="drop-zone-card" data-accept="ppt"><div class="drop-zone-header">📽️ <h5>Apresentações (.pptx)</h5></div><div class="drop-zone-body"></div></div>
          </div>

          <div id="drag-result-card" class="lab-result-card screen-hidden"></div>
        </div>
      </div>
    `;

    let draggedEl = null;
    document.querySelectorAll('.drag-item-card').forEach(el => {
      el.addEventListener('dragstart', (e) => { draggedEl = el; el.classList.add('dragging'); });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
    });

    document.querySelectorAll('.drop-zone-card').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault(); zone.classList.remove('drag-over');
        if (!draggedEl) return;
        attemptsCount++;
        if (zone.getAttribute('data-accept') === draggedEl.getAttribute('data-cat')) {
          zone.querySelector('.drop-zone-body').appendChild(draggedEl);
          draggedEl.setAttribute('draggable', 'false'); draggedEl.classList.add('dropped-success');
          correctCount++;
          if (correctCount >= items.length) finishSim();
        } else {
          draggedEl.classList.add('dropped-error'); setTimeout(() => draggedEl.classList.remove('dropped-error'), 500);
        }
      });
    });

    function finishSim() {
      const elapsed = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      const acc = Math.round((items.length / attemptsCount) * 100);

      const data = loadLabData();
      data.dragDrop.bestAccuracy = Math.max(data.dragDrop.bestAccuracy || 0, acc);
      data.dragDrop.bestTimeSeconds = data.dragDrop.bestTimeSeconds ? Math.min(data.dragDrop.bestTimeSeconds, elapsed) : elapsed;
      saveLabData(data);

      const res = document.getElementById('drag-result-card');
      res.classList.remove('screen-hidden');
      res.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">📁</span>
          <h3>Organização Perfeita!</h3>
          <p class="text-muted mb-2">Excelente controle ao arrastar os itens.</p>
          <div class="result-stats-grid">
            <div class="r-item"><span class="r-val">${acc}%</span><span class="r-lbl">Precisão</span></div>
            <div class="r-item"><span class="r-val">${elapsed}s</span><span class="r-lbl">Tempo</span></div>
            <div class="r-item"><span class="r-val">${attemptsCount}</span><span class="r-lbl">Tentativas</span></div>
          </div>
          <div class="d-flex gap-2 justify-content-center mt-3">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startDragDropSim(${isInsideLesson})">Tentar Novamente</button>
            <button class="btn btn-outline" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">Voltar</button>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 6. SIMULADOR 4 — SELEÇÃO DE TEXTO
  // --------------------------------------------------------------------------
  function startTextSelectionSim(isInsideLesson = false) {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    const STEPS = [
      { step: 1, text: 'Selecione a palavra "Microsoft".', target: 'Microsoft' },
      { step: 2, text: 'Selecione o segundo parágrafo inteiro.', target: 'O Pacote Office reúne as ferramentas mais importantes para o mercado.' }
    ];
    let curr = 0; let start = Date.now(); let attempts = 0;

    function renderStep() {
      container.innerHTML = `
        <div class="lab-simulator-wrapper">
          <div class="sim-control-bar">
            <div class="sim-control-left">
              <button class="btn btn-outline btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">🚪 Sair</button>
              <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startTextSelectionSim(${isInsideLesson})">🔄 Reiniciar</button>
            </div>
            <span class="badge badge-orange" style="font-weight:700;">SIMULADOR 4 — SELEÇÃO (${curr + 1}/${STEPS.length})</span>
          </div>

          <div class="lab-sim-workspace">
            <div>
              <h2 style="font-weight:800;margin:0 0 0.5rem;">🔍 Treino de Seleção de Texto</h2>
              <p class="text-muted">Use o botão esquerdo para arrastar e selecionar.</p>
            </div>

            <div class="selection-task-banner">
              <span class="task-step">Tarefa da Etapa ${curr + 1}:</span>
              <span class="task-text">${STEPS[curr].text}</span>
            </div>

            <div class="selection-text-box">
              <p>Aprender a selecionar textos corretamente é fundamental. A palavra <strong>Microsoft</strong> é uma referência mundial em tecnologia.</p>
              <p class="mt-1">O Pacote Office reúne as ferramentas mais importantes para o mercado.</p>
            </div>

            <button class="btn btn-primary align-self-start" id="btn-check-sel">✅ Verificar Seleção Atual</button>
            <div id="selection-feedback-box" class="mt-1"></div>
            
            <div id="selection-result-card" class="lab-result-card screen-hidden"></div>
          </div>
        </div>
      `;

      document.getElementById('btn-check-sel').addEventListener('click', () => {
        attempts++;
        const sel = window.getSelection().toString().trim();
        const fb = document.getElementById('selection-feedback-box');
        if (sel === STEPS[curr].target) {
          fb.innerHTML = `<div class="alert alert-success border-0">✅ Excelente! Seleção perfeita.</div>`;
          setTimeout(() => {
            curr++; if (curr < STEPS.length) renderStep(); else finishSim();
          }, 1000);
        } else {
          fb.innerHTML = `<div class="alert alert-danger border-0">❌ Seleção incorreta. Tente exatamente: "${STEPS[curr].target}"</div>`;
        }
      });
    }
    
    renderStep();

    function finishSim() {
      const elapsed = Math.max(1, Math.floor((Date.now() - start) / 1000));
      const acc = Math.round((STEPS.length / attempts) * 100);

      const data = loadLabData();
      data.textSelection.bestAccuracy = Math.max(data.textSelection.bestAccuracy || 0, acc);
      data.textSelection.bestTimeSeconds = data.textSelection.bestTimeSeconds ? Math.min(data.textSelection.bestTimeSeconds, elapsed) : elapsed;
      saveLabData(data);

      const res = document.getElementById('selection-result-card');
      res.classList.remove('screen-hidden');
      res.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">🎯</span>
          <h3>Mestre da Seleção!</h3>
          <p class="text-muted mb-2">Habilidade fundamental dominada.</p>
          <div class="result-stats-grid">
            <div class="r-item"><span class="r-val">${acc}%</span><span class="r-lbl">Precisão</span></div>
            <div class="r-item"><span class="r-val">${elapsed}s</span><span class="r-lbl">Tempo</span></div>
            <div class="r-item"><span class="r-val">${attempts}</span><span class="r-lbl">Tentativas</span></div>
          </div>
          <div class="d-flex gap-2 justify-content-center mt-3">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startTextSelectionSim(${isInsideLesson})">Tentar Novamente</button>
            <button class="btn btn-outline" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">Voltar</button>
          </div>
        </div>
      `;
    }
  }

  function clearDataPrompt(isInsideLesson = false) {
    if (confirm("Deseja apagar o histórico local de treinos?")) {
      resetLabData(); renderLabPanel(getLabContainer(isInsideLesson), { isInsideLesson });
    }
  }

  root.InforMestreTrainingLab = {
    loadLabData, saveLabData, resetLabData, getLabContainer,
    renderLabPanel, startTypingSim, startMouseSim, startDragDropSim, startTextSelectionSim, clearDataPrompt
  };
})(typeof window !== 'undefined' ? window : this);
