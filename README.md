# Market Premium Viewer

Binance先物市場のプレミアム指数をリアルタイムで可視化するNext.jsアプリケーションです。

## 機能

- Binance USDm先物市場の全銘柄のプレミアム指数をチャート表示
- チャートサイズのカスタマイズ機能
- プレミアム指数に基づいた動的な色分け表示
- IWMA(予測FRの近似)の指標表示

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- CCXT (暗号資産取引所API)
- Canvas API
- Context API
- Tailwind CSS

## 開発環境のセットアップ

```bash
bun install
```

```bash
bun dev
```

http://localhost:3000 にアクセスして動作確認ができます。

## プロジェクト構成

- `src/app/page.tsx` - メインページコンポーネント
- `src/components/` - Chart、ChartSettingFormなどのUIコンポーネント
- `src/context/` - チャート設定の状態管理
- `src/lib/` - Binance APIとの通信、計算ロジック

## 使い方

1. アプリケーションを起動すると、自動的に全銘柄のチャートが表示されます
2. 画面上部のフォームでチャートのサイズを調整できます
3. プレミアム指数の値に応じてチャートの枠線の色が変化します
