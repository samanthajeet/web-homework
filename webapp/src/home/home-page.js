import React from 'react'
import styled from '@emotion/styled'

const HomeView = styled.section`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
`

const HomeMessageContainer = styled.section`
  /* cursor: url(https://cur.cursors-4u.net/nature/nat-10/nat996.cur), auto !important; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`

const Subtitle = styled.h3`

`

const HomeMessage = styled.h1`
    background: -webkit-linear-gradient(217deg,#da4302, #ff9a00);
    font-size: 6em;
    line-height: 1.25em;
    min-height: 2.5em;
    margin: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export function Home () {
  return (
    <HomeView>
      <HomeMessageContainer>
        <HomeMessage>
          Super Sweet
          <br />
          Expense Tracking App
          <br />
          Take Two
        </HomeMessage>
        <Subtitle>
          New and Improved!
        </Subtitle>
      </HomeMessageContainer>
    </HomeView>
  )
}
