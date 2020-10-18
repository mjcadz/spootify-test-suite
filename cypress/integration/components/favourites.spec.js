// Tests for the favourites page content
// DOES NOT YET EXIST
describe('Favourites component', () => {

  beforeEach(() => {
    cy.visit('/favourites')
    cy.setViewport()
  });

  // check the route content exists
  it('content', () => {
    cy.get('.main__content__child')
      .find('.favourites').should('exist')
  });

});