import { initAnimationFrameGrid, frameAt, setFrameAt, AnimationFrameGrid, DEFAULT_TILE_ANIMATION_FRAME, TileAnimationFrame } from "./animation-frame-grid";

describe('AnimationFrameGrid', () => {
    let grid: AnimationFrameGrid;

    beforeEach(() => {
        grid = initAnimationFrameGrid(2, 2);
    });

    it('should initialize a grid with default animationFrame', () => {
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                expect(frameAt(grid, row, col)).toEqual(DEFAULT_TILE_ANIMATION_FRAME);
            }
        }
    });

    it('should set AnimationFrame at a specific position', () => {
        setFrameAt(grid, 1, 1, TileAnimationFrame.Expanded);
        expect(frameAt(grid, 0, 0)).toEqual(DEFAULT_TILE_ANIMATION_FRAME);
        expect(frameAt(grid, 0, 1)).toEqual(DEFAULT_TILE_ANIMATION_FRAME);
        expect(frameAt(grid, 1, 0)).toEqual(DEFAULT_TILE_ANIMATION_FRAME);
        expect(frameAt(grid, 1, 1)).toEqual(TileAnimationFrame.Expanded);
    });
});
