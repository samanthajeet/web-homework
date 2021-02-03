import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { client } from './network/apollo-client'
import store from './ducks/store'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
