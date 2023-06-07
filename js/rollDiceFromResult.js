rollDiceFromResult("1d3 【魔剣創造消費MP】",":MP-$","$")



// 特定のダイスロール結果を元に、ダイスロールを行う関数
async function rollDiceFromResult(firstRole, secondRole, variableName){
    // 現在の発言キャラクターを取得する
    const characterNameElm = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > div > form > div.sc-lbxAil.jRFYca > div.sc-kgUAyh.bvBYpc > div > input");
    const characterName =  characterNameElm.value || "noname";

    // 最初のロール結果の監視を開始する
    const watchPromise = watchMessage(characterName, firstRole);

    // 最初のロール結果の監視をしている間に、最初のロールを行う
    changeMessage(firstRole);
    clickSubmitButton();

    // 最初のロール結果を取得する
    const firstRoleResult = await watchPromise;

    // secondRoleテキスト内のvariableNameと一致する箇所を、firstRoleResultで置き換える
    const pattern = new RegExp(("\\" + variableName), "g");
    const replacedSecondRole = secondRole.replace(pattern, firstRoleResult);

    // 最初のロール結果を使用した、次のロールを行う
    changeMessage(replacedSecondRole);
    clickSubmitButton();
}

// 指定したテキストのロール結果を取得する関数
// 注意：メッセージが新しく送信されたのか、スクロールされてメッセージが表示されたのかは判定できない
async function watchMessage(targetCharacterName, targetMessage){
    return new Promise((resolve, reject) => {
        // 監視するDOMノードを取得
        const targetNode = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > ul > div:nth-child(1) > div > div");
        if(!targetNode) throw new Error("メッセージ欄が見当たりませんでした。")

        // MutationObserverオブジェクトを作成する
        const observer = new MutationObserver(function(mutationsList, observer) {
            // 変更が検出された際に実行されるコールバック関数
            for(const mutation of mutationsList) {
                if ((mutation.type === 'childList') && (mutation.addedNodes.length > 0)) {
                    // ここに追加された要素に対する処理を記述
                    const addedMessageDiv = mutation.addedNodes[0]; // メッセージが送信されて追加されたDiv要素を取得する
                    /* console.log('ページ内での要素の追加を検知しました',addedMessageDiv); */

                    // キャラ名を取得する
                    const characterNameElm = addedMessageDiv.querySelector("span"); // キャラ名の要素
                    if(!characterNameElm) return;
                    const characterName = characterNameElm.textContent; // キャラ名
                    if(characterName !== targetCharacterName) return; // キャラ名が指定と異なる場合は、追加された要素に対する処理を終了する

                    // ロール内容を取得する
                    const roleContentElm = addedMessageDiv.querySelector("p");
                    if(!roleContentElm) return;
                    if(!roleContentElm.firstChild) return;
                    const roleContent = roleContentElm.firstChild.textContent; // ロール内容

                    // ロール結果を取得する
                    const roleResultElm = roleContentElm.querySelector("span");
                    if(!roleResultElm) return;
                    const roleResult = extractRoleResult(roleResultElm.textContent); // ロール結果

                    // キャラ名とロール内容が指定と一致する場合のみ、ロール結果を返す
                    /* console.log(`ロール内容：${roleContent}\nロール結果：${extractRoleResult(roleResult)}`) */
                    if(roleContent === targetMessage){
                        /* console.log(`${targetMessage}の結果は「${roleResult}」でした。`) */
                        observer.disconnect(); // DOMの監視を終了する
                        resolve(roleResult); // ロール結果を返してPromiseを解決する
                    }
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
function extractRoleResult(text) {
    // テキスト内の最後の「＞」の位置を探す
    const arrowIndex = text.lastIndexOf("＞");

    // 「＞」が存在しない場合は空文字列を返す
    if (arrowIndex === -1) return "";

    // 「＞」の位置より右側の文字列を取得してトリムする
    const resultText = text.slice(arrowIndex + 1).trim();

    // 取得した文字列を返す
    return resultText;
}

// メッセージを変更する関数
function changeMessage(messageText){
    const messageElm = document.querySelector("#downshift-0-input");
    if(!messageElm) throw new Error("メッセージ入力欄が見当たりませんでした。")
    if (messageElm.value !== messageText) {
        overrideFormValue(messageElm, messageText);
    }
}

// フォームのinput要素等の内容を上書きする関数
function overrideFormValue(element, value){
    clearFormValue(element)
    addFormValue(element, value)
}

// フォームのinput要素等に内容を入力する関数
function addFormValue(element, value){
    element.focus();
    document.execCommand('insertText', false, value);
}

// フォームのinput要素等の既存の入力内容を削除する関数
function clearFormValue(element){
    const valueLength = element.value.length
    element.focus()
    for(let i = 0; i < valueLength; i++){
        document.execCommand('delete', false);
    }
}

// 送信ボタンを押下して送信する関数
function clickSubmitButton(){
    const submitButton = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > div > form > div.sc-lbxAil.jRFYca > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textSizeSmall.MuiButton-sizeSmall");
    if(!submitButton) throw new Error("送信ボタンが見当たりませんでした。")
    submitButton.click();
}