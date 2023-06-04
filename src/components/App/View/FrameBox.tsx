import React, { useRef } from 'react';

interface MyProps {
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    positionX: number;
    setPositionX: React.Dispatch<React.SetStateAction<number>>;
    positionY: number;
    setPositionY: React.Dispatch<React.SetStateAction<number>>;
}
export default function FrameBox(props: MyProps) {
    const { width, setWidth, height, setHeight } = props;

    const isResizingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizingRef.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const { clientX, clientY } = e;

            let newWidth = width;
            let newHeight = height;

            // Calculate new width and height based on the mouse position
            if (e.target instanceof HTMLElement) {
                if (e.target.className.includes('resize-right')) {
                    newWidth = clientX - containerRect.left;
                } else if (e.target.className.includes('resize-left')) {
                    newWidth = containerRect.right - clientX;
                }

                if (e.target.className.includes('resize-bottom')) {
                    newHeight = clientY - containerRect.top;
                    console.log(`clientY - containerRect.top\n${clientY} - ${containerRect.top}`)
                } else if (e.target.className.includes('resize-top')) {
                    newHeight = containerRect.bottom - clientY;
                }
            }

            // Set the new width and height
            setWidth(newWidth);
            setHeight(newHeight);
            console.log("newWidth:",newWidth,"newHeight:",newHeight,"\nclientX:",clientX,"clientY:",clientY)
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <span ref={containerRef}>
        <div // 上
            className="draggable-disable resize-top"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '100%',
            height: '10px',
            top: '-5px',
            left: '0px',
            cursor: 'row-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        <div // 右
            className="draggable-disable resize-right"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '10px',
            height: '100%',
            top: '0px',
            right: '-5px',
            cursor: 'col-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        <div // 下
            className="draggable-disable resize-bottom"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '100%',
            height: '10px',
            bottom: '-5px',
            left: '0px',
            cursor: 'row-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        <div // 左
            className="draggable-disable resize-left"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '10px',
            height: '100%',
            top: '0px',
            left: '-5px',
            cursor: 'col-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        <div // 右上
            className="draggable-disable resize-right resize-top"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '20px',
            height: '20px',
            right: '-10px',
            top: '-10px',
            cursor: 'ne-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        <div // 右下
            className="draggable-disable resize-right resize-bottom"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '20px',
            height: '20px',
            right: '-10px',
            bottom: '-10px',
            cursor: 'nw-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        <div // 左下
            className="draggable-disable resize-left resize-bottom"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '20px',
            height: '20px',
            left: '-10px',
            bottom: '-10px',
            cursor: 'ne-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        <div // 左上
            className="draggable-disable resize-left resize-top"
            style={{
            position: 'absolute',
            userSelect: 'none',
            width: '20px',
            height: '20px',
            left: '-10px',
            top: '-10px',
            cursor: 'nw-resize',
            }}
            onMouseDown={handleMouseDown}
        />
        </span>
    );
}
