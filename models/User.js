const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
});

module.exports = mongoose.model("User", userSchema);
