const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".list")

hamburger.addEventListener("click", () => {
    navList.classList.toggle("active");

})