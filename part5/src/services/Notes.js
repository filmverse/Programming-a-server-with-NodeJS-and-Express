import axios from "axios";

const baseURL = 'http://localhost:3001/api/notes'


const getNotes = () => {
    return axios.get(baseURL)
}

const sendNotes = (noteObject) => {
    return axios.post(baseURL, noteObject)
}

const noteImportance = (id, updateImportance) => {
    return axios.put(`${baseURL}/${id}`, updateImportance)
}

const removeNote = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const noteService = {getNotes, sendNotes, noteImportance, removeNote}

export default noteService;