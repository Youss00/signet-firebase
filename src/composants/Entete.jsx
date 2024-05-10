import './Entete.scss';
import avatarImg from '../images/avatar.png';
import Avatar  from '@mui/material/Avatar';
import { deconnexion } from '../code/utilisateur-modele';

export default function Entete({util}) {
  console.log("Objet Utilisateur Google Provider : ", util);
  return (
    <header className="Entete">
      <div className="logo">Top3Signets</div>
      <div className="utilisateur">
        {util.displayName}
        <Avatar 
          className='avatar' 
          alt={util.displayName} 
          src={util.photoURL} 
        />
        <button onClick={deconnexion}>Déconnexion</button>
      </div>
    </header>
  );
}