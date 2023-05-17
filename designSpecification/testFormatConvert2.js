function convertTextToJSON(text) {
    const lines = text.split('\n');

    let chatPalettes = []
    let currentData = null
    let i = 0
    let line = lines[i]

    while(i < lines.length){
        currentData = {
            characterName: "",
            messages: [],
            isBorder: false
        }
        // # か##か---で始まる行までカーソルを下げる
        // あるいは、最後の行になるまでカーソルを下げる
        while(i < lines.length - 1){
            if(line.startsWith('# ')) break
            if(line.startsWith('##')) break
            if(line.startsWith('---')) break
            i++
            line = lines[i]
        }
        console.log(line,i)
        if(line.startsWith('# ') || line.startsWith('##') || line.startsWith('---')){ //カーソルが# か##か---で始まる行まで下がった場合
            if(line.startsWith('# ') || line.startsWith('##')){ //カーソルが# か##で始まる行まで下がった場合
                // とりあえず発言キャラクターを登録する
                let name
                if(line.startsWith('##')){
                    // ##で始まる場合、発言キャラクターを指定しない
                    name = null
                }else if(line.startsWith('# ')){
                    // # で始まる場合、発言キャラクターを指定する
                    name = line.slice(2)
                }
                currentData.characterName = name
                // カーソルが最後の行まで下がったなら、ここで変換処理を終わる
                if(i === lines.length - 1) break
                // まだ行が残っているなら、カーソルを1つ下げる
                i++
                line = lines[i]
                // # か##か---か```で始まる行までカーソルを下げる
                // あるいは、最後の行になるまでカーソルを下げる
                while(i < lines.length - 1){
                    if(line.startsWith('# ')) break
                    if(line.startsWith('##')) break
                    if(line.startsWith('---')) break
                    if(line.startsWith('```')) break
                    i++
                    line = lines[i]
                }
                // カーソルが```で始まる行まで下がる前に他の指示があれば、次のセクションに移動する
                if(!line.startsWith('```')) break
                //TODO
            }else if(line.startsWith('---')){
                //カーソルが---で始まる行まで下がった場合、区切り線のデータとして登録する
                currentData.isBorder = true
            }
            currentData.characterName = line + ":" + i
            //作成したデータを登録する
            chatPalettes.push(currentData)
            if(i === lines.length - 1){
                // カーソルが最後の行まで下がったなら、変換処理を終わる
                break
            }else{
                // カーソルが最後の行まで下がったなら、ここで変換処理を終わる
                if(i === lines.length - 1) break
                // まだ行が残っているなら、カーソルを1つ下げる
                i++
                line = lines[i]
            }
        }
    }
    return chatPalettes;
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

// JSONデータを出力
console.log(JSON.stringify(convertTextToJSON(textData3), null, 2));