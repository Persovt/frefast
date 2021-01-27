import { Schema } from "inspector"

const {Schema, model} = require('mongoose')


const RefreshModel = new Schema({
    userId: String,
    refreshToken: String,
    fingerprint: String,
    expiresIn: String,
    createdAt: String,
    status: String
})

export default model('Refresh', RefreshModel)
//export default {RegisterSchema,LoginSchema}