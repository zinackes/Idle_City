

function getPrice(Type, BuildingType, Amount, Price, PriceAugmentation, RessourceType, BuildingName, NumberOfBuy){
  switch(BuyMode){
    case 0:
      HowManyBuy = 1;
      Type[BuildingType][BuildingName].NotShow.MaxQuantity.money = 1;
      break;
    case 1:
      HowManyBuy = 10;
      Type[BuildingType][BuildingName].NotShow.MaxQuantity.money = 10;
      break;
    case 2:
      HowManyBuy = 100;
      Type[BuildingType][BuildingName].NotShow.MaxQuantity.money = 100;
      break;
    case 3:
      HowManyBuy = NumberOfBuy;
      break;
  }


  return Price * (Math.pow(PriceAugmentation, Amount) *
      (Math.pow(PriceAugmentation, HowManyBuy) - 1) / (PriceAugmentation - 1));
}


function getMaxQuantity(Type, BuildingType, Amount, NormalPrice, PriceAugmentation, RessourceType, buildingName) {
  let maxQuantity = 0;
  let RessourceMaxQuantityList = [];

  for(let RessourceType in Type[BuildingType][buildingName].NotShow.MaxQuantity) {
    RessourceMoney = AllRessources[RessourceType];

    maxQuantity = Math.floor(Math.log(1 - (RessourceMoney * (1 - PriceAugmentation) / (NormalPrice * Math.pow(PriceAugmentation, Amount)))) / Math.log(PriceAugmentation));
  }
    for(let RessourceType in Type[BuildingType][buildingName].NotShow.MaxQuantity){
      Type[BuildingType][buildingName].NotShow.MaxQuantity[RessourceType] = Math.min(...RessourceMaxQuantityList);
      console.log(Type[BuildingType][buildingName].NotShow.MaxQuantity[RessourceType]);
    }

}




function buyUpgrades(BuildingType, Name, Type) {

  if (canBuy(BuildingType, Name, Type)) {
    for(let RessourceName in Type[BuildingType][Name].MaxPrice){

        // Enleve le prix a la ressource
        AllRessources[RessourceName] -= Type[BuildingType][Name].MaxPrice[RessourceName];

      //Type[Name].MaxPrice[RessourceName] = Type[Name].NotShow.Prices[RessourceName];


        // Augmente le prix de la ressource
      Type[BuildingType][Name].NotShow.Prices[RessourceName] *=
          Type[BuildingType][Name].NotShow.Augmentation[RessourceName];
    }

    // Ajoute l'income du batiment a l'income de la ressource
      AllRessourcesPerSecond[Type[BuildingType][Name].NotShow.IncomeType] += Type[BuildingType][Name].Income *
          Type[BuildingType][Name].NotShow.MaxQuantity.money;

    // Met a jour la quantité du batiment
    Type[BuildingType][Name].Amount += Type[BuildingType][Name].NotShow.MaxQuantity.money;
    Update(UpdateType);
    UpdateRessources();
  }
}

function canBuy(BuildingType, Name, Type){
  for(let buildingRessource in Type[BuildingType][Name].MaxPrice){

      if(AllRessources[buildingRessource] < Type[BuildingType][Name].MaxPrice[buildingRessource]){
        return false;
      }
  }
  return true;
}



