interface ButtonProps {
  title: string;
  btnType: 'submit' | 'reset' | 'button' | undefined;
  className: string;
  path?: string;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  btnType,
  className,
  path,
  action,
}) => {
  // const handleClick = ()=>{
  //     if(path)
  // }
  return (
    <button
      type={btnType}
      className={className}
      onClick={action}>
      {title}
    </button>
  );
};

export default Button;
