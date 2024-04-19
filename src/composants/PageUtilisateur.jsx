import './PageUtilisateur.scss';

import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import FrmDossier from './FrmDossier';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { creer, lireTout } from '../code/dossier-modele';

export default function PageUtilisateur({ util }) {
  // État pour gérer les dossiers
  const [dossiers, setDossiers] = useState([]);

  // État d'affichage du formulaire d'ajout de dossier 
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);
  // appeler lsa fonction lireDossier de facon controler
  useEffect(() => { lireDossier(); return nettoyage} , []);
  // lire les dossiers dans Firestore
  async function lireDossier() {
    const lesDossiersFS = await lireTout(util.uid);
    // console.log("Les dossiers dans FS", lesDossiersFS);
    // console.log("Contenu d'un dossier : ", lesDossiersFS[1].data());
    // console.log("Identifiant d'un dossier :", lesDossiersFS[1].id);
    setDossiers(lesDossiersFS.map(
      dossierFS => ({id: dossierFS.id, ...dossierFS.data()
    })
    ));
  }

  function nettoyage(){
    // code a executer apres le useEffect
  }



  /**
   * Ajoute un dossier
   */
  async function ajouterDossier(titre, couverture, couleur, dateModif) {
    let nouveauDossier = { titre, couverture, couleur, dateModif };
    const idDossier = await creer(util.uid, nouveauDossier);
    nouveauDossier.id = idDossier;
    setDossiers([...dossiers, nouveauDossier]);
    console.log("Mes dossiers :", dossiers);
  }


  return (
    <div className="PageUtilisateur">
      <Entete util={util} />
      <section className="contenu-principal">
        <ListeDossiers
          dossiers={dossiers}
          setDossiers={setDossiers}
        />
        <FrmDossier
          ouvert={frmDossierOuvert}
          setOuvert={setFrmDossierOuvert}
          actionDossier={ajouterDossier}
        />
        <Fab onClick={() => setFrmDossierOuvert(true)} color='primary' className='btn-ajout-dossier' size='large'><AddIcon /></Fab>
      </section>
    </div>
  );
}
