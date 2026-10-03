
# 資訊科技與媒體識讀帳密系統

由 [HYJdevelop](https://hyjdevelop.com) 開發，使用 React + TypeScript，透過 GitHub Actions 部署至 GitHub Pages：`https://imls.hyjdevelop.com`。

## 本機更新帳密資料

原始 `密碼.xlsx` 保留在專案根目錄，`.gitignore` 會排除所有 Excel 檔。更新試算表後，在本機執行：

```powershell
py -m pip install openpyxl
py scripts/encode_credentials.py
npm ci
npm run build
```

產生或更新的 `src/data/credentials.generated.ts` 是網站查詢使用的混淆資料；提交程式碼後，GitHub Actions 會自動建置及發布。若只想本機預覽，執行 `npm run dev`。

## GitHub Pages 設定

1. 將 repository 的 Pages source 設為 **GitHub Actions**。
2. 推送至 `master` 後，`.github/workflows/deploy-pages.yml` 會自動建置並發布；也可從 Actions 頁面手動執行。
3. 在 HYJdevelop 網域 DNS 新增 CNAME：主機名稱 `imls`，目標 `hyjdevelop.github.io`。
4. 在 repository 的 **Settings → Pages → Custom domain** 設定 `imls.hyjdevelop.com`，DNS 生效後啟用 HTTPS。

## 混淆限制

GitHub Pages 只能提供公開靜態檔案，沒有私有伺服器可保管密碼。本專案以每筆隨機 salt、SHA-256 衍生 XOR 與 Base64 混淆密碼，只增加直接閱讀難度；解碼程式和資料都會公開，技術使用者仍可還原全部密碼。因此只適用於你已確認可公開、且不重要的帳密，請勿重複使用正式或個人密碼。原始 Excel 不會上傳，但混淆後的查詢資料會包含在 GitHub Pages 網站中。


更新test