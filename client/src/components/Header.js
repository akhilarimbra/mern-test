import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Payments from './Payments'

class Header extends Component {
  renderContent() {
    const { auth } = this.props
    switch (auth) {
      case null:
        return 'Loading ...'
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        )
      default:
        return [
          <li key="payments">
            <Payments />
          </li>,
          <li key="credits">
            <a>Credits: {this.props.auth.credits}</a>
          </li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ]
    }
  }

  renderBrandLogo() {
    return (
      <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo left">
        Emaily
      </Link>
    )
  }

  render() {
    console.log(this.props)
    return (
      <div className="navbar-fixed">
        <nav className="green">
          <div className="nav-wrapper container">
            {this.renderBrandLogo()}
            <ul className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(
  mapStateToProps,
  {}
)(Header)
