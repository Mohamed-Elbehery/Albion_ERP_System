import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Category } from "@/types/category";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddCategory({
  updateCategories,
}: {
  updateCategories: () => Promise<void>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<Category>({
    defaultValues: {
      name: "",
      items: [],
    },
  });

  const onSubmit = async (data: Category) => {
    const res = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/create-category"
          : "https://albion-erp-system.vercel.app/api/create-category"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const finalData = await res.json();

    if (finalData.data) {
      updateCategories();
      reset({ name: "" });
      setOpen(false);
      toast.success(
        `${finalData.data.name} Category Has Been Created Successfully !!`
      );
    }
  };

  return (
    <>
      <Dialog
        onOpenChange={(e) => {
          if (!e) {
            reset({ name: "", items: [] });
            setOpen(e);
          } else {
            setOpen(e);
          }
        }}
        open={open}
      >
        <DialogTrigger asChild>
          <button className="text-sm inline-flex items-center justify-center h-12 animate-shimmer rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50">
            Add Category
          </button>
        </DialogTrigger>
        <DialogContent className="flex items-center justify-center bg-transparent border-none sm:max-w-[500px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gradient-to-br from-[#1aa2ba] to-[#395d7b] text-base rounded-md p-6 w-full mx-auto space-y-5"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Add Category</h1>
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Category Name</label>
              <input
                {...register("name")}
                required
                className="border-2 rounded-md p-2 outline-0 text-black"
                type="text"
                placeholder="Category Name"
              />
            </div>
            {/* Submit Button */}
            <button className="block mx-auto text-base h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50">
              Add Category
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
