import React from "react";
import { DrawTree } from "../../../utils";
import Member from "../../member";

interface NodeMemberProps {
  x?: number;
  y?: number;
  node: DrawTree;
}

const NodeMember: React.FC<NodeMemberProps> = ({ x = 0, y = 0, node }) => {
  return (
    <>
      <foreignObject x={x} y={y}>
        <Member node={node} />
      </foreignObject>
    </>
  );
};

export default NodeMember;
