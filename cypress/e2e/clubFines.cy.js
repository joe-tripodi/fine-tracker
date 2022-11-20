describe("Club fines", () => {
  it("can navigate to Club Fines", () => {
    cy.viewport('macbook-13');
    cy.visit("/");
    cy.get(".navbar-item").contains("Club Fines").click();
  })
});
