 import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load the saved theme and notification settings when the component mounts
  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      const savedNotifications = await AsyncStorage.getItem('notificationsEnabled');

      if (savedTheme !== null) {
        setDarkMode(JSON.parse(savedTheme)); // Parse the saved theme (true/false)
      }
      if (savedNotifications !== null) {
        setNotificationsEnabled(JSON.parse(savedNotifications)); // Parse the saved notification setting (true/false)
      }
    };
    loadSettings();
  }, []);

  // Save theme and notification settings to AsyncStorage whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      await AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    };
    saveSettings();
  }, [darkMode, notificationsEnabled]);

  // Show alert when notifications are enabled
  const handleNotificationsChange = (value) => {
    setNotificationsEnabled(value);
    if (value) {
      Alert.alert('Notifications Enabled', 'You will receive notifications from the app.');
    }
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, darkMode ? styles.darkText : styles.lightText]}>
          Enable Notifications
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationsChange} // Use custom handler
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, darkMode ? styles.darkText : styles.lightText]}>
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode} // Toggle darkMode state
        />
      </View>

      <Text style={[styles.note, darkMode ? styles.darkText : styles.lightText]}>
        Settings are for demo and do not persist yet.
      </Text>

      {notificationsEnabled && (
        <Text style={[styles.notificationText, darkMode ? styles.darkText : styles.lightText]}>
          Notifications are enabled.
        </Text>
      )}

      {/* Back to Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#bbb',
  },
  settingLabel: {
    fontSize: 18,
  },
  darkText: {
    color: '#fff', // White text for dark mode
  },
  lightText: {
    color: '#000', // Black text for light mode
  },
  note: {
    marginTop: 30,
    fontSize: 14,
    fontStyle: 'italic',
  },
  notificationText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Styling for the back button
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
