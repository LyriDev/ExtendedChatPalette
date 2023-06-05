import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { changeMessage, clickSubmitButton, getDiceSystem } from "./../../../data/sendCcfoliaMessage"

export default function ExDodgeBar() {
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
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translateY(-50%) translateX(-50%)",
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
                        const interval: number = 100;
                        new Promise<void>((resolve0) => {
                            const diceSystem: string = getDiceSystem();
                            changeMessage(`${diceSystem}<=({回避技能}/{回避回数}) 【回避】{回避回数}回目`);
                            clickSubmitButton();
                            console.log("回避")
                            resolve0();
                        }).then(() =>{
                            new Promise<void>((resolve1) => {
                                changeMessage(":回避回数+1");
                                clickSubmitButton();
                                console.log("回避+1")
                                resolve1();
                            }).then(()=>{
                                new Promise<void>((resolve2) => {
                                    setTimeout(resolve2, interval)
                                }).then(()=>{
                                    return;
                                })
                            })
                        })
                    }}
                    >
                        回避
                    </Button>
                    <Button
                    className="draggable-disable"
                    color="primary"
                    aria-label="dodge-reset"
                    style={{
                        whiteSpace: "nowrap",
                    }}
                    onClick={()=>{
                        changeMessage(":回避回数=1");
                        clickSubmitButton();
                    }}
                    >
                        回避回数リセット
                    </Button>
                </div>
            </div>
    );
}