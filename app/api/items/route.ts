import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const items = await mongoose.models.Item?.find({});

    let lowestPrices: any = [];

    items?.forEach((item: any) => {
      if (item.cities) {
        let lowestPriceCity = item.cities.reduce((minCity: any, city: any) => {
          return city.price < minCity.price ? city : minCity;
        }, item.cities[0]);

        lowestPrices.push({
          item: item?.name ?? "",
          city: lowestPriceCity?.name ?? "",
          price: lowestPriceCity?.price ?? 0,
        });
      }
    });

    return NextResponse.json({ items, lowestPrices });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
