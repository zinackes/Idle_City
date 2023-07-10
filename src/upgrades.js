function sumList(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

let k = 0;
let b = 0;
let bEnergy = 0;
let bWater = 0;
let r = 0;
let rEnergy = 0;
let rWater = 0;
let n = 0;
let cost = 0;
let costEnergy = 0;
let costWater = 0;
let c = 0;
let cEnergy = 0;
let cWater = 0;

function Buy(index, index2, nbRepetition){
    buyUpgrades(index, index2, BuyMode, nbRepetition);
}

function generateRandomNumber(UpgradeIndex) {
  // Chance d'avoir n enfant et n adulte
  const weights = [ [5, 30, 25, 40, 20, 3, 2, 1], [20, 30, 20, 20, 10], [5, 5, 15, 15, 15, 15, 10, 8, 7, 4, 1] ]; // poids des éléments de la liste

  // Chance d'avoir n adulte travailleur ou non ou retraité
  // 0 = travail
  // 1 = travail pas
  // 2 = retraité
  const weightsWork = [63.7, 8.3, 28];
  const totalWeight = weights[UpgradeIndex].reduce((prev, curr) => prev + curr); // calcul du poids total
  const totalWeightWork = weightsWork.reduce((prev, curr) => prev + curr);

  let random = Math.random() * totalWeight; // génération d'un nombre aléatoire entre 0 et le poids total
  let randomWork = Math.random() * totalWeightWork;
  let randomWork2 = Math.random() * totalWeightWork;
  let index = 0;
  let indexWork = 0;
  let indexWork2 = 0;

  for (let i = 0; i < weights[UpgradeIndex].length; i++) {
    random -= weights[UpgradeIndex][i]; // soustraction du poids de chaque élément de la liste
    if (random < 0) {
      index = i;
      break;
    }
  }
  for (let i = 0; i < weightsWork.length; i++) {
    randomWork -= weightsWork[i]; // soustraction du poids de chaque élément de la liste
    if (randomWork < 0) {
      indexWork = i;
      break;
    }
  }
  for (let i = 0; i < weightsWork.length; i++) {
    randomWork2 -= weightsWork[i]; // soustraction du poids de chaque élément de la liste
    if (randomWork2 < 0) {
      indexWork2 = i;
      break;
    }
  }


  index++;

  if (index == 1){
    AllPopulations[UpgradeIndex][4] ++;
    AllPopulations[UpgradeIndex][indexWork]++;
  }
  else if(index == 2){
    AllPopulations[UpgradeIndex][4] += 2;
    AllPopulations[UpgradeIndex][indexWork]++;
    AllPopulations[UpgradeIndex][indexWork2]++;
  }
  else if(index >=3){
    AllPopulations[UpgradeIndex][4] += index;
    AllPopulations[UpgradeIndex][indexWork]++;
    AllPopulations[UpgradeIndex][indexWork2]++;
    index -= 2;
    AllPopulations[UpgradeIndex][3] += index;
  }
  console.log(AllPopulations);

  return index; // retourne l'indice de l'élément sélectionné, plus 1 pour obtenir un chiffre entre 1 et 5
}


const BuyModetext = document.getElementById("ChangeBuyMode");

function UpgradesUpdate(index, index2, BuyMode){
  k = BatimentHabitables[index2][0]; // niveau actuel de l'amélioration
  b = BatimentHabitables[index2][1]; // prix de base de l'amélioration
  bEnergy = BatimentHabitables[index2][3]; // prix de base en energie
  bWater = BatimentHabitables[index2][5];
  r = BatimentHabitables[index2][2]; // augmentation de prix à chaque achat
  rEnergy = BatimentHabitables[index2][4]; // augmentation du prix de l'energie
  rWater = BatimentHabitables[index2][6];
  switch (BuyMode) {
    default:
      n = 1; //x1
      BuyModetext.textContent = "x" + n;
      break;
    case 1: // x10
      n = 10;
      BuyModetext.textContent = "x" + n;
      break;
    case 2: // x100
      n = 100;
      BuyModetext.textContent = "x" + n;
      break;
    case 3: // achat maximum possible
      c = money; // argent disponible pour les achats
      n = Math.floor(Math.log(c * (r - 1) / (b * Math.pow(r, k)) + 1) / Math.log(r)); // quantité maximale d'améliorations pouvant être achetées avec l'argent disponible
      BuyModetext.textContent = "Max";
  }
  cost = b * (Math.pow(r, k) * (Math.pow(r, n) - 1) / (r - 1)); // coût total pour acheter la quantité d'améliorations calculée
  costEnergy = bEnergy * (Math.pow(rEnergy, k) * (Math.pow(rEnergy, n ) - 1) / (rEnergy - 1));
  costWater = bWater * (Math.pow(rWater, k) * (Math.pow(rWater, n) - 1) / (rWater - 1));
  const ProductionBoostText = document.getElementById(`ProductionBoost${index2+1}`);
  const ProductionCostText = document.getElementById(`ProductionCost${index2+1}`);
  const ProductionCostEnergyText = document.getElementById(`ProductionCostEnergy${index2+1}`);
  const ProductionQuantityText = document.getElementById(`ProductionQuantity${index2+1}`);
  const BuildingBuyButtonText = document.getElementById(`BuildingBuyButton${index2+1}`);
  const ProductionMilestoneText = document.getElementById(`ProductionMilestone${index2+1}`);
  
  const AdultText = document.getElementById(`AdultText${index2+1}`);
  const WorkerText = document.getElementById(`WorkerText${index2+1}`);
  const UnemployedText = document.getElementById(`UnemployedText${index2+1}`);
  const RetiredText = document.getElementById(`RetiredText${index2+1}`);
  const ChildText = document.getElementById(`ChildText${index2+1}`);
  const TotalPopText = document.getElementById(`TotalPop${index2+1}`);

  const milestonebar = document.getElementById(`milestoneBar1`);

  const HouseText = document.getElementById("HouseText");

  const PrestigeText = document.getElementById(`PrestigeText${index2+1}`);
  const PrestigeStar = document.getElementById(`Prestige${index2+1}`);
  const PrestigeButton = document.getElementById(`prestigebtn${index2+1}`);
  const PrestigeButtonAll = document.getElementById(`BuildingBuyButtonAll${index2+1}`);
  const PrestigeReq = document.getElementById(`PrestigeReqText${index2+1}`);
  const PrestigeBonus = document.getElementById(`PrestigeBonusText${index2+1}`);
  


  ProductionBoostText.textContent = NumberFormat(PopulationGained[index2]);
  ProductionCostText.textContent = NumberFormat(cost);
  ProductionCostEnergyText.textContent = NumberFormat(costEnergy) + "/s";
  ProductionQuantityText.textContent = NumberFormatNoDigits(BatimentHabitables[index2][0]);
  ProductionMilestoneText.textContent = NumberFormatNoDigits(milestone[BatimentHabitables[index2][7]]);
  BuildingBuyButtonText.textContent = "Buy x" + NumberFormatNoDigits(n);

  AdultText.textContent = NumberFormatNoDigits(AllPopulations[index2][0] + AllPopulations[index2][1] + AllPopulations[index2][2]);
  WorkerText.textContent = NumberFormatNoDigits(AllPopulations[index2][0]);
  UnemployedText.textContent = NumberFormatNoDigits(AllPopulations[index2][1]);
  RetiredText.textContent = NumberFormatNoDigits(AllPopulations[index2][2]);
  ChildText.textContent = NumberFormatNoDigits(AllPopulations[index2][3]);
  TotalPopText.textContent = NumberFormatNoDigits(AllPopulations[index2][4]);

  moneyPerSecondText.textContent = NumberFormat(moneyPerSecond + 1) + "/s";
  energyPerSecondText.textContent = NumberFormat(energyPerSecond) + "/s";
  waterPerSecondText.textContent = NumberFormat(waterPerSecond) + "/s";

  PrestigeText.textContent = NumberFormatNoDigits(BatimentHabitables[index2][12]);
  PrestigeReq.textContent = NumberFormatNoDigits(milestone[BatimentHabitables[index2][11]]);
  PrestigeBonus.textContent = NumberFormatNoDigits(BatimentHabitables[index2][11]*10);





  if(BatimentHabitables[index2][7] == 0){
    ProductionMilestoneText.textContent = milestone[0];
    BatimentHabitables[index2][10] = milestone[0];
  }
  milestonebar.style.width = ((BatimentHabitables[0][9]/BatimentHabitables[0][10])*100) + "%";


  if(money >= cost){
    ProductionCostText.style.color = "var(--green)";
  }
  else{
    ProductionCostText.style.color = "var(--red)";
  }
  if(energyPerSecond >= costEnergy){
    ProductionCostEnergyText.style.color = "var(--green)";
  }
  else{
    ProductionCostEnergyText.style.color = "var(--red)";
  }

}



for(let i = 0; i < BatimentHabitables.length; i++){
  for(let j = 0; j < 2; j++){
    UpgradesUpdate(i, j, BuyMode);
  }
}

function buyUpgrades(index, index2, BuyMode, nbRepetition) {
  UpgradesUpdate(index, index2, BuyMode);
  if (money >= cost && energyPerSecond >= costEnergy) {
    BatimentHabitables[index2][0] += n; // mettre à jour la quantité
    money -= cost; // soustraire le coût total de l'argent disponible
    energyPerSecond -= costEnergy;

    
    BatimentHabitables[index2][9] += n; //  xpmilestone[index]+=n 
    for(let i = 0; i < milestone.length; i++){
      if(BatimentHabitables[index2][0] >= milestone[BatimentHabitables[index2][7]]){
        BatimentHabitables[index2][7]++; //milestone_number[index]++
        BatimentHabitables[index2][9] -= BatimentHabitables[index2][10];
        BatimentHabitables[index2][10] = milestone[BatimentHabitables[index2][7]] - milestone[BatimentHabitables[index2][7] -1];
      }
    }
    
    for(let j = 0; j < n; j++){
      for(let i = 0; i < nbRepetition; i++){
        generateRandomNumber(index2);
      }
    }
    UpgradesUpdate(index, index2, BuyMode);
    moneyPerSecond = 0;
    for(let i = 0; i < MoneyGainPerPeople.length; i++){
      moneyPerSecond += AllPopulations[i][4] * MoneyGainPerPeople[i];
    }
    moneyPerSecondText.textContent = NumberFormat(moneyPerSecond + 1) + "/s";
    energyPerSecondText.textContent = NumberFormat(energyPerSecond) + "/s";
    waterPerSecondText.textContent = NumberFormat(waterPerSecond) + "/s";
  }
}


function Prestige(index, index2){
    if(BatimentHabitables[index2][11] <= BatimentHabitables[index2][7]){
      BatimentHabitables[index2][11] ++;
      BatimentHabitables[index2][12]++;
      AllPopulations[index2][0] = 0;
      AllPopulations[index2][1] = 0;
      AllPopulations[index2][2] = 0;
      AllPopulations[index2][3] = 0;
      AllPopulations[index2][4] = 0;
      MoneyGainPerPeople[index2] *= 1.10;
      const Name = document.getElementById(`Name${index2+1}`);
      const PrestigeCount = document.getElementById(`PrestigeCount${index2+1}`);
      const PrestigeBtnBg = document.getElementById(`PrestigeBtnBg${index2+1}`);
      Name.classList.add(`P${BatimentHabitables[index2][12]}`);
      PrestigeCount.classList.add(`P${BatimentHabitables[index2][12]}Text`);
      PrestigeBtnBg.classList.add(`P${BatimentHabitables[index2][12]}`);
      UpgradesUpdate(index, index2);
      moneyPerSecond = 0;
      for(let i = 0; i < MoneyGainPerPeople.length; i++){
        moneyPerSecond += AllPopulations[i][4] * MoneyGainPerPeople[i];
      }
      moneyPerSecondText.textContent = NumberFormat(moneyPerSecond + 1) + "/s";
      energyPerSecondText.textContent = NumberFormat(energyPerSecond) + "/s";
      waterPerSecondText.textContent = NumberFormat(waterPerSecond) + "/s";
    }
    else{
    }
}
console.log(BatimentHabitables[0][0]);
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