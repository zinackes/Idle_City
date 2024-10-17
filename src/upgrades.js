

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

  /*console.log("Augmentation prix: " + PriceAugmentation);
  console.log("Prix pour " + HowManyBuy +  " : " + Price * (Math.pow(PriceAugmentation, Amount) *
      (Math.pow(PriceAugmentation, HowManyBuy) - 1) / (PriceAugmentation - 1)));
  console.log("===============");*/


  return Price * (Math.pow(PriceAugmentation, Amount) *
      (Math.pow(PriceAugmentation, HowManyBuy) - 1) / (PriceAugmentation - 1));
}


function getMaxQuantity(Type, BuildingType, Amount, NormalPrice, PriceAugmentation, RessourceType, buildingName) {
  /*console.log("=============");
  console.log("DEBUT");
  console.log("=============");*/
  //for(let RessourceType in Buildings[BuildingName].NotShow.MaxQuantity) {
    RessourceMoney = AllRessources[RessourceType];

  let maxQuantity = Math.floor(Math.log(1 - (RessourceMoney * (1 - PriceAugmentation) / (NormalPrice * Math.pow(PriceAugmentation, Amount)))) / Math.log(PriceAugmentation));

  //let maxQuantity = Math.floor(Math.log(RessourceMoney * (PriceAugmentation - 1) /
        //(NormalPrice * Math.pow(PriceAugmentation, Amount)) + 1) / Math.log(PriceAugmentation));

    if( NormalPrice === 0){
      return 0;
    }
    else{
      //console.log("Ressource: " + RessourceType);
      Type[BuildingType][buildingName].NotShow.MaxQuantity[RessourceType] = maxQuantity;
      //console.log(Buildings[buildingName].NotShow.MaxQuantity)
    }
  //}

}

function getFixedMaxQuantity(Type, BuildingType, Amount, InitialPrice, Augmentation, RessourceType, buildingName){

  let RessourceMaxQuantityList = [];

  for(let RessourceType in Type[BuildingType][buildingName].NotShow.MaxQuantity){
    RessourceMaxQuantityList.push(Type[BuildingType][buildingName].NotShow.MaxQuantity[RessourceType]);
  }
    if(Math.min(...RessourceMaxQuantityList) === 0){
      for(let NewResource in Type[BuildingType][buildingName].NotShow.MaxQuantity){
          if(RessourceType === NewResource){

          }
          else{
            Type[BuildingType][buildingName].NotShow.MaxQuantity[RessourceType] = Math.max(...RessourceMaxQuantityList);
            getMaxQuantity(Type, BuildingType, Amount, InitialPrice, Augmentation, NewResource, buildingName);
          }
      }
    }
    else{
      Type[BuildingType][buildingName].NotShow.MaxQuantity[RessourceType] = Math.min(...RessourceMaxQuantityList);
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



