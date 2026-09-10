---
description: E2Eテスト実行時のルール
globs:
alwaysApply: true
---

# E2Eテスト実行ルール

## E2Eテスト時のエラー対応

ブラウザを使用したE2Eテスト中にエラーが発生した場合、以下の情報を自動的に収集すること：

1. **スクリーンショットの撮影**
   - エラー発生時の画面を保存
   - ファイル名は `error-{テストケースID}-{timestamp}.png` 形式
   - 保存先は収集した情報の保存先に従うこと

2. **コンソールログの取得**
   - JavaScriptエラーを確認

3. **ネットワークリクエストの確認**
   - APIエラー（4xx, 5xx）を確認

4. **ページ状態の取得**
   - DOM状態を記録

## 収集した情報の格納先
.claude/test/test-cases以下のmdファイルの名前に対応したフォルダが、.claude/test/results以下に存在する。テスト結果のうち、スクリーンショットはそのファイル名のscreenshotsフォルダに、それ以外の結果は日付.mdにまとめて保存してください。

例）
results/auth/2026-08-16.md
results/auth/screenshots/error-TC-002-20260816-1432.png 