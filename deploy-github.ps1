# 🚀 GitHub Deployment Script for Golf Swing AI Trainer

param(
    [string]$RepoName = "golf-swing-ai-trainer",
    [string]$CommitMessage = "feat: complete Golf Swing AI Trainer with deployment setup"
)

Write-Host "🏌️‍♂️ Golf Swing AI Trainer - GitHub Deployment" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root directory." -ForegroundColor Red
    exit 1
}

# Check if git is installed
try {
    git --version | Out-Null
} catch {
    Write-Host "❌ Error: Git is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "📁 Adding files to git..." -ForegroundColor Yellow
git add .

Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $CommitMessage

# Check if remote origin exists
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "🔗 No remote origin found. Please set up your GitHub repository first." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Magenta
    Write-Host "1. Create a new repository on GitHub named '$RepoName'" -ForegroundColor White
    Write-Host "2. Run this command to add the remote:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/$RepoName.git" -ForegroundColor Cyan
    Write-Host "3. Run this command to push:" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🔧 Or run this script again after setting up the remote." -ForegroundColor Yellow
} else {
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
    git push
    
    Write-Host "✅ Successfully deployed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Your repository is now available at:" -ForegroundColor Cyan
    Write-Host "   $remoteExists" -ForegroundColor White
}

Write-Host ""
Write-Host "📋 Next steps to complete deployment:" -ForegroundColor Magenta
Write-Host "1. Go to your GitHub repository settings" -ForegroundColor White
Write-Host "2. Navigate to Settings → Secrets and variables → Actions" -ForegroundColor White
Write-Host "3. Add a secret: GOOGLE_GEMINI_API_KEY with your API key" -ForegroundColor White
Write-Host "4. Enable GitHub Pages in Settings → Pages" -ForegroundColor White
Write-Host "5. Set source to 'Deploy from a branch: gh-pages'" -ForegroundColor White
Write-Host ""
Write-Host "🚀 After GitHub Actions completes, your app will be live at:" -ForegroundColor Cyan
Write-Host "   https://YOUR_USERNAME.github.io/$RepoName/" -ForegroundColor White
Write-Host ""
Write-Host "⚡ The GitHub Actions workflow will automatically:" -ForegroundColor Yellow
Write-Host "   • Build your app for web" -ForegroundColor White
Write-Host "   • Deploy to GitHub Pages" -ForegroundColor White
Write-Host "   • Update on every push to main/master" -ForegroundColor White

Write-Host ""
Write-Host "🔍 Monitor deployment progress:" -ForegroundColor Magenta
Write-Host "   Go to your repository -> Actions tab" -ForegroundColor White
