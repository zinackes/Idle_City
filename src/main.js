Array.from(row_group.children).forEach(function(row){
  row.addEventListener("click", function() {
    
    let position = Array.from(row_group.children).indexOf(this) +1;
    
    const AllMenu = document.querySelectorAll(".main-content > div")
    const menu = document.querySelector(".main-content > div:nth-child(" + position + ")");

    for(let i =0; i < AllMenu.length; i++){
        AllMenu[i].classList.remove("active");
    }
    menu.classList.toggle("active");
  });
});

function MoneyGen(){
    money += moneyPerSecond + 1;

    setTimeout(() =>{
        money_text.textContent = NumberFormat(money);
        MoneyGen();
    }, 1000)
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