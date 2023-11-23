import React from "react";
import NodeMember from "./nodeMember";
// import { drawTree } from "../../utils";

const D3Demo = () => {
  // const tree = drawTree([orgChart]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#dddd" }}>
      <svg width="auto" height="1000px">
        <NodeMember x={900} y={100} />

        <NodeMember x={500} y={400} />
        <NodeMember x={1300} y={400} />
        <NodeMember x={500} y={800} />
        <NodeMember x={500} y={800} />

        <polyline
          points="1050,300 1050,350 650,350 650,395"
          style={{ fill: "transparent", stroke: "#3498db", strokeWidth: 3 }}
        />
        <polygon
          points="645,395 655,395 650,400"
          style={{ fill: "#3498db", stroke: "#3498db", strokeWidth: 1 }}
        />

        <polyline
          points="1050,300 1050,350 1450,350 1450,400"
          style={{ fill: "white", stroke: "#3498db", strokeWidth: 3 }}
        />
        <polygon
          points="1445,395 1455,395 1450,400"
          style={{ fill: "#3498db", stroke: "#3498db", strokeWidth: 1 }}
        />
      </svg>
    </div>
  );
};

export default D3Demo;
