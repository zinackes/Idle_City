const sideDivs = document.querySelectorAll(".category");


function Update(UpdateType){
  if(UpdateType === "Buildings"){
    for(let BuildingType  in Buildings){
      UpdateAllText(Buildings, BuildingType);
    }
  }

  else if(UpdateType === "Tools"){
    for(let ToolsName  in Tools){
      UpdateAllText(Tools, "", ToolsName);
    }
  }

  else if(UpdateType === "Ressources"){
    for(let ToolsName  in Tools){
      UpdateAllText('Ressources', "", ToolsName);
    }
  }
}


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
    UpdateType = targetOnglet.id;
    Update(UpdateType);
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

  AllRessources.money += AllRessourcesPerSecond.money;
  AllRessources.energy += AllRessourcesPerSecond.energy;
  AllRessources.wood += AllRessourcesPerSecond.wood;
  AllRessources.stone += AllRessourcesPerSecond.stone;


  Update(UpdateType);

  const startTime = Date.now();
  animateNumber(startTime, AllRessources.money - AllRessourcesPerSecond.money-1, AllRessources.money, money_text);
  animateNumber(startTime, AllRessources.energy - AllRessourcesPerSecond.energy, AllRessources.energy, energy_text);
  animateNumber(startTime, AllRessources.water - AllRessourcesPerSecond.water, AllRessources.water, water_text);
  animateNumber(startTime, AllRessources.wood - AllRessourcesPerSecond.wood, AllRessources.wood, wood_text);
  animateNumber(startTime, AllRessources.stone - AllRessourcesPerSecond.stone, AllRessources.stone, stone_text);

  setTimeout(MoneyGen, 1000);
}





function ChangeBuyMode(NewBuyMode){
  BuyMode = NewBuyMode;
  Update(UpdateType);


}


BuyModeButton = document.querySelectorAll(".buymode > button");
BuyModeButton.forEach((button) =>{
  button.addEventListener("click", () =>{

    Update(UpdateType);

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

MoneyGen();