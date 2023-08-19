import { combineReducers } from "redux";

import account from "./auth/register/reducer";
import login from "./auth/login/reducer";
import forgetPassword from "./auth/forgetpassword/reducer";
const rootReducer = combineReducers({
  // public

  account,
  login,
  forgetPassword
});

export default rootReducer;
