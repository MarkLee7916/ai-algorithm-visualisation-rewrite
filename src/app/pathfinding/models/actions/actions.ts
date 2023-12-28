import { BarrierGrid } from "../grid/barrier-grid"
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


