const money_text = document.getElementById("moneyText");
const energy_text = document.getElementById("energyText");
const water_text = document.getElementById("waterText");
const wood_text = document.getElementById("woodText");
const stone_text = document.getElementById("stoneText");


const upgrade_row = document.querySelectorAll(".row");
const row_display = document.querySelectorAll(".row-display");
const moneyPerSecondText = document.getElementById("moneyPerSecond-text");
const energyPerSecondText = document.getElementById("energyPerSecond-text");
const waterPerSecondText = document.getElementById("waterPerSecond-text");
const ButtonChangeBuyModeText = document.getElementById("ButtonChangeBuyModeText");

const EnergyLocked = document.getElementById("EnergyLocked");

let BuyMode = 0;

// Correspond a l'onglet de jeu qui va etre mis a jour (le texte seulement)
let UpdateType = "Buildings";



// PROBLEME AVEC LE CALCUL POUR LE MAX, quand on achete apres ca fais n'importe quoi
// remettre la quantité max a 0 ??


// PROBLEME AVEC LE CALCUL POUR LE MAX, quand on achete apres ca fais n'importe quoi
// remettre la quantité max a 0 ??


// PROBLEME AVEC LE CALCUL POUR LE MAX, quand on achete apres ca fais n'importe quoi
// remettre la quantité max a 0 ??


// PROBLEME AVEC LE CALCUL POUR LE MAX, quand on achete apres ca fais n'importe quoi
// remettre la quantité max a 0 ??


// PROBLEME AVEC LE CALCUL POUR LE MAX, quand on achete apres ca fais n'importe quoi
// remettre la quantité max a 0 ??


// PROBLEME AVEC LE CALCUL POUR LE MAX, quand on achete apres ca fais n'importe quoi
// remettre la quantité max a 0 ??

let AllRessources = {
    money: 7500,
    wood: 400,
    stone: 0,
    energy: 10,
    water: 0,
}

let AllRessourcesPerSecond = {
    money: 1,
    wood: 0,
    stone: 0,
    energy: 0,
    water: 0,
}


window.money = AllRessources.money;
window.moneyPerSecond = AllRessourcesPerSecond.money;

window.wood = AllRessources.wood;
window.woodPerSecond = AllRessourcesPerSecond.wood;

window.stone = AllRessources.stone;
window.stonePerSecond = AllRessourcesPerSecond.stone;

window.energy = AllRessources.energy;
window.energyPerSecond = AllRessourcesPerSecond.energy;

window.water = AllRessources.water;
window.waterPerSecond = AllRessourcesPerSecond.water;


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


//FAIRE LE PRIX MAX ETC EN FONCTION DE ARGENT ET RESSOURCES


let Buildings = {
    Habitations: {
        Straw_Hut: {
            Amount: 0,
            Income: 1,
            //Prix pour acheter au max
            MaxPrice: {
                money: 50,
            },
            NotShow: {
                Augmentation: {
                    money: 1.02,
                },
                //Quantité max qu'on peut acheter
                MaxQuantity: {
                    money: 0,
                },
                Prices: {
                    money: 50,
                },
                InitialPrices: {
                    money: 50,
                },
                IncomeType: "money",
            }
        },
        Small_Wooden_House: {
            Amount: 0,
            Income: 3,
            //Prix pour acheter au max
            MaxPrice: {
                money: 350,
                wood: 30,
            },
            NotShow: {
                Augmentation: {
                    money: 1.02,
                    wood: 1.01,
                },
                MaxQuantity: {
                    money: 0,
                    wood: 0,
                },
                //Prix pour acheter au max
                Prices: {
                    money: 350,
                    wood: 30,
                },
                InitialPrices: {
                    money: 350,
                    wood: 30,
                },
                IncomeType: "money",
            }
        },
        Wooden_House: {
            Amount: 0,
            Income: 7,
            //Prix pour acheter au max
            MaxPrice: {
                money: 500,
                wood: 100,
            },
            NotShow: {
                Augmentation: {
                    money: 1.02,
                    wood: 1.02,
                },
                //Quantité max qu'on peut acheter
                MaxQuantity: {
                    money: 0,
                    wood: 0,
                },
                Prices: {
                    money: 500,
                    wood: 100,
                },
                InitialPrices: {
                    money: 500,
                    wood: 100,
                },
                IncomeType: "money",
            }
        },
        Big_Wooden_House: {
            Amount: 0,
            Income: 20,
            //Prix pour acheter au max
            MaxPrice: {
                money: 5000,
                wood: 350,
            },
            NotShow: {
                Augmentation: {
                    money: 1.02,
                    wood: 1.02,
                },
                //Quantité max qu'on peut acheter
                MaxQuantity: {
                    money: 0,
                    wood: 0,
                },
                Prices: {
                    money: 5000,
                    wood: 350,
                },
                InitialPrices: {
                    money: 5000,
                    wood: 350,
                },
                IncomeType: "money",
            }
        },
    }
}


let BuildingLength = Object.keys(Buildings).length;

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

let Tools = {
    Axe: {
        Axe: {
            Amount: 0,
            Income: 1,
            //Prix pour acheter au max
            MaxPrice: {
                money: 500,
            },
            NotShow: {
                Augmentation: {
                    money: 1.02,
                },
                //Quantité max qu'on peut acheter
                MaxQuantity: {
                    money: 0,
                },
                Prices: {
                    money: 500,
                },
                InitialPrices: {
                    money: 500,
                },
                IncomeType: "none",
                Collect: "wood",
            }
        }
    },
    Pickaxe: {
        Pickaxe: {
            Amount: 0,
            Income: 1,
            //Prix pour acheter au max
            MaxPrice: {
                money: 15000,
            },
            NotShow: {
                Augmentation: {
                    money: 1.02,
                },
                //Quantité max qu'on peut acheter
                MaxQuantity: {
                    money: 0,
                },
                Prices: {
                    money: 15000,
                },
                InitialPrices: {
                    money: 15000,
                },
                IncomeType: "none",
                Collect: "stone",
            }
        }
    }
}

let AllTools = [Axe, Pickaxe, Energy_Gen];

//-------------------------------Ressources---------------------------------




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