import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { bd, collDossiers, collUtilisateurs } from "./init";


/**
 * Ajoute un dossier pour l'utilisateur connecté dans Firestore
 * @param {string} idUtil Ientifiant de l'utilisateur 
 * @param {object} infoDossier Objet contenant l'info du dossier à ajouter
 * 
 * @returns {Promise<string>} Identifiant du dossier ajouté.
 */
export async function creer(idUtil, infoDossier) {
  const refDossier = doc(collection(bd, collUtilisateurs, idUtil, collDossiers));
  console.log("Référence de document nouveau : ", refDossier);
  await setDoc(refDossier, infoDossier);
  return refDossier.id;
}

/**
 * Lire *TOUTE* l'info des dossiers de l'utilisateur connecté.
 * 
 * @param {string} idUtil Ientifiant de l'utilisateur.
 * 
 * @returns {Promise<Array>} Tableau contenant tous les dossiers de cet utilisateur.
 */
export async function lireTout(idUtil) {
  const lesDossiers = await getDocs(query(collection(bd, collUtilisateurs, idUtil, collDossiers)))
  console.log("Snapshot contenant les documents dans Firestore : ", lesDossiers);
  return lesDossiers.docs;
}

// Pour un autre projet
export async function un(idDossier) {

}

/**
 * 
 * @param {*} idUtil 
 * @param {*} idDossier 
 * @returns 
 */
export async function supprimer(idUtil, idDossier) {
  const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
  await deleteDoc(refDossier);
}

/**
 * 
 * @param {*} idUtil 
 * @param {*} idDossier 
 * @param {*} infoDossier 
 */
export async function modifier(idUtil, idDossier, infoDossier) {
  const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
  await updateDoc(refDossier, infoDossier);
}