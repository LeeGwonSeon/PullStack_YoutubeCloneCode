import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatarUrl: String,
    socialOnly: {type: Boolean, default: false},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    location: String,
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref:"Comment"},
    ],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre('save', async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5);
    } 
});

const User = mongoose.model("User", userSchema);
export default User;