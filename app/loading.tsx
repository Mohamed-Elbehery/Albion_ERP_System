export default function loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col gap-y-3 min-h-screen">
      <p className="text-base font-bold">Money Laundering</p>
      <div className="loader"></div>
    </div>
  );
}
