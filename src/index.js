import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import List from './pages/list'
import Home from './pages/home'
import Why from './pages/why'
import * as serviceWorker from './serviceWorker'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff027a',
      darker: '#E039DD',
    },
    secondary: {
      main: '#48E500',
    },
    error: {
      main: '#F8110E',
      darker: '#c62828',
    },
    warning: {
      main: '#F7D900',
    },
    success: {
      main: '#48E500',
    }
  },
});

export const useStyles = makeStyles((theme) => ({
  warning: {
    color: theme.palette.warning.main
  },
  error: {
    color: theme.palette.error.main
  },
  success: {
    color: theme.palette.error.success
  }
}));


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/token-list" component={List} />
        <Route path="/why" component={Why} />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
