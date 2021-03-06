// Tests for navigation
describe('App navigation', () => {

  const navFilters = [
    {route: '/playlists', mainContentChild: '.playlists', buttonText: 'Playlists'},
    {route: '/discover', mainContentChild: '.discover', buttonText: 'Discover'},
    {route: '/search', mainContentChild: '.search', buttonText: 'Search'},
    {route: '/favourites', mainContentChild: '.favourites', buttonText: 'Favourites'},
    {route: '/charts', mainContentChild: '.charts', buttonText: 'Charts'},
  ]

  beforeEach(() => {
    cy.visit('/')
    cy.setViewport()
  });

  //check out of box state of app
  it('default route', () => {
    
    // should have been routed to default page
    cy.url().should('eq', Cypress.config().baseUrl + '/discover')
    
    // title should be name of app
    cy.title().should('eq', 'Spootify')
  });

  //check side nav buttons open correct route
  it('side nav buttons', () => {
    cy.wrap(navFilters)
      .each(filter => {
        cy.get('p').contains(filter.buttonText)
          .parent()
          .as('nav-button')
        
        //click nav button
        cy.get('@nav-button')  
          .click()
          
        // should change class to selected
        cy.get('@nav-button') 
          .should('have.class', 'sidebar__option--selected')

        cy.url().should('eq', Cypress.config().baseUrl + filter.route)
      })
  });

  //check routes load actual content from components
  it('routes have content', () => {
    cy.wrap(navFilters)
      .each(filter => {
        cy.visit(filter.route);
        
        //component should be mounted here
        cy.get('.main__content__child')
          .find(filter.mainContentChild).should('exist')
      })
  });

});