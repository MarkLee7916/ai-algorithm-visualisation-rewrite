import { ObjMap } from "../../shared/models/objMap";
import { Pos } from "../models/grid/pos";

export type Comparator<T> = (item1: T, item2: T) => number;

export function genRandomComparator(): Comparator<Pos> {
    return () => Math.random() - 0.51;
}

export function genDijkstraComparator(distsMap: ObjMap<Pos, number>): Comparator<Pos> {
    return (pos1: Pos, pos2: Pos) => {
        const pos1Dist = distsMap.get(pos1);
        const pos2Dist = distsMap.get(pos2);

        if (pos1Dist === undefined) {
            return -1;
        } else if (pos2Dist === undefined) {
            return 1;
        } else {
            return pos1Dist - pos2Dist;
        }
    };
}

export function genAstarComparator(distsMap: ObjMap<Pos, number>, goalPos: Pos): Comparator<Pos> {
    const dijkstraComparator = genDijkstraComparator(distsMap);
    const manhattanComparator = genManhattanComparator(goalPos);

    return (pos1: Pos, pos2: Pos) =>
        dijkstraComparator(pos1, pos2) + manhattanComparator(pos1, pos2);
}

export function genManhattanComparator(goalPos: Pos): Comparator<Pos> {
    return (pos1: Pos, pos2: Pos) => computeManhattanDist(pos1, goalPos) - computeManhattanDist(pos2, goalPos);
}

export function computeManhattanDist({ row, col }: Pos, { row: goalRow, col: goalCol }: Pos): number {
    return Math.abs(row - goalRow) + Math.abs(col - goalCol);
}

