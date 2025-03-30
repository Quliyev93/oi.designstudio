// DOM öğelerini seç
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

// Zaman ayarları
const TIME_RUNNING = 1500; // Geçiş süresi
const TIME_AUTO_NEXT = 3500; // Otomatik slayt süresi

// Zamanlayıcı değişkenleri
let transitionTimeout;
let autoNextTimeout;
let isTransitioning = false; // Geçiş sırasında engelleme için

// Progress bar oluştur ve ekle
const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";

progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Butonlara olay dinleyicileri ekle
nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

// Her item'a data-item ekle
items.forEach((item, index) => {
    item.querySelector(".title").setAttribute("data-item", index + 1);
});

// Otomatik slayt değişimini başlat
startAutoSlide();

// Slayt değişimi sonrası güncelle
afterSlideChange();

// **Slayt Değiştirme Fonksiyonu**
function handleSliderNavigation(direction) {
    if (isTransitioning) return; // Eğer geçiş devam ediyorsa, yeni bir geçişi engelle

    isTransitioning = true; // Geçiş başladığında kilitle

    const sliderItems = list.querySelectorAll(".item");

    if (direction === "next") {
        list.appendChild(sliderItems[0]); // İlk öğeyi sona taşı
        carousel.classList.add("next");
    } else if (direction === "prev") {
        list.prepend(sliderItems[sliderItems.length - 1]); // Son öğeyi başa taşı
        carousel.classList.add("prev");
    }

    // Geçiş tamamlanınca tekrar aç
    requestAnimationFrame(() => {
        setTimeout(() => {
            isTransitioning = false;
            carousel.classList.remove("next");
            carousel.classList.remove("prev");
        }, TIME_RUNNING);
    });

    afterSlideChange();
}

// **Otomatik Slayt Geçişi**
function startAutoSlide() {
    autoNextTimeout = setTimeout(() => {
        if (!isTransitioning) {
            nextBtn.click();
        }
    }, TIME_AUTO_NEXT);
}

// **Slayt Bilgilerini Güncelle**
function afterSlideChange() {
    const slideNumberElement = document.querySelector(".slide-number");
    if (slideNumberElement) slideNumberElement.remove();

    const sliderItems = Array.from(list.querySelectorAll(".item"));
    const activeItem = parseInt(sliderItems[1].querySelector(".title").getAttribute("data-item"));

    const activeIndex = activeItem < 10 ? `0${activeItem}` : activeItem.toString();

    const div = document.createElement("div");
    div.classList.add("slide-number");
    div.textContent = `${activeIndex}/${sliderItems.length}`;

    arrowsDiv.appendChild(div);

    updateProgressBar();
    resetCarouselState();
}

// **İlerleme Çubuğunu Güncelle**
function updateProgressBar() {
    const totalSlides = items.length;
    const sliderItems = Array.from(list.querySelectorAll(".item"));
    const activeItem = parseInt(sliderItems[0].querySelector(".title").getAttribute("data-item")) + 1;
    const progressPercentage = (activeItem / totalSlides) * 100;

    progressBar.style.transition = "width 0.3s ease-in-out";
    progressBar.style.width = `${progressPercentage}%`;
}

// **Carousel Durumunu Sıfırla**
function resetCarouselState() {
    clearTimeout(transitionTimeout);
    clearTimeout(autoNextTimeout);

    // Yeni slayt değişimi başlat
    startAutoSlide();
}
