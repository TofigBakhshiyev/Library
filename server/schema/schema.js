const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const Event = require('../models/event')
const User = require('../models/user')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql

// example data
/* var books = [
    { name: 'Wind', genre: 'SciFy', id: '1', authorid: '1' },
    { name: 'Rain', genre: 'Fiction', id: '2', authorid: '2' },
    { name: 'Wind and Rain', genre: 'Advanture', id: '3', authorid: '3' },
    { name: 'Flag', genre: 'SciFy', id: '4', authorid: '2' },
    { name: 'Mars', genre: 'Fiction', id: '5', authorid: '1' },
    { name: 'NYC', genre: 'Advanture', id: '6', authorid: '3' }
]

var authors = [
    { name: 'Pat', age: 30, id: '1' },
    { name: 'Fat', age: 28, id: '2' },
    { name: 'Wat', age: 25, id: '3' }
] */

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                //console.log(parent)
                //return _.find(authors, { id: parent.authorid })
                return Author.findById(parent.authorid)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, { authorid: parent.id })
                return Book.find({ authorid: parent.id })
            }
        }
    })
})

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        time: { type:GraphQLString },
        topic: { type: GraphQLString },
        location: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                //console.log(parent)
                //return _.find(authors, { id: parent.authorid })
                return User.findById(parent.userid)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                //return _.filter(books, { authorid: parent.id })
                return Event.find({ userid: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db / other source
                //return _.find(books, { id:args.id })    
                return Book.findById(args.id)

            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                //return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books 
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //return authors
                return Author.find({})
            }
        },
        // Event and user
        event: {
            type: EventType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db / other source
                //return _.find(books, { id:args.id })    
                return Event.findById(args.id)

            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                //return _.find(authors, { id: args.id })
                return User.findById(args.id)
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                //return books 
                return Event.find({})
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                //return authors
                return User.find({})
            }
        }
    })
})

// for adding new data
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorid: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                })
                return book.save()
            }
        },
        // Event and user
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                return user.save()
            }
        },
        addEvent: {
            type: EventType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                topic: { type: new GraphQLNonNull(GraphQLString) },
                time: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                userid: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let event = new Event({
                    name: args.name,
                    topic: args.topic,
                    time: args.time,
                    location: args.location,
                    userid: args.userid
                })
                return event.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})