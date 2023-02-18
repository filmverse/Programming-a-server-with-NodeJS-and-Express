const Note = ({ note, toggleImportance, deleteNote }) => {

    const label = note.important
        ? "make not important"
        : "make important"

    return (
        <div className="note">
            <li>{note.content} <button onClick={toggleImportance}>{label}</button><button onClick={deleteNote}>delete</button></li>
        </div>
    )
}

export default Note;