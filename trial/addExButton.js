function createElementByText(string){ // テキストベースでhtml要素を作成する関数
    let result
    const outer = document.createElement("div")
    outer.innerHTML = string
    result = outer.childNodes
    return result
}

function addExtendedChatPaletteButton(){ // 拡張チャットパレットボタンを追加する関数
    const extendedChatPaletteButton = createElementByText(`
        <button class="MuiButtonBase-root MuiIconButton-root sc-bWXABl iZZULD" tabindex="0" type="button">
            <span class="MuiIconButton-label">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"</path>
                </svg>
            </span>
            <span class="MuiTouchRipple-root"></span>
        </button>
    `)[1]
    const voidSpace = document.querySelector("#root > div > header > div > div.sc-jQHtVU.eXaJze") // ココフォリアのマイキャラクター一覧ボタンの左にある謎の要素
    voidSpace.after(extendedChatPaletteButton)
}

function addExtendedChatPaletteList(){  // レスポンシブデザイン用のリストに拡張チャットパレット欄を追加する関数
    const extendedChatPaletteList = createElementByText(`
    <li class="MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button" tabindex="0" role="menuitem" aria-disabled="false">
        拡張チャットパレット
        <span class="MuiTouchRipple-root"></span>
    </li>
`)[1]

    // 監視するDOMノードを取得
    const targetNode = document

    // MutationObserverオブジェクトを作成
    const observer = new MutationObserver(function(mutationsList, observer) {
        // 変更が検出された際に実行されるコールバック関数
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('要素の変更を検知しました');

                // ここに追加された要素に対する処理を記述
                const tabBarList = targetNode.querySelector("body > div.MuiPopover-root > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul")// レスポンシブデザイン用のul要素
                if(tabBarList){ // ul要素が追加されたかどうか
                    const tabBarListElements = Array.prototype.slice.apply(tabBarList.childNodes)
                    const isAddedElement = tabBarListElements.includes(extendedChatPaletteList) // 拡張チャットパレット欄が追加済みかどうか
                    if(!isAddedElement){
                        tabBarList.prepend(extendedChatPaletteList)
                    }
                }
            }
        }
    });

    // 監視オプションを設定
    const config = { childList: true, subtree: true };

    // 監視を開始
    observer.observe(targetNode, config);
}

addExtendedChatPaletteButton()
addExtendedChatPaletteList()