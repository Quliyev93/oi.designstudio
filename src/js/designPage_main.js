const navbarBtnElement2 = document.getElementById("navbarBtn2")
const closeNavbarElement2 = document.getElementById("closeNavbar2")


navbarBtnElement2.addEventListener("click", () => {
    navCenterElement.classList.add("active_navbar2")
})

closeNavbarElement2.addEventListener("click", () => {
    navCenterElement.classList.remove("active_navbar2")
})

