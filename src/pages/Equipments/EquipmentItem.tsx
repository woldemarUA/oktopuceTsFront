import climatisationConfig from './equipmentConfigs/climatisationConfig';
import pompeChaleurCongfig from './equipmentConfigs/pompeChaleurCongfig';
import * as yup from 'yup';

import globalStyles from '../../styles/globalStyles';

import FormFin from '../../components/forms/FormFin';

const formConfigMapping = new Map([
  [1, climatisationConfig],
  [2, pompeChaleurCongfig],
]);

const PICTO_PATH = `${import.meta.env.VITE_APP_ASSETS_PATH}/images/picto`;
interface EquipmentItemProps {
  endroit: string | undefined;
  equipment_type: string;
  titre: string | undefined;
  image: string;
  endroit_id: number;
}

interface ConfigMap {
  [key: number]: {
    [field: string]: Record<string | number, any>;
  };
}

type FormOptions = Record<string | number, any>;

const EquipmentItem = ({
  endroit,
  equipment_type,
  titre,
  image,
  endroit_id,
}: EquipmentItemProps) => {
  const configFunction = formConfigMapping.get(parseInt(equipment_type, 10));
  let formOptionsAll: ConfigMap = {};

  if (configFunction) {
    formOptionsAll = configFunction();
  }
  console.log(formOptionsAll);
  console.log(endroit_id);

  const formOptions: FormOptions = formOptionsAll[endroit_id];

  return (
    <>
      <div className={globalStyles.row}>
        <img src={`${PICTO_PATH}/${image}.png`} />
      </div>
      <div className={globalStyles.row}>
        <h3 className={globalStyles.headerSection}>{titre}</h3>
        <p className={globalStyles.headerSection}>{endroit}</p>
      </div>

      <FormFin
        formFieldConfig={formOptions}
        containerStyle={false}
        title='Informations'
        handleSubmit={(values) => console.log(values)}
      />
    </>
  );
};

export default EquipmentItem;
