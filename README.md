
# 資訊科技與媒體識讀帳密系統

由 [HYJdevelop](https://hyjdevelop.com) 開發。React + TypeScript 前端搭配 Flask 伺服器，使用標準 HTML 表單 POST，不使用 JSON API。Excel 帳密只由伺服器讀取，不會編進前端程式。
## 本機啟動

原始 `密碼.xlsx` 請留在專案主資料夾。`.gitignore` 已排除所有 `.xlsx`，不要刪除唯一原始資料，也不要提交到 GitHub。

安裝 Python 套件：

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
```

終端機一啟動伺服器：

```powershell
py app.py
```

終端機二啟動 React 開發畫面：

```powershell
npm install
npm run dev
```

使用 Vite 顯示的網址測試。正式建置後可由 Flask 提供網站：

```powershell
npm run build
py app.py
```

開啟 `http://127.0.0.1:5000`。若 Excel 存放於伺服器其他位置，設定 `CREDENTIALS_FILE` 環境變數指向該檔案。

## GitHub 與安全

- 上傳前執行 `git status`，確認 `密碼.xlsx` 不在待提交清單；目前已用 `git check-ignore` 驗證檔案會被排除。
- 不要以亂碼、Base64 或程式混淆保存密碼；瀏覽器端內容能被檢查。即使 repository 設為 Private，也不應提交帳密。
- GitHub Pages 只能託管靜態檔案，不能執行 Flask。正式網站需把 Flask 部署至受控主機，並透過安全檔案掛載提供 Excel。
- 目前只有學號查詢，學號不是身分驗證。本開發伺服器只監聽 `127.0.0.1`，僅供本機測試。提供學生遠端使用前，必須加入校方 SSO 或其他身分驗證、HTTPS、查詢頻率限制與存取控管。
- 若帳密檔曾被提交或公開，單純刪檔不足以補救，請立即更換受影響密碼。

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
