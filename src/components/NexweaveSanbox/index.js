
import React from 'react'
import {
  Wrapper,
  VideoWrapper
} from './NexweaveSandbox.style'
export default function NexweaveSandBox(props) {
  return (
    <Wrapper>
      <VideoWrapper/>
      {props.widget}
    </Wrapper>
  )
}
