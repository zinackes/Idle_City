function MaxQuantityFix(money, wood, Amount, NormalPrice, PriceAugmentation,
     MaxCostMoney, MaxCostWood) {
    
    for(let i = 0; i < HabitationAll.length; i++){

        if(MaxCostMoney > MaxCostWood && HabitationAll[i][9] !=0){
            n = MaxCostWood;
            MaxCostMoney = MaxCostWood;
    
            const costMoney =  NormalPrice * (Math.pow(PriceAugmentation, Amount) *
            (Math.pow(PriceAugmentation, n) - 1) / (PriceAugmentation - 1));
    
            console.log("i" + costMoney);
        }
    }
}