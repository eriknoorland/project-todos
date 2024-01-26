import { AutomatedTestProps } from '../types';
import modifiers from '../utils/modifiers';
import './Button.scss';

interface ButtonProps extends AutomatedTestProps, React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  modifiers?: 'action' | 'submit' | 'cancel';
};

const Button: React.FC<ButtonProps> = ({ type, ...props }) => {
  return (
    <button
      type={type}
      className={`${modifiers('button', props.modifiers)} ${props.className || ''}`}
      onClick={props.onClick}
      data-testid={props['data-testid'] || ''}
    >
      {props.children}
    </button>
  );
};

export default Button;