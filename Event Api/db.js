import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/Events')
    .then(() => {
        console.log('Successfully connected to mongodb')
    }).catch(err => {
        console.log(err)
    })