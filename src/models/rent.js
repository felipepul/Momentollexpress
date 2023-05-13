const mongoose = require("mongoose")
const Schema = mongoose.Schema

const rentSchema = Schema({
    numberRent: String,
    username: String,
    plateNumber:String,
    rentDate:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model("rents", rentSchema)