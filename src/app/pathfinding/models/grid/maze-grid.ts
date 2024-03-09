import { tileAt, initGrid, setTileAt } from "./grid";

export type MazeGrid = boolean[][];

export const OBSTACLE = true;

export const NO_OBSTACLE = false;

export function initEmptyMazeGrid(height: number, width: number) {
    return initGrid(height, width, NO_OBSTACLE);
}

export function initFilledMazeGrid(height: number, width: number) {
    return initGrid(height, width, OBSTACLE);
}

export function hasObstacleAt(grid: MazeGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function addObstacleAt(grid: MazeGrid, row: number, col: number) {
    setTileAt(grid, row, col, OBSTACLE);
}
