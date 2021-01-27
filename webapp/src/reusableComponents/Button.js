import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ButtonElement = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    padding: .5em .75em;
    background: white;
    border: 2px solid black;
    margin-right: 5px;
    /* cursor: url(https://cur.cursors-4u.net/nature/nat-10/nat996.cur), auto !important; */
    :focus{
      outline: none;
    }
    :hover{
      color: white;
      cursor: pointer;
      background: black;
    }
`

const Button = ({ callBack, customStyle, label, selected, type }) => {
  return (
    <ButtonElement className={`${selected ? 'selected' : ''} ${customStyle}`} onClick={callBack} type={type}>{label}</ButtonElement>
  )
}

Button.defaultProps = {
  callBack: () => console.log('do nothing'),
  customStyle: '',
  label: '',
  selected: false,
  type: 'button'
}

Button.propTypes = {
  callBack: PropTypes.func,
  customStyle: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.bool,
  type: PropTypes.string
}

export default Button
