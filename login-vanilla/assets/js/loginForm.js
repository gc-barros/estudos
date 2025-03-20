let loginForm = {
  init: () => {
    loginForm.events();

    loginForm.setInputMessage(
      "password-message",
      "Your password is between 4 and 12 characters"
    );
  },
  fields: {
    username: "",
    password: "",
  },
  events: () => {
    const form = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const { username, password } = loginForm.fields;

      if (!username) {
        usernameInput.classList.add("error");
        loginForm.setInputMessage(
          "username-message",
          "This field cannot be empty. Please enter a value.",
          true
        );
      }

      if (!password) {
        passwordInput.classList.add("error");
        loginForm.setInputMessage(
          "password-message",
          "This field cannot be empty. Please enter a value.",
          true
        );
      }

      if (!username || !password || !loginForm.validatePassword(password)) return

      if (username == "admin" && password == "admin") {
        alert("Login successful!");
      } else {
        loginForm.setInputMessage(
          "password-message",
          "Incorrect username or password. Please try again.",
          true
        );
        usernameInput.classList.add("error");
        passwordInput.classList.add("error");
      }
    });

    usernameInput.addEventListener("change", (e) => {
      usernameInput.classList.remove("error");
      loginForm.fields.username = e.target.value?.trim();
      loginForm.setInputMessage("username-message", "");
    });

    passwordInput.addEventListener("change", (e) => {
      const passwordValue = e.target.value?.trim();
      loginForm.fields.password = passwordValue;
      const validPassword = loginForm.validatePassword(passwordValue);

      if (validPassword) {
        passwordInput.classList.remove("error");
        loginForm.setInputMessage(
          "password-message",
          "Your password is between 4 and 12 characters"
        );

      } else {
        passwordInput.classList.add("error");
        loginForm.setInputMessage(
          "password-message",
          "Your password is between 4 and 12 characters",
          true
        );
      }
    });
  },
  validatePassword: (password) => {
    return password.length >= 4 && password.length <= 12;
  },
  setInputMessage: (fieldId, message, isError = false) => {
    const field = document.getElementById(fieldId);
    field.innerText = message;

    if (isError) {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  },
};

export default loginForm;
