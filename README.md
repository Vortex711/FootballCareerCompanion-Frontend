# ⚽ Football Career Companion – Frontend

A minimal React frontend for the **Football Career Companion** project — a career tracking and narrative engine for FIFA / eFootball Career Mode players.

This app allows users to log matches, track seasons, and generate AI-powered match reports and season summaries.

---

## 🚀 Features

- 🔐 User authentication (JWT-based)
- 📁 View and navigate careers
- 📅 Browse seasons within a career
- ⚽ Add matches with detailed inputs
- 📝 View AI-generated match narratives
- 📊 Generate and view season summaries
- 🧭 Clean navigation with persistent navbar
- ⚡ Loading states for async actions

---

## 🛠 Tech Stack

- React (Vite)
- JavaScript
- Axios
- React Router
- Basic CSS (custom styling)

---

## 📂 Project Structure

```
src/
├── api/                # Axios config (JWT handling)
├── components/         # Reusable components
├── pages/              # Main pages (Login, Careers, Seasons, Matches)
├── styles/             # Global CSS
├── App.jsx             # Routing setup
├── main.jsx            # Entry point
```

---

## 🔐 Authentication

- Login returns a JWT token
- Token is stored in `localStorage`
- Automatically attached to API requests via Axios interceptor

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/Vortex711/FootballCareerCompanion-Frontend.git
cd your-repo-name
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the root:

```
VITE_API_URL=https://localhost:7117/api
```

---

### 4. Run the app

```
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 🔗 Backend

This frontend connects to an ASP.NET Core Web API backend.

👉 Make sure the backend is running before using the app.

---

## 🧠 How It Works

- Users log matches manually
- Backend generates narratives using an LLM
- Narratives are stored and retrieved (not regenerated)
- Season summaries are generated on demand

---

## 🎯 Design Philosophy

- Keep it **simple and functional**
- Focus on **end-to-end flow**
- Avoid unnecessary UI complexity
- Prioritize backend integration and data flow

---

## ⚠️ Notes

- This is an MVP-level frontend
- UI is intentionally minimal
- No global state management (kept simple with local state)

---

## 📌 Future Improvements

- Better loading indicators
- Pagination / lazy loading for matches
- Improved UI/UX polish
- Error handling improvements
- Mobile responsiveness

---

## 👨‍💻 Author

Built as a full-stack project to demonstrate:

- API integration
- Clean frontend architecture
- Real-world async handling
- AI-driven features

---

## ⭐ If you found this interesting

Feel free to star the repo or explore the backend implementation.
