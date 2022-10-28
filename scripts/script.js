"use strict";

const basketLink = document.querySelector(".user-basket-link");
let basketContainer = document.querySelector(".header__basket-container");
let catalogLink = document.querySelector(".catalog__button");
let catalogContainer = document.querySelector(".catalog__list");

basketLink.addEventListener("click", () => {
  event.preventDefault();
  basketContainer.classList.toggle("header_basket-open");
});

catalogLink.addEventListener("click", () => {
  event.preventDefault();
  catalogLink.classList.toggle("catalog_minus");
  catalogContainer.classList.toggle("catalog_open");
});

// document.addEventListener("click", (e) => {
//   const withinBoundaries = e.composedPath().includes(basketContainer);

//   if (!withinBoundaries) {
//     basketContainer.classList.remove("header_basket-open");
//   }
// });
