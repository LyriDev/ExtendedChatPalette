function clearFormValue(element){ // フォームのinput要素等の既存の入力内容を削除する関数
    const valueLength = element.value.length
    element.focus()
    for(let i = 0; i < valueLength; i++){
        document.execCommand('delete', false);
    }
}

function addFormValue(element, value){ // フォームのinput要素等に内容を入力する関数
    element.focus()
    document.execCommand('insertText', false, value);
}

function overrideFormValue(element, value){ // フォームのinput要素等の内容を上書きする関数
    clearFormValue(element)
    addFormValue(element, value)
}

function clickTheButton(element){ // 特定のbutton要素をプログラムで押下する関数
    element.click()
}

function sendMessageWithCharacter(characterName, messageText){ // キャラクターを指定してメッセージを送信する関数
    // キャラ名を編集する
    const nameElm = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > div > form > div.sc-lbxAil.jRFYca > div.sc-kgUAyh.bvBYpc > div > input")
    overrideFormValue(nameElm, characterName)

    // メッセージを編集する
    const messageElm = document.querySelector("#downshift-0-input");
    overrideFormValue(messageElm, messageText)

    // 送信ボタンを押下して送信する
    const submitButton = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > div > form > div.sc-lbxAil.jRFYca > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textSizeSmall.MuiButton-sizeSmall")
    clickTheButton(submitButton)
}

async function sendMessagesWithDelay(messageDataArray, interval = 100){ // 間隔を空けて複数メッセージを送信する関数
    for(const messageData of messageDataArray){
        if((messageData.characterName) && (messageData.messageText)){
            sendMessageWithCharacter(messageData.characterName, messageData.messageText)
            await new Promise((resolve) => setTimeout(resolve, interval));// 指定された時間だけ待機する
        }
    }
}

async function consecutiveDodge(characterName, dodgeNumber){ // 連続で回避技能を振らせるメッセージを送信する関数
    // 送信するメッセージをまとめたオブジェクト配列を作成する
    const messageDataArray = new Array
    for(let i = 0; i < dodgeNumber*2; i+=2){
        // 回避技能を振るメッセージをオブジェクトに格納する
        messageDataArray[i] = new Object
        messageDataArray[i].characterName = characterName
        const dodgeCount = Math.floor(i / 2) + 1
        messageDataArray[i].messageText = `CCB<=({回避技能}/{回避回数}) 【回避】{回避回数}回目`
        // 回避回数を増やすメッセージをオブジェクトに格納する
        messageDataArray[i+1] = new Object
        messageDataArray[i+1].characterName = characterName
        messageDataArray[i+1].messageText = ":回避回数+1"
    }
    // メッセージ群を送信する
    await sendMessagesWithDelay(messageDataArray)
}


consecutiveDodge("ペイン・インペイル", 3)

sendMessageWithCharacter(" リリ", "CCB<=50 【hoge】")