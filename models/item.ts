import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enchantment: {
      type: String,
      enum: [1, 2, 3, 4],
      required: true,
    },
    tier: {
      type: String,
      enum: ["T3", "T4", "T5", "T6", "T7", "T8"],
      required: true,
    },
    cities: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default Item;
