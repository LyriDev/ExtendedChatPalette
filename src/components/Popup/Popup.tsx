import React from 'react';
import { useState, useEffect } from "react";

import ExChatPaletteView from "../App/ExChatPaletteView"

export default function Popup() {
    const [enableExDodge, setEnableExDodge] = useState(true); // 拡張回避の設定データ

    // 拡張回避の設定データを変更し、ストレージに保存する関数
    function changeDodgeSettings(): void{
        const newSettings = {
            enableExDodge: !enableExDodge
        };
        chrome.storage.local.set({ settings: newSettings }, function() {
            setEnableExDodge(newSettings.enableExDodge);
        });
    }

    function deleteAllData(): void{
        chrome.storage.local.clear();
    }

    function getAllData(): void{
        chrome.storage.local.get(function(result) {
            console.log(result);
        });
    }

    return (
        <div className="App">
            <button onClick={deleteAllData}>clearData</button>
            <button onClick={getAllData}>getData</button>
            <h3>拡張チャットパレット 設定</h3>
            <div>
                <input
                    type="checkbox"
                    id="check"
                    checked={enableExDodge}
                    onChange={changeDodgeSettings}
                />
                <label htmlFor="check">連続回避ロールを表示する</label>
            </div>
            <table>
                <tr>
                    <th>ルームID</th>
                    <th colSpan={2}>ルーム名</th>
                </tr>
            </table>
            <ExChatPaletteView />
        </div>
    );
}