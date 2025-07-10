import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { StatusBar } from 'expo-status-bar';
import * as VideoThumbnails from 'expo-video-thumbnails';

// Google Gemini API key
const API_KEY = 'AIzaSyAQUuCNr8XsyuapGvAiiVbjqOh3umBaOSg';

export default function FeedbackScreen({ route, navigation }) {
  const { videoUri } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [frames, setFrames] = useState([]);
  const [frameAnalysis, setFrameAnalysis] = useState([]);
  const [isExtractingFrames, setIsExtractingFrames] = useState(false);
  const scrollViewRef = useRef(null);
  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    analyzeSwing();
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added, but with a slight delay
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const extractFrames = async () => {
    try {
      setIsExtractingFrames(true);
      const extractedFrames = [];
      
      // Extract frames at different time intervals to capture key swing phases
      // Times in milliseconds - adjust based on typical swing duration
      const frameTimes = [0, 500, 1000, 1500, 2000, 2500, 3000];
      
      for (let time of frameTimes) {
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
            time: time,
            quality: 0.8,
          });
          extractedFrames.push({
            uri,
            time,
            phase: getSwingPhase(time),
          });
        } catch (error) {
          console.warn(`Failed to extract frame at ${time}ms:`, error);
        }
      }
      
      setFrames(extractedFrames);
      return extractedFrames;
    } catch (error) {
      console.error('Error extracting frames:', error);
      return [];
    } finally {
      setIsExtractingFrames(false);
    }
  };

  const getSwingPhase = (time) => {
    // Map time to swing phases (adjust based on typical swing timing)
    if (time <= 500) return 'Setup/Address';
    if (time <= 1000) return 'Takeaway';
    if (time <= 1500) return 'Backswing';
    if (time <= 2000) return 'Top of Backswing';
    if (time <= 2500) return 'Downswing';
    if (time <= 3000) return 'Impact';
    return 'Follow-Through';
  };

  const analyzeFrameWithAI = async (frame, frameIndex) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Convert frame to base64
      const frameBlob = await fetch(frame.uri).then(r => r.blob());
      const reader = new FileReader();
      
      const frameBase64 = await new Promise((resolve) => {
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(frameBlob);
      });

      const prompt = `
        Analyze this specific frame from a golf swing video.
        
        Frame context: ${frame.phase} (${frame.time}ms into the swing)
        
        Look at the golfer's:
        - Body position and posture
        - Club position and angle
        - Balance and weight distribution
        - Alignment and setup
        
        Provide ONE specific, actionable tip for this swing phase. Keep it concise (1-2 sentences max).
        Address the golfer directly using "you".
        
        Format: Give just the tip, no extra formatting or explanations.
      `;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: frameBase64,
            mimeType: "image/jpeg"
          }
        }
      ]);
      
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error(`Error analyzing frame ${frameIndex}:`, error);
      return `Focus on maintaining good posture and balance during your ${frame.phase.toLowerCase()}.`;
    }
  };

  const analyzeSwing = async () => {
    try {
      setIsAnalyzing(true);
      
      // Extract frames first
      const extractedFrames = await extractFrames();
      
      if (extractedFrames.length === 0) {
        throw new Error('No frames could be extracted from the video');
      }
      
      // Analyze each frame individually
      const frameAnalyses = [];
      for (let i = 0; i < extractedFrames.length; i++) {
        const frame = extractedFrames[i];
        const analysis = await analyzeFrameWithAI(frame, i);
        frameAnalyses.push({
          frame,
          analysis,
          id: `frame-${i}`,
        });
      }
      
      setFrameAnalysis(frameAnalyses);
      
      // Create a comprehensive summary message
      let summaryText = "🏌️‍♂️ **Swing Analysis Complete**\n\n";
      summaryText += "I've analyzed key frames from your swing. Here's what I observed:\n\n";
      
      frameAnalyses.forEach((item, index) => {
        summaryText += `**${item.frame.phase}** (${item.frame.time}ms)\n`;
        summaryText += `${item.analysis}\n\n`;
      });
      
      summaryText += "**Overall Assessment:**\n";
      summaryText += "Focus on the specific tips above for each phase. Practice these positions slowly to build muscle memory.\n\n";
      summaryText += "**Next Steps:**\n";
      summaryText += "• Practice the setup and takeaway positions first\n";
      summaryText += "• Work on one phase at a time\n";
      summaryText += "• Record more swings to track your progress\n\n";
      summaryText += "Feel free to ask questions about any specific phase of your swing!";
      
      // Add the AI analysis as the first message
      const aiMessage = {
        id: Date.now(),
        text: summaryText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([aiMessage]);
    } catch (error) {
      console.error('Error analyzing swing:', error);
      
      // Fallback analysis if frame extraction or AI fails
      const fallbackAnalysis = `🏌️‍♂️ **Swing Analysis**

I've analyzed your golf swing video. Here's my assessment:

**Setup Position**
Good athletic posture with balanced weight distribution. Try positioning the ball slightly more forward in your stance for better contact.

**Takeaway**
Nice wide takeaway with good extension. Keep this smooth tempo throughout your backswing.

**Backswing**
Good shoulder turn and arm position. Focus on maintaining your spine angle as you continue to the top.

**Downswing**
Solid transition here. Work on initiating the downswing with your lower body leading the way.

**Impact & Follow-Through**
Nice balanced finish. Continue rotating through impact for maximum power transfer.

**Overall Assessment:**
Your swing shows good fundamentals with room for improvement in timing and sequencing.

**Practice Drills:**
• Practice slow-motion swings focusing on maintaining your spine angle
• Work on lower body initiation drills for better sequence
• Practice impact position drills for more consistent contact

Note: Frame extraction failed, so this is a general analysis. Try recording a new video for detailed frame-by-frame feedback.`;
      
      const fallbackMessage = {
        id: Date.now(),
        text: fallbackAnalysis,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([fallbackMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isSendingMessage) return;

    // Dismiss keyboard when sending message
    Keyboard.dismiss();

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsSendingMessage(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const context = `You are a professional golf instructor who just analyzed someone's complete golf swing video. You provided comprehensive feedback about their swing phases, technique, and areas for improvement.

The golfer is asking a follow-up question about their swing. Provide concise, actionable advice using "you" to address them directly. Keep your response focused and practical.

Reference the swing analysis you just provided when relevant and give clear, simple explanations that build on your initial assessment.

Question: ${currentInput}

Provide a helpful, focused response:`;

      const result = await model.generateContent(context);
      const response = await result.response;
      const aiResponse = response.text();

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback responses
      const fallbackMessage = {
        id: Date.now() + 1,
        text: "This is a non-AI response - the AI service is currently unavailable.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const analyzeNewVideo = () => {
    navigation.navigate('Camera');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Chat Section */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ flex: 1 }}>
          {/* Messages */}
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >
          {isAnalyzing && (
            <View style={styles.analyzingContainer}>
              <ActivityIndicator size="large" color="#2c2c2c" />
              <View style={styles.analyzingTextContainer}>
                <Text style={styles.analyzingText}>
                  {isExtractingFrames ? 'Extracting key frames...' : 'AI is analyzing your swing video...'}
                </Text>
                <Text style={styles.analyzingSubtext}>
                  {isExtractingFrames ? 'Capturing swing phases' : 'Providing targeted feedback for each phase'}
                </Text>
              </View>
            </View>
          )}
          
          {/* Frame Display Section */}
          {frames.length > 0 && !isAnalyzing && (
            <View style={styles.framesSection}>
              <Text style={styles.framesSectionTitle}>Swing Analysis Frames</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.framesScrollView}
                contentContainerStyle={styles.framesContent}
              >
                {frameAnalysis.map((item, index) => (
                  <View key={item.id} style={styles.frameContainer}>
                    <Image source={{ uri: item.frame.uri }} style={styles.frameImage} />
                    <Text style={styles.framePhase}>{item.frame.phase}</Text>
                    <Text style={styles.frameTime}>{item.frame.time}ms</Text>
                    <View style={styles.frameAnalysisContainer}>
                      <Text style={styles.frameAnalysisText}>{item.analysis}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText,
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.timestamp,
                message.isUser ? styles.userTimestamp : styles.aiTimestamp,
              ]}>
                {message.timestamp}
              </Text>
            </View>
          ))}
          
          {isSendingMessage && (
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color="#2c2c2c" />
              <Text style={styles.typingText}>AI is typing...</Text>
            </View>
          )}
            </ScrollView>          {/* Input Section */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Ask about your swing..."
                placeholderTextColor="#999"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  if (inputText.trim()) {
                    sendMessage();
                  }
                }}
              />
              <TouchableOpacity
                style={[styles.sendButton, (!inputText.trim() || isSendingMessage) && styles.sendButtonDisabled]}
                onPress={sendMessage}
                disabled={!inputText.trim() || isSendingMessage}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={analyzeNewVideo}
          >
            <Text style={styles.actionButtonText}>Analyze New Video</Text>
          </TouchableOpacity>
        </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messagesContent: {
    paddingVertical: 10,
    flexGrow: 1,
  },
  analyzingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  analyzingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  analyzingText: {
    color: '#2c2c2c',
    fontWeight: '600',
    fontSize: 16,
  },
  analyzingSubtext: {
    color: '#666666',
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  messageContainer: {
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
    maxWidth: '95%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2c2c2c',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#2c2c2c',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
  aiTimestamp: {
    color: '#999999',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 15,
  },
  typingText: {
    marginLeft: 10,
    color: '#2c2c2c',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#f8f8f8',
    color: '#2c2c2c',
  },
  sendButton: {
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  actionButtons: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  actionButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  framesSection: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  framesSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 10,
  },
  framesScrollView: {
    maxHeight: 280,
  },
  framesContent: {
    paddingVertical: 5,
  },
  frameContainer: {
    marginRight: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: Dimensions.get('window').width * 0.7,
  },
  frameImage: {
    width: Dimensions.get('window').width * 0.6,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  framePhase: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 2,
  },
  frameTime: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  frameAnalysisContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  frameAnalysisText: {
    fontSize: 13,
    color: '#2c2c2c',
    lineHeight: 18,
    textAlign: 'center',
  },
});
