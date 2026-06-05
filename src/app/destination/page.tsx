"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DestinationPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [memberCount, setMemberCount] = useState(2);
  const [locations, setLocations] = useState<string[]>(["", ""]);

  // 人数が変わったら入力欄の数を調整
  const handleMemberCountChange = (count: number) => {
    setMemberCount(count);
    setLocations((prev) => {
      const next = [...prev];
      while (next.length < count) next.push("");
      return next.slice(0, count);
    });
  };

  // 出発地の更新
  const handleLocationChange = (index: number, value: string) => {
    setLocations((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // 目的地・全出発地が入力済みかチェック
  const isReady =
    destination.trim() !== "" && locations.every((loc) => loc.trim() !== "");

  const handleSubmit = () => {
    if (!isReady) return;
    // TODO: API呼び出し → 結果ページへ遷移
    router.push("/destination/result");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="text-gray-400 hover:text-gray-600 mr-3 text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold text-gray-800">目的地モード</h1>
      </header>

      <div className="flex flex-col gap-6 px-4 py-6 max-w-md mx-auto w-full">

        {/* 目的地入力 */}
        <section>
          <p className="text-sm font-semibold text-gray-600 mb-3">目的地を入力</p>
          <div className="flex items-center gap-2 bg-white border-2 border-teal-400 rounded-xl px-4 py-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="USJ・東京ディズニーランド・渋谷スクランブルスクエア"
              className="flex-1 text-sm text-gray-800 outline-none placeholder-gray-300"
            />
          </div>
        </section>

        {/* 仕切り */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-xs text-gray-400 shrink-0">各自の出発地</p>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* 人数選択 */}
        <section>
          <p className="text-sm font-semibold text-gray-600 mb-3">人数を選択</p>
          <div className="flex gap-2">
            {[2, 3, 4, 5].map((count) => (
              <button
                key={count}
                onClick={() => handleMemberCountChange(count)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                  memberCount === count
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
                }`}
              >
                {count}人
              </button>
            ))}
          </div>
        </section>

        {/* 出発地入力 */}
        <section className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-600">出発地を入力</p>
          {locations.map((loc, index) => (
            <div key={index} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-600 text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <input
                type="text"
                value={loc}
                onChange={(e) => handleLocationChange(index, e.target.value)}
                placeholder={index === 0 ? "自分の出発地（駅名・住所）" : `メンバー${index + 1}の出発地`}
                className="flex-1 text-sm text-gray-800 outline-none placeholder-gray-300"
              />
              {/* GPSボタン */}
              <button
                onClick={() => handleLocationChange(index, "現在地")}
                className="shrink-0 text-gray-400 hover:text-teal-500 transition-colors"
                title="現在地を使用"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
              </button>
            </div>
          ))}
        </section>

        {/* 探すボタン */}
        <button
          onClick={handleSubmit}
          disabled={!isReady}
          className={`w-full py-4 rounded-2xl text-base font-bold transition-colors ${
            isReady
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          合流駅を探す
        </button>
      </div>
    </main>
  );
}
