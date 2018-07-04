import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import AuthReducer from './Auth'
import SurveysReducer from './Surveys'

export default combineReducers({
  auth: AuthReducer,
  form: formReducer,
  surveys: SurveysReducer
})
