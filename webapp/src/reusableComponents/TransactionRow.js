import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { client } from '../network/apollo-client'
import { DELETE_TRANSACTION, GET_TRANSACTIONS } from '../queries/queries'
import UpdateModal from '../transactions/UpdateModal'
import Button from './Button'
import styled from '@emotion/styled'

const credit = '#a4e374'
const debit = '#e37474'

const TransactionItem = styled.article`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  border-radius: 15px;
  padding: 5px;
  margin: 5px;
  box-shadow: 0 1px 10px rgba(0,0,0,0.1);

  .credit {
    color: ${credit};
  }

  .debit {
    color: ${debit}
  }

  :hover {
    cursor: pointer
  }
`
const TransactionDetail = styled.section`
  display: flex;
  justify-content: flex-start;
  width: 25%;
`

const TransactionType = styled.section`
  display: flex;
  justify-content: center;
  width: 10%;
  font-size: 1.5em;
`

const TransactionAmount = styled.div`
  width: 20%;
`
const TransactionRow = ({ data, setTransactions }) => {
  const [showModal, setShowModal] = useState(false)

  const deleteTransaction = async (id) => {
    await client.mutate({
      variables: {
        transactionId: id
      },
      mutation: DELETE_TRANSACTION,
      refetchQueries: [{ query: GET_TRANSACTIONS }]
    })
    setShowModal(false)
  }
  return (
    <TransactionItem>
      <TransactionType className={`${data.credit ? 'credit' : 'debit'}`}>{data.credit ? '+' : '-'}</TransactionType>
      <TransactionDetail>{data.description}</TransactionDetail>
      <TransactionAmount className={`${data.credit ? 'credit' : 'debit'}`}>${data.amount}</TransactionAmount>
      <Button callBack={() => setShowModal(true)} label='update' />
      {showModal && (
        <UpdateModal closeModal={() => setShowModal(false)} data={data} deleteTransaction={deleteTransaction} />
      )}
    </TransactionItem>
  )
}

TransactionRow.defaultProps = {
  data: {}
}

TransactionRow.propTypes = {
  data: PropTypes.object,
  setTransactions: PropTypes.func.isRequired
}

export default TransactionRow
