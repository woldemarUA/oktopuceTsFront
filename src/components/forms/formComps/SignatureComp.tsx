import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useField, FieldHookConfig } from 'formik';
import { styles } from '../../../styles/formStyles';
import globalStyles from '../../../styles/globalStyles';

interface SignatureCompProps {
  label: string;
  name: string;
}

const SignatureComp = ({ label, name }: SignatureCompProps) => {
  const [field, , helpers] = useField(name);
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
    helpers.setValue('');
  };

  const save = () => {
    if (sigCanvas.current) {
      //   helpers.setValue(
      //     sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
      //   );
      console.log('signe');
    }
  };

  return (
    <div className={styles.row}>
      <div className={styles.columnSmall}>
        <label>{label}</label>
        <button
          className={globalStyles.button}
          type='button'
          onClick={clear}>
          Effacer
        </button>
      </div>
      <div className={styles.columnBig}>
        <SignatureCanvas
          ref={sigCanvas}
          penColor='black'
          canvasProps={{
            className: 'sigCanvas w-full h-full rounded',
          }}
          backgroundColor='rgba(240, 240, 240,1)'
          onEnd={save}
        />
      </div>
    </div>
  );
};

export default SignatureComp;
