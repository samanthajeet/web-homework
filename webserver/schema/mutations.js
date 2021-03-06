const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')

const TransactionInputType = new GraphQLInputObjectType({
  name: 'TransactionInput',
  fields: () => ({
    id: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLFloat }
  })
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat },
        category: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount, category }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount, category })).save()
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        transaction: { type: TransactionInputType }
      },
      resolve(parentVal, { transaction }) {
        return Transactions.update(transaction)
      }
    },
    // attempt at writing delete mutation
    deleteTransaction: {
      type: TransactionType,
      args: {
        transactionId: { type: GraphQLString }
      },
      resolve (parentVal, { transactionId }) {
        return Transactions.deleteOne(transactionId)
      }
    }
  }
})

module.exports = mutation
