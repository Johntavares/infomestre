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
    "id": "m3-aula-1",
    "number": 1,
    "title": "Conhecendo a Internet & o Mundo Conectado",
    "badge": "Aula 1 • Fundamentos da Rede",
    "duration": "25 min",
    "xpReward": 100,
    "videoUrl": "https://youtu.be/UUm3hAk0ah8",
    "presentation": {
      "headline": "A Internet e o Mundo Digital",
      "subtitle": "Desmistificando a maior rede do planeta e aprendendo a navegar com segurança.",
      "coverImage": "images/m3/slides/slide_1.png",
      "objectives": [
        "Compreender a diferença real entre a infraestrutura da Internet e os serviços da Web (WWW)",
        "Aprender como a informação viaja por cabos submarinos e sinais Wi-Fi na velocidade da luz",
        "Entender a anatomia de um endereço digital (URL & Domínio)",
        "Identificar conexões seguras através do Cadeado Fechado (HTTPS)",
        "Diferenciar Download (baixar) de Upload (subir/enviar)",
        "Descobrir o que é e como funciona a Nuvem (Cloud)"
      ]
    },
    "slides": [
      {
        "id": 1,
        "title": "Abertura • A Internet e o Mundo Digital",
        "src": "images/m3/slides/slide_1.png"
      },
      {
        "id": 2,
        "title": "O Mundo Conectado",
        "src": "images/m3/slides/slide_2.png"
      },
      {
        "id": 3,
        "title": "O que é a Internet?",
        "src": "images/m3/slides/slide_3.png"
      },
      {
        "id": 4,
        "title": "Internet vs. Web (WWW)",
        "src": "images/m3/slides/slide_4.png"
      },
      {
        "id": 5,
        "title": "O Veículo Digital: Os Navegadores",
        "src": "images/m3/slides/slide_5.png"
      },
      {
        "id": 6,
        "title": "A Grande Teia: Como a Internet Funciona",
        "src": "images/m3/slides/slide_6.png"
      },
      {
        "id": 7,
        "title": "Como o Navegador conversa com os Sites",
        "src": "images/m3/slides/slide_7.png"
      },
      {
        "id": 8,
        "title": "O Endereço Digital: URL",
        "src": "images/m3/slides/slide_8.png"
      },
      {
        "id": 9,
        "title": "Navegação Segura: O Cadeado Fechado",
        "src": "images/m3/slides/slide_9.png"
      },
      {
        "id": 10,
        "title": "O Caminho: Download vs. Upload",
        "src": "images/m3/slides/slide_10.png"
      },
      {
        "id": 11,
        "title": "O Kit de Sobrevivência do Navegador",
        "src": "images/m3/slides/slide_11.png"
      },
      {
        "id": 12,
        "title": "Como a Internet chega até nós? (Cabo vs Wi-Fi)",
        "src": "images/m3/slides/slide_12.png"
      },
      {
        "id": 13,
        "title": "O que é a Nuvem? (Cloud)",
        "src": "images/m3/slides/slide_13.png"
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Qual é a principal diferença entre a Internet e a Web (WWW)?",
        "options": [
          "A Internet é a infraestrutura física (cabos, roteadores e estradas), enquanto a Web são as páginas e serviços (as lojas e casas que ficam nessas estradas).",
          "A Internet só funciona no celular e a Web só no computador.",
          "São exatamente a mesma coisa sem nenhuma diferença técnica.",
          "A Web é a fiação de fibra óptica e a Internet é o Google Chrome."
        ],
        "correct": 0,
        "explanation": "Excelente! A Internet é a rede física global (as rodovias de dados), enquanto a Web (WWW) é o ecossistema de sites, vídeos e serviços que trafegam nessas rodovias."
      },
      {
        "id": "q2",
        "question": "O que significa o ícone de Cadeado Fechado ao lado do endereço de um site (URL)?",
        "options": [
          "Indica que o site está bloqueado ou com erro de conexão.",
          "Indica que a conexão é criptografada e segura para você inserir senhas e dados confidenciais.",
          "Significa que o site é pago e você precisa de assinatura para entrar.",
          "Indica que você deve baixar um arquivo para continuar navegando."
        ],
        "correct": 1,
        "explanation": "Perfeito! O cadeado HTTPS garante que as informações trocadas entre o seu computador e o servidor estão codificadas (criptografadas), evitando interceptações."
      },
      {
        "id": "q3",
        "question": "Quando você envia uma foto do seu computador para o Instagram ou anexa seu currículo em um e-mail, que ação está realizando?",
        "options": [
          "Download (Baixar arquivo da internet)",
          "Upload (Subir / Enviar arquivo para a internet)",
          "Backup em pendrive local",
          "Desfragmentação do disco rígido"
        ],
        "correct": 1,
        "explanation": "Correto! Upload é o envio de arquivos do seu dispositivo para a Internet. Download é o processo inverso (puxar da Internet para o seu aparelho)."
      },
      {
        "id": "q4",
        "question": "Qual é a maior vantagem de salvar arquivos importantes na 'Nuvem' (Google Drive / OneDrive)?",
        "options": [
          "O arquivo é deletado automaticamente após 24 horas para liberar memória.",
          "Você só consegue abrir o arquivo se estiver usando exatamente o mesmo computador onde o criou.",
          "Seus arquivos ficam salvos em servidores seguros e acessíveis de qualquer lugar, mesmo se o seu computador quebrar.",
          "O computador não precisa mais de energia elétrica para funcionar."
        ],
        "correct": 2,
        "explanation": "Exatamente! O armazenamento em nuvem garante backup contínuo e acesso universal aos seus arquivos através do seu login em qualquer aparelho."
      },
      {
        "id": "q5",
        "question": "O que é um 'Navegador' (Browser) de Internet?",
        "options": [
          "Um programa ou aplicativo usado para acessar e visualizar as páginas da Web (ex: Google Chrome, Edge).",
          "O aparelho físico que distribui o sinal de Wi-Fi pela casa.",
          "A empresa provedora que fornece a conexão de internet para o cliente (ex: Vivo, Claro).",
          "O cabo físico que interliga os computadores na rede de casa."
        ],
        "correct": 0,
        "explanation": "Muito bem! Os navegadores (browsers) são os 'veículos' que utilizamos para acessar a Web, traduzindo códigos complexos em páginas interativas."
      },
      {
        "id": "q6",
        "question": "Qual alternativa representa o formato básico e correto de um Endereço Digital (URL)?",
        "options": [
          "google@com",
          "www.meusite.com.br",
          "site:meusite#br",
          "C:UsersDocumentossite.com"
        ],
        "correct": 1,
        "explanation": "Isso mesmo! O formato padrão de uma URL costuma usar 'www.' e ter domínios como '.com' ou '.com.br'."
      },
      {
        "id": "q7",
        "question": "O que permite que a Internet cruze oceanos e conecte os continentes do nosso planeta?",
        "options": [
          "Apenas ondas de rádio enviadas por antenas 5G gigantes em navios.",
          "Uma rede com milhares de quilômetros de cabos submarinos de fibra óptica repousados no fundo do oceano.",
          "Exclusivamente satélites de comunicação posicionados no espaço.",
          "Não existe conexão direta entre os continentes, a internet de cada país é totalmente isolada."
        ],
        "correct": 1,
        "explanation": "Correto! Mais de 95% do tráfego internacional de dados passa por imensos cabos de fibra óptica instalados no fundo do mar."
      },
      {
        "id": "q8",
        "question": "Se você resolver baixar um filme ou um arquivo PDF da internet para salvar no seu computador e visualizar depois, qual operação foi realizada?",
        "options": [
          "Upload",
          "Criptografia",
          "Download",
          "Desfragmentação"
        ],
        "correct": 2,
        "explanation": "Perfeito! Você está fazendo o Download (puxando) do arquivo de um servidor na internet para o disco local do seu equipamento."
      },
      {
        "id": "q9",
        "question": "De forma simples, como os navegadores se comunicam com os sites na internet quando você digita um endereço?",
        "options": [
          "O navegador faz uma 'requisição' (pedido) ao servidor, que responde enviando os pacotes de dados da página de volta para a sua tela.",
          "O servidor envia fisicamente um pendrive para o seu provedor de internet.",
          "O navegador adivinha os códigos usando inteligência artificial sem precisar consultar o servidor.",
          "O navegador lê diretamente o arquivo que já estava salvo no seu disco C: desde a fábrica."
        ],
        "correct": 0,
        "explanation": "Exato! É um modelo de comunicação Cliente-Servidor. Seu navegador (cliente) pede a página e o computador remoto (servidor) atende o pedido entregando o conteúdo."
      },
      {
        "id": "q10",
        "question": "Qual a diferença central entre usar uma conexão por Cabo de Rede e o Wi-Fi?",
        "options": [
          "O Wi-Fi transmite dados através de ondas de rádio pelo ar (sem fio), enquanto o cabo transmite dados de forma física e direta, geralmente mais estável.",
          "O Wi-Fi só funciona se o computador estiver ligado na tomada com cabos de alta tensão.",
          "O Wi-Fi é a internet 'verdadeira', e o cabo é apenas para rede local sem acesso à internet.",
          "Não existe nenhuma diferença de estabilidade ou velocidade, ambos funcionam exatamente igual em qualquer distância."
        ],
        "correct": 0,
        "explanation": "Muito bom! O Wi-Fi oferece grande mobilidade (ondas de rádio), enquanto o cabo físico garante velocidade total e estabilidade contínua livre de interferências."
      }
    ],
    "finalChallenge": {
      "title": "🌐 DESAFIO FINAL — VOCÊ ENTENDE A INTERNET?",
      "subtitle": "Agora vamos descobrir se você consegue aplicar o que aprendeu em situações do dia a dia.",
      "questions": [
        {
          "id": "fc1",
          "type": "choice",
          "context": "João abriu o Google Chrome no computador e disse:\n\n'Entrei na Internet porque abri o Chrome.'\n\nEle está correto?",
          "options": [
            "Sim, o Chrome é a própria Internet.",
            "Sim, porque todo navegador é uma conexão de Internet.",
            "Não. O navegador é uma ferramenta utilizada para acessar conteúdos e serviços através da Internet.",
            "Não. O Chrome funciona somente quando existe um servidor dentro do computador."
          ],
          "correct": 2,
          "feedback": "O navegador não é a Internet. Ele é um software usado para acessar sites e outros conteúdos disponíveis através da rede.",
          "xp": 20
        },
        {
          "id": "fc2",
          "type": "choice",
          "context": "Maria enviou um e-mail para seu colega. Depois abriu um site de notícias no navegador.",
          "question": "Qual afirmação melhor explica essas duas situações?",
          "options": [
            "E-mail e Web são exatamente a mesma coisa.",
            "Os dois utilizam a Internet, mas são serviços/recursos diferentes.",
            "O e-mail utiliza a Web, mas a Internet não participa.",
            "O site de notícias funciona sem Internet."
          ],
          "correct": 1,
          "feedback": "A Internet é a infraestrutura de redes que permite a comunicação. A Web é um dos serviços que utilizam essa infraestrutura. O e-mail também é um serviço diferente da Web.",
          "xp": 20
        },
        {
          "id": "fc3",
          "type": "ordering",
          "context": "Você digita um endereço de site no navegador e aperta Enter.",
          "question": "Qual sequência representa melhor o processo de forma simplificada? Organize os passos abaixo:",
          "items": [
            "Navegador faz a solicitação",
            "A solicitação passa pela rede",
            "Um servidor recebe/processa a solicitação",
            "O servidor envia os dados",
            "O navegador apresenta a página"
          ],
          "feedback": "Excelente! Essa é uma representação simplificada. A comunicação real envolve várias etapas e equipamentos (provedores, DNS, roteadores), mas este é o ciclo fundamental Cliente-Servidor.",
          "xp": 20
        },
        {
          "id": "fc4",
          "type": "url-analysis",
          "context": "Analise o endereço abaixo:",
          "url": "https://www.exemplo.com.br/noticias",
          "parts": [
            {
              "label": "Protocolo",
              "value": "https://"
            },
            {
              "label": "Domínio",
              "value": "www.exemplo.com.br"
            },
            {
              "label": "Caminho",
              "value": "/noticias"
            }
          ],
          "feedback": "Muito bem! O protocolo (HTTPS) diz COMO acessar. O domínio diz ONDE ir. O caminho diz O QUE buscar dentro desse lugar.",
          "xp": 20
        },
        {
          "id": "fc5",
          "type": "choice",
          "context": "Pedro está conectado ao Wi-Fi de sua casa. Ele afirma:\n\n'Se meu Wi-Fi está funcionando, significa que o Wi-Fi é a Internet.'",
          "question": "Qual é a melhor explicação?",
          "options": [
            "Pedro está certo.",
            "Wi-Fi é um tipo de navegador.",
            "Wi-Fi é uma tecnologia de conexão sem fio que pode permitir que o dispositivo acesse uma rede; ele não é sinônimo de Internet.",
            "Wi-Fi é o servidor que armazena os sites."
          ],
          "correct": 2,
          "feedback": "O Wi-Fi liga o seu computador ao roteador da sua casa sem precisar de fios. O roteador então precisa estar conectado à Internet real. Se a internet do provedor cair, o Wi-Fi continuará ligado, mas sem conexão com a Internet.",
          "xp": 20
        },
        {
          "id": "fc6",
          "type": "choice",
          "context": "Você está tentando acessar um site, mas ele não abre. Seu computador está ligado e o navegador funciona.",
          "question": "Qual conclusão é mais correta?",
          "options": [
            "O navegador deixou de ser Internet.",
            "O problema necessariamente está no computador.",
            "Existem várias possibilidades: conexão, rede, servidor, endereço digitado ou outros fatores.",
            "Todo site precisa estar armazenado dentro do computador."
          ],
          "correct": 2,
          "feedback": "A Internet é composta por várias partes: seu aparelho, seu roteador, seu provedor, os cabos pelo mundo e o servidor de destino. Uma falha em qualquer desses pontos impede o acesso.",
          "xp": 20
        },
        {
          "id": "fc7",
          "type": "choice",
          "context": "Imagine que uma pessoa que nunca estudou informática perguntou:\n\n'Quando eu digito um site no navegador, como ele aparece na minha tela?'\n\nVocê precisa explicar isso para ela.",
          "question": "Qual é a melhor resposta?",
          "options": [
            "O navegador já possui todos os sites armazenados dentro dele.",
            "O Wi-Fi cria o site quando você pede.",
            "O navegador solicita a informação pela rede, a solicitação chega aos servidores e os dados retornam para que o navegador apresente a página.",
            "A Internet é um programa instalado no computador que contém todos os sites."
          ],
          "correct": 2,
          "feedback": "Exato! Essa é uma explicação simplificada, mas correta para o nível desta aula. O navegador é a ferramenta que faz a solicitação, a Internet fornece a infraestrutura de comunicação e os servidores disponibilizam os dados necessários para o conteúdo ser apresentado.",
          "xp": 40
        }
      ],
      "competencies": [
        {
          "name": "Internet x Web",
          "score": 100
        },
        {
          "name": "URL e Domínios",
          "score": 100
        },
        {
          "name": "Funcionamento da Rede",
          "score": 80
        },
        {
          "name": "Aplicação dos Conceitos",
          "score": 100
        }
      ]
    }
  },
  {
    "id": "m3-aula-2",
    "number": 2,
    "title": "Mecanismos de Busca e Pesquisas na Internet",
    "badge": "Aula 2 • Pesquisa & Fontes",
    "duration": "1h 45m",
    "xpReward": 150,
    "videoUrl": "https://youtu.be/47dDVkvlEmM",
    "presentation": {
      "headline": "Dominando os Mecanismos de Busca",
      "subtitle": "Aprenda a pesquisar, filtrar resultados e avaliar a confiabilidade das fontes.",
      "description": "Na Aula 1 você descobriu como a Internet funciona por trás dos panos. Agora, vamos dominar os navegadores e aprender a pesquisar informações de forma eficiente e segura usando técnicas avançadas no Google e outras ferramentas.",
      "coverImage": "images/m3/aula2/slide_1.png",
      "objectives": [
        "Entender como os mecanismos de busca funcionam",
        "Utilizar palavras-chave corretamente para pesquisas eficientes",
        "Analisar anúncios patrocinados vs. resultados orgânicos",
        "Avaliar fontes (Data, autor, contexto) e identificar informações confiáveis",
        "Praticar em Desafios de Detetive da Internet"
      ]
    },
    "slides": [
      {
        "id": 1,
        "title": "Dominando a Internet: Navegação e Pesquisa",
        "src": "images/m3/aula2/slide_1.png"
      },
      {
        "id": 2,
        "title": "O Desafio da Aula",
        "src": "images/m3/aula2/slide_2.png"
      },
      {
        "id": 3,
        "title": "Navegando com Eficiência",
        "src": "images/m3/aula2/slide_3.png"
      },
      {
        "id": 4,
        "title": "Atalhos que Todo Usuário Deveria Conhecer",
        "src": "images/m3/aula2/slide_4.png"
      },
      {
        "id": 5,
        "title": "Organizando sua Navegação",
        "src": "images/m3/aula2/slide_5.png"
      },
      {
        "id": 6,
        "title": "Como o Google Encontra Resultados?",
        "src": "images/m3/aula2/slide_6.png"
      },
      {
        "id": 7,
        "title": "Pesquisando Melhor com Palavras-Chave",
        "src": "images/m3/aula2/slide_7.png"
      },
      {
        "id": 8,
        "title": "Técnicas Avançadas de Pesquisa",
        "src": "images/m3/aula2/slide_8.png"
      },
      {
        "id": 9,
        "title": "Encontrando Informações em Páginas Longas",
        "src": "images/m3/aula2/slide_9.png"
      },
      {
        "id": 10,
        "title": "Escolhendo o Tipo Certo de Resultado",
        "src": "images/m3/aula2/slide_10.png"
      },
      {
        "id": 11,
        "title": "Resultado vs. Anúncio Patrocinado",
        "src": "images/m3/aula2/slide_11.png"
      },
      {
        "id": 12,
        "title": "Como Saber se uma Informação é Confiável?",
        "src": "images/m3/aula2/slide_12.png"
      },
      {
        "id": 13,
        "title": "Missão Prática: Desafio Internet",
        "src": "images/m3/aula2/slide_13.png"
      },
      {
        "id": 14,
        "title": "Resumo & Próxima Aula",
        "src": "images/m3/aula2/slide_14.png"
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Ao pesquisar no Google, qual a diferença entre um resultado patrocinado e um orgânico?",
        "options": [
          "Não há diferença, todos são sites confiáveis escolhidos a dedo pelo Google.",
          "O resultado patrocinado pagou para aparecer nas primeiras posições, enquanto o orgânico conquistou o lugar por relevância.",
          "O resultado orgânico é sempre uma notícia falsa.",
          "O Google só mostra resultados patrocinados."
        ],
        "correct": 1,
        "explanation": "Isso mesmo! Anunciantes pagam (Patrocinado) para aparecer no topo. Os resultados orgânicos são rankeados pela relevância que o algoritmo do buscador calcula."
      },
      {
        "id": "q2",
        "question": "Como podemos melhorar a precisão de uma pesquisa sobre um termo específico?",
        "options": [
          "Digitando frases extremamente longas contando uma história para o Google.",
          "Utilizando aspas ao redor do termo, como: \"curso de informática básica\".",
          "Sempre pesquisando em letras maiúsculas.",
          "Escrevendo palavras soltas aleatórias."
        ],
        "correct": 1,
        "explanation": "Perfeito! Usar aspas faz com que o mecanismo de busca encontre exatamente aquela frase, na mesma ordem das palavras."
      },
      {
        "id": "q3",
        "question": "O que é mais importante ao avaliar se uma fonte (site ou artigo) é confiável?",
        "options": [
          "Checar se tem muita imagem bonita.",
          "Acreditar em qualquer coisa que estiver no primeiro resultado do Google.",
          "Verificar a data de publicação, quem é o autor, e comparar com outras fontes.",
          "Ver se a cor do site é verde."
        ],
        "correct": 2,
        "explanation": "Correto. Fontes confiáveis costumam ter um autor claro, data de publicação recente ou identificada, e são corroboradas por outros sites respeitáveis."
      },
      {
        "id": "q4",
        "question": "Para que serve o atalho 'Ctrl+F' (ou 'Cmd+F' no Mac) em uma página da web?",
        "options": [
          "Para fechar a aba atual do navegador.",
          "Para abrir as configurações do computador.",
          "Para pesquisar e encontrar uma palavra ou frase específica dentro daquela página.",
          "Para atualizar a página quando ela trava."
        ],
        "correct": 2,
        "explanation": "Excelente! O atalho Ctrl+F abre uma pequena barra de pesquisa que permite localizar rapidamente qualquer palavra no texto de uma página longa."
      },
      {
        "id": "q5",
        "question": "Qual o recurso do navegador permite salvar seus sites preferidos para acessá-los rapidamente depois?",
        "options": [
          "O Histórico de downloads.",
          "A barra de Favoritos (ou Bookmarks).",
          "O modo de navegação anônima.",
          "O botão de atualizar página."
        ],
        "correct": 1,
        "explanation": "Correto! Salvar um site nos Favoritos cria um atalho fácil para você voltar a ele sem precisar pesquisar novamente."
      },
      {
        "id": "q6",
        "question": "Se você quiser excluir uma palavra da sua pesquisa no Google (ex: pesquisar 'manga' fruta, mas não a roupa), o que você deve fazer?",
        "options": [
          "Escrever 'manga não roupa'.",
          "Usar o sinal de menos (-) logo antes da palavra que deseja excluir, ex: manga -roupa.",
          "Colocar tudo entre aspas.",
          "Pesquisar normalmente e ignorar os resultados errados."
        ],
        "correct": 1,
        "explanation": "Isso mesmo! O sinal de menos (-) atua como um filtro, removendo dos resultados as páginas que contenham a palavra indesejada."
      },
      {
        "id": "q7",
        "question": "Onde podemos verificar quais sites foram visitados recentemente no nosso navegador?",
        "options": [
          "No Histórico de navegação.",
          "Na lixeira do Windows.",
          "Nas configurações de tela.",
          "No painel de controle."
        ],
        "correct": 0,
        "explanation": "Muito bem! O Histórico guarda o registro das páginas que você acessou, útil caso queira voltar a um site que esqueceu de salvar."
      },
      {
        "id": "q8",
        "question": "Por que é fundamental verificar a data de publicação de uma notícia ou artigo na internet?",
        "options": [
          "Porque artigos antigos sempre contêm vírus.",
          "Para garantir que a informação ainda é válida e não está desatualizada.",
          "Porque o Google apaga artigos com mais de um ano.",
          "Para saber quanto tempo o autor levou para escrever."
        ],
        "correct": 1,
        "explanation": "Exatamente! Especialmente em temas como tecnologia, leis ou notícias, uma informação de anos atrás pode não ser mais a realidade atual."
      },
      {
        "id": "q9",
        "question": "Ao procurar exclusivamente por fotografias ou ilustrações de um tema, qual ferramenta de busca do Google é a mais indicada?",
        "options": [
          "Google Maps.",
          "Google Shopping.",
          "Google Imagens.",
          "Google Tradutor."
        ],
        "correct": 2,
        "explanation": "Isso! O Google Imagens filtra os resultados para mostrar apenas arquivos visuais relacionados ao termo que você pesquisou."
      },
      {
        "id": "q10",
        "question": "O que fazem os atalhos de teclado, como Ctrl+T (abrir nova aba) ou Ctrl+W (fechar aba), durante o uso da internet?",
        "options": [
          "Eles deixam a internet mais rápida.",
          "Agilizam a navegação substituindo cliques do mouse por combinações rápidas no teclado.",
          "Eles servem para consertar problemas de conexão.",
          "São códigos para acessar a dark web."
        ],
        "correct": 1,
        "explanation": "Correto! Atalhos de teclado são atalhos práticos que economizam tempo e aumentam sua produtividade ao navegar."
      }
    ],
    "finalChallenge": {
      "title": "🔍 DESAFIO FINAL — MESTRE DAS BUSCAS",
      "subtitle": "Aplique suas habilidades de pesquisa para resolver situações do dia a dia.",
      "questions": [
        {
          "id": "a2_fc1",
          "type": "choice",
          "context": "Você precisa comprar um tênis específico e pesquisa 'Tênis de corrida XZ'. Os três primeiros resultados possuem a palavra 'Patrocinado' ao lado.",
          "question": "O que isso significa?",
          "options": [
            "São os sites mais confiáveis e seguros escolhidos pelo Google.",
            "São lojas que pagaram para aparecer no topo da sua pesquisa.",
            "São resultados falsos que roubarão seus dados.",
            "São os sites mais baratos da internet."
          ],
          "correct": 1,
          "feedback": "Correto! Anúncios patrocinados significam que a empresa pagou para o buscador exibi-los no topo para aquela palavra-chave.",
          "xp": 20
        },
        {
          "id": "a2_fc2",
          "type": "choice",
          "context": "Você precisa encontrar um documento exato que tem a frase: 'Relatório financeiro anual 2023'.",
          "question": "Como você digitaria no Google para encontrar APENAS páginas com essa frase exata?",
          "options": [
            "Relatório financeiro anual 2023",
            "URGENTE Relatório financeiro anual 2023",
            "\"Relatório financeiro anual 2023\"",
            "Relatório + financeiro + anual + 2023"
          ],
          "correct": 2,
          "feedback": "Perfeito! Usar aspas duplas obriga o Google a procurar páginas que contenham as palavras exatamente naquela ordem.",
          "xp": 20
        },
        {
          "id": "a2_fc3",
          "type": "ordering",
          "context": "Você recebeu uma notícia chocante no WhatsApp e quer verificar se é verdade.",
          "question": "Organize os passos ideais de verificação:",
          "items": [
            "Não repassar a mensagem imediatamente",
            "Identificar os termos principais da notícia",
            "Pesquisar os termos no Google",
            "Ler a notícia em um portal de jornalismo confiável",
            "Avisar quem te enviou se a notícia for falsa"
          ],
          "feedback": "Excelente! Segurar a emoção e não repassar imediatamente é o passo mais importante para combater Fake News.",
          "xp": 20
        },
        {
          "id": "a2_fc4",
          "type": "choice",
          "context": "Você acessou um blog que ensina uma dieta 'milagrosa'. O site não tem nome de autor, não tem data e está cheio de botões vermelhos piscando.",
          "question": "Esta é uma fonte de pesquisa confiável?",
          "options": [
            "Sim, se está na internet é porque foi aprovado.",
            "Sim, os botões vermelhos indicam urgência médica.",
            "Não. Sites confiáveis geralmente possuem autor identificado, data de publicação e design limpo sem exageros.",
            "Não, porque a cor vermelha é proibida na web."
          ],
          "correct": 2,
          "feedback": "Isso mesmo! Sempre avalie a autoria, a data e a apresentação visual (excesso de anúncios ou apelos emocionais são alertas vermelhos).",
          "xp": 20
        },
        {
          "id": "a2_fc5",
          "type": "choice",
          "context": "Seu tio diz que 'o Google sabe tudo e tem todas as respostas corretas do mundo'.",
          "question": "Como você explicaria o papel do Google para ele?",
          "options": [
            "Ele está certo, o Google cria todo o conhecimento humano.",
            "O Google é apenas um índice organizador; ele não cria as informações, apenas mostra o que outras pessoas publicaram na web.",
            "O Google é uma enciclopédia escrita pelos seus próprios funcionários.",
            "O Google só mostra informações de sites do governo."
          ],
          "correct": 1,
          "feedback": "Exato! O buscador é como uma gigantesca lista telefônica: ele apenas aponta onde a informação está, cabendo a você julgar se quem escreveu estava certo ou não.",
          "xp": 40
        }
      ],
      "competencies": [
        {
          "name": "Mecânica de Busca",
          "score": 100
        },
        {
          "name": "Filtros e Operadores",
          "score": 100
        },
        {
          "name": "Avaliação de Fontes",
          "score": 90
        },
        {
          "name": "Combate a Fake News",
          "score": 100
        }
      ]
    }
  },
  {
    "id": "m3-aula-3",
    "number": 3,
    "title": "Segurança Digital e Prevenção de Golpes",
    "badge": "Aula 3 • Segurança & Privacidade",
    "duration": "1h 30m",
    "xpReward": 200,
    "videoUrl": "https://youtu.be/C72r-QcojpU",
    "presentation": {
      "headline": "Navegando com Segurança na Internet",
      "subtitle": "Aprenda a proteger seus dados, criar senhas imbatíveis e reconhecer golpes online.",
      "description": "A Internet é cheia de oportunidades, mas também possui armadilhas. Nesta aula, você aprenderá as melhores práticas para manter suas contas seguras, identificar mensagens falsas e agir caso algo dê errado.",
      "coverImage": "images/m3/aula3/slide_1.png",
      "objectives": [
        "Criar e utilizar senhas mais seguras e não reutilizá-las",
        "Reconhecer sites suspeitos e links potencialmente perigosos",
        "Diferenciar mensagens legítimas de tentativas de fraude (Phishing)",
        "Utilizar autenticação em dois fatores (2FA) para proteger dados pessoais",
        "Saber como agir caso uma conta seja comprometida"
      ]
    },
    "slides": [
      {
        "id": 1,
        "title": "Segurança Digital: Protegendo o que importa",
        "src": "images/m3/aula3/slide_1.png"
      },
      {
        "id": 2,
        "title": "A importância das Senhas",
        "src": "images/m3/aula3/slide_2.png"
      },
      {
        "id": 3,
        "title": "Nunca Reutilize Senhas",
        "src": "images/m3/aula3/slide_3.png"
      },
      {
        "id": 4,
        "title": "Reconhecendo Sites Suspeitos",
        "src": "images/m3/aula3/slide_4.png"
      },
      {
        "id": 5,
        "title": "Identificando Links Perigosos",
        "src": "images/m3/aula3/slide_5.png"
      },
      {
        "id": 6,
        "title": "Golpes Comuns (Phishing)",
        "src": "images/m3/aula3/slide_6.png"
      },
      {
        "id": 7,
        "title": "Como Identificar Mensagens Falsas",
        "src": "images/m3/aula3/slide_7.png"
      },
      {
        "id": 8,
        "title": "O que Fazer ao Receber Mensagem Suspeita?",
        "src": "images/m3/aula3/slide_8.png"
      },
      {
        "id": 9,
        "title": "Protegendo Dados Pessoais",
        "src": "images/m3/aula3/slide_9.png"
      },
      {
        "id": 10,
        "title": "Autenticação em Dois Fatores (2FA)",
        "src": "images/m3/aula3/slide_10.png"
      },
      {
        "id": 11,
        "title": "Conta Comprometida: Como Agir?",
        "src": "images/m3/aula3/slide_11.png"
      },
      {
        "id": 12,
        "title": "Recuperação de Acesso",
        "src": "images/m3/aula3/slide_12.png"
      },
      {
        "id": 13,
        "title": "Resumo e Encerramento",
        "src": "images/m3/aula3/slide_13.png"
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Qual das opções abaixo representa a melhor prática na hora de criar e gerenciar senhas?",
        "options": [
          "Usar a mesma senha para todas as redes sociais e e-mails para não esquecer.",
          "Criar senhas complexas e usar uma senha diferente para cada serviço importante.",
          "Usar sua data de nascimento para facilitar a memorização.",
          "Anotar todas as senhas em um arquivo de texto não protegido na Área de Trabalho."
        ],
        "correct": 1,
        "explanation": "Excelente! Senhas fortes e únicas para cada serviço evitam que todas as suas contas sejam comprometidas caso uma senha vaze."
      },
      {
        "id": "q2",
        "question": "Você recebeu um e-mail urgente do seu 'banco' pedindo para clicar em um link e confirmar sua senha. O que você deve fazer?",
        "options": [
          "Clicar no link imediatamente e preencher os dados, afinal é urgente.",
          "Responder ao e-mail perguntando se é verdade.",
          "Ignorar a mensagem, não clicar em nada e, na dúvida, acessar o aplicativo oficial.",
          "Encaminhar para seus amigos para avisá-los do bloqueio."
        ],
        "correct": 2,
        "explanation": "Correto! Isso é um exemplo clássico de Phishing. Bancos não pedem confirmação de senha por links de e-mail ou SMS."
      },
      {
        "id": "q3",
        "question": "O que é a Autenticação em Dois Fatores (2FA)?",
        "options": [
          "É um antivírus que roda em duas etapas no computador.",
          "É uma camada extra de segurança que exige um código enviado para seu celular (ou app) além da senha.",
          "É uma regra que obriga a digitar a senha duas vezes seguidas para entrar.",
          "É o processo de criar duas contas diferentes na mesma rede social."
        ],
        "correct": 1,
        "explanation": "Perfeito! Mesmo que descubram sua senha, não conseguirão entrar na conta sem o código de segurança do seu celular."
      },
      {
        "id": "q4",
        "question": "Se você suspeitar que sua conta foi invadida, qual deve ser seu primeiro passo?",
        "options": [
          "Deletar o aplicativo e nunca mais usá-lo.",
          "Avisar as pessoas mais próximas sobre o ocorrido e tentar recuperar a conta através dos canais oficiais.",
          "Esperar algumas semanas para ver se o invasor desiste e devolve a conta.",
          "Criar uma nova conta com a mesma senha."
        ],
        "correct": 1,
        "explanation": "Exato! Alertar contatos previne que sejam extorquidos, e você deve usar o suporte oficial para recuperar o acesso e trocar a senha imediatamente."
      },
      {
        "id": "q5",
        "question": "Por que é extremamente arriscado utilizar a mesma senha em vários sites e aplicativos?",
        "options": [
          "Porque o computador fica lento a cada novo site cadastrado com a mesma senha.",
          "Porque se um único site sofrer vazamento de dados, criminosos poderão invadir todas as suas outras contas.",
          "Porque os navegadores bloqueiam automaticamente senhas repetidas após 24 horas.",
          "Não há risco algum, desde que a senha contenha números e letras."
        ],
        "correct": 1,
        "explanation": "Excelente! É o efeito dominó: ao descobrir sua senha em um cadastro simples, criminosos testam a mesma combinação no seu e-mail, redes sociais e bancos."
      },
      {
        "id": "q6",
        "question": "Ao receber um link com endereço suspeito (ex: 'loja-ofertas-imperdiveis.xyz/premio'), qual sinal indica risco iminente de golpe?",
        "options": [
          "O link ter letras maiúsculas e minúsculas.",
          "O nome do domínio ser diferente do site oficial e usar extensões incomuns para enganar quem não repara com atenção.",
          "O link conter a barra normal (/), que só existe em sites proibidos.",
          "O texto da mensagem ter pontuação correta."
        ],
        "correct": 1,
        "explanation": "Correto! Criminosos criam nomes de domínios muito parecidos com os oficiais, mas com extensões estranhas (.xyz, .top) ou pequenas alterações de letras para induzir a vítima ao erro."
      },
      {
        "id": "q7",
        "question": "Qual gatilho psicológico é mais utilizado por criminosos em mensagens falsas de phishing para induzir a vítima ao erro?",
        "options": [
          "Senso de urgência extrema ou ameaça imediata (ex: 'Sua conta será cancelada em 1 hora' ou 'Resgate seu prêmio agora').",
          "Paciência exagerada, informando que você tem 1 ano para responder.",
          "Solicitação formal com carta registrada enviada pelos Correios.",
          "Uso de termos técnicos científicos que dão sono ao leitor."
        ],
        "correct": 0,
        "explanation": "Isso mesmo! O imediatismo gera ansiedade e pânico, fazendo a pessoa clicar sem pensar ou sem conferir a autenticidade do remetente."
      },
      {
        "id": "q8",
        "question": "Uma pessoa liga para você dizendo ser atendente do seu banco e pede o código de 6 dígitos que acabou de chegar por SMS no seu celular. O que você deve fazer?",
        "options": [
          "Informar o código imediatamente para comprovar sua identidade.",
          "Desligar imediatamente e nunca compartilhar o código, pois bancos legítimos jamais pedem códigos de SMS por telefone.",
          "Pedir para a pessoa retornar a ligação no dia seguinte para confirmar o código.",
          "Digitar o código no teclado numérico do telefone durante a chamada."
        ],
        "correct": 1,
        "explanation": "Perfeito! Códigos enviados por SMS ou gerados em aplicativos autenticadores são senhas temporárias de uso pessoal. Quem pede seu código está tentando invadir sua conta."
      },
      {
        "id": "q9",
        "question": "Você recebeu um e-mail de um remetente desconhecido com um anexo intitulado 'Fatura_Vencida_Comprovante.exe'. Como você deve proceder?",
        "options": [
          "Dar dois cliques no arquivo para abrir e conferir se a cobrança é legítima.",
          "Não abrir nem executar o arquivo, pois extensões como .exe, .scr e .bat são programas executáveis que podem instalar vírus e malwares.",
          "Renomear o arquivo para .pdf para que ele se torne um documento seguro de texto.",
          "Encaminhar o e-mail para todos os seus contatos para verificar se alguém conhece a conta."
        ],
        "correct": 1,
        "explanation": "Exato! Documentos legítimos são enviados em formato PDF. Arquivos executáveis (.exe) enviados por e-mail ou mensagens são a principal via de infecção por vírus e sequestro de dados (ransomware)."
      },
      {
        "id": "q10",
        "question": "Ao utilizar uma rede Wi-Fi pública aberta (em shoppings, praças ou aeroportos), qual cuidado básico de segurança é fundamental?",
        "options": [
          "Salvar todas as senhas no navegador para não precisar digitá-las novamente.",
          "Evitar acessar contas bancárias ou digitar dados confidenciais e sempre encerrar as sessões (Logout) ao terminar.",
          "Abaixar o brilho da tela do computador para que a rede não transmita seus dados.",
          "Desconectar o cabo de energia para que o sinal não passe pela tomada."
        ],
        "correct": 1,
        "explanation": "Muito bem! Em redes públicas sem senha, qualquer pessoa conectada pode monitorar o tráfego de dados não protegidos. Por isso, evite transações financeiras e faça Logout ao sair."
      }
    ],
    "finalChallenge": {
      "title": "🛡️ DESAFIO FINAL — DETETIVE DA SEGURANÇA",
      "subtitle": "Mostre que você domina a proteção de dados, identifica armadilhas e sabe agir como um especialista.",
      "questions": [
        {
          "id": "a3_fc1",
          "type": "choice",
          "context": "Você precisa criar uma senha para a sua nova conta de e-mail principal (onde você recebe códigos de recuperação de todos os seus serviços).",
          "question": "Qual destas opções representa a criação mais segura segundo as melhores práticas?",
          "options": [
            "maria1234",
            "12345678",
            "BoloDeCenoura!@#2024",
            "senha"
          ],
          "correct": 2,
          "feedback": "Perfeito! Senhas fortes combinam letras maiúsculas, minúsculas, números e caracteres especiais, formando frases memorizáveis e de grande extensão.",
          "xp": 20
        },
        {
          "id": "a3_fc2",
          "type": "choice",
          "context": "Você recebeu um SMS: 'AVISO URGENTE: Seu cartão foi bloqueado por suspeita de fraude! Acesse http://banco-seguro-urgente.com para desbloquear agora.'",
          "question": "Qual é a atitude correta e segura a ser tomada?",
          "options": [
            "Clicar imediatamente e colocar a senha do cartão, pois é urgente.",
            "Ignorar o link do SMS, abrir o aplicativo oficial do banco no celular ou ligar para o número no verso do seu cartão físico.",
            "Responder o SMS enviando seu CPF e número de agência.",
            "Acessar o link apenas para olhar a página, sem digitar nada."
          ],
          "correct": 1,
          "feedback": "Excelente! Nunca ceda ao imediatismo (urgência) e não clique em links recebidos por SMS ou e-mail. Vá sempre pelo canal oficial que você já conhece.",
          "xp": 20
        },
        {
          "id": "a3_fc3",
          "type": "choice",
          "context": "No ambiente de segurança da informação, muito se fala sobre o perigo do 'Phishing'.",
          "question": "Como você definiria 'Phishing' de forma clara e precisa?",
          "options": [
            "Uma técnica para acelerar a conexão Wi-Fi através do navegador.",
            "Um tipo de golpe onde criminosos usam 'iscas' (mensagens falsas e sites clonados) para induzir a vítima a entregar senhas e dados voluntariamente.",
            "Um antivírus gratuito instalado automaticamente pelo Windows.",
            "Um programa que limpa arquivos duplicados do disco rígido."
          ],
          "correct": 1,
          "feedback": "Correto! O Phishing se aproveita de disfarces (bancos, lojas, órgãos públicos) para 'pescar' as credenciais da vítima através de armadilhas psicológicas.",
          "xp": 20
        },
        {
          "id": "a3_fc4",
          "type": "ordering",
          "context": "Sua conta em uma rede social foi invadida e você percebeu que o invasor alterou a senha.",
          "question": "Ordene o passo a passo prioritário para conter danos e recuperar o controle da sua identidade digital:",
          "items": [
            "Acessar a tela oficial de login e utilizar a opção 'Esqueci minha senha / Recuperar conta'",
            "Alterar imediatamente a senha do e-mail vinculado à conta para garantir que o invasor não o controle",
            "Avisar contatos e familiares por outra rede para que não caiam em pedidos de dinheiro ou golpes",
            "Ativar a Autenticação em Dois Fatores (2FA) e encerrar todas as outras sessões ativas"
          ],
          "feedback": "Muito bem! Essa é a sequência profissional: tentar a recuperação oficial, proteger o e-mail que é a chave-mestra, alertar sua rede contra extorsões e blindar com 2FA.",
          "xp": 30
        },
        {
          "id": "a3_fc5",
          "type": "choice",
          "context": "Um conhecido disse que 'Autenticação em Dois Fatores (2FA) é perda de tempo e só serve para atrasar o login'.",
          "question": "Como você justifica a importância indiscutível do 2FA?",
          "options": [
            "Realmente é perda de tempo, pois antivírus comuns já protegem tudo sozinhos.",
            "O 2FA garante que, mesmo que alguém descubra ou vaze a sua senha, o invasor não conseguirá acessar sua conta sem o código exclusivo gerado no seu dispositivo pessoal.",
            "O 2FA economiza a bateria do computador e reduz o consumo de dados da internet.",
            "O 2FA apaga automaticamente seu histórico de pesquisa após cada navegação."
          ],
          "correct": 1,
          "feedback": "Exato! Senhas vazam todos os dias na internet. A segunda camada de verificação é a barreira física que impede o invasor de entrar na sua conta.",
          "xp": 20
        },
        {
          "id": "a3_fc6",
          "type": "url-analysis",
          "context": "Você recebeu um e-mail avisando sobre uma suposta compra cancelada com o link abaixo. Como perito de segurança digital, analise os elementos deste link suspeito:",
          "url": "http://seguranca-portal-bancario.xyz/recadastramento",
          "parts": [
            {
              "label": "Protocolo Inseguro",
              "value": "http://"
            },
            {
              "label": "Domínio Clonado Suspeito",
              "value": "seguranca-portal-bancario.xyz"
            },
            {
              "label": "Caminho da Isca",
              "value": "/recadastramento"
            }
          ],
          "feedback": "Excelente olho clínico! O link não usa HTTPS criptografado ('http://' sem o 's' de segurança), o domínio é falso com terminação '.xyz' imitando um banco, e o caminho aponta para uma página falsa de captura de dados.",
          "xp": 30
        },
        {
          "id": "a3_fc7",
          "type": "choice",
          "context": "Você recebe uma mensagem no WhatsApp de um número novo com a foto do seu parente dizendo:\n\n'Oi! Troquei de número porque meu celular quebrou. Preciso pagar uma fatura urgente agora e meu aplicativo não está abrindo. Você consegue fazer um Pix de R$ 380 para mim que te devolvo amanhã cedo?'",
          "question": "Qual é o procedimento de segurança correto diante dessa situação?",
          "options": [
            "Fazer o Pix imediatamente, afinal a foto do perfil é do seu parente e ele disse que era urgente.",
            "Bloquear o número imediatamente sem falar com ninguém da família.",
            "Ligar para o número antigo do seu parente ou fazer uma chamada de voz/vídeo para confirmar a identidade diretamente antes de realizar qualquer envio financeiro.",
            "Responder perguntando os dados bancários e transferir metade do valor para ajudar."
          ],
          "correct": 2,
          "feedback": "Perfeito! Esse é o clássico golpe do 'novo número' por engenharia social. Criminosos copiam fotos públicas e contatam familiares simulando emergências. Nunca faça pagamentos sem confirmar por voz ou pessoalmente!",
          "xp": 40
        }
      ],
      "competencies": [
        {
          "name": "Criação e Gestão de Senhas",
          "score": 100
        },
        {
          "name": "Prevenção a Phishing e Engenharia Social",
          "score": 100
        },
        {
          "name": "Inspeção de Links e URLs Suspeitas",
          "score": 100
        },
        {
          "name": "Proteção com Dois Fatores (2FA)",
          "score": 100
        },
        {
          "name": "Resposta a Incidentes e Golpes",
          "score": 100
        }
      ]
    }
  },
  {
    "id": "m3-aula-4",
    "number": 4,
    "title": "E-mail Profissional",
    "badge": "Aula 4 • Comunicação Digital",
    "duration": "1h 15m",
    "xpReward": 200,
    "videoUrl": "https://www.youtube.com/watch?v=k5_dY8YkKGs",
    "presentation": {
      "headline": "Dominando o Correio Eletrônico",
      "subtitle": "Como usar o e-mail com clareza, segurança e profissionalismo.",
      "description": "O e-mail vai além da conversa casual: é uma ferramenta indispensável para trabalhar, estudar e se comunicar de forma profissional. Aprenda a estruturar mensagens, gerenciar sua caixa de entrada e identificar tentativas de fraude.",
      "coverImage": "images/m3/aula4/slide_1.png",
      "objectives": [
        "Enviar, receber e gerenciar e-mails",
        "Entender a anatomia do e-mail (Para, Assunto, Anexos)",
        "Escrever mensagens com estrutura profissional",
        "Diferenciar Caixa de Entrada, Rascunhos, Spam e Lixeira",
        "Criar uma conta no Gmail e dar os primeiros passos"
      ]
    },
    "slides": [
      {
        "id": 1,
        "title": "E-mail e Comunicação Digital",
        "src": "images/m3/aula4/slide_1.png"
      },
      {
        "id": 2,
        "title": "Objetivos da Aula",
        "src": "images/m3/aula4/slide_2.png"
      },
      {
        "id": 3,
        "title": "E-mail no Dia a Dia",
        "src": "images/m3/aula4/slide_3.png"
      },
      {
        "id": 4,
        "title": "Conhecendo a Caixa de Entrada",
        "src": "images/m3/aula4/slide_4.png"
      },
      {
        "id": 5,
        "title": "Anatomia de um E-mail",
        "src": "images/m3/aula4/slide_5.png"
      },
      {
        "id": 6,
        "title": "Como Escrever um Bom E-mail",
        "src": "images/m3/aula4/slide_6.png"
      },
      {
        "id": 7,
        "title": "Segurança: Sinais de Alerta",
        "src": "images/m3/aula4/slide_7.png"
      },
      {
        "id": 8,
        "title": "Spam e Phishing",
        "src": "images/m3/aula4/slide_8.png"
      },
      {
        "id": 9,
        "title": "O que é o Correio Eletrônico?",
        "src": "images/m3/aula4/slide_9.png"
      },
      {
        "id": 10,
        "title": "Conhecendo o Gmail",
        "src": "images/m3/aula4/slide_10.png"
      },
      {
        "id": 11,
        "title": "Passo a passo (1)",
        "src": "images/m3/aula4/slide_11.png"
      },
      {
        "id": 12,
        "title": "Passo a passo (2)",
        "src": "images/m3/aula4/slide_12.png"
      },
      {
        "id": 13,
        "title": "Passo a passo (3)",
        "src": "images/m3/aula4/slide_13.png"
      },
      {
        "id": 14,
        "title": "Passo a passo (4)",
        "src": "images/m3/aula4/slide_14.png"
      },
      {
        "id": 15,
        "title": "Passo a passo (5)",
        "src": "images/m3/aula4/slide_15.png"
      },
      {
        "id": 16,
        "title": "Passo a passo (6)",
        "src": "images/m3/aula4/slide_16.png"
      },
      {
        "id": 17,
        "title": "Passo a passo (7)",
        "src": "images/m3/aula4/slide_17.png"
      },
      {
        "id": 18,
        "title": "Bem-vindo ao Gmail",
        "src": "images/m3/aula4/slide_18.png"
      },
      {
        "id": 19,
        "title": "Parabéns, você já tem seu e-mail!",
        "src": "images/m3/aula4/slide_19.png"
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "Na anatomia de um e-mail, qual é a finalidade principal do campo 'Assunto'?",
        "options": [
          "Escrever a mensagem inteira para economizar tempo.",
          "Inserir o endereço de quem vai receber o e-mail.",
          "Resumir o tema principal ou objetivo da mensagem.",
          "Anexar os arquivos e documentos."
        ],
        "correct": 2,
        "explanation": "Isso mesmo! O Assunto serve como um título que avisa o destinatário sobre o que se trata o e-mail antes mesmo dele abri-lo."
      },
      {
        "id": "q2",
        "question": "Qual a estrutura recomendada para se escrever um bom e-mail profissional?",
        "options": [
          "Saudação → Objetivo → Informação complementar → Encerramento.",
          "Apenas enviar o anexo sem escrever nada.",
          "Objetivo → Despedida → Saudação.",
          "Usar letras maiúsculas para chamar atenção."
        ],
        "correct": 0,
        "explanation": "Perfeito! Começar com um 'Olá', explicar o motivo do contato de forma clara, adicionar detalhes e encerrar com um 'Atenciosamente' mostra profissionalismo."
      },
      {
        "id": "q3",
        "question": "O que caracteriza os e-mails classificados como 'Spam'?",
        "options": [
          "São e-mails enviados exclusivamente pelo seu chefe ou colegas de trabalho.",
          "Mensagens indesejadas, geralmente enviadas em massa com fins publicitários.",
          "São os e-mails que você deixou salvos nos 'Rascunhos'.",
          "É o sistema de antivírus integrado no e-mail."
        ],
        "correct": 1,
        "explanation": "Exato! Spam são correspondências não solicitadas. O Gmail costuma filtrá-las automaticamente para a pasta de Spam."
      },
      {
        "id": "q4",
        "question": "Se você recebe um e-mail escrito com urgência (ex: 'Sua conta será bloqueada!') pedindo para clicar em um link desconhecido, o que provavelmente é isso?",
        "options": [
          "Um comunicado oficial e verdadeiro do seu banco.",
          "Uma mensagem excluída.",
          "Um e-mail enviado por engano.",
          "Uma tentativa de Phishing (golpe para roubar seus dados)."
        ],
        "correct": 3,
        "explanation": "Correto! Golpistas costumam usar o senso de urgência para assustar a vítima e fazê-la clicar em links falsos. Na dúvida, sempre acesse o aplicativo oficial ao invés de clicar em links de e-mail."
      },
      {
        "id": "a4_q5",
        "question": "O que significa o campo 'Cc' e 'Cco' na hora de enviar um e-mail?",
        "options": [
          "'Cc' significa Caixa Correta, 'Cco' significa Caixa Correta Oculta.",
          "'Cc' (Com Cópia) envia o e-mail visível para os outros; 'Cco' (Cópia Oculta) envia sem que os outros vejam quem mais recebeu.",
          "Ambos servem para anexar fotos de tamanho grande.",
          "Servem para cancelar o envio do e-mail."
        ],
        "correct": 1,
        "explanation": "O 'Cco' protege a privacidade dos endereços de e-mail ao enviar uma mensagem para várias pessoas que não se conhecem."
      },
      {
        "id": "a4_q6",
        "question": "É seguro clicar em links de redefinição de senha ou atualização de conta recebidos se você não os solicitou?",
        "options": [
          "Sim, é melhor atualizar sempre.",
          "Não. Muitas vezes são golpes para roubar senhas. Na dúvida, acesse o site oficial pelo navegador.",
          "Sim, o provedor de e-mail nunca deixa golpes passarem.",
          "Sim, mas apenas se o e-mail tiver o logotipo da empresa."
        ],
        "correct": 1,
        "explanation": "Golpes de 'atualização cadastral' e 'senha expirada' são as iscas de phishing mais comuns no e-mail."
      },
      {
        "id": "a4_q7",
        "question": "Qual é a utilidade da pasta 'Rascunhos' (Drafts)?",
        "options": [
          "Salvar as mensagens que já foram enviadas.",
          "Guardar os e-mails excluídos temporariamente.",
          "Armazenar e-mails que você começou a escrever, mas não terminou ou não quis enviar ainda.",
          "Bloquear contatos indesejados."
        ],
        "correct": 2,
        "explanation": "Rascunhos são muito úteis quando precisamos parar de escrever um e-mail para terminar no dia seguinte."
      },
      {
        "id": "a4_q8",
        "question": "Como identificar o remetente real de um e-mail antes de confiar no conteúdo?",
        "options": [
          "Apenas lendo o nome que aparece (ex: 'Banco Central').",
          "Lendo a saudação do e-mail.",
          "Verificando o endereço de e-mail real ao lado do nome (ex: se termina em @gmail.com em vez do domínio oficial).",
          "Não é possível identificar o remetente real."
        ],
        "correct": 2,
        "explanation": "O nome de exibição pode ser falsificado livremente. O endereço real do e-mail revela a verdadeira origem (ex: marcos123@yahoo.com se passando por Netflix)."
      },
      {
        "id": "a4_q9",
        "question": "O que significa 'Encaminhar' (Forward) um e-mail?",
        "options": [
          "Excluir a mensagem para sempre.",
          "Responder apenas para quem enviou a mensagem original.",
          "Enviar a mensagem que você recebeu para uma terceira pessoa que não estava na conversa inicial.",
          "Responder para todos que estavam no e-mail original."
        ],
        "correct": 2,
        "explanation": "Encaminhar repassa a mensagem e seus anexos para outras pessoas que não a haviam recebido originalmente."
      },
      {
        "id": "a4_q10",
        "question": "Por que é importante sempre preencher o campo 'Assunto' de um e-mail?",
        "options": [
          "Porque e-mails sem assunto custam mais caro para enviar.",
          "Porque e-mails sem assunto não podem ter anexos.",
          "Porque o destinatário sabe do que se trata a mensagem antes de abri-la, ajudando na priorização e organização.",
          "Porque a internet só funciona com e-mails com assunto."
        ],
        "correct": 2,
        "explanation": "Um assunto claro e direto (ex: 'Reunião de Vendas - 15/10') mostra profissionalismo e respeito pelo tempo de quem recebe."
      }
    ],
    "finalChallenge": {
      "title": "✉️ DESAFIO FINAL — COMUNICAÇÃO PROFISSIONAL",
      "subtitle": "Prove que você sabe escrever e-mails profissionais e fugir das fraudes de internet.",
      "questions": [
        {
          "id": "a4_fc1",
          "type": "choice",
          "context": "Você precisa enviar um orçamento para um cliente novo chamado Sr. Roberto.",
          "question": "Qual é a estrutura mais profissional e adequada para o corpo desse e-mail?",
          "options": [
            "Olá Sr. Roberto, segue o anexo. Qualquer coisa me liga, valeu!",
            "Prezado Sr. Roberto, \n\nSegue em anexo o orçamento solicitado para o projeto. Fico à disposição para eventuais dúvidas.\n\nAtenciosamente,\n[Seu Nome]",
            "ORÇAMENTO TÁ NO ANEXO ABRE AÍ",
            "Enviar apenas o arquivo em anexo, sem título e sem texto."
          ],
          "correct": 1,
          "feedback": "Perfeito! Um e-mail profissional deve ter saudação (Prezado/Caro/Olá), um corpo claro indicando o anexo e uma despedida cortês (Atenciosamente/Cordialmente).",
          "xp": 20
        },
        {
          "id": "a4_fc2",
          "type": "ordering",
          "context": "Siga a ordem correta para compor e enviar um novo e-mail no Gmail:",
          "question": "Organize as etapas de composição de um e-mail com anexo:",
          "items": [
            "Clicar no botão 'Escrever' (compor)",
            "Digitar o endereço de e-mail no campo 'Para'",
            "Digitar o título no campo 'Assunto'",
            "Escrever a mensagem e clicar no ícone do clipe para anexar o arquivo",
            "Revisar o e-mail e clicar em 'Enviar'"
          ],
          "feedback": "Excelente! Esta é a sequência perfeita para não esquecer de preencher os campos fundamentais e evitar o famoso 'esqueci de anexar'.",
          "xp": 20
        },
        {
          "id": "a4_fc3",
          "type": "choice",
          "context": "Você precisa enviar um relatório para a sua chefe (Ana), mas quer que o diretor (Marcos) e a coordenadora (Paula) recebam uma cópia apenas para conhecimento.",
          "question": "Como você distribuiria os endereços de e-mail?",
          "options": [
            "Colocar todo mundo no campo 'Para'.",
            "Colocar a Ana no 'Para', e o Marcos e a Paula no campo 'Cc' (Com Cópia).",
            "Enviar três e-mails separados com a mesma mensagem.",
            "Colocar todo mundo no 'Cco' (Cópia Oculta)."
          ],
          "correct": 1,
          "feedback": "Isso mesmo! O campo 'Para' indica de quem se espera a ação principal. O campo 'Cc' indica quem deve ser mantido informado.",
          "xp": 20
        },
        {
          "id": "a4_fc4",
          "type": "choice",
          "context": "Você está esperando um e-mail importante da prefeitura, mas ele não aparece na sua 'Caixa de Entrada' principal.",
          "question": "Qual é o primeiro lugar que você deve procurar?",
          "options": [
            "Lixeira",
            "Rascunhos",
            "Caixa de Spam (Lixo Eletrônico)",
            "Compor um novo e-mail"
          ],
          "correct": 2,
          "feedback": "Exato! Muitas vezes, os filtros de segurança dos provedores podem se enganar e jogar e-mails legítimos para a caixa de Spam.",
          "xp": 20
        },
        {
          "id": "a4_fc5",
          "type": "choice",
          "context": "Chegou um e-mail do 'Suporte Correios' dizendo que sua encomenda está retida na alfândega e que você deve pagar R$ 50,00 clicando num link urgente.",
          "question": "O que você faz?",
          "options": [
            "Clico e pago rapidamente para não perder o pacote.",
            "Aviso meus amigos e clico no link para ver do que se trata.",
            "Não clico em nada. Abro uma nova aba, entro no site oficial dos Correios e digito o código de rastreio para verificar.",
            "Respondo o e-mail xingando o golpista."
          ],
          "correct": 2,
          "feedback": "Muito bem! Golpes de rastreio falso são muito comuns. Sempre use os canais oficiais para validar as cobranças.",
          "xp": 40
        }
      ],
      "competencies": [
        {
          "name": "Etiqueta Profissional",
          "score": 100
        },
        {
          "name": "Gestão do Gmail",
          "score": 90
        },
        {
          "name": "Anatomia do E-mail",
          "score": 100
        },
        {
          "name": "Filtro de Spam e Phishing",
          "score": 100
        }
      ]
    }
  },
  {
    "id": "m3-aula-5",
    "number": 5,
    "title": "Serviços Online e Nuvem",
    "badge": "Aula 5 • Produtividade",
    "duration": "1h 00m",
    "xpReward": 200,
    "videoUrl": "https://www.youtube.com/watch?v=placeholder",
    "presentation": {
      "headline": "Dominando os Serviços Online e Nuvem",
      "subtitle": "Aprenda a trabalhar com segurança e agilidade usando a internet.",
      "description": "Descubra como o armazenamento em nuvem facilita o dia a dia, aprenda a usar ferramentas como Google Drive e conheça utilitários digitais indispensáveis para se manter produtivo e organizado de qualquer lugar.",
      "coverImage": "images/aula5/slide_1.png",
      "objectives": [
        "O que é Armazenamento em Nuvem",
        "Como usar o Google Drive ou OneDrive",
        "Compartilhamento seguro de arquivos",
        "Utilitários online essenciais",
        "Diferenciar serviços seguros de duvidosos"
      ]
    },
    "slides": [
      {
        "id": 1,
        "title": "Abertura",
        "src": "images/aula5/slide_1.png"
      },
      {
        "id": 2,
        "title": "O que é Nuvem?",
        "src": "images/aula5/slide_2.png"
      },
      {
        "id": 3,
        "title": "Principais Serviços",
        "src": "images/aula5/slide_3.png"
      },
      {
        "id": 4,
        "title": "Google Drive",
        "src": "images/aula5/slide_4.png"
      },
      {
        "id": 5,
        "title": "OneDrive e Outros",
        "src": "images/aula5/slide_5.png"
      },
      {
        "id": 6,
        "title": "Vantagens da Nuvem",
        "src": "images/aula5/slide_6.png"
      },
      {
        "id": 7,
        "title": "Como Enviar Arquivos",
        "src": "images/aula5/slide_7.png"
      },
      {
        "id": 8,
        "title": "Compartilhamento",
        "src": "images/aula5/slide_8.png"
      },
      {
        "id": 9,
        "title": "Permissões de Acesso",
        "src": "images/aula5/slide_9.png"
      },
      {
        "id": 10,
        "title": "Segurança e Backup",
        "src": "images/aula5/slide_10.png"
      },
      {
        "id": 11,
        "title": "Utilitários Online",
        "src": "images/aula5/slide_11.png"
      },
      {
        "id": 12,
        "title": "Edição de Documentos na Nuvem",
        "src": "images/aula5/slide_12.png"
      },
      {
        "id": 13,
        "title": "Exemplo Prático",
        "src": "images/aula5/slide_13.png"
      },
      {
        "id": 14,
        "title": "Revisão e Próximos Passos",
        "src": "images/aula5/slide_14.png"
      }
    ],
    "quiz": [
      {
        "id": "a5_q1",
        "question": "O que significa salvar um arquivo 'na nuvem'?",
        "options": [
          "Gravar o arquivo num pendrive especial invisível.",
          "Salvar o arquivo em servidores seguros na internet, permitindo acessá-lo de qualquer dispositivo conectado.",
          "Enviar o arquivo por e-mail para si mesmo.",
          "Deixar o computador ligado o tempo todo."
        ],
        "correct": 1,
        "explanation": "Isso mesmo! A nuvem é uma rede mundial de servidores remotos que armazena seus dados de forma segura, permitindo o acesso via internet a qualquer hora."
      },
      {
        "id": "a5_q2",
        "question": "Qual desses serviços é um exemplo de armazenamento em nuvem?",
        "options": [
          "Microsoft Word",
          "Google Drive",
          "Windows Explorer",
          "Adobe Reader"
        ],
        "correct": 1,
        "explanation": "Perfeito! O Google Drive é um dos serviços de nuvem mais populares, junto com o OneDrive da Microsoft e o Dropbox."
      },
      {
        "id": "a5_q3",
        "question": "O que acontece se você perder seu celular, mas tiver o backup automático ativado na nuvem?",
        "options": [
          "Os arquivos são perdidos para sempre junto com o celular.",
          "Os arquivos e fotos poderão ser recuperados simplesmente logando na mesma conta em um novo aparelho.",
          "O celular antigo trava e quebra a tela.",
          "Você precisará pagar uma multa para a operadora de celular."
        ],
        "correct": 1,
        "explanation": "Esse é o maior poder da nuvem: desvincular seus arquivos da máquina física. Seu aparelho pode sumir, mas seus dados ficam intactos nos servidores."
      },
      {
        "id": "a5_q4",
        "question": "Qual a principal vantagem de editar um documento diretamente no Google Docs online?",
        "options": [
          "O documento fica com resolução de cinema.",
          "O salvamento é automático a cada tecla digitada e você não precisa se preocupar em perder o trabalho.",
          "Ele consome toda a memória RAM e trava o computador intencionalmente.",
          "Você pode editar sem usar teclado."
        ],
        "correct": 1,
        "explanation": "Ferramentas como o Google Docs salvam em tempo real. Se acabar a energia na sua casa, nada é perdido."
      },
      {
        "id": "a5_q5",
        "question": "Quando você compartilha uma pasta na nuvem enviando um link com permissão 'Apenas Leitor' para alguém:",
        "options": [
          "A pessoa pode apagar todos os arquivos originais.",
          "A pessoa pode visualizar e baixar os arquivos, mas não pode modificá-los ou apagá-los.",
          "A pessoa vira a dona da pasta permanentemente.",
          "A pessoa ganha acesso livre à senha do seu e-mail."
        ],
        "correct": 1,
        "explanation": "O modo Leitor protege seus arquivos contra exclusões e edições, sendo ótimo para distribuir PDFs, catálogos e fotos."
      },
      {
        "id": "a5_q6",
        "question": "Qual a diferença prática entre 'Sincronizar' um arquivo e fazer apenas o 'Download' manual?",
        "options": [
          "Não há diferença, são sinônimos.",
          "A sincronização mantém o arquivo local e na nuvem sempre iguais automaticamente, o download baixa uma cópia fixa e isolada.",
          "O download é sempre pago, a sincronização é gratuita.",
          "Sincronizar significa enviar o arquivo por Bluetooth para a TV."
        ],
        "correct": 1,
        "explanation": "Programas de sincronização (como o Google Drive for Desktop) detectam que você editou o arquivo no PC e já sobem a versão nova para a nuvem sozinhos."
      },
      {
        "id": "a5_q7",
        "question": "O que é necessário para acessar seus arquivos salvos no OneDrive a partir de um computador emprestado?",
        "options": [
          "Usar um cabo USB muito comprido ligado à sua casa.",
          "Acessar o site do OneDrive e entrar usando seu e-mail e sua senha pessoal.",
          "Ligar para a Microsoft pedindo uma autorização verbal.",
          "Comprar uma licença extra do Windows."
        ],
        "correct": 1,
        "explanation": "Basta ter um navegador web, internet e suas credenciais. Por segurança, lembre-se de sair da sua conta ao terminar de usar o computador emprestado."
      },
      {
        "id": "a5_q8",
        "question": "Ao excluir um arquivo do seu Google Drive por engano, o que acontece?",
        "options": [
          "O arquivo some da internet imediatamente e nunca mais pode ser recuperado.",
          "Ele vai para a lixeira virtual da nuvem e pode ser restaurado durante um período (geralmente 30 dias).",
          "O arquivo vai para a lixeira física do sistema Windows na Área de Trabalho.",
          "A conta do Google é suspensa imediatamente."
        ],
        "correct": 1,
        "explanation": "A nuvem também possui lixeira! Você pode navegar na lixeira do Drive e clicar em 'Restaurar' para recuperar o documento deletado acidentalmente."
      },
      {
        "id": "a5_q9",
        "question": "Se sua internet cair enquanto você trabalha em um documento salvo puramente online no navegador:",
        "options": [
          "As alterações que você fizer sem internet não serão salvas até que a conexão retorne (salvo extensões offline ativadas).",
          "O computador desliga sozinho para poupar energia.",
          "O arquivo original é deletado por medidas de segurança de rede.",
          "O provedor de internet envia uma cópia impressa para sua casa."
        ],
        "correct": 0,
        "explanation": "Ao trabalhar sem recursos offline configurados, você fica temporariamente dependente do sinal. Mas quando a internet volta, o sincronismo se conclui."
      },
      {
        "id": "a5_q10",
        "question": "O que é o 'upload' quando falamos de internet e armazenamento em nuvem?",
        "options": [
          "Baixar um filme inteiro da Netflix.",
          "O ato de transferir/subir um arquivo do seu armazenamento local para servidores na internet.",
          "Excluir arquivos antigos do pendrive e da lixeira.",
          "Reiniciar o modem da internet da operadora."
        ],
        "correct": 1,
        "explanation": "Upload (Subir) é enviar. Download (Baixar) é receber. Quando você salva uma foto do seu HD no Google Drive, você está fazendo um Upload."
      }
    ],
    "finalChallenge": {
      "title": "☁️ DESAFIO FINAL — MESTRE DA NUVEM",
      "subtitle": "Prove que você sabe proteger e compartilhar seus arquivos.",
      "questions": [
        {
          "id": "a5_fc1",
          "type": "choice",
          "context": "Você precisa compartilhar um documento muito importante e confidencial com seu colega de trabalho pelo Google Drive.",
          "question": "Qual a melhor configuração de permissão?",
          "options": [
            "Qualquer pessoa com o link pode editar.",
            "Apenas as pessoas adicionadas por e-mail podem visualizar ou editar.",
            "Público na web.",
            "Qualquer pessoa com o link pode visualizar."
          ],
          "correct": 1,
          "explanation": "Para arquivos confidenciais, você nunca deve deixar o link aberto. Restringir o acesso pelo e-mail específico é a melhor prática de segurança.",
          "xp": 20
        },
        {
          "id": "a5_fc2",
          "type": "choice",
          "context": "Você editou um currículo online usando o Google Docs, direto no navegador.",
          "question": "Onde você precisa clicar para salvar as alterações?",
          "options": [
            "Arquivo > Salvar como...",
            "Apertar Ctrl+S diversas vezes.",
            "Não é necessário clicar em nada, o salvamento na nuvem é automático.",
            "Fechar a aba imediatamente."
          ],
          "correct": 2,
          "explanation": "Exato! Documentos em nuvem (como Google Docs ou Office Online) salvam cada letra digitada automaticamente. É o fim do 'esqueci de salvar'!",
          "xp": 20
        },
        {
          "id": "a5_fc3",
          "type": "choice",
          "context": "Você está acessando seu Google Drive no computador de uma faculdade ou lan house.",
          "question": "Qual a melhor prática ao terminar de usar?",
          "options": [
            "Fechar apenas o navegador clicando no X.",
            "Sair da conta (Fazer Logoff/Sair) de todos os serviços e então fechar o navegador.",
            "Excluir apenas o histórico de navegação.",
            "Desligar o monitor."
          ],
          "correct": 1,
          "explanation": "Apenas fechar o navegador muitas vezes mantém sua sessão conectada. A próxima pessoa que usar o PC poderá acessar todos os seus dados.",
          "xp": 20
        },
        {
          "id": "a5_fc4",
          "type": "choice",
          "context": "Seu pendrive caiu na água e parou de funcionar. Você perdeu as únicas cópias dos seus trabalhos da faculdade.",
          "question": "Qual destas ferramentas poderia ter evitado totalmente essa perda se usada para armazenar os arquivos?",
          "options": [
            "Google Tradutor",
            "Google Fotos",
            "Google Drive ou Microsoft OneDrive",
            "Um segundo monitor"
          ],
          "correct": 2,
          "explanation": "Salvar arquivos em serviços de nuvem como Drive ou OneDrive garante que seus dados não dependam de um dispositivo físico frágil.",
          "xp": 20
        },
        {
          "id": "a5_fc5",
          "type": "choice",
          "context": "Você e três colegas de classe precisam fazer um trabalho em grupo. Cada um está em sua respectiva casa.",
          "question": "Qual a forma mais rápida e eficiente de digitar o mesmo texto?",
          "options": [
            "Cada um digita uma parte no seu próprio Word e um deles junta tudo no final por e-mail.",
            "Usar o Google Docs e compartilhar o link para todos editarem o mesmo arquivo simultaneamente na nuvem.",
            "Digitar tudo pelo grupo do WhatsApp e depois copiar.",
            "Enviar um pendrive por motoboy."
          ],
          "correct": 1,
          "explanation": "A edição colaborativa do Google Docs permite que várias pessoas trabalhem no mesmo documento ao mesmo tempo, vendo as alterações em tempo real.",
          "xp": 20
        },
        {
          "id": "a5_fc6",
          "type": "choice",
          "context": "Você precisa solicitar um serviço de um órgão do Governo, como renovar documentos ou acessar dados da Receita Federal.",
          "question": "Qual sistema hoje unifica praticamente todos os acessos do cidadão aos serviços públicos digitais?",
          "options": [
            "O portal do Mercado Livre.",
            "A conta única do portal Gov.br.",
            "Uma conta de e-mail do Yahoo.",
            "O sistema de caixa eletrônico do banco."
          ],
          "correct": 1,
          "explanation": "O portal Gov.br se tornou a chave mestra (identidade digital) para que o cidadão brasileiro acesse serviços públicos com segurança.",
          "xp": 20
        },
        {
          "id": "a5_fc7",
          "type": "choice",
          "context": "Você quer fazer uma pesquisa no Google buscando o nome exato de uma lei ou um termo composto, sem que os resultados venham separados.",
          "question": "Como você deve formatar essa busca avançada?",
          "options": [
            "Colocar o termo de pesquisa entre aspas (Ex: \"Lei de Proteção de Dados\").",
            "Colocar o termo todo em letras maiúsculas.",
            "Usar o símbolo @ antes da frase.",
            "Colocar a palavra URGENTE no começo da pesquisa."
          ],
          "correct": 0,
          "explanation": "As aspas forçam o Google a buscar exatamente aquela frase na ordem em que foi digitada, eliminando resultados que apenas tenham as palavras espalhadas.",
          "xp": 20
        },
        {
          "id": "a5_fc8",
          "type": "choice",
          "context": "Você está prestes a digitar a senha do seu cartão de crédito em uma loja virtual.",
          "question": "O que você deve obrigatoriamente verificar no navegador antes de digitar dados sensíveis?",
          "options": [
            "Se o site tem muitas fotos bonitas.",
            "Se o site começa com 'http://' e tem o ícone de uma chave.",
            "Se a barra de endereços possui um ícone de cadeado fechado indicando uma conexão segura (HTTPS).",
            "Se o teclado está com luzes acesas."
          ],
          "correct": 2,
          "explanation": "O cadeado do HTTPS garante que a conexão entre o seu computador e a loja virtual está criptografada e não pode ser lida por invasores na rede.",
          "xp": 20
        },
        {
          "id": "a5_fc9",
          "type": "choice",
          "context": "Você tem milhares de fotos no celular e o armazenamento está totalmente cheio (100%).",
          "question": "Como o Google Fotos pode resolver esse problema de forma inteligente?",
          "options": [
            "Ele apaga metade das suas fotos de forma aleatória.",
            "Fazendo o backup das fotos na nuvem e usando o botão 'Liberar espaço' para excluir do aparelho as fotos que já estão seguras na internet.",
            "Comprimindo a tela do celular para caber mais.",
            "Bloqueando a câmera."
          ],
          "correct": 1,
          "explanation": "Após o Google Fotos fazer o backup (salvar na nuvem), você pode limpar as fotos originais do celular. Elas continuam visíveis no app via internet.",
          "xp": 20
        },
        {
          "id": "a5_fc10",
          "type": "choice",
          "context": "Você tem uma reunião importante de trabalho pelo Google Meet.",
          "question": "Qual é a melhor preparação antes de clicar em 'Participar Agora'?",
          "options": [
            "Testar a câmera, testar o microfone na 'sala de espera' virtual e garantir que o cenário atrás de você está organizado.",
            "Deixar o volume da TV no máximo para se distrair enquanto espera.",
            "Abrir diversos programas pesados ao mesmo tempo.",
            "Não é preciso fazer nada, basta entrar."
          ],
          "correct": 0,
          "explanation": "Plataformas como Meet, Teams ou Zoom oferecem uma tela de prévia (sala de espera). É essencial usá-la para ajustar sua imagem e áudio antes de entrar na reunião.",
          "xp": 20
        }
      ],
      "competencies": [
        {
          "name": "Domínio da Nuvem",
          "score": 100
        },
        {
          "name": "Segurança de Dados",
          "score": 90
        },
        {
          "name": "Trabalho Colaborativo",
          "score": 100
        }
      ]    }
  },
  {
    "id": "m3-aula-6",
    "number": 6,
    "title": "A Prova Final: O Desafio do Informestre",
    "badge": "Aula 6 • Certificação",
    "duration": "2h 00m",
    "xpReward": 1000,
    "videoUrl": "",
    "presentation": {
      "headline": "Revisão Geral e Prova Prática Final",
      "subtitle": "Você passará por 4 etapas práticas de revisão. Mostre tudo o que aprendeu!",
      "description": "Nesta última aula, você não terá vídeo ou ajuda do tutor. É um circuito de 4 missões práticas com 8 questões cada.",
      "coverImage": "images/capa_curso_informatica.png",
      "objectives": []
    },
    "slides": [],
    "quiz": []
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

    if (lessonId === 'm3-aula-6') {
      if(window.renderAula6CustomView) {
         window.renderAula6CustomView(container, lesson, window.currentUser);
      } else {
         container.innerHTML = '<h3>Erro: renderAula6CustomView não definida.</h3>';
      }
      return;
    }
    
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
              Validação de Aprendizado da Aula ${lesson.number}
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
    } else if (lesson.id === 'm3-aula-3' || lesson.id === 'aula-17') {
      // Laboratório de Segurança Digital da Aula 3
      initM3Aula3Activities(container, lesson);
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
    if (lesson.id === 'm3-aula-5' || lesson.id === 'aula-19') {
      const userId = (window.currentUser && window.currentUser.id) || 'guest';
      const lessonId = lesson.id;
      
      // Initialize DB helper if not exists
      if (!window.InforMestreDeliveries) {
        window.InforMestreDeliveries = {
          async init() {
            return new Promise((resolve, reject) => {
              const request = indexedDB.open('InforMestreDeliveriesDB', 1);
              request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('deliveries')) {
                  db.createObjectStore('deliveries', { keyPath: 'id' });
                }
              };
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(request.error);
            });
          },
          async saveDelivery(userId, lessonId, fileObj) {
            const db = await this.init();
            return new Promise((resolve, reject) => {
              const tx = db.transaction('deliveries', 'readwrite');
              const store = tx.objectStore('deliveries');
              const delivery = {
                id: `${userId}_${lessonId}`,
                userId,
                lessonId,
                fileName: fileObj.name,
                fileSize: fileObj.size,
                fileType: fileObj.type,
                fileData: fileObj.data,
                submittedAt: new Date().toISOString(),
                status: 'Enviado'
              };
              store.put(delivery);
              tx.oncomplete = () => resolve(delivery);
              tx.onerror = () => reject(tx.error);
            });
          },
          async getDelivery(userId, lessonId) {
            const db = await this.init();
            return new Promise((resolve, reject) => {
              const tx = db.transaction('deliveries', 'readonly');
              const store = tx.objectStore('deliveries');
              const request = store.get(`${userId}_${lessonId}`);
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(request.error);
            });
          }
        };
      }

      function formatBytes(bytes, decimals = 2) {
          if (!+bytes) return '0 Bytes';
          const k = 1024;
          const dm = decimals < 0 ? 0 : decimals;
          const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
      }

      const renderUI = async () => {
        let delivery = null;
        try {
          delivery = await window.InforMestreDeliveries.getDelivery(userId, lessonId);
        } catch (e) { console.error(e); }

        const isDelivered = !!delivery;
        const statusText = isDelivered ? 'Enviada' : 'Não iniciada';
        const statusColor = isDelivered ? '#10b981' : '#f59e0b';
        const statusBg = isDelivered ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)';

        let fileInfoHtml = '';
        if (isDelivered) {
          const dateStr = new Date(delivery.submittedAt).toLocaleString('pt-BR');
          fileInfoHtml = `
            <div style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; text-align: left;">
              <h4 style="margin:0 0 1rem; color: var(--color-text-primary); font-size: 1.1rem;">✅ Atividade enviada com sucesso!</h4>
              <p style="margin: 0.2rem 0; color: var(--color-text-secondary);"><strong>Arquivo:</strong> ${delivery.fileName}</p>
              <p style="margin: 0.2rem 0; color: var(--color-text-secondary);"><strong>Tamanho:</strong> ${formatBytes(delivery.fileSize)}</p>
              <p style="margin: 0.2rem 0; color: var(--color-text-secondary);"><strong>Enviado em:</strong> ${dateStr}</p>
              <p style="margin: 0.2rem 0; color: var(--color-text-secondary);"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Enviado</span></p>
              
              <div style="margin-top: 1.5rem;">
                <label for="replace-upload" style="cursor: pointer; display: inline-block; padding: 0.6rem 1.2rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; font-weight: 600; color: var(--color-text-primary); font-size: 0.9rem;">
                  Substituir arquivo enviado
                </label>
                <input type="file" id="replace-upload" accept=".pdf" style="display: none;" onchange="window.handleActivityUpload(event)">
              </div>
            </div>
          `;
        } else {
          fileInfoHtml = `
            <div style="background: var(--color-bg-alt); border: 1px dashed var(--color-border); border-radius: 12px; padding: 2rem; margin-top: 1.5rem; text-align: center;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📄</div>
              <h4 style="margin:0 0 0.5rem; color: var(--color-text-primary); font-size: 1.1rem;">Área de Envio</h4>
              <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Faça o upload do seu trabalho em formato <strong>PDF</strong> (máximo 10 MB).</p>
              
              <label for="initial-upload" style="cursor: pointer; display: inline-block; padding: 0.8rem 2rem; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #fff; border-radius: 10px; font-weight: 700; font-size: 1rem; box-shadow: 0 4px 15px rgba(59,130,246,0.3);">
                Selecionar e Enviar Arquivo
              </label>
              <input type="file" id="initial-upload" accept=".pdf" style="display: none;" onchange="window.handleActivityUpload(event)">
            </div>
          `;
        }

        container.innerHTML = `
          <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px; padding: 2.2rem; box-shadow: 0 8px 30px rgba(0,0,0,0.06); animation: fadeIn 0.3s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(59,130,246,0.12); color: #3b82f6; padding: 0.35rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">
                <span>📝 DESAFIO PRÁTICO</span>
              </div>
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: ${statusBg}; color: ${statusColor}; padding: 0.35rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">
                Status: ${statusText}
              </div>
            </div>

            <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 0.8rem;">
              5 Ferramentas Google Úteis no Dia a Dia
            </h2>
            <p style="color: var(--color-text-secondary); font-size: 0.98rem; line-height: 1.6; margin-bottom: 1.8rem;">
              Nesta atividade, você vai colocar em prática tudo o que aprendeu pesquisando 5 ferramentas do Google e criando um documento estruturado.
            </p>

            <div style="margin-bottom: 2rem;">
              <h3 style="font-size: 1.1rem; color: var(--color-text-primary); margin-bottom: 0.8rem;">📋 Instruções</h3>
              <p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
                Pesquise e escolha 5 ferramentas do Google que você considera úteis para o seu dia a dia (Ex: Google Maps, Gmail, Drive, Tradutor, Fotos, Lens, Agenda, YouTube, Meet).
              </p>
              <ul style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.6; padding-left: 1.5rem; margin-bottom: 1rem;">
                <li>Abra o Microsoft Word e crie seu trabalho.</li>
                <li>Coloque seu nome no topo do documento.</li>
                <li>Para cada ferramenta escolhida, escreva: <strong>Nome, Para que serve, Como pode ajudar no dia a dia, e cole uma Imagem/Ícone</strong>.</li>
                <li>Formate o trabalho para deixá-lo bonito e organizado.</li>
                <li><strong>Salve o documento em formato PDF</strong> (Arquivo &gt; Salvar como &gt; PDF).</li>
                <li>Faça o upload do arquivo PDF aqui nesta tela.</li>
              </ul>
            </div>

            ${fileInfoHtml}

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; margin-top: 2rem; border-top: 1px solid var(--color-border);">
              <button class="btn btn-outline" onclick="window.InforMestreModule3.switchLessonTab('activities')" style="padding: 0.8rem 1.6rem; font-weight: 700; border-radius: 10px;">← Voltar às Atividades</button>
              <button class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('challenge')" style="padding: 0.95rem 2.5rem; font-size: 1rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #55EFC4 100%); border: none; color: #fff; cursor: pointer;">
                Ir para o Desafio Final 🏆
              </button>
            </div>
          </div>
        `;

        window.handleActivityUpload = async (event) => {
          const file = event.target.files[0];
          if (!file) return;

          if (file.type !== 'application/pdf') {
            alert('Por favor, envie apenas arquivos em formato PDF.');
            event.target.value = '';
            return;
          }

          if (file.size > 10 * 1024 * 1024) {
            alert('O arquivo é muito grande. O limite máximo é de 10 MB.');
            event.target.value = '';
            return;
          }

          try {
            // Read file as data URL to store in IndexedDB
            const reader = new FileReader();
            reader.onload = async (e) => {
              const fileData = {
                name: file.name,
                size: file.size,
                type: file.type,
                data: e.target.result
              };
              await window.InforMestreDeliveries.saveDelivery(userId, lessonId, fileData);
              // Re-render UI
              renderUI();
              
              if (typeof window.addXP === "function" && !isDelivered) {
                window.addXP(100);
                alert("Parabéns! Atividade enviada com sucesso! Você ganhou +100 XP.");
              }
            };
            reader.readAsDataURL(file);
          } catch (err) {
            console.error(err);
            alert('Ocorreu um erro ao enviar o arquivo.');
          }
        };
      };
      
      renderUI();
      return;
    }

    if (lesson.id === 'm3-aula-3' || lesson.id === 'aula-17') {
      container.innerHTML = `
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px; padding: 2.2rem; box-shadow: 0 8px 30px rgba(0,0,0,0.06); animation: fadeIn 0.3s ease;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,184,148,0.12); color: #00B894; padding: 0.35rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem;">
            <span>🚀 MISSÃO REAL PRÁTICA</span>
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--color-text-primary); margin: 0 0 0.8rem;">
            Auditoria Pessoal de Segurança Digital
          </h2>
          <p style="color: var(--color-text-secondary); font-size: 0.98rem; line-height: 1.6; margin-bottom: 1.8rem;">
            Agora que você conhece a anatomia dos golpes e as melhores práticas de defesa, realize esta auditoria real no seu ambiente digital antes do Desafio Final:
          </p>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1.2rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 12px;">
              <span style="font-size: 1.5rem;">🔒</span>
              <div>
                <strong style="color: var(--color-text-primary); display: block; margin-bottom: 0.2rem;">Passo 1: Verifique suas senhas principais</strong>
                <span style="font-size: 0.88rem; color: var(--color-text-secondary);">Garanta que seu e-mail pessoal e suas contas principais possuem senhas fortes e exclusivas, sem repetição em outros sites.</span>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1.2rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 12px;">
              <span style="font-size: 1.5rem;">📱</span>
              <div>
                <strong style="color: var(--color-text-primary); display: block; margin-bottom: 0.2rem;">Passo 2: Ative a Autenticação em 2 Etapas (2FA)</strong>
                <span style="font-size: 0.88rem; color: var(--color-text-secondary);">Ative a verificação em duas etapas no WhatsApp (PIN) e na sua conta de e-mail (código no celular ou app autenticador).</span>
              </div>
            </div>

            <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 1.2rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 12px;">
              <span style="font-size: 1.5rem;">🛡️</span>
              <div>
                <strong style="color: var(--color-text-primary); display: block; margin-bottom: 0.2rem;">Passo 3: Desconecte aparelhos desconhecidos</strong>
                <span style="font-size: 0.88rem; color: var(--color-text-secondary);">Nas configurações de segurança do WhatsApp, Google e redes sociais, verifique quais computadores estão com sessão aberta e desconecte os antigos.</span>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
            <button class="btn btn-outline" onclick="window.InforMestreModule3.switchLessonTab('activities')" style="padding: 0.8rem 1.6rem; font-weight: 700; border-radius: 10px;">← Voltar às Atividades</button>
            <button class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('challenge')" style="padding: 0.95rem 2.5rem; font-size: 1rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #55EFC4 100%); border: none; color: #fff; cursor: pointer; box-shadow: 0 4px 20px rgba(0,184,148,0.35);">
              Ir para o Desafio Final 🏆
            </button>
          </div>
        </div>
      `;
      return;
    }

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
    const match = lesson.id.match(/^m3-aula-(\d+)$/);
    if (match) {
      window.state.completedLessons[`aula-${14 + parseInt(match[1])}`] = true;
    }

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
          AULA ${lesson.number} CONCLUÍDA COM MAESTRIA!
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

  function initM3Aula3Activities(container, lesson) {
    container.innerHTML = "";
    
    // Activities State
    let currentStep = 1; // 1: Detetive de Phishing, 2: Avaliador de Senhas, 3: Conclusão
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
            <h4 class="mt-1" style="color:var(--color-danger);">Você perdeu as vidas de segurança!</h4>
            <p class="text-muted text-small">Sem problemas! No mundo da segurança, revisar e tentar de novo é o melhor treino.</p>
            <button class="btn btn-secondary mt-1" id="btn-restart-a3">Tentar Novamente</button>
          </div>
        `;
        widget.querySelector("#btn-restart-a3").addEventListener("click", () => {
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
      stepSpan.textContent = `Atividade Prática ${currentStep} de 3 • Laboratório de Segurança`;
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
        // ATIVIDADE 1: Detetive de Phishing
        const items = [
          { 
            title: "SMS: 'Seu cartão foi bloqueado! Acesse link-banco-urgente.xyz/desbloqueio para liberar.'", 
            type: "Golpe / Phishing",
            tip: "Bancos não enviam links de desbloqueio por SMS nem usam domínios desconhecidos (.xyz)."
          },
          { 
            title: "E-mail oficial com remetente @google.com avisando sobre um novo login reconhecido no seu celular.", 
            type: "Legítimo / Seguro",
            tip: "Notificações informativas de plataformas confiáveis que não pedem senhas nem dinheiro são comunicações legítimas."
          },
          { 
            title: "WhatsApp: Mensagem dizendo que você ganhou R$ 1.000 e pedindo para informar o código SMS de 6 dígitos que acabou de chegar.", 
            type: "Golpe / Phishing",
            tip: "O código SMS de 6 dígitos é a confirmação para clonar ou transferir seu WhatsApp para outro aparelho."
          },
          { 
            title: "Mensagem no Instagram de uma loja oficial verificada com selo azul avisando sobre promoção no site oficial www.lojaoficial.com.br.", 
            type: "Legítimo / Seguro",
            tip: "Contas verificadas com selo azul e direcionando para domínios oficiais conhecidos são seguras."
          }
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
          title.textContent = `Caso ${currentItemIdx + 1} de ${items.length}`;
          title.style.margin = "0 0 0.5rem 0";
          title.style.fontSize = "1.05rem";
          title.style.color = "var(--color-primary)";
          
          const situation = document.createElement("p");
          situation.textContent = `"${curr.title}"`;
          situation.style.fontSize = "1rem";
          situation.style.color = "var(--color-text-primary)";
          situation.style.fontWeight = "600";
          situation.style.lineHeight = "1.5";
          
          const desc = document.createElement("p");
          desc.textContent = "Como você classifica essa comunicação digital?";
          desc.style.color = "var(--color-text-secondary)";
          desc.style.fontSize = "0.85rem";
          
          itemBox.appendChild(title);
          itemBox.appendChild(situation);
          itemBox.appendChild(desc);
          
          const optsDiv = document.createElement("div");
          optsDiv.style.display = "grid";
          optsDiv.style.gridTemplateColumns = "1fr 1fr";
          optsDiv.style.gap = "12px";
          
          ["Golpe / Phishing", "Legítimo / Seguro"].forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "quiz-option-btn";
            btn.style.padding = "0.9rem";
            btn.style.fontWeight = "700";
            btn.textContent = opt === "Golpe / Phishing" ? "🚨 Golpe / Phishing" : "✅ Legítimo / Seguro";
            btn.addEventListener("click", () => {
              if (opt === curr.type) {
                btn.classList.add("correct");
                setTimeout(() => {
                  currentItemIdx++;
                  renderItem();
                }, 900);
              } else {
                btn.classList.add("wrong");
                lives--;
                updateHearts(heartsSpan);
                if (lives <= 0) {
                  render();
                } else {
                  alert(`❌ Atenção! ${curr.tip}`);
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
        // ATIVIDADE 2: Avaliador de Senhas
        widget.innerHTML = "";
        widget.appendChild(topBar);
        
        const title = document.createElement("h4");
        title.textContent = "Laboratório de Blindagem: Escolha a Senha Mais Segura";
        title.style.margin = "0 0 0.5rem 0";
        widget.appendChild(title);
        
        const desc = document.createElement("p");
        desc.textContent = "Você está configurando o acesso ao seu banco digital. Qual das opções abaixo atende plenamente aos critérios de senha forte e imbatível?";
        desc.style.color = "var(--color-text-secondary)";
        desc.style.fontSize = "0.9rem";
        desc.style.marginBottom = "1.2rem";
        widget.appendChild(desc);
        
        const optsDiv = document.createElement("div");
        optsDiv.style.display = "flex";
        optsDiv.style.flexDirection = "column";
        optsDiv.style.gap = "10px";
        
        const passOptions = [
          { label: "12345678", desc: "Apenas números sequenciais comuns (Extremamente Fraca)" },
          { label: "joao2024", desc: "Nome próprio comum e ano atual (Muito Fraca)" },
          { label: "Livro#Azul$Mesa98", desc: "Frase-passe longa combinando maiúsculas, minúsculas, símbolos (#$) e números (Excelente / Forte)" }
        ];
        
        passOptions.forEach((opt, idx) => {
          const btn = document.createElement("button");
          btn.className = "quiz-option-btn";
          btn.style.textAlign = "left";
          btn.style.padding = "1rem 1.2rem";
          btn.innerHTML = `<div style="font-family: monospace; font-size: 1.1rem; font-weight: bold; margin-bottom: 0.3rem;">${opt.label}</div><div style="font-size: 0.8rem; color: var(--color-text-secondary);">${opt.desc}</div>`;
          btn.addEventListener("click", () => {
            if (idx === 2) {
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
              else alert("❌ Incorreto! Senhas seguras devem misturar letras maiúsculas, minúsculas, números e símbolos especiais, além de serem longas.");
            }
          });
          optsDiv.appendChild(btn);
        });
        widget.appendChild(optsDiv);
      }
      else if (currentStep === 3) {
        // CONCLUSÃO ATIVIDADES
        widget.innerHTML = `
          <div class="text-center" style="animation: fadeIn 0.4s ease;">
            <span style="font-size:3.5rem;">🛡️</span>
            <h3 class="mt-1" style="color:var(--color-success); margin: 0.8rem 0;">Prática de Segurança Concluída!</h3>
            <p style="color: var(--color-text-secondary); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem;">
              Parabéns! Você demonstrou olhar afiado para detectar tentativas de Phishing e domina as técnicas para criar senhas robustas.
            </p>
            <div style="display: inline-block; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 0.8rem 1.5rem; margin-bottom: 1.5rem;">
              <span style="font-weight: 800; color: #10b981; font-size: 1rem;">✓ Prática Concluída (+50 XP)</span>
            </div>
            <div>
              <button class="btn btn-primary" id="btn-next-mission-a3" style="padding: 0.85rem 2.2rem; font-size: 1rem; font-weight: 800; border-radius: 12px;">Continuar para a Missão Real 🚀</button>
            </div>
          </div>
        `;
        
        setTimeout(() => {
          if (typeof window.addXP === "function") window.addXP(50);
        }, 100);

        widget.querySelector("#btn-next-mission-a3").addEventListener("click", () => {
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



// ============================================================================
// AULA 6 CUSTOM ENGINE (INJETADO E SEPARADO EM SLIDES SIM/QUIZ)
// ============================================================================

window.a6State = {
  currentStage: 0,
  subStage: 'sim', // 'sim' ou 'quiz'
  answers: {},
  score: 0
};

window.renderAula6CustomView = function(container, lesson, user) {
  // CSS
  if(!document.getElementById('a6-custom-styles')) {
    const style = document.createElement('style');
    style.id = 'a6-custom-styles';
    style.innerHTML = `
      .a6-wrapper { max-width: 1000px; margin: 0 auto; padding-bottom: 3rem; animation: fadeIn 0.3s ease; font-family: 'Inter', sans-serif; }
      .a6-stepper { display: flex; gap: 1rem; background: var(--color-surface); padding: 1rem; border-radius: 16px; margin-bottom: 2rem; border: 1px solid var(--color-border); flex-wrap: wrap; }
      .a6-step { flex: 1; min-width: 200px; padding: 1rem; text-align: center; border-radius: 12px; font-weight: bold; color: var(--color-text-secondary); cursor: pointer; transition: all 0.3s ease; background: var(--color-bg-alt); border: 1px solid transparent; }
      .a6-step.active { background: rgba(0,184,148,0.1); color: #00B894; border-color: #00B894; }
      .a6-content-box { background: var(--color-surface); border-radius: 20px; padding: 2rem; border: 1px solid var(--color-border); margin-bottom: 2rem; }
      .a6-simulator-box { border: 2px solid #e2e8f0; border-radius: 12px; background: #f8fafc; padding: 2rem; margin: 1.5rem 0; min-height: 300px; display: flex; flex-direction: column; align-items:center; justify-content:center;}
      .a6-question { background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; border: 1px solid var(--color-border); }
      .a6-option { display: block; width: 100%; text-align: left; padding: 1rem; margin-top: 0.5rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-surface); cursor: pointer; transition: all 0.2s; }
      .a6-option:hover { border-color: #00B894; }
      .a6-option.selected { background: rgba(0,184,148,0.1); border-color: #00B894; color: #00B894; font-weight: bold; }
    `;
    document.head.appendChild(style);
  }

  container.innerHTML = `
    <div class="a6-wrapper">
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; align-items:center;">
        <button class="btn btn-outline" onclick="renderStudentModule3View()">← Voltar ao Menu</button>
        <h2 style="color: var(--color-text-primary); margin: 0;">🏆 Prova Final: O Desafio do Informestre</h2>
      </div>
      
      
      
      <div class="a6-stepper">
        <div class="a6-step ${window.a6State.currentStage === 0 ? 'active' : ''}" onclick="a6SetStage(0)">📍 Introdução</div>
        <div class="a6-step ${window.a6State.currentStage === 1 ? 'active' : ''}" onclick="a6SetStage(1)">1. Hardware</div>
        <div class="a6-step ${window.a6State.currentStage === 2 ? 'active' : ''}" onclick="a6SetStage(2)">2. Internet e Nuvem</div>
        <div class="a6-step ${window.a6State.currentStage === 3 ? 'active' : ''}" onclick="a6SetStage(3)">3. Segurança e Golpes</div>
        <div class="a6-step ${window.a6State.currentStage === 4 ? 'active' : ''}" onclick="a6SetStage(4)">🏆 4. O Desafio Final</div>
      </div>

      <div id="a6-stage-content"></div>
    </div>

      <div id="a6-stage-content"></div>
    </div>

      <div id="a6-stage-content"></div>
    </div>
  `;

  window.renderA6Stage(document.getElementById('a6-stage-content'));
};

window.a6SetStage = function(stage) {
  window.a6State.currentStage = stage;
  window.a6State.subStage = 'sim'; // reset to sim
  const c = document.getElementById('hub-main-panel-content');
  if(c) window.renderAula6CustomView(c, {id:'m3-aula-6'}, window.currentUser);
}

window.a6SetSubStage = function(sub) {
  window.a6State.subStage = sub;
  const c = document.getElementById('hub-main-panel-content');
  if(c) window.renderAula6CustomView(c, {id:'m3-aula-6'}, window.currentUser);
}

window.renderA6Stage = function(container) {
  if (window.a6State.currentStage === 0) renderA6Stage0(container);
  if (window.a6State.currentStage === 1) renderA6Stage1(container);
  if (window.a6State.currentStage === 2) renderA6Stage5(container);
  if (window.a6State.currentStage === 3) renderA6Stage4(container);
  if (window.a6State.currentStage === 4) renderA6Stage2(container);
}


// ==========================================
// STAGE 0: INTRODUÇÃO E LINHA DO TEMPO
// ==========================================
function renderA6Stage0(container) {
  container.innerHTML = `
    <div class="a6-content-box" style="text-align: center;">
      <h2 style="color: #00B894; margin-bottom: 0.5rem; font-size: 2rem;">A Jornada do Conhecimento</h2>
      <p style="color: var(--color-text-secondary); font-size: 1.1rem; max-width: 700px; margin: 0 auto 2.5rem; line-height: 1.6;">
        Chegamos à última etapa do nosso curso! Antes de entrarmos no Desafio Final, vamos relembrar a incrível jornada que você trilhou até aqui.
        Esta aula testará toda a sua autonomia e conhecimento prático acumulado.
      </p>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem; position: relative;">
        <!-- Linha central conectora -->
        <div style="position: absolute; width: 4px; background: #e2e8f0; height: 80%; left: 50%; transform: translateX(-50%); top: 10%; z-index: 0;"></div>

        <!-- Módulo 1 -->
        <div style="display: flex; align-items: center; gap: 2rem; width: 100%; max-width: 600px; z-index: 1;">
          <div style="flex: 1; text-align: right;">
            <h3 style="color: #3b82f6; margin: 0;">Módulo 1: O Início</h3>
            <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Hardware, Componentes e como o computador pensa.</p>
          </div>
          <div style="width: 50px; height: 50px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; border: 4px solid #f8fafc; flex-shrink: 0;">🔧</div>
          <div style="flex: 1;"></div>
        </div>

        <!-- Módulo 2 -->
        <div style="display: flex; align-items: center; gap: 2rem; width: 100%; max-width: 600px; z-index: 1;">
          <div style="flex: 1;"></div>
          <div style="width: 50px; height: 50px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; border: 4px solid #f8fafc; flex-shrink: 0;">📝</div>
          <div style="flex: 1; text-align: left;">
            <h3 style="color: #f59e0b; margin: 0;">Módulo 2: O Sistema</h3>
            <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Navegação no Windows, Pastas, Microsoft Word e Internet.</p>
          </div>
        </div>

        <!-- Módulo 3 -->
        <div style="display: flex; align-items: center; gap: 2rem; width: 100%; max-width: 600px; z-index: 1;">
          <div style="flex: 1; text-align: right;">
            <h3 style="color: #10b981; margin: 0;">Módulo 3: O Profissional</h3>
            <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Tabelas no Excel, Finanças e Segurança contra Golpes.</p>
          </div>
          <div style="width: 50px; height: 50px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; border: 4px solid #f8fafc; flex-shrink: 0;">📊</div>
          <div style="flex: 1;"></div>
        </div>

      </div>

      <div style="margin-top: 3.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.5rem; border-radius: 12px; max-width: 700px; margin-left: auto; margin-right: auto;">
        <h4 style="color: #166534; margin-top: 0;">🎯 O Desafio Final</h4>
        <p style="color: #166534; font-size: 0.95rem; line-height: 1.5; margin-bottom: 0;">
          Para garantir seu certificado, você passará por 4 etapas práticas seguidas de perguntas teóricas. 
          Mostre que você absorveu o conhecimento e está pronto para dominar o mundo digital com autonomia!
        </p>
      </div>

      <button class="btn btn-primary" onclick="a6SetStage(1)" style="margin-top: 2rem; font-size: 1.1rem; padding: 1rem 2.5rem;">
        Iniciar o Desafio →
      </button>

    </div>
  `;
}

// ==========================================
// STAGE 1: HARDWARE

// ==========================================
function renderA6Stage1(container) {
  if (window.a6State.subStage === 'sim') {
    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">Revisão: Componentes do Computador (Prática)</h3>
        <p style="color:var(--color-text-secondary); line-height: 1.6;">Ligue cada peça de Hardware à sua função principal. Arraste o componente da esquerda para a caixa de descrição correspondente na direita.</p>
        
        <div class="a6-simulator-box" id="a6-sim-1" style="background:#1e293b; border: 2px solid #334155; padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
          <h4 style="color:#f8fafc; margin-bottom: 1.5rem; text-align:center;">Simulador: Associação de Hardware</h4>
          
          <div style="display:flex; gap: 2rem; width: 100%; max-width: 800px; justify-content:space-between;">
            
            <!-- COMPONENTS (LEFT) -->
            <div style="display:flex; flex-direction:column; gap:1rem; flex: 1;">
               <div class="a6-drag-item" draggable="true" data-type="cpu" style="background:linear-gradient(135deg, #3b82f6, #2563eb); padding: 1rem; border-radius:8px; color:white; font-weight:bold; cursor:grab; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align:center;">⚡ Processador (CPU)</div>
               
               <div class="a6-drag-item" draggable="true" data-type="ram" style="background:linear-gradient(135deg, #10b981, #059669); padding: 1rem; border-radius:8px; color:white; font-weight:bold; cursor:grab; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align:center;">🧠 Memória RAM</div>

               <div class="a6-drag-item" draggable="true" data-type="ssd" style="background:linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 1rem; border-radius:8px; color:white; font-weight:bold; cursor:grab; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align:center;">🗄️ Armazenamento (SSD/HD)</div>

               <div class="a6-drag-item" draggable="true" data-type="motherboard" style="background:linear-gradient(135deg, #f59e0b, #d97706); padding: 1rem; border-radius:8px; color:white; font-weight:bold; cursor:grab; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align:center;">🔌 Placa-Mãe</div>

               <div class="a6-drag-item" draggable="true" data-type="cooler" style="background:linear-gradient(135deg, #0ea5e9, #0284c7); padding: 1rem; border-radius:8px; color:white; font-weight:bold; cursor:grab; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align:center;">❄️ Cooler</div>

               <div class="a6-drag-item" draggable="true" data-type="power" style="background:linear-gradient(135deg, #ef4444, #dc2626); padding: 1rem; border-radius:8px; color:white; font-weight:bold; cursor:grab; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align:center;">🔋 Fonte de Energia</div>
            </div>

            <!-- DESCRIPTIONS (RIGHT) -->
            <div style="display:flex; flex-direction:column; gap:1rem; flex: 2;">
               
               <div class="a6-dropzone" data-target="ssd" style="background:#0f172a; border: 2px dashed #475569; border-radius:8px; padding: 1rem; display:flex; align-items:center; min-height: 54px; color:#cbd5e1; transition:all 0.2s;">
                 Guarda os arquivos de forma permanente (Windows, fotos, documentos).
               </div>

               <div class="a6-dropzone" data-target="cpu" style="background:#0f172a; border: 2px dashed #475569; border-radius:8px; padding: 1rem; display:flex; align-items:center; min-height: 54px; color:#cbd5e1; transition:all 0.2s;">
                 É o "cérebro" do PC. Realiza todos os cálculos e processa os dados.
               </div>

               <div class="a6-dropzone" data-target="power" style="background:#0f172a; border: 2px dashed #475569; border-radius:8px; padding: 1rem; display:flex; align-items:center; min-height: 54px; color:#cbd5e1; transition:all 0.2s;">
                 Recebe a energia da tomada e distribui na voltagem certa para as peças.
               </div>

               <div class="a6-dropzone" data-target="ram" style="background:#0f172a; border: 2px dashed #475569; border-radius:8px; padding: 1rem; display:flex; align-items:center; min-height: 54px; color:#cbd5e1; transition:all 0.2s;">
                 "Mesa de trabalho". Memória ultrarrápida mas temporária (apaga ao desligar).
               </div>

               <div class="a6-dropzone" data-target="motherboard" style="background:#0f172a; border: 2px dashed #475569; border-radius:8px; padding: 1rem; display:flex; align-items:center; min-height: 54px; color:#cbd5e1; transition:all 0.2s;">
                 O "esqueleto". Grande placa que conecta e permite comunicação entre todas as peças.
               </div>

               <div class="a6-dropzone" data-target="cooler" style="background:#0f172a; border: 2px dashed #475569; border-radius:8px; padding: 1rem; display:flex; align-items:center; min-height: 54px; color:#cbd5e1; transition:all 0.2s;">
                 Resfria o processador e outras peças para evitar superaquecimento.
               </div>

            </div>

          </div>
          <div id="a6-sim-1-msg" style="margin-top: 1.5rem; color:#10b981; font-weight:bold; text-align:center; min-height:24px; font-size: 1.1rem;"></div>
        </div>

        <button id="btn-next-quiz1" class="btn btn-primary" onclick="a6SetSubStage('quiz')" style="margin-top:1rem; float:right;">Concluí a Prática! Avançar para as Questões Teóricas →</button>
        <div style="clear:both;"></div>
      </div>
    `;

    setTimeout(() => {
       let partsPlaced = 0;
       const items = document.querySelectorAll('.a6-drag-item');
       const zones = document.querySelectorAll('.a6-dropzone');
       
       items.forEach(item => {
           item.addEventListener('dragstart', (e) => {
               e.dataTransfer.setData('text/plain', item.dataset.type);
               item.style.opacity = '0.6';
           });
           item.addEventListener('dragend', (e) => {
               if(item.getAttribute('draggable') === 'true') item.style.opacity = '1';
           });
       });

       zones.forEach(zone => {
           zone.addEventListener('dragover', (e) => e.preventDefault());
           zone.addEventListener('drop', (e) => {
               e.preventDefault();
               const draggedType = e.dataTransfer.getData('text/plain');
               if (draggedType === zone.dataset.target) {
                   zone.style.borderColor = '#10b981';
                   zone.style.background = 'rgba(16,185,129,0.15)';
                   zone.style.color = '#10b981';
                   
                   const draggedEl = document.querySelector(`.a6-drag-item[data-type="${draggedType}"]`);
                   if(draggedEl) {
                       zone.innerHTML = '✅ ' + draggedEl.innerText + ' — ' + zone.innerText;
                       draggedEl.style.visibility = 'hidden';
                       draggedEl.setAttribute('draggable', 'false');
                   }

                   partsPlaced++;
                   if(partsPlaced === 6) {
                       document.getElementById('a6-sim-1-msg').innerText = '🎉 Excelente! Você associou todos os componentes corretamente!';
                       document.getElementById('a6-sim-1').style.borderColor = '#10b981';
                       document.getElementById('btn-next-quiz1').style.display = 'block';
                   }
               } else {
                   document.getElementById('a6-sim-1-msg').innerText = '❌ Incorreto: A função não corresponde a este componente!';
                   document.getElementById('a6-sim-1-msg').style.color = '#ef4444';
                   zone.style.borderColor = '#ef4444';
                   setTimeout(() => {
                      zone.style.borderColor = '#475569';
                      if(partsPlaced < 6) {
                         document.getElementById('a6-sim-1-msg').innerText = '';
                         document.getElementById('a6-sim-1-msg').style.color = '#10b981';
                      }
                   }, 1500);
               }
           });
       });
    }, 100);

  } else {
    // QUIZ
    const qHtml = a6GenerateQuestions(1, [
      { q: "Qual a função do Processador (CPU)?", opts: ["Armazenar fotos", "Processar os dados (Cérebro)", "Imprimir", "Resfriar"], ans: 1 },
      { q: "Onde o sistema operacional fica instalado permanentemente?", opts: ["Na Memória RAM", "No Disco Rígido (HD/SSD)", "Na Placa Mãe", "Na Fonte"], ans: 1 },
      { q: "O que a Memória RAM faz?", opts: ["Armazena arquivos pra sempre", "Memória de trabalho rápida temporária", "Toca som", "Conecta na internet"], ans: 1 },
      { q: "A Placa-Mãe serve para:", opts: ["Conectar todas as peças", "Gerar energia", "Digitar textos", "Limpar vírus"], ans: 0 },
      { q: "Qual é a vantagem do SSD sobre o HD?", opts: ["Mais barato", "Muito mais rápido e sem peças móveis", "Tem mais vírus", "É de papel"], ans: 1 },
      { q: "O Cooler serve para:", opts: ["Aumentar memória", "Evitar superaquecimento", "Dar luz", "Mandar email"], ans: 1 },
      { q: "Um pendrive é um tipo de:", opts: ["Memória volátil", "Armazenamento portátil", "Processador", "Navegador"], ans: 1 },
      { q: "A fonte de alimentação (Power Supply):", opts: ["Dá internet", "Distribui energia elétrica adequada", "Guarda senhas", "Roda jogos"], ans: 1 }
    ]);
    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">Revisão: Componentes do Computador (Questões Teóricas)</h3>
        ${qHtml}
        <button class="btn btn-outline" onclick="a6SetSubStage('sim')" style="margin-top:1rem;">← Voltar à Prática</button>
        <button class="btn btn-primary" onclick="a6SetStage(2)" style="margin-top:1rem; float:right;">Avançar para Etapa 2 (Word) →</button>
        <div style="clear:both;"></div>
      </div>
    `;
  }
}

// ==========================================
// STAGE 2: WORD E PASTAS
// ==========================================
function renderA6Stage2(container) {
  if (window.a6State.subStage === 'sim') {
    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">O Grande Desafio Prático: Pacote Office & E-mail</h3>
        <p style="color:var(--color-text-secondary); line-height: 1.6;">Chegou a hora de provar suas habilidades! Um profissional completo precisa dominar textos, planilhas e apresentações, e saber enviá-los corretamente.</p>
        
        <div class="a6-simulator-box" id="a6-sim-2" style="background:#f8fafc; padding: 2rem; border-left: 5px solid #2563eb; align-items: flex-start; text-align:left;">
          <h4 style="color:#0f172a; margin-top: 0; font-size: 1.2rem;">💼 A Missão de Ouro</h4>
          
          <p style="color:#334155; margin-bottom: 1.5rem;">
            Você está se candidatando para a sua vaga dos sonhos e a empresa pediu um teste prático. Siga os passos utilizando seu próprio computador:
          </p>

          <ol style="color:#334155; padding-left: 1.5rem; margin-bottom: 2rem; line-height: 1.8;">
            <li>No <strong>Word</strong>: Crie o seu <strong>Currículo Profissional</strong>. Destaque seu nome em Negrito, organize sua experiência e salve como PDF.</li>
            <li>No <strong>Excel</strong>: Crie uma <strong>Planilha de Orçamento</strong> (Gastos mensais) contendo a fórmula =SOMA() e um <strong>Gráfico</strong> visual. Salve a planilha.</li>
            <li>No <strong>PowerPoint</strong>: Faça uma apresentação curta (2 a 3 slides) exibindo os resultados do seu gráfico de orçamento. Salve a apresentação.</li>
            <li>No <strong>Simulador de E-mail</strong> abaixo: Preencha os campos como se fosse um e-mail real e anexe os 3 arquivos criados!</li>
          </ol>

          <!-- Simulador de Cliente de E-mail -->
          <div style="background: white; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 8px; width: 100%; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="display:flex; align-items:center; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">
               <span style="width:60px; font-weight:bold; color:#64748b;">Para:</span>
               <input type="text" id="a6-email-to" placeholder="tutor@informestre.com.br" style="flex:1; border:none; outline:none; font-size:1rem;">
            </div>
            <div style="display:flex; align-items:center; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">
               <span style="width:60px; font-weight:bold; color:#64748b;">Assunto:</span>
               <input type="text" id="a6-email-sub" placeholder="Teste Prático - [Seu Nome]" style="flex:1; border:none; outline:none; font-size:1rem;">
            </div>
            <div style="margin-bottom: 1rem;">
               <textarea id="a6-email-body" style="width:100%; height:120px; border:1px solid #cbd5e1; border-radius:4px; padding:0.5rem; outline:none; font-family:sans-serif;" placeholder="Prezado Tutor, segue em anexo os arquivos do desafio..."></textarea>
            </div>
            <div style="margin-bottom: 1rem; background:#f1f5f9; padding:1rem; border-radius:6px; border:1px dashed #94a3b8;">
               <label style="font-weight:bold; color:#475569; display:block; margin-bottom:0.5rem;">📎 Anexar seus 3 arquivos (Currículo, Planilha, Slide):</label>
               <input type="file" id="a6-email-files" multiple style="color:#334155;">
               <p style="font-size:0.8rem; color:#64748b; margin-top:0.5rem;">Selecione os 3 arquivos de uma vez segurando o Ctrl, ou anexe um arquivo .ZIP.</p>
            </div>
            
            <div style="text-align:right;">
              <button onclick="a6SendMegaEmail()" style="background:#2563eb; color:white; border:none; padding:0.8rem 2rem; border-radius:6px; cursor:pointer; font-weight:bold; font-size:1rem;">📤 Enviar E-mail Completo</button>
            </div>
            <div id="a6-email-msg" style="margin-top: 1rem; color:#10b981; font-weight:bold; text-align:right;"></div>
          </div>
        </div>

        <button id="btn-next-quiz2" class="btn btn-primary" onclick="a6SetSubStage('quiz')" style="margin-top:1rem; float:right;">Missão Cumprida! Avançar para o Grande Quiz do Office →</button>
        <div style="clear:both;"></div>
      </div>
    `;

    window.a6SendMegaEmail = function() {
      const to = document.getElementById('a6-email-to').value.trim();
      const sub = document.getElementById('a6-email-sub').value.trim();
      const body = document.getElementById('a6-email-body').value.trim();
      const files = document.getElementById('a6-email-files').files;

      if(!to.includes('@')) { alert('Erro: Preencha o e-mail de destino corretamente.'); return; }
      if(!sub) { alert('Erro: O campo Assunto é obrigatório!'); return; }
      if(!body) { alert('Erro: Escreva um pequeno texto no corpo do e-mail.'); return; }
      if(files.length === 0) { alert('Erro: Você esqueceu de anexar os arquivos da sua missão!'); return; }

      document.getElementById('a6-email-msg').innerHTML = '✅ E-mail corporativo enviado com sucesso com ' + files.length + ' anexo(s)!';
      document.getElementById('a6-sim-2').style.borderColor='#10b981';
      document.getElementById('btn-next-quiz2').style.display = 'block';
    }

  } else {
    // QUIZ MEGA OFFICE (12 questões abrangendo Word, Excel e PPT)
    const qHtml = a6GenerateQuestions(2, [
      { q: "Qual a extensão padrão de um documento de texto do Microsoft Word?", opts: [".mp3", ".jpg", ".docx", ".exe"], ans: 2 },
      { q: "Para deixar o texto mais grosso e destacado no Word, usamos:", opts: ["Itálico", "Negrito", "Sublinhado", "Marcador"], ans: 1 },
      { q: "Como selecionamos TODO o texto de uma vez rapidamente?", opts: ["Ctrl+T (ou Ctrl+A no inglês)", "Ctrl+S", "Esc", "Enter"], ans: 0 },
      { q: "Qual atalho salva o documento rapidamente?", opts: ["Ctrl+B (ou Ctrl+S no inglês)", "Ctrl+A", "Alt+Tab", "F1"], ans: 0 },
      
      { q: "O Excel é usado principalmente para:", opts: ["Editar fotos", "Criar planilhas, cálculos e tabelas", "Assistir filmes", "Criar sites"], ans: 1 },
      { q: "Como iniciamos uma fórmula de cálculo no Excel?", opts: ["Com o sinal de %", "Com a letra X", "Com o sinal de = (Igual)", "Com a palavra CALC"], ans: 2 },
      { q: "Para somar valores da célula A1 até A5, a fórmula correta é:", opts: ["=SOMA(A1:A5)", "A1+A5", "SOMA A1,A5", "=A1*A5"], ans: 0 },
      
      { q: "O Microsoft PowerPoint é focado em:", opts: ["Editar áudio", "Criar apresentações de slides", "Navegar na internet", "Programar sistemas"], ans: 1 },
      { q: "O que é uma 'Transição' no PowerPoint?", opts: ["O modo de fechar o programa", "O efeito visual ao passar de um slide para o outro", "A cor do texto", "Um tipo de vírus"], ans: 1 },
      { q: "Para iniciar a Apresentação de Slides do começo, qual tecla é padrão?", opts: ["F5", "Enter", "Espaço", "Esc"], ans: 0 },
      
      { q: "Como cancelar uma ação que você fez errado (Desfazer) em qualquer programa do Office?", opts: ["Ctrl+Z", "Ctrl+X", "Ctrl+P", "Desligar o computador"], ans: 0 },
      { q: "Qual a grande vantagem de exportar seus documentos (Word/Excel/PPT) para PDF antes de enviá-los?", opts: ["Gasta mais espaço", "Ele se transforma num vídeo animado", "Trava o layout para que não desconfigure no computador de outra pessoa", "Ele se autodeleta depois"], ans: 2 }
    ]);
    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">Revisão: Pacote Office Corporativo (Word, Excel, PPT)</h3>
        ${qHtml}
        <button class="btn btn-outline" onclick="a6SetSubStage('sim')" style="margin-top:1rem;">← Voltar à Prática</button>
        <div style="text-align:center; margin-top:2rem;"><button class="btn btn-primary" onclick="renderA6Certificate(document.getElementById('a6-stage-content'))" style="font-size:1.2rem; padding:1rem 2rem;">🏆 Finalizar Curso e Resgatar Certificado 🏆</button></div>
        <div style="clear:both;"></div>
      </div>
    `;
  }
}

// ==========================================
// STAGE 4: GOLPES DIGITAIS (SEGURANÇA)
// ==========================================
function renderA6Stage4(container) {
  if (window.a6State.subStage === 'sim') {
    const cases = [
      { text: "E-mail do 'banco' pedindo para você clicar num link urgente e confirmar sua senha do cartão.", isGolpe: true },
      { text: "Mensagem no WhatsApp de número desconhecido com foto do seu filho pedindo Pix emergencial.", isGolpe: true },
      { text: "Acessar o site do seu banco digitando o endereço com HTTPS e cadeado verde na barra do navegador.", isGolpe: false },
      { text: "Promoção de iPhone por R$ 200 reais no Instagram que leva para um site estranho sem cadeado.", isGolpe: true },
      { text: "Você atende o telefone e uma gravação diz que seu CPF foi bloqueado. Digite 1 para falar com atendente.", isGolpe: true },
      { text: "Comprar em uma loja oficial famosa, que você mesmo procurou no Google e verificou os comentários.", isGolpe: false },
      { text: "Baixar um filme de um site cheio de botões falsos de 'Download' piscando.", isGolpe: true },
      { text: "Você recebe um arquivo .exe no email de um 'advogado' dizendo ser um processo contra você.", isGolpe: true }
    ];

    let casesHtml = cases.map((c, idx) => `
      <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:1rem; margin-bottom:1rem; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <p style="margin:0 0 1rem; font-weight:500; color:#334155;">${idx+1}. ${c.text}</p>
        <div style="display:flex; gap:1rem;">
          <button onclick="a6CheckGolpe(${idx}, true, ${c.isGolpe})" style="padding:0.6rem 1rem; border-radius:6px; cursor:pointer; background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5; font-weight:bold;">🚨 É GOLPE!</button>
          <button onclick="a6CheckGolpe(${idx}, false, ${c.isGolpe})" style="padding:0.6rem 1rem; border-radius:6px; cursor:pointer; background:#dcfce7; color:#15803d; border:1px solid #86efac; font-weight:bold;">✅ É SEGURO!</button>
        </div>
        <p id="a6-res-golpe-${idx}" style="margin:0.5rem 0 0; font-weight:bold;"></p>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">Desafio Final: Segurança e Golpes Digitais (Prática)</h3>
        <p style="color:var(--color-text-secondary); line-height: 1.6;">Saber usar o computador é ótimo, mas saber usá-lo com segurança é vital. Identifique abaixo quais situações são tentativas de golpe cibernético e quais são práticas seguras.</p>
        
        <div class="a6-simulator-box" style="background:#f8fafc; padding: 1.5rem; display:block;">
          <h4 style="margin-bottom: 1rem; color:#0f172a;">Teste de Percepção: Identifique as 8 situações</h4>
          ${casesHtml}
        </div>

        <button class="btn btn-primary" onclick="a6SetSubStage('quiz')" style="margin-top:1rem; float:right;">Concluí a Prática! Avançar para as Questões Teóricas →</button>
        <div style="clear:both;"></div>
      </div>
    `;

    window.a6CheckGolpe = function(idx, userAns, correctAns) {
      const el = document.getElementById('a6-res-golpe-'+idx);
      if (userAns === correctAns) {
        el.innerText = 'CORRETO! Você acertou a identificação.';
        el.style.color = '#10b981';
      } else {
        el.innerText = 'INCORRETO! Tenha cuidado na internet!';
        el.style.color = '#dc2626';
      }
    }
  } else {
    const qHtml = a6GenerateQuestions(4, [
      { q: "Qual a melhor forma de criar uma senha segura?", opts: ["Usar a data de nascimento", "Misturar letras, números e símbolos", "Usar '123456'", "Usar o próprio nome"], ans: 1 },
      { q: "O que é Phishing?", opts: ["Um tipo de peixe", "Um email falso tentando roubar seus dados fingindo ser oficial", "Um antivírus", "Um jogo online"], ans: 1 },
      { q: "Por que você NUNCA deve baixar anexos suspeitos de desconhecidos?", opts: ["Porque ocupa espaço no HD", "Porque podem conter vírus ou Ransomware", "Porque a internet vai cair", "Porque é ilegal"], ans: 1 },
      { q: "O que indica que um site pode ser seguro na barra de endereço?", opts: ["Um cadeado fechado (HTTPS)", "A cor vermelha", "Muitas propagandas piscando", "Não ter www"], ans: 0 },
      { q: "O que é a Autenticação em Duas Etapas (2FA)?", opts: ["Digitar a senha duas vezes", "Ter dois teclados", "Exigir uma segunda confirmação (SMS, App) além da senha", "Dividir a senha com um amigo"], ans: 2 },
      { q: "O que fazer se um 'banco' te ligar pedindo a senha do cartão?", opts: ["Falar a senha rápido", "Desligar na hora, pois banco não pede senha", "Anotar num papel para o atendente", "Dar apenas os 3 números de trás"], ans: 1 },
      { q: "Um amigo mandou no WhatsApp: 'Me empresta R$500 urgente no Pix'. O que fazer?", opts: ["Mandar imediatamente", "Ligar para o amigo e confirmar se é ele mesmo", "Bloquear o amigo para sempre", "Pedir dinheiro em troca"], ans: 1 },
      { q: "Seu PC está muito lento de repente e abrindo pop-ups sozinho. O que pode ser?", opts: ["Excesso de RAM", "HD queimado", "Infecção por vírus/malware", "Falta de bateria"], ans: 2 }
    ]);
    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">Revisão: Segurança e Golpes Digitais (Questões Teóricas)</h3>
        ${qHtml}
        <button class="btn btn-outline" onclick="a6SetSubStage('sim')" style="margin-top:1rem;">← Voltar à Prática</button>
        <div style="text-align:center; margin-top:2rem;">
          <button class="btn btn-primary" onclick="a6SetStage(4)" style="margin-top:1rem; float:right;">Avançar para Etapa Final (O Desafio) →</button><div style="clear:both;"></div>
        </div>
      </div>
    `;
  }
}


// ==========================================
// STAGE 5: INTERNET & NUVEM
// ==========================================
function renderA6Stage5(container) {
  if (window.a6State.subStage === 'sim') {
    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">Revisão: Internet, Redes e Nuvem (Prática)</h3>
        <p style="color:var(--color-text-secondary); line-height: 1.6;">A internet é o que conecta nossos computadores ao mundo. Saber diferenciar um Navegador, um Buscador e um Serviço de Nuvem é essencial.</p>
        
        <div class="a6-simulator-box" id="a6-sim-5" style="background:#f8fafc; padding: 2rem; border-left: 5px solid #8b5cf6; text-align:left;">
          <h4 style="color:#0f172a; margin-top: 0; font-size: 1.2rem;">🌐 Missão: Categorizando o Mundo Digital</h4>
          <p style="color:#334155; margin-bottom: 1.5rem;">Clique em cada serviço e escolha a qual categoria ele pertence. (Acerte os 5 para avançar)</p>

          <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px; margin: 0 auto;">
            ${renderInternetDropdown('Google Chrome', 'Navegador Web')}
            ${renderInternetDropdown('Google Drive', 'Armazenamento em Nuvem')}
            ${renderInternetDropdown('Wi-Fi', 'Conexão Sem Fio (Rede)')}
            ${renderInternetDropdown('Google.com', 'Buscador de Pesquisa')}
            ${renderInternetDropdown('Netflix', 'Serviço de Streaming (Nuvem)')}
          </div>

          <div id="a6-sim-5-msg" style="margin-top: 1.5rem; color:#10b981; font-weight:bold; text-align:center; min-height:24px; font-size: 1.1rem;"></div>
        </div>

        <button id="btn-next-quiz5" class="btn btn-primary" onclick="a6SetSubStage('quiz')" style="margin-top:1rem; float:right;">Concluí a Prática! Avançar para as Questões Teóricas →</button>
        <div style="clear:both;"></div>
      </div>
    `;

    window.a6CheckInternet = function() {
      const selects = document.querySelectorAll('.a6-net-select');
      let correct = 0;
      selects.forEach(s => {
        if(s.value === s.dataset.ans) {
          s.style.borderColor = '#10b981';
          s.style.backgroundColor = '#dcfce7';
          correct++;
        } else if(s.value !== '') {
          s.style.borderColor = '#ef4444';
          s.style.backgroundColor = '#fee2e2';
        } else {
          s.style.borderColor = '#cbd5e1';
          s.style.backgroundColor = '#fff';
        }
      });

      if(correct === 5) {
        document.getElementById('a6-sim-5-msg').innerText = '🎉 Excelente! Você entende os diferentes serviços da Internet!';
        document.getElementById('btn-next-quiz5').style.display = 'block';
        document.getElementById('a6-sim-5').style.borderColor = '#10b981';
      } else {
        document.getElementById('btn-next-quiz5').style.display = 'none';
      }
    };

  } else {
    // QUIZ
    const qHtml = a6GenerateQuestions(5, [
      { q: "O que é um Navegador (Browser)?", opts: ["O cabo que dá internet", "Um programa usado para acessar e visualizar sites (Ex: Chrome, Edge)", "Um antivírus", "O teclado do PC"], ans: 1 },
      { q: "O que significa salvar um arquivo 'Na Nuvem'?", opts: ["Imprimir o arquivo num papel", "Salvar em servidores seguros online (na internet), como Google Drive", "Apagar o arquivo para sempre", "Salvar dentro do pendrive do computador"], ans: 1 },
      { q: "Qual a diferença entre o Wi-Fi e os Dados Móveis (4G/5G)?", opts: ["O Wi-Fi só funciona no celular", "O Wi-Fi transmite a rede de um roteador local fixo, já o 4G/5G vem de torres de celular e gasta franquia", "Os dois são a mesma coisa", "O 4G usa cabos e o Wi-Fi não"], ans: 1 },
      { q: "Qual o tamanho máximo de arquivo que costuma caber em um anexo de E-mail comum (como Gmail)?", opts: ["25 Megabytes (MB)", "100 Gigabytes (GB)", "Ilimitado", "Apenas 1 Megabyte"], ans: 0 },
      { q: "Como devemos enviar arquivos muito pesados (como um vídeo de 2 Gigabytes)?", opts: ["Por e-mail comum", "Comprimindo num disquete", "Fazendo upload para a Nuvem (Ex: OneDrive/WeTransfer) e mandando o link", "Pelo correio normal (Sedex)"], ans: 2 },
      { q: "Para que serve um Buscador (ex: Google, Bing)?", opts: ["Para baixar vírus de propósito", "Para jogar video game", "Para rastrear arquivos no HD", "Para pesquisar informações, sites, imagens e notícias em toda a internet"], ans: 3 },
      { q: "O que significa 'Fazer o Download' de um arquivo?", opts: ["Apagar o arquivo da internet", "Copiar um arquivo da internet (nuvem) para o seu computador/celular", "Copiar um arquivo do seu PC para a internet", "Assistir um filme sem baixar"], ans: 1 },
      { q: "O que é mais seguro ao usar um Wi-Fi Público (ex: em um shopping ou praça)?", opts: ["Acessar o app do Banco e pagar contas", "Evitar acessar dados confidenciais ou inserir senhas importantes", "Mandar senhas no WhatsApp", "Baixar qualquer arquivo"], ans: 1 }
    ]);
    container.innerHTML = `
      <div class="a6-content-box">
        <h3 style="color:#00B894;">Revisão: Internet, Nuvem e Segurança Básica (Questões Teóricas)</h3>
        ${qHtml}
        <button class="btn btn-outline" onclick="a6SetSubStage('sim')" style="margin-top:1rem;">← Voltar à Prática</button>
        <div style="text-align:center; margin-top:3rem;">
          <button class="btn btn-primary" a6SetStage(3) style="font-size:1.2rem; padding:1rem 2rem;">Avançar para Etapa 3 (Segurança e Golpes) →</button>
        </div>
      </div>
    `;
  }
}

function renderInternetDropdown(label, answer) {
  const opts = [
    'Buscador de Pesquisa',
    'Armazenamento em Nuvem',
    'Navegador Web',
    'Conexão Sem Fio (Rede)',
    'Serviço de Streaming (Nuvem)'
  ].map(o => `<option value="${o}">${o}</option>`).join('');
  
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:1rem; border:1px solid #cbd5e1; border-radius:8px;">
      <strong style="color:#334155;">${label}</strong>
      <select class="a6-net-select" data-ans="${answer}" onchange="a6CheckInternet()" style="padding:0.5rem; border-radius:6px; border:1px solid #cbd5e1; outline:none; font-weight:bold; color:#475569;">
        <option value="">Selecione a Categoria...</option>
        ${opts}
      </select>
    </div>
  `;
}


// ==========================================
// STAGE: CERTIFICADO FINAL
// ==========================================
window.renderA6Certificate = function(container) {
  // Ocultar o stepper para dar destaque total
  const stepper = document.querySelector('.a6-stepper');
  if(stepper) stepper.style.display = 'none';

  container.innerHTML = `
    <div style="animation: fadeIn 1s ease; text-align:center; padding: 2rem 0;">
      <h1 style="font-size: 3rem; margin-bottom: 0; color: #f59e0b; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">🎉 PARABÉNS! 🎉</h1>
      <h2 style="color: var(--color-text-primary); margin-top: 0.5rem; font-size: 1.8rem;">Você é oficialmente um Mestre da Informática!</h2>
      
      <p style="max-width: 600px; margin: 1.5rem auto 2.5rem; color: var(--color-text-secondary); font-size: 1.1rem; line-height: 1.6;">
        Toda grande jornada começa com um pequeno clique. Você desbravou o mundo do hardware, dominou os mistérios do sistema operacional, criou documentos incríveis e aprendeu a se proteger na selva digital da internet.
        <br><br>
        <strong>O mundo digital agora é seu!</strong>
      </p>

      <!-- CERTIFICADO CSS -->
      <div style="background: linear-gradient(135deg, #1e293b, #0f172a); border: 8px double #d97706; border-radius: 16px; padding: 3rem; max-width: 800px; margin: 0 auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3); position: relative; overflow: hidden;">
        
        <!-- Fundo decorativo -->
        <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: rgba(245,158,11,0.1); border-radius: 50%; filter: blur(20px);"></div>
        <div style="position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; background: rgba(16,185,129,0.1); border-radius: 50%; filter: blur(30px);"></div>

        <div style="position: relative; z-index: 1;">
          <h3 style="color: #f59e0b; font-family: 'Georgia', serif; font-size: 2.5rem; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Certificado de Conclusão</h3>
          <p style="color: #94a3b8; font-size: 1.2rem; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Curso de Informática Básica</p>
          
          <div style="margin: 2.5rem 0;">
            <p style="color: #cbd5e1; font-size: 1.1rem; margin-bottom: 0.5rem;">Certificamos que</p>
            <h2 style="color: #fff; font-size: 2.2rem; margin: 0; border-bottom: 2px solid #475569; display: inline-block; padding: 0 2rem 0.5rem;">${window.currentUserProfile && window.currentUserProfile.full_name ? window.currentUserProfile.full_name : 'Aluno(a) de Destaque'}</h2>
            <p style="color: #cbd5e1; font-size: 1.1rem; margin-top: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">
              Concluiu com êxito todas as etapas de aprendizado, simulações práticas e avaliações de conhecimento, adquirindo as seguintes competências:
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: left; max-width: 600px; margin: 0 auto 3rem; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <div style="color: #e2e8f0;"><span style="color:#10b981; margin-right:8px;">✔</span> Arquitetura e Hardware</div>
            <div style="color: #e2e8f0;"><span style="color:#10b981; margin-right:8px;">✔</span> Sistema Windows e Pastas</div>
            <div style="color: #e2e8f0;"><span style="color:#10b981; margin-right:8px;">✔</span> Internet, Nuvem e E-mail</div>
            <div style="color: #e2e8f0;"><span style="color:#10b981; margin-right:8px;">✔</span> Segurança e Golpes Digitais</div>
            <div style="color: #e2e8f0; grid-column: span 2; text-align:center; margin-top:0.5rem;"><span style="color:#10b981; margin-right:8px;">✔</span> Pacote Office (Word, Excel, PowerPoint)</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 2rem;">
            <div style="text-align: center;">
              <div style="width: 150px; border-bottom: 1px solid #64748b; margin-bottom: 0.5rem; color:#e2e8f0; font-weight:bold; padding-bottom:5px;">${window.schoolProfile && window.schoolProfile.name ? window.schoolProfile.name : 'InforMestre Escolas'}</div>
              <span style="color: #94a3b8; font-size: 0.9rem;">Instituição de Ensino</span>
            </div>
            
            <div style="width: 80px; height: 80px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px dashed #fff; color: #fff; font-size: 2rem; transform: rotate(-15deg); box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
              🏆
            </div>

            <div style="text-align: center;">
              <div style="width: 150px; border-bottom: 1px solid #64748b; margin-bottom: 0.5rem; color:#e2e8f0; font-family:monospace;">${new Date().toLocaleDateString('pt-BR')}</div>
              <span style="color: #94a3b8; font-size: 0.9rem;">Data de Conclusão</span>
            </div>
          </div>

        </div>
      </div>
      
      <div style="margin-top: 3rem;">
        <button class="btn btn-primary" onclick="window.InforMestreModule3.switchLessonTab('mission')" style="font-size: 1.2rem; padding: 1rem 2.5rem; background: #10b981; border: none; cursor: pointer; color: white; font-weight: bold; border-radius: 8px;">
          Voltar para a Plataforma e Coletar Recompensas
        </button>
      </div>

    </div>
  `;
};
// Helper to generate multiple choice
function a6GenerateQuestions(stageId, qArray) {
  let html = '';
  qArray.forEach((item, qIdx) => {
    let optsHtml = item.opts.map((o, oIdx) => `
      <div class="a6-option" id="a6-opt-${stageId}-${qIdx}-${oIdx}" onclick="a6SelectOpt(${stageId}, ${qIdx}, ${oIdx}, ${item.ans})">${o}</div>
    `).join('');
    
    html += `
      <div class="a6-question">
        <p style="font-weight:bold; color:var(--color-text-primary); margin-bottom:1rem;">${qIdx+1}. ${item.q}</p>
        ${optsHtml}
        <p id="a6-feed-${stageId}-${qIdx}" style="margin-top:0.5rem; font-weight:bold;"></p>
      </div>
    `;
  });
  return html;
}

window.a6SelectOpt = function(stageId, qIdx, oIdx, correctIdx) {
  for(let i=0; i<4; i++) {
    const el = document.getElementById(`a6-opt-${stageId}-${qIdx}-${i}`);
    if(el) {
      el.classList.remove('selected');
      el.style.borderColor = 'var(--color-border)';
    }
  }
  const sel = document.getElementById(`a6-opt-${stageId}-${qIdx}-${oIdx}`);
  if(sel) sel.classList.add('selected');

  const feed = document.getElementById(`a6-feed-${stageId}-${qIdx}`);
  if (oIdx === correctIdx) {
    feed.innerText = 'Resposta Certa! 🎉';
    feed.style.color = '#10b981';
    sel.style.borderColor = '#10b981';
  } else {
    feed.innerText = 'Incorreto! Tente de novo.';
    feed.style.color = '#ef4444';
    sel.style.borderColor = '#ef4444';
  }
}
