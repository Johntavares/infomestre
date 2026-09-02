const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const slides = [
  "🎬 Retomada da Aula 1",
  "🔎 O que são mecanismos de busca",
  "🧠 Palavras-chave",
  "🎯 Como melhorar uma pesquisa",
  "📄 Entendendo os resultados do Google",
  "💰 Anúncios e resultados patrocinados",
  "🔍 Como avaliar uma fonte",
  "📅 Data, autor e contexto",
  "🔄 Comparando informações",
  "🖥️ Demonstração prática",
  "🎮 Desafio — Detetive da Internet",
  "🧠 Quiz de revisão",
  "👨‍🏫 Atividade extra do tutor",
  "📝 Resumo e fechamento"
];

const outDir = path.join(__dirname, 'images', 'm3', 'aula2');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const htmlTemplate = (title) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
  body {
    margin: 0;
    padding: 0;
    width: 1920px;
    height: 1080px;
    background: radial-gradient(circle at 80% 20%, #1a2a42 0%, #0a111a 80%);
    font-family: 'Inter', sans-serif;
    color: white;
    position: relative;
    overflow: hidden;
  }
  
  /* Decorative abstract circles simulating the theme */
  .circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .c1 { width: 800px; height: 800px; top: -200px; right: -200px; }
  .c2 { width: 1200px; height: 1200px; bottom: -400px; left: -200px; border: 2px solid rgba(255,255,255,0.03); }
  .c3 { width: 600px; height: 600px; top: 300px; left: 400px; border: 1px solid rgba(255,255,255,0.04); }
  
  .header {
    position: absolute;
    top: 80px;
    left: 120px;
    color: #00B894;
    font-size: 38px;
    font-weight: 400;
    letter-spacing: 1px;
  }
  
  .content {
    position: absolute;
    top: 50%;
    left: 120px;
    transform: translateY(-50%);
    max-width: 1600px;
  }
  
  h1 {
    font-size: 110px;
    font-weight: 800;
    line-height: 1.25;
    margin: 0;
    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
</style>
</head>
<body>
  <div class="circle c1"></div>
  <div class="circle c2"></div>
  <div class="circle c3"></div>
  
  <div class="header">Módulo 3 • Aula 2</div>
  
  <div class="content">
    <h1>${title}</h1>
  </div>
</body>
</html>
`;

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  for (let i = 0; i < slides.length; i++) {
    const title = slides[i];
    await page.setContent(htmlTemplate(title), { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(outDir, `slide_${i + 1}.png`) });
    console.log(`Generated slide ${i + 1}`);
  }
  await browser.close();
}

run().catch(console.error);
