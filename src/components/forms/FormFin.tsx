import React, { useState } from 'react';
// Importation de React pour utiliser les fonctionnalités React dans le fichier.
import {
  Formik, // Importation de Formik pour la gestion de formulaires.
  Form, // Importation du composant Form pour créer un formulaire.
  Field, // Importation du composant Field pour créer des champs de formulaire.
  ErrorMessage,
} from 'formik';
// import { Fragment } from 'react/jsx-runtime';
import * as Yup from 'yup'; // Importation de Yup pour la validation des schémas.

import { styles } from '../../styles/formStyles';
import globalStyles from '../../styles/globalStyles';

import Button from '../Button';

// Définition de la structure pour les options dans les champs de sélection.
interface Option {
  value: string | number; // La valeur de l'option.
  label: string; // Le label de l'option.
}

// Définition de la structure pour la configuration de chaque champ.
interface FieldConfig {
  label: string; // L'étiquette du champ.
  initialValue: any; // La valeur initiale du champ.
  validationSchema: Yup.AnySchema; // Le schéma de validation pour Yup.
  type?: string; // Le type de champ (facultatif).
  options?: Option[]; // Options pour les champs de type select (facultatif).
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
}

// Composant de formulaire générique qui accepte toute configuration de formulaire.
const FormFin: React.FC<MyFormProps> = ({
  formFieldConfig,
  handleSubmit,
  title,
}) => {
  const [message, setMessage] = useState<string>('');

  const initialValues = Object.keys(formFieldConfig).reduce<
    Record<string, any>
  >((acc, key) => {
    acc[key] = formFieldConfig[key].initialValue; // Configuration des valeurs initiales basées sur la configuration passée.
    return acc;
  }, {});

  const validationSchema = Yup.object(
    Object.keys(formFieldConfig).reduce((acc, key) => {
      acc[key] = formFieldConfig[key].validationSchema; // Configuration du schéma de validation basé sur la configuration passée.
      return acc;
    }, {} as { [key: string]: Yup.AnySchema })
  );

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={true} // Re-validate when a field loses focus
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const resp = await handleSubmit(values);
        const { msg } = resp;
        actions.setSubmitting(false); // Arrêt de l'indication de soumission une fois terminée.
        actions.resetForm(); // Vider le formulaire  une fois terminée.
        setMessage(msg);
      }}>
      {({ values }) => (
        <div className={styles.form}>
          <div className={globalStyles.row}>
            <h2 className={globalStyles.header}>{title}</h2>
          </div>
          <div className={globalStyles.row}>
            <p className={globalStyles.message}>{message} </p>
          </div>

          <Form>
            {Object.keys(formFieldConfig).map((key) => {
              const { type, label, options, visibleWhen } =
                formFieldConfig[key];

              if (visibleWhen && !visibleWhen(values)) return null;

              if (type === 'select' && options) {
                return (
                  <div
                    key={key}
                    className={styles.row}>
                    <div className={styles.columnSmall}>{label}</div>
                    <div className={styles.columnBig}>
                      <Field
                        className={styles.select}
                        name={key}
                        as={type}
                        label={label}
                        options={options}>
                        {options.map((option) => {
                          return (
                            <option
                              key={option.value}
                              value={option.value}>
                              {option.label}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        name={key}
                        component='div'
                        className={globalStyles.error}
                      />
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={key}
                  className={styles.row}>
                  <div className={styles.columnSmall}>
                    <label className={styles.label}>{label}</label>
                  </div>
                  <div className={styles.columnBig}>
                    <Field
                      className={styles.input}
                      name={key}
                      type={type || 'text'}
                      as={type === 'select' ? 'select' : 'input'}
                    />{' '}
                    <ErrorMessage
                      name={key}
                      component='div'
                      className={globalStyles.error}
                    />
                  </div>
                </div>
              );
            })}
            {/* <button
              className={globalStyles.button}
              type='submit'>
              Submit
            </button> */}
            <Button
              btnType='submit'
              className={globalStyles.button}
              title={title}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default FormFin; // Exportation du composant MyForm.
