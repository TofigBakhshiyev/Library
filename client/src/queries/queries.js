import { gql } from 'apollo-boost'

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`
 
const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const getEventsQuery = gql`
    {
        events {
            id
            name
            topic
            time
            location
        }
    }
`

const getUsersQuery = gql`
    {
        users {
            name
            email
            age
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorid: ID!) {
        addBook(name: $name, genre: $genre, authorid:$authorid) {
            name
            id
        }
    }
`

const addEventMutation = gql`
    mutation($name: String!, $topic: String!, $time: String!, $location: String!, $userid: ID!) {
        addBook(name: $name, topic: $topic, time: $time, location: $location, user:$userid) {
            name
            id
        }
    }
`

const getBookQuery = gql`
    query($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

const getEventQuery = gql`
    query($id: ID) {
        event(id: $id) {
            id
            name
            topic
            time
            location
            user {
                id
                name
                email
                age
                events {
                    name
                    id
                }
            }
        }
    }
`

export{ getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery,getEventsQuery, getUsersQuery, getEventQuery, addEventMutation }