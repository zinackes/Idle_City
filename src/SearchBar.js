const Button_Sort_By = document.getElementById("Button_Sort_By");
const Sort_By_Lists = document.querySelectorAll("#SortByLi");

Button_Sort_By.addEventListener("click", ()=>{
    ButtonSortBy();
})

let calc = 0;

function ButtonSortBy() {
    const SubContentLastDiv = document.querySelector(".SortBy");
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
    });
});
