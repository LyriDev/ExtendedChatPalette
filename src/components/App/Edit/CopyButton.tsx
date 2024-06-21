import React, { useContext, useRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';


export default function CopyButton(){
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <Button ref={buttonRef}>他の部屋の設定をコピー</Button>
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
                    <MenuItem
                        onClick={(event: React.SyntheticEvent) => {

                        }}
                    >
                        hoge
                    </MenuItem>
            </Menu>
        </>
    );
}
