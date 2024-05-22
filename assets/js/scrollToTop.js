// Small function, to make page scroll all the way to the top
// of the page when clicked.

//--------------------
//--------------------
//--------------------

function scrollToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

document.getElementById("scrollButton").addEventListener("click", scrollToTop);
