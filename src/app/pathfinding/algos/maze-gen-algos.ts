import { isOdd, randomIntBetween, range } from "../../shared/utils";
import { MazeGrid, addObstacleAt, initEmptyMazeGrid, initFilledMazeGrid } from "../models/grid/maze-grid";

export function genRandomMaze(height: number, width: number): MazeGrid {
    const densityThreshold = 0.3;
    const maze = initEmptyMazeGrid(height, width);

    for (let row = 0; row < width; ++row) {
        for (let col = 0; col < width; col++) {
            if (Math.random() < densityThreshold) {
                addObstacleAt(maze, row, col);
            }
        }
    }

    return maze;
}

export function genFilledGridMaze(height: number, width: number): MazeGrid {
    return initFilledMazeGrid(height, width);
}

export function genDivisionMaze(height: number, width: number): MazeGrid {
    const rowsToCreateWallsAt = range(0, height).filter(isOdd);
    const maze = initEmptyMazeGrid(height, width);

    rowsToCreateWallsAt.forEach((row) => {
        const colToLeaveHoleAt = randomIntBetween(0, width);

        range(0, width).forEach((col) => {
            if (col !== colToLeaveHoleAt) {
                addObstacleAt(maze, row, col);
            }
        });
    });

    return maze;
}