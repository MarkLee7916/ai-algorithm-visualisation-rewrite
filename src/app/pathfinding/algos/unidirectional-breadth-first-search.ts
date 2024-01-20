import { ObjMap } from "../../shared/models/objMap";
import { Queue } from "../models/agenda-data-structures/queue";
import { AnimationFrame } from "../models/animation/animation-frame";
import { BarrierGrid } from "../models/grid/barrier-grid";
import { height, width } from "../models/grid/grid";
import { Neighbour } from "../models/grid/neighbours";
import { Pos } from "../models/grid/pos";
import { WeightGrid, initWeightGrid } from "../models/grid/weight-grid";
import { genericUnidirectionalSearch } from "./generic-pathfinding-algos";

export function unidirectionalBFS(
    startPos: Pos,
    goalPos: Pos,
    _: WeightGrid,
    barrierGrid: BarrierGrid,
    neighbourOrdering: Neighbour[],
    gridHeight: number,
    gridWidth: number
): AnimationFrame[] {

    return genericUnidirectionalSearch(
        startPos,
        goalPos,
        new Queue<Pos>(),
        initWeightGrid(gridHeight, gridWidth),
        barrierGrid,
        neighbourOrdering,
        new ObjMap<Pos, number>([]),
        gridHeight,
        gridWidth
    );
}
