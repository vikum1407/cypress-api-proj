/// <reference types = "Cypress" />

describe('Different URLs validations - Question 02 B', ()=>{

    const urls = [
        'https://www.unibet.co.uk/sportsbook-feeds/views/sports/a-z',
        'https://www.unibet.se/sportsbook-feeds/views/sports/a-z',
        'https://www.unibet.com/sportsbook-feeds/views/sports/a-z',
      ];

    it('Verify the main Unibet URL', ()=>{

        cy.wrap(urls).each((durls) =>{
            cy.request({
                method: 'GET',
                url: durls,
            }).then((res) =>{
                expect(res.status).to.eq(200);
            })
        })
    });

    it('Validate multiple domains', () =>{
        
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

    it('Validate name field for multiple domains', ()=>{

        cy.fixture('unibetURLs.json').then((diffURLs) =>{
            const urls = diffURLs.urls;

            cy.wrap(urls).each((unibetURL) =>{
                cy.request({
                    method: 'GET',
                    url: unibetURL,
                }).then((res) =>{
                    const sportNames = res.body.layout.sections[1].widgets[0].sports.map((sport) => 
                    sport.name);
        
                    const pattern = /^[A-Za-z0-9\s]+$/;

                    cy.wrap(sportNames).each((sportName) => {
                        cy.wrap(sportName).should('match', pattern);
                    });    
                })
            })
        })
    })

    it('Validate boCount field for multiple domains', () =>{

        cy.fixture('unibetURLs.json').then((diffURLs) =>{
            const urls = diffURLs.urls;

            cy.wrap(urls).each((unibetURL) =>{
                cy.request({
                    method: 'GET',
                    url: unibetURL,
                }).then((boRes) =>{
                    const sportBoCount = boRes.body.layout.sections[1].widgets[0].sports.map((sport) => 
                    sport.boCount);
        
                    sportBoCount.forEach(val => {
                        cy.wrap(val).should('be.gte', 0);
                    });
                    
                })
            })
        })
    });

    it('Validate IconURL field for multiple domains', ()=>{

        cy.fixture('unibetURLs.json').then((diffURLs) =>{
            const urls = diffURLs.urls;

            cy.wrap(urls).each((unibetURL) =>{
                cy.request({
                    method: 'GET',
                    url: unibetURL,
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
})