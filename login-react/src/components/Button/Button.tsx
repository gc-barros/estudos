import './Button.css'

type Props = {
  children: React.ReactNode;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled: boolean | undefined;
  onClick?: () => void;
}

const Button = ({children, type, disabled, onClick}: Props) => {
  return (
    <button className='form-btn__submit' type={type} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button