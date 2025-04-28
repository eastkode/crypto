// news.js for CryptoPulse News page
// Replace 'YOUR_NEWSAPI_KEY' with your NewsAPI.org key
const GNEWS_API_KEY = '42e9b147279528a22a09e07adba40538';
const GNEWS_API_URL = `https://gnews.io/api/v4/search?q=crypto&lang=en&max=20&token=${GNEWS_API_KEY}`;

document.addEventListener('DOMContentLoaded', function() {
  fetchAllNews();
});

function fetchAllNews() {
  fetch(GNEWS_API_URL)
    .then(res => res.json())
    .then(data => {
      const newsList = document.getElementById('all-news-list');
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
