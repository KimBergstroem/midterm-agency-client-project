// JavaScript for toggle functionality for responsive Top Navigation Bar.
const hamburgerCheckbox = document.getElementById("topnav__hamburger-checkbox");
const dropdownMenu = document.querySelector(".topnav__dropdown-menu");

hamburgerCheckbox.addEventListener("change", function () {
  if (this.checked) {
    dropdownMenu.style.display = "block";
  } else {
    dropdownMenu.style.display = "none";
  }
});
