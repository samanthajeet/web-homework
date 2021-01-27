import React from 'react'
import PropTypes from 'prop-types'
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
  max-width: 500px;
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

`
const TransactionDetail = styled.section`
  display: flex;
  justify-content: flex-start;
  width: 25%;
`

const TransactionType = styled.section`
  display: flex;
  justify-content: center;
  width: 15%;
  font-size: 1.5em;
`

const TransactionRow = ({ data }) => {
  return (
    <TransactionItem>
      <TransactionType className={`${data.credit ? 'credit' : 'debit'}`}>{data.credit ? '+' : '-'}</TransactionType>
      <TransactionDetail>{data.description}</TransactionDetail>
      <TransactionDetail className={`${data.credit ? 'credit' : 'debit'}`}>${data.amount}</TransactionDetail>
    </TransactionItem>
  )
}

TransactionRow.defaultProps = {
  data: {}
}

TransactionRow.propTypes = {
  data: PropTypes.object
}

export default TransactionRow
