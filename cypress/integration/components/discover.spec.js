//Tests for the discover page content
describe('Discover component', () => {

  beforeEach(() => {
    // test discover component with stubs instead of actual network
    cy.server()

    // stub token response, response not needed while stubbing
    cy.route('POST', '/api/token', {"access_token" : "unnecessary while stubbing"})

    // setup stubs for requests to spotify. responses found in discoverResponses.json fixture
    // responses are simple. name and image only.
    cy.fixture('discoverResponses').then((responses) => {
      cy.route('GET', '/v1/browse/new-releases?locale=en_US', responses.albumResponse)
      cy.route('GET', '/v1/browse/featured-playlists?locale=en_US', responses.playlistResponse)
      cy.route('GET', '/v1/browse/categories?locale=en_US', responses.categoryResponse).as('routes')
    })
    
    cy.visit('/discover')
    cy.setViewport()
    // wait until all routes have been stubbed
    cy.wait('@routes')
  });

  // test content loads from request
  it('content loads for each row', () => {
    
    //what should be in each row
    const rows = [
      {id: '#released', title: 'Test release', heading: 'RELEASED THIS WEEK'},
      {id: '#featured', title: 'Test playlist', heading: 'FEATURED PLAYLISTS'},
      {id: '#browse', title: 'Test category', heading: 'BROWSE'}
    ]
    
    // cycle through each row
    cy.wrap(rows)
      .each(row =>{
        // check header is present
        cy.get(row.id)
          .parent()
          .find('h2')
          .should('contain', row.heading)

        // check title matches response
        cy.get(row.id)
          .find('.discover-item__title')
          .should('contain', row.title)

        // check the picture has loaded
        cy.get(row.id)
          .find('.discover-item__art')
          .scrollIntoView()
          .should('be.visible')
      });
  });
});