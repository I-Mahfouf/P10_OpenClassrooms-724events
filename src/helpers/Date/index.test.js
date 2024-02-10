import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const dateJanuary = getMonth(new Date("2022-01-01"));
            expect(dateJanuary).toEqual("janvier");
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const dateJuly = getMonth(new Date("2022-07-08"));
            expect(dateJuly).toEqual("juillet");
        });
    });
})

