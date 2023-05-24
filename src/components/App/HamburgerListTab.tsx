import React from 'react';

function HamburgerListTab() { // レスポンシブデザイン用のリスト内の拡張チャットパレット欄
    return (
        <li className="MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button" tabIndex={0} role="menuitem" aria-disabled="false">
            拡張チャットパレット
            <span className="MuiTouchRipple-root"></span>
        </li>
    );
}

export default HamburgerListTab;