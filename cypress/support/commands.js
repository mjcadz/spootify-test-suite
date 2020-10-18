Cypress.Commands.add('setViewport', () => {
  // get viewport from passed in environment variables
  let size = Cypress.env('viewport')

  if (size == 'web') {
    // web size
    cy.viewport(1280, 800)
  } else if (size == 'mobile') {
    // mobile size
    cy.viewport(375, 667)
  }

});
