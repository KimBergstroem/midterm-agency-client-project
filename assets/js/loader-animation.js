// Page loader animation

//--------------------
//--------------------
//--------------------

const removeSplashAnimation = () => {
  const splash = document.querySelector(".splash");
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 500);
};

document.addEventListener("DOMContentLoaded", removeSplashAnimation);
