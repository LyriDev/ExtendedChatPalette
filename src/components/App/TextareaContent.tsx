import * as React from 'react';
import { useState } from "react";
import HelpContent from "./HelpContent"

const textareaStyle: React.CSSProperties = {
    borderRadius: '4px',
    margin: "16px 24px 8px",
    padding: "6px 12px 0",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "400",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    lineHeight: "1.1876em",
    letterSpacing: "0.00938em",
    border: "0",
    resize: "none",
    background: "none",
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    width: "calc(100% - (24px + 12px)*2)",
    height: "100%"
};

export default function TextareaContent(props: { value?: string | number | readonly string[] }) {
    const [text, setText] = useState<string>(props.value ? props.value.toString() : '');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    return (
        <div>
            <HelpContent />
            <textarea style={textareaStyle} value={text} onChange={handleChange} />
        </div>
    );
}