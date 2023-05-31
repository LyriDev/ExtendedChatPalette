import React, { useState, useEffect, useContext, useRef, RefObject, createRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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
    useEffect(() => {
        if(tabNames){
            const newOpens: boolean[] = [...opens];
            const newClickHandlers: (() => void)[] = [...clickHandlers];
            const newCloseHandlers: (() => void)[] = [...closeHandlers];
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
            }
            setOpens(newOpens);
            setClickHandlers(newClickHandlers);
            setCloseHandlers(newCloseHandlers);
        }
    }, [tabNames]);

    function handleTabNameChange(index:number, value:string){ // tabNameのindex番目の要素をvalueで上書きする関数
        if(!(tabNames && setTabNames)) throw new Error("tabNamesが存在しません。")
        const newTabNames: string[] = [...tabNames]
        newTabNames[index] = value
        setTabNames(newTabNames)
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
                    <EditableTab
                    key={index}
                    index={index}
                    label={tabName}
                    handleTabNameChange={handleTabNameChange}
                    focusIndex={focusIndex}
                    anchor={anchors.current[index]}
                    clickHandler={clickHandlers[index]}
                    />
/*                     <Tab
                    key={index}
                    label={tabName}
                    {...a11yProps(index)}
                    sx={{ padding: '6px 12px', minHeight: "48px" ,minWidth: "0" }}
                    ref={anchors.current[index]}
                    onClick={(event) => { 
                        if (focusIndex === index) {
                            clickHandlers[index]();
                        }
                    }}
                    /> */
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

import TextField from '@mui/material/TextField';
interface MyProps{
    index: number
    label: string,
    handleTabNameChange: (index: number, value: string) => void,
    focusIndex: number,
    anchor: RefObject<HTMLDivElement>,
    clickHandler: (() => void)
}
function EditableTab({ label, index, handleTabNameChange, focusIndex, anchor, clickHandler }: MyProps){
    // const [editing, setEditing] = useState<boolean>(false);
    // const [value, setValue] = useState<string>(label);

    // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
    //     setValue(event.target.value);
    // };

    // function handleTabClick(): void{
    //     setEditing(true);
    // };

    // function handleInputBlur(): void{
    //     setEditing(false);
    //     handleTabNameChange(index, value);
    // }

    return (
/*         <Tab
            key={index}
            label={
                
                label
                // editing ? (
                //     <TextField
                //     value={value}
                //     onChange={handleInputChange}
                //     onBlur={handleInputBlur}
                //     autoFocus
                //     />
                // ) : (
                //     label
                // )
            }
            {...a11yProps(index)}
            sx={{ padding: '6px 12px', minHeight: "48px" ,minWidth: "0" }}
            ref={anchor}
            onClick={(event) => { 
                if (focusIndex === index) {
                    //handleTabClick()
                    clickHandler();
                }
            }}
        /> */
        <Tab
        key={index}
        label={label}
        {...a11yProps(index)}
        sx={{ padding: '6px 12px', minHeight: "48px" ,minWidth: "0" }}
        ref={anchor}
        onClick={(event) => { 
            if (focusIndex === index) {
                clickHandler();
            }
        }}
        />
    );
};