import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap, startWith, skip, merge, shareReplay, withLatestFrom } from "rxjs";
import { AnimationFrame, AnimationFramesForMultipleAlgos, buildAnimationFramesForMultipleAlgos, buildSingleAlgosMapping, initBlankAnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { problemStatementChanges, animationIndex, animationFramesForMultipleAlgos, gridDimensions } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";
import { typeOfNeighboursAllowedOptionToImpl, pathfindingAlgoOptionToImpl } from "../models/dropdown/dropdown-enum-mappings";
import { GridDimensions } from "../models/grid/grid";
import { StateService } from "./state.service";
import { DomUpdatesService } from "./dom-updates.service";
import { deepCopy } from "../../shared/utils";

@Injectable({
    providedIn: 'root'
})
export class AnimationFramesForMultipleAlgosService implements StateService<AnimationFramesForMultipleAlgos> {
    constructor(
        private domUpdates: DomUpdatesService,
        @Inject(problemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(animationIndex) private animationIndex: BridgeService<number>,
        @Inject(animationFramesForMultipleAlgos) private bridgeToOtherStreams: BridgeService<AnimationFramesForMultipleAlgos>,
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private calculateFrames$ = this.problemStatementChanges.stream$.pipe(
        switchMap(problemStatement => this.animationIndex.stream$.pipe(
            skip(1),
            filter(animationIndex => animationIndex > 0),
            map(() => {
                const [neighbourOrdering, typeOfNeighboursAllowed, pathfindingAlgos, weightGrid, barrierGrid, startPos, goalPos, gridDimensions] = problemStatement;
                const filterNeighboursFunction = typeOfNeighboursAllowedOptionToImpl.get(typeOfNeighboursAllowed);
                const { height, width } = gridDimensions;

                // TODO: come up with abstraction to avoid pathfindingAlgos being used twice here
                return buildAnimationFramesForMultipleAlgos(pathfindingAlgos, pathfindingAlgos.map(algo => {
                    const algoImpl = pathfindingAlgoOptionToImpl.get(algo);

                    return algoImpl(startPos, goalPos, weightGrid, barrierGrid, filterNeighboursFunction(neighbourOrdering), height, width);
                }));
            }),
            take(1)
        )),
        shareReplay(1)
    );

    // TODO: find something better than repeating this three times
    private resetFromGridDimensionChanges$: Observable<AnimationFramesForMultipleAlgos> = this.gridDimensions.stream$.pipe(
        withLatestFrom(this.domUpdates.setPathfindingAlgos$),
        map(([dimensions, algos]) => {
            const { height, width } = dimensions;
            const blankFrame = initBlankAnimationFrame(height, width);

            return {
                algoToFramesMapping: buildSingleAlgosMapping(algos, algos.map(() => [deepCopy(blankFrame), deepCopy(blankFrame), deepCopy(blankFrame)])),
                lengthOfFramesForEachAlgo: 3
            }
        })
    );

    stream$: Observable<AnimationFramesForMultipleAlgos> = merge(this.calculateFrames$, this.resetFromGridDimensionChanges$);
}
