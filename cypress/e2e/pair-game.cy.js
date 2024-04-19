/// <reference types="cypress" />

// import { get } from 'cypress/types/lodash';

describe('Игра в пары', () => {
  const rndCardRow = Math.floor(Math.random() * 4);
  const rndCardCol = Math.floor(Math.random() * 4);

  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('ul.list').children().should('have.length', 4);

    for (let index = 0; index < 4; index++) {
      cy.get('ul.card-row').eq(index).children().should('have.length', 4);
      cy.get('ul.card-row')
        .eq(index)
        .children()
        .should('not.have.class', 'card--open');
    }
  });

  /////////////////////////////////////////////////

  it('Кликнуть случайную карту и убедиться что она открыта', () => {
    cy.visit('http://localhost:8080/');
    cy.get('ul.card-row').eq(rndCardRow).children().eq(rndCardCol).click();
    // .children()
    // .eq(rndCardCol)
    // .click();

    cy.get('ul.card-row')
      .eq(rndCardRow)
      .children()
      .eq(rndCardCol)
      .wait(1000)
      .should('have.class', 'card--open');
    // cy.get('ul.list')
    //   .children()
    //   .eq(rndCard)
    //   .wait(1000)
    //   .should('have.class', 'card--open');
  });

  ///////////////////////////////////////////

  it('Нажать левую верхнюю карточку, затем следующую, пока не найдется пара. Проверить найденную пару на видимость', () => {
    cy.visit('http://localhost:8080/');

    let counter = 1;

    function clickCards(cards) {
      cy.get(cards[0]).click();
      cy.get(cards[counter]).click().wait(500);

      if (cards[0].dataset.number === cards[counter].dataset.number) {
        cy.get(cards[0]).should('have.class', 'card--open');
        cy.get(cards[counter]).should('have.class', 'card--open');
      } else {
        counter++;
        clickCards(cards);
      }
    }
    cy.get('.card').then(($cards) => {
      clickCards($cards);
    });
  });

  //////////////////////////////////////////////

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на третью карточку две несовпадающие карточки становятся закрытыми.', () => {
    cy.visit('http://localhost:8080/');

    let firstCard = 0;
    let secondCard = 1;

    function clickCards(cards) {
      cy.get(cards[firstCard]).click();
      cy.get(cards[secondCard]).click().wait(500);

      if (
        cards[firstCard].dataset.number === cards[secondCard].dataset.number
      ) {
        firstCard += 2;
        secondCard += 2;
        clickCards(cards);
      } else {
        cy.get(cards[firstCard]).should('not.have.class', 'card--open');
      }
    }

    cy.get('.card').then(($cards) => {
      clickCards($cards);
    });
  });
});
