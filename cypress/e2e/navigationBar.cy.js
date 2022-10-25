describe("Navigation bar", () => {
  it("contains all navigation items", () => {
    cy.viewport('macbook-13');
    cy.visit("/");
    cy.get(".navbar-start").contains("Home");
    cy.get(".navbar-start").contains("Club Fines");
    cy.get(".navbar-start").contains("Fines");
    cy.get(".navbar-start").contains("Statistics");
  });

  it("can navigate to Club Fines", () => {
    cy.viewport('macbook-13');
    cy.visit("/");
    cy.get(".navbar-item").contains("Club Fines").click();
  })
});
