import React, { useState, useEffect, useContext, useRef } from 'react';
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
    const [anchors, setAnchors] = useState<React.RefObject<HTMLDivElement>[]>([]); // メニューを配置するHTML要素を格納する
    const [clickHandlers, setClickHandlers] = useState<(() => void)[]>([]); // メニュー開閉ハンドル
    const [closeHandlers, setCloseHandlers] = useState<(() => void)[]>([]); // メニューを閉めるハンドル
    useEffect(() => {
        if(tabNames){
            const newOpens: boolean[] = [...opens];
            const newAnchors: React.RefObject<HTMLDivElement>[] = [...anchors];
            const newClickHandlers: (() => void)[] = [...clickHandlers];
            const newCloseHandlers: (() => void)[] = [...closeHandlers];
            for(let i: number = 0; i < tabNames.length; i++){
                // opensを初期化する
                newOpens.push(false);
                // anchorsを初期化する
                const anchorEl = useRef<HTMLDivElement>(null);
                newAnchors.push(anchorEl);
                // clickHandlersを初期化する
                newClickHandlers.push(() => {
                    const copyOpens: boolean[] = [...opens];
                    copyOpens[i]=(!open);
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
            setAnchors(newAnchors);
            setClickHandlers(newClickHandlers);
            setCloseHandlers(newCloseHandlers);
        }
        console.log("opens",opens)
        console.log("anchors",anchors)
    }, [tabNames]);

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
                    ref={anchors[index]}
                    onClick={(event) => { 
                        if (value === index) {
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
                anchorEl={anchors[index]}
                open={opens[index]}
                handleClose={closeHandlers[index]}
                handleChange={handleChange}
                // ドロップダウンメニューに必要なプロパティ群
                opens={opens}
                setOpens={setOpens}
                anchors={anchors}
                setAnchors={setAnchors}
                clickHandlers={clickHandlers}
                setClickHandlers={setClickHandlers}
                closeHandlers={closeHandlers}
                setCloseHandlers={setCloseHandlers}
                />
            ))}
        </Box>
    );
}