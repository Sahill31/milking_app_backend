import mongoose, { Schema } from "mongoose";

const milkingSessionSchema = new Schema(
  {
    start_time: {
      type: Date,
      required: true,
    },

    end_time: {
      type: Date,
      default: null,
    },

    duration: {
      type: Number,
      default: null,
    },

    milk_quantity: {
      type: Number,
      default: null,
      min: 0,
    },

    notes: {
      type: String,
      required: false,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const MilkingSession = mongoose.model(
  "MilkingSession",
  milkingSessionSchema
);