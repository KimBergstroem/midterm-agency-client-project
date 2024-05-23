// Using FETCH method, fetchAPI to create(POST HTTP Method)
// Using this free API for training purposes "https://jasonplaceholder.typicode.com/posts".
// For making post requests

//--------------------
//--------------------
//--------------------

// Constants
const FORM = document.querySelector("#contact__form-message"),
  SUCCESS_ALERT = document.querySelector("#contact__alert-box"),
  POST_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

/**
 * Displays an alert message with customizable styling and duration.
 * @param {string} message - The message to be displayed in the alert.
 * @param {boolean} [isSuccess=true] - Indicates whether the alert should indicate success (true) or failure (false). Defaults to true.
 */
const showAlert = (message, isSuccess = true) => {
  SUCCESS_ALERT.style.display = "block";
  SUCCESS_ALERT.style.backgroundColor = isSuccess ? "green" : "red";
  SUCCESS_ALERT.textContent = message;
  setTimeout(() => {
    SUCCESS_ALERT.style.display = "none";
  }, 3000);
};

/**
 * Sends form data to a specified endpoint.
 * @param {Event} event - The form submission event.
 * @param {FormData} formData - The form data to be sent.
 */
const sendForm = async (event) => {
  // Prevents the form from refreshing the page on submission
  event.preventDefault();

  // Creating a new FormData object
  const formData = new FormData(FORM);

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
      showAlert("Something went wrong. Please try again!", false);
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else if (response.ok) {
      showAlert("Your message has been sent successfully!");
    }

    const userResponseData = await response.json();
    console.log(userResponseData);
  } catch (e) {
    console.error("Error", e.message);
    showAlert("Something went wrong. Please try again!", false);
  }

  FORM.reset();
};

//--------------------
//--Form Validation---
//--------------------
const FORM_FIELDS = [
  {
    field: "name",
    validations: [
      {
        validate: (value) => value.trim().length >= 3,
        errorMessage:
          "Full Name is required and must be at least 3 characters long.",
      },
      {
        validate: (value) => !/\d/.test(value),
        errorMessage: "Full Name cannot contain numbers.",
      },
      {
        validate: (value) => value.trim().toLowerCase() !== "ironhack",
        errorMessage: "You can't be Ironhack, because I am Ironhack 🧐",
      },
    ],
  },
  {
    field: "email",
    validations: [
      {
        validate: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        errorMessage: "Please enter a valid email address.",
      },
    ],
  },
  {
    field: "phone",
    validations: [
      {
        validate: (value) => /^\d{10}$/.test(value),
        errorMessage: "Please enter a valid phone number.",
      },
    ],
  },
  {
    field: "message",
    validations: [
      {
        validate: (value) => value.trim().length > 0,
        errorMessage: "Message is required and cannot be empty.",
      },
      {
        validate: (value) => !/[!@#$%^&*(),.?":{}|<>]/g.test(value),
        errorMessage: "Message cannot contain special characters.",
      },
    ],
  },
];

/**
 * Validates a single form field based on a set of validation rules.
 * @param {string} field - The id of the input field to validate.
 * @param {Array} validations - An array of validation objects.
 * @returns {boolean} - True if all validations pass, false otherwise.
 */
function validateField(field, validations) {
  const inputValue = document.querySelector(`#${field}`);
  let errorDisplay = inputValue.nextElementSibling;

  if (!errorDisplay || !errorDisplay.classList.contains("error-message")) {
    errorDisplay = document.createElement("span");
    errorDisplay.classList.add("error-message");
    inputValue.parentNode.insertBefore(errorDisplay, inputValue.nextSibling);
  }

  for (const { validate, errorMessage } of validations) {
    if (!validate(inputValue.value)) {
      inputValue.classList.add("invalid");
      errorDisplay.textContent = errorMessage;
      errorDisplay.style.display = "block";
      return false;
    }
  }

  inputValue.classList.remove("invalid");
  errorDisplay.textContent = "";
  errorDisplay.style.display = "none";
  return true;
}

/**
 * Validates the entire form by iterating through each form field.
 * @param {Event} event - The form submission event.
 */
function validateForm(event) {
  let isFormValid = true;
  for (const { field, validations } of FORM_FIELDS) {
    const isValid = validateField(field, validations);
    if (!isValid) isFormValid = false;
  }

  if (!isFormValid) {
    event.preventDefault(); // Prevent if fails
  } else {
    sendForm(event); // Proceed if passes
  }
}

// Checks if the form is valid or containing any inputValue errors
FORM.addEventListener("submit", validateForm);
