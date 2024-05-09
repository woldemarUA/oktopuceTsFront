import React from 'react';

import DownButtonSVG from '../assets/buttons/downArrorBtnTransparent.svg';

import styles from '../styles/listStyles';
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleAccordion: (title: number) => void;
  id: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isOpen,
  toggleAccordion,
  id,
}) => {
  return (
    <div>
      <button onClick={() => toggleAccordion(id)}>
        <div className={styles.listItemSpread}>
          <div>{title}</div>

          <div>
            <img
              src={DownButtonSVG}
              className='w-4 '
            />
          </div>
        </div>
      </button>

      <div className={styles.listItem}>{isOpen && <>{children}</>}</div>
    </div>
  );
};
