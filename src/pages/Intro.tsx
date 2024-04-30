import React from 'react';

import { useSites } from '../context/SitesProvider';
import { useClients } from '../context/ClientsProvider';

const Intro: React.FC = () => {
  const { sites } = useSites();
  const { clients } = useClients();

  console.log('sites ', sites);
  console.log('clients ', clients);
  return <div>Intro: React</div>;
};

export default Intro;
