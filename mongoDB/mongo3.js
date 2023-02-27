const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log()
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://vkassharma19492:${password}@cluster0.15oqqzt.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = new mongoose.model('Person', personSchema)

// const person = new Person({
//     name: 'Vikas',
//     number: '123456789123',
// })

// person.save().then(result => {
//     console.log('person saved')
//     mongoose.connection.close()
// })

Person.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})