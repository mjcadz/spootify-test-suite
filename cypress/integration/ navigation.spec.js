describe("App navigation", () => {

  const navFilters = [
    {route: '/playlists', mainContentChild: '.playlists', buttonText: 'Playlists'},
    {route: '/discover', mainContentChild: '.discover', buttonText: 'Discover'},
    {route: '/search', mainContentChild: '.search', buttonText: 'Search'},
    {route: '/favourites', mainContentChild: '.favourites', buttonText: 'Favourites'},
    {route: '/charts', mainContentChild: '.charts', buttonText: 'Charts'},
  ]

  beforeEach(() => {
    cy.visit('/')
  })

  it("default route is discover", () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/discover')
  });

  it('side nav buttons work', () => {
    cy.wrap(navFilters)
      .each(filter => {
        cy.get('p').contains(filter.buttonText)
          .parent()
          .as('nav-button')
        
        cy.get('@nav-button')  
          .click()
          
        cy.get('@nav-button') 
          .should('have.class', 'sidebar__option--selected')

        cy.url().should('eq', Cypress.config().baseUrl + filter.route)
      })
  });

  it('routes have content', () => {
    cy.wrap(navFilters)
      .each(filter => {
        cy.visit(filter.route);
        
        cy.get('.main__content__child')
          .find(filter.mainContentChild).should('exist')
      })
  });

});