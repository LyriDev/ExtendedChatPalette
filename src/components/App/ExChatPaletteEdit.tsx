import React, { useEffect, useContext } from 'react';
import TabsContent from './TabsContent'
import HeaderEdit from './HeaderEdit'
import { ModalContext } from "./../../providers/App/ModalProvider"

const menuStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: 'rgba(44, 44, 44, 0.87)',
  borderRadius: '4px',
  maxHeight: "calc(100% - 64px)",
  maxWidth: "600px",
  width: "100%",
  boxShadow: "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
};

export default function ExChatPaletteEdit() {
  const resource = useContext(ModalContext);

  useEffect(() => {
    return () => {
        // アンマウントされる直前に実行される処理を記述する
        resource?.save()
    };
}, []);

  return (
      <div className="editMenu" style={menuStyle}>
        <HeaderEdit/>
        <TabsContent />
      </div>
  );
}