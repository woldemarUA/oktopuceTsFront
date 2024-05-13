const controleEtancheite = (
  poids: number,
  potentiel: number,
  detection: boolean
): string => {
  const charge = (poids * potentiel) / 1000;
  console.log(charge);

  if (isNaN(charge)) return `Pas assez d'information`;
  if (charge < 5) {
    return detection
      ? `pas
      d’obligation` // Avec système de détection
      : 'Une fois par an'; // Sans système de détection
  }

  if (charge >= 5 && charge <= 50) {
    return detection
      ? 'Tous les 2 ans' // Avec système de détection
      : 'Tous les 6 mois'; // Sans système de détection
  }

  if (charge > 50 && charge <= 500) {
    return detection
      ? 'Tous les ans' // Avec système de détection
      : 'Tous les 6 mois'; // Sans système de détection
  }

  // En supposant des charges supérieures à 500 t Eq. CO2
  return detection
    ? 'Tous les 6 mois' // Avec système de détection
    : 'Tous les 3 mois'; // Sans système de détection
};

export default controleEtancheite;
