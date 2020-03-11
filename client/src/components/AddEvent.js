import React, { Component } from 'react';  
import { graphql } from 'react-apollo';  
import { compose } from 'recompose'
import { getUsersQuery, addEventMutation, getEventsQuery } from '../queries/queries'


class AddEvent extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            topic: '',
            time: '',
            location: '',
            userid: ''
        }
    } 
    displayUsers() {
        var data = this.props.getUsersQuery
        console.log(this.props)
        if (data.loading) {
            return (<option>Loading Users...</option>)
        } else {
            return data.users.map(user => {
                return (
                    <option key={ user.id } value={ user.id }>{ user.name }</option>
                )
            })
        }
    }
    submitForm(e) {
        e.preventDefault()
        this.props.addEventMutation({
            variables: {
                name: this.state.name,
                topic: this.state.topic,
                time: this.state.time,
                location: this.state.location,
                userid: this.state.userid
            },
            refetchQueries: [{ query: getEventsQuery }]
        })
    } 
    render() { 
        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
                <div className="field">
                    <label>Event name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div> 
                <div className="field">
                    <label>Topic:</label>
                    <input type="text" onChange={ (e) => this.setState({ topic: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Time:</label>
                    <input type="text" onChange={ (e) => this.setState({ time: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Location:</label>
                    <input type="text" onChange={ (e) => this.setState({ location: e.target.value }) } />
                </div>

                <div className="field">
                    <label>User:</label>
                    <select onChange={ (e) => this.setState({ userid: e.target.value }) }>
                        <option>Select user</option>
                        { this.displayUsers() }
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
} 

export default compose(
    graphql(getUsersQuery, { name: "getUsersQuery" }),
    graphql(addEventMutation, { name: "addEventMutation" })
)(AddEvent);