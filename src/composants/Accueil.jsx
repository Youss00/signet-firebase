import './Accueil.scss';
import logo from '../images/signets-logo.png';
import btnGoogle from '../images/btn-connexion-google.png';
import { connexion } from '../code/utilisateur-modele';

function Accueil() {
  

  return (
    <div className="Accueil">
      <img src={logo} alt="Logo Signets" />
      <h1>Signets <span>beta</span></h1>
      <h3>
        <span>Organiser vos signets</span>
        <span>Simple comme bonjour</span>
      </h3>
      <section className="connexion">
        <h2>Connexion à Signets</h2>
        <div className="btn-google" onClick={connexion}>
          <img src={btnGoogle} alt="" />
          Connexion avec Google
        </div>
      </section>
    </div>
  );
}

export default Accueil;