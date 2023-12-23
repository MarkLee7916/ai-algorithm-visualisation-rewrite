import { tileAt, initGrid, setTileAt, countOfValuesInGridMatchingPredicate } from "./grid";

export type ExpandedGrid = boolean[][];

export function initExpandedGrid(height: number, width: number) {
    return initGrid(height, width, false);
}

export function hasBeenExpandedAt(grid: ExpandedGrid, row: number, col: number) {
    return tileAt(grid, row, col);
}

export function markExpandedAt(grid: ExpandedGrid, row: number, col: number) {
    setTileAt(grid, row, col, true);
}

export function countOfTilesThatHaveBeenExpanded(grid: ExpandedGrid) {
    return countOfValuesInGridMatchingPredicate(grid, value => value);
}
