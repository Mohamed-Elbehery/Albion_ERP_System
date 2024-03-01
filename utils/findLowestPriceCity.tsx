import { Item } from "@/types/item";

export const findLowestPriceCity = (items: Item[]) => {
  let lowestPriceCity = null;
  let lowestPrice = Infinity;

  items.forEach(item => {
    item.cities.forEach(city => {
      if (city.price < lowestPrice) {
        lowestPrice = city.price;
        lowestPriceCity = city.name;
      }
    });
  });

  return lowestPriceCity;
};