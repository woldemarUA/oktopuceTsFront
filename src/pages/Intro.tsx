// import { loginFormConfig } from '../components/forms/config/formConfig';
// import { useSites } from '../context/SitesProvider';
import { useClients } from '../context/ClientsProvider';

const Intro: React.FC = () => {
  // const { sites } = useSites();
  const { clients } = useClients();

  // console.log('sites ', sites);
  // console.log('clients ', clients);

  return (
    <div>
      <div>Intro: React</div>
    </div>
  );
};

export default Intro;
