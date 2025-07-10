# Google Gemini API Setup Instructions

## Getting Your API Key

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Choose "Create API key in new project" or select an existing project
   - Copy the generated API key

3. **Configure the App**
   - Open `screens/FeedbackScreen.js`
   - Find line 15: `const API_KEY = 'YOUR_GOOGLE_GEMINI_API_KEY';`
   - Replace `YOUR_GOOGLE_GEMINI_API_KEY` with your actual API key
   - Save the file

## Example Configuration

```javascript
// In screens/FeedbackScreen.js
const API_KEY = 'AIzaSyA...your-actual-api-key-here...xyz';
```

## Important Security Notes

- Keep your API key secure and private
- Never commit API keys to version control
- Consider using environment variables in production
- Monitor your API usage to avoid unexpected charges

## Testing the AI Feature

1. Start the app with `npm start`
2. Record or upload a golf swing video
3. The AI should analyze the swing and provide feedback
4. You can chat with the AI for additional tips

## Troubleshooting

If the AI analysis fails:
- Check that your API key is correct
- Ensure you have internet connection
- Verify your Google AI Studio project has API access enabled
- Check the console for error messages

The app includes fallback responses if the API is unavailable.
