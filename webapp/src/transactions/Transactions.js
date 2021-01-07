import React, { useState } from 'react'
// import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { client } from '../network/apollo-client'

const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
      credit
      debit
      description
    }
  }
`
const ADD_TRANSACTION = gql`
  mutation AddTransaction($amount: Float, $credit: Boolean, $debit: Boolean, $description: String) {
    addTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description) {
      id
      amount
      credit
      debit
      description
    }
  }
`

const GetTransactions = async () => {
  let response = await client.query({
    query: GET_TRANSACTIONS
  })
  console.log(response.data)
}

const addTransaction = async ({ amount, credit, debit, description }) => {
  console.log('amount', amount)
  let data = await client.mutate({
    variables: { amount: 5, credit: false, debit: true, description: 'food' },
    mutation: ADD_TRANSACTION
  })
  console.log('data', data)
  GetTransactions()
}
export const Transactions = (props) => {
  GetTransactions()
  const [body, setBody] = useState({})
  const handleChange = (e) => {
    const { value, name } = e.target
    setBody({ ...body, [name]: value })
  }
  let input
  return (
    <div>
      <h1>hello</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          addTransaction(body)
        }}
      >
        <input name='amount' onChange={handleChange} />
        <input name='credit' onChange={handleChange} />
        <input name='debit' onChange={handleChange} />
        <input name='description' onChange={handleChange} />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}
