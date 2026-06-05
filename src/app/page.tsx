import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      {/* ロゴ・タイトル */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-2 mb-4">
          {/* ピンアイコン（簡易SVG） */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="16" cy="18" r="8" fill="#4FC3F7" />
            <path d="M16 26 L16 38" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="18" r="8" fill="#81C784" />
            <path d="M32 26 L32 38" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Atsumaro</h1>
        <p className="mt-2 text-gray-500 text-sm">集まる場所も、向かう道も、Atsumaro で。</p>
      </div>

      {/* モード選択 */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/midpoint">
          <button className="w-full flex items-center gap-4 bg-white border-2 border-sky-400 rounded-2xl px-6 py-5 shadow-sm hover:bg-sky-50 transition-colors">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-400 text-white font-bold text-sm shrink-0">
              1
            </span>
            <span className="text-lg font-semibold text-gray-800">中間地点モード</span>
          </button>
        </Link>

        <Link href="/destination">
          <button className="w-full flex items-center gap-4 bg-teal-500 rounded-2xl px-6 py-5 shadow-sm hover:bg-teal-600 transition-colors">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-teal-600 font-bold text-sm shrink-0">
              2
            </span>
            <span className="text-lg font-semibold text-white">目的地モード</span>
          </button>
        </Link>
      </div>

      {/* サブテキスト */}
      <p className="mt-10 text-xs text-gray-400 text-center">
        出発地を入力するだけで、<br />最適な合流地点を自動提案します
      </p>
    </main>
  );
}
