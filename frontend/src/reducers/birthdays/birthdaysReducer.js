import * as types from "../../types/actionTypes";

const initialState = [];

function birthdaysReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_BIRTHDAYS:
      return [...action.payload];
    default:
      return state;
  }
}

export default birthdaysReducer;
