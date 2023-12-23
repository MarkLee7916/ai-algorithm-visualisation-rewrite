import { goalPos, gridBarriers, startPos, expectedPositionsInPath } from "../algo-test-data/barriers-only";
import { TileAnimationFrame, frameAt } from "../models/grid/animation-frame-grid";
import { DEFAULT_NEIGHBOUR_VISIT_ORDER } from "../models/grid/neighbours";
import { unidirectionalBFS } from "./unidirectional-breadth-first-search";

describe('Unidirectional BFS', () => {
    describe('barrier only case', () => {
        const frames = unidirectionalBFS(startPos, goalPos, [], gridBarriers, DEFAULT_NEIGHBOUR_VISIT_ORDER);
        const finalFrame = frames[frames.length - 1];

        it('calculates correct expanded count', () => {
            expect(finalFrame.countOfTilesExpanded).toBe(561);
        });

        it('calculates correct visited count', () => {
            expect(finalFrame.countOfTilesVisited).toBe(577);
        });

        it('calculates correct path length', () => {
            expect(finalFrame.finalPathLength).toBe(25);
        });

        it('calculates correct path', () => {
            expectedPositionsInPath.forEach(pos => {
                expect(frameAt(finalFrame.grid, pos.row, pos.col)).toBe(TileAnimationFrame.FinalPath);
            });
        });
    });
});