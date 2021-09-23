describe("Home Page", () => {
  beforeEach(() => {
    // load example.json fixture file and store
    // in the test context object
    cy.fixture("store-items.json").as("storeItems");

    cy.intercept("GET", "**/products/*", { fixture: "store-items.json" });
  });

  before(() => cy.visit("http://localhost:3000/"));

  it("should display cart bucket button", () => {
    // Start from the index page

    cy.get('[data-test-id="cart-button"]').should("be.visible");
  });
  it("should have zero items in cart", () => {
    cy.get('[data-test-id="total-cart-items"]').contains("0");
  });
  it("should have displayed feature section correctly", () => {
    cy.get('[data-test-id="feature-section"]').should("be.visible");
    cy.get('[data-test-id="add-to-cart"]').should("be.visible");
  });
  it("should add feature item to cart onclick of add to cart button", () => {
    cy.get('[data-test-id="add-to-cart"]').click();
    cy.get('[data-test-id="total-cart-items"]').contains("1");
    cy.get('[data-test-id="clear-cart-button"]').click();
  });
  it("should add feature item to cart onclick of add to cart button", () => {
    cy.get('[data-test-id="add-to-cart"]').click();
    cy.get('[data-test-id="clear-cart-button"]').click();
    cy.get('[data-test-id="total-cart-items"]').contains("0");
    cy.get('[data-test-id="cart-section"]').should("not.be.visible");
  });
  it("should add display add to cart on hover of store items", () => {
    cy.get('[data-test-id="store-item_0"]').trigger("mouseover");
    cy.get('[data-test-id="add-storeitem-to-cart"]').should("be.visible");
  });
});
