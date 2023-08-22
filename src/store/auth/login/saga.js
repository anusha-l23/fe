import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER } from "./actionTypes";
import { apiError, loginSuccess, loginFailed } from "./actions";

import { APIClient } from "../../../helpers/api_helper";
import { LOGIN } from "../../../helpers/url_helper";
const api = new APIClient();


function* loginUser({ payload: { user } }) {
  try { 
  const response = yield call(api.create, LOGIN, {
        email: user.email,
        password: user.password,
      });
      console.log(response);
      localStorage.setItem("authUser", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      yield put(loginSuccess(response));
    }
   catch (error) {
    yield put(loginFailed(error));
  }

}

function* loginSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export default loginSaga;
