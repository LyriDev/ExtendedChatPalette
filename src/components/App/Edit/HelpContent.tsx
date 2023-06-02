import * as React from 'react';

const ulStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    margin: "16px 24px 8px",
    width: "calc(100% - (24px*2 + (1rem + 5px)))", // 100% - ( 左右のmargin + liのmarker )
};

export default function HelpContent() {
    return (
            <ul style={ulStyle}>
                <li style={{ listStyleType: "disc" }}>「# 名前」</li>
                この行の次の行以降に、"名前"で指定されたキャラに紐付けられたメッセージを登録できます。
                <li style={{ listStyleType: "disc" }}>「```メッセージ```」</li>
                キャラに紐付けられたメッセージを登録できます。
                <li style={{ listStyleType: "disc" }}>「##」</li>
                この行の次の行以降に、現在キャラで発言するメッセージを登録できます。
                <li style={{ listStyleType: "disc" }}>「---」</li>
                この行にボーダーを作成できます。
            </ul>
    );
}