# 🎬 Movie Explorer App

This web application allows users to search for movies, view detailed information, and discover trending films. Real-time data is fetched from [TMDb (The Movie Database)](https://www.themoviedb.org/) API.

---

## Setup Instructions

### 1. Technologies Used
- Built with React + Vite
- Styled using Material UI

### 2. Project Setup
1. **Clone or Download the Project Repository**
   ```bash
   git clone https://github.com/your-username/movie-explorer-app.git
   cd movie-explorer-app

2. **Install Dependencies**
   ```bash
   npm install

2. **Run the Development Server**
   ```bash
   npm run dev

### 3. Features
- 🔐 User Login Interface
- 🌗 Light/Dark Mode Toggle

- 🏠 Home Page Includes:
  - Search bar to find movies by title
  - Grid of clickable movie posters with title, release year, and rating
  - Trending movies section fetched from the API

- 🎬 Movie Detail View
   - Overview, details of genres, cast, and trailer link

- ❤️ Favorites Section - Save favorite movies locally
- 🔄 Infinite Scrolling - For continuous search results with load more

## Tech Stack

- Frontend: React (Vite)
- Styling: Material UI
- API: TMDb API
- State Management: React Context API
- Deployment: Netlify

## 🌍 Live Demo
👉 View Deployed App on Netlify : https://my-movies-explorer.netlify.app/

## 📌 Notes
- The app uses local storage to remember your last searched movie and saved favorites.

- You may need to configure your own TMDb API key in a .env file:
```bash
VITE_TMDB_API_KEY=your_api_key_here
