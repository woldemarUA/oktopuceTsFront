import ListItems from '../../components/list/ListItems';
import { useEquipments } from '../../context/EquipmentProvider';

const EquipmentList = () => {
  const { equipments } = useEquipments();

  return (
    <ListItems
      items={equipments}
      title='Lister Equipments'
      type='equipment'
    />
  );
};

export default EquipmentList;
