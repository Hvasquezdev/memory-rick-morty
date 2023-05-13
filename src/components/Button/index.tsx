import { ReactNode } from 'react';
import './Button.scss';

type ButtonColor = 'green-200' | 'green-300' | 'yellow-300' | 'yellow-400' | 'yellow-500';

interface ButtonProps {
  children?: ReactNode;
  color?: ButtonColor;
  onClick?: () => void;
}

const Button = ({ children, color, onClick }: ButtonProps) => {
  const colorClassName = color ? `button--${color}` : '';

  return (
    <button className={`button ${colorClassName}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
