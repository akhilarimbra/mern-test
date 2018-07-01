import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import AuthReducer from './Auth'

export default combineReducers({ auth: AuthReducer, form: formReducer })
