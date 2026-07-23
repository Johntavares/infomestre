/**
 * InforMestre - Laboratório Unificado 3D de Montagem e Configuração (Aula 8)
 * Desenvolvido de forma modular e integrada.
 */

(function () {
  let simState = {
    step: 1, // 1 a 10
    assemblyStep: 0, // Peças instaladas (0 a 10)
    placed: {}, // Peças encaixadas
    errors: 0,
    startTime: null,
    totalTime: 0,
    hasThermalPaste: false,
    biosBooted: false,
    osInstalled: false,
    driversUpdated: { chipset: false, video: false, net: false, audio: false },
    installedApps: { chrome: false, office: false, zip: false, pdf: false },
    filesOrganized: { backupMoved: false, tempCleaned: false, recycleBinEmptied: false },
    diagnosticsChecked: { ping: false, sound: false, temp: false }
  };

  const SOUNDS = {
    click: () => playSynthBeep(440, 0.05, "sine"),
    snap: () => playSynthBeep(880, 0.15, "triangle"),
    error: () => playSynthBeep(180, 0.3, "sawtooth"),
    success: () => {
      playSynthBeep(523.25, 0.1, "sine");
      setTimeout(() => playSynthBeep(659.25, 0.1, "sine"), 100);
      setTimeout(() => playSynthBeep(783.99, 0.1, "sine"), 200);
      setTimeout(() => playSynthBeep(1046.50, 0.25, "sine"), 300);
    },
    boot: () => {
      playSynthBeep(329.63, 0.2, "sine");
      setTimeout(() => playSynthBeep(392.00, 0.2, "sine"), 200);
      setTimeout(() => playSynthBeep(523.25, 0.2, "sine"), 400);
      setTimeout(() => playSynthBeep(659.25, 0.4, "sine"), 600);
    }
  };

  // Sintetizador Web Audio API (evita depender de arquivos de áudio externos)
  function playSynthBeep(frequency, duration, type = "sine") {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by browser user gesture policy.");
    }
  }

  // Definição das peças de Hardware
  const HARDWARE_PIECES = [
    { id: "cpu", title: "Processador (CPU)", icon: "🧠", color: "#fbbf24", desc: "O cérebro que executa cálculos e processa instruções.", detail: "Instale no soquete central da placa-mãe.", curio: "Os processadores modernos contêm bilhões de transistores microscópicos em um espaço menor que uma moeda.", error: "Colocar o processador na posição incorreta ou esquecer de travar a alavanca pode entortar os pinos do soquete." },
    { id: "paste", title: "Pasta Térmica", icon: "🧴", color: "#10b981", desc: "Composto condutor térmico que preenche micro-lacunas.", detail: "Aplique uma gota no topo do processador.", curio: "A pasta térmica não resfria a CPU; ela apenas remove o ar entre a CPU e o cooler, pois o ar é um péssimo condutor térmico.", error: "Não aplicar pasta térmica causará superaquecimento imediato e desligamento automático da máquina (thermal throttling)." },
    { id: "cooler", title: "Cooler do Processador", icon: "❄️", color: "#22d3ee", desc: "Dissipador de calor com ventoinha ativa.", detail: "Instale sobre a CPU e a pasta térmica.", curio: "Coolers de alta performance usam 'heat pipes' de cobre contendo fluido que evapora e condensa para transferir calor.", error: "Instalar o cooler sem conectar o cabo de energia (CPU_FAN) na placa-mãe fará com que a ventoinha não gire." },
    { id: "ram", title: "Memória RAM", icon: "💾", color: "#a78bfa", desc: "Armazenamento volátil rápido de trabalho para o sistema.", detail: "Encaixe nos slots verticais (DIMM).", curio: "RAM é de acesso aleatório, significando que o tempo de acesso a qualquer endereço é constante, independentemente de sua posição física.", error: "Não empurrar o módulo de RAM até ouvir o estalo das travas laterais fará com que o PC não ligue e emita beeps." },
    { id: "ssd", title: "Armazenamento SSD M.2", icon: "💿", color: "#60a5fa", desc: "Unidade de estado sólido ultra-rápida de armazenamento.", detail: "Encaixe no slot M.2 próximo à CPU.", curio: "SSDs M.2 NVMe conectam-se diretamente ao barramento PCI Express, alcançando velocidades até 50 vezes superiores a um HD comum.", error: "Esquecer de fixar o SSD com o pequeno parafuso traseiro fará com que ele se desloque e desconecte com a vibração." },
    { id: "motherboard", title: "Placa-mãe", icon: "🖥️", color: "#818cf8", desc: "A placa de circuito principal que interliga todos os componentes.", detail: "Instale no chassi do gabinete.", curio: "A placa-mãe possui dezenas de camadas internas de trilhas de cobre que conectam as peças em velocidades de gigabits.", error: "Parafusar a placa-mãe diretamente no chassi de metal sem os 'espaçadores' de bronze causará um curto-circuito fatal." },
    { id: "psu", title: "Fonte ATX", icon: "🔌", color: "#f87171", desc: "Conversor de energia elétrica da tomada para o PC.", detail: "Instale na base do gabinete.", curio: "Fontes modernas possuem certificação 80 Plus, garantindo que pelo menos 80% da energia consumida da tomada seja entregue ao PC.", error: "Configurar a chave seletora de voltagem manual (110V/220V) de forma errada pode explodir os fusíveis da fonte instantaneamente." },
    { id: "cables", title: "Conexão de Cabos", icon: "⚡", color: "#f59e0b", desc: "Cabos de energia (24 pinos / EPS) e dados SATA.", detail: "Ligue os cabos de alimentação da fonte aos conectores.", curio: "O conector principal de 24 pinos fornece linhas de energia estáveis de +3.3V, +5V e +12V para diferentes partes da placa-mãe.", error: "Inverter ou forçar conectores de energia da GPU (PCIe) no soquete da CPU (EPS) pode queimar os circuitos elétricos permanentes." },
    { id: "gpu", title: "Placa de Vídeo (GPU)", icon: "🎮", color: "#ec4899", desc: "Co-processador gráfico de alta potência para imagens e jogos.", detail: "Encaixe no slot PCI Express x16.", curio: "GPUs modernas têm milhares de mini-núcleos de processamento e sua própria memória ultra-rápida (VRAM) dedicada.", error: "Não encaixar os cabos de energia auxiliares da fonte (PCIe de 6 ou 8 pinos) na placa de vídeo impedirá que o sistema dê boot." },
    { id: "hd", title: "Disco Rígido (HD)", icon: "💽", color: "#3b82f6", desc: "Unidade de armazenamento mecânico secundário.", detail: "Encaixe na baia de discos e ligue os cabos.", curio: "Os pratos magnéticos internos de um HD comum giram a 7.200 RPM, e a agulha de leitura voa a nanômetros da superfície.", error: "Bater ou mover o HD portátil de forma brusca enquanto ele está gravando dados pode riscar os pratos e corromper os arquivos." }
  ];

  const APPS = [
    { id: "chrome", name: "Google Chrome", icon: "🌐", desc: "Navegador web rápido e seguro." },
    { id: "office", name: "LibreOffice", icon: "📄", desc: "Suite de escritório gratuita e de código aberto." },
    { id: "zip", name: "7-Zip", icon: "📦", desc: "Compactador e descompactador de arquivos avançado." },
    { id: "pdf", name: "PDF Reader", icon: "📕", desc: "Visualizador de documentos portáteis PDF." }
  ];

  // Injeção de Estilos CSS customizados do simulador (Fluent Design)
  const styles = `
    .unified-sim-wrapper {
      display: flex;
      width: 100%;
      height: 540px;
      background: #090915;
      border-radius: 16px;
      overflow: hidden;
      font-family: 'Inter', system-ui, sans-serif;
      color: #f3f4f6;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
    }
    
    .unified-sim-sidebar {
      width: 280px;
      background: rgba(18, 18, 35, 0.85);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      padding: 1rem;
      box-sizing: border-box;
      z-index: 10;
    }
    
    .unified-sim-main {
      flex: 1;
      position: relative;
      background: #06060c;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .fluent-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .fluent-subtitle {
      font-size: 0.76rem;
      color: rgba(255, 255, 255, 0.45);
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .checklist-container {
      flex: 1;
      overflow-y: auto;
      margin-bottom: 1rem;
    }

    .checklist-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      margin-bottom: 6px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.25s ease;
    }

    .checklist-item.active {
      background: rgba(131, 82, 255, 0.1);
      border-color: rgba(131, 82, 255, 0.35);
      color: #c084fc;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(131, 82, 255, 0.05);
    }

    .checklist-item.completed {
      background: rgba(16, 185, 129, 0.08);
      border-color: rgba(16, 185, 129, 0.25);
      color: #10b981;
    }

    .checklist-badge {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
    }

    .checklist-item.completed .checklist-badge {
      border-color: #10b981;
      background: #10b981;
      color: #fff;
    }

    .canvas-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .sim-overlay-ui {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.25rem;
      box-sizing: border-box;
    }

    .sim-interactive-element {
      pointer-events: auto;
    }

    .fluent-modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(15px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      box-sizing: border-box;
      padding: 2rem;
    }

    .fluent-modal {
      background: rgba(22, 22, 40, 0.88);
      border: 1px solid rgba(131, 82, 255, 0.25);
      border-radius: 16px;
      width: 100%;
      max-width: 460px;
      color: #fff;
      padding: 1.75rem;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.02);
      transform: scale(0.9);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .fluent-modal.active {
      transform: scale(1);
      opacity: 1;
    }

    .modal-tag {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      background: rgba(131, 82, 255, 0.15);
      color: #a78bfa;
      padding: 3px 8px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 0.75rem;
      border: 1px solid rgba(131, 82, 255, 0.3);
    }

    .modal-sec-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #a78bfa;
      margin: 12px 0 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .modal-sec-text {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
      line-height: 1.5;
      margin: 0;
    }

    .fluent-btn {
      width: 100%;
      padding: 10px 20px;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .fluent-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
    }

    .fluent-btn:active {
      transform: translateY(1px);
    }

    .fluent-btn:disabled {
      background: #374151;
      color: #9ca3af;
      cursor: not-allowed;
      box-shadow: none;
    }

    /* Peças Dock de Hardware */
    .hardware-dock {
      display: flex;
      gap: 8px;
      padding: 10px;
      background: rgba(18, 18, 30, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      backdrop-filter: blur(10px);
      overflow-x: auto;
      width: fit-content;
      max-width: 90%;
      margin: 0 auto;
      pointer-events: auto;
    }

    .dock-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 65px;
      user-select: none;
    }

    .dock-item:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(131, 82, 255, 0.3);
      transform: translateY(-2px);
    }

    .dock-item.selected {
      background: rgba(131, 82, 255, 0.25);
      border-color: #a78bfa;
      box-shadow: 0 0 15px rgba(167, 139, 250, 0.3);
    }

    .dock-item.installed {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Virtual Monitor Styles */
    .virtual-monitor-wrapper {
      width: 90%;
      height: 85%;
      margin: auto;
      background: #111;
      border: 12px solid #222;
      border-radius: 16px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      z-index: 10;
    }

    .virtual-screen {
      flex: 1;
      background: #000;
      position: relative;
      overflow: hidden;
      color: #fff;
    }

    /* Virtual OS Desktop Styles */
    .virtual-desktop {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(135deg, #1e1b4b 0%, #311042 50%, #030712 100%);
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .desktop-icons {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
      height: 80%;
      flex-wrap: wrap;
    }

    .desktop-icon {
      width: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      text-align: center;
      user-select: none;
      padding: 4px;
      border-radius: 6px;
      border: 1px solid transparent;
      transition: all 0.15s ease;
    }

    .desktop-icon:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .desktop-icon-img {
      font-size: 1.6rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }

    .desktop-icon-label {
      font-size: 0.65rem;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      font-weight: 600;
    }

    .virtual-taskbar {
      height: 36px;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(12px);
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 12px;
    }

    .start-button {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .start-button:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: scale(1.05);
    }

    .os-window {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 380px;
      height: 270px;
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: fluentWindowOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fluentWindowOpen {
      from { transform: translate(-50%, -40%) scale(0.95); opacity: 0; }
      to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }

    .os-window-header {
      height: 28px;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 0.7rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      user-select: none;
    }

    .os-window-close {
      font-size: 0.9rem;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.15s ease;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .os-window-close:hover {
      background: rgba(239, 68, 68, 0.8);
      color: #fff;
      opacity: 1;
    }

    .os-window-body {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      box-sizing: border-box;
      font-size: 0.75rem;
    }

    /* Fallback Pseudo-3D SVG */
    .pseudo-3d-workbench {
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, #1b1a32 0%, #0c0b16 100%);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .svg-case {
      width: 70%;
      height: 75%;
      filter: drop-shadow(0 15px 35px rgba(0,0,0,0.6));
    }

    /* Estilos do Dock de arrastar */
    .hardware-dock .dock-item {
      user-select: none;
      -webkit-user-select: none;
    }
    .hardware-dock .dock-item[draggable="true"]:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    .hardware-dock .dock-item[draggable="true"]:active {
      cursor: grabbing;
      transform: scale(0.95);
    }
    .hardware-dock .dock-item.installed {
      pointer-events: none;
    }
  `;

  // Função de carregamento das bibliotecas de animação e WebGL
  function loadDependencies() {
    return new Promise((resolve) => {
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
      ];
      
      let loaded = 0;
      const onScriptLoad = () => {
        loaded++;
        if (loaded === scripts.length) {
          // Após carregar o Three, tentamos carregar OrbitControls
          const scriptCtrl = document.createElement("script");
          scriptCtrl.src = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js";
          scriptCtrl.onload = () => resolve(true);
          scriptCtrl.onerror = () => resolve(false);
          document.head.appendChild(scriptCtrl);
        }
      };

      scripts.forEach(url => {
        // Evita carregar duas vezes
        if (url.includes("three.min.js") && window.THREE) {
          onScriptLoad();
          return;
        }
        if (url.includes("gsap.min.js") && window.gsap) {
          onScriptLoad();
          return;
        }

        const s = document.createElement("script");
        s.src = url;
        s.onload = onScriptLoad;
        s.onerror = () => {
          console.warn("Failed to load script: " + url + ". Fallback will be triggered.");
          resolve(false); // Ativa fallback
        };
        document.head.appendChild(s);
      });
    });
  }

  // Inicializador chamado a partir de app_v1.js
  window.initAula8UnifiedSimulator = async function (container, isReset) {
    if (isReset) {
      sessionStorage.removeItem("aula8_unified_state");
      simState = {
        step: 1,
        assemblyStep: 0,
        placed: {},
        errors: 0,
        startTime: Date.now(),
        totalTime: 0,
        hasThermalPaste: false,
        biosBooted: false,
        osInstalled: false,
        driversUpdated: { chipset: false, video: false, net: false, audio: false },
        installedApps: { chrome: false, office: false, zip: false, pdf: false },
        filesOrganized: { backupMoved: false, tempCleaned: false, recycleBinEmptied: false },
        diagnosticsChecked: { ping: false, sound: false, temp: false }
      };
    } else {
      const saved = sessionStorage.getItem("aula8_unified_state");
      if (saved) {
        simState = JSON.parse(saved);
      } else {
        simState.startTime = Date.now();
      }
    }

    // Injeta os estilos do simulador se necessário
    if (!document.getElementById("aula8-fluent-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "aula8-fluent-styles";
      styleEl.innerHTML = styles;
      document.head.appendChild(styleEl);
    }

    container.innerHTML = `
      <div class="unified-sim-wrapper">
        <!-- SIDEBAR DE PROGRESSO -->
        <div class="unified-sim-sidebar">
          <div class="fluent-title">💼 InforTech Soluções</div>
          <div class="fluent-subtitle">Técnico de Suporte Jr.</div>
          
          <div style="font-size:0.6rem;color:rgba(255,255,255,0.25);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">Ordem de Serviço #1094</div>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 12px;font-size:0.72rem;line-height:1.4;margin-bottom:1.25rem;">
            <span style="font-weight:600;color:#fbbf24;">Cliente:</span> Carlos Souza<br>
            <span style="font-weight:600;color:#f87171;">Relato:</span> "Meu computador não liga. Preciso dele funcionando hoje."
          </div>

          <div style="font-size:0.6rem;color:rgba(255,255,255,0.25);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">Lista de Tarefas</div>
          <div class="checklist-container" id="sim-checklist-render">
            <!-- Injetado dinamicamente -->
          </div>

          <div style="display:flex;gap:6px;margin-top:auto;">
            <div style="flex:1;background:rgba(255,255,255,0.03);border-radius:8px;padding:8px;text-align:center;">
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.3);">Erros</div>
              <div id="sim-error-counter" style="font-size:0.95rem;font-weight:800;color:#f87171;">${simState.errors}</div>
            </div>
            <div style="flex:1;background:rgba(255,255,255,0.03);border-radius:8px;padding:8px;text-align:center;">
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.3);">Fase</div>
              <div style="font-size:0.95rem;font-weight:800;color:#8352ff;" id="sim-step-indicator">${simState.step}/10</div>
            </div>
          </div>
        </div>

        <!-- ÁREA CENTRAL WORKSPACE -->
        <div class="unified-sim-main" id="sim-workspace-main">
          <!-- Três áreas possíveis: Canvas 3D, Virtual Monitor ou Fallback -->
          <div class="canvas-container" id="sim-canvas3d-container"></div>
          <div id="sim-fallback-container" style="display:none;width:100%;height:100%;"></div>
          <div id="sim-html-overlay" style="display:none;width:100%;height:100%;position:absolute;top:0;left:0;z-index:5;"></div>
          
          <!-- Camada de Interface de Elementos Hover/GUI -->
          <div class="sim-overlay-ui" id="sim-gui-overlay">
            <!-- Preenchido pelo motor da etapa -->
          </div>
        </div>

        <!-- MODAL ACENTUADO FLUIDO (EXPLICAÇÃO CONCEITUAL) -->
        <div class="fluent-modal-overlay" id="sim-modal-overlay" style="display:none;">
          <div class="fluent-modal" id="sim-modal-card">
            <!-- Conteúdo dinâmico -->
          </div>
        </div>
      </div>
    `;

    renderChecklist();
    runCurrentStep();
  };

  function saveLocalState() {
    sessionStorage.setItem("aula8_unified_state", JSON.stringify(simState));
  }

  function renderChecklist() {
    const checklist = document.getElementById("sim-checklist-render");
    if (!checklist) return;

    const items = [
      { step: 1, label: "1. Aceitar Ordem de Serviço" },
      { step: 2, label: "2. Preparar a Bancada" },
      { step: 3, label: "3. Montar Hardware 3D" },
      { step: 4, label: "4. Efetuar Primeiro Boot" },
      { step: 5, label: "5. Instalar o Windows 11" },
      { step: 6, label: "6. Configurar Drivers" },
      { step: 7, label: "7. Instalar Aplicativos" },
      { step: 8, label: "8. Organizar Arquivos" },
      { step: 9, label: "9. Executar Diagnóstico" },
      { step: 10, label: "10. Emitir Relatório Técnico" }
    ];

    checklist.innerHTML = items.map(it => {
      let statusClass = "";
      if (simState.step === it.step) statusClass = "active";
      else if (simState.step > it.step) statusClass = "completed";

      const badge = simState.step > it.step ? "✓" : it.step;

      return `
        <div class="checklist-item ${statusClass}">
          <div class="checklist-badge">${badge}</div>
          <div>${it.label}</div>
        </div>
      `;
    }).join("");
  }

  function runCurrentStep() {
    const errorEl = document.getElementById("sim-error-counter");
    if (errorEl) errorEl.textContent = simState.errors;
    
    document.getElementById("sim-step-indicator").textContent = `${simState.step}/10`;
    renderChecklist();

    const canvasContainer = document.getElementById("sim-canvas3d-container");
    const fallbackContainer = document.getElementById("sim-fallback-container");
    const htmlOverlay = document.getElementById("sim-html-overlay");
    const guiOverlay = document.getElementById("sim-gui-overlay");
    
    if (canvasContainer) {
      canvasContainer.innerHTML = "";
      canvasContainer.style.display = "none";
    }
    if (fallbackContainer) {
      fallbackContainer.innerHTML = "";
      fallbackContainer.style.display = "none";
    }
    if (htmlOverlay) {
      htmlOverlay.innerHTML = "";
      htmlOverlay.style.display = "none";
    }
    if (guiOverlay) {
      guiOverlay.innerHTML = "";
      guiOverlay.style.display = "none";
    }

    if (simState.step === 1) {
      renderStep1OrdemServico();
    } else if (simState.step === 2) {
      renderStep2Introducao();
    } else if (simState.step === 3) {
      renderStep3Assembly();
    } else {
      renderStepMonitorVirtual();
    }
  }

  function triggerModal(title, text, curio, errText, onDismiss) {
    SOUNDS.click();
    const overlay = document.getElementById("sim-modal-overlay");
    const card = document.getElementById("sim-modal-card");
    if (!overlay || !card) return;

    card.innerHTML = `
      <div class="modal-tag">📖 Aprendizado Técnico</div>
      <h3 style="margin:0 0 12px;font-size:1.15rem;font-weight:800;color:#fff;">${title}</h3>
      
      <div style="font-size:0.78rem;color:rgba(255,255,255,0.75);line-height:1.5;margin-bottom:12px;">
        ${text}
      </div>

      <div style="background:rgba(131,82,255,0.06);border:1px solid rgba(131,82,255,0.15);border-radius:10px;padding:10px;margin-bottom:10px;">
        <div class="modal-sec-title">💡 Curiosidade Profissional</div>
        <p class="modal-sec-text">${curio}</p>
      </div>

      <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:10px;padding:10px;margin-bottom:1.5rem;">
        <div class="modal-sec-title" style="color:#f87171;">⚠️ Erro Comum de Bancada</div>
        <p class="modal-sec-text">${errText}</p>
      </div>

      <button class="fluent-btn" id="modal-dismiss-btn">Entendi, vamos praticar! ➔</button>
    `;

    overlay.style.display = "flex";
    setTimeout(() => card.classList.add("active"), 50);

    const btn = document.getElementById("modal-dismiss-btn");
    btn.onclick = () => {
      card.classList.remove("active");
      setTimeout(() => {
        overlay.style.display = "none";
        if (onDismiss) onDismiss();
      }, 250);
    };
  }

  // ==========================================================================
  // ETAPA 1 — RECEBIMENTO DA ORDEM DE SERVIÇO
  // ==========================================================================
  function renderStep1OrdemServico() {
    const htmlOverlay = document.getElementById("sim-html-overlay");
    if (!htmlOverlay) return;
    
    const html = `
      <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:radial-gradient(circle at center, #1b1a32 0%, #090915 100%);">
        <div style="background:rgba(30,30,55,0.7);border:1px solid rgba(131,82,255,0.25);border-radius:16px;padding:2rem;max-width:440px;width:85%;backdrop-filter:blur(20px);box-shadow:0 20px 40px rgba(0,0,0,0.5);text-align:center;">
          <span style="font-size:3rem;display:block;margin-bottom:8px;filter:drop-shadow(0 0 10px rgba(124,58,237,0.4));">💼</span>
          <h3 style="color:#fff;margin:0 0 8px;font-size:1.3rem;">Nova Ordem de Serviço</h3>
          <p style="font-size:0.8rem;color:rgba(255,255,255,0.55);line-height:1.5;margin-bottom:1.5rem;">
            Você foi alocado para realizar a manutenção do computador pessoal de <strong>Carlos Souza</strong>. Siga os padrões técnicos da InforTech.
          </p>
          <div style="background:rgba(0,0,0,0.25);border-radius:10px;padding:12px;margin-bottom:1.5rem;text-align:left;font-size:0.75rem;border:1px solid rgba(255,255,255,0.04);">
            <div style="margin-bottom:4px;"><strong style="color:#fbbf24;">Cliente:</strong> Carlos Souza</div>
            <div style="margin-bottom:4px;"><strong style="color:#a78bfa;">Dispositivo:</strong> Desktop ATX Intel</div>
            <div style="margin-bottom:4px;"><strong style="color:#f87171;">Defeito:</strong> Sem sinal de energia.</div>
            <div><strong style="color:#22d3ee;">Diagnóstico Inicial:</strong> Placa-mãe antiga queimada por surto de energia. O cliente solicitou a montagem das peças em uma placa-mãe nova e instalação completa do sistema operacional.</div>
          </div>
          <button class="fluent-btn" id="start-step1-btn">Aceitar e Diagnosticar Ordem ➔</button>
        </div>
      </div>
    `;
    htmlOverlay.innerHTML = html;
    htmlOverlay.style.display = "block";

    document.getElementById("start-step1-btn").onclick = () => {
      SOUNDS.success();
      simState.step = 2;
      saveLocalState();
      runCurrentStep();
    };
  }

  // ==========================================================================
  // ETAPA 2 — PREPARAÇÃO E INTRODUÇÃO À BANCADA
  // ==========================================================================
  function renderStep2Introducao() {
    const htmlOverlay = document.getElementById("sim-html-overlay");
    if (!htmlOverlay) return;

    const html = `
      <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:radial-gradient(circle at center, #1b1a32 0%, #090915 100%);">
        <div style="background:rgba(30,30,55,0.7);border:1px solid rgba(131,82,255,0.25);border-radius:16px;padding:2rem;max-width:480px;width:85%;backdrop-filter:blur(20px);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
          <div style="text-align:center;margin-bottom:1rem;">
            <span style="font-size:2.5rem;display:block;">⚡</span>
            <h3 style="color:#fff;margin:6px 0 0;font-size:1.2rem;">Segurança e Eletricidade Estática</h3>
          </div>
          
          <p style="font-size:0.78rem;color:rgba(255,255,255,0.65);line-height:1.6;margin-bottom:1.25rem;">
            Antes de tocar em qualquer peça física eletrônica, você precisa garantir a segurança do equipamento. Nosso corpo acumula <strong>eletricidade estática</strong> que pode atingir milhares de Volts — inofensiva para nós, mas fatal para circuitos integrados sensíveis.
          </p>

          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:1.5rem;font-size:0.75rem;">
            <div style="display:flex;align-items:center;gap:10px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.15);padding:10px;border-radius:8px;">
              <span>Pulseira Anti-estática</span>
              <div><strong style="color:#fbbf24;">Pulseira Anti-estática:</strong> Descarrega a eletricidade estática acumulada no corpo diretamente no aterramento.</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);padding:10px;border-radius:8px;">
              <span>Aterramento Alternativo</span>
              <div><strong style="color:#10b981;">Aterramento Alternativo:</strong> Se não possuir pulseira, toque periodicamente na parte metálica sem pintura do gabinete para igualar as cargas elétricas.</div>
            </div>
          </div>

          <button class="fluent-btn" id="start-step2-btn">🔧 Colocar Pulseira e Iniciar Montagem</button>
        </div>
      </div>
    `;
    htmlOverlay.innerHTML = html;
    htmlOverlay.style.display = "block";

    document.getElementById("start-step2-btn").onclick = () => {
      SOUNDS.success();
      simState.step = 3;
      saveLocalState();
      runCurrentStep();
    };
  }

  // ==========================================================================
  // ETAPA 3 — MONTAGEM FÍSICA DO HARDWARE (Three.js 3D c/ Snap ou Fallback)
  // ==========================================================================
  let activeSelectedPart = null;
  let threeScene = null;
  let threeCamera = null;
  let threeRenderer = null;
  let threeMeshes = {}; // Peças em 3D
  let threeAnimFinished = true;
  let dockHintEl = null;
  let caseZoom = 0.75;

  async function renderStep3Assembly() {
    const canvasContainer = document.getElementById("sim-canvas3d-container");
    const fallbackContainer = document.getElementById("sim-fallback-container");
    const guiOverlay = document.getElementById("sim-gui-overlay");

    // Reconfigura layout ANTES de renderizar: flex column, case flex:1, dock estático
    const mainEl = document.getElementById("sim-workspace-main");
    if (mainEl) {
      mainEl.style.display = "flex";
      mainEl.style.flexDirection = "column";
    }
    if (fallbackContainer) {
      fallbackContainer.style.display = "block";
      fallbackContainer.style.flex = "1";
      fallbackContainer.style.width = "100%";
      fallbackContainer.style.height = "auto";
      fallbackContainer.style.minHeight = "0";
    }
    if (guiOverlay) {
      guiOverlay.style.display = "flex";
      guiOverlay.style.position = "static";
      guiOverlay.style.height = "auto";
      guiOverlay.style.width = "100%";
      guiOverlay.style.flexShrink = "0";
      guiOverlay.style.justifyContent = "flex-start";
      guiOverlay.style.padding = "4px 8px";
      guiOverlay.style.pointerEvents = "auto";
    }

    initFallbackAssemblyScene();
    renderAssemblyGUI();

    // Aplica zoom inicial
    requestAnimationFrame(() => applyCaseZoom());
  }

  function renderAssemblyGUI() {
    const gui = document.getElementById("sim-gui-overlay");
    if (!gui) return;

    const remaining = HARDWARE_PIECES.filter(p => !simState.placed[p.id]);

    gui.innerHTML = `
      <div style="background:rgba(15,23,42,0.9);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:6px 10px;font-size:0.7rem;color:rgba(255,255,255,0.7);display:flex;justify-content:space-between;align-items:center;width:95%;margin:0 auto 6px;">
        <span>🔨 <strong style="color:#10b981;">${simState.assemblyStep}/10</strong></span>
        <span id="dock-hint" style="font-size:0.65rem;">Arraste a peça para o slot</span>
        <div style="display:flex;gap:4px;align-items:center;">
          <span style="font-size:0.55rem;color:rgba(255,255,255,0.3);">Zoom</span>
          <button id="zoom-out-btn" style="width:22px;height:22px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;justify-content:center;">−</button>
          <span id="zoom-label" style="font-size:0.6rem;color:rgba(255,255,255,0.4);min-width:28px;text-align:center;">${Math.round(caseZoom*100)}%</span>
          <button id="zoom-in-btn" style="width:22px;height:22px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;justify-content:center;">+</button>
        </div>
      </div>

      <div class="hardware-dock" style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;padding:0 8px;">
        ${HARDWARE_PIECES.map(p => {
          const isInstalled = simState.placed[p.id];
          return `
            <div class="dock-item ${isInstalled ? 'installed' : ''}"
              draggable="${!isInstalled}"
              data-id="${p.id}"
              style="display:flex;align-items:center;gap:5px;padding:6px 10px;
                background:${isInstalled ? 'rgba(16,185,129,0.12)' : 'linear-gradient(135deg,rgba(30,30,55,0.9),rgba(20,20,40,0.9))'};
                border:1px solid ${isInstalled ? 'rgba(16,185,129,0.3)' : `${p.color}30`};
                border-left:3px solid ${isInstalled ? '#10b981' : p.color};
                border-radius:8px;${isInstalled ? '' : 'cursor:grab;'};
                user-select:none;transition:all 0.15s;
                opacity:${isInstalled ? '0.45' : '1'};
                box-shadow:${isInstalled ? 'none' : '0 2px 6px rgba(0,0,0,0.3)'};"
              ondragstart="event.dataTransfer.setData('text/plain','${p.id}');event.dataTransfer.effectAllowed='move';this.style.opacity='0.3';this.style.transform='scale(0.92)';"
              ondragend="this.style.opacity='1';this.style.transform='scale(1)';"
              ${isInstalled ? '' : `title="Arraste ${p.title} para o gabinete"`}>
              <div style="width:28px;height:28px;border-radius:5px;
                background:${isInstalled ? 'rgba(16,185,129,0.3)' : `linear-gradient(135deg,${p.color},${p.color}88)`};
                display:flex;align-items:center;justify-content:center;font-size:1rem;
                box-shadow:${isInstalled ? 'none' : '0 1px 4px rgba(0,0,0,0.2)'};">${p.icon}</div>
              <div style="font-size:0.6rem;font-weight:700;color:${isInstalled ? 'rgba(255,255,255,0.3)' : p.color};text-transform:uppercase;">${p.title.split(" ")[0]}</div>
              ${isInstalled ? '<span style="font-size:0.5rem;color:rgba(16,185,129,0.5);">✓</span>' : ''}
            </div>
          `;
        }).join("")}
      </div>
    `;

    dockHintEl = document.getElementById("dock-hint");

    gui.querySelectorAll(".dock-item:not(.installed)").forEach(item => {
      item.addEventListener("click", (e) => {
        const id = item.dataset.id;
        if (simState.placed[id] || !threeAnimFinished) return;
        const piece = HARDWARE_PIECES.find(p => p.id === id);
        triggerModal(
          piece.title,
          `${piece.desc}<br><br><strong>Instruções de Montagem:</strong> ${piece.detail}`,
          piece.curio,
          piece.error,
          () => {
            activeSelectedPart = id;
            renderAssemblyGUI();
            highlightTargetIn3D(id);
            if (dockHintEl) dockHintEl.textContent = "Clique no slot correspondente no gabinete";
          }
        );
      });
    });

    // Zoom controls
    const zoomIn = document.getElementById("zoom-in-btn");
    const zoomOut = document.getElementById("zoom-out-btn");
    if (zoomIn) zoomIn.onclick = (e) => { e.stopPropagation(); caseZoom = Math.min(2, caseZoom + 0.15); applyCaseZoom(); };
    if (zoomOut) zoomOut.onclick = (e) => { e.stopPropagation(); caseZoom = Math.max(0.4, caseZoom - 0.15); applyCaseZoom(); };
  }

  function applyCaseZoom() {
    const el = document.getElementById("case-zoom-target");
    if (el) el.style.transform = `scale(${caseZoom})`;
    const label = document.getElementById("zoom-label");
    if (label) label.textContent = `${Math.round(caseZoom*100)}%`;
    sessionStorage.setItem("aula8_case_zoom", caseZoom);
  }

  // Inicializa a cena 3D usando Three.js e malhas geométricas procedurais
  function initThreeAssemblyScene() {
    const container = document.getElementById("sim-canvas3d-container");
    const THREE = window.THREE;
    const gsap = window.gsap;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 620;

    threeScene = new THREE.Scene();
    threeScene.background = new THREE.Color(0x0d0b1a);

    threeCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    threeCamera.position.set(2, 4, 9);
    threeCamera.lookAt(0, 0, 0);

    threeRenderer = new THREE.WebGLRenderer({ antialias: true });
    threeRenderer.setSize(width, height);
    threeRenderer.shadowMap.enabled = true;
    threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    threeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    threeRenderer.toneMappingExposure = 1.2;
    container.appendChild(threeRenderer.domElement);

    // Iluminação aprimorada — mais brilho e contraste
    const ambientLight = new THREE.AmbientLight(0x8888ff, 0.5);
    threeScene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x8888ff, 0x444422, 0.6);
    threeScene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xaa88ff, 1.2);
    dirLight1.position.set(6, 12, 8);
    dirLight1.castShadow = true;
    threeScene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffcc88, 0.7);
    dirLight2.position.set(-4, 6, -3);
    threeScene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0x6666ff, 0.4);
    rimLight.position.set(-2, -1, -5);
    threeScene.add(rimLight);

    const pointLight = new THREE.PointLight(0x6666ff, 0.3, 15);
    pointLight.position.set(0, 3, 2);
    threeScene.add(pointLight);

    // Mesa de Manutenção — textura mais rica
    const tableGeo = new THREE.BoxGeometry(10, 0.25, 6);
    const tableMat = new THREE.MeshStandardMaterial({ 
      color: 0x2a2440, 
      roughness: 0.7, 
      metalness: 0.15 
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.y = -1.5;
    table.receiveShadow = true;
    threeScene.add(table);

    // Gabinete ATX — visual metálico com detalhes
    const caseGroup = new THREE.Group();
    caseGroup.position.set(0, -0.45, 0);

    // Moldura principal do gabinete
    const caseFrameGeo = new THREE.BoxGeometry(4.2, 4.6, 2.4);
    const caseFrameMat = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a2e, 
      roughness: 0.35, 
      metalness: 0.75 
    });
    const caseFrame = new THREE.Mesh(caseFrameGeo, caseFrameMat);
    caseFrame.castShadow = true;
    caseGroup.add(caseFrame);

    // Reentrância interna — área da placa-mãe
    const mbBackingGeo = new THREE.PlaneGeometry(3.6, 3.9);
    const mbBackingMat = new THREE.MeshStandardMaterial({ color: 0x080812 });
    const mbBacking = new THREE.Mesh(mbBackingGeo, mbBackingMat);
    mbBacking.position.set(-0.05, 0, 0.85);
    caseGroup.add(mbBacking);

    // Grade decorativa frontal (ventilação)
    const ventGeo = new THREE.BoxGeometry(3.8, 0.06, 0.05);
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x222233, roughness: 0.9 });
    for (let i = 0; i < 6; i++) {
      const vent = new THREE.Mesh(ventGeo, ventMat);
      vent.position.set(0, 1.2 - i * 0.4, 1.2);
      caseGroup.add(vent);
    }
    threeScene.add(caseGroup);

    // Modelagem procedural das peças de hardware em 3D
    buildProceduralComponents();

    // Controles de Câmera OrbitControls
    if (THREE.OrbitControls) {
      const controls = new THREE.OrbitControls(threeCamera, threeRenderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 18;
      controls.maxPolarAngle = Math.PI / 2;
      controls.target.set(0, 0.2, 0);
      controls.update();
    }

    // Loop de Renderização
    function animate() {
      requestAnimationFrame(animate);

      if (simState.biosBooted && threeMeshes.coolerFan) {
        threeMeshes.coolerFan.rotation.y += 0.3;
      }

      threeRenderer.render(threeScene, threeCamera);
    }
    animate();

    // Raycaster para clique no canvas 3D
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    container.addEventListener("click", (e) => {
      if (!activeSelectedPart || !threeAnimFinished) return;

      const rect = threeRenderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, threeCamera);
      
      const intersects = raycaster.intersectObjects(threeScene.children, true);
      
      if (intersects.length > 0) {
        snapSelectedPartTo3D();
      }
    });

    // Janela resize
    const resizeHandler = () => {
      const w = container.clientWidth || 550;
      const h = container.clientHeight || 620;
      threeCamera.aspect = w / h;
      threeCamera.updateProjectionMatrix();
      threeRenderer.setSize(w, h);
    };
    window.addEventListener("resize", resizeHandler);
  }

  function buildProceduralComponents() {
    const THREE = window.THREE;

    // Placa-mãe (Chassis) — verde PCB realista com detalhes
    const mbGeo = new THREE.BoxGeometry(3.2, 3.4, 0.08);
    const mbMat = new THREE.MeshStandardMaterial({ 
      color: 0x054010, 
      roughness: 0.65,
      metalness: 0.05
    });
    const motherboard = new THREE.Mesh(mbGeo, mbMat);
    motherboard.position.set(-0.05, 0, 0.9);
    motherboard.castShadow = true;
    motherboard.receiveShadow = true;
    threeScene.add(motherboard);
    threeMeshes.motherboard = motherboard;

    // Trilhas decorativas da placa-mãe (linhas finas)
    const traceMat = new THREE.MeshStandardMaterial({ color: 0x0a7020, roughness: 0.8 });
    for (let i = 0; i < 12; i++) {
      const traceGeo = new THREE.BoxGeometry(0.01, 0.4 + (i % 3) * 0.15, 0.001);
      const trace = new THREE.Mesh(traceGeo, traceMat);
      trace.position.set(-1.2 + i * 0.22, -0.8 + (i % 4) * 0.3, 0.93);
      motherboard.add(trace);
    }

    // Soquete da CPU
    const socketGeo = new THREE.BoxGeometry(0.7, 0.7, 0.05);
    const socketMat = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, metalness: 0.85, roughness: 0.3 });
    const socket = new THREE.Mesh(socketGeo, socketMat);
    socket.position.set(0.05, 0.55, 0.07);
    motherboard.add(socket);
    threeMeshes.socket = socket;

    // Processador (CPU)
    const cpuGeo = new THREE.BoxGeometry(0.55, 0.55, 0.06);
    const cpuMat = new THREE.MeshStandardMaterial({ 
      color: 0x999999, 
      metalness: 0.8, 
      roughness: 0.15,
      emissive: 0x222222,
      emissiveIntensity: 0.05
    });
    const cpu = new THREE.Mesh(cpuGeo, cpuMat);
    cpu.position.set(-2, -1.2, 1.5);
    threeScene.add(cpu);
    threeMeshes.cpu = cpu;

    // Pasta Térmica
    const pasteGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const pasteMat = new THREE.MeshStandardMaterial({ 
      color: 0x888888, 
      roughness: 0.95,
      metalness: 0.05
    });
    const paste = new THREE.Mesh(pasteGeo, pasteMat);
    paste.position.set(-2.5, -1.3, 1.2);
    threeScene.add(paste);
    threeMeshes.paste = paste;

    // Cooler — mais detalhado
    const coolerGroup = new THREE.Group();
    const coolBaseGeo = new THREE.BoxGeometry(0.85, 0.85, 0.35);
    const coolBaseMat = new THREE.MeshStandardMaterial({ color: 0x2a2a3a, roughness: 0.8, metalness: 0.4 });
    const coolBase = new THREE.Mesh(coolBaseGeo, coolBaseMat);
    coolerGroup.add(coolBase);

    const fanHub = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 8);
    const fanHubMat = new THREE.MeshStandardMaterial({ color: 0x444455, metalness: 0.6 });
    const hub = new THREE.Mesh(fanHub, fanHubMat);
    hub.position.z = 0.22;
    hub.rotation.x = Math.PI / 2;
    coolerGroup.add(hub);

    const fanGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 16);
    const fanMat = new THREE.MeshStandardMaterial({ 
      color: 0x0a0a14, 
      roughness: 0.4, 
      metalness: 0.7,
      transparent: true,
      opacity: 0.7
    });
    const fan = new THREE.Mesh(fanGeo, fanMat);
    fan.position.z = 0.22;
    fan.rotation.x = Math.PI / 2;
    coolerGroup.add(fan);
    threeMeshes.coolerFan = fan;

    coolerGroup.position.set(-1.2, -1.0, 1.8);
    threeScene.add(coolerGroup);
    threeMeshes.cooler = coolerGroup;

    // Memória RAM — dissipador
    const ramGeo = new THREE.BoxGeometry(0.08, 1.0, 0.15);
    const ramMat = new THREE.MeshStandardMaterial({ 
      color: 0xcc3333, 
      metalness: 0.7, 
      roughness: 0.3,
      emissive: 0x441111,
      emissiveIntensity: 0.05
    });
    const ram = new THREE.Mesh(ramGeo, ramMat);
    ram.position.set(1.5, -1.2, 1.5);
    threeScene.add(ram);
    threeMeshes.ram = ram;

    // SSD M.2
    const ssdGeo = new THREE.BoxGeometry(0.18, 0.7, 0.04);
    const ssdMat = new THREE.MeshStandardMaterial({ color: 0x0a0a14, roughness: 0.3, metalness: 0.6 });
    const ssd = new THREE.Mesh(ssdGeo, ssdMat);
    ssd.position.set(2.2, -1.3, 1.1);
    threeScene.add(ssd);
    threeMeshes.ssd = ssd;

    // Fonte de Alimentação — com detalhes
    const psuGeo = new THREE.BoxGeometry(1.2, 1.2, 1.4);
    const psuMat = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a2a, 
      roughness: 0.5, 
      metalness: 0.6 
    });
    const psu = new THREE.Mesh(psuGeo, psuMat);
    psu.position.set(3.2, -1.0, 2.0);
    threeScene.add(psu);
    threeMeshes.psu = psu;
    // Ventoinha da fonte
    const psuFanGeo = new THREE.CircleGeometry(0.25, 12);
    const psuFanMat = new THREE.MeshStandardMaterial({ color: 0x333344, side: THREE.DoubleSide });
    const psuFan = new THREE.Mesh(psuFanGeo, psuFanMat);
    psuFan.position.set(3.2, -0.4, 2.7);
    threeScene.add(psuFan);

    // GPU (Placa de Vídeo) — mais realista
    const gpuGroup = new THREE.Group();
    const gpuPcbGeo = new THREE.BoxGeometry(0.35, 1.5, 0.7);
    const gpuPcbMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.4 });
    const gpuPcb = new THREE.Mesh(gpuPcbGeo, gpuPcbMat);
    gpuGroup.add(gpuPcb);

    const gpuShroudGeo = new THREE.BoxGeometry(0.42, 1.3, 0.5);
    const gpuShroudMat = new THREE.MeshStandardMaterial({ color: 0x111122, roughness: 0.6, metalness: 0.5 });
    const gpuShroud = new THREE.Mesh(gpuShroudGeo, gpuShroudMat);
    gpuShroud.position.z = 0.1;
    gpuGroup.add(gpuShroud);

    gpuGroup.position.set(0.5, -1.0, 2.5);
    threeScene.add(gpuGroup);
    threeMeshes.gpu = gpuGroup;

    // HD
    const hdGeo = new THREE.BoxGeometry(0.7, 1.0, 0.25);
    const hdMat = new THREE.MeshStandardMaterial({ 
      color: 0x555566, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const hd = new THREE.Mesh(hdGeo, hdMat);
    hd.position.set(-3.2, -1.2, 2.2);
    threeScene.add(hd);
    threeMeshes.hd = hd;

    // Cabos e Conexões 3D (Inicialmente escondidos)
    const cableGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.5, -0.8 + i*0.2, 0.8),
        new THREE.Vector3(0.8, -0.5, 0.2),
        new THREE.Vector3(-0.2, 0.2 + i*0.2, 0.95)
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.03 + i*0.01, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({ 
        color: i % 2 === 0 ? 0xcc1111 : 0xffdd00,
        roughness: 0.6,
        emissive: i % 2 === 0 ? 0x441111 : 0x443300,
        emissiveIntensity: 0.1
      });
      const cable = new THREE.Mesh(tubeGeo, tubeMat);
      cableGroup.add(cable);
    }
    cableGroup.position.set(0, 0, 0);
    cableGroup.visible = false;
    threeScene.add(cableGroup);
    threeMeshes.cables = cableGroup;
  }

  function highlightTargetIn3D(partId) {
    console.log("Guiding placement of " + partId);
  }

  function snapSelectedPartTo3D() {
    const gsap = window.gsap;
    if (!gsap) return;

    threeAnimFinished = false;
    const part = activeSelectedPart;

    let targetPos = new THREE.Vector3();
    let targetRot = new THREE.Vector3();

    // Determina a posição de encaixe no gabinete
    if (part === "motherboard") {
      targetPos.set(0, -0.5, 0);
    } else if (part === "cpu") {
      targetPos.set(-0.1, 0.1, 0.96);
    } else if (part === "paste") {
      targetPos.set(-0.1, 0.1, 0.99);
    } else if (part === "cooler") {
      targetPos.set(-0.1, 0.1, 1.25);
    } else if (part === "ram") {
      targetPos.set(0.4, 0.1, 0.98);
    } else if (part === "ssd") {
      targetPos.set(0.4, -0.6, 0.98);
    } else if (part === "psu") {
      targetPos.set(-0.8, -2.1, 0.2);
    } else if (part === "gpu") {
      targetPos.set(0.2, -0.8, 1.3);
    } else if (part === "hd") {
      targetPos.set(0.8, -2.0, 0.2);
    } else if (part === "cables") {
      threeMeshes.cables.visible = true;
      SOUNDS.snap();
      completeAssemblyStep(part);
      threeAnimFinished = true;
      return;
    }

    const mesh = threeMeshes[part];
    if (mesh) {
      gsap.timeline()
        .to(mesh.position, { y: targetPos.y + 0.8, duration: 0.6, ease: "power2.out" })
        .to(mesh.rotation, { x: targetRot.x, y: targetRot.y, z: targetRot.z, duration: 0.4 })
        .to(mesh.position, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration: 0.6,
          ease: "back.out(1.2)",
          onComplete: () => {
            SOUNDS.snap();
            completeAssemblyStep(part);
            threeAnimFinished = true;
          }
        });
    } else {
      threeAnimFinished = true;
    }
  }

  function completeAssemblyStep(part) {
    simState.placed[part] = true;
    simState.assemblyStep = Object.keys(simState.placed).length;
    activeSelectedPart = null;

    saveLocalState();
    renderAssemblyGUI();

    if (simState.assemblyStep === HARDWARE_PIECES.length) {
      setTimeout(() => {
        SOUNDS.success();
        simState.step = 4; // Avança para o Primeiro Boot
        saveLocalState();
        runCurrentStep();
      }, 1500);
    }
  }

  // ==========================================================================
  // GABINETE 3D CSS REALISTA — Exibido imediatamente + drag-and-drop
  // ==========================================================================
  function initFallbackAssemblyScene() {
    const container = document.getElementById("sim-fallback-container");
    if (!container) return;

    // Restaura zoom salvo
    const savedZoom = sessionStorage.getItem("aula8_case_zoom");
    if (savedZoom) caseZoom = parseFloat(savedZoom);

    const SLOT_MAPPING = {
      motherboard: 'motherboard',
      cpu: 'cpu',
      paste: 'cpu',
      cooler: 'cpu',
      ram: 'ram',
      ssd: 'ssd',
      psu: 'psu',
      gpu: 'gpu',
      cables: 'motherboard',
      hd: 'hd'
    };

    function getSlotDisplay(slotId) {
      const placed = simState.placed[slotId];
      if (placed) return 'opacity:1;border-color:#10b981;background:rgba(16,185,129,0.08);box-shadow:0 0 12px rgba(16,185,129,0.15),inset 0 0 8px rgba(16,185,129,0.03);';
      const selected = activeSelectedPart && SLOT_MAPPING[activeSelectedPart] === slotId;
      if (selected) return 'opacity:1;border-color:#a78bfa;background:rgba(167,139,250,0.08);box-shadow:0 0 18px rgba(167,139,250,0.2);animation:slotPulse 1s infinite alternate;';
      return 'opacity:0.25;border-color:rgba(255,255,255,0.08);border-style:dashed;background:rgba(255,255,255,0.01);';
    }

    const assemblyComplete = simState.assemblyStep === HARDWARE_PIECES.length;

    container.innerHTML = `
      <style>
        @keyframes slotPulse { from { box-shadow: 0 0 8px rgba(167,139,250,0.3); } to { box-shadow: 0 0 20px rgba(167,139,250,0.6); } }
        @keyframes fanSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes cablePulse { 0%,100% { opacity:0.2; } 50% { opacity:0.8; } }
        @keyframes ledPulse { 0%,100% { box-shadow:0 0 4px rgba(16,185,129,0.4); } 50% { box-shadow:0 0 10px rgba(16,185,129,0.8); } }
        .pc-slot { transition: all 0.25s ease; display:flex; align-items:center; justify-content:center; border-radius:4px; position:relative; }
        .pc-slot.drag-over { opacity:1 !important; border-color:#818cf8 !important; background:rgba(99,102,241,0.15) !important; box-shadow:0 0 25px rgba(99,102,241,0.3) !important; }
        .pc-slot.placed { cursor:default; }
        .pc-slot-label { position:absolute; bottom:-14px; left:50%; transform:translateX(-50%); font-size:0.45rem; font-weight:700; white-space:nowrap; text-transform:uppercase; letter-spacing:0.3px; color:rgba(255,255,255,0.25); pointer-events:none; }
        .pc-slot.drag-over .pc-slot-label { color:#a78bfa; }
        .fan-blade { animation: fanSpin ${simState.biosBooted ? '0.15' : '2'}s linear infinite; transform-origin:center; }
        .cable-line { animation: cablePulse 2s ease-in-out infinite; }
      </style>

      <div style="width:100%;height:100%;background:radial-gradient(ellipse at 40% 30%, #12101f 0%, #06060c 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
        
        <!-- Reflexo iluminado na mesa -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:25%;background:linear-gradient(to top, rgba(99,102,241,0.04) 0%, transparent 100%);pointer-events:none;"></div>
        
        <!-- GABINETE ATX — VISÃO INTERNA REALISTA -->
        <div style="position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
          <div id="case-zoom-target" style="position:relative;max-width:100%;max-height:100%;width:540px;aspect-ratio:28/23;overflow:visible;transform-origin:center center;">
          
          <!-- SOMBRA EXTERNA DO GABINETE -->
          <div style="position:absolute;top:5px;left:5px;right:5px;bottom:5px;background:rgba(0,0,0,0.5);filter:blur(20px);border-radius:12px;"></div>
          
          <!-- LATERAL DIREITA (PROFUNDIDADE 3D) -->
          <div style="position:absolute;top:16px;right:-4px;width:20px;height:424px;background:linear-gradient(to right, #2a2a3e, #0d0d18);border-radius:0 8px 8px 0;border:1px solid rgba(255,255,255,0.04);"></div>
          
          <!-- BASE (PROFUNDIDADE 3D) -->
          <div style="position:absolute;bottom:-4px;left:16px;right:-4px;height:20px;background:linear-gradient(to bottom, #2a2a3e, #0d0d18);border-radius:0 0 8px 8px;border:1px solid rgba(255,255,255,0.04);"></div>
          
          <!-- PAINEL PRINCIPAL DO GABINETE -->
          <div style="position:absolute;top:0;left:0;right:16px;bottom:16px;
            background:linear-gradient(180deg, #1e1e30 0%, #141421 40%, #0a0a14 100%);
            border:1px solid rgba(255,255,255,0.06);border-radius:10px;
            box-shadow:inset 0 0 60px rgba(0,0,0,0.6), 0 10px 40px rgba(0,0,0,0.4);
            overflow:hidden;">
            
            <!-- TOP BAR — PAINEL I/O E BOTÃO POWER -->
            <div style="height:5%;min-height:20px;max-height:28px;background:linear-gradient(to bottom, #252540 0%, #181830 100%);border-bottom:1px solid rgba(255,255,255,0.04);display:flex;align-items:center;padding:0 14px;gap:8px;">
              <!-- LED POWER -->
              <div style="width:8px;height:8px;border-radius:50%;
                background:${assemblyComplete || simState.biosBooted ? '#10b981' : '#1c1c28'};
                border:1px solid ${assemblyComplete || simState.biosBooted ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.06)'};
                animation:${assemblyComplete || simState.biosBooted ? 'ledPulse 1.5s ease-in-out infinite' : 'none'};
                box-shadow:${assemblyComplete || simState.biosBooted ? '0 0 6px rgba(16,185,129,0.5)' : 'none'};"></div>
              <!-- BOTÃO POWER -->
              <div style="width:20px;height:12px;background:linear-gradient(to bottom, #3a3a50, #1a1a2e);border:1px solid rgba(255,255,255,0.06);border-radius:3px;cursor:pointer;display:flex;align-items:center;justify-content:center;"
                title="Botão Power" onclick="document.getElementById('virtual-pwr-btn')?.click();">
                <span style="font-size:0.35rem;color:#888;transform:rotate(90deg);">⏻</span>
              </div>
              <div style="flex:1;height:1px;background:rgba(255,255,255,0.03);"></div>
              <span style="font-size:0.4rem;color:rgba(255,255,255,0.12);letter-spacing:3px;text-transform:uppercase;">ATX MID TOWER</span>
              <div style="width:8px;height:8px;border-radius:50%;background:#1c1c28;border:1px solid rgba(255,255,255,0.06);"></div>
            </div>
            
            <!-- INTERIOR DO GABINETE -->
            <div style="padding:3% 3% 0;position:relative;height:calc(100% - 28px);box-sizing:border-box;">
              
              <!-- ÁREA DA PLACA-MÃE (MOTHERBOARD TRAY) -->
              <div id="slot-motherboard"
                style="position:absolute;top:3%;left:3%;right:3%;bottom:22%;
                  ${getSlotDisplay('motherboard')}
                  border:2px solid ${simState.placed.motherboard ? '#10b981' : 'rgba(255,255,255,0.06)'};
                  border-radius:6px;background:${simState.placed.motherboard ? 'rgba(5,40,16,0.4)' : 'rgba(255,255,255,0.01)'};
                  ${simState.placed.motherboard ? 'box-shadow:inset 0 0 20px rgba(5,40,16,0.3),0 0 12px rgba(16,185,129,0.1);' : ''}"
                ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';this.classList.add('drag-over');"
                ondragleave="this.classList.remove('drag-over');"
                ondrop="handleSlotDrop(event,'motherboard')">
                
                ${simState.placed.motherboard ? `
                  <!-- PCB DA PLACA-MÃE (mais detalhado) -->
                  <div style="position:absolute;inset:0;border-radius:4px;
                    background:
                      repeating-linear-gradient(0deg, transparent 0px, transparent 18px, rgba(16,185,129,0.03) 18px, rgba(16,185,129,0.03) 19px),
                      repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(16,185,129,0.03) 18px, rgba(16,185,129,0.03) 19px);">
                  </div>
                  <!-- Capacitores e detalhes da placa-mãe -->
                  <div style="position:absolute;left:6px;bottom:6px;display:flex;gap:3px;">
                    ${Array(5).fill(0).map(() => '<div style="width:4px;height:6px;border-radius:1px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.02);"></div>').join('')}
                  </div>
                  <!-- Chipset sul -->
                  <div style="position:absolute;right:8px;bottom:8px;width:18px;height:18px;background:rgba(50,50,60,0.4);border:1px solid rgba(255,255,255,0.04);border-radius:2px;"></div>
                ` : `
                  <div style="display:flex;flex-direction:column;align-items:center;gap:4px;opacity:0.2;">
                    <span style="font-size:1.8rem;">🖥️</span>
                    <span style="font-size:0.55rem;color:rgba(255,255,255,0.4);">Instale a Placa-mãe</span>
                  </div>
                `}
                <div class="pc-slot-label" style="bottom:-14px;color:${simState.placed.motherboard ? '#10b981' : 'rgba(255,255,255,0.25)'};">PLACA-MÃE</div>

                <!-- SUB-SLOTS DENTRO DA PLACA-MÃE (só visíveis se placa-mãe instalada) -->
                ${simState.placed.motherboard ? `
                  <!-- CPU -->
                  <div id="slot-cpu" class="pc-slot ${simState.placed.cpu ? 'placed' : ''}"
                    style="position:absolute;top:18%;left:20%;width:76px;height:76px;${getSlotDisplay('cpu')}border:2px solid ${simState.placed.cpu ? '#fbbf24' : activeSelectedPart === 'cpu' ? '#a78bfa' : 'rgba(251,191,36,0.15)'};border-radius:4px;background:${simState.placed.cpu ? 'rgba(251,191,36,0.06)' : 'rgba(251,191,36,0.02)'};"
                    ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';this.classList.add('drag-over');"
                    ondragleave="this.classList.remove('drag-over');"
                    ondrop="handleSlotDrop(event,'cpu')">
                    ${simState.placed.cpu ? `
                      <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
                        <span style="font-size:1.6rem;filter:drop-shadow(0 0 6px rgba(251,191,36,0.4));">🧠</span>
                        <span style="font-size:0.4rem;color:#fbbf24;font-weight:700;">CPU</span>
                        <!-- Pasta Térmica -->
                        ${simState.placed.paste ? '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:18px;height:18px;border-radius:50%;background:rgba(200,200,200,0.5);filter:blur(3px);pointer-events:none;"></div>' : ''}
                        <!-- Cooler -->
                        ${simState.placed.cooler ? `
                          <div style="position:absolute;inset:-8px;background:rgba(34,211,238,0.06);border-radius:50%;border:1px solid rgba(34,211,238,0.15);display:flex;align-items:center;justify-content:center;">
                            <div class="fan-blade" style="font-size:1.4rem;">❄️</div>
                          </div>
                        ` : ''}
                      </div>
                    ` : `
                      <div style="display:flex;flex-direction:column;align-items:center;gap:1px;opacity:0.3;">
                        <span style="font-size:1.2rem;">🧠</span>
                        <span style="font-size:0.4rem;color:rgba(251,191,36,0.3);">Soquete</span>
                        <!-- Pinos -->
                        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;">
                          ${Array(12).fill(0).map(() => '<div style="width:2px;height:2px;border-radius:50%;background:rgba(200,200,200,0.1);"></div>').join('')}
                        </div>
                      </div>
                    `}
                    <div class="pc-slot-label" style="color:${simState.placed.cpu ? '#fbbf24' : 'rgba(251,191,36,0.25)'};">CPU</div>
                  </div>

                  <!-- RAM -->
                  <div id="slot-ram" class="pc-slot ${simState.placed.ram ? 'placed' : ''}"
                    style="position:absolute;top:14%;right:6%;width:14px;height:68%;${getSlotDisplay('ram')}border:2px solid ${simState.placed.ram ? '#a78bfa' : activeSelectedPart === 'ram' ? '#a78bfa' : 'rgba(167,139,250,0.15)'};border-radius:2px;background:${simState.placed.ram ? 'rgba(167,139,250,0.06)' : 'rgba(167,139,250,0.02)'};flex-direction:column;"
                    ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';this.classList.add('drag-over');"
                    ondragleave="this.classList.remove('drag-over');"
                    ondrop="handleSlotDrop(event,'ram')">
                    ${simState.placed.ram ? `
                      <div style="width:10px;height:100%;background:linear-gradient(to bottom,#a78bfa,#7c3aed);border-radius:1px;box-shadow:0 0 4px rgba(167,139,250,0.2);"></div>
                    ` : `<span style="font-size:0.6rem;opacity:0.3;">💾</span>`}
                    <div class="pc-slot-label" style="bottom:-14px;color:${simState.placed.ram ? '#a78bfa' : 'rgba(167,139,250,0.25)'};">RAM</div>
                  </div>

                  <!-- SSD M.2 -->
                  <div id="slot-ssd" class="pc-slot ${simState.placed.ssd ? 'placed' : ''}"
                    style="position:absolute;bottom:24%;left:26%;width:76px;height:16px;${getSlotDisplay('ssd')}border:2px solid ${simState.placed.ssd ? '#60a5fa' : activeSelectedPart === 'ssd' ? '#a78bfa' : 'rgba(96,165,250,0.15)'};border-radius:2px;background:${simState.placed.ssd ? 'rgba(96,165,250,0.06)' : 'rgba(96,165,250,0.02)'};"
                    ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';this.classList.add('drag-over');"
                    ondragleave="this.classList.remove('drag-over');"
                    ondrop="handleSlotDrop(event,'ssd')">
                    ${simState.placed.ssd ? `
                      <div style="width:100%;height:100%;background:linear-gradient(to right,#1a3a6f,#60a5fa,#1a3a6f);border-radius:1px;display:flex;align-items:center;justify-content:center;gap:2px;">
                        <span style="font-size:0.5rem;">💿</span>
                      </div>
                    ` : `<span style="font-size:0.6rem;opacity:0.3;">💿</span>`}
                    <div class="pc-slot-label" style="bottom:-14px;color:${simState.placed.ssd ? '#60a5fa' : 'rgba(96,165,250,0.25)'};">SSD M.2</div>
                  </div>

                  <!-- GPU (PCIe) -->
                  <div id="slot-gpu" class="pc-slot ${simState.placed.gpu ? 'placed' : ''}"
                    style="position:absolute;bottom:10%;left:4%;right:28%;height:22px;${getSlotDisplay('gpu')}border:2px solid ${simState.placed.gpu ? '#ec4899' : activeSelectedPart === 'gpu' ? '#a78bfa' : 'rgba(236,72,153,0.15)'};border-radius:2px;background:${simState.placed.gpu ? 'rgba(236,72,153,0.06)' : 'rgba(236,72,153,0.02)'};"
                    ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';this.classList.add('drag-over');"
                    ondragleave="this.classList.remove('drag-over');"
                    ondrop="handleSlotDrop(event,'gpu')">
                    ${simState.placed.gpu ? `
                      <div style="width:100%;height:100%;background:linear-gradient(to right,#2a0015,#ec4899,#2a0015);border-radius:1px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:0.7rem;">🎮</span>
                      </div>
                    ` : `<span style="font-size:0.7rem;opacity:0.3;">🎮</span>`}
                    <div class="pc-slot-label" style="bottom:-14px;color:${simState.placed.gpu ? '#ec4899' : 'rgba(236,72,153,0.25)'};">GPU PCIe</div>
                  </div>

                  <!-- CABOS (conectam na placa-mãe) -->
                  ${simState.placed.cables ? `
                    <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" viewBox="0 0 280 300">
                      <path class="cable-line" d="M 60 200 Q 120 240 190 270" stroke="#f59e0b" stroke-width="2.5" fill="none"/>
                      <path class="cable-line" d="M 80 180 Q 50 230 30 280" stroke="#ef4444" stroke-width="2" fill="none" style="animation-delay:0.5s;"/>
                      <path class="cable-line" d="M 220 120 Q 250 140 260 180" stroke="#22d3ee" stroke-width="1.5" fill="none" style="animation-delay:1s;"/>
                      <path class="cable-line" d="M 120 220 Q 150 260 200 280" stroke="#34d399" stroke-width="1.5" fill="none" style="animation-delay:0.3s;"/>
                    </svg>
                  ` : ''}
                ` : ''}
              </div>

              <!-- COMPARTIMENTO PSU (FONTE) — parte inferior esquerda -->
              <div id="slot-psu" class="pc-slot ${simState.placed.psu ? 'placed' : ''}"
                style="position:absolute;bottom:2%;left:3%;width:22%;height:17%;min-height:50px;max-height:80px;${getSlotDisplay('psu')}border:2px solid ${simState.placed.psu ? '#f87171' : 'rgba(248,113,113,0.12)'};border-radius:6px;background:${simState.placed.psu ? 'rgba(248,113,113,0.06)' : 'rgba(255,255,255,0.01)'};"
                ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';this.classList.add('drag-over');"
                ondragleave="this.classList.remove('drag-over');"
                ondrop="handleSlotDrop(event,'psu')">
                ${simState.placed.psu ? `
                  <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
                    <span style="font-size:1.2rem;">🔌</span>
                    <span style="font-size:0.45rem;color:#f87171;font-weight:700;">FONTE 750W</span>
                    <!-- Ventoinha da fonte -->
                    <div style="width:24px;height:24px;border-radius:50%;background:rgba(0,0,0,0.4);border:1px solid rgba(248,113,113,0.2);display:flex;align-items:center;justify-content:center;">
                      <div class="fan-blade" style="width:14px;height:14px;border-radius:50%;background:conic-gradient(from 0deg, transparent 0deg, rgba(248,113,113,0.1) 30deg, transparent 30deg, transparent 180deg, rgba(248,113,113,0.1) 210deg, transparent 210deg);animation-duration:1.5s;"></div>
                    </div>
                  </div>
                ` : `
                  <div style="display:flex;flex-direction:column;align-items:center;gap:3px;opacity:0.3;">
                    <span style="font-size:1.2rem;">🔌</span>
                    <span style="font-size:0.45rem;color:rgba(248,113,113,0.3);">Fonte ATX</span>
                  </div>
                `}
                <div class="pc-slot-label" style="bottom:-14px;color:${simState.placed.psu ? '#f87171' : 'rgba(248,113,113,0.25)'};">FONTE ATX</div>
              </div>

              <!-- BAIA HD — parte inferior direita -->
              <div id="slot-hd" class="pc-slot ${simState.placed.hd ? 'placed' : ''}"
                style="position:absolute;bottom:2%;right:3%;width:18%;height:17%;min-height:50px;max-height:80px;${getSlotDisplay('hd')}border:2px solid ${simState.placed.hd ? '#3b82f6' : 'rgba(59,130,246,0.12)'};border-radius:6px;background:${simState.placed.hd ? 'rgba(59,130,246,0.06)' : 'rgba(255,255,255,0.01)'};"
                ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';this.classList.add('drag-over');"
                ondragleave="this.classList.remove('drag-over');"
                ondrop="handleSlotDrop(event,'hd')">
                ${simState.placed.hd ? `
                  <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
                    <span style="font-size:1.1rem;">💽</span>
                    <span style="font-size:0.45rem;color:#3b82f6;font-weight:700;">1TB SATA</span>
                    <!-- Detalhe do braço do HD -->
                    <div style="width:28px;height:2px;background:linear-gradient(to right,transparent,rgba(59,130,246,0.2),transparent);"></div>
                  </div>
                ` : `
                  <div style="display:flex;flex-direction:column;align-items:center;gap:3px;opacity:0.3;">
                    <span style="font-size:1.1rem;">💽</span>
                    <span style="font-size:0.45rem;color:rgba(59,130,246,0.3);">HD 3.5"</span>
                  </div>
                `}
                <div class="pc-slot-label" style="bottom:-14px;color:${simState.placed.hd ? '#3b82f6' : 'rgba(59,130,246,0.25)'};">HD</div>
              </div>

            </div><!-- /interior -->
          </div><!-- /painel frontal -->
        </div><!-- /gabinete -->
        
        <!-- Dica de ação -->
        ${!activeSelectedPart && !assemblyComplete ? `<div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-size:0.65rem;color:rgba(255,255,255,0.2);text-align:center;pointer-events:none;">Arraste as peças do dock para os slots no gabinete</div>` : ''}
        ${activeSelectedPart && !assemblyComplete ? `<div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-size:0.65rem;color:#a78bfa;text-align:center;pointer-events:none;">⏳ Solte a peça no slot destacado no gabinete</div>` : ''}
      </div>
    `;

    // Handler de drop global
    window.handleSlotDrop = function(e, slotId) {
      e.preventDefault();
      e.currentTarget.classList.remove('drag-over');
      const compId = e.dataTransfer.getData('text/plain');
      if (!compId) return;
      if (simState.placed[compId]) return;

      const expectedSlot = SLOT_MAPPING[compId];
      const el = e.currentTarget;

      if (expectedSlot === slotId) {
        SOUNDS.snap();
        completeAssemblyStep(compId);
        if (dockHintEl) dockHintEl.textContent = '✅ Peça instalada!';
        initFallbackAssemblyScene();
      } else {
        SOUNDS.error();
        el.style.borderColor = 'rgba(239,68,68,0.8)';
        el.style.background = 'rgba(239,68,68,0.12)';
        el.style.boxShadow = '0 0 15px rgba(239,68,68,0.5)';
        setTimeout(() => {
          el.style.borderColor = '';
          el.style.background = '';
          el.style.boxShadow = '';
        }, 600);
        if (dockHintEl) dockHintEl.textContent = '❌ Slot errado! Tente outro local.';
      }
    };

    // Bind clique nos slots para fallback de interação
    const slotIds = ['motherboard', 'cpu', 'ram', 'ssd', 'psu', 'gpu', 'hd'];
    slotIds.forEach(slotId => {
      const el = document.getElementById('slot-' + slotId);
      if (!el) return;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!activeSelectedPart) return;
        const expectedSlot = SLOT_MAPPING[activeSelectedPart];
        if (simState.placed[activeSelectedPart]) return;

        if (expectedSlot === slotId) {
          SOUNDS.snap();
          completeAssemblyStep(activeSelectedPart);
          if (dockHintEl) dockHintEl.textContent = '✅ Peça instalada!';
          initFallbackAssemblyScene();
        } else {
          SOUNDS.error();
          el.style.boxShadow = '0 0 15px rgba(239,68,68,0.8)';
          el.style.borderColor = 'rgba(239,68,68,0.8)';
          setTimeout(() => { el.style.boxShadow = ''; el.style.borderColor = ''; }, 700);
          if (dockHintEl) dockHintEl.textContent = '❌ Slot errado! Clique no local correto.';
        }
      });
    });

    // Aplica zoom salvo
    requestAnimationFrame(() => applyCaseZoom());
  }


  // ==========================================================================
  // AMBIENTE MONITOR VIRTUAL — ETAPAS 4 A 10 (Boot, OS, Drivers, Apps, Diag)
  // ==========================================================================
  // Primeira definicao removida para evitar duplicidade com a definicao abaixo

  function updateVirtualScreen() {
    const screen = document.getElementById("virtual-screen-content");
    if (!screen) return;

    screen.innerHTML = "";
    const desktop = document.getElementById("winlab-desktop");
    const iconsArea = document.getElementById("winlab-desktop-icons");

    if (simState.step === 4) {
      screen.style.display = "block";
      if (iconsArea) iconsArea.style.display = "none";
      renderVirtualStep4Boot(screen);
    } else if (simState.step === 5) {
      screen.style.display = "block";
      if (iconsArea) iconsArea.style.display = "none";
      renderVirtualStep5OSInstall(screen);
    } else {
      screen.style.display = "none";
      renderVirtualDesktop(desktop);
    }
  }

  // ==========================================================================
  // MONITOR VIRTUAL — ETAPA 4: PRIMEIRO BOOT (POST / BIOS)
  // ==========================================================================
  function renderVirtualStep4Boot(screen) {
    if (!simState.biosBooted) {
      screen.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;background:#000;">
          <button class="fluent-btn sim-interactive-element" id="virtual-pwr-btn" style="width:130px;height:130px;border-radius:50%;background:#ef4444;box-shadow:0 0 30px rgba(239,68,68,0.5);font-size:1.6rem;font-weight:bold;border:3px solid #fff;">
            🔴 POWER
          </button>
          <p style="color:rgba(255,255,255,0.4);font-size:0.75rem;margin-top:1.5rem;text-transform:uppercase;letter-spacing:2px;">
            Pressione o botão liga/desliga para dar boot
          </p>
        </div>
      `;

      document.getElementById("virtual-pwr-btn").onclick = () => {
        SOUNDS.boot();
        simState.biosBooted = true;
        saveLocalState();
        updateVirtualScreen();
      };
    } else {
      screen.innerHTML = `
        <div style="padding:2rem;font-family:'Courier New', monospace;font-size:0.75rem;color:#00ff00;background:#000;width:100%;height:100%;box-sizing:border-box;">
          <div id="post-log"></div>
        </div>
      `;

      const log = screen.querySelector("#post-log");
      const lines = [
        "InforMestre UEFI BIOS v1.0.84",
        "Copyright (C) 2026 InforTech Corp.",
        "------------------------------------",
        "Processador: Intel Core i5 12400F @ 2.50GHz ... OK",
        "Memória RAM: 16384 MB (DDR4 Dual Channel) ... OK",
        "Armazenamento: SSD NVMe M.2 500GB ... OK",
        "Controlador SATA: Detectado 1 canal ... OK",
        "Dispositivos USB: 1 Teclado, 1 Mouse detectados ... OK",
        "------------------------------------",
        "Realizando auto-diagnóstico (POST) ... Concluído.",
        "Inicializando barramentos de energia ... OK",
        "Buscando dispositivo de inicialização primário ...",
        "⚠ ERRO: Nenhum dispositivo de boot encontrado.",
        "Insira uma mídia de boot (Pendrive USB / CD) e reinicie a máquina."
      ];

      let idx = 0;
      const typePost = () => {
        if (idx < lines.length) {
          const l = document.createElement("div");
          l.textContent = lines[idx];
          if (lines[idx].includes("ERRO")) {
            l.style.color = "#ff0000";
            l.style.fontWeight = "bold";
          }
          log.appendChild(l);
          idx++;
          setTimeout(typePost, 200);
        } else {
          setTimeout(() => {
            triggerModal(
              "💻 Inicialização do Computador (Boot/POST)",
              "O computador ligou com sucesso e realizou o <strong>POST</strong> (Power-On Self-Test) para verificar as peças de hardware. Contudo, como o SSD é novo e está totalmente zerado, o computador não encontrou um <strong>Sistema Operacional</strong> para gerenciar as funções.",
              "A BIOS (Basic Input/Output System) é um chip gravado diretamente na placa-mãe que contém as instruções mais elementares de inicialização física do computador.",
              "Esquecer de mudar a ordem de boot na BIOS após instalar o Windows pode fazer com que o computador tente carregar pelo pendrive vazio repetidamente.",
              () => {
                simState.step = 5;
                saveLocalState();
                runCurrentStep();
              }
            );
          }, 1500);
        }
      };
      typePost();
    }
  }

  // ==========================================================================
  // MONITOR VIRTUAL — ETAPA 5: INSTALAÇÃO DO WINDOWS 11
  // ==========================================================================
  function renderVirtualStep5OSInstall(screen) {
    if (!simState.osInstalled) {
      screen.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;background:#000;">
          <button class="fluent-btn sim-interactive-element" id="virtual-usb-btn" style="width:200px;padding:12px;background:#4f46e5;font-weight:bold;">
            🔌 Inserir Pendrive Bootável
          </button>
          <p style="color:rgba(255,255,255,0.4);font-size:0.72rem;margin-top:10px;">
            Conecte o pendrive contendo o instalador do Windows 11 na porta USB
          </p>
        </div>
      `;

      document.getElementById("virtual-usb-btn").onclick = () => {
        SOUNDS.snap();
        runWindowsInstallerWizard(screen);
      };
    }
  }

  function runWindowsInstallerWizard(screen) {
    screen.innerHTML = `
      <div style="background:#0078d4;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI', sans-serif;">
        <div style="background:#fff;color:#333;width:80%;height:75%;border-radius:6px;box-shadow:0 15px 35px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;padding:2rem;">
          <div style="font-size:1.1rem;font-weight:600;margin-bottom:8px;color:#0078d4;display:flex;align-items:center;gap:6px;">🪟 Instalação do Windows</div>
          <p style="font-size:0.75rem;color:#666;margin-bottom:1.5rem;">Selecione o idioma e formato de teclado.</p>
          
          <div style="flex:1;display:flex;flex-direction:column;gap:10px;font-size:0.75rem;">
            <div>
              <label style="display:block;margin-bottom:3px;font-weight:600;">Idioma a instalar:</label>
              <select style="width:100%;padding:5px;border-radius:4px;border:1px solid #ccc;"><option>Português (Brasil)</option></select>
            </div>
            <div>
              <label style="display:block;margin-bottom:3px;font-weight:600;">Teclado ou método de entrada:</label>
              <select style="width:100%;padding:5px;border-radius:4px;border:1px solid #ccc;"><option>Português (Brasil ABNT2)</option></select>
            </div>
          </div>

          <button class="fluent-btn sim-interactive-element" id="win-wizard-next1" style="background:#0078d4;width:auto;margin-left:auto;">Avançar ➔</button>
        </div>
      </div>
    `;

    document.getElementById("win-wizard-next1").onclick = () => {
      SOUNDS.click();
      
      screen.innerHTML = `
        <div style="background:#0078d4;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI', sans-serif;">
          <div style="background:#fff;color:#333;width:80%;height:75%;border-radius:6px;box-shadow:0 15px 35px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;padding:2rem;">
            <div style="font-size:1.1rem;font-weight:600;margin-bottom:8px;color:#0078d4;">Instalação Personalizada</div>
            <p style="font-size:0.75rem;color:#666;margin-bottom:12px;">Selecione a unidade de disco para instalar o Windows:</p>
            
            <div style="flex:1;border:1px solid #ccc;border-radius:4px;padding:8px;overflow-y:auto;font-size:0.72rem;margin-bottom:12px;">
              <table style="width:100%;border-collapse:collapse;">
                <thead>
                  <tr style="background:#f3f3f3;text-align:left;border-bottom:1px solid #ddd;">
                    <th style="padding:6px;">Nome</th>
                    <th style="padding:6px;">Espaço Total</th>
                    <th style="padding:6px;">Espaço Livre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="drive-row" style="cursor:pointer;background:#e5f1fb;">
                    <td style="padding:6px;">💿 Espaço não alocado na Unidade 0 (SSD)</td>
                    <td style="padding:6px;">465.8 GB</td>
                    <td style="padding:6px;">465.8 GB</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="display:flex;gap:6px;margin-bottom:12px;font-size:0.7rem;">
              <button class="sim-interactive-element" style="padding:4px 8px;border:1px solid #ccc;background:#fff;cursor:pointer;border-radius:4px;" id="btn-win-new-part"> Novo</button>
              <button class="sim-interactive-element" style="padding:4px 8px;border:1px solid #ccc;background:#fff;cursor:pointer;border-radius:4px;" id="btn-win-format-part"> Formatar</button>
            </div>

            <button class="fluent-btn sim-interactive-element" id="win-wizard-next2" style="background:#0078d4;width:auto;margin-left:auto;">Avançar (Instalar) ➔</button>
          </div>
        </div>
      `;

      let drivePartitioned = false;
      document.getElementById("btn-win-new-part").onclick = () => {
        SOUNDS.snap();
        drivePartitioned = true;
        const row = document.getElementById("drive-row");
        if (row) {
          row.innerHTML = `
            <td style="padding:6px;font-weight:600;">Unidade 0 Partição 1 (Sistema)</td>
            <td style="padding:6px;">465.8 GB</td>
            <td style="padding:6px;">465.8 GB (Formatado NTFS)</td>
          `;
        }
      };

      document.getElementById("win-wizard-next2").onclick = () => {
        if (!drivePartitioned) {
          SOUNDS.error();
          alert("Você precisa criar uma partição (clique em 'Novo') no SSD antes de instalar!");
          return;
        }

        SOUNDS.click();
        
        screen.innerHTML = `
          <div style="background:#0078d4;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI', sans-serif;">
            <div style="background:#fff;color:#333;width:80%;height:75%;border-radius:6px;box-shadow:0 15px 35px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;padding:2rem;">
              <div style="font-size:1.1rem;font-weight:600;margin-bottom:12px;color:#0078d4;">Instalando o Windows...</div>
              
              <div style="flex:1;display:flex;flex-direction:column;gap:8px;font-size:0.75rem;">
                <div id="inst-step-1">✓ Copiando arquivos do Windows (100%)</div>
                <div id="inst-step-2" style="font-weight:bold;color:#0078d4;">🗘 Preparando arquivos para instalação: <span id="inst-pct">0%</span></div>
                <div id="inst-step-3" style="opacity:0.4;"> Installing features</div>
                <div id="inst-step-4" style="opacity:0.4;"> Installing updates</div>
              </div>

              <div style="width:100%;height:6px;background:#eee;border-radius:3px;overflow:hidden;margin-top:auto;">
                <div id="inst-progress-bar" style="width:0%;height:100%;background:#0078d4;transition:width 0.1s;"></div>
              </div>
            </div>
          </div>
        `;

        let pct = 0;
        const progress = () => {
          if (pct <= 100) {
            document.getElementById("inst-pct").textContent = `${pct}%`;
            document.getElementById("inst-progress-bar").style.width = `${pct}%`;
            pct += 4;
            setTimeout(progress, 80);
          } else {
            document.getElementById("inst-step-2").innerHTML = "✓ Preparando arquivos para instalação (100%)";
            document.getElementById("inst-step-2").style.color = "";
            document.getElementById("inst-step-2").style.fontWeight = "normal";
            
            document.getElementById("inst-step-3").style.opacity = "1";
            document.getElementById("inst-step-3").textContent = "✓ Instalando recursos (100%)";
            
            document.getElementById("inst-step-4").style.opacity = "1";
            document.getElementById("inst-step-4").textContent = "✓ Concluindo atualizações";
            
            setTimeout(() => {
              SOUNDS.success();
              simState.osInstalled = true;
              simState.step = 6;
              saveLocalState();
              runCurrentStep();
            }, 1000);
          }
        };
        progress();
      };
    };
  }

  // ==========================================================================
  // MONITOR VIRTUAL — WINDOWS 11 DESKTOP
  // ==========================================================================
  let activeWindowId = null;

  function renderVirtualDesktop(desktop) {
    if (!desktop) return;

    const iconsArea = document.getElementById("winlab-desktop-icons");
    if (!iconsArea) return;
    iconsArea.style.display = "";
    iconsArea.innerHTML = `
      <div class="winlab-icon" id="icon-dev-manager">
        <div class="winlab-icon-img">⚙️</div>
        <div class="winlab-icon-label">Gerenciador Dispositivos</div>
      </div>
      <div class="winlab-icon" id="icon-store">
        <div class="winlab-icon-img">💿</div>
        <div class="winlab-icon-label">Central de Softwares</div>
      </div>
      <div class="winlab-icon" id="icon-explorer">
        <div class="winlab-icon-img">📁</div>
        <div class="winlab-icon-label">Explorador de Arquivos</div>
      </div>
      <div class="winlab-icon" id="icon-diag">
        <div class="winlab-icon-img">🩺</div>
        <div class="winlab-icon-label">Diagnósticos Finais</div>
      </div>
    `;

    document.getElementById("icon-dev-manager").onclick = () => openOSWindow("dev-manager");
    document.getElementById("icon-store").onclick = () => openOSWindow("store");
    document.getElementById("icon-explorer").onclick = () => openOSWindow("explorer");
    document.getElementById("icon-diag").onclick = () => openOSWindow("diag");

    if (activeWindowId) {
      drawOSWindow(activeWindowId);
    }
  }

  function openOSWindow(id) {
    SOUNDS.click();
    activeWindowId = id;
    drawOSWindow(id);
    const bar = document.getElementById("winlab-taskbar-items");
    if (bar) {
      bar.innerHTML = `<div class="winlab-taskbar-item active">${id === "dev-manager" ? "⚙️" : id === "store" ? "💿" : id === "explorer" ? "📁" : "🩺"} ${id === "dev-manager" ? "Gerenciador Dispositivos" : id === "store" ? "Central de Softwares" : id === "explorer" ? "Explorador de Arquivos" : "Diagnósticos"}</div>`;
    }
  }

  function closeOSWindow() {
    SOUNDS.click();
    activeWindowId = null;
    const container = document.getElementById("desktop-window-container");
    if (container) container.innerHTML = "";
    const bar = document.getElementById("winlab-taskbar-items");
    if (bar) bar.innerHTML = "";
  }

  function drawOSWindow(id) {
    const container = document.getElementById("desktop-window-container");
    if (!container) return;

    container.innerHTML = "";
    container.style.pointerEvents = "auto";

    let title = "";
    let bodyHtml = "";

    if (id === "dev-manager") {
      title = "Gerenciador de Dispositivos";
      bodyHtml = getDevManagerHtml();
    } else if (id === "store") {
      title = "Central de Softwares InforMestre";
      bodyHtml = getStoreHtml();
    } else if (id === "explorer") {
      title = "Explorador de Arquivos";
      bodyHtml = getExplorerHtml();
    } else if (id === "diag") {
      title = "Ferramenta de Diagnóstico Final";
      bodyHtml = getDiagnosticsHtml();
    }

    container.innerHTML = `
      <div class="winlab-window open" style="width:420px;max-height:360px;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:auto;">
        <div class="winlab-win-header">
          <div class="winlab-win-title">${title}</div>
          <div class="winlab-win-controls">
            <button class="winlab-win-btn winlab-win-min" disabled></button>
            <button class="winlab-win-btn winlab-win-max" disabled></button>
            <button class="winlab-win-btn winlab-win-close" id="btn-close-os-win"></button>
          </div>
        </div>
        <div class="winlab-win-body">
          ${bodyHtml}
        </div>
      </div>
    `;

    document.getElementById("btn-close-os-win").onclick = () => {
      container.style.pointerEvents = "none";
      closeOSWindow();
    };

    bindWindowActions(id);
  }

  function getDevManagerHtml() {
    const d = simState.driversUpdated;

    return `
      <div style="font-size:0.75rem;line-height:1.4;">
        <p style="margin:0 0 10px;color:rgba(255,255,255,0.7);">Instale os drivers oficiais para corrigir avisos de conflito do sistema.</p>
        
        <div style="display:flex;flex-direction:column;gap:6px;">
          
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);">
            <div>
              <span style="font-size:1.1rem;margin-right:6px;">🧠</span>
              <strong style="${d.chipset ? 'color:#10b981;' : 'color:#fbbf24;'}">Chipset Placa-mãe</strong>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">${d.chipset ? 'Driver Atualizado (v10.1)' : '⚠ Driver genérico instalado'}</div>
            </div>
            <button class="fluent-btn btn-update-driver" data-id="chipset" style="width:auto;font-size:0.62rem;padding:4px 10px;" ${d.chipset ? 'disabled' : ''}>${d.chipset ? 'Atualizado' : 'Atualizar'}</button>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);">
            <div>
              <span style="font-size:1.1rem;margin-right:6px;">🖥️</span>
              <strong style="${d.video ? 'color:#10b981;' : 'color:#fbbf24;'}">Controlador Gráfico (GPU)</strong>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">${d.video ? 'Driver Nvidia GeForce (v535.8)' : '⚠ Resolução de tela baixa (1024x768)'}</div>
            </div>
            <button class="fluent-btn btn-update-driver" data-id="video" style="width:auto;font-size:0.62rem;padding:4px 10px;" ${d.video ? 'disabled' : ''}>${d.video ? 'Atualizado' : 'Atualizar'}</button>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);">
            <div>
              <span style="font-size:1.1rem;margin-right:6px;">🌐</span>
              <strong style="${d.net ? 'color:#10b981;' : 'color:#fbbf24;'}">Adaptador de Rede (Ethernet)</strong>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">${d.net ? 'Realtek Gigabit Driver (v10.0)' : '⚠ Desconectado - Sem rede'}</div>
            </div>
            <button class="fluent-btn btn-update-driver" data-id="net" style="width:auto;font-size:0.62rem;padding:4px 10px;" ${d.net ? 'disabled' : ''}>${d.net ? 'Atualizado' : 'Atualizar'}</button>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);">
            <div>
              <span style="font-size:1.1rem;margin-right:6px;">🔊</span>
              <strong style="${d.audio ? 'color:#10b981;' : 'color:#fbbf24;'}">Controlador de Áudio</strong>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">${d.audio ? 'Driver Realtek Audio Codec' : '⚠ Dispositivo mudo'}</div>
            </div>
            <button class="fluent-btn btn-update-driver" data-id="audio" style="width:auto;font-size:0.62rem;padding:4px 10px;" ${d.audio ? 'disabled' : ''}>${d.audio ? 'Atualizado' : 'Atualizar'}</button>
          </div>

        </div>
      </div>
    `;
  }

  function getStoreHtml() {
    return `
      <div style="font-size:0.75rem;">
        <p style="margin:0 0 10px;color:rgba(255,255,255,0.7);">Instale os aplicativos essenciais requisitados pelo cliente.</p>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          ${APPS.map(app => {
            const isInst = simState.installedApps[app.id];
            return `
              <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px;display:flex;flex-direction:column;justify-content:space-between;height:85px;">
                <div style="display:flex;gap:6px;align-items:flex-start;">
                  <span style="font-size:1.4rem;">${app.icon}</span>
                  <div>
                    <strong style="font-size:0.7rem;display:block;">${app.name}</strong>
                    <span style="font-size:0.55rem;color:rgba(255,255,255,0.4);line-height:1.2;display:block;">${app.desc}</span>
                  </div>
                </div>
                <button class="fluent-btn btn-install-app" data-id="${app.id}" style="width:100%;font-size:0.6rem;padding:3px;height:24px;" ${isInst ? 'disabled' : ''}>
                  ${isInst ? '✓ Instalado' : 'Instalar'}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function getExplorerHtml() {
    const o = simState.filesOrganized;

    return `
      <div style="font-size:0.75rem;height:100%;display:flex;flex-direction:column;">
        <p style="margin:0 0 8px;color:rgba(255,255,255,0.7);">Organize a pasta Downloads e limpe arquivos lixo da lixeira.</p>
        
        <div style="display:flex;gap:8px;flex:1;">
          <div style="flex:1;background:rgba(0,0,0,0.2);border-radius:6px;border:1px solid rgba(255,255,255,0.05);padding:8px;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;">
            <div>
              <strong style="font-size:0.68rem;display:block;margin-bottom:6px;color:#fbbf24;">📁 Downloads (Junk)</strong>
              ${!o.backupMoved 
                ? `<div style="padding:4px;background:rgba(255,255,255,0.03);border-radius:4px;font-size:0.6rem;margin-bottom:4px;display:flex;justify-content:space-between;align-items:center;">
                    <span>📄 backup_cliente.zip (84GB)</span>
                    <button class="fluent-btn" id="btn-move-backup" style="width:auto;font-size:0.55rem;padding:2px 6px;">Mover p/ Docs</button>
                   </div>`
                : `<div style="font-size:0.6rem;color:rgba(255,255,255,0.2);text-align:center;padding:8px;">Downloads vazia.</div>`}
            </div>
          </div>

          <div style="flex:1;background:rgba(0,0,0,0.2);border-radius:6px;border:1px solid rgba(255,255,255,0.05);padding:8px;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;">
            <div>
              <strong style="font-size:0.68rem;display:block;margin-bottom:6px;color:#10b981;">📁 Documentos (Salvos)</strong>
              ${o.backupMoved 
                ? `<div style="padding:4px;background:rgba(16,185,129,0.08);border-radius:4px;font-size:0.6rem;margin-bottom:4px;color:#10b981;">
                    ✓ backup_cliente.zip
                   </div>`
                : `<div style="font-size:0.6rem;color:rgba(255,255,255,0.2);text-align:center;padding:8px;">Vazia.</div>`}
            </div>
          </div>

          <div style="flex:1;background:rgba(0,0,0,0.2);border-radius:6px;border:1px solid rgba(255,255,255,0.05);padding:8px;display:flex;flex-direction:column;justify-content:space-between;min-height:140px;">
            <div>
              <strong style="font-size:0.68rem;display:block;margin-bottom:6px;color:#f87171;">🗑️ Lixeira</strong>
              ${!o.recycleBinEmptied 
                ? `<div style="padding:4px;background:rgba(255,255,255,0.03);border-radius:4px;font-size:0.6rem;margin-bottom:4px;">
                    📄 arq_temp_2026.log (12GB)
                   </div>`
                : `<div style="font-size:0.6rem;color:rgba(255,255,255,0.2);text-align:center;padding:8px;">Lixeira vazia.</div>`}
            </div>
            <button class="fluent-btn" id="btn-empty-recycle" style="background:#f87171;font-size:0.55rem;padding:4px;" ${o.recycleBinEmptied ? 'disabled' : ''}>
              ${o.recycleBinEmptied ? '✓ Esvaziada' : 'Esvaziar Lixeira'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function getDiagnosticsHtml() {
    const d = simState.diagnosticsChecked;

    return `
      <div style="font-size:0.75rem;">
        <p style="margin:0 0 10px;color:rgba(255,255,255,0.7);">Execute testes finais de controle de qualidade antes de entregar.</p>
        
        <div style="display:flex;flex-direction:column;gap:6px;">
          
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);">
            <div>
              <strong style="${d.ping ? 'color:#10b981;' : 'color:#fbbf24;'}">Teste de Conexão à Internet (Ping)</strong>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">${d.ping ? '✓ Ping: 12ms (Conectado)' : 'Pendente'}</div>
            </div>
            <button class="fluent-btn btn-run-test" data-id="ping" style="width:auto;font-size:0.62rem;padding:4px 10px;" ${d.ping ? 'disabled' : ''}>Testar</button>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);">
            <div>
              <strong style="${d.sound ? 'color:#10b981;' : 'color:#fbbf24;'}">Teste de Áudio (Canais L/R)</strong>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">${d.sound ? '✓ Áudio Estéreo OK' : 'Pendente'}</div>
            </div>
            <button class="fluent-btn btn-run-test" data-id="sound" style="width:auto;font-size:0.62rem;padding:4px 10px;" ${d.sound ? 'disabled' : ''}>Testar</button>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);">
            <div>
              <strong style="${d.temp ? 'color:#10b981;' : 'color:#fbbf24;'}">Temperatura de Estresse do Processador</strong>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">${d.temp ? '✓ Idle: 36°C / Stress: 64°C (Pasta Térmica OK)' : 'Pendente'}</div>
            </div>
            <button class="fluent-btn btn-run-test" data-id="temp" style="width:auto;font-size:0.62rem;padding:4px 10px;" ${d.temp ? 'disabled' : ''}>Testar</button>
          </div>

        </div>
      </div>
    `;
  }

  function showProgressInBody(bodyEl, stages, onDone) {
    if (!bodyEl) { onDone(); return; }
    let stepIdx = 0, pct = 0;
    bodyEl.innerHTML = `
      <div style="text-align:center;padding:20px 12px;">
        <div style="font-size:2rem;margin-bottom:6px;">${stages.icon}</div>
        <div style="font-size:0.75rem;font-weight:600;color:rgba(255,255,255,0.8);margin-bottom:4px;">${stages.device}</div>
        <div id="prog-status" style="font-size:0.6rem;color:#a78bfa;margin-bottom:12px;">${stages.steps[0].label}</div>
        <div style="width:90%;margin:0 auto;height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">
          <div id="prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#818cf8,#6366f1);border-radius:4px;transition:width 0.15s;"></div>
        </div>
        <div id="prog-pct" style="font-size:0.55rem;color:rgba(255,255,255,0.4);margin-top:4px;">0%</div>
        <div id="prog-detail" style="font-size:0.5rem;color:rgba(255,255,255,0.2);margin-top:8px;"></div>
      </div>
    `;
    function tick() {
      const bar = document.getElementById("prog-bar");
      const status = document.getElementById("prog-status");
      const pctEl = document.getElementById("prog-pct");
      const detail = document.getElementById("prog-detail");
      if (!bar || !status || !pctEl) { onDone(); return; }
      const currentStep = stages.steps[stepIdx];
      pct += currentStep.speed || 2;
      if (pct >= currentStep.end) {
        pct = currentStep.end;
        status.textContent = currentStep.doneLabel || currentStep.label;
        if (currentStep.detail) detail.textContent = currentStep.detail;
        stepIdx++;
        if (stepIdx >= stages.steps.length) {
          bar.style.width = "100%";
          pctEl.textContent = "100%";
          status.textContent = stages.doneLabel || "✓ Concluído";
          status.style.color = "#10b981";
          if (stages.doneDetail) detail.textContent = stages.doneDetail;
          setTimeout(onDone, 600);
          return;
        }
      }
      bar.style.width = pct + "%";
      pctEl.textContent = Math.round(pct) + "%";
      const nextStep = stages.steps[stepIdx];
      status.textContent = nextStep.label;
      if (nextStep.detail) detail.textContent = nextStep.detail;
      setTimeout(tick, 60 + Math.random() * 60);
    }
    tick();
  }

  function bindWindowActions(id) {
    if (id === "dev-manager") {
      document.querySelectorAll(".btn-update-driver").forEach(btn => {
        btn.onclick = () => {
          const did = btn.dataset.id;
          const names = { chipset: "Chipset Placa-mãe", video: "GPU NVIDIA GeForce", net: "Adaptador Ethernet Realtek", audio: "Codec Áudio Realtek" };
          const icons = { chipset: "🧠", video: "🖥️", net: "🌐", audio: "🔊" };
          const body = document.querySelector(".winlab-win-body");
          SOUNDS.snap();

          showProgressInBody(body, {
            icon: icons[did] || "⚙️",
            device: names[did] || did,
            steps: [
              { label: `Baixando driver ${names[did]}...`, end: 55, speed: 4, detail: "Fonte: drivers.infortech.com.br/repo" },
              { label: "Extraindo pacote de instalação...", end: 72, speed: 3, detail: "Verificando integridade do arquivo CAB" },
              { label: "Instalando driver no sistema...", end: 90, speed: 2, detail: "Gravando chaves no registro do Windows" },
              { label: "Verificando compatibilidade...", end: 100, speed: 1.5, doneLabel: "✓ Driver instalado com sucesso!", detail: "Dispositivo reconhecido pelo sistema operacional" }
            ],
            doneLabel: "✓ Driver instalado com sucesso!"
          }, () => {
            SOUNDS.snap();
            simState.driversUpdated[did] = true;
            saveLocalState();
            drawOSWindow("dev-manager");

            const allDrivers = Object.values(simState.driversUpdated).every(x => x);
            if (allDrivers && simState.step === 6) {
              setTimeout(() => {
                SOUNDS.success();
                triggerModal(
                  "⚙️ Drivers Instalados com Sucesso",
                  "O chipset, a GPU (placa de vídeo), o som e o controlador de rede foram atualizados com os drivers corretos. O computador agora reconhece as peças físicas perfeitamente e pode rodar em resolução nativa.",
                  "Drivers de dispositivos são códigos específicos que fazem a tradução entre as instruções genéricas do sistema operacional e o comportamento elétrico exato de um chip de marca específica (ex: Nvidia, Realtek).",
                  "Instalar drivers incorretos ou incompatíveis com o chipset pode causar travamentos intermitentes e a temida Tela Azul da Morte (BSOD).",
                  () => {
                    simState.step = 7;
                    saveLocalState();
                    closeOSWindow();
                    runCurrentStep();
                  }
                );
              }, 600);
            }
          });
        };
      });
    } else if (id === "store") {
      document.querySelectorAll(".btn-install-app").forEach(btn => {
        btn.onclick = () => {
          const appid = btn.dataset.id;
          const appInfo = APPS.find(a => a.id === appid);
          const body = document.querySelector(".winlab-win-body");
          SOUNDS.snap();

          showProgressInBody(body, {
            icon: appInfo ? appInfo.icon : "📦",
            device: appInfo ? appInfo.name : appid,
            steps: [
              { label: "Baixando instalador...", end: 40, speed: 5, detail: appInfo ? `Fonte: ${appInfo.name}.org/downloads` : "" },
              { label: "Copiando arquivos do programa...", end: 70, speed: 3, detail: "Extraindo para C:\\Program Files" },
              { label: "Registrando componentes no sistema...", end: 92, speed: 2, detail: "Gravando atalhos no Menu Iniciar" },
              { label: "Verificando instalação...", end: 100, speed: 1.5, doneLabel: "✓ Instalação concluída!", detail: appInfo ? `${appInfo.name} pronto para uso` : "" }
            ],
            doneLabel: "✓ Instalação concluída!"
          }, () => {
            SOUNDS.snap();
            simState.installedApps[appid] = true;
            saveLocalState();
            drawOSWindow("store");

            const allApps = Object.values(simState.installedApps).every(x => x);
            if (allApps && simState.step === 7) {
              setTimeout(() => {
                SOUNDS.success();
                triggerModal(
                  "💿 Aplicativos Instalados",
                  "Todos os programas solicitados pelo cliente foram baixados das fontes oficiais e instalados na partição de sistema. A máquina agora está pronta para produtividade doméstica e empresarial.",
                  "Instalar softwares de fontes desconhecidas ou modificados (piratas) é um dos vetores principais de invasão de malwares, adwares e trojans na atualidade.",
                  "Sempre leia atentamente as caixas de verificação ao instalar novos aplicativos para evitar a instalação oculta de barras de ferramentas ou navegadores extras indesejados.",
                  () => {
                    simState.step = 8;
                    saveLocalState();
                    closeOSWindow();
                    runCurrentStep();
                  }
                );
              }, 600);
            }
          });
        };
      });
    } else if (id === "explorer") {
      const btnMove = document.getElementById("btn-move-backup");
      if (btnMove) {
        btnMove.onclick = () => {
          SOUNDS.snap();
          simState.filesOrganized.backupMoved = true;
          saveLocalState();
          drawOSWindow("explorer");
          checkExplorerStepCompletion();
        };
      }

      const btnEmpty = document.getElementById("btn-empty-recycle");
      if (btnEmpty) {
        btnEmpty.onclick = () => {
          SOUNDS.snap();
          simState.filesOrganized.recycleBinEmptied = true;
          saveLocalState();
          drawOSWindow("explorer");
          checkExplorerStepCompletion();
        };
      }
    } else if (id === "diag") {
      document.querySelectorAll(".btn-run-test").forEach(btn => {
        btn.onclick = () => {
          const tid = btn.dataset.id;
          
          if (tid === "sound") {
            SOUNDS.boot();
          } else {
            SOUNDS.click();
          }

          simState.diagnosticsChecked[tid] = true;
          saveLocalState();
          drawOSWindow("diag");

          const allTests = Object.values(simState.diagnosticsChecked).every(x => x);
          if (allTests && simState.step === 9) {
            setTimeout(() => {
              SOUNDS.success();
              triggerModal(
                "🩺 Diagnóstico e Controle de Qualidade",
                "O computador passou em todos os testes do checklist de controle de qualidade da InforTech. A temperatura do processador a 64°C sob estresse valida a perfeita aplicação da pasta térmica e do cooler.",
                "O controle de qualidade final de bancada evita retrabalhos e custos adicionais causados por pequenos erros, como ventoinhas desconectadas ou memórias frouxas.",
                "Entregar o PC ao cliente sem rodar testes de estresse de CPU/RAM pode ocultar problemas de travamento por superaquecimento térmico.",
                () => {
                  simState.step = 10;
                  saveLocalState();
                  closeOSWindow();
                  runCurrentStep();
                }
              );
            }, 1000);
          }
        };
      });
    }
  }

  function checkExplorerStepCompletion() {
    const o = simState.filesOrganized;
    if (o.backupMoved && o.recycleBinEmptied && simState.step === 8) {
      setTimeout(() => {
        SOUNDS.success();
        triggerModal(
          "📁 Arquivos Organizados",
          "O backup pessoal do cliente foi restaurado com sucesso na pasta de documentos e os arquivos temporários gigantes de instalação foram deletados e esvaziados da lixeira.",
          "O esvaziamento permanente de arquivos indesejados e temporários recupera espaço de armazenamento e acelera as buscas indexadas do sistema.",
          "Apagar acidentalmente o backup original sem validar se ele foi descompactado ou movido para a pasta correta é o erro mais grave cometido por técnicos iniciantes.",
          () => {
            simState.step = 9;
            saveLocalState();
            closeOSWindow();
            runCurrentStep();
          }
        );
      }, 1000);
    }
  }

  // ==========================================================================
  // ETAPA 10 — RELATÓRIO TÉCNICO E CERTIFICADO
  // ==========================================================================
  function renderStep10Report(screen) {
    if (!screen) screen = document.getElementById("virtual-screen-content");
    if (!screen) return;
    const iconsArea = document.getElementById("winlab-desktop-icons");
    if (iconsArea) iconsArea.style.display = "none";
    screen.style.display = "block";

    const durationMin = Math.round((Date.now() - simState.startTime) / 60000) || 5;

    screen.innerHTML = `
      <div style="background:#090915;width:100%;height:100%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:12px;">
        <div style="background:rgba(30,30,55,0.9);border:1px solid rgba(131,82,255,0.25);border-radius:12px;width:95%;height:95%;box-sizing:border-box;padding:16px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;">
          
          <div style="text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:8px;">
            <span style="font-size:1.6rem;display:block;">📜</span>
            <strong style="font-size:0.9rem;color:#10b981;">Relatório Final de Ordem de Serviço</strong>
            <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);">InforTech Soluções Digitais Ltda.</div>
          </div>

          <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.7rem;margin-top:10px;line-height:1.4;">
            <div style="background:rgba(255,255,255,0.02);padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);">
              <h4 style="margin:0 0 6px;color:#a78bfa;font-size:0.75rem;">Metadados do Serviço</h4>
              <div><strong>Técnico:</strong> Aluno InforMestre</div>
              <div><strong>Tempo gasto:</strong> ${durationMin} minutos</div>
              <div><strong>Erros cometidos:</strong> ${simState.errors}</div>
              <div><strong>Nota final:</strong> ${Math.max(10 - simState.errors, 5)}/10</div>
            </div>
            <div style="background:rgba(255,255,255,0.02);padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);">
              <h4 style="margin:0 0 6px;color:#10b981;font-size:0.75rem;">Checklist Técnico Concluído</h4>
              <div>✓ Montagem física 3D das peças</div>
              <div>✓ Teste POST e BIOS OK</div>
              <div>✓ Windows 11 instalado</div>
              <div>✓ Drivers atualizados</div>
              <div>✓ Apps essenciais configurados</div>
            </div>
          </div>

          <div style="text-align:center;margin-top:12px;">
            <button class="fluent-btn" id="btn-finish-os-report" style="padding:10px;width:auto;margin:0 auto;display:inline-flex;">
              🎓 Entregar PC e Gerar Certificado
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btn-finish-os-report").onclick = () => {
      SOUNDS.success();
      if (window.currentUser && window.currentUserProfile) {
        if (typeof window.saveProgressToDb === "function") {
          window.saveProgressToDb(window.currentUser.id, window.state);
        }
      }
      
      if (window.state && window.state.completedLessons) {
        window.state.completedLessons["aula-8"] = true;
        if (window.state.unlockedAchievements) {
          window.state.unlockedAchievements["windows_explorer"] = true;
        }
      }

      const certIdx = COURSE_CONTENT.findIndex(s => s.id === "aula8-certificado");
      if (certIdx !== -1) {
        window.loadSlide(certIdx);
      }
    };
  }

  function renderStepMonitorVirtual() {
    const htmlOverlay = document.getElementById("sim-html-overlay");
    if (!htmlOverlay) return;

    htmlOverlay.innerHTML = `
      <div id="winlab-desktop" style="width:100%;height:100%;position:relative;overflow:hidden;background:linear-gradient(135deg,#1e1b4b 0%,#311042 50%,#030712 100%);user-select:none;">
        <div class="winlab-icons" id="winlab-desktop-icons"></div>
        <div id="virtual-screen-content" style="display:none;width:100%;height:100%;position:absolute;top:0;left:0;z-index:200;"></div>
        <div id="desktop-window-container" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50;"></div>
        <div class="winlab-taskbar" style="z-index:100;">
          <button class="winlab-start-btn" id="winlab-start-btn"><span style="font-size:16px;">🪟</span> Iniciar</button>
          <div class="winlab-taskbar-divider"></div>
          <div class="winlab-taskbar-items" id="winlab-taskbar-items" style="display:flex;gap:2px;flex:1;"></div>
          <div class="winlab-tray"><span>🔊</span><span>🔌</span><span class="winlab-clock" id="winlab-clock">--:--</span></div>
        </div>
        <div class="winlab-start-menu" id="winlab-start-menu">
          <div class="winlab-start-header">🪟 Iniciar</div>
          <div class="winlab-start-item" data-start-app="dev-manager"><span class="winlab-start-item-icon">⚙️</span><span class="winlab-start-item-label">Gerenciador Dispositivos</span></div>
          <div class="winlab-start-item" data-start-app="store"><span class="winlab-start-item-icon">💿</span><span class="winlab-start-item-label">Central de Softwares</span></div>
          <div class="winlab-start-item" data-start-app="explorer"><span class="winlab-start-item-icon">📁</span><span class="winlab-start-item-label">Explorador de Arquivos</span></div>
          <div class="winlab-start-item" data-start-app="diag"><span class="winlab-start-item-icon">🩺</span><span class="winlab-start-item-label">Diagnósticos Finais</span></div>
        </div>
      </div>
    `;
    htmlOverlay.style.display = "block";

    // Clock
    (function updateClock() {
      const now = new Date();
      const el = document.getElementById("winlab-clock");
      if (el) el.textContent = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    })();
    const clockInt = setInterval(() => {
      const now = new Date();
      const el = document.getElementById("winlab-clock");
      if (el) el.textContent = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    }, 10000);

    // Start menu
    const startBtn = document.getElementById("winlab-start-btn");
    const startMenu = document.getElementById("winlab-start-menu");
    if (startBtn) {
      startBtn.onclick = (e) => { e.stopPropagation(); startMenu?.classList.toggle("open"); };
    }
    document.getElementById("winlab-desktop")?.addEventListener("click", (e) => {
      if (!e.target.closest("#winlab-start-menu") && !e.target.closest("#winlab-start-btn")) {
        startMenu?.classList.remove("open");
      }
    });
    startMenu?.querySelectorAll("[data-start-app]").forEach(item => {
      item.onclick = () => {
        startMenu?.classList.remove("open");
        const app = item.dataset.startApp;
        if (app === "dev-manager") openOSWindow("dev-manager");
        else if (app === "store") openOSWindow("store");
        else if (app === "explorer") openOSWindow("explorer");
        else if (app === "diag") openOSWindow("diag");
      };
    });

    const desktop = document.getElementById("winlab-desktop");
    if (simState.step === 10) {
      renderStep10Report(null);
    } else {
      updateVirtualScreen();
    }
  }

})();
