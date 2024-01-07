function EnergyUpdateText(BuildingIndex){


    const EnergyProductionText = document.getElementById(`EnergyProduction${BuildingIndex+1}`);

    EnergyProductionText.textContent =  NumberFormat(HabitationEnergyAll[BuildingIndex][1]);
}