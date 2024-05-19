// Using FETCH method, fetchAPI to create(POST HTTP Method)
// Using this free API for training purposes "https://jasonplaceholder.typicode.com/posts".
// For making post requests

//--------------------
//--------------------
//--------------------

const POST_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

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

    //Extra layer of error handling
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userResponseData = await response.json();
    console.log(userResponseData);
  } catch (e) {
    console.error("Error", e.message);
    alert("There was an error submitting the form. Please try again.");
  }

  formElement.reset();
};

// Dom slection to connect my function "sendForm" with submit event
document
  .querySelector("#contact__form-message")
  .addEventListener("submit", sendForm);
