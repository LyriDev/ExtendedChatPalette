import React from 'react';
import { IconButton } from '@mui/material';
import Trash from "./../../svg/Trash"
import { deleteData } from "./../../data/DataControl"

interface TableRowProps {
    roomId: string;
    roomName: string;
    byte: number;
    totalByte: number;
    setDeletedData: (key: string) => void;
}

export default function TableRow(props: TableRowProps) {
    const { roomId, roomName, byte, totalByte, setDeletedData } = props;

    return (
        <tr>
            <td>
                <a
                href={`"https://ccfolia.com/rooms/${roomId}"`}
                onClick={() => {
                    chrome.tabs.create({url: `https://ccfolia.com/rooms/${roomId}`});
                }}
                >
                    {roomId}
                </a>
            </td>
            <td>{roomName}</td>
            <td>{Math.round((byte / totalByte * 100))}%</td>
            <td>
                <IconButton color="primary"
                onClick={() => {
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