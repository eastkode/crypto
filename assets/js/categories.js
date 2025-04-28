// categories.js for CryptoPulse Categories page
// Replace 'YOUR_NEWSAPI_KEY' with your NewsAPI.org key
const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY';
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
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=4&apiKey=${NEWS_API_KEY}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const newsList = document.getElementById('news-' + category);
      newsList.innerHTML = '';
      (data.articles || []).forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <img src="${article.urlToImage || 'assets/logo.svg'}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p>${article.description ? article.description.slice(0, 120) : ''}...</p>
          <a href="${article.url}" target="_blank" rel="noopener">Read More</a>
        `;
        newsList.appendChild(card);
      });
    });
}
