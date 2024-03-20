const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your Name"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Please provide date"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide us your Email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid Email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
    minlength: 8,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//========= Hashing password ==========
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//========= Generating user token ==========
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = await jwt.sign(
    { _id: user._id.toString() },
    "Thisiscompaniesemployeedata"
  );

  return token;
};

//========= Comparing password ==========
userSchema.statics.findByCredentials = async (email, password, next) => {
  const user = await User.findOne({ email });

  if (!email || !password) {
    throw new Error("Please provide email or password!");
  }

  if (!user) {
    throw new Error("User not Exist!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
