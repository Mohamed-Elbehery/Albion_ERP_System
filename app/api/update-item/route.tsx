import connectDB from "@/lib/db";
import Category from "@/models/category";
import { Item } from "@/types/item";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { cities } = await req.json();

    const searchParams = req.nextUrl.searchParams;

    const categoryId = searchParams.get("categoryId");
    const itemId = searchParams.get("itemId");

    if (!cities) {
      return NextResponse.json({ error: "Invalid Data" });
    }

    await connectDB();

    const category = await Category.findById(categoryId);

    const newItems = Object.entries(category.items as Item[]).map(
      ([_, item]) => {
        if (itemId === item._id.toString()) {
          return {
            _id: item._id,
            name: item.name,
            enchantment: item.enchantment,
            tier: item.tier,
            cities,
          };
        } else {
          return {
            _id: item._id,
            name: item.name,
            enchantment: item.enchantment,
            tier: item.tier,
            cities: item.cities,
          };
        }
      }
    );

    await Category.updateOne(
      { _id: categoryId },
      {
        items: [...newItems],
      }
    );
    return NextResponse.json({ newItems });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
