

function data() {
  const saveObject = {
    money,
  };

  // Convertir l'objet en chaîne JSON
  const saveString = JSON.stringify(saveObject);

  // Compresser la chaîne JSON avec LZString
  const compressedSaveString = LZString.compressToBase64(saveString);

  // Stocker la chaîne compressée dans le stockage local
  localStorage.setItem('saveData', compressedSaveString);

  console.log('Données sauvegardées !');
}

function loadData() {
  // Récupérer la chaîne compressée depuis le stockage local
  const compressedSaveString = localStorage.getItem('saveData');

  // Si la chaîne compressée existe, la décompresser et charger les données
  if (compressedSaveString) {
    // Décompresser la chaîne avec LZString
    const saveString = LZString.decompressFromBase64(compressedSaveString);

    // Convertir la chaîne JSON en objet et charger les données
    const saveObject = JSON.parse(saveString);
    money = saveObject.money;

    console.log('Données chargées !');
  } else {
    console.log('Aucune donnée sauvegardée.');
  }
}

// Appeler la fonction de chargement des données au démarrage du jeu
loadData();

// Appeler la fonction de sauvegarde automatique toutes les 10 secondes
setInterval(data, 10000);
