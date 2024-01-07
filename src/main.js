const sideDivs = document.querySelectorAll(".category");


sideDivs.forEach(function (sideDiv) {
  sideDiv.addEventListener("click", function () {
    // Récupère l'index du div side cliqué
    let index = Array.from(sideDivs).indexOf(this);
    
    for(let i = 0; i < sideDivs.length; i++){
      sideDivs[i].classList.remove("side-selected");
    }
    sideDiv.classList.add("side-selected");

    // Supprime la classe 'onglet_active' de toutes les divs avec la classe 'onglet'
    document.querySelectorAll(".onglet").forEach(function (onglet) {
      onglet.classList.remove("onglet_active");
    });

    // Ajoute la classe 'onglet_active' à la div .onglet correspondante
    let targetOnglet = document.querySelectorAll(".onglet")[index];
    targetOnglet.classList.add("onglet_active");
  });
});





function animateNumber(startTime, startValue, targetValue, element) {
  const duration = 1000; // Durée de l'animation en millisecondes
  const increment = (targetValue - startValue) / duration;

  let currentValue = startValue;

  let intervalId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    currentValue = startValue + increment * elapsed;

    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(intervalId);
    }

    element.textContent = NumberFormat(Math.floor(currentValue));
  }, 10);
}



function MoneyGen() {
  money += moneyPerSecond;
  AllRessources[2] += energyPerSecond;
  water += waterPerSecond;
  wood += woodPerSecond;

  const startTime = Date.now();
  animateNumber(startTime, money - moneyPerSecond-1, money, money_text);
  animateNumber(startTime, AllRessources[2] - energyPerSecond, AllRessources[2], energy_text);
  animateNumber(startTime, water - waterPerSecond, water, water_text);
  animateNumber(startTime, AllRessources[0] - woodPerSecond, AllRessources[0], wood_text);
  animateNumber(startTime, AllRessources[1] - stonePerSecond, AllRessources[1], stone_text);

  for(let BuildingIndex = 0; BuildingIndex < HabitationAll.length; BuildingIndex++){
    MoneyTextUpdate(BuildingIndex);
  }
  for(let ToolsIndex = 0; ToolsIndex < AllTools.length; ToolsIndex++){
    ToolsTextUpdate(ToolsIndex);
  }
  for(let index = 0; index < EnergyResearch.length; index++){
    ResearchTextUpdate(index);
  }
  if(EnergyResearch[0][4] == 1){
    for(let index = 0; index < HabitationEnergyAll.length; index++){
      EnergyUpdateText(index);
    }
  }

  setTimeout(MoneyGen, 1000);
}





function ChangeBuyMode(NewBuyMode){
  BuyMode = NewBuyMode;

  for(let BuildingIndex = 0; BuildingIndex < HabitationAll.length; BuildingIndex++){
    MoneyTextUpdate(BuildingIndex);
  }
  for(let ToolsIndex = 0; ToolsIndex < AllTools.length; ToolsIndex++){
    ToolsTextUpdate(ToolsIndex);
    }

}


BuyModeButton = document.querySelectorAll(".buymode > button");
BuyModeButton.forEach((button) =>{
  button.addEventListener("click", () =>{
    for(let i = 0; i < BuyModeButton.length; i++){
      BuyModeButton[i].classList.remove("btn-active");
    }
    button.classList.add("btn-active");
  })
})


function Redirect(DivId, onglet_active_index){

  for(let i = 0; i < sideDivs.length; i++){
    sideDivs[i].classList.remove("side-selected");
  }
  document.querySelectorAll(".category")[onglet_active_index].classList.add("side-selected");

  document.querySelectorAll(".onglet").forEach(function (onglet) {
    onglet.classList.remove("onglet_active");
  });
  document.querySelectorAll(".onglet")[onglet_active_index].classList.add("onglet_active");

  document.getElementById(DivId).classList.add ("redirect");
}




function Reset(){
    money = 0;
    wood = [false, 0, 10, 1, 1.01, 0, 1];
    stone = [false, 0, 25, 3, 1.5, 0, 2];
    materials = [[wood, stone]] ;
    storages = [150, 300];
    planetStorages = [[wood[5], stone[5]]];
    mineraiStorage = 0;
    planetStorageSum = 0;
    for(let BuildingIndex = 0; BuildingIndex < HabitationAll.length; BuildingIndex++){
      MoneyTextUpdate(BuildingIndex);
    }
}


MoneyGen();