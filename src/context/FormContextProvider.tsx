import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

export interface handleAddOptionInterface {
  name: string;
  to: string;
  from: string;
  newStep: number;
}
// usage of the handleAddOption  const option = { name: 'Option1', to: 'Destination', from: 'Source' }; handleAddOption(option);
interface FormContextProviderInterface {
  optionAddStep: number;
  setOptionAddStep: (step: number) => void;
  handleAddOption: (option: handleAddOptionInterface) => void;
  isAddOption: boolean;
  setisAddOption: (isOption: boolean) => void;
  addOptionProps: handleAddOptionInterface;
  setAddOptionProps: (option: handleAddOptionInterface) => void;
}

const DefaultContextValue: FormContextProviderInterface = {
  optionAddStep: 0,
  setOptionAddStep: () => {},
  handleAddOption: (option: handleAddOptionInterface) => {},
  isAddOption: false,
  setisAddOption: (isOption: boolean) => {},
  addOptionProps: {
    name: '',
    to: '',
    from: '',
    newStep: 0,
  },
  setAddOptionProps: (option: handleAddOptionInterface) => {},
};

interface FormContextProviderProps {
  children: ReactNode;
}

const FormContext =
  createContext<FormContextProviderInterface>(DefaultContextValue);

const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [optionAddStep, setOptionAddStep] = useState<number>(0);
  //   a faire
  const [isAddOption, setisAddOption] = useState<boolean>(false);

  const [addOptionProps, setAddOptionProps] =
    useState<handleAddOptionInterface>({
      name: '',
      to: '',
      from: '',
      newStep: 0,
    });

  const handleAddOption = ({
    name,
    to,
    from,
    newStep,
  }: handleAddOptionInterface): void => {
    setisAddOption(!isAddOption);
    setAddOptionProps({ name, to, from, newStep });
  };

  return (
    <FormContext.Provider
      value={{
        optionAddStep,
        isAddOption,
        addOptionProps,
        setAddOptionProps,
        setisAddOption,
        setOptionAddStep,
        handleAddOption,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForms = () => useContext(FormContext);

export default FormContextProvider;
