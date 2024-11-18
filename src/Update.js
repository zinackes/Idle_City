function Updatetext(Id, textReplace, Type, BuildingType, buildingName){
    VariableName = document.getElementById(Id);
    VariableName.textContent = NumberFormat(textReplace);
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

function UpdatePrice(Type, BuildingType, buildingName, Component, Ressourcetype){

    let Amount = Type[BuildingType][buildingName].Amount;
    let Augmentation = Type[BuildingType][buildingName].NotShow.Augmentation[Ressourcetype];
    let InitialPrice = Type[BuildingType][buildingName].NotShow.InitialPrices[Ressourcetype];

    getMaxQuantity(Type, BuildingType, Amount, InitialPrice, Augmentation, Ressourcetype, buildingName);

    let price = getPrice(Type, BuildingType, Amount, InitialPrice, Augmentation,
        Ressourcetype, buildingName , Type[BuildingType][buildingName].NotShow.MaxQuantity[Ressourcetype]);
    Type[BuildingType][buildingName].MaxPrice[Ressourcetype] = price;

    let id = buildingName + Component + Ressourcetype;
    let BuildingComponent = Type[BuildingType][buildingName].MaxPrice[Ressourcetype];

    Updatetext(id, BuildingComponent);
    UpdateButton(Type, BuildingType, buildingName);
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
function UpdateRessources(){
    for(let RessourceType in AllRessources){
        let RessourcesId = RessourceType + "Text";
        let RessourcesNewText = AllRessources[RessourceType];
        Updatetext(RessourcesId, RessourcesNewText);

        let RessourcePerSecondId = RessourceType + "PerSecondText";
        let RessourcePerSecondNewText = AllRessourcesPerSecond[RessourceType];
        Updatetext(RessourcePerSecondId, RessourcePerSecondNewText);
    }
}

function UpdateAllText(Type, BuildingsType, ToolsName) {


    // Mettre a jour les batiments
    if(Type === Buildings){
        // Accéder au nom des buildings (ex: Straw_Hut)
        for(let Name in Buildings[BuildingsType]){

            // Accéder au composants, ex: Amount de Straw_Hut
            for(let Component in Buildings[BuildingsType][Name]){

                // Met a jour les prix
                if(Component === "MaxPrice"){
                    // Pour les ressources dans le prix Max
                    for(let RessourceType in Buildings[BuildingsType][Name].MaxPrice){
                        UpdatePrice(Type, BuildingsType, Name, Component, RessourceType);
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
                    UpdatePrice(Type, ToolsName, ToolsName, Component, RessourceType);
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