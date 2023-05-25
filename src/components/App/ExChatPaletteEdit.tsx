import * as React from 'react';
import TabsContent from './TabsContent'
import HeaderEdit from './HeaderEdit'

const modalStyle: React.CSSProperties = {
  backgroundColor: 'rgba(44, 44, 44, 0.87)',
  borderRadius: '4px',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#212121',
};

interface MyComponentProps {
  close: () => void;
}

export default function ExChatPaletteEdit({ close }: MyComponentProps) {
  return (
      <div style={modalStyle}>
        <HeaderEdit headerStyle={headerStyle} close={close}/>
        <TabsContent headerStyle={headerStyle} />
      </div>
  );
}