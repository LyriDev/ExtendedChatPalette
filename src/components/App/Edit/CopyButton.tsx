import React, { useContext, useEffect, useRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { ChatPalette, Data, Tab } from '../../../data/DataModel';
import { TabNameContext } from '../../../providers/App/TabNameProvider';
import { TextContext } from '../../../providers/App/TextProvider';
import { DataContext } from '../../../providers/App/DataProvider';
import { getData } from '../../../data/DataControl';

export default function CopyButton(){
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [_tabNames, setTabNames] = useContext(TabNameContext) || [];
    const [_texts, setTexts] = useContext(TextContext) || [];
    const [_chatPalettes, setChatPalettes] = useContext(DataContext) || [];

    const [data, setData] = useState<Data | null>(null);
    useEffect(() => {
        getData().then((receivedData) => {
            setData(receivedData)
        });
    }, []);

    return (
        <>
            <Button
                ref={buttonRef}
                onClick={() => {
                    if(Object.keys(data || {}).length > 0){
                        setIsOpened(true);
                    }else{
                        alert("他の部屋の拡張チャットパレットのデータがないため、コピーできません。");
                    }
                }}
            >
                他の部屋の設定をコピー
            </Button>
            <Menu
                anchorEl={buttonRef.current}
                open={isOpened}
                onClose={() => setIsOpened(false)}
                disableAutoFocusItem={false}
                autoFocus={false}
                keepMounted
                transitionDuration={"auto"}
                anchorOrigin={{ // 紐づけたHTML要素のどこを標準位置にしてメニューを配置するか設定できる
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{ // メニューの起点を設定できる。アニメーションもこの起点から生えるように出現する
                    vertical: "top",
                    horizontal: "left"
                }}
                sx={{ elevation: 8, zIndex: 10001 }}
                disablePortal
            >
                {data && Object.keys(data).map(roomId => (
                    <MenuItem
                        onClick={(event: React.SyntheticEvent) => {
                            if(!setTabNames || !setTexts || !setChatPalettes) return;
                            const isDo: boolean = confirm(`本当に現在のルームに「${data[roomId].roomName}」のデータを貼り付けますか？`);
                            if(!isDo) return;
                            const copyTabs = data[roomId].tabs
                            const { tabNames, texts, chatPalettes } = transformTabsData(copyTabs);
                            setTabNames(tabNames);
                            setTexts(texts);
                            setChatPalettes(chatPalettes);
                            setIsOpened(false);
                        }}
                    >
                        {data[roomId].roomName}({roomId})
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

type TransformedTabs = {
    tabNames: string[],
    texts: string[],
    chatPalettes: ChatPalette[][]
};

function transformTabsData(tabs: Tab[]): TransformedTabs{
    const result: TransformedTabs = {
        tabNames: [],
        texts: [],
        chatPalettes: []
    };

    tabs.forEach(tabData => {
        result.tabNames.push(tabData.tabName);
        result.texts.push(tabData.originText);
        result.chatPalettes.push(tabData.chatPalettes);
    });

    return result;
}
