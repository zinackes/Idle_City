const money_text = document.getElementById("money-text");
const energy_text = document.getElementById("energy-text");
const water_text = document.getElementById("water-text");
const wood_text = document.getElementById("wood-text");
const stone_text = document.getElementById("stone-text");


const upgrade_row = document.querySelectorAll(".row");
const row_display = document.querySelectorAll(".row-display");
const moneyPerSecondText = document.getElementById("moneyPerSecond-text");
const energyPerSecondText = document.getElementById("energyPerSecond-text");
const waterPerSecondText = document.getElementById("waterPerSecond-text");
const ButtonChangeBuyModeText = document.getElementById("ButtonChangeBuyModeText");

const EnergyLocked = document.getElementById("EnergyLocked");

let BuyMode = 0;

let money = 750000;
let moneyPerSecond = 1;
let energyPerSecond = 0;
let water = 0;
let waterPerSecond = 1;


let milestone = [25, 50, 100, 200];

let NotationIndex = 0;

//------------------------------Batiments Habitables-----------------------------------------




//0 = nb de bat
//1 = income par batiment pour 1 amelioration
//2 = prix en argent
//3 = Multiplicateur du prix argent
//4 = prix en energie
//5 = Multiplicateur du prix energie
//6 = prix en eau
//7 = Multiplicateur du prix eau
//8 = Prix en bois
//9 = Mult prix en bois
//10 = Prix en pierre
//11 = Mult prix en pierre

let Buildings = {
    Straw_Hut: {
        Amount: {Number: 0, id: 'Amount'},
        Income: {Number: 1, id: 'Income'},
        Price: {Number: 50, id: 'Price'},
    }
}

let BuildingLength = Object.keys(Buildings).length;

let Straw_Hut = [0 /*0*/, 1 /*1*/, 50 /*2*/, 1.03 /*3*/, 0 /*4*/,
 1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 0 /*8*/, 0 /*9*/, 0 /*10*/, 25 /*11*/];

let Small_Wooden_House = [0 /*0*/, 3 /*1*/, 500 /*2*/, 1.025 /*3*/, 0 /*4*/,
 1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 50 /*8*/, 1.05/*9*/, 0 /*10*/, 25 /*11*/];

let Wooden_House = [0 /*0*/, 5 /*1*/, 6500 /*2*/, 1.015 /*3*/, 0 /*4*/,
 1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 1250 /*8*/, 1.04/*9*/, 0 /*10*/, 25 /*11*/];

let Big_Wooden_House = [0 /*0*/, 10 /*1*/, 35000 /*2*/, 1.005 /*3*/, 0 /*4*/,
 1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 8500 /*8*/, 1.02/*9*/, 0 /*10*/, 25 /*11*/];

let Small_Stone_House = [0 /*0*/, 15 /*1*/, 75000 /*2*/, 1.0045 /*3*/, 0 /*4*/,
 1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 10000 /*8*/, 1.01/*9*/, 100 /*10*/, 1.05 /*11*/];

let Stone_House = [0 /*0*/, 20 /*1*/, 100000 /*2*/, 1.0035 /*3*/, 0 /*4*/,
 1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 12500 /*8*/, 1.005/*9*/, 750 /*10*/, 1.035 /*11*/];

let Big_Stone_House = [0 /*0*/, 25 /*1*/, 135000 /*2*/, 1.0015 /*3*/, 0 /*4*/,
  1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 17000 /*8*/, 1.0020/*9*/, 4500 /*10*/, 1.02 /*11*/];

let Wooden_Chalet = [0 /*0*/, 35 /*1*/, 150000 /*2*/, 1.001 /*3*/, 100 /*4*/,
1.05 /*5*/, 0 /*6*/, 1.07 /*7*/, 30000 /*8*/, 1.0015/*9*/, 0 /*10*/, 1.02 /*11*/];

let Stone_Chalet = [0 /*0*/, 35 /*1*/, 150000 /*2*/, 1.001 /*3*/, 3000 /*4*/,
1.05 /*5*/, 0 /*6*/, 1.07 /*7*/, 20000 /*8*/, 1.0015/*9*/, 25000 /*10*/, 1.02 /*11*/];

let HabitationAll = [Straw_Hut,
   Small_Wooden_House, Wooden_House, Big_Wooden_House,
   Small_Stone_House, Stone_House, Big_Stone_House,
  Wooden_Chalet, Stone_Chalet];

let HabitationMatTypes = [1000000, 0, 0, 0, 1];
// Correspond a un chiffre qui commence à 0
// 0 = Habitation qui nécessite du bois et de l'argent seulement.
// 1 = Bois + Pierre + argent



//------------------------------Energies-----------------------------------------

//0 = nb de bat
//1 = income par batiment pour 1 amelioration
//2 = prix en argent
//3 = Multiplicateur du prix argent
//4 = prix en energie
//5 = Multiplicateur du prix energie
//6 = prix en eau
//7 = Multiplicateur du prix eau
//8 = Prix en bois
//9 = Mult prix en bois
//10 = Prix en pierre
//11 = Mult prix en pierre
let Small_Wind_Turbine = [0 /*0*/, 1 /*1*/, 50 /*2*/, 1.03 /*3*/, 0 /*4*/,
1.1 /*5*/, 0 /*6*/, 1.07 /*7*/, 0 /*8*/, 0 /*9*/, 0 /*10*/, 25 /*11*/];


let HabitationEnergyAll = [Small_Wind_Turbine];


//------------------------------Energie-----------------------------------------








//------------------------------Outils-----------------------------------------


//0 = Niveau (= nombre)
//1 = prix en argent
//2 = mult du prix
//3 = Production du nombre de materiaux par amelioration
//4 = Nom a mettre dans la partie ressource
let Axe = [0, 100, 1.1, 1, "wood(s)"];
let Pickaxe = [0, 50000, 1.05, 1, "stone(s)"];
let Energy_Gen = [0, 200000, 1.02, 1, "energy(ies)"];

let AllTools = [Axe, Pickaxe, Energy_Gen];

//-------------------------------Ressources---------------------------------


let wood = 0;
let woodPerSecond = 0;
let stone = 0;
let stonePerSecond = 0;
let energy = 0;

let AllRessources = [wood, stone, energy];


//------------------------------Batiment Energetique-----------------------------------------

//-------------------------------Recherches---------------------------------

// 0 = multiplicateur d'energie ou autre (si y'en a un)
//1 = Prix en argent
//2 = prix en bois
//3 = prix en pierre
//4 = débloque ou non; 0 = bon débloque; 1 = débloqué
//5 = prix en energie
let UnlockEnergy = [0, 500000, 100000, 75000, 1, 0];
let BoostEnergy1 = [1.02, 1250000, 0, 0, 0, 20000];
let EnergyResearch = [UnlockEnergy, BoostEnergy1];

//------------------------------Affichage des chiffres-----------------------------------------


function NumberFormat(value) { //Format des chiffres
  switch(NotationIndex){
    case 0:
      for (let i = moneyNotations.length - 1; i >= 0; i--) {
          const divider = Math.pow(10, (i * 3));
          if (value >= divider) {
              return (value / divider).toFixed(2) + moneyNotations[i];
          }
      }
      break;
    case 1:
      if(value >= 1000){
        value = value.toExponential(2);
      }
      break;


  }
    if(value < 1){
      return value.toFixed(2);
    }
    return value.toString();
  }

function NumberFormatNoDigits(value) { //Format des chiffres
    for (let i = moneyNotations.length - 1; i >= 0; i--) {
        const divider = Math.pow(10, (i * 3));
        if (value >= divider) {
            return (value / divider).toFixed(0) + moneyNotations[i];
        }
    }
    if(value < 1){
      return value.toFixed(0);
    }
    return value.toString();
  }

function NumberFormatExponential(value){
  let exposant = Math.floor(Math.log10(Math.abs(value)));
  let coefficient = value/Math.pow(10, exposant);

  let resultat = coefficient.toFixed(2) + "e" + exposant;

  return resultat;
}