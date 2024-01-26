/// <reference types="cypress" />

describe('managing items', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/projects/project-todos');
  });

  it('should create a new item', () => {
    cy.createItem();
  });

  it('should edit an existing item', () => {
    const titleText = 'Another test title';

    cy.createItem();

    cy.get('[data-testid^=item-]').as('item');

    cy.get('@item').should('exist');

    cy.get('@item').find('[data-testid=itemEditButton]').should('exist');
    
    cy.get('@item').find('[data-testid=itemEditButton]').click({ force: true });

    cy.get('@item').find('[data-testid=itemForm]').should('be.visible');

    cy.get('@item').find('[data-testid=itemFormTitleInput]').clear();

    cy.get('@item').find('[data-testid=itemFormTitleInput]').type(titleText);
    
    cy.get('@item').find('[data-testid=itemFormSubmit]').click();

    cy.get('@item').find('[data-testid=itemTitle]').should('have.text', titleText);
  });

  it('should delete an existing item', () => {
    cy.createItem();

    cy.get('[data-testid^=item-]').as('item');

    cy.get('@item').should('exist');

    cy.get('@item').find('[data-testid=itemDeleteButton]').should('exist');
    
    cy.get('@item').find('[data-testid=itemDeleteButton]').click({ force: true });
    
    cy.get('@item').should('not.exist');
  });
})
