import connectDB from "@/lib/db";
import Item from "@/models/item";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const item = await Item.deleteOne({ _id: params.id });
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
