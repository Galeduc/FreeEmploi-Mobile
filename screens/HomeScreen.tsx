// screens/HomeScreen.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <Image source={require('../assets/banner5.jpg')} style={styles.imageAboveButton} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Accéder à mon compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Align items in the center
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 0, // Add some margin at the bottom
    marginTop: 10, // Adjust this value to position the logo
  },
  buttonContainer: {
    justifyContent: 'center', // Align button in the center
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#e9c46a',
    width: '80%',
  },
  imageAboveButton: {
    width: '100%', // Make the image the same width as the button
    height: 350, // Adjust this value to change the image size
    // Remove marginBottom to make the image touch the button
  },
  button: {
    backgroundColor: '#e9c46a',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;