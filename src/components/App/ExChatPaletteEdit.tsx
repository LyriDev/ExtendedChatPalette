import * as React from 'react';
import TabsContent from './TabsContent'
import HeaderEdit from './HeaderEdit'

const menuStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: 'rgba(44, 44, 44, 0.87)',
  borderRadius: '4px',
  maxHeight: "calc(100% - 64px)",
  maxWidth: "600px",
  width: "calc(100% - 64px)",
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