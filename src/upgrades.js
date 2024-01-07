let k = 0;
let b = 0;
let bEnergy = 0;
let bWater = 0;
let r = 0;
let rEnergy = 0;
let rWater = 0;
let n = 0;
let cost = 0;
let c = 0;
let cEnergy = 0;
let cWater = 0;
let MaxCostMoney = 0;
let MaxCostWood = 0;
let MaxCostTools = 0;
let MaxCostEnergy = 0;
let costMoney = 0;
let costEnergy = 0;
let costStone = 0;
let costWood = 0;

function Determine_N_Price(Amount, NormalPrice, PriceAugmentation, CostName) {


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
      switch(CostName){
        case "money":
          Determine_MaxQuantity(Amount, NormalPrice, PriceAugmentation, money);
          MaxCostMoney = n;
          break;
        case "wood":
          Determine_MaxQuantity(Amount, NormalPrice, PriceAugmentation, AllRessources[0]);
          MaxCostWood = n;
          break;
        case "stone":
          Determine_MaxQuantity(Amount, NormalPrice, PriceAugmentation, AllRessources[1]);
          MaxCostStone = n;
          break;
        case "tools":
          Determine_MaxQuantity(Amount, NormalPrice, PriceAugmentation, money);
          MaxCostTools = n;
          break;
        case "energy":
          Determine_MaxQuantity(Amount, NormalPrice, PriceAugmentation, AllRessources[2]);
          MaxCostEnergy = n;
          break;
      }
      }

  calcul = NormalPrice * (Math.pow(PriceAugmentation, Amount) *
  (Math.pow(PriceAugmentation, n) - 1) / (PriceAugmentation - 1));

  switch(CostName){
    case "money":
      costMoney = calcul;
      break;
    case "energy":
      costEnergy = calcul;
      break;
    case "water":
      costWater = calcul;
      break;
    case "wood":
      costWood = calcul;
      break;
    case "stone":
      costStone = calcul;
      break;
    case "energy":
      costEnergy = calcul;
      break;
    case "tools":
      costTools = calcul;
      break;
  }



}

const BuyModetext = document.getElementById("ChangeBuyMode");

function Determine_MaxQuantity(Amount, NormalPrice, PriceAugmentation, CostName) {

  n = Math.floor(Math.log(CostName * (PriceAugmentation - 1) /
       (NormalPrice * Math.pow(PriceAugmentation, Amount)) + 1) / Math.log(PriceAugmentation));    

  if(NormalPrice == 0){
    n = 0;
  }
  
  return n;
}

function Re_Determine_MaxQuantity(Lowest_Material, Amount, NormalPrice, PriceAugmentation) {
  n = Lowest_Material;

  calcul = NormalPrice * (Math.pow(PriceAugmentation, HabitationAll[BuildingIndex][0]) *
  (Math.pow(HabitationAll[BuildingIndex][3], n) - 1) / (HabitationAll[BuildingIndex][3] - 1));
}



function MoneyTextUpdate(BuildingIndex){


  Determine_N_Price(HabitationAll[BuildingIndex][0], HabitationAll[BuildingIndex][2],
     HabitationAll[BuildingIndex][3], "money");
  Determine_N_Price(HabitationAll[BuildingIndex][0], HabitationAll[BuildingIndex][8],
    HabitationAll[BuildingIndex][9], "wood");
  Determine_N_Price(HabitationAll[BuildingIndex][0], HabitationAll[BuildingIndex][10],
    HabitationAll[BuildingIndex][11], "stone");
  Determine_N_Price(HabitationAll[BuildingIndex][0], HabitationAll[BuildingIndex][4],
    HabitationAll[BuildingIndex][5], "energy");


  const ProductionBoostText = document.getElementById(`ProductionBoost${BuildingIndex+1}`);
  const ProductionCostText = document.getElementById(`ProductionCost${BuildingIndex+1}`);
  const ProductionCostEarningRatioText = document.getElementById(`ProductionRatio${BuildingIndex+1}`)
  const ProductionCostEnergyText = document.getElementById(`ProductionCostEnergy${BuildingIndex+1}`);
  const ProductionQuantityText = document.getElementById(`ProductionQuantity${BuildingIndex+1}`);
  const BuildingBuyButtonText = document.getElementById(`BuildingBuyButton${BuildingIndex+1}`);
  const ProductionMilestoneText = document.getElementById(`ProductionMilestone${BuildingIndex+1}`);
  
  const WoodRequiredText = document.getElementById(`WoodRequired${BuildingIndex+1}`);
  const StoneRequiredText = document.getElementById(`StoneRequired${BuildingIndex+1}`);
  const EnergyRequiredText = document.getElementById(`EnergyRequired${BuildingIndex+1}`);
  
  const moneyPerSecondText = document.getElementById("moneyPerSecondText");


  ProductionBoostText.textContent = "$" + NumberFormat(HabitationAll[BuildingIndex][1]);

  ProductionCostEarningRatioText.textContent = NumberFormatExponential(HabitationAll[BuildingIndex][1]/costMoney);
  ProductionQuantityText.textContent = NumberFormatNoDigits(HabitationAll[BuildingIndex][0]);


  BuildingBuyButtonText.textContent = "x" + NumberFormatNoDigits(n);
  WoodRequiredText.textContent = NumberFormat(costWood);
  StoneRequiredText.textContent = NumberFormat(costStone);
  EnergyRequiredText.textContent = NumberFormat(costEnergy);


  if(BuyMode == 3 && MaxCostMoney > MaxCostWood && HabitationAll[BuildingIndex][9] != 0){
    MaxCostMoney = MaxCostWood;
    n = MaxCostWood;
    costMoney = HabitationAll[BuildingIndex][2] * (Math.pow(HabitationAll[BuildingIndex][3], HabitationAll[BuildingIndex][0]) *
    (Math.pow(HabitationAll[BuildingIndex][3], n) - 1) / (HabitationAll[BuildingIndex][3] - 1));
  }

  
  if(BuyMode == 3){
    BuildingBuyButtonText.textContent = "x" + NumberFormatNoDigits(MaxCostMoney);
  }
  
  ProductionCostText.textContent = "$" + NumberFormat(costMoney);

  moneyPerSecondText.textContent = NumberFormat(moneyPerSecond);
  energyPerSecondText.textContent = NumberFormat(energyPerSecond);

  

  if(money >= costMoney && AllRessources[0] >= costWood && AllRessources[1] >= costStone &&
    AllRessources[2] >= costEnergy){
    BuildingBuyButtonText.classList.add("anim_green"); //CORRESPOND AU BOUTON
    BuildingBuyButtonText.classList.remove("anim_red"); //CORRESPOND AU BOUTON
  }
  else{
    BuildingBuyButtonText.classList.remove("anim_green"); //CORRESPOND AU BOUTON
    BuildingBuyButtonText.classList.add("anim_red"); //CORRESPOND AU BOUTON
  }

  let AllRessourcesText = [ProductionCostText, WoodRequiredText, StoneRequiredText, EnergyRequiredText];
  let AllRessourcesToCheck = [money, AllRessources[0], AllRessources[1], AllRessources[2]];
  let AllRessourcesCostToCheck = [costMoney, costWood, costStone, costEnergy];

  for(let i = 0; i < AllRessourcesText.length; i++){
    UpdateAvailableOrNot(AllRessourcesText[i], AllRessourcesToCheck[i],
      AllRessourcesCostToCheck[i]);
  }


  if(MaxCostMoney == 0 && BuyMode == 3){
    ProductionCostText.style.color = "var(--red)";
    WoodRequiredText.style.color = "var(--red)";
    StoneRequiredText.style.color = "var(--red)";
    EnergyRequiredText.style.color = "var(--red)";
    BuildingBuyButtonText.classList.remove("anim_green"); //CORRESPOND AU BOUTON
    BuildingBuyButtonText.classList.add("anim_red"); //CORRESPOND AU BOUTON
  }
  else if(BuyMode == 3){
    ProductionCostText.style.color = "var(--green)";
    WoodRequiredText.style.color = "var(--green)";
    StoneRequiredText.style.color = "var(--green)";
    EnergyRequiredText.style.color = "var(--green)";
    BuildingBuyButtonText.classList.add("anim_green"); //CORRESPOND AU BOUTON
    BuildingBuyButtonText.classList.remove("anim_red"); //CORRESPOND AU BOUTON
  }


}

function UpdateAvailableOrNot(RessourceRequiredText, Ressource, RessourceCost) {
    if(Ressource >= RessourceCost){
      RessourceRequiredText.style.color = "var(--green)";
    }
    else{
      RessourceRequiredText.style.color ="var(--red)";
    }
}


for(let BuildingIndex = 0; BuildingIndex < HabitationAll.length; BuildingIndex++){
  MoneyTextUpdate(BuildingIndex);
}
for(let ToolsIndex = 0; ToolsIndex < AllTools.length; ToolsIndex++){
  ToolsTextUpdate(ToolsIndex);
}



function buyUpgrades(BuildingIndex, BuyMode) {
  MoneyTextUpdate(BuildingIndex, BuyMode);
  if (money >= costMoney && AllRessources[0] >= costWood && AllRessources[1] >= costStone
    && AllRessources[2] >= costEnergy) {
    if(MaxCostMoney >= 1){
      HabitationAll[BuildingIndex][0] += MaxCostMoney; // mettre à jour la quantité
    }
    else{
      HabitationAll[BuildingIndex][0] += n; // mettre à jour la quantité
    }
    money -= costMoney; // soustraire le coût total de l'argent disponible
    AllRessources[0] -= costWood; // enleve le bois nécessaire;
    AllRessources[1] -= costStone;
    AllRessources[2] -= costEnergy;

    if(MaxCostMoney >= 1){
      moneyPerSecond += MaxCostMoney * HabitationAll[BuildingIndex][1];
    }
    else{
      moneyPerSecond += n * HabitationAll[BuildingIndex][1];
    }
  
    MoneyTextUpdate(BuildingIndex, BuyMode);
  }
}




function ToolsTextUpdate(ToolsIndex){

  Determine_N_Price(AllTools[ToolsIndex][0], AllTools[ToolsIndex][1], AllTools[ToolsIndex][2], "tools");

  const ProductionToolsText = document.getElementById(`ProductionTools${ToolsIndex+1}`);
  const CostToolsText = document.getElementById(`CostTools${ToolsIndex+1}`);
  const AmountToolsText = document.getElementById(`AmountTools${ToolsIndex+1}`);
  const BreakAmountText = document.getElementById(`BreakAmount${ToolsIndex+1}`);
  const ToolsBuyButtonText = document.getElementById(`ToolsBuyText${ToolsIndex+1}`);

  ProductionToolsText.textContent = NumberFormat(AllTools[ToolsIndex][3]);
  CostToolsText.textContent = "$" + NumberFormat(costTools);
  AmountToolsText.textContent = NumberFormatNoDigits(AllTools[ToolsIndex][0]);
  BreakAmountText.textContent = "Get " + NumberFormat(AllTools[ToolsIndex][0] * AllTools[ToolsIndex][3])
   + " " + AllTools[ToolsIndex][4];
  ToolsBuyButtonText.textContent = "Buy " + NumberFormatNoDigits(n);


  
   if(money >= costTools){
    CostToolsText.style.color = "var(--green)";
    ToolsBuyButtonText.classList.add("anim_green");
    ToolsBuyButtonText.classList.remove("anim_red");
  }
  else{
    CostToolsText.style.color = "var(--red)";
    ToolsBuyButtonText.classList.remove("anim_green");
    ToolsBuyButtonText.classList.add("anim_red");
  }

  if(MaxCostTools == 0 && BuyMode == 3){
    CostToolsText.style.color = "var(--red)";
    ToolsBuyButtonText.classList.remove("anim_green"); //CORRESPOND AU BOUTON
    ToolsBuyButtonText.classList.add("anim_red"); //CORRESPOND AU BOUTON
  }
  else if(BuyMode == 3){
    CostToolsText.style.color = "var(--green)";
    ToolsBuyButtonText.classList.add("anim_green"); //CORRESPOND AU BOUTON
    ToolsBuyButtonText.classList.remove("anim_red"); //CORRESPOND AU BOUTON
  }
}


function BuyTools(ToolsIndex){
  ToolsTextUpdate(ToolsIndex);
  if(money >= costTools){

    AllTools[ToolsIndex][0] += n;
    money -= costTools;

    ToolsTextUpdate(ToolsIndex);

  }
}
