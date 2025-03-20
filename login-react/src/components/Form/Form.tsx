import "./Form.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

const Form = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameMsg, setUsernameMsg] = useState<string>("");
  const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
  
  const templateMessages = {
    passwordLength: "Your password is between 4 and 12 characters",
    requiredField: "This field cannot be empty. Please enter a value.",
    incorrectCredentials: "Incorrect username or password. Please try again."
  }

  const [password, setPassword] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>(templateMessages.passwordLength);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  useEffect(() => {
    if (!password) return
    setIsValidPassword(password.length >= 4 && password.length <= 12)
  }, [password]);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      setIsValidUsername(false)
      setUsernameMsg(templateMessages.requiredField)
    }

    if (!password) {
      setIsValidPassword(false)
      setPasswordMsg(templateMessages.requiredField)
    }

    if (!username || !password || !isValidPassword) return

    if (username == "admin" && password == "admin") {
      alert("Login successful!");

    } else {
      setPasswordMsg(templateMessages.incorrectCredentials)

      setIsValidUsername(false)
      setIsValidPassword(false)
    }
  }

  return (
    <form className="login-form" id="login-form" onSubmit={formSubmit}>
      <h1>&#x1F44B; Welcome back!</h1>
      <div className="form-group">
        <Input
          label="Username"
          placeholder="Enter username"
          inputType="text"
          invalid={!isValidUsername}
          message={usernameMsg}
          onChange={e => {
            setUsername(e.target.value)
            setUsernameMsg("")
            setIsValidUsername(true)
          }}
        />
      </div>
      <div className="form-group">
        <Input
          label="Password"
          placeholder="Enter password"
          inputType="password"
          invalid={!isValidPassword}
          message={passwordMsg}
          onChange={e => {
            setPassword(e.target.value)
            setPasswordMsg(templateMessages.passwordLength)
          }}
        />
      </div>
      <Button
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default Form;
