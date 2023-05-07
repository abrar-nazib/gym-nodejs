/*
Schema: Name, Email, Password
*/
const { Schema, model } = require("mongoose"); // Importing Schema and model from mongoose

// Load Models
// const Profile = require("./Profile");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true, // trim white spaces
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      trim: true, // trim white spaces
      required: true,
      unique: true, // unique email allowed only
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // timestamps: true will automatically create createdAt and updatedAt fields

const User = model("User", userSchema); // Creating a model User from the userSchema

// export the model
module.exports = User;

// Utilization of string reference and model reference difference:
