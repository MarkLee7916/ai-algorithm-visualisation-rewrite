import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap, startWith, skip, merge } from "rxjs";
import { AnimationFrame, initBlankAnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { bridgeFromProblemStatementChanges, bridgeFromAnimationIndex, bridgeFromAnimationFrames, bridgeFromGridDimensions } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";
import { typeOfNeighboursAllowedOptionToImpl, pathfindingAlgoOptionToImpl } from "../models/dropdown/dropdown-enum-mappings";
import { GridDimensions } from "../models/grid/grid";

@Injectable({
    providedIn: 'root'
})
export class AnimationFramesService {
    constructor(
        @Inject(bridgeFromProblemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(bridgeFromAnimationIndex) private animationIndex: BridgeService<number>,
        @Inject(bridgeFromAnimationFrames) private bridgeToOtherStreams: BridgeService<AnimationFrame[]>,
        @Inject(bridgeFromGridDimensions) private gridDimensions: BridgeService<GridDimensions>,
    ) {
        this.getStream().subscribe()
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

    private resetFramesFromGridDimensionChanges$ = this.gridDimensions.getStream().pipe(
        map(({ height, width }) => [initBlankAnimationFrame(height, width), initBlankAnimationFrame(height, width), initBlankAnimationFrame(height, width)])
    );

    // Animation frames update when animation index changes and the problem statement has changed from last time
    private animationFrames$: Observable<AnimationFrame[]> = merge(this.calculateFrames$, this.resetFramesFromGridDimensionChanges$).pipe(
        tap(frames => this.bridgeToOtherStreams.next(frames))
    )
}
