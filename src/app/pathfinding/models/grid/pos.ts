import * as _ from "lodash";

export type Pos = { row: number; col: number };

export function genDefaultStartPos() {
    return { row: 1, col: 1 };
}

export function genDefaultGoalPos(height: number, width: number) {
    return { row: height - 2, col: width - 2 };
}

export function hasPos(posList: Pos[], posToCheckFor: Pos) {
    return posList.some((pos) => _.isEqual(pos, posToCheckFor));
}

export function formatPosAsCoord({ row, col }: Pos): string {
    return `(${col + 1}, ${row + 1})`;
}

export function isOnGrid(height: number, width: number, { row, col }: Pos): boolean {
    return row >= 0 && row < height && col >= 0 && col < width;
}