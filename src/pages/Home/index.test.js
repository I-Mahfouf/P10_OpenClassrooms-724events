import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const eventImages = screen.getAllByTestId("card-image-testid");
    expect(eventImages.length).toBeGreaterThan(0);
  }); // Si chaque événement est représenté par une image -
  // alors avoir un nombre d'images supérieur à zéro signifie qu'il y a au moins une image associée à un événement //

  it("a list of people is displayed", async () => {
    render(<Home />);
    // Récupère toutes les cartes de personnes sur la page //
    const peopleList = screen.getAllByTestId("people-card");
    // Vérifie s'il y a exactement 6 cartes de personnes affichées //
    expect(peopleList.length).toBe(6);
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    // Vérifie si le pied de page est affiché sur la page //
    const footerDisplayed = screen.getByTestId("footer");
    expect(footerDisplayed).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    // Vérifie si la carte du dernier événement est affichée sur la page //
    const lastEventCard = screen.getByTestId("lastEvent");
    expect(lastEventCard).toBeInTheDocument();
  });
});


