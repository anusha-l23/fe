import { takeEvery, fork, put, all, call } from "redux-saga/effects"

import { EDIT_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"


import { UPDATE_PROFILE } from "../../../helpers/url_helper";

import { APIClient } from "../../../helpers/api_helper";

const api = new APIClient();
function* editProfile({ payload: { user } }) {
  try {
   
      const response = yield call(api.create, UPDATE_PROFILE, user)
      if(response?.id){
        localStorage.setItem('authUser',JSON.stringify(user));
      }
      yield put(profileSuccess("User Profile Updated Successfully!"))
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
