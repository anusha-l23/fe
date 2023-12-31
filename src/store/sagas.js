import { all, fork } from "redux-saga/effects";


import registerSaga from "./auth/register/saga";
import loginSaga from "./auth/login/saga";
import forgetPasswordSaga from "./auth/forgetpassword/saga";
import ProfileSaga from "./auth/profile/saga";


export default function* rootSaga() {
  yield all([
    fork(registerSaga),
    fork(loginSaga),
    fork(forgetPasswordSaga),
    fork(ProfileSaga),
  ]);
}
