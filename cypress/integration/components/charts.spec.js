// Tests for the charts page content
// DOES NOT YET EXIST
describe('Charts component', () => {

  beforeEach(() => {
    cy.visit('/charts')
    cy.setViewport()
  });

  // check the route content exists
  it('content', () => {
    cy.get('.main__content__child')
          .find('.charts').should('exist')
  });

});