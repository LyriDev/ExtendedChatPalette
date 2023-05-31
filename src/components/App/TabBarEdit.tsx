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

export default function TabBarEdit({value, setValue}: {value: number, setValue: React.Dispatch<React.SetStateAction<number>>}) {
    const [tabNames, setTabNames] = useContext(TabNameContext) || [];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
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


    const [tabs, setTabs] = useState([
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 3' },
    ]);
    const handleLabelChange = (index:any, value:any) => {
        setTabs((prevTabs) => {
            const newTabs = [...prevTabs];
            newTabs[index].label = value;
            return newTabs;
        });
    };

    return (
        <Box style={tabsStyle} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={handleChange}
            aria-label="basic tabs example"
            >
                {tabNames?.map((tabName, index) => (
                    <Tab
                    key={index}
                    label={tabName}
                    {...a11yProps(index)}
                    sx={{ padding: '6px 12px', minHeight: "48px" ,minWidth: "0" }}
                    ref={anchors.current[index]}
                    onClick={(event) => { 
                        if (value === index) {
                            clickHandlers[index]();
                        }
                    }}
                    />
                ))}
                <EditableTab
                key={0}
                label={"ラベル"}
                index={0}
                onLabelChange={handleLabelChange}
                />
            </Tabs>
            {tabNames?.map((tabName, index) => (
                <DropDownMenu
                key={index}
                index={index}
                anchors={anchors}
                open={opens[index]}
                handleClose={closeHandlers[index]}
                handleChange={handleChange}
                />
            ))}
        </Box>
    );
}

import TextField from '@mui/material/TextField';
const EditableTab = ({ label, index, onLabelChange }:any) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(label);

    const handleInputChange = (event:any) => {
        setValue(event.target.value);
    };

    const handleTabClick = () => {
        setEditing(true);
    };

    const handleInputBlur = () => {
        setEditing(false);
        onLabelChange(index, value);
    };

    return (
        <Tab
            label={
                editing ? (
                    <TextField
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                    />
                ) : (
                    label
            )
            }
            onClick={handleTabClick}
        />
    );
};