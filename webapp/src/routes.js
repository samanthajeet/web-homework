import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from '@emotion/styled'
// import { css } from '@emotion/core'
import { Home } from './home'
import { Transactions } from './transactions/Transactions'
import UserSettings from './userSettings/UserSettings'

const Nav = styled.nav`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
  font-size: 1.25em;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  
  ul {
    display: flex;
  }

  li {
    margin-right: 1em;
    list-style-type: none;
  }
`

const Pages = styled.section`
  a:visited {
    color: black;
  }
  a:hover {
    background: -webkit-linear-gradient(217deg,#f72585, #480ca8, #4895ef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  a:link {
  text-decoration: none;
  }

`

function AppRouter () {
  return (
    <Router>
      <Nav>
        <Pages>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/Transactions'>Transactions</Link>
            </li>
          </ul>
        </Pages>
        <section>
          <UserSettings />
        </section>
      </Nav>
      <div className='main-content'>
        <Route component={Transactions} exact path='/transactions' />
        <Route component={Home} exact path='/' />
      </div>
    </Router>
  )
}

export default AppRouter
