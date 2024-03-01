import connectDB from "@/lib/db";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();

    if(!Item) return;

    const items = await Item?.find({});    

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
