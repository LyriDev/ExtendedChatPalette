import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { changeMessage, clickSubmitButton, getDiceSystem } from "./../../../data/sendCcfoliaMessage"

export default function ExDodgeBar() {
    const [dodgeCount, setDodgeCount] = useState<number>(0);

    return (
            <div
            style={{
                position: "relative",
                width: "100%",
                height: "48px",
                boxShadow: "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.2)",
            }}
            >
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translateY(-50%) translateX(-50%)",
                    overflow: "hidden",
                }}>
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
                                setDodgeCount((prev) => prev + 1);
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
                        回避回数:{dodgeCount}
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