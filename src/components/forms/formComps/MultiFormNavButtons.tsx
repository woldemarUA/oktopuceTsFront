type MultiFormNavButtonsProps = {
  currentStep: number;
  step: number;
  handleStepBtnClick: (s: number) => void;
  setStepBtnTitle: (s: number) => number | JSX.Element | undefined;
};

import { styles } from '../../../styles/formStyles';
import globalStyles from '../../../styles/globalStyles';

const MultiFormNavButtons = ({
  step,
  currentStep,
  handleStepBtnClick,
  setStepBtnTitle,
}: MultiFormNavButtonsProps) => {
  return (
    <div className={styles.columnSmall}>
      <span
        className={
          step === currentStep
            ? globalStyles.roundedBtnActive
            : globalStyles.roundedBtnDisabled
        }
        onClick={() => handleStepBtnClick(currentStep)}>
        {setStepBtnTitle(currentStep)}
      </span>
    </div>
  );
};

export default MultiFormNavButtons;
