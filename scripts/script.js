"use strict";

const basketLink = document.querySelector(".user-basket-link");
let basketContainer = document.querySelector(".header__basket-container");
let basketElementClose = document.querySelectorAll(
  ".header__basket-close-button"
);
let basketPriceElements = document.querySelectorAll(".header__basket-rub");
let basketTotalCount = document.querySelector(".header__basket-total-count");
let basketTotalSum = document.querySelector(".header__basket-sum");
let catalogLink = document.querySelector(".catalog__button");
let catalogContainer = document.querySelector(".catalog__list");
let priceTemp = 0;

calcBasketElements();

catalogLink.addEventListener("click", () => {
  catalogLink.classList.toggle("catalog_minus");
  catalogContainer.classList.toggle("catalog_open");

  document.addEventListener("click", closePopup);
  document.addEventListener("keydown", closePopupEsc);
});

function closePopup(event) {
  const withinBasket = event.composedPath().includes(basketContainer);
  const withinBasketLink = event.composedPath().includes(basketLink);
  const withinCatalog = event.composedPath().includes(catalogContainer);
  const withinCatalogLink = event.composedPath().includes(catalogLink);

  if (
    event.keyCode == 27 ||
    (!withinBasketLink &&
      !withinBasket &&
      basketContainer.classList.contains("header_basket-open"))
  ) {
    basketContainer.classList.toggle("header_basket-open");

    document.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopupEsc);
  }

  if (
    !withinCatalogLink &&
    !withinCatalog &&
    catalogContainer.classList.contains("catalog_open")
  ) {
    catalogLink.classList.toggle("catalog_minus");
    catalogContainer.classList.toggle("catalog_open");

    document.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopupEsc);
  }
}

function closePopupEsc(event) {
  if (event.keyCode == 27) {
    basketContainer.classList.remove("header_basket-open");
    catalogLink.classList.remove("catalog_minus");
    catalogContainer.classList.remove("catalog_open");

    if (document.querySelector(".modal").hasAttribute("open")) {
      document.body.style.overflow = null;
    }
  }

  document.removeEventListener("keydown", closePopupEsc);
}

// Открытие попапа по клику на корзину
basketLink.addEventListener("click", (event) => {
  event.preventDefault();
  basketContainer.classList.toggle("header_basket-open");

  document.addEventListener("click", closePopup);
  document.addEventListener("keydown", closePopupEsc);
});

// Функция инициализации количества товаров и общей цены в корзине
function calcBasketElements() {
  for (let i = 0; i < basketPriceElements.length; i++) {
    priceTemp += +basketPriceElements[i].textContent;
    if (i === basketPriceElements.length - 1) {
      basketTotalCount.textContent = i + 1;
    }
  }
  basketTotalSum.textContent = priceTemp;
}

// Обработчик нажатия кнопок "Удалить товар" в корзине
for (let buttonClose of basketElementClose) {
  buttonClose.onclick = function () {
    const parentElements = buttonClose.parentNode.parentNode;
    const priceElement = +buttonClose.previousElementSibling.textContent;
    parentElements.removeChild(buttonClose.parentNode);
    basketElementClose = document.querySelectorAll(
      ".header__basket-close-button"
    );
    basketPriceElements = document.querySelectorAll(".header__basket-rub");
    basketTotalCount.textContent -= 1;

    subtlePriceElement(priceElement);
  };
}

// Функция расчет общей цены после удаления товара из корзины
function subtlePriceElement(priceElement) {
  basketTotalSum.textContent = priceTemp - priceElement;
  priceTemp = +basketTotalSum.textContent;
}
