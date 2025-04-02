const navbarBtnElement2 = document.getElementById("navbarBtn3")
const closeNavbarElement2 = document.getElementById("closeNavbar3")



navbarBtnElement2.addEventListener("click", () => {
    navCenterElement.classList.add("active_navbar3")
})

closeNavbarElement2.addEventListener("click", () => {
    navCenterElement.classList.remove("active_navbar3")
})

