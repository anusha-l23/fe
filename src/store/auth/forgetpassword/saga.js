import { takeEvery, fork, put, all, call } from "redux-saga/effects"

import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError, userForgetPassword } from "./actions"


import { APIClient } from "../../../helpers/api_helper"
import { FORGOT_PASSWORD, POST_FORGOT } from "../../../helpers/url_helper"
const api = new APIClient();


function* forgetUser({ payload: { user } }) {
  try {
 
      const response = yield call(api.create, FORGOT_PASSWORD, {
        email: user.email
      });
        yield put(
          userForgetPasswordSuccess(response)
        )
  } catch (error) {
    console.log(error)
    const errorMessage = error?.message || "Please check your email..";
    yield put(userForgetPasswordError(errorMessage));
  }
}

export function* watchUserForgotPassword() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserForgotPassword)])
}

export default forgetPasswordSaga;
