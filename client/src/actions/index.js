import axios from 'axios'

import * as TYPES from './types'

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/user/current')
  dispatch({
    type: TYPES.FETCH_USER,
    payload: response.data
  })
}

export const handleToken = token => async dispatch => {
  const response = await axios.post('/api/stripe', token)
  dispatch({
    type: TYPES.FETCH_USER,
    payload: response.data
  })
}

export const submitSurvey = (values, history) => async dispatch => {
  const response = await axios.post('/api/surveys', values)
  history.push('/surveys')
  dispatch({
    type: TYPES.FETCH_USER,
    payload: response.data
  })
}

export const fetchSurveys = () => async dispatch => {
  const response = await axios.get('/api/surveys')
  dispatch({
    type: TYPES.FETCH_SURVEYS,
    payload: response.data
  })
}
