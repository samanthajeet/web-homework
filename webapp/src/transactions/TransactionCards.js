import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const credit = '#0AFFA7'
const debit = '#FF326F'

const TableRowItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 6rem;
  width: 30rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  font-size: 2rem;
  box-shadow: 0 1px 1px rgba(0,0,0,0.15), 
              0 2px 2px rgba(0,0,0,0.15), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.15);
  
  .description {
    width: 50%;
  }
  .amount {
    width: 25%;
    border-radius: 0 10px 10px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .credit {
    background-color: ${credit};
  }

  .debit {
    background-color: ${debit};
  }

  section {
    padding: 1rem;
  }

`

const TransactionCards = ({ data }) => {
  let dataDisplay = data.map(element => (
    <TableRowItem key={element.id} >
      <section className='description'>
        {element.description}
      </section>
      <section className={`amount ${element.credit ? 'credit' : 'debit'}`}>
        ${element.amount}
      </section>
    </TableRowItem>
  ))
  return (
    <div>
      {dataDisplay}
    </div>
  )
}

TransactionCards.defaultProps = {
  data: []
}

TransactionCards.propTypes = {
  data: PropTypes.array
}

export default TransactionCards
