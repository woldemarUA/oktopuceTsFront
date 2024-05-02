import SitesList from '../../components/listComps/SitesList';
import { useSites } from '../../context/SitesProvider';

const SitesListPage: React.FC = () => {
  const { sites } = useSites();

  return (
    <SitesList
      data={sites}
      title='Lister Sites'
    />
  );
};

export default SitesListPage;
