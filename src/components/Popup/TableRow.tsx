import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import Link from '@mui/material/Link';
import Trash from "./../../svg/Trash"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { deleteData, saveTabs } from "./../../data/DataControl"
import { Data, RoomData, Tab } from '../../data/DataModel';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

interface TableRowProps {
    roomId: string;
    roomName: string;
    byte: number;
    totalByte: number;
    paletteByte: number;
    setDeletedData: (key: string) => void;
    roomDataTabs: Tab[];
    setPastedData: (roomId: string, tabs: Tab[]) => void;
    currentData: RoomData & { roomId: string } | null;
    setCurrentData: React.Dispatch<React.SetStateAction<RoomData & { roomId: string } | null>>;
    data: Data
}

export default function TableRow(props: TableRowProps) {
    const {
        roomId,
        roomName,
        byte,
        totalByte,
        paletteByte,
        setDeletedData,
        roomDataTabs,
        setPastedData,
        currentData,
        setCurrentData,
        data
    } = props

    return (
        <tr>
            <td className="room-id">
                <Link
                sx={{
                    color: "#1976d2",
                    "&:active": {
                        color: "#03a9f4",
                        textDecoration: "underline"
                    },
                }}
                underline="none"
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    chrome.tabs.create({url: `https://ccfolia.com/rooms/${roomId}`});
                }}
                onMouseUp={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    if (event.button === 1){
                        chrome.tabs.create({url: `https://ccfolia.com/rooms/${roomId}`});
                    }
                }}
                >
                    {roomId}
                </Link>
            </td>
            <td className="room-name">
                {roomName}
            </td>
            <td  className="used-byte">
                {(Math.round((paletteByte * (byte / totalByte))) / 1024).toFixed(2)} KB
            </td>
            <td className="delete-button" style={{ borderLeft: "1px white solid" }}>
                <IconButton color="primary"
                onClick={() => {
                    // const isDeleteDo: boolean = confirm(`本当に「${roomName}」のデータを削除しますか？`)
                    // if(!isDeleteDo) return
                    deleteData(roomId).then((response) => {
                        setDeletedData(roomId);
                    })
                }}
                >
                    <Trash/>
                </IconButton>
            </td>
        </tr>
    );
}
