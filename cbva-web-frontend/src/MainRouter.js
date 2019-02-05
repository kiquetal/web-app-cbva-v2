import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import  ListFirefighters from './firefighters/ListFirefighters';
import UserForm from './firefighters/AddFirefighters';
import TestDate from './firefighters/TestDate';
class MainRouter extends Component {
    render() {
        return (<div>
            <Switch>
                <Route exact path="/" component={ListFirefighters}/>
                <Route exact path="/add/firefighters" render={(props)=> <UserForm  {...props} user={imaginaryUser}/>}/>
                <Route exact path="/date" render={(props)=> <TestDate  {...props} />}/>

            </Switch>
        </div>)
    }
}

const imaginaryUser = {
    email: 'kiquetal@gmail.com',
    username: '',
    imaginaryThingId: {},
};


export default MainRouter