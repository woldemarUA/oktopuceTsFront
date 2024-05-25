import globalStyles from '../../styles/globalStyles';
const PICTO_PATH = `${import.meta.env.VITE_APP_ASSETS_PATH}/images/picto`;

type FormHeaderComponentProps = {
  title: string;
  titreLabel: string | undefined;
  imageName: string | number | undefined;
};

const FormHeaderComponent = ({
  title,
  titreLabel,
  imageName,
}: FormHeaderComponentProps) => {
  return (
    <div className={globalStyles.imageRow}>
      <div className={globalStyles.imgLabelCell}>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-base '>{titreLabel}</p>
      </div>
      <div className={globalStyles.imageImgCell}>
        <img
          className='rounded'
          src={`${PICTO_PATH}/${imageName}.png`}
          alt='Equipment'
        />
      </div>
    </div>
  );
};

export default FormHeaderComponent;
