export type Pos = { row: number; col: number };

export function movePositionWithinBoundsOfGrid(pos: Pos, height: number, width: number): Pos {
    return {
        row: pos.row >= height ? height - 1 : pos.row,
        col: pos.col >= width ? width - 1 : pos.col,
    };
}

export function genDefaultStartPos() {
    return { row: 1, col: 1 };
}

export function genDefaultGoalPos() {
    return { row: Number.MAX_SAFE_INTEGER, col: Number.MAX_SAFE_INTEGER };
}

export function hasPos(posList: Pos[], posToCheckFor: Pos) {
    return posList.some((pos) => isSamePos(pos, posToCheckFor));
}

export function isSamePos(pos1: Pos, pos2: Pos) {
    return pos1.row === pos2.row && pos1.col === pos2.col;
}

export function formatPosAsCoord({ row, col }: Pos): string {
    return `(${col + 1}, ${row + 1})`;
}

export function isOnGrid(height: number, width: number, { row, col }: Pos): boolean {
    return row >= 0 && row < height && col >= 0 && col < width;
}