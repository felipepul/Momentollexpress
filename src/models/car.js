const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carShema = Schema({
    placa: String,
    marca: String,
    estado: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model("cars", carShema)