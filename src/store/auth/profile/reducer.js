import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE } from "./actionTypes";

const initialState = {
  error: "",
  success: "",
  loading:false
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state,loading:true };
      break;
    case PROFILE_SUCCESS:
      state = { ...state,error:"",loading:false, success: action.payload };
      break;
    case PROFILE_ERROR:
      state = { ...state,success:"", loading:false,error: action.payload };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
