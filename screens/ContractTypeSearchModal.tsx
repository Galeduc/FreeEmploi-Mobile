// ContractTypeSearchModal.js

import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const ContractTypeSearchModal = ({ visible, onClose, onSelect }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelectType = (type) => {
    setSelectedType(type);
    onSelect(type);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Type de contrat</Text>
        <View style={styles.buttonContainer}>
          <Button title="CDI" onPress={() => handleSelectType('CDI')} />
          <Button title="CDD" onPress={() => handleSelectType('CDD')} />
          {/* Ajoutez d'autres types de contrat ici si nécessaire */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default ContractTypeSearchModal;
