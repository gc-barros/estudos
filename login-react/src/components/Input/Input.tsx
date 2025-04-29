import './Input.css'

type Props = {
  label: string;
  placeholder: string;
  inputType: React.HTMLInputTypeAttribute;
  message: string;
  invalid: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({label, placeholder, inputType, message, invalid, onChange, value}: Props) => {
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={label}>{label}</label>
      <input className={`form-group__input ${invalid && "error"}`} type={inputType} name={label} placeholder={placeholder} onChange={onChange} value={value} />
      <span className={`form-group__message ${invalid && "error"}`}>{message}</span>
    </div>
  )
}

export default Input