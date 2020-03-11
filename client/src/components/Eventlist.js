import React, { Component } from 'react'; 
import { graphql } from 'react-apollo'; 
import { getEventsQuery } from '../queries/queries' 

// Components 
import EventDetails from './EventDetails' 

class Eventlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }
    displayEvents() {
        var data = this.props.data
        if (data.loading) {
            return (<div>Loading events...</div>)
        } else {
            return data.events.map(event => {
                return (
                    <li key={ event.id } onClick={ (e) => { this.setState({ selected: event.id }) } }>
                    Event Name: { event.name }</li>
                )
            })
        }
    }
    render() { 
        return (
        <div id="main"> 
            <ul id="book-list">
                { this.displayEvents() } 
            </ul> 
            <div><EventDetails eventid={ this.state.selected } /></div> 
        </div>
        );
    }
}

export default graphql(getEventsQuery)(Eventlist);
