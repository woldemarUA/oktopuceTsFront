// import { useSites } from '../context/SitesProvider';
// import { useClients } from '../context/ClientsProvider';
import { parametrageFormConfig } from '../components/forms/config/parametrageFromConfig';
import FormFin from '../components/forms/FormFin';

const Intro: React.FC = () => {
  // const { sites } = useSites();
  // const { clients } = useClients();

  // console.log('sites ', sites);
  // console.log('clients ', clients);

  return (
    <div>
      <div>Intro: React</div>
      <FormFin
        formFieldConfig={parametrageFormConfig}
        title='Parametrage'
        handleSubmit={(values: Record<string, any>) => {
          console.log(values);
          // return { msg: values };
        }}
      />
    </div>
  );
};

export default Intro;
