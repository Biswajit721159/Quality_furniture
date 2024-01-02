let mongoose, {Schema,model} =require("mongoose")
let jwt =require("jsonwebtoken")
let bcrypt =require("bcrypt")

const AdminUserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        first_name: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String,
            default:""
        }
    },
    {
        timestamps: true
    }
)

AdminUserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

AdminUserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

AdminUserSchema.methods.generateAccessToken = function(){
    let data=jwt.sign(
        {
            _id:(this._id),
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY
        }
    )
    return data;
}

AdminUserSchema.methods.generateRefreshToken = function(){
    const refreshTokenPayload = {
        _id: this._id,
    };
    const refreshTokenOptions = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    };

    const refreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET, refreshTokenOptions);

    return refreshToken;
}

let AdminUser=model("AdminUser", AdminUserSchema);
module.exports=AdminUser;