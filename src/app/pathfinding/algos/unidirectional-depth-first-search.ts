import { ObjMap } from "../../shared/models/objMap";
import { Stack } from "../models/agenda-data-structures/stack";
import { AnimationFrame } from "../models/animation/animation-frame";
import { BarrierGrid } from "../models/grid/barrier-grid";
import { Neighbour } from "../models/grid/neighbours";
import { Pos } from "../models/grid/pos";
import { WeightGrid, initWeightGrid } from "../models/grid/weight-grid";
import { genericUnidirectionalSearch } from "./generic-pathfinding-algos";

export function unidirectionalDFS(
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
        new Stack<Pos>(),
        initWeightGrid(gridHeight, gridWidth),
        barrierGrid,
        neighbourOrdering,
        new ObjMap<Pos, number>([]),
        gridHeight,
        gridWidth
    );
}
