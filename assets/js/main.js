// main.js for CryptoPulse static homepage
// Removed NewsAPI references. Only using GNews API now.
const GNEWS_API_KEY = '42e9b147279528a22a09e07adba40538';
const GNEWS_API_URL = `https://gnews.io/api/v4/search?q=crypto&lang=en&max=8&token=${GNEWS_API_KEY}`;
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

function renderBBCStyleNews(articles) {
  const featuredIds = [
    'featured-left',
    'featured-right',
    'featured-bottom-left',
    'featured-bottom-right'
  ];
  // Fill featured grid
  featuredIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && articles[i]) {
      el.innerHTML = `
        <img src="${articles[i].image || 'assets/logo.svg'}" alt="${articles[i].title}" style="width:100%;height:180px;object-fit:cover;">
        <h2><a href="${articles[i].url}" target="_blank" style="color:#00796b;text-decoration:none;">${articles[i].title}</a></h2>
        <p>${articles[i].description || ''}</p>
      `;
    } else if (el) {
      el.innerHTML = '';
    }
  });
  // Fill sidebar
  const sidebar = document.getElementById('sidebar-headlines');
  sidebar.innerHTML = '';
  articles.slice(4, 10).forEach(article => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
    sidebar.appendChild(li);
  });
}

function fetchAndRenderBBCNews() {
  fetch(GNEWS_API_URL)
    .then(res => res.json())
    .then(data => {
      renderBBCStyleNews(data.articles || []);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  renderHeroSlider();
  fetchLatestNews();
  fetchTrendingCoins();
  renderTopStories();
  setupNewsletterForm();
  fetchAndRenderBBCNews();
});

function fetchLatestNews() {
  fetch(GNEWS_API_URL)
    .then(res => res.json())
    .then(data => {
      const newsList = document.getElementById('latest-news');
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
