import { NON_DIAGONAL_NEIGHBOURS } from "../models/grid/neighbours"

export const barriersOnlyNoPathFound = {
    height: 3,

    width: 3,

    gridBarriers: [
        [false, true, true],
        [true, false, false],
        [false, false, false]
    ],

    startPos: { "row": 0, "col": 0 },

    goalPos: { "row": 2, "col": 2 },

    neighbourVisitOrder: NON_DIAGONAL_NEIGHBOURS
}