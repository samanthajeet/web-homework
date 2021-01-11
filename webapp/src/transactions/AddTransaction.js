import React, { useState } from 'react'
import gql from 'graphql-tag'
import { client } from '../network/apollo-client'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const accentColor = '#FF326F'

const TransactionForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  min-height: 20rem;
  width: 30rem;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 1px rgba(0,0,0,0.15), 
              0 2px 2px rgba(0,0,0,0.15), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.15);

  button {
    padding: .5rem;
    margin-right: .5rem;
    border-radius: 15px;
    border: none;
    min-width: 6rem;
  }
  
  button:hover {
    cursor: pointer;
  }

  input {
    border: none;
    border-bottom: 2px solid black;
    width: 100%;
    height: 3rem;
    font-size: 2rem;
  }

  .selected {
    background: ${accentColor};
    color: white;
  }
  .transactionType:hover {
    background: ${accentColor};
    color: white;
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

const AddTransaction = ({ getTransactions, setShowAddTransaction }) => {
  const addTransaction = async (variables) => {
    let response = await client.mutate({
      variables,
      mutation: ADD_TRANSACTION
    })
    if (!response.data.addTransaction) {
      console.log('Something went wrong! sad face')
      return
    }
    setShowAddTransaction(false)
    getTransactions()
  }

  const [body, setBody] = useState({ amount: 0, credit: false, debit: true, description: '' })

  const handleChange = (e) => {
    const { value, name, type } = e.target
    if (type === 'radio') {
      setBody({ ...body, [name]: value === 'on' })
      return
    }
    if (type === 'number') {
      setBody({ ...body, [name]: +value })
      return
    }
    setBody({ ...body, [name]: value })
  }

  const cancelForm = () => {
    setBody({})
    setShowAddTransaction()
  }

  return (
    <TransactionForm
      onSubmit={e => {
        e.preventDefault()
        addTransaction(body)
      }}
    >
      <section>
        <button
          className={`transactionType ${body.debit ? 'selected' : ''}`}
          onClick={() => setBody({ ...body, debit: true, credit: false })}
        >
          Expense
        </button>
        <button
          className={` transactionType ${body.credit ? 'selected' : ''}`}
          onClick={() => setBody({ ...body, debit: false, credit: true })}
        >
          Income
        </button>
      </section>
      <label htmlFor='amount'>Amount</label>
      <input id='amount' name='amount' onChange={handleChange} step='0.01' type='number' />
      <label htmlFor='description'>Description</label>
      <input id='description' name='description' onChange={handleChange} />
      <button type='submit'>add</button>
      <button onClick={cancelForm}>cancel</button>
    </TransactionForm>
  )
}

AddTransaction.defaultProps = {
  getTransactions: () => console.log('do something'),
  setShowAddTransaction: () => console.log('close the thing')
}

AddTransaction.propTypes = {
  getTransactions: PropTypes.func,
  setShowAddTransaction: PropTypes.func
}

export default AddTransaction
