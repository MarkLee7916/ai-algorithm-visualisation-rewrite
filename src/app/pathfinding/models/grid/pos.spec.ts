import { hasPos, formatPosAsCoord, isOnGrid } from "./pos";

describe('hasPos', () => {
    it('returns correct result', () => {
        const posList = [
            { row: 1, col: 1 },
            { row: 2, col: 2 },
        ];

        expect(hasPos(posList, { row: 1, col: 1 })).toBeTrue();
        expect(hasPos(posList, { row: 2, col: 2 })).toBeTrue();
        expect(hasPos(posList, { row: 1, col: 2 })).toBeFalse();
        expect(hasPos(posList, { row: 2, col: 1 })).toBeFalse();
    });
});

describe('formatPosAsCoord', () => {
    it('formats coords properly', () => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const coordStr = formatPosAsCoord({ row, col });

                expect(coordStr[0]).toBe('(');
                expect(coordStr[1]).toBe(`${col + 1}`);
                expect(coordStr[2]).toBe(',');
                expect(coordStr[3]).toBe(' ');
                expect(coordStr[4]).toBe(`${row + 1}`);
            }
        }
    });
});

describe('isOnGrid', () => {
    it('returns the correct result', () => {
        const gridHeight = 5;
        const gridWidth = 5;

        expect(isOnGrid(gridHeight, gridWidth, { row: 0, col: -1 })).toBeFalse();
        expect(isOnGrid(gridHeight, gridWidth, { row: -1, col: 0 })).toBeFalse();
        expect(isOnGrid(gridHeight, gridWidth, { row: gridHeight, col: 0 })).toBeFalse();
        expect(isOnGrid(gridHeight, gridWidth, { row: 0, col: gridWidth })).toBeFalse();
        expect(isOnGrid(gridHeight, gridWidth, { row: 0, col: 0 })).toBeTrue();
        expect(isOnGrid(gridHeight, gridWidth, { row: gridHeight - 1, col: gridWidth - 1 })).toBeTrue();
    });
});