import { Tab } from "./DataModel"

export async function getTabNames(roomId: string): Promise<string[]>{
    let initialData: string[] = ["メイン"] //デフォルト値
    return new Promise<string[]>((resolve, reject) => {
        chrome.storage.local.get(["data", roomId, "tabs"], function(response){
            try{
                const data: Tab[] = response["data"][roomId]["tabs"] as Tab[]
                const tabNames: string[] = new Array;
                data.forEach(element => {
                    tabNames.push(element.tabName)
                });
                resolve(tabNames);
            }catch(error) {
                resolve(initialData);
            }
        });
    });
}

export async function getTexts(roomId: string): Promise<string[]>{
    let initialData: string[] = [""] //デフォルト値
    return new Promise<string[]>((resolve, reject) => {
        chrome.storage.local.get(["data", roomId, "tabs"], function(response){
            try{
                const data: Tab[] = response["data"][roomId]["tabs"] as Tab[]
                const texts: string[] = new Array;
                data.forEach(element => {
                    texts.push(element.originText)
                });
                resolve(texts);
            }catch(error) {
                resolve(initialData);
            }
        });
    });
}

export async function saveTabData(roomId: string, roomName: string, tabNames: string[], texts: string[]): Promise<void>{
    return new Promise<void>((resolve, reject) => {
        if(tabNames.length !== texts.length){
            throw new Error("tabNames と texts の数が違います");
        }
        const result: object[] = new Array;
        for(let i: number = 0; i < tabNames.length; i++){
            const currentData: object = {
                tabName: tabNames[i],
                originText: texts[i]
            }
            result.push(currentData)
        }
        const sendData: object = {
            data: {
                [roomId]: {
                    roomName: roomName,
                    tabs: result
                }
            }
        };
        chrome.storage.local.set(sendData, function() {
            console.log('データが保存されました');
            resolve();
        });
    });
}