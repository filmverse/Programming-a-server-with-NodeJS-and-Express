import { useState, useEffect } from "react";
import noteService from "./services/Notes";
import Note from "./components/Note";

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState("")
  const [ showAll, setShowAll ] = useState(true)

  const hook = () => {
    noteService.getNotes().then(
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
    noteService.sendNotes(addNote).then(
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
    const importantNote = notes.find(note => note.id === id)
    const updateImportant = {...importantNote, important: !importantNote.important}
    noteService.noteImportance(id, updateImportant).then(
      unote => {
        setNotes(notes.map(note => note.id !== id ? note : unote.data))
      }
    )
  }

  const deleteNoteOf = (id) => {
    noteService.removeNote(id).then(
      () => {
        setNotes(notes.filter(note => note.id !== id))
      }
    )
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
          deleteNote={() => deleteNoteOf(note.id)}
        />)}
      </ul>
      <form onSubmit={submitNote}>
        <input value={newNote} onChange={handleQuery(setNewNote)} />
        <button type="submit">save</button>
      </form>
      <p>Debug: {newNote}</p>
      <p className="footer">Note App, Welcome To The Weird World.</p>
    </div>
  )
}

export default App;