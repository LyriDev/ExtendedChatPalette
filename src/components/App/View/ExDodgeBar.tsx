import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { changeMessage, clickSubmitButton, getDiceSystem } from "./../../../data/sendCcfoliaMessage"
import InputNumber from "./InputNumber"

export default function ExDodgeBar() {
    const [dodgeCount, setDodgeCount] = useState<number>(0);
    const barRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // 拡張回避バーが収まっているかどうかを取得する関数
    function getIsFit(): boolean{
        let result = true;
        // 拡張回避バーの横幅を取得する
        const barRect = barRef.current?.getBoundingClientRect();
        const barWidth: number = barRect?.width || 0;
        // 拡張回避バーの中身の横幅を取得する
        const contentRect = contentRef.current?.getBoundingClientRect();
        const contentWidth: number = contentRect?.width || 0;
        // 収まっているかを計算して返す
        if(contentWidth >= barWidth){
            result = false;
        }
        return result;
    }

    return (
            <div
            ref={barRef}
            style={{
                position: "relative",
                width: "100%",
                height: "48px",
                boxShadow: "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.2)",
                overflow: "hidden",
            }}
            >
                <div
                ref={contentRef}
                style={{
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%",
                    left: ((getIsFit()) ? "50%" : "0"),
                    transform: `translateY(-50%) translateX(${((getIsFit()) ? "-50%" : "0")})`,
                }}
                >
                    <Button
                    className="draggable-disable"
                    color="primary"
                    aria-label="dodge-do"
                    style={{
                        marginRight: "10px",
                        whiteSpace: "nowrap",
                    }}
                    onClick={()=>{
                        new Promise<void>((resolve0) => {
                            const diceSystem: string = getDiceSystem();
                            const isChangedMessage: boolean = changeMessage(`${diceSystem}<=(({回避技能})/${dodgeCount+1}) 【回避】${dodgeCount+1}回目`);
                            if(!isChangedMessage){
                                clickSubmitButton();
                                setDodgeCount((prev) => (Math.min((prev + 1), 999)));
                            }
                            resolve0();
                        }).then(() =>{
                            return;
                        })
                    }}
                    >
                        回避
                    </Button>
                    <div
                    style={{
                        whiteSpace: "nowrap",
                        marginRight: "10px",
                        cursor: "default",
                    }}
                    >
                        回避回数:<InputNumber value={dodgeCount} setNumber={setDodgeCount} />
                    </div>
                    <Button
                    className="draggable-disable"
                    color="primary"
                    aria-label="dodge-reset"
                    style={{
                        whiteSpace: "nowrap",
                    }}
                    onClick={()=>{
                        setDodgeCount(0);
                    }}
                    >
                        回避回数リセット
                    </Button>
                </div>
            </div>
    );
}