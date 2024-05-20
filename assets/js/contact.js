// Using FETCH method, fetchAPI to create(POST HTTP Method)
// Using this free API for training purposes "https://jasonplaceholder.typicode.com/posts".
// For making post requests

//--------------------
//--------------------
//--------------------

const POST_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

const showAlert = (message, isSuccess = true) => {
  const successAlert = document.querySelector("#contact__alert-box");
  successAlert.style.display = "block";
  successAlert.style.backgroundColor = isSuccess ? "green" : "red";
  successAlert.textContent = message;
  setTimeout(() => {
    successAlert.style.display = "none";
  }, 3000);
};

const sendForm = async (event) => {
  // This syntax prevents the form from refreshing the page on submission
  event.preventDefault();

  // Creating a new FormData object
  const formElement = document.querySelector("#contact__form-message");
  const formData = new FormData(formElement);

  // Construct the data object from the FormData
  const data = {
    title: formData.get("name"),
    body: `${formData.get("email")}, ${formData.get("message")}, ${formData.get(
      "phone"
    )}`,
    userId: 10, // Hardcoded userId for training purposes
  };

  // Using the fetch method
  try {
    const response = await fetch(POST_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    // Extra layer of error handling
    if (!response.ok) {
      // Display error message
      showAlert("Something went wrong. Please try again!", false);
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else if (response.ok) {
      // Display success message
      showAlert("Your message has been sent successfully!");
    }

    const userResponseData = await response.json();
    console.log(userResponseData);
  } catch (e) {
    // Display error message
    console.error("Error", e.message);
    showAlert("Something went wrong. Please try again!", false);
  }

  formElement.reset();
};

// Dom slection to connect my function "sendForm" with submit event
document
  .querySelector("#contact__form-message")
  .addEventListener("submit", sendForm);
