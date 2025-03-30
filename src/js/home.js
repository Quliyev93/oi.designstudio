// DOM öğelerini seç
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

// Zaman ayarları
const TIME_RUNNING = 1500; // Geçiş süresi (ms)
const TIME_AUTO_NEXT = 3500; // Otomatik slayt süresi (ms)

// Zamanlayıcı değişkenleri
let transitionTimeout;
let autoNextTimeout;
let isTransitioning = false; // Geçiş sırasında kontrol

// **Progress bar oluştur ve ekle**
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

// **Otomatik slayt geçişini başlat**
startAutoSlide();
afterSlideChange(); // İlk durumu ayarla

// **Slayt Değiştirme Fonksiyonu**
function handleSliderNavigation(direction) {
    if (isTransitioning) return; // Eğer geçiş devam ediyorsa yeni bir geçişi engelle

    isTransitioning = true; // Geçiş başladı
    clearTimeout(autoNextTimeout); // Otomatik geçişi durdur

    const sliderItems = list.querySelectorAll(".item");

    if (direction === "next") {
        list.appendChild(sliderItems[0]); // İlk öğeyi sona taşı
        carousel.style.transform = "translateX(-100%)";
    } else if (direction === "prev") {
        list.prepend(sliderItems[sliderItems.length - 1]); // Son öğeyi başa taşı
        carousel.style.transform = "translateX(100%)";
    }

    // **Geçiş tamamlanınca tekrar aç**
    setTimeout(() => {
        isTransitioning = false;
        carousel.style.transform = "translateX(0)"; // Konumu sıfırla
    }, TIME_RUNNING);

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
