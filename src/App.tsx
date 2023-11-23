import React from "react";
import "./App.css";
import Demo2 from "./components/demo2/demo2";

function App() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
      {/* <D3Demo /> */}
      <Demo2 />
      {/* <div style={{ width: "100px", height: "100px" }}>
        <Member
          node={new DrawTree({ name: "a", member: ["a", "b"] })}
          w={200}
        />
      </div> */}
    </div>
  );
}

export default App;
