import { EquipmentInterface } from '../../interface/equipment_interface';

import styles from '../../styles/listStyles';
import globalStyles from '../../styles/globalStyles';

interface EquipmentListItemProps {
  item: EquipmentInterface;
}

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({ item }) => {
  // const { site };
  return <>Hello equipmetn</>;
};

export default EquipmentListItem;

// <div className={styles.listCol}>
{
  /* <h3 className={globalStyles.headerSection}>Parametrage</h3>
<p className={styles.listCell}>{address}</p>
<p className={styles.listCell}>{city}</p>
<p className={styles.listCell}>{postal_code}</p>
</div>

<div className={styles.listCol}>
<h3 className={globalStyles.headerSection}>Coordonnées</h3>
<p className={styles.listCell}>{phone_number}</p>
<p className={styles.listCell}>
  <span className={styles.label}>email: </span>
  {email}
</p>
</div> */
}
