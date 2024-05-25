import mongoose from "mongoose";
import { Item } from "./item";

export type Category = {
  _id: typeof mongoose.Schema.ObjectId;
  _v: number;
  name: string;
  items: Item[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
