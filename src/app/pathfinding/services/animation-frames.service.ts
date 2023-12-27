import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap, filter, map, take, tap } from "rxjs";
import { AnimationFrame, initBlankAnimationFrame } from "../models/animation/animation-frame";
import { BridgeService } from "./bridge";
import { bridgeFromProblemStatementChanges, bridgeFromAnimationIndex, bridgeFromAnimationFrames } from "../pathfinding.tokens";
import { ProblemStatement } from "../models/problem-statement/problem-statement";

@Injectable({
    providedIn: 'root'
})
export class AnimationFramesService {
    constructor(
        @Inject(bridgeFromProblemStatementChanges) private problemStatementChanges: BridgeService<ProblemStatement>,
        @Inject(bridgeFromAnimationIndex) private animationIndex: BridgeService<number>,
        @Inject(bridgeFromAnimationFrames) private bridgeToOtherStreams: BridgeService<AnimationFrame[]>,
    ) { }

    getStream() {
        return this.animationFrames$;
    }

    // Animation frames update when animation index changes and the problem statement has changed from last time
    private animationFrames$: Observable<AnimationFrame[]> =
        this.problemStatementChanges.getStream().pipe(
            switchMap(problemStatement => this.animationIndex.getStream().pipe(
                filter(animationIndex => animationIndex > 0),
                map(() => {
                    const [

                    ] = problemStatement;

                    // TODO: Calculate animation frames here
                    return [initBlankAnimationFrame(2, 2)];
                }),
                take(1)
            )),
            tap(frames => this.bridgeToOtherStreams.next(frames))
        );
}
