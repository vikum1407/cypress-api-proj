/// <reference types = "Cypress" />

describe('Kindred API Automation - Question 01', ()=>{

    let kambiURL = "https://www.unibet.co.uk/kambi-rest-api/gameLauncher2.json?brand=unibet&locale=en_GB"

    it('UNIBET', ()=>{
        cy.request({
            method: 'GET',
            url: kambiURL,
            Headers:{
                "Content-Type":"application/json"
            }
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body.lang).to.eq('en_GB');
        })
    });

    it('UNIBET-2', ()=>{
        cy.request({
            method: 'GET',
            url: kambiURL,
            headers:{
                "Content-Type":"application/json"
            }
        }).then((response) =>{
            const kambiClientUrl = response.body.kambiClientApiUrl;
            cy.request({
                method: 'GET',
                url: kambiClientUrl      
            }).then((kamResponse) =>{
                expect(response.status).to.eq(200);
            })
        })
    })
})