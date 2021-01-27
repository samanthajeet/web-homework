import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const InputElement = styled.input`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
  padding: .5em .75em;
  background-color:#e0dede;
  border-radius: 10px;
  border: none;
  font-size: 1em;

  :focus{
    outline: none;
  }
`

const Input = ({ callBack, name, placeholder, type, value }) => {
  return (
    <InputElement name={name} onChange={callBack} placeholder={placeholder} type={type} value={value} />
  )
}

Input.defaultProps = {
  callBack: () => console.log('do something'),
  name: '',
  placeholder: '',
  type: 'text',
  value: ''
}

Input.propTypes = {
  callBack: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

export default Input
