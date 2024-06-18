import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('FreeEmploi.db');

// Fonction pour initialiser la base de données
export const initializeDatabase = () => {
  const bddPath = require('./assets/FreeEmploi.sql');

  // Lecture du contenu du fichier SQL
  const sqlStatements = FileSystem.readAsStringAsync(bddPath);

  db.transaction(tx => {
    // Exécution des instructions SQL du fichier
    tx.executeSql(
      sqlStatements,
      [],
      // Callback de réussite
      () => console.log('Base de données initialisée avec succès.'),
      // Callback d'erreur
      (_, error) => console.error('Erreur lors de l\'initialisation de la base de données :', error)
    );
  });
};
