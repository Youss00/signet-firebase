import { collection, doc, setDoc } from "firebase/firestore";
import { bd, collDossiers, collUtilisateurs } from "./init";


/**
 * Ajoute un dossier pour l'utilisateur connecté dans Firestore
 * @param {string} idUtil Identifiant de l'utilisateur 
 * @param {object} infoDossier Objet contenant l'info du dossier à ajouter
 * 
 * @returns {Promise<string>} Identifiant du dossier ajouté.
 */
export async function creer(idUtil, infoDossier) {
  const refDossier = doc(collection(bd, collUtilisateurs, idUtil, collDossiers));
  await setDoc(refDossier, infoDossier);
  return refDossier.id;
}