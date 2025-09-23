# PDF Converter

PDF をアップロードしてテキストを抽出する Node.js + TypeScript ベースのミニサービスです。クライアント用の `index.html` と API サーバー (`src/server.ts`) で構成されています。

## 必要条件
- Node.js 20 以上
- npm 10 以上 (同梱推奨)

## セットアップ
1. 依存関係をインストール: `npm install`
2. パッチ適用が必要な依存関係は `postinstall` で自動適用されます。

## ローカル開発
- API サーバーを TypeScript のまま起動: `npm run dev`
  - デフォルトでは `http://localhost:3000` で待ち受けます。
- フロントエンドはルートの `index.html` をブラウザで開いて利用します。

## ビルド & 実行
- TypeScript をビルドして `dist/` を生成: `npm run build`
- ビルド成果物でサーバーを起動: `npm start`

## Vercel へのデプロイ
`vercel.json` で以下を設定しています。
- `buildCommand`: `npm run build` (TypeScript を事前ビルド)
- `builds`: `dist/server.js` を Node.js 関数としてデプロイ
- `routes`: `/parse-pdf` エンドポイントをサーバーレス関数へ転送

デプロイ手順は次のとおりです。
1. 初回のみ Vercel CLI をセットアップ: `npm install -g vercel`
2. ログイン: `vercel login`
3. 初回デプロイ (質問には CLI が対話的に応答): `vercel`
4. 本番デプロイ: `vercel --prod`

> メモ: `index.html` から API を呼び出す URL はデプロイ先ドメインに合わせて更新してください。

## その他
- `.gitignore` に `node_modules/`, `dist/`, `.vercel/`, `.env*` を追加してあります。
- Vercel 上での Node.js 実行時間やメモリは `vercel.json` の設定で調整できます。必要に応じて `functions` セクションを追記してください。