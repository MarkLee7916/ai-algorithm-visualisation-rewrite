import { tileAt, initGrid, setTileAt } from "./grid";

export type BarrierGrid = boolean[][];

export const BARRIER = true;

export const NO_BARRIER = false;

export function initBarrierGrid(height: number, width: number) {
    return initGrid(height, width, NO_BARRIER);
}

export function hasBarrierAt(grid: BarrierGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function removeBarrierAt(grid: BarrierGrid, row: number, col: number) {
    setTileAt(grid, row, col, NO_BARRIER);
}

export function addBarrierAt(grid: BarrierGrid, row: number, col: number) {
    setTileAt(grid, row, col, BARRIER);
}

export function toggleBarrierAt(grid: BarrierGrid, row: number, col: number) {
    setTileAt(grid, row, col, tileAt(grid, row, col) === BARRIER ? NO_BARRIER : BARRIER);
}
