import React from 'react'

interface CountdownProps {
  message: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  message
}) => {
  return (
      <div> {message} </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    message: {
      title: 'Message',
      description: 'Leave your message',
      type: 'string',
      default: null
    }
  },
}

export default Countdown
