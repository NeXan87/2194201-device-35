"use strict";

const basketLink = document.querySelector(".user-basket-link");
let basketContainer = document.querySelector(".header__basket-container");
let catalogLink = document.querySelector(".catalog__button");
let catalogContainer = document.querySelector(".catalog__list");

catalogLink.addEventListener("click", (event) => {
  event.preventDefault();
  catalogLink.classList.toggle("catalog_minus");
  catalogContainer.classList.toggle("catalog_open");
});

// Открытие попапа по клику на корзину
basketLink.addEventListener("click", (event) => {
  event.preventDefault();
  basketContainer.classList.toggle("header_basket-open");
});

// Закрыть попап корзины по клику вне блока
document.addEventListener("click", (event) => {
  const target = event.target;
  const itsBasketContainer =
    target == basketContainer || basketContainer.contains(target);
  const itsBasketLink = target == basketLink;
  const basketContainerIsActive =
    basketContainer.classList.contains("header_basket-open");

  if (!itsBasketContainer && !itsBasketLink && basketContainerIsActive) {
    basketContainer.classList.toggle("header_basket-open");
  }
});
