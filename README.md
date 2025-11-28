# Recipe Finder 🍳

A modern, beautiful recipe search application built with React, Vite, and Tailwind CSS. Search for recipes by ingredients using TheMealDB public API.

![Recipe Finder](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

## ✨ Features

- 🔐 **User Authentication**: Secure signup/login with password hashing
- 🔍 **Smart Search**: Search recipes by multiple ingredients (comma-separated)
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎨 **Modern UI/UX**: Unique color palette (deep teal, coral, cream) with smooth animations
- 📊 **History Tracking**: Per-user search and viewing history
- 🎯 **Recipe Details**: View ingredients, instructions, and YouTube videos
- 💾 **Local Storage**: All data stored locally in your browser

## 🎨 Design Features

- **Color Palette**: Deep Teal (#0D4B4E), Coral (#FF6B6B), Cream (#FFF8F0)
- **Animations**: Fade-in, slide-up, and scale-in effects
- **Gradients**: Modern gradient backgrounds and buttons
- **Hover Effects**: Interactive card transformations
- **Icons**: Custom SVG icons throughout

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```powershell
# Clone the repository
git clone https://github.com/yourusername/spark_project.git
cd spark_project

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```powershell
npm run build
npm run preview
```

## 📦 Deployment to GitHub Pages

### Step 1: Update Repository Name

If your repository name is different from `spark_project`, update line 7 in `vite.config.js`:

```js
base: process.env.GITHUB_ACTIONS ? '/your-repo-name/' : '/',
```

### Step 2: Push to GitHub

```powershell
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit with modern UI"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. The workflow will automatically deploy on every push to `main`

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## 🛠️ Tech Stack

- **Frontend**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.17
- **API**: TheMealDB (free public API)
- **Authentication**: Client-side with SHA-256 hashing
- **Storage**: LocalStorage for user data and history

## 📂 Project Structure

```
spark_project/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login page
│   │   ├── Signup.jsx         # Signup page
│   │   ├── SearchBar.jsx      # Search input component
│   │   ├── RecipeList.jsx     # Recipe grid
│   │   ├── RecipeCard.jsx     # Individual recipe card
│   │   └── History.jsx        # User history page
│   ├── utils/
│   │   └── auth.js            # Password hashing utilities
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles + Tailwind
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages deployment
├── public/                    # Static assets
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.cjs       # Tailwind configuration
└── package.json              # Dependencies
```

## 🎯 Usage

1. **Sign Up**: Create an account with username and password
2. **Search**: Enter ingredients separated by commas (e.g., "chicken, garlic, tomato")
3. **View Recipes**: Click "View Recipe" to see full details
4. **History**: Check your search and viewing history

## 🔒 Security Note

This app uses client-side authentication for demonstration purposes. Passwords are hashed using SHA-256 before storing in localStorage. **Do not use this authentication pattern for production applications** - always use proper server-side authentication with secure backend services.

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Credits

- Recipe data from [TheMealDB](https://www.themealdb.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Built with ❤️ using React and Tailwind CSS
