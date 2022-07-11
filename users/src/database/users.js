const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const contactSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
})
const defaultContact = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
}

const userSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  contact: {type: contactSchema, default: defaultContact},
  profilePictureUrl: {type: String, default: undefined},
  username: {type: String, required: true, unique: true}
}, {
  timestamps: {
      createdAt: false,
      updatedAt: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
