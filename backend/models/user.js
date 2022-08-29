var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:   {
        type: Boolean,
        default: false,
    },
    email:{
        type:String,
        required:true
    },
    cart:[],
    address:{
        type:String,
        default:null,
        required:false,
    },
    state:{
        type:String,
        default:null,
        required:false,
    },
    total:{
        type:Number,
        required:false,
    }
});

User.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',User);
