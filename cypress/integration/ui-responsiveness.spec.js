// Tests for responsive components. doesn't take into account chosen viewport
describe('Responsiveness', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  //check responsiveness of sidebar
  it('Sidebar', () => {
    const viewports = [
      {width: 380, sidebarWidth: 50, titles: 'not.be.visible'},
      {width: 600, sidebarWidth: 75, titles: 'not.be.visible'},
      {width: 1000, sidebarWidth: 225, titles: 'be.visible'},
    ]
    
    //cycle through viewports and check appearance
    cy.wrap(viewports)
      .each(viewport =>{
        // set width
        cy.viewport(viewport.width, 660)

        // check title visibility
        cy.get('p').contains('Discover')
          .should(viewport.titles)

        // check sidebar width
        cy.get('.sidebar')
          .invoke('width')
          .should('eq', viewport.sidebarWidth)
      });

  });

  //check responsiveness of the player controls
  it('Player', () => {
    const viewports = [
      {width: 1050, album: 'be.visible', albumTitle: 'be.visible', controls: 'be.visible', actions: 'be.visible', actionMenu: 'not.be.visible'},
      {width: 1000, album: 'be.visible', albumTitle: 'not.be.visible', controls: 'be.visible', actions: 'be.visible', actionMenu: 'not.be.visible'},
      {width: 750, album: 'be.visible', albumTitle: 'not.be.visible', controls: 'be.visible', actions: 'not.be.visible', actionMenu: 'be.visible'},
      {width: 450, album: 'not.be.visible', albumTitle: 'not.be.visible', controls: 'be.visible', actions: 'not.be.visible', actionMenu: 'be.visible'},
    ]
    
    //cycle through viewports and check appearance
    cy.wrap(viewports)
      .each(viewport =>{
        // set width
        cy.viewport(viewport.width, 660)

        // album picture visibility
        cy.get('.player__album')
          .should(viewport.album)

        // album title visibility
        cy.get('p').contains("Nothing's playing")
          .should(viewport.albumTitle)

        // controls visibility
        cy.get('.player__controls')
          .should(viewport.controls)

        // actions visibility
        cy.get('.player__actions > .fa-heart')
        .should(viewport.actions)

        // action menu visibility
        cy.get('.player__actions > .fa-ellipsis-h')
        .should(viewport.actionMenu)
      });

  });
});