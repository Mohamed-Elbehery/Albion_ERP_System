"use client";

import { cities } from "@/constants/cities";
import { City, Item } from "@/types/item";
import { colors } from "@/constants/colors";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { formatPrice } from "@/utils/formatPrice";
import AddCategory from "../AddCategory/AddCategory";
import { Category } from "@/types/category";
import AddItem from "../AddItem/AddItem";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "../ui/input";
import NO_DATA from "@/assets/no_data.svg";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../ui/text-reveal-card";

export default function Resources() {
  const [data, setData] = useState<{
    data: Category[];
    lowestPrices: { city: string; price: number }[];
  } | null>(null);
  const [query, setQuery] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [tax, setTax] = useState<number | null>(null);
  const [calculate, setCalculate] = useState(false);
  const [itemCalculattion, setItemCalculattion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openedCategories, setOpenedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [updateCitiesData, setUpdateCitiesData] = useState<City[]>([]);
  const [updateCategoryID, setUpdateCategoryID] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);

  const total = itemCalculattion * quantity!;

  const handleDelete = async (id: string, categoryId: string) => {
    setIsLoading(true);

    const res = await fetch(
      `api/delete-item?categoryId=${categoryId}&itemId=${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      getAllCategories();
      toast.success("Deleted resource successfully");
    } else {
      toast.error("Failed to delete resource");
    }

    setIsLoading(false);
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const itemCities = Object.entries(updateCitiesData).map(([_, price]) => ({
      name: price.name,
      price: price.price,
    }));

    const item = { cities: itemCities };

    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/api/update-item?categoryId=${updateCategoryID}&itemId=${mode}`
        : `https://albion-erp-system.vercel.app/api/update-item?categoryId=${updateCategoryID}&itemId=${mode}`,
      {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast.success("Updated resource successfully");
      setMode(null);
      setUpdateCitiesData([]);
      setUpdateCategoryID(null);
      getAllCategories();
      return setIsLoading(false);
    }

    toast.error("Failed to update resource");
    setMode(null);
    setUpdateCitiesData([]);
    setUpdateCategoryID(null);
    setIsLoading(false);
  };

  const getAllCategories = async () => {
    setIsLoading(true);

    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/categories"
        : "https://albion-erp-system.vercel.app/api/categories",
      {
        cache: "no-cache",
      }
    );

    const data = await res.json();

    setData(data);
    setOpenedCategories(
      data.data.reduce((acc: any, cat: any) => {
        acc[cat._id.toString()] = true;

        return acc;
      }, {})
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="overflow-auto min-h-screen">
        <div className="flex items-center justify-between max-w-[1175px] pt-2">
          <h1>Resources</h1>

          <div className="mx-auto w-fit">
            {!calculate ? (
              <input
                className="text-sm rounded-md p-2 text-black"
                placeholder="Search By Item Name..."
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                value={query!}
              />
            ) : (
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() => setCalculate(false)}
                  className="text-sm inline-flex h-9 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  Cancel
                </button>
                {quantity! > 0 && (
                  <p className="text-base">
                    {formatPrice(total * (tax! / 100) + total)} silver
                  </p>
                )}
                <input
                  className="text-sm rounded-md p-2 text-black"
                  placeholder="Quantity..."
                  type="number"
                  value={quantity!}
                  onChange={(e) =>
                    setQuantity(+e.target.value === 0 ? null : +e.target.value)
                  }
                />
                <input
                  className="text-sm rounded-md p-2 text-black"
                  placeholder="Tax..."
                  type="number"
                  value={tax!}
                  onChange={(e) =>
                    setTax(+e.target.value === 0 ? null : +e.target.value)
                  }
                />
              </div>
            )}
          </div>

          <AddCategory updateCategories={getAllCategories} />
        </div>

        {data?.data.length == 0 && (
          <div className="mt-32 mx-auto flex flex-col items-center">
            <Image
              src={NO_DATA}
              width={200}
              height={200}
              alt="No Data Picture"
            />

            <h3 className="text-4xl mb-3 mt-6 flex items-center gap-x-2">
              There&apos;s No Data to Display{" "}
              <TextRevealCard
                text="My Friend"
                revealText="My Homie"
              />
            </h3>

            <p className="text-[16px]">
              Click on Add Category button to start earning money :D
            </p>
          </div>
        )}

        {data?.data?.map((cat) => (
          <Fragment key={cat._id.toString()}>
            <div className="flex items-center justify-between max-w-[1175px] mt-14">
              <div className="flex-1">
                <button
                  onClick={() => {
                    if (openedCategories[cat._id.toString()]) {
                      setOpenedCategories((prev) => ({
                        ...prev,
                        [cat._id.toString()]: false,
                      }));
                    } else {
                      setOpenedCategories((prev) => ({
                        ...prev,
                        [cat._id.toString()]: true,
                      }));
                    }
                    openedCategories[cat._id.toString()];
                  }}
                  className="flex items-center gap-x-2 cursor-pointer"
                >
                  {cat.name}{" "}
                  {openedCategories[cat._id.toString()] ? (
                    <ChevronDown size={28} />
                  ) : (
                    <ChevronUp size={28} />
                  )}
                </button>
              </div>

              <div className="space-x-2">
                <AddItem
                  updateCategories={getAllCategories}
                  categoryId={cat._id}
                />

                <button
                  onClick={async () => {
                    setIsLoading(true);
                    const res = await fetch(
                      `/api/delete-category?categoryId=${cat._id.toString()}`,
                      {
                        method: "DELETE",
                      }
                    );

                    const data = await res.json();

                    if (data) {
                      toast.success("Category deleted Successfully");
                    } else {
                      toast.error("Failed to delete category");
                    }

                    getAllCategories();
                  }}
                  className="p-[3px] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-400 rounded-lg" />
                  <span className="block text-base px-4 py-2 rounded-[6px] bg-opacity-40 relative group transition duration-200 text-white hover:bg-transparent">
                    Delete Category
                  </span>
                </button>
              </div>
            </div>

            {/* Headers */}
            {cat.items.length > 0 && openedCategories[cat._id.toString()] && (
              <>
                <div className="grid grid-cols-10 m-2 mt-6 w-full">
                  <h4 className="text-sm p-2 bg-gray-700 text-center">
                    Resources
                  </h4>

                  {cities.map((city) => (
                    <h4
                      style={{
                        color: city.textColor,
                        backgroundColor: city.color,
                      }}
                      key={city.name}
                      className={`text-sm p-2 text-center`}
                    >
                      {city.name}
                    </h4>
                  ))}

                  <h4 className={`text-sm p-2 bg-gray-700 text-center`}>
                    Recommended
                  </h4>
                </div>

                {/* Data */}
                <div className="m-2 mt-6 w-full">
                  {cat?.items
                    ?.filter(
                      (item: Item) =>
                        item.name.toLowerCase().includes(query.toLowerCase()) &&
                        item.cities.length > 0
                    )
                    ?.map((item: Item, idx: number) => (
                      <div className="grid grid-cols-10" key={item._id}>
                        <h4
                          className={`text-sm p-2 py-3 text-center bg-gray-500 space-x-1 relative border-r border-t flex items-center justify-center gap-x-2`}
                        >
                          <span>{item.tier}</span> {item.name}
                          {/* Enchant circle */}
                          <div
                            style={{
                              backgroundColor:
                                colors[item.enchantment]?.bgColor,
                              color: colors[item.enchantment]?.textColor,
                            }}
                            className="absolute top-[-12px] right-[-12px] size-6 rounded-full flex items-center justify-center z-10"
                          >
                            {item.enchantment}
                          </div>
                        </h4>

                        {mode
                          ? updateCitiesData.map((city) => (
                              <div className="relative" key={city.name}>
                                <Input
                                  className={`text-sm text-center bg-gray-500 bg-opacity-50 border-0 border-r border-t h-full rounded-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                                  type="number"
                                  value={city.price}
                                  onChange={(e) => {
                                    const newCityPrice = e.target.value;

                                    const newCities = updateCitiesData.map(
                                      (c, idx) => {
                                        if (c.name === city.name) {
                                          return {
                                            ...city,
                                            price: +newCityPrice,
                                          };
                                        } else return c;
                                      }
                                    );

                                    setUpdateCitiesData(newCities);
                                  }}
                                />
                                <div className="absolute bottom-1 left-4 right-4 h-1 bg-white rounded-md" />
                              </div>
                            ))
                          : item.cities.map((city) => (
                              <h4
                                key={city.name}
                                className={`text-sm p-2 py-4 text-center bg-gray-500 border-r border-t`}
                              >
                                {city.price}
                              </h4>
                            ))}

                        {mode ? (
                          <button
                            onClick={handleUpdate}
                            className="ml-2 text-white px-8 py-0.5 border-2 border-black dark:border-white uppercase bg-green-600 transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                          >
                            Save
                          </button>
                        ) : (
                          <h4
                            className={`group relative text-sm p-2 py-4 text-center bg-gray-500 border-t cursor-default hover:overflow-hidden`}
                          >
                            {data?.lowestPrices[idx].city}
                            <div className="group-hover:hidden absolute -top-[11px] -right-[12px] text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="absolute bg-white inset-0 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-x-2">
                              <button
                                onClick={() =>
                                  handleDelete(item._id, cat._id.toString())
                                }
                                title="Delete"
                              >
                                <Image
                                  src={
                                    "https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                                  }
                                  width={24}
                                  height={24}
                                  alt="Trash / Delete Icon"
                                />
                              </button>
                              <button
                                onClick={() => {
                                  setCalculate(true);
                                  setItemCalculattion(
                                    data?.lowestPrices[idx].price
                                  );
                                }}
                                title="Calculate"
                              >
                                <Image
                                  src={
                                    "https://cdn-icons-png.flaticon.com/128/548/548353.png"
                                  }
                                  width={24}
                                  height={24}
                                  alt="Calculate Icon"
                                />
                              </button>
                              <button
                                onClick={() => {
                                  if (mode) setMode(null);
                                  else {
                                    setMode(item._id);
                                    setUpdateCategoryID(cat._id.toString());
                                    setUpdateCitiesData(item.cities);
                                  }
                                }}
                                title="Edit"
                              >
                                <Image
                                  src={
                                    "https://cdn-icons-png.flaticon.com/128/1828/1828270.png"
                                  }
                                  width={24}
                                  height={24}
                                  alt="Edit Icon"
                                />
                              </button>
                            </div>
                          </h4>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
          </Fragment>
        ))}
      </section>
    </>
  );
}
