import * as _ from "lodash";

export type GridDimensions = {
    height: number,
    width: number
}

export function calculateGridDimensionsFromScreenDimensions() {
    return {
        height: Math.round(window.innerHeight / 40),
        width: Math.round(window.innerWidth / 40)
    }
}

export function height<T>(grid: T[][]) {
    return grid.length;
}

export function width<T>(grid: T[][]) {
    return grid[0].length;
}

export function tileAt<T>(grid: T[][], row: number, col: number) {
    return grid[row][col];
}

export function setTileAt<T>(grid: T[][], row: number, col: number, value: T) {
    grid[row][col] = value;
}

export function countOfValuesInGridMatchingPredicate<T>(grid: T[][], predicate: (item: T) => boolean) {
    return grid.reduce((totalSum, row) => {
        const rowSum = row.reduce((sum, item) => sum + (predicate(item) ? 1 : 0), 0);
        return totalSum + rowSum;
    }, 0);
}

export function adaptToNewDimensions<T>(grid: T[][], emptyValue: T, newHeight: number, newWidth: number): T[][] {
    grid = padOutGridColumns(grid, emptyValue, newWidth);
    grid = padOutGridRows(grid, emptyValue, newHeight, newWidth);
    grid = grid.slice(0, newHeight);
    grid = grid.map((row) => row.slice(0, newWidth));

    return grid;
}

function padOutGridColumns<T>(grid: T[][], emptyValue: T, newWidth: number): T[][] {
    while (grid[0].length < newWidth) {
        grid = appendEmptyColumnToGrid(grid, emptyValue);
    }

    return grid;
}

function padOutGridRows<T>(grid: T[][], emptyValue: T, newHeight: number, newWidth: number): T[][] {
    while (grid.length < newHeight) {
        grid = appendEmptyRowToGrid(grid, emptyValue, newWidth);
    }

    return grid;
}

function appendEmptyColumnToGrid<T>(grid: T[][], emptyValue: T): T[][] {
    return grid.map((row) => row.concat(emptyValue));
}

function appendEmptyRowToGrid<T>(grid: T[][], emptyValue: T, rowWidth: number): T[][] {
    const gridCopy = _.cloneDeep(grid);
    const emptyRow = _.fill(Array(rowWidth), emptyValue)

    gridCopy.push(emptyRow);

    return gridCopy;
}

export function initGrid<T>(height: number, width: number, initialItem: T) {
    const grid: T[][] = [];

    for (let row = 0; row < height; ++row) {
        grid.push([]);
        for (let col = 0; col < width; ++col) {
            grid[row].push(initialItem);
        }
    }

    return grid;
}
