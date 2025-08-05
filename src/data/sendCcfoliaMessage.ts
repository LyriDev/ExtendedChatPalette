import { diceSystemQuery, messageFormQuery, nameFormQuery, submitFormQuery } from "./documentQueries";

function clearFormValue(element: HTMLInputElement|HTMLTextAreaElement) :void{ // フォームのinput要素等の既存の入力内容を削除する関数
    const valueLength: number = element.value.length
    element.focus()
    document.execCommand("selectAll", false);
    document.execCommand("removeFormat", false);
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

export function changeName(characterName: string, isDo: boolean = true): boolean { // キャラ名を編集する関数
    const nameElm = document.querySelector<HTMLInputElement>(nameFormQuery) as HTMLInputElement;
    if (nameElm?.value !== characterName) {
        if(isDo) overrideFormValue(nameElm, characterName);
        return true;
    }else{
        return false;
    }
}

export function changeMessage(messageText: string, isDo: boolean = true): boolean { // メッセージを変更する関数
    const messageElm = document.querySelector<HTMLTextAreaElement>(messageFormQuery) as HTMLTextAreaElement;
    if (messageElm?.value !== messageText) {
        if(isDo) overrideFormValue(messageElm, messageText);
        return true;
    }else{
        return false;
    }
}

export function clickSubmitButton(){ // 送信ボタンを押下して送信する関数
    const submitButton: HTMLButtonElement = document.querySelector(submitFormQuery) as HTMLButtonElement
    clickTheButton(submitButton)
}

export interface MessageData{
    characterName: string | null;
    messageText: string;
}
export async function sendMessagesWithDelay(messageDataArray: MessageData[], interval: number = 100){ // 間隔を空けて複数メッセージを送信する関数
    for(const messageData of messageDataArray){
        if(messageData.messageText){
            if(messageData.characterName !== null) changeName(messageData.characterName)
            changeMessage(messageData.messageText)
            clickSubmitButton()
            await new Promise((resolve) => setTimeout(resolve, interval));// 指定された時間だけ待機する
        }
    }
    changeMessage("")
}

export function getDiceSystem(): "1d100"|"CCB"|"CC"{ // ダイスシステムを取得する関数
    const systemElm: HTMLSpanElement = document.querySelector(diceSystemQuery) as HTMLSpanElement;
    const systemName: string = systemElm.textContent || "";
    let diceSystem: "1d100"|"CCB"|"CC" = "1d100";
    if(systemName === "クトゥルフ神話TRPG"){
        diceSystem = "CCB";
    }else if(systemName === "新クトゥルフ神話TRPG"){
        diceSystem = "CC";
    }
    return diceSystem;
}
