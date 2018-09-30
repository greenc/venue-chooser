import React, { Component } from 'react';
import { mapUserPrefsToVenues, getSuggestions } from './app.helpers';
import UserForm from './components/UserForm';
import Suggestions from './components/Suggestions';
import './App.css';

import data from './data.json';

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            selected: [],
            suggestions: {
                suitable: [],
                unsuitable: []
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { users, venues } = data;
        const mappedVenues = mapUserPrefsToVenues(venues, users);
        this.setState({ users, mappedVenues});
    }

    handleChange(e) {
        const selected = [...e.target.selectedOptions].map(o => o.value);
        const suggestions = getSuggestions(this.state.mappedVenues, selected);
        this.setState({ selected, suggestions });
    }

    render() {
        const { state: { users, selected, suggestions }, handleChange } = this;
        return (
            <div className="App">
                <header>
                    <h1>Timeout Venue Chooser</h1>
                </header>
                <div className="container">
                    <UserForm
                        users={users.map(user => user.name)}
                        selected={selected}
                        handleChange={handleChange} />

                    <Suggestions suggestions={suggestions} />
                </div>
            </div>
        );
    }
}

export default App;
