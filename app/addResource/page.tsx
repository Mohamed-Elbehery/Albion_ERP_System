"use client";

import Link from "next/link";
import { useState } from "react";

const DEFAULT_RESOURCE = {
  name: "",
  enchantment: "",
  tier: "",
};

const DEFAULT_CITIES = {
  Bridgewatch: "",
  Lymhurst: "",
  Martlock: "",
  Fortsterling: "",
  Thetford: "",
  Caerleon: "",
  Brecilien: "",
};

export default function AddResource() {
  const [resource, setResource] = useState(DEFAULT_RESOURCE);
  const [cities, setCities] = useState(DEFAULT_CITIES);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemCities = Object.entries(cities).map(([name, price]) => ({
      name,
      price: parseInt(price as string),
    }));

    const item = { ...resource, cities:itemCities };

    const res = await fetch("http://localhost:3000/api/create-item", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) {
      setResource(() => DEFAULT_RESOURCE);
      setCities(() => DEFAULT_CITIES);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement> | any) => {
    setResource((prev) => ({
      ...prev,
      [e.target.name as any]: e.target.value,
    }));
  };

  const handleCitiesChange = (e: React.FormEvent<HTMLInputElement> | any) => {
    setCities((prev) => ({ ...prev, [e.target.name as any]: +e.target.value }));
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#1aa2ba] to-[#395d7b] text-base rounded-md p-6 w-max mx-auto space-y-5"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Add Resource</h1>
          <Link className="underline" href={"/"}>
            Back
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex flex-col gap-y-2">
            <label>Item Name</label>
            <input
              required
              name="name"
              onChange={handleChange}
              value={resource.name}
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="text"
              placeholder="Item Name"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Item Enchantment</label>
            <select
              required
              name="enchantment"
              onChange={handleChange}
              value={resource.enchantment}
              className="text-black p-2 rounded-md outline-0 flex-1"
            >
              <option value="" disabled>
                Select Item Enchantment
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="space-x-4 flex items-center">
          <div className="flex flex-col gap-y-2">
            <label>Bridgewatch Price</label>
            <input
              required
              value={cities.Bridgewatch}
              onChange={handleCitiesChange}
              name="Bridgewatch"
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="number"
              placeholder="Bridgewatch Price"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Lymhurst Price</label>
            <input
              required
              value={cities.Lymhurst}
              onChange={handleCitiesChange}
              name="Lymhurst"
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="number"
              placeholder="Lymhurst Price"
            />
          </div>
        </div>
        <div className="space-x-4 flex items-center">
          <div className="flex flex-col gap-y-2">
            <label>Martlock Price</label>
            <input
              required
              value={cities.Martlock}
              onChange={handleCitiesChange}
              name="Martlock"
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="number"
              placeholder="Martlock Price"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Fortsterling Price</label>
            <input
              required
              value={cities.Fortsterling}
              onChange={handleCitiesChange}
              name="Fortsterling"
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="number"
              placeholder="Fortsterling Price"
            />
          </div>
        </div>
        <div className="space-x-4 flex items-center">
          <div className="flex flex-col gap-y-2">
            <label>Thetford Price</label>
            <input
              required
              value={cities.Thetford}
              onChange={handleCitiesChange}
              name="Thetford"
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="number"
              placeholder="Thetford Price"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Caerleon Price</label>
            <input
              required
              value={cities.Caerleon}
              onChange={handleCitiesChange}
              name="Caerleon"
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="number"
              placeholder="Caerleon Price"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex flex-col gap-y-2">
            <label>Brecilien Price</label>
            <input
              required
              value={cities.Brecilien}
              onChange={handleCitiesChange}
              name="Brecilien"
              className="border-2 rounded-md p-2 outline-0 text-black"
              type="number"
              placeholder="Brecilien Price"
            />
          </div>
          <div className="flex flex-col gap-y-2 flex-1">
            <label>Item Tier</label>
            <select
              required
              name="tier"
              onChange={handleChange}
              value={resource.tier}
              className="text-black p-2 rounded-md outline-0"
            >
              <option value="" disabled>
                Select Item Tier
              </option>
              <option value="T3">T3</option>
              <option value="T4">T4</option>
              <option value="T5">T5</option>
              <option value="T6">T6</option>
              <option value="T7">T7</option>
              <option value="T8">T8</option>
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <button className="block mx-auto text-base h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50">
          Add Resource
        </button>
      </form>
    </section>
  );
}
