import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap, startWith, skip, merge, shareReplay, withLatestFrom } from "rxjs";
import { AnimationFrame, AnimationFramesForMultipleAlgos, buildAnimationFramesForMultipleAlgos, initBlankAnimationFrame, AnimationFramesForSingleAlgo } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { problemStatementChanges, animationIndex, animationFramesForMultipleAlgos, gridDimensions } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";
import { typeOfNeighboursAllowedOptionToImpl, pathfindingAlgoOptionToImpl } from "../models/dropdown/dropdown-enum-mappings";
import { GridDimensions } from "../models/grid/grid";
import { StateService } from "./state.service";
import { DomUpdatesService } from "./dom-updates.service";
import { deepCopy } from "../../shared/utils";
import { UncheckedObjMap } from "../../shared/models/uncheckedObjMap";
import { PathfindingAlgoOption } from "../models/dropdown/dropdown-enums";

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
                const algoToFramesMapping = new UncheckedObjMap<PathfindingAlgoOption, AnimationFramesForSingleAlgo>([]);

                pathfindingAlgos.forEach(algo => {
                    const algoImpl = pathfindingAlgoOptionToImpl.get(algo);
                    const frames = algoImpl(startPos, goalPos, weightGrid, barrierGrid, filterNeighboursFunction(neighbourOrdering), height, width);
                    algoToFramesMapping.set(algo, frames);
                });

                return buildAnimationFramesForMultipleAlgos(algoToFramesMapping);
            }),
            take(1)
        ))
    );

    private resetFromGridDimensionChanges$: Observable<AnimationFramesForMultipleAlgos> = this.gridDimensions.stream$.pipe(
        withLatestFrom(this.domUpdates.setPathfindingAlgos$),
        map(([dimensions, pathfindingAlgos]) => {
            const { height, width } = dimensions;
            const blankFrame = initBlankAnimationFrame(height, width);
            const algoToFramesMapping = new UncheckedObjMap<PathfindingAlgoOption, AnimationFramesForSingleAlgo>([]);

            pathfindingAlgos.forEach(algo => {
                const frames = [deepCopy(blankFrame), deepCopy(blankFrame), deepCopy(blankFrame)]
                algoToFramesMapping.set(algo, frames);
            });

            return buildAnimationFramesForMultipleAlgos(algoToFramesMapping);
        })
    );

    stream$: Observable<AnimationFramesForMultipleAlgos> = merge(this.calculateFrames$, this.resetFromGridDimensionChanges$).pipe(
        shareReplay(1)
    );
}
