import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { client } from '../network/apollo-client'
import styled from '@emotion/styled'
import TransactionCards from './TransactionCards'
import AddTransaction from './AddTransaction'
// import { Doughnut } from 'react-chartjs-2'

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

const TransactionDisplay = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Transactions = () => {
  const getTransactions = async () => {
    let response = await client.query({
      query: GET_TRANSACTIONS
    })
    let filteredTransactions = response.data.transactions.filter(element => element.amount).reverse()
    setTransactions(filteredTransactions)
  }

  const [ transactions, setTransactions ] = useState([])
  const [ showAddTransaction, setShowAddTransaction ] = useState(false)

  useEffect(() => {
    if (!transactions.length) {
      getTransactions()
    }
  }, [transactions])
  console.log(transactions)
  return (
    <TransactionDisplay>
      { showAddTransaction ? (
        <AddTransaction getTransactions={getTransactions} setShowAddTransaction={setShowAddTransaction} />
      ) : (
        <button onClick={() => setShowAddTransaction(true)}>Add Transaction</button>
      )
      }
      <TransactionCards data={transactions} />
    </TransactionDisplay>
  )
}
