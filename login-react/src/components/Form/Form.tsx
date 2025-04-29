import "./Form.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { errorsMessages } from "../../utils/templateMessages";

const Form = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameMsg, setUsernameMsg] = useState<string>("");
  const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>(errorsMessages.passwordLength);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  useEffect(() => {
    if (!password) return
    setIsValidPassword(password.length >= 4 && password.length <= 12)
  }, [password]);

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      setIsValidUsername(false)
      setUsernameMsg(errorsMessages.requiredField)
    }

    if (!password) {
      setIsValidPassword(false)
      setPasswordMsg(errorsMessages.requiredField)
    }

    if (!username || !password || !isValidPassword) return

    const isCorrectUser = username == "admin" && password == "admin"

    if (!isCorrectUser) {
      setPasswordMsg(errorsMessages.incorrectCredentials)
      setIsValidUsername(false)
      setIsValidPassword(false)
      return
    }

    alert("Login successful!");
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
          value={username}
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
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setPasswordMsg(errorsMessages.passwordLength)
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
