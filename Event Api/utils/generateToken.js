import jwt from 'jsonwebtoken'
export default function GenerateToken({_id, email}){
    return jwt.sign({_id,email}, 'My name is vision onyeaku')
}