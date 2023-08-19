import {
  LOGIN_USER,
  LOGIN_SUCCESS,
 LOGIN_FAILED
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user:action.payload,
        loading: false,
      };
      break;
      case LOGIN_FAILED:
        state = {
          ...state,
          user: null,
          loading: false
        }
        break
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
