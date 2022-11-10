let countNumber = document.querySelector(".slider__count-number");
let image = document.querySelector(".slider__image");
const prevButton = document.querySelector(".slider_prev");
const nextButton = document.querySelector(".slider_next");
let title = document.querySelector(".slider__title");
let description = document.querySelector(".slider__description");
let pageLink = document.querySelector(".slider__button");
let parameterList = document.querySelectorAll(".product-parameters__list");
let parameterTitle = document.querySelectorAll(".product-parameters__title");
let parameterDesc = document.querySelectorAll(
  ".product-parameters__description"
);
let paginationList = document.querySelector(".slider__pagination");
let paginationItem = document.querySelectorAll(".slider__pagination-item");
let paginationButton = document.querySelectorAll(".slider__point");

const sliderItems = {
  element_1: {
    src: "images/products/slider/product-1.png",
    h2: "Порхает как бабочка, жалит как пчела!",
    desc: "Этот обычный, на первый взгляд, квадрокоптер оснащен мощным лазером, замаскированным под стандартную камеру.",
    link: "#",
    param_1: {
      dTitle: "Дальность полета",
      dDesc: "800 м",
    },
    param_2: {
      dTitle: "Радиус поражения",
      dDesc: "50 м",
    },
  },
  element_2: {
    src: "images/products/slider/product-2.png",
    h2: "Худеем правильно!",
    desc: "Мотивирующие фитнес-браслеты помогут найти в себе силы не пропускать занятия и соблюдать диету.",
    link: "#",
    param_1: {
      dTitle: "Без подзарядки",
      dDesc: "48 часов",
    },
  },
  element_3: {
    src: "images/products/slider/product-3.png",
    h2: "Делай селфи, как Бен Стиллер! ",
    desc: "Самая длинная палка для селфи доступна в нашем магазине. Восемь (Восемь, Карл!) метров длиной и весом всего 5 кг.",
    link: "#",
    param_1: {
      dTitle: "Длина палки",
      dDesc: "8,5 м",
    },
    param_2: {
      dTitle: "Вес палки",
      dDesc: "5 кг",
    },
    param_3: {
      dTitle: "Материал",
      dDesc: "Карбон",
    },
  },
};

const elements = Object.keys(sliderItems).length;

// Расчет количества элементов в слайдере и вставка пагинации на страницу
for (let i = 1; i <= elements; i++) {
  const fragment = document.createDocumentFragment();

  const li = document.createElement("li");
  li.classList.add("slider__pagination-item");

  const button = document.createElement("button");
  button.classList.add("button", "slider__point");
  if (i === 1) button.classList.add("slider_current-point");

  const span = document.createElement("span");
  span.classList.add("visually-hidden");
  span.textContent = `Товар ${i}`;

  const pagination = fragment
    .appendChild(li)
    .appendChild(button)
    .appendChild(span);

  paginationList.appendChild(fragment);
}

console.log(paginationList);
