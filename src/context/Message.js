import { createContext, useState } from "react";

export const MessageContext = createContext({
  showMessage: false,
  message: '',
  messageType: '',
  setMessage: () => { },
  setMessageType: () => { },
  setShowMessage: () => { },
})

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [showMessage, setShowMessage] = useState(false)

  return (
    <MessageContext.Provider value={{ message, setMessage, showMessage, setShowMessage, messageType, setMessageType }}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider