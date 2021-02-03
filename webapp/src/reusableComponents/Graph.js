import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Doughnut } from 'react-chartjs-2'

const GraphDisplay = styled.section`
    display: flex;
    align-items: center;
    margin-top: 1em;
`

const Graph = ({ data, title, type }) => {
  let graphData = {
    labels: ['Expense', 'Income'],
    datasets: [
      {
        backgroundColor: [
          '#e37474',
          '#a4e374'
        ],
        borderColor: 'white',
        borderWidth: 1,
        data: [50, 50]
      }
    ]
  }

  if (type === 'expense') {
    const expense = data.transactions.filter(element => element.debit).reduce((acc, curVal) => {
      acc += curVal.amount
      return acc
    }, 0)
    const income = data.transactions.filter(element => element.credit).reduce((acc, curVal) => {
      acc += curVal.amount
      return acc
    }, 0)
    graphData = {
      labels: ['Expense', 'Income'],
      datasets: [
        {
          backgroundColor: [
            '#e37474',
            '#a4e374'
          ],
          borderColor: 'white',
          borderWidth: 1,
          data: [expense, income]
        }
      ]
    }
  }

  if (type === 'category') {
    let backgroundColors = ['#606c38', '#ffb703', '#023047', '#560bad', '#219ebc', '#f72585', '#4a4e69', '#d62828']
    const categories = data.transactions.filter(element => element.debit && element.category).reduce((acc, curVal) => {
      if (!acc[curVal.category]) {
        acc[curVal.category] = curVal.amount
      } else {
        acc[curVal.category] = acc[curVal.category] + curVal.amount
      }
      return acc
    }, {})

    graphData = {
      labels: Object.keys(categories),
      datasets: [
        {
          backgroundColor: backgroundColors,
          borderColor: 'white',
          borderWidth: 1,
          data: Object.values(categories)
        }
      ]
    }
  }
  return (
    <GraphDisplay>
      <Doughnut
        data={graphData}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </GraphDisplay>
  )
}

Graph.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string
}

export default Graph
