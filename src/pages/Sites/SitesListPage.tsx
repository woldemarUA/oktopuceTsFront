import ListItems from '../../components/list/ListItems';
import { useSites } from '../../context/SitesProvider';

const SitesListPage: React.FC = () => {
  const { sites } = useSites();

  return (
    <ListItems
      items={sites}
      title='Lister Sites'
      type='sites'
    />
  );
};

export default SitesListPage;
