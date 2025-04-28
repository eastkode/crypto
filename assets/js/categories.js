// categories.js for CryptoPulse Categories page
// Removed NewsAPI references. Only using GNews API now.
// Fetch and fill news for each category with as many articles as possible from GNews
const GNEWS_API_KEY = '42e9b147279528a22a09e07adba40538';
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

function fillCategoryNews(category, query) {
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=8&token=${GNEWS_API_KEY}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const newsList = document.getElementById('news-' + category);
      newsList.innerHTML = '';
      (data.articles || []).forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <img src="${article.image || 'assets/logo.svg'}" alt="${article.title}" style="width:100%;height:140px;object-fit:cover;border-radius:8px 8px 0 0;">
          <div style="padding:1rem;display:flex;flex-direction:column;gap:0.5rem;">
            <h3 style="font-size:1.08rem;margin:0 0 0.25rem 0;"><a href="${article.url}" target="_blank" style="color:#00796b;text-decoration:none;">${article.title}</a></h3>
            <p style="font-size:0.97rem;color:#444;">${article.description ? article.description.slice(0, 120) : ''}...</p>
            <a href="${article.url}" target="_blank" style="color:#FFD700;">Read Full Article</a>
          </div>
        `;
        newsList.appendChild(card);
      });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  Object.entries(CATEGORY_QUERIES).forEach(([category, query]) => {
    fillCategoryNews(category, query);
  });
});
