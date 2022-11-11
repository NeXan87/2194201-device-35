let countNumber = document.querySelector(".slider__count-number");
let image = document.querySelector(".slider__image");
const prevButton = document.querySelector(".slider_prev");
const nextButton = document.querySelector(".slider_next");
let title = document.querySelector(".slider__title");
let description = document.querySelector(".slider__description");
let pageLink = document.querySelector(".slider__button");
let parameterWrapper = document.querySelector(".product-parameters");
let paginationList = document.querySelector(".slider__pagination");
let currentElement = 1;

let paginationButtons = function () {
  paginationButtons = document.querySelectorAll(".slider__point");
};

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

// Расчет количества кнопок пагинации
for (let i = 2; i <= elements; i++) {
  const fragment = document.createDocumentFragment();

  const li = document.createElement("li");
  li.classList.add("slider__pagination-item");

  const button = document.createElement("button");
  button.classList.add("button", "slider__point");
  button.setAttribute("type", "button");
  button.setAttribute("id", `element_${i}`);

  const span = document.createElement("span");
  span.classList.add("visually-hidden");
  span.textContent = `${i} товар`;

  const pagination = fragment
    .appendChild(li)
    .appendChild(button)
    .appendChild(span);

  paginationList.appendChild(fragment);

  if (i === elements) paginationButtons();
}

// Прослушивание кликов по кнопкам пагинации
for (let button of paginationButtons) {
  button.onclick = function () {
    for (const key in sliderItems) {
      if (key === button.getAttribute("id")) {
        transitionElement();
        setTimeout(updateSlider, 200, key, button);
        setTimeout(updateParameters, 200, key);

        currentElement = +button.getAttribute("id").replace(/[^0-9]/gim, "");

        setTimeout(updateCurrentNumber, 200);
      }
    }
    deleteButtonCurrent(button);
  };
}

// Прослушивание клика по кнопке "Назад"
prevButton.addEventListener("click", () => {
  if (currentElement > 1) currentElement--;
  else currentElement = elements;

  doPrevNextSlider();
});

// Прослушивание клика по кнопке "Вперед"
nextButton.addEventListener("click", () => {
  if (currentElement < elements) {
    currentElement++;
  } else {
    currentElement = 1;
  }

  doPrevNextSlider();
});

function doPrevNextSlider() {
  const key = `element_${currentElement}`;
  const button = paginationButtons[currentElement - 1];

  transitionElement();
  setTimeout(updateSlider, 200, key);
  setTimeout(updateParameters, 200, key);
  deleteButtonCurrent(button);
  setTimeout(updateCurrentNumber, 200);
}

// Функция обновления слайдера
function updateSlider(key) {
  image.src = sliderItems[key].src;
  title.textContent = sliderItems[key].h2;
  description.textContent = sliderItems[key].desc;
  pageLink.getAttribute("href", sliderItems[key].link);
}

// Функция плавного перехода между элементами
function transitionElement() {
  countNumber.style.opacity = "0";
  image.style.opacity = "0";
  title.style.opacity = "0";
  description.style.opacity = "0";
  parameterWrapper.style.opacity = "0";

  setTimeout(() => {
    countNumber.style.opacity = null;
    image.style.opacity = null;
    title.style.opacity = null;
    description.style.opacity = null;
    parameterWrapper.style.opacity = null;
  }, 200);
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
