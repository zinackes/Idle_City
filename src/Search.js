let Keywords = [
    "Straw Hut",
    "Small Wooden House",
    "Wooden House",
    "Big Wooden House",
    "Small Stone House",
    "Stone House",
    "Big Stone House",
];

const rows = document.querySelectorAll(".row");
const inputBox = document.querySelector("#input-box");
const Building_Row_ = document.querySelectorAll(".row");

inputBox.onkeyup = function () {
    let input = inputBox.value.toLowerCase();

    // Filtrer les mots qui commencent par la saisie de l'utilisateur
    let filteredKeywords = Keywords.filter(keyword => keyword.toLowerCase().startsWith(input));


    rows.forEach((row, index) => {
        const h1 = row.querySelector("h1");
        const isVisible = filteredKeywords.some(keyword => keyword.toLowerCase() === h1.textContent.toLowerCase());

        if (isVisible) {
            Building_Row_[index].classList.remove("invisible");
        } else {
            Building_Row_[index].classList.add("invisible");
        }
    });
};