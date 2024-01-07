import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap, startWith, skip, merge } from "rxjs";
import { AnimationFrame, initBlankAnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { problemStatementChanges, animationIndex, animationFrames, gridDimensions } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";
import { typeOfNeighboursAllowedOptionToImpl, pathfindingAlgoOptionToImpl } from "../models/dropdown/dropdown-enum-mappings";
import { GridDimensions } from "../models/grid/grid";
import { StateService } from "./state.service";

@Injectable({
    providedIn: 'root'
})
export class AnimationFramesService implements StateService<AnimationFrame[]> {
    constructor(
        @Inject(problemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(animationIndex) private animationIndex: BridgeService<number>,
        @Inject(animationFrames) private bridgeToOtherStreams: BridgeService<AnimationFrame[]>,
        @Inject(gridDimensions) private gridDimensions: BridgeService<GridDimensions>,
    ) {
        bridgeToOtherStreams.link(this.getStream());
    }

    getStream() {
        return this.animationFrames$;
    }

    private calculateFrames$ = this.problemStatementChanges.getStream().pipe(
        switchMap(problemStatement => this.animationIndex.getStream().pipe(
            skip(1),
            filter(animationIndex => animationIndex > 0),
            map(() => {
                const [neighbourOrdering, typeOfNeighboursAllowed, pathfindingAlgo, weightGrid, barrierGrid, startPos, goalPos] = problemStatement;
                const filterNeighboursFunction = typeOfNeighboursAllowedOptionToImpl.get(typeOfNeighboursAllowed);
                const algoImpl = pathfindingAlgoOptionToImpl.get(pathfindingAlgo);

                return algoImpl(startPos, goalPos, weightGrid, barrierGrid, filterNeighboursFunction(neighbourOrdering));
            }),
            take(1)
        ))
    );

    // TODO: find something better than repeating this three times
    private resetFramesFromGridDimensionChanges$ = this.gridDimensions.getStream().pipe(
        map(({ height, width }) => [initBlankAnimationFrame(height, width), initBlankAnimationFrame(height, width), initBlankAnimationFrame(height, width)])
    );

    private animationFrames$: Observable<AnimationFrame[]> = merge(this.calculateFrames$, this.resetFramesFromGridDimensionChanges$);
}
