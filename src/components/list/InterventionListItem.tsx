import InterventionInterface from '../../interface/interventionInterface';

interface InterventionListItemProps {
  item: InterventionInterface;
}

const InterventionListItem: React.FC<InterventionListItemProps> = ({
  item,
}) => {
  console.log(item);
  return <div>InterventionListItem</div>;
};

export default InterventionListItem;
