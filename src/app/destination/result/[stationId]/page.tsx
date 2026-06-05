"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ
const DUMMY_STATION = {
  stationName: "梅田駅",
  lines: ["阪急神戸線", "大阪メトロ御堂筋線"],
  destination: "USJ",
  toDestinationMinutes: 15,
  travelTimes: [
    { label: "自分", minutes: 20 },
    { label: "佐藤", minutes: 18 },
    { label: "田中", minutes: 24 },
  ],
};

const DUMMY_SPOTS = [
  { id: 1, name: "スターバックス 梅田店", category: "カフェ", rating: 4.3, distance: "徒歩3分", photo: "https://placehold.co/64x64/d4f1f9/0ea5e9?text=café" },
  { id: 2, name: "串カツ田中 梅田店", category: "居酒屋", rating: 4.0, distance: "徒歩5分", photo: "https://placehold.co/64x64/fde8d8/f97316?text=bar" },
  { id: 3, name: "551蓬莱 梅田店", category: "ご飯", rating: 4.5, distance: "徒歩2分", photo: "https://placehold.co/64x64/dcfce7/22c55e?text=food" },
  { id: 4, name: "タリーズコーヒー 梅田店", category: "カフェ", rating: 3.9, distance: "徒歩4分", photo: "https://placehold.co/64x64/d4f1f9/0ea5e9?text=café" },
  { id: 5, name: "ヨドバシ梅田", category: "ショッピング", rating: 4.4, distance: "徒歩1分", photo: "https://placehold.co/64x64/f3e8ff/a855f7?text=shop" },
];

const CATEGORIES = ["すべて", "カフェ", "居酒屋", "ご飯", "ショッピング"];

export default function DestinationStationDetailPage() {
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [copied, setCopied] = useState(false);

  const filteredSpots = DUMMY_SPOTS.filter(
    (spot) => activeCategory === "すべて" || spot.category === activeCategory
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* ヘッダー */}
      <header className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/destination/result" className="text-gray-400 hover:text-gray-600 mr-3 text-xl">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-800">{DUMMY_STATION.stationName}</h1>
          <p className="text-xs text-gray-400">目的地：{DUMMY_STATION.destination}</p>
        </div>
      </header>

      {/* 地図プレースホルダー */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        地図（Google Maps）
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 max-w-md mx-auto w-full">

        {/* 移動時間サマリー */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 mb-3">合流駅までの移動時間</p>
          <div className="flex gap-3 mb-3">
            {DUMMY_STATION.travelTimes.map((t) => (
              <div key={t.label} className="flex flex-col items-center bg-gray-50 rounded-xl px-3 py-2 flex-1">
                <p className="text-xs text-gray-400">{t.label}</p>
                <p className="text-base font-bold text-gray-700">{t.minutes}分</p>
              </div>
            ))}
          </div>

          {/* 合流後 → 目的地 */}
          <div className="flex items-center justify-between bg-teal-50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              <p className="text-sm text-teal-700 font-medium">
                合流後、{DUMMY_STATION.destination}まで
              </p>
            </div>
            <p className="text-sm font-bold text-teal-600">
              {DUMMY_STATION.toDestinationMinutes}分
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            路線：{DUMMY_STATION.lines.join(" / ")}
          </p>
        </section>

        {/* 周辺スポット（合流前の時間潰し） */}
        <section>
          <p className="text-sm font-semibold text-gray-600 mb-3">合流前の時間潰しスポット</p>

          {/* カテゴリフィルター */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
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

          {/* スポット一覧 */}
          <div className="flex flex-col gap-2">
            {filteredSpots.map((spot) => (
              <div key={spot.id} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-3">
                <img
                  src={spot.photo}
                  alt={spot.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{spot.name}</p>
                  <p className="text-xs text-gray-400">{spot.distance} ・ {spot.rating}</p>
                </div>
                <span className="text-xs text-gray-300 border border-gray-200 rounded-full px-2 py-0.5 shrink-0">
                  {spot.category}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* グループ共有ボタン（固定フッター） */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
        <button
          onClick={handleShare}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-2xl transition-colors"
        >
          {copied ? "コピーしました" : "グループ共有"}
        </button>
      </div>
    </main>
  );
}
