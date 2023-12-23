import { getItemAt, initGrid, setItemAt } from "./grid";

export type WeightGrid = number[][];

export const DEFAULT_WEIGHT = 1;

export function initWeightGrid(height: number, width: number) {
    return initGrid(height, width, DEFAULT_WEIGHT);
}

export function weightAt(grid: WeightGrid, row: number, col: number) {
    return getItemAt(grid, row, col);
}

export function setWeightAt(grid: WeightGrid, row: number, col: number, weight: number) {
    setItemAt(grid, row, col, weight);
}