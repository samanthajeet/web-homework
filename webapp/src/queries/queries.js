import gql from 'graphql-tag'

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
const UPDATE_TRANSACTION = gql`
mutation UpdateTransaction($transaction: TransactionInput!) {
  updateTransaction(transaction: $transaction) {
    id
    description
    amount
    merchant_id
    credit
    debit
  }
}
`

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: String) {
    deleteTransaction(transactionId: $transactionId) {
      id
    }
  }
`
export { GET_TRANSACTIONS, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION }
