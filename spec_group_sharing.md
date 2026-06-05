# グループ共有機能 仕様書

## 概要

候補地をURLリンク一つでメンバーに共有し、参加状況をリアルタイムで確認できる機能。

---

## 核となる設計：参加確認のリアルタイム同期

リンクを開いたメンバーが「参加した」ことが幹事にリアルタイムで通知される。
Supabase Realtime で `members` テーブルの INSERT を購読することで実現する。

```
幹事がリンクをLINEで共有
    ↓
メンバーがリンクを開く
    ↓
members テーブルに INSERT（セッションIDで匿名識別）
    ↓
幹事の画面に「佐藤さんが確認しました ✓」がリアルタイム表示
```

---

## 共有リンク

```
https://atsumaro.app/group/{group_id}
```

- 共有方法: URLコピー（LINEなどに貼り付け）
- 有効期限: 7日間（期限切れ後はリンク無効 + データ自動削除）
- 認証不要: ブラウザのセッションIDで匿名識別

---

## データ構造（Supabase）

```
groups テーブル
  - id（UUID）
  - mode（midpoint / destination）
  - created_at
  - expires_at（7日後）
  - input_data（JSON: 出発地・目的地の情報）

candidates テーブル
  - id
  - group_id
  - station_name
  - travel_times（JSON: 各メンバーの所要時間）
  - spot_data（JSON: 周辺スポット）

members テーブル                      ← Realtimeで購読
  - id
  - group_id
  - session_id（ブラウザのセッションIDで匿名識別）
  - joined_at
```

---

## 画面フロー

```
① 幹事：候補地一覧画面で「グループ共有」ボタンをタップ
      ↓
② Supabase に group レコードを作成 → 共有URLを生成
      ↓
③ URLをコピーしてLINEなどで共有
      ↓
④ メンバーがリンクを開く → 候補地一覧が表示される
   同時に members テーブルに参加記録が INSERT される
      ↓
⑤ 幹事の画面に「〇人が確認済み」がリアルタイム更新
```

---

## 共有ページの表示内容

- 候補駅カード（各自の移動時間付き）
- 地図上のピン
- 「〇人中〇人が確認済み」バッジ（Realtime更新）
- 有効期限のカウントダウン表示

---

## 将来の拡張（MVP対象外）

- 投票機能（候補地にリアクション）→ Supabase Realtimeで全員に即時反映
- 幹事による「決定」ボタン → 確定地をメンバー全員に通知
