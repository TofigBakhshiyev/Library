const chai = require('chai')
const except = chai.expect

const url = `http://localhost:8080`
const request = require('supertest')(url)

describe('GraphQL user', () => {
    
    it('Returns user with id', (done) => {
        request.post('/graphql')
        .send({ 
            query : `{ user(id: "5e5b96bcdeeda035740091a9"){name email age events{name topic time location}}}` 
        })
        .expect(200)
        .end((err, res) => {
            if(err) {
                return done(err)
            }  
            except(res.body.data.user).have.property('name')
            except(res.body.data.user).have.property('email')
            except(res.body.data.user).have.property('age')
            except(res.body.data.user).have.property('events')
            except(res.body.data.user.events[0]).have.property('name')
            except(res.body.data.user.events[0]).have.property('topic')
            except(res.body.data.user.events[0]).have.property('time')
            except(res.body.data.user.events[0]).have.property('location') 
            done();
        })
    })

    it('Returns all users', (done) => {
        request.post('/graphql')
        .send({ 
            query : `{ users{name email age} }` 
        })
        .expect(200) 
        .end((err, res) => { 
            if (err) return done(err); 
            except(res.body.data.users).lengthOf(2)
            done()
        })  
    })
})