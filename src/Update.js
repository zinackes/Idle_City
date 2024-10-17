function Updatetext(Id, textReplace, Type, BuildingType, buildingName){
    VariableName = document.getElementById(Id);
    if(textReplace !== Type[BuildingType][buildingName].Amount){
        VariableName.textContent = NumberFormat(textReplace);
    }
    else{
        VariableName.textContent = NumberFormatNoDigits(textReplace);
    }
}

function ChangeButtonColorToRed(Id){
    Button = document.getElementById(Id);
    Button.classList.add("bg_red");
    Button.classList.remove("bg_green");
}
function ChangeButtonColorToGreen(Id){
    Button = document.getElementById(Id);
    Button.classList.remove("bg_red");
    Button.classList.add("bg_green");
}

function UpdatePrice(Type, BuildingType, Amount, InitialPrice, Augmentation, Ressourcetype, buildingName){


            // Met à jour la quantité max pour chaque composant de prix
      /*console.log("Quantité max dans MaxQuantity: ");
      console.log(Buildings[buildingName].NotShow.MaxQuantity);
    console.log("=============");*/

     let price = getPrice(Type, BuildingType, Amount, InitialPrice, Augmentation,
     Ressourcetype, buildingName , Type[BuildingType][buildingName].NotShow.MaxQuantity[Ressourcetype]);

     Type[BuildingType][buildingName].MaxPrice[Ressourcetype] = price;
}


function UpdateMaxQuantity(Type, BuildingType, Amount, InitialPrice, Augmentation, Ressourcetype, buildingName){
    getMaxQuantity(Type, BuildingType, Amount, InitialPrice, Augmentation, Ressourcetype, buildingName);

}


// Mettre dans une boucle
function UpdateButton(Type, BuildingType, Name){
    let IdButton = Name + "Button";
    let ButtonComponent = "Buy " + Type[BuildingType][Name].NotShow.MaxQuantity.money;

    if (canBuy(BuildingType, Name, Type)) {
        ChangeButtonColorToGreen(IdButton);
    } else {
        ChangeButtonColorToRed(IdButton);
    }

    Updatetext(IdButton, ButtonComponent, Type, BuildingType, Name);

}

// Ne pas mettre dans une boucle
function UpdateRessources(Type, BuildingType, buildingName){
    for(let RessourceType in AllRessources){
        let RessourcesId = RessourceType + "Text";
        let RessourcesNewText = AllRessources[RessourceType];
        Updatetext(RessourcesId, RessourcesNewText, Type, BuildingType, buildingName);

        let RessourcePerSecondId = RessourceType + "PerSecondText";
        let RessourcePerSecondNewText = AllRessourcesPerSecond[RessourceType];
        Updatetext(RessourcePerSecondId, RessourcePerSecondNewText, Type, BuildingType, buildingName);


    }
}


function UpdatePriceOf(Type, BuildingType, Name, Component, RessourceType){
    let id = Name + Component + RessourceType;
    let BuildingComponent = Type[BuildingType][Name].MaxPrice[RessourceType];
    Updatetext(id, BuildingComponent, Type, BuildingType, Name);


    let Amount = Type[BuildingType][Name].Amount;
    let Augmentation = Type[BuildingType][Name].NotShow.Augmentation[RessourceType];
    let InitialPrice = Type[BuildingType][Name].NotShow.InitialPrices[RessourceType];

    if (BuyMode === 3) {
        UpdateMaxQuantity(Type, BuildingType, Amount, InitialPrice, Augmentation, RessourceType, Name);
        getFixedMaxQuantity(Type, BuildingType, Amount, InitialPrice, Augmentation, RessourceType, Name);
    }

    UpdatePrice(Type, BuildingType, Amount, InitialPrice, Augmentation, RessourceType, Name);
}


function UpdateAllText(Type, BuildingsType, ToolsName) {

    // Met a jour les textes des ressources (et ressources par sec)
    for(let Name in Type[BuildingsType]){
        UpdateRessources(Type, BuildingsType, Name);
    }

    // Mettre a jour les batiments
    if(Type === Buildings){
        // Accéder au nom des buildings (ex: Straw_Hut)
        for(let Name in Buildings[BuildingsType]){

            // Met a jout le texte et les class des boutons
            UpdateButton(Type, BuildingsType, Name);

            // Accéder au composants, ex: Amount de Straw_Hut
            for(let Component in Buildings[BuildingsType][Name]){

                // Met a jour les prix
                if(Component === "MaxPrice"){
                    // Pour les ressources dans le prix Max
                    for(let RessourceType in Buildings[BuildingsType][Name].MaxPrice){
                        UpdatePriceOf(Type, BuildingsType, Name, Component, RessourceType);
                    }
                }
                // Met a jour tout les textes qui ne sont pas dans MaxPrice ET NotShow
                else if(Component !== "NotShow" && Component !== 'MaxPrice'){
                    let id = Name + Component;
                    let BuildingComponent = Buildings[BuildingsType][Name][Component];
                    Updatetext(id, BuildingComponent, Type, BuildingsType, Name);
                }

            }

        }
    }

    // Mettre a jour les outils
    if(Type === Tools){
        // Met a jout le texte et les class des boutons
        UpdateButton(Type, ToolsName, ToolsName);
        // Mise à jour des infos des outils
            for (let Component in Tools[ToolsName][ToolsName]) {
                if (Component !== "MaxPrice" && Component !== "NotShow") {
                    let id = ToolsName + Component;
                    let ToolText = Tools[ToolsName][ToolsName][Component];
                    Updatetext(id, ToolText, Type, ToolsName, ToolsName);

                }
                else if (Component === "MaxPrice") {
                    // Mettre a jour les prix des outils
                    for (let RessourceType in Tools[ToolsName][ToolsName].MaxPrice) {
                        UpdatePriceOf(Type, ToolsName, ToolsName, Component, RessourceType);
                    }
                }
            }
    }

    if(Type === "Ressources"){
        let RessourceId = ToolsName + "Break";
        let RessourceText = "Click to get " +
            (Tools[ToolsName][ToolsName].Income * Tools[ToolsName][ToolsName].Amount)
            + " " + Tools[ToolsName][ToolsName].NotShow.Collect;
        Updatetext(RessourceId, RessourceText, Tools, ToolsName, ToolsName);
    }


}
