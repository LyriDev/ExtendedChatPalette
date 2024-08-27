import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';

type Prop = {
    dodgeCount: number;
    setDodgeCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function DodgeNumberControl({dodgeCount, setDodgeCount}: Prop) {
    return (
            <div
            style={{
                display: "flex",
                flexDirection: "column"
            }}
            >
                <IconButton
                color="inherit"
                style={{padding: 0}}
                onClick={() => setDodgeCount((prev) => (Math.min((prev + 1), 99)))}
                >
                    <ArrowDropUpIcon />
                </IconButton>
                <IconButton
                color="inherit"
                style={{padding: 0}}
                onClick={() => setDodgeCount((prev) => (Math.max((prev - 1), 0)))}
                >
                    <ArrowDropDownIcon />
                </IconButton>
            </div>
    );
}