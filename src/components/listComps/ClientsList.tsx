import ClientsInterface from '../../interface/clientsInterface';

import { Accordion } from '../Accordion';
import useAccordion from '../../hooks/useAccordion';

import styles from '../../styles/listStyles';
import globalStyles from '../../styles/globalStyles';

interface Props {
  data: ClientsInterface[];
  title: string;
}

const ClientsList: React.FC<Props> = ({ data, title }) => {
  const { openAccordion, toggleAccordion } = useAccordion();

  return (
    <>
      <h2 className={globalStyles.header}> {title} </h2>
      <ul
        role='list'
        className='divide-y divide-gray-100 mt-2'>
        {data.map((item) => {
          const children = (
            <>
              <div className={styles.userDetails}>
                <p className={styles.userName}>{item.address}</p>
                <p className={styles.userEmail}>{item.city}</p>
              </div>

              <div className={styles.userRoleContainer}>
                <p className={styles.userRole}>{item.phone_number}</p>
                <p className={styles.userLastSeen}>{item.email}</p>
              </div>
            </>
          );
          return (
            <li key={item.id}>
              {/* <div className={styles.userInfoContainer}> */}

              <Accordion
                title={`${item.first_name} ${
                  item.last_name || item.contact_name
                }`}
                toggleAccordion={toggleAccordion}
                id={item.id}
                isOpen={openAccordion === item.id}
                children={children}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ClientsList;

{
  /* <div className={styles.userInfoContainer}>
              <img
                className={styles.userImage}
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />

              <div className={styles.userDetails}>
                <p className={styles.userName}>{item.first_name}</p>
                <p className={styles.userEmail}>{item.last_name}</p>
              </div>
              <div className={styles.userDetails}>
                <p className={styles.userName}>{item.address}</p>
                <p className={styles.userEmail}>{item.city}</p>
              </div>
            </div>
            <div className={styles.userRoleContainer}>
              <p className={styles.userRole}>{item.phone_number}</p>
              <p className={styles.userLastSeen}>{item.email}</p>
            </div> */
}
