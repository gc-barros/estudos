import './Button.css'

type Props = {
  children: React.ReactNode;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}

const Button = ({children, type, onClick}: Props) => {
  return (
    <button className='form-btn__submit' type={type} onClick={onClick}>{children}</button>
  )
}

export default Button