import connectDB from "@/lib/db";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;

    const categoryId = searchParams.get("categoryId");

    const category = await Category.deleteOne({_id: categoryId});

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
