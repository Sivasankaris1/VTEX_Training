import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
interface messageProps {
    message: string
}
const CSS_HANDLES = ['message']
const Message: StorefrontFunctionComponent<messageProps> = (props) => {
    const handles = useCssHandles(CSS_HANDLES)
    return (
        <div className={`${handles.message} c-muted-1 db tc`}>
            Hello {props.message}
        </div>
    )
}

Message.schema = {
    title: 'message',   
    type: 'object',
    properties: {
      message: {
        title: 'enter message',
        type: 'string'
      }
    }
}

export default Message