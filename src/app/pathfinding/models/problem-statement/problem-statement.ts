import { TypeOfNeighboursAllowedOption, PathfindingAlgoOption } from "../dropdown/dropdown-enums";
import { BarrierGrid } from "../grid/barrier-grid";
import { GridDimensions } from "../grid/grid";
import { NeighbourOrdering } from "../grid/neighbours";
import { Pos } from "../grid/pos";
import { WeightGrid } from "../grid/weight-grid";

export type ProblemStatement = [
    NeighbourOrdering,
    TypeOfNeighboursAllowedOption,
    PathfindingAlgoOption,
    WeightGrid,
    BarrierGrid,
    Pos,
    Pos,
    GridDimensions
];