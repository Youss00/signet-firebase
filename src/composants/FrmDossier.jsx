import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

function FrmDossier({ouvert, setOuvert, actionDossier, dossierPrec=null}) {
  const [titre, setTitre] = useState(dossierPrec?dossierPrec.titre:"");
  const [couverture, setCouverture] = useState(dossierPrec?dossierPrec.couverture:"");
  const [couleur, setCouleur] = useState(dossierPrec?dossierPrec.couleur:"#000");

  console.log("Les valeurs du formulaire : ", titre, couverture, couleur);

  function gererFermer() {
    if(!dossierPrec) {
      setTitre("");
      setCouverture("");
      setCouleur("#000");
    }
    setOuvert(false);
  }

  function gererActionDossier() {
    let dateModif = new Date().getTime();
    if(!dossierPrec) {
      actionDossier(titre, couverture, couleur, dateModif);
    }
    else {
      actionDossier(dossierPrec.id, titre, couverture, couleur, dateModif);
    }
    
    gererFermer();
  }

  return (
    <div className="FrmDossier">
      <Dialog
        open={ouvert}
        onClose={gererFermer}
      >
        <DialogTitle>Ajouter/Modifier un dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="titre"
            name="titre"
            label="Titre du dossier"
            type="text"
            fullWidth
            variant="standard"
            value={titre}
            onChange={(evt)=>setTitre(evt.target.value)}
          />
          <TextField
            margin="dense"
            id="couverture"
            name="couverture"
            label="Image couverture du dossier"
            type="url"
            fullWidth
            variant="standard"
            value={couverture}
            onChange={(evt)=>setCouverture(evt.target.value)}
          />
          <TwitterPicker 
            triangle='hide'
            width='auto'
            colors={["#F3C", "#3CF", "#FC3", "purple"]}
            color={couleur}
            onChangeComplete={(clr)=>{setCouleur(clr.hex)}}
            value={couleur}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererActionDossier}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
      
  );
}

export default FrmDossier;