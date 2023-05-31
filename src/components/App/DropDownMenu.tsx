import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropDownMenu({anchorEl, open, handleClose}: {anchorEl: any, open: boolean, handleClose: () => void}){
    return (
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
    );
}