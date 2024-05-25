import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/category";
import { Item } from "@/types/item";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;

    const categoryId = searchParams.get("categoryId");
    const itemId = searchParams.get("itemId");

    const category = await Category.findById(categoryId);

    const newItems = category.items.filter((item: Item) => {
      return item._id.toString() !== itemId
    });

    await Category.updateOne({ _id: categoryId }, { items: [...newItems] });

    return NextResponse.json(newItems);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
