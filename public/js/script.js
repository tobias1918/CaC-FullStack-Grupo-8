const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".list")

hamburger.addEventListener("click", () => {
    navList.classList.toggle("active");

})

let typed = new Typed(".home-title",{
    strings : ["#DESAFIATUCUERPO"],
    typeSpeed : 150,
    backSpeed : 150,
    loop : true
})
