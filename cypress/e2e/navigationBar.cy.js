describe("Navigation bar", () => {
  it("contains all navigation items", () => {
    cy.viewport('macbook-13');
    cy.visit("/");
    cy.get(".navbar-start").contains("Home");
    cy.get(".navbar-start").contains("Club Fines");
    cy.get(".navbar-start").contains("Player Fines");
    cy.get(".navbar-start").contains("Players");
    cy.get(".navbar-start").contains("Statistics");
  });

  it("can navigate to Club Fines", () => {
    cy.viewport('macbook-13');
    cy.visit("/");
    cy.get(".navbar-item").contains("Club Fines").click();
  })

  it("can navigate on mobile", () => {
    cy.viewport("iphone-xr");
    cy.visit("/");
    cy.get(".navbar-burger").click();
    cy.get("a[href='/players']").click();

    cy.get(".navbar-burger").click();
    cy.get("a[href='/clubfines']").click();

    cy.get(".navbar-burger").click();
    cy.get("a[href='/playerfines']").click();

    cy.get(".navbar-burger").click();
    cy.get("a[href='/statistics']").click();

    cy.get(".navbar-burger").click();
    cy.get("a[href='/home']").click();
  })


});
