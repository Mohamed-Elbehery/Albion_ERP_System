import connectDB from "@/lib/db";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, items } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Invalid Data" });
    }

    await connectDB();

    const category = await Category.create({
      name,
      items: items ?? [],
    });

    return NextResponse.json({ data: category });
  } catch (error) {
    console.log(error, "wtf");

    return NextResponse.json({ error }, { status: 400 });
  }
}
