import React, { useState } from 'react'
import { GET_TRANSACTIONS } from '../queries/queries'
// import { client } from '../network/apollo-client'
import { Query } from 'react-apollo'
import styled from '@emotion/styled'
import AddTransaction from './AddTransaction'
import TransactionRow from '../reusableComponents/TransactionRow'
import Message from '../reusableComponents/Message'
// import { Doughnut } from 'react-chartjs-2'

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
  const [ messageInfo, setMessageInfo ] = useState({ show: false, message: '', gif: '' })

  return (
    <Query query={GET_TRANSACTIONS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Relax, it is worth the wait...</p>
        if (error) return <p>Looks like we have a problem...</p>
        return (
          <TransactionDashboard>
            <LeftTransactionContainer>
              <AddTransaction setMessageInfo={setMessageInfo} />
              {messageInfo.show && (
                <Message gif={messageInfo.gif} message={messageInfo.message} />
              )}
            </LeftTransactionContainer>
            <TransactionDisplay>
              {data.transactions.map(element => <TransactionRow data={element} key={element.id} />).reverse()}
            </TransactionDisplay>
          </TransactionDashboard>
        )
      }}
    </Query>
  )
}
