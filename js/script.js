const btn = document.getElementById("openBtn");
const body = document.body;

btn.addEventListener("click", () => {
    body.classList.add("hide");

    setTimeout(() => {
        body.classList.add("show-paper");
    }, 400);
});

const slides = document.querySelectorAll(".slide");
const nextBtns = document.querySelectorAll(".next-slide");

let current = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

function goNext() {
    current++;
    if (current >= slides.length) current = 0;
    showSlide(current);
}

function goPrev() {
    current--;
    if (current < 0) current = slides.length - 1;
    showSlide(current);
}

/* кнопки внутри */
nextBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        goNext();
    });
});

/* 📱 свайп */
let startX = 0;
const slider = document.querySelector(".slider");

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
        goNext();
    } else {
        goPrev();
    }
});

/* ⏳ таймер */
const weddingDate = new Date("Aug 25, 2026 18:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

