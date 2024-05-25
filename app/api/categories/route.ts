import connectDB from "@/lib/db";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();

    if (!Category) return;

    const categories = await Category?.find();

    let lowestPrices: any = [];

    categories.forEach((cat) => {
      cat.items?.forEach((item: any) => {
        if (item.cities) {
          let lowestPriceCity = item.cities.reduce(
            (minCity: any, city: any) => {
              return city.price < minCity.price ? city : minCity;
            },
            item.cities[0]
          );

          lowestPrices.push({
            item: item?.name ?? "",
            city: lowestPriceCity?.name ?? "",
            price: lowestPriceCity?.price ?? 0,
            itemId: item?._id.toString() ?? "",
          });
        }
      });
    });

    return NextResponse.json({ data: categories, lowestPrices });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
