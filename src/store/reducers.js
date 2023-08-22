import { combineReducers } from "redux";

import account from "./auth/register/reducer";
import login from "./auth/login/reducer";
import forgetPassword from "./auth/forgetpassword/reducer";
import profile from "./auth/profile/reducer";
const rootReducer = combineReducers({
  // public

  account,
  login,
  forgetPassword,
  profile
});

export default rootReducer;
