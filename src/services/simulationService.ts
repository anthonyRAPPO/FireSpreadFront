import { TreeState } from "../model/enumerations/TreeState";
import Coordinate2D from "../model/interfaces/Coordinate2D";
import Tree from "../model/interfaces/Tree";

/**
 * Convert a string from .env config file to an array of coordinate.
 */
export function convertStringToCoordinateArray(
  toConvert: string
): Coordinate2D[] {
  return toConvert.split("|").map(
    (s) =>
      <Coordinate2D>{
        x: +s.split(",")[0],
        y: +s.split(",")[1],
      }
  );
}

/**
 * Set state of Tree from 2d array to : INITIAL, except for Tree with coordinate in initFireTrees array (=FIRE).
 */
export function resetTree2DArray(
  trees: Tree[][],
  initFireTrees: Coordinate2D[]
) {
  trees.forEach((treeRow, y) =>
    treeRow.forEach((tree, x) => {
      if (
        initFireTrees.filter(
          (coordinate) => coordinate.x === x && coordinate.y === y
        ).length > 0
      ) {
        tree.state = TreeState.FIRE;
      } else {
        tree.state = TreeState.INITIAL;
      }
    })
  );
}

/**
 * Check if there is at least 1 buring tree in the Tree 2D array.
 * @param trees
 * @returns
 */
export function stillTreeInFire(trees: Tree[][]): boolean {
  for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
      if (trees[y][x] && trees[y][x].state === TreeState.FIRE) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Return a Tree 2D Array with the width and height passed in parameters,
 * Tree are in INTIAL state except for those with the coordinate in fireTrees (=FIRE).
 * @param width
 * @param height
 * @param fireTrees
 * @returns
 */
export function createTrees2DArray(
  width: number,
  height: number,
  fireTrees: Coordinate2D[]
): Tree[][] {
  let trees: Tree[][] = [];
  for (let y = 0; y < height; y++) {
    trees[y] = [];
    for (let x = 0; x < width; x++) {
      if (
        fireTrees.filter(
          (coordinate) => coordinate.x === x && coordinate.y === y
        ).length > 0
      ) {
        trees[y][x] = { state: TreeState.FIRE };
      } else {
        trees[y][x] = { state: TreeState.INITIAL };
      }
    }
  }
  return trees;
}
