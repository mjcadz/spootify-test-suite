// Tests for the search page content
// DOES NOT YET EXIST
describe('Search component', () => {

  beforeEach(() => {
    cy.visit('/search')
    cy.setViewport()
  });

  // check the route content exists
  it('content', () => {
    cy.get('.main__content__child')
          .find('.search').should('exist')
  });

});