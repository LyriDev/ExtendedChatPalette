import React, { createContext, useState, useEffect, useContext } from 'react';

// データの型を定義
interface Data {
  id: number;
  name: string;
  // 他のプロパティや型定義を追加する
}

// Contextの型を定義
interface MyContextType {
  initialState: Data[] | null;
}

const MyContext = createContext<MyContextType>({
  initialState: null,
});

const MyContextProvider: React.FC = ({ children }) => {
  const [initialState, setInitialState] = useState<Data[] | null>(null);

  useEffect(() => {
    fetchDataFromDatabase()
      .then((data) => {
        setInitialState(data);
      })
      .catch((error) => {
        // エラーハンドリング
      });
  }, []);

  if (initialState === null) {
    return <div>Loading...</div>;
  }

  return (
    <MyContext.Provider value={{ initialState }}>
      {children}
    </MyContext.Provider>
  );
};

const fetchDataFromDatabase = (): Promise<Data[]> => {
  return fetch('https://api.example.com/data')
    .then((response) => response.json())
    .catch((error) => {
      throw new Error('データの取得に失敗しました。');
    });
};

const MyComponent: React.FC = () => {
  const { initialState } = useContext(MyContext);

  if (!initialState) {
    return null;
  }

  return (
    <div>
      {initialState.map((data) => (
        <div key={data.id}>{data.name}</div>
      ))}
    </div>
  );
};