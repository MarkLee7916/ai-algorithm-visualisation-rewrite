import { tileAt, initGrid, setTileAt } from "./grid";

export type WeightGrid = number[][];

export const DEFAULT_WEIGHT = 1;

export function initWeightGrid(height: number, width: number) {
    return initGrid(height, width, DEFAULT_WEIGHT);
}

export function weightAt(grid: WeightGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function setWeightAt(grid: WeightGrid, row: number, col: number, weight: number) {
    setTileAt(grid, row, col, weight);
}