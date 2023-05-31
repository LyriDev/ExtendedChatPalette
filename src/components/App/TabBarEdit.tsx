import React, { useState, useContext, useRef } from 'react';
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

    const opens: [boolean, React.Dispatch<React.SetStateAction<boolean>>][] = new Array; // メニューの開閉を管理
    const anchors: React.RefObject<HTMLDivElement>[] = new Array; // メニューを配置するHTML要素を格納する
    const clickHandlers: (() => void)[] = new Array; // メニュー開閉ハンドル
    const closeHandlers: (() => void)[] = new Array; // メニューを閉めるハンドル
    if(tabNames){
        for(let i: number = 0; i < tabNames.length; i++){
            const [open, setOpen] = useState<boolean>(false);
            const anchorEl = useRef<HTMLDivElement>(null);
            opens.push([open, setOpen]);
            anchors.push(anchorEl);
            clickHandlers.push(() => { setOpen(!open) });
            closeHandlers.push(() => { setOpen(false) });
        }
    }

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
                anchorEl={anchors[index]}
                open={opens[index][0]}
                handleClose={closeHandlers[index]}
                />
            ))}
        </Box>
    );
}