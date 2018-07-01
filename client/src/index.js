import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
// import registerServiceWorker from './registerServiceWorker'

import App from './components/App'
import Header from './components/Header'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import SurveyNew from './components/surveys/SurveyNew'

import axios from 'axios'
window.axios = axios

const NotFound = () => {
  return (
    <div>
      <h1 className="title">Error</h1>
      <h2 className="title">Status: 404 | Not Found</h2>
      <blockquote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quae
        commodi ea ex, corporis aspernatur cumque tenetur eos ipsum porro quos
        ducimus adipisci perferendis impedit magni rerum, reprehenderit non
        earum!
      </blockquote>
    </div>
  )
}

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <App>
      <BrowserRouter>
        <div className="body">
          <Header />
          <div className="container">
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/surveys" component={Dashboard} exact />
              <Route path="/surveys/new" component={SurveyNew} exact />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </App>
  </Provider>,
  document.getElementById('root')
)
