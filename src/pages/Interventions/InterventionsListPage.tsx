import ListItems from '../../components/list/ListItems';

import { useInterventions } from '../../context/InterventionsProvider';

const InterventionsListPage: React.FC = () => {
  const { interventions } = useInterventions();

  return (
    <ListItems
      items={interventions}
      type='intervention'
      title='List des Interventions'
    />
  );
};

export default InterventionsListPage;
