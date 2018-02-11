var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    student_name : {
        type : String,
        required : true
    },
    reg_number : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    image_url : {
        type : String,
        required : false
    }
});

module.exports = mongoose.model("User", UserSchema);