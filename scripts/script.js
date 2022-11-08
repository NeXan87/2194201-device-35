"use strict";

const basketLink = document.querySelector(".user-basket-link");
let basketContainer = document.querySelector(".header__basket-container");
let catalogLink = document.querySelector(".catalog__button");
let catalogContainer = document.querySelector(".catalog__list");
let advantagesButton = document.querySelectorAll(".advantages__button");
let advantagesDescription = document.querySelectorAll(
  ".advantages__description"
);
const deliveryLink = document.querySelector(".delivery__link");

basketLink.addEventListener("click", () => {
  event.preventDefault();
  basketContainer.classList.toggle("header_basket-open");
});

catalogLink.addEventListener("click", () => {
  event.preventDefault();
  catalogLink.classList.toggle("catalog_minus");
  catalogContainer.classList.toggle("catalog_open");
});

for (let i = 0; i < advantagesButton.length; i++) {
  advantagesButton[i].onclick = function () {
    if (!advantagesButton[i].classList.contains("advantages_current")) {
      advantagesButton[i].classList.toggle("advantages_current");
      advantagesDescription[i].classList.toggle("visually-hidden");
    }
    for (let j = 0; j < advantagesButton.length; j++) {
      if (i === j) continue;
      advantagesButton[j].classList.remove("advantages_current");
      advantagesDescription[j].classList.add("visually-hidden");
    }
  };
}

deliveryLink.addEventListener("click", (event) => {
  event.preventDefault();
});

deliveryModal.addEventListener("click", closeModal);

function closeModal({ currentTarget, target }) {
  const deliveryModal = currentTarget;
  const closeModal = target === deliveryModal;
  if (closeModal) {
    deliveryModal.close();
  }
}

// document.addEventListener("click", (e) => {
//   const withinBoundaries = e.composedPath().includes(basketContainer);

//   if (!withinBoundaries) {
//     basketContainer.classList.remove("header_basket-open");
//   }
// });
