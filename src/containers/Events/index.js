import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements à afficher par page //

const EventList = () => {
  const { data, error } = useData(); // Récupération des données et de l'état d'erreur via le hook personnalisé //
  const [type, setType] = useState(); // État local pour stocker le type d'événement sélectionné //
  const [currentPage, setCurrentPage] = useState(1); // État local pour stocker le numéro de la page actuelle //

  // Filtrage des événements en fonction du type sélectionné //
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events.filter((event) => event.type === type))  || [] // filtre les événements en fonction du type sélectionné dans le composant EventList//
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  // Fonction pour changer le type d'événement sélectionné //
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          {/* Sélecteur de catégorie pour filtrer les événements par type */}
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          {/* Conteneur pour afficher les événements filtrés */}
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {/* Composant EventCard à afficher dans le Modal */}
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;