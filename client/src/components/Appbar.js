import React, { Component } from 'react'; 
import {AppBar, Tabs, Tab} from '@material-ui/core' 
  

class Nav extends Component {
    render() {
      return (
        <AppBar title="My App" style={{ background: '#425948' }}>
          <Tabs> 
            <Tab label="About" /* target="_blank" */ href="http://localhost:3000/about" /> 
            <Tab label="Library" href="http://localhost:3000/book" />
            <Tab label="Events" /* target="_blank" */ href="http://localhost:3000/event" />  
            <Tab label="Add" /* target="_blank" */ href="http://localhost:3000/add" /> 
          </Tabs>
        </AppBar>
      )
    }
}

export default Nav