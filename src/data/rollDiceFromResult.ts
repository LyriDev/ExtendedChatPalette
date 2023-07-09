import { messageColumnQuery, nameFormQuery, roomChatQuery } from "./documentQueries";
import { changeName, changeMessage, clickSubmitButton } from "./sendCcfoliaMessage"

// 特定のダイスロール結果を元に、ダイスロールを行う関数
export async function rollDiceFromResult(characterName: string | null, firstRole: string, secondRole: string, variableName: string = "$value"): Promise<void>{
    // 入力内容を変更する
    let isChangedName: boolean = false
    if(characterName !== null){
        isChangedName = changeName((characterName || "noname"));
    }
    const isChangedMessage: boolean = changeMessage(firstRole);

    // キャラクター名がnull(指定なし)なら、現在の発言キャラクターを取得しておく
    const characterNameElm: HTMLInputElement | null = document.querySelector(nameFormQuery);
    characterName =  characterNameElm?.value || "noname";

    // 最初のロール結果の監視を開始する
    let watchPromise: Promise<string> | undefined;
    // キャラ名・メッセージ、どちらも変更なければ監視を始める
    if(isChangedName || isChangedMessage) return;
    watchPromise = watchMessage(characterName, firstRole);

    // 最初のロール結果の監視をしている間に、最初のロールを行う
    // 最新のメッセージの要素を取得するために、一番下までスクロールする
    const scrollMenu: HTMLElement | null = document.querySelector(roomChatQuery)
    scrollMenu?.scrollTo(0, scrollMenu.scrollHeight);
    // 送信ボタンを押して最初のロールを行う
    clickSubmitButton();

    // 最初のロール結果を取得する
    const firstRoleResult: string = await watchPromise;

    // secondRoleテキスト内のvariableNameと一致する箇所を、firstRoleResultで置き換える
    const pattern: RegExp = new RegExp(("\\" + variableName), "g");
    const replacedSecondRole = secondRole.replace(pattern, firstRoleResult);

    // 最初のロール結果を使用した、次のロールを行う
    changeMessage(replacedSecondRole);
    clickSubmitButton();
}

// 指定したテキストのロール結果を取得する関数
// 注意：メッセージが新しく送信されたのか、スクロールされてメッセージが表示されたのかは判定できない
async function watchMessage(targetCharacterName: string, targetMessage: string): Promise<string>{
    return new Promise((resolve, reject) => {
        // 監視するDOMノードを取得
        const targetNode: HTMLDivElement | null = document.querySelector(messageColumnQuery);
        if(!targetNode) throw new Error("メッセージ欄が見当たりませんでした。")

        // MutationObserverオブジェクトを作成する
        const observer: MutationObserver = new MutationObserver(function(mutationsList, observer) {
            // 変更が検出された際に実行されるコールバック関数
            for(const mutation of mutationsList) {
                if ((mutation.type === 'childList') && (mutation.addedNodes.length > 0)) {
                    // ここに追加された要素に対する処理を記述
                    const addedMessageDiv: HTMLElement = mutation.addedNodes[0] as HTMLElement;// メッセージが送信されて追加されたDiv要素を取得する

                    // キャラ名を取得する
                    const characterNameElm: HTMLSpanElement | null = addedMessageDiv.querySelector("span"); // キャラ名の要素
                    if(!characterNameElm) return;
                    const characterName = characterNameElm.textContent; // キャラ名
                    if(characterName !== targetCharacterName) return; // キャラ名が指定と異なる場合は、追加された要素に対する処理を終了する

                    // ロール内容を取得する
                    const roleContentElm: HTMLParagraphElement | null = addedMessageDiv.querySelector("p");
                    if(!roleContentElm) return;
                    if(!roleContentElm.firstChild) return;
                    const roleContent = roleContentElm.firstChild.textContent; // ロール内容
                    // 備考：送信するロール内容を{}で変換されるかもしれないので、コメントアウトしている
                    // if(roleContent !== targetMessage) return; // ロール内容が指定と異なる場合は、追加された要素に対する処理を処理する

                    // ロール結果を取得する
                    const roleResultElm: HTMLSpanElement | null  = roleContentElm.querySelector("span");
                    if(!roleResultElm){
                        // ロール結果がないようなロールを監視しているなら、監視を終了する
                        observer.disconnect(); // DOMの監視を終了する
                        resolve(""); // ロール結果を返してPromiseを解決する
                        return;
                    }
                    const roleResult = extractRoleResult(roleResultElm.textContent || ""); // ロール結果

                    // キャラ名とロール内容が指定と一致する場合のみ、ロール結果を返す
                    observer.disconnect(); // DOMの監視を終了する
                    resolve(roleResult); // ロール結果を返してPromiseを解決する
                }
            }
        });

        // 監視オプションを設定
        const config = { childList: true, subtree: false };

        // 監視を開始
        observer.observe(targetNode, config);
    });
}

// テキストからロール結果を抽出する関数
function extractRoleResult(text: string) {
    // テキスト内の最後の「＞」の位置を探す
    const arrowIndex = text.lastIndexOf("＞");

    // 「＞」が存在しない場合は空文字列を返す
    if (arrowIndex === -1) return "";

    // 「＞」の位置より右側の文字列を取得してトリムする
    const resultText = text.slice(arrowIndex + 1).trim();

    // 取得した文字列を返す
    return resultText;
}