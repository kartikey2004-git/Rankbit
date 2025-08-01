import mongoose, { Schema } from "mongoose";

const KeywordSchema = new Schema({
  domain: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
    required: true,
    validate: val => val.length > 0
  },
  owner: {
    type: String,
    required: true
  }
},{timestamps: true})

export const Keyword =
  mongoose.models.Keyword || mongoose.model("Keyword", KeywordSchema);