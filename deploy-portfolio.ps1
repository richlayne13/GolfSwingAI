# 🚀 Quick Deploy Script for Portfolio

# This script helps you quickly deploy your Golf Swing AI Trainer to your portfolio

Write-Host "🏌️‍♂️ Golf Swing AI Trainer - Portfolio Deployment" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root directory." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🔨 Building for web..." -ForegroundColor Yellow
npx expo export --platform web

Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host "📁 Your web build is ready in the 'dist' folder" -ForegroundColor Cyan

Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Magenta
Write-Host "1. Upload the 'dist' folder to your web hosting service" -ForegroundColor White
Write-Host "2. Or drag the 'dist' folder to netlify.com for instant deployment" -ForegroundColor White
Write-Host "3. Set your GOOGLE_GEMINI_API_KEY environment variable" -ForegroundColor White
Write-Host "4. Add the live URL to your portfolio website" -ForegroundColor White

Write-Host ""
Write-Host "📋 Popular hosting options:" -ForegroundColor Magenta
Write-Host "• Netlify: https://netlify.com (drag & drop)" -ForegroundColor White
Write-Host "• Vercel: https://vercel.com (GitHub integration)" -ForegroundColor White
Write-Host "• GitHub Pages: (upload to gh-pages branch)" -ForegroundColor White

Write-Host ""
Write-Host "🌐 Local testing:" -ForegroundColor Magenta
Write-Host "Run 'npm start' and press 'w' to test locally" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Portfolio integration examples are in PORTFOLIO_DEPLOYMENT.md" -ForegroundColor Cyan
