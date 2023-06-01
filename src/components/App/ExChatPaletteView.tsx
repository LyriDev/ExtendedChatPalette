import React from 'react';
import Draggable from 'react-draggable';


export default function ExChatPaletteView() {
    return (
        <Draggable
        defaultPosition={{x: window.innerWidth / 2, y: -window.innerHeight / 2}}
        handle="b"
        >
            <div
            style={{
                    position: "absolute",
                    zIndex: 1202,
                    backgroundColor: "white",
            }}
            >
                <b>ここをつかんで移動</b>
                <p>ドラッグで移動したい要素</p>
            </div>
        </Draggable>
    );
}