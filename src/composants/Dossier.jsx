import './Dossier.scss';
// Importer le chemin de l'image par défaut
import couvertureDefaut from '../images/couverture-defaut.jpg';

import IconButton from '@mui/material/IconButton';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FrmDossier from './FrmDossier';
import { useState } from 'react';

export default function Dossier({
                          id, 
                          titre, 
                          couverture, 
                          couleur, 
                          dateModif, 
                          supprimer,
                          modifier
                      }) {

  // État du formulaire de modification
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  // etat du dossier ouvert
  const [contenuDossierVisible, setContenuDossierVisible]= useState(false)

  // Style dynamique de la couleur du dossier.
  let objStyle = {
    backgroundColor: couleur
  }

  // gestion drag and drop
  function gererDragEnter(evt){
    evt.dataTransfer.effectAllowed = "link"
    evt.preventDefault()
  }

  function gererDragOver(evt){
    evt.preventDefault()
  }
  function gererDragLeave(){
    return
  }
  function gererDrop(evt){
    const url = evt.dataTransfer.getData('URL')
    evt.preventDefault()
    // Ajouter signet dans firestore 
    console.log("URL du signet deposé: " + url);
    
    //tourner la carte 
    setContenuDossierVisible(true)

  }
  return (
    <article style={objStyle} className={`Dossier ${contenuDossierVisible && 'actif'}`}
      onDragEnter={gererDragEnter}
      onDrop={gererDrop}
      onDragOver={gererDragOver}
      onDragLeave={gererDragLeave}
    >

      <div className="carte">
        <div className="recto">
          <div className="couverture">
            <IconButton className='btn-dossier tourner' color='primary'
            onClick={()=>setContenuDossierVisible(true)}
            >
              <ThreeSixtyIcon/>
            </IconButton>
            <img src={couverture || couvertureDefaut} alt={titre}/>
            <IconButton
              className='btn-dossier supprimer'
              color='secondary'
              onClick={()=>supprimer(id)}
            >
              <DeleteIcon/>
            </IconButton>
          </div>
          <div className="info" style={objStyle}>
            <h2>{titre}</h2>
            <p>Modifié : {dateModif}</p>
            <FrmDossier
              ouvert={frmDossierOuvert}
              setOuvert={setFrmDossierOuvert}
              actionDossier={modifier}
              dossierPrec={{id, titre, couverture, couleur}}
            />
            <IconButton onClick={()=>setFrmDossierOuvert(true)} className='btn-dossier modifier' color='tertiary'>
              <EditIcon/>
            </IconButton>
          </div>
        </div>
        <div className="verso">
          <IconButton 
          className='btn-dossier tourner'
          onClick={()=> setContenuDossierVisible(false)}
          >
            
            <ThreeSixtyIcon/>
            <a target='_blank' href="https://www.webtoons.com/en/action/eleceed/list?title_no=1571">Eleceed | WEBTOON</a>
          </IconButton>
        </div>
      </div>
    </article>
  );
}