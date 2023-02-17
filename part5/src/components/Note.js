const Note = ({ note }) => {
    return (
        <div className="note">
            <ul>
                <li>{note.content} <button>important</button></li>
            </ul>
        </div>
    )
}

export default Note;