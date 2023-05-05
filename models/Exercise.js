/*
Schema:
    title, body, author, tags, thumbnail, readTime, likes, dislikes, comments
*/

const { Schema, model } = require("mongoose"); // Importing Schema and model from mongoose

// Load Models
// const User = require("./User");
// const Comment = require("./Comment");

const exerciseSchema = new Schema(
  {
    bodyPart: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    equipment: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    gifUrl: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "/images/gym.jpg",
    },
    id: {
      type: Number,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
      required: true,
    },
    target: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
  },
  { timestamps: true }
); // timestamps: true will automatically create createdAt and updatedAt fields

const Exercise = model("Exercise", exerciseSchema); // Creating a model Post from the postSchema

// export the model
module.exports = Exercise;
