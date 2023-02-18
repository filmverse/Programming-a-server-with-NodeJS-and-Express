import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState("")
  const [ showAll, setShowAll ] = useState(true)

  const hook = () => {
    axios.get('http://localhost:3001/notes').then(
      note => {
        setNotes(note.data)
      }
    )
  }
  useEffect(hook, [])

  const submitNote = (event) => {
    event.preventDefault()
    const addNote = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    axios.post('http://localhost:3001/notes', addNote).then(
      note => {
        setNotes(notes.concat(note.data))
        setNewNote("")
      }
    )
  }

  const handleQuery = (handle) => (event) => { handle(event.target.value) }

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    console.log(id)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {noteToShow.map(note => <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
        />)}
      </ul>
      <form onSubmit={submitNote}>
        <input value={newNote} onChange={handleQuery(setNewNote)} />
        <button type="submit">save</button>
      </form>
      <p>Debug: {newNote}</p>
      <p className="footer">Note app, Department of Computer Science, University of Helsinki 2023</p>
    </div>
  )
}

export default App;