import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import List from './pages/list'
import Home from './pages/home'
import Why from './pages/why'
import * as serviceWorker from './serviceWorker'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff027a',
      darker: '#E039DD',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

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
