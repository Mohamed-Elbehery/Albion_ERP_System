import Resources from "@/components/Resources/Resources";
import Selling from "@/components/Selling/Selling";
import { Tabs } from "@/components/ui/tabs";

export default function Home() {

  const tabs = [
    {
      title: "Resources",
      value: "resources",
      content: (
        <div className="w-full relative h-auto rounded-2xl p-10 px-5 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#1aa2ba] to-[#395d7b] !z-[9999999]">
          <Resources/>
        </div>
      ),
    },
    {
      title: "Selling",
      value: "selling",
      content: (
        <div className="w-full overflow-hidden relative min-h-[40rem] rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#1aa2ba] to-[#395d7b]">
          <Selling />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-[1400px] mx-auto w-full items-start justify-start my-40 px-8 min-h-screen">
      <Tabs tabs={tabs} />
    </div>
  );
}
