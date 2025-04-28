const fetch = require('node-fetch');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const NEWS_API_KEY = 'a74a4f348bf943159dfbc96c0578108f';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=business&q=crypto&language=en&pageSize=1&apiKey=${NEWS_API_KEY}`;
const PUBLIC_DIR = './public/';
const SITEMAP_PATH = PUBLIC_DIR + 'sitemap.xml';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function rewrite(text) {
  if (!text) return '';
  return text
    .replace(/cryptocurrency/gi, 'digital currency')
    .replace(/Bitcoin/gi, 'BTC')
    .replace(/Ethereum/gi, 'ETH')
    .replace(/blockchain/gi, 'distributed ledger');
}

async function fetchAndPublish() {
  const res = await fetch(NEWS_API_URL);
  const data = await res.json();
  if (!data.articles || !data.articles.length) return;

  const article = data.articles[0];
  const slug = slugify(article.title);
  const filename = `article-${slug}.html`;
  const url = `https://YOUR_USERNAME.github.io/crypto-news-website/${filename}`;
  const date = new Date().toISOString().slice(0, 10);

  const title = rewrite(article.title);
  const description = rewrite(article.description || '');
  const content = rewrite(article.content || description);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} | CryptoPulse</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="crypto, news, ${slug}">
  <meta name="author" content="${article.author || 'CryptoPulse Team'}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${article.urlToImage || 'assets/logo.svg'}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <link rel="icon" href="assets/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/styles/theme.css">
</head>
<body>
  <header class="header">...existing code...</header>
  <main>
    <div class="home-container" style="max-width: 800px;">
      <article>
        <h1>${title}</h1>
        <img src="${article.urlToImage || 'assets/logo.svg'}" alt="${title}" style="width:100%;max-height:340px;object-fit:cover;border-radius:12px;margin-bottom:1.5rem">
        <div style="color:#555;margin-bottom:1rem;">Published: ${date} | By ${article.author || 'CryptoPulse Team'}</div>
        <h2>Overview</h2>
        <p>${content}</p>
        <div style="margin:2rem 0 1rem 0;">
          <strong>Share:</strong>
          <a href="https://twitter.com/intent/tweet?url=${url}" target="_blank">Twitter</a> |
          <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank">Facebook</a> |
          <a href="https://www.linkedin.com/shareArticle?url=${url}" target="_blank">LinkedIn</a>
        </div>
      </article>
    </div>
  </main>
  <footer>...existing code...</footer>
</body>
</html>
  `;

  fs.writeFileSync(PUBLIC_DIR + filename, html, 'utf8');

  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const dom = new JSDOM(sitemap);
  const urlset = dom.window.document.querySelector('urlset');
  const newUrl = dom.window.document.createElement('url');
  newUrl.innerHTML = `
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.8</priority>
  `;
  urlset.appendChild(newUrl);
  fs.writeFileSync(SITEMAP_PATH, dom.serialize(), 'utf8');
}

fetchAndPublish();