import { createContext } from "react"

export const MessageContext = createContext()

export const MessageState = (props) => {
  return (
    <MessageContext.Provider value={{}}>
      {props.children}
    </MessageContext.Provider>
  )
}
