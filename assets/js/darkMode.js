// Dark mode function with document load

//--------------------
//--------------------
//--------------------
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkModeToggle");
  // Get the current theme from localStorage
  const currentMode = localStorage.getItem("theme");

  if (currentMode === "dark") {
    document.body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    //Defualt theme for user
    let theme = "light";
    if (document.body.classList.contains("dark-mode")) {
      theme = "dark";
    }
    // Save the new theme to localStorage
    localStorage.setItem("theme", theme);
  });
});
