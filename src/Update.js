function Updatetext(Id, textReplace) {
    const VariableName = document.getElementById(Id);
    if (VariableName.textContent !== textReplace) {
        VariableName.textContent = NumberFormat(textReplace);
    }
}

function UpdateRessources() {
    const startTime = Date.now();

    Object.keys(AllRessources).forEach(RessourceType => {
        const RessourcesId = `${RessourceType}Text`;
        const RessourcesNewText = AllRessources[RessourceType];

        const RessourcePerSecondId = `${RessourceType}PerSecondText`;
        const RessourcePerSecondNewText = AllRessourcesPerSecond[RessourceType];

        Updatetext(RessourcePerSecondId, RessourcePerSecondNewText);
        animateNumber(startTime, RessourcesNewText, RessourcesNewText, RessourcesId);
    });
}

function UpdateAllText(Type, BuildingsType = "", ToolsName = "") {
    if (Type === Buildings) {
        Object.keys(Buildings[BuildingsType]).forEach(Name => {
            UpdateButton(Type, BuildingsType, Name);

            Object.keys(Buildings[BuildingsType][Name]).forEach(Component => {
                if (Component === "MaxPrice") {
                    Object.keys(Buildings[BuildingsType][Name].MaxPrice).forEach(RessourceType => {
                        UpdatePriceOf(Type, BuildingsType, Name, Component, RessourceType);
                    });
                } else if (Component !== "NotShow" && Component !== "MaxPrice") {
                    const id = Name + Component;
                    const BuildingComponent = Buildings[BuildingsType][Name][Component];
                    Updatetext(id, BuildingComponent);
                }
            });
        });
    } else if (Type === Tools) {
        UpdateButton(Type, ToolsName, ToolsName);
        Object.keys(Tools[ToolsName][ToolsName]).forEach(Component => {
            if (Component !== "MaxPrice" && Component !== "NotShow") {
                const id = ToolsName + Component;
                const ToolText = Tools[ToolsName][ToolsName][Component];
                Updatetext(id, ToolText);
            } else if (Component === "MaxPrice") {
                Object.keys(Tools[ToolsName][ToolsName].MaxPrice).forEach(RessourceType => {
                    UpdatePriceOf(Type, ToolsName, ToolsName, Component, RessourceType);
                });
            }
        });
    } else if (Type === "Ressources") {
        const RessourceId = ToolsName + "Break";
        const RessourceText = `Click to get ${Tools[ToolsName][ToolsName].Income * Tools[ToolsName][ToolsName].Amount} ${Tools[ToolsName][ToolsName].NotShow.Collect}`;
        Updatetext(RessourceId, RessourceText);
    }
}
