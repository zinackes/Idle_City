function sumList(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

let BuyMode = 0;
let k = 0;
let b = 0;
let r = 0;
let n = 0;
let cost = 0;
let c = 0;

function Buy(index, index2, type){
  switch (type){
    case 0: //Production
      buyUpgrades(index, index2, BuyMode);
  }
}


function UpgradesUpdate(index, index2, BuyMode){
  const MaterialCheck = document.getElementById(`MaterialCheck${index2+1}`);
  if(materials[index][index2][0] == true){
      MaterialCheck.src = "../assets/icons/checked.png";
  }
  else{
      MaterialCheck.src = "../assets/icons/not_checked.png";
  }
  k = materials[index][index2][1]; // niveau actuel de l'amélioration
  b = materials[index][index2][2]; // prix de base de l'amélioration
  r = materials[index][index2][4]; // augmentation de prix à chaque achat
  n = 0; // quantité d'améliorations à acheter
  switch (BuyMode) {
    default:
      n = 1; //x1
      break;
    case 1: // x10
      n = 10;
      break;
    case 2: // x100
      n = 100;
      break;
    case 3: // achat maximum possible
      c = money; // argent disponible pour les achats
      n = Math.floor(Math.log(c * (r - 1) / (b * Math.pow(r, k)) + 1) / Math.log(r)); // quantité maximale d'améliorations pouvant être achetées avec l'argent disponible
  }
  cost = b * (Math.pow(r, k) * (Math.pow(r, n) - 1) / (r - 1)); // coût total pour acheter la quantité d'améliorations calculée
  const ProductionBoostText = document.getElementById(`ProductionBoost${index2+1}`);
  const ProductionBoostSumText = document.getElementById(`ProductionBoostSum${index2+1}`);
  const ProductionCostText = document.getElementById(`ProductionCost${index2+1}`);
  const ProductionQuantityText = document.getElementById(`ProductionQuantity${index2+1}`);
  const StoragePlanetText = document.getElementById(`StoragePlanet${index+1}`);
  const StorageLevel = document.getElementById(`StorageLevel${index+1}`);
  
  ProductionBoostText.textContent = "+" + NumberFormat(materials[index][index2][3]);
  ProductionBoostSumText.textContent = "+" + NumberFormat(materials[index][index2][3]);
  ProductionCostText.textContent = NumberFormat(cost);
  ProductionQuantityText.textContent = "x" + NumberFormatNoDigits(materials[index][index2][1]);
  mineraiStorage = planetStorages[index][index2];
  planetStorageSum = sumList(planetStorages[index]);
  StoragePlanetText.textContent = NumberFormat(planetStorageSum);
  StorageLevel.textContent = NumberFormatNoDigits(storages[index][2]);

  const ProgressBar = document.getElementById(`ProgressBar${index2+1}`);
  ProgressBar.style.width = (((mineraiStorage) / storages[index][1]) * 100) + "%";

  moneyPerSecondText.textContent = NumberFormat(moneyPerSecond+1);

  if(planetStorageSum >= storages[index][1]){
    StoragePlanetText.textContent = NumberFormat(storages[index]);
  }
  //CheckAvailablity();
}

//RAJOUTER QUELS PLACE PREND CHAQUE MINERAI DANS LE STORAGE!!!!

for(let i = 0; i < materials.length; i++){
  for(let j = 0; j < 2; j++){
    UpgradesUpdate(i, j, BuyMode);
  }
}

function buyUpgrades(index, index2) {
  UpgradesUpdate(index, index2, BuyMode);
  if (money >= cost && planetStorageSum <+ storages[index][1]) {
    materials[index][index2][1] += n; // mettre à jour la puissance des améliorations
    money -= cost; // soustraire le coût total de l'argent disponible
    planetStorages[index][index2] += n * materials[index][index2][6];
    moneyPerSecond += n * materials[index][index2][3];
    materials[index][index2][0] = true;
    UpgradesUpdate(index, index2, BuyMode);
  }
}

/**function CheckAvailablity(){
  let allTrue = true;
  for(let i = 0; i < 1;i++){
    for(let j = 0; j < 2;j++){
      if(!materials[i][j][0]){
        allTrue = false;
        break;
      }
    }
  }
    if (allTrue) {
      for(let i = 0; i <1;i++){
        const Summary = document.getElementById(`Summary${i+1}`);
        Summary.textContent = "Summary";
      }
    } else {

    }
}**/