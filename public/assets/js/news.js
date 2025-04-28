// news.js for CryptoPulse News page
// Replace 'YOUR_NEWSAPI_KEY' with your NewsAPI.org key
const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY';
const NEWS_API_URL = 'https://newsapi.org/v2/everything?q=cryptocurrency&language=en&sortBy=publishedAt&pageSize=20&apiKey=' + NEWS_API_KEY;

document.addEventListener('DOMContentLoaded', function() {
  fetchAllNews();
});

function fetchAllNews() {
  fetch(NEWS_API_URL)
    .then(res => res.json())
    .then(data => {
      const newsList = document.getElementById('all-news-list');
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
