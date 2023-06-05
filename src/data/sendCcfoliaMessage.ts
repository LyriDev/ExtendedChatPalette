function clearFormValue(element: HTMLInputElement|HTMLTextAreaElement) :void{ // フォームのinput要素等の既存の入力内容を削除する関数
    const valueLength: number = element.value.length
    element.focus()
    for(let i: number = 0; i < valueLength; i++){
        document.execCommand('delete', false);
    }
}

function addFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{ // フォームのinput要素等に内容を入力する関数
    element.focus()
    document.execCommand('insertText', false, value);
}

function overrideFormValue(element: HTMLInputElement|HTMLTextAreaElement, value: string): void{ // フォームのinput要素等の内容を上書きする関数
    clearFormValue(element)
    addFormValue(element, value)
}

function clickTheButton(element: HTMLButtonElement){ // 特定のbutton要素をプログラムで押下する関数
    element.click()
}

export function sendMessageWithCharacter(characterName: string, messageText: string, oneClickSend: boolean = true){ // キャラクターを指定してメッセージを送信する関数
    // キャラ名を編集する
    const nameElm: HTMLInputElement = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > div > form > div.sc-lbxAil.jRFYca > div.sc-kgUAyh.bvBYpc > div > input") as HTMLInputElement
    const enteredName: string = nameElm.value

    // メッセージを編集する
    const messageElm: HTMLTextAreaElement = document.querySelector("#downshift-0-input") as HTMLTextAreaElement
    const enteredMessage: string = messageElm.value

    // ダブルクリックで送信時、既存の内容が新規の内容と同じなら、送信のみを行う(書き換えはしない)
    if(((enteredName === characterName) && (enteredMessage === messageText)) || oneClickSend){
        if(oneClickSend){
            overrideFormValue(nameElm, characterName)
            overrideFormValue(messageElm, messageText)
        }
        // 送信ボタンを押下して送信する
        const submitButton: HTMLButtonElement = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > div > form > div.sc-lbxAil.jRFYca > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textSizeSmall.MuiButton-sizeSmall") as HTMLButtonElement
        clickTheButton(submitButton)
    }else{
        overrideFormValue(nameElm, characterName)
        overrideFormValue(messageElm, messageText)
    }
}

interface MessageData{
    characterName: string;
    messageText: string;
}
export async function sendMessagesWithDelay(messageDataArray: MessageData[], interval: number = 100){ // 間隔を空けて複数メッセージを送信する関数
    for(const messageData of messageDataArray){
        if((messageData.characterName) && (messageData.messageText)){
            sendMessageWithCharacter(messageData.characterName, messageData.messageText)
            await new Promise((resolve) => setTimeout(resolve, interval));// 指定された時間だけ待機する
        }
    }
}
