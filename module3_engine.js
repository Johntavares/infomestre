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
      ]
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
        }
      ]
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
      ]
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
      ]
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

        <!-- STEPPER DE 4 ETAPAS -->
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
      const tabs = ["presentation", "video", "slides", "quiz"];
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
            onclick="window.InforMestreModule3.finishQuiz('${lesson.id}')"
            ${allAnswered ? '' : 'disabled style="opacity:0.4; cursor:not-allowed;"'}
            style="padding: 0.95rem 2.5rem; font-size: 1rem; font-weight: 800; border-radius: 12px; background: linear-gradient(135deg, #00B894 0%, #55EFC4 100%); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 20px rgba(0,184,148,0.35);">
            <span>Concluir Aula & Resgatar +${lesson.xpReward} XP</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        </div>

      </div>
    `;
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

  // Teclado para navegar pelos slides
  window.addEventListener("keydown", function(e) {
    if (currentActiveTab === "slides") {
      if (e.key === "ArrowRight" || e.key === " ") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  // --------------------------------------------------------------------------
  // 6. EXPOSIÇÃO GLOBAL
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
