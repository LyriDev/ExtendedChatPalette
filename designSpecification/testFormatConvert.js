function convertTextToJSON(text) {
    const lines = text.split('\n');

    let jsonData = [];

    let currentData = null;

    let i = 0;
    let line = lines[i];
    while(i < lines.length){
        while(!(line.startsWith('# '))  && !(line.startsWith('##'))  && !(line.startsWith('---'))  && (i < lines.length)){ // # か##か---で始まる行までカーソルを下げる
            //1行分カーソルを進める
            i++;
            if(i < lines.length)line = lines[i];
        }
        currentData = {
            characterName: "",
            messages: [],
            isBorder: false
        };
        if(line.startsWith('# ') || line.startsWith('##')){ // チャットの場合
            // 新しいデータを作成
            let name
            if(line.startsWith('##')){ // ##で始まる場合、発言キャラクターを指定しない
                name = null;
            }else if(line.startsWith('# ')){ // # で始まる場合、発言キャラクターを指定する
                name = line.slice(2);
            }
            currentData.characterName = name;
            //1行分カーソルを進める
            i++;
            line = lines[i];
            while(!(line.startsWith('# ')) && (i < lines.length)){
                while(!(line.startsWith('```')) && !(line.startsWith('# ')) && (i < lines.length)){ // ```で始まる行までカーソルを下げる
                    i++;
                    if(i < lines.length)line = lines[i];
                }
                let text = "";
                if(line.startsWith('```') && line.endsWith('```')){
                    text = line.slice(3,-3);
                }else if(line.startsWith('```')){
                    text = line.slice(3);
                    let first = i
                    while(!(line.endsWith('```')) && (i < lines.length)){ // 次の```で終わる行までカーソルを下げる
                        //1行分カーソルを進める
                        i++;
                        if(i < lines.length)line = lines[i];
                        if(!line.endsWith('```')){ // まだテキストが```で終わっていないなら、```間のテキストをメッセージとして登録する
                            text += "\n" + line;
                        }
                    }
                    if((line.endsWith('```')) && (i !== first)){ // メッセージの最初の行から改行されていたら、メッセージの最後の行を登録する
                        text += "\n" + line.slice(0,-3);
                    }
                }
                currentData.messages.push(text)
                do{ // 次の```か#で始まる行までカーソルを下げる
                    i++;
                    if(i < lines.length)line = lines[i];
                //}while(!(line.startsWith('```')) && !(line.startsWith('# ')) && (i < lines.length))
                }while(false)
            }
        }else if((line.startsWith('---'))){ // 区切り線の場合
            currentData.isBorder = true;
        }
        jsonData.push(currentData)
    }
    return jsonData;
}

// テキストデータ
const textData = `# 名前
\`\`\`入力内容を、
ここに記載します\`\`\`
\`\`\`2つ目の入力内容を、
ここに記載します\`\`\`
# 名前2
\`\`\`入力内容\`\`\`
\`\`\`2つ目の入力内容を、
ここに記載します。
三行目もあります\`\`\`
a
a`;

// JSONデータを出力
console.log(JSON.stringify(convertTextToJSON(textData), null, 2));


// テキストデータ
const textData3 = `あああ
# ケイン
いいい
# アッシュ
ううう
\`\`\`ブリスクがあなたに懸賞金をかけたわ。
# 無効な名前
生死を問わずにね。\`\`\`
えええ
\`\`\`あなたは私のカモ。\`\`\`
おおお
# バイパー
かかか
\`\`\`空は俺のものだ。
逃げ隠れは、させない。\`\`\`
ききき
# バイパー
くくく
\`\`\`視界は良好。\`\`\`
けけけ
\`\`\`良い調子だ。\`\`\`
こここ
# スローン
たたた
# ブリスク
ちちち
`;

// JSONデータを出力
console.log(JSON.stringify(convertTextToJSON(textData3), null, 2));


const textData30 = `あああ
# ケイン
いいい
# アッシュ
ううう
\`\`\`ブリスクがあなたに懸賞金をかけたわ。
# 無効な名前
生死を問わずにね。\`\`\`
えええ
\`\`\`あなたは私のカモ。\`\`\`
おおお
---
aaa
##
\`\`\`敵を発見。\`\`\`
# バイパー
かかか
\`\`\`空は俺のものだ。
逃げ隠れは、させない。\`\`\`
ききき
# バイパー
くくく
\`\`\`視界は良好。\`\`\`
けけけ
\`\`\`良い調子だ。\`\`\`
こここ
# スローン
たたた
# ブリスク
ちちち
`;