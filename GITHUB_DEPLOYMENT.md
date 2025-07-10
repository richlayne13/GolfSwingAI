# 🚀 GitHub Deployment Guide

Complete guide to deploy your Golf Swing AI Trainer to GitHub with automatic GitHub Pages hosting.

## 🎯 Quick Deploy Steps

### 1. Push to GitHub Repository
```bash
# Add all files to staging
git add .

# Commit changes
git commit -m "feat: complete Golf Swing AI Trainer with deployment setup"

# Create and push to GitHub (replace with your username/repo)
git remote add origin https://github.com/yourusername/golf-swing-ai-trainer.git
git branch -M main
git push -u origin main
```

### 2. Set up GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** (will be created automatically)
5. Folder: **/ (root)**

### 3. Set up GitHub Actions for Automatic Deployment
The workflow file will automatically build and deploy your app to GitHub Pages.

---

## 🔧 Automated Deployment Setup

### GitHub Actions Workflow
This workflow will:
- Build your Expo web app
- Deploy to GitHub Pages automatically
- Update on every push to main branch

### Environment Variables Setup
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `GOOGLE_GEMINI_API_KEY`: Your Google Gemini API key

---

## 📁 Repository Structure
```
golf-swing-ai-trainer/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── screens/                    # App screens
├── assets/                     # Images and icons
├── package.json               # Dependencies
├── app.json                   # Expo configuration
├── App.js                     # Main app component
├── .env.example              # Environment variables template
├── README.md                 # Project documentation
├── PORTFOLIO_README.md       # Portfolio documentation
├── DEPLOYMENT_GUIDE.md       # This file
└── .gitignore               # Git ignore rules
```

---

## 🌐 Access Your Deployed App

After deployment, your app will be available at:
```
https://yourusername.github.io/golf-swing-ai-trainer/
```

---

## 🔧 Manual Deployment Commands

If you prefer manual deployment:

```bash
# 1. Build for web
npx expo export --platform web

# 2. Deploy to gh-pages branch
npx gh-pages -d dist

# 3. Your app will be live at:
# https://yourusername.github.io/repository-name/
```

---

## 📋 Deployment Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Actions workflow configured
- [ ] Environment variables set in GitHub Secrets
- [ ] GitHub Pages enabled
- [ ] App successfully deployed and accessible

---

## 🔐 Security Best Practices

### Environment Variables
- Never commit `.env` files to GitHub
- Use GitHub Secrets for sensitive data
- The workflow will automatically inject environment variables

### API Key Management
- Store API keys in GitHub Secrets
- Use different keys for development and production
- Monitor API usage and set up alerts

---

## 🚀 Continuous Deployment

Every time you push to the main branch:
1. GitHub Actions will automatically trigger
2. Your app will be built for web
3. The build will be deployed to GitHub Pages
4. Your live app will be updated

---

## 📞 Troubleshooting

### Common Issues:

**Build Fails:**
- Check that all dependencies are in package.json
- Ensure environment variables are set correctly
- Review the GitHub Actions log for errors

**App Not Loading:**
- Verify GitHub Pages is enabled
- Check that the repository is public (or you have GitHub Pro)
- Ensure the build completed successfully

**API Not Working:**
- Verify GOOGLE_GEMINI_API_KEY is set in GitHub Secrets
- Check API key permissions and quotas
- Review browser console for CORS issues

### Debug Steps:
1. Check GitHub Actions workflow status
2. Review build logs in the Actions tab
3. Verify GitHub Pages settings
4. Test locally with `npm start` and press 'w'

---

## 📊 Portfolio Integration

Once deployed, add to your portfolio:

```html
<div class="project-card">
    <h3>🏌️‍♂️ Golf Swing AI Trainer</h3>
    <p>AI-powered golf swing analysis with real-time feedback</p>
    <div class="project-links">
        <a href="https://yourusername.github.io/golf-swing-ai-trainer/" target="_blank">
            🚀 Live Demo
        </a>
        <a href="https://github.com/yourusername/golf-swing-ai-trainer" target="_blank">
            💻 View Code
        </a>
    </div>
</div>
```

---

## 📈 Next Steps

1. **Custom Domain**: Add a custom domain in GitHub Pages settings
2. **Analytics**: Add Google Analytics to track usage
3. **Performance**: Monitor and optimize loading times
4. **Mobile**: Test on various devices and screen sizes
5. **Updates**: Keep dependencies updated for security

---

**🎯 Pro Tips:**
- Use meaningful commit messages
- Create releases for major versions
- Add a detailed README with setup instructions
- Include screenshots and demo videos
- Set up issue templates for bug reports
