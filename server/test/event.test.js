const chai = require('chai')
const except = chai.expect

const url = `http://localhost:8080`
const request = require('supertest')(url)

describe('GraphQL event', () => {
    
    it('Returns event with id', (done) => {
        request.post('/graphql')
        .send({ 
            query : `{ event(id: "5e5b9744deeda035740091aa"){name topic time location user{name email age}}}` 
        })
        .expect(200)
        .end((err, res) => {
            if(err) {
                return done(err)
            }  
            except(res.body.data.event).have.property('name')
            except(res.body.data.event).have.property('topic')
            except(res.body.data.event).have.property('time')
            except(res.body.data.event).have.property('location')
            except(res.body.data.event).have.property('user')
            except(res.body.data.event.user).have.property('name')
            except(res.body.data.event.user).have.property('email')
            except(res.body.data.event.user).have.property('age') 
            done();
        })
    })

    it('Returns all events', (done) => {
        request.post('/graphql')
        .send({ 
            query : `{ events{name topic location} }` 
        })
        .expect(200) 
        .end((err, res) => { 
            if (err) return done(err); 
            except(res.body.data.events).lengthOf(2)
            done()
        })  
    })
})