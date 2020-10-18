Cypress.Commands.add('setViewport', () => {
  // get viewport from variables
  let size = Cypress.env('viewport')

  if (size == 'web') {
    cy.viewport(1280, 800)
  } else if (size == 'mobile') {
    cy.viewport(375, 667)
  }

});
