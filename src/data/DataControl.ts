import {DataModel, Settings, Data, Tab, ChatPalette } from "./DataModel"
import { roomNameQuery } from "./documentQueries";

function clipUrl(url: string): string{ // URLのクエリ文字列やURLフラグメントを取り除いた、URLのパス部分を取得する関数
    const urlObj: URL = new URL(url);
    const path: string = urlObj.pathname;
    const extractedPart: string = path.split('/').pop() || "";
    return extractedPart
}
function getRoomId(): string{ // ココフォリアのルームIDを取得する関数
    let result: string = "";
    const url: string = location.href;
    result = clipUrl(url);
    return result
}
function getRoomName(): string {
    let result: string;
    const targetElement: Element | null = document.querySelector(roomNameQuery);
    result = targetElement?.childNodes[0]?.textContent || ""
    return result;
}

type RoomData = {
    roomId: string,
    roomName: string
}
export function getRoomData(): RoomData{ // 部屋IDと部屋名を取得する関数
    const result: RoomData = {
        roomId: getRoomId(),
        roomName: getRoomName()
    }
    return result;
}

export async function getData(): Promise<Data>{
    let initialData: Data = {} //デフォルト値
    return new Promise<Data>((resolve, reject) => {
        chrome.storage.local.get(["data"], function(response){
            try{
                const data: Data = response["data"] as Data
                resolve(data);
            }catch(error) {
                resolve(initialData);
            }
        });
    });
}

export async function getBytes(path: string[] | null): Promise<number>{
    return new Promise<number>((resolve, reject) => {
        chrome.storage.local.getBytesInUse(path, function(bytesInUse) {
                resolve(bytesInUse);
        });
    })
}

export async function deleteData(roomId: string): Promise<DataModel>{
    return new Promise<DataModel>((resolve, reject) => {
        // 既存のデータを取得
        chrome.storage.local.get("data", function(response) {
            const existingData: Data = response.data || {}; // 既存のデータ
            delete existingData[roomId]
            // 一部削除したデータをデータベースに保存する
            const sendData: DataModel = { data: existingData }
            chrome.storage.local.set(sendData, function() {
                resolve(sendData);
            });
        });
    });
}

export async function getSettings(): Promise<Settings>{
    let initialData: Settings = { //デフォルト値
        enableExDodge : true
    }
    return new Promise<Settings>((resolve, reject) => {
        chrome.storage.local.get(["settings"], function(response){
            try{
                const settings: Settings = response["settings"] as Settings
                resolve(settings);
            }catch(error) {
                resolve(initialData);
            }
        });
    });
}

export async function getTabNames(roomId: string = getRoomId()): Promise<string[]>{
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

export async function getTexts(roomId: string = getRoomId()): Promise<string[]>{
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
export async function getChatPalettes(roomId: string = getRoomId()): Promise<ChatPalette[][]>{
    let initialData: ChatPalette[][] = [] //デフォルト値
    return new Promise<ChatPalette[][]>((resolve, reject) => {
        chrome.storage.local.get(["data", roomId, "tabs"], function(response){
            try{
                const data: Tab[] = response["data"][roomId]["tabs"] as Tab[]
                const chatPalettes: ChatPalette[][] = new Array;
                data.forEach(element => {
                    chatPalettes.push(element.chatPalettes)
                });
                resolve(chatPalettes);
            }catch(error) {
                resolve(initialData);
            }
        });
    });
}

export async function saveTabData(
    tabNames: string[],
    texts: string[],
    chatPalettes: ChatPalette[][] = convertTextArrayToJSON(texts),
    roomData: RoomData = getRoomData()
): Promise<DataModel>{
    const roomId: string = roomData.roomId;
    const roomName: string = roomData.roomName;

    return new Promise<DataModel>((resolve, reject) => {
        if(tabNames.length !== texts.length){
            throw new Error("tabNames と texts の数が違います");
        }
        try{
            // 既存のデータを取得
            chrome.storage.local.get("data", function(response) {
                const existingData: Data = response.data || {}; // 既存のデータ
                const result: Tab[] = new Array;
                for(let i: number = 0; i < tabNames.length; i++){
                    const currentData: Tab = {
                        tabName: tabNames[i],
                        originText: texts[i],
                        chatPalettes: chatPalettes[i]
                    }
                    result.push(currentData)
                }
                // 既存のデータと新しいデータをマージ
                existingData[roomId] = {
                    roomName: roomName,
                    tabs: result
                };
                // 既存のデータをデータベースに保存する
                const sendData: DataModel = { data: existingData }
                chrome.storage.local.set(sendData, function() {
                    resolve(sendData);
                    console.log("拡張チャパレのデータを保存しました")
                });
            });
        }catch(e){
            throw e;
        }
    });
}





export function convertTextArrayToJSON(texts: string[]): ChatPalette[][]{
    const result: ChatPalette[][] = new Array;
    for(let i: number = 0; i < texts.length; i++){
        const currentData: ChatPalette[] = convertTextToJSON(texts[i]+"\n")
        result.push(currentData)
    }
    return result
}

function convertTextToJSON(text: string): ChatPalette[]{ // プレーンテキストを拡張チャットパレットデータに変換する関数
    const lines: string[] = text.split('\n');

    let chatPalettes: ChatPalette[] = []
    let currentData: ChatPalette = {} as ChatPalette
    let i: number = 0
    let line: string = lines[i]

    chatPaletteLoop: while(i < lines.length){
        currentData = {
            characterName: "",
            messages: [],
            borderType: 0,
            isUseRollResult: false
        }
        // # か##か---で始まる行までカーソルを下げる
        // あるいは、最後の行になるまでカーソルを下げる
        while(i < lines.length - 1){
            if(line.startsWith('# ')) break
            if(line.startsWith('##')) break
            if(line.startsWith('---')) break
            if(line.startsWith('- - -')) break
            i++
            line = lines[i]
        }
        //最後の行が指示でないなら、ここで変換処理を終わる
        if(i === lines.length - 1) break
        if(line.startsWith('# ') || line.startsWith('##')){ //カーソルが# か##で始まる行まで下がった場合
            // とりあえず発言キャラクターを登録する
            let name: string | null = null
            // ##で始まる場合、発言キャラクターを指定しない
            if(line.startsWith('# ')){
                // # で始まる場合、発言キャラクターを指定する
                name = line.slice(2)
            }
            currentData.characterName = name
            // カーソルが最後の行まで下がったなら、ここで変換処理を終わる
            if(i === lines.length - 1) break chatPaletteLoop
            // # か##か---で始まる行か最後の行になるまで繰り返す
            let roleText: string | null = null;
            let messageText: string | null = null;
            messageLoop: while(i < lines.length - 1){
                // まだ行が残っているなら、カーソルを1つ下げる
                i++
                line = lines[i]
                // # か##か---か`で始まる行までカーソルを下げる
                // あるいは、最後の行になるまでカーソルを下げる
                while(i < lines.length - 1){
                    if(line.startsWith('# ')) break
                    if(line.startsWith('##')) break
                    if(line.startsWith('---')) break
                    if(line.startsWith('- - -')) break
                    if(line.startsWith('`')) break
                    if(line.startsWith('1`')) break
                    if(line.startsWith('2`')) break
                    i++
                    line = lines[i]
                }
                // カーソルが`で始まる行まで下がる前に他の指示があれば、次のセクションに移動する
                if(!line.startsWith('`') && !line.startsWith('1`') && !line.startsWith('2`')){
                    chatPalettes.push(currentData)
                    continue chatPaletteLoop
                }
                let text = "";
                if(line.startsWith('1`')){ // 1`で始まる行のとき
                    if((roleText === null) && (messageText === null)){
                        if(line.endsWith('`')){ // 1`で始まって`で終わる行のとき
                            text = line.slice(2).slice(0,-1) // 最初の行の左右を切り抜いて登録する
                        }else{
                            text = line.slice(2) // 最初の行の左を切り抜いて登録する
                            // 次の`で終わる行までカーソルを下げる
                            while(i < lines.length -1){
                                if(line.endsWith('`')) break
                                //1行分カーソルを進める
                                i++
                                line = lines[i]
                                if(line.endsWith('`')) break // まだテキストが`で終わっていない場合
                                text += "\n" + line // `間のテキストをメッセージとして登録する
                            }
                            if(line.endsWith('`')){
                                text += "\n" + line.slice(0,-1); // 最後の行の右を切り抜いて登録する
                            }else{ // `で終わらずにテキストが終わった場合
                                text += "\n" + line
                            }
                        }
                        roleText = text;
                        // カーソルが最後の行まで下がったなら、ここで変換処理を終わる
                        if(i === lines.length - 1) break chatPaletteLoop
                    }
                }else if(line.startsWith('2`')){ // 2`で始まる行のとき
                    if(roleText !== null){
                        if(line.endsWith('`')){ // 1`で始まって`で終わる行のとき
                            text = line.slice(2).slice(0,-1) // 最初の行の左右を切り抜いて登録する
                        }else{
                            text = line.slice(2) // 最初の行の左を切り抜いて登録する
                            // 次の`で終わる行までカーソルを下げる
                            while(i < lines.length -1){
                                if(line.endsWith('`')) break
                                //1行分カーソルを進める
                                i++
                                line = lines[i]
                                if(line.endsWith('`')) break // まだテキストが`で終わっていない場合
                                text += "\n" + line // `間のテキストをメッセージとして登録する
                            }
                            if(line.endsWith('`')){
                                text += "\n" + line.slice(0,-1); // 最後の行の右を切り抜いて登録する
                            }else{ // `で終わらずにテキストが終わった場合
                                text += "\n" + line
                            }
                        }
                        messageText = text;
                        currentData.messages = [roleText, messageText];
                        currentData.isUseRollResult = true;
                        break messageLoop;
                    }
                }else if(line.startsWith('`')){
                    if(line.endsWith('`')){ // `で始まって`で終わる行のとき
                        text = line.slice(1,-1) // 最初の行の左右を切り抜いて登録する
                    }else{
                        text = line.slice(1) // 最初の行の左を切り抜いて登録する
                        // 次の`で終わる行までカーソルを下げる
                        while(i < lines.length -1){
                            if(line.endsWith('`')) break
                            //1行分カーソルを進める
                            i++
                            line = lines[i]
                            if(line.endsWith('`')) break // まだテキストが`で終わっていない場合
                            text += "\n" + line // `間のテキストをメッセージとして登録する
                        }
                        if(line.endsWith('`')){
                            text += "\n" + line.slice(0,-1); // 最後の行の右を切り抜いて登録する
                        }else{ // `で終わらずにテキストが終わった場合
                            text += "\n" + line
                        }
                    }
                    currentData.messages.push(text)
                    // カーソルが最後の行まで下がったなら、ここで変換処理を終わる
                    if(i === lines.length - 1) break chatPaletteLoop
                }
            }
        }else if(line.startsWith('---')){
            //カーソルが---で始まる行まで下がった場合、区切り線(実線)のデータとして登録する
            currentData.borderType = 1
        }else if(line.startsWith('- - -')){
            //カーソルが- - -で始まる行まで下がった場合、区切り線(破線)のデータとして登録する
            currentData.borderType = 2
        }
        //作成したデータを登録する
        chatPalettes.push(currentData)
        // カーソルが最後の行まで下がったなら、変換処理を終わる
        if(i === lines.length - 1)break chatPaletteLoop
        // まだ行が残っているなら、カーソルを1つ下げる
        i++
        line = lines[i]
    }
    return chatPalettes;
}

// 普通のチャパレを拡張チャパレ形式に変換する関数
export function convertExChatPalette(characterName: string, text: string): string{
    const lines = text.split('\n');
    const convertedLines = lines.map(line => `# ${characterName}\n\`${line}\``);
    return convertedLines.join('\n');
}

//テキストデータをクリップボードに出力する関数
export function exportToClipboard(text: string){
    if(navigator.clipboard){//サポートしているかを確認
        navigator.clipboard.writeText(text)//クリップボードに出力
    }
}