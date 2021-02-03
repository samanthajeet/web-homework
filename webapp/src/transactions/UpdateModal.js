import React, { useState } from 'react'
import { client } from '../network/apollo-client'
import PropTypes from 'prop-types'
import { GET_TRANSACTIONS, UPDATE_TRANSACTION } from '../queries/queries'
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

.edit-btns {
    margin-bottom: .5em;
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
  const [updateBody, setUpdateBody] = useState({ amount: data.amount, description: data.description })
  const handleChange = (e) => {
    const { value, name, type } = e.target
    if (type === 'number') {
      setUpdateBody({ ...updateBody, [name]: +value })
      return
    }
    setUpdateBody({ ...updateBody, [name]: value })
  }
  const updateTransaction = async () => {
    await client.mutate({
      variables: {
        transaction: {
          id: data.id,
          amount: updateBody.amount,
          description: updateBody.description
        }
      },
      mutation: UPDATE_TRANSACTION,
      refetchQueries: [{ query: GET_TRANSACTIONS }]
    })
  }

  return (
    <Modal>
      <section className='modal-content'>
        {editing ? (
          <EditForm>
            <label htmlFor='description'>Amount</label>
            <Input callBack={handleChange} name='amount' placeholder='amount' type='number' value={updateBody.amount} />
            <label htmlFor='description'>Description</label>
            <Input callBack={handleChange} name='description' placeholder='description' type='text' value={updateBody.description} />
          </EditForm>
        ) : (
          <DetailDisplay>
            <label htmlFor='description'>Amount</label>
            <p>{data.amount}</p>
            <label htmlFor='description'>Description</label>
            <p>{data.description}</p>
          </DetailDisplay>
        )}
        {editing ? (
          <section className='edit-btns'>
            <Button callBack={() => setEditing(false)} label='Cancel Edit' />
            <Button callBack={updateTransaction} isDisabled label='Update' />
          </section>
        ) : (
          <Button callBack={() => setEditing(true)} label='Edit' />
        )}
        <Button callBack={closeModal} label='close' />
        <Button callBack={() => deleteTransaction(data.id)} label='delete' />
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
