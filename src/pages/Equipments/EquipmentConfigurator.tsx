// import climatisationConfig from './equipmentConfigs/climatisationConfig';
// import pompeChaleurCongfig from './equipmentConfigs/pompeChaleurCongfig';
// import thermodynamiqueConfig from './equipmentConfigs/thermodynamiqueConfig';

import equipmentFormFinalConf from './equipmentConfigs/equipmentFormFinalConf';
import FormFin from '../../components/forms/FormFin';

import { FormConfigProps } from './equipmentConfigs/equipmentConfigSharedFields';

export interface ConfigMap {
  [key: number]: {
    [field: string]: FormConfigProps;
    // [field: string]: EquipmentFormValues;
  };
}

const EquipmentConfigurator = () => {
  const formConf = equipmentFormFinalConf();

  return (
    <>
      <FormFin
        title='Parametrage'
        formFieldConfig={formConf}
        handleSubmit={(values: any) => {
          console.log(values);
        }}
        // multiStep={true}
        // multiConf={formOptions}
      />

      {/* <FormFin
        title='Configurator'
        formFieldConfig={formConf}
        handleSubmit={(values: any) => console.log(values)}
        multiStep={true}
        multiConf={formOptions}
      /> */}
    </>
  );
};

export default EquipmentConfigurator;

// type configSchema = () => Record<number, any>;

// const formConfigMapping = new Map<number, configSchema>([
//   [1, climatisationConfig],
//   [2, pompeChaleurCongfig],
//   [3, thermodynamiqueConfig],
// ]);

//  selectionne formulaire
// const formConfigSelect = (produit: number) => {
//   // , endroit: number
//   // selection configuration de mappping
//   const configFunction = formConfigMapping.get(produit);
//   let formOptionsAll: ConfigMap = {};
//   if (configFunction) {
//     formOptionsAll = configFunction();
//   }
//   // console.log(formOptionsAll);
//   return formOptionsAll;
//   // return formOptionsAll[endroit];
// };

// let formOptionsAll: ConfigMap = {};
// if (configFunction) {
//   formOptionsAll = configFunction();
// }

// const formOptions = formConfigSelect(1);

// if (!formOptions) {
//   return <div>chargement...</div>;
// }
// const formConf = formStepsConvertor(formOptions);

// if (!formConf) {
//   return <div>chargement...</div>;
// }
