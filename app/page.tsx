"use client"

export default function Home() {
  return (
    <div className="p-12 bg-white w-auto rounded-3xl flex flex-col">
      <div className="flex justify-start gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="day">
            <p className="text-xs text-gray-500 font-bold tracking-widest pb-2">DAY</p>
              <div className="px-20 w-36 h-14 border border-gray-200 rounded-md focus-within:border-purple-400 flex justify-center items-center">
                <input type="number" name="day" id="day" placeholder="DD" className="p-0 h-12 w-32 outline-none font-black text-2xl" />
              </div>
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="month">
            <p className="text-xs text-gray-500 font-bold tracking-widest pb-2">MONTH</p>
            <div className="px-20 w-36 h-14 border border-gray-200 rounded-md focus-within:border-purple-400 flex justify-center items-center">
                <input type="number" name="month" id="month" placeholder="MM" className="p-0 h-12 w-32 outline-none font-black text-2xl" />
              </div>
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="year">
            <p className="text-xs text-gray-500 font-bold tracking-widest pb-2">YEAR</p>
            <div className="px-20 w-36 h-14 border border-gray-200 rounded-md focus-within:border-purple-400 flex justify-center items-center">
                <input type="number" name="year" id="year" placeholder="YYYY" className="p-0 h-12 w-32 outline-none font-black text-2xl" />
              </div>
          </label>
        </div>
      </div>
      <div>Row 2</div>
      <div>Row 3</div>
    </div>
  );
}
