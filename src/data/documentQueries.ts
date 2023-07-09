/* ココフォリアページの要素のクエリの文字列 */

// 画面上部に表示されている「マイキャラクター一覧」のアイコンボタン
export const myCharacterButtonQuery: string = "#root > div > header > div > button.MuiButtonBase-root.MuiIconButton-root.sc-afnQL.iMcZrZ";

// レスポンシブデザイン用のハンバーガーメニュー開閉ボタン
export const hamburgerMenuButtonQuery: string = "#root > div > header > div > button.MuiButtonBase-root.MuiIconButton-root.sc-kngDgl.kExRru";

// レスポンシブデザイン用のul要素内の、一番上の要素である「マイキャラクター」欄(であると予測される要素)を取得する
export const myCharacterColumnQuery: string = "body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:first-child";

// キャラクター編集メニューの一番上の見出しである「キャラクター編集」
export const editHeaderQuery: string = "body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > header > div > p";

// メッセージ入力フォームの、名前欄
export const nameFormQuery: string = "#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-hsOonA.buVWki > div > div > div > form > div.sc-jGprRt.cTnqPF > div.sc-hAsxaJ.dggwKE > div > input";

// メッセージ入力フォームの、メッセージ欄
export const messageFormQuery: string = "#downshift-0-input";

// メッセージ入力フォームの、送信ボタン
export const submitFormQuery: string = "#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-hsOonA.buVWki > div > div > div > form > div.sc-jGprRt.cTnqPF > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textSizeSmall.MuiButton-sizeSmall";

// 「ルームチャット」タブ(メッセージ一覧)
export const roomChatQuery: string = "#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-hsOonA.buVWki > div > div > ul > div:nth-child(1) > div";
export const messageColumnQuery: string = `${roomChatQuery} > div`;

// 画面左上の、ダイスシステム欄
export const diceSystemQuery: string = "#root > div > header > div > button:nth-child(1) > span.MuiButton-label > h6 > span";

// 画面左上の、ルーム名欄
export const roomNameQuery: string = "#root > div > header > div > button:nth-child(1) > span.MuiButton-label > h6";