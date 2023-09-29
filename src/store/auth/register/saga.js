import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"




import { APIClient } from "../../../helpers/api_helper"
import { REGISTER } from "../../../helpers/url_helper"
const api = new APIClient();


function* registerUser({ payload: { user } }) {
  try {
 
      var res = yield call(api.create, REGISTER, user)
      yield put(registerUserSuccessful(res))

  } catch (error) {

    console.log(error)
    const errorMessage = error?.message || "Something Went Wrong!";
    yield put(registerUserFailed(errorMessage));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* registerSaga() {
  yield all([fork(watchUserRegister)])
}

export default registerSaga
