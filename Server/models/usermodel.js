const mongoose=require ("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    }

},{
    timestamps:true
})
module.exports=mongoose.model('Users',userSchema)