import EquipmentItem from './EquipmentItem';

import {
  endroit_mapping,
  equipment_type_id_mapping,
} from '../equipmentConfigs/parametrageFromConfig';

type InformationsProps = {
  header: string;
  formValues: Record<string, any>;
};

import FormFin from '../../../components/forms/FormFin';

import globalStyles from '../../../styles/globalStyles';

const Informations = ({ header, formValues }: InformationsProps) => {
  const { equipment_type, endroit, equipment_type_id } = formValues;
  const titles = endroit_mapping.get(parseInt(equipment_type, 10)) || [];

  const filteredTitles = titles.filter(
    (t) => t.value === parseInt(endroit, 10)
  );
  const title =
    filteredTitles.length > 0 ? filteredTitles[0].label : 'Titre inconnue';

  const titres =
    equipment_type_id_mapping.get(`${equipment_type}${endroit}`) || [];
  const filteredTitres = titres.filter(
    (t) => t.value === parseInt(equipment_type_id, 10)
  );

  const titreLabel =
    filteredTitres.length > 0 ? filteredTitres[0].label : undefined;

  return (
    <div className={globalStyles.form}>
      <div className={globalStyles.row}>
        <h2 className={globalStyles.header}>{header}</h2>
      </div>
      {/* <EquipmentItem
        titre={title}
        sousTitre={titreLabel}
        formValues={formValues}
      /> */}
      {/* <FormFin/> */}
    </div>
  );
};

export default Informations;
