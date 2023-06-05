import React, { useState, useEffect, useContext, useRef, RefObject, createRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Add from "../../../svg/Add"
import Triangle from "../../../svg/Triangle"
import { TabNameContext } from "../../../providers/App/TabNameProvider"
import { TextContext } from "../../../providers/App/TextProvider"
import DropDownMenu from "./DropDownMenu"
import { relative } from 'path';

const tabsStyle: React.CSSProperties = {
    backgroundColor: '#212121',
};

function a11yProps(index: number) {
    return {
        id: `ExChatPalette-tab-${index}`,
        'aria-controls': `ExChatPalette-tabpanel-${index}`,
    };
}

export default function TabBarEdit({focusIndex, setFocusIndex}: {focusIndex: number, setFocusIndex: React.Dispatch<React.SetStateAction<number>>}) {
    const [tabNames, setTabNames] = useContext(TabNameContext) || [];
    const [texts, setTexts] = useContext(TextContext) || [];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setFocusIndex(newValue);
    };

    // ドロップダウンメニューに必要なプロパティ群
    const [opens, setOpens] = useState<boolean[]>([]); // メニューの開閉を管理
    const anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> = useRef<RefObject<HTMLDivElement>[]>([])
    const [clickHandlers, setClickHandlers] = useState<(() => void)[]>([]); // メニュー開閉ハンドル
    const [closeHandlers, setCloseHandlers] = useState<(() => Promise<void>)[]>([]); // メニューを閉めるハンドル
    // タブ名編集に必要なプロパティ群
    const [editingArray, setEditingArray] = useState<boolean[]>([]); // タブ名編集中かどうかを管理
    useEffect(() => {
        if(tabNames){
            const newOpens: boolean[] = [];
            const newClickHandlers: (() => void)[] = [];
            const newCloseHandlers: (() => Promise<void>)[] = [];
            const newEditingArray: boolean[] = [];
            const nowEditIndex: number = editingArray.findIndex((value) => value === true); //今タブ名編集中がtrueになっているタブの番号
            for(let i: number = 0; i < tabNames.length; i++){
                // opensを初期化する
                newOpens[i] = (false);
                // anchorsを初期化する
                tabNames.forEach((_, index) => {
                    anchors.current[index] = createRef<HTMLDivElement>()
                })
                // clickHandlersを初期化する
                newClickHandlers[i] = (() => {
                    const copyOpens: boolean[] = [...opens];
                    copyOpens[i]=(!copyOpens[i]);
                    setOpens(copyOpens);
                });
                // closeHandlersを初期化する
                newCloseHandlers[i] = (() =>
                    new Promise<void>((resolve, reject) => {
                        const copyOpens: boolean[] = [...opens];
                        copyOpens[i]=(false);
                        setOpens(copyOpens);
                        resolve();
                    }
                ));
                // editingArrayを初期化する
                newEditingArray[i] = ((i === nowEditIndex)); // 編集中のタブ以外はfalseを設定する
            }
            setOpens(newOpens);
            setClickHandlers(newClickHandlers);
            setCloseHandlers(newCloseHandlers);
            setEditingArray(newEditingArray);
        }
    }, [tabNames]);

    function handleTabNameChange(index: number, value: string){ // tabNameのindex番目の要素をvalueで上書きする関数
        if(!(tabNames && setTabNames)) throw new Error("tabNamesが存在しません。")
        const newTabNames: string[] = [...tabNames]
        newTabNames[index] = value
        setTabNames(newTabNames)
    }

    function addTab(tabName: string = "タブ", text: string = ""){ // タブを一つ追加する関数
        if(!(tabNames && setTabNames)) throw new Error("tabNamesが存在しません。")
        if(!(texts && setTexts)) throw new Error("textsが存在しません。")
        const newTabNames: string[] = [...tabNames]
        newTabNames.push(tabName)
        setTabNames(newTabNames)
        const newTexts: string[] = [...texts]
        newTexts.push(text)
        setTexts(newTexts)
        setFocusIndex(newTabNames.length-1);
    }

    // タブ名編集に必要な関数群
    function handleInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>){ // Inputが変更されたらtabNamesのindex番目を変更する関数
        handleTabNameChange(index, event.target.value);
    };
    function handleInputBlur(index: number): void{ // Inputからフォーカスが外れたらタブ名の編集中状態を終了する関数
        const newEditingArray: boolean[] = [...editingArray];
        newEditingArray[index] = false;
        setEditingArray(newEditingArray);

        // 不正な値が設定されようとしたとき、代わりに「タブ」というタブ名を設定する
        const defaultTabName: string = "タブ"
        if(tabNames?.[index].trim() === ""){
            handleTabNameChange(index, defaultTabName);
        }
    }
    function handleTabEdit(index: number): void{ // タブ名を編集中にする関数
        const newEditingArray: boolean[] = [...editingArray];
        newEditingArray[index] = true;
        setEditingArray(newEditingArray);
    };

    return (
        <Box style={tabsStyle} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
            value={focusIndex}
            textColor={
                // どれか一つでもタブ名編集中ならタブのテキストカラーを白色から無色に変更する(アニメーションカラーも無色になる)
                editingArray.every((value) => value === false) ? "primary" : "secondary"
            }
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleTabChange}
            aria-label="ExChatPalette Edit Tabs"
            >
                {tabNames?.map((tabName, index) => (
                        <Tab
                        key={index}
                        label={
                            editingArray[index] ? (
                                <TextField
                                value={tabName}
                                color="info"
                                autoFocus
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleInputChange(index, event);
                                }}
                                onBlur={() => {
                                    handleInputBlur(index);
                                }}
                                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (event.key === 'Enter') { // タブ名編集中にEnterキーが押されたら、
                                        const inputElement:HTMLInputElement = event.target as HTMLInputElement;
                                        inputElement.blur(); // input要素のフォーカスを解除する
                                    }
                                }}
                                />
                            ) : (
                                <span
                                style={{
                                    position: "relative",
                                    paddingRight: ((focusIndex === index) ? "24px" : ""),
                                }}>
                                    <span>
                                        {tabName}
                                    </span>
                                    {(focusIndex === index) && (
                                        <span
                                        style={{
                                            position: "absolute",
                                            marginTop: "-3px",
                                            right: "-6px",
                                        }}
                                        >
                                            <Triangle/>
                                        </span>
                                    )}
                                </span>
                            )
                        }
                        {...a11yProps(index)}
                        sx={{ padding: '6px 12px', minHeight: "48px" ,minWidth: "0" }}
                        ref={anchors.current[index]}
                        onClick={(event) => {
                            // タブ名編集中でない、かつ現在タブが選択中で、クリックされたとき
                            if ((!editingArray[index]) && (focusIndex === index)) {
                                clickHandlers[index]();
                            }
                        }}
                    />
                ))}
                <IconButton
                edge="end"
                color="primary"
                aria-label="add"
                onClick={() => {addTab()}}
                style={{
                    margin: "0",
                    padding: "12px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                }}>
                    <Add />
                </IconButton>
                
            </Tabs>
            {tabNames?.map((tabName, index) => (
                <DropDownMenu
                key={index}
                index={index}
                anchors={anchors}
                open={opens[index]}
                handleClose={closeHandlers[index]}
                handleTabChange={handleTabChange}
                handleTabEdit={handleTabEdit}
                />
            ))}
        </Box>
    );
}