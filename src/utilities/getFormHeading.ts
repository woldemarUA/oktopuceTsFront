// import { endroit_mapping } from '../pages/Equipments/equipmentConfigs/parametrageFromConfig';

// import { equipment_type_id_mapping } from '../pages/Equipments/equipmentConfigs/parametrageFromConfig';

import { endroit_mapping } from '../pages/Equipments/equipmentConfigs/parametrageConfComp';

import { equipment_type_id_mapping } from '../pages/Equipments/equipmentConfigs/parametrageConfComp';

export interface getFormHeadingInterface {
  title: string;
  titreLabel: string | undefined;
  imageName: string | number | undefined;
}

export const getFormHeading = (
  equipment_type: number,
  endroit: number,
  equipment_type_id: number
): getFormHeadingInterface => {
  const titles = endroit_mapping.get(equipment_type) || [];

  const filteredTitles = titles.filter((t) => t.value === endroit);
  const title =
    filteredTitles.length > 0 ? filteredTitles[0].label : 'Titre inconnue';

  const titres =
    equipment_type_id_mapping.get(`${equipment_type}${endroit}`) || [];
  const filteredTitres = titres.filter((t) => t.value === equipment_type_id);

  const titreLabel =
    filteredTitres.length > 0 ? filteredTitres[0].label : undefined;

  const imageName =
    filteredTitres.length > 0 ? filteredTitres[0].value : equipment_type_id;

  return { title, titreLabel, imageName };
};
