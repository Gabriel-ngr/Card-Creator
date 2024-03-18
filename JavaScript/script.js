const cardholderName = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("card-number");
const expirationMonthCard = document.getElementById("month-expiration");
const expirationYearCard = document.getElementById("year-expiration");
const validationCard = document.getElementById("validation");

const cardNumberInsert = document.getElementById("card_number_insert");
const cardholderNameInsert = document.getElementById("cardholder_name_insert");
const expirationCardInsert = document.getElementById("expiration_card_insert");
const validationCardInsert = document.getElementById("cvc_card_insert");

const cardholderError = document.getElementById("cardholder-error");
const cardNumberError = document.getElementById("card-number-error");
const cardExpirationError = document.getElementById("card-expiration-error");
const cardValidationError = document.getElementById("card-validation-error");

let cardholderRegex = /^[a-zA-Z\s-]+$/;
let cardNumberRegex = /^\d{16}$/;
let numberRegex = /^\d*$/;

// Cardholder Name Validation
cardholderName.addEventListener("input", function () {
  if (
    cardholderRegex.test(cardholderName.value) ||
    cardholderName.value === ""
  ) {
    cardholderNameInsert.textContent = cardholderName.value;
    cardholderError.textContent = ""; // clear the error message
  } else {
    cardholderError.textContent = "Wrong format, only letters!";
  }
});

// Card Number Validation
cardNumber.addEventListener("input", function () {
  let cardNumberValue = cardNumber.value.replace(/\s/g, ""); // remove spaces
  if (cardNumberValue.length > 16) {
    cardNumberValue = cardNumberValue.slice(0, 16); // limit to 16 digits
  }
  // add spaces every 4 digits
  let formattedCardNumber = cardNumberValue.replace(/(.{4})/g, "$1 ").trim();
  cardNumber.value = formattedCardNumber; // update the input value
  cardNumberInsert.textContent = formattedCardNumber; // update the div content

  // check if the input is valid and display an error message if it's not
  if (cardNumberValue.length === 16 && !cardNumberRegex.test(cardNumberValue)) {
    cardNumberError.textContent = "Wrong format, numbers only!";
  } else {
    cardNumberError.textContent = "";
  }
});

// Expiration Date Card
expirationMonthCard.addEventListener("input", function () {
  if (expirationCardInsert) {
    if (expirationMonthCard.value === "" && expirationYearCard.value === "") {
      expirationCardInsert.textContent = "";
    } else {
      expirationCardInsert.textContent =
        expirationMonthCard.value + "/" + expirationYearCard.value;
    }
  }

  if (!numberRegex.test(expirationMonthCard.value)) {
    cardExpirationError.textContent = "Wrong format, numbers only!";
  } else {
    cardExpirationError.textContent = "";
  }
});
expirationYearCard.addEventListener("input", function () {
  if (expirationCardInsert) {
    if (expirationMonthCard.value === "" && expirationYearCard.value === "") {
      expirationCardInsert.textContent = "";
    } else {
      expirationCardInsert.textContent =
        expirationMonthCard.value + "/" + expirationYearCard.value;
    }
  }
  if (!numberRegex.test(expirationYearCard.value)) {
    cardExpirationError.textContent = "Wrong format, numbers only!";
  } else {
    cardExpirationError.textContent = "";
  }
});

// Validation Card
validationCard.addEventListener("input", function () {
  // Update cvc_card_insert
  validationCardInsert.textContent = validationCard.value;
  // Check if the input is valid and display an error message if it's not
  if (!numberRegex.test(validationCard.value)) {
    cardValidationError.textContent = "Wrong format, numbers only!";
  } else {
    cardValidationError.textContent = "";
  }
});

// Create a 'Thanks Page' when all inputs passed the test //
const confirmButton = document.getElementById("confirm-btn");
const formInputContainer = document.querySelector(".form_input_container"); // replace with your container's class
const thankYouPageContent = `
    <div class="approved" >
      <img class="tick_approved" src="./Svg/icons8-tick.svg">
    </div>
    <h1 class="title_thanks">Thank You!</h1>
    <p class="added_card_details">We've added your card details</p>
    <button class="ctn_button">Continue</button>
`;

confirmButton.addEventListener("click", function () {
  // Check if all fields are valid
  if (
    cardholderRegex.test(cardholderName.value) &&
    cardNumberRegex.test(cardNumber.value.replace(/\s/g, "")) &&
    numberRegex.test(expirationMonthCard.value) &&
    numberRegex.test(expirationYearCard.value) &&
    numberRegex.test(validationCard.value)
  ) {
    // Replace the form container's content with the thank you page
    formInputContainer.innerHTML = thankYouPageContent;
  } else {
    // Optionally, display an error message if the fields are not valid
    alert("Please fill in all fields correctly before proceeding.");
  }
});
