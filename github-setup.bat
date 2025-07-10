@echo off
echo.
echo 🏌️‍♂️ Golf Swing AI Trainer - GitHub Setup
echo ========================================
echo.

echo 📋 Step 1: Create GitHub Repository
echo.
echo 1. Go to https://github.com and sign in
echo 2. Click the "+" button and select "New repository"
echo 3. Repository name: golf-swing-ai-trainer
echo 4. Description: AI-powered golf swing analysis app
echo 5. Make it Public (required for GitHub Pages)
echo 6. Don't initialize with README (we already have one)
echo.

echo 📋 Step 2: Connect Repository
echo.
echo After creating the repository, run these commands:
echo.
echo git remote add origin https://github.com/YOUR_USERNAME/golf-swing-ai-trainer.git
echo git branch -M main
echo git push -u origin main
echo.

echo 📋 Step 3: Set up GitHub Secrets
echo.
echo 1. Go to repository Settings → Secrets and variables → Actions
echo 2. Add secret: GOOGLE_GEMINI_API_KEY with your API key
echo.

echo 📋 Step 4: Enable GitHub Pages
echo.
echo 1. Go to Settings → Pages
echo 2. Source: Deploy from a branch
echo 3. Branch: gh-pages
echo.

echo 🚀 Your app will be live at:
echo https://YOUR_USERNAME.github.io/golf-swing-ai-trainer/
echo.

echo 📚 For detailed instructions, see GITHUB_SETUP.md
echo.
pause
