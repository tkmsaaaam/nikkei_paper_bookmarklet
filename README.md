### これはなに
- 日本経済新聞電子版（日経電子版）朝刊・夕刊のWebページ https://www.nikkei.com/paper/ の操作を楽にするbookmarklet

### 使い方
1. `/src` に存在する、JavaScriptファイルをダウンロードまたはコピーする
2. 日経電子版を読むブラウザにてブックマークを新規作成する
3. URL 部分に `1` を貼り付ける

### 機能一覧
- 次のページへ遷移
  - 同一紙面の次の記事への遷移はもちろん、次の紙面の最初の記事への遷移も対応
  - 対象URL:
    - https://www.nikkei.com/paper/article
  - ファイルURL: 
    - https://github.com/tkmsaaaam/nikkei_paper_bookmarklet/tree/main/src/open_next_article.js
- 次の紙面の最初の記事へと遷移
  - URLに紙面上の位置が渡されている状態でのみ次の紙面の最初の記事に遷移する
  - 対象URL: 
    - https://www.nikkei.com/paper/morning
    - https://www.nikkei.com/paper/evening
  - ファイルURL: 
    - https://github.com/tkmsaaaam/nikkei_paper_bookmarklet/tree/main/src/open_next_page_top.js

### TODO
- いつかExtensionにする
