import climatisationConfig from './equipmentConfigs/climatisationConfig';
import pompeChaleurCongfig from './equipmentConfigs/pompeChaleurCongfig';
import thermodynamiqueConfig from './equipmentConfigs/thermodynamiqueConfig';

import globalStyles from '../../styles/globalStyles';

import FormFin from '../../components/forms/FormFin';
import { styles } from '../../styles/formStyles';

type configSchema = () => Record<number, any>;

const formConfigMapping = new Map<number, configSchema>([
  [1, climatisationConfig],
  [2, pompeChaleurCongfig],
  [3, thermodynamiqueConfig],
]);

const PICTO_PATH = `${import.meta.env.VITE_APP_ASSETS_PATH}/images/picto`;
interface EquipmentItemProps {
  sousTitre: string | undefined;

  titre: string | undefined;

  formValues: Record<string, any>;
}

interface ConfigMap {
  [key: number]: {
    [field: string]: Record<string | number, any>;
  };
}

type FormOptions = Record<string | number, any>;

const EquipmentItem = ({
  sousTitre,
  titre,

  formValues,
}: EquipmentItemProps) => {
  const { equipment_type, endroit, equipment_type_id } = formValues;
  const configFunction = formConfigMapping.get(parseInt(equipment_type, 10));
  let formOptionsAll: ConfigMap = {};

  if (configFunction) {
    formOptionsAll = configFunction();
  }

  const formOptions: FormOptions = formOptionsAll[parseInt(endroit, 10)];
  console.log(formValues);
  return (
    <>
      <div className={globalStyles.imageRow}>
        <div className={globalStyles.imgLabelCell}>
          <h3 className='text-lg font-semibold'>{titre}</h3>
          <p className='text-base '>{sousTitre}</p>
        </div>
        <div className={globalStyles.imageImgCell}>
          <img
            src={`${PICTO_PATH}/${equipment_type_id}.png`}
            alt='Equipment'
          />
        </div>
      </div>

      <FormFin
        formFieldConfig={formOptions}
        containerStyle={false}
        title='Informations'
        handleSubmit={(values) => console.log(values)}
        formValues={formValues}
      />
    </>
  );
};

export default EquipmentItem;
