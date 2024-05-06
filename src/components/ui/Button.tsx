interface ButtonProps {
  title: string;
  btnType: 'submit' | 'reset' | 'button' | undefined;
  className: string;
  path?: string;
  action?: () => void;
  isDisabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  btnType,
  className,
  path,
  action,
  isDisabled = false,
}) => {
  // const handleClick = ()=>{
  //     if(path)
  // }
  return (
    <button
      type={btnType}
      className={className}
      onClick={action}
      disabled={isDisabled}>
      {title}
    </button>
  );
};

export default Button;
