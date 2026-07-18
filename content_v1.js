const COURSE_CONTENT = [
  {
    id: "boas-vindas",
    title: "Boas-vindas ao Curso",
    page: 1,
    type: "intro",
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
    content: `
      <h2>3.1 Dispositivos de Entrada (Input)</h2>
      <p>Os <strong>Periféricos</strong> são todos os aparelhos externos conectados à CPU que permitem a comunicação entre o usuário e o computador.</p>

      <div class="definition-box card-gradient">
        <p>Os <strong>Dispositivos de Entrada</strong> enviam informações do mundo externo para dentro do processador do computador. Eles permitem que nós enviemos comandos, textos e controle.</p>
      </div>

      <h4 class="mt-2">Exemplos Principais:</h4>
      <div class="grid grid-2 gap-2 mt-1">
        <div class="card bg-card-dark text-center info-card-clickable" onclick="openInfoPopup('Teclado Mecânico','O teclado envia um <strong>código de varredura</strong> (scancode) para o computador a cada tecla pressionada. Teclados mecânicos (como o da foto) usam switches individuais para cada tecla, oferecendo feedback tátil e durabilidade de mais de 50 milhões de pressionamentos por tecla!','images/popup_keyboard.png','Dispositivo de Entrada')">
          <div style="font-size:2.5rem">⌨️</div>
          <strong>Teclado</strong>
          <p class="text-small">Envia códigos de teclas e caracteres de texto.</p>
        </div>
        <div class="card bg-card-dark text-center info-card-clickable" onclick="openInfoPopup('Mouse — Dispositivo Apontador','O mouse moderno usa um <strong>sensor óptico ou a laser</strong> que fotografa a superfície milhares de vezes por segundo para calcular o movimento. A precisão é medida em <strong>DPI</strong> (pontos por polegada) — quanto maior o DPI, maior a precisão do movimento na tela.','images/popup_mouse.png','Dispositivo de Entrada')">
          <div style="font-size:2.5rem">🖱️</div>
          <strong>Mouse</strong>
          <p class="text-small">Envia coordenadas bidimensionais de movimento e cliques.</p>
        </div>
        <div class="card bg-card-dark text-center info-card-clickable" onclick="openInfoPopup('Microfone Digital','O microfone converte variações de pressão do ar (som) em sinais elétricos analógicos, que são então convertidos em dados digitais pela <strong>placa de som</strong> (ADC - Conversor Analógico-Digital). A qualidade do microfone afeta diretamente chamadas de vídeo, podcasts e gravações.','images/popup_microphone.png','Dispositivo de Entrada')">
          <div style="font-size:2.5rem">🎙️</div>
          <strong>Microfone</strong>
          <p class="text-small">Converte ondas de som analógico em sinais digitais de áudio.</p>
        </div>
        <div class="card bg-card-dark text-center info-card-clickable" onclick="openInfoPopup('Webcam — Câmera Digital','A webcam captura imagens em sequência (frames) a uma taxa de <strong>30 ou 60 FPS</strong> (quadros por segundo). Cada frame é convertido em pixels digitais e enviado ao computador via USB. Webcams modernas gravam em <strong>Full HD (1080p)</strong> ou 4K!','images/popup_webcam.png','Dispositivo de Entrada')">
          <div style="font-size:2.5rem">📷</div>
          <strong>Webcam</strong>
          <p class="text-small">Captura quadros de imagem de vídeo em tempo real.</p>
        </div>
      </div>
    `
  },
  {
    id: "3-2-dispositivos-saida",
    title: "3.2 Dispositivos de Saída",
    page: 18,
    type: "lesson",
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
    chapter: "AULA 1",
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
  },
  {
    id: "aula2-etapa1",
    title: "Revisão da Aula 1",
    page: 36,
    type: "lesson",
    chapter: "AULA 2",
    interactiveId: "aula2-revision",
    content: `
      <h2>Revisão da Aula 1</h2>
      <div class="welcome-card card-gradient">
        <h3>O que aprendemos na última missão?</h3>
        <p>Na aula passada, vimos que a <strong>Informática</strong> processa informação de forma automática. Descobrimos a diferença fundamental entre:</p>
        <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
          <li><strong>Hardware:</strong> A parte física, peças, cabos e circuitos que podemos tocar.</li>
          <li><strong>Software:</strong> A parte lógica, os programas e dados que dão instruções ao hardware.</li>
          <li><strong>Periféricos:</strong> Dispositivos externos de Entrada (teclado, mouse) e Saída (monitor, impressora) que nos comunicam com o computador.</li>
        </ul>
      </div>
      <p class="mt-2">Responda a estas três perguntas rápidas para aquecer antes de começarmos a explorar o hardware de verdade! <strong>(Sem perda de corações nesta revisão!)</strong></p>
    `
  },
  {
    id: "aula2-etapa2",
    title: "O que é Hardware?",
    page: 37,
    type: "lesson",
    chapter: "AULA 2",
    content: `
      <h2>O que é Hardware?</h2>
      <p>Hardware é todo componente físico, circuito, placa, chip ou periférico que compõe o computador ou celular.</p>
      
      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>🧠 A Analogia do Corpo Humano</h4>
          <p>Uma forma fácil de entender a relação entre Hardware e Software é pensar no ser humano:</p>
          <ul style="margin-left: 1.2rem; margin-top: 0.5rem;">
            <li><strong>Hardware:</strong> É o nosso <strong>corpo físico</strong> (cérebro, coração, olhos, mãos).</li>
            <li><strong>Software:</strong> É a nossa <strong>mente</strong> (pensamentos, memórias, idiomas e habilidades que aprendemos).</li>
          </ul>
          <p class="text-small text-muted mt-1">Sem o corpo, a mente não tem como agir. Sem a mente, o corpo fica inanimado. No computador é igual!</p>
        </div>
        <div class="card bg-surface border-soft flex flex-column justify-center align-center text-center">
          <div style="font-size: 4.5rem; margin-bottom: 0.5rem;">🔩</div>
          <h4>Hardware Interno vs. Externo</h4>
          <p class="text-small text-muted" style="line-height: 1.5;">
            <strong>Interno:</strong> Componentes protegidos dentro do gabinete (ex: placa-mãe, CPU, memória RAM, SSD).<br><br>
            <strong>Externo:</strong> Dispositivos conectados por fora do gabinete (ex: teclado, mouse, monitor, fone).
          </p>
        </div>
      </div>
      
      <div class="highlight-quote mt-2">
        "O hardware é a máquina física que executa as instruções lógicas do software em frações de bilionésimos de segundo."
      </div>
    `
  },
  {
    id: "aula2-novo-1",
    title: "O Processador (CPU)",
    page: 38,
    type: "lesson",
    chapter: "AULA 2",
    content: `
      <h2>O Processador (CPU): O Cérebro da Máquina</h2>
      <p>A Unidade Central de Processamento (CPU) é responsável por calcular e executar todas as tarefas lógicas que você solicita ao computador.</p>
      
      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>Velocidade e Relógio (Clock)</h4>
          <p>Medido em <strong>Gigahertz (GHz)</strong>, o clock define quantos bilhões de ciclos por segundo o processador pode executar. Um processador de 3.0 GHz realiza 3 bilhões de operações em um único segundo!</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>Núcleos (Cores) e Threads</h4>
          <p>Imagine o processador como uma cozinha. Cada <strong>Núcleo</strong> é um cozinheiro trabalhando. Processadores modernos (Quad-core, Octa-core) possuem vários cozinheiros trabalhando simultaneamente, permitindo que você ouça música, navegue e jogue sem o computador travar.</p>
        </div>
      </div>
    `
  },
  {
    id: "aula2-novo-2",
    title: "Memória RAM vs Armazenamento",
    page: 39,
    type: "lesson",
    chapter: "AULA 2",
    content: `
      <h2>Memória RAM vs Armazenamento Definitivo</h2>
      <p>Uma confusão comum é misturar memória RAM com espaço de armazenamento (HD/SSD). Entender essa diferença é o segredo para resolver lentidões no PC.</p>
      
      <div class="card card-glow mt-2">
        <div style="display:flex; gap: 1rem; align-items: center;">
          <div style="font-size: 3rem;">⚡</div>
          <div>
            <h4>A Mesa de Trabalho (Memória RAM)</h4>
            <p>É o espaço rápido onde ficam os programas <strong>abertos no momento</strong>. Assim como uma mesa, o espaço é limitado. Se você abrir muitas coisas (muitas abas do navegador), a mesa fica cheia e o PC trava. É uma memória <strong>volátil</strong>: se a energia cair, tudo que estava na RAM desaparece.</p>
          </div>
        </div>
      </div>
      
      <div class="card card-glow mt-2">
        <div style="display:flex; gap: 1rem; align-items: center;">
          <div style="font-size: 3rem;">🗄️</div>
          <div>
            <h4>O Arquivo Morto (HD / SSD)</h4>
            <p>É o gaveteiro onde os dados ficam guardados para sempre (Windows, fotos, jogos instalados). É mais lento que a RAM, mas é <strong>não-volátil</strong>. O que está aqui não se perde quando o PC desliga.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "aula2-novo-3",
    title: "Placa-Mãe e Placa de Vídeo",
    page: 40,
    type: "lesson",
    chapter: "AULA 2",
    content: `
      <h2>Placa-Mãe e Placa de Vídeo (GPU)</h2>
      
      <h3>A Placa-Mãe (Motherboard)</h3>
      <p>É a espinha dorsal do computador. Ela possui as conexões físicas (slots) e o <strong>Chipset</strong> (um controlador de tráfego) para garantir que o Processador, a Memória RAM e o SSD conversem entre si na velocidade correta.</p>
      
      <h3 class="mt-2">A Placa de Vídeo (GPU)</h3>
      <p>Especializada exclusivamente em desenhar imagens na tela (renderização). Ela pode ser:</p>
      <ul style="margin-left: 1.5rem; margin-top: 0.5rem; line-height: 1.6;">
        <li><strong>Integrada:</strong> Vem embutida no processador. É econômica e ideal para uso de escritório e vídeos no YouTube.</li>
        <li><strong>Dedicada:</strong> Uma placa enorme e separada, com sua própria memória e ventoinha (ex: placas NVIDIA ou AMD). Obrigatória para <strong>Jogos 3D pesados, Edição de Vídeo e Inteligência Artificial</strong>.</li>
      </ul>
    `
  },
  {
    id: "aula2-novo-4",
    title: "Periféricos",
    page: 41,
    type: "lesson",
    chapter: "AULA 2",
    content: `
      <h2>Periféricos: Entrada, Saída e Mistos</h2>
      <p>Os periféricos são qualquer equipamento externo conectado ao computador, expandindo suas funções. Eles são classificados de acordo com a direção em que a informação viaja:</p>
      
      <div class="grid grid-3 gap-2 mt-2 text-center">
        <div class="card bg-surface border-soft">
          <h4>➡️ Entrada</h4>
          <p class="text-small text-muted">Enviam comandos do mundo real <strong>para dentro</strong> do PC.</p>
          <p class="mt-1">Teclado, Mouse, Microfone, Webcam, Scanner.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>⬅️ Saída</h4>
          <p class="text-small text-muted">Mostram resultados <strong>do PC para</strong> o usuário.</p>
          <p class="mt-1">Monitor, Impressora, Caixa de Som, Fone de Ouvido.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>🔁 Mistos (I/O)</h4>
          <p class="text-small text-muted">Fazem as <strong>duas coisas</strong> ao mesmo tempo.</p>
          <p class="mt-1">Telas Touchscreen, Headsets (fone+mic), Pendrives.</p>
        </div>
      </div>
    `
  },
  {
    id: "aula2-novo-5",
    title: "Cuidados e Energia",
    page: 42,
    type: "lesson",
    chapter: "AULA 2",
    content: `
      <h2>Cuidados, Resfriamento e Energia</h2>
      <p>Hardware sofre desgaste físico. Entender como protegê-lo aumenta a vida útil do equipamento em muitos anos.</p>
      
      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>❄️ Resfriamento (Cooling)</h4>
          <p>O inimigo número um do processador é o calor. Por isso, usa-se a <strong>Pasta Térmica</strong> e um <strong>Cooler</strong> (ventoinha) girando rápido para remover o calor. Sem eles, o PC desliga sozinho em segundos por segurança.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>🔌 Alimentação (PSU)</h4>
          <p>A Fonte de Alimentação recebe a energia da tomada (110v/220v) e converte para voltagens minúsculas que o PC aguenta (12v, 5v). Uma fonte de baixa qualidade pode queimar o computador inteiro.</p>
        </div>
      </div>
      
      <div class="alert alert-warning mt-2">
        ⚡ <strong>Dica de Proteção:</strong> Nunca ligue o PC direto na tomada sem proteção! Use um bom <strong>Filtro de Linha (DPS)</strong> contra surtos. Se possível, invista em um <strong>Nobreak (UPS)</strong>, que contém uma bateria interna para manter o PC ligado por alguns minutos em caso de queda de luz.
      </div>
    `
  },
  {
    id: "aula2-etapa3",
    title: "O Interior do Computador",
    page: 38,
    type: "lesson",
    chapter: "AULA 2",
    interactiveId: "hardware-tour",
    content: `
      <h2>Conhecendo o Interior do Computador</h2>
      <p>Quando abrimos um computador, encontramos peças incríveis trabalhando juntas. Clique nos botões de cada peça no painel do simulador abaixo para fazer um tour detalhado pelo interior do gabinete!</p>
      <p class="text-small text-muted">Descubra a foto real, função, curiosidade, onde se instala e o que acontece se o componente não existir.</p>
    `
  },
  {
    id: "aula2-etapa4",
    title: "Como Tudo Funciona Junto",
    page: 39,
    type: "lesson",
    chapter: "AULA 2",
    interactiveId: "hardware-flow",
    content: `
      <h2>Como Tudo Funciona Junto?</h2>
      <p>Nenhuma peça de hardware trabalha de forma isolada. O processador calcula, a RAM memoriza temporariamente, o SSD armazena para sempre e as portas conectam tudo.</p>
      <p>Abaixo, veja a simulação interativa que mostra o fluxo de dados em tempo real quando você realiza uma ação simples no computador.</p>
    `
  },
  {
    id: "aula2-etapa5",
    title: "Curiosidades do Hardware",
    page: 40,
    type: "lesson",
    chapter: "AULA 2",
    content: `
      <h2>Curiosidades do Mundo do Hardware</h2>
      <p>O desenvolvimento da computação nos últimos 80 anos é marcado por avanços tecnológicos extraordinários de miniaturização e velocidade.</p>
      <div class="grid grid-2 gap-2 mt-2">
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('O Primeiro Disco Rígido (1956)', 'O <strong>IBM 305 RAMAC</strong> foi o primeiro computador comercial a usar um disco rígido com cabeças magnéticas móveis. O HD inteiro era composto por 50 discos de metal de 24 polegadas. Sua capacidade total era de apenas <strong>5 Megabytes</strong> (hoje isso é uma única foto no celular!), e ele pesava <strong>mais de uma tonelada</strong>, necessitando de uma empilhadeira para transporte.', 'images/transistor.png', 'Curiosidade')">
          <h4>💾 O primeiro HD do mundo</h4>
          <p>Em 1956, o primeiro disco rígido (HD) armazenava apenas <strong>5 Megabytes</strong> e pesava **mais de uma tonelada**.</p>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('A Evolução dos SSDs', 'Hoje em dia, a memória Flash NAND permitiu a criação de SSDs com formato M.2 NVMe, que medem apenas <strong>22 mm de largura por 80 mm de comprimento</strong> (menores que um chiclete ou cartão de crédito) e conseguem armazenar <strong>até 8 Terabytes (8.000.000 MB)</strong> de arquivos. Eles são <strong>1000 vezes mais rápidos</strong> e infinitamente mais leves que os discos magnéticos antigos.', 'images/popup_ssd_hd_nvme.png', 'Curiosidade')">
          <h4>⚡ SSDs ultraminiaturizados</h4>
          <p>Hoje, um SSD com velocidade ultra-rápida e capacidade de Terabytes é **menor que um chiclete**.</p>
        </div>
      </div>
      <div class="alert alert-info mt-2">
        💡 <strong>Você sabia?</strong> Os chips modernos têm bilhões de transistores microscópicos. A espessura das trilhas de um processador moderno de 3nm é cerca de 20.000 vezes menor do que a espessura de um fio de cabelo humano!
      </div>
    `
  },
  {
    id: "aula2-etapa6",
    title: "Simulador: Identifique o Componente",
    page: 41,
    type: "challenge",
    chapter: "AULA 2",
    interactiveId: "identify-component",
    content: `
      <h2>🔍 Missão Prática: Identifique o Componente</h2>
      <p><strong>Desafio:</strong> Observe a foto real do componente de hardware e selecione a alternativa correta! Você tem <strong>3 corações (vidas) ❤️</strong>. Se errar, perde uma vida e recebe uma dica. Se acertar, vê uma curiosidade e avança!</p>
      <div id="identify-component-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "aula2-etapa7",
    title: "Mini Game: Associe a Função",
    page: 42,
    type: "challenge",
    chapter: "AULA 2",
    interactiveId: "match-functions",
    content: `
      <h2>🎮 Mini Game: Associe o Componente à Função</h2>
      <p><strong>Desafio:</strong> Associe cada componente físico de hardware à sua respectiva função lógica no funcionamento do computador. Complete a associação para ganhar 50 XP. Cuidado, errar custa vidas! ❤️</p>
      <div id="match-functions-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "aula2-etapa8",
    title: "Desafio Prático: Computador Aberto",
    page: 43,
    type: "challenge",
    chapter: "AULA 2",
    interactiveId: "open-pc-inspect",
    content: `
      <h2>🛠️ Desafio: Onde está o Componente?</h2>
      <p><strong>Desafio:</strong> Observe atentamente a fotografia do computador aberto. Sua tarefa é localizar e clicar na área correta do componente solicitado no topo da tela.</p>
      <div id="open-pc-inspect-widget" class="interactive-panel">
        <!-- Will be rendered dynamically by app.js -->
      </div>
    `
  },
  {
    id: "aula2-etapa9",
    title: "Questionário de Fixação",
    page: 44,
    type: "challenge",
    chapter: "AULA 2",
    content: `
      <h2>📝 Teste de Conhecimento: Aula 2</h2>
      <p>Responda às 10 questões a seguir sobre funcionamento interno de computadores e características das peças de hardware. Ganhe XP e conclua o questionário!</p>
    `,
    quiz: [
      {
        question: "Qual componente de hardware é responsável por realizar cálculos aritméticos e lógicos e é considerado o cérebro do computador?",
        options: ["Memória RAM", "Processador (CPU)", "Placa-Mãe", "Disco Rígido (HD)"],
        correct: 1,
        explanation: "A CPU (Central Processing Unit) calcula todas as operações matemáticas e coordena a execução de todas as tarefas e programas."
      },
      {
        question: "Verdadeiro ou Falso: A Memória RAM é não-volátil, ou seja, retém todos os dados salvos nela mesmo depois que o computador é desligado.",
        options: ["Verdadeiro", "Falso"],
        correct: 1,
        explanation: "A memória RAM é volátil. Ela perde seu conteúdo de dados instantaneamente ao desligar ou reiniciar o computador."
      },
      {
        question: "Qual componente fornece energia elétrica estável e nas tensões adequadas para todas as peças internas do computador?",
        options: ["Cooler", "Placa de vídeo (GPU)", "Fonte de Alimentação (PSU)", "Placa-Mãe"],
        correct: 2,
        explanation: "A Fonte de Alimentação (PSU) converte a corrente alternada da tomada (110V/220V) em corrente contínua de baixa voltagem para as peças do computador."
      },
      {
        question: "Se você quer melhorar drasticamente o tempo de inicialização do Windows de 1 minuto para menos de 15 segundos, qual peça deve instalar?",
        options: ["Um processador com mais núcleos", "Um cooler maior", "Uma placa de vídeo dedicada", "Uma unidade de estado sólido (SSD)"],
        correct: 3,
        explanation: "O SSD possui velocidade de leitura e gravação imensamente superior à de um HD mecânico tradicional, acelerando absurdamente a abertura do Sistema e programas."
      },
      {
        question: "Qual é o slot/barramento de alta velocidade utilizado na placa-mãe para conectar placas de vídeo dedicadas de jogos e edição?",
        options: ["Porta SATA", "Soquete CPU", "PCI Express (PCIe)", "Porta USB"],
        correct: 2,
        explanation: "O PCI Express (PCIe) é o barramento de expansão de alta velocidade ideal para placas de vídeo dedicadas devido à sua alta taxa de transferência."
      },
      {
        question: "Verdadeiro ou Falso: O cooler é uma peça opcional. O computador pode funcionar perfeitamente sem ele sem qualquer risco físico.",
        options: ["Verdadeiro", "Falso"],
        correct: 1,
        explanation: "O cooler é vital. Sem ele, a CPU aquece a mais de 100°C em poucos segundos e desliga automaticamente para não derreter ou queimar fisicamente."
      },
      {
        question: "Complete a lacuna: A Placa de vídeo (GPU) é responsável por transformar sinais lógicos de dados em ______ que podem ser desenhados no monitor.",
        options: ["arquivos de texto", "correntes elétricas brutas", "pixels e imagens", "frequências de áudio"],
        correct: 2,
        explanation: "A placa de vídeo processa e desenha pixels e imagens em tempo real para serem exibidas na tela do monitor."
      },
      {
        question: "Qual cabo é utilizado especificamente para transferir dados entre a placa-mãe e uma unidade de armazenamento (HD ou SSD SATA)?",
        options: ["Cabo de energia de 24 pinos", "Cabo SATA", "Cabo HDMI", "Cabo de áudio P2"],
        correct: 1,
        explanation: "Cabos SATA são a interface padrão de dados usada para conectar discos rígidos mecânicos e SSDs de formato SATA à placa-mãe."
      },
      {
        question: "Verdadeiro ou Falso: O gabinete é apenas uma carcaça estética e não tem nenhuma função prática de fluxo de ar ou suporte mecânico.",
        options: ["Verdadeiro", "Falso"],
        correct: 1,
        explanation: "O gabinete serve como a sustentação mecânica de todas as peças, protege-as contra curto-circuitos e canaliza o fluxo de ar para resfriamento adequado."
      },
      {
        question: "Se um computador liga, os coolers giram, mas a tela fica preta e a placa-mãe emite bipes sonoros contínuos, qual peça é provável de estar com mau contato?",
        options: ["O SSD ou HD", "A Memória RAM", "O Gabinete", "Os Cabos SATA"],
        correct: 1,
        explanation: "Falhas na memória RAM impedem a inicialização básica do PC, fazendo com que o BIOS emita códigos de bipes de alerta sonoro."
      }
    ]
  },
  {
    id: "aula2-etapa10",
    title: "Missão Final: Seu PC Ideal",
    page: 45,
    type: "challenge",
    chapter: "AULA 2",
    interactiveId: "aula2-mission-final",
    content: `
      <h2>🗺️ Missão Final: Planejando seu Computador</h2>
      <p><strong>Missão Reflexiva:</strong> Se você fosse montar um computador hoje para estudar e trabalhar de forma produtiva, quais peças de hardware você considera <strong>indispensáveis</strong> e por quê?</p>
      <p class="text-muted">Escreva sua resposta e salve-a nas suas anotações do curso. Reflita sobre o que aprendeu sobre a RAM, o SSD e o Processador!</p>
    `
  },
  {
    id: "conclusao-aula-2",
    title: "🎉 Conclusão da Aula 2",
    page: 46,
    type: "lesson",
    chapter: "AULA 2",
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
        <div class="conclusao-title">Aula 2 Concluída!</div>
        <p class="conclusao-sub">Parabéns! Você completou com sucesso a segunda aula do InforMestre.<br>Sua compreensão técnica de Hardware foi validada! 🔧</p>
      </div>

      <div style="background:var(--bg-surface);border-radius:14px;padding:16px;margin-bottom:1.5rem;">
        <div style="font-family:var(--font-display);font-weight:700;font-size:0.9rem;color:var(--text-primary);margin-bottom:8px;">📊 Progresso da Aula 2</div>
        <div class="progresso-bar-wrap"><div class="progresso-bar-fill"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
          <span>10 Etapas</span><span style="color:var(--color-success);font-weight:700;">100% ✓</span>
        </div>
      </div>

      <h3 style="font-family:var(--font-display);font-size:1rem;color:var(--text-muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">🎖️ Conquistas Desbloqueadas</h3>
      <div class="conquistas-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        <div class="conquista-card">
          <span class="conquista-icon">🔧</span>
          <div class="conquista-label">Aprendiz de Hardware</div>
          <div class="conquista-desc">Completou com sucesso a Aula 2 e provou que conhece hardware.</div>
        </div>
      </div>

      <div class="proximas-aulas">
        <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:var(--text-primary);margin-bottom:10px;">🗺️ O que vem a seguir?</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(131,82,255,0.1);border-radius:10px;border:1px solid rgba(131,82,255,0.2);">
            <span style="font-size:1.5rem;">🔌</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">Aula 3 <span class="badge-aula" style="background:var(--color-success);">Disponível</span></div>
              <div style="font-size:0.78rem;color:var(--text-muted);">Periféricos e Conexões — Conecte o mundo ao seu computador</div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ============================================================
  // AULA 3 — PERIFÉRICOS E CONEXÕES
  // ============================================================
  {
    id: "aula3-intro",
    title: "🔌 Missão 3 — Conectando o Mundo",
    page: 47,
    type: "intro",
    chapter: "AULA 3",
    content: `
      <style>
        @keyframes pulse3 { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes slideIn3 { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .a3-hero { text-align:center; padding:1.5rem 0.5rem 1rem; animation:slideIn3 0.6s ease both; }
        .a3-badge { display:inline-block; background:linear-gradient(135deg,#8352ff,#06b6d4); color:#fff; font-size:0.7rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; padding:4px 14px; border-radius:20px; margin-bottom:12px; }
        .a3-title { font-family:var(--font-display); font-size:2rem; font-weight:900; background:linear-gradient(90deg,#8352ff,#06b6d4,#10b981); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0 0 6px; }
        .a3-subtitle { color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem; }
        .a3-icon-big { font-size:4.5rem; display:block; animation:pulse3 2s ease-in-out infinite; margin-bottom:10px; }
        .a3-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin:1.2rem 0; }
        .a3-card { background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:14px; padding:16px; animation:slideIn3 0.6s ease both; }
        .a3-card:nth-child(2){animation-delay:0.15s} .a3-card:nth-child(3){animation-delay:0.3s} .a3-card:nth-child(4){animation-delay:0.45s}
        .a3-medal { background:linear-gradient(135deg,rgba(131,82,255,0.12),rgba(6,182,212,0.08)); border:1px solid rgba(131,82,255,0.3); border-radius:14px; padding:14px; display:flex; align-items:center; gap:14px; margin-top:1rem; }
        .a3-xp-bar { background:var(--bg-surface); border-radius:50px; height:10px; overflow:hidden; margin-top:8px; }
        .a3-xp-fill { height:100%; width:0; border-radius:50px; background:linear-gradient(90deg,#8352ff,#06b6d4); animation:progressAnim3 1.2s ease 0.4s both; }
        @keyframes progressAnim3 { from{width:0} to{width:100%} }
      </style>

      <div class="a3-hero">
        <span class="a3-badge">🔌 Aula 3 — Módulo 1</span>
        <img src="images/peripherals_overview.png" alt="Visão Geral de Periféricos" class="img-responsive-centered" style="max-height: 220px; display: block; margin: 1rem auto; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.35);">
        <div class="a3-title">Missão 3 — Conectando o Mundo</div>
        <p class="a3-subtitle">Você já conhece o interior do computador. Agora é hora de descobrir como os periféricos conectam pessoas e máquinas!</p>
      </div>

      <div class="a3-grid">
        <div class="a3-card">
          <div style="font-size:1.5rem;margin-bottom:6px;">🎯</div>
          <strong style="font-family:var(--font-display);font-size:0.9rem;">Objetivos</strong>
          <ul style="margin:8px 0 0;padding-left:16px;font-size:0.83rem;line-height:1.7;color:var(--text-secondary);">
            <li>Entender o conceito de periférico</li>
            <li>Diferenciar entrada, saída e armazenamento</li>
            <li>Reconhecer portas e conexões reais</li>
            <li>Montar uma estação de trabalho completa</li>
          </ul>
        </div>
        <div class="a3-card">
          <div style="font-size:1.5rem;margin-bottom:6px;">🗺️</div>
          <strong style="font-family:var(--font-display);font-size:0.9rem;">Capítulos</strong>
          <ul style="margin:8px 0 0;padding-left:16px;font-size:0.83rem;line-height:1.7;color:var(--text-secondary);">
            <li>Cap. 1 — Revisão relâmpago</li>
            <li>Cap. 2 — O que são Periféricos?</li>
            <li>Cap. 3 — Dispositivos de Entrada</li>
            <li>Cap. 4 — Dispositivos de Saída</li>
            <li>Cap. 5 — Armazenamento</li>
            <li>Cap. 6 — Portas e Conexões</li>
            <li>Cap. 7 — Monte sua estação</li>
            <li>Cap. 8 — Quiz Final</li>
          </ul>
        </div>
        <div class="a3-card">
          <div style="font-size:1.5rem;margin-bottom:6px;">⭐</div>
          <strong style="font-family:var(--font-display);font-size:0.9rem;">XP Disponível</strong>
          <p style="font-size:0.83rem;color:var(--text-secondary);margin:6px 0;">Até <strong style="color:var(--color-primary);">+680 XP</strong> nesta aula!</p>
          <div class="a3-xp-bar"><div class="a3-xp-fill"></div></div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">8 capítulos · 10 páginas</div>
        </div>
      </div>

      <div class="a3-medal">
        <span style="font-size:2.5rem;">🏅</span>
        <div>
          <div style="font-family:var(--font-display);font-weight:800;color:var(--text-primary);">Medalha Desbloqueável</div>
          <div style="font-size:0.85rem;color:var(--text-muted);">🔌 <strong>Mestre dos Periféricos</strong> — Concluindo a Missão 3</div>
        </div>
      </div>
    `
  },
  {
    id: "aula3-cap1-revisao",
    title: "Cap.1 — Revisão Relâmpago",
    page: 48,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "hardware-review",
    content: `
      <h2>⚡ Revisão Relâmpago — Hardware</h2>
      <p>Antes de avançar para os periféricos, vamos testar rapidamente o que você aprendeu na Aula 2 sobre o hardware interno do computador.</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card card-outline">
          <div class="card-header">🧠 Processador (CPU)</div>
          <div class="card-body"><p>O <strong>cérebro</strong> do computador. Executa todas as instruções e cálculos dos programas.</p></div>
        </div>
        <div class="card card-outline">
          <div class="card-header">⚡ Memória RAM</div>
          <div class="card-body"><p>Memória <strong>temporária</strong> e ultra-rápida. Mantém abertos os programas em uso.</p></div>
        </div>
        <div class="card card-outline">
          <div class="card-header">💾 SSD / HD</div>
          <div class="card-body"><p>Armazenamento <strong>permanente</strong>. Guarda o sistema operacional e todos os seus arquivos.</p></div>
        </div>
        <div class="card card-outline">
          <div class="card-header">🎛️ Placa-mãe</div>
          <div class="card-body"><p>A <strong>espinha dorsal</strong> do PC. Conecta e permite a comunicação entre todas as peças.</p></div>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>🎯 Desafio Relâmpago</h4>
        <p>Responda as 5 perguntas abaixo no simulador. Sem perda de vidas — apenas para testar sua memória! Cada resposta certa dá <strong>+10 XP</strong>.</p>
      </div>
    `
  },
  {
    id: "aula3-cap2-o-que-sao-perifericos",
    title: "Cap.2 — O Que São Periféricos?",
    page: 49,
    type: "lesson",
    chapter: "AULA 3",
    content: `
      <h2>🔌 O Que São Periféricos?</h2>
      <p>Um <strong>periférico</strong> é qualquer dispositivo que se conecta ao computador para permitir a comunicação entre o usuário e a máquina — ou para ampliar as suas capacidades.</p>

      <img src="images/peripherals_overview.png" alt="Exemplos de Periféricos" class="img-responsive-centered" style="max-height: 180px; display: block; margin: 1rem auto; border-radius: 8px;">

      <div class="concept-grid mt-2">
        <div class="concept-card">
          <div class="icon">🖥️</div>
          <div>
            <h4>Hardware Interno vs. Externo</h4>
            <p>O <strong>hardware interno</strong> (CPU, RAM, placa-mãe) fica dentro do gabinete e processa os dados. Já os <strong>periféricos</strong> são componentes externos que possibilitam a entrada e saída dessas informações.</p>
          </div>
        </div>
      </div>

      <h3 class="mt-2">🌍 Periféricos no Mundo Real</h3>
      <p>Você convive com periféricos todos os dias, em situações que talvez não imaginasse:</p>

      <div class="grid grid-2 gap-2 mt-1">
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Caixa Eletrônico (ATM)','O caixa eletrônico é um computador especializado com múltiplos periféricos integrados: teclado numérico (entrada), tela sensível ao toque (entrada/saída), câmera de segurança (entrada), leitor de cartão (entrada), impressora de comprovante (saída) e dispensador de cédulas (saída). Tudo controlado por um computador interno.','','Periféricos no Dia a Dia')">
          <h4>🏧 Caixa Eletrônico (ATM)</h4>
          <p>Um computador com teclado, tela touchscreen, leitor de cartão e impressora integrados. São <strong>vários periféricos em um</strong>!</p>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Maquininha de Cartão (POS)','A maquininha de cartão é um computador portátil com periféricos de entrada (teclado numérico, leitor de cartão/NFC), de saída (tela e impressora de comprovante) e de comunicação (módulo 4G/Wi-Fi/Bluetooth). Um exemplo perfeito de múltiplos periféricos compactos trabalhando juntos.','','Periféricos no Dia a Dia')">
          <h4>💳 Maquininha de Cartão</h4>
          <p>Leitor de cartão, teclado, tela e impressora térmica em um único dispositivo portátil com conexão Wi-Fi.</p>
        </div>
      </div>

      <h2 class="mt-3">⌨️ Dispositivos de Entrada</h2>
      <p>Os <strong>dispositivos de entrada</strong> são periféricos que <em>enviam</em> dados do usuário para o computador. Eles traduzem ações humanas em sinais digitais que o computador consegue processar.</p>

      <img src="images/input_devices.png" alt="Exemplos de Dispositivos de Entrada" class="img-responsive-centered" style="max-height: 180px; display: block; margin: 1rem auto; border-radius: 8px;">

      <div class="grid grid-3 gap-2 mt-2">
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Teclado','O teclado é o periférico de entrada mais usado no mundo. Cada tecla pressionada gera um sinal elétrico único que é convertido em um código digital (ASCII ou Unicode) e enviado ao computador. Existem teclados mecânicos (com switch físico sob cada tecla, mais preciso e durável), membrana (mais silencioso e barato) e virtual (em telas touchscreen). Um teclado gamer pode registrar até 6 teclas simultâneas (anti-ghosting) e até 24 com N-Key Rollover.','images/popup_keyboard.png','Dispositivos de Entrada')">
          <h4>⌨️ Teclado</h4>
          <p>Periférico de entrada mais utilizado. Converte teclas pressionadas em códigos digitais. Existem modelos mecânicos, de membrana e virtuais.</p>
          <small class="text-muted">📍 Usado em: escritórios, jogos, smartphones (virtual)</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Mouse (Rato)','O mouse captura movimentos físicos e cliques e os converte em coordenadas X,Y na tela. O mouse óptico usa um sensor de luz LED para capturar o movimento a até 25.000 DPI de precisão. O mouse mecânico antigo usava uma bolinha de borracha. O DPI (Dots Per Inch) determina a sensibilidade: quanto maior, mais rápido o cursor se move com o mesmo gesto. Mouses gamers podem ter mais de 8 botões programáveis e taxa de polling de 1000Hz (1000 atualizações por segundo!).','images/popup_mouse.png','Dispositivos de Entrada')">
          <h4>🖱️ Mouse</h4>
          <p>Traduz movimentos físicos em coordenadas na tela. Modelos ópticos usam sensor LED de altíssima precisão (até 25.000 DPI).</p>
          <small class="text-muted">📍 Usado em: desktops, laptops com mesa</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Scanner (Digitalizador)','O scanner usa uma fileira de sensores CCD ou CIS para capturar imagens de documentos físicos e transformá-las em arquivos digitais (JPEG, PDF, PNG). Scanners de mesa são comuns em escritórios; scanners portáteis permitem digitalizar livros e contratos em campo. Alguns scanners modernos possuem OCR (Reconhecimento Ótico de Caracteres) embutido que converte o texto da imagem em texto editável no computador.','','Dispositivos de Entrada')">
          <h4>🖨️ Scanner</h4>
          <p>Captura documentos e imagens físicas e as converte em arquivos digitais. Pode reconhecer texto com tecnologia OCR.</p>
          <small class="text-muted">📍 Usado em: escritórios, cartórios, hospitais</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Webcam','A webcam é uma câmera digital compacta que captura vídeo e imagens em tempo real e os envia ao computador. A qualidade é medida em resolução (HD 720p, Full HD 1080p, 4K) e em quadros por segundo (fps). A câmera frontal do seu smartphone também é tecnicamente uma webcam quando usada em videoconferências. Webcams modernas possuem microfone embutido, cancellation de ruído e até foco automático por IA.','images/popup_webcam.png','Dispositivos de Entrada')">
          <h4>📷 Webcam</h4>
          <p>Câmera digital que captura vídeo e envia ao PC em tempo real. Essencial para videoconferências, streamings e segurança.</p>
          <small class="text-muted">📍 Usado em: home office, salas de aula, segurança</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Microfone','O microfone converte ondas sonoras (vibrações do ar) em sinais elétricos analógicos. Estes sinais passam por um conversor A/D (Analógico para Digital) e chegam ao computador como dados de áudio. Existem microfones condensadores (mais sensíveis, usados em estúdio), dinâmicos (mais robustos, para shows ao vivo) e de lapela (pequenos e discretos). O microfone do seu celular funciona da mesma forma!','images/popup_microphone.png','Dispositivos de Entrada')">
          <h4>🎤 Microfone</h4>
          <p>Converte ondas sonoras em sinais digitais. Tipos: condensador (estúdio), dinâmico (palcos) e lapela (reuniões).</p>
          <small class="text-muted">📍 Usado em: gravações, calls, assistentes de voz</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Leitor Biométrico','O leitor biométrico captura características físicas únicas de cada pessoa — principalmente impressões digitais — e as converte em dados digitais criptografados. Um sensor óptico fotografa a digital; um capacitivo mede as diferenças de carga elétrica entre cristas e vales da pele. O dado biométrico capturado é comparado com o armazenado no banco de dados em milissegundos. São usados em controle de ponto, acesso a prédios, bancos e smartphones.','','Dispositivos de Entrada')">
          <h4>👆 Leitor Biométrico</h4>
          <p>Captura impressões digitais ou outros dados físicos uniques para autenticação. Usado em bancos, controle de acesso e celulares.</p>
          <small class="text-muted">📍 Usado em: bancos, ponto eletrônico, smartphones</small>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>🎮 Mini Game — Quem Sou Eu?</h4>
        <p>O simulador vai dar pistas sobre um dispositivo de entrada. Descubra qual é! Cada acerto na 1ª pista vale mais XP.</p>
      </div>
    `
  },
  {
    id: "aula3-cap3-game",
    title: "Cap.3 — Mini Game: Quem Sou Eu?",
    page: 50.1,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "guess-device",
    content: `
      <h2>🕵️ Mini Game — Quem Sou Eu?</h2>
      <p>Leia as pistas e descubra qual <strong>dispositivo de entrada</strong> está sendo descrito. Quanto menos pistas usar, mais XP você ganha! Você tem <strong>3 vidas</strong>.</p>
      <div class="alert alert-info mt-1">
        <strong>Como jogar:</strong> As pistas aparecem uma a uma. Clique em "Ver próxima pista" para revelar mais dicas. Escolha o dispositivo correto e ganhe XP!
      </div>
    `
  },
  {
    id: "aula3-cap4-saida",
    title: "Cap.4 — Dispositivos de Saída",
    page: 51,
    type: "lesson",
    chapter: "AULA 3",
    content: `
      <h2>🖥️ Dispositivos de Saída</h2>
      <p>Os <strong>dispositivos de saída</strong> recebem dados processados do computador e os apresentam ao usuário de forma compreensível — como imagens, sons ou texto impresso.</p>

      <img src="images/output_devices.png" alt="Exemplos de Dispositivos de Saída" class="img-responsive-centered" style="max-height: 180px; display: block; margin: 1rem auto; border-radius: 8px;">

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Monitor','O monitor converte sinais digitais de vídeo em imagens visíveis. A qualidade é definida pela resolução (HD, Full HD, 4K), taxa de atualização (60Hz, 144Hz, 240Hz) e tipo de painel: IPS (cores mais vivas e ângulo amplo), TN (mais rápido e barato) e VA (melhor contraste). Um monitor 4K com 144Hz e painel IPS é o sonho de gamers e designers. Conexões comuns: HDMI, DisplayPort e VGA (obsoleta).','images/popup_monitor.png','Dispositivos de Saída')">
          <h4>🖥️ Monitor</h4>
          <p>Exibe imagens e vídeos do computador. Qualidade definida por resolução (4K), taxa de atualização (144Hz) e tipo de painel (IPS/TN/VA).</p>
          <small class="text-muted">📍 Conectado via: HDMI, DisplayPort, VGA</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Impressora','A impressora transfere dados digitais para papel ou outros materiais físicos. Tipos: Jato de tinta (usa tinta líquida, boa para fotos); Laser (usa toner em pó e calor, rápida e barata para texto); Térmica (sem tinta, usa calor — usada em maquininhas e cupons fiscais); 3D (deposita material camada por camada para criar objetos tridimensionais!). A impressora foi inventada por Johannes Gutenberg em 1450 com tipos móveis de metal, mas a impressora digital surgiu nos anos 1950.','images/popup_printer.png','Dispositivos de Saída')">
          <h4>🖨️ Impressora</h4>
          <p>Transfere dados para papel. Tipos: jato de tinta (fotos), laser (escritório), térmica (maquininhas) e 3D (objetos físicos).</p>
          <small class="text-muted">📍 Conectada via: USB, Wi-Fi, Bluetooth</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Caixa de Som / Alto-falante','A caixa de som converte sinais elétricos digitais em ondas sonoras que vibram o ar. O computador envia sinais digitais que passam por um conversor D/A (Digital para Analógico) e um amplificador, fazendo o cone do alto-falante vibrar e criar ondas sonoras. Caixas de som 2.1 possuem dois satélites e um subwoofer. Caixas 5.1 e 7.1 criam som surround para cinema em casa. Headphones com cancelamento de ruído usam um microfone que detecta ruído externo e gera uma onda de fase inversa para cancelá-lo!','images/popup_speakers.png','Dispositivos de Saída')">
          <h4>🔊 Caixa de Som</h4>
          <p>Converte dados digitais em ondas sonoras. Sistemas 2.1, 5.1 e 7.1 criam experiência de som surround imersiva.</p>
          <small class="text-muted">📍 Conectada via: P2, USB, Bluetooth, óptico</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Projetor','O projetor recebe o sinal de vídeo do computador e o projeta em uma superfície ampliada usando uma lâmpada de alta intensidade ou tecnologia LED/Laser. Os projetores são classificados por lumens (brilho) e resolução. Um projetor de 3.000 lumens é suficiente para salas com luz ambiente; projetores de cinema podem ter 30.000 lumens! A tecnologia DLP usa um chip com milhões de micro-espelhos que refletem a luz para criar a imagem. Muito usado em salas de aula, apresentações e home theater.','','Dispositivos de Saída')">
          <h4>📽️ Projetor</h4>
          <p>Projeta imagens do computador em superfícies ampliadas. Tecnologias: DLP (micro-espelhos), LCD e laser. Medido em lumens.</p>
          <small class="text-muted">📍 Usado em: salas de aula, apresentações, cinemas</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Fones de Ouvido (Headphone)','Os fones de ouvido funcionam como mini alto-falantes individuais para cada ouvido. Os modelos in-ear (inseridos no canal auditivo) são os mais compactos. Os on-ear pressionam suavemente o ouvido. Os over-ear envolvem completamente a orelha — os mais confortáveis para uso prolongado. Fones com cancelamento ativo de ruído (ANC) usam um microfone externo para detectar ruídos e gerar ondas de fase oposta, reduzindo o ruído ambiente em até 30dB. Headsets possuem microfone embutido para comunicação — essenciais para gamers e call centers.','','Dispositivos de Saída')">
          <h4>🎧 Fones de Ouvido</h4>
          <p>Mini alto-falantes pessoais. Tipos: in-ear, on-ear e over-ear. Com ANC (cancelamento de ruído ativo) para foco total.</p>
          <small class="text-muted">📍 Conectados via: P2 (3,5mm), USB, Bluetooth</small>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>🎮 Mini Game — Arraste para a Categoria</h4>
        <p>No simulador desta página, arraste cada dispositivo para a categoria correta: <strong>Entrada</strong> ou <strong>Saída</strong>. Cuidado com as pegadinhas!</p>
      </div>
    `
  },
  {
    id: "aula3-cap4-game",
    title: "Cap.4 — Jogo: Entrada ou Saída?",
    page: 51.1,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "output-sorter",
    content: `
      <h2>🎯 Jogo — Entrada ou Saída?</h2>
      <p>Classifique cada dispositivo na categoria correta. Arraste (ou clique) cada item para <strong>Entrada</strong> ou <strong>Saída</strong>. Você tem <strong>3 vidas</strong> e ganha <strong>+10 XP</strong> por acerto!</p>
      <div class="alert alert-info mt-1">
        <strong>Lembre-se:</strong> Entrada = envia dados <em>para</em> o PC. Saída = recebe dados do PC e apresenta ao usuário. Alguns dispositivos podem ser ambos!
      </div>
    `
  },
  {
    id: "aula3-cap5-armazenamento",
    title: "Cap.5 — Dispositivos de Armazenamento",
    page: 52,
    type: "lesson",
    chapter: "AULA 3",
    content: `
      <h2>💾 Dispositivos de Armazenamento Externo</h2>
      <p>Os dispositivos de armazenamento externo permitem <strong>transportar e guardar dados</strong> fora do computador. São fundamentais para backup, compartilhamento e portabilidade de arquivos.</p>

      <img src="images/storage_devices.png" alt="Dispositivos de Armazenamento Externo" class="img-responsive-centered" style="max-height: 180px; display: block; margin: 1rem auto; border-radius: 8px;">

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Pendrive (Memória Flash USB)','O pendrive usa memória flash NAND (a mesma tecnologia dos SSDs) para armazenar dados sem partes móveis. Conecta-se via USB e não precisa de energia própria. Capacidades comuns: 4GB, 8GB, 16GB, 32GB, 64GB, 128GB, 256GB e até 1TB. Um pendrive USB 3.0 transfere arquivos a ~400 MB/s — perfeito para transportar trabalhos, fotos e documentos. O pen drive foi inventado por Trek Technology e IBM e lançado em 2000 com apenas 8MB de capacidade!','images/popup_pendrive.png','Dispositivos de Armazenamento')">
          <h4>🔌 Pendrive</h4>
          <p>Memória flash portátil via USB. Compacto e sem partes móveis. Capacidade de 4GB a 1TB. Ideal para transportar arquivos.</p>
          <small class="text-muted">⚡ USB 3.0: até 400 MB/s de transferência</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Cartão de Memória (SD Card)','Os cartões de memória SD (Secure Digital) são pequenos chips de memória flash usados em câmeras fotográficas, drones, consoles portáteis e smartphones. Classes de velocidade definem a taxa de gravação mínima: Class 10 (10 MB/s), UHS-I (104 MB/s), UHS-II (312 MB/s), UHS-III e V90 (90 MB/s). MicroSD é o formato menor usado em smartphones. Um cartão SD foi criado pela Matsushita, SanDisk e Toshiba in 1999 e desde então se tornou o padrão universal de armazenamento portátil.','','Dispositivos de Armazenamento')">
          <h4>📷 Cartão de Memória (SD)</h4>
          <p>Chip de memória flash compacto para câmeras, drones e celulares. Padrões: SD, microSD, SDHC e SDXC. Velocidade até 312 MB/s.</p>
          <small class="text-muted">📍 Usado em: câmeras, drones, smartphones, Raspberry Pi</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('HD Externo (Disco Rígido Externo)','O HD externo é um disco rígido tradicional (com pratos magnéticos girando a 5.400 ou 7.200 RPM) dentro de uma carcaça portátil com interface USB. Por usar partes mecânicas em movimento, é mais sensível a quedas e choques físicos. Vantagem: capacidade enorme a custo baixo (até 20TB). Desvantagem: mais lento e frágil que um SSD. Ideal para backups de longo prazo e armazenamento de grandes coleções de fotos, vídeos e músicas.','images/popup_hd_externo.png','Dispositivos de Armazenamento')">
          <h4>💽 HD Externo</h4>
          <p>Disco rígido portátil com pratos magnéticos. Enorme capacidade (até 20TB) a baixo custo. Mais lento e frágil que SSD.</p>
          <small class="text-muted">⚠️ Cuidado: sensível a quedas e impactos físicos</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('SSD Externo','O SSD externo usa a mesma tecnologia de memória flash dos SSDs internos, mas em uma carcaça portátil com conector USB ou USB-C. É silencioso, resistente a choques e muito mais rápido que o HD externo: transferências de até 2.000 MB/s em modelos USB-C / Thunderbolt! Ideal para edição de vídeo em campo, backups rápidos e transporte de arquivos pesados. O preço por GB ainda é maior que o HD, mas a diferença vem caindo rapidamente a cada ano.','','Dispositivos de Armazenamento')">
          <h4>⚡ SSD Externo</h4>
          <p>Armazenamento flash portátil ultra-rápido (até 2.000 MB/s). Resistente a choques, silencioso e compacto. Perfeito para edição.</p>
          <small class="text-muted">⚡ USB-C / Thunderbolt para máxima velocidade</small>
        </div>
      </div>

      <h3 class="mt-2">📏 Entendendo Capacidade de Armazenamento</h3>
      <div class="grid grid-2 gap-2">
        <div class="card bg-surface border-soft">
          <h4>📊 Tabela de Unidades</h4>
          <table style="width:100%;font-size:0.82rem;border-collapse:collapse;">
            <tr style="border-bottom:1px solid var(--border-soft)"><td style="padding:4px 2px;font-weight:700;">1 Byte</td><td style="padding:4px 2px;color:var(--text-muted);">8 bits — 1 caractere de texto</td></tr>
            <tr style="border-bottom:1px solid var(--border-soft)"><td style="padding:4px 2px;font-weight:700;">1 KB</td><td style="padding:4px 2px;color:var(--text-muted);">1.024 bytes — 1 página de texto</td></tr>
            <tr style="border-bottom:1px solid var(--border-soft)"><td style="padding:4px 2px;font-weight:700;">1 MB</td><td style="padding:4px 2px;color:var(--text-muted);">1.024 KB — 1 música MP3 ~5MB</td></tr>
            <tr style="border-bottom:1px solid var(--border-soft)"><td style="padding:4px 2px;font-weight:700;">1 GB</td><td style="padding:4px 2px;color:var(--text-muted);">1.024 MB — ~250 fotos em HD</td></tr>
            <tr style="border-bottom:1px solid var(--border-soft)"><td style="padding:4px 2px;font-weight:700;">1 TB</td><td style="padding:4px 2px;color:var(--text-muted);">1.024 GB — ~250.000 fotos</td></tr>
          </table>
        </div>
        <div class="card bg-surface border-soft">
          <h4>📸 O Que Cabe em...</h4>
          <ul style="font-size:0.83rem;line-height:1.8;margin:0;padding-left:16px;">
            <li><strong>8GB</strong>: ~2.000 fotos em alta resolução</li>
            <li><strong>16GB</strong>: ~4 filmes Full HD</li>
            <li><strong>64GB</strong>: ~16 filmes 4K</li>
            <li><strong>1TB</strong>: ~250 jogos de PC modernos</li>
            <li><strong>4TB</strong>: ~1.000 episódios de série Full HD</li>
          </ul>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>🎮 Desafio — Escolha Correta</h4>
        <p>O simulador vai apresentar situações do dia a dia. Escolha o dispositivo de armazenamento mais adequado para cada situação!</p>
      </div>
    `
  },
  {
    id: "aula3-cap5-game",
    title: "Cap.5 — Desafio: Escolha Correta",
    page: 52.1,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "storage-challenge",
    content: `
      <h2>💡 Desafio — Escolha o Dispositivo Certo!</h2>
      <p>Para cada situação apresentada, escolha o <strong>dispositivo de armazenamento mais adequado</strong>. Pense na capacidade, praticidade e velocidade necessárias!</p>
      <div class="alert alert-info mt-1">
        <strong>Dica:</strong> Considere: o que precisa ser guardado, quanto espaço é necessário, e se precisa de portabilidade ou velocidade de transferência!
      </div>
    `
  },
  {
    id: "aula3-cap6-portas",
    title: "Cap.6 — Portas e Conexões",
    page: 53,
    type: "lesson",
    chapter: "AULA 3",
    content: `
      <h2>🔌 Portas e Conexões</h2>
      <p>As <strong>portas</strong> são as entradas físicas do computador onde os periféricos são conectados. Cada porta tem um formato e protocolo específico. Conhecê-las é essencial para conectar os dispositivos certos nos lugares certos!</p>

      <img src="images/ports_connections.png" alt="Portas e Conexões Traseiras" class="img-responsive-centered" style="max-height: 180px; display: block; margin: 1rem auto; border-radius: 8px;">

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Porta USB (Universal Serial Bus)','USB significa Universal Serial Bus — uma porta universal criada em 1996 para substituir dezenas de conectores diferentes. Versões: USB 1.1 (12 Mbps), USB 2.0 (480 Mbps — conector preto), USB 3.0 (5 Gbps — conector azul), USB 3.2 (20 Gbps), USB 4.0 (40 Gbps). O formato Type-A é o retangular comum; o Type-B é quadrado (usado em impressoras); o Micro-USB e Mini-USB eram usados em celulares antigos. Conecta: mouse, teclado, pendrive, impressora, carregadores, hubs.','','Portas e Conexões')">
          <h4>🔵 USB (Universal Serial Bus)</h4>
          <p>A porta mais universal do mundo. USB 2.0 (preto), 3.0 (azul), 3.2 e 4.0. Conecta mouse, teclado, pendrive, câmera e mais.</p>
          <small class="text-muted">⚡ USB 3.0: 5 Gbps | USB 4.0: até 40 Gbps</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('USB-C (USB Type-C)','O USB-C é o conector reversível (não tem lado errado para plugar!) que está substituindo todas as outras portas USB. É compacto, robusto e suporta múltiplos protocolos: USB 3.2, USB 4, Thunderbolt 3/4, DisplayPort e até entrega de energia (Power Delivery) de até 240W — suficiente para carregar um laptop profissional! Um único cabo USB-C pode transmitir dados, vídeo 8K e energia simultaneamente. Presente em smartphones modernos, MacBooks, tablets e monitores de última geração.','','Portas e Conexões')">
          <h4>🔶 USB-C</h4>
          <p>Conector universal reversível. Suporta dados (até 40Gbps), vídeo 8K e carga de 240W — tudo em um único cabo compacto!</p>
          <small class="text-muted">📍 Presente em: celulares modernos, notebooks, iPads</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('HDMI (High-Definition Multimedia Interface)','O HDMI transmite áudio e vídeo digitais de alta definição em um único cabo — substituindo cabos separados de vídeo e áudio analógicos. Versões: HDMI 1.4 (4K/30Hz), HDMI 2.0 (4K/60Hz), HDMI 2.1 (8K/120Hz e 4K/144Hz para jogos em alta taxa). O conector HDMI padrão (Type A) é o mais comum em TVs e monitores. O mini-HDMI e micro-HDMI são versões menores para câmeras e tablets. Um cabo HDMI 2.1 é capaz de transmitir vídeo 10K de resolução — mais do que qualquer display disponível hoje!','','Portas e Conexões')">
          <h4>🟥 HDMI</h4>
          <p>Transmite vídeo + áudio em um único cabo. HDMI 2.1 suporta 8K/120Hz. Presente em TVs, monitores, projetores e consoles.</p>
          <small class="text-muted">⚡ HDMI 2.1: 48 Gbps de largura de banda</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('P2 (Conector de 3,5mm / TRS)','O conector P2 (chamado de "jack de 3,5mm" ou "conector TRS") é o conector de áudio analógico mais comum do mundo. TRS significa Tip, Ring, Sleeve — os três segmentos do metal que correspondem a canal esquerdo, canal direito e terra (ground). Versões: TS (mono — microfones simples), TRS (estéreo — fones de ouvido), TRRS (estéreo + microfone — headsets). Apesar de analógico e antigo, ainda está presente em 90% dos fones de ouvido do mundo. Muitos smartphones novos o removeram em favor do USB-C.','','Portas e Conexões')">
          <h4>🎵 P2 (Jack 3,5mm)</h4>
          <p>Conector de áudio analógico universal. Presente em fones, microfones e caixas de som. Versão TRRS suporta microfone integrado.</p>
          <small class="text-muted">📍 Ainda presente em: fones, amplificadores, instrumentos</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Ethernet (RJ-45)','O cabo Ethernet (conector RJ-45) é o padrão de rede cabeada para conexão à internet. É mais estável, seguro e veloz que o Wi-Fi em situações de uso intensivo. Padrões: Fast Ethernet (100 Mbps), Gigabit Ethernet (1.000 Mbps = 1 Gbps), 2.5G, 5G e 10 Gigabit Ethernet para servidores. A velocidade real depende também do roteador e do plano de internet contratado. Cabos Cat6 e Cat6A são recomendados para redes domésticas modernas pois suportam Gigabit com baixo ruído.','','Portas e Conexões')">
          <h4>🌐 Ethernet (RJ-45)</h4>
          <p>Rede cabeada ultra-estável. Gigabit Ethernet = 1.000 Mbps. Melhor que Wi-Fi para jogos online, streaming e home office.</p>
          <small class="text-muted">🔒 Mais seguro e estável que conexão sem fio</small>
        </div>
        <div class="card card-glow info-card-clickable" onclick="openInfoPopup('Bluetooth','Bluetooth é uma tecnologia de comunicação sem fio de curto alcance (até ~100m) que opera na frequência de 2.4 GHz. Versões: BT 4.0 (Bluetooth Low Energy / BLE — para IoT e wearables), BT 5.0 (2x velocidade, 4x alcance), BT 5.3 (mais eficiente, menos interferência). Bluetooth multipoint permite que um headset se conecte a dois dispositivos ao mesmo tempo (ex: celular e laptop). Usado em: fones, teclados, mouses, caixas de som, smartwatches, teclados de carro e dispositivos médicos.','','Portas e Conexões')">
          <h4>📶 Bluetooth</h4>
          <p>Comunicação sem fio de curto alcance (2.4 GHz). BT 5.3: alcance de até 100m. Conecta fones, mouses, teclados e wearables.</p>
          <small class="text-muted">📍 Multipoint: conecte-se a 2 dispositivos ao mesmo tempo</small>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>🎮 Simulador — Conecte os Periféricos!</h4>
        <p>No simulador desta página, conecte cada cabo na porta correta do computador virtual. Cuidado para não conectar na porta errada!</p>
      </div>
    `
  },
  {
    id: "aula3-cap6-game",
    title: "Cap.6 — Simulador: Conecte as Portas",
    page: 53.1,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "connect-ports",
    content: `
      <h2>🔌 Simulador — Conectando o Computador</h2>
      <p>Conecte cada dispositivo na porta correta do computador. Arraste (ou clique) cada item para a porta adequada. Você tem <strong>3 vidas</strong>. Erro = vida perdida!</p>
      <div class="alert alert-info mt-1">
        <strong>Lembre-se:</strong> HDMI → Monitor | USB → Mouse/Teclado/Pendrive | P2 → Fone/Caixa de Som | Ethernet → Roteador | USB-C → Smartphone/Notebook
      </div>
    `
  },
  {
    id: "aula3-cap7-workspace",
    title: "Cap.7 — Monte sua Estação de Trabalho",
    page: 54,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "workspace-builder",
    content: `
      <h2>🖥️ Monte sua Estação de Trabalho!</h2>
      <p>Você vai montar uma mesa de trabalho completa e funcional. Arraste cada equipamento para o local correto na mesa. Ao finalizar, verifique se tudo está no lugar!</p>

      <img src="images/workspace_ergonomics.png" alt="Layout da Estação de Trabalho" class="img-responsive-centered" style="max-height: 180px; display: block; margin: 1rem auto; border-radius: 8px;">

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>📋 Lista de Equipamentos</h4>
          <ul style="font-size:0.85rem;line-height:1.8;margin:0;padding-left:16px;">
            <li>🖥️ Monitor</li>
            <li>⌨️ Teclado</li>
            <li>🖱️ Mouse</li>
            <li>📷 Webcam</li>
            <li>🖨️ Impressora</li>
            <li>🔊 Caixa de Som</li>
          </ul>
        </div>
        <div class="card bg-surface border-soft">
          <h4>🎯 Objetivo</h4>
          <p style="font-size:0.85rem;">Posicione cada item na mesa de trabalho corretamente e conecte-os ao computador. Uma estação bem organizada aumenta a produtividade!</p>
          <p style="font-size:0.82rem;color:var(--text-muted);">Você tem <strong>3 vidas</strong>. Errar a posição = vida perdida!</p>
        </div>
      </div>
    `
  },
  {
    id: "aula3-cap8-quiz",
    title: "Cap.8 — Quiz Final da Aula 3",
    page: 55,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "peripheral-final-quiz",
    content: `
      <h2>🏆 Quiz Final — Periféricos e Conexões</h2>
      <p>Chegou a hora de provar que você dominou os periféricos! Responda as <strong>10 perguntas</strong> do quiz. Você tem <strong>3 vidas</strong> e cada acerto vale <strong>+20 XP</strong>!</p>
      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>📊 Regras</h4>
          <ul style="font-size:0.85rem;line-height:1.8;margin:0;padding-left:16px;">
            <li>10 perguntas no total</li>
            <li>3 vidas disponíveis</li>
            <li>Explicação após cada resposta</li>
            <li>Cada acerto: +20 XP</li>
            <li>Quiz completo: medalha especial</li>
          </ul>
        </div>
        <div class="card bg-surface border-soft">
          <h4>🎯 Temas Abordados</h4>
          <ul style="font-size:0.85rem;line-height:1.8;margin:0;padding-left:16px;">
            <li>Conceito de periférico</li>
            <li>Entrada vs. Saída</li>
            <li>Portas e cabos</li>
            <li>Armazenamento</li>
            <li>Situações práticas</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "aula3-missao-final",
    title: "🏆 Missão Final — Mestre dos Periféricos",
    page: 56,
    type: "challenge",
    chapter: "AULA 3",
    interactiveId: "aula3-mission-final",
    content: `
      <h2>🏆 Missão Final — Mestre dos Periféricos</h2>
      <p>Você chegou à missão reflexiva da Aula 3! Esta é a sua oportunidade de consolidar tudo o que aprendeu e fazer uma conexão com a sua realidade.</p>

      <div class="missions-panel mt-2">
        <h3>📝 Sua Missão:</h3>
        <div class="card bg-surface border-soft" style="margin-top:12px;padding:1.2rem;">
          <p style="font-size:1rem;line-height:1.7;font-style:italic;color:var(--text-primary);">
            "<strong>Descreva quais periféricos você utiliza no seu dia a dia</strong> (em casa, no trabalho ou na escola) e como cada um deles ajuda nas suas atividades. Se você pudesse melhorar sua estação de trabalho com 3 novos periféricos, quais escolheria e por quê?"
          </p>
        </div>
      </div>

      <div class="alert alert-info mt-2">
        <strong>💡 Dica:</strong> Pense nos periféricos que você usa sem perceber: o microfone do celular durante uma ligação, o leitor biométrico do banco, a impressora do trabalho... Eles todos se encaixam no que você aprendeu hoje!
      </div>

      <p class="text-muted mt-1">Escreva sua resposta no simulador abaixo. Ela será salva automaticamente nas suas anotações da aula. <strong>+50 XP</strong> ao completar!</p>
    `
  },
  {
    id: "conclusao-aula-3",
    title: "🎉 Conclusão da Aula 3",
    page: 56.1,
    type: "lesson",
    chapter: "AULA 3",
    content: `
      <style>
        @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pop3 { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer3 { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .conclusao3-hero { text-align:center; padding:2rem 1rem 1.5rem; }
        .conclusao3-trophy { font-size:5rem; display:block; animation:float3 3s ease-in-out infinite; }
        .conclusao3-title { font-family:var(--font-display); font-size:2rem; font-weight:900; background:linear-gradient(90deg,#06b6d4,#8352ff,#10b981,#06b6d4); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer3 3s linear infinite; margin:0.5rem 0; }
        .conclusao3-sub { color:var(--text-muted); font-size:1rem; }
        .conquistas3-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin:1.5rem 0; }
        .conquista3-card { background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px 10px; text-align:center; animation:pop3 0.5s ease both; }
        .conquista3-card:nth-child(1){animation-delay:0.1s}
        .conquista3-icon { font-size:2rem; display:block; margin-bottom:6px; }
        .conquista3-label { font-family:var(--font-display); font-weight:700; font-size:0.8rem; color:var(--text-primary); }
        .conquista3-desc { font-size:0.7rem; color:var(--text-muted); margin-top:2px; }
        .progresso3-bar-wrap { background:var(--bg-surface); border-radius:50px; height:12px; overflow:hidden; margin:8px 0; }
        .progresso3-bar-fill { height:100%; border-radius:50px; background:linear-gradient(90deg,#06b6d4,#10b981); width:0; animation:progressAnim3b 1.5s ease 0.5s both; }
        @keyframes progressAnim3b { from{width:0} to{width:100%} }
        .proximas3-aulas { background:linear-gradient(135deg,rgba(6,182,212,0.1),rgba(16,185,129,0.1)); border:1px solid rgba(6,182,212,0.3); border-radius:16px; padding:18px; margin-top:1.5rem; }
        .badge3-aula { display:inline-block; background:var(--color-accent); color:#fff; font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:20px; margin-left:6px; vertical-align:middle; }
      </style>

      <div class="conclusao3-hero">
        <span class="conclusao3-trophy">🔌</span>
        <div class="conclusao3-title">Aula 3 Concluída!</div>
        <p class="conclusao3-sub">Parabéns! Você dominou os periféricos e conexões do mundo digital.<br>Agora você sabe conectar o mundo ao seu computador! 🌐</p>
      </div>

      <div style="background:var(--bg-surface);border-radius:14px;padding:16px;margin-bottom:1.5rem;">
        <div style="font-family:var(--font-display);font-weight:700;font-size:0.9rem;color:var(--text-primary);margin-bottom:8px;">📊 Progresso da Aula 3</div>
        <div class="progresso3-bar-wrap"><div class="progresso3-bar-fill"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
          <span>9 Capítulos</span><span style="color:var(--color-success);font-weight:700;">100% ✓</span>
        </div>
      </div>

      <h3 style="font-family:var(--font-display);font-size:1rem;color:var(--text-muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">🎖️ Conquistas Desbloqueadas</h3>
      <div class="conquistas3-grid">
        <div class="conquista3-card">
          <span class="conquista3-icon">🔌</span>
          <div class="conquista3-label">Mestre dos Periféricos</div>
          <div class="conquista3-desc">Concluiu a Missão 3 — Periféricos e Conexões com excelência!</div>
        </div>
      </div>

      <div class="proximas3-aulas">
        <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:var(--text-primary);margin-bottom:10px;">🗺️ O que vem a seguir?</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(124,58,237,0.1);border-radius:10px;border:1px solid rgba(124,58,237,0.2);">
            <span style="font-size:1.5rem;">🖥️</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">Aula 4 <span class="badge3-aula" style="background:var(--color-primary-light);">Próxima Missão</span></div>
              <div style="font-size:0.78rem;color:var(--text-muted);">Dominando o Windows e o S.O. — Controle a máquina e organize seus arquivos</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "boas-vindas-aula-4",
    title: "🖥️ Missão 4 — Dominando o Windows",
    page: 57,
    type: "intro",
    chapter: "AULA 4",
    content: `
      <div class="welcome-container text-center">
        <div class="welcome-badge">🖥️ AULA 4</div>
        <h1 class="welcome-title">Dominando o Windows e o Sistema Operacional</h1>
        <p class="welcome-subtitle">Aprenda a controlar a máquina através de seu principal software de gerenciamento.</p>
        
        <div class="welcome-card card-gradient" style="margin-top:1.5rem;">
          <h3>🎯 O que você vai aprender?</h3>
          <p>Nesta aula, daremos o passo definitivo na alfabetização digital. Você sairá de um mero conhecedor de peças físicas (hardware) para alguém capaz de manipular pastas, gerenciar arquivos de forma organizada, usar atalhos rápidos e dominar a Área de Trabalho do Windows!</p>
        </div>

        <div class="grid grid-2 gap-2 mt-2">
          <div class="card bg-surface border-soft">
            <h4>🏅 Medalha Desbloqueável</h4>
            <p><strong>Explorador do Windows</strong>: Concedida ao aluno que demonstrar controle absoluto do sistema operacional no Desafio Final da aula.</p>
          </div>
          <div class="card bg-surface border-soft">
            <h4>⚡ XP Disponível</h4>
            <p>Ganhe até <strong>250 XP</strong> nesta aula realizando todos os mini-games práticos e o quiz final.</p>
          </div>
        </div>

        <div class="alert alert-info mt-2">
          <strong>Como Jogar:</strong> Avance pelas páginas e resolva os desafios em cada simulador. O progresso é salvo na hora!
        </div>
      </div>
    `
  },
  {
    id: "aula4-cap1-revisao",
    title: "4.1 Revisão Relâmpago",
    page: 58,
    type: "challenge",
    chapter: "AULA 4",
    interactiveId: "windows-review",
    content: `
      <h2>4.1 Revisão da Aula Anterior: Periféricos</h2>
      <p>Antes de começarmos a mexer no sistema operacional, vamos testar o que você lembra sobre a conexão física do computador!</p>
      
      <div class="definition-box card-gradient">
        <p>Lembre-se: os cabos de vídeo (HDMI, VGA) transmitem a imagem para o monitor (Saída), enquanto os de dados (USB) trazem comandos de dispositivos como o teclado e o mouse (Entrada).</p>
      </div>

      <p class="text-muted mt-2">Responda as 5 perguntas da <strong>Revisão Relâmpago</strong> no simulador abaixo para liberar a próxima página da aula!</p>
    `
  },
  {
    id: "aula4-cap2-so",
    title: "4.2 O que é um S.O.?",
    page: 59,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "os-guess",
    content: `
      <h2>4.2 O que é um Sistema Operacional (S.O.)?</h2>
      <p>Um <strong>Sistema Operacional</strong> é o software mais importante do computador. Ele serve como uma ponte de comunicação entre o hardware físico (placa-mãe, memória, processador) e os programas que nós usamos (Word, jogos, navegador).</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>🤖 O Tradutor do Computador</h4>
          <p>O processador só entende códigos complexos (zeros e uns). O Sistema Operacional traduz seus cliques no mouse em comandos que o processador entende, e desenha o resultado em janelas coloridas e amigáveis.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>📱 SOs de Todo Dia</h4>
          <p>Eles estão em todo lugar! Seu celular usa <strong>Android</strong> ou <strong>iOS</strong>. O notebook da sua escola usa <strong>Windows</strong>, <strong>macOS</strong> ou <strong>Linux</strong>. Até Smart TVs usam sistemas operacionais próprios para rodar os apps de streaming.</p>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>💡 Sem o S.O., o computador é inútil</h4>
        <p>Se você ligar um computador sem um sistema operacional, a tela ficará preta com textos brancos e o computador não saberá o que fazer. O SO é o cérebro lógico que dá vida às peças.</p>
      </div>

      <p class="text-muted mt-2">Participe do desafio <strong>Quem é quem?</strong> no simulador abaixo e identifique o sistema operacional dos diferentes aparelhos!</p>
    `
  },
  {
    id: "aula4-cap3-desktop",
    title: "4.3 Área de Trabalho",
    page: 60,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "desktop-explorer",
    content: `
      <h2>4.3 A Área de Trabalho (Desktop)</h2>
      <p>Assim que o computador liga e faz o carregamento inicial, a primeira tela que você vê é a <strong>Área de Trabalho</strong> (ou <em>Desktop</em>). Pense nela como uma mesa física de trabalho virtual: nela você coloca os papéis, canetas e pastas que usa no dia a dia.</p>

      <div class="grid grid-3 gap-1 mt-2">
        <div class="card bg-card-dark text-center">
          <div style="font-size:2rem">🖼️</div>
          <strong>Papel de Parede</strong>
          <p class="text-small">A imagem de fundo que você pode personalizar com suas fotos ou cores preferidas.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <div style="font-size:2rem">📂</div>
          <strong>Ícones</strong>
          <p class="text-small">Pequenos desenhos que representam pastas, arquivos ou atalhos para abrir programas com clique duplo.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <div style="font-size:2rem">➖</div>
          <strong>Barra de Tarefas</strong>
          <p class="text-small">A barra horizontal (geralmente abaixo) que mostra os apps abertos, a hora, rede e o botão Iniciar.</p>
        </div>
      </div>

      <p class="text-muted mt-2">Interaja com a Área de Trabalho simulada abaixo. Clique em cada um dos elementos destacados para ver a explicação de seu papel no sistema!</p>
    `
  },
  {
    id: "aula4-cap4-menu-iniciar",
    title: "4.4 Menu Iniciar",
    page: 61,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "start-menu-hunt",
    content: `
      <h2>4.4 O Menu Iniciar e Programas</h2>
      <p>O <strong>Menu Iniciar</strong> é o ponto de partida do Windows. Clicando nele, você tem acesso a todos os aplicativos instalados na máquina, arquivos recentes, opções de energia e às configurações do sistema.</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>🔍 A Barra de Pesquisa</h4>
          <p>Em vez de rolar toda a lista de aplicativos, você pode abrir o Iniciar e simplesmente digitar o nome do programa (ex: "Calculadora" ou "Word"). O Windows busca e abre na hora!</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>🔌 Energia e Desligamento</h4>
          <p>Para desligar o computador com segurança, você nunca deve apertar o botão físico da CPU direto. Use o Menu Iniciar, clique no botão de **Ligar/Desligar** e selecione **Desligar** ou **Reiniciar**.</p>
        </div>
      </div>

      <p class="text-muted mt-2">Ajude a encontrar os softwares corretos no desafio <strong>Caça ao Programa</strong> no menu iniciar do simulador abaixo!</p>
    `
  },
  {
    id: "aula4-cap11-explorer",
    title: "4.5 O Explorador de Arquivos",
    page: 62,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "explorer-simulator",
    content: `
      <h2>4.5 O Explorador de Arquivos do Windows</h2>
      <p>O <strong>Explorador de Arquivos</strong> (ou <em>File Explorer</em>) é o aplicativo nativo do Windows que serve para gerenciar e visualizar todos os diretórios e pastas armazenados na sua máquina.</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>📁 Pastas Padrão do Sistema</h4>
          <p>O Windows cria automaticamente pastas dedicadas para facilitar a organização: <strong>Área de Trabalho</strong> (Desktop), <strong>Documentos</strong>, <strong>Downloads</strong> (onde caem os arquivos da internet), <strong>Imagens</strong> e <strong>Vídeos</strong>.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>💽 Disco Local (C:)</h4>
          <p>O <strong>Disco Local C:</strong> representa a raiz do seu armazenamento interno (HD ou SSD). É nele onde o Windows e os arquivos cruciais de sistema estão instalados. Cuidado ao modificar arquivos nele!</p>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>💡 A Biblioteca do Computador</h4>
        <p>"O computador funciona como uma grande biblioteca. Cada pasta é uma prateleira organizada por temas e cada arquivo é um livro contendo dados específicos."</p>
      </div>

      <p class="text-muted mt-2">No simulador abaixo, explore o sistema para: <strong>encontrar Downloads</strong>, <strong>abrir Imagens</strong>, <strong>achar o arquivo oculto</strong> e <strong>voltar para o Desktop</strong>!</p>
    `
  },
  {
    id: "aula4-cap5-pastas-arquivos",
    title: "4.6 Pastas e Arquivos",
    page: 63,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "file-organizer",
    content: `
      <h2>4.6 Entendendo Pastas e Arquivos</h2>
      <p>Para manter o computador organizado, o sistema operacional divide os dados em **Pastas** (ou Diretórios) e **Arquivos**. Pense na pasta como uma gaveta e nos arquivos como as folhas guardadas nela.</p>

      <div class="definition-box card-gradient">
        <p>Um <strong>Arquivo</strong> é um bloco de informações gravadas no computador. Todo arquivo tem um <strong>Nome</strong> e uma <strong>Extensão</strong> (três ou quatro letras após o ponto, que dizem de que tipo de arquivo se trata).</p>
      </div>

      <h4 class="mt-2">Extensões de Arquivos Mais Comuns:</h4>
      <div class="grid grid-4 gap-1 mt-1">
        <div class="card text-center text-small">
          <strong>📑 Documentos</strong>
          <p style="font-size: 0.8rem; color: var(--color-primary-light); font-weight:700;">.pdf / .docx</p>
          <p class="text-muted">Textos, relatórios, livros ou trabalhos de escola.</p>
        </div>
        <div class="card text-center text-small">
          <strong>🖼️ Imagens</strong>
          <p style="font-size: 0.8rem; color: var(--color-success); font-weight:700;">.jpg / .png</p>
          <p class="text-muted">Fotografias digitais, designs e capturas de tela.</p>
        </div>
        <div class="card text-center text-small">
          <strong>🎵 Músicas</strong>
          <p style="font-size: 0.8rem; color: var(--color-warning); font-weight:700;">.mp3</p>
          <p class="text-muted">Arquivos de música e gravações de áudio.</p>
        </div>
        <div class="card text-center text-small">
          <strong>🎥 Vídeos</strong>
          <p style="font-size: 0.8rem; color: var(--color-error); font-weight:700;">.mp4</p>
          <p class="text-muted">Filmes, animações ou vídeo-aulas inteiras.</p>
        </div>
      </div>

      <p class="text-muted mt-2">No simulador abaixo, ajude a organizar os arquivos jogando cada um para a pasta correta de acordo com a sua extensão!</p>
    `
  },
  {
    id: "aula4-cap12-extensoes",
    title: "4.7 Tipos de Arquivos e Extensões",
    page: 64,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "file-classifier",
    content: `
      <h2>4.7 Tipos de Arquivos e Extensões (Avançado)</h2>
      <p>Cada arquivo possui uma **extensão** indicada por um ponto seguido de letras no final de seu nome. A extensão diz ao computador qual programa deve abrir aquele arquivo.</p>

      <div class="grid grid-3 gap-1 mt-2">
        <div class="card bg-card-dark text-center">
          <strong>📄 Documentos</strong>
          <p style="font-size:0.95rem; color:var(--color-primary-light); font-weight:700;">.pdf / .txt</p>
          <p class="text-small text-muted">Contém relatórios, livros ou textos simples.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <strong>🖼️ Imagens</strong>
          <p style="font-size:0.95rem; color:var(--color-success); font-weight:700;">.jpg / .png</p>
          <p class="text-small text-muted">Fotos, logotipos ou capturas de tela comprimidas.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <strong>📦 Compactados</strong>
          <p style="font-size:0.95rem; color:var(--color-warning); font-weight:700;">.zip / .rar</p>
          <p class="text-small text-muted">Agrupam vários arquivos compactados para economizar espaço.</p>
        </div>
      </div>

      <div class="alert alert-warning mt-2">
        <strong>⚠️ Curiosidade sobre Extensões:</strong><br>
        O que acontece se uma foto <code>foto.jpg</code> for renomeada para <code>foto.mp3</code>? O arquivo não vira música. Ele apenas gera erro de leitura. Mudar a extensão <strong>não</strong> transforma o tipo interno do arquivo!
      </div>

      <p class="text-muted mt-2">Ajude a organizar o sistema classificando os arquivos soltos em suas respectivas categorias no painel abaixo!</p>
    `
  },
  {
    id: "aula4-cap6-criando-movendo",
    title: "4.8 Criando e Movendo Pastas",
    page: 65,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "office-simulator",
    content: `
      <h2>4.8 Gerenciamento e Organização na Prática</h2>
      <p>No Windows, você pode criar suas próprias pastas para classificar os trabalhos e arquivos. O aplicativo que faz isso é o **Explorador de Arquivos** (File Explorer).</p>

      <h4 class="mt-2">Operações Essenciais:</h4>
      <ul>
        <li><strong>Criar Pasta:</strong> Clique com o botão direito em uma área vazia, selecione <em>Novo</em> > <em>Pasta</em> e digite o nome.</li>
        <li><strong>Mover:</strong> Arraste o arquivo para dentro da pasta de destino ou use Recortar e Colar.</li>
        <li><strong>Excluir:</strong> Envia o arquivo para a <strong>Lixeira</strong>. Arquivos na lixeira ainda ocupam espaço. Você deve **esvaziar a Lixeira** para apagá-los permanentemente e liberar espaço no disco rígido.</li>
        <li><strong>Restaurar:</strong> Abre a Lixeira, clica com o botão direito no arquivo deletado por engano e seleciona <em>Restaurar</em> para devolvê-lo à sua pasta original.</li>
      </ul>

      <p class="text-muted mt-2">Entre no <strong>Escritório Virtual</strong> simulado abaixo para criar pastas, organizar relatórios de trabalho e resgatar documentos da Lixeira do sistema!</p>
    `
  },
  {
    id: "aula4-cap7-atalhos",
    title: "4.9 Atalhos Básicos",
    page: 66,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "shortcut-master",
    content: `
      <h2>4.9 Dominando Atalhos do Teclado</h2>
      <p>Os atalhos de teclado poupam muito tempo e tornam você um usuário avançado. Em vez de usar o mouse para tudo, você pressiona duas teclas simultaneamente para realizar ações imediatas.</p>

      <div class="grid grid-3 gap-1 mt-2">
        <div class="card bg-card-dark text-center">
          <strong>⌨️ Copiar / Recortar</strong>
          <p style="font-size:1.1rem; font-weight:700;" class="mt-1">Ctrl + C / Ctrl + X</p>
          <p class="text-small text-muted">Copia as informações para a memória (Clipboard) ou as recorta para remover da origem.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <strong>📋 Colar</strong>
          <p style="font-size:1.1rem; font-weight:700;" class="mt-1">Ctrl + V</p>
          <p class="text-small text-muted">Insere as informações copiadas ou recortadas na posição do cursor do mouse.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <strong>↩️ Desfazer</strong>
          <p style="font-size:1.1rem; font-weight:700;" class="mt-1">Ctrl + Z</p>
          <p class="text-small text-muted">Volta atrás. Cancela a última ação feita no sistema ou em qualquer documento.</p>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>💾 Salvamento Rápido: Ctrl + S</h4>
        <p>Sempre que estiver escrevendo um texto importante, pressione <strong>Ctrl + S</strong> a cada poucos minutos. Esse atalho salva seu progresso no disco rígido e evita que você perca o arquivo caso o computador desligue do nada.</p>
      </div>

      <p class="text-muted mt-2">Mostre que você conhece os comandos jogando o quiz cronometrado de atalhos abaixo!</p>
    `
  },
  {
    id: "aula4-cap13-personalizar",
    title: "4.10 Personalizando o Windows",
    page: 67,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "desktop-customizer",
    content: `
      <h2>4.10 Personalizando o Windows</h2>
      <p>O Windows permite que você deixe o ambiente de trabalho com a sua cara, melhorando não apenas o visual, mas a ergonomia de leitura.</p>

      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>🎨 Visual e Temas</h4>
          <p>Você pode trocar o <strong>Papel de Parede</strong> (Wallpaper), alternar entre o Tema Claro ou Escuro (Dark Mode) e personalizar as cores das barras e janelas do sistema.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>⚙️ Ajustes Físicos Rápidos</h4>
          <p>Na bandeja do sistema, você pode ajustar o <strong>brilho do monitor</strong> (para proteger a visão) e o <strong>volume do som</strong> de forma rápida.</p>
        </div>
      </div>

      <p class="text-muted mt-2">Use o <strong>Customizador de Desktop</strong> abaixo para personalizar o papel de parede, tema e controles do sistema!</p>
    `
  },
  {
    id: "aula4-cap14-central",
    title: "4.11 Central de Controle do Windows",
    page: 68,
    type: "lesson",
    chapter: "AULA 4",
    interactiveId: "windows-control-center",
    content: `
      <h2>4.11 Central de Controle do Windows</h2>
      <p>A <strong>Central de Controle</strong> do Windows agrupa os principais interruptores físicos e lógicos da máquina no canto da Barra de Tarefas.</p>

      <div class="grid grid-3 gap-1 mt-2">
        <div class="card bg-card-dark text-center">
          <strong>🌐 Wi-Fi</strong>
          <p class="text-small text-muted">Liga/Desliga a recepção de internet sem fio e conexões de rede.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <strong>🔊 Volume</strong>
          <p class="text-small text-muted">Controla a saída de som de fones de ouvido e alto-falantes.</p>
        </div>
        <div class="card bg-card-dark text-center">
          <strong>🎧 Bluetooth</strong>
          <p class="text-small text-muted">Conecta aparelhos de som, celulares, teclados e mouses sem fio.</p>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>💡 Resolução de Problemas</h4>
        <p>Muitos travamentos de rede ou ausência de som são causados por chaves desligadas na Central de Controle. Basta abri-la para verificar o status e religar os dispositivos em segundos!</p>
      </div>

      <p class="text-muted mt-2">Ajuste os interruptores e conexões corretas para resolver os problemas na Central de Controle simulada abaixo!</p>
    `
  },
  {
    id: "aula4-cap8-desafio",
    title: "4.12 Desafio do Explorador",
    page: 69,
    type: "challenge",
    chapter: "AULA 4",
    interactiveId: "windows-challenge",
    content: `
      <h2>4.12 Desafio Prático: O Explorador do Windows</h2>
      <p>Chegou a hora de juntar tudo o que você aprendeu em um teste completo de habilidades!</p>
      
      <div class="definition-box card-gradient">
        <p>Você terá que gerenciar arquivos, criar pastas administrativas, resgatar dados da lixeira e buscar aplicativos utilitários do sistema operacional.</p>
      </div>

      <p class="text-muted mt-2">Cumpra todas as 6 missões listadas no simulador de Área de Trabalho e garanta os seus **+50 XP**!</p>
    `
  },
  {
    id: "aula4-cap15-missao",
    title: "4.13 A Grande Missão do Windows",
    page: 70,
    type: "challenge",
    chapter: "AULA 4",
    interactiveId: "windows-master-challenge",
    content: `
      <h2>4.13 Grande Missão do Windows</h2>
      <p>Chegou a hora do maior teste de sistema! Mostre que você domina o computador completando o checklist unificado.</p>

      <div class="definition-box card-gradient">
        <p>Você terá que resolver 10 ações essenciais do Windows contra o relógio: criar e renomear pastas, abrir calculadora, esvaziar lixeira, ligar internet, ajustar volume, alterar temas e buscar programas.</p>
      </div>

      <p class="text-muted mt-2">Conclua todas as tarefas da lista a tempo de desbloquear a classificação final de Guardião!</p>
    `
  },
  {
    id: "aula4-cap9-quiz",
    title: "4.14 Teste de Aprendizado",
    page: 71,
    type: "quiz",
    chapter: "AULA 4",
    interactiveId: "windows-final-quiz",
    quiz: [
      {
        question: "Qual é a principal função de um Sistema Operacional?",
        options: [
          "Limpar os vírus e poeiras físicas das peças do gabinete.",
          "Fazer a ponte de comunicação entre o usuário, os programas e o hardware.",
          "Permitir o envio de e-mails sem precisar de conexão com a Internet.",
          "Substituir o processador e a memória RAM no trabalho pesado."
        ],
        correct: 1,
        explanation: "O SO gerencia todos os recursos de hardware e softwares, permitindo que a gente use o computador de forma amigável."
      },
      {
        question: "Qual das alternativas contém apenas sistemas operacionais?",
        options: [
          "Windows, Word e Excel.",
          "Google Chrome, Android e iOS.",
          "Windows, Android, Linux e macOS.",
          "Teclado, Mouse e Monitor."
        ],
        correct: 2,
        explanation: "Windows, Android, Linux e macOS são sistemas operacionais reais para computadores, servidores e smartphones."
      },
      {
        question: "A tela inicial amigável carregada após ligar o Windows é chamada de:",
        options: [
          "Explorador de Arquivos.",
          "Área de Trabalho (Desktop).",
          "Menu Iniciar.",
          "Painel de Controle."
        ],
        correct: 1,
        explanation: "A Área de Trabalho é a tela base contendo o papel de parede, os ícones e a barra de tarefas."
      },
      {
        question: "Para que serve a Barra de Tarefas no Windows?",
        options: [
          "Para monitorar a velocidade física do cooler e do processador.",
          "Para exibir os programas que estão abertos, relógio, rede e dar acesso ao menu Iniciar.",
          "Para digitar textos longos e salvar arquivos como fotos.",
          "Para esvaziar os arquivos inúteis que estão na Lixeira."
        ],
        correct: 1,
        explanation: "A Barra de Tarefas exibe as janelas em execução, atalhos de apps e a bandeja do relógio/notificações."
      },
      {
        question: "Qual o procedimento correto para desligar o computador?",
        options: [
          "Puxar o cabo de energia da tomada diretamente.",
          "Pressionar e segurar o botão físico de energia do gabinete até apagar.",
          "Clicar no botão Iniciar, selecionar Ligar/Desligar e clicar em Desligar.",
          "Fechar todas as janelas e deixar o computador ligado para sempre."
        ],
        correct: 2,
        explanation: "Desligar pelo menu Iniciar avisa o sistema para fechar os arquivos abertos de forma segura, evitando corromper o HD."
      },
      {
        question: "Um arquivo com a extensão '.mp3' é classificado como:",
        options: [
          "Um documento de texto editável.",
          "Uma imagem ou fotografia digital.",
          "Um arquivo de música ou áudio.",
          "Um vídeo de alta definição."
        ],
        correct: 2,
        explanation: "A extensão '.mp3' é o formato de compressão de áudio digital mais utilizado."
      },
      {
        question: "Como liberamos espaço no disco rígido após deletar arquivos indesejados?",
        options: [
          "Basta reiniciar o computador.",
          "Abrir o painel da Lixeira e clicar em Esvaziar Lixeira.",
          "Desligar o monitor por alguns minutos.",
          "Mover os arquivos da Lixeira de volta para a Área de Trabalho."
        ],
        correct: 1,
        explanation: "Os arquivos na Lixeira continuam ocupando espaço no HD. Apenas esvaziando a Lixeira os dados são apagados de vez."
      },
      {
        question: "Se você excluir um arquivo por engano no Windows, como pode recuperá-lo?",
        options: [
          "Pressionando Ctrl + Alt + Del.",
          "Abrindo a Lixeira, clicando com o botão direito no arquivo e selecionando 'Restaurar'.",
          "Baixando o arquivo novamente da Internet.",
          "Não é possível recuperar arquivos excluídos."
        ],
        correct: 1,
        explanation: "A opção 'Restaurar' na Lixeira devolve o arquivo excluído exatamente para a pasta onde ele estava antes."
      },
      {
        question: "Quais teclas pressionamos para copiar um item selecionado?",
        options: [
          "Ctrl + V",
          "Ctrl + X",
          "Ctrl + C",
          "Ctrl + Z"
        ],
        correct: 2,
        explanation: "Ctrl + C (Copy) serve para copiar dados. Ctrl + V (Paste) serve para colar."
      },
      {
        question: "Qual atalho é utilizado para desfazer a última ação realizada no Windows?",
        options: [
          "Ctrl + A",
          "Ctrl + Z",
          "Ctrl + S",
          "Ctrl + X"
        ],
        correct: 1,
        explanation: "Ctrl + Z é o atalho universal para desfazer qualquer alteração ou erro cometido na edição."
      }
    ],
    content: `
      <h2>4.14 Avaliação de Conhecimento</h2>
      <p>Chegou a hora de consolidar tudo o que foi estudado! Nosso Quiz Final testará suas habilidades de gerenciamento e atalhos.</p>
      
      <div class="alert alert-warning">
        <strong>Atenção:</strong> Você possui um limite de <strong>3 vidas</strong> para concluir o questionário. Leia cada pergunta com atenção!
      </div>
    `
  },
  {
    id: "aula4-cap10-missao-final",
    title: "4.15 Conclusão da Aula 4",
    page: 72,
    type: "challenge",
    chapter: "AULA 4",
    interactiveId: "default",
    content: `
      <style>
        @keyframes float4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pop4 { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer4 { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .conclusao4-hero { text-align:center; padding:2rem 1rem 1.5rem; }
        .conclusao4-trophy { font-size:5rem; display:block; animation:float4 3s ease-in-out infinite; }
        .conclusao4-title { font-family:var(--font-display); font-size:2rem; font-weight:900; background:linear-gradient(90deg,#7c3aed,#a78bfa,#ec4899,#7c3aed); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer4 3s linear infinite; margin:0.5rem 0; }
        .conclusao4-sub { color:var(--text-muted); font-size:1rem; }
        .conquistas4-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin:1.5rem 0; }
        .conquista4-card { background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px 10px; text-align:center; animation:pop4 0.5s ease both; }
        .conquista4-icon { font-size:2rem; display:block; margin-bottom:6px; }
        .conquista4-label { font-family:var(--font-display); font-weight:700; font-size:0.8rem; color:var(--text-primary); }
        .conquista4-desc { font-size:0.7rem; color:var(--text-muted); margin-top:2px; }
        .progresso4-bar-wrap { background:var(--bg-surface); border-radius:50px; height:12px; overflow:hidden; margin:8px 0; }
        .progresso4-bar-fill { height:100%; border-radius:50px; background:linear-gradient(90deg,#7c3aed,#ec4899); width:0; animation:progressAnim4 1.5s ease 0.5s both; }
        @keyframes progressAnim4 { from{width:0} to{width:100%} }
        .proximas4-aulas { background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(236,72,153,0.1)); border:1px solid rgba(124,58,237,0.3); border-radius:16px; padding:18px; margin-top:1.5rem; }
        .badge4-aula { display:inline-block; background:var(--color-accent); color:#fff; font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:20px; margin-left:6px; vertical-align:middle; }
      </style>

      <div class="conclusao4-hero">
        <span class="conclusao4-trophy">🖥️</span>
        <div class="conclusao4-title">Aula 4 Concluída!</div>
        <p class="conclusao4-sub">Parabéns! Você se tornou um verdadeiro Explorador do Windows.<br>Manipular arquivos e gerenciar o computador agora é fácil! 🌟</p>
      </div>

      <div style="background:var(--bg-surface);border-radius:14px;padding:16px;margin-bottom:1.5rem;">
        <div style="font-family:var(--font-display);font-weight:700;font-size:0.9rem;color:var(--text-primary);margin-bottom:8px;">📊 Progresso da Aula 4</div>
        <div class="progresso4-bar-wrap"><div class="progresso4-bar-fill"></div></div>
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
          <span>17 Capítulos</span><span style="color:var(--color-success);font-weight:700;">100% ✓</span>
        </div>
      </div>

      <h3 style="font-family:var(--font-display);font-size:1rem;color:var(--text-muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">🎖️ Conquistas Desbloqueadas</h3>
      <div class="conquistas4-grid">
        <div class="conquista4-card">
          <span class="conquista4-icon">🖥️</span>
          <div class="conquista4-label">Explorador do Windows</div>
          <div class="conquista4-desc">Concluiu a Missão 4 — Dominando o Windows.</div>
        </div>
      </div>

      <div style="background:rgba(255,255,255,0.02);border:1px solid var(--border-color);border-radius:12px;padding:16px;margin-bottom:1.5rem;">
        <h4 style="margin:0 0 8px;">✍️ Missão Final da Aula 4</h4>
        <p class="text-small text-muted" style="line-height:1.4;margin-bottom:12px;">Descreva brevemente abaixo: <strong>Como você organizaria os arquivos do seu computador pessoal em pastas de forma prática e produtiva?</strong> Suas notas serão gravadas no seu bloco de anotações.</p>
      </div>

      <div class="proximas4-aulas">
        <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:var(--text-primary);margin-bottom:10px;">🗺️ O que vem a seguir?</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(124,58,237,0.1);border-radius:10px;border:1px solid rgba(124,58,237,0.2);">
            <span style="font-size:1.5rem;">📁</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">Módulo de Produtividade <span class="badge4-aula">Próxima Página</span></div>
              <div style="font-size:0.78rem;color:var(--text-muted);">Organização avançada e ferramentas do S.O. na próxima página!</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "aula4-cap16-guardiao",
    title: "🏆 Guardião do Windows",
    page: 73,
    type: "challenge",
    chapter: "AULA 4",
    interactiveId: "aula4-reflexao-extra",
    content: `
      <style>
        @keyframes floatExp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes popExp { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmerExp { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .conclusaoExp-hero { text-align:center; padding:2rem 1rem 1.5rem; }
        .conclusaoExp-trophy { font-size:5rem; display:block; animation:floatExp 3s ease-in-out infinite; }
        .conclusaoExp-title { font-family:var(--font-display); font-size:2rem; font-weight:900; background:linear-gradient(90deg,#10b981,#34d399,#3b82f6,#10b981); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmerExp 3s linear infinite; margin:0.5rem 0; }
        .conclusaoExp-sub { color:var(--text-muted); font-size:1rem; }
        .conquistasExp-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin:1.5rem 0; }
        .conquistaExp-card { background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:14px 10px; text-align:center; animation:popExp 0.5s ease both; }
        .conquistaExp-icon { font-size:2rem; display:block; margin-bottom:6px; }
        .conquistaExp-label { font-family:var(--font-display); font-weight:700; font-size:0.8rem; color:var(--text-primary); }
        .conquistaExp-desc { font-size:0.7rem; color:var(--text-muted); margin-top:2px; }
        .proximasExp-aulas { background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(59,130,246,0.1)); border:1px solid rgba(16,185,129,0.3); border-radius:16px; padding:18px; margin-top:1.5rem; }
        .badgeExp-aula { display:inline-block; background:var(--color-primary-light); color:#fff; font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:20px; margin-left:6px; vertical-align:middle; }
      </style>

      <div class="conclusaoExp-hero">
        <span class="conclusaoExp-trophy">🛡️</span>
        <div class="conclusaoExp-title">Missão Extra Concluída!</div>
        <p class="conclusaoExp-sub">Parabéns! Você concluiu a expansão da Aula 4 e se tornou um <strong>Guardião do Windows</strong>.<br>Você domina o sistema operacional de ponta a ponta! 🌟</p>
      </div>

      <div class="proximasExp-aulas">
        <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:var(--text-primary);margin-bottom:10px;">🗺️ O que vem a seguir?</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(124,58,237,0.1);border-radius:10px;border:1px solid rgba(124,58,237,0.2);">
            <span style="font-size:1.5rem;">📁</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">Módulo 2 — Produtividade <span class="badgeExp-aula">Próxima Etapa</span></div>
              <div style="font-size:0.78rem;color:var(--text-muted);">Organização avançada, uso de pendrives, navegação de internet e ferramentas de escritório.</div>
            </div>
          </div>
        </div>
      </div>

      <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:16px; margin-top:1.5rem;">
        <h4 style="margin:0 0 8px;">✍️ Atividade Reflexiva da Expansão</h4>
        <p class="text-small text-muted" style="line-height:1.4; margin-bottom:12px;"><strong>Reflexão:</strong> Imagine que você acabou de ganhar um computador novo. Explique como organizaria suas pastas, personalizaria a área de trabalho e configuraria o sistema para começar a utilizá-lo. Suas notas serão gravadas no seu bloco de anotações.</p>
        <textarea id="exp-mission-textarea" style="width:100%; min-height:120px; background:var(--bg-base); border:1px solid var(--border-soft); border-radius:10px; padding:12px; color:var(--text-primary); font-size:0.9rem; resize:vertical; line-height:1.6;" placeholder="Escreva sua resposta de forma organizada..."></textarea>
        <button class="btn btn-primary mt-1" id="exp-save-btn" style="width:100%;">💾 Salvar Anotações Reflexivas</button>
        <div id="exp-save-feedback" class="text-small mt-1" style="font-weight:bold;"></div>
      </div>
    `
  },
  {
    id: "aula5-intro",
    title: "📂 Missão 5 — Introdução",
    page: 74,
    type: "theory",
    chapter: "AULA 5",
    content: `
      <div class="conclusaoExp-hero" style="text-align:center; padding:1.5rem 1rem;">
        <span style="font-size:5rem; display:block; animation: floatExp 3s ease-in-out infinite;">📂</span>
        <h2 style="font-family:var(--font-display); font-size:2.2rem; font-weight:900; background:linear-gradient(90deg,#3b82f6,#60a5fa,#a78bfa,#3b82f6); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmerExp 3s linear infinite; margin:0.5rem 0;">Missão 5 — Guardião dos Arquivos</h2>
        <p style="font-style:italic; color:#a78bfa; font-size:1.1rem; margin-bottom:1.5rem;">"Um bom profissional não apenas sabe usar um computador. Ele sabe organizar suas informações."</p>
        
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(124,58,237,0.2); border-radius:16px; padding:1.5rem; text-align:left; max-width:560px; margin:0 auto; line-height:1.6;">
          <h4 style="margin:0 0 10px; color:#fff; display:flex; align-items:center; gap:8px;">🎯 Seus Objetivos de Aprendizado:</h4>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.9rem; color:#ccc;">
            <li>📁 <strong>Criar Pastas e Subpastas</strong> organizadas logicamente.</li>
            <li>✂️ Dominar a diferença crucial entre <strong>Copiar e Mover</strong> arquivos.</li>
            <li>📦 Reconhecer extensões comuns (PDF, JPG, MP3, MP4, ZIP).</li>
            <li>💾 Aprender sobre <strong>Backup, Pendrives</strong> e segurança.</li>
            <li>☁️ Diferenciar <strong>Download vs Upload</strong> e explorar a Nuvem.</li>
          </ul>
        </div>

        <div class="conquistasExp-grid" style="max-width:560px; margin:1.5rem auto 0 auto; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div class="conquistaExp-card">
            <span class="conquistaExp-icon">⚡</span>
            <span class="conquistaExp-label">XP Disponível</span>
            <div class="conquistaExp-desc">+750 XP no Total</div>
          </div>
          <div class="conquistaExp-card">
            <span class="conquistaExp-icon">📂</span>
            <span class="conquistaExp-label">Medalha Rara</span>
            <div class="conquistaExp-desc">🏆 Guardião dos Arquivos</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap1-revisao",
    title: "Capítulo 1 — Revisão da Aula 4",
    page: 75,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "review-mission",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">🧠 Aquecimento: Revisão do Windows</h3>
        <p style="line-height:1.6; margin-bottom:1.5rem;">Antes de mergulharmos em arquivos, vamos recordar o que aprendemos sobre o Windows e o Sistema Operacional na aula anterior.</p>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px; margin-bottom:1.5rem;">
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:1rem; border-radius:10px;">
            <strong style="color:var(--color-primary-light);">🖥️ Área de Trabalho e Iniciar</strong>
            <p style="font-size:0.82rem; color:#aaa; margin:4px 0 0 0; line-height:1.4;">A tela principal (Desktop) e o menu iniciar organizam seus atalhos e aplicativos favoritos de acesso rápido.</p>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:1rem; border-radius:10px;">
            <strong style="color:var(--color-primary-light);">📂 Diretórios e Lixeira</strong>
            <p style="font-size:0.82rem; color:#aaa; margin:4px 0 0 0; line-height:1.4;">Pastas guardam seus arquivos temporários ou finais. Arquivos deletados vão para a Lixeira e podem ser restaurados.</p>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.01); border:1px dashed rgba(255,255,255,0.1); border-radius:10px; padding:12px; text-align:center;">
          💡 <strong>Simulação Interativa:</strong> Responda o quiz rápido abaixo para aquecer as engrenagens de memória!
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap2-faxina",
    title: "Capítulo 2 — O Poder da Organização",
    page: 76,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "digital-cleanup",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">🧹 Faxina Digital: Organizar para Produzir</h3>
        <p style="line-height:1.6;">Imagine trabalhar em uma mesa onde papéis de trabalho, fotos de família, brinquedos e lixo estão todos misturados. É impossível ser produtivo! No computador, o conceito é idêntico.</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:1.5rem 0;">
          <div style="background:rgba(239, 68, 68, 0.05); border:1px solid rgba(239,68,68,0.2); border-radius:12px; padding:1.2rem; text-align:center;">
            <span style="font-size:2rem; display:block;">❌</span>
            <strong style="color:#ef4444; display:block; margin:6px 0;">Desktop Bagunçado</strong>
            <p style="font-size:0.8rem; color:#aaa; margin:0; line-height:1.45;">Perda de tempo procurando arquivos, lentidão mental e risco de deletar arquivos importantes por engano.</p>
          </div>
          <div style="background:rgba(16, 185, 129, 0.05); border:1px solid rgba(16,185,129,0.2); border-radius:12px; padding:1.2rem; text-align:center;">
            <span style="font-size:2rem; display:block;">✅</span>
            <strong style="color:#10b981; display:block; margin:6px 0;">Desktop Limpo</strong>
            <p style="font-size:0.8rem; color:#aaa; margin:0; line-height:1.45;">Encontra qualquer documento em segundos. Organização lógica empresarial que melhora a rotina diária.</p>
          </div>
        </div>

        <p style="line-height:1.6; margin-bottom:1.5rem;">As empresas e profissionais separam seus dados em categorias bem definidas: <strong>Fotos, Trabalhos, Vídeos, Músicas e Documentos</strong>.</p>
      </div>
    `
  },
  {
    id: "aula5-cap3-pastas",
    title: "Capítulo 3 — Criando Pastas Inteligentes",
    page: 77,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "folder-architect",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">📁 Pastas e Subpastas: A Árvore de Diretórios</h3>
        <p style="line-height:1.6;">Para organizar dados, criamos uma estrutura hierárquica. Uma pasta principal (como "Escola") pode conter subpastas (como "Matemática", "Português") para refinar a busca.</p>
        
        <div style="background:rgba(124,58,237,0.05); border:1px solid rgba(124,58,237,0.2); border-radius:12px; padding:1.2rem; margin-bottom:1.5rem; line-height:1.5;">
          <strong style="color:var(--color-primary-light); display:block; margin-bottom:0.5rem;">⚙️ Boas Práticas ao Nomear Pastas:</strong>
          <ul style="padding-left:1.2rem; margin:0; font-size:0.85rem; color:#ccc; display:flex; flex-direction:column; gap:4px;">
            <li>Nomes claros e curtos (ex: "Trabalhos_2026" em vez de "coisas").</li>
            <li>Evite caracteres especiais (\, /, :, *, ?, ", <, >, |) pois o sistema os bloqueia.</li>
            <li>Separe por categorias principais (Escola, Trabalho, Pessoal).</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap4-extensoes",
    title: "Capítulo 4 — Tipos de Arquivos",
    page: 78,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "file-detective",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">📦 Identificando Arquivos por suas Extensões</h3>
        <p style="line-height:1.6;">Todo arquivo possui um nome seguido de um ponto e sua **extensão** (ex: <code>relatorio.pdf</code>). A extensão diz ao Windows qual programa usar para ler aquele dado.</p>
        
        <div style="overflow-x:auto; margin-bottom:1.5rem;">
          <table style="width:100%; border-collapse:collapse; font-size:0.82rem; background:rgba(255,255,255,0.02); border-radius:10px; overflow:hidden;">
            <thead>
              <tr style="background:rgba(124,58,237,0.15); border-bottom:1px solid rgba(255,255,255,0.1);">
                <th style="padding:8px; text-align:left; color:#fff;">Tipo</th>
                <th style="padding:8px; text-align:left; color:#fff;">Extensão</th>
                <th style="padding:8px; text-align:left; color:#fff;">Para que serve</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:8px; font-weight:700;">📄 Documento</td>
                <td style="padding:8px; color:var(--color-primary-light);">.pdf / .txt</td>
                <td style="padding:8px; color:#aaa;">Textos oficiais legíveis ou anotações limpas.</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:8px; font-weight:700;">🖼️ Imagem</td>
                <td style="padding:8px; color:var(--color-primary-light);">${".jpg / .png"}</td>
                <td style="padding:8px; color:#aaa;">Fotografias e designs gráficos compactados.</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:8px; font-weight:700;">🎵 Áudio / 🎬 Vídeo</td>
                <td style="padding:8px; color:var(--color-primary-light);">.mp3 / .mp4</td>
                <td style="padding:8px; color:#aaa;">Músicas e gravações audiovisuais de alta qualidade.</td>
              </tr>
              <tr>
                <td style="padding:8px; font-weight:700;">📦 Compactado</td>
                <td style="padding:8px; color:var(--color-primary-light);">.zip</td>
                <td style="padding:8px; color:#aaa;">Agrupa e reduz o tamanho de vários arquivos juntos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap5-copiar-mover",
    title: "Capítulo 5 — Copiar, Mover e Excluir",
    page: 79,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "digital-mailman",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">✂️ A Diferença entre Copiar e Mover</h3>
        <p style="line-height:1.6;">Duas operações essenciais que confundem iniciantes. Entenda a diferença:</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:1.5rem 0;">
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; text-align:center;">
            <span style="font-size:2.2rem; display:block; margin-bottom:6px;">📋</span>
            <strong style="color:var(--color-primary-light); display:block; margin-bottom:4px;">Copiar (Duplicar)</strong>
            <p style="font-size:0.8rem; color:#aaa; margin:0; line-height:1.45;">Cria uma cópia idêntica no destino, mantendo o arquivo original no mesmo lugar. Útil para backups.</p>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; text-align:center;">
            <span style="font-size:2.2rem; display:block; margin-bottom:6px;">✂️</span>
            <strong style="color:var(--color-primary-light); display:block; margin-bottom:4px;">Mover (Recortar)</strong>
            <p style="font-size:0.8rem; color:#aaa; margin:0; line-height:1.45;">Transfere o arquivo para o novo destino e apaga o original da pasta antiga. Útil para organizar.</p>
          </div>
        </div>

        <p style="line-height:1.6; margin-bottom:1.5rem;"><strong>Exclusão:</strong> Ao deletar um arquivo, ele vai para a <strong>Lixeira</strong>. Se esvaziar a lixeira, os arquivos são apagados definitivamente!</p>
      </div>
    `
  },
  {
    id: "aula5-cap6-backup",
    title: "Capítulo 6 — Pendrive e Backup",
    page: 80,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "backup-master",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">💾 Backup e Dispositivos de Armazenamento Físico</h3>
        <p style="line-height:1.6;">Computadores podem quebrar ou pegar vírus. Para evitar a perda irreparável de seus arquivos preciosos, fazemos **Backup** (cópias de segurança externas).</p>
        
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin:1.2rem 0; text-align:center;">
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px;">
            <span style="font-size:1.8rem; display:block; margin-bottom:4px;">📟</span>
            <strong style="font-size:0.82rem; display:block;">Pendrive</strong>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px;">
            <span style="font-size:1.8rem; display:block; margin-bottom:4px;">💽</span>
            <strong style="font-size:0.82rem; display:block;">HD Externo</strong>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px;">
            <span style="font-size:1.8rem; display:block; margin-bottom:4px;">💾</span>
            <strong style="font-size:0.82rem; display:block;">MicroSD</strong>
          </div>
        </div>

        <div style="background:rgba(245, 158, 11, 0.08); border:1px solid rgba(245, 158, 11, 0.25); border-radius:12px; padding:1.2rem; line-height:1.5;">
          <strong style="color:#fbbf24; display:block; margin-bottom:4.5px;">⚠️ Regra de Ouro da Remoção Segura:</strong>
          Nunca desconecte um pendrive do computador diretamente! Sempre clique no ícone da barra de tarefas do Windows e selecione <strong>"Ejetar com Segurança"</strong> para evitar corromper e queimar a memória de arquivos.
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap7-down-up",
    title: "Capítulo 7 — Download e Upload",
    page: 81,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "download-upload-challenge",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">⬇️ Download vs ⬆️ Upload: A Direção dos Dados</h3>
        <p style="line-height:1.6;">Navegar na internet envolve transferir arquivos entre seu computador local e computadores remotos chamados servidores. O sentido dessa transferência muda o nome da ação:</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:1.5rem 0;">
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; text-align:center;">
            <span style="font-size:2.2rem; display:block; margin-bottom:6px;">⬇️</span>
            <strong style="color:var(--color-primary-light); display:block; margin-bottom:4px;">Download (Baixar)</strong>
            <p style="font-size:0.8rem; color:#aaa; margin:0; line-height:1.45;">Puxa um arquivo da internet para dentro do seu computador. Ex: Salvar uma foto enviada ou baixar um programa.</p>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem; text-align:center;">
            <span style="font-size:2.2rem; display:block; margin-bottom:6px;">⬆️</span>
            <strong style="color:var(--color-primary-light); display:block; margin-bottom:4px;">Upload (Enviar)</strong>
            <p style="font-size:0.8rem; color:#aaa; margin:0; line-height:1.45;">Envia um arquivo local do seu computador para um servidor online. Ex: Postar uma foto ou enviar currículo por e-mail.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap8-nuvem",
    title: "Capítulo 8 — Conhecendo a Nuvem",
    page: 82,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "cloud-quest",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">☁️ Armazenamento em Nuvem: Arquivos na Rede</h3>
        <p style="line-height:1.6;">Em vez de salvar arquivos apenas no seu computador ou pendrives físicos, você pode armazená-los na <strong>Nuvem</strong> — servidores gigantescos conectados à internet.</p>
        
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin:1.5rem 0; text-align:center;">
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:1rem 0.5rem; border-radius:10px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <span style="font-size:2rem; margin-bottom:4px;">📁</span>
            <strong style="font-size:0.75rem;">Google Drive</strong>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:1rem 0.5rem; border-radius:10px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <span style="font-size:2rem; margin-bottom:4px;">☁️</span>
            <strong style="font-size:0.75rem;">OneDrive</strong>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:1rem 0.5rem; border-radius:10px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <span style="font-size:2rem; margin-bottom:4px;">📦</span>
            <strong style="font-size:0.75rem;">Dropbox</strong>
          </div>
        </div>

        <div style="background:rgba(16, 185, 129, 0.06); border:1px solid rgba(16, 185, 129, 0.2); border-radius:12px; padding:1.2rem; line-height:1.5; font-size:0.85rem; color:#ccc;">
          🚀 <strong>Vantagens da Nuvem:</strong>
          Acesso de qualquer lugar (computador, celular ou tablet), compartilhamento rápido de links com outras pessoas e proteção automática contra danos de hardware locais.
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap9-grande-missao",
    title: "Capítulo 9 — Grande Missão do Escritório",
    page: 83,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "office-adventure",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">📂 Grande Missão: O Arquiteto do Escritório</h3>
        <p style="line-height:1.6; margin-bottom:1.5rem;">Chegou o momento do desafio real! Você foi contratado como assistente de escritório virtual. Sua missão é estruturar pastas, limpar o Desktop bagunçado, transferir arquivos via download/upload e fazer um backup seguro no pendrive.</p>
        
        <div style="background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.3); border-radius:12px; padding:1rem; font-size:0.85rem; color:#ccc;">
          🏁 <strong>Objetivos do Simulador:</strong>
          <ol style="margin:4px 0 0 0; padding-left:1.2rem; display:flex; flex-direction:column; gap:4px;">
            <li>Criar a pasta "Trabalho" e a subpasta "Relatorios".</li>
            <li>Classificar e mover arquivos do Desktop para as pastas corretas.</li>
            <li>Efetuar o download do arquivo de metas e fazer upload do backup.</li>
            <li>Ejetar o pendrive com segurança após transferir os dados.</li>
          </ol>
        </div>
      </div>
    `
  },
  {
    id: "aula5-cap10-quiz",
    title: "Capítulo 10 — Quiz Final",
    page: 84,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "organization-final-quiz",
    content: `
      <div style="padding:1rem;">
        <h3 style="margin-top:0;">🏁 Avaliação Teórica: Organização Digital</h3>
        <p style="line-height:1.6; margin-bottom:1.5rem;">Responda às 10 questões objetivas abaixo para certificar seus conhecimentos em organização digital, backups, upload/download e extensões.</p>
      </div>
    `,
    quiz: [
      {
        question: "O que é Download na internet?",
        options: [
          "Enviar um arquivo do computador local para um servidor online.",
          "Baixar um arquivo de um servidor da internet para o seu computador local.",
          "Excluir definitivamente um arquivo da lixeira do Windows.",
          "Organizar seus arquivos locais em subpastas."
        ],
        correct: 1,
        explanation: "Download é o ato de puxar ou transferir um dado que está na rede para a memória local do seu dispositivo."
      },
      {
        question: "O que é Upload?",
        options: [
          "Baixar um vídeo da nuvem para o computador local.",
          "Excluir arquivos duplicados de um pendrive.",
          "Transferir ou enviar um arquivo local do seu computador para um servidor na internet.",
          "Conectar um pendrive físico na porta USB."
        ],
        correct: 2,
        explanation: "Upload é o sentido oposto do download: você envia um arquivo local do computador ou celular para a rede."
      },
      {
        question: "Qual a diferença fundamental entre Copiar e Mover um arquivo?",
        options: [
          "Copiar cria uma cópia idêntica no destino mantendo o original; Mover transfere o arquivo para o destino e apaga o original.",
          "Mover cria uma cópia e apaga o destino; Copiar transfere sem deixar cópias.",
          "Nenhuma, ambas fazem o mesmo processo duplicando os dados.",
          "Copiar serve apenas para pendrives e Mover serve apenas para nuvem."
        ],
        correct: 0,
        explanation: "Copiar duplica o dado; Mover transfere o arquivo, o que significa que o arquivo original deixa de existir na pasta antiga."
      },
      {
        question: "O que é um Backup e por que é vital realizá-lo?",
        options: [
          "É o processo de desinstalar programas inúteis do computador.",
          "É uma cópia de segurança de seus arquivos salvos em mídias externas ou na nuvem para evitar a perda permanente de dados.",
          "É renomear pastas antigas usando a data do dia.",
          "É compactar arquivos em formato ZIP."
        ],
        correct: 1,
        explanation: "Backup é sua garantia de segurança. Se o seu computador quebrar, for roubado ou infectado, você não perde seus dados cruciais."
      },
      {
        question: "Para que serve a extensão de arquivo '.zip'?",
        options: [
          "Para rodar áudio e música de alta fidelidade.",
          "Para compactar vários arquivos juntos em uma única pasta compactada, reduzindo o espaço de armazenamento.",
          "Para reproduzir vídeos em resolução Ultra HD.",
          "Para desenhar projetos gráficos em 3D."
        ],
        correct: 1,
        explanation: "O formato .zip compacta e reúne múltiplos arquivos em uma única pasta leve, facilitando seu envio e economizando espaço."
      },
      {
        question: "Qual a extensão padrão para documentos em formato PDF?",
        options: [
          ".png",
          ".mp3",
          ".pdf",
          ".zip"
        ],
        correct: 2,
        explanation: "A extensão padrão de documentos portáteis universais é .pdf."
      },
      {
        question: "Como se deve ejetar um pendrive conectado ao Windows de forma totalmente segura?",
        options: [
          "Puxar o pendrive diretamente da porta USB a qualquer momento.",
          "Clicar no ícone de remoção segura na bandeja da barra de tarefas do Windows e selecionar 'Ejetar' antes de desconectar.",
          "Desligar o computador por completo sempre que precisar tirar o pendrive.",
          "Arrastar o ícone do pendrive diretamente para a Lixeira da área de trabalho."
        ],
        correct: 1,
        explanation: "Ejetar por software primeiro garante que o Windows finalize qualquer gravação em andamento, impedindo arquivos corrompidos."
      },
      {
        question: "Qual das seguintes alternativas é uma grande vantagem do armazenamento em nuvem?",
        options: [
          "O acesso a arquivos de qualquer lugar com internet sem depender de um pendrive físico.",
          "Aumentar fisicamente a memória RAM interna do computador local.",
          "Poder funcionar 100% do tempo sem nenhuma conexão com a internet.",
          "Deixar o processamento de jogos locais mais veloz."
        ],
        correct: 0,
        explanation: "A nuvem permite centralizar seus backups e acessá-los do celular, notebook ou de qualquer navegador do mundo conectando-se à internet."
      },
      {
        question: "Qual das seguintes extensões indica um arquivo de imagem?",
        options: [
          ".mp3",
          ".png",
          ".mp4",
          ".txt"
        ],
        correct: 1,
        explanation: "A extensão .png (Portable Network Graphics) indica um formato de imagem digital de alta qualidade com canal alfa (transparência)."
      },
      {
        question: "Por padrão, em qual diretório o Windows salva os arquivos baixados de navegadores da internet?",
        options: [
          "Documentos",
          "Lixeira",
          "Downloads",
          "Área de Trabalho"
        ],
        correct: 2,
        explanation: "O diretório nativo pré-configurado no Windows e navegadores para salvar arquivos oriundos da internet é o diretório Downloads."
      }
    ]
  },
  {
    id: "aula5-cap11-conclusao",
    title: "🏆 Guardião dos Arquivos",
    page: 85,
    type: "challenge",
    chapter: "AULA 5",
    interactiveId: "aula5-reflexao",
    content: `
      <div class="conclusaoExp-hero" style="text-align:center; padding:2.5rem 1.5rem 1.5rem;">
        <span class="conclusaoExp-trophy">🛡️</span>
        <div class="conclusaoExp-title">Missão Concluída!</div>
        <p class="conclusaoExp-sub">Parabéns! Você concluiu a Aula 5 e conquistou a medalha de <strong>Guardião dos Arquivos</strong>.<br>Sua organização digital agora é profissional! 🌟</p>
      </div>

      <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:16px; margin-top:1.5rem;">
        <h4 style="margin:0 0 8px;">✍️ Atividade Reflexiva da Missão 5</h4>
        <p class="text-small text-muted" style="line-height:1.4; margin-bottom:12px;"><strong>Desafio Prático:</strong> Imagine que você tem fotos pessoais, trabalhos da escola, recibos de contas e vídeos de viagens. Descreva detalhadamente abaixo como você organizaria essas pastas, que nomes daria para as subpastas e onde faria o backup de segurança para nunca perder nada. Suas notas serão gravadas no seu bloco de anotações.</p>
        <textarea id="aula5-reflexao-textarea" style="width:100%; min-height:120px; background:var(--bg-base); border:1px solid var(--border-soft); border-radius:10px; padding:12px; color:var(--text-primary); font-size:0.9rem; resize:vertical; line-height:1.6;" placeholder="Escreva sua resposta de forma organizada..."></textarea>
        <button class="btn btn-primary mt-1" id="aula5-save-btn" style="width:100%;">💾 Salvar Minhas Estruturas Organizadas</button>
        <div id="aula5-save-feedback" class="text-small mt-1" style="font-weight:bold;"></div>
      </div>

      <div class="proximasExp-aulas" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(59,130,246,0.1)); border:1px solid rgba(16,185,129,0.3); border-radius:16px; padding:18px; margin-top:1.5rem; text-align:left;">
        <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:var(--text-primary);margin-bottom:10px;">🗺️ Próxima Etapa do Curso</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(124,58,237,0.1);border-radius:10px;border:1px solid rgba(124,58,237,0.2);">
            <span style="font-size:1.5rem;">🔒</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">Aula 6 — Segurança e Cuidados <span class="badgeExp-aula">Bloqueada</span></div>
              <div style="font-size:0.78rem;color:var(--text-muted);">Aprenda sobre antivírus, cuidados físicos com o hardware e a proteção contra golpes online na próxima aula.</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "aula6-intro",
    title: "Objetivos e Manutenção Básica",
    page: 86,
    type: "intro",
    chapter: "AULA 6",
    content: `
      <div class="welcome-container text-center" style="padding: 1.5rem 1rem;">
        <div class="welcome-badge">⚙️ AULA 6</div>
        <h1 class="welcome-title">Configurações e Manutenção Básica</h1>
        <p class="welcome-subtitle">Aprenda a moldar o Windows para o seu trabalho e a cuidar do computador como um profissional.</p>
        
        <div class="grid grid-2 gap-2 mt-2" style="text-align: left;">
          <div class="card bg-surface border-soft">
            <h4>🔧 Controle do Sistema</h4>
            <p>Ajuste o brilho, a resolução do monitor, configure os dispositivos de áudio corretos e personalize o ambiente de trabalho para melhor legibilidade.</p>
          </div>
          <div class="card bg-surface border-soft">
            <h4>🛡️ Saúde e Postura</h4>
            <p>Organize a sua estação de trabalho (cadeira, monitor e periféricos) seguindo regras rígidas de ergonomia para evitar lesões musculares.</p>
          </div>
        </div>

        <div class="tip-box mt-2" style="text-align: left;">
          <h4>🎯 Suas Metas nesta Aula:</h4>
          <ul>
            <li>Resolver 3 cenários práticos dentro do simulador do Explorador de Arquivos do Windows.</li>
            <li>Identificar e solucionar falhas de hardware, driver e memória na Central de Manutenção.</li>
            <li>Ajustar o setup ergonômico virtual com a postura profissional de digitação.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "aula6-1-resolucao",
    title: "6.1 Tela, Brilho e Resolução",
    page: 87,
    type: "lesson",
    chapter: "AULA 6",
    content: `
      <h2>6.1 Tela, Brilho e Resolução</h2>
      <p>A tela é o principal canal de comunicação do computador com você. Ajustar as configurações visuais de forma correta previne fadiga ocular e aumenta o conforto.</p>
      
      <div class="concept-grid">
        <div class="concept-card">
          <div class="icon">🖥️</div>
          <div>
            <h4>Resolução de Tela</h4>
            <p>É a quantidade de pontos (pixels) que formam a imagem na tela. Quanto maior a resolução (ex: <strong>1920x1080 Full HD</strong>), mais nítida será a imagem e mais espaço você terá na área de trabalho para organizar suas janelas.</p>
          </div>
        </div>
        <div class="concept-card">
          <div class="icon">🔆</div>
          <div>
            <h4>Brilho e Contraste</h4>
            <p>O brilho deve ser regulado de acordo com a iluminação do ambiente. Em salas escuras, brilho muito alto causa dor de cabeça. Em ambientes claros, brilho baixo dificulta a leitura.</p>
          </div>
        </div>
      </div>

      <div class="tip-box mt-2">
        <h4>💡 Recomendação Técnica</h4>
        <p>Utilize sempre a <strong>resolução recomendada</strong> pelo fabricante do monitor para evitar imagens esticadas ou embaçadas no Windows.</p>
      </div>
    `
  },
  {
    id: "aula6-2-som",
    title: "6.2 Som e Dispositivos de Áudio",
    page: 88,
    type: "lesson",
    chapter: "AULA 6",
    content: `
      <h2>6.2 Som e Dispositivos de Áudio</h2>
      <p>O Windows permite gerenciar múltiplos dispositivos de entrada (microfones) e saída (caixas de som, fones de ouvido) conectados ao computador.</p>
      
      <div class="features-guide">
        <div class="guide-item">
          <div class="guide-icon">🔊</div>
          <div class="guide-text">
            <strong>Dispositivos de Saída:</strong> Se você plugar uma caixa de som na parte de trás e um fone na frente, clique no ícone de som na barra de tarefas para selecionar por qual dispositivo o áudio deve sair.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">🎙️</div>
          <div class="guide-text">
            <strong>Dispositivos de Entrada (Microfone):</strong> Essencial para reuniões e chamadas de voz. O Windows permite testar o volume do microfone nas configurações para checar se ele está captando sua voz.
          </div>
        </div>
      </div>

      <div class="alert alert-info mt-2">
        <strong>Dica de Suporte:</strong> Quando o som sumir, o primeiro passo do técnico é verificar se o dispositivo correto está marcado como "Dispositivo Padrão" no Windows.
      </div>
    `
  },
  {
    id: "aula6-3-data-hora",
    title: "6.3 Data, Hora e Idioma",
    page: 89,
    type: "lesson",
    chapter: "AULA 6",
    content: `
      <h2>6.3 Ajustando Data, Hora e Idioma</h2>
      <p>A data e a hora do computador não servem apenas para você ver o horário; elas são fundamentais para a segurança e autenticidade da navegação na internet.</p>
      
      <div class="concept-grid">
        <div class="concept-card">
          <div class="icon">⏰</div>
          <div>
            <h4>Sincronização de Rede</h4>
            <p>O Windows se conecta a servidores de hora da internet (como o <strong>time.windows.com</strong>) para manter os segundos sempre exatos. Se a data estiver muito errada (exemplo: anos atrás), navegadores bloquearão sites exibindo "Erro de Conexão Segura (SSL)".</p>
          </div>
        </div>
        <div class="concept-card">
          <div class="icon">🌐</div>
          <div>
            <h4>Idioma e Teclado</h4>
            <p>Configurar o layout de teclado correto (ABNT2 para teclados brasileiros com a tecla <strong>Ç</strong>) é vital para conseguir acentuar palavras e usar caracteres especiais sem dor de cabeça.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "aula6-4-personalizacao",
    title: "6.4 Personalizando a Interface",
    page: 90,
    type: "lesson",
    chapter: "AULA 6",
    content: `
      <h2>6.4 Personalizando a Interface do Windows</h2>
      <p>A personalização ajuda a tornar a interface de trabalho do sistema operacional mais produtiva e adaptada ao seu estilo de uso.</p>
      
      <div class="grid grid-2 gap-2 mt-2">
        <div class="card bg-surface border-soft">
          <h4>🖼️ Papel de Parede (Fundo)</h4>
          <p>Mude a imagem de fundo para temas neutros e escuros se você trabalha muitas horas consecutivas, reduzindo a fadiga visual causada por fundos brancos e claros.</p>
        </div>
        <div class="card bg-surface border-soft">
          <h4>⚙️ Barra de Tarefas</h4>
          <p>Você pode fixar os atalhos dos programas que mais utiliza (como navegadores e pastas de trabalho) na barra de tarefas para abri-los com apenas 1 clique.</p>
        </div>
      </div>
    `
  },
  {
    id: "aula6-5-perifericos",
    title: "6.5 Gerenciamento de Periféricos",
    page: 91,
    type: "lesson",
    chapter: "AULA 6",
    content: `
      <h2>6.5 Gerenciamento de Periféricos e Drivers</h2>
      <p>Quando você conecta um novo dispositivo (impressora, webcam, fone USB) ao computador, o sistema operacional realiza duas etapas automáticas:</p>
      
      <div class="features-guide">
        <div class="guide-item">
          <div class="guide-icon">🔌</div>
          <div class="guide-text">
            <strong>1. Detecção (Plug and Play):</strong> O Windows reconhece fisicamente o conector USB e identifica qual é o fabricante e modelo da peça.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">💿</div>
          <div class="guide-text">
            <strong>2. Instalação do Driver:</strong> O <strong>Driver</strong> é o software/tradutor que ensina o sistema operacional a operar o hardware físico. Sem o driver correto, o periférico não funciona ou exibe erro no Gerenciador de Dispositivos.
          </div>
        </div>
      </div>
    `
  },
  {
    id: "aula6-6-ergonomia",
    title: "6.6 Ergonomia e Saúde no Computador",
    page: 92,
    type: "lesson",
    chapter: "AULA 6",
    content: `
      <h2>6.6 Ergonomia e Postura Profissional</h2>
      <p>Ergonomia é a ciência que estuda a relação entre o ser humano e seu ambiente de trabalho. Ajustar a postura correta previne dores crônicas, lesões por esforço repetitivo (LER) e fadiga física.</p>
      
      <div class="tip-box text-left" style="margin-top: 1rem;">
        <h4>📐 Regras de Ouro da Postura Saudável:</h4>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li><strong>Linha de Visão</strong>: O topo da tela do monitor deve estar na altura dos seus olhos, com inclinação de 10 a 20 graus. Evite dobrar o pescoço.</li>
          <li><strong>Distância da Tela</strong>: Mantenha o monitor a uma distância de 50 a 70 cm dos olhos (aproximadamente o comprimento do seu braço estendido).</li>
          <li><strong>Ângulo dos Braços</strong>: Teclado e mouse devem estar posicionados de forma que os cotovelos formem um ângulo de 90 graus. Mantenha os punhos retos.</li>
          <li><strong>Pés Apoiados</strong>: Os pés devem tocar inteiramente o chão ou um apoiador de pés apropriado, mantendo os joelhos em um ângulo reto de 90 graus.</li>
        </ul>
      </div>
    `
  },
  {
    id: "aula6-cap12-explorer",
    title: "📂 Explorador de Arquivos Virtual",
    page: 93,
    type: "challenge",
    chapter: "AULA 6",
    interactiveId: "explorer-simulator",
    content: `
      <div style="margin-bottom:1rem;">
        <h3>📁 Laboratório Virtual: Explorador de Arquivos</h3>
        <p class="text-muted text-small" style="margin-top:0.2rem;">Complete as três missões propostas no Explorador de Arquivos abaixo para avançar no laboratório:</p>
      </div>
      <div id="explorer-lab-instructions" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:10px 14px; border-radius:8px; margin-bottom:12px; font-size:0.78rem;">
        <strong>📋 Suas Missões Ativas:</strong>
        <div id="expl-mission-1" style="margin-top: 4px; color:#aaa;">⬜ 1. Encontrar o arquivo <strong>contrato_importante.docx</strong> na Lixeira e clicar em <strong>Restaurar</strong>.</div>
        <div id="expl-mission-2" style="margin-top: 4px; color:#aaa;">⬜ 2. Ir em Este Computador ➔ Disco Local (C:) ➔ pasta <strong>Logs_Temporarios</strong> e clicar em <strong>Excluir</strong> no arquivo <strong>temp_log_gigante.txt</strong> para liberar o armazenamento.</div>
        <div id="expl-mission-3" style="margin-top: 4px; color:#aaa;">⬜ 3. Usar a barra de pesquisa para buscar por <strong>relatorio_financeiro.xlsx</strong>, selecioná-lo e clicar em <strong>Mover</strong> e depois <strong>Colar</strong> dentro do diretório <strong>Documentos</strong>.</div>
      </div>
    `
  },
  {
    id: "aula6-cap13-manutencao",
    title: "🔧 Central de Manutenção Técnica",
    page: 94,
    type: "challenge",
    chapter: "AULA 6",
    interactiveId: "windows-control-center",
    content: `
      <div style="margin-bottom:1rem;">
        <h3>🔧 Central de Manutenção e Hardware</h3>
        <p class="text-muted text-small" style="margin-top:0.2rem;">Analise os indicadores em tempo real e resolva as 3 falhas de sistema listadas no painel técnico:</p>
      </div>
      <div id="maint-lab-instructions" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:10px 14px; border-radius:8px; margin-bottom:12px; font-size:0.78rem;">
        <strong>📋 Pendências do Painel Técnico:</strong>
        <div id="maint-task-1" style="margin-top: 4px; color:#aaa;">⬜ 1. O consumo de memória RAM está perigosamente alto (95%). Encontre o processo pesado e finalize-o.</div>
        <div id="maint-task-2" style="margin-top: 4px; color:#aaa;">⬜ 2. O driver do adaptador de rede Wi-Fi está com falha física. Clique no botão de reinstalar o driver.</div>
        <div id="maint-task-3" style="margin-top: 4px; color:#aaa;">⬜ 3. O mouse USB externo foi desligado da porta traseira do gabinete. Clique no cabo para reconectá-lo.</div>
      </div>
    `
  },
  {
    id: "aula6-cap14-conclusao",
    title: "🥈 Assistente Técnico",
    page: 95,
    type: "challenge",
    chapter: "AULA 6",
    interactiveId: "aula6-reflexao",
    content: `
      <div class="conclusaoExp-hero" style="text-align:center; padding:2rem 1.5rem 1.2rem;">
        <span class="conclusaoExp-trophy">🥈</span>
        <div class="conclusaoExp-title">Aula 6 Concluída!</div>
        <p class="conclusaoExp-sub">Parabéns! Você dominou o painel de configurações do Windows e a manutenção preventiva.<br>Medalha de <strong>Assistente Técnico</strong> conquistada com sucesso! 🌟</p>
      </div>

      <div style="background:var(--bg-surface); border:1px solid var(--border-soft); border-radius:12px; padding:16px; margin-top:1.5rem;">
        <h4 style="margin:0 0 8px;">✍️ Atividade Reflexiva da Aula 6</h4>
        <p class="text-small text-muted" style="line-height:1.4; margin-bottom:12px;"><strong>Desafio Prático:</strong> Descreva detalhadamente abaixo como você configuraria a mesa, cadeira e monitor na sua empresa para trabalhar de forma confortável sem lesionar seus braços ou colunas e que procedimentos básicos de manutenção preventiva (como limpeza física e de arquivos temporários) você faria mensalmente para manter seu computador sempre rápido e estável. Suas notas serão gravadas no seu bloco.</p>
        <textarea id="aula6-reflexao-textarea" style="width:100%; min-height:120px; background:var(--bg-base); border:1px solid var(--border-soft); border-radius:10px; padding:12px; color:var(--text-primary); font-size:0.9rem; resize:vertical; line-height:1.6;" placeholder="Escreva suas metas de postura e manutenção preventiva..."></textarea>
        <button class="btn btn-primary mt-1" id="aula6-save-btn" style="width:100%;">💾 Salvar Minhas Notas Técnicas</button>
        <div id="aula6-save-feedback" class="text-small mt-1" style="font-weight:bold;"></div>
      </div>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COURSE_CONTENT };
}


