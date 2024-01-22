import modifiers from '../utils/modifiers';
import './Button.scss';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  modifiers?: 'action' | 'submit' | 'cancel';
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`${modifiers('button', props.modifiers)} ${props.className || ''}`}
      onClick={props.onClick}
      data-testid="button"
    >
      {props.children}
    </button>
  );
};

export default Button;