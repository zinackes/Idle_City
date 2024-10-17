
function GainRessources(RessourceType, ToolsName){
    AllRessources[RessourceType] += (Tools[ToolsName][ToolsName].Income * Tools[ToolsName][ToolsName].Amount);
    Update(UpdateType);
  }

// Exemple: GainRessources(wood, 0) correspond au bois