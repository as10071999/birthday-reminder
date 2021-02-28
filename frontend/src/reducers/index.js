import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import birthdaysReducer from "./birthdays/birthdaysReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  birth: birthdaysReducer,
});

export default rootReducer;
