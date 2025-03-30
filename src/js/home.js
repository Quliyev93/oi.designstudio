// Select DOM elements
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

// Timing configurations
const TIME_RUNNING = 1500; // Animation duration for the transition
const TIME_AUTO_NEXT = 3500; // Auto-slide duration

// Initialize timeout variables
let transitionTimeout;
let autoNextTimeout;
let isTransitioning = false; // Geçiş sırasında yeni slayda geçişi engellemek için

// Create and append the progress bar
const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";

progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Event listeners for navigation buttons
nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

// Add attribute to each item
items.forEach((item, index) => {
    item.querySelector(".title").setAttribute("data-item", index + 1);
});

// Automatically navigate to the next slide
autoNextTimeout = setTimeout(() => {
    if (!isTransitioning) {
        nextBtn.click();
    }
}, TIME_AUTO_NEXT);

// Start the initial running time animation and progress bar
afterSlideChange();

// Handles slider navigation (next/prev)
function handleSliderNavigation(direction) {
    if (isTransitioning) return; // Eğer geçiş devam ediyorsa, yeni bir geçişi engelle

    isTransitioning = true; // Yeni bir geçiş başlatıldığında geçiş durumunu güncelle

    const sliderItems = list.querySelectorAll(".item"); // Get all current items in the list

    if (direction === "next") {
        list.appendChild(sliderItems[0]); // Move the first item to the end of the list
        carousel.classList.add("next"); // Add the "next" class for transition
    } else if (direction === "prev") {
        list.prepend(sliderItems[sliderItems.length - 1]); // Move the last item to the start of the list
        carousel.classList.add("prev"); // Add the "prev" class for transition
    }

    afterSlideChange(); // Log the active slide index

    // Geçiş tamamlandıktan sonra tekrar hareket izni ver
    setTimeout(() => {
        isTransitioning = false;
        carousel.classList.remove("next");
        carousel.classList.remove("prev");
    }, TIME_RUNNING);
}

// Logs the current active slide's original index
function afterSlideChange() {
    const slideNumberElement = document.querySelector(".slide-number");
    if (slideNumberElement) slideNumberElement.remove();

    const sliderItems = Array.from(list.querySelectorAll(".item")); // Get the current visible order of items
    const activeItem = parseInt(
        sliderItems[1].querySelector(".title").getAttribute("data-item")
    ); // The first visible item is the active one

    const activeIndex =
        activeItem < 10 ? `0${activeItem}` : activeItem.toString();

    const div = document.createElement("div");
    div.classList.add("slide-number");
    div.textContent = `${activeIndex}/${sliderItems.length}`;

    arrowsDiv.appendChild(div);

    updateProgressBar();
    resetCarouselState();
}

// Updates the progress bar based on the active slide index
function updateProgressBar() {
    const totalSlides = items.length;

    const sliderItems = Array.from(list.querySelectorAll(".item")); // Get the current visible order of items
    const activeItem = parseInt(sliderItems[0].querySelector(".title").getAttribute("data-item")) + 1; // The first visible item is the active one

    const progressPercentage = (activeItem / totalSlides) * 100; // Calculate progress percentage
    progressBar.style.width = `${progressPercentage}%`; // Update the progress bar's width
}

// Resets the carousel state after navigation
function resetCarouselState() {
    // Clear existing timeouts for transitions and auto-slide
    clearTimeout(transitionTimeout);
    clearTimeout(autoNextTimeout);

    // Restart the auto-slide timer only if not transitioning
    autoNextTimeout = setTimeout(() => {
        if (!isTransitioning) {
            nextBtn.click();
        }
    }, TIME_AUTO_NEXT);
}
