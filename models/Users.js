const mongoose = require('mongoose')
const Schema = mongoose.Schema
// mongoose.set('useFindAndModify', false);

const usersSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } })

const Users = mongoose.model('Users', usersSchema)
module.exports = Users
