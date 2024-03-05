import mongoose from "mongoose";

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model("City", CitySchema);

export default City;
