import Switch from './Switch';

type option = Record<string, any>;

type MultiCheckComponentProps = {
  options: option[];
};

const MultiCheckComponent = ({ options }: MultiCheckComponentProps) => {
  return (
    <>
      {options.map((option: option, index: number) => (
        <Switch
          key={index}
          id={index}
          label={option.label}
          name={option.name}
        />
      ))}
    </>
  );
};

export default MultiCheckComponent;
