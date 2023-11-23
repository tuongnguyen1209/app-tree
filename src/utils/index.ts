/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChartData } from "../constants";

export class DrawTree {
  x: number = -1;
  y: number;
  name: string;
  mod: number = 0;
  member: string[];
  children: DrawTree[];
  thread: DrawTree | null;
  child: boolean = false;
  showChild: boolean = true;

  private parent: DrawTree | null;
  constructor(object: ChartData, depth = 0, parent: DrawTree | null = null) {
    this.y = depth;

    this.name = object.name;
    this.member = object.member || 0;
    this.children = [];
    this.parent = parent;
    this.thread = null;

    object.children?.forEach((el) => {
      this.children.push(new DrawTree(el, depth + 1, this));
    });
    if (object.child) this.child = object.child;
  }

  getParent() {
    return this.parent;
  }
}
