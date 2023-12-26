import { tileAt, initGrid, setTileAt } from "./grid";
import * as _ from "lodash";

export type WeightGrid = number[][];

export const DEFAULT_WEIGHT = 1;

const MIN_RANDOM_WEIGHT = 2;

const MAX_RANDOM_WEIGHT = 10;

export function initWeightGrid(height: number, width: number) {
    return initGrid(height, width, DEFAULT_WEIGHT);
}

export function weightAt(grid: WeightGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function setWeightAt(grid: WeightGrid, row: number, col: number, weight: number) {
    setTileAt(grid, row, col, weight);
}

export function toggleRandomWeightAt(grid: WeightGrid, row: number, col: number) {
    if (weightAt(grid, row, col) === DEFAULT_WEIGHT) {
        setWeightAt(grid, row, col, _.random(MIN_RANDOM_WEIGHT, MAX_RANDOM_WEIGHT));
    } else {
        setWeightAt(grid, row, col, DEFAULT_WEIGHT);
    }
}