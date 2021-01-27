import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from '@emotion/styled'
// import { css } from '@emotion/core'
import { Home } from './home'
import { Transactions } from './transactions/Transactions'

const Nav = styled.nav`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
  font-size: 1.25em;
  padding: 1em;
  
  ul {
    display: flex;
  }

  li {
    margin-right: 1em;
    list-style-type: none;
  }
  a:link {
  text-decoration: none;
}
`

function AppRouter () {
  return (
    <Router>
      <Nav>
        <ul >
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/Transactions'>Transactions</Link>
          </li>
        </ul>
      </Nav>
      <div className='main-content'>
        <Route component={Transactions} exact path='/transactions' />
        <Route component={Home} exact path='/' />
        <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
      </div>
    </Router>
  )
}

export default AppRouter
