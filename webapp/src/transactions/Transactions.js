import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { client } from '../network/apollo-client'
import styled from '@emotion/styled'
import AddTransaction from './AddTransaction'
import TransactionRow from '../reusableComponents/TransactionRow'
import Message from '../reusableComponents/Message'
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
const TransactionDashboard = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 95vw;
`

const LeftTransactionContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const TransactionDisplay = styled.section`
    width: 50%;
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
  const [ messageInfo, setMessageInfo ] = useState({ show: false, message: '', gif: '' })

  useEffect(() => {
    if (!transactions.length) {
      getTransactions()
    }
  }, [transactions])

  const transactionRows = transactions.map((element, i) => <TransactionRow data={element} key={element.id} />)
  return (
    <TransactionDashboard>
      <LeftTransactionContainer>
        <AddTransaction getTransactions={getTransactions} setMessageInfo={setMessageInfo} />
        {messageInfo.show && (
          <Message gif={messageInfo.gif} message={messageInfo.message} />
        )}
      </LeftTransactionContainer>
      <TransactionDisplay>
        {transactionRows}
      </TransactionDisplay>
    </TransactionDashboard>
  )
}
