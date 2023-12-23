import { initBarrierGrid, hasBarrierAt, BarrierGrid, addBarrierAt, removeBarrierAt } from "./barrier-grid";

describe('BarrierGrid', () => {
    let grid: BarrierGrid;

    beforeEach(() => {
        grid = initBarrierGrid(2, 2);
    });

    it('should initialize a grid with default barrier', () => {
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                expect(hasBarrierAt(grid, row, col)).toEqual(false);
            }
        }
    });

    it('should add and remove barriers at a specific position', () => {
        addBarrierAt(grid, 1, 1);
        expect(hasBarrierAt(grid, 0, 0)).toEqual(false);
        expect(hasBarrierAt(grid, 0, 1)).toEqual(false);
        expect(hasBarrierAt(grid, 1, 0)).toEqual(false);
        expect(hasBarrierAt(grid, 1, 1)).toEqual(true);

        removeBarrierAt(grid, 1, 1);
        expect(hasBarrierAt(grid, 0, 0)).toEqual(false);
        expect(hasBarrierAt(grid, 0, 1)).toEqual(false);
        expect(hasBarrierAt(grid, 1, 0)).toEqual(false);
        expect(hasBarrierAt(grid, 1, 1)).toEqual(false);
    });
});
