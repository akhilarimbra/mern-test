import React, { Component } from 'react'

import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
  state = {
    showReview: false
  }

  renderContent = () =>
    this.state.showReview ? (
      <SurveyFormReview />
    ) : (
      <SurveyForm
        onSurveySubmit={() => {
          this.setState({ showReview: true })
        }}
      />
    )

  render() {
    return (
      <div>
        <h1>Create new survey</h1>
        {this.renderContent()}
      </div>
    )
  }
}

export default SurveyNew
