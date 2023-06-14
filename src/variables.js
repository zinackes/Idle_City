const money_text = document.getElementById("money-text");
const energy_text = document.getElementById("energy-text");
const water_text = document.getElementById("water-text");
const upgrade_row = document.querySelectorAll(".row");
const row_display = document.querySelectorAll(".row-display");
const row_group = document.querySelector(".row-group");
const moneyPerSecondText = document.getElementById("moneyPerSecond-text");
const energyPerSecondText = document.getElementById("energyPerSecond-text");
const waterPerSecondText = document.getElementById("waterPerSecond-text");
const ButtonChangeBuyModeText = document.getElementById("ButtonChangeBuyModeText");

let BuyMode = 0;

let money = 0;
let energy = 10;
let moneyPerSecond = 5;
let energyPerSecond = 10000;
let water = 0;
let waterPerSecond = 1;
let MoneyGainPerPeople = [5000, 1250];

let milestone = [25, 50, 100, 200];

let NotationIndex = 0;

//------------------------------Batiments-----------------------------------------

// 0 = nb de travailleur
// 1 = nb de non travailleur
// 2 = nb de retraité
// 3 = nb d'enfant
// 4 = population totale
let PopulationsHouse = [0, 0, 0, 0, 0];
let PopulationsPetitImmeuble = [0, 0, 0, 0, 0];

let AllPopulations = [PopulationsHouse, PopulationsPetitImmeuble];


// 0 = Pop gagné par maison acheté
let PopulationGained = ["1-8", "1-5", "1-11"];

let HouseNameList = ["Tiny House", "Mobil-Home", "Kit House", "City House"
, "Colonial House"];


//0 = nb de maisons
//1 = prix en argent
//2 = Multiplicateur du prix argent
//3 = prix en energie
//4 = Multiplicateur du prix energie
//5 = prix en eau
//6 = Multiplicateur du prix eau
//7 = Milestone du batiment ( 25 , 50 etc)
//8 = Max milestone affiché 
//9 = xp milestone bar
// 10 = xp max bar non affiché utilisé pour le calcul
let Maisons = [0, 500000, 1.03, 5, 1.1, 15, 1.07, 0, 0, 0, 25];
let ImmeublePetit = [0, 10000000, 1.03, 30, 1.2, 80, 1.1, 0, 0, 0, 25];

let BatimentHabitables = [ Maisons, ImmeublePetit];






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
