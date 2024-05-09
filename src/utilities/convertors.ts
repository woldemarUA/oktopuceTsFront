export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getTitle(item: any): string {
  // First preference to item.name if it exists and is not empty
  if (item.name && item.name.trim() !== '') {
    return item.name;
  }

  // Second preference to formatted name using first_name and last_name or contact_name
  if (item.first_name && (item.last_name || item.contact_name)) {
    const lastName = item.last_name ? item.last_name : item.contact_name;
    return `${item.first_name} ${lastName}`;
  }

  // Last fallback to date and intervention type
  if (item.int_type_name) {
    return `${formatDate(item.intervention_date)} - ${item.int_type_name}`;
  }

  if (item.type) {
    return `${item.type} - site: ${item.site} -  fait par: ${item.technician_name}`;
  }

  // Default title if none of the conditions are met
  return 'No title available';
}

export const formStepsConvertor = (
  config: Record<string | number, any>
): Record<string | number, any> => {
  let conf = {};
  for (const step of Object.values(config)) {
    conf = { ...conf, ...step };
  }

  return conf;
};

export const getSubset = (
  smallObject: Record<string, any>,
  bigObject: Record<string, any>
) => {
  return Object.keys(smallObject).reduce(
    (acc: Record<string, any>, key: string) => {
      if (bigObject.hasOwnProperty(key)) acc[key] = bigObject[key];
      return acc;
    },
    {}
  );
};
