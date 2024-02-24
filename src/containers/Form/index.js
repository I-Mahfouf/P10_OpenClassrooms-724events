import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Fonction simulant un appel à une API de contact //
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 900); });

const Form = ({ onSuccess, onError }) => {
  // État pour gérer l'envoi du formulaire //
  const [sending, setSending] = useState(false);

  // Fonction pour envoyer le formulaire de contact //
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true); 
      try {
        await mockContactApi(); // Appel à l'API simulée //
        setSending(false); // Met à jour l'état pour indiquer que l'envoi est terminé //
        onSuccess(); // Appel de la fonction onSuccess fournie en prop //
      } catch (err) {
        setSending(false); // Met à jour l'état en cas d'erreur
        onError(err); // Appel de la fonction onError fournie en prop en cas d'erreur  //
      }
    },
    [onSuccess, onError] 
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Nom" label="Nom" />
          <Field placeholder="Prénom" label="Prénom" />
          <Select
            selection={["Personnel", "Entreprise"]} 
            onChange={() => null} 
            label="Personnel / Entreprise"
            type="large"
            titleEmpty 
          />
          <Field placeholder="Email" label="Email" />
          {/* Bouton de soumission du formulaire avec état désactivé lors de l'envoi */}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func, 
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null, 
  onSuccess: () => null, 
}

export default Form;