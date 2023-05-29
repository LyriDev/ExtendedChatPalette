import { Data } from "./DataModel"

export function getTabNames(): string[]{
    let result: string[] = ["メイン"] //デフォルト値
    chrome.storage.local.get(["data"], (result) => {
        const data: Data = result.data;
        const tabNames: string[] = Object.values(data).flatMap((roomId) =>
            roomId.tabs.map((tab) => tab.tabName)
        );
        result = tabNames
    });
    return result;
}

export function getTexts(): string[]{
    let result: string[] = [""] //デフォルト値
    chrome.storage.local.get(["data"], (result) => {
        const data: Data = result.data;
        const texts: string[] = Object.values(data).flatMap((roomId) =>
            roomId.tabs.map((tab) => tab.originText)
        );
        result = texts
    });
    return result;
}

export function saveTabData(roomId: string, roomName: string, tabNames: string[], texts: string[]): void{
    if(tabNames.length !== texts.length){
        throw new Error("tabNames と texts の数が違います");
        return;
    }
    const result: object[] = new Array;
    for(let i: number = 0; i < tabNames.length; i++){
        const currentData: object = {
            tabName: tabNames[i],
            originText: texts[i]
        }
        result.push(currentData)
    }
    const sendData: object = {};
    sendData["data"][`${roomId}`]["tabs"] = result;
    
    chrome.storage.local.set(sendData, function() {
        console.log('データが保存されました');
    });
}