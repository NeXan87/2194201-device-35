"use strict";

let rangeTrack = document.querySelector("#range-track");
let toggleMin = document.querySelector("#toggle-min");
let toggleMax = document.querySelector("#toggle-max");
let outputMin = document.querySelector("#range-output-min");
let outputMax = document.querySelector("#range-output-max");

const minGap = 0; // минимальное расстояние между ползунками

movingToggleMin();
movingToggleMax();

toggleMin.oninput = function () {
  movingToggleMin();
};

toggleMax.oninput = function () {
  movingToggleMax();
};

toggleMin.onmousedown = function () {
  if (toggleMin.hasAttribute("style", "z-index: 0;"))
    toggleMin.style.zIndex = "1";
  if (toggleMax.hasAttribute("style", "z-index: 1;"))
    toggleMax.style.zIndex = "0";
};

toggleMax.onmousedown = function () {
  if (toggleMin.hasAttribute("style", "z-index: 1;"))
    toggleMin.style.zIndex = "0";
  if (toggleMax.hasAttribute("style", "z-index: 0;"))
    toggleMax.style.zIndex = "1";
};

function movingToggleMin() {
  if (+toggleMax.value - +toggleMin.value <= minGap) {
    toggleMin.value = +toggleMax.value - minGap;
  }
  outputMin.textContent = toggleMin.value;

  paintTrack();
}

function movingToggleMax() {
  if (+toggleMax.value - +toggleMin.value <= minGap) {
    toggleMax.value = +toggleMin.value + minGap;
  }
  outputMax.textContent = toggleMax.value;

  paintTrack();
}

function paintTrack() {
  let percentMin = (toggleMin.value / toggleMin.max) * 100;
  let percentMax = (toggleMax.value / toggleMax.max) * 100;

  rangeTrack.style.background = `linear-gradient(to right, #dcdcdc ${percentMin}%,
                                                           #444444 ${percentMin}%,
                                                           #444444 ${percentMax}%,
                                                           #dcdcdc ${percentMax}%)`;
}
