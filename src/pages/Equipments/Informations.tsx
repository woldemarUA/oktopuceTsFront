import EquipmentItem from './EquipmentItem';

import {
  endroit_mapping,
  equipment_type_id_mapping,
} from '../../components/forms/config/parametrageFromConfig';

type InformationsProps = {
  equipment_type: string;
  endroit: string;

  equipment_type_id: string;
  header: string;
};

import globalStyles from '../../styles/globalStyles';

const Informations = ({
  equipment_type,
  endroit,
  equipment_type_id,
  header,
}: InformationsProps) => {
  console.log(equipment_type);
  const titles = endroit_mapping.get(parseInt(equipment_type, 10)) || [];
  console.log(titles);
  const filteredTitles = titles.filter(
    (t) => t.value === parseInt(endroit, 10)
  );
  const title =
    filteredTitles.length > 0 ? filteredTitles[0].label : 'Unknown Title';

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
      <EquipmentItem
        titre={title}
        endroit={titreLabel}
        image={endroit}
        equipment_type={equipment_type}
        endroit_id={parseInt(endroit, 10)}
      />
    </div>
  );
};

export default Informations;
