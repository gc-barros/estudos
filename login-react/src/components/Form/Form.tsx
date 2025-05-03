import "./Form.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { errorsMessages } from "../../utils/templateMessages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "../../types/TLoginFormSchema";
import { useEffect } from "react";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setFocus
  } = useForm<TLoginSchema>({resolver: zodResolver(loginSchema)});

  useEffect(() => {
    setFocus("username")
  }, [setFocus])

  const onSubmit = async (data: TLoginSchema) => {
    console.log(data);

    await new Promise (resolve => setTimeout(resolve, 1000))

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
    reset();
  }

  return (
    <form
      className="login-form"
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>&#x1F44B; Welcome back!</h1>
      <div className="form-group">
        <Input
          register={register}
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
          label="password"
          placeholder="Enter password"
          inputType="password"
          invalid={"password" in errors}
          message={typeof errors.password?.message === "string" ? errors.password?.message : errorsMessages.passwordLength}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Validating credentials..." : "Login"}
      </Button>
    </form>
  );
};

export default Form;
