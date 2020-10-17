describe('Discover component', () => {

  beforeEach(() => {
    // test discover component with stubs instead of network
    cy.server()

    // stub token
    cy.route('POST', '/api/token', {"access_token" : "unnecessary while stubbing"})

    // setup discover stubs
    cy.fixture('discoveryResponses').then((responses) => {
      cy.route('GET', '/v1/browse/new-releases?locale=en_US', responses.albumResponse)
      cy.route('GET', '/v1/browse/featured-playlists?locale=en_US', responses.playlistResponse)
      cy.route('GET', '/v1/browse/categories?locale=en_US', responses.categoryResponse).as('routes')
    })
    
    cy.visit('/discover')
    cy.wait('@routes')
  });

  // test content loads from request
  it.only('content loads for each row', () => {
    const rows = [
      {id: '#released', title: 'Test release', heading: 'RELEASED THIS WEEK'},
      {id: '#featured', title: 'Test playlist', heading: 'FEATURED PLAYLISTS'},
      {id: '#browse', title: 'Test category', heading: 'BROWSE'}
    ]
    
    cy.wrap(rows)
      .each(row =>{
        // check header, title and image loaded
        cy.get(row.id)
          .parent()
          .find('h2')
          .should('contain', row.heading)

        cy.get(row.id)
          .find('.discover-item__title')
          .should('contain', row.title)
        
        cy.wait(1000)

        cy.get(row.id)
          .find('.discover-item__art')
          .should('be.visible')
      });
  });
});