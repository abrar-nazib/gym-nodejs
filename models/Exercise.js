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
      maxlength: 100,
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
      required: true,
      default: "/uploads/default.png",
    },
    id: {
      type: Number,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 50,
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

// configuration for searching
exerciseSchema.index(
  {
    name: "text",
    equipment: "text",
    target: "text",
    bodyPart: "text",
  },
  {
    weights: {
      name: 10,
      equipment: 5,
      target: 8,
      bodyPart: 5,
    },
  }
);

const Exercise = model("Exercise", exerciseSchema); // Creating a model Post from the postSchema

// export the model
module.exports = Exercise;
