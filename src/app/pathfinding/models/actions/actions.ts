import { PathfindingAlgoOption } from "../dropdown/dropdown-enums"
import { BarrierGrid } from "../grid/barrier-grid"
import { GridDimensions } from "../grid/grid"
import { Pos } from "../grid/pos"
import { WeightGrid } from "../grid/weight-grid"

export type AnimationIndexAction =
    { kind: 'Increment' } |
    { kind: 'Decrement' } |
    { kind: 'Reset' } |
    { kind: 'SetValue', valueToSetTo: number } |
    { kind: 'ResetIfIndexAt', indexToResetAt: number }

export type WeightGridAction =
    { kind: 'AddWeightAt', row: number, col: number, weight: number } |
    { kind: 'ToggleRandomWeightAt', row: number, col: number } |
    { kind: 'AdaptToNewDimensions', height: number, width: number } |
    { kind: 'ResetGrid' } |
    { kind: 'NewGrid', grid: WeightGrid }

export type BarrierGridAction =
    { kind: 'ToggleBarrierAt', row: number, col: number } |
    { kind: 'AdaptToNewDimensions', height: number, width: number } |
    { kind: 'ResetGrid' } |
    { kind: 'NewGrid', grid: BarrierGrid }

export type StartPosAction =
    { kind: 'MovePositionWithinBoundsOfGrid', newHeight: number, newWidth: number } |
    { kind: 'HandleDrop', posToDropAt: Pos, lastPosDraggedFrom: Pos | null, goalPos: Pos, barrierGrid: BarrierGrid, gridDimensions: GridDimensions }

export type GoalPosAction =
    { kind: 'MovePositionWithinBoundsOfGrid', newHeight: number, newWidth: number } |
    { kind: 'HandleDrop', posToDropAt: Pos, lastPosDraggedFrom: Pos | null, startPos: Pos, barrierGrid: BarrierGrid, gridDimensions: GridDimensions }

export type PathfindingAlgosAction =
    { kind: 'Reset' } |
    { kind: 'Initialise' } |
    { kind: 'Add' } |
    { kind: 'Set', index: number, algo: PathfindingAlgoOption } |
    { kind: 'Remove', index: number }
