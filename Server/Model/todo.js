import mongoose from 'mongoose'

const todoschema=mongoose.Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:[true,'Please add a text value']
    },
    checked:{
        type:Boolean,
        default:false
    }
    },
    {
        timestamps:true
    }
);

const todo=mongoose.model('todo',todoschema);
export default todo