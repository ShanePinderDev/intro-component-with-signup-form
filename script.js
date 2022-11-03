const firstNameEl = document.getElementById("fname");
const lastNameEl = document.getElementById("lname");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("pass");
const buttonEl = document.querySelector(".form-btn");

const form = document.getElementById("form");

const images = document.getElementsByTagName("img");

form.addEventListener("click", function (e) {
  //prevent form from submittin
  e.preventDefault();
  // validate forms
  let isFirstNameValid = checkFirstName(),
    isLastNameValid = checkLastName(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

  // submit to the server if the form is valid
  // since form isn't' being submitted I changed the text in the submit button to confirm that the trial period has started and included a setTimeout function to reset the form.
  if (isFormValid) {
    setSuccessForButton();
    setTimeout(resetForm, 2000);
  }
});

const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const setSuccessForButton = () => {
  buttonEl.innerText = "FREE TRIAL HAS BEGUN";
};

const resetForm = () => {
  form.reset();

  const inputs = document.querySelectorAll(".form-field");
  [...inputs].forEach(function (input) {
    input.classList.remove("success");
  });
  buttonEl.innerText = "CLAIM YOUR FREE TRIAL";
};

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkFirstName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const firstName = firstNameEl.value.trim();

  if (!isRequired(firstName)) {
    showError(firstNameEl, "First Name cannot be empty.");
  } else if (!isBetween(firstName.length, min, max)) {
    showError(
      firstNameEl,
      `First name must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(firstNameEl);
    valid = true;
  }
  return valid;
};

const checkLastName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const lastName = lastNameEl.value.trim();

  if (!isRequired(lastName)) {
    showError(lastNameEl, "Last Name cannot be empty.");
  } else if (!isBetween(lastName.length, min, max)) {
    showError(
      lastNameEl,
      `Last name must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(lastNameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be empty.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Looks like this is not an email.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be empty.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};
