import mongoose from "mongoose";

const facilitatorSchema = new mongoose.Schema(
  {
    fullNames: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    nationalId: {
      type: String,
      required: true,
      unique: true,
    },

    courses: [
      {
        type: String,
        required: true,
        unique: false,
      },
    ],

    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const facilitatorModel = mongoose.model("facilitators", facilitatorSchema);

export default facilitatorModel;
