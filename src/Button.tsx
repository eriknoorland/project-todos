import modifiers from './modifiers';
import './Button.scss';

interface ButtonProps extends React.PropsWithChildren {
  onClick?: () => void;
  className?: string;
  type?: string;
  modifiers?: 'action' | 'submit' | 'cancel';
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${modifiers('button', props.modifiers)} ${props.className || ''}`}
      onClick={props.onClick}
    >
      { props.children }
    </button>
  );
};

export default Button;