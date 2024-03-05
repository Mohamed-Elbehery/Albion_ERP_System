import connectDB from "@/lib/db";
import Item from "@/models/item";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!Item) return;

    const item = await Item?.findById(params.id);

    return NextResponse.json(item);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
