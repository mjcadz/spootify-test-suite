describe('Playlists component', () => {

  beforeEach(() => {
    cy.visit('/playlists')

    cy.get('.button.playlists__header__add-playlist')
      .as('new-playlist-button')
  });

  // check the out of box state
  it('playlists default state', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/playlists')

    cy.get('.button.playlists__header__add-playlist')
      .should('exist')

    cy.get('.playlists__empty')
      .find('h1')
      .should('have.text', "There aren't any playlists yet. Try adding a new one.")
  });

  // test new playlist dialog box
  context('new playlist dialog', () => {

    beforeEach(() => {
      cy.get('@new-playlist-button')
        .click()

      cy.get('.button').contains('Save')
        .as('save-button')

      cy.get('.button').contains('Cancel')
        .as('cancel-button')

      cy.get('h2').contains('Create A New Playlist')
        .as('dialog-title')

      cy.get('.input')
        .as('playlist-name-input')
    });

    // check input behaviour
    it('name input', () => {
      const input = 'New Playlist 137&*?/<>'

      cy.get('@playlist-name-input')
        .should('have.focus')

      cy.get('@playlist-name-input')
        .invoke('attr', 'placeholder')
        .should('contain', 'My Playlist')

      cy.get('@playlist-name-input')
        .type(input)
        .should('have.value', input)
    });

    // check cancel behaviour
    it('cancel button', () => {
      cy.get('@dialog-title')
        .should('exist')

      cy.get('@cancel-button')
        .click()

      cy.get('@dialog-title')
        .should('not.exist')
    });

    // check save behaviour
    it('save button', () => {
      cy.get('@save-button')
        .should('be.disabled')

      cy.get('@playlist-name-input')
      .type('New')
      .should('have.value', 'New')

      cy.get('@save-button')
        .should('not.be.disabled')
    });

    // switch between icons and check selection class works
    it('switching icons', () => {
      const selected = 'playlists__create-content__icons__icon--selected'
      
      cy.get('.fa-umbrella-beach.playlists__create-content__icons__icon')
        .as('umbrella')

      cy.get('.fa-dumbbell.playlists__create-content__icons__icon')
        .as('dumbbell')

      cy.get('@umbrella')
       .should('have.class', selected)

      cy.get('@dumbbell')
       .should('not.have.class', selected)
       .click()

      cy.get('@umbrella')
       .should('not.have.class', selected)

      cy.get('@dumbbell')
       .should('have.class', selected)

    });

  });
   
  // test the playlist list behaviour
  it('create and delete', () => {
    const playlists = [
      {name: 'Dream pop', icon: 'umbrella-beach'},
      {name: 'Metalcore', icon: 'dumbbell'},
      {name: 'Sax house', icon: 'car'},
      {name: 'Synthwave', icon: 'running'}
    ]

    // create playlists
    cy.wrap(playlists)
      .each(playlist =>{
        cy.get('@new-playlist-button')
          .click()

        cy.get('.input')
          .type(playlist.name)

        if (playlist.icon != 'umbrella-beach'){
          cy.get('.fa-' + playlist.icon + '.playlists__create-content__icons__icon')
            .click()
        }

        cy.get('.button').contains('Save')
          .click()
      });

    // check all were created
    cy.get('.playlists').find('.playlist-item').should('have.length', playlists.length)

    // delete playlists
    cy.wrap(playlists)
      .each(playlist => {
        cy.get('p').contains(playlist.name)
         .parent()
         .parent()
         .find('.playlist-item__delete')
         .click()

      });

    // check all were deleted
    cy.get('.playlists').find('.playlist-item').should('have.length', 0)
    
    // user can see no playlists message
    cy.get('.playlists__empty')
      .find('h1')
      .should('have.text', "There aren't any playlists yet. Try adding a new one.")
  });

});