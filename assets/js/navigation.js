// JavaScript for toggle functionality for responsive Top Navigation Bar.

//--------------------
//--------------------
//--------------------

// Declared variables
const hamburgerCheckbox = document.getElementById("topnav__hamburger-checkbox");
const dropdownMenu = document.querySelector(".topnav__dropdown-menu");

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
