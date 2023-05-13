const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = Schema({
    name: String,
    userName: String,
    password: String,
    estado: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model("users", userSchema)