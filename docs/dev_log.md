# 開発ログ（苦労したこと・考えたこと）

就活での技術的な話のネタとして、設計で悩んだポイントをメモしておく。

---

## ファイル構成の設計（2026/06/05）

### 最初に考えた構成

```
src/
├── app/
│   ├── midpoint/page.tsx
│   ├── destination/page.tsx
│   ├── result/[groupId]/page.tsx
│   └── api/
│       ├── midpoint/route.ts
│       └── destination/route.ts
├── components/
│   ├── ui/
│   ├── map/
│   └── forms/
├── lib/
│   ├── google/
│   └── supabase/
└── types/
    └── index.ts
```

### 問題点（自分で気づいた・指摘された点）

**① ページ数が足りていなかった**
仕様では「入力 → 計算中 → 結果一覧 → 候補詳細」という4画面の流れがあるのに、
`midpoint/page.tsx` 一枚に詰め込もうとしていた。
画面の流れがそのままルーティングに反映されるべきだと気づき、
`midpoint/result/page.tsx` や `midpoint/result/[stationId]/page.tsx` に分割した。

**② `types/index.ts` 一ファイルへの集約は破綻する**
機能が増えると肥大化して管理できなくなる。
`map.ts` / `group.ts` / `api.ts` とドメインごとに分割する方針に変更した。

**③ `hooks/` ディレクトリが抜けていた**
位置情報取得（`useGeolocation`）・Supabase Realtime購読（`useGroupRealtime`）・
Places Autocomplete（`usePlacesSearch`）など、カスタムフックが必ず必要になる。
最初の設計では hooks の置き場所を考えていなかった。

### 修正後の構成

```
src/
├── app/
│   ├── page.tsx
│   ├── midpoint/
│   │   ├── page.tsx
│   │   └── result/
│   │       ├── page.tsx
│   │       └── [stationId]/page.tsx
│   ├── destination/
│   │   ├── page.tsx
│   │   └── result/
│   │       ├── page.tsx
│   │       └── [stationId]/page.tsx
│   ├── group/[groupId]/page.tsx
│   └── api/
│       ├── midpoint/route.ts
│       └── destination/route.ts
├── components/
│   ├── ui/
│   ├── map/
│   └── forms/
├── hooks/
│   ├── useGeolocation.ts
│   ├── useGroupRealtime.ts
│   └── usePlacesSearch.ts
├── lib/
│   ├── google/
│   └── supabase/
└── types/
    ├── map.ts
    ├── group.ts
    └── api.ts
```

### 学び
「とりあえず分けた」構成は、実装が進むにつれて必ず破綻する。
設計段階で画面の流れ・型の粒度・カスタムフックの存在まで考慮することが重要だった。
