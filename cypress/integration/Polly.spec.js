describe('Polly dashboard', () => {

  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should select Sales', () => {
    cy.intercept('GET', '/api/sales/', {
      statusCode: 200,
      body: [
        {
          timestamp: "2020-06-17T06:44:02.676475",
          amount: 1902,
        },
        {
          timestamp: "2020-06-17T06:45:30.983656",
          amount: 893,
        }
      ]
    }).as('getSales');

    cy.visit('/');

    cy.get('select').select('Sales');
    cy.wait('@getSales');
  })

  it('should select Subscriptions', () => {
    cy.intercept('GET', '/api/subscriptions/', {
      statusCode: 200,
      body: [
        {
          timestamp: "2020-06-17T06:44:02.676475",
          amount: 1200,
        },
        {
          timestamp: "2020-06-17T06:45:30.983656",
          amount: 967,
        }
      ]
    }).as('getSubscriptions');

    cy.visit('/');

    cy.get('select').select('Subscriptions');
    cy.wait('@getSubscriptions');
  })

  it('should see totals in each card', () => {
    cy.intercept('GET', '/api/totals/', {
      statusCode: 200,
      body: {
          salesTotal: 1200,
          subscriptionsTotal: 1874
      }
    }).as('getTotals');

    cy.visit('/');

    cy.wait('@getTotals');

    cy.get('.card').children().as('children');
    cy.get('@children').eq(0)
      .should('contain', 'CellFast sales');
    cy.get('@children').eq(1)
      .should('contain', '1200');
    cy.get('@children').eq(2)
      .should('contain', 'CellNow subscriptions');
    cy.get('@children').eq(3)
      .should('contain', '1874');
  })
})
