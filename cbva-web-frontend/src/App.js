import React, { Component } from 'react';
import './App.css';
import MainRouter from   './MainRouter'
import {BrowserRouter} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {indigo, pink} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757de8',
            main: '#3f51b5',
            dark: '#002984',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000',
        },
        openTitle: indigo['400'],
        protectedTitle: pink['400'],
        type: 'light'
    }
})
class App extends Component {
  render() {
    return (
        <BrowserRouter>
         <MuiThemeProvider theme={theme}>
            <MainRouter/>
         </MuiThemeProvider>
        </BrowserRouter>
    );
  }
}

export default App;
