function loginFormInit() {
  setInputValidaty("password", true, templateMessages.passwordLength)

  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  usernameInput.addEventListener("change", onChangeUsername);
  passwordInput.addEventListener("change", onChangePassword);
  form.addEventListener("submit", (event) => onSubmit(event, form));
}

const templateMessages = {
  passwordLength: "Your password is between 4 and 12 characters",
  requiredField: "This field cannot be empty. Please enter a value.",
  incorrectCredentials: "Incorrect username or password. Please try again."
}

function onSubmit(event, form) {
  event.preventDefault();

  const formData = new FormData(form)

  const isDataValid = validateFormData(formData)
  if (!isDataValid) return

  const areCredentialsValid = validateCredentials(formData)

  if (!areCredentialsValid) {
    setInputValidaty("username", false)
    setInputValidaty("password", false, templateMessages.incorrectCredentials)
    return
  }

  alert("Login successful!");
  setInputValidaty("username", true)
  setInputValidaty("password", true, templateMessages.passwordLength)
}

function onChangeUsername(event) {
  event.target.value = event.target.value.trim()
  setInputValidaty("username", true, "")
}

function onChangePassword(event) {
  event.target.value = event.target.value.trim()
  const validPassword = validatePasswordLength(event.target.value);
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
    return
  }

  input.classList.remove("error");
  messageEl.classList.remove("error");
}

export default loginFormInit;
