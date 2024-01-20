import { DEFAULT_NEIGHBOUR_VISIT_ORDER } from "../models/grid/neighbours"

export const barriersOnlyPathFound = {
    height: 24,

    width: 44,

    barrierGrid: [
        [false, false, false, true, false, false, false, false, false, true, true, false, false, false, false, true, false, false, false, true, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, true, true],
        [false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, true, false, false, true, false, false, false, true, true, false, true, false, false, true, true, false, true, false, false, true, true, true, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, true, true, true, false, false, false, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true, false, true, true, true, false, true, true, false, true, false, false, false, true, false],
        [false, false, false, false, false, false, false, false, false, true, false, false, false, true, true, true, false, false, false, true, true, false, true, true, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true, true, false, true],
        [false, false, false, false, false, false, false, true, false, true, true, true, true, false, false, false, true, true, false, true, true, true, false, false, true, false, false, false, false, false, true, false, false, false, false, true, true, false, false, true, false, false, true, false],
        [false, true, true, false, false, false, false, false, false, true, true, false, true, false, false, false, false, false, true, true, false, false, false, true, false, true, false, true, false, false, false, false, false, true, false, false, true, false, false, true, false, false, false, false],
        [true, false, false, false, false, false, false, true, true, false, true, false, false, false, false, false, false, true, true, false, true, false, false, true, false, true, true, false, false, false, false, true, true, false, false, false, false, false, true, true, false, true, false, true],
        [false, false, false, false, false, true, false, true, false, false, false, true, true, false, false, false, true, false, false, false, false, true, true, false, false, false, true, false, false, true, true, true, false, false, false, false, false, true, true, true, true, false, false, false],
        [false, false, false, true, true, false, true, false, true, true, false, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, true, false, false, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false],
        [true, true, false, false, true, false, true, true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, true, false, true, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, true, false, false, true, false, true, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, true, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, true],
        [true, false, false, false, false, false, true, false, true, false, true, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, false],
        [false, true, true, false, false, true, false, false, true, false, true, false, true, false, false, true, false, false, false, true, true, false, false, true, false, true, false, false, false, false, false, false, false, true, true, false, false, true, false, false, false, true, true, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, false, false, false, false, true, false, false, false, false, true, true, false, false, false, false, false, false, false, true],
        [false, false, false, true, false, true, true, false, true, true, false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, true, false, false, true, false, false, false, false, false, true, true, true, false, false],
        [false, false, false, true, true, true, false, false, false, false, false, false, true, true, true, false, true, false, false, true, true, false, false, false, false, true, false, true, false, false, true, false, false, true, false, false, true, false, true, false, true, false, true, true],
        [false, false, false, true, false, false, false, false, true, false, true, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, true, false, false, false, true, false, false, false, true, false, true, true, false],
        [true, false, false, false, true, true, false, false, false, true, false, false, true, true, false, false, true, false, false, true, false, false, true, true, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false],
        [false, false, false, false, true, true, false, true, true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, true, true, false, true, false, false, false, false, true, false, false, false, true, false, true, false, true, false, false, false, true],
        [false, false, false, false, true, false, true, false, false, false, false, true, false, false, false, false, true, false, false, true, true, false, true, false, false, false, true, true, false, false, false, true, false, false, false, true, true, true, true, false, false, false, false, true],
        [false, false, true, false, false, false, true, true, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, true],
        [false, true, false, false, false, false, true, true, true, true, false, false, false, true, false, false, false, false, true, false, false, false, true, false, false, false, false, true, false, false, true, false, false, true, false, true, false, false, true, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, true, false, false, true, false, true, false, true, false, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true, false, false, false, false, true, true, false, true, false, false, true],
        [true, false, false, false, true, true, false, false, true, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, true, true, false, false, true, true, false, true, true, false, false, false, true, false, false, false, false, false, false, false]
    ],

    weightGrid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],

    startPos: { "row": 5, "col": 3 },

    goalPos: { "row": 21, "col": 39 },

    neighbourVisitOrder: DEFAULT_NEIGHBOUR_VISIT_ORDER,

    expectedPositionsInPath: [
        {
            "row": 3,
            "col": 5
        },
        {
            "row": 4,
            "col": 4
        },
        {
            "row": 4,
            "col": 6
        },
        {
            "row": 4,
            "col": 14
        },
        {
            "row": 5,
            "col": 3
        },
        {
            "row": 5,
            "col": 7
        },
        {
            "row": 5,
            "col": 8
        },
        {
            "row": 5,
            "col": 13
        },
        {
            "row": 5,
            "col": 15
        },
        {
            "row": 6,
            "col": 9
        },
        {
            "row": 6,
            "col": 11
        },
        {
            "row": 6,
            "col": 12
        },
        {
            "row": 6,
            "col": 16
        },
        {
            "row": 7,
            "col": 10
        },
        {
            "row": 7,
            "col": 17
        },
        {
            "row": 8,
            "col": 18
        },
        {
            "row": 9,
            "col": 19
        },
        {
            "row": 10,
            "col": 20
        },
        {
            "row": 11,
            "col": 21
        },
        {
            "row": 12,
            "col": 22
        },
        {
            "row": 13,
            "col": 23
        },
        {
            "row": 14,
            "col": 24
        },
        {
            "row": 14,
            "col": 25
        },
        {
            "row": 15,
            "col": 26
        },
        {
            "row": 16,
            "col": 27
        },
        {
            "row": 17,
            "col": 28
        },
        {
            "row": 18,
            "col": 29
        },
        {
            "row": 19,
            "col": 30
        },
        {
            "row": 19,
            "col": 32
        },
        {
            "row": 20,
            "col": 31
        },
        {
            "row": 20,
            "col": 33
        },
        {
            "row": 21,
            "col": 34
        },
        {
            "row": 21,
            "col": 39
        },
        {
            "row": 22,
            "col": 35
        },
        {
            "row": 22,
            "col": 36
        },
        {
            "row": 22,
            "col": 39
        },
        {
            "row": 23,
            "col": 37
        },
        {
            "row": 23,
            "col": 38
        }
    ],

    expectedVisitedPositions: [
        {
            "row": 1,
            "col": 41
        },
        {
            "row": 2,
            "col": 41
        },
        {
            "row": 4,
            "col": 41
        },
        {
            "row": 5,
            "col": 40
        },
        {
            "row": 5,
            "col": 41
        },
        {
            "row": 7,
            "col": 41
        },
        {
            "row": 8,
            "col": 41
        },
        {
            "row": 9,
            "col": 41
        },
        {
            "row": 10,
            "col": 41
        },
        {
            "row": 11,
            "col": 41
        },
        {
            "row": 13,
            "col": 41
        },
        {
            "row": 15,
            "col": 41
        },
        {
            "row": 17,
            "col": 41
        },
        {
            "row": 18,
            "col": 41
        },
        {
            "row": 19,
            "col": 41
        },
        {
            "row": 21,
            "col": 40
        },
        {
            "row": 21,
            "col": 41
        },
        {
            "row": 23,
            "col": 40
        }
    ],

    expectedExpandedPositions: [
        {
            "row": 0,
            "col": 0
        },
        {
            "row": 0,
            "col": 1
        },
        {
            "row": 0,
            "col": 2
        },
        {
            "row": 0,
            "col": 4
        },
        {
            "row": 0,
            "col": 5
        },
        {
            "row": 0,
            "col": 6
        },
        {
            "row": 0,
            "col": 7
        },
        {
            "row": 0,
            "col": 8
        },
        {
            "row": 0,
            "col": 11
        },
        {
            "row": 0,
            "col": 12
        },
        {
            "row": 0,
            "col": 13
        },
        {
            "row": 0,
            "col": 14
        },
        {
            "row": 0,
            "col": 16
        },
        {
            "row": 0,
            "col": 17
        },
        {
            "row": 0,
            "col": 18
        },
        {
            "row": 0,
            "col": 20
        },
        {
            "row": 0,
            "col": 21
        },
        {
            "row": 0,
            "col": 24
        },
        {
            "row": 0,
            "col": 25
        },
        {
            "row": 0,
            "col": 26
        },
        {
            "row": 0,
            "col": 27
        },
        {
            "row": 0,
            "col": 28
        },
        {
            "row": 0,
            "col": 29
        },
        {
            "row": 0,
            "col": 30
        },
        {
            "row": 0,
            "col": 31
        },
        {
            "row": 0,
            "col": 33
        },
        {
            "row": 0,
            "col": 34
        },
        {
            "row": 0,
            "col": 35
        },
        {
            "row": 0,
            "col": 36
        },
        {
            "row": 0,
            "col": 37
        },
        {
            "row": 0,
            "col": 38
        },
        {
            "row": 0,
            "col": 39
        },
        {
            "row": 0,
            "col": 40
        },
        {
            "row": 1,
            "col": 0
        },
        {
            "row": 1,
            "col": 1
        },
        {
            "row": 1,
            "col": 2
        },
        {
            "row": 1,
            "col": 3
        },
        {
            "row": 1,
            "col": 4
        },
        {
            "row": 1,
            "col": 5
        },
        {
            "row": 1,
            "col": 6
        },
        {
            "row": 1,
            "col": 8
        },
        {
            "row": 1,
            "col": 9
        },
        {
            "row": 1,
            "col": 10
        },
        {
            "row": 1,
            "col": 11
        },
        {
            "row": 1,
            "col": 12
        },
        {
            "row": 1,
            "col": 16
        },
        {
            "row": 1,
            "col": 17
        },
        {
            "row": 1,
            "col": 19
        },
        {
            "row": 1,
            "col": 20
        },
        {
            "row": 1,
            "col": 21
        },
        {
            "row": 1,
            "col": 24
        },
        {
            "row": 1,
            "col": 26
        },
        {
            "row": 1,
            "col": 27
        },
        {
            "row": 1,
            "col": 30
        },
        {
            "row": 1,
            "col": 32
        },
        {
            "row": 1,
            "col": 33
        },
        {
            "row": 1,
            "col": 37
        },
        {
            "row": 1,
            "col": 38
        },
        {
            "row": 1,
            "col": 39
        },
        {
            "row": 1,
            "col": 40
        },
        {
            "row": 2,
            "col": 0
        },
        {
            "row": 2,
            "col": 1
        },
        {
            "row": 2,
            "col": 2
        },
        {
            "row": 2,
            "col": 3
        },
        {
            "row": 2,
            "col": 4
        },
        {
            "row": 2,
            "col": 5
        },
        {
            "row": 2,
            "col": 6
        },
        {
            "row": 2,
            "col": 10
        },
        {
            "row": 2,
            "col": 11
        },
        {
            "row": 2,
            "col": 12
        },
        {
            "row": 2,
            "col": 14
        },
        {
            "row": 2,
            "col": 15
        },
        {
            "row": 2,
            "col": 16
        },
        {
            "row": 2,
            "col": 17
        },
        {
            "row": 2,
            "col": 18
        },
        {
            "row": 2,
            "col": 19
        },
        {
            "row": 2,
            "col": 21
        },
        {
            "row": 2,
            "col": 22
        },
        {
            "row": 2,
            "col": 24
        },
        {
            "row": 2,
            "col": 25
        },
        {
            "row": 2,
            "col": 26
        },
        {
            "row": 2,
            "col": 27
        },
        {
            "row": 2,
            "col": 28
        },
        {
            "row": 2,
            "col": 30
        },
        {
            "row": 2,
            "col": 34
        },
        {
            "row": 2,
            "col": 37
        },
        {
            "row": 2,
            "col": 39
        },
        {
            "row": 2,
            "col": 40
        },
        {
            "row": 3,
            "col": 0
        },
        {
            "row": 3,
            "col": 1
        },
        {
            "row": 3,
            "col": 2
        },
        {
            "row": 3,
            "col": 3
        },
        {
            "row": 3,
            "col": 4
        },
        {
            "row": 3,
            "col": 6
        },
        {
            "row": 3,
            "col": 7
        },
        {
            "row": 3,
            "col": 8
        },
        {
            "row": 3,
            "col": 10
        },
        {
            "row": 3,
            "col": 11
        },
        {
            "row": 3,
            "col": 12
        },
        {
            "row": 3,
            "col": 16
        },
        {
            "row": 3,
            "col": 17
        },
        {
            "row": 3,
            "col": 18
        },
        {
            "row": 3,
            "col": 21
        },
        {
            "row": 3,
            "col": 24
        },
        {
            "row": 3,
            "col": 25
        },
        {
            "row": 3,
            "col": 27
        },
        {
            "row": 3,
            "col": 28
        },
        {
            "row": 3,
            "col": 29
        },
        {
            "row": 3,
            "col": 30
        },
        {
            "row": 3,
            "col": 31
        },
        {
            "row": 3,
            "col": 32
        },
        {
            "row": 3,
            "col": 33
        },
        {
            "row": 3,
            "col": 35
        },
        {
            "row": 3,
            "col": 36
        },
        {
            "row": 3,
            "col": 37
        },
        {
            "row": 3,
            "col": 38
        },
        {
            "row": 3,
            "col": 39
        },
        {
            "row": 4,
            "col": 0
        },
        {
            "row": 4,
            "col": 1
        },
        {
            "row": 4,
            "col": 2
        },
        {
            "row": 4,
            "col": 3
        },
        {
            "row": 4,
            "col": 5
        },
        {
            "row": 4,
            "col": 8
        },
        {
            "row": 4,
            "col": 13
        },
        {
            "row": 4,
            "col": 15
        },
        {
            "row": 4,
            "col": 18
        },
        {
            "row": 4,
            "col": 22
        },
        {
            "row": 4,
            "col": 23
        },
        {
            "row": 4,
            "col": 25
        },
        {
            "row": 4,
            "col": 26
        },
        {
            "row": 4,
            "col": 27
        },
        {
            "row": 4,
            "col": 28
        },
        {
            "row": 4,
            "col": 29
        },
        {
            "row": 4,
            "col": 31
        },
        {
            "row": 4,
            "col": 32
        },
        {
            "row": 4,
            "col": 33
        },
        {
            "row": 4,
            "col": 34
        },
        {
            "row": 4,
            "col": 37
        },
        {
            "row": 4,
            "col": 38
        },
        {
            "row": 4,
            "col": 40
        },
        {
            "row": 5,
            "col": 0
        },
        {
            "row": 5,
            "col": 4
        },
        {
            "row": 5,
            "col": 5
        },
        {
            "row": 5,
            "col": 6
        },
        {
            "row": 5,
            "col": 11
        },
        {
            "row": 5,
            "col": 14
        },
        {
            "row": 5,
            "col": 16
        },
        {
            "row": 5,
            "col": 17
        },
        {
            "row": 5,
            "col": 20
        },
        {
            "row": 5,
            "col": 21
        },
        {
            "row": 5,
            "col": 22
        },
        {
            "row": 5,
            "col": 24
        },
        {
            "row": 5,
            "col": 26
        },
        {
            "row": 5,
            "col": 28
        },
        {
            "row": 5,
            "col": 29
        },
        {
            "row": 5,
            "col": 30
        },
        {
            "row": 5,
            "col": 31
        },
        {
            "row": 5,
            "col": 32
        },
        {
            "row": 5,
            "col": 34
        },
        {
            "row": 5,
            "col": 35
        },
        {
            "row": 5,
            "col": 37
        },
        {
            "row": 5,
            "col": 38
        },
        {
            "row": 6,
            "col": 1
        },
        {
            "row": 6,
            "col": 2
        },
        {
            "row": 6,
            "col": 3
        },
        {
            "row": 6,
            "col": 4
        },
        {
            "row": 6,
            "col": 5
        },
        {
            "row": 6,
            "col": 6
        },
        {
            "row": 6,
            "col": 13
        },
        {
            "row": 6,
            "col": 14
        },
        {
            "row": 6,
            "col": 15
        },
        {
            "row": 6,
            "col": 19
        },
        {
            "row": 6,
            "col": 21
        },
        {
            "row": 6,
            "col": 22
        },
        {
            "row": 6,
            "col": 24
        },
        {
            "row": 6,
            "col": 27
        },
        {
            "row": 6,
            "col": 28
        },
        {
            "row": 6,
            "col": 29
        },
        {
            "row": 6,
            "col": 30
        },
        {
            "row": 6,
            "col": 33
        },
        {
            "row": 6,
            "col": 34
        },
        {
            "row": 6,
            "col": 35
        },
        {
            "row": 6,
            "col": 36
        },
        {
            "row": 6,
            "col": 37
        },
        {
            "row": 7,
            "col": 0
        },
        {
            "row": 7,
            "col": 1
        },
        {
            "row": 7,
            "col": 2
        },
        {
            "row": 7,
            "col": 3
        },
        {
            "row": 7,
            "col": 4
        },
        {
            "row": 7,
            "col": 6
        },
        {
            "row": 7,
            "col": 8
        },
        {
            "row": 7,
            "col": 9
        },
        {
            "row": 7,
            "col": 13
        },
        {
            "row": 7,
            "col": 14
        },
        {
            "row": 7,
            "col": 15
        },
        {
            "row": 7,
            "col": 18
        },
        {
            "row": 7,
            "col": 19
        },
        {
            "row": 7,
            "col": 20
        },
        {
            "row": 7,
            "col": 23
        },
        {
            "row": 7,
            "col": 24
        },
        {
            "row": 7,
            "col": 25
        },
        {
            "row": 7,
            "col": 27
        },
        {
            "row": 7,
            "col": 28
        },
        {
            "row": 7,
            "col": 32
        },
        {
            "row": 7,
            "col": 33
        },
        {
            "row": 7,
            "col": 34
        },
        {
            "row": 7,
            "col": 35
        },
        {
            "row": 7,
            "col": 36
        },
        {
            "row": 8,
            "col": 0
        },
        {
            "row": 8,
            "col": 1
        },
        {
            "row": 8,
            "col": 2
        },
        {
            "row": 8,
            "col": 5
        },
        {
            "row": 8,
            "col": 7
        },
        {
            "row": 8,
            "col": 10
        },
        {
            "row": 8,
            "col": 11
        },
        {
            "row": 8,
            "col": 12
        },
        {
            "row": 8,
            "col": 14
        },
        {
            "row": 8,
            "col": 15
        },
        {
            "row": 8,
            "col": 17
        },
        {
            "row": 8,
            "col": 20
        },
        {
            "row": 8,
            "col": 21
        },
        {
            "row": 8,
            "col": 23
        },
        {
            "row": 8,
            "col": 24
        },
        {
            "row": 8,
            "col": 27
        },
        {
            "row": 8,
            "col": 28
        },
        {
            "row": 8,
            "col": 29
        },
        {
            "row": 8,
            "col": 30
        },
        {
            "row": 8,
            "col": 31
        },
        {
            "row": 8,
            "col": 32
        },
        {
            "row": 8,
            "col": 33
        },
        {
            "row": 8,
            "col": 34
        },
        {
            "row": 8,
            "col": 35
        },
        {
            "row": 8,
            "col": 37
        },
        {
            "row": 8,
            "col": 38
        },
        {
            "row": 8,
            "col": 40
        },
        {
            "row": 9,
            "col": 3
        },
        {
            "row": 9,
            "col": 5
        },
        {
            "row": 9,
            "col": 8
        },
        {
            "row": 9,
            "col": 9
        },
        {
            "row": 9,
            "col": 10
        },
        {
            "row": 9,
            "col": 11
        },
        {
            "row": 9,
            "col": 12
        },
        {
            "row": 9,
            "col": 13
        },
        {
            "row": 9,
            "col": 14
        },
        {
            "row": 9,
            "col": 16
        },
        {
            "row": 9,
            "col": 17
        },
        {
            "row": 9,
            "col": 20
        },
        {
            "row": 9,
            "col": 21
        },
        {
            "row": 9,
            "col": 23
        },
        {
            "row": 9,
            "col": 26
        },
        {
            "row": 9,
            "col": 27
        },
        {
            "row": 9,
            "col": 28
        },
        {
            "row": 9,
            "col": 29
        },
        {
            "row": 9,
            "col": 30
        },
        {
            "row": 9,
            "col": 32
        },
        {
            "row": 9,
            "col": 33
        },
        {
            "row": 9,
            "col": 34
        },
        {
            "row": 9,
            "col": 35
        },
        {
            "row": 9,
            "col": 36
        },
        {
            "row": 9,
            "col": 37
        },
        {
            "row": 9,
            "col": 38
        },
        {
            "row": 9,
            "col": 39
        },
        {
            "row": 9,
            "col": 40
        },
        {
            "row": 10,
            "col": 0
        },
        {
            "row": 10,
            "col": 3
        },
        {
            "row": 10,
            "col": 4
        },
        {
            "row": 10,
            "col": 6
        },
        {
            "row": 10,
            "col": 7
        },
        {
            "row": 10,
            "col": 9
        },
        {
            "row": 10,
            "col": 11
        },
        {
            "row": 10,
            "col": 12
        },
        {
            "row": 10,
            "col": 13
        },
        {
            "row": 10,
            "col": 14
        },
        {
            "row": 10,
            "col": 15
        },
        {
            "row": 10,
            "col": 16
        },
        {
            "row": 10,
            "col": 18
        },
        {
            "row": 10,
            "col": 19
        },
        {
            "row": 10,
            "col": 21
        },
        {
            "row": 10,
            "col": 22
        },
        {
            "row": 10,
            "col": 24
        },
        {
            "row": 10,
            "col": 25
        },
        {
            "row": 10,
            "col": 27
        },
        {
            "row": 10,
            "col": 28
        },
        {
            "row": 10,
            "col": 29
        },
        {
            "row": 10,
            "col": 30
        },
        {
            "row": 10,
            "col": 32
        },
        {
            "row": 10,
            "col": 34
        },
        {
            "row": 10,
            "col": 35
        },
        {
            "row": 10,
            "col": 36
        },
        {
            "row": 10,
            "col": 37
        },
        {
            "row": 10,
            "col": 38
        },
        {
            "row": 10,
            "col": 39
        },
        {
            "row": 10,
            "col": 40
        },
        {
            "row": 11,
            "col": 1
        },
        {
            "row": 11,
            "col": 2
        },
        {
            "row": 11,
            "col": 3
        },
        {
            "row": 11,
            "col": 4
        },
        {
            "row": 11,
            "col": 5
        },
        {
            "row": 11,
            "col": 7
        },
        {
            "row": 11,
            "col": 9
        },
        {
            "row": 11,
            "col": 11
        },
        {
            "row": 11,
            "col": 12
        },
        {
            "row": 11,
            "col": 13
        },
        {
            "row": 11,
            "col": 14
        },
        {
            "row": 11,
            "col": 16
        },
        {
            "row": 11,
            "col": 17
        },
        {
            "row": 11,
            "col": 18
        },
        {
            "row": 11,
            "col": 20
        },
        {
            "row": 11,
            "col": 22
        },
        {
            "row": 11,
            "col": 23
        },
        {
            "row": 11,
            "col": 24
        },
        {
            "row": 11,
            "col": 25
        },
        {
            "row": 11,
            "col": 26
        },
        {
            "row": 11,
            "col": 28
        },
        {
            "row": 11,
            "col": 29
        },
        {
            "row": 11,
            "col": 31
        },
        {
            "row": 11,
            "col": 33
        },
        {
            "row": 11,
            "col": 34
        },
        {
            "row": 11,
            "col": 36
        },
        {
            "row": 11,
            "col": 37
        },
        {
            "row": 11,
            "col": 39
        },
        {
            "row": 12,
            "col": 0
        },
        {
            "row": 12,
            "col": 3
        },
        {
            "row": 12,
            "col": 4
        },
        {
            "row": 12,
            "col": 6
        },
        {
            "row": 12,
            "col": 7
        },
        {
            "row": 12,
            "col": 9
        },
        {
            "row": 12,
            "col": 11
        },
        {
            "row": 12,
            "col": 13
        },
        {
            "row": 12,
            "col": 14
        },
        {
            "row": 12,
            "col": 16
        },
        {
            "row": 12,
            "col": 17
        },
        {
            "row": 12,
            "col": 18
        },
        {
            "row": 12,
            "col": 21
        },
        {
            "row": 12,
            "col": 24
        },
        {
            "row": 12,
            "col": 26
        },
        {
            "row": 12,
            "col": 27
        },
        {
            "row": 12,
            "col": 28
        },
        {
            "row": 12,
            "col": 29
        },
        {
            "row": 12,
            "col": 30
        },
        {
            "row": 12,
            "col": 31
        },
        {
            "row": 12,
            "col": 32
        },
        {
            "row": 12,
            "col": 35
        },
        {
            "row": 12,
            "col": 36
        },
        {
            "row": 12,
            "col": 38
        },
        {
            "row": 12,
            "col": 39
        },
        {
            "row": 12,
            "col": 40
        },
        {
            "row": 13,
            "col": 0
        },
        {
            "row": 13,
            "col": 1
        },
        {
            "row": 13,
            "col": 2
        },
        {
            "row": 13,
            "col": 3
        },
        {
            "row": 13,
            "col": 4
        },
        {
            "row": 13,
            "col": 5
        },
        {
            "row": 13,
            "col": 6
        },
        {
            "row": 13,
            "col": 7
        },
        {
            "row": 13,
            "col": 8
        },
        {
            "row": 13,
            "col": 9
        },
        {
            "row": 13,
            "col": 10
        },
        {
            "row": 13,
            "col": 11
        },
        {
            "row": 13,
            "col": 12
        },
        {
            "row": 13,
            "col": 13
        },
        {
            "row": 13,
            "col": 15
        },
        {
            "row": 13,
            "col": 16
        },
        {
            "row": 13,
            "col": 17
        },
        {
            "row": 13,
            "col": 18
        },
        {
            "row": 13,
            "col": 19
        },
        {
            "row": 13,
            "col": 21
        },
        {
            "row": 13,
            "col": 22
        },
        {
            "row": 13,
            "col": 25
        },
        {
            "row": 13,
            "col": 26
        },
        {
            "row": 13,
            "col": 27
        },
        {
            "row": 13,
            "col": 28
        },
        {
            "row": 13,
            "col": 30
        },
        {
            "row": 13,
            "col": 31
        },
        {
            "row": 13,
            "col": 32
        },
        {
            "row": 13,
            "col": 33
        },
        {
            "row": 13,
            "col": 36
        },
        {
            "row": 13,
            "col": 37
        },
        {
            "row": 13,
            "col": 38
        },
        {
            "row": 13,
            "col": 39
        },
        {
            "row": 13,
            "col": 40
        },
        {
            "row": 14,
            "col": 0
        },
        {
            "row": 14,
            "col": 1
        },
        {
            "row": 14,
            "col": 2
        },
        {
            "row": 14,
            "col": 4
        },
        {
            "row": 14,
            "col": 7
        },
        {
            "row": 14,
            "col": 10
        },
        {
            "row": 14,
            "col": 14
        },
        {
            "row": 14,
            "col": 15
        },
        {
            "row": 14,
            "col": 16
        },
        {
            "row": 14,
            "col": 17
        },
        {
            "row": 14,
            "col": 18
        },
        {
            "row": 14,
            "col": 19
        },
        {
            "row": 14,
            "col": 20
        },
        {
            "row": 14,
            "col": 21
        },
        {
            "row": 14,
            "col": 22
        },
        {
            "row": 14,
            "col": 23
        },
        {
            "row": 14,
            "col": 28
        },
        {
            "row": 14,
            "col": 29
        },
        {
            "row": 14,
            "col": 31
        },
        {
            "row": 14,
            "col": 32
        },
        {
            "row": 14,
            "col": 34
        },
        {
            "row": 14,
            "col": 35
        },
        {
            "row": 14,
            "col": 36
        },
        {
            "row": 14,
            "col": 37
        },
        {
            "row": 14,
            "col": 38
        },
        {
            "row": 15,
            "col": 0
        },
        {
            "row": 15,
            "col": 1
        },
        {
            "row": 15,
            "col": 2
        },
        {
            "row": 15,
            "col": 6
        },
        {
            "row": 15,
            "col": 7
        },
        {
            "row": 15,
            "col": 8
        },
        {
            "row": 15,
            "col": 9
        },
        {
            "row": 15,
            "col": 10
        },
        {
            "row": 15,
            "col": 11
        },
        {
            "row": 15,
            "col": 15
        },
        {
            "row": 15,
            "col": 17
        },
        {
            "row": 15,
            "col": 18
        },
        {
            "row": 15,
            "col": 21
        },
        {
            "row": 15,
            "col": 22
        },
        {
            "row": 15,
            "col": 23
        },
        {
            "row": 15,
            "col": 24
        },
        {
            "row": 15,
            "col": 28
        },
        {
            "row": 15,
            "col": 29
        },
        {
            "row": 15,
            "col": 31
        },
        {
            "row": 15,
            "col": 32
        },
        {
            "row": 15,
            "col": 34
        },
        {
            "row": 15,
            "col": 35
        },
        {
            "row": 15,
            "col": 37
        },
        {
            "row": 15,
            "col": 39
        },
        {
            "row": 16,
            "col": 0
        },
        {
            "row": 16,
            "col": 1
        },
        {
            "row": 16,
            "col": 2
        },
        {
            "row": 16,
            "col": 4
        },
        {
            "row": 16,
            "col": 5
        },
        {
            "row": 16,
            "col": 6
        },
        {
            "row": 16,
            "col": 7
        },
        {
            "row": 16,
            "col": 9
        },
        {
            "row": 16,
            "col": 11
        },
        {
            "row": 16,
            "col": 12
        },
        {
            "row": 16,
            "col": 13
        },
        {
            "row": 16,
            "col": 14
        },
        {
            "row": 16,
            "col": 16
        },
        {
            "row": 16,
            "col": 17
        },
        {
            "row": 16,
            "col": 18
        },
        {
            "row": 16,
            "col": 19
        },
        {
            "row": 16,
            "col": 20
        },
        {
            "row": 16,
            "col": 22
        },
        {
            "row": 16,
            "col": 23
        },
        {
            "row": 16,
            "col": 24
        },
        {
            "row": 16,
            "col": 25
        },
        {
            "row": 16,
            "col": 26
        },
        {
            "row": 16,
            "col": 29
        },
        {
            "row": 16,
            "col": 30
        },
        {
            "row": 16,
            "col": 32
        },
        {
            "row": 16,
            "col": 33
        },
        {
            "row": 16,
            "col": 34
        },
        {
            "row": 16,
            "col": 36
        },
        {
            "row": 16,
            "col": 37
        },
        {
            "row": 16,
            "col": 38
        },
        {
            "row": 16,
            "col": 40
        },
        {
            "row": 17,
            "col": 1
        },
        {
            "row": 17,
            "col": 2
        },
        {
            "row": 17,
            "col": 3
        },
        {
            "row": 17,
            "col": 6
        },
        {
            "row": 17,
            "col": 7
        },
        {
            "row": 17,
            "col": 8
        },
        {
            "row": 17,
            "col": 10
        },
        {
            "row": 17,
            "col": 11
        },
        {
            "row": 17,
            "col": 14
        },
        {
            "row": 17,
            "col": 15
        },
        {
            "row": 17,
            "col": 17
        },
        {
            "row": 17,
            "col": 18
        },
        {
            "row": 17,
            "col": 20
        },
        {
            "row": 17,
            "col": 21
        },
        {
            "row": 17,
            "col": 24
        },
        {
            "row": 17,
            "col": 25
        },
        {
            "row": 17,
            "col": 27
        },
        {
            "row": 17,
            "col": 29
        },
        {
            "row": 17,
            "col": 30
        },
        {
            "row": 17,
            "col": 31
        },
        {
            "row": 17,
            "col": 32
        },
        {
            "row": 17,
            "col": 33
        },
        {
            "row": 17,
            "col": 35
        },
        {
            "row": 17,
            "col": 36
        },
        {
            "row": 17,
            "col": 37
        },
        {
            "row": 17,
            "col": 38
        },
        {
            "row": 17,
            "col": 39
        },
        {
            "row": 17,
            "col": 40
        },
        {
            "row": 18,
            "col": 0
        },
        {
            "row": 18,
            "col": 1
        },
        {
            "row": 18,
            "col": 2
        },
        {
            "row": 18,
            "col": 3
        },
        {
            "row": 18,
            "col": 6
        },
        {
            "row": 18,
            "col": 9
        },
        {
            "row": 18,
            "col": 10
        },
        {
            "row": 18,
            "col": 12
        },
        {
            "row": 18,
            "col": 13
        },
        {
            "row": 18,
            "col": 14
        },
        {
            "row": 18,
            "col": 15
        },
        {
            "row": 18,
            "col": 17
        },
        {
            "row": 18,
            "col": 18
        },
        {
            "row": 18,
            "col": 20
        },
        {
            "row": 18,
            "col": 21
        },
        {
            "row": 18,
            "col": 22
        },
        {
            "row": 18,
            "col": 25
        },
        {
            "row": 18,
            "col": 27
        },
        {
            "row": 18,
            "col": 28
        },
        {
            "row": 18,
            "col": 30
        },
        {
            "row": 18,
            "col": 32
        },
        {
            "row": 18,
            "col": 33
        },
        {
            "row": 18,
            "col": 34
        },
        {
            "row": 18,
            "col": 36
        },
        {
            "row": 18,
            "col": 38
        },
        {
            "row": 18,
            "col": 40
        },
        {
            "row": 19,
            "col": 0
        },
        {
            "row": 19,
            "col": 1
        },
        {
            "row": 19,
            "col": 2
        },
        {
            "row": 19,
            "col": 3
        },
        {
            "row": 19,
            "col": 5
        },
        {
            "row": 19,
            "col": 7
        },
        {
            "row": 19,
            "col": 8
        },
        {
            "row": 19,
            "col": 9
        },
        {
            "row": 19,
            "col": 10
        },
        {
            "row": 19,
            "col": 12
        },
        {
            "row": 19,
            "col": 13
        },
        {
            "row": 19,
            "col": 14
        },
        {
            "row": 19,
            "col": 15
        },
        {
            "row": 19,
            "col": 17
        },
        {
            "row": 19,
            "col": 18
        },
        {
            "row": 19,
            "col": 21
        },
        {
            "row": 19,
            "col": 23
        },
        {
            "row": 19,
            "col": 24
        },
        {
            "row": 19,
            "col": 25
        },
        {
            "row": 19,
            "col": 28
        },
        {
            "row": 19,
            "col": 29
        },
        {
            "row": 19,
            "col": 33
        },
        {
            "row": 19,
            "col": 34
        },
        {
            "row": 19,
            "col": 39
        },
        {
            "row": 19,
            "col": 40
        },
        {
            "row": 20,
            "col": 0
        },
        {
            "row": 20,
            "col": 1
        },
        {
            "row": 20,
            "col": 3
        },
        {
            "row": 20,
            "col": 4
        },
        {
            "row": 20,
            "col": 5
        },
        {
            "row": 20,
            "col": 8
        },
        {
            "row": 20,
            "col": 9
        },
        {
            "row": 20,
            "col": 10
        },
        {
            "row": 20,
            "col": 11
        },
        {
            "row": 20,
            "col": 12
        },
        {
            "row": 20,
            "col": 13
        },
        {
            "row": 20,
            "col": 14
        },
        {
            "row": 20,
            "col": 15
        },
        {
            "row": 20,
            "col": 18
        },
        {
            "row": 20,
            "col": 19
        },
        {
            "row": 20,
            "col": 20
        },
        {
            "row": 20,
            "col": 21
        },
        {
            "row": 20,
            "col": 22
        },
        {
            "row": 20,
            "col": 23
        },
        {
            "row": 20,
            "col": 24
        },
        {
            "row": 20,
            "col": 25
        },
        {
            "row": 20,
            "col": 27
        },
        {
            "row": 20,
            "col": 28
        },
        {
            "row": 20,
            "col": 29
        },
        {
            "row": 20,
            "col": 32
        },
        {
            "row": 20,
            "col": 35
        },
        {
            "row": 20,
            "col": 36
        },
        {
            "row": 20,
            "col": 37
        },
        {
            "row": 20,
            "col": 39
        },
        {
            "row": 20,
            "col": 40
        },
        {
            "row": 21,
            "col": 0
        },
        {
            "row": 21,
            "col": 2
        },
        {
            "row": 21,
            "col": 3
        },
        {
            "row": 21,
            "col": 4
        },
        {
            "row": 21,
            "col": 5
        },
        {
            "row": 21,
            "col": 10
        },
        {
            "row": 21,
            "col": 11
        },
        {
            "row": 21,
            "col": 12
        },
        {
            "row": 21,
            "col": 14
        },
        {
            "row": 21,
            "col": 15
        },
        {
            "row": 21,
            "col": 16
        },
        {
            "row": 21,
            "col": 17
        },
        {
            "row": 21,
            "col": 19
        },
        {
            "row": 21,
            "col": 20
        },
        {
            "row": 21,
            "col": 21
        },
        {
            "row": 21,
            "col": 23
        },
        {
            "row": 21,
            "col": 24
        },
        {
            "row": 21,
            "col": 25
        },
        {
            "row": 21,
            "col": 26
        },
        {
            "row": 21,
            "col": 28
        },
        {
            "row": 21,
            "col": 29
        },
        {
            "row": 21,
            "col": 31
        },
        {
            "row": 21,
            "col": 32
        },
        {
            "row": 21,
            "col": 36
        },
        {
            "row": 21,
            "col": 37
        },
        {
            "row": 22,
            "col": 0
        },
        {
            "row": 22,
            "col": 1
        },
        {
            "row": 22,
            "col": 2
        },
        {
            "row": 22,
            "col": 3
        },
        {
            "row": 22,
            "col": 4
        },
        {
            "row": 22,
            "col": 5
        },
        {
            "row": 22,
            "col": 6
        },
        {
            "row": 22,
            "col": 7
        },
        {
            "row": 22,
            "col": 8
        },
        {
            "row": 22,
            "col": 10
        },
        {
            "row": 22,
            "col": 11
        },
        {
            "row": 22,
            "col": 13
        },
        {
            "row": 22,
            "col": 15
        },
        {
            "row": 22,
            "col": 17
        },
        {
            "row": 22,
            "col": 18
        },
        {
            "row": 22,
            "col": 19
        },
        {
            "row": 22,
            "col": 20
        },
        {
            "row": 22,
            "col": 21
        },
        {
            "row": 22,
            "col": 22
        },
        {
            "row": 22,
            "col": 24
        },
        {
            "row": 22,
            "col": 25
        },
        {
            "row": 22,
            "col": 27
        },
        {
            "row": 22,
            "col": 28
        },
        {
            "row": 22,
            "col": 29
        },
        {
            "row": 22,
            "col": 30
        },
        {
            "row": 22,
            "col": 31
        },
        {
            "row": 22,
            "col": 33
        },
        {
            "row": 22,
            "col": 34
        },
        {
            "row": 23,
            "col": 1
        },
        {
            "row": 23,
            "col": 2
        },
        {
            "row": 23,
            "col": 3
        },
        {
            "row": 23,
            "col": 6
        },
        {
            "row": 23,
            "col": 7
        },
        {
            "row": 23,
            "col": 9
        },
        {
            "row": 23,
            "col": 11
        },
        {
            "row": 23,
            "col": 12
        },
        {
            "row": 23,
            "col": 13
        },
        {
            "row": 23,
            "col": 14
        },
        {
            "row": 23,
            "col": 15
        },
        {
            "row": 23,
            "col": 16
        },
        {
            "row": 23,
            "col": 17
        },
        {
            "row": 23,
            "col": 18
        },
        {
            "row": 23,
            "col": 20
        },
        {
            "row": 23,
            "col": 21
        },
        {
            "row": 23,
            "col": 22
        },
        {
            "row": 23,
            "col": 23
        },
        {
            "row": 23,
            "col": 26
        },
        {
            "row": 23,
            "col": 27
        },
        {
            "row": 23,
            "col": 30
        },
        {
            "row": 23,
            "col": 33
        },
        {
            "row": 23,
            "col": 34
        },
        {
            "row": 23,
            "col": 35
        },
        {
            "row": 23,
            "col": 39
        }
    ]
}