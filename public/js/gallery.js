const template = document.querySelector(".template");
const images = document.querySelectorAll(".template a");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
let currentIndex = 0;
images[currentIndex].querySelector("img").classList.add("highlight");
function updateSlides() {
    const offset = -currentIndex * 300;
    template.style.transform = `translateX(${offset}px)`;
}

left.addEventListener("click", () => {
    if (currentIndex === 0) {
        return;
    }
    images[currentIndex].querySelector("img").classList.remove("highlight");
    currentIndex--;
    images[currentIndex].querySelector("img").classList.add("highlight");
    updateSlides();
});

right.addEventListener("click", () => {
    if (currentIndex === images.length - 1) {
        return;
    }
    images[currentIndex].querySelector("img").classList.remove("highlight");
    currentIndex++;
    images[currentIndex].querySelector("img").classList.add("highlight");
    updateSlides();
});
