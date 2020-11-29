const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    // id: String,
    companyName: String,
    department: String,
    employeeNumber: String,
    employeeLimit: String,
    email: String,
    userName: String,
    password: String,
    lastLoginDate: String,
    lastLoginTime: String,
    firstLogin: Boolean,
    favorite: [],
    picture:String
}, { collection: 'accountData' })

// const AccountData = module.exports = mongoose.model('accountData', accountSchema);
module.exports = mongoose.model('accountData', accountSchema);