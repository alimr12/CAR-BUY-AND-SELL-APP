 
 import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { loadCars, saveCars } from './storage';

export default function SellScreen({ navigation }) {
  const [company, setCompany] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [variant, setVariant] = useState('');
  const [photo, setPhoto] = useState([]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  async function requestGalleryPermission() {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Gallery Access Permission',
          message: 'App needs access to your gallery to upload photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission error', err);
      return false;
    }
  }

  const selectImages = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      setErrorMessage('Permission denied to access gallery.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          setErrorMessage('Image Picker Error: ' + (response.errorMessage || 'Unknown error'));
          return;
        }
        const assets = response.assets;
        if (assets && assets.length > 0) {
          setPhoto(assets.map((asset) => asset.uri));
          setErrorMessage('');
        }
      }
    );
  };

  const submitCar = async () => {
    setErrorMessage('');

    if (!company || !make || !model || !variant || !price) {
      setErrorMessage('Please fill all required fields and enter price.');
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      setErrorMessage('Please enter a valid positive number for price.');
      return;
    }

    const newCar = {
      id: Date.now(),
      company,
      make,
      model,
      variant,
      photos: photo.length > 0 ? photo : [],
      year: new Date().getFullYear(),
      price: Number(price),
      description: description.trim(),
    };

    try {
      const currentCars = await loadCars();
      const updatedCars = [newCar, ...currentCars];
      await saveCars(updatedCars);

      navigation.navigate('Buy', {
        newCar,
        successMessage: 'Car added successfully!',
      });
    } catch (e) {
      setErrorMessage('Failed to save car. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.wrapper}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Sell Your Car</Text>

          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.input}
              placeholder="Enter car company"
              placeholderTextColor="#a1a1a1"
              value={company}
              onChangeText={setCompany}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter car make"
              placeholderTextColor="#a1a1a1"
              value={make}
              onChangeText={setMake}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter car model"
              placeholderTextColor="#a1a1a1"
              value={model}
              onChangeText={setModel}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter car variant"
              placeholderTextColor="#a1a1a1"
              value={variant}
              onChangeText={setVariant}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter car price"
              placeholderTextColor="#a1a1a1"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Explain about your car"
              placeholderTextColor="#a1a1a1"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <TouchableOpacity
              style={styles.button}
              onPress={selectImages}
              activeOpacity={0.7}
              {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
            >
              <Text style={styles.buttonText}>Upload Car Photos (Optional)</Text>
            </TouchableOpacity>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={submitCar}
              activeOpacity={0.7}
              {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
            >
              <Text style={styles.buttonText}>Submit Car</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.backButton}
              activeOpacity={0.7}
              {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
            >
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF4136',
    marginBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#3b82f6',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
