import React from 'react';

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
    <>
      <button onClick={() => toggleAccordion(id)}>{title}</button>

      <div className={styles.listItem}>{isOpen && <>{children}</>}</div>
    </>
  );
};
