 import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }) {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ghulam Mohi u Din', email: 'ghulam@example.com' },
    { id: 2, name: 'Ali Abbas', email: 'ali@example.com' },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Animation for fade-in
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const addUser = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Please enter both name and email.');
      return;
    }

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      email,
    };

    setUsers([...users, newUser]);
    setName('');
    setEmail('');
  };

  const deleteUser = (id) => {
    Alert.alert('Delete Account', 'Are you sure you want to delete this account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setUsers(users.filter((user) => user.id !== id)),
      },
    ]);
  };

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.wrapper}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* App Name header */}
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>Car BuySell App</Text>
        </View>

        {/* Form to add new account */}
        <View style={styles.addAccountContainer}>
          <TextInput
            placeholder="Enter name"
            placeholderTextColor="#a1a1a1"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter email"
            placeholderTextColor="#a1a1a1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addUser}
            activeOpacity={0.7}
            {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
          >
            <Text style={styles.addButtonText}>Add Account</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable user list */}
        <ScrollView contentContainerStyle={styles.usersContainer} keyboardShouldPersistTaps="handled">
          {users.map((user) => (
            <View key={user.id} style={styles.profileCard}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{user.name.charAt(0)}</Text>
              </View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>

              {/* Delete button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(user.id)}
                activeOpacity={0.7}
                {...(Platform.OS === 'android' ? { android_ripple: { color: '#ff000020' } } : {})}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Button to navigate back to Home */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
            {...(Platform.OS === 'android' ? { android_ripple: { color: '#ffffff20' } } : {})}
          >
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  appNameContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#fff',
  },
  addAccountContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#222',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  usersContainer: {
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  profileCard: {
    alignItems: 'center',
    width: '45%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#64748b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarInitial: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#cbd5e1',
    marginTop: 6,
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 15,
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backButtonContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  backButtonText: {
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});
