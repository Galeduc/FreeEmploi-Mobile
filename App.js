import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import AnnonceDetailScreen from './screens/AnnonceDetailScreen';
import PartenaireScreen from './screens/PartenaireScreen';
import ProfilScreen from './screens/ProfilScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, [initializing]);

  if (initializing) return <SplashScreen />;

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background.png')} style={styles.background}>
        <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="AnnonceDetail" component={AnnonceDetailScreen} />
            <Stack.Screen name="Partenaire" component={PartenaireScreen} />
            <Stack.Screen name="Profil" component={ProfilScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default App;
