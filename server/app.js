const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/schema') 
require('./db/mongoose')

const app = express()
const port = process.env.PORT  

// allow cross-origin requests
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}))

app.get('/', (req, res) => {
    res.redirect('http://localhost:3000'); 
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); 
    console.log(`Server is running on http://localhost:${port}/graphql`);  
})