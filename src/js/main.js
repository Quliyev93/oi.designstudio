//*----------------NAVBAR btn------------------- */
const searchBtnElement = document.getElementById("searchBtn");
const inputElement = document.getElementById("input");
const navbarBtnElement = document.getElementById("navbarBtn")
const navCenterElement = document.getElementById("navbarUl")
const closeNavbarElement = document.getElementById("closeNavbar")


//*----------------NAVBAR SCROLL------------------- */

const nav = document.getElementById("navbar");
const navCenterList = document.querySelectorAll(".lists");
const navLogoElement = document.getElementById("navLogo")




//*----------------NAVBAR btn------------------- */


searchBtnElement.addEventListener("click", () => {
    inputElement.classList.toggle("active_search_btn")
})


navbarBtnElement.addEventListener("click", () => {
    navCenterElement.classList.add("active_navbar")
})


closeNavbarElement.addEventListener("click", () => {
    navCenterElement.classList.remove("active_navbar")
})


document.addEventListener("DOMContentLoaded", function () {
    let filmDiv = document.querySelector(".film");

    if (!sessionStorage.getItem("firstLoadDone")) {
        document.body.style.background = "#fff"
        filmDiv.classList.remove("hidden");
        sessionStorage.setItem("firstLoadDone", "true");
    }
});


//*----------------NAVBAR SCROLL------------------- */





document.addEventListener("scroll", () => {

    if (window.scrollY > 250) {
        nav.classList.add("scrolled");
        navCenterList.forEach(navList => {
            navList.classList.add("scrolled2")
        })
        navLogoElement.classList.add("scrolled3");
        inputElement.classList.add("scrolled4")
    } else {
        nav.classList.remove("scrolled");
        navCenterList.forEach(navList => {
            navList.classList.remove("scrolled2")
        })
        navLogoElement.classList.remove("scrolled3");
        inputElement.classList.remove("scrolled4")
    }
})




const text = "DAİRESEL YAZI";
const container = document.querySelector(".circle-text"); // Doğru container seçimi

if (!container) {
    console.error("HATA: '.circle-text' öğesi bulunamadı!");
} else {
    for (let i = 0; i < text.length; i++) {
        let span = document.createElement("span");
        span.innerText = text[i];

        let angle = (360 / text.length) * i; // Her harfe ayrı açı hesapla
        span.style.position = "absolute"; // Konum ayarla
        span.style.transform = `rotate(${angle}deg)`;

        container.appendChild(span); // span'ı ekle
    }
}




// Animation scrooolll--------------


const target = document.querySelectorAll(".target");

const callBack = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    })
}

const options = {
    threshold: 0.2
}



const observer = new IntersectionObserver(callBack, options);

target.forEach((target => {
    observer.observe(target);
}));





/*FOOTER ------------------------------- */

function sendMessageContact() {
    let nameSendElement = document.getElementById("nameSend").value;
    let emailSendElement = document.getElementById("emailSend").value;
    let messageSendElement = document.getElementById("messageSend").value;

    if (nameSendElement.trim() !== "" && emailSendElement.trim() !== "" && emailSendElement.trim().includes("@") && messageSendElement.trim() !== "") {

        let mailtoLink = "mailto:izzetovciyev430@gmail.com?subject=" +
            encodeURIComponent("Yeni Mesajın var əxi") +
            "&body=" +
            encodeURIComponent("Ad: " + nameSendElement + "\n" +
                "Email: " + emailSendElement + "\n" +
                "Mesaj: " + messageSendElement);

        window.location.href = mailtoLink;

    } else {
        alert("Zəhmət olmasa bütün sahələri doldurun!");
    }
}




/*FOOTER ------------------------------- */

function sendMessage() {
    let message = document.getElementById("message").value;
    let phoneNumber = "994773111469";

    if (message.trim() !== "") {
        let whatsappLink = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

        window.open(whatsappLink, "_blank");
    } else {
        alert("Zəhmət olmasa mesajınızı daxil edin!");
    }
}




/*----aktiv navbarr------------ */

