import axios from 'axios';
import { AsyncStorage } from 'react-native'; // Utilisez @react-native-async-storage/async-storage si AsyncStorage est obsolète

const api = axios.create({
  baseURL: 'http://192.168.1.101/FreeEmploi/api/v1',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

export const loginUser = async (email, password) => {
  try {
    console.log(`Sending login request with Email: ${email}, Password: ${password}`);
    const response = await api.post(`/index.php?endpoint=login`, {
      email,
      password
    });

    console.log('Login Response:', response.data);

    if (response.data && response.data.success) {
      // Store user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      // Redirect to the home screen
      return { success: true, user: response.data.user, message: 'Login successful' };
    } else {
      return { success: false, message: response.data.message || 'Mauvais email ou mdp' };
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return { success: false, message: 'An error occurred' };
  }
};
