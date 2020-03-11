const mongoose = require('mongoose') 

// connection to MongoDB Atlas
MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((res) => {
    console.log('Connected to MongoDB Atlas database') 
}).catch((error) => {
    console.log("Error: ",error.name)
})
 