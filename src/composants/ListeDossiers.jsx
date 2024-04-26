import Dossier from './Dossier';

// Importer le composant motion
import { motion } from 'framer-motion';

import './ListeDossiers.scss';
import { modifier, supprimer } from '../code/dossier-modele';

export default function ListeDossiers({dossiers, setDossiers, idUtil}) {
  
  function supprimerDossier(idDossier) {
    // Supprimer sur Firestore
    supprimer(idUtil, idDossier);

    // Supprimer localement (dans le UI)
    setDossiers(dossiers.filter(elt => elt.id != idDossier));
  }

  function modifierDossier(idDossier, titre, couverture, couleur, dateModif) {
    const dossierModif = {couleur, titre, couverture, dateModif};
    // Modifier sur Firestore
    modifier(idUtil, idDossier, dossierModif);

    // Modifier localement (dans le UI)
    setDossiers(dossiers.map(
      doss => {
        if(doss.id == idDossier) {
          return ({idDossier, ...dossierModif});
        }
        return doss;
      }
    ));
  }

  return (
    <ul className="ListeDossiers">
      {
        (dossiers.length > 0) 
        ?
          dossiers.map( 
            // Remarquez l'utilisation du "spread operator" pour "étaler" les 
            // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
            // fléchée dans les props du composant 'Dossier' !!
            dossier =>  <motion.li 
                          key={dossier.id}
                          layout={true}
                        >
                          <Dossier 
                            {...dossier} 
                            supprimer={supprimerDossier} 
                            modifier={modifierDossier}
                          />
                        </motion.li>
          )
        :
        <li className='aucun-dossier'>Aucun dossier</li>
      }
    </ul>
  );
}