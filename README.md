# Cryptocurrency News Website

## Overview
This project is a fully functional cryptocurrency news website that fetches and displays the latest news articles from around the world. The website is built using React and TypeScript, providing a modern and responsive user experience.

## Features
- Fetches cryptocurrency news from a reliable API.
- Displays news articles in a user-friendly layout.
- Includes a navigation bar with links to various sections.
- Responsive design for optimal viewing on different devices.
- Dark mode toggle for user preference.
- Sidebar with trending coins and categories.
- Footer with important links and social media connections.

## Technologies Used
- React
- TypeScript
- CSS
- Cryptocurrency News API

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/crypto-news-website.git
   ```
2. Navigate to the project directory:
   ```
   cd crypto-news-website
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application
To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Directory Structure
```
crypto-news-website
├── public
│   └── index.html
├── src
│   ├── assets
│   │   └── styles
│   │       └── theme.css
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── NewsList.tsx
│   │   ├── NewsCard.tsx
│   │   └── Sidebar.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   └── Article.tsx
│   ├── services
│   │   └── newsApi.ts
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.