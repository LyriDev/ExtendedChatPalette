import * as React from 'react';
import TabsContent from './TabsContent'

const modalStyle: React.CSSProperties = {
  backgroundColor: 'rgba(44, 44, 44, 0.87)',
  borderRadius: '4px',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#212121',
};

export default function ExChatPaletteEdit({ close }: { close: () => void }) {
  return (
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
        <TabsContent headerStyle={headerStyle} />
      </div>
  );
}