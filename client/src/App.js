import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks' 
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'; 


// Components 
import BookList from './components/Booklist'
import AddBook from './components/AddBook'
import AddEvent from './components/AddEvent'
import EventList from './components/Eventlist' 
import AppBar from './components/Appbar'
import Mapss from './components/Map'

// Apollo client configuration
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

const client = new ApolloClient({
  cache,
  link
});


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <Route path="/about" >
            <ApolloProvider client={client}> 
              <div id="nav">
              <AppBar/>
              </div>
              <div id="main">  
                <h1>About The Library</h1> 
                <div id="about_main">
                  <div id="about">This is virtual Library</div> 
                  {/* <div id="maps"><Mapss/></div> */}
                </div>  
              </div>
            </ApolloProvider>
          </Route>

          <Route  path="/maps/:location" component={Mapss} />
          
          <Route exact path="/book" >
            <ApolloProvider client={client}> 
              <div id="nav">
              <AppBar/>
              </div>
              <div id="main">  
                <h1>Library' books</h1>  
                <BookList/> 
              </div>
            </ApolloProvider>
          </Route>
          
          <Route path="/event">
            <ApolloProvider client={client}>  
              <div id="nav">
                <AppBar/>
              </div>
              <div id="main">  
                <h1>Library's events</h1> 
                <EventList />
              </div> 
            </ApolloProvider>
          </Route>

          <Route path="/add">
            <ApolloProvider client={client}>  
              <div id="nav">
                <AppBar/>
              </div> 
              <div id="main"><h1>Add</h1></div>
              <div id="about_main"> 
                <div id="about"><AddBook/></div>
                {/* <div id="maps"><AddEvent/></div>  */}
              </div> 
            </ApolloProvider>
          </Route>
        
        </Switch>
      </Router> 
    );
  }
}

export default App;
