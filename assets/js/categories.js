// categories.js for CryptoPulse Categories page
// Removed NewsAPI references. Only using GNews API now.
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

document.addEventListener('DOMContentLoaded', function() {
  Object.keys(CATEGORY_QUERIES).forEach(category => {
    fetchCategoryNews(category, CATEGORY_QUERIES[category]);
  });
});

function fetchCategoryNews(category, query) {
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=4&token=${GNEWS_API_KEY}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const newsList = document.getElementById('news-' + category);
      newsList.innerHTML = '';
      (data.articles || []).forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <img src="${article.image || 'assets/logo.svg'}" alt="${article.title}">
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <p>${article.description ? article.description.slice(0, 120) : ''}...</p>
          <a href="${article.url}" target="_blank">Read Full Article</a>
        `;
        newsList.appendChild(card);
      });
    });
}
