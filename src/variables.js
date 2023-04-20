const money_text = document.getElementById("money-text");
const upgrade_row = document.querySelectorAll(".row");
const row_display = document.querySelectorAll(".row-display");
const row_group = document.querySelector(".row-group");
const moneyPerSecondText = document.getElementById("moneyPerSecond");

let money = 0;
let moneyPerSecond = 0;

//------------------------------Ameliorations-----------------------------------------

//pour chaque materiau il y a 1 liste:
//0 = acheté ou non
//1 = quantité / lvl
//2 = prix
//3 = Puissance de chaque amelioration
//4 = multiplicateur de prix
//5 = place dans le stockage
//6 = Transforme quantité en place de stockage
let wood = [true, 0, 10, 1, 1.01, 0, 1];
let stone = [true, 0, 25, 3, 1.5, 0, 2];

// 1 [] correspond a 1 planete et aux minerais dedans
let materials = [ [wood, stone]];

//------------------------------Stockages----------------------------------------------
//0 = debloqué ou non
//1 = capacité du stockage
//2 = niveau du stockage
//3 = capacité du stockage ajouté a chaque amelioration
let earth = [false, 150, 0, 200];
// Stockage PAR planete
//0 = terre
let storages = [earth];

//Diviser en plusieurs partis pour mettre bien la width de la barre
let planetStorages = [ [wood[5], stone[5]] ];

let mineraiStorage = 0;
let planetStorageSum = 0;





//------------------------------Affichage des chiffres-----------------------------------------


function NumberFormat(value) { //Format des chiffres
    for (let i = moneyNotations.length - 1; i >= 0; i--) {
        const divider = Math.pow(10, (i * 3));
        if (value >= divider) {
            return (value / divider).toFixed(2) + moneyNotations[i];
        }
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
