import * as React from 'react';
import Close from '../../svg/Close'

const headerStyle: React.CSSProperties = {
    backgroundColor: '#212121',
    padding: "0 24px",
    minHeight: "64px",
    borderRadius: "4px 4px 0 0"
};

export default function HeaderEdit({ close }: { close: () => void }) {
    return (
            <div style={headerStyle}>
                <div>拡張チャットパレット</div>
                <button onClick={close}>
                    <span><Close /></span>
                </button>
            </div>
    );
}