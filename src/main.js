const submenus = document.querySelectorAll(".sub-menu");

submenus.forEach(function (submenu) {
  const paragraphs = submenu.querySelectorAll("p");

  paragraphs.forEach(function (paragraph) {
    paragraph.addEventListener("click", function () {
      let navbar = this.closest(".navbar");
      let position = Array.from(navbar.querySelectorAll("p")).indexOf(this);
      
      swiper.slideTo(position, 300, true);
    });
  });
});







function animateNumber(startTime, startValue, targetValue, element) {
  const duration = 1000; // Durée de l'animation en millisecondes
  const increment = (targetValue - startValue) / duration;

  let currentValue = startValue;

  let intervalId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    currentValue = startValue + increment * elapsed;

    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(intervalId);
    }

    element.textContent = NumberFormat(Math.floor(currentValue));
  }, 10);
}



function MoneyGen() {
  money += moneyPerSecond + 1;
  energy += energyPerSecond;
  water += waterPerSecond;

  const startTime = Date.now();
  animateNumber(startTime, money - moneyPerSecond - 1, money, money_text);
  animateNumber(startTime, energy - energyPerSecond, energy, energy_text);
  animateNumber(startTime, water - waterPerSecond, water, water_text);

  for (let i = 0; i < Batiments.length; i++) {
    for (let j = 0; j < 2; j++) {
      UpgradesUpdate(i, j, BuyMode);
    }
  }

  setTimeout(MoneyGen, 1000);
}





function ChangeBuyMode(){
    BuyMode++;
    if(BuyMode == 4){
        BuyMode = 0;
    }
    for(let i = 0; i < Batiments.length; i++){
        for(let j = 0; j < 2; j++){
          UpgradesUpdate(i, j, BuyMode);
        }
      }
}

function Reset(){
    money = 0;
    wood = [false, 0, 10, 1, 1.01, 0, 1];
    stone = [false, 0, 25, 3, 1.5, 0, 2];
    materials = [[wood, stone]] ;
    storages = [150, 300];
    planetStorages = [[wood[5], stone[5]]];
    mineraiStorage = 0;
    planetStorageSum = 0;
    for(let i = 0; i < 1;i++){
        for(let j =0; j < 2;j++){
            UpgradesUpdate(i, j, BuyMode);
        }
    }
}


MoneyGen();