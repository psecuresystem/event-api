import jwt from 'jsonwebtoken'
export default function Auth(req,res,next){
    try{
        let user = jwt.verify(req.headers.authorization.split('Bearer ')[1],'My name is vision onyeaku')
        req.user = user
        next()
    }catch(err){
        res.status(403).send({error: 'Make sure to login first or add authorization header'})
    }
}