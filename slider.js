const sliderRow = document.querySelector(".slider__row");
const sliderCards = document.querySelectorAll(".slider-card");
const leftButton = document.querySelector(".btn-left");
const rightButton = document.querySelector(".btn-right");

let clickCount;
let visibleArea = sliderRow.clientWidth;
let totalWidth = Array.from(sliderCards).reduce(
    (acc, curr) => acc + curr.clientWidth,
    0
);

let offset;
let currentPosition = 0;

setClickCount();
setButtonState();

window.addEventListener("resize", () => {
    visibleArea = sliderRow.clientWidth;
    totalWidth = Array.from(sliderCards).reduce(
        (acc, curr) => acc + curr.clientWidth,
        0
    );
    setClickCount();
    setButtonState();
});

function setClickCount() {
    window.innerWidth >= 769 ? (clickCount = 3) : (clickCount = 6);
    offset = (totalWidth - visibleArea + 60) / clickCount;
}

function setButtonState() {
    if (currentPosition <= 0) {
        leftButton.disabled = true;
        leftButton.classList.remove("btn-active");
        leftButton.classList.add("btn-disabled");
    } else {
        leftButton.disabled = false;
        leftButton.classList.add("btn-active");
        leftButton.classList.remove("btn-disabled");
    }

    if (currentPosition >= totalWidth - visibleArea) {
        rightButton.disabled = true;
        rightButton.classList.remove("btn-active");
        rightButton.classList.add("btn-disabled");
    } else {
        rightButton.disabled = false;
        rightButton.classList.add("btn-active");
        rightButton.classList.remove("btn-disabled");
    }
}

function sliderMoveRight() {
    if (currentPosition < totalWidth - visibleArea) {
        currentPosition += offset;
        sliderCards.forEach((card) => {
            card.style.transform = `translateX(-${currentPosition}px)`;
        });
        setButtonState();
    }
}

function sliderMoveLeft() {
    if (currentPosition > 0) {
        currentPosition -= offset;
        sliderCards.forEach((card) => {
            card.style.transform = `translateX(-${currentPosition}px)`;
        });
        setButtonState();
    }
}

rightButton.addEventListener("click", sliderMoveRight);
leftButton.addEventListener("click", sliderMoveLeft);
