"use strict";

const sliderWrapper = document.querySelector(".slider");
const prevButton = document.querySelector(".slider__button-control_prev");
const nextButton = document.querySelector(".slider__button-control_next");
let countNumber = document.querySelector(".slider__count-number");
let imageLink = document.querySelector(".slider__link_img");
let image = document.querySelectorAll(".slider__image");
let title = document.querySelector(".slider__title");
let description = document.querySelector(".slider__description");
let pageLink = document.querySelector(".slider__button");
let parameterWrapper = document.querySelector(".product-parameters");
let parameterList = document.querySelectorAll(".product-parameters__list");
let parameterTitle = document.querySelectorAll(".product-parameters__title");
let parameterDesc = document.querySelectorAll(
  ".product-parameters__description"
);
let paginationList = document.querySelector(".slider__pagination");
let autoTwisting;
let currentElement = 1;

let paginationButtons = function () {
  paginationButtons = document.querySelectorAll(".slider__point");
};

const transitionTime = 200; // мсек., время перехода между элементами слайдера
const twistingTime = 7; // сек., время между перелистываниями элементов слайдера
const twistingSlider = true; // перелистывание слайдера, true или false

const sliderItems = {
  element_1: {
    // Первый элемент слайдера добавляется из html (на случай отключенного JS в браузере пользователя), остальные - в объекте
    h2: title.innerText,
    desc: description.innerText,
    link: pageLink.getAttribute("href"),
    img: {
      src: image[0].getAttribute("src"),
      width: image[0].getAttribute("width"),
      height: image[0].getAttribute("height"),
    },
  },
  element_2: {
    h2: "Худеем правильно!",
    desc: "Мотивирующие фитнес-браслеты помогут найти в себе силы не пропускать занятия и соблюдать диету.",
    link: "#",
    img: {
      src: "images/products/slider/product-2.png",
      width: 560,
      height: 560,
    },
    param_1: {
      dTitle: "Без подзарядки",
      dDesc: "48 часов",
    },
  },
  element_3: {
    h2: "Делай селфи, как Бен Стиллер! ",
    desc: "Самая длинная палка для селфи доступна в нашем магазине. Восемь (Восемь, Карл!) метров длиной и весом всего 5 кг.",
    link: "#",
    img: {
      src: "images/products/slider/product-3.png",
      width: 560,
      height: 560,
    },
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

// Автоматическое перелистывание (вкл., откл.)
if (twistingSlider) {
  twisting();
}

// Считывание списка параметров элемента слайдера в html для 1 элемента в объекте
for (let i = 1; i <= parameterList.length; i++) {
  sliderItems.element_1[`param_${i}`] = new Object();
  sliderItems.element_1[`param_${i}`].dTitle = parameterTitle[i - 1].innerText;
  sliderItems.element_1[`param_${i}`].dDesc = parameterDesc[i - 1].innerText;
}

const elements = Object.keys(sliderItems).length;

// Расчет количества изображений и кнопок пагинации
for (let i = 2; i <= elements; i++) {
  const fragmentButtons = document.createDocumentFragment();
  const images = document.createDocumentFragment();

  const img = document.createElement("img");
  img.classList.add("slider__image", "visually-hidden");
  img.src = sliderItems[`element_${i}`].img.src;
  img.setAttribute("width", sliderItems[`element_${i}`].img.width);
  img.setAttribute("height", sliderItems[`element_${i}`].img.height);

  const li = document.createElement("li");
  li.classList.add("slider__pagination-item");

  const button = document.createElement("button");
  button.classList.add("button", "slider__point");
  button.setAttribute("type", "button");
  button.setAttribute("id", `element_${i}`);

  const span = document.createElement("span");
  span.classList.add("visually-hidden");
  span.textContent = `${i} товар`;

  const imagesList = images.appendChild(img);

  const pagination = fragmentButtons
    .appendChild(li)
    .appendChild(button)
    .appendChild(span);

  imageLink.appendChild(images);
  paginationList.appendChild(fragmentButtons);

  if (i === elements) {
    paginationButtons();
    image = document.querySelectorAll(".slider__image");
  }
}

// Функция включения автоматического перелистывания
function twisting() {
  autoTwisting = setInterval(nextElement, twistingTime * 1000);
}

// Прослушивание кликов по кнопкам пагинации
for (let button of paginationButtons) {
  button.onclick = function () {
    for (const key in sliderItems) {
      if (key !== button.getAttribute("id")) continue;
      currentElement = +button.getAttribute("id").replace(/[^0-9]/gim, "");

      changeElement(key, button);
    }
  };
}

// Остановка таймера при наведении курсора мыши на слайдер
sliderWrapper.addEventListener("mouseenter", () => {
  clearInterval(autoTwisting);
});

// Запуск таймера при покидании курсора мыши за пределы слайдера
sliderWrapper.addEventListener("mouseleave", () => {
  twisting();
});

// Прослушивание клика по кнопке "Назад"
prevButton.addEventListener("click", () => {
  prevElement();
});

// Прослушивание клика по кнопке "Вперед"
nextButton.addEventListener("click", () => {
  nextElement();
});

// Функция переключения элемента слайдера назад на 1
function prevElement() {
  if (currentElement > 1) currentElement--;
  else currentElement = elements;

  changeElement();
}

// Функция переключения элемента слайдера вперед на 1
function nextElement() {
  if (currentElement < elements) currentElement++;
  else currentElement = 1;

  changeElement();
}

// Вызов функций
function changeElement(key, button) {
  if (typeof key === "undefined" && typeof button === "undefined") {
    key = `element_${currentElement}`;
    button = paginationButtons[currentElement - 1];
  }

  transitionElement();
  setTimeout(updateSlider, transitionTime, key, button);
  setTimeout(updateParameters, transitionTime, key);
  setTimeout(updateCurrentNumber, transitionTime);
  deleteButtonCurrent(button);
}

// Функция обновления слайдера
function updateSlider(key) {
  imageLink.setAttribute("href", sliderItems[key].link);
  title.textContent = sliderItems[key].h2;
  description.textContent = sliderItems[key].desc;
  pageLink.setAttribute("href", sliderItems[key].link);

  for (let i = 0; i < image.length; i++) {
    image[i].classList.add("visually-hidden");
    image[currentElement - 1].classList.remove("visually-hidden");
  }
}

// Функция плавного перехода между элементами
function transitionElement() {
  countNumber.style.opacity = "0";
  imageLink.style.opacity = "0";
  title.style.opacity = "0";
  description.style.opacity = "0";
  parameterWrapper.style.opacity = "0";

  setTimeout(() => {
    countNumber.style.opacity = null;
    imageLink.style.opacity = null;
    title.style.opacity = null;
    description.style.opacity = null;
    parameterWrapper.style.opacity = null;
  }, transitionTime);
}

// Функция удаления класса с прежней активной кнопки пагинации и добавление текущей
function deleteButtonCurrent(button) {
  for (let buttonCurrent of paginationButtons) {
    if (!buttonCurrent.classList.contains("slider_current-point")) continue;
    buttonCurrent.classList.remove("slider_current-point");
  }

  button.classList.add("slider_current-point");
}

//Функция обновления характеристик товара
function updateParameters(key) {
  parameterWrapper.innerHTML = "";

  for (let i = 1; i <= elements; i++) {
    if (!sliderItems[key][`param_${i}`]) continue;

    const fragment = document.createDocumentFragment();

    const dl = document.createElement("dl");
    dl.classList.add("product-parameters__list");

    const dt = document.createElement("dt");
    dt.classList.add("product-parameters__title");
    dt.textContent = sliderItems[key][`param_${i}`].dTitle;

    const dd = document.createElement("dd");
    dd.classList.add("product-parameters__description");
    dd.textContent = sliderItems[key][`param_${i}`].dDesc;

    let pagination = fragment.appendChild(dl).appendChild(dt);
    pagination = fragment.appendChild(dl).appendChild(dd);

    parameterWrapper.appendChild(fragment);
  }
}

// Функция обновления номера текущего элемента в слайдере
function updateCurrentNumber() {
  if (currentElement < 10) {
    countNumber.textContent = "0" + currentElement;
  } else {
    countNumber.textContent = currentElement;
  }
}
