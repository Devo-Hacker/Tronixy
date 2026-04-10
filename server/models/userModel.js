import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
//functions
// hash functions
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); //with this password will be encrypt
});
//for decrypting the passwords 
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

//jwt
userSchema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "27d",
  });
};



export const userMdoel = mongoose.model("Users", userSchema);
export default userMdoel;
