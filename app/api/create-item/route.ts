import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, enchantment, tier, cities } = await req.json();

    if (!name || !enchantment || !tier || !cities) {
      return NextResponse.json({ error: "Invalid Data" });
    }

    await connectDB();

    const item = await mongoose.models.Item.create({
      name,
      enchantment,
      tier,
      cities,
    });
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
