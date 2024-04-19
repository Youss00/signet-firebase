import './Appli.scss';

import Accueil from './Accueil.jsx';
import PageUtilisateur from './PageUtilisateur.jsx';
import { useEffect, useState } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele.js';

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => observerEtatConnexion(setUtilisateur),[]);

  return (
    utilisateur ? <PageUtilisateur util={utilisateur} /> : <Accueil />
  )
}
