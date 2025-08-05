import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    brightDataResponseId: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      default: "pending"
    },
  },
  { timestamps: true }
);

export const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);