import React, { Component } from 'react'; 
import { graphql } from 'react-apollo'; 
import { getEventQuery } from '../queries/queries' 


class EventDetails extends Component {  
    displayEventDetails() {
        const { event } = this.props.data  
        if(event) {   
            return (
                <div>
                    <h2>{ event.name }</h2>
                    <p>Topic: { event.topic }</p>
                    <p>Time: { event.time }</p>
                    <p>Location: { event.location } <a href={`http://localhost:3000/maps/${ event.location }`}> - show </a></p> 
                    <p>User: { event.user.name }</p> 
                    <p>All events by this user</p>
                    <ul className="other-books">
                        {
                            event.user.events.map(item => {
                            return <ul key={ item.id }>{ item.name }</ul>
                            })
                        }
                    </ul>  
                    <div className='sidebarStyle'>
                        <div id="map" />
                    </div>  
                </div>
            )
        } else {
            return (
                <div>No Event selected...</div>
            )
        }  
    }
    render() {  
        return (
        <div id="book-details"> 
            <p>Event details</p>
            { this.displayEventDetails() } 
        </div>
        )
    }
}

export default graphql(getEventQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.eventid
            }
        }
    }
})(EventDetails)