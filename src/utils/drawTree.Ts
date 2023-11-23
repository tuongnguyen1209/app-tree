import { DrawTree } from "./index";

interface CoutourType {
  li?: DrawTree | null;
  ri?: DrawTree | null;
  maxOffset: number;
  loffset: number;
  roffset: number;
  leftOuter: DrawTree;
  rightOuter: DrawTree;
}

const nextRight = (tree: DrawTree) => {
  if (tree.thread) return tree.thread;
  if (tree.children) return tree.children?.at(-1);
  if (tree.children) return null;
};

const nextLeft = (tree: DrawTree) => {
  if (tree.thread) return tree.thread;
  if (tree.children) return tree.children?.at(0);
  if (tree.children) return null;
};
const contour = (
  left: DrawTree,
  right: DrawTree,
  maxOffset = 0,
  loffset = 0,
  roffset = 0,
  leftOuter: DrawTree | null = null,
  rightOuter: DrawTree | null = null
): CoutourType => {
  const delta = left.x + loffset - (right.x + roffset);

  if (!maxOffset || delta > maxOffset) maxOffset = delta;

  if (!leftOuter) {
    leftOuter = left;
  }
  if (!rightOuter) {
    rightOuter = right;
  }
  const lo = nextLeft(left),
    li = nextRight(left),
    ri = nextLeft(right),
    ro = nextRight(right);

  if (li && ri) {
    loffset += left.mod;
    roffset += right.mod;
    return contour(li, ri, maxOffset, loffset, roffset, lo, ro);
  }

  return {
    li,
    ri,
    maxOffset,
    loffset,
    roffset,
    leftOuter,
    rightOuter,
  };
};

const fixSubtrees = (left: DrawTree, right: DrawTree) => {
  const {
    li,
    ri,
    maxOffset,
    loffset,
    roffset: rof,
    leftOuter,
    rightOuter,
  } = contour(left, right);
  let diff = maxOffset;
  let roffset = rof;
  diff += 1;
  diff += (right.x + diff + left.x) % 2;
  console.log(
    `fixSubtrees= left: ${left.name}, left-x: ${left.x},right: ${right.name},right-x: ${right.x},diff: ${diff}, maxOffset: ${maxOffset}`
  );
  right.mod = diff;
  right.x += diff;

  if (right.children?.length) {
    roffset += diff;
  }
  if (ri && !li) {
    leftOuter.thread = ri;
    leftOuter.mod = roffset - loffset;
  } else if (li && !ri) {
    rightOuter.thread = li;
    rightOuter.thread = li;
    rightOuter.mod = loffset - roffset;
  }
  return (left.x + right.x) / 2;
};

export const setup = (tree: DrawTree, depth = 0) => {
  if (!tree.children?.length) {
    tree.x = 0;
    tree.y = depth;
    return tree;
  }
  if (tree.children.length == 1) {
    tree.x = setup(tree.children[0], depth + 1).x;
    return tree;
  }
  const left = setup(tree.children[0], depth + 1);
  const right = setup(tree.children[1], depth + 1);

  tree.x = fixSubtrees(left, right);
  return tree;
};
