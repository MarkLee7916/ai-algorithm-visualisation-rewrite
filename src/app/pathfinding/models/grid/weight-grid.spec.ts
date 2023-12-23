import { initWeightGrid, weightAt, DEFAULT_WEIGHT, setWeightAt, WeightGrid } from "./weight-grid";

describe('WeightGrid', () => {
    let grid: WeightGrid;

    beforeEach(() => {
        grid = initWeightGrid(2, 2);
    });

    it('should initialize a grid with default weight', () => {
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                expect(weightAt(grid, row, col)).toEqual(DEFAULT_WEIGHT);
            }
        }
    });

    it('should set weight at a specific position', () => {
        setWeightAt(grid, 1, 1, 5);
        expect(weightAt(grid, 0, 0)).toEqual(DEFAULT_WEIGHT);
        expect(weightAt(grid, 0, 1)).toEqual(DEFAULT_WEIGHT);
        expect(weightAt(grid, 1, 0)).toEqual(DEFAULT_WEIGHT);
        expect(weightAt(grid, 1, 1)).toEqual(5);
    });
});
