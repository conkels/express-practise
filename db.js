const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/Jan-SW", {
    useNewUrlParser: true
});

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maclength: 4
    },
});

module.exports = mongoose.model("Person", personSchema);
