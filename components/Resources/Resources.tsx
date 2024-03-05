"use client";

import { cities } from "@/constants/cities";
import { Item, Price } from "@/types/item";
import { colors } from "@/constants/colors";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Resources() {
  const [data, setData] = useState<{
    items: Item[];
    lowestPrices: Price[];
  } | null>(null);
  const [query, setQuery] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [calculate, setCalculate] = useState(false);
  const [itemCalculattion, setItemCalculattion] = useState<number>(0);

  const handleDelete = async (id: string) => {
    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/api/delete-item/${id}`
        : `https://albion-erp-system.vercel.app/api/delete-item/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Deleted resource successfully");
      getAllItems();
    } else {
      toast.success("Failed to deleted resource");
    }
  };

  const getAllItems = async () => {
    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/items"
        : "https://albion-erp-system.vercel.app/api/items",
      {
        cache: "no-cache",
      }
    );
    const data = await res.json();

    setData(data);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      <section className="overflow-auto min-h-screen">
        <div className="flex items-center justify-between w-[1175px] pt-2">
          <h1>
            Resources{" "}
            <span className="text-sm">
              (
              {
                data?.items?.filter(
                  (item: Item) =>
                    item.name.toLowerCase().includes(query.toLowerCase()) &&
                    item.cities.length > 0
                ).length
              }
              )
            </span>
          </h1>
          <Link
            href="addResource"
            className="text-sm inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Add Resource
          </Link>
        </div>
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
              {quantity! > 0 && <p className="text-base">{itemCalculattion * quantity!}</p>}
              <input
                className="text-sm rounded-md p-2 text-black"
                placeholder="Quantity..."
                type="number"
                value={quantity!}
                onChange={(e) =>
                  setQuantity(+e.target.value === 0 ? null : +e.target.value)
                }
              />
            </div>
          )}
        </div>
        {/* Headers */}
        <div className="grid grid-cols-10 m-2 mt-6 w-full">
          <h4 className="text-sm p-2 bg-gray-700 text-center">Resources</h4>
          {cities.map((city) => (
            <h4
              style={{ color: city.textColor, backgroundColor: city.color }}
              key={city.name}
              className={`text-sm p-2 text-center`}
            >
              {city.name}
            </h4>
          ))}
          <h4 className={`text-sm p-2 bg-gray-700 text-center`}>Recommended</h4>
        </div>
        {/* Data */}
        <div className="m-2 mt-6 w-full">
          {data?.items
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
                      backgroundColor: colors[item.enchantment]?.bgColor,
                      color: colors[item.enchantment]?.textColor,
                    }}
                    className="absolute top-[-12px] right-[-12px] size-6 rounded-full flex items-center justify-center"
                  >
                    {item.enchantment}
                  </div>
                </h4>
                {item.cities.map((city) => (
                  <h4
                    key={city.name}
                    className={`text-sm p-2 py-4 text-center bg-gray-500 border-r border-t`}
                  >
                    {city.price}
                  </h4>
                ))}
                <h4
                  className={`group relative text-sm p-2 py-4 text-center bg-gray-500 border-t cursor-default hover:overflow-hidden`}
                >
                  {data?.lowestPrices[idx].city}
                  {/* Star */}
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
                      onClick={() => handleDelete(item._id)}
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
                        setItemCalculattion(data?.lowestPrices[idx].price);
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
                    <Link href={`/editResource/${item._id}`} title="Edit">
                      <Image
                        src={
                          "https://cdn-icons-png.flaticon.com/128/1828/1828270.png"
                        }
                        width={24}
                        height={24}
                        alt="Edit Icon"
                      />
                    </Link>
                  </div>
                </h4>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
