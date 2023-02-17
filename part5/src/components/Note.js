const Note = ({ note }) => {
    return (
        <div className="note">
            <li>{note.content} <button>important</button></li>
        </div>
    )
}

export default Note;