import React, { useState } from 'react'
// import { client } from '../network/apollo-client'
import PropTypes from 'prop-types'
// import { GET_TRANSACTIONS, UPDATE_TRANSACTION } from '../queries/queries'
import Button from '../reusableComponents/Button'
import Input from '../reusableComponents/Input'
import styled from '@emotion/styled'

const Modal = styled.section`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

  .modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 40%; /* Could be more or less, depending on screen size */
  min-width: 400px;
  border-radius: 15px;
}

.close {
  float: right;
}
`

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
`
const DetailDisplay = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
`

const UpdateModal = ({ closeModal, data, deleteTransaction }) => {
  const [editing, setEditing] = useState(false)
  // const updateTransaction = async () => {
  //   await client.mutate({
  //     variables: {
  //       transaction: {
  //         // id: Id,
  //         // user_id: userId,
  //         // merchant_id: merchantId,
  //         // debit: transactionType === 'debit',
  //         // credit: transactionType === 'credit',
  //         // amount: parseNumber(amount),
  //         // description: description
  //       }
  //     },
  //     mutation: UPDATE_TRANSACTION,
  //     refetchQueries: [{ query: GET_TRANSACTIONS }]
  //   })
  // }
  console.log(data)
  return (
    <Modal>
      <section className='modal-content'>
        {editing ? (
          <EditForm>
            <label htmlFor='description'>Amount</label>
            <Input name='amount' placeholder='amount' type='number' value={data.amount} />
            <label htmlFor='description'>Description</label>
            <Input name='description' placeholder='description' type='text' value={data.description} />
          </EditForm>
        ) : (
          <DetailDisplay>
            <label htmlFor='description'>Amount</label>
            <p>{data.amount}</p>
            <label htmlFor='description'>Description</label>
            <p>{data.description}</p>
          </DetailDisplay>
        )}
        <Button callBack={closeModal} label='close' />
        <Button callBack={() => deleteTransaction(data.id)} label='delete' />
        {editing ? (
          <Button callBack={() => setEditing(false)} label='Cancel Edit' />
        ) : (
          <Button callBack={() => setEditing(true)} label='Edit' />
        )}
      </section>
    </Modal>
  )
}

UpdateModal.defaultProps = {
  closeModal: () => console.log('close modal'),
  data: {},
  deleteTransaction: () => console.log('delete transaction')
}

UpdateModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  deleteTransaction: PropTypes.func
}

export default UpdateModal
