import React, { useState, useMemo } from 'react';
// Importation de React pour utiliser les fonctionnalités React dans le fichier.
import {
  Formik, // Importation de Formik pour la gestion de formulaires.
  // Importation du composant Form pour créer un formulaire.
} from 'formik';
// import { Fragment } from 'react/jsx-runtime';
import * as Yup from 'yup'; // Importation de Yup pour la validation des schémas.

import { styles } from '../../styles/formStyles';
import globalStyles from '../../styles/globalStyles';

import FormComponent from './formComps/FormComponent';
import MultiStep from './formComps/MultiStep';
import Button from '../ui/Button';
// Définition de la structure pour la configuration de chaque champ.
export interface FieldConfig {
  label: string; // L'étiquette du champ.
  initialValue: any; // La valeur initiale du champ.
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
}

// Composant de formulaire générique qui accepte toute configuration de formulaire.
const FormFin: React.FC<MyFormProps> = ({
  formFieldConfig,
  handleSubmit,
  title,
  multiStep = false,
  multiConf = {},
}) => {
  const [message, setMessage] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const initialValues = useMemo(
    () =>
      Object.keys(formFieldConfig).reduce<Record<string, any>>((acc, key) => {
        acc[key] = formFieldConfig[key].initialValue; // Configuration des valeurs initiales basées sur la configuration passée.
        return acc;
      }, {}),
    [formFieldConfig]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object(
        Object.keys(formFieldConfig).reduce((acc, key) => {
          acc[key] = formFieldConfig[key].validationSchema; // Configuration du schéma de validation basé sur la configuration passée.
          return acc;
        }, {} as { [key: string]: Yup.AnySchema })
      ),
    [formFieldConfig]
  );

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={true} // Re-validate when a field loses focus
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
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
      }}>
      {({ values }) => (
        <div className={styles.form}>
          <div className={globalStyles.row}>
            <h2 className={globalStyles.header}>{title}</h2>
          </div>
          <div className={globalStyles.row}>
            <p className={globalStyles.message}>{message} </p>
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
              formFieldConfig={formFieldConfig}
              values={values}
              title={title}
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
      )}
    </Formik>
  );
};

export default FormFin;
