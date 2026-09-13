// ============================================================================
// INFORMESTRE MÓDULO 3 ENGINE — MOTOR HÍBRIDO OFICIAL
// 1. APRESENTAÇÃO ➔ 2. VIDEOAULA ➔ 3. SLIDES OFICIAIS (PPTX) ➔ 4. QUIZ & XP
// ============================================================================

(function (root) {

  // --------------------------------------------------------------------------
  // 1. DADOS DAS AULAS (COM OS 13 SLIDES EXATOS DO PPTX)
  // --------------------------------------------------------------------------
  const MODULE_3_LESSONS = [
    {
      id: "m3-aula-1",
      number: 1,
      title: "Conhecendo a Internet & o Mundo Conectado",
      badge: "Aula 1 • Fundamentos da Rede",
      duration: "25 min",
      xpReward: 100,
      videoUrl: "https://youtu.be/UUm3hAk0ah8",
      presentation: {
        headline: "A Internet e o Mundo Digital",
        subtitle: "Desmistificando a maior rede do planeta e aprendendo a navegar com segurança.",
        coverImage: "images/m3/slides/slide_1.png",
        objectives: [
          "Compreender a diferença real entre a infraestrutura da Internet e os serviços da Web (WWW)",
          "Aprender como a informação viaja por cabos submarinos e sinais Wi-Fi na velocidade da luz",
          "Entender a anatomia de um endereço digital (URL & Domínio)",
          "Identificar conexões seguras através do Cadeado Fechado (HTTPS)",
          "Diferenciar Download (baixar) de Upload (subir/enviar)",
          "Descobrir o que é e como funciona a Nuvem (Cloud)"
        ]
      },
      // 13 Slides Oficiais Extraídos em Alta Resolução 1080p
      slides: [
        { id: 1, title: "Abertura • A Internet e o Mundo Digital", src: "images/m3/slides/slide_1.png" },
        { id: 2, title: "O Mundo Conectado", src: "images/m3/slides/slide_2.png" },
        { id: 3, title: "O que é a Internet?", src: "images/m3/slides/slide_3.png" },
        { id: 4, title: "Internet vs. Web (WWW)", src: "images/m3/slides/slide_4.png" },
        { id: 5, title: "O Veículo Digital: Os Navegadores", src: "images/m3/slides/slide_5.png" },
        { id: 6, title: "A Grande Teia: Como a Internet Funciona", src: "images/m3/slides/slide_6.png" },
        { id: 7, title: "Como o Navegador conversa com os Sites", src: "images/m3/slides/slide_7.png" },
        { id: 8, title: "O Endereço Digital: URL", src: "images/m3/slides/slide_8.png" },
        { id: 9, title: "Navegação Segura: O Cadeado Fechado", src: "images/m3/slides/slide_9.png" },
        { id: 10, title: "O Caminho: Download vs. Upload", src: "images/m3/slides/slide_10.png" },
        { id: 11, title: "O Kit de Sobrevivência do Navegador", src: "images/m3/slides/slide_11.png" },
        { id: 12, title: "Como a Internet chega até nós? (Cabo vs Wi-Fi)", src: "images/m3/slides/slide_12.png" },
        { id: 13, title: "O que é a Nuvem? (Cloud)", src: "images/m3/slides/slide_13.png" }
      ],
      quiz: [
        {
          id: "q1",
          question: "Qual é a principal diferença entre a Internet e a Web (WWW)?",
          options: [
            "A Internet é a infraestrutura física (cabos, roteadores e estradas), enquanto a Web são as páginas e serviços (as lojas e casas que ficam nessas estradas).",
            "A Internet só funciona no celular e a Web só no computador.",
            "São exatamente a mesma coisa sem nenhuma diferença técnica.",
            "A Web é a fiação de fibra óptica e a Internet é o Google Chrome."
          ],
          correct: 0,
          explanation: "Excelente! A Internet é a rede física global (as rodovias de dados), enquanto a Web (WWW) é o ecossistema de sites, vídeos e serviços que trafegam nessas rodovias."
        },
        {
          id: "q2",
          question: "O que significa o ícone de Cadeado Fechado ao lado do endereço de um site (URL)?",
          options: [
            "Indica que o site está bloqueado ou com erro de conexão.",
            "Indica que a conexão é criptografada e segura para você inserir senhas e dados confidenciais.",
            "Significa que o site é pago e você precisa de assinatura para entrar.",
            "Indica que você deve baixar um arquivo para continuar navegando."
          ],
          correct: 1,
          explanation: "Perfeito! O cadeado HTTPS garante que as informações trocadas entre o seu computador e o servidor estão codificadas (criptografadas), evitando interceptações."
        },
        {
          id: "q3",
          question: "Quando você envia uma foto do seu computador para o Instagram ou anexa seu currículo em um e-mail, que ação está realizando?",
          options: [
            "Download (Baixar arquivo da internet)",
            "Upload (Subir / Enviar arquivo para a internet)",
            "Backup em pendrive local",
            "Desfragmentação do disco rígido"
          ],
          correct: 1,
          explanation: "Correto! Upload é o envio de arquivos do seu dispositivo para a Internet. Download é o processo inverso (puxar da Internet para o seu aparelho)."
        },
        {
          id: "q4",
          question: "Qual é a maior vantagem de salvar arquivos importantes na 'Nuvem' (Google Drive / OneDrive)?",
          options: [
            "O arquivo é deletado automaticamente após 24 horas para liberar memória.",
            "Você só consegue abrir o arquivo se estiver usando exatamente o mesmo computador onde o criou.",
            "Seus arquivos ficam salvos em servidores seguros e acessíveis de qualquer lugar, mesmo se o seu computador quebrar.",
            "O computador não precisa mais de energia elétrica para funcionar."
          ],
          correct: 2,
          explanation: "Exatamente! O armazenamento em nuvem garante backup contínuo e acesso universal aos seus arquivos através do seu login em qualquer aparelho."
        },
        {
          id: "q5",
          question: "O que é um 'Navegador' (Browser) de Internet?",
          options: [
            "Um programa ou aplicativo usado para acessar e visualizar as páginas da Web (ex: Google Chrome, Edge).",
            "O aparelho físico que distribui o sinal de Wi-Fi pela casa.",
            "A empresa provedora que fornece a conexão de internet para o cliente (ex: Vivo, Claro).",
            "O cabo físico que interliga os computadores na rede de casa."
          ],
          correct: 0,
          explanation: "Muito bem! Os navegadores (browsers) são os 'veículos' que utilizamos para acessar a Web, traduzindo códigos complexos em páginas interativas."
        },
        {
          id: "q6",
          question: "Qual alternativa representa o formato básico e correto de um Endereço Digital (URL)?",
          options: [
            "google@com",
            "www.meusite.com.br",
            "site:meusite#br",
            "C:\Users\Documentos\site.com"
          ],
          correct: 1,
          explanation: "Isso mesmo! O formato padrão de uma URL costuma usar 'www.' e ter domínios como '.com' ou '.com.br'."
        },
        {
          id: "q7",
          question: "O que permite que a Internet cruze oceanos e conecte os continentes do nosso planeta?",
          options: [
            "Apenas ondas de rádio enviadas por antenas 5G gigantes em navios.",
            "Uma rede com milhares de quilômetros de cabos submarinos de fibra óptica repousados no fundo do oceano.",
            "Exclusivamente satélites de comunicação posicionados no espaço.",
            "Não existe conexão direta entre os continentes, a internet de cada país é totalmente isolada."
          ],
          correct: 1,
          explanation: "Correto! Mais de 95% do tráfego internacional de dados passa por imensos cabos de fibra óptica instalados no fundo do mar."
        },
        {
          id: "q8",
          question: "Se você resolver baixar um filme ou um arquivo PDF da internet para salvar no seu computador e visualizar depois, qual operação foi realizada?",
          options: [
            "Upload",
            "Criptografia",
            "Download",
            "Desfragmentação"
          ],
          correct: 2,
          explanation: "Perfeito! Você está fazendo o Download (puxando) do arquivo de um servidor na internet para o disco local do seu equipamento."
        },
        {
          id: "q9",
          question: "De forma simples, como os navegadores se comunicam com os sites na internet quando você digita um endereço?",
          options: [
            "O navegador faz uma 'requisição' (pedido) ao servidor, que responde enviando os pacotes de dados da página de volta para a sua tela.",
            "O servidor envia fisicamente um pendrive para o seu provedor de internet.",
            "O navegador adivinha os códigos usando inteligência artificial sem precisar consultar o servidor.",
            "O navegador lê diretamente o arquivo que já estava salvo no seu disco C: desde a fábrica."
          ],
          correct: 0,
          explanation: "Exato! É um modelo de comunicação Cliente-Servidor. Seu navegador (cliente) pede a página e o computador remoto (servidor) atende o pedido entregando o conteúdo."
        },
        {
          id: "q10",
          question: "Qual a diferença central entre usar uma conexão por Cabo de Rede e o Wi-Fi?",
          options: [
            "O Wi-Fi transmite dados através de ondas de rádio pelo ar (sem fio), enquanto o cabo transmite dados de forma física e direta, geralmente mais estável.",
            "O Wi-Fi só funciona se o computador estiver ligado na tomada com cabos de alta tensão.",
            "O Wi-Fi é a internet 'verdadeira', e o cabo é apenas para rede local sem acesso à internet.",
            "Não existe nenhuma diferença de estabilidade ou velocidade, ambos funcionam exatamente igual em qualquer distância."
          ],
          correct: 0,
          explanation: "Muito bom! O Wi-Fi oferece grande mobilidade (ondas de rádio), enquanto o cabo físico garante velocidade total e estabilidade contínua livre de interferências."
        }
      ],
      finalChallenge: {
        title: "🌐 DESAFIO FINAL — VOCÊ ENTENDE A INTERNET?",
        subtitle: "Agora vamos descobrir se você consegue aplicar o que aprendeu em situações do dia a dia.",
        questions: [
          {
            id: "fc1",
            type: "choice",
            context: "João abriu o Google Chrome no computador e disse:\n\n'Entrei na Internet porque abri o Chrome.'\n\nEle está correto?",
            options: [
              "Sim, o Chrome é a própria Internet.",
              "Sim, porque todo navegador é uma conexão de Internet.",
              "Não. O navegador é uma ferramenta utilizada para acessar conteúdos e serviços através da Internet.",
              "Não. O Chrome funciona somente quando existe um servidor dentro do computador."
            ],
            correct: 2,
            feedback: "O navegador não é a Internet. Ele é um software usado para acessar sites e outros conteúdos disponíveis através da rede.",
            xp: 20
          },
          {
            id: "fc2",
            type: "choice",
            context: "Maria enviou um e-mail para seu colega. Depois abriu um site de notícias no navegador.",
            question: "Qual afirmação melhor explica essas duas situações?",
            options: [
              "E-mail e Web são exatamente a mesma coisa.",
              "Os dois utilizam a Internet, mas são serviços/recursos diferentes.",
              "O e-mail utiliza a Web, mas a Internet não participa.",
              "O site de notícias funciona sem Internet."
            ],
            correct: 1,
            feedback: "A Internet é a infraestrutura de redes que permite a comunicação. A Web é um dos serviços que utilizam essa infraestrutura. O e-mail também é um serviço diferente da Web.",
            xp: 20
          },
          {
            id: "fc3",
            type: "ordering",
            context: "Você digita um endereço de site no navegador e aperta Enter.",
            question: "Qual sequência representa melhor o processo de forma simplificada? Organize os passos abaixo:",
            items: [
              "Navegador faz a solicitação",
              "A solicitação passa pela rede",
              "Um servidor recebe/processa a solicitação",
              "O servidor envia os dados",
              "O navegador apresenta a página"
            ],
            feedback: "Excelente! Essa é uma representação simplificada. A comunicação real envolve várias etapas e equipamentos (provedores, DNS, roteadores), mas este é o ciclo fundamental Cliente-Servidor.",
            xp: 20
          },
          {
            id: "fc4",
            type: "url-analysis",
            context: "Analise o endereço abaixo:",
            url: "https://www.exemplo.com.br/noticias",
            parts: [
              { label: "Protocolo", value: "https://" },
              { label: "Domínio", value: "www.exemplo.com.br" },
              { label: "Caminho", value: "/noticias" }
            ],
            feedback: "Muito bem! O protocolo (HTTPS) diz COMO acessar. O domínio diz ONDE ir. O caminho diz O QUE buscar dentro desse lugar.",
            xp: 20
          },
          {
            id: "fc5",
            type: "choice",
            context: "Pedro está conectado ao Wi-Fi de sua casa. Ele afirma:\n\n'Se meu Wi-Fi está funcionando, significa que o Wi-Fi é a Internet.'",
            question: "Qual é a melhor explicação?",
            options: [
              "Pedro está certo.",
              "Wi-Fi é um tipo de navegador.",
              "Wi-Fi é uma tecnologia de conexão sem fio que pode permitir que o dispositivo acesse uma rede; ele não é sinônimo de Internet.",
              "Wi-Fi é o servidor que armazena os sites."
            ],
            correct: 2,
            feedback: "O Wi-Fi liga o seu computador ao roteador da sua casa sem precisar de fios. O roteador então precisa estar conectado à Internet real. Se a internet do provedor cair, o Wi-Fi continuará ligado, mas sem conexão com a Internet.",
            xp: 20
          },
          {
            id: "fc6",
            type: "choice",
            context: "Você está tentando acessar um site, mas ele não abre. Seu computador está ligado e o navegador funciona.",
            question: "Qual conclusão é mais correta?",
            options: [
              "O navegador deixou de ser Internet.",
              "O problema necessariamente está no computador.",
              "Existem várias possibilidades: conexão, rede, servidor, endereço digitado ou outros fatores.",
              "Todo site precisa estar armazenado dentro do computador."
            ],
            correct: 2,
            feedback: "A Internet é composta por várias partes: seu aparelho, seu roteador, seu provedor, os cabos pelo mundo e o servidor de destino. Uma falha em qualquer desses pontos impede o acesso.",
            xp: 20
          },
          {
            id: "fc7",
            type: "choice",
            context: "Imagine que uma pessoa que nunca estudou informática perguntou:\n\n'Quando eu digito um site no navegador, como ele aparece na minha tela?'\n\nVocê precisa explicar isso para ela.",
            question: "Qual é a melhor resposta?",
            options: [
              "O navegador já possui todos os sites armazenados dentro dele.",
              "O Wi-Fi cria o site quando você pede.",
              "O navegador solicita a informação pela rede, a solicitação chega aos servidores e os dados retornam para que o navegador apresente a página.",
              "A Internet é um programa instalado no computador que contém todos os sites."
            ],
            correct: 2,
            feedback: "Exato! Essa é uma explicação simplificada, mas correta para o nível desta aula. O navegador é a ferramenta que faz a solicitação, a Internet fornece a infraestrutura de comunicação e os servidores disponibilizam os dados necessários para o conteúdo ser apresentado.",
            xp: 40
          }
        ],
        competencies: [
          { name: "Internet x Web", score: 100 },
          { name: "URL e Domínios", score: 100 },
          { name: "Funcionamento da Rede", score: 80 },
          { name: "Aplicação dos Conceitos", score: 100 }
        ]
      }
    },
    {
      id: "m3-aula-2",
      number: 2,
      title: "Mecanismos de Busca e Pesquisas na Internet",
      badge: "Aula 2 • Pesquisa & Fontes",
      duration: "1h 45m",
      xpReward: 150,
      videoUrl: "https://www.youtube.com/watch?v=k5_dY8YkKGs",
      presentation: {
        headline: "Dominando os Mecanismos de Busca",
        subtitle: "Aprenda a pesquisar, filtrar resultados e avaliar a confiabilidade das fontes.",
        description: "Na Aula 1 você descobriu como a Internet funciona por trás dos panos. Agora, vamos dominar os navegadores e aprender a pesquisar informações de forma eficiente e segura usando técnicas avançadas no Google e outras ferramentas.",
        coverImage: "images/m3/aula2/slide_1.png",
        objectives: [
          "Entender como os mecanismos de busca funcionam",
          "Utilizar palavras-chave corretamente para pesquisas eficientes",
          "Analisar anúncios patrocinados vs. resultados orgânicos",
          "Avaliar fontes (Data, autor, contexto) e identificar informações confiáveis",
          "Praticar em Desafios de Detetive da Internet"
        ]
      },
      slides: [
        { id: 1, title: "Dominando a Internet: Navegação e Pesquisa", src: "images/m3/aula2/slide_1.png" },
        { id: 2, title: "O Desafio da Aula", src: "images/m3/aula2/slide_2.png" },
        { id: 3, title: "Navegando com Eficiência", src: "images/m3/aula2/slide_3.png" },
        { id: 4, title: "Atalhos que Todo Usuário Deveria Conhecer", src: "images/m3/aula2/slide_4.png" },
        { id: 5, title: "Organizando sua Navegação", src: "images/m3/aula2/slide_5.png" },
        { id: 6, title: "Como o Google Encontra Resultados?", src: "images/m3/aula2/slide_6.png" },
        { id: 7, title: "Pesquisando Melhor com Palavras-Chave", src: "images/m3/aula2/slide_7.png" },
        { id: 8, title: "Técnicas Avançadas de Pesquisa", src: "images/m3/aula2/slide_8.png" },
        { id: 9, title: "Encontrando Informações em Páginas Longas", src: "images/m3/aula2/slide_9.png" },
        { id: 10, title: "Escolhendo o Tipo Certo de Resultado", src: "images/m3/aula2/slide_10.png" },
        { id: 11, title: "Resultado vs. Anúncio Patrocinado", src: "images/m3/aula2/slide_11.png" },
        { id: 12, title: "Como Saber se uma Informação é Confiável?", src: "images/m3/aula2/slide_12.png" },
        { id: 13, title: "Missão Prática: Desafio Internet", src: "images/m3/aula2/slide_13.png" },
        { id: 14, title: "Resumo & Próxima Aula", src: "images/m3/aula2/slide_14.png" }
      ],
      quiz: [
        {
          id: "q1",
          question: "Ao pesquisar no Google, qual a diferença entre um resultado patrocinado e um orgânico?",
          options: [
            "Não há diferença, todos são sites confiáveis escolhidos a dedo pelo Google.",
            "O resultado patrocinado pagou para aparecer nas primeiras posições, enquanto o orgânico conquistou o lugar por relevância.",
            "O resultado orgânico é sempre uma notícia falsa.",
            "O Google só mostra resultados patrocinados."
          ],
          correct: 1,
          explanation: "Isso mesmo! Anunciantes pagam (Patrocinado) para aparecer no topo. Os resultados orgânicos são rankeados pela relevância que o algoritmo do buscador calcula."
        },
        {
          id: "q2",
          question: "Como podemos melhorar a precisão de uma pesquisa sobre um termo específico?",
          options: [
            "Digitando frases extremamente longas contando uma história para o Google.",
            "Utilizando aspas ao redor do termo, como: \"curso de informática básica\".",
            "Sempre pesquisando em letras maiúsculas.",
            "Escrevendo palavras soltas aleatórias."
          ],
          correct: 1,
          explanation: "Perfeito! Usar aspas faz com que o mecanismo de busca encontre exatamente aquela frase, na mesma ordem das palavras."
        },
        {
          id: "q3",
          question: "O que é mais importante ao avaliar se uma fonte (site ou artigo) é confiável?",
          options: [
            "Checar se tem muita imagem bonita.",
            "Acreditar em qualquer coisa que estiver no primeiro resultado do Google.",
            "Verificar a data de publicação, quem é o autor, e comparar com outras fontes.",
            "Ver se a cor do site é verde."
          ],
          correct: 2,
          explanation: "Correto. Fontes confiáveis costumam ter um autor claro, data de publicação recente ou identificada, e são corroboradas por outros sites respeitáveis."
        },
        {
          id: "q4",
          question: "Para que serve o atalho 'Ctrl+F' (ou 'Cmd+F' no Mac) em uma página da web?",
          options: [
            "Para fechar a aba atual do navegador.",
            "Para abrir as configurações do computador.",
            "Para pesquisar e encontrar uma palavra ou frase específica dentro daquela página.",
            "Para atualizar a página quando ela trava."
          ],
          correct: 2,
          explanation: "Excelente! O atalho Ctrl+F abre uma pequena barra de pesquisa que permite localizar rapidamente qualquer palavra no texto de uma página longa."
        },
        {
          id: "q5",
          question: "Qual o recurso do navegador permite salvar seus sites preferidos para acessá-los rapidamente depois?",
          options: [
            "O Histórico de downloads.",
            "A barra de Favoritos (ou Bookmarks).",
            "O modo de navegação anônima.",
            "O botão de atualizar página."
          ],
          correct: 1,
          explanation: "Correto! Salvar um site nos Favoritos cria um atalho fácil para você voltar a ele sem precisar pesquisar novamente."
        },
        {
          id: "q6",
          question: "Se você quiser excluir uma palavra da sua pesquisa no Google (ex: pesquisar 'manga' fruta, mas não a roupa), o que você deve fazer?",
          options: [
            "Escrever 'manga não roupa'.",
            "Usar o sinal de menos (-) logo antes da palavra que deseja excluir, ex: manga -roupa.",
            "Colocar tudo entre aspas.",
            "Pesquisar normalmente e ignorar os resultados errados."
          ],
          correct: 1,
          explanation: "Isso mesmo! O sinal de menos (-) atua como um filtro, removendo dos resultados as páginas que contenham a palavra indesejada."
        },
        {
          id: "q7",
          question: "Onde podemos verificar quais sites foram visitados recentemente no nosso navegador?",
          options: [
            "No Histórico de navegação.",
            "Na lixeira do Windows.",
            "Nas configurações de tela.",
            "No painel de controle."
          ],
          correct: 0,
          explanation: "Muito bem! O Histórico guarda o registro das páginas que você acessou, útil caso queira voltar a um site que esqueceu de salvar."
        },
        {
          id: "q8",
          question: "Por que é fundamental verificar a data de publicação de uma notícia ou artigo na internet?",
          options: [
            "Porque artigos antigos sempre contêm vírus.",
            "Para garantir que a informação ainda é válida e não está desatualizada.",
            "Porque o Google apaga artigos com mais de um ano.",
            "Para saber quanto tempo o autor levou para escrever."
          ],
          correct: 1,
          explanation: "Exatamente! Especialmente em temas como tecnologia, leis ou notícias, uma informação de anos atrás pode não ser mais a realidade atual."
        },
        {
          id: "q9",
          question: "Ao procurar exclusivamente por fotografias ou ilustrações de um tema, qual ferramenta de busca do Google é a mais indicada?",
          options: [
            "Google Maps.",
            "Google Shopping.",
            "Google Imagens.",
            "Google Tradutor."
          ],
          correct: 2,
          explanation: "Isso! O Google Imagens filtra os resultados para mostrar apenas arquivos visuais relacionados ao termo que você pesquisou."
        },
        {
          id: "q10",
          question: "O que fazem os atalhos de teclado, como Ctrl+T (abrir nova aba) ou Ctrl+W (fechar aba), durante o uso da internet?",
          options: [
            "Eles deixam a internet mais rápida.",
            "Agilizam a navegação substituindo cliques do mouse por combinações rápidas no teclado.",
            "Eles servem para consertar problemas de conexão.",
            "São códigos para acessar a dark web."
          ],
          correct: 1,
          explanation: "Correto! Atalhos de teclado são atalhos práticos que economizam tempo e aumentam sua produtividade ao navegar."
        }
      ],
      finalChallenge: {
        title: "🔍 DESAFIO FINAL — MESTRE DAS BUSCAS",
        subtitle: "Aplique suas habilidades de pesquisa para resolver situações do dia a dia.",
        questions: [
          {
            id: "a2_fc1",
            type: "choice",
            context: "Você precisa comprar um tênis específico e pesquisa 'Tênis de corrida XZ'. Os três primeiros resultados possuem a palavra 'Patrocinado' ao lado.",
            question: "O que isso significa?",
            options: [
              "São os sites mais confiáveis e seguros escolhidos pelo Google.",
              "São lojas que pagaram para aparecer no topo da sua pesquisa.",
              "São resultados falsos que roubarão seus dados.",
              "São os sites mais baratos da internet."
            ],
            correct: 1,
            feedback: "Correto! Anúncios patrocinados significam que a empresa pagou para o buscador exibi-los no topo para aquela palavra-chave.",
            xp: 20
          },
          {
            id: "a2_fc2",
            type: "choice",
            context: "Você precisa encontrar um documento exato que tem a frase: 'Relatório financeiro anual 2023'.",
            question: "Como você digitaria no Google para encontrar APENAS páginas com essa frase exata?",
            options: [
              "Relatório financeiro anual 2023",
              "URGENTE Relatório financeiro anual 2023",
              "\"Relatório financeiro anual 2023\"",
              "Relatório + financeiro + anual + 2023"
            ],
            correct: 2,
            feedback: "Perfeito! Usar aspas duplas obriga o Google a procurar páginas que contenham as palavras exatamente naquela ordem.",
            xp: 20
          },
          {
            id: "a2_fc3",
            type: "ordering",
            context: "Você recebeu uma notícia chocante no WhatsApp e quer verificar se é verdade.",
            question: "Organize os passos ideais de verificação:",
            items: [
              "Não repassar a mensagem imediatamente",
              "Identificar os termos principais da notícia",
              "Pesquisar os termos no Google",
              "Ler a notícia em um portal de jornalismo confiável",
              "Avisar quem te enviou se a notícia for falsa"
            ],
            feedback: "Excelente! Segurar a emoção e não repassar imediatamente é o passo mais importante para combater Fake News.",
            xp: 20
          },
          {
            id: "a2_fc4",
            type: "choice",
            context: "Você acessou um blog que ensina uma dieta 'milagrosa'. O site não tem nome de autor, não tem data e está cheio de botões vermelhos piscando.",
            question: "Esta é uma fonte de pesquisa confiável?",
            options: [
              "Sim, se está na internet é porque foi aprovado.",
              "Sim, os botões vermelhos indicam urgência médica.",
              "Não. Sites confiáveis geralmente possuem autor identificado, data de publicação e design limpo sem exageros.",
              "Não, porque a cor vermelha é proibida na web."
            ],
            correct: 2,
            feedback: "Isso mesmo! Sempre avalie a autoria, a data e a apresentação visual (excesso de anúncios ou apelos emocionais são alertas vermelhos).",
            xp: 20
          },
          {
            id: "a2_fc5",
            type: "choice",
            context: "Seu tio diz que 'o Google sabe tudo e tem todas as respostas corretas do mundo'.",
            question: "Como você explicaria o papel do Google para ele?",
            options: [
              "Ele está certo, o Google cria todo o conhecimento humano.",
              "O Google é apenas um índice organizador; ele não cria as informações, apenas mostra o que outras pessoas publicaram na web.",
              "O Google é uma enciclopédia escrita pelos seus próprios funcionários.",
              "O Google só mostra informações de sites do governo."
            ],
            correct: 1,
            feedback: "Exato! O buscador é como uma gigantesca lista telefônica: ele apenas aponta onde a informação está, cabendo a você julgar se quem escreveu estava certo ou não.",
            xp: 40
          }
        ],
        competencies: [
          { name: "Mecânica de Busca", score: 100 },
          { name: "Filtros e Operadores", score: 100 },
          { name: "Avaliação de Fontes", score: 90 },
          { name: "Combate a Fake News", score: 100 }
        ]
      }
    },
    {
      id: "m3-aula-3",
      number: 3,
      title: "Segurança Digital e Prevenção de Golpes",
      badge: "Aula 3 • Segurança & Privacidade",
      duration: "1h 30m",
      xpReward: 200,
      videoUrl: "https://www.youtube.com/watch?v=k5_dY8YkKGs", // A ser substituído
      presentation: {
        headline: "Navegando com Segurança na Internet",
        subtitle: "Aprenda a proteger seus dados, criar senhas imbatíveis e reconhecer golpes online.",
        description: "A Internet é cheia de oportunidades, mas também possui armadilhas. Nesta aula, você aprenderá as melhores práticas para manter suas contas seguras, identificar mensagens falsas e agir caso algo dê errado.",
        coverImage: "images/m3/aula3/slide_1.png",
        objectives: [
          "Criar e utilizar senhas mais seguras e não reutilizá-las",
          "Reconhecer sites suspeitos e links potencialmente perigosos",
          "Diferenciar mensagens legítimas de tentativas de fraude (Phishing)",
          "Utilizar autenticação em dois fatores (2FA) para proteger dados pessoais",
          "Saber como agir caso uma conta seja comprometida"
        ]
      },
      slides: [
        { id: 1, title: "Segurança Digital: Protegendo o que importa", src: "images/m3/aula3/slide_1.png" },
        { id: 2, title: "A importância das Senhas", src: "images/m3/aula3/slide_2.png" },
        { id: 3, title: "Nunca Reutilize Senhas", src: "images/m3/aula3/slide_3.png" },
        { id: 4, title: "Reconhecendo Sites Suspeitos", src: "images/m3/aula3/slide_4.png" },
        { id: 5, title: "Identificando Links Perigosos", src: "images/m3/aula3/slide_5.png" },
        { id: 6, title: "Golpes Comuns (Phishing)", src: "images/m3/aula3/slide_6.png" },
        { id: 7, title: "Como Identificar Mensagens Falsas", src: "images/m3/aula3/slide_7.png" },
        { id: 8, title: "O que Fazer ao Receber Mensagem Suspeita?", src: "images/m3/aula3/slide_8.png" },
        { id: 9, title: "Protegendo Dados Pessoais", src: "images/m3/aula3/slide_9.png" },
        { id: 10, title: "Autenticação em Dois Fatores (2FA)", src: "images/m3/aula3/slide_10.png" },
        { id: 11, title: "Conta Comprometida: Como Agir?", src: "images/m3/aula3/slide_11.png" },
        { id: 12, title: "Recuperação de Acesso", src: "images/m3/aula3/slide_12.png" },
        { id: 13, title: "Resumo e Encerramento", src: "images/m3/aula3/slide_13.png" }
      ],
      quiz: [
        {
          id: "q1",
          question: "Qual das opções abaixo representa a melhor prática na hora de criar e gerenciar senhas?",
          options: [
            "Usar a mesma senha para todas as redes sociais e e-mails para não esquecer.",
            "Criar senhas complexas e usar uma senha diferente para cada serviço importante.",
            "Usar sua data de nascimento para facilitar a memorização.",
            "Anotar todas as senhas em um arquivo de texto não protegido na Área de Trabalho."
          ],
          correct: 1,
          explanation: "Excelente! Senhas fortes e únicas para cada serviço evitam que todas as suas contas sejam comprometidas caso uma senha vaze."
        },
        {
          id: "q2",
          question: "Você recebeu um e-mail urgente do seu 'banco' pedindo para clicar em um link e confirmar sua senha. O que você deve fazer?",
          options: [
            "Clicar no link imediatamente e preencher os dados, afinal é urgente.",
            "Responder ao e-mail perguntando se é verdade.",
            "Ignorar a mensagem, não clicar em nada e, na dúvida, acessar o aplicativo oficial.",
            "Encaminhar para seus amigos para avisá-los do bloqueio."
          ],
          correct: 2,
          explanation: "Correto! Isso é um exemplo clássico de Phishing. Bancos não pedem confirmação de senha por links de e-mail ou SMS."
        },
        {
          id: "q3",
          question: "O que é a Autenticação em Dois Fatores (2FA)?",
          options: [
            "É um antivírus que roda em duas etapas no computador.",
            "É uma camada extra de segurança que exige um código enviado para seu celular (ou app) além da senha.",
            "É uma regra que obriga a digitar a senha duas vezes seguidas para entrar.",
            "É o processo de criar duas contas diferentes na mesma rede social."
          ],
          correct: 1,
          explanation: "Perfeito! Mesmo que descubram sua senha, não conseguirão entrar na conta sem o código de segurança do seu celular."
        },
        {
          id: "q4",
          question: "Se você suspeitar que sua conta foi invadida, qual deve ser seu primeiro passo?",
          options: [
            "Deletar o aplicativo e nunca mais usá-lo.",
            "Avisar as pessoas mais próximas sobre o ocorrido e tentar recuperar a conta através dos canais oficiais.",
            "Esperar algumas semanas para ver se o invasor desiste e devolve a conta.",
            "Criar uma nova conta com a mesma senha."
          ],
          correct: 1,
          explanation: "Exato! Alertar contatos previne que sejam extorquidos, e você deve usar o suporte oficial para recuperar o acesso e trocar a senha imediatamente."
        }
      ],
      finalChallenge: {
        title: "🛡️ DESAFIO FINAL — DETETIVE DA SEGURANÇA",
        subtitle: "Mostre que você sabe proteger seus dados e reconhecer armadilhas na rede.",
        questions: [
          {
            id: "a3_fc1",
            type: "choice",
            context: "Você precisa criar uma senha para o seu novo e-mail.",
            question: "Qual destas opções é a mais segura de acordo com as boas práticas?",
            options: [
              "maria1234",
              "12345678",
              "BoloDeCenoura!@#2024",
              "senha"
            ],
            correct: 2,
            feedback: "Perfeito! Senhas fortes devem combinar letras maiúsculas, minúsculas, números e símbolos, além de serem longas (como uma frase memorizável).",
            xp: 20
          },
          {
            id: "a3_fc2",
            type: "choice",
            context: "Você recebeu um SMS: 'Seu cartão foi bloqueado! Acesse http://banco-seguro-urgente.com para desbloquear agora.'",
            question: "Qual é a atitude correta?",
            options: [
              "Clicar imediatamente e colocar a senha do cartão, pois é urgente.",
              "Ignorar o link, abrir o aplicativo oficial do banco no celular ou ligar para o número no verso do cartão.",
              "Responder o SMS com seu CPF.",
              "Acessar o link apenas para olhar, sem digitar nada."
            ],
            correct: 1,
            feedback: "Excelente! Nunca confie no imediatismo (urgência) e não clique em links recebidos via SMS ou e-mail de remetentes desconhecidos. Vá direto pela via oficial.",
            xp: 20
          },
          {
            id: "a3_fc3",
            type: "choice",
            context: "O que é 'Phishing'?",
            question: "Selecione a definição correta:",
            options: [
              "Uma técnica para acelerar a internet usando o navegador.",
              "Um tipo de golpe onde cibercriminosos tentam 'pescar' seus dados pessoais se passando por empresas confiáveis (bancos, lojas, governo).",
              "Um antivírus de última geração.",
              "Um termo para quem passa muito tempo nas redes sociais."
            ],
            correct: 1,
            feedback: "Correto! O Phishing usa iscas (mensagens falsas, sites clonados) para fazer a própria vítima entregar suas senhas de forma voluntária.",
            xp: 20
          },
          {
            id: "a3_fc4",
            type: "ordering",
            context: "Sua conta do Instagram foi invadida e a senha foi alterada.",
            question: "Ordene as ações de recuperação prioritárias:",
            items: [
              "Avisar amigos e familiares para não caírem em golpes",
              "Tentar usar a opção 'Esqueci minha senha / Recuperar acesso'",
              "Alterar a senha do e-mail que está vinculado à conta (para evitar que o e-mail também seja invadido)",
              "Ativar a autenticação de 2 fatores após recuperar a conta"
            ],
            feedback: "Muito bem! Agir rápido protegendo as vias de recuperação (o seu e-mail base) e alertando a rede de contatos é fundamental durante incidentes.",
            xp: 20
          },
          {
            id: "a3_fc5",
            type: "choice",
            context: "Seu amigo ativou a 'Autenticação em Dois Fatores' (2FA) no WhatsApp e acha que foi besteira.",
            question: "Como você justifica a importância do 2FA?",
            options: [
              "Realmente é besteira, só atrapalha o uso do celular.",
              "O 2FA garante que, mesmo que alguém descubra a sua senha ou clone seu chip, o invasor não conseguirá entrar sem um segundo código exclusivo (PIN).",
              "O 2FA faz a internet ficar mais rápida e economiza bateria.",
              "O 2FA deleta todas as mensagens antigas para liberar espaço."
            ],
            correct: 1,
            feedback: "Exato! É a camada de segurança mais forte que você pode colocar em qualquer conta. Senhas vazam, mas o seu fator de autenticação secundário protege a porta.",
            xp: 40
          }
        ],
        competencies: [
          { name: "Gestão de Senhas", score: 100 },
          { name: "Prevenção de Phishing", score: 100 },
          { name: "Recuperação de Contas", score: 90 },
          { name: "Camadas Extra (2FA)", score: 100 }
        ]
      }
    },
    {
      id: "m3-aula-4",
      number: 4,
      title: "E-mail Profissional",
      badge: "Aula 4 • Comunicação Digital",
      duration: "1h 15m",
      xpReward: 200,
      videoUrl: "https://www.youtube.com/watch?v=k5_dY8YkKGs", // Placeholder
      presentation: {
        headline: "Dominando o Correio Eletrônico",
        subtitle: "Como usar o e-mail com clareza, segurança e profissionalismo.",
        description: "O e-mail vai além da conversa casual: é uma ferramenta indispensável para trabalhar, estudar e se comunicar de forma profissional. Aprenda a estruturar mensagens, gerenciar sua caixa de entrada e identificar tentativas de fraude.",
        coverImage: "images/m3/aula4/slide_1.png",
        objectives: [
          "Enviar, receber e gerenciar e-mails",
          "Entender a anatomia do e-mail (Para, Assunto, Anexos)",
          "Escrever mensagens com estrutura profissional",
          "Diferenciar Caixa de Entrada, Rascunhos, Spam e Lixeira",
          "Criar uma conta no Gmail e dar os primeiros passos"
        ]
      },
      slides: [
        { id: 1, title: "E-mail e Comunicação Digital", src: "images/m3/aula4/slide_1.png" },
        { id: 2, title: "Objetivos da Aula", src: "images/m3/aula4/slide_2.png" },
        { id: 3, title: "E-mail no Dia a Dia", src: "images/m3/aula4/slide_3.png" },
        { id: 4, title: "Conhecendo a Caixa de Entrada", src: "images/m3/aula4/slide_4.png" },
        { id: 5, title: "Anatomia de um E-mail", src: "images/m3/aula4/slide_5.png" },
        { id: 6, title: "Como Escrever um Bom E-mail", src: "images/m3/aula4/slide_6.png" },
        { id: 7, title: "Segurança: Sinais de Alerta", src: "images/m3/aula4/slide_7.png" },
        { id: 8, title: "Spam e Phishing", src: "images/m3/aula4/slide_8.png" },
        { id: 9, title: "O que é o Correio Eletrônico?", src: "images/m3/aula4/slide_9.png" },
        { id: 10, title: "Conhecendo o Gmail", src: "images/m3/aula4/slide_10.png" },
        { id: 11, title: "Passo a passo (1)", src: "images/m3/aula4/slide_11.png" },
        { id: 12, title: "Passo a passo (2)", src: "images/m3/aula4/slide_12.png" },
        { id: 13, title: "Passo a passo (3)", src: "images/m3/aula4/slide_13.png" },
        { id: 14, title: "Passo a passo (4)", src: "images/m3/aula4/slide_14.png" },
        { id: 15, title: "Passo a passo (5)", src: "images/m3/aula4/slide_15.png" },
        { id: 16, title: "Passo a passo (6)", src: "images/m3/aula4/slide_16.png" },
        { id: 17, title: "Passo a passo (7)", src: "images/m3/aula4/slide_17.png" },
        { id: 18, title: "Bem-vindo ao Gmail", src: "images/m3/aula4/slide_18.png" },
        { id: 19, title: "Parabéns, você já tem seu e-mail!", src: "images/m3/aula4/slide_19.png" }
      ],
      quiz: [
        {
          id: "q1",
          question: "Na anatomia de um e-mail, qual é a finalidade principal do campo 'Assunto'?",
          options: [
            "Escrever a mensagem inteira para economizar tempo.",
            "Inserir o endereço de quem vai receber o e-mail.",
            "Resumir o tema principal ou objetivo da mensagem.",
            "Anexar os arquivos e documentos."
          ],
          correct: 2,
          explanation: "Isso mesmo! O Assunto serve como um título que avisa o destinatário sobre o que se trata o e-mail antes mesmo dele abri-lo."
        },
        {
          id: "q2",
          question: "Qual a estrutura recomendada para se escrever um bom e-mail profissional?",
          options: [
            "Saudação → Objetivo → Informação complementar → Encerramento.",
            "Apenas enviar o anexo sem escrever nada.",
            "Objetivo → Despedida → Saudação.",
            "Usar letras maiúsculas para chamar atenção."
          ],
          correct: 0,
          explanation: "Perfeito! Começar com um 'Olá', explicar o motivo do contato de forma clara, adicionar detalhes e encerrar com um 'Atenciosamente' mostra profissionalismo."
        },
        {
          id: "q3",
          question: "O que caracteriza os e-mails classificados como 'Spam'?",
          options: [
            "São e-mails enviados exclusivamente pelo seu chefe ou colegas de trabalho.",
            "Mensagens indesejadas, geralmente enviadas em massa com fins publicitários.",
            "São os e-mails que você deixou salvos nos 'Rascunhos'.",
            "É o sistema de antivírus integrado no e-mail."
          ],
          correct: 1,
          explanation: "Exato! Spam são correspondências não solicitadas. O Gmail costuma filtrá-las automaticamente para a pasta de Spam."
        },
        {
          id: "q4",
          question: "Se você recebe um e-mail escrito com urgência (ex: 'Sua conta será bloqueada!') pedindo para clicar em um link desconhecido, o que provavelmente é isso?",
          options: [
            "Um comunicado oficial e verdadeiro do seu banco.",
            "Uma mensagem excluída.",
            "Um e-mail enviado por engano.",
            "Uma tentativa de Phishing (golpe para roubar seus dados)."
          ],
          correct: 3,
          explanation: "Correto! Golpistas costumam usar o senso de urgência para assustar a vítima e fazê-la clicar em links falsos. Na dúvida, sempre acesse o aplicativo oficial ao invés de clicar em links de e-mail."
        }
      ],
      finalChallenge: {
        title: "✉️ DESAFIO FINAL — COMUNICAÇÃO PROFISSIONAL",
        subtitle: "Prove que você sabe escrever e-mails profissionais e fugir das fraudes de internet.",
        questions: [
          {
            id: "a4_fc1",
            type: "choice",
            context: "Você precisa enviar um orçamento para um cliente novo chamado Sr. Roberto.",
            question: "Qual é a estrutura mais profissional e adequada para o corpo desse e-mail?",
            options: [
              "Olá Sr. Roberto, segue o anexo. Qualquer coisa me liga, valeu!",
              "Prezado Sr. Roberto, \n\nSegue em anexo o orçamento solicitado para o projeto. Fico à disposição para eventuais dúvidas.\n\nAtenciosamente,\n[Seu Nome]",
              "ORÇAMENTO TÁ NO ANEXO ABRE AÍ",
              "Enviar apenas o arquivo em anexo, sem título e sem texto."
            ],
            correct: 1,
            feedback: "Perfeito! Um e-mail profissional deve ter saudação (Prezado/Caro/Olá), um corpo claro indicando o anexo e uma despedida cortês (Atenciosamente/Cordialmente).",
            xp: 20
          },
          {
            id: "a4_fc2",
            type: "ordering",
            context: "Siga a ordem correta para compor e enviar um novo e-mail no Gmail:",
            question: "Organize as etapas de composição de um e-mail com anexo:",
            items: [
              "Clicar no botão 'Escrever' (compor)",
              "Digitar o endereço de e-mail no campo 'Para'",
              "Digitar o título no campo 'Assunto'",
              "Escrever a mensagem e clicar no ícone do clipe para anexar o arquivo",
              "Revisar o e-mail e clicar em 'Enviar'"
            ],
            feedback: "Excelente! Esta é a sequência perfeita para não esquecer de preencher os campos fundamentais e evitar o famoso 'esqueci de anexar'.",
            xp: 20
          },
          {
            id: "a4_fc3",
            type: "choice",
            context: "Você precisa enviar um relatório para a sua chefe (Ana), mas quer que o diretor (Marcos) e a coordenadora (Paula) recebam uma cópia apenas para conhecimento.",
            question: "Como você distribuiria os endereços de e-mail?",
            options: [
              "Colocar todo mundo no campo 'Para'.",
              "Colocar a Ana no 'Para', e o Marcos e a Paula no campo 'Cc' (Com Cópia).",
              "Enviar três e-mails separados com a mesma mensagem.",
              "Colocar todo mundo no 'Cco' (Cópia Oculta)."
            ],
            correct: 1,
            feedback: "Isso mesmo! O campo 'Para' indica de quem se espera a ação principal. O campo 'Cc' indica quem deve ser mantido informado.",
            xp: 20
          },
          {
            id: "a4_fc4",
            type: "choice",
            context: "Você está esperando um e-mail importante da prefeitura, mas ele não aparece na sua 'Caixa de Entrada' principal.",
            question: "Qual é o primeiro lugar que você deve procurar?",
            options: [
              "Lixeira",
              "Rascunhos",
              "Caixa de Spam (Lixo Eletrônico)",
              "Compor um novo e-mail"
            ],
            correct: 2,
            feedback: "Exato! Muitas vezes, os filtros de segurança dos provedores podem se enganar e jogar e-mails legítimos para a caixa de Spam.",
            xp: 20
          },
          {
            id: "a4_fc5",
            type: "choice",
            context: "Chegou um e-mail do 'Suporte Correios' dizendo que sua encomenda está retida na alfândega e que você deve pagar R$ 50,00 clicando num link urgente.",
            question: "O que você faz?",
            options: [
              "Clico e pago rapidamente para não perder o pacote.",
              "Aviso meus amigos e clico no link para ver do que se trata.",
              "Não clico em nada. Abro uma nova aba, entro no site oficial dos Correios e digito o código de rastreio para verificar.",
              "Respondo o e-mail xingando o golpista."
            ],
            correct: 2,
            feedback: "Muito bem! Golpes de rastreio falso são muito comuns. Sempre use os canais oficiais para validar as cobranças.",
            xp: 40
          }
        ],
        competencies: [
          { name: "Etiqueta Profissional", score: 100 },
          { name: "Gestão do Gmail", score: 90 },
          { name: "Anatomia do E-mail", score: 100 },
          { name: "Filtro de Spam e Phishing", score: 100 }
        ]
      }
    }
  ];

  // --------------------------------------------------------------------------
  // 2. ESTADO DA SESSÃO
  // --------------------------------------------------------------------------
  let currentActiveTab = "presentation"; // "presentation" | "video" | "slides" | "quiz"
  let currentSlideIndex = 0;
  let currentQuizAnswers = {};
  let currentLessonId = "m3-aula-1";

  // --------------------------------------------------------------------------
  // 3. ESTILOS CSS CUSTOMIZADOS (PROFISSIONAL & 16:9 HD)
  // --------------------------------------------------------------------------
  function ensureModule3Styles() {
    if (document.getElementById("m3-custom-styles")) return;
    const style = document.createElement("style");
    style.id = "m3-custom-styles";
    style.innerHTML = `
      .m3-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding-bottom: 3rem;
        animation: fadeIn 0.3s ease;
      }
      .m3-top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.2rem;
        flex-wrap: wrap;
        gap: 1rem;
      }
      
      /* Stepper em pílula */
      .m3-stepper {
        display: flex;
        background: var(--color-surface, #1e1e2d);
        border: 1px solid var(--color-border, rgba(255,255,255,0.08));
        border-radius: 16px;
        padding: 0.4rem;
        gap: 0.4rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        margin-bottom: 1.5rem;
      }
      .m3-stepper-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        border: none;
        background: transparent;
        color: var(--color-text-secondary, #a0aec0);
        font-size: 0.88rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .m3-stepper-btn:hover {
        background: rgba(0, 184, 148, 0.05);
        color: var(--color-text-primary, #fff);
      }
      .m3-stepper-btn.active {
        background: linear-gradient(135deg, #00B894 0%, #00cec9 100%);
        color: #fff;
        box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);
      }
      .m3-stepper-badge {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 800;
      }
      .m3-stepper-btn.active .m3-stepper-badge {
        background: rgba(255,255,255,0.3);
        color: #fff;
      }

      /* Slide Deck 16:9 Full HD Viewer */
      .m3-slide-deck-frame {
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 Ratio */
        background: #0b0f19;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.1);
        margin-bottom: 1.2rem;
      }
      .m3-slide-image-render {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #000;
        user-select: none;
        transition: opacity 0.2s ease;
      }
      .m3-slide-nav-overlay-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(0,0,0,0.6);
        border: 1px solid rgba(255,255,255,0.2);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.4rem;
        transition: all 0.2s ease;
        z-index: 10;
        opacity: 0.7;
      }
      .m3-slide-nav-overlay-btn:hover {
        background: #00B894;
        border-color: #00B894;
        opacity: 1;
        transform: translateY(-50%) scale(1.08);
      }
      .m3-slide-nav-overlay-btn.prev { left: 16px; }
      .m3-slide-nav-overlay-btn.next { right: 16px; }

      /* Thumbnail strip */
      .m3-thumbnail-strip {
        display: flex;
        gap: 0.6rem;
        overflow-x: auto;
        padding: 0.6rem 0.2rem;
        margin-bottom: 1.2rem;
        scrollbar-width: thin;
      }
      .m3-thumb-item {
        flex: 0 0 100px;
        height: 56.25px;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid transparent;
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.2s ease;
        background: #000;
      }
      .m3-thumb-item:hover {
        opacity: 0.9;
        transform: translateY(-2px);
      }
      .m3-thumb-item.active {
        border-color: #00B894;
        opacity: 1;
        box-shadow: 0 0 12px rgba(0,184,148,0.5);
      }
      .m3-thumb-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media (max-width: 900px) {
        .m3-stepper { flex-direction: column; }
        .m3-slide-nav-overlay-btn { width: 38px; height: 38px; font-size: 1.1rem; }
      }
    `;
    document.head.appendChild(style);
  }

  // --------------------------------------------------------------------------
  // 4. RENDERIZADOR PRINCIPAL DA AULA
  // --------------------------------------------------------------------------
  function renderStudentModule3LessonView(container, lessonId, user) {
    ensureModule3Styles();

    sessionStorage.setItem("nexora_last_view", JSON.stringify({ type: "module3_lesson", id: lessonId }));

    if (!container) container = document.getElementById("hub-main-panel-content");
    if (!container) return;

    let lesson = MODULE_3_LESSONS.find(l => l.id === lessonId);
    if (!lesson) lesson = MODULE_3_LESSONS[0];
    
    if (currentLessonId !== lesson.id) {
      currentSlideIndex = 0;
      currentQuizAnswers = {};
    }
    currentLessonId = lesson.id;

    container.innerHTML = `
      <div class="m3-wrapper">
        
        <!-- Top Nav -->
        <div class="m3-top-nav">
          <button class="btn btn-outline" type="button" onclick="renderStudentModule3View()" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.55rem 1.1rem; border-radius: 10px; font-weight: 700; font-size: 0.88rem; background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary); cursor: pointer;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span>Voltar ao Menu do Módulo 3</span>
          </button>

          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 0.85rem; font-weight: 800; color: var(--color-modulo-3);">Módulo 3 &bull; Aula ${lesson.number} de 6</span>
          </div>
        </div>

        <!-- STEPPER DA JORNADA -->
        <div class="m3-stepper">
          <button type="button" class="m3-stepper-btn ${currentActiveTab === 'presentation' ? 'active' : ''}" onclick="window.InforMestreModule3.switchLessonTab('presentation')">
            <span class="m3-stepper-badge">1</span>
            <span>🎯 1. Apresentação</span>
          </button>
          
          <button type="button" class="m3-stepper-btn ${currentActiveTab === 'video' ? 'active' : ''}" onclick="window.InforMestreModule3.switchLessonTab('video')">
            <span class="m3-stepper-badge">2</span>
            <span>🎬 2. Videoaula</span>
          </button>
          
          <button type="button" class="m3-stepper-btn ${currentActiveTab === 'slides' ? 'active' : ''}" onclick="window.InforMestreModule3.switchLessonTab('slides')">
            <span class="m3-stepper-badge">3</span>
            <span>📊 3. Slides Oficiais (${lesson.slides ? lesson.slides.length : 0})</span>
          </button>
          
          <button type="button" class="m3-stepper-btn ${currentActiveTab === 'quiz' ? 'active' : ''}" onclick="window.InforMestreModule3.switchLessonTab('quiz')">
            <span class="m3-stepper-badge">4</span>
            <span>🧠 4. Quiz & XP</span>
          </button>

          <button type="button" class="m3-stepper-btn ${currentActiveTab === 'activities' ? 'active' : ''}" onclick="window.InforMestreModule3.switchLessonTab('activities')">
            <span class="m3-stepper-badge">5</span>
            <span>🛠️ 5. Atividades Práticas</span>
          </button>

          <button type="button" class="m3-stepper-btn ${currentActiveTab === 'mission' ? 'active' : ''}" onclick="window.InforMestreModule3.switchLessonTab('mission')">
            <span class="m3-stepper-badge">6</span>
            <span>🚀 6. Missão Real</span>
          </button>

          <button type="button" class="m3-stepper-btn ${currentActiveTab === 'challenge' ? 'active' : ''}" onclick="window.InforMestreModule3.switchLessonTab('challenge')">
            <span class="m3-stepper-badge">7</span>
            <span>🏆 7. Desafio Final</span>
          </button>
        </div>

        <!-- CONTAINER DA ETAPA SELECIONADA -->
        <div id="m3-stage-container"></div>

      </div>
    `;

    renderActiveStage(lesson);
  }

  function switchLessonTab(tabName) {
    currentActiveTab = tabName;
    const lesson = MODULE_3_LESSONS.find(l => l.id === currentLessonId) || MODULE_3_LESSONS[0];
    
    document.querySelectorAll(".m3-stepper-btn").forEach((btn, idx) => {
      const tabs = ["presentation", "video", "slides", "quiz", "activities", "mission", "challenge"];
      btn.classList.toggle("active", tabs[idx] === tabName);
    });

    renderActiveStage(lesson);
  }

  function renderActiveStage(lesson) {
    const stageContainer = document.getElementById("m3-stage-container");
    if (!stageContainer) return;

    if (currentActiveTab === "presentation") {
      renderPresentationStage(stageContainer, lesson);
    } else if (currentActiveTab === "video") {
      renderVideoStage(stageContainer, lesson);
    } else if (currentActiveTab === "slides") {
      renderSlidesStage(stageContainer, lesson);
    } else if (currentActiveTab === "quiz") {
      renderQuizStage(stageContainer, lesson);
    } else if (currentActiveTab === "activities") {
      renderActivitiesStage(stageContainer, lesson);
    } else if (currentActiveTab === "mission") {
      renderMissionStage(stageContainer, lesson);
    } else if (currentActiveTab === "challenge") {
      renderChallengeStage(stageContainer, lesson);
    }
  }

  // --------------------------------------------------------------------------
  // ETAPA 1: APRESENTAÇÃO DA AULA
  // --------------------------------------------------------------------------
  function renderPresentationStage(container, lesson) {
    const p = lesson.presentation;

    container.innerHTML = `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px; padding: 2.2rem; box-shadow: 0 4px 25px rgba(0,0,0,0.03);">
        
        <!-- Grade com Slide de Capa Oficial e Resumo -->
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2rem; align-items: center; margin-bottom: 2rem;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,184,148,0.12); color: #00B894; padding: 0.35rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.8rem;">
              <span>🚀 ${lesson.badge}</span>
            </div>
            
            <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 0.8rem; letter-spacing: -0.02em;">
              ${p.headline}
            </h1>
            
            <p style="font-size: 1.05rem; color: #00B894; font-weight: 700; margin: 0 0 1.2rem; line-height: 1.45;">
              ${p.subtitle}
            </p>

            <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.6; margin: 0 0 1.5rem;">
              ${p.description || "Nos módulos anteriores você dominou o computador isolado: peças, sistema operacional e programas. Agora, seu computador se transforma em uma porta de entrada para um universo global de informações, conectando você à maior rede do planeta."}
            </p>

            <button type="button" class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('video')" style="padding: 0.9rem 2.2rem; font-size: 1rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #00cec9 100%); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 20px rgba(0,184,148,0.35);">
              <span>Avançar para a Videoaula</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

          <!-- Slide 1 de Capa Real -->
          <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 12px 35px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.1);">
            <img src="${p.coverImage}" alt="Capa da Aula" style="width: 100%; display: block;" />
          </div>
        </div>

        <!-- Objetivos e Roteiro da Aula -->
        <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.6rem;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🎯</span> O que você vai aprender nesta aula:
          </h3>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0.8rem;">
            ${p.objectives.map(obj => `
              <div style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5;">
                <span style="color: #00B894; font-weight: 800; font-size: 1.1rem; line-height: 1;">✓</span>
                <span>${obj}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // ETAPA 2: VIDEOAULA
  // --------------------------------------------------------------------------
  function renderVideoStage(container, lesson) {
    container.innerHTML = `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px; padding: 2.2rem; box-shadow: 0 4px 25px rgba(0,0,0,0.03);">
        
        <!-- Player de Vídeo Cinema 16:9 -->
        <div style="position: relative; width: 100%; padding-top: 56.25%; background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 1.8rem; box-shadow: 0 15px 40px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
          <iframe 
            src="https://www.youtube.com/embed/${lesson.videoUrl ? (lesson.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/) || [])[1] || 'UUm3hAk0ah8' : 'UUm3hAk0ah8'}?rel=0&modestbranding=1" 
            title="${lesson.title}"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>

        <!-- Destaques -->
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 14px; padding: 1.4rem;">
            <h4 style="font-size: 0.98rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>📝</span> Resumo dos Pontos Principais:
            </h4>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.6;">
              <li style="margin-bottom: 0.4rem;">A internet é uma infraestrutura física real de cabos e roteadores interconectados pelo globo.</li>
              <li style="margin-bottom: 0.4rem;">A Web (WWW) é a coleção de páginas, vídeos e serviços que trafegam nessas estradas.</li>
              <li style="margin-bottom: 0.4rem;">Sempre confira o cadeado HTTPS no navegador antes de digitar qualquer senha pessoal.</li>
            </ul>
          </div>

          <div style="background: rgba(0, 184, 148, 0.06); border: 1px solid rgba(0, 184, 148, 0.25); border-radius: 14px; padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h4 style="font-size: 0.98rem; font-weight: 800; color: #00B894; margin: 0 0 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
                <span>📊</span> Próxima Etapa: Slides da Aula
              </h4>
              <p style="font-size: 0.86rem; color: var(--color-text-secondary); line-height: 1.55; margin: 0;">
                Veja agora a apresentação completa com os <strong>${lesson.slides ? lesson.slides.length : 0} slides detalhados</strong> em tela cheia para fixar o aprendizado antes do quiz.
              </p>
            </div>
          </div>
        </div>

        <!-- Navegação Inferior -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.2rem; border-top: 1px solid var(--color-border);">
          <button type="button" class="btn btn-outline" onclick="window.InforMestreModule3.switchLessonTab('presentation')" style="padding: 0.8rem 1.5rem; font-weight: 700; border-radius: 10px; cursor: pointer;">
            ← Voltar para Apresentação
          </button>
          
          <button type="button" class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('slides')" style="padding: 0.9rem 2.2rem; font-size: 0.98rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #00cec9 100%); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 20px rgba(0,184,148,0.35);">
            <span>Avançar para os ${lesson.slides ? lesson.slides.length : 0} Slides Oficiais</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>

      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // ETAPA 3: SLIDES OFICIAIS (VISUALIZADOR REAL DOS 13 SLIDES)
  // --------------------------------------------------------------------------
  function renderSlidesStage(container, lesson) {
    const slides = lesson.slides || [];
    const total = slides.length;
    const currentSlide = slides[currentSlideIndex] || slides[0];

    const isFirst = currentSlideIndex === 0;
    const isLast = currentSlideIndex === total - 1;

    container.innerHTML = `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px; padding: 2rem; box-shadow: 0 4px 25px rgba(0,0,0,0.03);">
        
        <!-- Header dos Slides -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.8rem;">
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <span style="font-size: 0.88rem; font-weight: 800; color: #00B894; background: rgba(0,184,148,0.12); padding: 0.35rem 0.9rem; border-radius: 50px;">
              Slide ${currentSlideIndex + 1} de ${total}
            </span>
            <span style="font-size: 0.92rem; font-weight: 700; color: var(--color-text-primary);">
              ${currentSlide.title}
            </span>
          </div>

          <div style="font-size: 0.82rem; color: var(--color-text-muted); font-weight: 600;">
            ⌨️ Dica: Navegue com as setas ← e → do teclado
          </div>
        </div>

        <!-- QUADRO 16:9 DE EXIBIÇÃO DO SLIDE OFICIAL -->
        <div class="m3-slide-deck-frame" id="m3-slide-deck-container">
          <img 
            src="${currentSlide.src}" 
            alt="${currentSlide.title}" 
            class="m3-slide-image-render"
            id="m3-slide-active-img"
          />

          <!-- Botões de seta sobrepostos -->
          ${!isFirst ? `
            <button type="button" class="m3-slide-nav-overlay-btn prev" onclick="window.InforMestreModule3.prevSlide()" title="Slide Anterior (Seta Esquerda)">
              ‹
            </button>
          ` : ''}

          ${!isLast ? `
            <button type="button" class="m3-slide-nav-overlay-btn next" onclick="window.InforMestreModule3.nextSlide()" title="Próximo Slide (Seta Direita)">
              ›
            </button>
          ` : ''}
        </div>

        <!-- CARROSSEL DE MINIATURAS DOS 13 SLIDES -->
        <div class="m3-thumbnail-strip">
          ${slides.map((s, idx) => `
            <div 
              class="m3-thumb-item ${idx === currentSlideIndex ? 'active' : ''}" 
              onclick="window.InforMestreModule3.goToSlide(${idx})"
              title="Slide ${idx + 1}: ${s.title}">
              <img src="${s.src}" alt="Slide ${idx + 1}" />
            </div>
          `).join('')}
        </div>

        <!-- Barra de Controles Inferior -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.2rem; border-top: 1px solid var(--color-border);">
          <button type="button" class="btn btn-outline" onclick="window.InforMestreModule3.prevSlide()" ${isFirst ? 'disabled style="opacity:0.35; cursor:not-allowed;"' : 'style="cursor:pointer;"'} style="padding: 0.75rem 1.6rem; font-weight: 700; border-radius: 10px;">
            ← Slide Anterior
          </button>

          <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted);">
            ${currentSlideIndex + 1} / ${total}
          </div>

          ${!isLast ? `
            <button type="button" class="btn btn-primary" onclick="window.InforMestreModule3.nextSlide()" style="padding: 0.75rem 1.8rem; font-weight: 800; border-radius: 10px; background: linear-gradient(135deg, #00B894 0%, #00cec9 100%); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem;">
              <span>Próximo Slide</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          ` : `
            <button type="button" class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('quiz')" style="padding: 0.85rem 2.2rem; font-size: 0.95rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #55EFC4 100%); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 20px rgba(0,184,148,0.35);">
              <span>Avançar para o Quiz de Validação</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          `}
        </div>

      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // ETAPA 4: QUIZ DE VALIDAÇÃO
  // --------------------------------------------------------------------------
  function renderQuizStage(container, lesson) {
    const quizList = lesson.quiz || [];
    const total = quizList.length;
    const answeredCount = Object.keys(currentQuizAnswers).length;
    const allAnswered = answeredCount === total;

    container.innerHTML = `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 4px 25px rgba(0,0,0,0.03);">
        
        <!-- Header do Quiz -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-block; background: rgba(0,184,148,0.12); color: #00B894; font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.85rem; border-radius: 50px; text-transform: uppercase; margin-bottom: 0.4rem;">
              🧠 DESAFIO DE CONHECIMENTO
            </span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-primary); margin: 0;">
              Validação de Aprendizado da Aula 1
            </h2>
          </div>

          <div style="background: rgba(0,184,148,0.1); border: 1px solid rgba(0,184,148,0.3); padding: 0.7rem 1.4rem; border-radius: 14px; font-size: 0.92rem; font-weight: 800; color: #00B894; display: flex; align-items: center; gap: 0.4rem;">
            <span>⭐</span> Vale +${lesson.xpReward} XP ao Concluir
          </div>
        </div>

        <!-- Questões -->
        <div style="display: flex; flex-direction: column; gap: 1.8rem; margin-bottom: 2.5rem;">
          ${quizList.map((q, qIdx) => {
            const selected = currentQuizAnswers[qIdx];
            const hasAnswered = selected !== undefined;
            const isCorrect = selected === q.correct;

            return `
              <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 16px; padding: 1.8rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #00B894; text-transform: uppercase; margin-bottom: 0.5rem;">
                  Questão ${qIdx + 1} de ${total}
                </div>
                <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 1.2rem; line-height: 1.45;">
                  ${q.question}
                </h3>

                <div style="display: flex; flex-direction: column; gap: 0.7rem;">
                  ${q.options.map((opt, oIdx) => {
                    let border = 'var(--color-border)';
                    let bg = 'var(--color-surface)';
                    let color = 'var(--color-text-secondary)';

                    if (hasAnswered) {
                      if (oIdx === q.correct) {
                        border = '#10b981';
                        bg = 'rgba(16,185,129,0.12)';
                        color = '#10b981';
                      } else if (oIdx === selected) {
                        border = '#ef4444';
                        bg = 'rgba(239,68,68,0.12)';
                        color = '#ef4444';
                      }
                    }

                    return `
                      <button 
                        type="button"
                        onclick="window.InforMestreModule3.selectQuizOption(${qIdx}, ${oIdx})"
                        ${hasAnswered ? 'disabled' : ''}
                        style="display: flex; align-items: center; gap: 0.9rem; padding: 0.95rem 1.3rem; border-radius: 12px; border: 1.5px solid ${border}; background: ${bg}; color: ${color}; font-size: 0.92rem; font-weight: 600; text-align: left; cursor: ${hasAnswered ? 'default' : 'pointer'}; transition: all 0.2s;">
                        <span style="width: 28px; height: 28px; border-radius: 50%; background: ${hasAnswered && oIdx === q.correct ? '#10b981' : hasAnswered && oIdx === selected ? '#ef4444' : 'rgba(255,255,255,0.08)'}; color: ${hasAnswered && (oIdx === q.correct || oIdx === selected) ? '#fff' : 'inherit'}; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 800; flex-shrink: 0;">
                          ${String.fromCharCode(65 + oIdx)}
                        </span>
                        <span style="flex: 1;">${opt}</span>
                      </button>
                    `;
                  }).join('')}
                </div>

                ${hasAnswered ? `
                  <div style="background: ${isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)'}; border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}; border-radius: 10px; padding: 1.1rem; margin-top: 1rem;">
                    <div style="font-weight: 800; font-size: 0.9rem; color: ${isCorrect ? '#10b981' : '#f59e0b'}; margin-bottom: 0.3rem;">
                      ${isCorrect ? '🎉 Resposta Correta!' : '💡 Explicação Pedagógica:'}
                    </div>
                    <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.5; margin: 0;">
                      ${q.explanation}
                    </p>
                  </div>
                ` : ''}

              </div>
            `;
          }).join('')}
        </div>

        <!-- Finalização -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.2rem; border-top: 1px solid var(--color-border);">
          <button type="button" class="btn btn-outline" onclick="window.InforMestreModule3.switchLessonTab('slides')" style="padding: 0.8rem 1.6rem; font-weight: 700; border-radius: 10px; cursor: pointer;">
            ← Rever Slides
          </button>

          <button 
            type="button" 
            onclick="window.InforMestreModule3.switchLessonTab('activities')"
            ${allAnswered ? '' : 'disabled style="opacity:0.4; cursor:not-allowed;"'}
            style="padding: 0.95rem 2.5rem; font-size: 1rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #55EFC4 100%); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 20px rgba(0,184,148,0.35);">
            <span>Continuar para Atividades Práticas 🛠️</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

      </div>
    `;
  }

  function renderActivitiesStage(container, lesson) {
    container.innerHTML = '';
    
    if (lesson.id === 'm3-aula-1' || lesson.id === 'aula-15') {
      // Atividade 3 e 4 para a Aula 1
      initM3Aula1Activities(container, lesson);
    } else {
      container.innerHTML = `
        <div style="background: var(--color-surface); padding: 2rem; border-radius: 16px; border: 1px solid var(--color-border); box-shadow: 0 8px 30px rgba(0,0,0,0.12); text-align: center; animation: fadeIn 0.3s ease;">
          <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--color-text-primary);">🛠️ Atividades Práticas</h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">As atividades práticas para esta aula estão em desenvolvimento.</p>
          <button class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('mission')">Continuar para a Missão 🚀</button>
        </div>
      `;
    }
  }

  function renderMissionStage(container, lesson) {
    container.innerHTML = `
      <div style="background: var(--color-surface); padding: 2rem; border-radius: 16px; border: 1px solid var(--color-border); box-shadow: 0 8px 30px rgba(0,0,0,0.12); text-align: center; animation: fadeIn 0.3s ease;">
        <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--color-text-primary);">🚀 Missão Real</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">A missão para esta aula está em desenvolvimento.</p>
        <button class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('challenge')">Ir para o Desafio Final 🏆</button>
      </div>
    `;
  }

  function renderChallengeStage(container, lesson) {
    container.innerHTML = "";
    
    const challenge = lesson.finalChallenge;
    if (!challenge) {
      container.innerHTML = `
        <div style="background: var(--color-surface); padding: 2rem; border-radius: 16px; border: 1px solid var(--color-border); text-align: center;">
          <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--color-text-primary);">🏆 Desafio Final</h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">O desafio desta aula está em desenvolvimento.</p>
          <button type="button" onclick="window.InforMestreModule3.finishQuiz('${lesson.id}')" class="btn btn-primary">Concluir Aula Definitivamente</button>
        </div>
      `;
      return;
    }

    let currentQIdx = 0;
    let xpEarned = 0;
    let correctCount = 0;
    let answers = []; // store { questionId, correct }

    const widget = document.createElement("div");
    widget.className = "card bg-surface border-soft mt-1";
    widget.style.padding = "2rem";
    
    // Header
    const header = document.createElement("div");
    header.style.textAlign = "center";
    header.style.marginBottom = "2rem";
    header.innerHTML = `
      <h2 style="color: var(--color-text-primary); margin-bottom: 0.5rem; font-size: 1.5rem;">${challenge.title}</h2>
      <p style="color: var(--color-text-secondary); font-size: 0.95rem;">${challenge.subtitle}</p>
    `;

    const contentArea = document.createElement("div");

    const renderResults = () => {
      // final results screen
      let compsHtml = challenge.competencies.map(c => {
        const barWidth = answers.filter(a => a.correct).length >= (challenge.questions.length / 2) ? c.score : Math.max(10, c.score - 40);
        return `
          <div style="margin-bottom: 1rem; text-align: left;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.4rem; color: var(--color-text-primary);">
              <span>${c.name}</span>
              <span style="color: var(--color-text-secondary);">${barWidth}%</span>
            </div>
            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
              <div style="width: ${barWidth}%; height: 100%; background: var(--color-primary); border-radius: 4px;"></div>
            </div>
          </div>
        `;
      }).join('');

      contentArea.innerHTML = `
        <div class="text-center" style="animation: fadeIn 0.4s ease;">
          <span style="font-size: 3.5rem;">🏆</span>
          <h3 style="margin: 1rem 0; color: #10b981;">DESAFIO CONCLUÍDO!</h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">
            Você não apenas estudou os conceitos. Você conseguiu aplicá-los em situações do cotidiano.
          </p>
          
          <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
            <div style="background: rgba(16,185,129,0.1); padding: 1rem; border-radius: 12px; min-width: 120px;">
              <div style="font-size: 0.8rem; color: #10b981; text-transform: uppercase;">Acertos</div>
              <div style="font-size: 1.5rem; font-weight: bold; color: var(--color-text-primary);">${correctCount}/${challenge.questions.length}</div>
            </div>
            <div style="background: rgba(59,130,246,0.1); padding: 1rem; border-radius: 12px; min-width: 120px;">
              <div style="font-size: 0.8rem; color: #3b82f6; text-transform: uppercase;">XP Ganho</div>
              <div style="font-size: 1.5rem; font-weight: bold; color: var(--color-text-primary);">+${xpEarned}</div>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
            <h4 style="margin-top: 0; margin-bottom: 1.5rem; text-align: left; color: var(--color-text-primary);">Análise de Competências</h4>
            ${compsHtml}
          </div>

          <button 
            type="button" 
            onclick="window.InforMestreModule3.finishQuiz('${lesson.id}')"
            style="padding: 1rem 3rem; font-size: 1.1rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #55EFC4 100%); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 20px rgba(0,184,148,0.35);">
            <span>Encerrar Aula e Salvar Progresso</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        </div>
      `;
      // Grant XP
      if (xpEarned > 0 && typeof window.addXP === "function") {
        window.addXP(xpEarned);
      }
    };

    const renderQuestion = () => {
      if (currentQIdx >= challenge.questions.length) {
        renderResults();
        return;
      }
      const q = challenge.questions[currentQIdx];
      
      let html = `
        <div style="text-align: left; animation: fadeIn 0.3s ease;">
          <div style="font-size: 0.85rem; color: var(--color-primary); font-weight: bold; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
            Questão ${currentQIdx + 1} de ${challenge.questions.length} • Desafio Prático
          </div>
          <div style="background: rgba(255,255,255,0.03); border-left: 4px solid var(--color-primary); padding: 1.2rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
            <p style="margin: 0; font-size: 1rem; color: var(--color-text-primary); line-height: 1.6; white-space: pre-wrap;">${q.context}</p>
          </div>
      `;
      
      if (q.question) {
        html += `<h3 style="margin-bottom: 1.5rem; color: var(--color-text-primary); font-size: 1.2rem;">${q.question}</h3>`;
      }

      contentArea.innerHTML = html;

      const interactiveArea = document.createElement("div");
      
      let answered = false;

      const showFeedback = (isCorrect) => {
        answered = true;
        if (isCorrect) {
          correctCount++;
          xpEarned += q.xp;
        }
        answers.push({ questionId: q.id, correct: isCorrect });

        const fbDiv = document.createElement("div");
        fbDiv.style.cssText = `margin-top: 1.5rem; padding: 1.2rem; border-radius: 12px; background: ${isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; animation: slideUp 0.3s ease;`;
        fbDiv.innerHTML = `
          <div style="font-weight: bold; margin-bottom: 0.5rem; color: ${isCorrect ? '#10b981' : '#ef4444'};">
            ${isCorrect ? '✅ Correto! (+' + q.xp + ' XP)' : '❌ Incorreto'}
          </div>
          <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.5;">${q.feedback}</p>
          <button class="btn btn-primary" style="margin-top: 1rem;" id="next-btn-fc">Continuar</button>
        `;
        contentArea.appendChild(fbDiv);
        
        fbDiv.querySelector("#next-btn-fc").addEventListener("click", () => {
          currentQIdx++;
          renderQuestion();
        });
      };

      if (q.type === "choice") {
        interactiveArea.style.display = "flex";
        interactiveArea.style.flexDirection = "column";
        interactiveArea.style.gap = "0.8rem";

        q.options.forEach((opt, idx) => {
          const btn = document.createElement("button");
          btn.className = "quiz-option-btn";
          btn.style.textAlign = "left";
          btn.innerHTML = `<span style="font-weight: bold; margin-right: 10px;">${String.fromCharCode(65 + idx)})</span> ${opt}`;
          btn.addEventListener("click", () => {
            if (answered) return;
            const isCorrect = (idx === q.correct);
            btn.classList.add(isCorrect ? "correct" : "wrong");
            if (!isCorrect) {
              interactiveArea.children[q.correct].classList.add("correct");
            }
            Array.from(interactiveArea.children).forEach(c => c.style.pointerEvents = "none");
            showFeedback(isCorrect);
          });
          interactiveArea.appendChild(btn);
        });
      } else if (q.type === "ordering") {
        let ordered = [];
        let remaining = [...q.items];
        
        const renderOrdering = () => {
          interactiveArea.innerHTML = "";
          
          if (ordered.length > 0) {
            const listDiv = document.createElement("div");
            listDiv.style.marginBottom = "1rem";
            listDiv.innerHTML = `<div style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">Sua Sequência:</div>`;
            ordered.forEach((item, idx) => {
              const itemDiv = document.createElement("div");
              itemDiv.style.cssText = "padding: 0.8rem 1rem; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem; cursor: pointer;";
              itemDiv.innerHTML = `<span style="background: var(--color-primary); color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold;">${idx+1}</span> <span>${item}</span>`;
              itemDiv.addEventListener("click", () => {
                if (answered) return;
                remaining.push(item);
                ordered.splice(idx, 1);
                renderOrdering();
              });
              listDiv.appendChild(itemDiv);
            });
            interactiveArea.appendChild(listDiv);
          }
          
          if (remaining.length > 0 && !answered) {
            const availDiv = document.createElement("div");
            availDiv.innerHTML = `<div style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">Opções disponíveis (Clique para adicionar):</div>`;
            const grid = document.createElement("div");
            grid.style.display = "flex";
            grid.style.flexDirection = "column";
            grid.style.gap = "0.5rem";
            remaining.forEach((item, idx) => {
              const btn = document.createElement("button");
              btn.className = "btn btn-outline";
              btn.textContent = item;
              btn.addEventListener("click", () => {
                if (answered) return;
                ordered.push(item);
                remaining.splice(idx, 1);
                renderOrdering();
              });
              grid.appendChild(btn);
            });
            availDiv.appendChild(grid);
            interactiveArea.appendChild(availDiv);
          }
          
          if (remaining.length === 0 && !answered) {
            const checkBtn = document.createElement("button");
            checkBtn.className = "btn btn-primary";
            checkBtn.textContent = "Verificar Sequência";
            checkBtn.style.marginTop = "1rem";
            checkBtn.addEventListener("click", () => {
              const isCorrect = JSON.stringify(ordered) === JSON.stringify(q.items);
              showFeedback(isCorrect);
            });
            interactiveArea.appendChild(checkBtn);
          }
        };
        
        remaining.sort(() => Math.random() - 0.5);
        renderOrdering();

      } else if (q.type === "url-analysis") {
        interactiveArea.innerHTML = `
          <div style="font-family: monospace; font-size: 1.4rem; text-align: center; background: #111; padding: 1.5rem; border-radius: 12px; border: 1px solid #333; margin: 1.5rem 0; color: #fff;">
            ${q.url}
          </div>
          <div id="url-q-container"></div>
        `;
        
        const qContainer = interactiveArea.querySelector("#url-q-container");
        
        let selectsHtml = q.parts.map((p, i) => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 0.5rem;">
            <div style="font-weight: bold;">Qual é o ${p.label}?</div>
            <select id="url-sel-${i}" style="padding: 0.5rem; border-radius: 6px; background: #222; color: #fff; border: 1px solid #444; width: 200px;">
              <option value="">Selecione...</option>
              ${q.parts.map(opt => `<option value="${opt.value}">${opt.value}</option>`).join('')}
            </select>
          </div>
        `).join('');
        
        qContainer.innerHTML = selectsHtml;
        
        const checkBtn = document.createElement("button");
        checkBtn.className = "btn btn-primary";
        checkBtn.textContent = "Verificar Análise";
        checkBtn.style.marginTop = "1rem";
        checkBtn.addEventListener("click", () => {
          if (answered) return;
          let allCorrect = true;
          q.parts.forEach((p, i) => {
            const sel = interactiveArea.querySelector(`#url-sel-${i}`);
            if (sel.value !== p.value) {
              allCorrect = false;
              sel.style.borderColor = "#ef4444";
            } else {
              sel.style.borderColor = "#10b981";
            }
            sel.disabled = true;
          });
          showFeedback(allCorrect);
        });
        qContainer.appendChild(checkBtn);
      }

      contentArea.appendChild(interactiveArea);
    };

    widget.appendChild(header);
    widget.appendChild(contentArea);
    container.appendChild(widget);
    
    renderQuestion();
  }

  // --------------------------------------------------------------------------
  // 5. CONTROLADORES DE SLIDES E SESSÃO
  // --------------------------------------------------------------------------
  function nextSlide() {
    const lesson = MODULE_3_LESSONS.find(l => l.id === currentLessonId) || MODULE_3_LESSONS[0];
    if (currentSlideIndex < lesson.slides.length - 1) {
      currentSlideIndex++;
      const stageContainer = document.getElementById("m3-stage-container");
      if (stageContainer) renderSlidesStage(stageContainer, lesson);
    }
  }

  function prevSlide() {
    const lesson = MODULE_3_LESSONS.find(l => l.id === currentLessonId) || MODULE_3_LESSONS[0];
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      const stageContainer = document.getElementById("m3-stage-container");
      if (stageContainer) renderSlidesStage(stageContainer, lesson);
    }
  }

  function goToSlide(idx) {
    const lesson = MODULE_3_LESSONS.find(l => l.id === currentLessonId) || MODULE_3_LESSONS[0];
    if (idx >= 0 && idx < lesson.slides.length) {
      currentSlideIndex = idx;
      const stageContainer = document.getElementById("m3-stage-container");
      if (stageContainer) renderSlidesStage(stageContainer, lesson);
    }
  }

  function selectQuizOption(qIdx, oIdx) {
    if (currentQuizAnswers[qIdx] !== undefined) return;
    currentQuizAnswers[qIdx] = oIdx;

    const lesson = MODULE_3_LESSONS.find(l => l.id === currentLessonId) || MODULE_3_LESSONS[0];
    const stageContainer = document.getElementById("m3-stage-container");
    if (stageContainer) renderQuizStage(stageContainer, lesson);
  }

  async function finishQuiz(lessonId) {
    const lesson = MODULE_3_LESSONS.find(l => l.id === lessonId) || MODULE_3_LESSONS[0];
    
    if (!window.state) window.state = {};
    if (!window.state.completedLessons) window.state.completedLessons = {};
    window.state.completedLessons[lesson.id] = true;
    window.state.completedLessons["aula-15"] = true;

    if (typeof window.addXP === "function") window.addXP(lesson.xpReward);
    if (typeof window.saveState === "function") window.saveState();

    if (window.currentUser && window.saveProgressToDb) {
      try {
        await window.saveProgressToDb(window.currentUser.id, window.state);
      } catch (err) {
        console.warn("Erro ao salvar progresso no Supabase:", err);
      }
    }

    showModule3CelebrationModal(lesson);
  }

  function showModule3CelebrationModal(lesson) {
    const existing = document.getElementById("m3-celebration-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "m3-celebration-modal";
    modal.className = "modern-modal-overlay active";
    modal.style.zIndex = "999999";

    modal.innerHTML = `
      <div class="modern-modal-card" style="max-width: 520px; text-align: center; padding: 2.5rem; border-radius: 20px; border: 1px solid rgba(0,184,148,0.4); box-shadow: 0 15px 50px rgba(0,184,148,0.25);">
        <div style="font-size: 4.5rem; margin-bottom: 0.8rem; animation: bounce 1s ease infinite;">🎉</div>
        <div style="font-size: 0.8rem; font-weight: 800; color: #00B894; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;">
          AULA 1 CONCLUÍDA COM MAESTRIA!
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 0.8rem;">
          ${lesson.title}
        </h2>
        <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.55; margin: 0 0 1.8rem;">
          Parabéns! Você completou todas as 4 etapas (Apresentação, Vídeo, Slides Oficiais e Quiz) e garantiu <strong>+${lesson.xpReward} XP</strong> para seu perfil!
        </p>

        <div style="background: rgba(0,184,148,0.08); border: 1px solid rgba(0,184,148,0.25); border-radius: 14px; padding: 1.2rem; margin-bottom: 2rem; display: flex; justify-content: space-around;">
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 700;">XP Ganho</div>
            <div style="font-size: 1.35rem; font-weight: 800; color: #00B894;">+${lesson.xpReward} XP</div>
          </div>
          <div style="border-left: 1px solid var(--color-border);"></div>
          <div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 700;">Status</div>
            <div style="font-size: 1.35rem; font-weight: 800; color: #10b981;">100% Concluído</div>
          </div>
        </div>

        <div style="display: flex; gap: 0.8rem; justify-content: center;">
          <button type="button" class="btn btn-primary" onclick="document.getElementById('m3-celebration-modal').remove(); renderStudentModule3LessonView(null, '${lesson.id}');" style="padding: 0.9rem 2rem; font-size: 0.95rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #00cec9 100%); border: none; color: #fff; cursor: pointer;">
            Revisar Conteúdo
          </button>
          <button type="button" class="btn btn-outline" onclick="document.getElementById('m3-celebration-modal').remove(); renderStudentModule3View();" style="padding: 0.9rem 1.8rem; font-size: 0.95rem; font-weight: 700; border-radius: 12px; cursor: pointer;">
            Voltar ao Menu
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // --------------------------------------------------------------------------
  // 6. SIMULADORES E ATIVIDADES (MÓDULO 3)
  // --------------------------------------------------------------------------
  function initM3Aula1Activities(container, lesson) {
    container.innerHTML = "";
    
    // Activities State
    let currentStep = 1; // 1: Internet x Web, 2: URL, 3: Caminho
    let lives = 3;

    const widget = document.createElement("div");
    widget.className = "card bg-surface border-soft mt-1";
    widget.style.padding = "1.5rem";

    const updateHearts = (heartsDiv) => {
      heartsDiv.innerHTML = "Vidas: " + Array(3).fill(0).map((_, i) => i < lives ? "❤️" : "💔").join(" ");
    };

    const render = () => {
      widget.innerHTML = "";

      if (lives <= 0) {
        widget.innerHTML = `
          <div class="text-center">
            <span style="font-size:3rem;">⚠️</span>
            <h4 class="mt-1" style="color:var(--color-danger);">Você perdeu as vidas!</h4>
            <p class="text-muted text-small">Sem problemas! Errar faz parte do aprendizado.</p>
            <button class="btn btn-secondary mt-1" id="btn-restart-a1">Tentar Novamente</button>
          </div>
        `;
        widget.querySelector("#btn-restart-a1").addEventListener("click", () => {
          lives = 3;
          currentStep = 1;
          render();
        });
        return;
      }

      // TOP BAR
      const topBar = document.createElement("div");
      topBar.style.display = "flex";
      topBar.style.justifyContent = "space-between";
      topBar.style.marginBottom = "1rem";
      
      const stepSpan = document.createElement("span");
      stepSpan.textContent = `Atividade ${currentStep} de 3`;
      stepSpan.style.fontSize = "0.85rem";
      stepSpan.style.color = "var(--color-text-secondary)";
      
      const heartsSpan = document.createElement("span");
      heartsSpan.style.color = "var(--color-danger)";
      heartsSpan.style.fontWeight = "bold";
      heartsSpan.style.fontSize = "0.85rem";
      updateHearts(heartsSpan);

      topBar.appendChild(stepSpan);
      topBar.appendChild(heartsSpan);
      widget.appendChild(topBar);

      if (currentStep === 1) {
        // ATIVIDADE 1: Internet x Web
        const items = [
          { name: "Cabo Submarino", type: "Internet" },
          { name: "Site do Google", type: "Web" },
          { name: "Navegador Chrome", type: "Web" },
          { name: "Roteador Wi-Fi", type: "Internet" }
        ];
        
        let currentItemIdx = 0;
        
        const renderItem = () => {
          if (currentItemIdx >= items.length) {
            currentStep = 2;
            render();
            return;
          }
          
          const curr = items[currentItemIdx];
          
          const itemBox = document.createElement("div");
          itemBox.style.cssText = "background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.5rem; text-align: center; margin-bottom: 1.2rem;";
          
          const title = document.createElement("h3");
          title.textContent = curr.name;
          title.style.margin = "0 0 0.5rem 0";
          
          const desc = document.createElement("p");
          desc.textContent = "Isso faz parte da infraestrutura física (Internet) ou dos serviços/páginas (Web)?";
          desc.style.color = "var(--color-text-secondary)";
          desc.style.fontSize = "0.85rem";
          
          itemBox.appendChild(title);
          itemBox.appendChild(desc);
          
          const optsDiv = document.createElement("div");
          optsDiv.style.display = "grid";
          optsDiv.style.gridTemplateColumns = "1fr 1fr";
          optsDiv.style.gap = "8px";
          
          ["Internet", "Web"].forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "quiz-option-btn";
            btn.textContent = opt;
            btn.addEventListener("click", () => {
              if (opt === curr.type) {
                btn.classList.add("correct");
                setTimeout(() => {
                  currentItemIdx++;
                  renderItem();
                }, 1000);
              } else {
                btn.classList.add("wrong");
                lives--;
                updateHearts(heartsSpan);
                if (lives <= 0) {
                  render();
                } else {
                  alert("❌ Incorreto! Lembre-se: Internet é a parte física (cabos, sinal). Web é a parte lógica (sites).");
                }
              }
            });
            optsDiv.appendChild(btn);
          });
          
          widget.innerHTML = "";
          widget.appendChild(topBar);
          widget.appendChild(itemBox);
          widget.appendChild(optsDiv);
        };
        
        renderItem();
      } 
      else if (currentStep === 2) {
        // ATIVIDADE 2: Monte a URL
        widget.innerHTML = "";
        widget.appendChild(topBar);
        
        const title = document.createElement("h4");
        title.textContent = "Analise o Endereço Digital";
        widget.appendChild(title);
        
        const urlBox = document.createElement("div");
        urlBox.style.cssText = "font-family: monospace; font-size: 1.2rem; text-align: center; background: #111; padding: 1rem; border-radius: 8px; border: 1px solid #333; margin: 1rem 0;";
        urlBox.innerHTML = `<span style="color: #ef4444;">https://</span><span style="color: #3b82f6;">www.bancodobrasil</span><span style="color: #10b981;">.com.br</span>`;
        widget.appendChild(urlBox);
        
        const question = document.createElement("p");
        question.textContent = "Qual parte do endereço acima representa o 'Domínio' (o nome do site)?";
        widget.appendChild(question);
        
        const optsDiv = document.createElement("div");
        optsDiv.style.display = "flex";
        optsDiv.style.flexDirection = "column";
        optsDiv.style.gap = "8px";
        
        ["https:// (Protocolo)", "www.bancodobrasil (Domínio)", ".com.br (Extensão/País)"].forEach((opt, idx) => {
          const btn = document.createElement("button");
          btn.className = "quiz-option-btn";
          btn.textContent = opt;
          btn.addEventListener("click", () => {
            if (idx === 1) {
              btn.classList.add("correct");
              setTimeout(() => {
                currentStep = 3;
                render();
              }, 1000);
            } else {
              btn.classList.add("wrong");
              lives--;
              updateHearts(heartsSpan);
              if (lives <= 0) render();
              else alert("❌ Incorreto! O domínio é o nome principal do site.");
            }
          });
          optsDiv.appendChild(btn);
        });
        widget.appendChild(optsDiv);
      }
      else if (currentStep === 3) {
        // CONCLUSÃO ATIVIDADES
        widget.innerHTML = `
          <div class="text-center">
            <span style="font-size:3rem;">🎉</span>
            <h4 class="mt-1" style="color:var(--color-success);">Atividades Concluídas!</h4>
            <p class="text-muted text-small">Muito bem! Você provou que entende as diferenças entre Internet, Web e domínios.</p>
            <span class="badge badge-success">✓ Prática Concluída (+50 XP)</span>
            <div style="margin-top: 1.5rem;">
              <button class="btn btn-primary" id="btn-next-mission">Continuar para a Missão 🚀</button>
            </div>
          </div>
        `;
        
        setTimeout(() => {
          if(typeof window.addXP === "function") window.addXP(50);
        }, 100);

        widget.querySelector("#btn-next-mission").addEventListener("click", () => {
          window.InforMestreModule3.switchLessonTab('mission');
        });
      }
    };

    render();
    container.appendChild(widget);
  }

  // --------------------------------------------------------------------------
  // 7. EXPOSIÇÃO GLOBAL
  // --------------------------------------------------------------------------
  root.InforMestreModule3 = {
    MODULE_3_LESSONS,
    renderStudentModule3LessonView,
    switchLessonTab,
    nextSlide,
    prevSlide,
    goToSlide,
    selectQuizOption,
    finishQuiz
  };

})(typeof window !== 'undefined' ? window : this);
