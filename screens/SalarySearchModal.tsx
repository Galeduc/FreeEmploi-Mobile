// SalarySearchModal.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const SalarySearchModal = ({ visible, onClose, onSearch }) => {
  const [salary, setSalary] = useState('');

  const handleSearch = () => {
    onSearch(salary);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Salaire minimum</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le salaire minimum"
          onChangeText={setSalary}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button title="Annuler" onPress={onClose} />
          <Button title="Rechercher" onPress={handleSearch} />
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
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default SalarySearchModal;
