-- ============================================================================
-- INFORMESTRE LMS SAAS — ESTRUTURA COMPLETA DE BANCO DE DADOS (SUPABASE / POSTGRES)
-- ============================================================================

-- 1. TABELA DE USUÁRIOS E PERMISSÕES (users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  avatar TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin', 'school')),
  school_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DE CURSOS (courses)
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  price NUMERIC(10,2) DEFAULT 0.00,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABELA DE MÓDULOS (modules)
CREATE TABLE IF NOT EXISTS public.modules (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABELA DE AULAS (lessons)
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  summary TEXT,
  objectives JSONB DEFAULT '[]'::jsonb,
  duration TEXT DEFAULT '30 min',
  order_index INT NOT NULL DEFAULT 1,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  video_provider TEXT DEFAULT 'youtube' CHECK (video_provider IN ('youtube', 'vimeo', 'bunny', 'mux', 'cloudflare')),
  video_url TEXT DEFAULT '',
  video_id TEXT DEFAULT '',
  exercise JSONB DEFAULT '{}'::jsonb,
  allowed_extensions JSONB DEFAULT '[]'::jsonb,
  unlock_rule TEXT DEFAULT 'previous_completed',
  certificate_eligible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABELA DE MATRÍCULAS (enrollments)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'canceled')),
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  progress_percentage NUMERIC(5,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- 6. TABELA DE PROGRESSO DA AULA (lesson_progress)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  video_progress NUMERIC(5,2) DEFAULT 0.00,
  watch_completed BOOLEAN DEFAULT FALSE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  time_watched INT DEFAULT 0,
  favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- 7. TABELA DE SUBMISSÕES / TRABALHOS VERSIONADOS (submissions)
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  version INT NOT NULL DEFAULT 1,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('not_started', 'submitted', 'reviewing', 'approved', 'redo', 'completed')),
  grade NUMERIC(4,2),
  feedback TEXT,
  reviewed_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABELA DE ANOTAÇÕES PRIVADAS DO ALUNO (student_notes)
CREATE TABLE IF NOT EXISTS public.student_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- 9. TABELA DE FÓRUM DE DÚVIDAS / PERGUNTAS (questions)
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'answered', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TABELA DE RESPOSTAS DOS PROFESSORES (answers)
CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TABELA DE CERTIFICADOS (certificates)
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  certificate_code TEXT UNIQUE NOT NULL,
  pdf_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- 12. TABELA DE GAMIFICAÇÃO E RECOMPENSAS (student_rewards)
CREATE TABLE IF NOT EXISTS public.student_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  badges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SEED DE DADOS INICIAIS (CURSO E MÓDULO 2 — PACOTE OFFICE)
-- ============================================================================

INSERT INTO public.courses (id, title, description, status)
VALUES ('curso-informatica-basica', 'Informática Básica & Produtividade Digital', 'Curso completo gamificado de informática, hardware, Windows e Pacote Office.', 'published')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, order_index)
VALUES 
  ('modulo-1', 'curso-informatica-basica', 'Módulo 1 — Fundamentos & Windows', 'Fundamentos de hardware, periféricos e sistema operacional.', 1),
  ('modulo-2', 'curso-informatica-basica', 'Módulo 2 — Pacote Office (Videoaulas)', 'Edição de documentos, planilhas inteligentes e apresentações profissionais.', 2)
ON CONFLICT (id) DO NOTHING;

-- AULAS DO MÓDULO 2
INSERT INTO public.lessons (id, module_id, title, description, summary, objectives, duration, order_index, status, video_provider, video_url, exercise, allowed_extensions)
VALUES 
(
  'm2-aula-1',
  'modulo-2',
  'Aula 1 — Conhecendo o Microsoft Word',
  'O que é o Microsoft Word, para que serve, interface do programa, criando o primeiro documento, digitação correta, quebra automática de linha, uso correto da tecla Enter e salvamento de documentos.',
  'Apresentar o Word, sua interface e as funções básicas de edição de texto para criar seus primeiros documentos profissionais.',
  '["O que é o Microsoft Word e para que serve", "Interface do programa e navegação", "Criando o primeiro documento e digitação correta", "Quebra automática de linha, uso correto do Enter e salvar documentos"]'::jsonb,
  '30 min',
  1,
  'published',
  'youtube',
  'https://youtu.be/c7ghmlRAsSo',
  '{"title": "Desafio 01 — Apresentação Pessoal", "instructions": "Criar um pequeno texto de apresentação pessoal no Microsoft Word e salvar nos formatos .docx ou .pdf."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
),
(
  'm2-aula-2',
  'modulo-2',
  'Aula 2 — Atalhos Básicos no Microsoft Word',
  'Aprenda os 5 atalhos essenciais do Word (Ctrl+Z, Ctrl+C, Ctrl+V, Ctrl+L e Ctrl+A) para copiar, colar, desfazer, localizar e selecionar textos.',
  'Nesta aula você aprenderá a dominar os atalhos de teclado mais utilizados no dia a dia do Microsoft Word: Ctrl+Z (Desfazer), Ctrl+C (Copiar), Ctrl+V (Colar), Ctrl+L (Localizar palavras) e Ctrl+A (Selecionar Tudo). Aprenda a editar e organizar seus documentos com muito mais praticidade.',
  '["Ctrl+C e Ctrl+V: Copiar e Colar textos e trechos sem precisar reescrever", "Ctrl+Z: Desfazer a última ação rapidamente em caso de erro", "Ctrl+L e Ctrl+A: Localizar palavras específicas no documento e Selecionar todo o conteúdo"]'::jsonb,
  '35 min',
  2,
  'published',
  'youtube',
  'https://youtu.be/9i3aB-6AofE',
  '{"title": "Desafio 02 — Prática dos Atalhos Básicos (Ctrl+Z, Ctrl+C, Ctrl+V, Ctrl+L, Ctrl+A)", "instructions": "Abra o Microsoft Word e digite um pequeno texto. Treine a utilização de Ctrl+C e Ctrl+V para duplicar trechos, use Ctrl+Z para desfazer uma digitação, use Ctrl+L para buscar uma palavra e Ctrl+A para selecionar todo o texto. Envie seu arquivo nos formatos .docx ou .pdf."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
),
(
  'm2-aula-3',
  'modulo-2',
  'Aula 3 — Projeto Prático: Currículo e Contrato',
  'Estrutura de currículo (cabeçalho, experiência, formação, competências), inserção de tabelas, contrato simples, revisão ortográfica e impressão em PDF.',
  'Aplicar todos os recursos aprendidos na criação de um currículo profissional e um contrato fictício simples.',
  '["Estrutura de currículo (cabeçalho, experiência profissional, formação e competências)", "Inserção e formatação de tabelas", "Elaboração de contrato simples e revisão ortográfica", "Impressão e exportação em PDF"]'::jsonb,
  '45 min',
  3,
  'published',
  'youtube',
  'https://youtu.be/D-Myx_d5Xu0',
  '{"title": "Desafio Final do Word — Currículo Profissional & Contrato Fictício", "instructions": "Criar um Currículo Profissional formatado e um Contrato Fictício simples. Envie os arquivos em .docx ou .pdf."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
),
(
  'm2-aula-4',
  'modulo-2',
  'Aula 4 — Introdução ao Excel',
  'O que é Excel, interface, linhas, colunas, células, seleção, inserção de dados e salvamento.',
  'Conhecer o ambiente da planilha eletrônica e entender a estrutura de células no Excel.',
  '["Conhecemos o Excel e sua finalidade.", "Aprendemos o que são linhas, colunas e células.", "Entendemos os endereços das células.", "Aprendemos a inserir textos, números e datas.", "Criamos nossa primeira tabela de dados.", "Praticamos a organização de informações em uma planilha."]'::jsonb,
  '40 min',
  4,
  'published',
  'youtube',
  'https://youtu.be/NW8NzakpDAY',
  '{"title": "Desafio 04 — Tabela Simples de Despesas", "instructions": "Criar uma tabela simples de despesas listando itens, categorias e valores no Excel. Envie em .xlsx."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
),
(
  'm2-aula-5',
  'modulo-2',
  'Aula 5 — Fórmulas e Funções',
  'Cálculos automáticos utilizando Soma, Média, Máximo, Mínimo, Contagem, referência de células e AutoPreenchimento.',
  'Realizar cálculos automáticos no Excel utilizando as principais funções matemáticas e estatísticas.',
  '["Funções =SOMA(), =MÉDIA(), =MÁXIMO(), =MÍNIMO() e =CONT.VALORES()", "Referência de células e operadores", "Uso da alça de AutoPreenchimento"]'::jsonb,
  '45 min',
  5,
  'draft',
  'youtube',
  '',
  '{"title": "Desafio 05 — Planilha de Controle Financeiro Mensal", "instructions": "Criar uma planilha de controle financeiro mensal com fórmulas automáticas de Soma e Média. Envie em .xlsx."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
),
(
  'm2-aula-6',
  'modulo-2',
  'Aula 6 — Organização e Análise de Dados',
  'Formatação de células (Moeda, Datas, Porcentagem), classificação, filtros, gráficos e impressão.',
  'Organizar informações de forma eficiente aplicando formatos visuais, filtros e gráficos analíticos.',
  '["Formatação de células (Moeda, Datas, Porcentagem)", "Classificação e aplicação de Filtros de dados", "Criação de Gráficos e configuração de Impressão"]'::jsonb,
  '45 min',
  6,
  'draft',
  'youtube',
  '',
  '{"title": "Desafio Final do Excel — Orçamento Familiar com Gráfico", "instructions": "Criar uma planilha de orçamento familiar completa formatada em moeda R$ contendo fórmulas e um gráfico explicativo. Envie em .xlsx."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
),
(
  'm2-aula-7',
  'modulo-2',
  'Aula 7 — Criando Apresentações',
  'Interface do PowerPoint, slides, temas, layouts, inserção de textos, imagens, ícones e elementos SmartArt.',
  'Conhecer o PowerPoint e criar apresentações visuais profissionais utilizando temas, imagens e SmartArt.',
  '["Interface, slides, temas e layouts", "Inserção de textos, imagens e ícones", "Uso de elementos gráficos SmartArt"]'::jsonb,
  '35 min',
  7,
  'draft',
  'youtube',
  '',
  '{"title": "Desafio 07 — Apresentação Pessoal", "instructions": "Criar uma apresentação pessoal no PowerPoint com no mínimo 3 slides contendo textos, imagens e ícones. Envie em .pptx ou .pdf."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
),
(
  'm2-aula-8',
  'modulo-2',
  'Aula 8 — Projeto Final',
  'Animações, transições, apresentação de slides, organização visual, boas práticas e consolidação de todo o conhecimento.',
  'Consolidar todo o conhecimento adquirido no Módulo 2 desenvolvendo uma apresentação profissional completa.',
  '["Animações de elementos e Transições de slides", "Organização visual e boas práticas de apresentação", "Construção completa: Capa, Objetivos, Conteúdo, Imagens, SmartArt, Ícones e Slide final"]'::jsonb,
  '50 min',
  8,
  'draft',
  'youtube',
  '',
  '{"title": "Projeto Final — Apresentação Profissional Completa", "instructions": "Criar uma apresentação completa sobre um tema de livre escolha utilizando: Capa, Objetivos, Conteúdo, Imagens, SmartArt, Ícones, Animações, Transições e Slide Final. Envie em .pptx ou .pdf."}'::jsonb,
  '[".docx", ".xlsx", ".pptx", ".pdf"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  summary = EXCLUDED.summary,
  objectives = EXCLUDED.objectives,
  duration = EXCLUDED.duration,
  exercise = EXCLUDED.exercise,
  allowed_extensions = EXCLUDED.allowed_extensions;
