export function height<T>(grid: T[][]) {
    return grid.length;
}

export function width<T>(grid: T[][]) {
    return grid[0].length;
}

export function getItemAt<T>(grid: T[][], row: number, col: number) {
    return grid[row][col];
}

export function setItemAt<T>(grid: T[][], row: number, col: number, value: T) {
    grid[row][col] = value;
}

export function countOfValuesInGridMatchingPredicate<T>(grid: T[][], predicate: (item: T) => boolean) {
    return grid.reduce((totalSum, row) => {
        const rowSum = row.reduce((sum, item) => sum + (predicate(item) ? 1 : 0), 0);
        return totalSum + rowSum;
    }, 0);
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
