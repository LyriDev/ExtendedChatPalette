import React, { useState, useContext, useRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabNameContext } from "./../../providers/App/TabNameProvider"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

    const [open, setOpen] = useState<boolean>(false); // メニューの開閉を管理
    const anchorEl = useRef<HTMLButtonElement>(null); // メニューを配置するHTML要素を格納する
    const handleClick = () => { // メニュー開閉ハンドル
        setOpen(!open);
    };
    const handleClose = () => { // メニューを閉めるハンドル
        setOpen(false);
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
                    onClick={() => {if(index===value)console.log(true)}}
                    />
                ))}
            </Tabs>
            <button
            ref={anchorEl} // ボタンのHTML要素
            onClick={handleClick} // クリックアクション
            >
                ボタン
            </button>
            <Menu
            // ここでボタンの位置にメニューを紐づける
            // この紐づけのお陰でメニューがボタンの隣に出現する
            // これが無いと画面の変なところでメニューが出現することになる
            anchorEl={anchorEl.current}
            open={open} // メニューの出現を管理
            disableAutoFocusItem={false} // Falseだと、メニューを開いた時にメニューアイテムがフォーカスの対象になる
            autoFocus={false} // Trueだとメニューが開いた時に一番上のメニューアイテムのオートフォーカスされる
            onClose={handleClose} // 主にメニューを閉めたいときに発生するイベント
            keepMounted // Trueにすると、メニューが閉じている状態でもメニューのノードが存在するようになる
            transitionDuration={"auto"} // メニューの開閉のアニメーション速度を設定できる
            sx={{}} // CSS in JS を記述できる(HTMLのstyle属性の役割を果たす)
            anchorOrigin={{ // 紐づけたHTML要素のどこを標準位置にしてメニューを配置するか設定できる
            vertical: "bottom",
            horizontal: "right"
            }}
            transformOrigin={{ // メニューの起点を設定できる。アニメーションもこの起点から生えるように出現する
            vertical: "top",
            horizontal: "right"
            }}
            MenuListProps={{}} // Menuコンポーネント内部で使用されているMenuListコンポーネントのPropsを変更できる
            PaperProps={{ // Menuコンポーネント内部で使用されているPaperコンポーネントのPropsを変更できる
            elevation: 8 // PaperProps.elevationはメニューのシャドーを調整できる（超重要！）
            }}
            style={{zIndex: 10000}}
            disablePortal  // ポータルの無効化
            >
                <MenuItem onClick={handleClose}>メニュー１</MenuItem>
                <MenuItem onClick={handleClose}>メニュー２</MenuItem>
                <MenuItem onClick={handleClose}>メニュー３</MenuItem>
            </Menu>
        </Box>
    );
}