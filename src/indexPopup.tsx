import React from 'react';
import ReactDOM from 'react-dom';
import "./style/popup.scss"
import Popup from './components/Popup/Popup';



import ExChatPaletteView from "./components/App/ExChatPaletteView"
import ExChatPaletteButton from './components/App/ExChatPaletteButton';

// ポータル(モーダルメニュー追加用)を追加するためのルート要素を作成
const portalRoot = document.createElement('div');
portalRoot.id = 'portal-root';
document.body.appendChild(portalRoot);

/* // Reactコンポーネントをレンダリングし、DOM要素を取得
const container = document.createElement('div');
ReactDOM.render(<ExChatPaletteButton  isActive={true} portalRoot={portalRoot} />, container);
const reactElement = container.firstChild as HTMLElement;

document.body.appendChild(reactElement); */



ReactDOM.render(
    <React.StrictMode>
        <Popup />
        {/* <ExChatPaletteView /> */}
        <ExChatPaletteButton  isActive={true} />
    </React.StrictMode>,
    document.getElementById('root')
);