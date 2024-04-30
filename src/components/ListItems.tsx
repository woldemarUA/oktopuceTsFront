import React from 'react';

import ClientsInterface from '../interface/clientsInterface';
import SitesInterface from '../interface/sitesInterface';

interface Props {
  data: (ClientsInterface | SitesInterface)[];
}

const ListItems: React.FC<Props> = ({ data }) => {
  return <div>ListItems</div>;
};

export default ListItems;
