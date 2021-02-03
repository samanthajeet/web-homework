import { UPDATE_USER_SETTING } from './types'

export function updateUserSetting (setting) {
  return {
    type: UPDATE_USER_SETTING,
    payload: setting
  }
}
