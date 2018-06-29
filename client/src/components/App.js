import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return this.props.children
  }
}

export default connect(
  null,
  actions
)(App)
