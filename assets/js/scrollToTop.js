function scrollToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

document.getElementById("scrollButton").addEventListener("click", scrollToTop);
