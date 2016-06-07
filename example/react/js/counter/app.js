import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './connect'
import Reducer from './reducers'

let store = createStore(Reducer)
let element = document.getElementById('counter')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  element
)
