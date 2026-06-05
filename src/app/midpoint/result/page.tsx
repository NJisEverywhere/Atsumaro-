"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ
const DUMMY_RESULTS = [
  {
    id: "shinjuku",
    stationName: "新宿駅",
    lines: ["JR山手線", "小田急線", "京王線"],
    travelTimes: [
      { label: "自分", minutes: 18 },
      { label: "佐藤", minutes: 22 },
      { label: "田中", minutes: 20 },
    ],
    fairnessScore: 4, // 最大差（分）
  },
  {
    id: "shibuya",
    stationName: "渋谷駅",
    lines: ["JR山手線", "東急田園都市線"],
    travelTimes: [
      { label: "自分", minutes: 24 },
      { label: "佐藤", minutes: 18 },
      { label: "田中", minutes: 26 },
    ],
    fairnessScore: 8,
  },
  {
    id: "ikebukuro",
    stationName: "池袋駅",
    lines: ["JR山手線", "西武池袋線", "東武東上線"],
    travelTimes: [
      { label: "自分", minutes: 30 },
      { label: "佐藤", minutes: 12 },
      { label: "田中", minutes: 28 },
    ],
    fairnessScore: 18,
  },
];

const CATEGORIES = ["すべて", "カフェ", "居酒屋", "ご飯", "ショッピング"];

export default function MidpointResultPage() {
  const [activeCategory, setActiveCategory] = useState("すべて");

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/midpoint" className="text-gray-400 hover:text-gray-600 mr-3 text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold text-gray-800">中間地点の候補</h1>
      </header>

      {/* 地図プレースホルダー */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        🗺️ 地図（Google Maps）
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 max-w-md mx-auto w-full">

        {/* カテゴリフィルター */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-sky-400 text-white border-sky-400"
                  : "bg-white text-gray-600 border-gray-200 hover:border-sky-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 候補駅カード一覧 */}
        <div className="flex flex-col gap-3">
          {DUMMY_RESULTS.map((result, index) => (
            <Link key={result.id} href={`/midpoint/result/${result.id}`}>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-sky-200 transition-colors">
                {/* 駅名・路線 */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <span className="text-xs bg-sky-400 text-white px-2 py-0.5 rounded-full font-medium">
                          おすすめ
                        </span>
                      )}
                      <h2 className="text-base font-bold text-gray-800">{result.stationName}</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{result.lines.join(" / ")}</p>
                  </div>
                  {/* 公平スコア */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">移動差</p>
                    <p className={`text-sm font-bold ${result.fairnessScore <= 5 ? "text-sky-500" : result.fairnessScore <= 10 ? "text-yellow-500" : "text-red-400"}`}>
                      {result.fairnessScore}分
                    </p>
                  </div>
                </div>

                {/* メンバーごとの移動時間 */}
                <div className="flex gap-3">
                  {result.travelTimes.map((t) => (
                    <div key={t.label} className="flex flex-col items-center bg-gray-50 rounded-xl px-3 py-2 flex-1">
                      <p className="text-xs text-gray-400">{t.label}</p>
                      <p className="text-sm font-bold text-gray-700">{t.minutes}分</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
