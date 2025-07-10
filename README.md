# 🏌️‍♂️ Golf Swing AI Trainer

[![Deploy to GitHub Pages](https://github.com/yourusername/golf-swing-ai-trainer/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/golf-swing-ai-trainer/actions/workflows/deploy.yml)

A modern, AI-powered golf swing analysis app built with React Native and Expo, featuring real-time video analysis using Google Gemini AI.

## � Live Demo
**[🌐 Try it now!](https://yourusername.github.io/golf-swing-ai-trainer/)**

## ✨ Features

- � **Video Recording & Upload** - Record swing videos or upload existing ones
- 🤖 **AI-Powered Analysis** - Advanced swing analysis using Google Gemini AI
- 🎯 **Frame-by-Frame Feedback** - Detailed analysis of key swing phases
- 💬 **Interactive Chat** - Ask follow-up questions about your swing
- 🎨 **Modern UI** - Clean, professional black/grey/white design
- 📱 **Cross-Platform** - Works on mobile and web

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo
- **AI/ML**: Google Gemini AI (Vision API)
- **Video Processing**: Expo Camera, Expo Video Thumbnails
- **Navigation**: React Navigation
- **Styling**: React Native StyleSheet
- **Deployment**: GitHub Pages with GitHub Actions

## 📱 App Screens

1. **Welcome Screen**: Introduction and get started button
2. **Camera Screen**: Record or upload golf swing videos
3. **Feedback Screen**: View video and chat with AI for swing analysis

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- Expo CLI
- Expo Go app on your mobile device
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GolfSwingAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google Gemini API**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Copy `.env.example` to `.env`
   - Replace `your_api_key_here` with your actual API key in `.env`
   - Update the `API_KEY` variable in `screens/FeedbackScreen.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - Install Expo Go on your mobile device
   - Scan the QR code displayed in the terminal
   - The app will load on your device

## Usage

1. **Welcome Screen**: Tap "Get Started" to begin
2. **Camera Screen**: 
   - Record a new video by tapping the red record button
   - Upload an existing video by tapping the folder icon
   - Videos are automatically saved to your device
3. **Feedback Screen**:
   - View your recorded video
   - Read the AI analysis of your swing
   - Chat with the AI for specific questions and tips
   - Record a new video to analyze again

## Technical Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation
- **Camera**: Expo Camera API
- **Media**: Expo Media Library & Image Picker
- **AI**: Google Gemini AI API
- **Video Playback**: Expo AV

## Permissions

The app requires the following permissions:
- Camera access (for recording videos)
- Microphone access (for video audio)
- Photo/Media library access (for saving and uploading videos)

## Development

### Project Structure
```
GolfSwingAI/
├── screens/
│   ├── WelcomeScreen.js
│   ├── CameraScreen.js
│   └── FeedbackScreen.js
├── App.js
├── app.json
└── package.json
```

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (requires macOS)
- `npm run web` - Run in web browser

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile devices
5. Submit a pull request

## Security

- Keep your Google Gemini API key secure
- Never commit `.env` files to version control
- The `.env` file is already included in `.gitignore`

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include device information and error logs
