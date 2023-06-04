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
    const { width, setWidth, height, setHeight, positionX, setPositionX, positionY, setPositionY } = props;

    const isResizingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizingRef.current && containerRef.current) {
            // console.log("true\nisResizingRef.current:",isResizingRef.current,"\ncontainerRef.current:",containerRef.current)
            const containerRect = containerRef.current.getBoundingClientRect();
            const { clientX, clientY } = e;

            // Calculate new width and height based on the mouse position
            if (e.target instanceof HTMLElement) {
                // 左右方向のリサイズ処理
                if (e.target.className.includes('resize-right')) {
                    setWidth(clientX - containerRect.left)
                    console.log(`resize-right\nclientX - containerRect.left\n${clientX} - ${containerRect.left}\nnewWidth:${clientX - containerRect.left}`)
                } else if (e.target.className.includes('resize-left')) {
                    // newWidth = containerRect.right - clientX;
                    // setPositionX(positionX + (width - newWidth)); // 位置も更新する
                    // console.log(`resize-left\ncontainerRect.right - clientX\n${containerRect.right} - ${clientX}\nnewWidth:${newWidth}`)
                }
                // 上下方向のリサイズ処理
                if (e.target.className.includes('resize-bottom')) {
                    // newHeight = clientY - containerRect.top;
                    // console.log(`resize-bottom\nclientY - containerRect.top\n${clientY} - ${containerRect.top}\nnewHeight:${newHeight}`)
                } else if (e.target.className.includes('resize-top')) {
                    // newHeight = containerRect.bottom - clientY;
                    // setPositionY(positionY + (height - newHeight)); // 位置も更新する
                    // console.log(`resize-top\ncontainerRect.bottom - clientY\n${containerRect.bottom} - ${clientY}\nnewHeight:${newHeight}`)
                }
                // Set the new width and height
                // setWidth(newWidth);
                // setHeight(newHeight);
            }
        }else{
            // console.log("false\nisResizingRef.current:",isResizingRef.current,"\ncontainerRef.current:",containerRef.current)
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
                backgroundColor: "red"
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
