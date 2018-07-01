import React, { Component } from 'react'

class SurveyField extends Component {
  render() {
    const {
      input,
      label,
      meta: { error, touched }
    } = this.props

    return (
      <div>
        <label>{label}</label>
        <input {...input} style={{ marginBottom: 5 }} />
        <span className="red-text" style={{ marginBottom: 20 }}>
          <strong>{touched && error}</strong>
        </span>
      </div>
    )
  }
}

export default SurveyField
