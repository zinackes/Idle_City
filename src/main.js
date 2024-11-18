const sideDivs = document.querySelectorAll(".category");
let currentUpdateType = null; // Garde une trace du dernier UpdateType
let UpdateType = ""; // Définit globalement pour être modifié dynamiquement

function Update(UpdateType) {
  if (UpdateType === currentUpdateType) return; // Ne pas répéter la mise à jour inutile
  currentUpdateType = UpdateType;

  if (UpdateType === "Buildings") {
    Object.keys(Buildings).forEach(BuildingType => {
      UpdateAllText(Buildings, BuildingType);
    });
  } else if (UpdateType === "Tools") {
    Object.keys(Tools).forEach(ToolsName => {
      UpdateAllText(Tools, "", ToolsName);
    });
  } else if (UpdateType === "Ressources") {
    Object.keys(Tools).forEach(ToolsName => {
      UpdateAllText("Ressources", "", ToolsName);
    });
  }
}

sideDivs.forEach(function (sideDiv) {
  sideDiv.addEventListener("click", function () {
    let index = Array.from(sideDivs).indexOf(this);

    sideDivs.forEach(div => div.classList.remove("side-selected"));
    sideDiv.classList.add("side-selected");

    document.querySelectorAll(".onglet").forEach(onglet => onglet.classList.remove("onglet_active"));

    let targetOnglet = document.querySelectorAll(".onglet")[index];
    UpdateType = targetOnglet.id;
    Update(UpdateType); // Mise à jour basée sur l'onglet actif
    targetOnglet.classList.add("onglet_active");
  });
});

function animateNumber(startTime, startValue, targetValue, element) {
  const duration = 1000;
  const increment = (targetValue - startValue) / duration;

  let currentValue = startValue;

  const intervalId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    currentValue = startValue + increment * elapsed;

    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(intervalId);
    }
    document.querySelector(`#${element}`).textContent = NumberFormat(Math.floor(currentValue));
  }, 10);
}

function MoneyGen() {
  AllRessources.money += AllRessourcesPerSecond.money;
  AllRessources.energy += AllRessourcesPerSecond.energy;
  AllRessources.wood += AllRessourcesPerSecond.wood;
  AllRessources.stone += AllRessourcesPerSecond.stone;

  UpdateRessources(); // Mettez à jour uniquement les ressources
  setTimeout(MoneyGen, 1000);
}

function ChangeBuyMode(NewBuyMode) {
  if (BuyMode !== NewBuyMode) {
    BuyMode = NewBuyMode;
    Update(UpdateType); // Actualisez uniquement si le mode d'achat change
  }
}

const BuyModeButton = document.querySelectorAll(".buymode > button");
BuyModeButton.forEach(button => {
  button.addEventListener("click", () => {
    BuyModeButton.forEach(btn => btn.classList.remove("btn-active"));
    button.classList.add("btn-active");
    Update(UpdateType);
  });
});
