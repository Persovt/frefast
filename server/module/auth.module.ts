const mongoose = require('mongoose');
const { Schema } = mongoose;

export const RegisterSchema = new Schema({
    phone: {String, required: true, unique: true},
    password: {String, required: true},
})
export const LoginSchema = new Schema({
    phone: String,
    password: String,
})
//export default {RegisterSchema,LoginSchema}