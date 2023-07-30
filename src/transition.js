const CityChanger = document.getElementById("citychanger");
const CityBtn = document.querySelectorAll(".animate__animated");

document.getElementById("CityLogo").addEventListener("click", () =>{
    CityChanger.classList.toggle("anim");
})

document.getElementById("return").addEventListener("click", () =>{
    for(let i = 0; i < CityBtn.length; i++){
        CityBtn[i].classList.toggle("animate__bounceIn");
        CityBtn[i].classList.toggle("animate__bounceOut");
        CityBtn[i].style.animationDelay = "0." + i + "s";
    }
    CityChanger.style.animationDelay = "1s";
    CityChanger.classList.toggle("return");
    setTimeout(function(){
        CityChanger.classList.toggle("return");
        CityChanger.classList.toggle("anim");
    }, 2000);
})