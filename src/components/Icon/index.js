import React from 'react'
import { Icon as AIcon } from 'antd'

import { ReactComponent as LandmarkIcon } from './landmark.svg'
import raisedFistPNG from './raised-fist.png'

const FistIcon = () => (
  <img src={raisedFistPNG} height={'100%'} style={{ verticalAlign: '-1px' }} />
)

export const Icon = ({ type, style, ...props }) => {
  const component = ((name) => {
    if (name === 'eiffel') { return LandmarkIcon }
    if (name === 'fist') { return FistIcon }
  })(type)

  return (
    <AIcon
      type={!component && type}
      component={component && component}
      style={style ? style : { height: '1em' }}
      {...props}
    />
  )
}

export const Hello = 'hello'
