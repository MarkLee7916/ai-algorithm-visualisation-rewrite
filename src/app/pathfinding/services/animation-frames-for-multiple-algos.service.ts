import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap, startWith, skip, merge, shareReplay, withLatestFrom } from "rxjs";
import { AnimationFrame, AnimationFramesForMultipleAlgos, buildAnimationFramesForMultipleAlgos, initBlankAnimationFrame, AnimationFramesForSingleAlgo, getDefaultAlgoToAnimationFramesMapping } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { problemStatementChanges, animationIndex, animationFramesForMultipleAlgos, gridDimensions, pathfindingAlgos } from "../pathfinding.tokens";
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
        @Inject(pathfindingAlgos) private pathfindingAlgos: BridgeService<PathfindingAlgoOption[]>,
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
    ) {
        bridgeToOtherStreams.link(this.stream$);
    }

    private computeFramesForEachAlgo(problemStatement: ProblemStatement) {
        const [neighbourOrdering, typeOfNeighboursAllowed, pathfindingAlgos, weightGrid, barrierGrid, startPos, goalPos, gridDimensions] = problemStatement;
        const filterNeighboursFunction = typeOfNeighboursAllowedOptionToImpl.get(typeOfNeighboursAllowed);
        const { height, width } = gridDimensions;
        const algoToFramesMapping = getDefaultAlgoToAnimationFramesMapping(gridDimensions);

        pathfindingAlgos.forEach(algo => {
            const algoImpl = pathfindingAlgoOptionToImpl.get(algo);
            const frames = algoImpl(startPos, goalPos, weightGrid, barrierGrid, filterNeighboursFunction(neighbourOrdering), height, width);
            algoToFramesMapping.set(algo, frames);
        });

        return algoToFramesMapping;
    }

    private computeFrames$ = this.problemStatementChanges.stream$.pipe(
        switchMap(problemStatement => this.animationIndex.stream$.pipe(
            skip(1),
            filter(animationIndex => animationIndex > 0),
            map(() => {
                const algoToFramesMapping = this.computeFramesForEachAlgo(problemStatement);
                return buildAnimationFramesForMultipleAlgos(algoToFramesMapping);
            }),
            take(1)
        ))
    );

    private resetFromGridDimensionChanges$: Observable<AnimationFramesForMultipleAlgos> = this.gridDimensions.stream$.pipe(
        map(dimensions => buildAnimationFramesForMultipleAlgos(getDefaultAlgoToAnimationFramesMapping(dimensions)))
    );

    stream$: Observable<AnimationFramesForMultipleAlgos> = merge(this.computeFrames$, this.resetFromGridDimensionChanges$).pipe(
        shareReplay(1)
    );
}
