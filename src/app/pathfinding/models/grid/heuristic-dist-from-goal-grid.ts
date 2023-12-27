import { tileAt, setTileAt } from "./grid";

export type HeuristicDistFromGoalGrid = number[][];

export function distAt(grid: HeuristicDistFromGoalGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function setDistAt(grid: HeuristicDistFromGoalGrid, row: number, col: number, length: number) {
    setTileAt(grid, row, col, length);
}