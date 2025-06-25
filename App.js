 import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import SellScreen from './components/SellScreen';
import BuyScreen from './components/BuyScreen';
import CarDetailScreen from './components/CarDetailScreen';
import ProfileScreen from './components/ProfileScreen';
// import FavoritesScreen from './components/FavoritesScreen'; // Removed
import SettingsScreen from './components/SettingsScreen';

const Stack = createStackNavigator();

// Custom transition for left to right navigation
const forLeftToRight = ({ current, layouts }) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-layouts.screen.width, 0],
        }),
      },
    ],
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forLeftToRight,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sell" component={SellScreen} />
        <Stack.Screen name="Buy" component={BuyScreen} />
        <Stack.Screen name="Car Details" component={CarDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* <Stack.Screen name="Favorites" component={FavoritesScreen} /> Removed */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
