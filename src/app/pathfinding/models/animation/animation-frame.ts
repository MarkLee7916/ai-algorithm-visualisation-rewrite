import { LENGTH_NOT_CALCULATED_YET, PathLengthGrid, initPathLengthGrid } from "../grid/path-length-grid";
import { AnimationFrameGrid, initAnimationFrameGrid } from "../grid/animation-frame-grid";
import { deepCopy } from "../../../shared/utils";
import { PathfindingAlgoOption } from "../dropdown/dropdown-enums";
import { UncheckedObjMap } from "../../../shared/models/uncheckedObjMap";

export type AnimationFramesForMultipleAlgos = {
    lengthOfFramesForEachAlgo: number,
    algoToFramesMapping: AlgoToFramesMapping
}

export type AlgoToFramesMapping = UncheckedObjMap<PathfindingAlgoOption, AnimationFramesForSingleAlgo>;

export type AlgoToCurrentFrameMapping = UncheckedObjMap<PathfindingAlgoOption, AnimationFrame>;

export type AnimationFramesForSingleAlgo = AnimationFrame[];

export type AnimationFrame = {
    grid: AnimationFrameGrid;
    commentary: string;
    pathLengthGrid: PathLengthGrid;
    countOfTilesExpanded: number;
    countOfTilesVisited: number;
    finalPathLength: number;
};

export function buildAlgoToCurrentFrameMapping(algoToFramesMapping: AlgoToFramesMapping, index: number) {
    const mapping = new UncheckedObjMap<PathfindingAlgoOption, AnimationFrame>([]);

    algoToFramesMapping.keys().forEach(algo => {
        const frame = algoToFramesMapping.get(algo)[index];
        mapping.set(algo, frame);
    });

    return mapping;
}

export function buildAnimationFramesForMultipleAlgos(algoToFramesMapping: AlgoToFramesMapping) {
    const maxLength = algoToFramesMapping.values().reduce((maxLength, currFrames) => Math.max(maxLength, currFrames.length), 0);

    algoToFramesMapping.values().forEach(framesForSingleAlgo => {
        while (framesForSingleAlgo.length < maxLength) {
            framesForSingleAlgo.push(deepCopy(framesForSingleAlgo[framesForSingleAlgo.length - 1]));
        }
    });

    return {
        algoToFramesMapping,
        lengthOfFramesForEachAlgo: maxLength
    };
}

export function initBlankAnimationFrame(gridHeight: number, gridWidth: number): AnimationFrame {
    return {
        grid: initAnimationFrameGrid(gridHeight, gridWidth),
        commentary: 'Nothing has happened yet!',
        pathLengthGrid: initPathLengthGrid(gridHeight, gridWidth),
        countOfTilesExpanded: 0,
        countOfTilesVisited: 0,
        finalPathLength: LENGTH_NOT_CALCULATED_YET,
    };
}