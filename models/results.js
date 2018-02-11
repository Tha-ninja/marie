var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultsSchema = new Schema({
    reg_number : {
        type : String,
        required : true
    },
    unit : {
        type : String,
        required : true
    },
    points : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Result", ResultsSchema);