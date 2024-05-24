import React, { useState, useMemo, useEffect } from 'react';

import {
  Formik, // Importation de Formik pour la gestion de formulaires.
  FormikHelpers,
} from 'formik';

import * as Yup from 'yup';

import { styles } from '../../styles/formStyles';
import globalStyles from '../../styles/globalStyles';

import FormComponent from './formComps/FormComponent';

import ControllerAddOption from './formComps/ControllerAddOption';

// import AddOption from './formComps/AddOption';
import MultiStep from './formComps/MultiStep';
import Button from '../ui/Button';

import { endroit_mapping } from '../../pages/Equipments/equipmentConfigs/parametrageConfComp';
// Définition de la structure pour la configuration de chaque champ.
export interface FieldConfig {
  label: string; // L'étiquette du champ.
  initialValue: Record<string, any>; // La valeur initiale du champ.
  validationSchema: Yup.AnySchema; // Le schéma de validation pour Yup.
  type?: string; // Le type de champ (facultatif).

  visibleWhen?: (values: any) => boolean;
}

// Définition de la structure pour l'objet de configuration des champs de formulaire.
interface FormFieldConfig {
  [key: string]: FieldConfig; // Un objet avec des clés dynamiques de type FieldConfig.
}

// Props pour le composant MyForm.
interface MyFormProps {
  formFieldConfig: FormFieldConfig; // La configuration des champs du formulaire.
  handleSubmit: (values: any) => void | Promise<any>;
  title: string;
  multiStep?: boolean;
  multiConf?: Record<string | number, any>;
  containerStyle?: boolean;
  formValues?: Record<string, any> | null;
  addedOptionValue?: Record<string, any>;
}

// interface pour  handle option AJOUTER
// usage of the handleAddOption  const option = { name: 'Option1', to: 'Destination', from: 'Source' }; handleAddOption(option);

// verification si le champ est  visible
const generateVisibleField = (
  field: Record<string, any>,
  values: Record<string, any>
) => {
  return field.visibleWhen && !field.visibleWhen(values) ? null : field;
};

//  verification si endroit correspondant a equipment_type

const checkEndroit = (valeurs: Record<string, any>): boolean => {
  let check = false;
  if (valeurs.endroit) {
    const test = endroit_mapping.get(parseInt(valeurs.equipment_type));

    if (test) {
      const endroitVal = [];
      for (const item of test) endroitVal.push(item.value);
      check = endroitVal.includes(parseInt(valeurs.endroit, 10));
    }
  }
  return check;
};
// Composant de formulaire générique qui accepte toute configuration de formulaire.
const FormFin: React.FC<MyFormProps> = ({
  formFieldConfig,
  handleSubmit,
  title,
  multiStep = false,
  multiConf = {},
  containerStyle = true,
  formValues,
  addedOptionValue,
}) => {
  const [message, setMessage] = useState<string>(''); // montrer le message
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false); //  tranfers submission status to the multustep
  const [valeurs, setValeurs] = useState<Record<string, any>>({}); // sets form values to be accesible outside the Formik
  const [isAddOption, setIsAddOption] = useState<boolean>(false);
  const [endroitCheck, setEndroitCheck] = useState<boolean>(true); // result of the check whether the androit corresponds the equipment type
  // const {
  //   // setisAddOption,
  //   addOptionProps,
  //   // setAddOptionProps,
  //   handleAddOption,
  // } = useForms(); // set by option component if there is a need to add the option

  // const isAddOptionT = useMemo(() => useForms(), [isAddOption]);

  // const [addOptionProps, setAddOptionProps] =
  //   useState<handleAddOptionInterface>({
  //     name: '',
  //     to: '',
  //     from: '',
  //     newStep: 0,
  //   });

  // const handleAddOption = ({
  //   name,
  //   to,
  //   from,
  //   newStep,
  // }: handleAddOptionInterface): void => {
  //   setisAddOption(!isAddOption);
  //   setAddOptionProps({ name, to, from, newStep });
  // };

  const config = useMemo(() => {
    let inVal = Object.keys(formFieldConfig).reduce<Record<string, any>>(
      (acc, key) => {
        if (generateVisibleField(formFieldConfig[key], valeurs)) {
          acc[key] = formFieldConfig[key];
        } // Configuration des formulaire basée sur config passée et visibility option
        return acc;
      },

      {}
    );
    if (formValues) inVal = { ...inVal, ...formValues };
    return inVal;
  }, [formFieldConfig, valeurs, endroitCheck]);

  useEffect(() => {
    if (valeurs.endroit && valeurs.equipment_type) {
      setEndroitCheck(checkEndroit(valeurs));
    }
  }, [valeurs]);

  const initialValues = useMemo(() => {
    let inVal = Object.keys(config).reduce<Record<string, any>>((acc, key) => {
      acc[key] = config[key].initialValue; // Configuration des valeurs initiales basées sur la configuration passée.
      return acc;
    }, {});
    if (formValues) inVal = { ...inVal, ...formValues };
    return inVal;
  }, [config]);

  const validationSchema = useMemo(
    () =>
      Yup.object(
        Object.keys(config).reduce((acc, key) => {
          acc[key] = config[key].validationSchema; // Configuration du schéma de validation basé sur la configuration passée.
          return acc;
        }, {} as { [key: string]: Yup.AnySchema })
      ),
    [config]
  );

  const onSumbit = async (
    values: Record<string, any>,
    actions: FormikHelpers<Record<string, any>>
  ) => {
    try {
      const resp = await handleSubmit(values);
      const { msg } = resp;
      actions.setSubmitting(false); // Arrêt de l'indication de soumission une fois terminée.
      actions.resetForm(); // Vider le formulaire  une fois terminée.
      setMessage(msg);
      setSubmissionSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmissionSuccess(false);
      setMessage(`Echec d'envoyer de formulaire`);
    }
  };

  return (
    <>
      {isAddOption ? (
        <ControllerAddOption />
      ) : (
        <Formik
          initialValues={initialValues}
          validateOnBlur={true} // Re-validate when a field loses focus
          validateOnChange={true}
          validationSchema={validationSchema}
          onSubmit={onSumbit}>
          {({ values, setFieldValue }) => {
            useEffect(() => {
              setValeurs(values);

              if (addedOptionValue) {
                Object.entries(addedOptionValue).forEach((entry) =>
                  setFieldValue(entry[0], entry[1])
                );
              }
              if (
                values.endroit &&
                values.equipment_type &&
                !checkEndroit(values)
              ) {
                Object.keys(values).forEach((key) => {
                  if (key !== 'endroit' && key !== 'equipment_type') {
                    setFieldValue('endroit', initialValues[key]);
                    setFieldValue('equipment_brand_id', initialValues[key]);
                  }
                });
              }
            }, [values, initialValues, setFieldValue, addedOptionValue]);

            return (
              <div className={containerStyle ? styles.form : ''}>
                {containerStyle && (
                  <div className={globalStyles.row}>
                    <h2 className={globalStyles.header}>{title}</h2>
                  </div>
                )}
                <div className={globalStyles.row}>
                  <p
                    className={
                      globalStyles[submissionSuccess ? 'message' : 'messageErr']
                    }>
                    {message}
                  </p>
                </div>
                {multiStep ? (
                  <MultiStep
                    valuesForm={values}
                    title={title}
                    formFieldConfig={multiConf}
                    submissionSuccess={submissionSuccess}
                  />
                ) : (
                  <FormComponent
                    formFieldConfig={config}
                    values={values}
                    title={title}
                    isAdd={isAddOption}
                    isAddSetter={setIsAddOption}
                    children={
                      <Button
                        btnType='submit'
                        className={globalStyles.button}
                        title={title}
                        isDisabled={false}
                      />
                    }
                  />
                )}
              </div>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default FormFin;
