import React from 'react';
import ReactDOM from 'react-dom';
import "./style/app.scss"
import ExChatPaletteButton from './components/App/ExChatPaletteButton';


async function addExChatPaletteButton(): Promise<void>{ // 拡張チャットパレットボタンを追加する関数
    let targetElement: HTMLElement|null = await challengeQuery("#root > div > header > div > div.sc-jQHtVU.eXaJze");
    if (!targetElement) return; // 数秒待機してもターゲットとなる要素が見つからなければ処理を止める

    // Reactコンポーネントをレンダリングし、DOM要素を取得
    const container = document.createElement('div');
    ReactDOM.render(<ExChatPaletteButton />, container);
    const reactElement = container.firstChild;

    // 謎の要素の次(「マイキャラクター一覧」の要素の前)に拡張チャットパレットボタンを追加する
    if(reactElement instanceof Node) targetElement.after(reactElement);

    console.log(reactElement);
}

async function challengeQuery(query: string, timeLimit: number = 5): Promise<HTMLElement|null>{ // 指定された要素が見つかるまで数秒くらい待機する関数
    const intervalInSeconds: number = 0.1; // 繰り返し間隔(秒)
    let targetElement: HTMLElement|null = null;
    let queryCounter: number = 0;
    await new Promise(resolve => {
        const intervalId = setInterval(function() {
            targetElement = document.querySelector(query);
            queryCounter += intervalInSeconds;
            if ((targetElement !== null) || (queryCounter >= timeLimit)) {
                clearInterval(intervalId);
                resolve(targetElement);
            }
        }, intervalInSeconds * 1000);
    });
    return targetElement;
}

window.onload = async function(){
    console.log("hello world");
    addExChatPaletteButton();
};