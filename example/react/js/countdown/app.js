import React from 'react'
import { render } from 'react-dom'
import Countdown from './countdown'

let element = document.getElementById('countdown')

render(
  <Countdown time="601000">
  </Countdown>,
  element
)
