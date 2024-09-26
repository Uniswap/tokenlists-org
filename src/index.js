import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import List from './pages/list'
import Home from './pages/home'
import Why from './pages/why'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
     <Router>
      <Routes> 
        <Route exact path="/" element={<Home />} />
        <Route path="/schemas" element={<List />} />
        <Route path="/why" element={<Why />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
