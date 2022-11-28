// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");

    cy.fixture("show").then((json) => {
      cy.intercept("GET", "https://api.tvmaze.com/shows?page=0", json).as(
        "getShows"
      );
    });

    cy.contains("div", "There are no shows.").should("not.exist");
    cy.contains("h2", "Drama").should("exist");
    cy.contains("h2", "Science-Fiction").should("exist");
  });
});
