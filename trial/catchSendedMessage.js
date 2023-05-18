let tempElm

// 監視するDOMノードを取得
const targetNode = document.querySelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.sc-fbPSWO.cRgvHx > div > div > ul > div:nth-child(1) > div > div")

// MutationObserverオブジェクトを作成
const observer = new MutationObserver(function(mutationsList, observer) {
    // 変更が検出された際に実行されるコールバック関数
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('要素が追加されました！');
            // ここに追加された要素に対する処理を記述
		if(tempElm !== targetNode.lastChild){
			tempElm = targetNode.lastChild
			console.log("入力内容：" + tempElm.querySelector("p").textContent)
		}
        }
    }
});

// 監視オプションを設定
const config = { childList: true, subtree: true };

// 監視を開始
observer.observe(targetNode, config);