describe("Navigation bar", () => {
  it("contains all navigation items", () => {
    cy.visit("/");
    cy.get(".nav").contains("Home");
    cy.get(".nav").contains("Club Fines");
    cy.get(".nav").contains("Fines");
    cy.get(".nav").contains("Statistics");
  });

  it("can navigate to Club Fines", () => {
    cy.visit("/");
    cy.get(".nav").contains("Club Fines").click();
    cy.get("h1").contains("Club Fines");
  })
});
