import { AnimationFrame } from "../animation/animation-frame";
import { BarrierGrid } from "../grid/barrier-grid";
import { NeighbourOrdering } from "../grid/neighbours";
import { Pos } from "../grid/pos";
import { WeightGrid } from "../grid/weight-grid";

export type ConcretePathfindingAlgoImpl = (
    startPos: Pos,
    goalPos: Pos,
    gridWeights: WeightGrid,
    gridBarriers: BarrierGrid,
    neighbours: NeighbourOrdering,
    gridHeight: number,
    gridWidth: number
) => AnimationFrame[];