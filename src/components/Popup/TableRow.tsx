import React from 'react';
import { IconButton } from '@mui/material';
import Link from '@mui/material/Link';
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