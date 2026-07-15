declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'react-hooks-use-modal' {
  import React from 'react';

  // どんな型引数（T）が渡されても any として受け流すジェネリック型に変更します
  export type ModalWrapperProps<T = any> = any;

  // useModal の型定義
  export function useModal(
    containerId?: string,
    options?: any
  ): [React.FC<any>, () => void, () => void, boolean];
}
