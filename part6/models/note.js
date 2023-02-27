const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url).then(
    result => {
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log(`error connecting to MongoDB: ${error.message}`)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, retunedObject) => {
        retunedObject.id = retunedObject._id.toString()
        delete retunedObject._id
        delete retunedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)