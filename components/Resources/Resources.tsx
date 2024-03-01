"use client";

import { cities } from "@/constants/cities";
import { Item, Price } from "@/types/item";
import { colors } from "@/constants/colors";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Resources() {
  const [data, setData] = useState<{
    items: Item[];
    lowestPrices: Price[];
  } | null>(null);
  const [query, setQuery] = useState("");

  const getAllItems = async () => {
    const res = await fetch(process.env.NODE_ENV === "development" ? "http://localhost:3000/api/items" : "https://albion-erp-system.vercel.app/api/items", {
      cache: "no-cache",
    });
    const data = await res.json();    

    setData(data);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <section className="overflow-auto min-h-screen">
      <div className="flex items-center justify-between w-[1175px]">
        <h1>
          Resources{" "}
          <span className="text-base">
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
          className="text-base inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Add Resource
        </Link>
      </div>
      <div className="mx-auto w-fit">
        <input
          className="text-base rounded-md p-2 text-black"
          placeholder="Search..."
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Head */}
      <table className="m-2 mt-6">
        <thead>
          <tr className="divide-x-2 space-x-7">
            <th className={`min-w-[130px] text-base p-2 bg-gray-700`}>
              Resources
            </th>
            {cities.map((city) => (
              <th
                style={{ color: city.textColor, backgroundColor: city.color }}
                key={city.name}
                className={`min-w-[130px] text-base p-2`}
              >
                {city.name}
              </th>
            ))}
            <th className={`min-w-[130px] text-base p-2 bg-gray-700`}>
              Recommended
            </th>
          </tr>
        </thead>
      </table>
      {/* Body */}
      <table className="m-2 mt-6">
        <tbody className="divide-y-2">
          {data?.items
            ?.filter(
              (item: Item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) &&
                item.cities.length > 0
            )
            ?.map((item: Item, idx: number) => (
              <tr
                key={`${item.name} ${item.tier}`}
                className="divide-x-2 space-x-7"
              >
                <td
                  className={`min-w-[130px] text-base p-2 py-3 text-center bg-gray-500 space-x-1 relative`}
                >
                  <span>{item.tier}</span> {item.name}
                  {/* Enchant circle */}
                  <div
                    style={{
                      backgroundColor: colors[item.enchantment - 1].bgColor,
                      color: colors[item.enchantment - 1].textColor,
                    }}
                    className="absolute top-[-12px] right-[-12px] size-6 rounded-full flex items-center justify-center"
                  >
                    {item.enchantment}
                  </div>
                </td>
                {item.cities.map((city) => (
                  <td
                    key={city.name}
                    className={`min-w-[130px] text-base p-2 py-4 text-center bg-gray-500`}
                  >
                    {city.price}
                  </td>
                ))}
                <td
                  className={`min-w-[130px] text-base p-2 py-4 text-center bg-gray-500 relative`}
                >
                  {data?.lowestPrices[idx].city}
                  {/* Star */}
                  <div className="absolute -top-[11px] -right-[12px] text-yellow-400">
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
