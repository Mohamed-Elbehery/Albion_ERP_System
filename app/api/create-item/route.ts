import connectDB from "@/lib/db";
import Category from "@/models/category";
import Item from "@/models/item";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, enchantment, tier, cities, categoryId } = await req.json();

    if (!name || !(enchantment >= 0 && enchantment <= 4) || !tier || !cities) {
      return NextResponse.json({ error: "Invalid Data" });
    }

    await connectDB();

    const item = await Item.create({
      name,
      enchantment,
      tier,
      cities,
      categoryId,
    });

    const category: any = await Category.findById(categoryId);

    const data = await Category.updateOne(
      { _id: categoryId },
      { items: [...category.items, item] }
    );

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
