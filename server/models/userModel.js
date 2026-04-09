import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is compulsory']
    },
    email:{
        type:String,
        required:[true, 'email is compulory'],
        unique:[true, 'email already taken']
    },
    password:{
        type:String,
        required:[true, 'password is compulsory'],
        minLength:[6, 'there should be atleast 6 characters']
    },
    address:{
        type:String,
        required:[true, 'address is compulsory']
    },
    city:{
        type:String,
        required:[true, 'enter your city name']
    },
    country:{
        type:String,
        required:[true, 'enter your country name']
    },
    phone:{
        type:String,
        required:[true, 'enter your phone number']
    },
    profilePic:{
        type:String,
    },
},{timestamps:true});

export const userMdoel = mongoose.model("Users", userSchema);
export default userMdoel;
