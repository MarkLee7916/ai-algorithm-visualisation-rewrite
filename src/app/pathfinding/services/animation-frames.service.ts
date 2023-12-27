import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap, startWith } from "rxjs";
import { AnimationFrame, initBlankAnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { bridgeFromProblemStatementChanges, bridgeFromAnimationIndex, bridgeFromAnimationFrames } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";
import { typeOfNeighboursAllowedOptionToImpl, pathfindingAlgoOptionToImpl } from "../models/dropdown/dropdown-enum-mappings";

@Injectable({
    providedIn: 'root'
})
export class AnimationFramesService {
    constructor(
        @Inject(bridgeFromProblemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(bridgeFromAnimationIndex) private animationIndex: BridgeService<number>,
        @Inject(bridgeFromAnimationFrames) private bridgeToOtherStreams: BridgeService<AnimationFrame[]>,
    ) {
        this.getStream().subscribe()
    }

    getStream() {
        return this.animationFrames$;
    }

    // Animation frames update when animation index changes and the problem statement has changed from last time
    private animationFrames$: Observable<AnimationFrame[]> =
        this.problemStatementChanges.getStream().pipe(
            switchMap(problemStatement => this.animationIndex.getStream().pipe(
                filter(animationIndex => animationIndex > 0),
                map(() => {
                    const [neighbourOrdering, typeOfNeighboursAllowed, pathfindingAlgo, weightGrid, barrierGrid, startPos, goalPos] = problemStatement;
                    const filterNeighboursFunction = typeOfNeighboursAllowedOptionToImpl.get(typeOfNeighboursAllowed);
                    const algoImpl = pathfindingAlgoOptionToImpl.get(pathfindingAlgo);

                    return algoImpl(startPos, goalPos, weightGrid, barrierGrid, filterNeighboursFunction(neighbourOrdering));
                }),
                take(1)
            )),
            // TODO: properly derive this value from the grid dimensions stream
            startWith([initBlankAnimationFrame(20, 20)]),
            tap(frames => this.bridgeToOtherStreams.next(frames))
        );
}
