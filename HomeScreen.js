 import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AnimatedScreenWrapper from './AnimatedScreenWrapper';

export default function HomeScreen({ navigation }) {
  return (
    <AnimatedScreenWrapper>
      <View style={styles.appNameContainer}>
        <View style={styles.logoWrapper}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.appName}>Car BuySell App</Text>
        <Text style={styles.appSubtitle}>Find your perfect car today</Text>
        <Text style={styles.welcomeText}>Welcome back, Junaid!</Text>
      </View>

      <TouchableOpacity
        style={styles.touchableWrapper}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Buy')}
        {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
      >
        <LinearGradient colors={['#4c8bf5', '#2563eb']} style={styles.touchable}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          <Text style={styles.touchableText}>Go to Buy Cars</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableHighlight
        style={styles.touchableWrapper}
        underlayColor="#d17a22"
        onPress={() => navigation.navigate('Sell')}
      >
        <LinearGradient colors={['#f9a839', '#f97316']} style={styles.touchable}>
          <MaterialIcons name="sell" size={24} color="white" />
          <Text style={styles.touchableText}>Go to Sell Cars</Text>
        </LinearGradient>
      </TouchableHighlight>

      <TouchableOpacity
        style={styles.touchableWrapper}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Profile')}
        {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
      >
        <LinearGradient colors={['#14b8a6', '#0d9488']} style={styles.touchable}>
          <MaterialIcons name="person" size={24} color="white" />
          <Text style={styles.touchableText}>Profile</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchableWrapper}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Settings')}
        {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
      >
        <LinearGradient colors={['#f43f5e', '#be123c']} style={styles.touchable}>
          <MaterialIcons name="settings" size={24} color="white" />
          <Text style={styles.touchableText}>Settings</Text>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedScreenWrapper>
  );
}

const styles = StyleSheet.create({
  appNameContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 60,
    marginBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    fontStyle: 'italic',
  },
  appSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    marginTop: 4,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#d1d5db',
    fontWeight: '600',
  },
  touchableWrapper: {
    marginVertical: 12,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  touchableText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
});
