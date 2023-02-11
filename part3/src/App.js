import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [ notes, setNotes ] = useState([])

  const hook = () => {
    axios.get('http://localhost:3001/api/notes').then(
      note => {
        console.log(note.data)
      }
    )
  }
  useEffect(hook, [])

  return (
    <div></div>
  )
}

export default App;