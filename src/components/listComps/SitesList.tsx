// import { useState } from 'react';

import SitesInterface from '../../interface/sitesInterface';

import { Accordion } from '../Accordion';

import useAccordion from '../../hooks/useAccordion';

import styles from '../../styles/listStyles';
import globalStyles from '../../styles/globalStyles';
interface Props {
  data: SitesInterface[];
  title: string;
}

const SitesList: React.FC<Props> = ({ data, title }) => {
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
                title={`${item.name}`}
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

export default SitesList;
