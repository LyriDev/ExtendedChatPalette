import React from 'react';

type Props = {
  value: number;
  setNumber:  React.Dispatch<React.SetStateAction<number>>;
};

export default function InputNumber({ value, setNumber }: Props){
  const onChangeHandler = (value: string) => {
    const v = value.replace(/[０-９．]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );
    if (!isNaN(Number(v))) {
      setNumber(Math.min(Number(v), 99));
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChangeHandler(e.target.value)}
      style={{
        width: "1.3rem",
        fontSize: "1rem",
        color: "#fff",
        margin: "0",
        marginLeft: "5px",
        padding: "0",
        background: "none",
        border: "none",
        borderRadius: "0",
        outline: "none",
        appearance: "none",
      }}
    />
  );
};