export type AnimationIndexAction =
    { kind: 'Increment' } |
    { kind: 'Decrement' } |
    { kind: 'Reset' } |
    { kind: 'SetValue', valueToSetTo: number }

export type WeightGridAction =
    { kind: 'AddWeight', row: number, col: number } |
    { kind: 'ResetWeight', row: number, col: number } |
    { kind: 'ResetWholeGrid' }

