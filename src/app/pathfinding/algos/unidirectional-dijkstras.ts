import { ObjMap } from "../../shared/models/objMap";
import { PriorityQueue } from "../models/agenda-data-structures/priority-queue";
import { AnimationFrame } from "../models/animation/animation-frame";
import { BarrierGrid } from "../models/grid/barrier-grid";
import { Neighbour } from "../models/grid/neighbours";
import { Pos } from "../models/grid/pos";
import { WeightGrid } from "../models/grid/weight-grid";
import { genDijkstraComparator } from "./comparators";
import { genericUnidirectionalSearch } from "./generic-pathfinding-algos";

export function unidirectionalDijkstras(
    startPos: Pos,
    goalPos: Pos,
    weightGrid: WeightGrid,
    barrierGrid: BarrierGrid,
    neighbourOrdering: Neighbour[],
    gridHeight: number,
    gridWidth: number
): AnimationFrame[] {
    const distsMap = new ObjMap<Pos, number>([]);

    return genericUnidirectionalSearch(
        startPos,
        goalPos,
        new PriorityQueue<Pos>(genDijkstraComparator(distsMap)),
        weightGrid,
        barrierGrid,
        neighbourOrdering,
        distsMap,
        gridHeight,
        gridWidth
    );
}
