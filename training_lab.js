// ============================================================================
// INFORMESTRE — CENTRO DE TREINAMENTO & LABORATÓRIO DE INFORMÁTICA (LOCALHOST ONLY)
// ============================================================================
// Módulo de treino de habilidades básicas: Digitação, Precisão do Mouse,
// Arrastar e Soltar (Drag & Drop) e Seleção de Texto.
// Incorporável dentro das Aulas do Módulo 2 (como slide/etapa) e no Hub.
// Adaptado com níveis acessíveis e realistas para alunos iniciantes em informática!
// Persistência 100% via localStorage. Sem APIs externas / Supabase / Deploy.
// ============================================================================

(function (root) {
  const LOCAL_STORAGE_KEY = 'informestre_training_lab_v1';

  // --------------------------------------------------------------------------
  // 1. GERENCIAMENTO DE ESTADO E PERSISTÊNCIA LOCAL
  // --------------------------------------------------------------------------
  function getDefaultData() {
    return {
      typing: {
        attempts: [],
        bestWpm: 0,
        bestAccuracy: 0,
        lastRun: null
      },
      mouse: {
        attempts: [],
        bestHits: 0,
        bestAccuracy: 0,
        bestReactionMs: 0,
        lastRun: null
      },
      dragDrop: {
        attempts: [],
        bestAccuracy: 0,
        bestTimeSeconds: 0,
        lastRun: null
      },
      textSelection: {
        attempts: [],
        bestAccuracy: 0,
        bestTimeSeconds: 0,
        lastRun: null
      }
    };
  }

  function loadLabData() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return getDefaultData();
      const parsed = JSON.parse(raw);
      return { ...getDefaultData(), ...parsed };
    } catch (e) {
      console.warn('[TrainingLab] Erro ao carregar dados do localStorage:', e);
      return getDefaultData();
    }
  }

  function saveLabData(data) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('[TrainingLab] Erro ao salvar dados no localStorage:', e);
    }
  }

  function resetLabData() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  // --------------------------------------------------------------------------
  // 2. COMPONENTES DO DASHBOARD DO TREINAMENTO (LAYOUT COMPACTO E ELEGANTE)
  // --------------------------------------------------------------------------
  function renderLabPanel(container, options = {}) {
    if (!container) return;
    const data = loadLabData();
    const isInsideLesson = !!options.isInsideLesson;

    container.innerHTML = `
      <div class="lab-dashboard-container compact-mode">
        <!-- CABEÇALHO COMPACTO DO LABORATÓRIO -->
        <div class="lab-header-banner compact">
          <div class="lab-header-info">
            <span class="lab-badge">🧪 CENTRO DE TREINAMENTO — PRÁTICA PARA INICIANTES</span>
            <h2>${isInsideLesson ? 'Simuladores Práticos — Aula 1' : 'Laboratório de Informática'}</h2>
            <p class="text-muted text-small">Desenvolva sua digitação no seu próprio ritmo, coordenação com o mouse e organização de arquivos.</p>
          </div>
          <div class="lab-header-badge-icon">🎯</div>
        </div>

        <!-- RELATÓRIO RÁPIDO COMPACTO — MEU DESEMPENHO -->
        <div class="lab-performance-summary-card compact">
          <div class="lab-summary-header">
            <h4>📊 Resumo do Meu Desempenho Local</h4>
            <button class="btn btn-secondary btn-xs" onclick="InforMestreTrainingLab.clearDataPrompt(${isInsideLesson})">
              🔄 Resetar Histórico
            </button>
          </div>
          <div class="lab-stats-grid compact-grid mt-1">
            <div class="lab-stat-box purple compact">
              <div class="stat-top"><span class="stat-icon">⌨️</span> <strong>${data.typing.bestWpm} PPM</strong></div>
              <div class="stat-label">Digitação</div>
              <div class="stat-sub">Precisão: ${data.typing.bestAccuracy}%</div>
            </div>

            <div class="lab-stat-box blue compact">
              <div class="stat-top"><span class="stat-icon">🎈</span> <strong>${data.mouse.bestHits} acertos</strong></div>
              <div class="stat-label">Mouse (Balões)</div>
              <div class="stat-sub">Reação: ${data.mouse.bestReactionMs || 0}ms</div>
            </div>

            <div class="lab-stat-box green compact">
              <div class="stat-top"><span class="stat-icon">📁</span> <strong>${data.dragDrop.bestAccuracy}%</strong></div>
              <div class="stat-label">Arrastar & Soltar</div>
              <div class="stat-sub">Tempo: ${data.dragDrop.bestTimeSeconds || 0}s</div>
            </div>

            <div class="lab-stat-box orange compact">
              <div class="stat-top"><span class="stat-icon">🎯</span> <strong>${data.textSelection.bestAccuracy}%</strong></div>
              <div class="stat-label">Seleção de Texto</div>
              <div class="stat-sub">Tempo: ${data.textSelection.bestTimeSeconds || 0}s</div>
            </div>
          </div>
        </div>

        <!-- GRADE 2X2 COMPACTA DE SIMULADORES -->
        <h4 class="mt-2 mb-1" style="color: var(--text-primary);">🎮 Selecione um Simulador para Treinar:</h4>
        <div class="lab-simulators-grid compact-grid-2x2">
          
          <!-- SIMULADOR 1: TESTE DE DIGITAÇÃO -->
          <div class="lab-sim-card compact">
            <div class="sim-card-top purple-theme compact">
              <span class="sim-icon">⌨️</span>
              <span class="sim-tag">SIMULADOR 1</span>
            </div>
            <div class="sim-card-body compact">
              <h4>Treino de Digitação</h4>
              <p class="text-small">Treine frases simples do dia a dia no teclado. Escolha o ritmo ideal para você!</p>
              
              <div class="sim-meta-box compact">
                <div><strong>Melhor resultado:</strong> ${data.typing.bestWpm ? data.typing.bestWpm + ' PPM (' + data.typing.bestAccuracy + '%)' : 'Não realizado'}</div>
              </div>

              <button class="btn btn-primary btn-sm btn-full mt-1" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson})">
                ▶️ Iniciar Digitação
              </button>
            </div>
          </div>

          <!-- SIMULADOR 2: COORDENAÇÃO COM O MOUSE -->
          <div class="lab-sim-card compact">
            <div class="sim-card-top blue-theme compact">
              <span class="sim-icon">🎈</span>
              <span class="sim-tag">SIMULADOR 2</span>
            </div>
            <div class="sim-card-body compact">
              <h4>Coordenação com o Mouse</h4>
              <p class="text-small">Jogo "Estoura Balões": Treine mirar e clicar em alvos na tela com velocidade adaptável.</p>
              
              <div class="sim-meta-box compact">
                <div><strong>Melhor resultado:</strong> ${data.mouse.bestHits ? data.mouse.bestHits + ' acertos (' + data.mouse.bestAccuracy + '%)' : 'Não realizado'}</div>
              </div>

              <button class="btn btn-primary btn-sm btn-full mt-1" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson})">
                ▶️ Iniciar Estoura Balões
              </button>
            </div>
          </div>

          <!-- SIMULADOR 3: ARRASTAR E SOLTAR -->
          <div class="lab-sim-card compact">
            <div class="sim-card-top green-theme compact">
              <span class="sim-icon">📁</span>
              <span class="sim-tag">SIMULADOR 3</span>
            </div>
            <div class="sim-card-body compact">
              <h4>Arrastar e Soltar (Drag & Drop)</h4>
              <p class="text-small">Organize programas do Office e arquivos em suas pastas correspondentes.</p>
              
              <div class="sim-meta-box compact">
                <div><strong>Melhor resultado:</strong> ${data.dragDrop.bestAccuracy ? data.dragDrop.bestAccuracy + '% precisão' : 'Não realizado'}</div>
              </div>

              <button class="btn btn-primary btn-sm btn-full mt-1" onclick="InforMestreTrainingLab.startDragDropSim(${isInsideLesson})">
                ▶️ Iniciar Drag & Drop
              </button>
            </div>
          </div>

          <!-- SIMULADOR 4: SELEÇÃO DE TEXTO -->
          <div class="lab-sim-card compact">
            <div class="sim-card-top orange-theme compact">
              <span class="sim-icon">🔍</span>
              <span class="sim-tag">SIMULADOR 4</span>
            </div>
            <div class="sim-card-body compact">
              <h4>Seleção de Texto</h4>
              <p class="text-small">Aprenda a selecionar palavras, parágrafos e frases com o botão do mouse.</p>
              
              <div class="sim-meta-box compact">
                <div><strong>Melhor resultado:</strong> ${data.textSelection.bestAccuracy ? data.textSelection.bestAccuracy + '% precisão' : 'Não realizado'}</div>
              </div>

              <button class="btn btn-primary btn-sm btn-full mt-1" onclick="InforMestreTrainingLab.startTextSelectionSim(${isInsideLesson})">
                ▶️ Iniciar Seleção
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // Helper para obter o contêiner de renderização (dentro da aula ou no Hub)
  function getLabContainer(isInsideLesson) {
    if (isInsideLesson) {
      return document.getElementById('lms-lesson-simulators-panel') || document.getElementById('hub-main-panel-content');
    }
    return document.getElementById('hub-main-panel-content');
  }

  // --------------------------------------------------------------------------
  // 3. SIMULADOR 1 — TESTE DE DIGITAÇÃO REALISTA PARA INICIANTES
  // --------------------------------------------------------------------------
  const TYPING_LEVELS = [
    {
      id: "easy",
      name: "🌱 Nível 1: Iniciante (Frase Curta)",
      desc: "Frase curta e fácil. Ideal para quem está aprendendo as posições do teclado!",
      text: "O Microsoft Word é um programa para digitar textos."
    },
    {
      id: "medium",
      name: "🌿 Nível 2: Prático (Frase do Dia a Dia)",
      desc: "Excelente para praticar palavras comuns do uso de escritórios.",
      text: "Com o Word podemos criar cartas, currículos e trabalhos."
    },
    {
      id: "hard",
      name: "🌳 Nível 3: Completo (Documento)",
      desc: "Para treinar frases mais longas com pontuação profissional.",
      text: "O Microsoft Word é uma das ferramentas mais importantes do pacote Office."
    }
  ];

  function startTypingSim(isInsideLesson = false, levelId = 'easy') {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    const currentLevel = TYPING_LEVELS.find(l => l.id === levelId) || TYPING_LEVELS[0];
    const sampleText = currentLevel.text;

    let startTime = null;
    let timerInterval = null;
    let elapsedSeconds = 0;
    let isFinished = false;

    container.innerHTML = `
      <div class="lab-simulator-wrapper">
        <!-- BARRA SUPERIOR FIXA DE CONTROLES DO SIMULADOR -->
        <div class="sim-control-bar">
          <div class="sim-control-left">
            <button class="btn btn-secondary btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">
              🚪 Sair do Simulador
            </button>
            <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson}, '${levelId}')">
              🔄 Reiniciar Digitação
            </button>
          </div>
          <span class="badge badge-purple">SIMULADOR 1 — DIGITAÇÃO</span>
        </div>

        <div class="lab-sim-workspace mt-2">
          <h2>⌨️ Treino de Digitação para Iniciantes</h2>
          <p class="text-muted text-small">${currentLevel.desc}</p>

          <!-- SELETOR DE NÍVEL DE DIFICULDADE -->
          <div class="typing-level-selector mt-1">
            ${TYPING_LEVELS.map(lvl => `
              <button class="btn btn-sm ${lvl.id === levelId ? 'btn-primary' : 'btn-secondary'}" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson}, '${lvl.id}')">
                ${lvl.name.split(':')[0]}
              </button>
            `).join('')}
          </div>

          <div class="alert alert-info mt-2 text-small p-1" style="display:flex; align-items:center; gap:0.5rem;">
            <span>💡 <strong>Dica amigável:</strong> Digite com calma, no seu próprio ritmo! Não se preocupe com o tempo.</span>
          </div>

          <div class="typing-stats-bar mt-2">
            <div class="t-stat">⏱️ Tempo: <strong id="t-time">0s</strong></div>
            <div class="t-stat">⚡ Velocidade: <strong id="t-wpm">0 PPM</strong></div>
            <div class="t-stat">🎯 Precisão: <strong id="t-accuracy">100%</strong></div>
            <div class="t-stat">❌ Erros: <strong id="t-errors">0</strong></div>
          </div>

          <!-- CAIXA DE TEXTO ALVO DE CÓPIA -->
          <div class="typing-display-box mt-2" id="typing-display-box">
            ${sampleText.split('').map((char, i) => `<span class="char-span char-pending" id="c-${i}">${char === ' ' ? '&nbsp;' : char}</span>`).join('')}
          </div>

          <!-- ÁREA DE DIGITAÇÃO DO ALUNO -->
          <div class="form-group-custom mt-2">
            <textarea id="typing-input-field" rows="2" class="input-custom typing-textarea" placeholder="Clique aqui e comece a digitar o texto acima no seu ritmo..."></textarea>
          </div>

          <div id="typing-result-card" class="lab-result-card screen-hidden mt-2"></div>
        </div>
      </div>
    `;

    const inputEl = document.getElementById('typing-input-field');
    if (!inputEl) return;
    inputEl.focus();

    inputEl.addEventListener('input', () => {
      if (isFinished) return;
      const typed = inputEl.value;

      if (!startTime && typed.length > 0) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
          elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
          document.getElementById('t-time').textContent = elapsedSeconds + 's';
          updateTypingMetrics(typed);
        }, 500);
      }

      updateTypingMetrics(typed);

      if (typed.length >= sampleText.length) {
        isFinished = true;
        clearInterval(timerInterval);
        finishTypingSim(typed, elapsedSeconds || 1);
      }
    });

    function updateTypingMetrics(typed) {
      let errors = 0;
      const totalChars = sampleText.length;

      for (let i = 0; i < totalChars; i++) {
        const span = document.getElementById(`c-${i}`);
        if (!span) continue;

        if (i < typed.length) {
          if (typed[i] === sampleText[i]) {
            span.className = 'char-span char-correct';
          } else {
            span.className = 'char-span char-wrong';
            errors++;
          }
        } else if (i === typed.length) {
          span.className = 'char-span char-pending char-current';
        } else {
          span.className = 'char-span char-pending';
        }
      }

      const accuracy = typed.length > 0 ? Math.max(0, Math.round(((typed.length - errors) / typed.length) * 100)) : 100;
      const minutes = Math.max(0.1, elapsedSeconds / 60);
      const wpm = Math.round((typed.length / 5) / minutes);

      document.getElementById('t-errors').textContent = errors;
      document.getElementById('t-accuracy').textContent = accuracy + '%';
      document.getElementById('t-wpm').textContent = wpm + ' PPM';
    }

    function finishTypingSim(typed, timeSec) {
      let errors = 0;
      let incorrect = 0;
      let omitted = 0;

      for (let i = 0; i < sampleText.length; i++) {
        if (i < typed.length) {
          if (typed[i] !== sampleText[i]) {
            errors++;
            incorrect++;
          }
        } else {
          omitted++;
        }
      }

      const accuracy = Math.max(0, Math.round(((sampleText.length - errors) / sampleText.length) * 100));
      const minutes = timeSec / 60;
      const wpm = Math.round((sampleText.length / 5) / minutes);
      const cpm = Math.round(sampleText.length / minutes);

      const data = loadLabData();
      const runRecord = {
        date: new Date().toISOString(),
        levelId: levelId,
        timeSeconds: timeSec,
        wpm: wpm,
        cpm: cpm,
        accuracy: accuracy,
        errors: errors
      };

      data.typing.attempts.push(runRecord);
      data.typing.bestWpm = Math.max(data.typing.bestWpm || 0, wpm);
      data.typing.bestAccuracy = Math.max(data.typing.bestAccuracy || 0, accuracy);
      data.typing.lastRun = runRecord;
      saveLabData(data);

      const resultBox = document.getElementById('typing-result-card');
      resultBox.classList.remove('screen-hidden');
      resultBox.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">🎉</span>
          <h3>Parabéns! Texto Concluído com Sucesso!</h3>
          <p class="text-muted">Você completou o texto no seu próprio ritmo. Cada prática melhora sua agilidade!</p>
          
          <div class="result-stats-grid mt-2">
            <div class="r-item">
              <span class="r-val">${wpm}</span>
              <span class="r-lbl">Palavras/Minuto (PPM)</span>
            </div>
            <div class="r-item">
              <span class="r-val">${accuracy}%</span>
              <span class="r-lbl">Precisão</span>
            </div>
            <div class="r-item">
              <span class="r-val">${timeSec}s</span>
              <span class="r-lbl">Tempo Total</span>
            </div>
            <div class="r-item">
              <span class="r-val">${errors}</span>
              <span class="r-lbl">Erros Ajustados</span>
            </div>
          </div>

          <div class="mt-3 flex-gap-center">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startTypingSim(${isInsideLesson}, '${levelId}')">🔄 Refazer Este Nível</button>
            <button class="btn btn-secondary" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">📋 Ver Painel de Treinos</button>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 4. SIMULADOR 2 — COORDENAÇÃO COM O MOUSE (COM RITMO ADAPTÁVEL)
  // --------------------------------------------------------------------------
  function startMouseSim(isInsideLesson = false, speedMode = 'easy') {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    // Configurações de velocidade adaptadas
    const speeds = {
      easy: { spawnMs: 1500, lifetimeMs: 3600, label: '🌱 Calmo (Recomendado para Iniciantes)' },
      medium: { spawnMs: 1100, lifetimeMs: 2500, label: '🌿 Normal' },
      hard: { spawnMs: 800, lifetimeMs: 1800, label: '🌳 Rápido' }
    };
    const speedCfg = speeds[speedMode] || speeds.easy;

    let hits = 0;
    let misses = 0;
    let reactionTimes = [];
    let gameTimer = null;
    let spawnTimer = null;
    let timeLeft = 25;
    let gameActive = false;

    container.innerHTML = `
      <div class="lab-simulator-wrapper">
        <!-- BARRA SUPERIOR FIXA DE CONTROLES DO SIMULADOR -->
        <div class="sim-control-bar">
          <div class="sim-control-left">
            <button class="btn btn-secondary btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">
              🚪 Sair do Simulador
            </button>
            <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, '${speedMode}')">
              🔄 Reiniciar Balões
            </button>
          </div>
          <span class="badge badge-blue">SIMULADOR 2 — COORDENAÇÃO DE MOUSE</span>
        </div>

        <div class="lab-sim-workspace mt-2">
          <h2>🎈 Jogo Estoura Balões — Agilidade do Mouse</h2>
          <p class="text-muted text-small">Clique nos balões que surgirem no quadro. Escolha o ritmo mais confortável para você!</p>

          <!-- SELETOR DE VELOCIDADE -->
          <div class="typing-level-selector mt-1">
            <button class="btn btn-sm ${speedMode === 'easy' ? 'btn-primary' : 'btn-secondary'}" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, 'easy')">🌱 Calmo (Iniciante)</button>
            <button class="btn btn-sm ${speedMode === 'medium' ? 'btn-primary' : 'btn-secondary'}" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, 'medium')">🌿 Normal</button>
            <button class="btn btn-sm ${speedMode === 'hard' ? 'btn-primary' : 'btn-secondary'}" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, 'hard')">🌳 Rápido</button>
          </div>

          <div class="typing-stats-bar mt-2">
            <div class="t-stat">⏱️ Tempo Restante: <strong id="m-time">25s</strong></div>
            <div class="t-stat">🎯 Acertos: <strong id="m-hits">0</strong></div>
            <div class="t-stat">❌ Cliques Perdidos: <strong id="m-misses">0</strong></div>
            <div class="t-stat">⚡ Reação Média: <strong id="m-reaction">0ms</strong></div>
          </div>

          <div class="balloon-game-arena mt-2" id="balloon-arena">
            <div id="balloon-start-overlay" class="balloon-overlay">
              <span class="overlay-icon">🎈</span>
              <h3>Ritmo Selecionado: ${speedCfg.label}</h3>
              <p>Os balões permanecerão visíveis por mais tempo para você mirar com facilidade.</p>
              <button class="btn btn-primary mt-1" id="btn-start-balloon-game">🚀 Iniciar Partida (25s)</button>
            </div>
          </div>

          <div id="mouse-result-card" class="lab-result-card screen-hidden mt-2"></div>
        </div>
      </div>
    `;

    const arena = document.getElementById('balloon-arena');
    const startBtn = document.getElementById('btn-start-balloon-game');

    startBtn.addEventListener('click', () => {
      document.getElementById('balloon-start-overlay').classList.add('screen-hidden');
      startGame();
    });

    function startGame() {
      hits = 0;
      misses = 0;
      reactionTimes = [];
      timeLeft = 25;
      gameActive = true;

      arena.addEventListener('click', (e) => {
        if (!gameActive) return;
        if (e.target === arena) {
          misses++;
          updateMouseStats();
        }
      });

      gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('m-time').textContent = timeLeft + 's';
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);

      spawnBalloon();
      spawnTimer = setInterval(spawnBalloon, speedCfg.spawnMs);
    }

    function spawnBalloon() {
      if (!gameActive) return;
      const balloon = document.createElement('div');
      balloon.className = 'balloon-target';
      
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.backgroundColor = color;
      balloon.style.boxShadow = `0 0 15px ${color}`;

      const maxX = arena.clientWidth - 70;
      const maxY = arena.clientHeight - 70;
      const posX = Math.floor(Math.random() * Math.max(1, maxX));
      const posY = Math.floor(Math.random() * Math.max(1, maxY));

      balloon.style.left = posX + 'px';
      balloon.style.top = posY + 'px';

      const spawnTime = Date.now();

      balloon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!gameActive) return;
        const reaction = Date.now() - spawnTime;
        reactionTimes.push(reaction);
        hits++;
        updateMouseStats();

        balloon.style.transform = 'scale(1.4)';
        balloon.style.opacity = '0';
        setTimeout(() => balloon.remove(), 150);
      });

      arena.appendChild(balloon);

      setTimeout(() => {
        if (balloon.parentNode === arena) {
          balloon.remove();
          if (gameActive) {
            misses++;
            updateMouseStats();
          }
        }
      }, speedCfg.lifetimeMs);
    }

    function updateMouseStats() {
      document.getElementById('m-hits').textContent = hits;
      document.getElementById('m-misses').textContent = misses;
      const avgMs = reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0;
      document.getElementById('m-reaction').textContent = avgMs + 'ms';
    }

    function endGame() {
      gameActive = false;
      clearInterval(gameTimer);
      clearInterval(spawnTimer);
      arena.innerHTML = '';

      const totalClicks = hits + misses;
      const accuracy = totalClicks > 0 ? Math.round((hits / totalClicks) * 100) : 0;
      const avgReaction = reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : 0;

      const data = loadLabData();
      const runRecord = {
        date: new Date().toISOString(),
        hits,
        misses,
        accuracy,
        avgReactionMs: avgReaction
      };

      data.mouse.attempts.push(runRecord);
      data.mouse.bestHits = Math.max(data.mouse.bestHits || 0, hits);
      data.mouse.bestAccuracy = Math.max(data.mouse.bestAccuracy || 0, accuracy);
      data.mouse.bestReactionMs = data.mouse.bestReactionMs ? Math.min(data.mouse.bestReactionMs, avgReaction || 999) : avgReaction;
      data.mouse.lastRun = runRecord;
      saveLabData(data);

      const resultBox = document.getElementById('mouse-result-card');
      resultBox.classList.remove('screen-hidden');
      resultBox.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">🏆</span>
          <h3>Desafio de Agilidade Concluído!</h3>
          <p class="text-muted">Ótimo trabalho de coordenação motora com o mouse!</p>

          <div class="result-stats-grid mt-2">
            <div class="r-item">
              <span class="r-val">${hits}</span>
              <span class="r-lbl">Balões Estourados</span>
            </div>
            <div class="r-item">
              <span class="r-val">${misses}</span>
              <span class="r-lbl">Cliques Perdidos</span>
            </div>
            <div class="r-item">
              <span class="r-val">${accuracy}%</span>
              <span class="r-lbl">Precisão</span>
            </div>
            <div class="r-item">
              <span class="r-val">${avgReaction}ms</span>
              <span class="r-lbl">Tempo Médio de Reação</span>
            </div>
          </div>

          <div class="mt-3 flex-gap-center">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startMouseSim(${isInsideLesson}, '${speedMode}')">🔄 Jogar Novamente</button>
            <button class="btn btn-secondary" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">📋 Ver Painel de Treinos</button>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 5. SIMULADOR 3 — ARRASTAR E SOLTAR (DRAG & DROP)
  // --------------------------------------------------------------------------
  function startDragDropSim(isInsideLesson = false) {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    let startTime = Date.now();
    let attemptsCount = 0;
    let correctCount = 0;

    const items = [
      { id: 'item-word', name: 'Microsoft Word', icon: '📝', category: 'text' },
      { id: 'item-excel', name: 'Microsoft Excel', icon: '📊', category: 'calc' },
      { id: 'item-ppt', name: 'Microsoft PowerPoint', icon: '📽️', category: 'pres' },
      { id: 'item-relatorio', name: 'relatorio.docx', icon: '📄', category: 'text' },
      { id: 'item-planilha', name: 'orcamento.xlsx', icon: '📈', category: 'calc' },
      { id: 'item-slides', name: 'apresentacao.pptx', icon: '🎬', category: 'pres' }
    ];

    container.innerHTML = `
      <div class="lab-simulator-wrapper">
        <!-- BARRA SUPERIOR FIXA DE CONTROLES DO SIMULADOR -->
        <div class="sim-control-bar">
          <div class="sim-control-left">
            <button class="btn btn-secondary btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">
              🚪 Sair do Simulador
            </button>
            <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startDragDropSim(${isInsideLesson})">
              🔄 Reiniciar Organização
            </button>
          </div>
          <span class="badge badge-green">SIMULADOR 3 — ARRASTAR E SOLTAR</span>
        </div>

        <div class="lab-sim-workspace mt-2">
          <h2>📁 Desafio de Organização — Drag and Drop</h2>
          <p class="text-muted text-small">Arraste cada item até a sua pasta de destino.</p>

          <div class="drag-source-container mt-2">
            <h4>📦 Itens para Organizar:</h4>
            <div class="drag-items-flex" id="drag-source-box">
              ${items.map(item => `
                <div class="drag-item-card" draggable="true" id="${item.id}" data-category="${item.category}">
                  <span class="drag-icon">${item.icon}</span>
                  <span class="drag-name">${item.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="drop-zones-grid mt-2">
            <div class="drop-zone-card" data-accept="text">
              <div class="drop-zone-header">
                <span class="z-icon">📝</span>
                <h5>Editores de Texto (.docx)</h5>
              </div>
              <div class="drop-zone-body" id="zone-text"></div>
            </div>

            <div class="drop-zone-card" data-accept="calc">
              <div class="drop-zone-header">
                <span class="z-icon">📊</span>
                <h5>Planilhas Eletrônicas (.xlsx)</h5>
              </div>
              <div class="drop-zone-body" id="zone-calc"></div>
            </div>

            <div class="drop-zone-card" data-accept="pres">
              <div class="drop-zone-header">
                <span class="z-icon">📽️</span>
                <h5>Apresentações (.pptx)</h5>
              </div>
              <div class="drop-zone-body" id="zone-pres"></div>
            </div>
          </div>

          <div id="drag-result-card" class="lab-result-card screen-hidden mt-2"></div>
        </div>
      </div>
    `;

    const draggableEls = document.querySelectorAll('.drag-item-card');
    const dropZones = document.querySelectorAll('.drop-zone-card');

    let draggedEl = null;

    draggableEls.forEach(el => {
      el.addEventListener('dragstart', (e) => {
        draggedEl = el;
        e.dataTransfer.setData('text/plain', el.id);
        el.classList.add('dragging');
      });

      el.addEventListener('dragend', () => {
        el.classList.remove('dragging');
      });
    });

    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (!draggedEl) return;

        attemptsCount++;
        const acceptCat = zone.getAttribute('data-accept');
        const itemCat = draggedEl.getAttribute('data-category');

        if (acceptCat === itemCat) {
          const body = zone.querySelector('.drop-zone-body');
          body.appendChild(draggedEl);
          draggedEl.setAttribute('draggable', 'false');
          draggedEl.classList.add('dropped-success');
          correctCount++;

          if (correctCount >= items.length) {
            finishDragDropSim(startTime, attemptsCount, correctCount, items.length);
          }
        } else {
          draggedEl.classList.add('dropped-error');
          setTimeout(() => draggedEl.classList.remove('dropped-error'), 600);
        }
      });
    });

    function finishDragDropSim(start, attempts, correct, total) {
      const elapsed = Math.max(1, Math.floor((Date.now() - start) / 1000));
      const accuracy = Math.round((correct / attempts) * 100);

      const data = loadLabData();
      const runRecord = {
        date: new Date().toISOString(),
        accuracy,
        timeSeconds: elapsed,
        attemptsCount: attempts
      };

      data.dragDrop.attempts.push(runRecord);
      data.dragDrop.bestAccuracy = Math.max(data.dragDrop.bestAccuracy || 0, accuracy);
      data.dragDrop.bestTimeSeconds = data.dragDrop.bestTimeSeconds ? Math.min(data.dragDrop.bestTimeSeconds, elapsed) : elapsed;
      data.dragDrop.lastRun = runRecord;
      saveLabData(data);

      const resultBox = document.getElementById('drag-result-card');
      resultBox.classList.remove('screen-hidden');
      resultBox.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">📁</span>
          <h3>Organização Concluída com Sucesso!</h3>
          <p class="text-muted">Você organizou todos os arquivos em suas pastas corretas.</p>

          <div class="result-stats-grid mt-2">
            <div class="r-item">
              <span class="r-val">${accuracy}%</span>
              <span class="r-lbl">Precisão de Encaixe</span>
            </div>
            <div class="r-item">
              <span class="r-val">${elapsed}s</span>
              <span class="r-lbl">Tempo de Execução</span>
            </div>
            <div class="r-item">
              <span class="r-val">${attempts}</span>
              <span class="r-lbl">Tentativas Realizadas</span>
            </div>
          </div>

          <div class="mt-3 flex-gap-center">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startDragDropSim(${isInsideLesson})">🔄 Recomeçar Desafio</button>
            <button class="btn btn-secondary" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">📋 Ver Painel de Treinos</button>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 6. SIMULADOR 4 — SELEÇÃO DE TEXTO
  // --------------------------------------------------------------------------
  const SELECTION_STEPS = [
    {
      step: 1,
      instruction: 'Selecione exatamente a palavra "Microsoft" no texto abaixo com o mouse.',
      target: 'Microsoft'
    },
    {
      step: 2,
      instruction: 'Selecione o segundo parágrafo inteiro do texto.',
      target: 'O Pacote Office reúne as ferramentas mais importantes para o mercado de trabalho.'
    },
    {
      step: 3,
      instruction: 'Selecione a primeira frase inteira (até o ponto final).',
      target: 'Aprender a selecionar textos corretamente é fundamental para formatar documentos.'
    }
  ];

  function startTextSelectionSim(isInsideLesson = false) {
    const container = getLabContainer(isInsideLesson);
    if (!container) return;

    let currentStepIdx = 0;
    let startTime = Date.now();
    let attemptsCount = 0;

    function renderStep() {
      const stepData = SELECTION_STEPS[currentStepIdx];
      container.innerHTML = `
        <div class="lab-simulator-wrapper">
          <!-- BARRA SUPERIOR FIXA DE CONTROLES DO SIMULADOR -->
          <div class="sim-control-bar">
            <div class="sim-control-left">
              <button class="btn btn-secondary btn-sm" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">
                🚪 Sair do Simulador
              </button>
              <button class="btn btn-primary btn-sm" onclick="InforMestreTrainingLab.startTextSelectionSim(${isInsideLesson})">
                🔄 Reiniciar Seleção
              </button>
            </div>
            <span class="badge badge-orange">SIMULADOR 4 — SELEÇÃO DE TEXTO (${stepData.step}/${SELECTION_STEPS.length})</span>
          </div>

          <div class="lab-sim-workspace mt-2">
            <h2>🎯 Treino de Seleção de Texto</h2>
            <p class="text-muted text-small">Use o botão esquerdo do mouse para arrastar e selecionar a parte solicitada.</p>

            <div class="selection-task-banner mt-2">
              <span class="task-step">Etapa ${stepData.step}:</span>
              <strong class="task-text">${stepData.instruction}</strong>
            </div>

            <div class="selection-text-box mt-2" id="selection-target-area">
              <p id="p-1">Aprender a selecionar textos corretamente é fundamental para formatar documentos. A palavra <strong>Microsoft</strong> é uma referência mundial em tecnologia.</p>
              <p id="p-2" class="mt-1">O Pacote Office reúne as ferramentas mais importantes para o mercado de trabalho.</p>
            </div>

            <div class="mt-2 flex-gap-center">
              <button class="btn btn-primary" id="btn-check-selection">
                ✅ Verificar Seleção Atual
              </button>
            </div>

            <div id="selection-feedback-box" class="mt-2 text-center"></div>

            <div id="selection-result-card" class="lab-result-card screen-hidden mt-2"></div>
          </div>
        </div>
      `;

      const checkBtn = document.getElementById('btn-check-selection');
      const feedbackBox = document.getElementById('selection-feedback-box');

      checkBtn.addEventListener('click', () => {
        attemptsCount++;
        const sel = window.getSelection();
        const selectedText = sel ? sel.toString().trim() : '';

        if (selectedText === stepData.target.trim()) {
          feedbackBox.innerHTML = `<div class="alert alert-success p-1">✅ EXCELENTE! Seleção perfeita. Avançando...</div>`;
          setTimeout(() => {
            currentStepIdx++;
            if (currentStepIdx < SELECTION_STEPS.length) {
              renderStep();
            } else {
              finishSelectionSim(startTime, attemptsCount);
            }
          }, 1200);
        } else if (selectedText.length === 0) {
          feedbackBox.innerHTML = `<div class="alert alert-warning p-1">⚠️ Você ainda não selecionou nenhum texto com o mouse. Clique e arraste para selecionar.</div>`;
        } else {
          feedbackBox.innerHTML = `<div class="alert alert-danger p-1">❌ Texto selecionado: "<em>${selectedText}</em>". Tente selecionar exatamente: "<strong>${stepData.target}</strong>".</div>`;
        }
      });
    }

    renderStep();

    function finishSelectionSim(start, attempts) {
      const elapsed = Math.max(1, Math.floor((Date.now() - start) / 1000));
      const accuracy = Math.round((SELECTION_STEPS.length / attempts) * 100);

      const data = loadLabData();
      const runRecord = {
        date: new Date().toISOString(),
        accuracy,
        timeSeconds: elapsed,
        attemptsCount: attempts
      };

      data.textSelection.attempts.push(runRecord);
      data.textSelection.bestAccuracy = Math.max(data.textSelection.bestAccuracy || 0, accuracy);
      data.textSelection.bestTimeSeconds = data.textSelection.bestTimeSeconds ? Math.min(data.textSelection.bestTimeSeconds, elapsed) : elapsed;
      data.textSelection.lastRun = runRecord;
      saveLabData(data);

      const resultBox = document.getElementById('selection-result-card');
      resultBox.classList.remove('screen-hidden');
      resultBox.innerHTML = `
        <div class="result-box-inner">
          <span class="result-trophy">🎯</span>
          <h3>Precisão de Seleção Aprovada!</h3>
          <p class="text-muted">Sua habilidade de seleção no mouse está afiada para criar e formatar documentos no Word!</p>

          <div class="result-stats-grid mt-2">
            <div class="r-item">
              <span class="r-val">${accuracy}%</span>
              <span class="r-lbl">Precisão</span>
            </div>
            <div class="r-item">
              <span class="r-val">${elapsed}s</span>
              <span class="r-lbl">Tempo Total</span>
            </div>
            <div class="r-item">
              <span class="r-val">${attempts}</span>
              <span class="r-lbl">Tentativas</span>
            </div>
          </div>

          <div class="mt-3 flex-gap-center">
            <button class="btn btn-primary" onclick="InforMestreTrainingLab.startTextSelectionSim(${isInsideLesson})">🔄 Refazer Treino</button>
            <button class="btn btn-secondary" onclick="InforMestreTrainingLab.renderLabPanel(InforMestreTrainingLab.getLabContainer(${isInsideLesson}), { isInsideLesson: ${isInsideLesson} })">📋 Ver Painel de Treinos</button>
          </div>
        </div>
      `;
    }
  }

  function clearDataPrompt(isInsideLesson = false) {
    if (confirm("Deseja realmente apagar todo o histórico local de treinos deste navegador?")) {
      resetLabData();
      renderLabPanel(getLabContainer(isInsideLesson), { isInsideLesson });
    }
  }

  const api = {
    loadLabData,
    saveLabData,
    resetLabData,
    getLabContainer,
    renderLabPanel,
    startTypingSim,
    startMouseSim,
    startDragDropSim,
    startTextSelectionSim,
    clearDataPrompt
  };

  root.InforMestreTrainingLab = api;
})(typeof window !== 'undefined' ? window : this);
