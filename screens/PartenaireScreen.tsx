import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const PartenaireScreen = ({ navigation }) => {
  const partners = [
    { id: 1, name: 'Lidl', image: require('../assets/lidl.png') },
    { id: 2, name: 'Auchan', image: require('../assets/auchan.png') },
    { id: 3, name: 'Carrefour', image: require('../assets/carrefour.png') },
    { id: 4, name: 'Intermarché', image: require('../assets/intermarcher.png') },
  ];

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Nos Partenaires</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {partners.map((partner) => (
            <View key={partner.id} style={styles.partnerCard}>
              <Image source={partner.image} style={styles.partnerImage} />
            </View>
          ))}
        </ScrollView>
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
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  partnerCard: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  partnerImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
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

export default PartenaireScreen;