import { UPDATE_USER_SETTING } from './types'

const initialState = {
  userSettings: {
    romanNumerals: false
  }
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_USER_SETTING:
      return { ...state, userSettings: { ...state.serSettings, ...payload } }
    default:
      return state
  }
}
