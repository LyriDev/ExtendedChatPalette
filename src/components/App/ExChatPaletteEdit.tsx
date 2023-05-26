import * as React from 'react';
import TabsContent from './TabsContent'
import HeaderEdit from './HeaderEdit'

const menuStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: 'rgba(44, 44, 44, 0.87)',
  borderRadius: '4px',
  maxHeight: "calc(100% - 64px)",
  maxWidth: "600px",
  width: "100%",
  boxShadow: "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
};

interface MyComponentProps {
  close: () => void;
}

export default function ExChatPaletteEdit({ close }: MyComponentProps) {
  return (
      <div className="editMenu" style={menuStyle}>
        <HeaderEdit  close={close}/>
        <TabsContent />
      </div>
  );
}