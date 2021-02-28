import * as types from "../../types/actionTypes";

function AddBirthdays(data) {
  return { type: types.ADD_BIRTHDAYS, payload: data };
}

export { AddBirthdays };
