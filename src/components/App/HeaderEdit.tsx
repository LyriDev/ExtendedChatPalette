import * as React from 'react';
import Close from '../../svg/Close'
import Help from '../../svg/Help'

const helpText: string =
`・「# 名前」
　この行の次の行以降に、"名前"で指定されたキャラに紐付けられたメッセージを登録できます。
・「\`\`\`メッセージ\`\`\`」
　キャラに紐付けられたメッセージを登録できます。
・「##」
　この行の次の行以降に、現在キャラで発言するメッセージを登録できます。
・「---」
　この行にボーダーを作成できます。
`

export default function HeaderEdit({ headerStyle, close }: { headerStyle: React.CSSProperties, close: () => void }) {
    return (
            <div style={headerStyle}>
                <div>拡張チャットパレット</div>
                <button className="exTooltip top-right" aria-label={helpText}>
                    <span><Help /></span>
                </button>
                <button onClick={close}>
                    <span><Close /></span>
                </button>
            </div>
    );
}