import React, { useState } from 'react'
import gql from 'graphql-tag'
import { client } from '../network/apollo-client'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Button from '../reusableComponents/Button'
import Input from '../reusableComponents/Input'

const accentColor = '#FF326F'

const TransactionForm = styled.form`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 20rem;
  width: 75%;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 10px rgba(0,0,0,0.1);

  .selected {
      background-color: ${accentColor};
      color: white;
      border: 1px solid ${accentColor}
    }
  
  .transaction-type:hover {
    background-color: ${accentColor};
    border: 1px solid ${accentColor}
  }
`

const TransactionButtonsContainer = styled.section`
display: flex;
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

const AddTransaction = ({ getTransactions, setMessageInfo, setShowAddTransaction }) => {
  const addTransaction = async (variables) => {
    let response = await client.mutate({
      variables,
      mutation: ADD_TRANSACTION
    })
    if (!response.data.addTransaction) {
      console.log('Something went wrong! sad face')
      return
    }
    setMessageInfo({
      gif: 'https://media.giphy.com/media/hkiLcRr7zoPe0/giphy.gif',
      message: 'I done messed up and you need to refersh the page to get the most recent transaction',
      show: true
    })
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
    setBody({ amount: 0, credit: false, debit: true, description: '' })
  }

  return (
    <TransactionForm
      onSubmit={e => {
        e.preventDefault()
        addTransaction(body)
      }}
    >
      <section>
        <Button
          callBack={() => setBody({ ...body, debit: true, credit: false })}
          customStyle='transaction-type'
          label='Expense'
          selected={`${body.debit ? 'selected' : ''}`}
        />
        <Button
          callBack={() => setBody({ ...body, debit: false, credit: true })}
          customStyle='transaction-type'
          label='Income'
          selected={`${body.credit ? 'selected' : ''}`}
        />
      </section>
      <label htmlFor='amount'>Amount</label>
      <Input callBack={handleChange} name='amount' placeholder='amount' type='number' value={body.amount} />
      <label htmlFor='description'>Description</label>
      <Input callBack={handleChange} name='description' placeholder='description' type='text' value={body.description} />
      <TransactionButtonsContainer>
        <Button callBack={cancelForm} label='cancel' />
        <Button label='add' type='submit' />
      </TransactionButtonsContainer>
    </TransactionForm>
  )
}

AddTransaction.defaultProps = {
  getTransactions: () => console.log('do something'),
  setMessageInfo: () => console.log('message!'),
  setShowAddTransaction: () => console.log('close the thing')
}

AddTransaction.propTypes = {
  getTransactions: PropTypes.func,
  setMessageInfo: PropTypes.func,
  setShowAddTransaction: PropTypes.func
}

export default AddTransaction
