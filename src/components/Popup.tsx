import React from 'react';
import { useState, useEffect } from "react";

function Popup() {
    const [enableExDodge, setEnableExDodge] = useState(true);

    useEffect(() => {
        chrome.storage.local.get("settings", function(result) {
            if ((result.settings) && (result.settings.enableExDodge !== undefined)) {
                // 設定データを取得する
                setEnableExDodge(result.settings.enableExDodge);
            }else{
                // 設定データが存在しない場合は初期化する
                const defaultSettings: object = {
                    enableExDodge: enableExDodge
                };
                chrome.storage.local.set({ settings: defaultSettings }, function() {
                    console.log('Settings initialized');
                });
            }
        });
    }, []);

    // ボタンをクリックしたときの処理
    const handleButtonClick = () => {
        const newSettings = {
            enableExDodge: !enableExDodge
        };

        // 設定データを更新してストレージに保存する
        chrome.storage.local.set({ settings: newSettings }, function() {
            console.log('Settings updated');
            setEnableExDodge(!enableExDodge);
        });

        chrome.storage.local.get(function(result) {
            console.log(result)
        })
    };

    return (
        <div className="App">
            <div>
                <input
                    type="checkbox"
                    id="check"
                    checked={enableExDodge}
                    onChange={handleButtonClick}
                />
                <label htmlFor="check">
                    チェック：
                </label>
            </div>
        </div>
    );
}

export default Popup;