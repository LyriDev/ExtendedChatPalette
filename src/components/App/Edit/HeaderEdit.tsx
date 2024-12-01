import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Close from '../../../svg/Close'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ModalContext } from "../../../providers/App/ModalProvider"
import CopyButton from "./CopyButton";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { TabNameContext } from '../../../providers/App/TabNameProvider';
import { TextContext } from '../../../providers/App/TextProvider';

const headerStyle: React.CSSProperties = {
    backgroundColor: '#212121',
    padding: "0 24px",
    height: "64px",
    borderRadius: "4px 4px 0 0",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff', // プライマリーカラーを白色に設定
        },
    }
});

export default function HeaderEdit({focusIndex, setFocusIndex}: {focusIndex: number, setFocusIndex: React.Dispatch<React.SetStateAction<number>>}) {
    const resource = useContext(ModalContext);

    // タブ入れ替え処理
    const [tabNames, setTabNames] = useContext(TabNameContext) || [];
    const [texts, setTexts] = useContext(TextContext) || [];
    function swapTabData(leftOrRight: 1|-1, index: number = focusIndex){ // タブの順番を入れ替える関数
        const nextIndex: number = index + leftOrRight;
        if(!tabNames || !setTabNames || !texts || !setTexts) throw new Error("データが存在しません");
        if(tabNames.length !== texts.length) throw new Error("tabNames と texts の数が違います");
        if((0 > nextIndex) || (tabNames.length <= nextIndex)) return; // これ以上はタブを動かせません
        swapStringArrayStates({data: tabNames, setData: setTabNames}, leftOrRight)
        swapStringArrayStates({data: texts, setData: setTexts}, leftOrRight)
        setFocusIndex(index + leftOrRight)
    }
    function swapStringArrayStates( // useStateで管理された文字列型配列の順番を入れ替える関数
        states: {
            data: string[] | undefined,
            setData: React.Dispatch<React.SetStateAction<string[]>> | undefined
        },
        leftOrRight: 1|-1,
        index: number = focusIndex
    ): void{
        if(states.data && states.setData){
            const data: string[] = states.data.slice();
            const setData: React.Dispatch<React.SetStateAction<string[]>> = states.setData;
            const nextIndex: number = index + leftOrRight;
            if((0 > nextIndex) || (data.length <= nextIndex)) throw new Error("これ以上は配列を動かせません");
            const temp: string = data[index]
            data[index] = data[nextIndex];
            data[nextIndex] = temp;
            setData(data);
        }
    }

    return (
            <ThemeProvider theme={theme}>
                <div style={headerStyle}>
                    <div>拡張チャットパレット</div>
                    <div>
                        <span style={{marginRight: "0.5rem"}}>
                            <IconButton color="primary" onClick={() => swapTabData(-1)}>
                                <KeyboardDoubleArrowLeftIcon/>
                            </IconButton>
                            タブ入替
                            <IconButton color="primary" onClick={() => swapTabData(1)}>
                                <KeyboardDoubleArrowRightIcon/>
                            </IconButton>
                        </span>
                        <CopyButton/>
                        <IconButton edge="end" color="primary" aria-label="close"  onClick={resource?.close} style={{margin: "0 -12px 0 auto"}}>
                            <Close />
                        </IconButton>
                    </div>
                </div>
            </ThemeProvider>
    );
}
