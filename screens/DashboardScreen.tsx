import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const [annonces, setAnnonces] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const [isSalaryMenuOpen, setIsSalaryMenuOpen] = useState(false);
  const [isContractTypeMenuOpen, setIsContractTypeMenuOpen] = useState(false);
  const [minSalary, setMinSalary] = useState('');
  const [selectedContractType, setSelectedContractType] = useState(null);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const fetchAnnonces = async () => {
    try {
      const response = await fetch('https://freeemploi.galeduc.fr/FreeEmploi/api/v1/index.php?endpoint=annonces');
      const data = await response.json();
      const annoncesWithImageURL = data.annonces.map((annonce) => {
        const image_url = `https://freeemploi.galeduc.fr/FreeEmploi/${annonce.banniere}`;
        return {
          ...annonce,
          image_url,
        };
      });
      setAnnonces(annoncesWithImageURL);
      setFilteredAnnonces(annoncesWithImageURL);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  useEffect(() => {
    filterAnnonces(searchText);
  }, [searchText, annonces, minSalary, selectedContractType]);

  const filterAnnonces = (text) => {
    let filtered = annonces;

    if (text) {
      filtered = filtered.filter((annonce) => annonce.titre.toLowerCase().includes(text.toLowerCase()));
    }

    if (minSalary !== '') {
      filtered = filtered.filter((annonce) => parseFloat(annonce.salaire) >= parseFloat(minSalary));
    }

    if (selectedContractType) {
      filtered = filtered.filter((annonce) => annonce.description.toLowerCase().includes(selectedContractType.toLowerCase()));
    }

    setFilteredAnnonces(filtered);
  };

  const handleAnnoncePress = (annonce) => {
    navigation.navigate('AnnonceDetail', { annonce });
  };

  const openSalaryMenu = () => setIsSalaryMenuOpen(true);
  const closeSalaryMenu = () => setIsSalaryMenuOpen(false);

  const openContractTypeMenu = () => setIsContractTypeMenuOpen(true);
  const closeContractTypeMenu = () => setIsContractTypeMenuOpen(false);

  const applySalaryFilter = () => {
    console.log('Salaire minimum sélectionné:', minSalary);
    closeSalaryMenu();
  };

  const handleMinSalaryChange = (value) => {
    setMinSalary(value);
  };

  const handleContractTypeSelect = (contractType) => {
    setSelectedContractType(contractType);
    closeContractTypeMenu();
  };

  const clearFilters = () => {
    setSearchText('');
    setMinSalary('');
    setSelectedContractType(null);
    setFilteredAnnonces(annonces);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
          <Image source={require('../assets/return.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Nos emplois</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher"
            placeholderTextColor="#777"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={openContractTypeMenu}>
            <Text style={styles.filterButtonText}>Type de contrat</Text>
          </TouchableOpacity>
          <Modal
            visible={isContractTypeMenuOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={closeContractTypeMenu}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleContractTypeSelect('CDI')}>
                  <Text>CDI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleContractTypeSelect('CDD')}>
                  <Text>CDD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleContractTypeSelect('Stage')}>
                  <Text>Stage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleContractTypeSelect('Alternance')}>
                  <Text>Alternance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={closeContractTypeMenu}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.filterButton} onPress={openSalaryMenu}>
            <Text style={styles.filterButtonText}>Salaires</Text>
          </TouchableOpacity>
          <Modal
            visible={isSalaryMenuOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={closeSalaryMenu}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.salaryInput}
                  placeholder="Salaire minimum"
                  keyboardType="numeric"
                  onChangeText={handleMinSalaryChange}
                  value={minSalary}
                />
                <TouchableOpacity style={styles.applyButton} onPress={applySalaryFilter}>
                  <Text style={styles.applyButtonText}>Appliquer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={closeSalaryMenu}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.filterButton} onPress={clearFilters}>
            <Text style={styles.filterButtonText}>Réinitialiser</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filteredAnnonces.map((annonce, index) => (
            <TouchableOpacity key={index} style={styles.annonceCard} onPress={() => handleAnnoncePress(annonce)}>
              <Image source={{ uri: annonce.image_url }} style={styles.annonceImage} />
              <Text style={styles.annonceTitle}>{annonce.titre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    marginBottom: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 80,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFD166',
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  salaryInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#FFD166',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
  },
  annoncesContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  annonceCard: {
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
  annonceImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  annonceTitle: {
    marginTop: 10,
    fontSize: 16,
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
  scrollViewContent: {
    alignItems: 'center',
  },
});

export default DashboardScreen;