import { barriersOnlyNoPathFound } from "../algo-test-data/barriers-only-no-path-found";
import { barriersOnlyPathFound } from "../algo-test-data/barriers-only-path-found";
import { TileAnimationFrame, frameAt } from "../models/grid/animation-frame-grid";
import { LENGTH_NOT_CALCULATED_YET } from "../models/grid/path-length-grid";
import { unidirectionalBFS } from "./unidirectional-breadth-first-search";

describe('Unidirectional BFS', () => {
    describe('barrier only case where path is found', () => {
        const { startPos, goalPos, gridBarriers, neighbourVisitOrder, expectedPositionsInPath, expectedExpandedPositions, expectedVisitedPositions } = barriersOnlyPathFound;
        const frames = unidirectionalBFS(startPos, goalPos, [], gridBarriers, neighbourVisitOrder);
        const finalFrame = frames[frames.length - 1];

        it('calculates correct expanded count', () => {
            expect(finalFrame.countOfTilesExpanded).toBe(689);
        });

        it('calculates correct visited count', () => {
            expect(finalFrame.countOfTilesVisited).toBe(708);
        });

        it('calculates correct path length', () => {
            expect(finalFrame.finalPathLength).toBe(37);
        });

        it('calculates correct path', () => {
            expectedPositionsInPath.forEach(pos => {
                expect(frameAt(finalFrame.grid, pos.row, pos.col)).toBe(TileAnimationFrame.FinalPath);
            });
        });

        it('calculates correct visited positions', () => {
            expectedVisitedPositions.forEach(pos => {
                expect(frameAt(finalFrame.grid, pos.row, pos.col)).toBe(TileAnimationFrame.Visited);
            });
        });

        it('calculates correct expanded positions', () => {
            expectedExpandedPositions.forEach(pos => {
                expect(frameAt(finalFrame.grid, pos.row, pos.col)).toBe(TileAnimationFrame.Expanded);
            });
        });
    });

    describe('barrier only case where no path is found', () => {
        const { startPos, goalPos, gridBarriers, neighbourVisitOrder } = barriersOnlyNoPathFound;
        const frames = unidirectionalBFS(startPos, goalPos, [], gridBarriers, neighbourVisitOrder);
        const finalFrame = frames[frames.length - 1];

        it('calculates correct expanded count', () => {
            expect(finalFrame.countOfTilesExpanded).toBe(1);
        });

        it('calculates correct visited count', () => {
            expect(finalFrame.countOfTilesVisited).toBe(1);
        });

        it('calculates correct path length', () => {
            expect(finalFrame.finalPathLength).toBe(LENGTH_NOT_CALCULATED_YET);
        });

        it('show correct commentary', () => {
            expect(finalFrame.commentary).toBe('No path found!');
        });
    });
});