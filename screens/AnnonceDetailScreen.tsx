import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AnnonceDetailScreen = ({ route, navigation }) => {
  const { annonce } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={require('../assets/return.png')} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <View style={styles.cardContainer}>
          <Image source={{ uri: annonce.image_url }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{annonce.titre}</Text>
            <Text style={styles.detailText}>{annonce.description}</Text>
            <Text style={styles.detailText}>Salaire: {annonce.salaire}€ brut</Text>
            <Text style={styles.detailText}>Publication: {annonce.created_at}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Centre le contenu verticalement
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center', // Centre le contenu horizontalement
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center', // Centre le texte horizontalement
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center', // Centre le texte
    color: 'black',
  },
});

export default AnnonceDetailScreen;
