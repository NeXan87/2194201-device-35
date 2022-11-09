"use strict";

const deliveryLink = document.querySelector(".delivery__link");
let modalDialog = document.querySelector(".modal");
const closeButtonModal = document.querySelector(".modal__close-button");
let modalForm = document.querySelector(".modal__form");
let buttonInputMinus = document.querySelector(".modal__button-input_minus");
let buttonInputPlus = document.querySelector(".modal__button-input_plus");
let buttonsInputNumber = document.querySelector(".modal__input_number");
let modalInputName = document.querySelector(".modal__input_name");
let modalInputEmail = document.querySelector(".modal__input_email");
let modalInfoShow = document.querySelector(".modal__info_name");
let modalErrorShow = document.querySelector(".modal__input-title_email");
let tempEmail;

const deliveryAmountMin = 1; // Минимальное количество позиций в доставке
const deliveryAmountMax = 50; // Максимальное количество позиций в доставке

// Функция валидации электронной почты
function emailValidation(value) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return pattern.test(value);
}

// Сброс клика по умолчанию по ссылке "Доставка" и открытие модального окна
deliveryLink.addEventListener("click", (event) => {
  event.preventDefault();
  modalDialog.showModal();
  document.body.style.overflow = "hidden";
});

// Закрытие модального окна по кнопке "Закрыть"
closeButtonModal.addEventListener("click", () => {
  modalDialog.close();
  document.body.style.overflow = "";
});

// Закрытие модального окна кликом по подложке
modalDialog.addEventListener("click", closeModal);

function closeModal({ currentTarget, target }) {
  modalDialog = currentTarget;
  const closeModal = target === modalDialog;
  if (closeModal) {
    modalDialog.close();
    document.body.style.overflow = "";
  }
}

// Инициализация состояния кнопок "Уменьшить" или "Увеличить" в input
if (buttonsInputNumber.value <= deliveryAmountMin) {
  buttonInputMinus.setAttribute("disabled", "");
} else if (buttonsInputNumber.value >= deliveryAmountMax) {
  buttonInputPlus.setAttribute("disabled", "");
}

// Кнопка "Уменьшить" число в input
buttonInputMinus.addEventListener("click", () => {
  if (buttonsInputNumber.value > deliveryAmountMin) {
    buttonsInputNumber.value--;
    if (buttonsInputNumber.value < deliveryAmountMax) {
      buttonInputPlus.removeAttribute("disabled", "");
    }
  }
  if (buttonsInputNumber.value <= deliveryAmountMin) {
    buttonInputMinus.setAttribute("disabled", "");
  }
});

// Кнопка "Увеличить" число в input
buttonInputPlus.addEventListener("click", () => {
  if (buttonsInputNumber.value < deliveryAmountMax) {
    buttonsInputNumber.value++;
    if (buttonsInputNumber.value > deliveryAmountMin) {
      buttonInputMinus.removeAttribute("disabled", "");
    }
  }
  if (buttonsInputNumber.value >= deliveryAmountMax) {
    buttonInputPlus.setAttribute("disabled", "");
  }
});

// Прослушивание числа в input для изменения состояния кнопок
buttonsInputNumber.addEventListener("input", () => {
  if (buttonsInputNumber.value <= deliveryAmountMin) {
    buttonInputMinus.setAttribute("disabled", "");
  } else {
    buttonInputMinus.removeAttribute("disabled", "");
  }
  if (buttonsInputNumber.value >= deliveryAmountMax) {
    buttonInputPlus.setAttribute("disabled", "");
  } else {
    buttonInputPlus.removeAttribute("disabled", "");
  }

  if (buttonsInputNumber.value > deliveryAmountMax) {
    buttonsInputNumber.value = deliveryAmountMax;
  } else if (buttonsInputNumber.value < deliveryAmountMin) {
    buttonsInputNumber.value = deliveryAmountMin;
  }
});

//
modalForm.addEventListener("submit", (event) => {
  if (modalInputName.value == "") {
    event.preventDefault();
    modalInfoShow.classList.add("modal__info_show");
  }
  if (!emailValidation(modalInputEmail.value)) {
    event.preventDefault();
    tempEmail = modalInputEmail.value;
    modalErrorShow.classList.add("modal__input-title_error");
  }
});

// Закрыть сообщение "Добавьте имя"
modalInputName.addEventListener("input", () => {
  if (modalInputName.value !== "") {
    modalInfoShow.classList.remove("modal__info_show");
  }
});

// Закрыть сообщение "Забавный у вас email"
modalInputEmail.addEventListener("input", () => {
  if (tempEmail !== modalInputEmail.value) {
    modalErrorShow.classList.remove("modal__input-title_error");
  }
});
