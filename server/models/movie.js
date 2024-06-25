const mongoose = require("mongoose");
//das5
const movieSchema = new mongoose.Schema({
    name: {type: String, required: false },
    img: {type: String, required: false},
    year: {type: Number, required: false},
    rating: {type: String, required: false},
    genre: {type: [String], required: false}

});

module.exports = mongoose.model("movie", movieSchema);

