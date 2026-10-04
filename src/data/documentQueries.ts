/* ココフォリアページの要素のクエリの文字列 */

// 画面上部に表示されている「マイキャラクター一覧」のアイコンボタン
export const myCharacterButtonQuery: string = "#root > div > header > div > button:nth-of-type(2)"; // ヘッダー内の左から3つ目のボタン

// レスポンシブデザイン用のハンバーガーメニュー開閉ボタン
export const hamburgerMenuButtonQuery: string = "#root > div > header > div > button:nth-of-type(8)";

// レスポンシブデザイン用のul要素内の、一番上の要素である「マイキャラクター」欄(であると予測される要素)
export const myCharacterColumnQuery: string = "body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:nth-of-type(1)";


// キャラクター編集メニュー
export const editQuery: string = "body > div.MuiModal-root:has(header, form) div:has(> header)";

// キャラクター編集メニューの一番上の「キャラクター編集」見出し
export const editHeaderQuery: string = `${editQuery} header p`;

// 入力フォーム
const formQuery: string = "#root > div > div.MuiDrawer-root > div > div form";

// メッセージ入力フォームの名前欄
export const nameFormQuery: string = `${formQuery} > div:nth-child(4) > div:nth-child(1) > div > input`;

// メッセージ入力フォームの送信ボタン
export const submitFormQuery: string = `${formQuery} button[type='submit']`;

// メッセージ入力フォームのメッセージ欄
export const messageFormQuery: string = `${formQuery} > div:nth-child(6) textarea`;

// ルームチャット枠(スクロール用)
export const roomChatQuery: string = "#root > div > div.MuiDrawer-root.MuiDrawer-docked > div ul > div:nth-child(1)";

// メッセージ一覧
export const messageColumnQuery: string = `${roomChatQuery} > div`;

// 画面左上の、ルーム名欄
export const roomNameQuery: string = "#root > div > header > div > button:nth-child(1) > h6";

// 画面左上の、ダイスシステム欄
export const diceSystemQuery: string = `${roomNameQuery} > span`;
