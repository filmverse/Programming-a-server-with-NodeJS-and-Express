import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const baseUrl = 'http://localhost:3001/api/notes'

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')

  const hook = () => {
    axios.get(baseUrl).then(
      note => {
        setNotes(note.data)
      }
    )
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    axios.post(baseUrl, noteObject).then(
      note => {
        setNotes(notes.concat(note))
        setNewNote('')
      }
    )
  }

  const handleChange = (objn) => (event) => objn(event.target.value)

  return (
    <div>
      {notes.map(note => <Note key={note.id} note={note} />)}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange(setNewNote)} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;