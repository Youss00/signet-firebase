import './PageUtilisateur.scss';

import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import FrmDossier from './FrmDossier';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { creer } from '../code/dossier-modele';

export default function PageUtilisateur({util}) {
  // État pour gérer les dossiers
  const [dossiers, setDossiers] = useState([]);

  // État d'affichage du formulaire d'ajout de dossier 
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  /**
   * Ajoute un dossier
   */
  async function ajouterDossier(titre, couverture, couleur, dateModif) {
    let nouveauDossier = {titre, couverture, couleur, dateModif};
    const idDossier = await creer(util.uid, nouveauDossier);
    setDossiers([...dossiers, nouveauDossier]);
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
