
const Note = ({ note }) => {
    const lable = note.important
        ? 'make not important'
        : 'make important'
    return (
        <div>
            <li className="note">
                {note.content} <button>{lable}</button>
            </li>
        </div>
    )
}

export default Note;