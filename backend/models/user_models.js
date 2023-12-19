let mongoose, {Schema,model} =require("mongoose")
let jwt =require("jsonwebtoken")
let bcrypt =require("bcrypt")

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        name: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        address: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    let data=jwt.sign(
        {
            _id:(this._id),
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    return data;
}

// userSchema.methods.generateRefreshToken = function(){
//     const refreshTokenPayload = {
//         _id: this._id,
//     };

//     const refreshTokenOptions = {
//         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     };

//     const refreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET, refreshTokenOptions);

//     console.log("Refresh Token Value:", refreshToken);
//     return refreshToken;
// }

let User=model("user", userSchema);
module.exports=User;