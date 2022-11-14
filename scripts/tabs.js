let advantagesInner = document.querySelector(".advantages__inner");
let advantagesButton = document.querySelectorAll(".advantages__button");
let advantagesDescription = document.querySelectorAll(
  ".advantages__description"
);

for (let i = 0; i < advantagesButton.length; i++) {
  advantagesButton[i].onclick = function () {
    transitionTabs();
    setTimeout(switchingClasses, 200, i);
  };
}

function transitionTabs() {
  advantagesInner.style.opacity = "0";

  setTimeout(() => {
    advantagesInner.style.opacity = null;
  }, 200);
}

function switchingClasses(i) {
  if (!advantagesButton[i].classList.contains("advantages_current")) {
    advantagesButton[i].classList.toggle("advantages_current");
    advantagesDescription[i].classList.toggle("visually-hidden");
  }
  for (let j = 0; j < advantagesButton.length; j++) {
    if (i === j) continue;
    advantagesButton[j].classList.remove("advantages_current");
    advantagesDescription[j].classList.add("visually-hidden");
  }
}
