import { PathLengthGrid, initPathLengthGrid } from "../grid/path-length-grid";
import { AnimationFrameGrid, initAnimationFrameGrid } from "../grid/animation-frame-grid";

export type AnimationFrame = {
    grid: AnimationFrameGrid;
    commentary: string;
    pathLengthGrid: PathLengthGrid;
    countOfTilesExpanded: number;
    countOfTilesVisited: number;
    finalPathLength: number;
};

export function initBlankAnimationFrame(gridHeight: number, gridWidth: number): AnimationFrame {
    return {
        grid: initAnimationFrameGrid(gridHeight, gridWidth),
        commentary: 'Nothing has happened yet!',
        pathLengthGrid: initPathLengthGrid(gridHeight, gridWidth),
        countOfTilesExpanded: 0,
        countOfTilesVisited: 0,
        finalPathLength: 0,
    };
}