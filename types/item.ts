export type City = {
  _id: string;
  name: string;
  price: number;
};

export type Item = {
  _id: string;
  name: string;
  enchantment: 1 | 2 | 3 | 4;
  tier: "T3" | "T4" | "T5" | "T6" | "T7" | "T8";
  cities: City[];
};

export type Price = {
  item: string;
  city: string;
  price: number;
};

export type Resources = {
  items: Item[];
  lowestPrices: Price[];
} | null;
