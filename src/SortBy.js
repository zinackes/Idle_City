const Button_Sort_By = document.getElementById("Button_Sort_By");
const Sort_By_Lists = document.querySelectorAll("#SortByLi");
const SubContentLastDiv = document.querySelector(".SortBy");

Button_Sort_By.addEventListener("click", ()=>{
    ButtonSortBy();
})

let calc = 0;

function ButtonSortBy() {
    SubContentLastDiv.classList.add("Btn-Toggled");

    calc += 1;

    if(calc == 2){
        SubContentLastDiv.classList.remove("Btn-Toggled");
        calc = 0;
    }

}

Sort_By_Lists.forEach(function (ListSelected) {
    ListSelected.addEventListener("click", function() {
        // Récupérez l'index de l'élément <li> au sein de la liste <ul>
        let index = Array.from(this.parentNode.children).indexOf(this);
        console.log(index);

        SubContentLastDiv.classList.remove("Btn-Toggled");
        for(let i = 0; i < Sort_By_Lists.length; i ++){
            Sort_By_Lists[i].classList.remove("invisible");
        }
        Sort_By_Lists[index].classList.add("invisible");
        calc = 0;
        SortBy(index, ListSelected.textContent);
    });
});


function SortBy(Index, IndexName, HabitationAllIndex) {
    Button_Sort_By.textContent = IndexName;


    let Building_Row_List = [];

    switch(Index){
        case 0:
            for(let i = 0; i < HabitationAll.length; i++){
                const Building_Row_Price = HabitationAll[i][2];
                Building_Row_List.push({ value: Building_Row_Price, originalIndex: i});
            }
            break;
        case 1:
            for (let i = 0; i < HabitationAll.length; i++) {
                const Building_Row_Amount = HabitationAll[i][0];
                Building_Row_List.push({ value: Building_Row_Amount, originalIndex: i });
            }
            break;
        case 2:
            for (let i = 0; i < HabitationAll.length; i++) {
                const Building_Row_Income = HabitationAll[i][1];
                Building_Row_List.push({ value: Building_Row_Income, originalIndex: i });
            }
            break;
    }

    // Trier le tableau d'objets en fonction de la valeur
    Building_Row_List.sort(function(a, b) {
        return a.value - b.value;
    });

    // Extraire les index triés dans un nouveau tableau
    const sortedIndexes = Building_Row_List.map(function(item) {
        return item.originalIndex+1;
    });


    for(let i = 0; i < sortedIndexes.length; i++){
        Building_Row = document.getElementById(`Row${sortedIndexes[i]}`);
        Building_Row.style.order = i+1;
    }
}
