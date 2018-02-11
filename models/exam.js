var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamsSchema = new Schema({
    exam : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Exam", ExamsSchema);