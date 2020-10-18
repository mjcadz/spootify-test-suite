// Tests for the playlists page content
describe('Playlists component', () => {

  beforeEach(() => {
    cy.visit('/playlists')

    cy.get('.button.playlists__header__add-playlist')
      .as('new-playlist-button')
  });

  // check the out of box state
  it('playlists default state', () => {
    //check url
    cy.url().should('eq', Cypress.config().baseUrl + '/playlists')
    
    //check new playlist button is there
    cy.get('.button.playlists__header__add-playlist')
      .should('exist')

    // check default no playlist message is there
    cy.get('.playlists__empty')
      .find('h1')
      .should('have.text', "There aren't any playlists yet. Try adding a new one.")
  });

  // test new playlist dialog box
  context('new playlist dialog', () => {

    beforeEach(() => {
      //open dialog and save components
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

    // check the input box behaviour
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

    // check the cancel button behaviour
    it('cancel button', () => {
      cy.get('@dialog-title')
        .should('exist')

      cy.get('@cancel-button')
        .click()

      cy.get('@dialog-title')
        .should('not.exist')
    });

    // check the save button behaviour
    it('save button', () => {
      cy.get('@save-button')
        .should('be.disabled')

      cy.get('@playlist-name-input')
      .type('New')
      .should('have.value', 'New')

      cy.get('@save-button')
        .should('not.be.disabled')
    });

    // switch between icons and check selection works correctly
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
   
  // test the playlist list creation and deletion behaviour
  it('create and delete', () => {

    const playlists = [
      {name: 'Dream pop', icon: 'umbrella-beach'},
      {name: 'Metalcore', icon: 'dumbbell'},
      {name: 'Sax house', icon: 'car'},
      {name: 'Synthwave', icon: 'running'}
    ]

    // create multiple playlists
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

    // delete all of the playlists
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
    
    // check user can see no playlists message
    cy.get('.playlists__empty')
      .find('h1')
      .should('have.text', "There aren't any playlists yet. Try adding a new one.")
  });

});