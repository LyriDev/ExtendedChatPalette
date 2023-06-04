import React, { useRef } from 'react';

type Directions = ("top" | "right" | "bottom" | "left")[]

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

    // リサイズのために必要なref群
    const isResizingRef = useRef(false); // 「リサイズ処理中かどうか」を保管するためのref
    const containerRef = useRef<HTMLDivElement>(null); // 「四隅と上下左右の端に置かれたリサイズ用の要素の親要素」を保管するためのref
    const handleMouseMoveRef = useRef<(event: MouseEvent) => void>(); // 「マウスカーソルがリサイズのためにmousedownしたときの処理」を保管するためのref

    // 「マウスカーソルがリサイズのためにmousedownしたときの処理」
    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>, directions: Directions){
        if(isResizingRef.current) return; //既に他のリサイズ要素が処理中なら、処理をやめる
        // 「リサイズ中かどうか」をtrueにしておく
        isResizingRef.current = true;
        // 「四隅と上下左右の端に置かれたリサイズ用の要素の親要素」のtopとかleftとか
        const containerRect = containerRef.current?.getBoundingClientRect();
        // マウスカーソルがリサイズのためにmoveを始めたときの、要素の初期位置
        const initialX: number = containerRect?.right || 0;
        const initialY: number = containerRect?.bottom || 0;

        // マウスカーソルがリサイズのためにmoveしたときの処理
        function handleMouseMove(mouseEvent: MouseEvent){
            console.log(directions)

            const minWidth: number = 320; // メニューのmin-width
            const minHeight: number = 280; // メニューのmin-height
            if (containerRect) {
                const { clientX, clientY } = mouseEvent; // マウスカーソルの位置

                let newWidth: number | undefined
                let newHeight: number | undefined
                let newPositionX: number | undefined
                let newPositionY: number | undefined

                // 左右方向のリサイズ処理 (minWidthより大きいときのみリサイズする)
                if(directions.includes("right") && clientX <= window.innerWidth){
                    newWidth = Math.max(clientX - containerRect.left, minWidth);
                }else if(directions.includes("left") && clientX >= 0){
                    newWidth = Math.max(width + (initialX - clientX), minWidth);
                    newPositionX = newWidth === minWidth ? initialX : clientX;
                }
                // 上下方向のリサイズ処理 (minHeightより大きいときのみリサイズする)
                if(directions.includes("bottom") && clientY <= window.innerHeight){
                    newHeight = Math.max(height + (clientY - containerRect.top), minHeight);
                }else if(directions.includes("top") && clientY >= 0){
                    newHeight = Math.max(initialY - clientY, minHeight);
                    newPositionY = newHeight === minHeight ? initialY - window.innerHeight - height : clientY - window.innerHeight;
                }

                // 計算した値を適用する
                if(newWidth) setWidth(newWidth);
                if(newPositionX) setPositionX(newPositionX);
                if(newHeight) setHeight(newHeight);
                if(newPositionY) setPositionY(newPositionY);
            }
        };

        // 作った「マウスカーソルがリサイズのためにmousedownしたときの処理」をeventListenerに登録していく
        handleMouseMoveRef.current = handleMouseMove; // 「マウスカーソルがリサイズのためにmousedownしたときの処理」を保管する
        document.addEventListener('mousemove', (mouseEvent: MouseEvent) => {
            // 保管した「マウスカーソルがリサイズのためにmousedownしたときの処理」をeventListenerに登録する
            handleMouseMoveRef.current?.(mouseEvent);
        });
        // 「mouseupされたら『マウスカーソルがリサイズのためにmousedownしたときの処理』を削除する処理」を、eventListenerに登録する
        document.addEventListener('mouseup', handleMouseUp);
    };

    // 「mouseupされたら『マウスカーソルがリサイズのためにmousedownしたときの処理』を削除する処理」
    function handleMouseUp(){
        isResizingRef.current = false;
        if(handleMouseMoveRef.current) document.removeEventListener('mousemove', handleMouseMoveRef.current);
        handleMouseMoveRef.current = undefined;
        document.removeEventListener('mouseup', handleMouseUp);
    };

    React.useEffect(() => {
        return () => {
            // コンポーネントがアンマウントされる際にもイベントリスナーをクリーンアップする
        };
    }, []);

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
                backgroundColor: "green"
            }}
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["top"])
            }}
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
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["right"])
            }}
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
                backgroundColor: "yellow"
            }}
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["bottom"])
            }}
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
                backgroundColor: "blue"
            }}
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["left"])
            }}
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
                backgroundColor: "#7f7f00"
            }}
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["right", "top"])
            }}
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
                backgroundColor: "#ff7f00"
            }}
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["right", "bottom"])
            }}
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
                backgroundColor: "#7f7f7f"
            }}
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["left", "bottom"])
            }}
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
                backgroundColor: "#007f7f"
            }}
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                handleMouseDown(event, ["left", "top"])
            }}
        />
        </span>
    );
}
