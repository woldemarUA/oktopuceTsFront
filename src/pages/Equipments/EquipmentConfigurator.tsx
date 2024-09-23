import equipmentFormFinalConf from './equipmentConfigs/equipmentFormFinalConf';
import FormFin from '../../components/forms/FormFin';

import { FormConfigProps } from './equipmentConfigs/equipmentConfigSharedFields';
import { useEquipments } from '../../context/EquipmentProvider';

export interface ConfigMap {
  [key: number]: {
    [field: string]: FormConfigProps;
    // [field: string]: EquipmentFormValues;
  };
}

const EquipmentConfigurator = () => {
  const formConf = equipmentFormFinalConf();

  const { handleAddEquipment } = useEquipments();

  return (
    <>
      <FormFin
        title='Parametrage'
        formFieldConfig={formConf}
        handleSubmit={handleAddEquipment}
      />
    </>
  );
};

export default EquipmentConfigurator;
