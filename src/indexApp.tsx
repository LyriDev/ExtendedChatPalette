import React from 'react';
import ReactDOM from 'react-dom';
import "./style/app.scss"
import ExChatPaletteButton from './components/App/ExChatPaletteButton';
import HamburgerListTab from "./components/App/HamburgerListTab"


async function addExChatPaletteButton(): Promise<void>{ // 拡張チャットパレットボタンを追加する関数
    // 「マイキャラクター一覧」ボタンを取得する
    let targetElement: HTMLElement|null = await challengeQuery("#root > div > header > div > button.MuiButtonBase-root.MuiIconButton-root.sc-bWXABl.iZZULD");
    if (!targetElement) return; // 一定時間待機してもターゲットとなる要素が見つからなければ処理を止める

    // 工事中モード等でボタンが無効になっていたらfalseを代入する
    const isButtonEnable: boolean = !(targetElement.classList.contains("Mui-disabled"))

    // ポータル(モーダルメニュー追加用)を追加するためのルート要素を作成
    const portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root';
    document.body.appendChild(portalRoot);

    // Reactコンポーネントをレンダリングし、DOM要素を取得
    const container = document.createElement('div');
    ReactDOM.render(<ExChatPaletteButton  isActive={isButtonEnable} />, container);
    const reactElement = container.firstChild;

    // 「マイキャラクター一覧」の要素の前に拡張チャットパレットボタンを追加する
    if(reactElement instanceof Node) targetElement.before(reactElement);
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
                    console.log(`目標の要素を発見しました\ndocument.querySelector("${query}")\n${targetElement}`)
                }else{
                    console.log("タイムアウト。目標の要素を発見できませんでした")
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

    // Reactコンポーネントをレンダリングし、DOM要素を取得
    const container: HTMLElement = document.createElement('div');
    ReactDOM.render(<HamburgerListTab />, container);
    const reactElement: ChildNode|null = container.firstChild;
    if(!reactElement) return;

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
                    MyCharacterColumn.before(reactElement)
                    console.log("リストに拡張チャットパレット欄を追加しました");
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
    console.log("hello world");
    addExChatPaletteButton();
    addExChatPaletteList()
};