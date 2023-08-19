import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "./actionTypes"

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: { user },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const loginFailed = user => {
  return {
    type: LOGIN_FAILED,
    payload: user,
  }
}

