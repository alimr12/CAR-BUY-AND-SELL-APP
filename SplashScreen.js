  import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [showForm, setShowForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('SplashScreen navigation:', navigation); 

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setShowForm(true);
    });
  }, [fadeAnim, navigation]);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      let users = [];
      const stored = await AsyncStorage.getItem('@users');
      if (stored) users = JSON.parse(stored);

      if (users.find(u => u.email === email.trim().toLowerCase())) {
        Alert.alert('Error', 'Email already registered. Please login.');
        return;
      }

      users.push({ name: name.trim(), email: email.trim().toLowerCase(), password });
      await AsyncStorage.setItem('@users', JSON.stringify(users));
      Alert.alert('Success', 'Account created! Please login now.');
      setIsSignup(false);
      setEmail('');
      setPassword('');
      setName('');
    } catch (e) {
      console.log('Signup error:', e);
      Alert.alert('Error', 'Failed to create account. Try again.');
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill email and password.');
      return;
    }

    try {
      let users = [];
      const stored = await AsyncStorage.getItem('@users');
      if (stored) users = JSON.parse(stored);

      const user = users.find(
        u => u.email === email.trim().toLowerCase() && u.password === password
      );

      if (user) {
        Alert.alert('Success', `Welcome back, ${user.name}!`);
        console.log('Login success, navigating to Home');

        // Use reset to clear stack and go to Home screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Error', 'Invalid email or password.');
        console.log('Login failed');
      }
    } catch (e) {
      console.log('Login error:', e);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  if (!showForm) {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/logo.png')}
          style={[styles.logo, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
          Welcome to Car Buy and Sell App
        </Animated.Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.Image
          source={require('../assets/logo.png')}
          style={[styles.logo, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>

        {isSignup && (
          <TextInput
            placeholder="Name"
            placeholderTextColor="#a1a1a1"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
          />
        )}

        <TextInput
          placeholder="Email"
          placeholderTextColor="#a1a1a1"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#a1a1a1"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={isSignup ? handleSignup : handleLogin}
        >
          <Text style={styles.buttonText}>{isSignup ? 'Create Account' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsSignup(!isSignup);
            setEmail('');
            setPassword('');
            setName('');
          }}
          style={{ marginTop: 15 }}
          activeOpacity={0.7}
        >
          <Text style={styles.switchText}>
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  switchText: {
    color: '#aaa',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
