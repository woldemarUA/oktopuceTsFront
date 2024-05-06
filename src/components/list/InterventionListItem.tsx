import InterventionInterface from '../../interface/interventionInterface';

interface InterventionListItemProps {
  item: InterventionInterface;
}

import styles from '../../styles/listStyles';
import globalStyles from '../../styles/globalStyles';

const InterventionListItem: React.FC<InterventionListItemProps> = ({
  item,
}) => {
  const { company_name, site_name, technician_name, answers } = item;

  return (
    <>
      <div className={styles.listCol}>
        <h3 className={globalStyles.headerSection}> Intervenant</h3>
        <p className={styles.listCell}>
          <span className={styles.label}>Nom d'entreprise : </span>
          {company_name}
        </p>
        <p className={styles.listCell}>
          <span className={styles.label}>Nom du technicien : </span>
          {technician_name}
        </p>
        <p className={styles.listCell}>
          <span className={styles.label}>Nom du Site : </span>
          {site_name}
        </p>
      </div>
      <div className={styles.listCol}>
        <h3 className={globalStyles.headerSection}> Intervention details : </h3>
        {answers && (
          <>
            <div className={styles.listCell}>
              <span className={styles.label}>Tâches terminées : </span>
              <ul>
                {answers.completedTasks.map((task: string, index: number) => {
                  return (
                    <li
                      key={index}
                      className={styles.secondaryListItem}>
                      {task}
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className={styles.listCell}>
              <span className={styles.label}>Notes complémentaires : </span>
              {answers.additionalNotes}
            </p>
            <p className={styles.listCell}>
              <span className={styles.label}>Commentaires des clients : </span>
              {answers.customerFeedback}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default InterventionListItem;
