# 🚀 Portfolio Website Integration Guide

This guide explains how to make your Golf Swing AI Trainer viewable on your portfolio website.

## 📋 Table of Contents
1. [Standalone Web App Deployment](#standalone-web-app)
2. [Embed in Portfolio Website](#embed-in-portfolio)
3. [Expo Web Hosting](#expo-web-hosting)
4. [Static Portfolio Integration](#static-portfolio-integration)
5. [Demo Screenshots & Videos](#demo-content)

---

## 🌐 Option 1: Standalone Web App Deployment

### Step 1: Build for Web Production
```bash
# Install dependencies
npm install

# Build for web
npx expo export --platform web

# The build files will be in the dist/ folder
```

### Step 2: Deploy to Static Hosting
Choose one of these platforms:

#### **Netlify** (Recommended)
1. Drag and drop the `dist/` folder to [netlify.com](https://netlify.com)
2. Or connect your GitHub repo for automatic deployments
3. Set build command: `npx expo export --platform web`
4. Set publish directory: `dist`

#### **Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Deploy the `dist/` folder

#### **GitHub Pages**
1. Create a new repository or use existing
2. Upload the `dist/` folder contents
3. Enable GitHub Pages in repository settings

### Step 3: Environment Variables
Make sure to set your environment variables:
```
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

---

## 🎯 Option 2: Embed in Portfolio Website

### Method A: iFrame Embedding
Add this to your portfolio HTML:

```html
<div class="project-demo">
    <h2>🏌️‍♂️ Golf Swing AI Trainer</h2>
    <iframe 
        src="https://your-golf-app-url.netlify.app"
        width="100%"
        height="800px"
        frameborder="0"
        style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
    </iframe>
</div>
```

### Method B: Modal/Popup Integration
```html
<div class="project-card">
    <h3>Golf Swing AI Trainer</h3>
    <p>AI-powered golf swing analysis with real-time feedback</p>
    <button onclick="openDemo()">🚀 Try Live Demo</button>
</div>

<script>
function openDemo() {
    window.open('https://your-golf-app-url.netlify.app', '_blank', 'width=400,height=800');
}
</script>
```

---

## 🔧 Option 3: Expo Web Hosting

### Using Expo's Built-in Web Support
```bash
# Start development server
npm start

# Choose 'w' for web when prompted
# Your app will be available at http://localhost:19006
```

### Deploy with Expo
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Build for web
eas build --platform web

# Deploy to Expo hosting
expo publish --platform web
```

---

## 📱 Option 4: Static Portfolio Integration

### Create a Dedicated Project Page
Create a new page in your portfolio:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Golf Swing AI Trainer - Portfolio Project</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .demo-container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background: #1a1a1a;
            border-radius: 10px;
        }
        .demo-frame {
            width: 100%;
            height: 700px;
            border: none;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <iframe 
            src="https://your-golf-app-url.netlify.app"
            class="demo-frame">
        </iframe>
    </div>
</body>
</html>
```

---

## 📸 Option 5: Demo Content Creation

### Screenshots for Portfolio
Use these key screens for your portfolio:

1. **Welcome Screen** - Show the landing page
2. **Camera Interface** - Demonstrate video recording
3. **AI Analysis** - Show the analysis results
4. **Chat Interface** - Display AI conversation

### Video Demo Creation
```bash
# Record screen while using the app
# Tools: OBS Studio, Loom, or built-in screen recorder

# Create a 30-60 second demo video showing:
# 1. App loading
# 2. Recording a swing (or uploading)
# 3. AI analysis results
# 4. Interactive chat feature
```

---

## 🎨 Portfolio Integration Examples

### Project Card HTML
```html
<div class="project-card">
    <div class="project-image">
        <img src="golf-swing-ai-preview.png" alt="Golf Swing AI Trainer">
        <div class="project-overlay">
            <a href="https://your-golf-app-url.netlify.app" target="_blank" class="demo-btn">
                🚀 Live Demo
            </a>
            <a href="https://github.com/yourusername/golf-swing-ai" target="_blank" class="code-btn">
                💻 View Code
            </a>
        </div>
    </div>
    <div class="project-content">
        <h3>🏌️‍♂️ Golf Swing AI Trainer</h3>
        <p>AI-powered golf swing analysis using Google Gemini AI with real-time video processing and interactive chat feedback.</p>
        <div class="tech-stack">
            <span class="tech-tag">React Native</span>
            <span class="tech-tag">Expo</span>
            <span class="tech-tag">Google Gemini AI</span>
            <span class="tech-tag">Computer Vision</span>
        </div>
    </div>
</div>
```

### CSS Styling
```css
.project-card {
    background: #2c2c2c;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-image:hover .project-overlay {
    opacity: 1;
}

.demo-btn, .code-btn {
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
}

.demo-btn {
    background: #4CAF50;
    color: white;
}

.code-btn {
    background: #333;
    color: white;
}
```

---

## 🔐 Security Considerations

### Environment Variables
- Never commit API keys to version control
- Use environment variables for sensitive data
- Consider using a backend proxy for API calls in production

### CORS Issues
If you encounter CORS issues:
```javascript
// Add to your app.json
{
  "expo": {
    "web": {
      "bundler": "metro",
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## 📊 Analytics Integration

### Add Google Analytics
```javascript
// Install: npm install @react-native-google-analytics/google-analytics

import { GoogleAnalytics } from '@react-native-google-analytics/google-analytics';

const trackEvent = (action, category) => {
    GoogleAnalytics.trackEvent(category, action);
};
```

---

## 🚀 Quick Start Commands

```bash
# 1. Test locally
npm start
# Press 'w' for web

# 2. Build for production
npx expo export --platform web

# 3. Deploy to Netlify
# Drag dist/ folder to netlify.com

# 4. Update portfolio
# Add iframe or project card to your portfolio
```

---

## 📞 Support

If you need help with deployment:
1. Check the Expo documentation
2. Review your console for errors
3. Ensure all dependencies are installed
4. Test locally before deploying

---

**Pro Tip**: Create a QR code for mobile testing using your deployed URL and add it to your portfolio for easy mobile access!
