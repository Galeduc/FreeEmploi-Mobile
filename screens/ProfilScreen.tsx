import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
const ProfilScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');
      }
    });

    return unsubscribe;
  }, []);

  const handleEnregistrer = () => {
    console.log('Email :', email);
  };

  const handleResetPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert('Email envoyé', 'Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.');
        })
        .catch((error) => {
          Alert.alert('Erreur', error.message);
        });
    } else {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
    }
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={require('../assets/partenaire.jpg')} style={styles.profileImage} />
          <Text style={styles.headerText}>Modifier mon profil</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.enregistrerButton} onPress={handleEnregistrer}>
            <Text style={styles.enregistrerButtonText}>Enregistrer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
            <Text style={styles.resetPasswordButtonText}>Réinitialiser le mot de passe</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Dashboard')}>
          <Image source={require('../assets/icon1.png')} style={styles.navigationIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Partenaire')}>
          <Image source={require('../assets/icon2.png')} style={styles.navigationIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('Profil')}>
          <Image source={require('../assets/icon3.png')} style={styles.navigationIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: '79%',
    height: 160,
    borderRadius: 20,
    marginTop: -40,
    position: 'absolute',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  enregistrerButton: {
    backgroundColor: '#FFD166',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  enregistrerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resetPasswordButton: {
    backgroundColor: '#FF7777',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  resetPasswordButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navigationButton: {
    padding: 10,
  },
  navigationIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
});

export default ProfilScreen;
