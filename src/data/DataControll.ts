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