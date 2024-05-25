import mongoose from "mongoose";
import { ItemSchema } from "./item";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [ItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
