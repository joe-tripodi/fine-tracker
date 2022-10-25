describe("Home Page", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.get("h1").contains("Home");
  });

  it("/home routes to the / page", () => {
    cy.visit("/home");
    cy.get("h1").contains("Home");
  })
});
