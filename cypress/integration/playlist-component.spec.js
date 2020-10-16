describe('Playlists component', () => {

  beforeEach(() => {
    cy.visit('/playlists')
  });

  it('default state', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/playlists')

    cy.get('.button.playlists__header__add-playlist')
      .should('exist')

    cy.get('.playlists__empty')
      .find('h1')
      .should('have.text', "There aren't any playlists yet. Try adding a new one.")
  });

  context('with empty playlists', () => {
    let listItems = 0

    const playlists = [
      {name: 'Dream pop', icon: 'umbrella-beach'},
      {name: 'Metalcore', icon: 'dumbbell'},
      {name: 'Sax house', icon: 'car'},
      {name: 'Synthwave', icon: 'running'}
    ]

    beforeEach(() => {
      cy.get('.button.playlists__header__add-playlist')
        .as('new-playlist')
    });

    it.only('new playlist dialog behaviour', () => {
      cy.get('@new-playlist')
        .click()

      cy.get('h2').contains('Create A New Playlist')
        .as('dialog-title')
      cy.get('.button').contains('Save')
        .as('save-button')

      cy.get('@dialog-title')
        .should('exist')

      cy.get('.button').contains('Cancel')
        .click()

      cy.get('@dialog-title')
        .should('not.exist')

      cy.get('@new-playlist')
        .click()

      //######save button, icons, split into individual tests in new context
    });

  });

});