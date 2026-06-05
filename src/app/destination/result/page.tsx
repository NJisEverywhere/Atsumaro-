"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ
const DUMMY_DESTINATION = "USJ";

const DUMMY_RESULTS = [
  {
    id: "umeda",
    stationName: "梅田駅",
    lines: ["阪急神戸線", "大阪メトロ御堂筋線"],
    travelTimes: [
      { label: "自分", minutes: 20 },
      { label: "佐藤", minutes: 18 },
      { label: "田中", minutes: 24 },
    ],
    toDestinationMinutes: 15,
    fairnessScore: 6,
  },
  {
    id: "namba",
    stationName: "難波駅",
    lines: ["大阪メトロ御堂筋線", "近鉄難波線"],
    travelTimes: [
      { label: "自分", minutes: 30 },
      { label: "佐藤", minutes: 25 },
      { label: "田中", minutes: 18 },
    ],
    toDestinationMinutes: 20,
    fairnessScore: 12,
  },
  {
    id: "shin-osaka",
    stationName: "新大阪駅",
    lines: ["JR東海道本線", "大阪メトロ御堂筋線"],
    travelTimes: [
      { label: "自分", minutes: 15 },
      { label: "佐藤", minutes: 30 },
      { label: "田中", minutes: 35 },
    ],
    toDestinationMinutes: 25,
    fairnessScore: 20,
  },
];

const CATEGORIES = ["すべて", "カフェ", "居酒屋", "ご飯", "ショッピング"];

export default function DestinationResultPage() {
  const [activeCategory, setActiveCategory] = useState("すべて");

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/destination" className="text-gray-400 hover:text-gray-600 mr-3 text-xl">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-800">合流駅の候補</h1>
          <p className="text-xs text-gray-400">目的地：{DUMMY_DESTINATION}</p>
        </div>
      </header>

      {/* 地図プレースホルダー */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        地図（Google Maps）
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
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 候補駅カード一覧 */}
        <div className="flex flex-col gap-3">
          {DUMMY_RESULTS.map((result, index) => (
            <Link key={result.id} href={`/destination/result/${result.id}`}>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-teal-200 transition-colors">
                {/* 駅名・路線 */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full font-medium">
                          おすすめ
                        </span>
                      )}
                      <h2 className="text-base font-bold text-gray-800">{result.stationName}</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{result.lines.join(" / ")}</p>
                  </div>
                  {/* 移動差 */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">移動差</p>
                    <p className={`text-sm font-bold ${
                      result.fairnessScore <= 5
                        ? "text-teal-500"
                        : result.fairnessScore <= 10
                        ? "text-yellow-500"
                        : "text-red-400"
                    }`}>
                      {result.fairnessScore}分
                    </p>
                  </div>
                </div>

                {/* メンバーごとの移動時間（合流駅まで） */}
                <div className="flex gap-2 mb-3">
                  {result.travelTimes.map((t) => (
                    <div key={t.label} className="flex flex-col items-center bg-gray-50 rounded-xl px-3 py-2 flex-1">
                      <p className="text-xs text-gray-400">{t.label}</p>
                      <p className="text-sm font-bold text-gray-700">{t.minutes}分</p>
                    </div>
                  ))}
                </div>

                {/* 合流後 → 目的地 */}
                <div className="flex items-center gap-2 bg-teal-50 rounded-xl px-3 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  <p className="text-xs text-teal-700">
                    合流後、{DUMMY_DESTINATION}まで
                    <span className="font-bold ml-1">{result.toDestinationMinutes}分</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
