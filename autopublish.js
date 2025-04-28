const fetch = require('node-fetch');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const GNEWS_API_KEY = '42e9b147279528a22a09e07adba40538';
const CATEGORIES = [
  'bitcoin',
  'ethereum',
  'altcoins',
  'defi',
  'nfts',
  'regulations',
  'blockchain-technology',
  'market-analysis',
];
const CATEGORY_QUERIES = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  altcoins: 'altcoin',
  defi: 'defi',
  nfts: 'nft',
  regulations: 'crypto regulation',
  'blockchain-technology': 'blockchain technology',
  'market-analysis': 'crypto market analysis',
};
const PUBLIC_DIR = './categories/';
const SITEMAP_PATH = './sitemap.xml';

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
  // Pick a random category
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const query = CATEGORY_QUERIES[category];
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=1&token=${GNEWS_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.articles || !data.articles.length) return;

  const article = data.articles[0];
  const slug = slugify(article.title);
  const articleDir = `${PUBLIC_DIR}${category}/${slug}`;
  const filename = `${articleDir}/index.html`;
  const siteUrl = `https://eastkode.github.io/crypto/categories/${category}/${slug}/`;
  const date = new Date().toISOString().slice(0, 10);

  // Ensure directory exists
  fs.mkdirSync(articleDir, { recursive: true });

  // Rewrite content for SEO
  const title = rewrite(article.title);
  const description = rewrite(article.description || '');
  const content = rewrite(article.content || description);

  // Generate HTML
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} | CryptoPulse</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="crypto, news, ${slug}, ${category}">
  <meta name="author" content="${article.source?.name || 'CryptoPulse Team'}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${article.image || '/assets/logo.svg'}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${siteUrl}">
  <link rel="icon" href="/assets/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles/theme.css">
</head>
<body>
  <header class="header">...existing code...</header>
  <main>
    <div class="home-container" style="max-width: 800px;">
      <article>
        <h1>${title}</h1>
        <img src="${article.image || '/assets/logo.svg'}" alt="${title}" style="width:100%;max-height:340px;object-fit:cover;border-radius:12px;margin-bottom:1.5rem">
        <div style="color:#555;margin-bottom:1rem;">Published: ${date} | Source: ${article.source?.name || 'CryptoPulse Team'}</div>
        <h2>Overview</h2>
        <p>${content}</p>
        <div style="margin:2rem 0 1rem 0;">
          <strong>Share:</strong>
          <a href="https://twitter.com/intent/tweet?url=${siteUrl}" target="_blank">Twitter</a> |
          <a href="https://www.facebook.com/sharer/sharer.php?u=${siteUrl}" target="_blank">Facebook</a> |
          <a href="https://www.linkedin.com/shareArticle?url=${siteUrl}" target="_blank">LinkedIn</a>
        </div>
      </article>
    </div>
  </main>
  <footer>...existing code...</footer>
</body>
</html>
  `;

  // Write article file
  fs.writeFileSync(filename, html, 'utf8');

  // Update sitemap.xml
  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const dom = new JSDOM(sitemap);
  const urlset = dom.window.document.querySelector('urlset');
  const newUrl = dom.window.document.createElement('url');
  newUrl.innerHTML = `
    <loc>${siteUrl}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.6</priority>
  `;
  urlset.appendChild(newUrl);
  fs.writeFileSync(SITEMAP_PATH, dom.serialize(), 'utf8');
}

fetchAndPublish();