// Composant pour rendre les champs de sélection.
const MySelectField: React.FC<
  FieldAttributes<any> & { label: string; options: Option[] }
> = ({ label, options, ...props }) => {
  console.log(props.name);
  const [field, meta] = useField(props); // Utilisation de useField pour accéder au champ et à ses métadonnées.
  return (
    <div>
      <label>{label}</label>
      {/* <select {...field}>
        // Le select utilise les propriétés du champ formik.
        {options.map(
          (
            option: Option // Mappage des options pour créer les balises <option>.
          ) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null} // Affichage
      des erreurs si le champ a été touché et s'il y a des erreurs. */}
    </div>
  );
};
