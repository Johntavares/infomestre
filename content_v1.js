const COURSE_CONTENT = [
  {
    id: "boas-vindas",
    title: "Boas-vindas ao Curso",
    page: 1,
    type: "intro",
    chapter: "AULA 1 – INTRODUÇÃO À INFORMÁTICA",
    content: `
      <div class="welcome-container text-center">
        <div class="welcome-badge">🚀 AULA 1</div>
        <h1 class="welcome-title">Bem-vindo ao Curso de Informática Básica!</h1>
        <p class="welcome-subtitle">Sua jornada para dominar a tecnologia começa aqui.</p>
        
        <div class="welcome-card card-gradient">
          <h3>🖥️ O que é este curso?</h3>
          <p>Este curso foi projetado para transformar você de um utilizador comum em alguém que compreende como a computação funciona e como usá-la a seu favor de maneira eficiente, produtiva e segura.</p>
        </div>

        <div class="grid grid-2 gap-2 mt-2">
          <div class="card bg-surface border-soft">
            <h4>💡 Interativo e Prático</h4>
            <p>Esqueça apostilas chatas de ler! Aqui você vai montar peças de computador virtualmente, gerenciar arquivos em um simulador do Windows e resolver missões práticas para ganhar pontos de experiência (XP).</p>
          </div>
          <div class="card bg-surface border-soft">
            <h4>🏆 Gamificação</h4>
            <p>Ganhe conquistas, suba de nível e no final, se obtiver um bom rendimento na Avaliação Final, gere seu próprio Certificado de Conclusão diretamente pela plataforma.</p>
          </div>
        </div>

        <div class="alert alert-info mt-2">
          <strong>Aviso Importante:</strong> Seu progresso é salvo automaticamente neste computador. Você pode parar de estudar quando quiser e voltar exatamente de onde parou!
        </div>
      </div>
    `
  },
  {
    id: "como-utilizar",
    title: "Como Utilizar esta Apostila",
    page: 2,
    type: "intro",
    chapter: "AULA 1 – INTRODUÇÃO À INFORMÁTICA",
    content: `
      <h2>📖 Como Utilizar esta Apostila Digital</h2>
      <p>Esta plataforma combina teoria e prática de forma direta. Veja abaixo como navegar pelas suas aulas:</p>
      
      <div class="features-guide">
        <div class="guide-item">
          <div class="guide-icon">📂</div>
          <div class="guide-text">
            <strong>Barra Lateral de Navegação:</strong> À esquerda (ou no menu superior em celulares), você vê todos os capítulos. Os itens com <span class="badge badge-success">✓</span> são páginas que você já concluiu.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">🌟</div>
          <div class="guide-text">
            <strong>XP e Nível:</strong> Cada página lida rende <strong>10 XP</strong>. Desafios Práticos rendem <strong>50 XP</strong>. Acompanhe seu progresso no topo da barra lateral.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">🎮</div>
          <div class="guide-text">
            <strong>Simuladores e Desafios:</strong> Em vários capítulos, haverá widgets dinâmicos na tela. Siga as instruções do simulador para testar seu conhecimento na hora.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">📝</div>
          <div class="guide-text">
            <strong>Bloco de Anotações:</strong> Na aba direita de cada página, você tem um bloco de notas exclusivo para escrever o que aprendeu. Ele salva suas anotações individualmente por página!
          </div>
        </div>
      </div>

      <div class="tip-box">
        <h4>💡 Dica de Ouro</h4>
        <p>Tente ler com atenção cada tópico e interagir com os componentes visuais antes de partir para o "Desafio Prático" no final de cada capítulo.</p>
      </div>
    `
  },
  {
    id: "objetivos-missoes",
    title: "Objetivos e Missões da Aula",
    page: 3,
    type: "intro",
    chapter: "AULA 1 – INTRODUÇÃO À INFORMÁTICA",
    content: `
      <h2>🎯 Objetivos e Missões da Aula 1</h2>
      <p>Nesta primeira aula, nosso foco é construir a fundação da sua alfabetização digital. Ao concluir esta aula, você será capaz de:</p>
      
      <div class="grid grid-2 gap-2 mt-2">
        <div class="card card-outline">
          <div class="card-header">🛡️ Conhecimento Geral</div>
          <div class="card-body">
            <ul>
              <li>Compreender o papel da informática no mundo moderno.</li>
              <li>Explicar a diferença vital entre Hardware e Software.</li>
              <li>Identificar as partes físicas que compõem qualquer computador.</li>
            </ul>
          </div>
        </div>
        <div class="card card-outline">
          <div class="card-header">⚙️ Competências Práticas</div>
          <div class="card-body">
            <ul>
              <li>Conectar periféricos de entrada e saída corretamente.</li>
              <li>Navegar, criar pastas e organizar arquivos no Windows.</li>
              <li>Aplicar regras de ergonomia e segurança digital no dia a dia.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="missions-panel mt-3">
        <h3>🚀 Suas Missões Digitais:</h3>
        <ul class="mission-list">
          <li class="mission-item"><span class="mission-bullet">🏆</span> <strong>Missão 1:</strong> Reconstruir a evolução dos computadores no Simulador de Linha do Tempo.</li>
          <li class="mission-item"><span class="mission-bullet">🏆</span> <strong>Missão 2:</strong> Encaixar corretamente o Processador, RAM e SSD na placa-mãe do Simulador de Hardware.</li>
          <li class="mission-item"><span class="mission-bullet">🏆</span> <strong>Missão 3:</strong> Ligar os periféricos nas respectivas portas no Gabinete Virtual.</li>
          <li class="mission-item"><span class="mission-bullet">🏆</span> <strong>Missão 4:</strong> Criar uma pasta e organizar arquivos no Simulador do Windows.</li>
          <li class="mission-item"><span class="mission-bullet">🏆</span> <strong>Missão 5:</strong> Corrigir a postura do usuário no Simulador de Ergonomia.</li>
        </ul>
      </div>
    `
  },
  {
    id: "1-1-mundo-informatica",
    title: "1.1 O Mundo da Informática",
    page: 4,
    type: "lesson",
    chapter: "CAPÍTULO 1 – PRIMEIROS PASSOS NA INFORMÁTICA",
    content: `
      <h2>1.1 O Mundo da Informática</h2>
      <p>A palavra <strong>Informática</strong> surge da junção de dois termos essenciais: <strong>Informação</strong> + <strong>Automática</strong>. Ou seja, informática é o processamento automático da informação por meio de dispositivos eletrônicos chamados computadores.</p>
      
      <div class="concept-grid">
        <div class="concept-card">
          <div class="icon">📊</div>
          <div>
            <h4>Dado vs. Informação</h4>
            <p>Um <strong>dado</strong> é um elemento bruto e solto (exemplo: o número "26"). A <strong>informação</strong> é o dado processado e com significado (exemplo: "Hoje a temperatura é de 26°C"). O computador transforma dados em informação.</p>
          </div>
        </div>
      </div>

      <p class="mt-2">Hoje, a informática não está apenas em gabinetes gigantes sobre escrivaninhas. Ela está nos nossos bolsos (smartphones), eletrodomésticos (geladeiras smart), carros modernos e sistemas integrados que gerenciam hospitais, aviões e bancos.</p>
      
      <div class="highlight-quote">
        "O computador não é inteligente; ele é apenas extremamente rápido em executar instruções fornecidas por seres humanos."
      </div>
    `
  },
  {
    id: "1-2-historia-computadores",
    title: "1.2 A História dos Computadores",
    page: 5,
    type: "lesson",
    chapter: "CAPÍTULO 1 – PRIMEIROS PASSOS NA INFORMÁTICA",
    content: `
      <h2>1.2 A História dos Computadores</h2>
      <p>Os seres humanos sempre precisaram calcular coisas. O primeiro grande ancestral do computador foi o <strong>Ábaco</strong>, inventado há milhares de anos para realizar operações simples de matemática.</p>

      <div class="timeline-intro">
        <p>Ao longo dos séculos, inventores desenvolveram máquinas mecânicas (como a calculadora de Pascal e a máquina analítica de Charles Babbage — considerado o pai da computação). Porém, a computação moderna nasceu de verdade durante a Segunda Guerra Mundial, com a necessidade de decifrar códigos militares e calcular trajetórias de mísseis.</p>
      </div>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('ENIAC — O Primeiro Computador (1946)','O <strong>ENIAC</strong> (Electronic Numerical Integrator And Computer) foi o primeiro computador eletrônico de propósito geral do mundo. Ocupava <strong>180 m²</strong> (uma sala enorme!), pesava <strong>30 toneladas</strong> e usava <strong>17.468 válvulas a vácuo</strong> que precisavam ser constantemente trocadas pois queimavam com frequência. Foi construído na Universidade da Pensilvânia para calcular tabelas balísticas militares.','images/popup_eniac.png','História da Computação')">
          <h4>💾 ENIAC (1946)</h4>
          <p>O primeiro computador eletrônico digital de propósito geral. Ele ocupava uma sala inteira de 180m², pesava 30 toneladas e usava milhares de <strong>válvulas térmicas</strong> que queimavam a todo momento.</p>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Ada Lovelace & Alan Turing','<strong>Ada Lovelace</strong> (1815–1852) escreveu o primeiro algoritmo destinado a ser executado por uma máquina — a Máquina Analítica de Charles Babbage — tornando-se a primeira programadora da história da humanidade.<br><br><strong>Alan Turing</strong> (1912–1954) criou as bases teóricas da computação moderna com o conceito de &quot;Máquina de Turing&quot; e ajudou a decifrar o código Enigma dos nazistas na Segunda Guerra Mundial, salvando milhões de vidas.','images/popup_ada_turing.svg?v=3','Pioneiros da Computação')">
          <h4>👩‍💻 Ada Lovelace e Alan Turing</h4>
          <p><strong>Ada Lovelace</strong> escreveu o primeiro algoritmo para ser processado por uma máquina, sendo a primeira programadora da história. <strong>Alan Turing</strong> criou as bases teóricas da computação e ajudou a desvendar a máquina Enigma.</p>
        </div>
      </div>
    `
  },
  {
    id: "1-3-evolucao-computacao",
    title: "1.3 A Evolução da Computação",
    page: 6,
    type: "lesson",
    chapter: "CAPÍTULO 1 – PRIMEIROS PASSOS NA INFORMÁTICA",
    interactiveId: "timeline",
    content: `
      <h2>1.3 A Evolução da Computação</h2>
      <p>A evolução dos computadores é tradicionalmente dividida em <strong>Gerações</strong> baseadas nas tecnologias eletrônicas utilizadas para construí-los.</p>
      
      <p>Explore a linha do tempo abaixo clicando nos períodos para ver como os computadores encolheram em tamanho físico, mas cresceram exponencialmente em poder de processamento:</p>

      <div id="timeline-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "1-4-informatica-dia-dia",
    title: "1.4 A Informática no Dia a Dia",
    page: 7,
    type: "lesson",
    chapter: "CAPÍTULO 1 – PRIMEIROS PASSOS NA INFORMÁTICA",
    content: `
      <h2>1.4 A Informática no Dia a Dia</h2>
      <p>Você já parou para pensar em quantas vezes você interage com sistemas computacionais em um único dia?</p>

      <div class="grid grid-3 gap-2 mt-2">
        <div class="card bg-card-dark text-center">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏦</div>
          <h5>Transações Bancárias</h5>
          <p class="text-small">Sistemas de caixas eletrônicos, PIX e cartões de crédito dependem de redes seguras de computadores.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏥</div>
          <h5>Saúde e Medicina</h5>
          <p class="text-small">Exames de imagem (como ressonância) e monitoramento de pacientes dependem de softwares e processadores de alta precisão.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚗</div>
          <h5>Logística e Transporte</h5>
          <p class="text-small">Aplicativos de GPS, controle de tráfego aéreo e semáforos inteligentes são totalmente gerenciados por algoritmos.</p>
        </div>
      </div>

      <p class="mt-2">A inclusão digital não é mais um diferencial, mas sim um requisito de sobrevivência profissional e social. Saber usar o computador abre portas para o mercado de trabalho, otimiza tarefas diárias e facilita o acesso à informação e educação.</p>
    `
  },
  {
    id: "1-5-desafio-pratico",
    title: "1.5 Desafio Prático",
    page: 8,
    type: "challenge",
    chapter: "CAPÍTULO 1 – PRIMEIROS PASSOS NA INFORMÁTICA",
    content: `
      <h2>🏆 Desafio Prático do Capítulo 1</h2>
      <p>Responda às questões sobre a introdução à informática e a história dos computadores para testar o que você aprendeu e desbloquear XP!</p>
    `,
    quiz: [
      {
        question: "Qual foi a principal tecnologia eletrônica que marcou a 1ª Geração de computadores (como o ENIAC)?",
        options: ["Transistores", "Válvulas a Vácuo", "Circuitos Integrados (Chips)", "Microprocessadores"],
        correct: 1,
        explanation: "Os computadores de primeira geração dependiam de válvulas a vácuo gigantes, que esquentavam muito e queimavam constantemente."
      },
      {
        question: "Quem é considerada a primeira programadora da história da humanidade?",
        options: ["Ada Lovelace", "Marie Curie", "Grace Hopper", "Margaret Hamilton"],
        correct: 0,
        explanation: "Ada Lovelace escreveu o primeiro algoritmo para a máquina analítica de Babbage no século XIX, antes mesmo do computador eletrônico existir."
      },
      {
        question: "Qual é a diferença fundamental entre Dados e Informação na informática?",
        options: [
          "Dados são informações prontas e formatadas.",
          "Dados são elementos brutos sem contexto; informação são os dados processados e organizados com significado.",
          "Não há diferença, são sinônimos.",
          "Informação é o hardware e os dados são o software."
        ],
        correct: 1,
        explanation: "Dados são os elementos brutos e sem nexo específico. Quando tratados, contextualizados e organizados, tornam-se informação útil."
      }
    ]
  },
  {
    id: "2-1-que-hardware",
    title: "2.1 O que é Hardware?",
    page: 9,
    type: "lesson",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    content: `
      <h2>2.1 O que é Hardware?</h2>
      <p>Se você perguntar a um profissional de TI de forma humorada, a resposta clássica é: <strong>"Hardware é a parte que você chuta; Software é a parte que você xinga."</strong></p>

      <div class="definition-box card-gradient">
        <p>Falando de maneira séria, <strong>Hardware</strong> é toda a parte física do computador, ou seja, todos os componentes eletrônicos, placas, cabos, periféricos, carcaças e peças que você pode tocar fisicamente.</p>
      </div>

      <p class="mt-2">Sem o hardware, o software não tem onde rodar. Pense no computador como o corpo humano: o Hardware é o corpo físico (cérebro, coração, músculos) e o Software é a mente (pensamentos, memórias, habilidades aprendidas).</p>

      <div class="alert alert-warning">
        <strong>Importante:</strong> Manusear componentes de hardware exige cuidados com eletricidade estática, pois a energia acumulada no nosso corpo pode queimar circuitos integrados sensíveis.
      </div>
    `
  },
  {
    id: "2-2-componentes-computador",
    title: "2.2 Conhecendo os Componentes do Computador",
    page: 10,
    type: "lesson",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    content: `
      <h2>2.2 Componentes Internos do Computador</h2>
      <p>Quando abrimos o gabinete (aquela 'caixa' de metal que muitos chamam erroneamente de CPU), encontramos uma série de componentes trabalhando em perfeita sincronia:</p>

      <div class="components-showcase">
        <ul>
          <li><strong>Placa-Mãe (Motherboard):</strong> A grande placa onde tudo se conecta.</li>
          <li><strong>Processador (CPU):</strong> O chip principal que executa as contas e instruções.</li>
          <li><strong>Memória RAM:</strong> Armazenamento temporário ultrarrápido para os programas abertos na tela.</li>
          <li><strong>HD / SSD:</strong> Onde ficam guardados seus arquivos definitivos (sistema, fotos, jogos) mesmo desligando o PC.</li>
          <li><strong>Fonte de Alimentação:</strong> Converte e distribui a energia elétrica tomada nas tomadas domésticas.</li>
        </ul>
      </div>

      <p class="mt-2">Nos próximos tópicos, detalharemos cada um desses componentes principais para que você entenda exatamente o papel de cada um deles.</p>
    `
  },
  {
    id: "2-3-placa-mae",
    title: "2.3 A Placa-Mãe",
    page: 11,
    type: "lesson",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    content: `
      <h2>2.3 A Placa-Mãe (Motherboard)</h2>
      <p>A <strong>Placa-Mãe</strong> é a espinha dorsal e o sistema circulatório do computador. Ela serve como a central de conectividade física de todas as outras peças.</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div>
          <p>Nela, encontramos soquetes e slots específicos para encaixar os demais componentes:</p>
          <ul>
            <li><strong>Soquete da CPU:</strong> Onde o processador é encaixado e travado.</li>
            <li><strong>Slots de Memória (DIMM):</strong> Onde os módulos de RAM são encaixados verticalmente.</li>
            <li><strong>Portas SATA ou Conectores M.2:</strong> Onde ligamos os cabos e placas de armazenamento (HDs e SSDs).</li>
            <li><strong>Slots PCIe (PCI Express):</strong> Usados para conectar placas adicionais, como placas de vídeo para jogos e edição de imagem.</li>
          </ul>
        </div>
        <div class="card bg-surface border-soft flex flex-column justify-center align-center text-center info-card-clickable" onclick="openInfoPopup('Placa-Mãe (Motherboard)','A <strong>Placa-Mãe</strong> é o hub central que conecta fisicamente todos os componentes do computador. Ela possui trilhas condutoras chamadas <strong>barramentos</strong> que transportam dados a altíssima velocidade entre a CPU, RAM, armazenamento e demais periféricos. Sem ela, nenhum componente poderia se comunicar com outro.','images/popup_motherboard.png','Hardware Interno')">
          <span style="font-size: 5rem;">🎛️</span>
          <strong>Placa-Mãe</strong>
          <span class="text-muted text-small">Ela garante a comunicação rápida de dados entre a CPU, RAM e periféricos via "barramentos" elétricos.</span>
        </div>
      </div>
    `
  },
  {
    id: "2-4-processador",
    title: "2.4 O Processador: o Cérebro do Computador",
    page: 12,
    type: "lesson",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    content: `
      <h2>2.4 O Processador (CPU)</h2>
      <p>A sigla <strong>CPU</strong> significa <em>Central Processing Unit</em> (Unidade Central de Processamento). Ele é o verdadeiro <strong>cérebro</strong> do computador.</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-card-dark info-card-clickable" onclick="openInfoPopup('Frequência do Processador (Clock)','A <strong>frequência</strong> de um processador, medida em Gigahertz (GHz), indica quantos ciclos de operação ele pode executar por segundo. Um processador de <strong>3.5 GHz</strong> realiza 3,5 bilhões de operações a cada segundo! Processadores modernos (2024) chegam a 6 GHz em modo turbo. Quanto maior o clock, mais rápidas são as tarefas sequenciais, como abrir programas e calcular planilhas.','images/popup_cpu_clock.png','Processador (CPU)')">
          <h4>⚡ Frequência (Clock)</h4>
          <p>Medida em Gigahertz (GHz). Representa a quantidade de operações matemáticas que o processador pode fazer por segundo. Um processador de 3.5 GHz faz 3,5 bilhões de ciclos de cálculo por segundo!</p>
        </div>
        <div class="card bg-card-dark info-card-clickable" onclick="openInfoPopup('Núcleos do Processador (Cores)','Processadores modernos possuem múltiplos <strong>núcleos independentes</strong> de processamento — Dual-core (2), Quad-core (4), Hexa-core (6), Octa-core (8), até 24 núcleos! Cada núcleo é um &quot;mini-processador&quot; dentro do chip principal. Mais núcleos = melhor desempenho em multitarefa e em programas que aproveitam paralelismo, como edição de vídeo e jogos modernos.','images/popup_cpu_cores.png','Processador (CPU)')">
          <h4>🧠 Núcleos (Cores)</h4>
          <p>Processadores modernos têm vários "núcleos" independentes (Dual-core, Quad-core, Octa-core). Cada núcleo funciona como um cérebro individual, permitindo rodar múltiplos programas ao mesmo tempo sem travar.</p>
        </div>
      </div>

      <p class="mt-2">A CPU esquenta muito rapidamente sob estresse de processamento. Por isso, obrigatoriamente precisamos colocar sobre ela uma pasta térmica e um <strong>Cooler</strong> (ventilador ou dissipador de calor) para mantê-la fria e evitar danos físicos.</p>
    `
  },
  {
    id: "2-5-memoria-ram",
    title: "2.5 Memória RAM",
    page: 13,
    type: "lesson",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    content: `
      <h2>2.5 Memória RAM</h2>
      <p>A sigla <strong>RAM</strong> significa <em>Random Access Memory</em> (Memória de Acesso Aleatório).</p>

      <div class="highlight-box">
        <strong>Característica Vital:</strong> A RAM é uma memória <strong>volátil</strong>. Isso significa que tudo o que está guardado nela é apagado permanentemente quando o computador é desligado ou reiniciado.
      </div>

      <h4 class="mt-2">Para que ela serve?</h4>
      <p>Pense na RAM como a superfície da sua mesa de trabalho de escritório. Nela você coloca os papéis e pastas que está lendo e preenchendo <em>neste exato momento</em> para ter acesso rápido. Ao terminar o dia de trabalho e "fechar o escritório" (desligar o PC), você guarda tudo nos armários (HD/SSD) e limpa a mesa (a RAM esvazia).</p>

      <p>Se você tiver pouca RAM, sua "mesa" será pequena. Para abrir um novo programa pesado, o PC precisará guardar arquivos antigos de volta no HD (que é muito mais lento), fazendo o computador travar ou ficar "lento".</p>
    `
  },
  {
    id: "2-6-armazenamento-hd-ssd",
    title: "2.6 Armazenamento: HD e SSD",
    page: 14,
    type: "lesson",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    content: `
      <h2>2.6 Armazenamento: HD contra SSD</h2>
      <p>Diferente da RAM, a memória de armazenamento secundária é <strong>não-volátil</strong>. Os arquivos permanecem guardados mesmo sem energia elétrica.</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft info-card-clickable" onclick="openInfoPopup('HD — Disco Rígido (Hard Drive)','O <strong>HD</strong> armazena dados em pratos magnéticos giratórios (como um vinil/toca-disco!) a 5.400 ou 7.200 RPM. Uma cabeça de leitura se move mecanicamente sobre os pratos para ler/gravar dados. Por ter partes mecânicas em movimento, é mais lento, mais pesado e vulnerável a impactos físicos — se cair enquanto lê, pode arranhar os pratos e perder os dados para sempre!','images/popup_hd.png','Armazenamento')">
          <h4>💽 Disco Rígido (HD - Hard Drive)</h4>
          <ul>
            <li><strong>Como funciona:</strong> Placas magnéticas girando em alta velocidade lidas por uma agulha mecânica (como um toca-discos).</li>
            <li><strong>Vantagens:</strong> Muito barato para armazenar grandes volumes (ex: 2 Terabytes).</li>
            <li><strong>Desvantagens:</strong> Lento, pesado, esquenta bastante e é sensível a impactos físicos (pode quebrar se cair no chão ligado).</li>
          </ul>
        </div>
        <div class="card bg-surface border-soft info-card-clickable" onclick="openInfoPopup('SSD — Unidade de Estado Sólido','O <strong>SSD</strong> (Solid State Drive) usa chips de memória flash NAND — sem nenhuma peça mecânica em movimento. É silencioso, extremamente rápido (SSDs NVMe M.2 chegam a 7.000 MB/s de leitura!), leve e resistente a quedas. Instalar o Windows em um SSD transforma um computador antigo e lento em uma máquina ágil.','images/popup_ssd.png','Armazenamento')">
          <h4>💾 Unidade de Estado Sólido (SSD)</h4>
          <ul>
            <li><strong>Como funciona:</strong> Circuitos integrados de memória flash (sem peças móveis, semelhante a um pendrive gigante).</li>
            <li><strong>Vantagens:</strong> Extremamente rápido (até 10x ou 50x mais rápido que um HD para abrir o Windows e aplicativos), leve e resistente a quedas.</li>
            <li><strong>Desvantagens:</strong> Custo por gigabyte um pouco mais elevado do que o HD.</li>
          </ul>
        </div>
      </div>
      
      <div class="tip-box mt-2">
        <h4>⚡ Recomendação Prática</h4>
        <p>Instalar o Sistema Operacional (como o Windows) em um SSD é a atualização mais barata e eficaz para reviver um computador antigo e deixá-lo extremamente rápido.</p>
      </div>
    `
  },
  {
    id: "2-7-fonte-alimentacao",
    title: "2.7 Fonte de Alimentação",
    page: 15,
    type: "lesson",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    content: `
      <h2>2.7 A Fonte de Alimentação (PSU)</h2>
      <p>Nenhum circuito eletrônico do computador funciona sem energia. A <strong>Fonte de Alimentação</strong> (ou <em>Power Supply Unit</em>) tem duas funções vitais:</p>

      <div class="guide-item mt-2">
        <div class="guide-icon">🔌</div>
        <div class="guide-text">
          <strong>Conversão de Corrente:</strong> Ela recebe a Corrente Alternada (AC) de alta voltagem da rede elétrica da tomada de casa (110V ou 220V) e a transforma em Corrente Contínua (DC) de baixa voltagem (3.3V, 5V e 12V), que é o que os componentes eletrônicos usam.
        </div>
      </div>
      <div class="guide-item">
        <div class="guide-icon">🛡️</div>
        <div class="guide-text">
          <strong>Proteção Elétrica:</strong> Filtra ruídos elétricos básicos e queima o próprio fusível em caso de sobretensão severa da rede para evitar que a sobrecarga queime peças caras como a CPU e a Placa-Mãe.
        </div>
      </div>

      <div class="alert alert-danger mt-2">
        <strong>Atenção:</strong> Nunca tente abrir o gabinete metálico da fonte de alimentação com ela ligada ou mesmo fora da tomada sem conhecimento prévio. Seus capacitores internos armazenam cargas elétricas perigosas por muito tempo!
      </div>
    `
  },
  {
    id: "2-8-desafio-pratico",
    title: "2.8 Desafio Prático",
    page: 16,
    type: "challenge",
    chapter: "CAPÍTULO 2 – EXPLORANDO O COMPUTADOR",
    interactiveId: "hardware-builder",
    content: `
      <h2>🔧 Missão Prática: Montagem Virtual de Hardware</h2>
      <p><strong>Desafio:</strong> Chegou a hora de você construir seu próprio computador! Arraste ou clique nos componentes e posicione-os nos soquetes e locais indicados na Placa-Mãe abaixo. Encaixe a CPU, a RAM, o SSD e a Fonte para poder dar boot na máquina.</p>

      <div id="hardware-builder-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "3-1-dispositivos-entrada",
    title: "3.1 Dispositivos de Entrada",
    page: 17,
    type: "lesson",
    chapter: "CAPÍTULO 3 – CONHECENDO OS PERIFÉRICOS",
    content: `
      <h2>3.1 Dispositivos de Entrada (Input)</h2>
      <p>Os <strong>Periféricos</strong> são todos os aparelhos externos conectados à CPU que permitem a comunicação entre o usuário e o computador.</p>

      <div class="definition-box card-gradient">
        <p>Os <strong>Dispositivos de Entrada</strong> enviam informações do mundo externo para dentro do processador do computador. Eles permitem que nós enviemos comandos, textos e controle.</p>
      </div>

      <h4 class="mt-2">Exemplos Principais:</h4>
      <div class="grid grid-4 gap-1 mt-1">
        <div class="card text-center text-small info-card-clickable" onclick="openInfoPopup('Teclado Mecânico','O teclado envia um <strong>código de varredura</strong> (scancode) para o computador a cada tecla pressionada. Teclados mecânicos (como o da foto) usam switches individuais para cada tecla, oferecendo feedback tátil e durabilidade de mais de 50 milhões de pressionamentos por tecla!','images/popup_keyboard.png','Dispositivo de Entrada')">
          <div style="font-size:2rem">⌨️</div>
          <strong>Teclado</strong>
          <p>Envia códigos de teclas e caracteres de texto.</p>
        </div>
        <div class="card text-center text-small info-card-clickable" onclick="openInfoPopup('Mouse — Dispositivo Apontador','O mouse moderno usa um <strong>sensor óptico ou a laser</strong> que fotografa a superfície milhares de vezes por segundo para calcular o movimento. A precisão é medida em <strong>DPI</strong> (pontos por polegada) — quanto maior o DPI, maior a precisão do movimento na tela.','images/popup_mouse.png','Dispositivo de Entrada')">
          <div style="font-size:2rem">🖱️</div>
          <strong>Mouse</strong>
          <p>Envia coordenadas bidimensionais de movimento e cliques.</p>
        </div>
        <div class="card text-center text-small info-card-clickable" onclick="openInfoPopup('Microfone Digital','O microfone converte variações de pressão do ar (som) em sinais elétricos analógicos, que são então convertidos em dados digitais pela <strong>placa de som</strong> (ADC - Conversor Analógico-Digital). A qualidade do microfone afeta diretamente chamadas de vídeo, podcasts e gravações.','images/popup_microphone.png','Dispositivo de Entrada')">
          <div style="font-size:2rem">🎙️</div>
          <strong>Microfone</strong>
          <p>Converte ondas de som analógico em sinais digitais de áudio.</p>
        </div>
        <div class="card text-center text-small info-card-clickable" onclick="openInfoPopup('Webcam — Câmera Digital','A webcam captura imagens em sequência (frames) a uma taxa de <strong>30 ou 60 FPS</strong> (quadros por segundo). Cada frame é convertido em pixels digitais e enviado ao computador via USB. Webcams modernas gravam em <strong>Full HD (1080p)</strong> ou 4K!','images/popup_webcam.png','Dispositivo de Entrada')">
          <div style="font-size:2rem">📷</div>
          <strong>Webcam</strong>
          <p>Captura quadros de imagem de vídeo em tempo real.</p>
        </div>
      </div>
    `
  },
  {
    id: "3-2-dispositivos-saida",
    title: "3.2 Dispositivos de Saída",
    page: 18,
    type: "lesson",
    chapter: "CAPÍTULO 3 – CONHECENDO OS PERIFÉRICOS",
    content: `
      <h2>3.2 Dispositivos de Saída (Output)</h2>
      <p>Diferente dos de entrada, os <strong>Dispositivos de Saída</strong> recebem as informações processadas em formato digital dentro do computador e as convertem para formatos compreensíveis pelos sentidos humanos (visão, audição, tato).</p>

      <h4 class="mt-2">Exemplos Principais:</h4>
      <div class="grid grid-3 gap-2 mt-1">
        <div class="card bg-card-dark text-center info-card-clickable" onclick="openInfoPopup('Monitor — Tela do Computador','O monitor recebe os sinais da <strong>placa de vídeo</strong> (GPU) e os converte em imagens. Cada imagem é formada por milhões de <strong>pixels</strong> (pontos de luz colorida). Monitores modernos têm resolução <strong>Full HD (1920×1080)</strong>, <strong>4K (3840×2160)</strong> e taxas de atualização de 60Hz, 144Hz ou 240Hz — quanto maior, mais suave a imagem.','images/popup_monitor.png','Dispositivo de Saída')">
          <div style="font-size:2.5rem">🖥️</div>
          <strong>Monitor / Tela</strong>
          <p class="text-small">Desenha imagens enviadas pela placa de vídeo decodificando pixels.</p>
        </div>
        <div class="card bg-card-dark text-center info-card-clickable" onclick="openInfoPopup('Alto-falantes e Fones de Ouvido','O sinal de áudio digital é convertido em corrente elétrica analógica pela <strong>placa de som</strong> (DAC). Essa corrente vibra uma membrana dentro do alto-falante, criando ondas de pressão no ar que nossos ouvidos percebem como som. Fones com <strong>cancelamento de ruído ativo (ANC)</strong> usam microfones para detectar e neutralizar sons do ambiente.','images/popup_speakers.png','Dispositivo de Saída')">
          <div style="font-size:2.5rem">🔊</div>
          <strong>Alto-falantes / Fone</strong>
          <p class="text-small">Traduz os dados de áudio digital de volta em vibrações sonoras no ar.</p>
        </div>
        <div class="card bg-card-dark text-center info-card-clickable" onclick="openInfoPopup('Impressora — Tipos e Tecnologias','Existem dois tipos principais: <strong>Jato de Tinta</strong> — borrifa micro-gotas de tinta colorida no papel (ótima para fotos); <strong>Laser</strong> — usa um feixe de laser para aquecer toner (pó de tinta) que gruda no papel (ótima para documentos em volume). Impressoras laser são mais rápidas e econômicas para escritório.','images/popup_printer.png','Dispositivo de Saída')">
          <div style="font-size:2.5rem">🖨️</div>
          <strong>Impressora</strong>
          <p class="text-small">Materializa documentos digitais em mídias físicas utilizando jatos de tinta ou laser.</p>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>📱 Dispositivos Híbridos (Entrada/Saída)</h4>
        <p>Alguns periféricos fazem os dois papéis simultaneamente. O exemplo mais clássico é o <strong>Monitor Touch Screen</strong> (tela sensível ao toque), que exibe imagens (saída) e lê os toques dos dedos na tela (entrada).</p>
      </div>
    `
  },
  {
    id: "3-3-dispositivos-armazenamento",
    title: "3.3 Dispositivos de Armazenamento Externo",
    page: 19,
    type: "lesson",
    chapter: "CAPÍTULO 3 – CONHECENDO OS PERIFÉRICOS",
    content: `
      <h2>3.3 Dispositivos de Armazenamento Externo</h2>
      <p>Estes periféricos são usados para transportar dados entre computadores diferentes ou fazer cópias de segurança externas (backups).</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft info-card-clickable" onclick="openInfoPopup('Pendrive e Cartão SD — Memória Flash','O <strong>pendrive</strong> e o <strong>cartão SD</strong> usam memória flash NAND — chips sem partes mecânicas que retêm dados mesmo sem energia. São ideais para transporte de arquivos entre computadores. Pendrives modernos USB 3.2 atingem até <strong>400 MB/s</strong> de transferência — 10× mais rápido que um HD!','images/popup_pendrive.png','Armazenamento Externo')">
          <h4>💾 Memória Flash (Pendrive e Cartão SD)</h4>
          <p>Pequenos circuitos integrados não voláteis e extremamente práticos. São conectados via portas USB e não possuem partes mecânicas.</p>
        </div>
        <div class="card bg-surface border-soft info-card-clickable" onclick="openInfoPopup('HD Externo Portátil','O <strong>HD externo</strong> é um disco rígido convencional dentro de uma case protetora de plástico ou metal, conectado via USB. Oferece grande capacidade (até 20 TB!) a custo baixo, sendo perfeito para backups domésticos. Por ter partes mecânicas, deve ser transportado com cuidado e sem impactos.','images/popup_hd_externo.png','Armazenamento Externo')">
          <h4>💽 HD Externo</h4>
          <p>Um disco rígido comum encapsulado em uma case protetora portátil com conexão USB. Excelente para guardar grandes volumes de backup doméstico.</p>
        </div>
      </div>

      <div class="alert alert-info mt-2">
        <strong>Curiosidade Histórica:</strong> Antigamente usavam-se <strong>Disquetes</strong> (armazenavam míseros 1.44 Megabytes) e depois mídias óticas como <strong>CDs e DVDs</strong>. Hoje, grande parte do armazenamento e transporte de dados migrou para a internet (Nuvem), mas os pendrives e SSDs externos continuam cruciais.
      </div>
    `
  },
  {
    id: "3-4-conectando-perifericos",
    title: "3.4 Conectando os Periféricos",
    page: 20,
    type: "lesson",
    chapter: "CAPÍTULO 3 – CONHECENDO OS PERIFÉRICOS",
    content: `
      <h2>3.4 Conectando os Periféricos e suas Portas</h2>
      <p>Para conectar os periféricos à placa-mãe do gabinete, precisamos conhecer os principais formatos de portas traseiras:</p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:1.5rem 0;">

        <div style="display:flex; align-items:center; gap:14px; background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px;">
          <div style="width:48px; height:48px; min-width:48px; border-radius:50%; background:var(--bg-surface-hover); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">🔌</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display); font-weight:700; font-size:1rem; color:var(--text-primary); margin-bottom:4px;">USB <span style="font-size:0.65rem; background:var(--color-primary); color:#fff; padding:2px 8px; border-radius:20px; font-weight:600; vertical-align:middle;">Universal Serial Bus</span></div>
            <div style="color:var(--text-muted); font-size:0.875rem; line-height:1.5;">A porta mais comum de todas. Usada para mouse, teclado, pendrives, impressoras e quase qualquer periférico moderno.</div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:14px; background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px;">
          <div style="width:48px; height:48px; min-width:48px; border-radius:50%; background:var(--bg-surface-hover); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">📺</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display); font-weight:700; font-size:1rem; color:var(--text-primary); margin-bottom:4px;">HDMI / DisplayPort <span style="font-size:0.65rem; background:#8352ff; color:#fff; padding:2px 8px; border-radius:20px; font-weight:600; vertical-align:middle;">Vídeo Digital</span></div>
            <div style="color:var(--text-muted); font-size:0.875rem; line-height:1.5;">Transmitem vídeo em alta resolução e áudio simultaneamente para monitores, TVs e projetores.</div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:14px; background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px;">
          <div style="width:48px; height:48px; min-width:48px; border-radius:50%; background:var(--bg-surface-hover); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">🌐</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display); font-weight:700; font-size:1rem; color:var(--text-primary); margin-bottom:4px;">RJ-45 (Ethernet) <span style="font-size:0.65rem; background:var(--color-accent); color:#fff; padding:2px 8px; border-radius:20px; font-weight:600; vertical-align:middle;">Cabo de Rede</span></div>
            <div style="color:var(--text-muted); font-size:0.875rem; line-height:1.5;">Conecta o computador ao roteador de internet por cabo físico para maior estabilidade e velocidade.</div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:14px; background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px;">
          <div style="width:48px; height:48px; min-width:48px; border-radius:50%; background:var(--bg-surface-hover); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">🎧</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-display); font-weight:700; font-size:1rem; color:var(--text-primary); margin-bottom:4px;">P2 (Audio Jack) <span style="font-size:0.65rem; background:var(--color-warning); color:#000; padding:2px 8px; border-radius:20px; font-weight:600; vertical-align:middle;">Saída de Som</span></div>
            <div style="color:var(--text-muted); font-size:0.875rem; line-height:1.5;">Porta redonda para fone de ouvido/caixas de som (verde) e entrada de microfone (rosa).</div>
          </div>
        </div>

      </div>
    `
  },
  {
    id: "3-5-desafio-pratico",
    title: "3.5 Desafio Prático",
    page: 21,
    type: "challenge",
    chapter: "CAPÍTULO 3 – CONHECENDO OS PERIFÉRICOS",
    interactiveId: "peripheral-connect",
    content: `
      <h2>🔌 Missão Prática: Conexão Traseira de Periféricos</h2>
      <p><strong>Desafio:</strong> Ligue cada cabo de periférico no conector correto localizado no painel traseiro do gabinete. Clique primeiro no dispositivo à esquerda e depois no círculo correspondente da porta traseira correta à direita!</p>

      <div id="peripheral-connect-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "4-1-que-software",
    title: "4.1 O que é Software?",
    page: 22,
    type: "lesson",
    chapter: "CAPÍTULO 4 – SOFTWARE EM AÇÃO",
    content: `
      <h2>4.1 O que é Software?</h2>
      <p>Se o hardware é a máquina física de metal, circuitos e plástico, o <strong>Software</strong> é a alma lógica que dá vida e utilidade a todo esse emaranhado elétrico.</p>

      <div class="definition-box card-gradient">
        <p><strong>Software</strong> é um conjunto de instruções lógicas estruturadas e escritas por programadores em linguagem de código. Essas instruções guiam a CPU sobre o que ela deve calcular, onde guardar dados e como desenhar pixels na tela.</p>
      </div>

      <p class="mt-2">Sem software, o computador seria apenas um monte de peças caras servindo de peso de papel. É o software que nos permite navegar pela web, redigir documentos, enviar mensagens instantâneas e rodar sistemas complexos de controle empresarial.</p>
    `
  },
  {
    id: "4-2-tipos-software",
    title: "4.2 Tipos de Software",
    page: 23,
    type: "lesson",
    chapter: "CAPÍTULO 4 – SOFTWARE EM AÇÃO",
    content: `
      <h2>4.2 Categorias Principais de Software</h2>
      <p>Dividimos os softwares de acordo com a proximidade do hardware e a finalidade de uso:</p>

      <div class="grid grid-3 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>⚙️ Softwares de Sistema</h4>
          <p class="text-small">Controlam o funcionamento interno do PC e a comunicação direta com as peças físicas. Exemplos: **Sistemas Operacionais** (Windows, Linux, macOS) e **Drivers** de dispositivos.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>📱 Softwares de Aplicativo</h4>
          <p class="text-small">Programas criados diretamente para o usuário realizar tarefas finais cotidianas ou profissionais. Exemplos: Navegadores Web (Chrome, Edge), Editores de Texto (Word), Planilhas (Excel) e reprodutores de mídia.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>🛠️ Softwares de Programação</h4>
          <p class="text-small">Ferramentas usadas por desenvolvedores para criar e testar novos programas de computador. Exemplos: Editores de Código (VS Code), Compiladores e interpretadores de linguagem.</p>
        </div>
      </div>
    `
  },
  {
    id: "4-3-sistemas-operacionais",
    title: "4.3 Sistemas Operacionais",
    page: 24,
    type: "lesson",
    chapter: "CAPÍTULO 4 – SOFTWARE EM AÇÃO",
    content: `
      <h2>4.3 O Sistema Operacional (S.O.)</h2>
      <p>O <strong>Sistema Operacional</strong> é o software mais importante de qualquer computador. Ele serve de intermediador invisível entre você (usuário), os aplicativos que você abre e o hardware da máquina.</p>

      <div class="so-diagram">
        <div class="grid grid-3 gap-1 align-center text-center mt-2">
          <div class="card">👤 Usuário</div>
          <div style="font-size: 1.5rem;">➡️</div>
          <div class="card bg-primary-dark">🖥️ S.O. (Gerenciador)</div>
          <div style="font-size: 1.5rem;">➡️</div>
          <div class="card">🎛️ Hardware (Peças)</div>
        </div>
      </div>

      <h4 class="mt-2">Principais Funções do Sistema Operacional:</h4>
      <ul>
        <li><strong>Gerenciar a Memória:</strong> Decide quais programas usam RAM e evita que um trave o outro.</li>
        <li><strong>Sistema de Arquivos:</strong> Organiza e localiza onde arquivos (documentos, pastas) ficam salvos no SSD.</li>
        <li><strong>Interface do Usuário (UI):</strong> Fornece a área de trabalho gráfica, janelas e cursor do mouse para que você não precise digitar linhas de comando complexas.</li>
      </ul>

      <p class="mt-2">Os mais famosos nos computadores pessoais são o <strong>Microsoft Windows</strong> (mais popular comercialmente), o <strong>macOS</strong> (da Apple, focado em design) e o <strong>Linux</strong> (código aberto, seguro, muito usado em servidores e programadores).</p>
    `
  },
  {
    id: "4-4-windows-sistema-operacional",
    title: "4.4 Windows: Conhecendo o Sistema Operacional",
    page: 25,
    type: "lesson",
    chapter: "CAPÍTULO 4 – SOFTWARE EM AÇÃO",
    content: `
      <h2>4.4 Microsoft Windows e sua Interface</h2>
      <p>O Windows baseia-se no conceito de <strong>GUI</strong> (<em>Graphical User Interface</em>), onde interagimos por elementos visuais na tela. Seus conceitos básicos são:</p>

      <div class="guide-item mt-2">
        <div class="guide-icon">🖼️</div>
        <div class="guide-text">
          <strong>Área de Trabalho (Desktop):</strong> A tela de fundo inicial. Nela ficam atalhos de arquivos, pastas e programas mais usados.
        </div>
      </div>
      <div class="guide-item">
        <div class="guide-icon">🏁</div>
        <div class="guide-text">
          <strong>Menu Iniciar:</strong> O ponto de partida de busca de qualquer aplicativo instalado no computador, além de conter a opção de desligar a máquina.
        </div>
      </div>
      <div class="guide-item">
        <div class="guide-icon">📂</div>
        <div class="guide-text">
          <strong>Explorador de Arquivos:</strong> O programa que permite navegar pelas pastas do computador (Documentos, Downloads, Imagens, Disco Local C:).
        </div>
      </div>
      <div class="guide-item">
        <div class="guide-icon">🗑️</div>
        <div class="guide-text">
          <strong>Lixeira:</strong> Área de descarte temporário de arquivos excluídos. Se você apagar algo por engano, pode abrir a Lixeira e restaurar o arquivo antes de esvaziá-la em definitivo.
        </div>
      </div>
    `
  },
  {
    id: "4-5-desafio-pratico",
    title: "4.5 Desafio Prático",
    page: 26,
    type: "challenge",
    chapter: "CAPÍTULO 4 – SOFTWARE EM AÇÃO",
    interactiveId: "windows-desktop",
    content: `
      <h2>🖥️ Missão Prática: O Simulador do Windows</h2>
      <p><strong>Instruções do Desafio:</strong></p>
      <ol>
        <li>Dê dois cliques no ícone do <strong>Gerenciador de Arquivos</strong> no desktop abaixo para abrir a janela de navegação.</li>
        <li>Dentro do gerenciador, clique no botão <strong>"Criar Pasta"</strong>.</li>
        <li>Uma nova pasta com o nome <code>Nova_Pasta</code> aparecerá. Arraste o arquivo <code>Relatorio.docx</code> de fora para dentro dessa pasta para concluir o desafio e aprender a gerenciar seus documentos!</li>
      </ol>

      <div id="windows-simulator-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "5-1-cuidados-computador",
    title: "5.1 Cuidados com o Computador",
    page: 27,
    type: "lesson",
    chapter: "CAPÍTULO 5 – BOAS PRÁTICAS EM INFORMÁTICA",
    content: `
      <h2>5.1 Cuidados Físicos e Limpeza</h2>
      <p>Para garantir que o computador tenha uma vida útil longa e funcione sem travamentos por superaquecimento, siga estas boas práticas básicas:</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card border-danger bg-danger-soft">
          <h4>❌ O que EVITAR:</h4>
          <ul>
            <li>Bloquear as saídas de ar do gabinete ou usar o notebook sobre cobertores ou sofás (isso causa superaquecimento severo).</li>
            <li>Beber líquidos ou comer próximo ao teclado (líquidos derramados causam curto-circuito na placa-mãe).</li>
            <li>Limpar a tela com álcool comum ou produtos de limpeza domésticos (danifica o revestimento protetor do monitor).</li>
          </ul>
        </div>
        <div class="card border-success bg-success-soft">
          <h4>✅ O que FAZER:</h4>
          <ul>
            <li>Limpar a tela apenas com panos de microfibra levemente umedecidos com água filtrada ou álcool isopropílico.</li>
            <li>Conectar o computador a um filtro de linha com fusível de proteção para amenizar surtos na rede elétrica.</li>
            <li>Fazer limpezas internas periódicas para remover poeira acumulada nos coolers do processador e placa de vídeo.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "5-2-seguranca-digital",
    title: "5.2 Segurança Digital",
    page: 28,
    type: "lesson",
    chapter: "CAPÍTULO 5 – BOAS PRÁTICAS EM INFORMÁTICA",
    content: `
      <h2>5.2 Introdução à Segurança Digital</h2>
      <p>Usar o computador exige prudência digital para proteger seus dados pessoais e financeiros de golpistas e softwares maliciosos (malwares).</p>

      <div class="tip-box">
        <h4>🚨 Regras Fundamentais de Segurança:</h4>
        <ol>
          <li><strong>Senhas Fortes:</strong> Nunca use senhas óbvias (como "123456" ou sua data de nascimento). Crie senhas misturando letras maiúsculas, minúsculas, números e caracteres especiais (ex: <code>#P@ssw0rd2026!</code>).</li>
          <li><strong>Cuidado com o Phishing:</strong> Golpes por e-mail, redes sociais ou mensagens falsas que fingem ser seu banco e pedem seus dados confidenciais ou induzem você a clicar em links perigosos.</li>
          <li><strong>Antivírus Atualizado:</strong> Mantenha o sistema de proteção integrado do seu computador (como o Windows Defender) atualizado e ativo.</li>
          <li><strong>Backups Periódicos:</strong> Faça cópias de segurança de seus arquivos importantes em pendrives ou serviços de nuvem (Google Drive, OneDrive) regularmente para evitar perdê-los se o computador for infectado ou quebrar.</li>
        </ol>
      </div>
    `
  },
  {
    id: "5-3-ergonomia",
    title: "5.3 Ergonomia no Ambiente de Trabalho",
    page: 29,
    type: "lesson",
    chapter: "CAPÍTULO 5 – BOAS PRÁTICAS EM INFORMÁTICA",
    interactiveId: "ergonomics",
    content: `
      <h2>5.3 Ergonomia na Computação</h2>
      <p>A ergonomia estuda a melhor forma de adaptar o ambiente de trabalho e uso de equipamentos ao corpo humano para evitar lesões musculares por movimentos repetitivos (LER) ou problemas graves de coluna.</p>

      <img src="images/ergonomic_posture.png" alt="Guia de Ergonomia" class="img-responsive-centered mb-2" style="max-height: 180px;">

      <p><strong>Desafio Postural:</strong> Ajuste os sliders abaixo para corrigir a postura do usuário em frente à mesa de computador e deixá-lo em uma posição ergonomicamente perfeita e saudável.</p>

      <div id="ergonomics-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "5-4-organizacao-arquivos",
    title: "5.4 Organização de Arquivos e Pastas",
    page: 30,
    type: "lesson",
    chapter: "CAPÍTULO 5 – BOAS PRÁTICAS EM INFORMÁTICA",
    content: `
      <h2>5.4 Organização de Arquivos e Pastas</h2>
      <p>Manter seus arquivos bagunçados na Área de Trabalho é o equivalente a espalhar pilhas de papéis aleatórios por todo o chão do seu escritório. Cedo ou tarde, você vai gastar horas para achar um documento vital.</p>

      <div class="tip-box">
        <h4>📂 Boas Práticas para Organização de Documentos:</h4>
        <ul>
          <li><strong>Crie uma Hierarquia de Pastas:</strong> Organize em pastas principais (ex: <code>Faculdade</code>, <code>Trabalho</code>, <code>Finanças</code>) e subpastas dentro delas (ex: dentro de Trabalho: <code>Relatorios_2026</code>, <code>Projetos</code>).</li>
          <li><strong>Nomes Descritivos:</strong> Evite salvar arquivos com nomes genéricos como <code>documento1.pdf</code> ou <code>foto.png</code>. Use nomes que expliquem o conteúdo imediatamente, como <code>Orcamento_Janeiro_2026.xlsx</code>.</li>
          <li><strong>Limpeza da Pasta Downloads:</strong> A pasta Downloads é uma área de trânsito. Mova os arquivos que você quer guardar para as pastas certas e delete o restante regularmente.</li>
        </ul>
      </div>

      <div class="concept-card bg-surface mt-2 text-center">
        <p>📁 <strong>Estrutura Exemplo Recomendada:</strong></p>
        <code style="text-align: left; display: inline-block; font-size: 1rem;">
          Meu Computador<br>
          ├── 📁 Documentos<br>
          │&nbsp;&nbsp;&nbsp;├── 📁 Cursos<br>
          │&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── 📁 Informatica_Basica<br>
          │&nbsp;&nbsp;&nbsp;└── 📁 Financas<br>
          ├── 📁 Imagens<br>
          └── 📁 Downloads (Sempre limpo!)
        </code>
      </div>
    `
  },
  {
    id: "resumo-modulo",
    title: "Resumo da Aula",
    page: 31,
    type: "summary",
    chapter: "ENCERRAMENTO DA AULA",
    content: `
      <h2>📚 Resumo da Aula 1</h2>
      <p>Parabéns por chegar até o encerramento da primeira aula! Vamos relembrar os pilares fundamentais que estudamos:</p>

      <div class="summary-cards">
        <div class="card mt-1">
          <h4>🌟 História e Conceitos Básicos</h4>
          <p>Você aprendeu que a informática é o tratamento automático de dados. Estudamos Ada Lovelace, Alan Turing e a evolução dos computadores eletrônicos desde as imensas válvulas de primeira geração até os microprocessadores móveis atuais.</p>
        </div>
        <div class="card mt-1">
          <h4>🔌 Hardware (A Parte Física)</h4>
          <p>Identificamos as funções vitais de placas e barramentos de conexões na placa-mãe, o processamento lógico da CPU, a memória RAM rápida mas volátil, os HDs e SSDs de armazenamento definitivo, e as fontes de alimentação.</p>
        </div>
        <div class="card mt-1">
          <h4>💿 Software (A Parte Lógica)</h4>
          <p>Estudamos os tipos de softwares existentes (sistemas, aplicativos e ferramentas de desenvolvimento), a importância central dos Sistemas Operacionais como intermediadores de hardware e a interface gráfica base do Windows.</p>
        </div>
        <div class="card mt-1">
          <h4>🛡️ Cuidados, Ergonomia e Segurança</h4>
          <p>Vimos como organizar pastas de forma eficiente, como sentar-se de maneira correta para evitar lesões musculares, como criar senhas robustas e como manter o computador limpo e protegido.</p>
        </div>
      </div>
    `
  },
  {
    id: "desafio-final",
    title: "Desafio Final",
    page: 32,
    type: "challenge",
    chapter: "ENCERRAMENTO DA AULA",
    content: `
      <h2>🏆 Desafio Final da Aula 1</h2>
      <p>Responda às questões integradas sobre todo o conteúdo da Aula para verificar se você consolidou sua base de conhecimentos. Acerte as questões para se preparar para a Avaliação Final!</p>
    `,
    quiz: [
      {
        question: "Qual das seguintes afirmações sobre a memória RAM é verdadeira?",
        options: [
          "A RAM guarda os arquivos mesmo com o computador desligado.",
          "A RAM é um tipo de armazenamento não-volátil.",
          "A RAM armazena temporariamente os dados dos programas ativos e limpa ao desligar.",
          "Quanto maior o HD, mais memória RAM o computador possui."
        ],
        correct: 2,
        explanation: "A memória RAM é volátil e rápida. Ela serve para carregar os processos e aplicativos que estão abertos na tela no presente momento."
      },
      {
        question: "Qual periférico desempenha funções de Entrada e Saída ao mesmo tempo?",
        options: ["Teclado convencional", "Impressora comum a jato de tinta", "Monitor Touch Screen (sensível ao toque)", "Fone de ouvido convencional"],
        correct: 2,
        explanation: "A tela Touch Screen exibe imagem (Saída) e aceita cliques e gestos dos dedos (Entrada) simultaneamente."
      },
      {
        question: "Qual das alternativas representa um exemplo de Software de Sistema?",
        options: ["Google Chrome (Navegador)", "Sistema Operacional Linux", "Microsoft Word (Editor de Texto)", "WhatsApp Web"],
        correct: 1,
        explanation: "O Linux é um Sistema Operacional, portanto classifica-se como Software de Sistema por gerenciar o hardware e a inicialização."
      }
    ]
  },
  {
    id: "projeto-pratico",
    title: "Projeto Prático",
    page: 33,
    type: "project",
    chapter: "ENCERRAMENTO DA AULA",
    content: `
      <h2>🚀 Projeto Prático: O Desafio do Novo Computador</h2>
      <p>Chegou a hora de aplicar tudo na vida real! Imagine a seguinte situação hipotética de projeto prático:</p>

      <div class="card bg-surface border-soft">
        <p><strong>Cenário:</strong> Um amigo de trabalho precisa comprar um novo computador para fins administrativos (redigir contratos, acessar internet, organizar planilhas e ler e-mails). Ele quer que o computador seja rápido para iniciar, mas tem um orçamento limitado e não sabe escolher peças.</p>
        
        <h4>Sua missão como técnico e conhecedor de informática:</h4>
        <ol>
          <li><strong>Escolha do Armazenamento:</strong> Você indicaria um HD ou um SSD de menor espaço para iniciar o Windows de forma instantânea? Por quê?</li>
          <li><strong>Memória RAM:</strong> Qual seria a capacidade de RAM ideal recomendada para ele abrir 5 abas de navegador e o Excel juntos sem lentidão (4GB, 8GB ou 32GB)?</li>
          <li><strong>Sistemas Operacionais:</strong> Qual Sistema Operacional seria mais fácil para ele utilizar no dia a dia no escritório corporativo comum?</li>
        </ol>
      </div>

      <div class="tip-box mt-2">
        <h4>💡 Exercício Reflexivo</h4>
        <p>Reflita sobre as respostas deste projeto e anote suas escolhas na última página do curso (a aba <em>"Anotações do Aluno"</em>) para guardar seu raciocínio!</p>
      </div>
    `
  },
  {
    id: "avaliacao-final",
    title: "Avaliação Final",
    page: 34,
    type: "evaluation",
    chapter: "ENCERRAMENTO DA AULA",
    interactiveId: "final-exam",
    content: `
      <h2>🎓 Avaliação Final do Curso</h2>
      <p>Abaixo você realizará o teste definitivo composto por 5 questões abrangendo todos os tópicos estudados na Aula 1. </p>
      
      <div class="alert alert-info">
        <strong>Regra de Aprovado:</strong> Você precisa acertar pelo menos <strong>4 das 5 questões (80% de acerto)</strong> para desbloquear a conquista máxima do curso e gerar o seu Certificado de Conclusão Oficial!
      </div>

      <div id="final-exam-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `,
    quiz: [
      {
        question: "Qual componente realiza os cálculos matemáticos e lógicos principais, sendo considerado o cérebro físico do PC?",
        options: ["Memória RAM", "Processador (CPU)", "Placa-Mãe", "SSD"],
        correct: 1,
        explanation: "O Processador (CPU) executa as instruções e faz todas as operações matemáticas e lógicas centrais."
      },
      {
        question: "Entre as tecnologias de armazenamento abaixo, qual é a mais rápida para carregamento do Windows e programas?",
        options: ["HD Externo", "Disquete", "Disco Rígido Magnético (HD)", "SSD (Unidade de Estado Sólido)"],
        correct: 3,
        explanation: "Os SSDs utilizam memórias flash de altíssima velocidade de leitura e escrita, superando os HDs magnéticos tradicionais."
      },
      {
        question: "São exemplos clássicos de Dispositivos de Saída (Output) e Dispositivos de Entrada (Input), respectivamente:",
        options: [
          "Teclado e Monitor",
          "Impressora e Caixa de Som",
          "Monitor e Teclado",
          "Mouse e Webcam"
        ],
        correct: 2,
        explanation: "O Monitor exibe imagens (Saída) e o Teclado envia informações de texto para o computador (Entrada)."
      },
      {
        question: "O que caracteriza o termo 'Phishing' no âmbito da Segurança Digital?",
        options: [
          "Um antivírus gratuito do Windows.",
          "Um golpe de pescar dados pessoais por meio de links e mensagens falsas se passando por instituições confiáveis.",
          "A organização lógica das pastas na Área de Trabalho.",
          "O ato de limpar o monitor com água e sabão."
        ],
        correct: 1,
        explanation: "Phishing é um termo em inglês derivado de 'fishing' (pesca), indicando a tentativa de pescar informações de vítimas por e-mails ou sites fraudulentos."
      },
      {
        question: "Para uma ergonomia saudável no trabalho de informática, a posição da borda superior da tela do monitor deve ficar em qual nível?",
        options: [
          "Bem acima da linha dos olhos, forçando o pescoço para cima.",
          "Na altura ou ligeiramente abaixo da linha horizontal dos olhos do usuário.",
          "Bem abaixo do queixo, para que o usuário precise dobrar a cabeça.",
          "No chão da mesa de trabalho, à esquerda da cadeira."
        ],
        correct: 1,
        explanation: "A ergonomia correta prevê a tela de modo que a linha horizontal da visão fique paralela à borda superior do monitor, evitando flexionar o pescoço de forma prejudicial."
      }
    ]
  },
  {
    id: "conclusao-modulo-1",
    title: "🎉 Conclusão da Aula 1",
    page: 35,
    type: "lesson",
    chapter: "ENCERRAMENTO DA AULA 1",
    content: `
      <style>
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .conclusao-hero { text-align:center; padding:2rem 1rem 1.5rem; }
        .conclusao-trophy { font-size:5rem; display:block; animation:float 3s ease-in-out infinite; }
        .conclusao-title { font-family:var(--font-display); font-size:2rem; font-weight:900; background:linear-gradient(90deg,#8352ff,#10b981,#f59e0b,#8352ff); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 3s linear infinite; margin:0.5rem 0; }
        .conclusao-sub { color:var(--text-muted); font-size:1rem; }
        .conquistas-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:12px; margin:1.5rem 0; }
        .conquista-card { background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px 10px; text-align:center; animation:pop 0.5s ease both; }
        .conquista-card:nth-child(1){animation-delay:0.1s}
        .conquista-card:nth-child(2){animation-delay:0.2s}
        .conquista-card:nth-child(3){animation-delay:0.3s}
        .conquista-card:nth-child(4){animation-delay:0.4s}
        .conquista-card:nth-child(5){animation-delay:0.5s}
        .conquista-icon { font-size:2rem; display:block; margin-bottom:6px; }
        .conquista-label { font-family:var(--font-display); font-weight:700; font-size:0.8rem; color:var(--text-primary); }
        .conquista-desc { font-size:0.7rem; color:var(--text-muted); margin-top:2px; }
        .progresso-bar-wrap { background:var(--bg-surface); border-radius:50px; height:12px; overflow:hidden; margin:8px 0; }
        .progresso-bar-fill { height:100%; border-radius:50px; background:linear-gradient(90deg,#8352ff,#10b981); width:0; animation:progressAnim 1.5s ease 0.5s both; }
        @keyframes progressAnim { from{width:0} to{width:100%} }
        .proximas-aulas { background:linear-gradient(135deg,rgba(131,82,255,0.1),rgba(16,185,129,0.1)); border:1px solid rgba(131,82,255,0.3); border-radius:16px; padding:18px; margin-top:1.5rem; }
        .badge-aula { display:inline-block; background:var(--color-primary); color:#fff; font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:20px; margin-left:6px; vertical-align:middle; }
      </style>

      <div class="conclusao-hero">
        <span class="conclusao-trophy">🏆</span>
        <div class="conclusao-title">Aula 1 Concluída!</div>
        <p class="conclusao-sub">Parabéns! Você completou a primeira aula do InforMestre com sucesso.<br>Sua jornada na informática começou com o pé direito! 🚀</p>
      </div>

      <div style="background:var(--bg-surface);border-radius:14px;padding:16px;margin-bottom:1.5rem;">
        <div style="font-family:var(--font-display);font-weight:700;font-size:0.9rem;color:var(--text-primary);margin-bottom:8px;">📊 Progresso da Aula 1</div>
        <div class="progresso-bar-wrap"><div class="progresso-bar-fill"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
          <span>5 Capítulos</span><span style="color:var(--color-success);font-weight:700;">100% ✓</span>
        </div>
      </div>

      <h3 style="font-family:var(--font-display);font-size:1rem;color:var(--text-muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">🎖️ Conquistas Desbloqueadas</h3>
      <div class="conquistas-grid">
        <div class="conquista-card">
          <span class="conquista-icon">💻</span>
          <div class="conquista-label">Iniciante Digital</div>
          <div class="conquista-desc">Descobriu o mundo da informática</div>
        </div>
        <div class="conquista-card">
          <span class="conquista-icon">🔩</span>
          <div class="conquista-label">Técnico de Hardware</div>
          <div class="conquista-desc">Montou um computador completo</div>
        </div>
        <div class="conquista-card">
          <span class="conquista-icon">🔌</span>
          <div class="conquista-label">Conector Expert</div>
          <div class="conquista-desc">Conectou todos os periféricos</div>
        </div>
        <div class="conquista-card">
          <span class="conquista-icon">🪟</span>
          <div class="conquista-label">Navegador Windows</div>
          <div class="conquista-desc">Dominou o Sistema Operacional</div>
        </div>
        <div class="conquista-card">
          <span class="conquista-icon">🧘</span>
          <div class="conquista-label">Ergonomista</div>
          <div class="conquista-desc">Configurou a postura ideal</div>
        </div>
      </div>

      <div class="proximas-aulas">
        <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:var(--text-primary);margin-bottom:10px;">🗺️ O que vem a seguir?</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(131,82,255,0.1);border-radius:10px;border:1px solid rgba(131,82,255,0.2);">
            <span style="font-size:1.5rem;">📶</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">Aula 2 <span class="badge-aula">Em breve</span></div>
              <div style="font-size:0.78rem;color:var(--text-muted);">Internet, Redes e Navegadores — Explore o mundo conectado</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(16,185,129,0.08);border-radius:10px;border:1px solid rgba(16,185,129,0.15);">
            <span style="font-size:1.5rem;">📁</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">Aula 3 <span class="badge-aula" style="background:var(--color-accent);">Em breve</span></div>
              <div style="font-size:0.78rem;color:var(--text-muted);">Ferramentas de Escritório — Word, Excel e muito mais</div>
            </div>
          </div>
        </div>
      </div>

      <div style="text-align:center;margin-top:1.5rem;padding:16px;background:linear-gradient(135deg,rgba(131,82,255,0.15),rgba(245,158,11,0.1));border-radius:14px;border:1px dashed rgba(131,82,255,0.4);">
        <div style="font-size:1.5rem;">✨</div>
        <div style="font-family:var(--font-display);font-weight:700;color:var(--text-primary);margin:6px 0 4px;">"Conhecimento é o único tesouro que ninguém pode te tirar."</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">Continue estudando e compartilhe o que aprendeu!</div>
      </div>
    `
  }
];

// Export standard for client side usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COURSE_CONTENT };
}
