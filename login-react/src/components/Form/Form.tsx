import "./Form.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { errorsMessages } from "../../utils/templateMessages";
import { useForm } from "react-hook-form";
import ILoginFormValues from "../../types/ILoginFormValues";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ILoginFormValues>();

  const formSubmit = (data: ILoginFormValues) => {
    console.log(data);

    const isCorrectUser = data.username == "admin" && data.password == "admin"

    if (!isCorrectUser) {
      setError("password", {
        type: "incorrectCredentials",
        message: errorsMessages.incorrectCredentials,
      });
      setError("username", {
        type: "incorrectCredentials"
      });
      return
    }

    alert("Login successful!");
  }

  return (
    <form
      className="login-form"
      id="login-form"
      onSubmit={handleSubmit(formSubmit)}
    >
      <h1>&#x1F44B; Welcome back!</h1>
      <div className="form-group">
        <Input
          register={register}
          registerOptions={{ required: errorsMessages.requiredField }}
          label="username"
          placeholder="Enter username"
          inputType="text"
          invalid={"username" in errors}
          message={typeof errors.username?.message === "string" ? errors.username?.message : ""}
        />
      </div>
      <div className="form-group">
        <Input
          register={register}
          registerOptions={{
            required: errorsMessages.requiredField,
            minLength: { value: 4, message: errorsMessages.passwordLength },
            maxLength: { value: 12, message: errorsMessages.passwordLength },
          }}
          label="password"
          placeholder="Enter password"
          inputType="password"
          invalid={"password" in errors}
          message={typeof errors.password?.message === "string" ? errors.password?.message : ""}
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
