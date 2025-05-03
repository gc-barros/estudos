
import { UseFormRegister, RegisterOptions, Path } from 'react-hook-form';
import './Input.css'
import { TLoginSchema } from '../../types/TLoginFormSchema';

type Props = {
  register: UseFormRegister<TLoginSchema>;
  registerOptions?: RegisterOptions<TLoginSchema>;
  label: Path<TLoginSchema>;
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