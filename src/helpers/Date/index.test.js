import { getMonth } from "./index";

describe("Date helper", () => {
    // Test de la fonction getMonth //
    describe("When getMonth is called", () => {
        // Test spécifiant le comportement de la fonction pour une date donnée (1er janvier 2022) //
        it("the function return janvier for 2022-01-01 as date", () => {
            // Appel de la fonction getMonth avec la date du 1er janvier 2022 //
            const dateJanuary = getMonth(new Date("2022-01-01"));
            // Vérification que le mois retourné est "janvier" //
            expect(dateJanuary).toEqual("janvier");
        });
    
        // Test spécifiant le comportement de la fonction pour une autre date donnée (8 juillet 2022) //
        it("the function return juillet for 2022-07-08 as date", () => {
            // Appel de la fonction getMonth avec la date du 8 juillet 2022 //
            const dateJuly = getMonth(new Date("2022-07-08"));
            // Vérification que le mois retourné est "juillet" //
            expect(dateJuly).toEqual("juillet");
        });
    });
});
