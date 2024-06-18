import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import app from '../firebaseConfig'; // Importer l'instance Firebase initialisée depuis le fichier externe

const auth = getAuth(app);

WebBrowser.maybeCompleteAuthSession();

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Configuration pour l'authentification Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1098573266806-75jj2h16d2b47c2vnukohfjoinjk21do.apps.googleusercontent.com',
    iosClientId: '1098573266806-75jj2h16d2b47c2vnukohfjoinjk21do.apps.googleusercontent.com',
    androidClientId: '1098573266806-75jj2h16d2b47c2vnukohfjoinjk21do.apps.googleusercontent.com',
    webClientId: '1098573266806-75jj2h16d2b47c2vnukohfjoinjk21do.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@galeduc/freeemploi',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const isNewUser = userCredential.additionalUserInfo.isNewUser;

          if (isNewUser) {
            await updateProfile(user, {
              displayName: user.email.split('@')[0],
            });
            navigation.navigate('Dashboard', { user });
          } else {
            navigation.navigate('Dashboard', { user });
          }
        })
        .catch(error => {
          console.error("SignInWithCredential Error:", error);
          setErrorMessage('Erreur lors de la connexion Google. Veuillez réessayer.');
        });
    } else if (response?.type === 'error') {
      console.error("Google Auth Error:", response);
      setErrorMessage('Erreur lors de la connexion Google. Veuillez réessayer.');
    }
  }, [response]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigation.navigate('Dashboard', { user });
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('Cet email est déjà utilisé.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Cet email est invalide.');
          break;
        case 'auth/weak-password':
          setErrorMessage('Le mot de passe est trop faible.');
          break;
        default:
          setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
          break;
      }
      console.error('Erreur lors de l\'inscription:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
      <View style={styles.imageContainer}>
        <Image source={require('../assets/banner1.jpg')} style={styles.rectImage} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Inscription</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.buttonText}>S'inscrire</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()} disabled={!request}>
          <Image source={require('../assets/google.png')} style={styles.googleLogo} />
          <Text style={styles.buttonText}>S'inscrire avec Google</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageContainer: {
    position: 'absolute',
    top: '10%', // Ajustez cette valeur en fonction de la position désirée
    zIndex: 0, // Mettez un zIndex inférieur à formContainer
    alignItems: 'center',
    width: '100%',
  },
  rectImage: {
    width: '79%',
    height: 150,
    borderRadius: 20,
    position: 'absolute',
    marginTop: 115,
    zIndex: 2, // Mettez un zIndex inférieur à formContainer
  },
  formContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    marginTop: 180,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 32,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#e9c46a',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#e9c46a',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 10,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;