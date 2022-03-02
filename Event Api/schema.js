import mongoose from 'mongoose';
import {scryptSync, randomBytes} from 'crypto'
const schema = mongoose.Schema

const userSchema = new schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const eventSchema = new schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String, 
        default:''
    },
    parent:{
        type:String,
        default:'main'
    },
    public:{
        type:Boolean,
        default:false
    },
    attendees:{
        type:Array,
        default:[]
    },
    owner:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    stime: {
        type:String,
        required:true
    },
    etime: {
        type:String,
        required:true
    }
})
userSchema.pre('save', function (next) {
    const user = this
    if(!user.isModified('password')) return next()
    const salt = randomBytes(16).toString('hex')
    user.password = `${scryptSync(user.password,salt,32).toString('hex')}:${salt}`
    return next()
})

userSchema.methods.comparePassword = async (storedPassword, userPassword) => {
    const [key,salt] = storedPassword.split(':')
    const userPass = scryptSync(userPassword, salt, 32).toString('hex')
    console.log(userPass,key)
    return userPass === key
}


export const Users =  mongoose.model('Users',userSchema)
export const Events = mongoose.model('Events',eventSchema)
