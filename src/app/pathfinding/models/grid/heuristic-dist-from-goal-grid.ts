import { computeManhattanDist } from "../../algos/comparators";
import { tileAt, initGrid } from "./grid";
import { Pos } from "./pos";

export type HeuristicDistFromGoalGrid = number[][];

export function distAt(grid: HeuristicDistFromGoalGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function createHeuristicDistFromGoalGrid(height: number, width: number, goalPos: Pos) {
    const grid = initGrid(height, width, 0);

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            grid[row][col] = computeManhattanDist({ row, col }, goalPos);
        }
    }

    return grid;
}