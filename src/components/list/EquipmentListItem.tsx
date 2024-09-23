import { EquipmentInterface } from '../../interface/equipment_interface';
interface EquipmentListItemProps {
  item: EquipmentInterface;
}

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({ item }) => {
  console.log(item);
  return <div>EquipmentListItem</div>;
};

export default EquipmentListItem;
