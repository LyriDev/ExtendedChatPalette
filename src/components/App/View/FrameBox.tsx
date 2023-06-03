import React from 'react';

export default function FrameBpx() { // リサイズ用の外枠
    return (
        <span>
            <div // 上
            style={{
                position: "absolute",
                userSelect: "none",
                width: "100%",
                height: "10px",
                top: "-5px",
                left: "0px",
                cursor: "row-resize"
            }}/>
            <div // 右
            style={{
                position: "absolute",
                userSelect: "none",
                width: "10px",
                height: "100%",
                top: "0px",
                right: "-5px",
                cursor: "col-resize"
            }}/>
            <div // 下
            style={{
                position: "absolute",
                userSelect: "none",
                width: "100%",
                height: "10px",
                bottom: "-5px",
                left: "0px",
                cursor: "row-resize"
            }}/>
            <div // 左
            style={{
                position: "absolute",
                userSelect: "none",
                width: "10px",
                height: "100%",
                top: "0px",
                left: "-5px",
                cursor: "col-resize"
            }}/>
            <div // 右上
            style={{
                position: "absolute",
                userSelect: "none",
                width: "20px",
                height: "20px",
                right: "-10px",
                top: "-10px",
                cursor: "ne-resize"
            }}/>
            <div // 右下
            style={{
                position: "absolute",
                userSelect: "none",
                width: "20px",
                height: "20px",
                right: "-10px",
                bottom: "-10px",
                cursor: "nw-resize"
            }}/>
            <div // 左下
            style={{
                position: "absolute",
                userSelect: "none",
                width: "20px",
                height: "20px",
                left: "-10px",
                bottom: "-10px",
                cursor: "ne-resize"
            }}/>
            <div // 左上
            style={{
                position: "absolute",
                userSelect: "none",
                width: "20px",
                height: "20px",
                left: "-10px",
                top: "-10px",
                cursor: "nw-resize"
            }}/>
        </span>
    );
}