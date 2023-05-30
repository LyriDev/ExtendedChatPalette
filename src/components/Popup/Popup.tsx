import React from 'react';
import { useState, useEffect } from "react";
import { getSettings, saveTabData, getTabNames, getTexts } from '../../data/DataControl';

export default function Popup() {
    const [enableExDodge, setEnableExDodge] = useState(true); // 拡張回避の設定データ

    useEffect(() => {
        (async() => {
            const response = await getSettings()
            setEnableExDodge(response.enableExDodge)
        })()
    }, []);

    // 拡張回避の設定データを変更し、ストレージに保存する関数
    async function changeDodgeSettings(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            const newData = {
                settings: {
                    enableExDodge: !enableExDodge
                }
            };
            chrome.storage.local.set(newData, function() {
                setEnableExDodge(newData.settings.enableExDodge);
                resolve();
            });
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
            <button onClick={() => saveTabData(["メイン","サブ","NPC用"],["hoge","fuga","1d100"],"jCzJmypt5","お部屋")}>saveTabData</button>
            <button onClick={() => getTabNames("jCzJmypt5").then((value) => console.log(value))}>getTabNames</button>
            <button onClick={() => getTexts("jCzJmypt5").then((value) => console.log(value))}>getTexts</button>
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
        </div>
    );
}