import React from 'react';
import { render } from 'react-dom';

import UserForm from './firefighters/AddFirefighters';
import ListFirefighters from './firefighters/ListFirefighters'
import './bootstrap-min.css';
const imaginaryUser = {
    email: '',
    username: '',
    imaginaryThingId: null,
};

const App = () => (
    <div className="App">
        <UserForm user={imaginaryUser} />
        <p>
            <ListFirefighters/>
        </p>
    </div>
);

render(<App />, document.getElementById('root'));