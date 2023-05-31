import React, { useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TabNameContext } from "./../../providers/App/TabNameProvider"
import { TextContext } from "./../../providers/App/TextProvider"

interface StringArrayStates{
    data: string[] | undefined,
    setData: React.Dispatch<React.SetStateAction<string[]>> | undefined
}

interface MyProps{
    index: number,
    anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>,
    open: boolean,
    handleClose: () => void,
    handleChange: (event: React.SyntheticEvent, newValue: number) => void,
}

export default function DropDownMenu({index, anchors, open, handleClose, handleChange}: MyProps){
    const [tabNames, setTabNames] = useContext(TabNameContext) || [];
    const [texts, setTexts] = useContext(TextContext) || [];

    function swapStringArrayStates(states: StringArrayStates, leftOrRight: 1|-1): void{ // useStateで管理された文字列型配列の順番を入れ替える関数
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

    function swapTabData(event: React.SyntheticEvent, leftOrRight: 1|-1){ // タブの順番を入れ替える関数
        const nextIndex: number = index + leftOrRight;
        if(!tabNames || !setTabNames || !texts || !setTexts) throw new Error("データが存在しません");
        if(tabNames.length !== texts.length) throw new Error("tabNames と texts の数が違います");
        if((0 > nextIndex) || (tabNames.length <= nextIndex)) throw new Error("これ以上はタブを動かせません");
        swapStringArrayStates({data: tabNames, setData: setTabNames}, leftOrRight)
        swapStringArrayStates({data: texts, setData: setTexts}, leftOrRight)
        handleChange(event, index + leftOrRight)
    }

    function deleteStringArrayStates(states: StringArrayStates){ // useStateで管理された文字列型配列の要素を削除する関数
        if(states.data && states.setData){
            try{
                const data: string[] = states.data.slice();
                const setData: React.Dispatch<React.SetStateAction<string[]>> = states.setData;
                data.splice(index,1);
                setData(data);
            }catch(error){
                throw error;
            }
        }
    }

    function deleteTabData(event: React.SyntheticEvent){ // 現在タブを削除する関数
        if(!tabNames || !setTabNames || !texts || !setTexts) throw new Error("データが存在しません");
        if(tabNames.length !== texts.length) throw new Error("tabNames と texts の数が違います");
        if(tabNames.length <= 1) throw new Error("これ以上タブを削除できません")
        const checkText: string = `「${tabNames[index]}」タブを本当に削除しますか？\n削除するとタブに含まれるチャットパレットも削除されます。`
        const isDelete: boolean = window.confirm(checkText)
        if(isDelete){
            deleteStringArrayStates({data: tabNames, setData: setTabNames});
            deleteStringArrayStates({data: texts, setData: setTexts});
            const lastIndex: number = tabNames.length -1; // タブ削除後の配列の長さ
            if(lastIndex <= index){ // 削除したらindexがタブの長さからはみ出るとき、
                handleChange(event, lastIndex - 1) // タブ削除後の配列の最後列にindexを設定する
            }
        }
    }

    return (
        <Menu
        // ここでボタンの位置にメニューを紐づける
        // この紐づけのお陰でメニューがボタンの隣に出現する
        // これが無いと画面の変なところでメニューが出現することになる
        anchorEl={anchors.current[index]?.current}
        open={open} // メニューの出現を管理
        disableAutoFocusItem={false} // Falseだと、メニューを開いた時にメニューアイテムがフォーカスの対象になる
        autoFocus={false} // Trueだとメニューが開いた時に一番上のメニューアイテムのオートフォーカスされる
        onClose={handleClose} // 主にメニューを閉めたいときに発生するイベント
        keepMounted // Trueにすると、メニューが閉じている状態でもメニューのノードが存在するようになる
        transitionDuration={"auto"} // メニューの開閉のアニメーション速度を設定できる
        sx={{}} // CSS in JS を記述できる(HTMLのstyle属性の役割を果たす)
        anchorOrigin={{ // 紐づけたHTML要素のどこを標準位置にしてメニューを配置するか設定できる
        vertical: "bottom",
        horizontal: "right"
        }}
        transformOrigin={{ // メニューの起点を設定できる。アニメーションもこの起点から生えるように出現する
        vertical: "top",
        horizontal: "right"
        }}
        MenuListProps={{}} // Menuコンポーネント内部で使用されているMenuListコンポーネントのPropsを変更できる
        PaperProps={{ // Menuコンポーネント内部で使用されているPaperコンポーネントのPropsを変更できる
        elevation: 8 // PaperProps.elevationはメニューのシャドーを調整できる（超重要！）
        }}
        style={{zIndex: 10000}}
        disablePortal  // ポータルの無効化
        >
            <MenuItem onClick={(event: React.SyntheticEvent) => {
                deleteTabData(event); // 現在タブを削除する
                handleClose();
            }}
            disabled={(tabNames && (tabNames?.length <= 1)) ? true : false}
            >
                削除
            </MenuItem>
            <MenuItem onClick={(event: React.SyntheticEvent) => {
                swapTabData(event, -1); // 現在タブを左に移動する
                handleClose();
            }}
            disabled={(tabNames && (0 > index - 1)) ? true : false}
            >
                左に移動
            </MenuItem>
            <MenuItem onClick={(event: React.SyntheticEvent) => {
                swapTabData(event, 1); // 現在タブを右に移動する
                handleClose();
            }}
            disabled={(tabNames && (tabNames?.length <= index + 1)) ? true : false}
            >
                右に移動
            </MenuItem>
            <MenuItem onClick={handleClose}>メニュー３</MenuItem>
        </Menu>
    );
}