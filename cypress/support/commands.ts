/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    createItem: () => void;
  }
}

Cypress.Commands.add('createItem', () => {
  // create button should exist
  cy.get('[data-testid=createButton]').should('exist');

  // click create button
  cy.get('[data-testid=createButton]').click();

  // create item modal should be visible
  cy.get('[data-testid=createItemModal]').should('be.visible');

  // add title
  cy.get('[data-testid=itemFormTitleInput]').type('Some test title');

  // add description
  cy.get('[data-testid=itemFormDescriptionInput]').type('Some test description');
  
  // submit
  cy.get('[data-testid=itemFormSubmit]').click();
  
  // modal should be closed
  cy.get('[data-testid=createItemModal]').should('not.be.visible');
  
  // item should be added
  cy.get('[data-testid^=item-]').should('exist');
});