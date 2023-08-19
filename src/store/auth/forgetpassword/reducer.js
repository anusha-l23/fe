import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
} from "./actionTypes"

const initialState = {
  forgetSuccess: false,
  forgetError:false,
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccess: false,
        forgetError: null,
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccess: action.payload,
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default forgetPassword;
