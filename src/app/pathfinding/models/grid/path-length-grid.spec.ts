import { initPathLengthGrid, pathLengthAt, LENGTH_NOT_CALCULATED_YET, setPathLengthAt, PathLengthGrid } from "./path-length-grid";

describe('PathLengthGrid', () => {
    let grid: PathLengthGrid;

    beforeEach(() => {
        grid = initPathLengthGrid(2, 2);
    });

    it('should initialize a grid with default pathLength', () => {
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                expect(pathLengthAt(grid, row, col)).toEqual(LENGTH_NOT_CALCULATED_YET);
            }
        }
    });

    it('should set pathLength at a specific position', () => {
        setPathLengthAt(grid, 1, 1, 5);
        expect(pathLengthAt(grid, 0, 0)).toEqual(LENGTH_NOT_CALCULATED_YET);
        expect(pathLengthAt(grid, 0, 1)).toEqual(LENGTH_NOT_CALCULATED_YET);
        expect(pathLengthAt(grid, 1, 0)).toEqual(LENGTH_NOT_CALCULATED_YET);
        expect(pathLengthAt(grid, 1, 1)).toEqual(5);
    });
});
