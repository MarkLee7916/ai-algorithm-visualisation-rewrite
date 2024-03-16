import { isOdd, randomIntBetween, range } from "../../shared/utils";
import { height, width } from "../models/grid/grid";
import { MazeGrid, addObstacleAt, hasObstacleAt, initEmptyMazeGrid, initFilledMazeGrid } from "../models/grid/maze-grid";
import { Pos } from "../models/grid/pos";

export function getListOfPositionsToActivate(maze: MazeGrid): Pos[] {
    const posList: Pos[] = [];
    const mazeHeight = height(maze);
    const mazeWidth = width(maze);

    for (let row = 0; row < mazeHeight; ++row) {
        for (let col = 0; col < mazeWidth; col++) {
            if (hasObstacleAt(maze, row, col)) {
                posList.push({ row, col });
            }
        }
    }

    return posList;
}

export function genRandomMaze(height: number, width: number): MazeGrid {
    const densityThreshold = 0.3;
    const maze = initEmptyMazeGrid(height, width);

    for (let row = 0; row < height; ++row) {
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