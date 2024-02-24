import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // Utilisation du contexte pour accéder aux données globales //
  const [index, setIndex] = useState(0); // Définition de l'état local pour suivre l'index de la diapositive actuellement affichée //

  // Cette fonction organise les événements par date en ordre décroissant //
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour avancer à la prochaine carte/diapositive du slider. Elle gère le cycle du slider //
  const nextCard = () => {
    if (byDateDesc) {
      setTimeout(
        () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), // Change l'index à la prochaine diapositive ou revient à la première //
        5000 // Attend 5 secondes avant de passer à la diapositive suivante //
      );
    }
  };

  // Utilise useEffect pour appeler nextCard chaque fois que l'index change, créant ainsi un cycle automatique des diapositives //
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {/* Itère sur les événements triés pour afficher chaque diapositive */}
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title} // Utilise le titre de l'événement comme clé unique pour chaque diapositive //
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`} // Affiche ou cache la diapositive selon l'index actuel //
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3> 
              <p>{event.description}</p> 
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* Génère un bouton radio pour chaque diapositive pour permettre à l'utilisateur de naviguer entre elles */}
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`${event.title}-radio`} // Clé unique pour chaque bouton de pagination //
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Définit le bouton comme coché si son index correspond à celui de la diapositive actuelle //
              readOnly 
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Slider;
