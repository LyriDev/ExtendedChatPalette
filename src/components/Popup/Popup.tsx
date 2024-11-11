import React from 'react';
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getData, getSettings, deleteData, getBytes } from '../../data/DataControl';
import { Data, RoomData, Tab } from "./../../data/DataModel"
import TableRow from "./TableRow"
import { Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input'

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
    const [paletteByte, setPaletteByte] = useState<number>(0); // 拡張チャパレのデータ量を格納した配列
    const [bytes, setBytes] = useState<number[]>([]); // 部屋毎のデータ量を格納した配列

    const [currentData, setCurrentData] = useState<RoomData & { roomId: string } | null>(null)

    function setDeletedData(key: string){
        const newData: Data = Object.assign({}, data)
        delete newData[key];
        setData(newData)
    }

    function setPastedData(roomId: string, tabs: Tab[]){
        setData(prev => {
            const newData: Data = Object.assign({}, prev)
            newData[roomId].tabs = tabs;
            return newData;
        })
    }

    useEffect(() => {
        getSettings().then((receivedSettings) => {
            let newEnableExDodge: boolean = true
            try{
                newEnableExDodge = receivedSettings.enableExDodge;
            }catch(e){
                newEnableExDodge = true;
            }
            setEnableExDodge(newEnableExDodge)
        })
        getData().then((receivedData) => {
            setData(receivedData)
        })
    }, []);

    useEffect(() => {
        getBytes(null).then((receivedWholeByte) => {
            setWholeByte(receivedWholeByte)
        })
        getBytes(["data"]).then((receivedPaletteByte) => {
            setPaletteByte(receivedPaletteByte)
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

    // function getAllData(): void{
    //     chrome.storage.local.get(function(result) {
    //         console.log(result);
    //     });
    // }
    // function clearData(): void{
    //     chrome.storage.local.clear();
    // }

    const [file, setFile] = useState<File | null>(null)
    const [inputState, setInputState] = useState<string>("ファイル読み込み")
    function handleFileChange(value: File | null | File[]){
        if(Array.isArray(value) || value === null || value.type !== "application/json"){
            setInputState("読み込み失敗");
            return;
        }
        setFile(value);
    }
    useEffect(() => {
        if(!Array.isArray(file) && file !== null && file.type === "application/json") loadJson(file);
    }, [file]);
    function loadJson(newFile: File){
        if (newFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const result = e.target?.result;
                    if (typeof result === 'string') {
                        const parsedJson = JSON.parse(result);
                        const sendData = { data: parsedJson }
                        chrome.storage.local.set(sendData, function() {
                            console.log("データを保存しました")
                        });
                        setData(parsedJson);
                        setInputState("読み込み成功")
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(newFile);
        }
    };

    const handleDownload = () => {
        getData().then(jsonData => {
            const dataStr = JSON.stringify(jsonData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = '拡張チャパレ.json';
            link.click();
            URL.revokeObjectURL(url);
        })
    };

    return (
        <div className="App" >
            <ThemeProvider theme={theme}>
                <h3>拡張チャットパレット 設定</h3>
                <div style={{display: "flex", justifyContent: "space-around", marginBottom: "0.5rem"}}>
                    <Button
                        onClick={handleDownload}
                        variant="outlined"
                    >ファイル出力</Button>
                    <MuiFileInput
                        value={file}
                        onChange={handleFileChange}
                        label={inputState}
                        InputLabelProps={{
                            style: { color: 'white' }, // ラベルの色を白に設定
                        }}
                        sx={{
                            width: "230px",
                            color: 'white', // 文字色を白に設定
                            '& .MuiInputBase-input': {
                                color: 'white', // 入力テキストの文字色を白に設定
                            },
                            '& .MuiTypography-caption': {
                                color: 'white', // ファイルサイズ（KB数）の文字色を白に設定
                            },
                            '& .MuiOutlinedInput-root': {
                                color: "white",
                                '& fieldset': {
                                    borderColor: 'white', // 枠線の色を白に設定
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white', // ホバー時も枠線の色を白に設定
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white', // フォーカス時の枠線色を白に設定
                                },
                            },
                        }}
                    />
                </div>
                <div className="check-box">
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
                        <th className="room-id">ルームID</th>
                        <th className="room-name">ルーム名</th>
                        <th className="used-byte">{"使用容量 [KB]"}</th>
                        <th className="delete-button"></th>
                    </tr>
                    {data && Object.keys(data).map((key, dataIndex) => (
                        <TableRow
                        roomId={key}
                        roomName={data[key].roomName}
                        byte={bytes[dataIndex]}
                        totalByte={bytes.reduce(function(sum, element){return sum + element;}, 0)}
                        paletteByte={paletteByte}
                        setDeletedData={setDeletedData}
                        roomDataTabs={data[key].tabs}
                        setPastedData={setPastedData}
                        currentData={currentData}
                        setCurrentData={setCurrentData}
                        data={data}
                        />
                    ))}
                </table>
                <div className="show-data">
                    {`合計使用容量：${(wholeByte / 1024).toFixed(2)} KB`}
                </div>
            </ThemeProvider>
        </div>
    );
}
