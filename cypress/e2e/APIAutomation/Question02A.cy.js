/// <reference types = "Cypress" />

describe('Kindred API Automation - Question 02 A', ()=>{

    let sportsBookurl = "https://www.unibet.co.uk/sportsbook-feeds/views/sports/a-z";

    it('Verify the mail Unibet URL', ()=>{
        cy.request({
            method: 'GET',
            url: sportsBookurl,
            Headers:{
                "Content-Type":"application/json"
            }
        }).then((res) =>{
            expect(res.status).to.eq(200);
        })
    });

    it('Validate name field', ()=>{
        cy.request({
            method: 'GET',
            url: sportsBookurl,
            Headers:{
                "Content-Type":"application/json"
            }
        }).then((res) =>{
            const sportNames = res.body.layout.sections[1].widgets[0].sports.map((sport) => 
            sport.name);

            const pattern = /^[A-Za-z0-9\s]+$/;

            cy.wrap(sportNames).each((sportName) => {
                cy.wrap(sportName).should('match', pattern);
              });
        })
    })

    it('boCount field validation', () =>{

        cy.request({
            method: 'GET',
            url: sportsBookurl,
            Headers:{
                "Content-Type":"application/json"
            }
        }).then((boRes) =>{
            const sportBoCount = boRes.body.layout.sections[1].widgets[0].sports.map((sport) => 
            sport.boCount);

            sportBoCount.forEach(val => {
                cy.wrap(val).should('be.gte', 0);
            });
            
        })
    });

    it('IconURL validation', ()=>{

        cy.request({
            method: 'GET',
            url: sportsBookurl,
            Headers:{
                "Content-Type":"application/json"
            }
        }).then((iconURLRes) =>{
            const iconURL = iconURLRes.body.layout.sections[1].widgets[0].sports.map((sport) => 
            sport.iconUrl);

            cy.wrap(iconURL).each((iurl) =>{
                cy.request({
                    method: 'GET',
                    url: iurl,
                    failOnStatusCode: false,
                }).then((iconRes) =>{
                    expect(iconRes.status).to.eq(200);
                })
            })
        })
    })
})