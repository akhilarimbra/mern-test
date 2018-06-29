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
  console.log(token)
  const response = await axios.post('/api/stripe', token)
  dispatch({
    type: TYPES.FETCH_USER,
    payload: response.data
  })
}
