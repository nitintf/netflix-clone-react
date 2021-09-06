import { useState, createContext } from "react";

export const MyListContext = createContext({
  myList: [],
  setMyList: () => { }
})

const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState([])

  return (
    <MyListContext.Provider value={{ myList, setMyList }}>
      {children}
    </MyListContext.Provider>
  )
}

export default MyListProvider
