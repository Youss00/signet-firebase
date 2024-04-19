import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
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
  console.log("Référence de document nouveau :", refDossier);
  await setDoc(refDossier, infoDossier);
  return refDossier.id;
}

/**
 * Lire *TOUTES* l'info des dossiers de l'utilisateur connecté
 * @param {string} idUtil Identifiant de l'utilsateur
 * @returns {Array} Tableau contenant tous les dossiers de cet utiisateur
 */

export async function lireTout(idUtil){
  const lesDossiers= getDocs(query(collection(bd,collUtilisateurs, idUtil, collDossiers ))).then
  console.log("Snapshot contenant les ducoments dans Firestore :", lesDossiers);
  return lesDossiers.docs;

}