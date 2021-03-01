import * as types from "../../types/actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

function updateObject(oldObj, updatedProperties) {
  return { ...oldObj, ...updatedProperties };
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case types.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
      });
    case types.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case types.AUTH_LOGOUT:
      return updateObject(state, { token: null });
    default:
      return state;
  }
}

export default authReducer;
