const mongoose = require("mongoose")

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vkassharma19492:${password}@cluster0.omyodrq.mongodb.net/phoneApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Phone = mongoose.model('Phone', phoneSchema)

// creating phonebook data
// const phone = new Phone({
//     name: "Test Name",
//     number: "0123456789",
// })

// phone.save().then(result => {
//     console.log(`added ${phone.name} ${phone.number} to phonebook`)
//     mongoose.connection.close()
// })

// fetching data of phonebook
Phone.find({}).then(result => {
    result.forEach(phone => {
        console.log(phone)
    })
    mongoose.connection.close()
})