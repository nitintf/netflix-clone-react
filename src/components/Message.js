import React, { useContext, useEffect, useState } from 'react'
import { MessageContext } from '../context/Message'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const Message = () => {
  const [opacity, setOpacity] = useState(0)
  const { message, messageType, showMessage, setShowMessage } = useContext(MessageContext)

  useEffect(() => {
    if (showMessage) {
      setOpacity(100)
      setTimeout(() => {
        setOpacity(0)
        setShowMessage(false)
      }, 3000)
    }
  }, [showMessage])

  return (
    <h4 className='show__message' style={{ opacity: opacity }}>
      {messageType === 'SUCCESS' && (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
          ></path>
        </svg>
      )}
      {messageType === 'ERROR' && (
        <svg viewBox="0 0 24 24">
          <path
            d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"
            fill="currentColor"
          ></path>
        </svg>
      )}
      {messageType === 'ALERT' && (
        <IoMdInformationCircleOutline className="btn--icon" />
      )}
      {message}
    </h4>
  )
}

export default Message
