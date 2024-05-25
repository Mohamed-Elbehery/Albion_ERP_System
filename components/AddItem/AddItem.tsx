import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Item } from "@/types/item";
import mongoose from "mongoose";

const DEFAULT_CITIES = {
  Bridgewatch: "",
  Lymhurst: "",
  Martlock: "",
  Fortsterling: "",
  Thetford: "",
  Caerleon: "",
  Brecilien: "",
};

export default function AddItem({
  categoryId,
  updateCategories,
}: {
  categoryId: typeof mongoose.Schema.ObjectId;
  updateCategories: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [cities, setCities] = useState(DEFAULT_CITIES);
  const { register, handleSubmit, reset, setValue } = useForm<Item>({
    defaultValues: {
      name: "",
      cities: [],
      enchantment: 0,
      tier: "T3",
    },
  });

  const onSubmit = async (data: Item) => {
    const itemCities = Object.entries(data.cities).map(([name, price]) => ({
      name: name,
      price: parseInt(price as any),
    }));

    const item = {
      ...data,
      cities:
        itemCities.length > 0
          ? itemCities
          : [
              { name: "Bridgewatch", price: 0 },
              { name: "Lymhurst", price: 0 },
              { name: "Martlock", price: 0 },
              { name: "Fortsterling", price: 0 },
              { name: "Thetford", price: 0 },
              { name: "Caerleon", price: 0 },
              { name: "Brecilien", price: 0 },
            ],
    };

    const res = await fetch("api/create-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, categoryId }),
    });

    const finalData = await res.json();

    if (finalData.data) {
      updateCategories();
      reset({
        name: "",
        cities: DEFAULT_CITIES as any,
        enchantment: 0,
        tier: "T3",
      });
      toast.success(`The Item Has Been Created Successfully !!`);
      setOpen(false);
    }
  };

  const handleCitiesChange = (e: React.FormEvent<HTMLInputElement> | any) => {
    setCities((prev) => ({ ...prev, [e.target.name as any]: +e.target.value }));
    setValue("cities", {
      ...cities,
      [e.target.name as any]: +e.target.value,
    } as any);
  };

  return (
    <>
      <Dialog
        onOpenChange={(e) => {
          if (!e) {
            reset({
              name: "",
              cities: DEFAULT_CITIES as any,
              enchantment: 0,
              tier: "T3",
            });
            setOpen(e);
          } else {
            setOpen(e);
          }
        }}
        open={open}
      >
        <DialogTrigger asChild>
          <button className="text-sm inline-flex items-center justify-center h-12 animate-shimmer rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50">
            Add Item
          </button>
        </DialogTrigger>
        <DialogContent className="flex items-center justify-center bg-transparent border-none sm:max-w-[500px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gradient-to-br from-[#1aa2ba] to-[#395d7b] text-base rounded-md p-6 w-max mx-auto space-y-5"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Add Item</h1>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="flex flex-col gap-y-2">
                <label>Item Name</label>
                <input
                  {...register("name")}
                  className="border-2 rounded-md p-2 outline-0 text-black"
                  type="text"
                  placeholder="Item Name"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label>Item Enchantment</label>
                <select
                  {...register("enchantment")}
                  className="text-black p-2 rounded-md outline-0 flex-1"
                >
                  <option value="" disabled>
                    Select Item Enchantment
                  </option>
                  <option value="0">0</option>
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
                  {...register("tier")}
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
              Add Item
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
