function loginFormInit() {
  setInputValidaty("password", true, templateMessages.passwordLength)

  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  usernameInput.addEventListener("change", handleUsernameOnChange);
  passwordInput.addEventListener("change", handlePasswordOnChange);
  form.addEventListener("submit", (e) => handleOnSubmit(e, form));
}

const templateMessages = {
  passwordLength: "Your password is between 4 and 12 characters",
  requiredField: "This field cannot be empty. Please enter a value.",
  incorrectCredentials: "Incorrect username or password. Please try again."
}

function handleOnSubmit(e, form) {
  e.preventDefault();

  const formData = new FormData(form)

  const dataIsValid = validateFormData(formData)
  if (!dataIsValid) return

  const credentialsAreValid = validateCredentials(formData)

  if (credentialsAreValid) {
    alert("Login successful!");
    setInputValidaty("username", true)
    setInputValidaty("password", true, templateMessages.passwordLength)
    
  } else {
    setInputValidaty("username", false)
    setInputValidaty("password", false, templateMessages.incorrectCredentials)
  }
}

function handleUsernameOnChange(e) {
  e.target.value = e.target.value.trim()
  setInputValidaty("username", true, "")
}

function handlePasswordOnChange(e) {
  e.target.value = e.target.value.trim()
  const validPassword = validatePasswordLength(e.target.value);
  setInputValidaty("password", validPassword, templateMessages.passwordLength)
}

function validateFormData(formData) {
  const username = formData.get("username")
  const password = formData.get("password")

  if (!username) {
    setInputValidaty("username", false, templateMessages.requiredField)
  }

  if (!password) {
    setInputValidaty("password", false, templateMessages.requiredField)
  }

  if (!validatePasswordLength) {
    setInputValidaty("password", false, templateMessages.passwordLength)
  }

  return !(!username || !password || !validatePasswordLength(password))
}

function validatePasswordLength(password) {
  return password.length >= 4 && password.length <= 12;
}

function validateCredentials(formData) {
  const username = formData.get("username")
  const password = formData.get("password")

  return (username == "admin" && password == "admin")
}

function setInputValidaty(inputId, isValid, message = "") {
  const input = document.getElementById(inputId);
  const messageEl = document.getElementById(`${input.name}-message`);
  messageEl.innerText = message;

  if (!isValid) {
    input.classList.add("error");
    messageEl.classList.add("error");
  } else {
    input.classList.remove("error");
    messageEl.classList.remove("error");
  }
}

export default loginFormInit;
