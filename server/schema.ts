const mongoose = require('mongoose');
const { Schema } = mongoose;

export const SignUpSchema = new Schema({
    phone: String,
    password: String,
})