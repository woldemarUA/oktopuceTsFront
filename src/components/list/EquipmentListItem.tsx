import EquipmentInterface from '../../interface/equipmentInterface';

interface EquipmentListItemProps {
  item: EquipmentInterface;
}

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({ item }) => {
  console.log(item);
  return <div>EquipmentListItem</div>;
};

export default EquipmentListItem;
