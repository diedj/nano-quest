import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,required:true},
    phoneNumber:{type:Number,required:true}
})

export default mongoose.model('Contact',contactSchema);