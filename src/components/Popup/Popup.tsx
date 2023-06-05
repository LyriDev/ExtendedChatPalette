import React from 'react';
import { useState, useEffect } from "react";
import { getData, getSettings, deleteData, getBytes } from '../../data/DataControl';
import { Data, Settings } from "./../../data/DataModel"
import TableRow from "./TableRow"

export default function Popup() {
    const [enableExDodge, setEnableExDodge] = useState<boolean>(true); // 拡張回避の設定データ
    const [data, setData] = useState<Data>({}); // 部屋毎のデータを格納した配列
    const [wholeByte, setWholeByte] = useState<number>(0); // 部屋全体のデータ量を格納した配列
    const [bytes, setBytes] = useState<number[]>([]); // 部屋毎のデータ量を格納した配列

    useEffect(() => {
        getSettings().then((receivedSettings) => {
            setEnableExDodge(receivedSettings.enableExDodge)
            console.log("receivedSettings",receivedSettings)
        })
        getData().then((receivedData) => {
            setData(receivedData)
            console.log("receivedData",receivedData)
        })
    }, []);
    useEffect(() => {
        getBytes(null).then((receivedWholeByte) => {
            setWholeByte(receivedWholeByte)
            console.log("receivedWholeByte",receivedWholeByte)
        })
        let newBytes: number[] = new Array;
        Object.keys(data).map(key => {
            getBytes(["data", key]).then((response) => {
                newBytes.push(response);
                console.log(key+":",response)
            })
        })
        setBytes(newBytes)

        chrome.storage.local.getBytesInUse(["data","jCzJmypt5"], function(bytesInUse) {
            console.log("お試し部屋",bytesInUse)
        });
    }, [data]);


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

    function getAllData(): void{
        chrome.storage.local.get(function(result) {
            console.log(result);
        });
    }
    function clearData(): void{
        chrome.storage.local.clear();
    }

    return (
        <div className="App">
            <button onClick={()=>{deleteData(window.prompt("ルームIDを入力") || "")}}>deleteData</button>
            <button onClick={getAllData}>getData</button>
            <button onClick={clearData}>clearData</button>
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
                    <th>ルーム名</th>
                    <th colSpan={2}>使用バイト数</th>
                </tr>
                {Object.keys(data).map(key => (
                    <TableRow /* roomId={key} roomName={data[key].roomName} *//>
                ))}
            </table>
            <div>
                合計使用バイト：{wholeByte} byte
            </div>
        </div>
    );
}