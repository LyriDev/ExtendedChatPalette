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
  setIsModalOpen: (value: boolean) => void;
}

export default function ExChatPaletteEdit({ close, setIsModalOpen }: MyComponentProps) {
  const handleClose = () => {
    close(); // モーダルを閉じる
    setIsModalOpen(true); // isModalOpenの値を再度trueに設定
  };

  return (
      <div style={modalStyle}>
        <HeaderEdit headerStyle={headerStyle} close={handleClose}/>
        <TabsContent headerStyle={headerStyle} />
      </div>
  );
}