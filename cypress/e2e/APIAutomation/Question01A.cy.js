/// <reference types = "Cypress" />

describe('Kindred API Automation - Question 01 A', ()=>{

    it('Validate the main url without brand', ()=>{
        cy.request({
            method: 'GET',
            url: "https://www.unibet.co.uk/kambi-rest-api/gameLauncher2.json", failOnStatusCode: false,
            Headers:{
                "Content-Type":"application/json"
            }
        }).then((response) =>{
            expect(response.status).to.eq(400);
            expect(response.body.error.description).to.eq('brand is missing');
        })
    });

    it('Validate the main url with brand but without locale', ()=>{
        cy.request({
            method: 'GET',
            url: "https://www.unibet.co.uk/kambi-rest-api/gameLauncher2.json?brand=unibet", failOnStatusCode: false,
            Headers:{
                "Content-Type":"application/json"
            }
        }).then((response) =>{
            expect(response.status).to.eq(400);
            expect(response.body.error.description).to.eq('locale is missing');
        })
    })
})