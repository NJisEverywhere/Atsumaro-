# Atsumaro 技術スタック

## 使用技術一覧と選定理由

---

### Frontend

| 技術 | バージョン | 選定理由 |
|---|---|---|
| **Next.js** | 15（App Router） | Reactベースのフルスタックフレームワーク。App RouterによるServer Componentsでパフォーマンスを確保しつつ、API Routesでバックエンドも一体管理できる。Vercelとの親和性が高くデプロイが容易。 |
| **TypeScript** | 最新安定版 | 型安全性により、APIレスポンスや地図APIのデータ構造を明示的に扱える。チーム開発・保守性を考慮して採用。 |
| **Tailwind CSS** | v3 | ユーティリティファーストのCSSフレームワーク。コンポーネントごとにスタイルが完結し、デザインの一貫性を保ちやすい。 |

### Backend

| 技術 | 選定理由 |
|---|---|
| **Next.js API Routes** | フロントエンドと同一リポジトリでAPIを管理できる。中間地点の計算ロジックや外部APIへのリクエストをサーバーサイドで処理することで、APIキーをクライアントに露出させない。 |

### Database / 認証

| 技術 | 選定理由 |
|---|---|
| **Supabase** | PostgreSQLベースのBaaS。認証機能・リアルタイムDB・Storage が即座に使える。グループ共有・投票機能のリアルタイム反映に活用。無料枠（DB 500MB・認証・Realtime込み）で小規模運用が可能。 |

### 外部API

| API | 用途 | 選定理由 |
|---|---|---|
| **Google Maps JavaScript API** | 地図の表示・ピン表示 | 日本国内の地図精度・UI品質が最高水準。 |
| **Google Places API** | 周辺スポット検索（カフェ・居酒屋等） | カテゴリ別フィルタリングや評価情報が充実しており、スポット提案機能の核となる。 |
| **Google Distance Matrix API** | 全メンバー間の移動時間計算 | 複数地点間の所要時間を一括取得でき、中間地点算出ロジックに必須。 |

### インフラ / ホスティング

| 技術 | 選定理由 |
|---|---|
| **Vercel** | Next.jsの開発元が提供するホスティング。CI/CDが自動化されており、GitHubへのプッシュだけでデプロイが完結する。個人プロジェクトは無料枠で運用可能。 |

---

## アーキテクチャ概要

```
ユーザー（ブラウザ / PWA）
    ↓
Next.js（Vercel）
  ├─ フロント: App Router + Tailwind CSS
  └─ バックエンド: API Routes
        ├─ Google Distance Matrix API（移動時間取得）
        ├─ Google Places API（スポット検索）
        └─ Supabase（グループデータ・投票の読み書き）
```

---

## コスト

| サービス | 費用 |
|---|---|
| Next.js / TypeScript / Tailwind | 無料（OSS） |
| Vercel | 無料（Hobbyプラン） |
| Supabase | 無料（Freeプラン） |
| Google Maps / Places / Distance Matrix | 毎月 $200 クレジット付与のため、小規模利用は実質無料（クレジットカード登録必須） |

---

## PWA対応について

`next-pwa` プラグインを用いてPWA化予定。  
位置情報取得は `navigator.geolocation` により対応。ホーム画面への追加・アイコン表示が可能になる。  
バックグラウンド位置追跡・プッシュ通知（iOS）はネイティブアプリでないと制限があるため、MVP段階では対象外とする。
