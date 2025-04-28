// main.js for CryptoPulse static homepage
// Replace 'YOUR_NEWSAPI_KEY' with your NewsAPI.org key
const NEWS_API_KEY = 'a74a4f348bf943159dfbc96c0578108f';
const NEWS_API_URL = 'https://newsapi.org/v2/everything?q=cryptocurrency&language=en&sortBy=publishedAt&pageSize=8&apiKey=' + NEWS_API_KEY;
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,xrp,cardano,polkadot,dogecoin,tron&order=market_cap_desc&per_page=8&page=1&sparkline=false';

// Hero Slider Data (static headlines for demo)
const HERO_SLIDES = [
  {
    title: 'Bitcoin Price Hits $100,000',
    summary: 'Bitcoin reaches a new all-time high, breaking the $100,000 barrier.',
    image: 'assets/logo.svg',
    url: 'news.html#bitcoin-price-hits-100k',
  },
  {
    title: 'Ethereum 2.0 Launches Successfully',
    summary: 'Ethereum upgrades to proof-of-stake, boosting scalability and security.',
    image: 'assets/logo.svg',
    url: 'news.html#ethereum-2-launch',
  },
  {
    title: 'DeFi Market Surpasses $200B',
    summary: 'Decentralized Finance continues its explosive growth in 2025.',
    image: 'assets/logo.svg',
    url: 'news.html#defi-market-200b',
  },
];

function renderHeroSlider() {
  const slider = document.getElementById('hero-slider');
  let current = 0;
  function showSlide(idx) {
    const slide = HERO_SLIDES[idx];
    slider.innerHTML = `<a href="${slide.url}" style="display:flex;align-items:center;gap:24px;color:#fff;text-decoration:none;width:100%"><img src="${slide.image}" alt="${slide.title}" style="height:120px;border-radius:8px"><div><h2 style="margin:0;font-size:2rem">${slide.title}</h2><p style="margin:0.5rem 0 0 0;font-size:1.1rem;color:#FFD700">${slide.summary}</p></div></a>`;
  }
  showSlide(current);
  setInterval(() => {
    current = (current + 1) % HERO_SLIDES.length;
    showSlide(current);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', function() {
  renderHeroSlider();
  fetchLatestNews();
  fetchTrendingCoins();
  renderTopStories();
  setupNewsletterForm();
});

function fetchLatestNews() {
  fetch(NEWS_API_URL)
    .then(res => res.json())
    .then(data => {
      const newsList = document.getElementById('latest-news');
      newsList.innerHTML = '';
      (data.articles || []).forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <img src="assets/logo.svg" alt="Bitcoin price all-time high April 2025">
          <h3><a href="article-bitcoin-price-hits-100k.html">Bitcoin Price Hits $100,000</a></h3>
          <p>Bitcoin's price reaches an all-time high of $100,000. Read the latest analysis and future forecasts in today's crypto news.</p>
          <a href="article-bitcoin-price-hits-100k.html">Read Full Article</a>
        `;
        newsList.appendChild(card);
      });
    });
}

function fetchTrendingCoins() {
  fetch(COINGECKO_API_URL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('trending-coins-list');
      list.innerHTML = '';
      data.forEach(coin => {
        const li = document.createElement('li');
        li.textContent = `${coin.name} $${coin.current_price}`;
        list.appendChild(li);
      });
    });
}

function renderTopStories() {
  // For demo, use static stories
  const stories = [
    { title: 'Bitcoin Price Hits $100,000', url: 'news.html#bitcoin-price-hits-100k' },
    { title: 'Ethereum 2.0 Launches Successfully', url: 'news.html#ethereum-2-launch' },
    { title: 'DeFi Market Surpasses $200B', url: 'news.html#defi-market-200b' },
  ];
  const list = document.getElementById('top-stories-list');
  list.innerHTML = '';
  stories.forEach(story => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${story.url}">${story.title}</a>`;
    list.appendChild(li);
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const msg = document.getElementById('newsletter-message');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.value })
      })
      .then(res => {
        if (res.ok) {
          msg.textContent = 'Thank you for subscribing!';
          msg.style.color = '#FFD700';
          form.reset();
        } else {
          msg.textContent = 'Subscription failed. Please try again.';
          msg.style.color = 'red';
        }
      });
    });
  }
}
