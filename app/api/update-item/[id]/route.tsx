import connectDB from "@/lib/db";
import Item from "@/models/item";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, enchantment, tier, cities } = await req.json();

    if (!name || !(enchantment >= 0 && enchantment <= 4) || !tier || !cities) {
      return NextResponse.json({ error: "Invalid Data" });
    }

    await connectDB();
    const item = await Item.updateOne(
      { _id: params.id },
      {
        name,
        enchantment,
        tier,
        cities,
      }
    );
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
