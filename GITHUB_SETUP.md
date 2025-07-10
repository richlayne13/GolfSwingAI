# 🚀 GitHub Repository Setup Instructions

Your Golf Swing AI Trainer is ready to be deployed to GitHub! Follow these steps:

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `golf-swing-ai-trainer`
   - **Description**: `AI-powered golf swing analysis app built with React Native and Expo`
   - **Visibility**: Public (required for GitHub Pages)
   - **Don't initialize** with README, .gitignore, or license (we already have these)

## Step 2: Connect Your Local Repository

After creating the repository, run these commands:

```bash
# Navigate to your project directory
cd "g:\GolfSwingAI"

# Add the GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/golf-swing-ai-trainer.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Set up GitHub Secrets

1. Go to your GitHub repository page
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add this secret:
   - **Name**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: Your actual Google Gemini API key

## Step 4: Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **"Deploy from a branch"**
3. Choose **"gh-pages"** branch (will be created automatically by GitHub Actions)
4. Click **Save**

## Step 5: Monitor Deployment

1. Go to your repository → **Actions** tab
2. Watch the deployment workflow run
3. Once complete, your app will be live at:
   ```
   https://YOUR_USERNAME.github.io/golf-swing-ai-trainer/
   ```

## 📋 What Happens Next

- ✅ Your code is now on GitHub
- ✅ GitHub Actions will automatically build your app
- ✅ The app will be deployed to GitHub Pages
- ✅ Every future push to main will trigger redeployment

## 🔧 Quick Commands Reference

```bash
# Check current status
git status

# Push new changes
git add .
git commit -m "your commit message"
git push

# View remote repository
git remote -v
```

## 🎯 Portfolio Integration

Once deployed, you can use this URL in your portfolio:
```
https://YOUR_USERNAME.github.io/golf-swing-ai-trainer/
```

## 🆘 Need Help?

If you run into issues:
1. Check the GitHub Actions logs in the Actions tab
2. Verify your API key is set correctly in GitHub Secrets
3. Ensure your repository is public
4. Make sure GitHub Pages is enabled

---

**🎉 You're all set! Your Golf Swing AI Trainer will be live on GitHub Pages shortly after you complete these steps.**
