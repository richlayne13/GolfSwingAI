import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync({
          quality: 'high',
          maxDuration: 60, // 60 seconds max
        });
        
        if (video) {
          setIsProcessing(true);
          // Save to media library
          if (mediaLibraryPermission) {
            await MediaLibrary.saveToLibraryAsync(video.uri);
          }
          
          // Navigate to feedback screen with video URI
          navigation.navigate('Feedback', { videoUri: video.uri });
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to record video: ' + error.message);
      } finally {
        setIsRecording(false);
        setIsProcessing(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets[0]) {
        setIsProcessing(true);
        navigation.navigate('Feedback', { videoUri: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.processingText}>Processing video...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        mode="video"
      >
        <View style={styles.overlay}>
          {/* Top Section */}
          <View style={styles.topSection}>
            {/* Instructions Toggle Button */}
            <TouchableOpacity 
              style={styles.instructionsToggle}
              onPress={() => setShowInstructions(!showInstructions)}
            >
              <Text style={styles.instructionsToggleText}>
                {showInstructions ? '✕' : 'ℹ️'} Setup Tips
              </Text>
            </TouchableOpacity>

            {/* Camera Setup Instructions */}
            {showInstructions && (
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>Optimal Camera Setup</Text>
                <View style={styles.instructionsList}>
                  <Text style={styles.instructionItem}>📐 Position camera at waist height</Text>
                  <Text style={styles.instructionItem}>📏 Stand 8-10 feet from camera</Text>
                  <Text style={styles.instructionItem}>👁️ Face camera from the side (profile view)</Text>
                  <Text style={styles.instructionItem}>🎯 Ensure full body is visible in frame</Text>
                  <Text style={styles.instructionItem}>☀️ Use good lighting, avoid shadows</Text>
                  <Text style={styles.instructionItem}>🏌️ Include ball position and club path</Text>
                </View>
              </View>
            )}

            {/* Recording indicator */}
            {isRecording && (
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>Recording...</Text>
              </View>
            )}
          </View>

          {/* Bottom Controls */}
          <View style={styles.controlsContainer}>
            {/* Upload from gallery button */}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickVideo}
              disabled={isRecording}
            >
              <Text style={styles.uploadIcon}>📁</Text>
            </TouchableOpacity>

            {/* Record button */}
            <TouchableOpacity
              style={[
                styles.recordButton,
                isRecording && styles.recordButtonActive
              ]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <View style={[
                styles.recordButtonInner,
                isRecording && styles.recordButtonInnerActive
              ]} />
            </TouchableOpacity>

            {/* Placeholder for symmetry */}
            <View style={styles.placeholder} />
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 30,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff',
  },
  permissionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    position: 'relative',
  },
  instructionsToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  instructionsToggleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    position: 'absolute',
    top: 90,
    left: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 12,
    padding: 15,
    maxHeight: 250,
  },
  instructionsTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  instructionsList: {
    width: '100%',
  },
  instructionItem: {
    color: '#ffffff',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
    textAlign: 'left',
  },
  instructionsText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff4444',
    marginRight: 8,
  },
  recordingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  uploadButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  uploadIcon: {
    fontSize: 24,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  recordButtonActive: {
    borderColor: '#ff4444',
    backgroundColor: '#ffffff',
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff4444',
  },
  recordButtonInnerActive: {
    borderRadius: 8,
    width: 40,
    height: 40,
    backgroundColor: '#ff4444',
  },
  placeholder: {
    width: 60,
    height: 60,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  processingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});
