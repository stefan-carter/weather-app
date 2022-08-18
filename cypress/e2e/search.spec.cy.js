describe('Is Hello there?', () => {
    it('can see hello', () => {
        cy.visit('http://localhost:3000')
        cy.get('[data-cy="hello"]').should('contain', 'Hello')
    })
})

describe('Search journey', () => {
    it('can search for a city', () => {
        cy.visit('http://localhost:3000')
        cy.get('input.search-bar.placeholder').should('contain', 'Search...')
    })
})