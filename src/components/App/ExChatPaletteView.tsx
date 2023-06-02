import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

export default function ExChatPaletteView({menuVisible, closeMenu}: {menuVisible: boolean, closeMenu: () => void}) {
    const [coordinateX, setCoordinateX] = useState<number>(window.innerWidth / 2); // 拡張チャットパレットのx座標
    const [coordinateY, setCoordinateY] = useState<number>(-window.innerHeight / 2); // 拡張チャットパレットのx座標

    useEffect(() => {
        // 拡張チャットパレットが非表示になったら、
        if(!menuVisible){
            // 拡張チャットパレットを画面中央の位置に戻しておく
            setCoordinateX(window.innerWidth / 2);
            setCoordinateY(-window.innerHeight / 2);
        }
    }, [menuVisible]);

    return (
        <Draggable
        defaultPosition={{x: coordinateX, y: coordinateY}}
        handle="b"
        >
            <div
            style={{
                visibility: menuVisible ? "visible" : "hidden",
                position: "absolute",
                zIndex: 1202,
                backgroundColor: "white",
            }}
            >
                <b>ここをつかんで移動</b>
                <p>ドラッグで移動したい要素</p>
                <button onClick={() => {closeMenu()}}>閉じる</button>
            </div>
        </Draggable>
    );
}