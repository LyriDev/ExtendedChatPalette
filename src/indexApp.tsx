import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import "./style/app.scss"
import Providers from "./providers/App/Providers"
import HamburgerListTab from "./components/App/HamburgerListTab"
import ExChatPaletteButton from "./components/App/ExChatPaletteButton"
import ConvertButton from "./components/App/ConvertButton"

function addModalPortalRoot(): void{ // ポータル(モーダルメニュー追加用)を追加するためのルート要素を作成する関数
    // ポータルを追加するためのルート要素を作成
    const portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root-Modal';
    document.body.appendChild(portalRoot);
}
function addPalettePortalRoot(): void{ // ポータル(拡張チャットパレットメニュー追加用)を追加するためのルート要素を作成する関数
    // ポータルを追加するためのルート要素を作成
    const portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root-ExtendedChatPalette';
    document.body.appendChild(portalRoot);
}

async function addExChatPaletteButton(): Promise<void>{ // 拡張チャットパレットボタンを追加する関数
    // 「マイキャラクター一覧」ボタンを取得する
    let targetElement: HTMLElement|null = await challengeQuery("#root > div > header > div > button.MuiButtonBase-root.MuiIconButton-root.sc-bWXABl.iZZULD");
    if (!targetElement){
         // 一定時間待機してもターゲットとなる要素が見つからなければ処理を止める
        throw new Error("拡張チャットパレットボタンを追加できませんでした")
    }

    // 工事中モード等でボタンが無効になっていたらfalseを代入する
    const isButtonEnable: boolean = !(targetElement.classList.contains("Mui-disabled"))

    // 「マイキャラクター一覧」の要素の前に拡張チャットパレットボタンを追加する
    const container: HTMLElement = document.createElement("div")
    targetElement.before(container)

    ReactDOM.render(
        <React.StrictMode>
            <Providers>
                <ExChatPaletteButton isActive={isButtonEnable} />
            </Providers>
        </React.StrictMode>,
        container
    );
}

async function challengeQuery(query: string, timeLimit: number = 60): Promise<HTMLElement|null>{ // 指定された要素が見つかるまで数秒くらい待機する関数
    const intervalInSeconds: number = 0.1; // 繰り返し間隔(秒)
    let targetElement: HTMLElement|null = null;
    let queryCounter: number = 0;
    await new Promise(resolve => {
        const intervalId = setInterval(function() {
            console.log(`「拡張チャットパレット」待機中……\n現在${Math.floor(queryCounter*100)/100}/${timeLimit}秒待機`)
            targetElement = document.querySelector(query);
            queryCounter += intervalInSeconds;
            if ((targetElement !== null) || (queryCounter >= timeLimit)) {
                clearInterval(intervalId);
                resolve(targetElement);
                if(targetElement !== null){
                    console.log(`目標の要素を発見しました\ndocument.querySelector("${query}")`,targetElement)
                }else{
                    throw new Error("タイムアウト。目標の要素を発見できませんでした")
                }
            }
        }, intervalInSeconds * 1000);
    });
    return targetElement;
}

async function addExChatPaletteList(){ // レスポンシブデザイン用のリストに拡張チャットパレット欄を追加する関数
    // レスポンシブデザイン用のul要素が追加されるのを監視し、ul要素に拡張チャットパレット欄が追加されていなければ追加する

    // 監視するDOMノードを取得
    const targetNode:HTMLElement = document.body

    // Reactコンポーネントを入れる用のDOM要素でできた外枠
    const container: HTMLElement = document.createElement("div")

    // MutationObserverオブジェクトを作成
    const observer: MutationObserver = new MutationObserver(function(mutationsList, observer) {
        // 変更が検出された際に実行されるコールバック関数
        for(const mutation of mutationsList) {
            if ((mutation.type === 'childList') && (mutation.addedNodes.length > 0)) {
                // ここに追加された要素に対する処理を記述
                console.log('ページ内での要素の追加を検知しました');
                // レスポンシブデザイン用のul要素内の一番上の要素「マイキャラクター」欄(であると予測される要素)を取得する
                const MyCharacterColumn = document.querySelector("body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:first-child")
                // ul要素の一番上の子要素であるli要素のテキストが「マイキャラクター」なら、
                if (MyCharacterColumn?.textContent === "マイキャラクター"){
                    // 「マイキャラクター」欄の前に「拡張チャットパレット」欄を追加する
                    MyCharacterColumn.before(container)
                    ReactDOM.render(
                        <React.StrictMode>
                            <Providers>
                                <HamburgerListTab />
                            </Providers>
                        </React.StrictMode>,
                        container
                    );
                    console.log("リストに「拡張チャットパレット」欄を追加しました");
                    return;
                }
                // キャラクター編集メニューの「キャラクター編集」見出し要素を取得する
                const characterEditTitle = document.querySelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > header > div > p")
                if(characterEditTitle?.textContent === "キャラクター編集"){
                    // 「キャラクター編集」見出しの後ろに「拡張チャパレ変換」ボタンを追加する
                    characterEditTitle.after(container)
                    ReactDOM.render(
                        <React.StrictMode>
                            <Providers>
                                <ConvertButton/>
                            </Providers>
                        </React.StrictMode>,
                        container
                    );
                    console.log("キャラクター編集メニューに「拡張チャパレ変換」ボタンを追加しました。");
                    return;
                }
            }
        }
    });

    // 監視オプションを設定
    const config = { childList: true, subtree: false };

    // 監視を開始
    observer.observe(targetNode, config);
}

window.onload = async function(){
    addModalPortalRoot()
    addPalettePortalRoot()
    addExChatPaletteButton();
    addExChatPaletteList()
};