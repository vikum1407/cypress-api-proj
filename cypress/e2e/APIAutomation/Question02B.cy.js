/// <reference types = "Cypress" />

describe('Different URLs validations - Question 02 B', ()=>{

    const urls = [
        'https://www.unibet.co.uk/sportsbook-feeds/views/sports/a-z',
        'https://www.unibet.se/sportsbook-feeds/views/sports/a-z',
        'https://www.unibet.com/sportsbook-feeds/views/sports/a-z',
      ];

    it('Verify the mail Unibet URL', ()=>{

        cy.wrap(urls).each((durls) =>{
            cy.request({
                method: 'GET',
                url: durls,
            }).then((res) =>{
                expect(res.status).to.eq(200);
            })
        })
    });

    /**Using Fixtures for the different urls validations */
    it('Execute tests for different urls by using fixtures', () =>{
        
            cy.fixture('unibetURLs.json').then((diffURLs) =>{
                const urls = diffURLs.urls;

                cy.wrap(urls).each((unibetURL) =>{
                    cy.request({
                        method: 'GET',
                        url: unibetURL
                    }).then((response) =>{
                        expect(response.status).to.eq(200);
                })
            })
        })
    })

    it('Validate name field', ()=>{

        cy.wrap(urls).each((durls) =>{
            cy.request({
                method: 'GET',
                url: durls,
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
    
                // cy.wrap(sportNames).each((sportName) => {
                //     cy.wrap(sportName).should((name) => {
                //       expect(name).to.match(pattern);
                //     });
                //   });
    
                // cy.wrap(sportNames).each((sportName) => {
                //     // Validate each sport name using the regular expression pattern
                //     expect(sportName).to.match(pattern);
                //   });
    
            })
        })
    })

    it('boCount field validation', () =>{

        cy.wrap(urls).each((durls) =>{
            cy.request({
                method: 'GET',
                url: durls,
                Headers:{
                    "Content-Type":"application/json"
                }
            }).then((boRes) =>{
                const sportBoCount = boRes.body.layout.sections[1].widgets[0].sports.map((sport) => 
                sport.boCount);
    
                // cy.wrap(sportBoCount).each((bCount) =>{
                //     cy.wrap(bCount).should('be.gte', 0);
                // })
    
                sportBoCount.forEach(val => {
                    cy.wrap(val).should('be.gte', 0);
                });
                
            })
        })
    });

    it('IconURL validation', ()=>{

        cy.wrap(urls).each((durls) =>{
            cy.request({
                method: 'GET',
                url: durls,
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
})