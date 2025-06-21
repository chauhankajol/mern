import React from 'react'
import Header from './components/header/Header'
import Pages from'./components/mainpages/Pages'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './Globalstate'
const App = () => {
  return (
    <DataProvider>
    <Router>
    <div className='App'><Header/>
    <Pages/>
    </div>
    </Router>
    </DataProvider>

  )
}

export default App
