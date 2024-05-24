// #Dark mode, #Top Navigation Bar, #Page Scroll to Top, #Page loader animation

//--------------------
//--------------------
//--------------------
// Dark mode
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("darkModeToggle");
    // Get the current theme from localStorage
    const currentMode = localStorage.getItem("theme");
  
    if (currentMode === "dark") {
      document.body.classList.add("dark-mode");
    }
  
    toggleButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
  
      // Defualt theme for user
      let theme = "light";
      if (document.body.classList.contains("dark-mode")) {
        theme = "dark";
      }
      // Save the new theme to localStorage
      localStorage.setItem("theme", theme);
    });
  });

//--------------------
//--------------------
//--------------------
// Top Navigation Bar
// Constants
const hamburgerCheckbox = document.getElementById("topnav__hamburger-checkbox"),
dropdownMenu = document.querySelector(".topnav__dropdown-menu");

hamburgerCheckbox.addEventListener("change", function () {
if (this.checked) {
  dropdownMenu.style.display = "block";
} else {
  dropdownMenu.style.display = "none";
}
});

// Make sure that the dropdown menu is hidden when the screen is resized above 766px
window.addEventListener("resize", function () {
if (window.innerWidth > 766) {
  document.querySelector(".topnav__dropdown-menu").style.display = "none";
}
});

//--------------------
//--------------------
//--------------------
// Page Scroll to Top
function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  
  document.getElementById("scrollButton").addEventListener("click", scrollToTop);

//--------------------
//--------------------
//--------------------
// Page loader animation
const removeSplashAnimation = () => {
  const splash = document.querySelector(".splash");
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 500);
};

document.addEventListener("DOMContentLoaded", removeSplashAnimation);