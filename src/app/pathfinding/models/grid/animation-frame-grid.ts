import { getItemAt, initGrid, setItemAt } from "./grid";

export const enum TileAnimationFrame {
    Expanded,
    Visited,
    FinalPath,
    BeingExpanded,
    BeingAddedToAgenda,
    Blank,
}

export const DEFAULT_TILE_ANIMATION_FRAME = TileAnimationFrame.Blank;

export type AnimationFrameGrid = TileAnimationFrame[][];

export function initAnimationFrameGrid(height: number, width: number) {
    return initGrid(height, width, DEFAULT_TILE_ANIMATION_FRAME);
}

export function frameAt(grid: AnimationFrameGrid, row: number, col: number) {
    return getItemAt(grid, row, col);
}

export function setFrameAt(grid: AnimationFrameGrid, row: number, col: number, frame: TileAnimationFrame) {
    setItemAt(grid, row, col, frame);
}

