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

    const isResizingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>, directions: Directions){
        if(isResizingRef.current) return; //既に他のリサイズ要素が処理中なら、処理をやめる
        console.log("handleMouseDown\n","directions:",directions)
        isResizingRef.current = true;
        const containerRect = containerRef.current?.getBoundingClientRect();
        const initialX: number = containerRect?.right || 0;
        const initialY: number = positionY;
        document.addEventListener('mousemove', (mouseEvent: MouseEvent) => {
            handleMouseMove(mouseEvent, directions, initialX, initialY)
        });
        document.addEventListener('mouseup', handleMouseUp);
    };

    function handleMouseMove(mouseEvent: MouseEvent, directions: Directions = [], initialX: number = 0, initialY: number = 0){
        console.log("handleMouseMove\n","directions:",directions)
        const minWidth: number = 320;
        const minHeight: number = 280;
        if (isResizingRef.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const { clientX, clientY } = mouseEvent;

            let newWidth: number | undefined
            let newHeight: number | undefined
            let calculatedWidth: number | undefined
            let calculatedHeight: number | undefined
            let newPositionX: number | undefined
            let newPositionY: number | undefined

            // 左右方向のリサイズ処理
            if(directions.includes("right")){
                calculatedWidth = clientX - containerRect.left
                if(minWidth < calculatedWidth){
                    newWidth = calculatedWidth;
                }else{
                    newWidth = minWidth;
                }
            }else if(directions.includes("left")){
                calculatedWidth = width + (initialX - clientX)
                if(minWidth < calculatedWidth){
                    newWidth = calculatedWidth;
                    newPositionX = clientX; // 位置も更新する
                }else{
                    newWidth = minWidth;
                    newPositionX = initialX;
                }
/*                 console.log(
                    "containerRect.top:",containerRect.top,
                    "\ncontainerRect.right:",containerRect.right,
                    "\ncontainerRect.bottom:",containerRect.bottom,
                    "\ncontainerRect.left:",containerRect.left,
                    "\n",
                    "\nclientX:",clientX,
                    "\n",
                    "\nnewWidth:",newWidth,
                    "\nwidth + (initialX - clientX)\n",`${width} + (${initialX} - ${clientX})`,
                    "\n",
                    "\npositionX",positionX,
                    "\nnewPositionX:",clientX,
                    "\nclientX\n",`${clientX}`,
                ) */
            }
            // 上下方向のリサイズ処理
            if(directions.includes("bottom")){
                // setHeight(clientY - containerRect.top);
            }else if(directions.includes("top")){
                // setHeight(clientY - containerRect.top);
            }

            if(newWidth) setWidth(newWidth);
            if(newPositionX) setPositionX(newPositionX);

/*             // Calculate new width and height based on the mouse position
            if (mouseEvent.target instanceof HTMLElement) {
                // 左右方向のリサイズ処理
                if (mouseEvent.target.className.includes('resize-right')) {
                    setWidth(clientX - containerRect.left)
                    console.log("handleMouseMove")
                    // console.log(`resize-right\nclientX - containerRect.left\n${clientX} - ${containerRect.left}\nnewWidth:${clientX - containerRect.left}`)
                } else if (mouseEvent.target.className.includes('resize-left')) {
                    // newWidth = containerRect.right - clientX;
                    // setPositionX(positionX + (width - newWidth)); // 位置も更新する
                    // console.log(`resize-left\ncontainerRect.right - clientX\n${containerRect.right} - ${clientX}\nnewWidth:${newWidth}`)
                }
                // 上下方向のリサイズ処理
                if (mouseEvent.target.className.includes('resize-bottom')) {
                    // newHeight = clientY - containerRect.top;
                    // console.log(`resize-bottom\nclientY - containerRect.top\n${clientY} - ${containerRect.top}\nnewHeight:${newHeight}`)
                } else if (mouseEvent.target.className.includes('resize-top')) {
                    // newHeight = containerRect.bottom - clientY;
                    // setPositionY(positionY + (height - newHeight)); // 位置も更新する
                    // console.log(`resize-top\ncontainerRect.bottom - clientY\n${containerRect.bottom} - ${clientY}\nnewHeight:${newHeight}`)
                }
                // Set the new width and height
                // setWidth(newWidth);
                // setHeight(newHeight);
            } */
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
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
            }}
            // onMouseDown={handleMouseDown}
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
            }}
            // onMouseDown={handleMouseDown}
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
            }}
            // onMouseDown={handleMouseDown}
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
            // onMouseDown={handleMouseDown}
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
            // onMouseDown={handleMouseDown}
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
            // onMouseDown={handleMouseDown}
        />
        </span>
    );
}
