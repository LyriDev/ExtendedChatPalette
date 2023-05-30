import React, { useState, useContext}  from 'react';
import HelpContent from "./HelpContent"
import { TextContext } from "./../../providers/App/TextProvider"

const textareaStyle: React.CSSProperties = {
    borderRadius: '4px',
    margin: "16px 24px 8px",
    padding: "6px 12px",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "400",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    lineHeight: "1.1876em",
    letterSpacing: "0.00938em",
    border: "0",
    outline: "none",
    resize: "none",
    background: "none",
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    width: "calc(100% - (24px + 12px)*2)",
};

export default function TextareaContent({ index }: { index: number}) {
    const resource = useContext(TextContext);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void{
        if(!resource?.[0]) throw new Error("配列データが存在しません")
        const text = event.target.value // textareaのvalue
        const newArray = [...resource?.[0]]; // 配列のコピーを作成
        newArray[index] = text; // index番目の要素を変更
        resource?.[1](newArray); // 変更された配列を新しい状態として設定
    };

    return (
        <div>
            <HelpContent />
            <textarea style={textareaStyle} rows={12} value={resource?.[0]?.[index]} onChange={handleChange} />
        </div>
    );
}