import React from "react";
import VirtualList from "./virtual-list/virtual-list";
import "./App.css";

const rowStyle = {
  padding: "0 10px",
  borderBottom: "1px solid grey",
  lineHeight: "50px",
};

function App() {
  const renderItem = ({ style, index }: { style: any; index: number }) => {
    return (
      <div style={{ ...rowStyle, ...style }} key={index}>
        Row #{index}
      </div>
    );
  };

  return (
    <>
      <h1>virtual list</h1>
      <VirtualList
        width="auto"
        height={400}
        itemCount={1000}
        renderItem={renderItem}
        itemSize={50}
        className="VirtualList"
      />
    </>
  );
}

export default App;
