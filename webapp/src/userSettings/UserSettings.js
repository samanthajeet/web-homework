import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserSetting } from '../ducks/actions'
import styled from '@emotion/styled'
import Button from '../reusableComponents/Button'

const UserSettingDisplay = styled.section`
  .roman-numeral-btn {
    :hover {
      background: -webkit-linear-gradient(217deg,#da4302, #ff9a00);
      border: 2px solid white;
    }
  }
`

const UserSettings = () => {
  const {
    romanNumerals
  } = useSelector((store) => ({
    romanNumerals: store.userSettings.romanNumerals
  }))
  const dispatch = useDispatch()
  return (
    <UserSettingDisplay>
      {romanNumerals ? (
        <Button callBack={() => dispatch(updateUserSetting({ romanNumerals: false }))} customStyle='roman-numeral-btn' label='Turn off Roman Numerals' />
      ) : (
        <Button callBack={() => dispatch(updateUserSetting({ romanNumerals: true }))} customStyle='roman-numeral-btn' label='Convert to Roman Numerals' />
      )}
    </UserSettingDisplay>
  )
}

export default UserSettings
