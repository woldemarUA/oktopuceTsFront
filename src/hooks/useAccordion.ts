import { useState } from 'react';

const useAccordion = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    if (openAccordion == id) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(id);
    }
  };

  return { openAccordion, toggleAccordion };
};

export default useAccordion;
