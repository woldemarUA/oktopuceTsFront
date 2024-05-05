export function generateUniqueId(): number {
  // Obtenir le temps actuel en millisecondes
  const now: number = new Date().getTime();

  // Convertir le temps en chaîne de caractères et récupérer les trois derniers chiffres
  const lastThreeDigits: string = now.toString().slice(-3);

  // Convertir la chaîne de caractères en un entier
  return parseInt(lastThreeDigits, 10);
}
