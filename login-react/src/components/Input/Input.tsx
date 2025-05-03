
import { UseFormRegister, RegisterOptions, Path } from 'react-hook-form';
import './Input.css'
import ILoginFormValues from '../../types/ILoginFormValues';

type Props = {
  register: UseFormRegister<ILoginFormValues>;
  registerOptions?: RegisterOptions<ILoginFormValues>;
  label: Path<ILoginFormValues>;
  placeholder: string;
  inputType: React.HTMLInputTypeAttribute;
  message: string;
  invalid: boolean;
}

const Input = ({register, registerOptions, label, placeholder, inputType, message, invalid}: Props) => {
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={label}>{label}</label>
      <input {...register(label, registerOptions)} className={`form-group__input ${invalid && "error"}`} type={inputType} placeholder={placeholder} />
      <span className={`form-group__message ${invalid && "error"}`}>{message}</span>
    </div>
  )
}

export default Input