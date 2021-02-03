import React, { useState } from 'react'
import { client } from '../network/apollo-client'
import { ADD_TRANSACTION, GET_TRANSACTIONS } from '../queries/queries'
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
  min-height: 25rem;
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
const TransactionType = styled.section`
  margin-bottom: 1em;
`

const TransactionButtonsContainer = styled.section`
  display: flex;
  margin-top: 1em;
`

const CategorySelect = styled.section`
  display: flex;
  flex-direction: column;
    align-items: center;
    min-height: 7em;
    justify-content: space-evenly;
  select {
    padding: 1em;
    border-radius: 15px;
  }
`

const AddTransaction = () => {
  const categories = ['Clothing', 'Food', 'Housing', 'Medicla/Health Care', 'Personal', 'Subscriptions', 'Transportation', 'Utilities']
  const [body, setBody] = useState({ amount: 0, credit: false, debit: true, description: '', category: null })
  const addTransaction = async (variables) => {
    await client.mutate({
      variables,
      mutation: ADD_TRANSACTION,
      refetchQueries: [{ query: GET_TRANSACTIONS }]
    })
    setBody({ amount: 0, credit: false, debit: true, description: '', category: null })
  }

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
    setBody({ amount: 0, credit: false, debit: true, description: '', category: null })
  }

  const selectCategoryOptions = categories.map(element => (
    <option key={element} value={element}>{element}</option>
  ))

  return (
    <TransactionForm
      onSubmit={e => {
        e.preventDefault()
        addTransaction(body)
      }}
    >
      <TransactionType>
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
      </TransactionType>
      <label htmlFor='amount'>Amount</label>
      <Input callBack={handleChange} name='amount' placeholder='amount' type='number' value={body.amount} />
      <label htmlFor='description'>Description</label>
      <Input callBack={handleChange} name='description' placeholder='description' type='text' value={body.description} />
      {body.debit && (
        <CategorySelect>
          <label htmlFor='description'>Category</label>
          <select id='categories' name='category' onBlur={handleChange} value={body.category} >
            <option value={null}>Select category</option>
            {selectCategoryOptions}
          </select>
        </CategorySelect>
      )}
      <TransactionButtonsContainer>
        <Button callBack={cancelForm} label='cancel' />
        <Button label='add' type='submit' />
      </TransactionButtonsContainer>
    </TransactionForm>
  )
}

export default AddTransaction
