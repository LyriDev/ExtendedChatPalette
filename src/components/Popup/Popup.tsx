import React from 'react';
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getData, getSettings, deleteData, getBytes } from '../../data/DataControl';
import { Data } from "./../../data/DataModel"
import TableRow from "./TableRow"

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff" // プライマリーカラーを白色に設定
        }
    }
});

export default function Popup() {
    const [enableExDodge, setEnableExDodge] = useState<boolean>(true); // 拡張回避の設定データ
    const [data, setData] = useState<Data>({}); // 部屋毎のデータを格納した配列
    const [wholeByte, setWholeByte] = useState<number>(0); // 部屋全体のデータ量を格納した配列
    const [bytes, setBytes] = useState<number[]>([]); // 部屋毎のデータ量を格納した配列

    function setDeletedData(key: string){
        const newData: Data = Object.assign({}, data)
        delete newData[key];
        setData(newData)
    }

    useEffect(() => {
        getSettings().then((receivedSettings) => {
            setEnableExDodge(receivedSettings.enableExDodge)
        })
        getData().then((receivedData) => {
            setData(receivedData)
        })
    }, []);

    useEffect(() => {
        getBytes(null).then((receivedWholeByte) => {
            setWholeByte(receivedWholeByte)
        })
        // データのバイトサイズを計算する
        let newBytes: number[] = new Array;
        for (const key in data) {
            newBytes.push(JSON.stringify(data[key]).length)
        }
        setBytes(newBytes)
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

/*     function getAllData(): void{
        chrome.storage.local.get(function(result) {
            console.log(result);
        });
    }
    function clearData(): void{
        chrome.storage.local.clear();
    } */

    return (
        <div className="App" >
            <ThemeProvider theme={theme}>
{/*                 <button onClick={()=>{deleteData(window.prompt("ルームIDを入力") || "")}}>deleteData</button>
                <button onClick={getAllData}>getData</button>
                <button onClick={clearData}>clearData</button>
                <button onClick={()=>{
                    chrome.storage.local.getBytesInUse(["data","jCzJmypt5", "tabs"], function(bytesInUse) {
                        console.log("お試し部屋",bytesInUse)
                    });
                }}>お試し部屋</button> */}
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
                        <th colSpan={2}>{"使用容量 [%]"}</th>
                    </tr>
                    {Object.keys(data).map((key, dataIndex) => (
                        <TableRow
                        roomId={key}
                        roomName={data[key].roomName}
                        byte={bytes[dataIndex]}
                        totalByte={bytes.reduce(function(sum, element){return sum + element;}, 0)}
                        setDeletedData={setDeletedData}
                        />
                    ))}
                </table>
                <div style={{marginLeft: "auto", marginRight: "0"}}>
                    合計使用バイト：{wholeByte} byte
                </div>
            </ThemeProvider>
        </div>
    );
}