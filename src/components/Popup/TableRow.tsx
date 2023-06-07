import React from 'react';
import { IconButton } from '@mui/material';
import Trash from "./../../svg/Trash"
import { deleteData } from "./../../data/DataControl"

interface TableRowProps {
    roomId: string;
    roomName: string;
    byte: number;
    totalByte: number;
    paletteByte: number;
    setDeletedData: (key: string) => void;
}

export default function TableRow(props: TableRowProps) {
    const { roomId, roomName, byte, totalByte, paletteByte, setDeletedData } = props;

    return (
        <tr>
            <td className="room-id">
                <a
                href={`"https://ccfolia.com/rooms/${roomId}"`}
                onClick={() => {
                    chrome.tabs.create({url: `https://ccfolia.com/rooms/${roomId}`});
                }}
                >
                    {roomId}
                </a>
            </td>
            <td className="room-name">
                {roomName}
            </td>
            <td  className="used-byte">
                {(Math.round((paletteByte * (byte / totalByte))) / 1024).toFixed(2)} KB
            </td>
            <td className="delete-button">
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