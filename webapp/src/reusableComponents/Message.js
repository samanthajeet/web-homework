import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const MessageDisplay = styled.h2`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
  background: -webkit-linear-gradient(217deg,#f72585, #480ca8, #4895ef);
  font-size: 3em;
  line-height: 1.25em;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Message = ({ gif, message }) => {
  console.log(gif)
  return (
    <MessageDisplay>
      {message}
      <img alt='gif' src={gif} />
    </MessageDisplay>
  )
}

Message.defaultProps = {
  gif: '',
  message: ''
}

Message.propTypes = {
  gif: PropTypes.string,
  message: PropTypes.string
}

export default Message
