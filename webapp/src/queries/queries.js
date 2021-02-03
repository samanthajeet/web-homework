import gql from 'graphql-tag'

const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
      credit
      debit
      description
      category
    }
  }
`

const ADD_TRANSACTION = gql`
  mutation AddTransaction($amount: Float, $credit: Boolean, $debit: Boolean, $description: String, $category: String) {
    addTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, category: $category) {
      id
      amount
      credit
      debit
      description
      category
    }
  }
`
const UPDATE_TRANSACTION = gql`
mutation UpdateTransaction($transaction: transaction) {
  updateTransaction(transaction: $transaction) {
    id
    description
    amount
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
