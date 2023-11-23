import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { orgChart } from "../../constants";
import { DrawTree } from "../../utils";
import D3js from "react-d3-tree";
import Member from "../member";

export interface Temp {
  [key: number]: number;
}
const widthSpacing = 20;
const heightSpacing = 50;

const width = 100;
const height = 150;

const draw = (tree: DrawTree, updateTree: () => void): React.ReactNode => {
  const widthNode = width * tree.member.length;

  const childSecond = tree.child ? 100 : 0;

  const getLine = () => {
    const parent = tree.getParent();
    if (!parent) return "";
    const line = {
      1: [
        tree.x * (width + widthSpacing) + width / 2 + childSecond,
        tree.y * (height + heightSpacing),
      ].join(","),
      2: [
        tree.x * (width + widthSpacing) + width / 2 + childSecond,
        tree.y * (height + heightSpacing) - heightSpacing * 0.5,
      ].join(","),
      3: [
        parent.x * (width + widthSpacing) + 100,
        tree.y * (height + heightSpacing) - heightSpacing * 0.5,
      ].join(","),
      4: [
        parent.x * (width + widthSpacing) + 100,
        parent.y * (height + heightSpacing) + height,
      ].join(","),
    };
    return Object.values(line).join(" ");
  };

  const getArror = () => {
    const arror = {
      1: [
        tree.x * (width + widthSpacing) + width / 2 + childSecond,
        tree.y * (height + heightSpacing),
      ].join(","),
      2: [
        tree.x * (width + widthSpacing) + width / 2 - 5 + childSecond,
        tree.y * (height + heightSpacing) - 5,
      ].join(","),
      3: [
        tree.x * (width + widthSpacing) + width / 2 + 5 + childSecond,
        tree.y * (height + heightSpacing) - 5,
      ].join(","),
      4: [
        tree.x * (width + widthSpacing) + width / 2 + childSecond,
        tree.y * (height + heightSpacing),
      ].join(","),
    };
    return Object.values(arror).join(" ");
  };

  return (
    <>
      <D3js />
      <g>
        <foreignObject
          x={tree.x * (width + widthSpacing)}
          y={tree.y * (height + heightSpacing)}
          width={widthNode}
          height={height}
        >
          <Member
            node={tree}
            w={widthNode}
            h={height}
            updateTree={updateTree}
          />
        </foreignObject>
        {tree.getParent() && (
          <React.Fragment key={`${tree.x} - ${tree.y}`}>
            <polyline
              points={getLine()}
              style={{ fill: "transparent", stroke: "#3498db", strokeWidth: 2 }}
            />
            <polygon
              points={getArror()}
              style={{ fill: "#3498db", stroke: "#3498db", strokeWidth: 1 }}
            />
          </React.Fragment>
        )}
        {tree.showChild &&
          tree.children?.map((c, index) => (
            <React.Fragment key={index}>{draw(c, updateTree)}</React.Fragment>
          ))}
      </g>
    </>
  );
};

const addMod = (tree: DrawTree, modSum = 0) => {
  tree.x += modSum;
  for (let i = 0; i < tree.children.length; i++) {
    addMod(tree.children[i], modSum + tree.mod);
  }
};
const setup = (
  tree: DrawTree,
  depth = 0,
  nexts: Temp = {},
  offset: Temp = {}
) => {
  if (!nexts[depth]) nexts[depth] = 0;
  if (!offset[depth]) offset[depth] = 0;

  if (tree.showChild) {
    for (let i = 0; i < tree.children.length; i++) {
      setup(tree.children[i], depth + 1, nexts, offset);
    }
  }
  let place = 0;
  if (!tree.children?.length || !tree.showChild) {
    place = nexts[depth];
    tree.x = place;
  } else if (tree.children.length === 1) {
    place = tree.children[0].x;
  } else {
    const s = tree.children.reduce((pre, curr) => pre + curr.x, 0);
    place = s / tree.children.length;
  }

  offset[depth] = Math.max(offset[depth], nexts[depth] - place);

  if (tree.children.length && tree.showChild) {
    tree.x = place + offset[depth];
  }

  nexts[depth] = tree.x + tree.member.length;
  tree.mod = offset[depth];
};

const getTree = (tree: DrawTree) => {
  setup(tree);
  addMod(tree);

  return tree;
};
const Demo2: React.FC = () => {
  const [nodeTree] = useState(new DrawTree(orgChart));
  const [temp, setTemp] = useState(0);
  const translateRef = useRef({ x: 0, y: 0, zoom: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let lasttranslate = { x: 0, y: 0 };

    const handleMousemove = <T extends MouseEvent>(e: T) => {
      if (!mouseDown) return;

      const moveX = e.clientX - mouseX;
      const moveY = e.clientY - mouseY;

      translateRef.current = {
        x: lasttranslate.x + moveX,
        y: lasttranslate.y + moveY,
        zoom: translateRef.current.zoom,
      };

      if (gRef.current) {
        gRef.current.setAttribute(
          "style",
          `transform: translate(${translateRef.current.x}px,${translateRef.current.y}px)`
        );
      }
      // gRef.current?.setAttribute(
      //   "transform",
      //   `translate(${translateRef.current.x},${translateRef.current.y}) scale(${translateRef.current.zoom})`
      // );
    };
    const handleMouseDown = (e: MouseEvent) => {
      svgRef.current?.classList.add("gaping");
      mouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseUp = () => {
      svgRef.current?.classList.remove("gaping");
      mouseDown = false;

      lasttranslate = {
        x: translateRef.current.x,
        y: translateRef.current.y,
      };
    };

    const handleTouchDown = (e: TouchEvent) => {
      mouseDown = true;
      mouseX = e.touches.item(0)?.clientX || 0;
      mouseY = e.touches.item(0)?.clientY || 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!mouseDown) return;

      const moveX = (e.touches.item(0)?.clientX || 0) - mouseX;
      const moveY = (e.touches.item(0)?.clientY || 0) - mouseY;

      translateRef.current = {
        x: lasttranslate.x + moveX,
        y: lasttranslate.y + moveY,
        zoom: translateRef.current.zoom,
      };

      if (gRef.current) {
        gRef.current.setAttribute(
          "style",
          `transform: translate(${translateRef.current.x}px,${translateRef.current.y}px)`
        );
      }
      // gRef.current?.setAttribute(
      //   "transform",
      //   `translate(${translateRef.current.x},${translateRef.current.y}) scale(${translateRef.current.zoom})`
      // );
    };
    svgRef.current.addEventListener("mousemove", handleMousemove);
    svgRef.current.addEventListener("mousedown", handleMouseDown);
    svgRef.current.addEventListener("mouseup", handleMouseUp);
    svgRef.current.addEventListener("touchstart", handleTouchDown);
    svgRef.current.addEventListener("touchmove", handleTouchMove);
    svgRef.current.addEventListener("touchend", handleMouseUp);
    return () => {
      if (!svgRef.current) return;
      svgRef.current.removeEventListener("mousemove", handleMousemove);
      svgRef.current.removeEventListener("mousedown", handleMouseDown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      svgRef.current.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const updateTree = () => {
    setTemp((pre) => pre + 1);
  };
  const tree = useMemo(() => {
    return draw(getTree(nodeTree), updateTree);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeTree, temp]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* gaping */}
      <svg ref={svgRef} width="100%" height="100%" className="chart ">
        <g
          // transform="translate(100, 100)"
          // style={{ WebkitTransform: "translate(100px, 200px)" }}
          ref={gRef}
        >
          {tree}
        </g>
      </svg>

      <Flex
        zIndex={99}
        className="control"
        position="absolute"
        bottom={0}
        right={0}
        bg="#000000a3"
        w="100%"
        justifyContent="flex-end"
        gap={4}
        p={1}
      >
        <Button onClick={() => {}}>-</Button>
        <Button>+</Button>
      </Flex>
    </div>
  );
};

export default Demo2;
