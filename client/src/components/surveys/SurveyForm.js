import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import FIELDS from './formFields'

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ name, label }) => {
      return (
        <Field
          component={SurveyField}
          key={name}
          name={name}
          label={label}
          type="text"
        />
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            <i className="material-icons right">cancel</i> Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            <i className="material-icons right">done</i> Review
          </button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  errors.recipients = validateEmails(values.recipients || '')
  _.each(FIELDS, ({ name, label }) => {
    if (!values[name]) errors[name] = `You must provide ${label}`
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)
