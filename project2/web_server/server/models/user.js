const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String
});

UserSchema.methods.comparePassword = function comparePassword(password, callback){
  bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
  const user = this;

  //proceed further only if the password is modified or the user is new.
  if (!user.isModified('password')) { return next() };

  console.log("after user modified");
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      console.log("salterror: " + saltError);
      return next(saltError);
    }
    console.log("salt:    ", salt);
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        console.log("hasherror:  " + hashError);
        return next(hashError);
      }
      console.log("hash:   " + hash);

      // replace a password string with hashed value
      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
