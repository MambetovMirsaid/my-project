const burgerBtn = document.querySelector(".mobile-burger");
const headerNav = document.querySelector(".header__nav");
burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("active");
    headerNav.classList.toggle("mobile__nav");
});
const tags = {
    "for-work": "tag-purple",
    "for-health": "tag-green",
    "for-harmony": "tag-pink",
};
fetch("gifts.json")
    .then((res) => res.json())
    .then(displayGifts);

function displayGifts(data) {
    data.map((gift, index) => {
        if (index < 12) {
            const category = gift.category.toLowerCase().split(" ").join("-");
            const card = document.createElement("figcaption");
            card.className = "best-gifts-card";
            card.innerHTML = `
                        <img src="./src/img/gift-${category}.png" alt="${gift.category}" />
                        <figcaption>
                            <p class="heading heading-4 ${tags[category]}">${gift.category}</p>
                            <h3 class="heading heading-3">${gift.name}</h3>
                        </figcaption>`;
            document.querySelector("#gifts-container").append(card);
        }
    });
}

// Получаем вкладки и контейнер с карточками
const tabs = document.querySelectorAll(".gifts__tabs .tab");
const cards = document.querySelectorAll(".best-gifts-card");

// Функция фильтрации карточек
function filterGifts(category) {
    cards.forEach((card) => {
        const tag = card.querySelector("figcaption p").textContent.trim();
        if (category === "All" || tag === category) {
            card.style.display = "block"; // Показываем карточку
        } else {
            card.style.display = "none"; // Скрываем карточку
        }
    });
}

// Добавляем обработчики событий для вкладок
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Удаляем класс активности у всех вкладок
        tabs.forEach((tab) => tab.classList.remove("active"));

        // Добавляем класс активности к выбранной вкладке
        tab.classList.add("active");

        // Фильтруем карточки
        const category = tab.textContent.trim(); // Получаем текст вкладки
        filterGifts(category);
    });
});

const sliderRow = document.querySelector(".slider__row");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const sliderCards = document.querySelectorAll(".slider-card");

let currentPosition = 0;
const visibleAreaWidth = 400; // Ширина видимой области
const totalWidth = sliderCards.length * visibleAreaWidth; // Общая ширина слайдов
const step = visibleAreaWidth; // На сколько сдвигать за 1 клик
const maxPosition = totalWidth - visibleAreaWidth; // Максимальная прокрутка
