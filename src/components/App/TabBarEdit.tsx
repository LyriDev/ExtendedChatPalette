import React, { useState, useEffect, useContext, useRef, RefObject, createRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TabNameContext } from "./../../providers/App/TabNameProvider"
import DropDownMenu from "./DropDownMenu"

const tabsStyle: React.CSSProperties = {
    backgroundColor: '#212121',
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabBarEdit({focusIndex, setFocusIndex}: {focusIndex: number, setFocusIndex: React.Dispatch<React.SetStateAction<number>>}) {
    const [tabNames, setTabNames] = useContext(TabNameContext) || [];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setFocusIndex(newValue);
    };

    // ドロップダウンメニューに必要なプロパティ群
    const [opens, setOpens] = useState<boolean[]>([]); // メニューの開閉を管理
    // const [anchors, setAnchors] = useState(useRef([])); // メニューを配置するHTML要素を格納する
    const anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> = useRef<RefObject<HTMLDivElement>[]>([])
    const [clickHandlers, setClickHandlers] = useState<(() => void)[]>([]); // メニュー開閉ハンドル
    const [closeHandlers, setCloseHandlers] = useState<(() => void)[]>([]); // メニューを閉めるハンドル
    // タブ名編集に必要なプロパティ群
    const [editingArray, setEditingArray] = useState<boolean[]>([]); // タブ名編集中かどうかを管理
    const [tabValues, setTabValues] = useState<string[]>([]); // タブのvalueを管理
    useEffect(() => {
        if(tabNames){
            const newOpens: boolean[] = [...opens];
            const newClickHandlers: (() => void)[] = [...clickHandlers];
            const newCloseHandlers: (() => void)[] = [...closeHandlers];
            const newEditingArray: boolean[] = [...editingArray];
            const newTabValues: string[] = [...tabValues];
            for(let i: number = 0; i < tabNames.length; i++){
                // opensを初期化する
                newOpens.push(false);
                // anchorsを初期化する
                tabNames.forEach((_, index) => {
                    anchors.current[index] = createRef<HTMLDivElement>()
                })
                // clickHandlersを初期化する
                newClickHandlers.push(() => {
                    const copyOpens: boolean[] = [...opens];
                    copyOpens[i]=(!copyOpens[i]);
                    setOpens(copyOpens);
                });
                // closeHandlersを初期化する
                newCloseHandlers.push(() => {
                    const copyOpens: boolean[] = [...opens];
                    copyOpens[i]=(false);
                    setOpens(copyOpens);
                });
                // editingArrayを初期化する
                newEditingArray.push(false);
                // tabValuesを初期化する
                newTabValues.push(tabNames[i]);
            }
            setOpens(newOpens);
            setClickHandlers(newClickHandlers);
            setCloseHandlers(newCloseHandlers);
            setEditingArray(newEditingArray);
            setTabValues(newTabValues);
        }
    }, [tabNames]);

    function handleTabNameChange(index: number, value: string){ // tabNameのindex番目の要素をvalueで上書きする関数
        if(!(tabNames && setTabNames)) throw new Error("tabNamesが存在しません。")
        const newTabNames: string[] = [...tabNames]
        newTabNames[index] = value
        setTabNames(newTabNames)
    }

    // タブ名編集に必要な関数群
    function handleInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>){ // Inputが変更されたらtabValuesのindex番目のvalueを変更する関数
        const newTabValues: string[] = [...tabValues];
        newTabValues[index] = event.target.value;
        setTabValues(newTabValues);
    };
    function handleTabClick(index: number): void{ // タブがクリックされたらタブ名を編集中にする関数
        const newEditingArray: boolean[] = [...editingArray];
        newEditingArray[index] = true;
        setEditingArray(newEditingArray);
    };
    function handleInputBlur(index: number): void{ // Inputからフォーカスが外れたらタブ名の編集中状態を終了する関数
        const newEditingArray: boolean[] = [...editingArray];
        newEditingArray[index] = false;
        setEditingArray(newEditingArray);
        handleTabNameChange(index, tabValues[index]);
    }

    return (
        <Box style={tabsStyle} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
            value={focusIndex}
            textColor="primary"
            indicatorColor="primary"
            onChange={handleTabChange}
            aria-label="basic tabs example"
            >
                {tabNames?.map((tabName, index) => (
                        <Tab
                        key={index}
                        label={
                            editingArray[index] ? (
                                <TextField
                                value={value}
                                onChange={handleInputChange(index)}
                                onBlur={handleInputBlur(index)}
                                autoFocus
                                />
                            ) : (
                                tabName
                            )
                        }
                        {...a11yProps(index)}
                        sx={{ padding: '6px 12px', minHeight: "48px" ,minWidth: "0" }}
                        ref={anchors.current[index]}
                        onClick={(event) => { 
                            if (focusIndex === index) {
                                //handleTabClick()
                                clickHandlers[index]();
                            }
                        }}
                    />
                ))}
            </Tabs>
            {tabNames?.map((tabName, index) => (
                <DropDownMenu
                key={index}
                index={index}
                anchors={anchors}
                open={opens[index]}
                handleClose={closeHandlers[index]}
                handleTabChange={handleTabChange}
                />
            ))}
        </Box>
    );
}