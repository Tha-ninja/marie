var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeesSchema = new Schema({
    reg_number : {
        type : String,
        required : true
    },
    total : {
        type : String,
        default : "90,000"
    },
    paid : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Fee", FeesSchema);