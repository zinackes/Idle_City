
function BuyResearch(index){
    if(money >= EnergyResearch[index][1] && AllRessources[0] >= EnergyResearch[index][2] &&
         AllRessources[1] >= EnergyResearch[index][3]){

        EnergyResearch[index][4] = 1;
        money -= EnergyResearch[index][1];
        AllRessources[0] -= EnergyResearch[index][2];
        AllRessources[1] -= EnergyResearch[index][3];
    }
}

/*function ResearchTextUpdate(index){

    const EnergyResearchPriceText = document.getElementById(`EnergyResearchPrice${index+1}`);
    const EnergyResearchWoodText = document.getElementById(`EnergyResearchWood${index+1}`);
    const EnergyResearchStoneText = document.getElementById(`EnergyResearchStone${index+1}`);
    const EnergyResearchEnergyText = document.getElementById(`EnergyResearchEnergy${index+1}`);

    const ResearchButton = document.getElementById(`ResearchButton${index+1}`);
    const Big_Box = document.getElementById(`Big_Box${index+1}`);
    const UnlockedDiv = document.getElementById(`Unlocked${index+1}`);
    const Research = document.getElementById(`Research${index+1}`);

    const EnergyRows = document.querySelectorAll(".energy .row");

    EnergyResearchPriceText.textContent = "$" + NumberFormat(EnergyResearch[index][1]);
    EnergyResearchWoodText.textContent = NumberFormat(EnergyResearch[index][2]);
    EnergyResearchStoneText.textContent = NumberFormat(EnergyResearch[index][3]);
    EnergyResearchEnergyText.textContent = NumberFormat(EnergyResearch[index][5]);

    let AllRessourcesText = [EnergyResearchPriceText, EnergyResearchWoodText, EnergyResearchStoneText,
    EnergyResearchEnergyText];
    let AllRessourcesToCheck = [money, AllRessources[0], AllRessources[1], AllRessources[2]];
    let AllRessourcesCostToCheck = [EnergyResearch[index][1], EnergyResearch[index][2],
     EnergyResearch[index][3], EnergyResearch[index][5]];
  
    for(let i = 0; i < AllRessourcesText.length; i++){
      UpdateAvailableOrNot(AllRessourcesText[i], AllRessourcesToCheck[i],
        AllRessourcesCostToCheck[i]);
    }

    if(money >= EnergyResearch[index][1] && AllRessources[0] >= EnergyResearch[index][2] &&
        AllRessources[1] >= EnergyResearch[index][3] && EnergyResearch[index][4] == 0){
        ResearchButton.classList.remove("anim_red");
        ResearchButton.classList.add("anim_green");
        } 
    else{
        ResearchButton.classList.add("anim_red");
        ResearchButton.classList.remove("anim_green");
    }

    if(EnergyResearch[index][4] == 1){
        Big_Box.classList.add("invisible");
        ResearchButton.classList.add("invisible");
        UnlockedDiv.classList.remove("invisible");
        Research.classList.remove("border_red");
        Research.classList.add("border_green");
    }
    else{
        Research.classList.remove("border_green");
        Research.classList.add("border_red");
    }

    if(EnergyResearch[0][4] == 1){
        EnergyRows.forEach((row) =>{
            row.classList.remove("invisible");
        })
        EnergyLocked.classList.add("invisible");

    }
    else{
        EnergyRows.forEach((row) =>{
            row.classList.add("invisible");
        })
        EnergyLocked.classList.remove("invisible");
    }
}

for(let index = 0; index < EnergyResearch.length; index++){
    ResearchTextUpdate(index);
}
*/